# Results

Measured, not estimated. Local token counts come from Ollama's own
`prompt_eval_count` and `eval_count`. Accuracy comes from `tools/score.py`
against `corpus/TRUTH.json`, which is never included in any prompt.

Everything below is reproducible with `make all && make score`. The raw run
files that produced these numbers are committed in [`examples/`](../examples/).

| | |
|---|---|
| Model | `gemma4:12b`, digest `4eb23ef187e2` |
| Machine | MacBook Pro M4 Pro, 48 GB unified memory, macOS arm64 |
| Python | 3.12 |
| Reference date | 2026-08-27 (fixed, so results do not drift with the clock) |
| Sampling | temperature 0, seed 7 |
| Measured | 2026-08-23 |

---

## Extraction accuracy

### Contracts, 21 documents

| Field | Correct | |
|---|---|---|
| `doc_type` | 21/21 | 100.0% |
| `counterparty` | 21/21 | 100.0% |
| `renewal_basis` | 21/21 | 100.0% |
| `notice_days` | 21/21 | 100.0% |
| `contains_personal_data` | 21/21 | 100.0% |
| `renewal_date` | 16/21 | 76.2% |
| `expires_within_90_days` | 16/21 | 76.2% |
| **Overall** | **137/147** | **93.2%** |

All ten misses are the same defect on five documents. `renewal_date` is off by
exactly one year, and `expires_within_90_days` is wrong as a consequence. Those
five are the `anniversary_of_execution` contracts, where the answer is not in the
document and has to be computed from a longhand signature date elsewhere in it.

The model gets `renewal_basis` right on 21 of 21, including all five of those.
It knows *how* the contract renews and slips on the multi-step arithmetic. That
is a useful shape to know: classification is the strong regime, chained date
arithmetic over a longhand date is the weak one. Those five records are exactly
the ones a real workflow would escalate.

### Inbox, 25 emails

| Field | Correct | |
|---|---|---|
| `contains_personal_data` | 25/25 | 100.0% |
| `category` | 23/25 | 92.0% |
| `owner` | 23/25 | 92.0% |
| `urgency` | 22/25 | 88.0% |
| **Overall** | **93/100** | **93.0%** |

`contains_personal_data` at 25/25 is the load-bearing one, because it decides
which documents enter the redaction gate. Exactly the right three arrive.

Three of the seven misses are one email: a phishing message shaped like an
invoice dispute, which the model routed to finance instead of calling it spam.
That is a defensible error and arguably the safer one.

---

## Is the model doing work a regex could not

`tools/baseline_regex.py` is an honest baseline, roughly 150 lines, written to
succeed wherever pattern matching can. It is not a strawman: it handles explicit
dates, notice windows, and auto-renewal language.

| `renewal_basis` class | Regex baseline | `gemma4:12b` |
|---|---|---|
| `fixed_date` | 85.7% | |
| `auto_renew_unless_notice` | 100% | |
| `anniversary_of_execution` | **0 of 5** | |
| `fiscal_year_end` | **0 of 3** | |
| Overall `renewal_date` | **57.1%** | **81.0%** |

The eight contracts in the bottom two classes return `unknown` from the regex.
Not wrong, unreachable: the renewal date is not written in the document. It has
to be derived from a signature-block date several paragraphs away, or from a
fiscal year end that is defined once in a definitions section.

Six of those eight genuinely expire inside the 90-day window. A pattern-matching
approach does not get them slightly wrong, it does not see them at all.

This is the answer to "is the LLM decorative here". It is not.

---

## The redaction gate

Three emails were flagged by inbox triage as containing personal data. The
redaction runbook ran over those three.

```
[PASS] parses             3/3 model outputs parsed as JSON
[PASS] required_present    2 required fields checked on 3 records
[PASS] enum_valid         22/22 enum values allowed
[FAIL] survival_scan       1 of 14 planted identifiers survived redaction
                           P05 employment_detail
                           "was written up twice in 2024 for the same behaviour"
```

**The gate fails, and that is the reported result.** It is not tuned until it
passes.

`corpus/PLANTED.json` lists every identifier planted in the corpus and is never
included in any prompt. After redaction, every planted string is scanned against
every redacted document using the same whitespace-flexible matcher the redactor
itself uses.

Two things about this number are worth stating plainly:

1. **An earlier version of this scan reported `0 of 14`. That was wrong**, and it
   was wrong in the dangerous direction. The scan used stricter matching than the
   redactor, so identifiers whose line breaks differed from the manifest were
   invisible to it and were counted as removed without being examined. See
   [`FINDINGS.md`](FINDINGS.md#3-the-safety-gate-was-weaker-than-the-thing-it-was-gating).

2. **Which identifier survives varies between runs** at temperature 0. Two runs
   leaked different clauses. Both were multi-line narrative detail rather than
   name-shaped tokens, which matches the known weak class.

So the defensible claim is not that the model redacts perfectly. It is that the
model catches name-shaped identifiers reliably, is inconsistent on narrative
clauses, and a deterministic scan converts that inconsistency into a caught
failure instead of a leak.

A redaction pipeline without a deterministic verifier is a hope, not a control.

---

## Cost of one run

`gemma4:12b`, the redaction runbook over three documents:

| | |
|---|---|
| Local model calls | 3 |
| Local prompt tokens | 2,012 |
| Local output tokens | 1,376 |
| Wall time | 59.5 s |
| Throughput | 23.1 tokens/s |
| Model load | 1.7 s |
| Frontier model calls **during this run** | 0 |

The frontier model was called three times in total, once per runbook, during
authoring on 2026-08-23. It has not run since and is not required to.

**No ratio is quoted between frontier and local tokens anywhere in this repo,
and the generated report refuses to render one.** Tokens are not fungible across
models: a frontier token that designed a schema is not the same unit as a local
token that read one email. The defensible claim is amortization, that the
expensive capability was needed once and the volume was handled locally.

---

## Model comparison

Incomplete. `gemma4:12b` is fully measured. The remaining rows require a bake-off
pass that has not finished.

| Model | Lab | Size | 16 GB VRAM | Contracts | Inbox |
|---|---|---|---|---|---|
| `gemma4:12b` | Google | 7.6 GB | yes | **93.2%** | **93.0%** |
| `qwen3.5:9b` | Alibaba | 6.6 GB | yes | 73.8% * | not measured |
| `qwen3.5:4b` | Alibaba | 3.4 GB | yes | not measured | not measured |
| `qwen3.8:27b` | Alibaba | 18 GB | no | not measured | not measured |
| `muse-glimmer:30b` | Meta | 18 GB | no | not measured | not measured |

\* `qwen3.5:9b` was measured immediately after the reasoning-mode fix in
[finding 1](FINDINGS.md#1-a-reasoning-model-returns-your-json-somewhere-you-are-not-looking)
and before the contract prompt corrections in
[finding 5](FINDINGS.md#5-most-the-small-model-is-not-good-enough-was-an-underspecified-runbook),
so it is not comparable to the `gemma4:12b` row above. It is recorded here only
to document that the 0% was a client bug.

Reproduce with `make bakeoff`, or `MODELS="tag-a tag-b" bash tools/bakeoff.sh`.

Headline numbers are quoted from `gemma4:12b` deliberately. It is the largest
model in the set that fits in 16 GB of VRAM, which is the bar for "reproduces on
hardware you already own". The larger two are the ceiling, not the floor.
