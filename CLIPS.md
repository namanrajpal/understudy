# Clip storyboards

Three short recorded clips. Each is one command, one screen, one point.

Recording notes that apply to all three:

- Terminal at a large font. The step names are the content; if the back row
  cannot read them the clip does nothing.
- Do not narrate the mechanics while they run. The step names already say what
  is happening. Narrate the *conclusion* after the checks land.
- Warm the model before recording (`ollama run gemma4:12b ""` then exit) so the
  first document does not pay a cold-start penalty on camera.
- Run `python3 tools/make_corpus.py` once before recording so the corpus is
  freshly generated and the run is honest.

The pipeline prints a named-step trace by design. That trace is the visual, and
it exists because a scrolling dump of tool-call JSON reads as noise to anyone who
is not already convinced.

---

## Clip 1: Inbox triage at scale

**Length:** about 60 seconds.
**Command:**

```bash
python3 src/run.py runbooks/triage-inbox.json
```

**What is on screen, in order:**

| Beat | On screen |
|---|---|
| 1 | The runbook header: purpose, "authored by frontier model, once", "executed by gemma4:12b, on this machine, now" |
| 2 | `1. Read the inbox from disk` -> `25 documents, N chars` |
| 3 | `2. Classify and extract from each email` with a live `n/25` counter advancing |
| 4 | `3. Validate every record` -> five PASS lines |
| 5 | `4. Assemble the routing report` |
| 6 | Result block: documents, local calls, measured tokens, throughput, wall clock |

**Then cut to the report page** (`out/report.html`) showing the routing table:
category, urgency, owner, one-line summary, one-line action per email, with the
`today` rows flagged.

**The line to say, after the checks land:**

> Twenty-five emails, read one at a time by a twelve-billion-parameter model on
> this laptop. Every one categorised, assigned an owner, and given an action.
> Three were flagged as holding personal data, and we will come back to those.

**Why this clip is first:** everyone in the room has an inbox. It needs no
setup, and it earns the attention for the two clips that follow.

**What NOT to claim:** do not say it is "as good as a human". Say what the
scoreboard says. Inbox accuracy is 93.0% against ground truth, and the misses
are mostly `urgency`, which is genuinely a judgment call.

---

## Clip 2: Contract triage, and the regex beat

**Length:** about 90 seconds. This is the most important clip.
**Commands:**

```bash
python3 src/run.py runbooks/triage-contracts.json
python3 tools/baseline_regex.py
```

**Part A, the run.** Same shape as clip 1: named steps, live counter over 21
contracts, six PASS lines, then the renewal calendar on the report page grouped
by `renewal_basis` with the expiring rows flagged.

**Part B, the comparison.** This is the beat. Put the baseline output on screen:

```
  renewal_basis                  correct
  anniversary_of_execution        0/5      0.0%
  auto_renew_unless_notice        5/5    100.0%
  fiscal_year_end                 0/3      0.0%
  fixed_date                      6/7     85.7%

  OVERALL                        12/21   57.1%

  contracts expiring within 90 days that the baseline gets wrong: 6
```

**Part C, show why.** Cut to the actual contract text for one of the zero rows.
`corpus/contracts/007-service-agreement-alder-creek.txt`:

> "renews automatically on each anniversary of the date of execution set forth
> below"

and then, four paragraphs later:

> "IN WITNESS WHEREOF the parties have executed this Agreement this eighteenth
> day of September, 2023."

**The line:**

> A pattern match can find a date. It cannot work out that this contract renews
> in September, because the date is not in the document. It has to be computed
> from a signature written in longhand four paragraphs away. The regex gets zero
> of five of these. The local model gets the category right every time and the
> arithmetic right most of the time.

**The honesty beat, and do not skip it:** on four of the five anniversary
contracts the model lands exactly one year late. Say so:

> It identifies what kind of renewal this is perfectly, a hundred percent. Then
> it does the year arithmetic wrong on four of five. Those four are exactly the
> records you would escalate to a bigger model, and the checks are what tell you
> which four.

That admission is worth more than the win. It is what makes the 93% believable
and it sets up the escalation argument for free.

---

## Clip 3: The redaction gate

**Length:** about 60 seconds.
**Command:**

```bash
python3 src/run.py runbooks/redact.json --from out/run-latest.json
```

**What is on screen:**

| Beat | On screen |
|---|---|
| 1 | `1. Collect every document flagged as sensitive` -> `N documents`. Note out loud that nothing was hand-picked; triage decided this. |
| 2 | `2. Remove identifying detail from each one` |
| 3 | `3. Scan the output for anything that survived` |
| 4 | **`[PASS] survival_scan   0 of 14 planted identifiers survived redaction`** |

**Then cut to the side-by-side** on the report page. Zoom on
`025-internal-hr-payroll-detail.eml`. Left pane has the original with removals
highlighted. Right pane:

```
We received a court order this morning affecting [PERSON_NAME], emp id
[EMPLOYMENT_ID].

[EMPLOYMENT_DETAIL]

Payroll closes Tuesday. I need written instruction on whether to apply it this
cycle or next...
```

**The line:**

> Every identifier in this corpus was planted deliberately, and the list lives in
> a file the model never sees. After redaction, every one of those strings is
> scanned against every redacted document. Zero survived. That is not the model
> reporting its own homework; it is a separate check that fails loudly.

**The closing beat, which is the whole talk in one sentence:**

> This redacted version is the one you would send to a frontier model. The
> decision about what was safe to send was made here, on this machine.

**One thing worth mentioning if the room is technical:** this clip failed during
development. The model correctly identified the sensitive clauses, listed them,
and then did not remove them from the text. The fix was to stop asking the model
to do the string replacement and do it in code from the model's own findings.
Finding an identifying span is judgment. Replacing a substring is not.

---

## Optional fourth beat: the model curve

Not a clip, a single slide from `out/bakeoff/summary.json`. The same runbook and
the same corpus across five models from 4B to 30B, showing where accuracy falls
off and where the checks start failing.

The argument this makes: you do not need the biggest model, you need to know
which model is good enough for your task, and that is measurable in an afternoon
rather than a matter of opinion.

---

## Sequence and total

| | Clip | Length |
|---|---|---|
| 1 | Inbox triage at scale | 1:00 |
| 2 | Contract triage and the regex beat | 1:30 |
| 3 | Redaction gate | 1:00 |
| | **Total** | **3:30** |

Clip 2 is the one to protect if time gets cut. Clip 1 is the one to drop.
