"""Apply a model-supplied removals list to the original text, deterministically.

Why this exists.

The first redaction design asked the local model to do two jobs in one call:
find the identifying spans, and rewrite the document with them replaced. It did
the first job well and the second badly. Measured on gemma4:12b: short spans
(names, phone numbers, addresses, account ids) were substituted reliably, while
multi-line clauses were listed correctly in `removals` and then left verbatim in
`redacted_text`. The model knew what to remove and did not remove it.

Finding an identifying span is judgment and needs a model. Replacing a substring
is not and does not. So the model supplies `removals` and this module produces
the authoritative `redacted_text` from it.

That split is the same one the whole repo is about, applied one level down:
the reasoning stays with the model, the mechanical step goes in the runbook's
implementation where it is exact and auditable.
"""

import re

# Placeholder wording per kind. Kept close to the enum so the output reads
# naturally to a person reviewing the redaction.
LABEL = {
    "person_name": "[PERSON_NAME]",
    "street_address": "[STREET_ADDRESS]",
    "phone": "[PHONE]",
    "email": "[EMAIL]",
    "account_id": "[ACCOUNT_ID]",
    "medical_detail": "[MEDICAL_DETAIL]",
    "employment_detail": "[EMPLOYMENT_DETAIL]",
    "deal_term": "[DEAL_TERM]",
}


def flexible(span: str, case_sensitive: bool = False) -> re.Pattern:
    """Match a span even if its internal whitespace was re-wrapped.

    The model quotes spans back from a document it read with hard line breaks,
    so a quoted clause frequently differs from the original by newline position
    alone. Matching token-by-token with \\s+ between them makes the replacement
    robust to that without loosening it into a fuzzy match.

    `checks.survival_scan` imports this too. Both the removal and its
    verification must use one matcher, or the gate can be weaker than the thing
    it is gating.
    """
    tokens = [re.escape(t) for t in span.split()]
    if not tokens:
        # An empty span would compile to an empty pattern that matches
        # everywhere. Match nothing instead.
        return re.compile(r"(?!x)x")
    flags = 0 if case_sensitive else re.IGNORECASE
    return re.compile(r"\s+".join(tokens), flags)


# Retained for callers inside this module.
_flexible = flexible


def apply_removals(original: str, removals: list[dict]) -> tuple[str, list[dict]]:
    """Replace every listed span in `original`. Returns (text, per-span report).

    Longest spans go first so that a clause containing a name is replaced as a
    whole clause rather than being pre-empted by the name inside it.
    """
    report = []
    text = original

    ordered = sorted(
        (r for r in (removals or []) if isinstance(r, dict) and r.get("text")),
        key=lambda r: len(r["text"]),
        reverse=True,
    )

    for rec in ordered:
        span, kind = rec["text"], rec.get("kind", "")
        label = LABEL.get(kind, f"[{kind.upper() or 'REDACTED'}]")

        # Exact first, since it is cheapest and most common.
        if span in text:
            text = text.replace(span, label)
            report.append({"text": span, "kind": kind, "applied": "exact"})
            continue

        pattern = _flexible(span)
        if pattern.search(text):
            text = pattern.sub(label, text)
            report.append({"text": span, "kind": kind, "applied": "rewrapped"})
            continue

        # Not in the working text. Two very different reasons, and conflating
        # them would misreport the audit:
        #   absorbed    - it sat inside a longer span already replaced. Correct.
        #   not_found   - it is not in the source document at all, so the model
        #                 quoted something it did not read. That is a real
        #                 finding and the audit list is not trustworthy as-is.
        in_original = span in original or _flexible(span).search(original)
        report.append({
            "text": span, "kind": kind,
            "applied": "absorbed" if in_original else "not_found",
        })

    return text, report
