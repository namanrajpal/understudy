#!/usr/bin/env python3
"""Integrity checks that need no model and no network.

Everything here is about whether the repo is internally consistent: do the
runbooks match the schema the runner expects, does ground truth key against
files that actually exist, is every planted identifier really present in the
document it claims to be in.

This is what runs in CI. It catches the drift that is otherwise invisible
until a scoring run reports a number that is wrong for a boring reason.

    python3 tools/validate.py

Exit status is 0 when everything holds, 1 otherwise.
"""

from __future__ import annotations

import json
import re
import sys
from email import policy
from email.parser import BytesParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RUNBOOKS = ROOT / "runbooks"
CORPUS = ROOT / "corpus"

# Keys every runbook must carry. The runner reads all of these.
REQUIRED_RUNBOOK_KEYS = {"id", "version", "authored_by", "authored_on", "purpose", "input", "steps", "checks", "report"}

# Checks the runner knows how to execute. A runbook naming anything else is a
# typo that would otherwise silently skip a check.
# Derived from the runner's own registry rather than duplicated here, so adding
# a check in src/checks.py cannot silently desync this validator from reality.
sys.path.insert(0, str(ROOT / "src"))
from checks import REGISTRY as _CHECK_REGISTRY  # noqa: E402

KNOWN_CHECKS = set(_CHECK_REGISTRY)

ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

failures: list[str] = []
notes: list[str] = []


def fail(msg: str) -> None:
    failures.append(msg)


def load_json(path: Path):
    try:
        return json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        fail(f"{path.relative_to(ROOT)} is not valid JSON: {exc}")
        return None


def read_document(path: Path) -> str:
    """Same read path the runner uses, so validation sees what the model sees."""
    if path.suffix == ".eml":
        with path.open("rb") as handle:
            msg = BytesParser(policy=policy.default).parse(handle)
        body = msg.get_body(preferencelist=("plain",))
        text = body.get_content() if body else ""
        headers = "\n".join(f"{k}: {v}" for k, v in msg.items())
        return f"{headers}\n\n{text}"
    return path.read_text()


def check_runbooks() -> None:
    paths = sorted(RUNBOOKS.glob("*.json"))
    if not paths:
        fail("no runbooks found")
        return

    for path in paths:
        book = load_json(path)
        if book is None:
            continue
        rel = path.relative_to(ROOT)

        missing = REQUIRED_RUNBOOK_KEYS - set(book)
        if missing:
            fail(f"{rel} missing required keys: {sorted(missing)}")

        if book.get("id") != path.stem:
            fail(f"{rel} id is {book.get('id')!r} but filename says {path.stem!r}")

        declared_checks = [c if isinstance(c, str) else c.get("id") for c in book.get("checks", [])]
        unknown = [c for c in declared_checks if c not in KNOWN_CHECKS]
        if unknown:
            fail(f"{rel} names checks the runner cannot execute: {unknown}")

        steps = book.get("steps", [])
        if [s.get("n") for s in steps] != list(range(1, len(steps) + 1)):
            fail(f"{rel} steps are not numbered 1..{len(steps)} in order")

        for step in steps:
            name = step.get("name", "")
            # Step names are read aloud on screen. A function name in a step
            # name means the trace stopped being legible to a non-engineer.
            if re.search(r"[_(){}]|\b[a-z]+\.[a-z]+\b", name):
                fail(f"{rel} step {step.get('n')} name is not plain language: {name!r}")

        schema = book.get("extract", {}).get("schema", {})
        props = schema.get("properties", {})
        if schema:
            required = set(schema.get("required", []))
            undeclared = required - set(props)
            if undeclared:
                fail(f"{rel} requires fields it does not declare: {sorted(undeclared)}")
            for field, spec in props.items():
                # Nested objects are where small models fall off. The spec
                # forbids them; this is the thing that enforces it.
                if spec.get("type") == "object" or "properties" in spec:
                    fail(f"{rel} field {field!r} is nested. Schemas must stay flat.")
                if spec.get("type") == "array" and spec.get("items", {}).get("type") == "object":
                    if book.get("id") != "redact":
                        fail(f"{rel} field {field!r} is an array of objects. Schemas must stay flat.")

        if "{document}" in json.dumps(book.get("extract", {})):
            notes.append(f"{rel} extract prompt interpolates the document")
        elif book.get("extract"):
            fail(f"{rel} has an extract block whose prompt never interpolates {{document}}")

    notes.append(f"{len(paths)} runbooks structurally valid")


def check_corpus() -> tuple[dict, dict]:
    meta = load_json(CORPUS / "META.json") or {}
    planted = load_json(CORPUS / "PLANTED.json") or {}
    truth = load_json(CORPUS / "TRUTH.json") or {}

    contracts = sorted((CORPUS / "contracts").glob("*.txt"))
    inbox = sorted((CORPUS / "inbox").glob("*.eml"))

    for label, found, declared in (
        ("contracts", len(contracts), meta.get("contracts", {}).get("total")),
        ("inbox", len(inbox), meta.get("inbox", {}).get("total")),
    ):
        if declared is not None and found != declared:
            fail(f"META.json says {declared} {label} but {found} files are on disk")

    if not contracts:
        fail("no contract documents found")
    if not inbox:
        fail("no inbox documents found")

    notes.append(f"{len(contracts)} contracts and {len(inbox)} emails on disk")
    return planted, truth


def check_ground_truth(truth: dict) -> None:
    """Every ground-truth key must name a file that exists, and vice versa."""
    for section, pattern, suffix in (("contracts", "contracts", ".txt"), ("inbox", "inbox", ".eml")):
        expected = truth.get(section, {})
        on_disk = {f"{pattern}/{p.name}" for p in (CORPUS / pattern).glob(f"*{suffix}")}
        keyed = set(expected)

        orphans = keyed - on_disk
        if orphans:
            fail(f"TRUTH.json {section} keys name files that do not exist: {sorted(orphans)[:5]}")

        unscored = on_disk - keyed
        if unscored:
            fail(f"{section} documents have no ground truth: {sorted(unscored)[:5]}")

    ref = truth.get("reference_date", "")
    if not ISO_DATE.match(ref):
        fail(f"TRUTH.json reference_date is not ISO: {ref!r}")

    total = sum(len(truth.get(s, {})) for s in ("contracts", "inbox"))
    notes.append(f"{total} documents have ground truth, all keyed to real files")


def check_planted(planted: dict) -> None:
    """A planted identifier that is not actually in its document makes the
    survival scan pass for the wrong reason. That is worse than failing.

    Matching uses the repo's own whitespace-flexible matcher, because that is
    what both the redactor and the survival scan use. Validating with stricter
    matching than the gate uses would report problems that are not real;
    validating with looser matching would miss the ones that are.
    """
    identifiers = planted.get("identifiers", [])
    if not identifiers:
        fail("PLANTED.json declares no identifiers")
        return

    sys.path.insert(0, str(ROOT / "src"))
    from redact_apply import flexible  # noqa: E402

    cache: dict[str, str] = {}
    absent = []
    rewrapped = 0
    for item in identifiers:
        rel = item.get("file", "")
        text = item.get("text", "")
        path = CORPUS / rel
        if not path.exists():
            fail(f"PLANTED.json names a file that does not exist: {rel}")
            continue
        if rel not in cache:
            cache[rel] = read_document(path)
        body = cache[rel]
        if text in body:
            continue
        if flexible(text).search(body):
            # Present, but its line breaks differ from the manifest. Legal, and
            # the reason both the redactor and the scan must match flexibly.
            rewrapped += 1
            continue
        absent.append(f"{item.get('id')} {text!r} not found in {rel}")

    for line in absent[:6]:
        fail(f"planted identifier is not in its document: {line}")

    ids = [i.get("id") for i in identifiers]
    if len(set(ids)) != len(ids):
        fail("PLANTED.json has duplicate identifier ids")

    notes.append(
        f"{len(identifiers)} planted identifiers, all present in their source document"
        + (f" ({rewrapped} only match across a line break)" if rewrapped else "")
    )


def check_no_ground_truth_in_prompts() -> None:
    """Ground truth must never reach a model. This is the check that keeps the
    accuracy numbers meaning something.

    Naming PLANTED.json as a check's `manifest` is fine, that is code-side
    config. Naming it anywhere a model can read is not. So this inspects only
    the text that is actually interpolated into a prompt.
    """
    leaked = []
    for path in sorted(RUNBOOKS.glob("*.json")):
        book = load_json(path)
        if book is None:
            continue
        prompt_text = json.dumps([
            book.get("extract", {}).get("prompt", ""),
            book.get("redact", {}).get("prompt", ""),
        ])
        for needle in ("TRUTH.json", "PLANTED.json", "expected", "ground truth"):
            if needle in prompt_text:
                leaked.append(f"{path.relative_to(ROOT)} prompt mentions {needle!r}")
    if leaked:
        for line in leaked:
            fail(f"ground truth reachable from a prompt: {line}")
    else:
        notes.append("no prompt references ground truth")


def main() -> int:
    check_runbooks()
    planted, truth = check_corpus()
    check_ground_truth(truth)
    check_planted(planted)
    check_no_ground_truth_in_prompts()

    for line in notes:
        print(f"  ok    {line}")
    for line in failures:
        print(f"  FAIL  {line}")

    print()
    if failures:
        print(f"{len(failures)} integrity problem(s)")
        return 1
    print("repo is internally consistent")
    return 0


if __name__ == "__main__":
    sys.exit(main())
