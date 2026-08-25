"""Generate the runbook-quality ablation ladder.

    python3 tools/ablation_runbooks.py

The bake-off swept one axis: the model, with the runbook held at its final
version. This generates the other axis. Four rungs per task, climbing from a
bare schema to the committed runbook, each rung adding back one thing the
frontier model contributed. Running the ladder measures what the authoring was
worth in accuracy points, which is the claim the demo otherwise only asserts.

Why generated rather than hand-written: the original underspecified runbook was
never committed, so 54.0% and 77.6% in docs/FINDINGS.md are notes about runs
whose inputs no longer exist. Deriving each rung from the committed prompt by
exact deletion means the reconstruction is reproducible and reviewable, and the
defects reintroduced are exactly the ones FINDINGS records rather than my
memory of them.

Every deletion asserts its markers matched. A silent near-miss here would
produce a prompt nobody wrote and a number nobody can explain.
"""

import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "runbooks" / "ablation"

# Blocks are addressed by first and last phrase rather than reproduced in full,
# so this script cannot drift from the committed prompt it edits.
INBOX_BLOCKS = {
    "business":  ("The business sells outdoor", "the business is the recipient."),
    "category":  ("category:\n- customer_complaint", "support_request if the fix is the point."),
    "urgency":   ("urgency: how fast", "writes emphatically."),
    "owner":     ("owner: support for customer", "anything needing no action."),
    "pii":       ("contains_personal_data: true only when", "make this true."),
    "today":     ("Today's date is {today}.", "Today's date is {today}."),
}

CONTRACT_BLOCKS = {
    "perspective":    ("The review is being run by", "on its own contract file."),
    "counterparty":   ("counterparty: the name of the OTHER party", "never the answer."),
    "doc_type":       ("doc_type:\n- saas_subscription", "none of the above more specifically."),
    "renewal_basis":  ("renewal_basis rules:", "also requires notice."),
    "renewal_date":   ("renewal_date: the NEXT date", "determined from the text."),
    "notice_days":    ("notice_days: the days", "names no such notice."),
    "pii":            ("contains_personal_data: true if the document", "leased business premises."),
}

# The defect FINDINGS records for contracts renewal_date: the boundary was
# phrased "on or after today", with no worked example and no instruction to stop
# advancing. All eleven misses were wrong by exactly +1 year.
RENEWAL_DATE_DEFECTIVE = (
    "renewal_date: the next date on which this agreement renews or expires, "
    "on or after today. Give ISO YYYY-MM-DD. Use the string unknown if it "
    "cannot be determined."
)

# Each rung names what it is MISSING relative to the committed runbook, so the
# gain from one rung to the next is attributable to a single named addition.
INBOX_LADDER = [
    ("v0", "bare schema, no field guidance at all",
     ["business", "category", "urgency", "owner", "pii", "today"], None),
    ("v1", "category, owner and personal-data definitions supplied",
     ["urgency", "today"], None),
    ("v2", "urgency enum values defined",
     ["today"], None),
]

CONTRACT_LADDER = [
    ("v0", "bare schema, no field guidance at all",
     ["perspective", "counterparty", "doc_type", "renewal_basis",
      "renewal_date", "notice_days", "pii"], None),
    ("v1", "doc_type, renewal_basis, notice_days and personal-data definitions supplied",
     ["perspective", "counterparty"], "renewal_date"),
    ("v2", "counterparty perspective stated",
     [], "renewal_date"),
]


def cut(prompt: str, name: str, blocks: dict, replacement: str | None = None) -> str:
    """Remove one named block, or swap it for a replacement. Asserts the match."""
    start_marker, end_marker = blocks[name]
    start = prompt.find(start_marker)
    if start == -1:
        raise SystemExit(f"block {name!r}: start marker not found: {start_marker!r}")
    end = prompt.find(end_marker, start)
    if end == -1:
        raise SystemExit(f"block {name!r}: end marker not found: {end_marker!r}")
    end += len(end_marker)

    tail = prompt[end:]
    if replacement is None:
        # Also swallow the blank line that separated this block from the next.
        if tail.startswith("\n\n"):
            tail = tail[2:]
        return prompt[:start] + tail
    return prompt[:start] + replacement + tail


def build(source: Path, ladder: list, blocks: dict, task: str) -> None:
    base = json.loads(source.read_text(encoding="utf-8"))

    for rung, gained, missing, defective in ladder:
        rb = copy.deepcopy(base)
        prompt = rb["extract"]["prompt"]

        for name in missing:
            prompt = cut(prompt, name, blocks)
        if defective:
            prompt = cut(prompt, defective, blocks, RENEWAL_DATE_DEFECTIVE)

        rb["extract"]["prompt"] = prompt
        # The id keeps its task word: tools/score.py picks the corpus by looking
        # for "contract" in the runbook id.
        rb["id"] = f'{base["id"]}-{rung}'
        # The original numbers were unreproducible partly because version stayed
        # "1.0" across a rewrite. Every rung carries its own version.
        rb["version"] = rung
        rb["authored_by"] = (
            "reconstructed ablation rung, derived from the committed runbook by "
            "tools/ablation_runbooks.py. NOT the original underspecified runbook, "
            "which was never committed."
        )
        rb["purpose"] = f'{base["purpose"]} Ablation rung {rung}.'
        rb["ablation"] = {
            "task": task,
            "rung": rung,
            "gained_at_this_rung": gained,
            "still_missing": missing + ([defective] if defective else []),
            "derived_from": str(source.relative_to(ROOT)),
        }

        dest = OUT / f'{base["id"]}.{rung}.json'
        dest.write_text(json.dumps(rb, indent=2) + "\n", encoding="utf-8")
        chars = len(prompt)
        print(f'  {dest.relative_to(ROOT)}  prompt {chars:>5} chars   gained: {gained}')

    print(f'  {source.relative_to(ROOT)}  prompt '
          f'{len(base["extract"]["prompt"]):>5} chars   '
          f'v3, committed runbook, used as the top rung')


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    print("inbox ladder")
    build(ROOT / "runbooks" / "triage-inbox.json", INBOX_LADDER, INBOX_BLOCKS, "inbox")
    print()
    print("contracts ladder")
    build(ROOT / "runbooks" / "triage-contracts.json", CONTRACT_LADDER,
          CONTRACT_BLOCKS, "contracts")


if __name__ == "__main__":
    main()
