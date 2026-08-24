# Handoff: write the blog post

Everything below is measured and committed. Do not re-derive it; read the files
named here. Numbers live in `out/bakeoff/summary.json`, `examples/bakeoff-table.txt`,
`out/VERIFY.txt`, `out/baseline-regex.json`.

## What this repo is

A frontier model authors a **runbook** once, online: the steps, the output
schema, the validation checks, what to do on failure. It is committed as JSON. A
small local model then executes that runbook over a folder of documents, offline,
supplying the per-document judgment the runbook cannot contain.

Reasoning that happens **once** lives in the runbook. Reasoning that happens
**every run** happens locally.

Three runbooks (`triage-inbox`, `triage-contracts`, `redact`) over 46 synthetic
documents (25 emails, 21 contracts). One runner. `redact.json` runs over both
corpora and the runner never learns which it is holding.

## The lede, and it is not the benchmark

The world does not need another local-model leaderboard. What this repo actually
found is that **four separate "the small model failed" results were not the model
failing.** Three were bugs in the harness and one was a bad scoring policy that I
wrote myself.

1. **`qwen3.5:9b` scored 0 of 147.** Every field, every document. The qwen3.x
   family runs in reasoning mode by default and Ollama then returns the JSON in
   the response's `thinking` field, leaving `response` an empty string. Reading
   only `response` gave `""`, so all 21 documents were marked `needs_review`.
   Fixed: 0% to 81%.

2. **Five of six checks reported PASS on that dead run.** They iterate over parsed
   records, found none, and fell through to "no failures found". A validation
   suite that certifies a run which produced literally nothing is worse than no
   suite. Checks with an empty sample now fail as inconclusive.

3. **`muse-glimmer:30b` scored 0 of 147** because it appends its end-of-turn token
   after the JSON: `{"doc_type":"maintenance",...}<|eot|>`. Its very first contract
   had all seven fields correct and was scored zero. Fixed: 0% to 94.6%, second
   best in the set.

4. **The redaction gate reported FAIL on all five models, and that was my scoring
   policy, not a model defect.** I had lumped direct identifiers (name, address,
   phone, email, account id) together with facts about a person (medical,
   employment, deal terms) into one number. Split apart, four of five models
   removed 10 of 10 identifiers and every survivor was a fact. Under a
   de-identification standard (the HIPAA Safe Harbor model) the identifiers go and
   the facts deliberately remain, because de-identified records are useful
   precisely because the substance survives.

Three of five models were briefly "broken" and none of them were. If you are
benchmarking small local models and one scores impossibly badly, suspect your
client before you conclude anything about the model.

## Results

Read `examples/bakeoff-table.txt` for the full table. Headline figures:

Contract triage, 21 documents: `qwen3.8:27b` 98.0%, `muse-glimmer:30b` 94.6%,
`gemma4:12b` 93.2%, `qwen3.5:9b` 81.0%, `qwen3.5:4b` 74.8%.

Inbox triage, 25 documents: `muse-glimmer:30b` and `qwen3.8:27b` tie at 96.0%,
`gemma4:12b` 93.0%, `qwen3.5:4b` 91.0%, `qwen3.5:9b` 90.0%.

**Quote headline numbers from `gemma4:12b`.** It is the only model in the set that
fits 16 GB of VRAM, and quoting a 27B or 30B result as the result would quietly
break the "reproduces on hardware you already own" claim.

### Five findings that matter more than the ranking

1. **"Good enough" depends on the task, not the model.** `qwen3.5:4b` scores
   91.0% on inbox and 74.8% on contracts. Same model, same run, 16 points apart.
   Inbox triage is classification into short enumerated lists. Contract triage
   requires reading a clause, picking one of five renewal regimes, then computing
   a date from a reference elsewhere in the document.

2. **The field that gates the privacy decision is the most reliable field.**
   `contains_personal_data` is 100% on all five models, both corpora, 3.4 GB to
   18 GB. It decides what enters redaction and therefore what could be sent
   onward, and it is the one field that never degraded with size.

3. **Every model passed every structural check, which proves nothing.** All five
   scored 6/6 and 5/5, including the 4B at 42.9% on `renewal_date`. Ollama's
   `format` constrains generation, not meaning. Valid output and correct output
   are different properties.

4. **`renewal_basis` has a cliff, not a slope.** 100% for the top three, 66.7% for
   both qwen3.5 models, nothing between.

5. **Speed and accuracy trade steeply.** 28 to 30 tok/s at 4B, 5 at 27B. Six times
   faster for roughly 23 points of contract accuracy. Free for an overnight batch,
   decisive for anything interactive.

### The regex comparison

`tools/baseline_regex.py` is a real attempt, not a strawman: longhand and numeric
dates, expiry wording near a date rather than the first date in the file.

Overall `renewal_date`: baseline 57.1%, `gemma4:12b` 76.2%, `qwen3.8:27b` 95.2%.
By basis, the baseline gets `fixed_date` 85.7% and `auto_renew_unless_notice`
100%, then **0 of 5** on `anniversary_of_execution` and **0 of 3** on
`fiscal_year_end`. Six contracts that genuinely expire within 90 days come back
`unknown`, because in each the renewal date is not written in the document:

> "renews automatically on each anniversary of the date of execution set forth
> below" - with that date in longhand in a signature block four paragraphs later

> "coterminous with the Client's fiscal year" - with the fiscal year end in a
> separate sentence containing no date at all

### Redaction, after the retry

Every model now passes. `muse-glimmer:30b` was the one failure and the cause was
mechanical, not judgment: it returned **zero spans** for the HR complaint holding
five planted identifiers, including a child's medical condition, while every
structural check passed, because an empty array is structurally valid. The runner
now retries when a flagged document returns no removals, and it recovered from 3
leaked identifiers to none.

Also worth the paragraph: the model finds the spans but **code applies them**.
Asked to both find and substitute, models reliably replaced short tokens and
reliably left multi-line clauses in place while correctly listing them as
removals. Finding an identifying span is judgment. Replacing a substring is not.

## Charts

Four SVGs in `docs/charts/`, generated by `tools/charts.py` from the run JSON:

| file | carries |
|---|---|
| `accuracy-by-size.svg` | two lines diverging: contracts steep, inbox flat |
| `contract-fields.svg` | per-field heatmap, the `renewal_basis` cliff, the flat 100% row |
| `regex-vs-model.svg` | where the date is not in the document, regex is zero |
| `redaction-gate.svg` | identifiers as the gate, facts reported beside |

Hand-rolled SVG with the standard library only. No matplotlib, no CDN, because a
chart script needing a pip install would break the repo's own stdlib-only claim.
GitHub renders SVG inline in markdown. Regenerate with `python3 tools/charts.py`.

## Writing constraints

- **No em-dashes.** Colons, commas, semicolons, or sentence breaks.
- **State things directly and factually.** Name the thing as the headline. No
  rhetorical constructions that correct a strawman, no unsupported superlatives,
  no marketing cadence. Nothing is being sold.
- **Casual but precise.** Smart non-specialist reader. Explain terms plainly while
  keeping claims exact and evidence-led. Not movie-like storytelling.
- **Never claim local is faster.** Total response time is dominated by model size
  and device compute; a small model on modest hardware can be slower end to end
  than a frontier model over a good connection. Defensible claims are
  predictability (response time stops depending on the network), availability
  (works offline), and cost (repeated runs cost nothing remote).
- **No token ratios between frontier and local.** Tokens are not fungible across
  models. The defensible claim is amortization: the expensive capability was
  needed once, the volume was handled locally.
- Every document in `corpus/` is synthetic. Say so. No real person or agreement
  appears anywhere.

## Two decisions the post needs

1. **Repo name.** Currently `local-runbook`. Candidates: `understudy` (carries the
   once/every-run metaphor), `local-runbook` (plain and findable), `paperwork`
   (non-technical friendly). Ask before renaming; it changes every path.

2. **Where the post lives.** `README.md` is currently a reference document. Either
   the post becomes the README with the reference material moving to `docs/`, or
   the post is `docs/POST.md` and the README links to it.

## Do not

- Do not re-run the models. The data is committed and reproducing it takes hours.
- Do not tune any prompt to improve a number. The residual failures are
  deliberately visible: on 4 of 5 anniversary-basis contracts the model lands
  exactly one year past the correct date, getting `renewal_basis` 100% right and
  the multi-year arithmetic wrong. Those are the records a sensible pipeline
  escalates, and that honesty is the point.
- Do not use `corpus/PLANTED.json` or `corpus/TRUTH.json` in any prompt.
  `tools/validate.py` asserts they never appear.
