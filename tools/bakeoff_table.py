"""Summarise the bake-off into one table.

    python3 tools/bakeoff_table.py

Reads out/bakeoff/*.json and reports, per model: accuracy on the fields that
matter, whether the structural checks held, throughput, and whether the survival
scan passed. Writes out/bakeoff/summary.json for the report page.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BAKE = ROOT / "out" / "bakeoff"

def _slug(m: str) -> str:
    return m.replace("/", "-").replace(":", "-")


# Discovered from what actually ran, so an overridden MODELS list still reports.
def _discover() -> list[str]:
    seen = {}
    for f in sorted(BAKE.glob("run-*-triage-*.json")):
        try:
            seen[json.loads(f.read_text())["model"]["name"]] = True
        except Exception:
            continue
    return list(seen) or ["gemma4:12b", "qwen3.5:9b", "qwen3.5:4b"]


MODELS: list[str] = []
KEY_FIELDS = {
    "triage-contracts": ["renewal_basis", "renewal_date",
                         "expires_within_90_days", "contains_personal_data"],
    "triage-inbox": ["category", "urgency", "owner", "contains_personal_data"],
}


def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else None


def main() -> None:
    import sys
    sys.path.insert(0, str(ROOT / "tools"))
    from score import score

    global MODELS
    MODELS = _discover()
    summary = {}

    for model in MODELS:
        slug = _slug(model)
        entry = {"model": model, "tasks": {}}

        for task in ("triage-contracts", "triage-inbox"):
            run_path = BAKE / f"run-{slug}-{task}.json"
            run = load(run_path)
            if run is None:
                entry["tasks"][task] = {"status": "did not complete"}
                continue

            s = score(run_path)
            entry["tasks"][task] = {
                "status": "ok",
                "documents": len(run["records"]),
                "needs_review": sum(1 for r in run["records"]
                                    if r.get("needs_review")),
                "checks_passed": run["checks"]["passed"],
                "checks_failed": run["checks"]["failed"],
                "tokens_per_second": run["local"]["tokens_per_second"],
                "wall_seconds": run["local"]["wall_seconds"],
                "overall_pct": s["overall"]["pct"],
                "fields": {f: s["per_field"].get(f, {}).get("pct")
                           for f in KEY_FIELDS[task]},
            }

        red = load(BAKE / f"run-{slug}-redact.json")
        if red:
            scan = next((c for c in red["checks"]["details"]
                         if c["id"] == "survival_scan"), None)
            empty = next((c for c in red["checks"]["details"]
                          if c["id"] == "flagged_not_empty"), None)
            entry["redact"] = {
                "status": "ok",
                "documents": len(red["records"]),
                "removals": red["removals_total"],
                "survival_scan": "pass" if (scan and scan["passed"]) else "fail",
                "detail": scan["detail"] if scan else "",
                # Split gate: identifiers are the pass criterion, facts are
                # reported. See check_survival_scan in src/checks.py.
                "identifiers_survived": (scan or {}).get("identifiers", {}).get("survived"),
                "identifiers_total": (scan or {}).get("identifiers", {}).get("total"),
                "facts_survived": (scan or {}).get("facts", {}).get("survived"),
                "facts_total": (scan or {}).get("facts", {}).get("total"),
                "flagged_not_empty": (None if empty is None
                                      else ("pass" if empty["passed"] else "fail")),
                "empty_removal_retries": red.get("empty_removal_retries", 0),
            }
        else:
            entry["redact"] = {"status": "did not complete"}

        summary[model] = entry

    # Accuracy on the fields that carry the demo.
    for task in ("triage-contracts", "triage-inbox"):
        print()
        print(task)
        fields = KEY_FIELDS[task]
        print(f'  {"model":<14} {"overall":>8} ' +
              " ".join(f"{f[:13]:>14}" for f in fields) +
              f' {"tok/s":>7} {"checks":>8}')
        for model in MODELS:
            t = summary[model]["tasks"].get(task, {})
            if t.get("status") != "ok":
                print(f'  {model:<14} {"did not complete":>8}')
                continue
            cells = " ".join(
                f'{(f"{t["fields"][f]:.1f}%" if t["fields"][f] is not None else "-"):>14}'
                for f in fields)
            chk = f'{t["checks_passed"]}/{t["checks_passed"] + t["checks_failed"]}'
            print(f'  {model:<14} {t["overall_pct"]:>7.1f}% {cells} '
                  f'{t["tokens_per_second"]:>7} {chk:>8}')

    print()
    print("redaction gate  (identifiers gate the result, facts are reported)")
    # "0/10" under a header reading "identifiers" is ambiguous: it looks like a
    # score of zero out of ten rather than zero leaks out of ten planted. Say
    # LEAKED so the good result cannot be misread as a total failure.
    print(f'  {"model":<19}{"gate":>6}{"ident LEAKED":>14}'
          f'{"facts LEAKED":>14}{"removals":>10}{"retries":>9}')
    for model in MODELS:
        r = summary[model]["redact"]
        if r.get("status") != "ok":
            print(f'  {model:<19}{"did not complete":>6}')
            continue
        ids = f'{r.get("identifiers_survived")}/{r.get("identifiers_total")}'
        fct = f'{r.get("facts_survived")}/{r.get("facts_total")}'
        print(f'  {model:<19}{r["survival_scan"].upper():>6}{ids:>14}{fct:>14}'
              f'{r["removals"]:>10}{r.get("empty_removal_retries", 0):>9}')

    out = BAKE / "summary.json"
    out.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print()
    print(f"  -> {out}")


if __name__ == "__main__":
    main()
