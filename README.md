<div align="center">

# understudy

**Define the work once with a capable model. Do the work repeatedly with a small one, on your own machine.**

[![validate](https://github.com/namanrajpal/understudy/actions/workflows/validate.yml/badge.svg)](https://github.com/namanrajpal/understudy/actions/workflows/validate.yml)
![Python 3.11+](https://img.shields.io/badge/python-3.11%2B-blue?style=flat-square)
![dependencies: none](https://img.shields.io/badge/dependencies-none-lightgrey?style=flat-square)
![license: MIT](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/charts/architecture-dark.svg">
  <img src="docs/charts/architecture-light.svg" alt="A frontier model authors a runbook once. A small local model executes it over 46 documents on your own machine, producing a renewal calendar, a routing report and a redaction gate  (identifiers gate the result, facts are reported)
  model                gate  ident LEAKED  facts LEAKED  removals  retries
  gemma4:12b           PASS          0/10           1/4        24        0
  muse-glimmer:30b     PASS          0/10           1/4        21        2
  qwen3.5:4b           PASS          0/10           2/4        19        0
  qwen3.5:9b           PASS          0/10           3/4        19        0
  qwen3.8:27b          PASS          0/10           1/4        21        0
```bash
ollama pull gemma4:12b

make validate    # integrity checks. No model, no network.
make all         # contracts, inbox, redact, then rebuild the report
make score       # accuracy against ground truth, per field
```

`make` with no target lists everything. Output lands in `out/report.html`, a
single self-contained page with no CDN.

<details>
<summary>The same thing without <code>make</code>, and the other targets</summary>

```bash
python3 tools/make_corpus.py                       # generate the 46 documents
python3 src/run.py runbooks/triage-contracts.json
python3 src/run.py runbooks/triage-inbox.json
python3 src/run.py runbooks/redact.json --from out/run-latest.json
python3 src/report.py out/run-*.json               # -> out/report.html
```

```bash
make baseline                     # what pattern matching gets instead
make bakeoff                      # every model in the set, over every runbook
MODEL=qwen3.5:4b make contracts   # any single run, against any tag
```

The runner records which model and which machine produced each run.

</details>

## What it runs

Three runbooks over one corpus of 46 synthetic documents:

| Runbook | Work | Output |
|---|---|---|
| `triage-contracts.json` | Read 21 agreements, work out when each actually renews | Renewal calendar |
| `triage-inbox.json` | Read 25 emails, route each to an owner, flag personal data | Routing report |
| `redact.json` | Take whatever either triage flagged and make it safe to send out | Side by side, plus a survival scan |

`redact.json` runs over both corpora. The same redaction spec handles an email
and a lease, and the runner never learns which it is holding.

## Measured results

`gemma4:12b`, 46 documents, temperature 0, seed 7. It runs on a single 16 GB
consumer GPU, which is the bar for "reproduces on hardware you already own", and
every headline number here comes from it for that reason. Full provenance in
[`docs/RESULTS.md`](docs/RESULTS.md); raw run files in [`examples/`](examples/).

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

Across the five-model set, contract accuracy climbs steeply with size
(74.8% to 98.0%) while inbox accuracy stays nearly flat (90.0% to 96.0%). Good
enough is a property of the task, not of the model. Charts and the full table are
in [the write-up](docs/POST.md).

<details>
<summary>The five models, and why these five</summary>

| Tag | Lab | Size | Role |
|---|---|---|---|
| `gemma4:12b` | Google | 7.6 GB | primary, and the source of the numbers above |
| `qwen3.8:27b` | Alibaba | 18 GB | newest generation, the quality ceiling |
| `muse-glimmer:30b` | Meta | 18 GB | tuned for local agent work |
| `qwen3.5:9b` | Alibaba | 6.6 GB | mid-size point on the curve |
| `qwen3.5:4b` | Alibaba | 3.4 GB | deliberately small, to show where quality falls off |

`qwen3.8:27b` at q4 needs more than 16 GB; smaller quantizations start around
9 GB if that is your constraint. Bigger models work and score better. These are
the floor, not the ceiling.

</details>

## Where a regex stops working

`tools/baseline_regex.py` is a real attempt, not a strawman: it handles longhand
and numeric dates and looks for expiry wording near a date rather than grabbing
the first date it sees.

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
> below", with the execution date written in longhand in a signature block four
> paragraphs later.

> "coterminous with the Client's fiscal year", with the fiscal year end stated in
> a separate sentence that contains no date.

Six contracts that genuinely expire within 90 days return `unknown` from the
baseline. No additional patterns fix that, because it is arithmetic over a
reference the pattern cannot locate.

## The redaction gate

Every identifier planted in the corpus is listed in `corpus/PLANTED.json`, which
is never included in any prompt. After redaction, every planted string is scanned
against every redacted document. The scan gates on **direct identifiers** (names,
addresses, phone numbers, emails, account ids); facts about a person (medical,
employment, deal terms) are reported beside the gate but do not fail it, the same
line the HIPAA Safe Harbor de-identification standard draws.

```
redaction gate  (identifiers gate the result, facts are reported)
  model                gate  identifiers   facts  removals  retries
  gemma4:12b           PASS         0/10     1/4        24        0
  qwen3.8:27b          PASS         0/10     1/4        21        0
  muse-glimmer:30b     PASS         0/10     1/4        21        2
  qwen3.5:9b           PASS         0/10     3/4        19        0
  qwen3.5:4b           PASS         0/10     2/4        19        0
```

All five models pass: 0 of 10 planted identifiers survive on any model. Two
design decisions did most of that work, and both are about trusting the model
less, not more.

**The model finds the spans, code applies them.** Asked to both find and rewrite,
models reliably substituted short tokens and reliably left multi-line clauses
verbatim while correctly listing them as removals. Finding an identifying span is
judgment. Replacing a substring is not.

**An empty answer is suspicious, not clean.** `muse-glimmer:30b` returned zero
removal spans for a flagged document holding five planted identifiers, and every
structural check passed, because an empty array is structurally valid. The runner
now retries any flagged document that returns no removals, which recovered that
run from 3 leaked identifiers to none. A redaction pipeline without a
deterministic verifier is a hope, not a control.

## What went wrong building it

Six things. Five were defects in the runbook or the client, one was a defect in
the safety check, and none was the model being incapable. They are the
transferable part of this repo and each is written up in full in
[`docs/FINDINGS.md`](docs/FINDINGS.md).

| | |
|---|---|
| A reasoning model returns your JSON somewhere you are not looking | `qwen3.5:9b` scored 0/147 because Ollama put valid JSON in `thinking` and left `response` empty |
| A check that examines nothing must not report PASS | On that run, 5 of 6 checks passed vacuously |
| The safety gate was weaker than the thing it was gating | The survival scan could not detect a leak the redactor could remove |
| Ask the model for judgment, not for string replacement | It listed the clause to remove, correctly, then left it verbatim |
| Most "the small model is not good enough" was an underspecified runbook | Inbox 54% to 93%, contracts 77.6% to 93.2%, no model change |
| Run-to-run variance survives temperature 0 | Two identical redaction runs leaked different clauses |

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

<details>
<summary>Layout</summary>

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
  charts.py          the result charts, stdlib only
  diagram.py         the diagram at the top of this page, light and dark
docs/
  POST.md            the write-up of the whole experiment
  RESULTS.md         measured numbers with provenance
  FINDINGS.md        six things that went wrong and what they meant
  CORPUS.md          how the corpus was built, and what it does not prove
examples/            committed output, so you can look without running anything
out/                 runs and reports. Gitignored.
```

</details>

<details>
<summary>Notes on honesty</summary>

The report shows frontier work beside local work and deliberately shows **no
ratio between them**. Tokens are not fungible across models: a frontier token
that designed a schema is not the same unit as a local token that read one
document. The defensible claim is amortization, that the expensive capability was
needed once and the volume was handled locally, and that is what the page says.

Local token counts come from Ollama's own `prompt_eval_count` and `eval_count`.
They are measured, not estimated.

`format` in the Ollama API constrains generation. It does not validate. That is
why `checks.py` runs regardless, and Ollama's own documentation says the same.

What this repo does not establish: anything about real documents. The corpus is
synthetic by construction. See [`docs/CORPUS.md`](docs/CORPUS.md) for how it was
built and what it therefore cannot prove.

</details>

## License

[MIT](LICENSE). Built by [Naman Rajpal](https://namanrajpal.com).
