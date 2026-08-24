# local-runbook

Define the work once with a capable model. Do the work repeatedly with a small
one, on your own machine.

A frontier model authors a **runbook**: the steps, the output schema, the checks,
and what to do on failure. That happens once and is committed to this repo as
JSON. A small local model then executes that runbook over a folder of documents,
supplying the per-document judgment the runbook cannot contain.

Reasoning that happens **once** lives in the runbook. Reasoning that happens
**every run** happens on your hardware.

```
                            authored once
   frontier model  ─────────────────────────────────►  runbooks/*.json
                     steps, schema, checks, failure         │
                                                            │ committed
                                                            ▼
   corpus/  ──────►    local model    ──────►  out/report.html
   46 documents      one call per document          renewal calendar,
                     on your machine               routing report,
                                                    redaction gate
```

Every model call goes to a local Ollama endpoint on loopback. No document in
`corpus/` leaves the machine it is running on.

## Start here

| | |
|---|---|
| See the output without installing anything | [`examples/`](examples/) |
| The measured numbers, with provenance | [`docs/RESULTS.md`](docs/RESULTS.md) |
| Six things that went wrong and what they meant | [`docs/FINDINGS.md`](docs/FINDINGS.md) |
| How the corpus was built and what it does not prove | [`docs/CORPUS.md`](docs/CORPUS.md) |
| The interface contract everything is built against | [`SPEC.md`](SPEC.md) |

## What it does

Three runbooks over one corpus of 46 synthetic documents:

| Runbook | Work | Output |
|---|---|---|
| `triage-contracts.json` | Read 21 agreements, work out when each actually renews | Renewal calendar |
| `triage-inbox.json` | Read 25 emails, route each to an owner, flag personal data | Routing report |
| `redact.json` | Take whatever either triage flagged and make it safe to send out | Side-by-side plus a survival scan |

`redact.json` runs over both corpora. The same redaction spec handles an email
and a lease, and the runner never learns which it is holding.

## Requirements

- Python 3.11+. Standard library only, no pip install.
- [Ollama](https://ollama.com) running locally.

The models below fit in 16 GB of VRAM, so this reproduces on an ordinary laptop
or a single consumer GPU. Bigger models work and score better; these are the
floor, not the ceiling.

| Tag | Lab | Size | Role |
|---|---|---|---|
| `gemma4:12b` | Google | 7.6 GB | primary, and the source of the numbers below |
| `qwen3.8:27b` | Alibaba | 18 GB | newest generation, the quality ceiling |
| `qwen3.5:9b` | Alibaba | 6.6 GB | mid-size point on the curve |
| `qwen3.5:4b` | Alibaba | 3.4 GB | deliberately small, to show where quality falls off |

`gemma4:12b` runs on a single 16 GB consumer GPU, which is the bar for
"reproduces on hardware you already own", and every headline number below comes
from it for that reason. `qwen3.8:27b` at q4 needs more than 16 GB; smaller
quantizations of it start around 9 GB if that is your constraint.

## Run it

```bash
ollama pull gemma4:12b

make validate    # integrity checks. No model, no network.
make all         # contracts, inbox, redact, then rebuild the report
make score       # accuracy against ground truth, per field
```

`make` with no target lists everything. The equivalent long form, if you would
rather see what it is doing:

```bash
python3 tools/make_corpus.py                      # generate the 46 documents
python3 src/run.py runbooks/triage-contracts.json
python3 src/run.py runbooks/triage-inbox.json
python3 src/run.py runbooks/redact.json --from out/run-latest.json
python3 src/report.py out/run-*.json               # -> out/report.html
```

Every model call goes to Ollama on loopback, so no document leaves the machine
and there is no per-token charge. The runner records which model and which
machine produced each run.

Other things worth running:

```bash
make baseline    # what pattern matching gets instead
make bakeoff     # every model in the set, over every runbook
MODEL=qwen3.5:4b make contracts    # any single run, against any tag
```

## Measured results

`gemma4:12b`, 46 documents, run locally, temperature 0, seed 7. Full numbers with
provenance in [`docs/RESULTS.md`](docs/RESULTS.md); raw run files in
[`examples/`](examples/).

### Extraction accuracy

Scored per field against `corpus/TRUTH.json`, which is generated with the corpus
and never shown to a model.

| Contracts, 21 docs | | Inbox, 25 docs | |
|---|---|---|---|
| `doc_type` | 100% | `contains_personal_data` | 100% |
| `counterparty` | 100% | `category` | 92% |
| `renewal_basis` | 100% | `owner` | 92% |
| `notice_days` | 100% | `urgency` | 88% |
| `contains_personal_data` | 100% | | |
| `renewal_date` | 76.2% | | |
| `expires_within_90_days` | 76.2% | | |
| **overall** | **93.2%** | **overall** | **93.0%** |

All ten contract misses are the same defect on five documents: `renewal_date` off
by exactly one year, and `expires_within_90_days` wrong as a consequence. Those
five are the contracts whose renewal date is not written down and has to be
computed. The model classifies all five correctly and slips on the arithmetic,
which is a useful shape to know.

### Is the model doing work a regex could do

No, on the part that matters. `tools/baseline_regex.py` is a real attempt, not a
strawman: it handles longhand and numeric dates and looks for expiry wording near
a date rather than grabbing the first date it sees.

| `renewal_basis` | Regex baseline | `gemma4:12b` |
|---|---|---|
| `fixed_date` | 85.7% | |
| `auto_renew_unless_notice` | 100% | |
| `anniversary_of_execution` | **0 of 5** | |
| `fiscal_year_end` | **0 of 3** | |
| overall `renewal_date` | **57.1%** | **81.0%** |

Where the regex ties, the end date is written in the document. Where it scores
zero, the date is not in the document at all and has to be computed:

> "renews automatically on each anniversary of the date of execution set forth
> below" — with the execution date written in longhand in a signature block four
> paragraphs later.

> "coterminous with the Client's fiscal year" — with the fiscal year end stated
> in a separate sentence that contains no date.

Six contracts that genuinely expire within 90 days return `unknown` from the
baseline. No additional patterns fix that, because it is arithmetic over a
reference the pattern cannot locate.

### The redaction gate

Every identifier planted in the corpus is listed in `corpus/PLANTED.json`, which
is never included in any prompt. After redaction, every planted string is
scanned against every redacted document.

```
[FAIL] survival_scan      1 of 14 planted identifiers survived redaction
                          P05 employment_detail
                          "was written up twice in 2024 for the same behaviour"
```

**The gate fails, and that is the reported number.** It is not tuned until it
passes, for two reasons worth knowing before you copy this design.

An earlier version of this scan reported `0 of 14`, and it was wrong in the
dangerous direction: it matched strings more strictly than the redactor did, so
identifiers whose line breaks differed from the manifest were invisible to it and
counted as removed without being examined. Separately, which identifier survives
**varies between runs at temperature 0**, and both observed survivors were
multi-line narrative clauses rather than name-shaped tokens.

So the claim is not that the model redacts perfectly. It is that the model
catches name-shaped identifiers reliably, is inconsistent on narrative clauses,
and a deterministic scan turns that inconsistency into a caught failure instead
of a leak. A redaction pipeline without a deterministic verifier is a hope, not a
control.

## Findings

Six things went wrong building this. Five were defects in the runbook or the
client, one was a defect in the safety check, and none was the model being
incapable. They are the transferable part of this repo and they are written up in
[`docs/FINDINGS.md`](docs/FINDINGS.md).

The short version:

| | |
|---|---|
| A reasoning model returns your JSON somewhere you are not looking | `qwen3.5:9b` scored 0/147 because Ollama put valid JSON in `thinking` and left `response` empty |
| A check that examines nothing must not report PASS | On that run, 5 of 6 checks passed vacuously |
| The safety gate was weaker than the thing it was gating | The survival scan could not detect a leak the redactor could remove |
| Ask the model for judgment, not for string replacement | It listed the clause to remove, correctly, then left it verbatim |
| Most "the small model is not good enough" was an underspecified runbook | Inbox 54% → 93%, contracts 77.6% → 93.2%, no model change |
| Run-to-run variance survives temperature 0 | Two identical redaction runs leaked different clauses |

The three longest-form ones follow.

### A reasoning model returns your JSON somewhere you are not looking

`qwen3.5:9b` initially scored **0 out of 147** on every field. Not a low score, a
zero: no field on any document. That reads like the model cannot do the task.

It could do the task perfectly. The qwen3.x family runs in reasoning mode by
default, and in that mode Ollama puts the generated JSON in the response's
`thinking` field and returns `response` as an **empty string**. A client that
reads only `response` sees `""`, fails to parse, and marks all 21 documents
`needs_review`. The JSON was valid and complete the whole time, one key away.

`src/model.py` now sends `"think": false` for extraction, since reasoning tokens
are cost without benefit against a fixed schema, and still falls back to
`thinking` for any model that ignores the flag. Same model, same runbook, same
corpus: 0% to 73.8%.

If you are benchmarking small models and one of them scores impossibly badly,
suspect your client before you conclude anything about the model.

### Ask the model for judgment, not for string replacement

The first design asked the local model to do both halves of redaction in one
call: find the identifying spans, and return the document rewritten with them
replaced. It did the first half well and the second half badly.

Measured on `gemma4:12b`: short spans (names, phone numbers, addresses, account
ids) were substituted reliably. Multi-line clauses were **correctly identified
and listed** in `removals`, with the right category, and then **left verbatim**
in the rewritten text. The model knew that "a wage garnishment order for unpaid
child support" was an employment detail, said so, and did not remove it.

So `src/redact_apply.py` now applies the removals list in code, longest span
first. Finding an identifying span is judgment and needs a model. Replacing a
substring is not and does not. The survival scan went from 2 leaks to 0 without
touching the prompt again.

This is the same split the repo is about, one level down.

### Most "the small model is not good enough" turned out to be an underspecified runbook

First run on the inbox scored 54%, with `urgency` at 24%. Every single urgency
error collapsed to `today`: the prompt never defined the three values and never
supplied a reference date, so every message read as urgent. Contracts scored
77.6%, with `counterparty` at 52% because the prompt never said which of the two
parties to return, and the model kept naming the client.

Defining the enum values, supplying the reference date, and stating the
inclusive boundary for date arithmetic moved inbox to 93% and contracts to 92.5%
with no change of model.

The residual failure is real and is left in: on 4 of 5 contracts with an
anniversary basis, the model lands one year past the correct date. It identifies
the basis perfectly (100%) and then does the multi-year arithmetic wrong. That is
the shape the research predicts, classification strong and chained reasoning
weaker, and those 4 records are exactly the ones a sensible pipeline escalates.

No per-document hints were added to make any number look better. The prompts
contain definitions and worked examples using dates that appear in no document
in the corpus.

### A check that examines nothing must not report PASS

The `qwen3.5:9b` zero-score run exposed something worse than the client bug. With
0 of 21 documents parsed, **five of six checks still reported PASS**. They iterate
over parsed records, found none, and fell through to "no failures found". The run
rendered green while producing literally nothing.

Checks that examine an empty sample now fail as inconclusive rather than passing:

```
[FAIL] enum_valid    nothing to check: 0 of 21 records produced parseable
                     output, so this check is inconclusive rather than passing
```

A green check is a claim. If it had no evidence to evaluate, it has no business
making the claim, and a validation suite that goes green on a dead run is worse
than having no suite at all.

## Layout

```
runbooks/          the three runbooks. Authored once. This is the artifact.
corpus/            46 synthetic documents, generated, plus ground truth
  PLANTED.json       identifiers for the survival scan. Never prompted.
  TRUTH.json         expected extraction, for scoring. Never prompted.
src/
  run.py             executes a runbook, prints the step trace
  model.py           Ollama client, measured token accounting, reasoning-safe
  loaders.py         .eml and plain text
  checks.py          the seven checks
  redact_apply.py    deterministic span replacement, and why it exists
  report.py          one self-contained HTML page, no CDN
tools/
  make_corpus.py     generates the corpus, deterministic
  validate.py        repo integrity. No model, no network. This is what CI runs.
  score.py           accuracy against ground truth, per field
  baseline_regex.py  what patterns get instead
  bakeoff.sh         every model over every runbook
docs/
  RESULTS.md         measured numbers with provenance
  FINDINGS.md        six things that went wrong and what they meant
  CORPUS.md          how the corpus was built, and what it does not prove
examples/            committed output, so you can look without running anything
out/                 runs and reports. Gitignored.
```

## Verifying the repo without a model

```bash
make validate
```

Checks that every runbook matches the schema the runner expects, that every
ground-truth key names a file that exists and every file has ground truth, that
every planted identifier is genuinely present in its source document, and that no
prompt anywhere can reach ground truth. Needs no model and no network, and runs
in CI on every push.

The last two matter more than they sound. A planted identifier that is not
actually in its document cannot survive redaction, so it would pass the survival
scan without being examined. And a prompt with access to ground truth produces an
accuracy number that measures nothing.

## Notes on honesty

The report shows frontier work beside local work and deliberately shows **no
ratio between them**. Tokens are not fungible across models: a frontier token
that designed a schema is not the same unit as a local token that read one
document. The defensible claim is amortization, that the expensive capability was
needed once and the volume was handled locally, and that is what the page says.

Local token counts come from Ollama's own `prompt_eval_count` and `eval_count`.
They are measured, not estimated.

Every document in `corpus/` is synthetic. No real person, company, or agreement
appears anywhere in this repository, which is both a privacy requirement and
what makes the results reproducible for anyone who clones it.

`format` in the Ollama API constrains generation. It does not validate. That is
why `checks.py` runs regardless, and Ollama's own documentation says the same.
