#!/usr/bin/env bash
# Model bake-off: same runbooks, same corpus, three model sizes.
#
# The point is not to crown a winner. It is to show where quality falls off as
# the model gets smaller, so "how good is good enough" is a measured question
# rather than an assertion. qwen3.5:4b is in here specifically because it is
# expected to break, and where it breaks is the interesting part.
#
#   bash tools/bakeoff.sh
#
# Writes out/bakeoff/ and prints a comparison table.

set -u
cd "$(dirname "$0")/.." || exit 1

# Override with: MODELS="gemma4:12b gemma4:26b" bash tools/bakeoff.sh
# Default set spans four labs and 4B to 30B, so the quality curve is real.
# Headline numbers should be quoted from gemma4:12b, the largest that fits a
# 16 GB consumer GPU. Ordered smallest-VRAM-first so a run that dies on memory
# still leaves the reproducible rows complete.
read -ra MODELS <<< "${MODELS:-qwen3.5:4b gemma4:12b qwen3.5:9b qwen3.8:27b muse-glimmer:30b}"
OUT="out/bakeoff"
mkdir -p "$OUT"

for m in "${MODELS[@]}"; do
  slug="$(echo "$m" | tr '/:' '--')"
  for rb in triage-contracts triage-inbox; do
    echo "=== $m / $rb ==="
    python3 src/run.py "runbooks/$rb.json" \
      --model "$m" \
      --device-label "MacBook Pro M4 Pro" \
      --out "$OUT" > "$OUT/log-$slug-$rb.txt" 2>&1

    if [ -f "$OUT/run-latest.json" ]; then
      cp "$OUT/run-latest.json" "$OUT/run-$slug-$rb.json"
      python3 tools/score.py "$OUT/run-$slug-$rb.json" \
        > "$OUT/score-$slug-$rb.txt" 2>&1
      tail -n 14 "$OUT/score-$slug-$rb.txt" | head -n 11
    else
      echo "  FAILED, see $OUT/log-$slug-$rb.txt"
      tail -n 5 "$OUT/log-$slug-$rb.txt"
    fi
    echo
  done

  # Redaction, chained off this model's own inbox run so the flags are its own.
  if [ -f "$OUT/run-$slug-triage-inbox.json" ]; then
    echo "=== $m / redact ==="
    python3 src/run.py runbooks/redact.json \
      --from "$OUT/run-$slug-triage-inbox.json" \
      --model "$m" \
      --device-label "MacBook Pro M4 Pro" \
      --out "$OUT" > "$OUT/log-$slug-redact.txt" 2>&1
    [ -f "$OUT/run-latest.json" ] && cp "$OUT/run-latest.json" "$OUT/run-$slug-redact.json"
    grep -E "survival_scan|removals|checks " "$OUT/log-$slug-redact.txt" | head -4
    echo
  fi
done

echo "================ SUMMARY ================"
python3 tools/bakeoff_table.py
