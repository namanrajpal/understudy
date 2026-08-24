"""The checks.

These are demo content, not plumbing. Each one prints an explicit PASS or FAIL
line, because "the model produced valid output" is a claim that has to be
visible rather than asserted.

`format` in the Ollama call constrains generation. It does not validate. The
distinction matters and Ollama's own documentation says so, which is why every
one of these runs regardless.
"""

import json
import re
from pathlib import Path

from redact_apply import flexible

ISO = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _result(cid: str, kind: str, passed: bool, detail: str,
            failures: list | None = None) -> dict:
    return {
        "id": cid, "kind": kind, "passed": passed,
        "detail": detail, "failures": failures or [],
    }


def _vacuous(cid: str, kind: str, records: list[dict]) -> dict | None:
    """Guard against a check passing because it examined nothing.

    This is not hypothetical. When qwen3.5:9b returned no parseable output for
    any of 21 documents, five of six checks reported PASS: they iterate over
    parsed records, found none, and fell through to "no failures". The run looked
    green while producing nothing at all.

    A check with an empty sample is inconclusive, and inconclusive is not a pass.
    """
    usable = [r for r in records if r.get("parsed")]
    if usable:
        return None
    return _result(
        cid, kind, False,
        f"nothing to check: 0 of {len(records)} records produced parseable "
        f"output, so this check is inconclusive rather than passing")


def check_parses(records: list[dict], **kw) -> dict:
    bad = [r["file"] for r in records if r.get("parsed") is None]
    return _result(
        "parses", "structural", not bad,
        f"{len(records) - len(bad)}/{len(records)} model outputs parsed as JSON",
        bad)


def check_record_count(records: list[dict], expected: int = 0, **kw) -> dict:
    ok = len(records) == expected
    return _result(
        "record_count", "structural", ok,
        f"{len(records)} records for {expected} input files")


def check_file_mapping(records: list[dict], root: Path | None = None, **kw) -> dict:
    bad = []
    for r in records:
        if root is not None and not (root / r["file"]).exists():
            bad.append(r["file"])
    return _result(
        "file_mapping", "structural", not bad,
        f"{len(records) - len(bad)}/{len(records)} records map to a real input file",
        bad)


def check_enum_valid(records: list[dict], schema: dict | None = None, **kw) -> dict:
    """Every enum field holds an allowed value."""
    if (v := _vacuous("enum_valid", "structural", records)):
        return v
    if not schema:
        return _result("enum_valid", "structural", True, "no schema supplied")

    props = schema.get("properties", {})
    enums = {k: set(v["enum"]) for k, v in props.items() if "enum" in v}

    # removals[].kind lives one level down and is the one nesting we allow.
    nested = {}
    for k, v in props.items():
        if v.get("type") == "array":
            iprops = v.get("items", {}).get("properties", {})
            for ik, iv in iprops.items():
                if "enum" in iv:
                    nested.setdefault(k, {})[ik] = set(iv["enum"])

    failures, checked = [], 0
    for r in records:
        p = r.get("parsed")
        if not p:
            continue
        for field, allowed in enums.items():
            if field in p:
                checked += 1
                if p[field] not in allowed:
                    failures.append(f'{r["file"]}: {field}={p[field]!r}')
        for arr, fields in nested.items():
            for item in p.get(arr, []) or []:
                for field, allowed in fields.items():
                    if field in item:
                        checked += 1
                        if item[field] not in allowed:
                            failures.append(
                                f'{r["file"]}: {arr}[].{field}={item[field]!r}')

    return _result(
        "enum_valid", "structural", not failures,
        f"{checked - len(failures)}/{checked} enum values allowed", failures)


def check_required_present(records: list[dict], schema: dict | None = None,
                           **kw) -> dict:
    if (v := _vacuous("required_present", "structural", records)):
        return v
    required = (schema or {}).get("required", [])
    failures = []
    for r in records:
        p = r.get("parsed")
        if not p:
            continue
        for field in required:
            if field not in p:
                failures.append(f'{r["file"]}: {field} missing')
            elif isinstance(p[field], str) and not p[field].strip():
                failures.append(f'{r["file"]}: {field} empty')
    return _result(
        "required_present", "structural", not failures,
        f"{len(required)} required fields checked on {len(records)} records",
        failures)


def check_date_format(records: list[dict], field: str = "renewal_date",
                      **kw) -> dict:
    if (v := _vacuous("date_format", "semantic", records)):
        return v
    failures, checked = [], 0
    for r in records:
        p = r.get("parsed")
        if not p or field not in p:
            continue
        checked += 1
        v = p[field]
        if v != "unknown" and not ISO.match(str(v)):
            failures.append(f'{r["file"]}: {field}={v!r}')
    return _result(
        "date_format", "semantic", not failures,
        f"{checked - len(failures)}/{checked} dates are ISO or exactly 'unknown'",
        failures)


def check_survival_scan(records: list[dict], manifest: str = "",
                        root: Path | None = None,
                        case_sensitive: bool = False, **kw) -> dict:
    """The one that matters.

    Every identifier planted in the corpus is scanned against every
    redacted_text. A survivor means the redaction leaked, and the whole point of
    a deterministic gate is that it says so out loud instead of hoping.

    Matching is whitespace-flexible, using the same matcher `redact_apply` uses
    to perform the removals. That symmetry is load-bearing rather than tidy.
    When this scan used plain substring matching it was strictly weaker than the
    redactor it was verifying: the redactor could remove a clause whose internal
    line breaks differed from the manifest, but the scan could not detect that
    same clause if it survived. Four of the fourteen planted inbox identifiers
    span a hard line break in their source document, so they were unfindable and
    were counted as removed without ever being examined. A gate that reports
    PASS for identifiers it cannot see is the failure mode it exists to catch.
    """
    path = (root / manifest) if root else Path(manifest)
    if not path.exists():
        return _result("survival_scan", "semantic", False,
                       f"manifest not found: {manifest}")

    if (v := _vacuous("survival_scan", "semantic", records)):
        return v

    planted = json.loads(path.read_text(encoding="utf-8"))["identifiers"]
    by_file: dict[str, list] = {}
    for ident in planted:
        by_file.setdefault(ident["file"], []).append(ident)

    survivors, scanned = [], 0
    for r in records:
        p = r.get("parsed") or {}
        text = p.get("redacted_text", "") or ""
        key = r["file"]
        if key.startswith("corpus/"):
            key = key[len("corpus/"):]
        for ident in by_file.get(key, []):
            scanned += 1
            if flexible(ident["text"], case_sensitive=case_sensitive).search(text):
                survivors.append({
                    "id": ident["id"], "file": ident["file"],
                    "kind": ident["kind"], "text": ident["text"],
                })

    total = scanned
    return _result(
        "survival_scan", "semantic", not survivors,
        f"{len(survivors)} of {total} planted identifiers survived redaction",
        survivors)


REGISTRY = {
    "parses": check_parses,
    "record_count": check_record_count,
    "file_mapping": check_file_mapping,
    "enum_valid": check_enum_valid,
    "required_present": check_required_present,
    "date_format": check_date_format,
    "survival_scan": check_survival_scan,
}


def run_checks(specs: list[dict], records: list[dict], **ctx) -> list[dict]:
    out = []
    for spec in specs:
        fn = REGISTRY.get(spec["id"])
        if fn is None:
            continue
        kwargs = {k: v for k, v in spec.items() if k not in {"id", "kind"}}
        out.append(fn(records, **{**ctx, **kwargs}))
    return out


def render(results: list[dict]) -> str:
    lines = []
    for r in results:
        mark = "PASS" if r["passed"] else "FAIL"
        lines.append(f"  [{mark}] {r['id']:<18} {r['detail']}")
        if not r["passed"]:
            for f in r["failures"][:5]:
                lines.append(f"         - {f}")
            if len(r["failures"]) > 5:
                lines.append(f"         ... {len(r['failures']) - 5} more")
    return "\n".join(lines)
