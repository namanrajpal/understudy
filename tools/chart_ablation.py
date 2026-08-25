"""Chart the runbook-quality ablation ladder.

    python3 tools/chart_ablation.py    ->  docs/charts/runbook-ladder.svg

Two panels, one per task, four rungs each, two model lines. The shape is the
argument: inbox climbs steeply and the two models converge, so that task is
limited by the specification. Contracts climbs shallowly and the two models stay
far apart, so that task is limited by the model.

Reuses the palette and helpers from tools/charts.py so this chart cannot drift
from the other four. Re-scores the run files directly rather than reading
score.py's JSON output, because score.py keys its output on model and corpus
alone and the four rungs of one model would overwrite each other.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from charts import ACCENT, BLUE, INK, MUTED, RULE, svg, text  # noqa: E402
from score import score  # noqa: E402

OUT = ROOT / "docs" / "charts"
RUNS = ROOT / "out" / "ablation"

RUNGS = ["v0", "v1", "v2", "v3"]
SLUGS = [("gemma4-12b", "gemma4:12b", ACCENT), ("qwen3.5-4b", "qwen3.5:4b", BLUE)]

# Short forms of each rung's ablation.gained_at_this_rung, which is too long to
# sit under an axis tick. The runbooks carry the full wording.
LABELS = {
    "triage-inbox": ["bare schema", "+ field\ndefinitions",
                     "+ urgency\nvalues", "+ reference\ndate"],
    "triage-contracts": ["bare schema", "+ field\ndefinitions",
                         "+ counterparty\nperspective", "+ date\nrules"],
}
PANEL_TITLE = {
    "triage-inbox": "inbox triage, 25 emails",
    "triage-contracts": "contract triage, 21 contracts",
}
# What the ladder is being compared against: the gain from upgrading the model
# while holding the runbook at v3. Computed, not hardcoded.
LO, HI = 50, 100


def read_scores() -> dict:
    """{(slug, task, rung): pct}. Missing runs are simply absent."""
    out = {}
    for slug, _, _ in SLUGS:
        for task in LABELS:
            for rung in RUNGS:
                p = RUNS / f"run-{slug}-{task}-{rung}.json"
                if p.exists():
                    out[(slug, task, rung)] = score(p)["overall"]["pct"]
    return out


def panel(sc: dict, task: str, x0: int, y0: int, pw: int, ph: int) -> str:
    def y(v):
        return y0 + ph - (v - LO) / (HI - LO) * ph

    def x(i):
        return x0 + 34 + (i / (len(RUNGS) - 1)) * (pw - 54)

    b = [text(x0, y0 - 14, PANEL_TITLE[task], 12.5, INK, weight="640")]

    for v in range(LO, HI + 1, 10):
        b.append(f'<line x1="{x0 + 20}" y1="{y(v):.1f}" x2="{x0 + pw}" '
                 f'y2="{y(v):.1f}" stroke="{RULE}" stroke-width="1"/>')
        b.append(text(x0 + 14, y(v) + 4, f"{v}%", 10.5, MUTED, "end"))

    for i, lab in enumerate(LABELS[task]):
        for j, line in enumerate(lab.split("\n")):
            b.append(text(x(i), y0 + ph + 18 + j * 11, line, 9.5, MUTED, "middle"))
        b.append(text(x(i), y0 + ph + 44, RUNGS[i], 10, INK, "middle", "640"))

    for slug, _, colour in SLUGS:
        pts = [(x(i), y(sc[(slug, task, r)]), sc[(slug, task, r)])
               for i, r in enumerate(RUNGS) if (slug, task, r) in sc]
        if len(pts) < 2:
            continue
        path = " ".join(f'{"M" if k == 0 else "L"}{px:.1f},{py:.1f}'
                        for k, (px, py, _) in enumerate(pts))
        b.append(f'<path d="{path}" fill="none" stroke="{colour}" '
                 f'stroke-width="2.2"/>')
        for px, py, val in pts:
            b.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="3.6" '
                     f'fill="{colour}"/>')
            b.append(text(px, py - 10, f"{val:.1f}", 10, colour, "middle", "640"))

    # The comparison that makes the panel mean something: spec climb against
    # what a model upgrade bought at the same top rung.
    g0, g3 = sc.get(("gemma4-12b", task, "v0")), sc.get(("gemma4-12b", task, "v3"))
    q3 = sc.get(("qwen3.5-4b", task, "v3"))
    if None not in (g0, g3, q3):
        spec, model = g3 - g0, g3 - q3
        verdict = "specification-limited" if spec > model else "model-limited"
        b.append(text(x0 + 20, y0 + ph + 62,
                      f"runbook worth {spec:+.1f}   model upgrade worth "
                      f"{model:+.1f}   {verdict}", 10.5, INK, weight="600"))
    return "".join(b)


def main() -> None:
    sc = read_scores()
    if not sc:
        sys.exit("no ablation runs in out/ablation/. Run: bash tools/ablation.sh")

    W, H = 940, 430
    pw, ph = 388, 236
    b = [text(46, 30, "What the runbook is worth", 16.5, INK, weight="640"),
         text(46, 49, "same model, same documents, same code. Only the "
                      "specification changes.", 11.5, MUTED)]

    for k, (_, name, colour) in enumerate(SLUGS):
        cx = 640 + k * 148
        b.append(f'<line x1="{cx}" y1="34" x2="{cx + 20}" y2="34" '
                 f'stroke="{colour}" stroke-width="2.4"/>')
        b.append(text(cx + 26, 38, name, 11, INK))

    b.append(panel(sc, "triage-inbox", 46, 96, pw, ph))
    b.append(panel(sc, "triage-contracts", 506, 96, pw, ph))
    b.append(text(46, H - 12, "Rungs v0 to v2 are reconstructions of the "
                              "underspecified runbook, re-derived by "
                              "tools/ablation_runbooks.py. v3 is the committed "
                              "runbook.", 10, MUTED))

    OUT.mkdir(parents=True, exist_ok=True)
    body = svg(W, H, "".join(b), "Runbook quality ablation: accuracy by "
                                 "specification completeness, two tasks, "
                                 "two models")
    dest = OUT / "runbook-ladder.svg"
    dest.write_text(body, encoding="utf-8")
    print(f"  {dest.relative_to(ROOT)}  {len(body):,} bytes")


if __name__ == "__main__":
    main()
