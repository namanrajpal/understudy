# Findings

Six things that went wrong while building this, and what each one turned out to
mean. They are here because they are the transferable part. The corpus is
synthetic and the runbooks are specific to it, but every one of these failures
will happen to anyone wiring a small local model into a document workflow.

Five of the six were defects in the runbook or the client. One was a defect in
the safety check. None of them was the model being incapable.

---

## 1. A reasoning model returns your JSON somewhere you are not looking

**Symptom.** `qwen3.5:9b` scored **0 out of 147**. Not a low score, a zero: no
correct field on any document. Every record came back `needs_review`.

**Cause.** The qwen3.x family runs in reasoning mode by default. In that mode
Ollama places the generated JSON in the response's `thinking` field and returns
`response` as an **empty string**. A client that reads only `response` gets
`""`, fails to parse, and marks everything unusable. The JSON was valid and
complete the entire time, one key away.

**Fix.** `src/model.py` sends `"think": false` for extraction calls, and reads
`thinking` as a fallback when `response` is empty. Score went from 0% to
**73.8%** with no prompt change.

**Why it matters beyond this repo.** "We tried a small model and it could not do
it" is a conclusion people reach and publish. This is what that conclusion looks
like from the inside when the real problem is one field name. Any bake-off across
model families needs to handle reasoning output before it reports a number.

---

## 2. A check that examines nothing must not report PASS

**Symptom.** On the run above, where zero records parsed, **five of six checks
reported PASS.**

**Cause.** Each check iterated the parsed records, found none, collected no
failures, and fell through to "no failures, therefore pass". Vacuous truth.

**Fix.** `_vacuous()` in `src/checks.py` fails any check that examined zero
records, reporting it as inconclusive rather than passing. The same run now
reports 0 of 4 passing.

**Why it matters beyond this repo.** This is the most dangerous class of bug in
the repo, because it points the wrong way. A broken pipeline that reports green
is worse than one that reports red. If a validation layer can pass without
looking at anything, it will eventually do so at the worst possible moment.

---

## 3. The safety gate was weaker than the thing it was gating

**Symptom.** The redaction survival scan reported `0 of 14 planted identifiers
survived redaction. PASS.` The real number was **1 of 14**.

**Cause.** Two different matchers. `redact_apply.py` matched removal spans
whitespace-flexibly, because a model quoting a clause back from a document with
hard line breaks routinely returns it with the newlines in different places. The
survival scan used plain `in` substring matching. So the redactor could remove a
re-wrapped clause, but the scan could not detect that same clause if it
survived.

Six of the twenty-one planted identifiers only match across a line break. Those
were unfindable by the scan, so they were counted as removed without ever being
examined. The gate was reporting PASS for identifiers it could not see, which is
precisely the failure mode it exists to catch.

**Fix.** `checks.py` imports `flexible()` from `redact_apply.py`. One matcher,
used by both the removal and its verification. `tools/validate.py` uses the same
one, and now reports how many identifiers only match across a line break so the
asymmetry cannot silently return.

**Why it matters beyond this repo.** A verifier and the thing it verifies must
agree on what "the same string" means. When they disagree, the weaker one decides
the answer, and if the weaker one is the verifier you get a false pass. This is
worth checking in any redaction, DLP, or content-filter pipeline: is the scan at
least as strong as the redactor?

---

## 4. Ask the model for judgment, not for string replacement

**Symptom.** The model correctly identified `a wage garnishment order for unpaid
child support` as an employment detail, listed it in `removals` with the right
category, and then left it verbatim in `redacted_text`.

**Cause.** The call asked for two jobs at once: find the identifying spans, and
rewrite the document with them replaced. Measured on `gemma4:12b`, short spans
(names, phone numbers, addresses, account ids) were substituted reliably, while
multi-line clauses were listed correctly and then not removed. It knew what to
remove and did not remove it.

**Fix.** `src/redact_apply.py` performs the substitution in code from the
model's `removals` list. The model supplies judgment, the code supplies the
mechanical step.

**Why it matters beyond this repo.** This is the repo's own thesis one level
down. Finding an identifying span is judgment and needs a model. Replacing a
substring is not and does not. Splitting them made the output exact and
auditable, and the audit report distinguishes a span that was *absorbed* by a
longer replacement from one that was *not found at all*, because conflating those
two would misreport the redaction.

---

## 5. What the runbook is worth, measured

Both triage tasks started poorly and both were fixed by writing a better
specification while holding the model fixed.

That was originally recorded as development history rather than as an experiment.
I ran the task, read the errors, rewrote the runbook, ran it again. One model, no
control, and the underspecified runbook was never committed, so the figures could
not be reproduced by anyone including me.

They can now. `tools/ablation_runbooks.py` reconstructs the defective runbook as a
four-rung ladder by exact, asserted deletion from the committed one, and
`tools/ablation.sh` runs the whole ladder across two models. Sixteen runs. Each
rung adds back one named piece of specification, so the gain between two rungs is
attributable to that addition rather than to spec quality in the abstract.

![Runbook quality ablation](charts/runbook-ladder.svg)

**Inbox triage, 25 emails.**

| Rung | Added at this rung | `gemma4:12b` | `qwen3.5:4b` |
|---|---|---|---|
| v0 | bare schema, no field guidance | 55.0% | 71.0% |
| v1 | category, owner, personal-data definitions | 75.0% **+20.0** | 87.0% **+16.0** |
| v2 | `urgency` values defined | 93.0% **+18.0** | 92.0% **+5.0** |
| v3 | reference date supplied (committed runbook) | 93.0% **+0.0** | 91.0% **-1.0** |
| | **total climb** | **+38.0** | **+20.0** |

**Contract triage, 21 contracts.**

| Rung | Added at this rung | `gemma4:12b` | `qwen3.5:4b` |
|---|---|---|---|
| v0 | bare schema, no field guidance | 77.6% | 65.3% |
| v1 | doc_type, renewal_basis, notice_days, personal-data definitions | 81.6% **+4.0** | 58.5% **-6.8** |
| v2 | counterparty perspective stated | 84.4% **+2.8** | 69.4% **+10.9** |
| v3 | date arithmetic rules and worked examples (committed runbook) | 93.2% **+8.8** | 74.8% **+5.4** |
| | **total climb** | **+15.6** | **+9.5** |

### Whether you need a better spec or a better model depends on the task

| Task | Better runbook is worth | Bigger model is worth |
|---|---|---|
| inbox triage | **+38.0** | +2.0 |
| contract triage | +15.6 | **+18.4** |

The runbook column holds the model at `gemma4:12b` and climbs v0 to v3. The model
column holds the runbook at v3 and upgrades `qwen3.5:4b` to `gemma4:12b`.

Inbox triage is **specification-limited**: writing down what the words mean beat a
3.5x larger model nineteen times over. Contract triage is **model-limited**:
interpreting a clause and computing a renewal date from a signature block needs
the bigger model, and no amount of specification closes that gap. Classification
into short lists rewards a better spec. Interpretation and arithmetic reward a
better model.

### A defective instruction is worse than no instruction

`qwen3.5:4b` on contracts **dropped 6.8 points below the bare schema** at v1, the
only backwards step in the ladder. That rung introduces the defective renewal
date rule alongside the field definitions, and the 4B followed it faithfully into
the +1 year error. `gemma4:12b` partly ignored the same bad rule and gained 4.0.

Spec defects do not degrade models equally, they punish the small one hardest.
That is the argument for the runbook being committed, reviewable text rather than
a prompt somebody typed once: the reviewer is the control.

### One fix I credited did nothing

This section previously attributed the inbox recovery to "no reference date and no
enum definitions". Measured, the reference date was worth **+0.0 on `gemma4:12b`
and -1.0 on `qwen3.5:4b`**. The enum and field definitions carried all 38 points.

The likely reason is mundane: `.eml` files carry their own `Date` header, so the
model already had today's date from the document. I had credited a redundant fix
for two days, and only measuring caught it.

### The reconstruction landed on the original numbers

The reconstruction was expected to miss, since the original prompt no longer
exists. It did not. Inbox v0 came back at **55.0%** against the 54.0% recorded at
the time, and contracts reproduced **77.6% to 93.2%** on both endpoints exactly.

Every rung now carries its own `version` string, which fixes the defect that made
the original figures unreproducible: `version` stayed `"1.0"` across the rewrite,
so the run files could not say which variant produced them.

### Determinism, as a side effect

All four v3 rungs are byte-identical to the corresponding bake-off runs across
**92 of 92 parsed records**, on runs made days apart through a different harness.
Triage at temperature 0 is reproducible on this hardware. Redaction is not, for
the reason in finding 6.

### The discipline that matters

Only genuine specification defects were fixed: undefined enum values, a missing
reference date, an ambiguous field definition, a boundary condition. No
per-document hints were ever added, and ground truth is never in a prompt.
`tools/validate.py` enforces the second part, and the ablation rungs are strict
subsets of the committed prompt so the property holds for them by construction.

Tuning a prompt until ground truth looks good produces a number that means
nothing, and the distinction between fixing a spec and fitting an answer is the
whole difference between a measurement and a demo.

The diagnostic pattern that made each defect findable was that the errors were
not scattered, they were *systematic*:

- **Inbox `urgency` scored 24%**, and 19 of 19 misses collapsed to the single
  value `today`. With no definition of the values, every email reads as urgent.
  That is a model answering a question that was never asked precisely.
- **Inbox `contains_personal_data` was over-triggering**, flagging any email
  whose `From` header named a person. Defensible reading, useless result: it
  would have pushed 10 of 25 emails into the redaction gate instead of 3.
- **Contracts `counterparty` scored 52%**, returning the client's own name about
  half the time. The prompt said "extract the counterparty" and never said whose
  perspective that was from.
- **Contracts `renewal_date` was wrong by exactly +1 year on all eleven misses.**
  The instruction said to compute the next renewal "on or after today", and today
  already satisfied it, so the model advanced one step too far. An
  inclusive/exclusive boundary bug in English rather than in code.

Reproduce with `bash tools/ablation.sh`, roughly 30 minutes on an M4 Pro. Rungs v0
to v2 are re-derived reconstructions and are labelled as such in the runbooks
themselves.

---

## 6. Run-to-run variance survives temperature 0

Two runs of the redaction runbook with the same model, same runbook, same
corpus, and temperature 0 leaked **different** identifiers: one leaked `was
written up twice in 2024 for the same behaviour`, the other leaked `a wage
garnishment order for unpaid child support`. Both are multi-line narrative
clauses, which is the known weak class from finding 4.

The inputs were verified identical rather than assumed: byte-identical prompt
(2,239 characters), identical sampling options (`temperature 0, seed 7,
num_ctx 8192`), same model, same three flagged documents. `runbooks/redact.json`
was in fact edited between the two runs, but only to add the `flagged_not_empty`
check, which runs after the model and does not touch the prompt.

Temperature 0 makes sampling deterministic: the rule becomes "always take the
highest-scoring token". It does not guarantee that the scores themselves come out
bit-identical on every run, because floating-point reductions on a GPU depend on
the order work gets batched. Where the top two candidates are nearly tied, a
difference in the last bits can swap the winner. That is the standard explanation
and it fits what was observed here, but it was not instrumented, so treat it as a
plausible cause rather than a measured one. The observation is the part that
matters.

Why this task and not triage: `urgency` picks one of three values and the right
answer usually wins by a wide margin, so nothing flips, which is why triage came
back byte-identical across 92 of 92 records. Redaction asks the model to
enumerate spans and decide where each one starts and stops, and several
boundaries are genuinely near-tied. One flipped token changes the whole span, and
the apply step only removes text the model actually quoted.

So the honest claim about the redaction gate is not "it removes everything". It is
that the model reliably catches name-shaped tokens, is inconsistent on narrative
clauses, and **the deterministic scan is what turns that inconsistency into a
caught failure rather than a leak**.

That is a better argument than a clean pass would have been. A redaction
pipeline without a deterministic verifier is a hope, not a control.
