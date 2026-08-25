#!/usr/bin/env bash
# Runbook-quality ablation: hold the model fixed, vary the specification.
#
# The bake-off swept the model with the runbook fixed at its final version, so
# it measures only what a small model can do with a GOOD spec. This sweeps the
# other axis and measures what the spec itself was worth.
#
# Four rungs per task, climbing from a bare schema to the committed runbook.
# Each rung adds back one named thing, so the gain between two rungs is
# attributable to that addition rather than to spec quality in the abstract.
#
#   bash tools/ablation.sh
#
# Two models only: the top and bottom of the quality curve. The question here is
# "does the specification matter", not "which model wins", so the middle three
# add cost without adding evidence.
#
# Models are explicitly unloaded between sets. run.py pins with keep_alive:-1,
# which never expires, so sequential models otherwise stack in memory.

set -u
cd "$(dirname "$0")/.." || exit 1

read -ra MODELS <<< "${MODELS:-qwen3.5:4b gemma4:12b}"
OUT="out/ablation"
mkdir -p "$OUT"

python3 tools/ablation_runbooks.py || exit 1
echo

for m in "${MODELS[@]}"; do
  slug="$(echo "$m" | tr '/:' '--')"

  for task in triage-contracts triage-inbox; do
    for rung in v0 v1 v2 v3; do
      # v3 is the committed runbook itself, not a generated rung.
      if [ "$rung" = "v3" ]; then
        rb="runbooks/$task.json"
      else
        rb="runbooks/ablation/$task.$rung.json"
      fi

      echo "=== $m / $task / $rung ==="
      python3 src/run.py "$rb" \
        --model "$m" \
        --device-label "MacBook Pro M4 Pro" \
        --out "$OUT" > "$OUT/log-$slug-$task-$rung.txt" 2>&1

      if [ -f "$OUT/run-latest.json" ]; then
        cp "$OUT/run-latest.json" "$OUT/run-$slug-$task-$rung.json"
        python3 tools/score.py "$OUT/run-$slug-$task-$rung.json" \
          > "$OUT/score-$slug-$task-$rung.txt" 2>&1
        grep -E "OVERALL" "$OUT/score-$slug-$task-$rung.txt" | head -1
      else
        echo "  FAILED, see $OUT/log-$slug-$task-$rung.txt"
        tail -n 5 "$OUT/log-$slug-$task-$rung.txt"
      fi
    done
    echo
  done

  echo "--- unloading $m ---"
  curl -s http://localhost:11434/api/generate \
    -d "{\"model\":\"$m\",\"keep_alive\":0,\"prompt\":\"\"}" > /dev/null 2>&1
  sleep 2
done

echo
echo "=== ladder ==="
python3 tools/ablation_table.py
