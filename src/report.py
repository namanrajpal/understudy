"""Render a run as a single self-contained HTML page.

    python3 src/report.py out/run-latest.json
    python3 src/report.py out/run-inbox.json out/run-contracts.json out/run-redact.json

No network, no CDN, no build step. One file you can open, or commit, or hand to
someone. That constraint is not decoration: a page that fetches a font would
undercut the claim the run makes.

The page is meant to read like something a person would produce after a day of
work, because that is the comparison the audience makes without being asked.
"""

import html
import json
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CSS = """
:root{--ink:#1a1714;--mid:#6b625a;--rule:#ddd5cb;--paper:#faf7f2;
--panel:#fff;--flag:#b23b2e;--ok:#2f6f4f;--warn:#a86a1f}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif}
.wrap{max-width:1080px;margin:0 auto;padding:48px 32px 96px}
h1{font-size:30px;letter-spacing:-.02em;margin:0 0 6px;font-weight:640}
h2{font-size:19px;letter-spacing:-.01em;margin:44px 0 14px;font-weight:620;
padding-bottom:8px;border-bottom:1px solid var(--rule)}
h3{font-size:14px;margin:26px 0 8px;font-weight:620;color:var(--mid);
text-transform:uppercase;letter-spacing:.07em}
.sub{color:var(--mid);margin:0 0 4px}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px}
table{width:100%;border-collapse:collapse;margin:10px 0 4px;background:var(--panel)}
th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;
color:var(--mid);padding:9px 10px;border-bottom:1px solid var(--rule);font-weight:620}
td{padding:9px 10px;border-bottom:1px solid #efe9e1;vertical-align:top}
tr:last-child td{border-bottom:none}
td.n{text-align:right;font-variant-numeric:tabular-nums}
.flag{color:var(--flag);font-weight:620}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));
gap:12px;margin:18px 0}
.card{background:var(--panel);border:1px solid var(--rule);border-radius:6px;padding:14px 16px}
.card .k{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--mid)}
.card .v{font-size:25px;font-weight:640;letter-spacing:-.02em;margin-top:3px;
font-variant-numeric:tabular-nums}
.card .n{font-size:12px;color:var(--mid);margin-top:2px}
.chk{display:flex;gap:9px;padding:7px 0;align-items:baseline;
border-bottom:1px solid #efe9e1}
.chk:last-child{border-bottom:none}
.badge{font-size:10.5px;font-weight:700;letter-spacing:.06em;padding:2px 7px;
border-radius:3px;flex:none;min-width:44px;text-align:center}
.pass{background:#e6f0e9;color:var(--ok)}
.fail{background:#f7e4e1;color:var(--flag)}
.chk .id{font-weight:620;min-width:150px;flex:none}
.chk .d{color:var(--mid);font-size:13.5px}
.sbs{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:10px 0 22px}
.sbs>div{background:var(--panel);border:1px solid var(--rule);border-radius:6px;
padding:14px 16px;overflow-x:auto}
.sbs h4{margin:0 0 9px;font-size:11px;text-transform:uppercase;
letter-spacing:.06em;color:var(--mid);font-weight:620}
pre{margin:0;white-space:pre-wrap;word-break:break-word;
font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.5}
mark{background:#fde8d7;color:#8a4418;border-radius:2px;padding:0 2px;font-weight:600}
.gone{background:#e9efe9;color:var(--ok);border-radius:2px;padding:0 3px;font-weight:640}
.note{background:#fff;border-left:3px solid var(--rule);padding:12px 16px;
margin:16px 0;color:var(--mid);font-size:13.5px}
.split{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bar{height:6px;background:#ece5db;border-radius:3px;overflow:hidden;margin-top:5px}
.bar>i{display:block;height:100%;background:var(--ink)}
footer{margin-top:56px;padding-top:18px;border-top:1px solid var(--rule);
color:var(--mid);font-size:12.5px}
"""


def esc(s) -> str:
    return html.escape(str(s if s is not None else ""))


def card(k: str, v, note: str = "") -> str:
    return (f'<div class="card"><div class="k">{esc(k)}</div>'
            f'<div class="v">{esc(v)}</div>'
            + (f'<div class="n">{esc(note)}</div>' if note else "")
            + "</div>")


def checks_block(run: dict) -> str:
    rows = []
    for c in run["checks"]["details"]:
        cls = "pass" if c["passed"] else "fail"
        label = "PASS" if c["passed"] else "FAIL"
        extra = ""
        if not c["passed"] and c["failures"]:
            items = "".join(
                f"<li>{esc(f if isinstance(f, str) else f.get('text', f)) }</li>"
                for f in c["failures"][:6])
            extra = f'<ul class="mono" style="margin:6px 0 0">{items}</ul>'
        rows.append(
            f'<div class="chk"><span class="badge {cls}">{label}</span>'
            f'<span class="id mono">{esc(c["id"])}</span>'
            f'<span class="d">{esc(c["detail"])}{extra}</span></div>')
    return "".join(rows)


def triage_table(run: dict) -> str:
    """Records table. Columns come from the runbook's report block."""
    recs = [r for r in run["records"] if r.get("parsed")]
    if not recs:
        return "<p class='sub'>No records.</p>"

    fields = [k for k in recs[0]["parsed"].keys() if k != "redacted_text"]
    fields = [f for f in fields if f != "removals"]

    head = "".join(f"<th>{esc(f.replace('_', ' '))}</th>" for f in fields)
    body = []
    for r in recs:
        p = r["parsed"]
        flagged = p.get("expires_within_90_days") is True or \
            p.get("urgency") == "today"
        name = r["file"].split("/")[-1]
        cells = []
        for f in fields:
            v = p.get(f)
            v = {True: "yes", False: "no"}.get(v, v)
            cls = ' class="flag"' if (
                flagged and f in {"expires_within_90_days", "urgency",
                                  "renewal_date"}) else ""
            cells.append(f"<td{cls}>{esc(v)}</td>")
        body.append(f'<tr><td class="mono">{esc(name)}</td>{"".join(cells)}</tr>')

    return (f"<table><thead><tr><th>file</th>{head}</tr></thead>"
            f"<tbody>{''.join(body)}</tbody></table>")


def redaction_block(run: dict) -> str:
    """Original beside redacted, with removals highlighted on both sides."""
    out = []
    for r in run["records"]:
        p = r.get("parsed") or {}
        if "redacted_text" not in p:
            continue
        name = r["file"].split("/")[-1]
        original = (ROOT / r["file"]).read_text(encoding="utf-8") \
            if (ROOT / r["file"]).exists() else ""

        # Rebuild the loader's view so the two panes line up.
        if r["file"].endswith(".eml"):
            from loaders import load_eml
            original = load_eml(ROOT / r["file"])["text"]

        left = esc(original)
        for rem in sorted(p.get("removals", []),
                          key=lambda x: len(x.get("text", "")), reverse=True):
            t = esc(rem.get("text", ""))
            if t and t in left:
                left = left.replace(t, f"<mark>{t}</mark>")

        right = esc(p["redacted_text"])
        for kind in {rem.get("kind", "") for rem in p.get("removals", [])}:
            tag = esc(f"[{kind.upper()}]")
            right = right.replace(tag, f'<span class="gone">{tag}</span>')

        kinds = {}
        for rem in p.get("removals", []):
            kinds[rem.get("kind", "?")] = kinds.get(rem.get("kind", "?"), 0) + 1
        legend = ", ".join(f"{k} x{v}" for k, v in sorted(kinds.items()))

        out.append(
            f'<h3>{esc(name)}</h3>'
            f'<p class="sub mono">{esc(len(p.get("removals", [])))} spans removed: '
            f'{esc(legend)}</p>'
            f'<div class="sbs"><div><h4>original, stays on this machine</h4>'
            f'<pre>{left}</pre></div>'
            f'<div><h4>redacted, safe to send outside</h4>'
            f'<pre>{right}</pre></div></div>')
    return "".join(out)


def comparative(run: dict) -> str:
    """Frontier work beside local work.

    SPEC.md forbids a ratio or an equivalence line here. Tokens are not fungible
    across models: a frontier token doing architectural design is not the same
    unit as a local token doing field extraction. The claim is amortization, so
    the panel states what each did and when, and stops there.
    """
    l, f = run["local"], run["frontier"]
    ft = "not recorded" if f.get("prompt_tokens") is None else \
        f'{f["prompt_tokens"]:,} in / {f["output_tokens"]:,} out'
    return f"""
<div class="split">
  <div>
    <h3>Decided once, by a frontier model</h3>
    <table><tbody>
      <tr><td>calls</td><td class="n">{esc(f["calls"])}</td></tr>
      <tr><td>tokens</td><td class="n">{esc(ft)}</td></tr>
      <tr><td>when</td><td>{esc(f["when"])}</td></tr>
      <tr><td>during this run</td><td>0 calls</td></tr>
    </tbody></table>
    <p class="sub" style="font-size:13px">{esc(f["note"])}</p>
  </div>
  <div>
    <h3>Decided every run, by a local model</h3>
    <table><tbody>
      <tr><td>calls</td><td class="n">{esc(l["calls"])}</td></tr>
      <tr><td>tokens</td><td class="n">{l["prompt_tokens"]:,} in / {l["output_tokens"]:,} out</td></tr>
      <tr><td>throughput</td><td class="n">{esc(l["tokens_per_second"])} tok/sec</td></tr>
      <tr><td>wall clock</td><td class="n">{esc(l["wall_seconds"])}s</td></tr>
    </tbody></table>
    <p class="sub" style="font-size:13px">Token counts measured by Ollama,
    not estimated. Ran on local hardware, one call per document.</p>
  </div>
</div>
<div class="note">Frontier and local token counts are not comparable units and
no ratio between them is shown. A frontier token here designed the schema and
the checks. A local token read one document. The point is that the first cost
was paid once and the second scales on hardware you own.</div>
"""


def render(runs: list[dict]) -> str:
    primary = runs[0]
    net = primary["network"]
    dev = primary["device"]

    total_docs = sum(len(r["records"]) for r in runs)
    total_calls = sum(r["local"]["calls"] for r in runs)
    total_out = sum(r["local"]["output_tokens"] for r in runs)
    total_wall = round(sum(r["local"]["wall_seconds"] for r in runs), 1)
    passed = sum(r["checks"]["passed"] for r in runs)
    failed = sum(r["checks"]["failed"] for r in runs)

    sections = []
    for run in runs:
        rb = run["runbook"]
        steps = "".join(
            f'<tr><td class="n">{esc(s["n"])}</td><td>{esc(s["name"])}</td>'
            f'<td class="mono sub">{esc(s["op"])}</td></tr>'
            for s in rb["steps"])

        is_redact = any(s["op"] == "redact" for s in rb["steps"])
        detail = redaction_block(run) if is_redact else triage_table(run)

        sections.append(f"""
<h2>{esc(rb["purpose"])}</h2>
<p class="sub mono">{esc(rb["id"])} v{esc(rb["version"])} &middot;
authored by {esc(rb["authored_by"])} &middot;
executed by {esc(run["model"]["name"])} ({esc(run["model"]["digest"])})</p>
<h3>Steps the runbook fixed in advance</h3>
<table><tbody>{steps}</tbody></table>
<h3>Checks</h3>
{checks_block(run)}
<h3>Output</h3>
{detail}
""")

    gen = datetime.now().strftime("%Y-%m-%d %H:%M")
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Local runbook report</title><style>{CSS}</style></head><body><div class="wrap">

<h1>Document review, run locally</h1>
<p class="sub">{esc(dev["label"])} &middot; {esc(dev["os"])} {esc(dev["machine"])}
&middot; {esc(primary["model"]["name"])} &middot; generated {esc(gen)}</p>
<p class="sub">Reference date {esc(primary.get("reference_date", ""))}.
Every document in this corpus is synthetic.</p>

<div class="cards">
{card("documents read", total_docs)}
{card("model calls", total_calls, "all on this machine")}
{card("output tokens", f"{total_out:,}", "measured by ollama")}
{card("wall clock", f"{total_wall}s")}
{card("checks", f"{passed} pass", f"{failed} fail" if failed else "none failed")}
{card("ran on", primary["model"]["name"], f'{esc(dev["machine"])}, locally')}
</div>

<div class="note"><strong>Every model call on this page ran on this machine.</strong>
The model was served from {esc(net["model_host"]["target"])} on loopback, so no
document left the device. Nothing here depends on a hosted API, an account, or a
per-token charge.</div>

{"".join(sections)}

<h2>Where the reasoning happened</h2>
{comparative(primary)}

<footer>Generated by local-runbook. A frontier model authored the runbooks once.
Everything reported above was produced by a local model on the machine named at
the top of this page. Corpus is synthetic; no real person or agreement appears
in it.</footer>

</div></body></html>
"""


def main() -> None:
    paths = [Path(p) for p in sys.argv[1:]] or [ROOT / "out" / "run-latest.json"]
    runs = [json.loads(p.read_text(encoding="utf-8")) for p in paths]
    out = ROOT / "out" / "report.html"
    out.write_text(render(runs), encoding="utf-8")
    print(f"{len(runs)} run(s) -> {out}")


if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).parent))
    main()
