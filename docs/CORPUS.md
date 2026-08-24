# The corpus

46 documents. Every one is synthetic. No real person, company, or agreement
appears anywhere in this repository.

That is a privacy requirement first: the runbooks were authored by a frontier
model over a network, and no real document should ever be in that position. It
is also what makes the accuracy numbers reproducible, since anyone who clones
this repo scores against the same 46 documents.

```
corpus/
  contracts/   21 .txt   agreements with deliberately varied renewal language
  inbox/       25 .eml   a small-business inbox
  META.json             counts and distributions, for sanity checks
  TRUTH.json            expected extraction per document. Never prompted.
  PLANTED.json          identifiers for the survival scan. Never prompted.
```

## Regenerating it

```bash
python3 tools/make_corpus.py
```

Deterministic. Same documents, same ground truth, every time. The generator is
committed as a repo artifact rather than being a one-off script, because a corpus
you cannot regenerate is a corpus you cannot trust.

## Design decisions that affect what the results mean

**The two corpora are mixed, not pre-sorted.** There is no `sensitive/` folder.
The three emails and two contracts that carry personal data sit among the other
41 and are indistinguishable by filename. If they were separated, the
classification would already have been done by hand and the redaction gate would
be circular: it would only ever be handed documents already known to be
sensitive. Deciding *which* documents need redaction is part of the work being
measured.

**`renewal_basis` is the field that defeats pattern matching.** It is an enum:

| Value | Where the renewal date actually is |
|---|---|
| `fixed_date` | Written in the document |
| `auto_renew_unless_notice` | Written, plus a notice window to apply |
| `anniversary_of_execution` | **Not in the document.** Derived from a longhand signature date elsewhere in it |
| `fiscal_year_end` | **Not in the document.** Derived from a definition in a separate section |

Eight of the 21 contracts fall in the bottom two classes and six of those eight
genuinely expire inside the 90-day window. This is deliberate, and it is what
`tools/baseline_regex.py` exists to demonstrate: a pattern cannot extract a date
that was never written down.

**The reference date is fixed at 2026-08-27**, in `META.json` and `TRUTH.json`
and passed into every prompt. Without it, "expires within 90 days" drifts with
the wall clock and the scores become unreproducible. Any runbook asking a model
for a relative date judgment has to supply the date it is relative to. Omitting
it was one of the actual bugs, see
[FINDINGS.md](FINDINGS.md#5-most-the-small-model-is-not-good-enough-was-an-underspecified-runbook).

**Two of the emails are deliberately ambiguous.** One complaint is written in a
measured tone that reads as low urgency but is not, and one phishing message is
shaped like an invoice dispute. They exist so the accuracy number is not 100%.
A corpus on which a small model scores perfectly is a corpus that was written to
be scored perfectly, and it tells you nothing about where the approach breaks.

## Ground truth

**`TRUTH.json`** holds the expected value of every extracted field for all 46
documents, keyed by path. `tools/score.py` reports per-field accuracy against it.

**`PLANTED.json`** holds 21 identifiers deliberately placed in the corpus, 14 in
the inbox and 7 in the contracts, each with an id, the file it is in, its kind,
and its exact text. The survival scan searches for every one of them in the
redacted output.

Neither file is ever included in a prompt. `tools/validate.py` enforces this by
inspecting the prompt text of every runbook, and CI runs it on every push. This
is the check that keeps the accuracy numbers meaning something: a prompt with
access to ground truth produces a number that measures nothing.

`tools/validate.py` also verifies that every planted identifier is genuinely
present in the document it claims to be in. A manifest entry that is not actually
in its source document cannot survive redaction, so it would pass the scan
without ever being examined. Six of the 21 only match across a hard line break,
which is why both the redactor and the scan match whitespace-flexibly. That
asymmetry was a real bug, see
[FINDINGS.md](FINDINGS.md#3-the-safety-gate-was-weaker-than-the-thing-it-was-gating).

## What this corpus does not tell you

It is 46 documents in English, generated to exercise specific edge cases, and
graded against ground truth written by the same process that generated it. It
supports claims about whether this *pipeline shape* works and where it breaks.

It does not support a claim about accuracy on real contracts, which are longer,
messier, worse formatted, and full of language nobody anticipated. Run it on your
own documents before believing a number about your own documents.
