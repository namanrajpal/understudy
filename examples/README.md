# Example output

Committed so you can see what this produces without installing Ollama or pulling
a model. All of it came from `gemma4:12b` (digest `4eb23ef187e2`) on a MacBook Pro
M4 Pro, 2026-08-23, temperature 0, seed 7.

| File | What it is |
|---|---|
| `report.html` | The deliverable. Open it in a browser. Self-contained, no CDN, no external requests. |
| `run-contracts-gemma4-12b.json` | Full run record: 21 contracts, per-call token counts and timings, all six checks |
| `run-inbox-gemma4-12b.json` | Full run record: 25 emails |
| `run-redact-gemma4-12b.json` | Full run record: redaction over the three flagged emails, including the failing survival scan |
| `score-contracts-gemma4-12b.txt` | Per-field accuracy against ground truth, with every miss listed |
| `score-inbox-gemma4-12b.txt` | Same, for the inbox |
| `baseline-regex.json` | What pattern matching gets on the same contracts, for comparison |

The numbers in these files are the ones quoted in [`docs/RESULTS.md`](../docs/RESULTS.md).

## One note on `run-redact-gemma4-12b.json`

Its `survival_scan` check reports **FAIL, 1 of 14 planted identifiers survived**,
and carries a `rescored` field.

The run originally recorded PASS with 0 of 14. That was wrong. The scan used
stricter string matching than the redactor it was verifying, so identifiers whose
line breaks differed from the manifest were invisible to it and were counted as
removed without being examined. The check was fixed to use the same matcher the
redactor uses, and this record was re-evaluated against the model's original
unmodified output.

The model's output was not changed and the run was not repeated. Only the verdict
on it was recalculated with a working check.

Full write-up in
[`docs/FINDINGS.md`](../docs/FINDINGS.md#3-the-safety-gate-was-weaker-than-the-thing-it-was-gating).

## Reproducing

```bash
make all      # contracts, inbox, redact, then rebuild the report
make score    # accuracy against ground truth
```

Output lands in `out/`, which is gitignored. These committed copies are snapshots,
not live output.
