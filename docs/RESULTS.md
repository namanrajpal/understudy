# Results

Five models, three labs, 4B to 30B. Same three runbooks, same 46 synthetic
documents, temperature 0, seed 7, run locally on an M4 Pro with 48 GB unified
memory. Every number below is measured, not estimated.

Scored per field against `corpus/TRUTH.json`, which is generated with the corpus
and never appears in any prompt. `tools/validate.py` asserts that separately.

## Contract triage, 21 documents

| model | lab | overall | `renewal_basis` | `renewal_date` | `expires_within_90d` | `contains_personal_data` | tok/s |
|---|---|---|---|---|---|---|---|
| `qwen3.8:27b` | Alibaba | **98.0%** | 100% | 95.2% | 100% | 100% | 5.0 |
| `muse-glimmer:30b` | Meta | 94.6% | 100% | 85.7% | 85.7% | 100% | 6.1 |
| `gemma4:12b` | Google | 93.2% | 100% | 76.2% | 76.2% | 100% | 12.2 |
| `qwen3.5:9b` | Alibaba | 81.0% | 66.7% | 66.7% | 57.1% | 100% | 17.1 |
| `qwen3.5:4b` | Alibaba | 74.8% | 66.7% | 42.9% | 42.9% | 100% | 28.1 |

## Inbox triage, 25 documents

| model | lab | overall | `category` | `urgency` | `owner` | `contains_personal_data` | tok/s |
|---|---|---|---|---|---|---|---|
| `muse-glimmer:30b` | Meta | **96.0%** | 96% | 92% | 96% | 100% | 6.5 |
| `qwen3.8:27b` | Alibaba | **96.0%** | 96% | 92% | 96% | 100% | 4.6 |
| `gemma4:12b` | Google | 93.0% | 92% | 88% | 92% | 100% | 13.1 |
| `qwen3.5:4b` | Alibaba | 91.0% | 96% | 76% | 92% | 100% | 29.5 |
| `qwen3.5:9b` | Alibaba | 90.0% | 92% | 76% | 92% | 100% | 18.4 |

**Headline numbers for this repo are quoted from `gemma4:12b`**, because it is the
only model in the table that fits 16 GB of VRAM. The two 27B/30B rows are the
ceiling, not the claim: quoting them as the result would quietly break the
"reproduces on hardware you already own" promise.

## Five things in this data worth more than the ranking

### 1. "Good enough" depends on the task, not on the model

`qwen3.5:4b` scores **91.0%** on inbox triage and **74.8%** on contracts. Same
model, same run, 16 points apart. Inbox triage is classification into short
enumerated lists, which small models do well. Contract triage requires reading a
clause, deciding which of five renewal regimes applies, then computing a date
from a reference somewhere else in the document.

So the useful question is not "is a 4B model good enough" but "good enough for
which of my tasks", and that is measurable in an afternoon.

### 2. The field that gates the privacy decision is the most reliable field

`contains_personal_data` is **100% on all five models, on both corpora**. From
3.4 GB to 18 GB, every model correctly identified which documents held detail
that should not leave the machine.

That is the single most load-bearing field in the pipeline, because it decides
what goes through redaction and therefore what could be sent onward. It is also
the one field that never degraded with size.

### 3. Every model passed every structural check, and that proves nothing

All five scored 6/6 on contract checks and 5/5 on inbox checks. Parsing, record
count, file mapping, enum validity, required fields, date format: all green,
including `qwen3.5:4b` at 42.9% accuracy on `renewal_date`.

Valid output and correct output are different properties. Ollama's `format`
constrains generation, it does not validate meaning, and a suite of structural
checks that all pass will happily certify a model that is wrong about half the
dates. The scorer exists because the checks are not enough.

### 4. `renewal_basis` has a cliff, not a slope

100% for the top three models. 66.7% for both qwen3.5 models. Nothing in between.

Classifying renewal language into `fixed_date` / `anniversary_of_execution` /
`auto_renew_unless_notice` / `fiscal_year_end` appears to be a capability that
either exists in a model or does not.

### 5. Speed and accuracy trade steeply here

`qwen3.5:4b` runs at 28 to 30 output tokens/sec. `qwen3.8:27b` runs at 5.
Roughly six times faster for roughly 23 points of contract accuracy. For a batch
job that runs overnight, the slow model is free. For anything interactive, that
choice is real.

## The redaction gate fails on every model

| model | documents | removals listed | survival scan |
|---|---|---|---|
| `gemma4:12b` | 3 | 24 | **FAIL** — 1 of 14 survived |
| `qwen3.8:27b` | 3 | 21 | **FAIL** — 1 of 14 survived |
| `qwen3.5:4b` | 3 | 19 | **FAIL** — 2 of 14 survived |
| `qwen3.5:9b` | 3 | 19 | **FAIL** — 3 of 14 survived |
| `muse-glimmer:30b` | 3 | 11 | **FAIL** — 6 of 14 survived |

Every survivor is a narrative clause. Not one is a name, address, phone number,
or account id:

- "a wage garnishment order for unpaid child support"
- "was written up twice in 2024 for the same behaviour"
- "I'm being admitted for a hip replacement on Wednesday"

`src/redact_apply.py` replaces the spans the model *lists*. When the model quotes
a clause boundary that happens to contain a planted string, the string goes; when
it picks a different boundary, the string survives between spans. An earlier
manual run of `gemma4:12b` passed 0 of 14 for exactly that reason, and the
difference between passing and failing was which boundary the model chose, not
model quality.

Note the inversion: **`muse-glimmer:30b` is the best model at triage and the worst
at redaction**, listing only 11 removals against gemma4's 24. Being better at
reading a document does not make a model better at exhaustively enumerating every
span inside it.

The honest conclusion is that a single-pass redaction is not safe at any model
size in this table, and the deterministic gate is what makes that visible instead
of assumed. The fix is the retry loop `SPEC.md` already calls for: re-run the
redacted text and apply a second pass. Driving redaction from `PLANTED.json`
would make the scan self-fulfilling and is not an option.

## Is the model doing work a regex could do

No, on the part that matters.

| `renewal_basis` | regex baseline | `gemma4:12b` | `qwen3.8:27b` |
|---|---|---|---|
| `fixed_date` | 85.7% | | |
| `auto_renew_unless_notice` | 100% | | |
| `anniversary_of_execution` | **0 of 5** | | |
| `fiscal_year_end` | **0 of 3** | | |
| overall `renewal_date` | **57.1%** | 76.2% | **95.2%** |

Six contracts that genuinely expire within 90 days return `unknown` from the
baseline. In each, the renewal date is not written in the document: it must be
computed from an execution date in a signature block, or from a fiscal year end
stated in a sentence containing no date at all.

## Three client bugs, each of which scored a competent model at zero

This is the most useful thing in the repository, and it is a pattern rather than
three coincidences. In every case the model was correct and the harness was
wrong.

**1. A thinking model returns JSON where you are not looking.** `qwen3.5:9b`
scored **0 of 147** — every field, every document. The qwen3.x family runs in
reasoning mode by default, and Ollama then returns the JSON in the response's
`thinking` field while leaving `response` an empty string. Reading only
`response` gave `""`, so all 21 documents were marked `needs_review`. Fixed:
0% to 81%.

**2. Checks that examine nothing reported PASS.** On that same dead run, **five of
six checks went green.** They iterate over parsed records, found none, and fell
through to "no failures found". A validation suite that certifies a run which
produced literally nothing is worse than having no suite. Checks with an empty
sample now fail as inconclusive.

**3. A special token broke the parser.** `muse-glimmer:30b` scored **0 of 147**
because it appends its end-of-turn token after the JSON:
`{"doc_type":"maintenance",...}<|eot|>`. Its very first contract had all seven
fields correct and was scored zero. Fixed: 0% to 94.6%, which makes it the second
best model in the table.

If you are benchmarking small local models and one scores impossibly badly,
suspect your client before you conclude anything about the model. Three of five
models here were briefly "broken" and none of them were.

## Reproducibility

```
PASS  corpus regenerates byte-identical
ok    3 runbooks structurally valid
ok    21 contracts and 25 emails on disk
ok    46 documents have ground truth, all keyed to real files
ok    21 planted identifiers, all present in their source document
ok    no prompt references ground truth
repo is internally consistent
```

`tools/make_corpus.py` is deterministic: regenerating the corpus produces
byte-identical files, so a stranger who clones this repo scores the same numbers.

## Reproducing this

```bash
ollama pull gemma4:12b
python3 tools/make_corpus.py
bash tools/bakeoff.sh                      # every model present
MODELS="gemma4:12b" bash tools/bakeoff.sh  # or just one
```

Each model is explicitly unloaded when its runs finish. `src/run.py` pins models
with `keep_alive:-1` so nothing unloads mid-run, which is correct for a single
recorded demo and wrong for a sequential sweep: five pinned models stack to
roughly 56 GB of weights and the machine swaps instead of evicting.
