#!/usr/bin/env python3
"""Generate the architecture diagram as two transparent SVGs, light and dark.

GitHub strips <style> and inline CSS from markdown, so a diagram cannot be
authored as HTML. It also renders an <img>-loaded SVG in its own context, which
means the SVG cannot inherit the page's text colour with currentColor. The
working approach is two files with a transparent background, selected by the
reader's theme with <picture> and prefers-color-scheme, which GitHub supports.

Standard library only. Run: python3 tools/diagram.py
"""

import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "docs" / "charts"

W, H = 860, 330
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
MONO = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace"

# Two palettes. Neither paints a background rect, so both are transparent and
# sit on whatever GitHub, Pages, or the portfolio renders behind them.
LIGHT = {
    "ink": "#1a1714",
    "muted": "#6b625a",
    "rule": "#c9c0b5",
    "remote": "#2f5f8f",
    "local": "#b23b2e",
}
DARK = {
    "ink": "#e8e3dc",
    "muted": "#a39a90",
    "rule": "#4d463f",
    "remote": "#7fb0e0",
    "local": "#e0907f",
}

# Boxes: (x, y, w, h). Top band holds the work that happens once; the bottom
# band holds the work that happens on every run, inside the machine boundary.
A = (40, 44, 200, 70)    # frontier model
B = (330, 44, 200, 70)   # runbooks/*.json
C = (40, 196, 180, 82)   # corpus/
D = (300, 196, 200, 82)  # local model
E = (580, 196, 240, 82)  # out/report.html
BOUNDARY = (24, 168, 812, 134)


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def text(x, y, s, size=11, fill="muted", weight=400, anchor="middle", mono=False):
    fam = f' font-family="{MONO}"' if mono else ""
    return (
        f'<text x="{x}" y="{y}" font-size="{size}" fill="{{{fill}}}" '
        f'text-anchor="{anchor}" font-weight="{weight}"{fam}>{esc(s)}</text>'
    )


def box(rect, title, subs, accent="rule", title_mono=False):
    x, y, w, h = rect
    cx = x + w / 2
    out = [
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="none" '
        f'stroke="{{{accent}}}" stroke-width="1.25"/>'
    ]
    # Title sits above the subtitle block; both are centred as a group.
    top = y + (h - (18 + 14 * len(subs))) / 2 + 14
    out.append(text(cx, top, title, size=13.5, fill="ink", weight=640, mono=title_mono))
    for i, s in enumerate(subs):
        out.append(text(cx, top + 18 + 14 * i, s, size=10.5, fill="muted"))
    return "".join(out)


def harrow(x1, x2, y, colour="rule"):
    return (
        f'<line x1="{x1}" y1="{y}" x2="{x2 - 7}" y2="{y}" stroke="{{{colour}}}" '
        f'stroke-width="1.25" marker-end="url(#a-{colour})"/>'
    )


def varrow(x, y1, y2, colour="rule"):
    return (
        f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2 - 7}" stroke="{{{colour}}}" '
        f'stroke-width="1.25" marker-end="url(#a-{colour})"/>'
    )


def build():
    p = []
    p.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" font-family="{FONT}" role="img" '
        f'aria-label="A frontier model authors a runbook once. A small local '
        f'model executes it over 46 documents on your own machine, producing a '
        f'renewal calendar, a routing report and a redaction gate.">'
    )
    p.append("<defs>")
    for name in ("rule", "remote", "local"):
        p.append(
            f'<marker id="a-{name}" viewBox="0 0 8 8" refX="7" refY="4" '
            f'markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            f'<path d="M0 0.5 L8 4 L0 7.5 z" fill="{{{name}}}"/></marker>'
        )
    p.append("</defs>")

    # Band labels.
    p.append(text(40, 26, "ONCE, WITH A CAPABLE MODEL", size=10, fill="remote",
                  weight=680, anchor="start"))
    p.append(text(820, 26, "the only step that needs a large model", size=10.5,
                  fill="muted", anchor="end"))

    # Top band: frontier model authors the runbook.
    p.append(box(A, "frontier model", ["writes the plan one time"], accent="remote"))
    p.append(box(B, "runbooks/*.json", ["steps, output schema, checks,",
                                        "what to do on failure"],
                 accent="remote", title_mono=True))
    p.append(harrow(A[0] + A[2], B[0], A[1] + A[3] / 2, colour="remote"))

    # The machine boundary.
    bx, by, bw, bh = BOUNDARY
    p.append(
        f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="10" fill="none" '
        f'stroke="{{local}}" stroke-width="1.25" stroke-dasharray="5 4" '
        f'opacity="0.75"/>'
    )
    p.append(text(bx + 14, by + 20, "EVERY RUN, ON YOUR MACHINE", size=10,
                  fill="local", weight=680, anchor="start"))
    p.append(text(bx + bw - 14, by + 20,
                  "Ollama on loopback. Nothing in corpus/ leaves the machine.",
                  size=10.5, fill="muted", anchor="end"))

    # The runbook crosses into the boundary and is read on every run.
    p.append(varrow(D[0] + D[2] / 2, B[1] + B[3], D[1], colour="remote"))
    p.append(text(D[0] + D[2] / 2 + 12, (B[1] + B[3] + D[1]) / 2 + 4,
                  "read every run", size=10.5, fill="muted", anchor="start"))

    # Bottom band: corpus, local model, deliverable.
    p.append(box(C, "corpus/", ["46 documents"], title_mono=True))
    p.append(box(D, "local model", ["one call per document,",
                                    "supplying the judgment"], accent="local"))
    p.append(box(E, "out/report.html", ["renewal calendar, routing report,",
                                        "redaction gate with a survival scan"],
                 title_mono=True))
    p.append(harrow(C[0] + C[2], D[0], C[1] + C[3] / 2))
    p.append(harrow(D[0] + D[2], E[0], D[1] + D[3] / 2))

    # Closing line under the boundary.
    p.append(text(W / 2, H - 10,
                  "Reasoning that happens once lives in the runbook. "
                  "Reasoning that happens every run happens on your hardware.",
                  size=11, fill="muted"))
    p.append("</svg>")
    return "".join(p)


def main():
    template = build()
    for name, palette in (("light", LIGHT), ("dark", DARK)):
        svg = template.format(**palette)
        path = OUT / f"architecture-{name}.svg"
        path.write_text(svg, encoding="utf-8")
        print(f"wrote {path}  ({len(svg)} bytes)")


if __name__ == "__main__":
    main()
