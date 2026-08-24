"""Regex baseline for contract renewal dates.

    python3 tools/baseline_regex.py

This exists to answer one question honestly: is the model doing work a pattern
could have done?

The rules below are a genuine attempt, not a strawman. They cover the date
formats that actually appear in the corpus, in longhand and numeric form, and
they look for expiry wording near a date rather than grabbing the first date in
the file. If a regex can win here, it should win here.

What it cannot do is arithmetic it was never told to do. When a contract says it
renews on each anniversary of an execution date written in a signature block, the
renewal date is not in the document. It has to be computed. That is not a
pattern-matching problem, and no amount of additional patterns fixes it.

Scored against the same corpus/TRUTH.json the model is scored against, so the
comparison is like for like.
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

MONTHS = {m.lower(): i for i, m in enumerate(
    ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"], start=1)}
MONTH_RE = "|".join(MONTHS)

# "October 31, 2026"  /  "31 October 2026"
LONGHAND = re.compile(
    rf"\b(?:({MONTH_RE})\s+(\d{{1,2}}),?\s+(\d{{4}})"
    rf"|(\d{{1,2}})\s+({MONTH_RE})\s+(\d{{4}}))\b", re.IGNORECASE)

# Wording that signals the date on this line is an end or renewal date.
EXPIRY_CUE = re.compile(
    r"\b(expir\w*|end(?:s|ing)?|conclud\w*|terminat\w*|through|until|"
    r"ends?\s+on|renew\w*|lapses?)\b", re.IGNORECASE)

# Wording that signals a date is a START, so it is not the answer.
START_CUE = re.compile(
    r"\b(commenc\w*|begin\w*|start\w*|effective\s+date|from)\b", re.IGNORECASE)


def parse_dates(line: str) -> list[date]:
    out = []
    for m in LONGHAND.finditer(line):
        try:
            if m.group(1):
                out.append(date(int(m.group(3)), MONTHS[m.group(1).lower()],
                                int(m.group(2))))
            else:
                out.append(date(int(m.group(6)), MONTHS[m.group(5).lower()],
                                int(m.group(4))))
        except ValueError:
            continue
    return out


def baseline(text: str, today: date) -> str:
    """Best-effort renewal date from patterns alone."""
    candidates: list[date] = []

    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        dates = parse_dates(line)
        if not dates:
            continue

        has_expiry = bool(EXPIRY_CUE.search(line))
        has_start = bool(START_CUE.search(line))

        if has_expiry and not has_start:
            candidates.extend(dates)
        elif has_expiry and has_start and len(dates) >= 2:
            # "commences X and expires Y" - the later date is the end.
            candidates.append(max(dates))

    if not candidates:
        return "unknown"

    # The next end date that has not already passed, else the latest seen.
    future = sorted(d for d in candidates if d >= today)
    return (future[0] if future else max(candidates)).isoformat()


def main() -> None:
    truth = json.loads(
        (ROOT / "corpus" / "TRUTH.json").read_text(encoding="utf-8"))
    today = date.fromisoformat(truth["reference_date"])
    contracts = truth["contracts"]

    rows, right = [], 0
    by_basis: dict[str, dict] = {}

    for key, want in sorted(contracts.items()):
        text = (ROOT / "corpus" / key).read_text(encoding="utf-8")
        got = baseline(text, today)
        ok = got == want["renewal_date"]
        right += ok

        basis = want["renewal_basis"]
        slot = by_basis.setdefault(basis, {"right": 0, "total": 0})
        slot["total"] += 1
        slot["right"] += ok

        rows.append({
            "file": key, "basis": basis,
            "expected": want["renewal_date"], "got": got, "ok": ok,
            "expires_within_90_days": want["expires_within_90_days"],
        })

    total = len(rows)
    print(f"regex baseline, renewal_date, {total} contracts")
    print()
    print(f'  {"renewal_basis":<28} {"correct":>9}')
    for basis, v in sorted(by_basis.items()):
        pct = 100 * v["right"] / v["total"]
        print(f'  {basis:<28} {v["right"]:>4}/{v["total"]:<4} {pct:>5.1f}%')
    print()
    print(f'  {"OVERALL":<28} {right:>4}/{total:<4} {100*right/total:>5.1f}%')

    missed_expiring = [r for r in rows
                       if r["expires_within_90_days"] and not r["ok"]]
    print()
    print(f'  contracts expiring within 90 days that the baseline gets wrong: '
          f'{len(missed_expiring)}')
    for r in missed_expiring:
        name = r["file"].replace("contracts/", "")
        print(f'    {name:<40} {r["basis"]:<26} '
              f'want {r["expected"]}  got {r["got"]}')

    out = ROOT / "out" / "baseline-regex.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps({
        "reference_date": truth["reference_date"],
        "overall": {"right": right, "total": total,
                    "pct": round(100 * right / total, 1)},
        "by_basis": {k: {**v, "pct": round(100 * v["right"] / v["total"], 1)}
                     for k, v in by_basis.items()},
        "missed_expiring": missed_expiring,
        "rows": rows,
    }, indent=2) + "\n", encoding="utf-8")
    print()
    print(f"  -> {out}")


if __name__ == "__main__":
    main()
