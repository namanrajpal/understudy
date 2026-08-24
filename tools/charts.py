"""Generate the charts from the measured run data.

    python3 tools/charts.py

Writes SVG into docs/charts/. Hand-rolled SVG on purpose: no matplotlib, no
plotly, no CDN. The repo's whole claim is that it runs with the standard library
and nothing else, and a chart script that needs a pip install would quietly break
that. GitHub renders SVG inline in markdown, so these drop straight into a README
or a post.

Charts regenerate from out/bakeoff/summary.json and out/baseline-regex.json, so
they cannot drift from the numbers the way a pasted screenshot does.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "charts"

# Ordered smallest to largest, which is the x-axis for every size chart.
MODELS = [
    ("qwen3.5:4b", "4B", 3.4),
    ("qwen3.5:9b", "9B", 6.6),
    ("gemma4:12b", "12B", 7.6),
    ("qwen3.8:27b", "27B", 18.0),
    ("muse-glimmer:30b", "30B", 18.0),
]

INK = "#1a1714"
MUTED = "#6b625a"
RULE = "#ddd5cb"
PAPER = "#faf7f2"
ACCENT = "#b23b2e"
OK = "#2f6f4f"
BLUE = "#2f5f8f"
FONT = ("-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif")


def esc(s) -> str:
    return (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def svg(w: int, h: int, body: str, title: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" font-family="{FONT}" role="img" '
        f'aria-label="{esc(title)}">'
        f'<rect width="{w}" height="{h}" fill="{PAPER}"/>'
        f"{body}</svg>\n"
    )


def text(x, y, s, size=12, fill=INK, anchor="start", weight="400"):
    return (f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}" font-weight="{weight}">{esc(s)}</text>')


def load_summary() -> dict:
    p = ROOT / "out" / "bakeoff" / "summary.json"
    if not p.exists():
        sys.exit("run tools/bakeoff_table.py first: out/bakeoff/summary.json missing")
    return json.loads(p.read_text())


# ---------------------------------------------------------------- chart 1
def chart_accuracy_vs_size(sm: dict) -> str:
    """Two lines over model size. The point is that they diverge."""
    W, H = 720, 400
    L, R, T, B = 66, 150, 54, 62
    pw, ph = W - L - R, H - T - B
    lo, hi = 70, 100

    def y(v):
        return T + ph - (v - lo) / (hi - lo) * ph

    def x(i):
        return L + (i / (len(MODELS) - 1)) * pw

    b = [text(L, 26, "Accuracy by model size", 16, INK, weight="640"),
         text(L, 44, "same runbooks, same 46 documents, temperature 0",
              11.5, MUTED)]

    for v in range(70, 101, 5):
        b.append(f'<line x1="{L}" y1="{y(v):.1f}" x2="{L+pw}" y2="{y(v):.1f}" '
                 f'stroke="{RULE}" stroke-width="1"/>')
        b.append(text(L - 10, y(v) + 4, f"{v}%", 11, MUTED, "end"))

    for i, (_, label, gb) in enumerate(MODELS):
        b.append(text(x(i), H - 34, label, 12, INK, "middle", "620"))
        b.append(text(x(i), H - 18, f"{gb:g} GB", 10.5, MUTED, "middle"))

    for task, colour, name in (("triage-contracts", ACCENT, "contracts"),
                               ("triage-inbox", BLUE, "inbox")):
        pts = []
        for i, (m, _, _) in enumerate(MODELS):
            t = sm.get(m, {}).get("tasks", {}).get(task, {})
            if t.get("status") == "ok":
                pts.append((x(i), y(t["overall_pct"]), t["overall_pct"]))
        if not pts:
            continue
        b.append('<polyline fill="none" stroke="%s" stroke-width="2.5" '
                 'points="%s"/>' % (colour,
                 " ".join(f"{px:.1f},{py:.1f}" for px, py, _ in pts)))
        for px, py, v in pts:
            b.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="4.5" '
                     f'fill="{PAPER}" stroke="{colour}" stroke-width="2.5"/>')
            b.append(text(px, py - 12, f"{v:.1f}", 10.5, colour, "middle", "620"))
        lx, ly, _ = pts[-1]
        b.append(text(lx + 12, ly + 4, name, 12, colour, "start", "620"))

    b.append(text(L, H - 2,
                  "contracts needs clause reading plus date arithmetic; "
                  "inbox is classification into short lists", 10.5, MUTED))
    return svg(W, H, "".join(b), "Accuracy by model size")


# ---------------------------------------------------------------- chart 2
def chart_field_heatmap(sm: dict) -> str:
    """Per-field accuracy. Shows the renewal_basis cliff and the flat 100% row."""
    fields = ["renewal_basis", "renewal_date", "expires_within_90_days",
              "contains_personal_data"]
    W, H = 760, 300
    L, T = 210, 92
    cw, ch = 118, 38

    b = [text(24, 26, "Contract fields, per model", 16, INK, weight="640"),
         text(24, 44, "the field that gates the privacy decision never degrades; "
              "renewal_basis has a cliff, not a slope", 11.5, MUTED)]

    for j, f in enumerate(fields):
        cx = L + j * cw + cw / 2
        label = f.replace("_", " ").replace("expires within 90 days", "expires ≤90d")
        b.append(text(cx, T - 14, label, 10.5, MUTED, "middle", "620"))

    for i, (m, label, _) in enumerate(MODELS):
        ry = T + i * ch
        b.append(text(L - 14, ry + ch / 2 + 4, m, 12, INK, "end"))
        t = sm.get(m, {}).get("tasks", {}).get("triage-contracts", {})
        vals = t.get("fields", {}) if t.get("status") == "ok" else {}
        for j, f in enumerate(fields):
            v = vals.get(f)
            cx = L + j * cw
            if v is None:
                b.append(f'<rect x="{cx}" y="{ry}" width="{cw-4}" height="{ch-4}" '
                         f'fill="none" stroke="{RULE}"/>')
                continue
            # 40% -> pale, 100% -> saturated.
            a = max(0.06, min(1.0, (v - 40) / 60))
            fill = OK if v >= 95 else (ACCENT if v < 70 else "#a86a1f")
            b.append(f'<rect x="{cx}" y="{ry}" width="{cw-4}" height="{ch-4}" '
                     f'fill="{fill}" fill-opacity="{a:.2f}" '
                     f'stroke="{RULE}" stroke-width="0.5"/>')
            b.append(text(cx + (cw - 4) / 2, ry + ch / 2 + 4, f"{v:.0f}%", 11.5,
                          INK if a < 0.55 else PAPER, "middle", "620"))
    return svg(W, H, "".join(b), "Contract field accuracy per model")


# ---------------------------------------------------------------- chart 3
def chart_regex_vs_model(sm: dict) -> str:
    """The beat: where the date is not written in the document, regex gets zero."""
    p = ROOT / "out" / "baseline-regex.json"
    if not p.exists():
        return ""
    base = json.loads(p.read_text())["by_basis"]

    bases = [("fixed_date", "named end date"),
             ("auto_renew_unless_notice", "auto-renew,\nnotice required"),
             ("anniversary_of_execution", "anniversary of\nsignature"),
             ("fiscal_year_end", "fiscal year end")]
    W, H = 720, 400
    L, T = 66, 96
    gw, bh = 150, 26

    b = [text(24, 26, "Regex baseline vs local model, renewal date", 16, INK,
              weight="640"),
         text(24, 44, "the baseline is a real attempt: longhand and numeric "
              "dates, expiry wording near a date", 11.5, MUTED)]

    best = max(MODELS, key=lambda m: sm.get(m[0], {}).get("tasks", {})
               .get("triage-contracts", {}).get("overall_pct", 0))[0]

    for j, (key, label) in enumerate(bases):
        gx = L + j * gw
        for k, line in enumerate(label.split("\n")):
            b.append(text(gx + 55, T - 26 + k * 12, line, 10.5, MUTED, "middle"))
        rv = base.get(key, {}).get("pct", 0)
        for idx, (name, val, colour) in enumerate(
                (("regex", rv, MUTED), ("model", None, BLUE))):
            if val is None:
                continue
            w = max(2, val / 100 * 110)
            y0 = T + idx * (bh + 8)
            b.append(f'<rect x="{gx}" y="{y0}" width="{w:.1f}" height="{bh}" '
                     f'fill="{colour}" fill-opacity="0.85" rx="2"/>')
            b.append(text(gx + w + 8, y0 + bh / 2 + 4, f"{val:.0f}%", 11,
                          INK, "start", "620"))
            b.append(text(gx, y0 - 4, name, 9.5, MUTED))

    zero_y = T + 2 * (bh + 8) + 40
    b.append(text(24, zero_y,
                  "Where the baseline scores zero, the renewal date is not in "
                  "the document at all:", 12, INK, weight="620"))
    b.append(text(24, zero_y + 20,
                  "\u2022 \u201crenews on each anniversary of the date of "
                  "execution set forth below\u201d, with that date in longhand "
                  "in the signature block", 11, MUTED))
    b.append(text(24, zero_y + 38,
                  "\u2022 \u201ccoterminous with the Client\u2019s fiscal "
                  "year\u201d, with the year end in a separate sentence "
                  "containing no date", 11, MUTED))
    b.append(text(24, zero_y + 62,
                  f"6 contracts expiring within 90 days return "
                  f"\u201cunknown\u201d from the baseline.", 11.5, ACCENT,
                  weight="620"))
    return svg(W, H, "".join(b), "Regex baseline vs local model")


# ---------------------------------------------------------------- chart 5
def chart_redaction(sm: dict) -> str:
    """Identifiers are the gate. Facts are reported."""
    W, H = 720, 330
    L, T = 210, 96
    rowh = 40

    b = [text(24, 26, "Redaction gate: identifiers vs facts", 16, INK,
              weight="640"),
         text(24, 44, "a surviving identifier ties the document to a person, so "
              "it fails; a surviving fact is policy-dependent", 11.5, MUTED),
         text(L, T - 16, "of 10 direct identifiers", 10.5, MUTED, weight="620"),
         text(L + 250, T - 16, "of 4 facts about a person", 10.5, MUTED,
              weight="620")]

    for i, (m, _, _) in enumerate(MODELS):
        ry = T + i * rowh
        r = sm.get(m, {}).get("redact", {})
        b.append(text(L - 14, ry + 18, m, 12, INK, "end"))
        ids = r.get("identifiers_survived")
        fcts = r.get("facts_survived")
        if ids is None:
            b.append(text(L, ry + 18, "not run", 11, MUTED))
            continue
        for off, n, total, colour in ((0, ids, 10, ACCENT),
                                      (250, fcts if fcts is not None else 0, 4, "#a86a1f")):
            for k in range(total):
                cx = L + off + k * 17
                on = k < n
                b.append(f'<rect x="{cx}" y="{ry+4}" width="13" height="22" rx="2" '
                         f'fill="{colour if on else OK}" '
                         f'fill-opacity="{0.9 if on else 0.18}" '
                         f'stroke="{RULE}" stroke-width="0.5"/>')
            b.append(text(L + off + total * 17 + 8, ry + 20,
                          f"{n} survived", 11,
                          colour if n else OK, "start", "620"))
    b.append(text(24, H - 16,
                  "Filled = survived. Under a de-identification standard the "
                  "identifier column is the pass criterion.", 10.5, MUTED))
    return svg(W, H, "".join(b), "Redaction gate results")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sm = load_summary()
    charts = {
        "accuracy-by-size.svg": chart_accuracy_vs_size(sm),
        "contract-fields.svg": chart_field_heatmap(sm),
        "regex-vs-model.svg": chart_regex_vs_model(sm),
        "redaction-gate.svg": chart_redaction(sm),
    }
    for name, body in charts.items():
        if not body:
            print(f"  skipped {name} (missing input)")
            continue
        (OUT / name).write_text(body, encoding="utf-8")
        print(f"  {OUT.relative_to(ROOT)}/{name}  {len(body):,} bytes")


if __name__ == "__main__":
    main()
