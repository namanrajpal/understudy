"""Build the runbook-quality ladder table from out/ablation/.

    python3 tools/ablation_table.py

Re-scores every run file directly rather than reading the per-rung score text,
because score.py writes its JSON keyed on model and corpus alone, so rungs of
the same model overwrite each other. Reading the run files is the only way to
get all four rungs.

Reports the delta between adjacent rungs, which is the number the experiment
exists to produce: what one named piece of specification was worth.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from score import score  # noqa: E402

OUT = ROOT / "out" / "ablation"
RUNGS = ["v0", "v1", "v2", "v3"]

# What each rung added, read from the generated runbook so this cannot drift
# from what was actually run.
def rung_label(task: str, rung: str) -> str:
    if rung == "v3":
        return "committed runbook"
    p = ROOT / "runbooks" / "ablation" / f"{task}.{rung}.json"
    if not p.exists():
        return "?"
    return json.loads(p.read_text(encoding="utf-8"))["ablation"]["gained_at_this_rung"]


def main() -> None:
    # Discover from filenames: run-<slug>-<task>-<rung>.json
    found: dict[tuple[str, str, str], Path] = {}
    for p in sorted(OUT.glob("run-*-*.json")):
        stem = p.stem[len("run-"):]
        for task in ("triage-contracts", "triage-inbox"):
            for rung in RUNGS:
                if stem.endswith(f"-{task}-{rung}"):
                    slug = stem[: -len(f"-{task}-{rung}")]
                    found[(slug, task, rung)] = p

    slugs = sorted({k[0] for k in found})
    if not slugs:
        print("  no ablation runs found in out/ablation/")
        return

    lines = []
    for task in ("triage-inbox", "triage-contracts"):
        lines.append("")
        lines.append(f"{task}   what the specification was worth")
        lines.append("")
        header = f'  {"rung":<5} {"added at this rung":<58}'
        for slug in slugs:
            header += f' {slug:>18}'
        lines.append(header)

        prev: dict[str, float] = {}
        for rung in RUNGS:
            row = f'  {rung:<5} {rung_label(task, rung)[:58]:<58}'
            for slug in slugs:
                p = found.get((slug, task, rung))
                if p is None:
                    row += f' {"--":>18}'
                    continue
                s = score(p)
                pct = s["overall"]["pct"]
                delta = ""
                if slug in prev:
                    d = pct - prev[slug]
                    delta = f' {d:+.1f}'
                prev[slug] = pct
                row += f' {pct:>10.1f}%{delta:>7}'
            lines.append(row)

        # Total climb, bare schema to committed runbook.
        total = f'  {"":<5} {"total climb, v0 to v3":<58}'
        for slug in slugs:
            a = found.get((slug, task, "v0"))
            b = found.get((slug, task, "v3"))
            if a and b:
                d = score(b)["overall"]["pct"] - score(a)["overall"]["pct"]
                total += f' {d:>17.1f}'
            else:
                total += f' {"--":>18}'
        lines.append("")
        lines.append(total)

    lines.append("")
    lines.append("  Rungs v0 to v2 are RE-DERIVED reconstructions, not the original")
    lines.append("  measurement. The underspecified runbook was never committed, so the")
    lines.append("  54.0% and 77.6% figures in docs/FINDINGS.md are not reproducible and")
    lines.append("  these numbers do not attempt to reproduce them. v3 is the committed")
    lines.append("  runbook, so its scores should match the bake-off.")
    lines.append("")

    text = "\n".join(lines)
    print(text)
    dest = OUT / "ladder.txt"
    dest.write_text(text + "\n", encoding="utf-8")
    print(f"  -> {dest.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
