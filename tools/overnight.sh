#!/usr/bin/env bash
# Unattended chain: wait for pulls, run the bake-off, build the table, verify.
#
#   nohup bash tools/overnight.sh > /tmp/overnight.log 2>&1 &
#
# Writes a machine-readable status to out/OVERNIGHT_STATUS so a monitoring
# agent can report progress without re-deriving it from logs.
#
# Deliberately does NOT commit. Results land in out/ (gitignored) and the
# human or the monitoring agent decides what is worth promoting.

set -u
cd "$(dirname "$0")/.." || exit 1
mkdir -p out

STATUS="out/OVERNIGHT_STATUS"
say() { printf '%s  %s\n' "$(date +%H:%M:%S)" "$1"; printf '%s\n' "$1" > "$STATUS"; }

export PATH="/Applications/Ollama.app/Contents/Resources:$PATH"

# ---------------------------------------------------------------- 1. pulls
say "PHASE 1: waiting for model pulls"
for i in $(seq 1 240); do          # up to 2h
  if pgrep -f "ollama pull" > /dev/null; then sleep 30; else break; fi
done

HAVE=$(ollama list 2>/dev/null | tail -n +2 | awk '{print $1}' | tr '\n' ' ')
say "PHASE 1 done. models: $HAVE"

# Only bake off models actually present, so one missing pull does not
# abort the whole run.
WANT=(qwen3.5:4b gemma4:12b qwen3.5:9b qwen3.8:27b muse-glimmer:30b)
PRESENT=()
for m in "${WANT[@]}"; do
  case " $HAVE " in *" $m "*) PRESENT+=("$m");; esac
done
say "PHASE 2: bake-off over ${#PRESENT[@]} models: ${PRESENT[*]}"

# ------------------------------------------------------------- 2. bake-off
MODELS="${PRESENT[*]}" bash tools/bakeoff.sh > out/bakeoff-run.log 2>&1
say "PHASE 2 done. bake-off finished, $(ls out/bakeoff/run-*-triage-*.json 2>/dev/null | grep -vc latest) triage runs"

# ---------------------------------------------------------------- 3. table
say "PHASE 3: building comparison table"
python3 tools/bakeoff_table.py > out/bakeoff/TABLE.txt 2>&1
say "PHASE 3 done"

# ------------------------------------------------- 4. reproducibility check
say "PHASE 4: reproducibility check"
{
  echo "=== corpus determinism: regenerate and compare ==="
  find corpus -type f \( -name '*.eml' -o -name '*.txt' -o -name '*.json' \) \
    -exec shasum {} \; | sort > /tmp/corpus-before.sha
  python3 tools/make_corpus.py > /dev/null 2>&1
  find corpus -type f \( -name '*.eml' -o -name '*.txt' -o -name '*.json' \) \
    -exec shasum {} \; | sort > /tmp/corpus-after.sha
  if diff -q /tmp/corpus-before.sha /tmp/corpus-after.sha > /dev/null; then
    echo "PASS  corpus regenerates byte-identical"
  else
    echo "FAIL  corpus is not deterministic:"
    diff /tmp/corpus-before.sha /tmp/corpus-after.sha | head -10
  fi
  echo
  echo "=== repo integrity ==="
  python3 tools/validate.py 2>&1 | tail -12
  echo
  echo "=== regex baseline ==="
  python3 tools/baseline_regex.py 2>&1 | tail -14
} > out/VERIFY.txt 2>&1
say "PHASE 4 done"

# --------------------------------------------------------------- 5. report
say "PHASE 5: report"
LATEST_C=$(ls -t out/bakeoff/run-gemma4-12b-triage-contracts.json 2>/dev/null | head -1)
LATEST_I=$(ls -t out/bakeoff/run-gemma4-12b-triage-inbox.json 2>/dev/null | head -1)
LATEST_R=$(ls -t out/bakeoff/run-gemma4-12b-redact.json 2>/dev/null | head -1)
python3 src/report.py $LATEST_C $LATEST_I $LATEST_R > /dev/null 2>&1 \
  && say "PHASE 5 done. out/report.html regenerated" \
  || say "PHASE 5 skipped, gemma4 runs not found"

say "ALL PHASES COMPLETE"
