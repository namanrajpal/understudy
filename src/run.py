"""Execute a runbook.

    python3 src/run.py runbooks/triage-contracts.json
    python3 src/run.py runbooks/triage-inbox.json --model qwen3.5:4b
    python3 src/run.py runbooks/redact.json --from out/run-latest.json

The runner knows nothing about emails or leases. It reads a runbook, walks its
steps, and calls the local model where the runbook says to. Everything specific
to a document type lives in the runbook, which a frontier model wrote once.

The step trace prints the runbook's own plain-language step names, not function
names, because it is projector copy.
"""

import argparse
import json
import platform
import sys
import time
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import checks as checks_mod
import model as model_mod
import probe as probe_mod
from loaders import load_glob
from redact_apply import apply_removals

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MODEL = "gemma4:12b"

# Frontier work spent authoring the three runbooks. Recorded once, by hand,
# because it happened in a chat session and not in this process. Understating or
# inventing it would break the honesty rule in SPEC.md.
FRONTIER = {
    "calls": 3,
    "prompt_tokens": None,
    "output_tokens": None,
    "when": "runbook authoring, 2026-08-23",
    "model": "frontier reasoning model, via chat",
    "note": "Authored triage-inbox, triage-contracts and redact once. "
            "Did not run during this execution and is not required to.",
}


def banner(text: str) -> None:
    print()
    print(text)
    print("-" * max(len(text), 60))


def step_line(n: int, name: str, state: str, extra: str = "") -> None:
    marks = {"run": "  ", "ok": "OK", "fail": "!!"}
    tail = f"   {extra}" if extra else ""
    print(f"  [{marks.get(state, '  ')}] {n}. {name}{tail}")


def device_info(label: str | None) -> dict:
    return {
        "label": label or platform.node(),
        "os": platform.system().lower(),
        "machine": platform.machine(),
        "python": platform.python_version(),
    }


def resolve_docs(runbook: dict, args) -> tuple[list[dict], str]:
    """Load inputs. `redact.json` takes its inputs from a prior run's flags."""
    spec = runbook["input"]

    if spec.get("from") == "flagged":
        if not args.source:
            raise SystemExit(
                "redact needs a prior run: --from out/run-<timestamp>.json")
        prior = json.loads(Path(args.source).read_text(encoding="utf-8"))
        flag = spec.get("flag_field", "contains_personal_data")
        flagged = [r for r in prior["records"]
                   if (r.get("parsed") or {}).get(flag) is True]
        if not flagged:
            raise SystemExit(f"no records in {args.source} were flagged {flag}=true")

        docs = []
        for r in flagged:
            loader = "eml" if r["file"].endswith(".eml") else "text"
            docs.extend(load_glob(ROOT, r["file"], loader))
        return docs, f'flagged by {prior["runbook"]["id"]}'

    return load_glob(ROOT, spec["glob"], spec["loader"]), spec["glob"]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("runbook", type=Path)
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--device-label", default=None)
    ap.add_argument("--from", dest="source", default=None,
                    help="prior run.json, for redact")
    ap.add_argument("--limit", type=int, default=0, help="first N documents only")
    ap.add_argument("--out", type=Path, default=ROOT / "out")
    args = ap.parse_args()

    runbook = json.loads(args.runbook.read_text(encoding="utf-8"))
    run_id = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")

    banner(f'{runbook["id"]}  v{runbook["version"]}')
    print(f'  purpose:     {runbook["purpose"]}')
    print(f'  authored by: {runbook["authored_by"]}')
    print(f'  executed by: {args.model}, on this machine, now')

    # 1. Network verdict, before anything else runs.
    banner("Network")
    net = probe_mod.probe()
    print(probe_mod.render(net))
    if not net["model_host"]["reachable"]:
        raise SystemExit("\nollama is not answering on 127.0.0.1:11434")

    # 2. Warm the model so timings are throughput, not cold start.
    banner("Model")
    if not any(m.get("name") == args.model for m in model_mod.available()):
        have = ", ".join(m["name"] for m in model_mod.available()) or "none"
        raise SystemExit(f"{args.model} not pulled. Available: {have}")
    load_s = model_mod.warm(args.model)
    digest = model_mod.digest_for(args.model)
    print(f"  {args.model}  digest {digest}  loaded and pinned in {load_s}s")

    # 3. Walk the runbook.
    banner("Steps")
    usage = model_mod.Usage()
    records: list[dict] = []
    check_results: list[dict] = []
    docs: list[dict] = []
    source_desc = ""
    t_run = time.monotonic()

    is_redact = any(s["op"] == "redact" for s in runbook["steps"])
    task = runbook["redact"] if is_redact else runbook["extract"]
    schema = task["schema"]
    options = task.get("options", {})
    today = json.loads(
        (ROOT / "corpus" / "META.json").read_text(encoding="utf-8")
    )["reference_date"]

    for step in runbook["steps"]:
        n, name, op = step["n"], step["name"], step["op"]

        if op == "load":
            step_line(n, name, "run")
            docs, source_desc = resolve_docs(runbook, args)
            if args.limit:
                docs = docs[: args.limit]
            chars = sum(d["chars"] for d in docs)
            step_line(n, name, "ok", f"{len(docs)} documents, {chars:,} chars")

        elif op in {"extract", "redact"}:
            step_line(n, name, "run", f"0/{len(docs)}")
            for i, doc in enumerate(docs, start=1):
                prompt = (task["prompt"]
                          .replace("{document}", doc["text"])
                          .replace("{today}", today))
                parsed, raw = model_mod.generate(
                    args.model, prompt, schema, options, usage, doc["file"])
                rec = {
                    "file": doc["file"],
                    "chars": doc["chars"],
                    "parsed": parsed,
                    "needs_review": parsed is None,
                }
                if parsed is None:
                    rec["raw"] = raw[:400]
                elif op == "redact":
                    # The model finds the spans. Code applies them, because
                    # substituting a substring is mechanical and the model is
                    # measurably unreliable at it on long spans. See
                    # src/redact_apply.py for the measurement that forced this.
                    applied, report = apply_removals(
                        doc["text"], parsed.get("removals", []))
                    rec["model_redacted_text"] = parsed.get("redacted_text", "")
                    parsed["redacted_text"] = applied
                    rec["applied"] = report
                    rec["spans_not_found"] = [
                        r["text"] for r in report if r["applied"] == "not_found"]
                records.append(rec)
                print(f"\r  [  ] {n}. {name}   {i}/{len(docs)}",
                      end="", flush=True)
            print("\r", end="")
            nr = sum(1 for r in records if r["needs_review"])
            extra = f"{len(records)} records"
            if nr:
                extra += f", {nr} needs_review"
            step_line(n, name, "ok" if not nr else "fail", extra)

        elif op == "check":
            step_line(n, name, "run")
            check_results = checks_mod.run_checks(
                runbook["checks"], records,
                expected=len(docs), root=ROOT, schema=schema)
            passed = sum(1 for c in check_results if c["passed"])
            print()
            print(checks_mod.render(check_results))
            step_line(n, name,
                      "ok" if passed == len(check_results) else "fail",
                      f"{passed}/{len(check_results)} checks passed")

        elif op == "report":
            step_line(n, name, "run")
            args.out.mkdir(parents=True, exist_ok=True)
            step_line(n, name, "ok", str(args.out))

    wall = round(time.monotonic() - t_run, 1)

    # 4. Persist.
    payload = {
        "run_id": run_id,
        "runbook": {"id": runbook["id"], "version": runbook["version"],
                    "purpose": runbook["purpose"],
                    "authored_by": runbook["authored_by"],
                    "steps": runbook["steps"]},
        "source": source_desc,
        "reference_date": today,
        "device": device_info(args.device_label),
        "model": {"name": args.model, "digest": digest, "load_seconds": load_s},
        "network": net,
        "local": {**usage.as_dict(), "wall_seconds_total": wall},
        "frontier": FRONTIER,
        "checks": {
            "passed": sum(1 for c in check_results if c["passed"]),
            "failed": sum(1 for c in check_results if not c["passed"]),
            "details": check_results,
        },
        "records": records,
        "removals_total": sum(
            len((r.get("parsed") or {}).get("removals", []) or [])
            for r in records),
    }

    args.out.mkdir(parents=True, exist_ok=True)
    out_path = args.out / f"run-{run_id}.json"
    out_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    (args.out / "run-latest.json").write_text(
        json.dumps(payload, indent=2) + "\n", encoding="utf-8")

    # 5. Summary.
    banner("Result")
    u = payload["local"]
    print(f'  documents        {len(records)}')
    print(f'  local calls      {u["calls"]}'
          + (f' ({u["retries"]} retried)' if u["retries"] else ""))
    print(f'  local tokens     {u["prompt_tokens"]:,} in / '
          f'{u["output_tokens"]:,} out   (measured by ollama)')
    print(f'  throughput       {u["tokens_per_second"]} output tokens/sec')
    print(f'  wall clock       {wall}s')
    print(f'  checks           {payload["checks"]["passed"]} passed, '
          f'{payload["checks"]["failed"]} failed')
    if is_redact:
        print(f'  removals         {payload["removals_total"]}')
    print(f'  network          {net["probe"]}')
    print()
    print(f'  frontier calls this run: 0. '
          f'The runbook was authored once, on {FRONTIER["when"]}.')
    print(f'  -> {out_path}')


if __name__ == "__main__":
    main()
