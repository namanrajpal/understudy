"""Load documents off disk.

Two loaders, selected by the runbook's `input.loader`. Both return the same
shape so the rest of the runner never learns whether it is holding an email or
a lease. That indifference is the point of the demo: one runner, three runbooks,
two document types.
"""

from email import policy
from email.parser import BytesParser
from pathlib import Path


def load_eml(path: Path) -> dict:
    """Parse one .eml into headers plus a plain-text body."""
    with path.open("rb") as f:
        msg = BytesParser(policy=policy.default).parse(f)

    part = msg.get_body(preferencelist=("plain",))
    body = part.get_content() if part is not None else ""

    header = (
        f"From: {msg['From'] or ''}\n"
        f"Date: {msg['Date'] or ''}\n"
        f"Subject: {msg['Subject'] or ''}\n"
    )
    return {
        "text": header + "\n" + body.strip(),
        "meta": {
            "from": msg["From"] or "",
            "subject": msg["Subject"] or "",
            "date": msg["Date"] or "",
        },
    }


def load_text(path: Path) -> dict:
    """Read one plain-text document."""
    return {
        "text": path.read_text(encoding="utf-8").strip(),
        "meta": {},
    }


LOADERS = {"eml": load_eml, "text": load_text}


def load_glob(root: Path, pattern: str, loader: str) -> list[dict]:
    """Load every file matching pattern, in sorted order for determinism."""
    fn = LOADERS[loader]
    docs = []
    for path in sorted(root.glob(pattern)):
        doc = fn(path)
        docs.append({
            "file": str(path.relative_to(root)),
            "path": path,
            "text": doc["text"],
            "meta": doc["meta"],
            "chars": len(doc["text"]),
        })
    if not docs:
        raise FileNotFoundError(
            f"no files matched {pattern!r} under {root}. "
            "Run: python3 tools/make_corpus.py")
    return docs
