"""Score a run against corpus/TRUTH.json.

    python3 tools/score.py out/run-latest.json

The checks in src/checks.py answer "is this output well formed". This answers
"is this output correct", which is a different and harder question. Both belong
in the demo: the checks are what a stage audience can watch go green, the score
is what makes the "how good is good enough" argument honest.

Reported per field, because a single accuracy number hides the thing worth
seeing: `renewal_basis` and `renewal_date` are where a small model earns or
loses its place, and the other fields are easy.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def corpus_key(file: str) -> str:
    """Runner paths are repo-relative (corpus/inbox/x.eml). PLANTED.json and
    TRUTH.json are corpus-relative (inbox/x.eml) because SPEC.md fixes them that
    way. Strip the one leading segment rather than editing the frozen spec."""
    return file[len("corpus/"):] if file.startswith("corpus/") else file


def score(run_path: Path) -> dict:
    run = json.loads(run_path.read_text(encoding="utf-8"))
    truth_all = json.loads(
        (ROOT / "corpus" / "TRUTH.json").read_text(encoding="utf-8"))

    corpus = "contracts" if "contract" in run["runbook"]["id"] else "inbox"
    truth = truth_all[corpus]

    per_field: dict[str, dict] = {}
    misses = []

    for rec in run["records"]:
        expected = truth.get(corpus_key(rec["file"]))
        if expected is None:
            continue
        got = rec.get("parsed") or {}

        for field, want in expected.items():
            slot = per_field.setdefault(field, {"right": 0, "total": 0})
            slot["total"] += 1
            have = got.get(field)

            if field == "counterparty":
                ok = (isinstance(have, str)
                      and want.lower()[:14] in have.lower())
            else:
                ok = have == want

            if ok:
                slot["right"] += 1
            else:
                misses.append({
                    "file": rec["file"], "field": field,
                    "expected": want, "got": have,
                })

    overall_right = sum(v["right"] for v in per_field.values())
    overall_total = sum(v["total"] for v in per_field.values())

    return {
        "run_id": run["run_id"],
        "model": run["model"]["name"],
        "corpus": corpus,
        "documents": len(run["records"]),
        "per_field": {
            k: {**v, "pct": round(100 * v["right"] / v["total"], 1)}
            for k, v in per_field.items()
        },
        "overall": {
            "right": overall_right, "total": overall_total,
            "pct": round(100 * overall_right / overall_total, 1)
            if overall_total else 0.0,
        },
        "misses": misses,
    }


def main() -> None:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "out" / "run-latest.json"
    s = score(path)

    print(f'{s["model"]}  {s["corpus"]}  {s["documents"]} documents')
    print()
    print(f'  {"field":<26} {"correct":>9}   {"":>6}')
    for field, v in s["per_field"].items():
        bar = "#" * round(v["pct"] / 5)
        print(f'  {field:<26} {v["right"]:>4}/{v["total"]:<4} {v["pct"]:>5.1f}%  {bar}')
    print()
    o = s["overall"]
    print(f'  {"OVERALL":<26} {o["right"]:>4}/{o["total"]:<4} {o["pct"]:>5.1f}%')

    if s["misses"]:
        print()
        print(f'  {len(s["misses"])} misses:')
        for m in s["misses"]:
            print(f'    {m["file"]:<42} {m["field"]}')
            print(f'      expected {m["expected"]!r}')
            print(f'      got      {m["got"]!r}')

    out = ROOT / "out" / f'score-{s["model"].replace(":", "-")}-{s["corpus"]}.json'
    out.write_text(json.dumps(s, indent=2) + "\n", encoding="utf-8")
    print()
    print(f'  -> {out}')


if __name__ == "__main__":
    main()
