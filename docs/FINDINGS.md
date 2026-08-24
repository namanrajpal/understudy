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

## 5. Most "the small model is not good enough" was an underspecified runbook

Both triage tasks started poorly and both were fixed by writing a better
specification, not by changing model.

| Task | Before | After | What was actually wrong |
|---|---|---|---|
| Inbox | 54.0% | **93.0%** | No reference date and no enum definitions |
| Contracts | 77.6% | **93.2%** | Never said which of the two parties to return |

The diagnostic pattern in each case was that the errors were not scattered, they
were *systematic*:

- **Inbox `urgency` scored 24%**, and 19 of 19 misses collapsed to the single
  value `today`. With no reference date and no definition of the values, every
  email reads as urgent. That is not a model failing at classification, it is a
  model answering a question that was never asked precisely.
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

**The discipline that matters.** Only genuine specification defects were fixed:
undefined enum values, a missing reference date, an ambiguous field definition, a
boundary condition. No per-document hints were ever added, and ground truth is
never in a prompt. `tools/validate.py` enforces the second part. Tuning a prompt
until ground truth looks good produces a number that means nothing, and the
distinction between fixing a spec and fitting an answer is the whole
difference between a measurement and a demo.

---

## 6. Run-to-run variance survives temperature 0

Two runs of the redaction runbook with the same model, same runbook, same
corpus, and temperature 0 leaked **different** identifiers: one leaked `was
written up twice in 2024 for the same behaviour`, the other leaked `a wage
garnishment order for unpaid child support`. Both are multi-line narrative
clauses, which is the known weak class from finding 4.

Temperature 0 makes sampling deterministic. It does not make the whole system
deterministic across differing batch and memory conditions. So the honest claim
about the redaction gate is not "it removes everything". It is that the model
reliably catches name-shaped tokens, is inconsistent on narrative clauses, and
**the deterministic scan is what turns that inconsistency into a caught failure
rather than a leak**.

That is a better argument than a clean pass would have been. A redaction
pipeline without a deterministic verifier is a hope, not a control.
