# local-runbook
#
# `make validate` needs no model and no network. Everything else needs Ollama.

MODEL ?= gemma4:12b
PY    ?= python3

.DEFAULT_GOAL := help

.PHONY: help validate contracts inbox redact all report score baseline bakeoff clean

help:
	@echo "make validate    integrity checks. No model, no network, runs in CI."
	@echo "make contracts   triage 21 contracts             (MODEL=$(MODEL))"
	@echo "make inbox       triage 25 emails                (MODEL=$(MODEL))"
	@echo "make redact      redact what triage flagged, then the survival scan"
	@echo "make all         all three, in order, then the report"
	@echo "make score       accuracy against ground truth, per field"
	@echo "make baseline    the regex baseline, for comparison"
	@echo "make bakeoff     every model in tools/bakeoff.sh over every runbook"
	@echo "make report      rebuild out/report.html from the latest runs"
	@echo "make clean       remove out/"

validate:
	@$(PY) tools/validate.py

contracts:
	@$(PY) src/run.py runbooks/triage-contracts.json --model $(MODEL)

inbox:
	@$(PY) src/run.py runbooks/triage-inbox.json --model $(MODEL)

# Depends on inbox having run: redact consumes whatever triage flagged.
redact:
	@$(PY) src/run.py runbooks/redact.json --model $(MODEL) --from out/run-latest.json

all: validate contracts inbox redact report

score:
	@$(PY) tools/score.py

baseline:
	@$(PY) tools/baseline_regex.py

bakeoff:
	@bash tools/bakeoff.sh

report:
	@$(PY) src/report.py $(wildcard out/run-contracts-*.json out/run-inbox-*.json out/run-redact-*.json)

clean:
	@rm -rf out/
	@echo "removed out/"
