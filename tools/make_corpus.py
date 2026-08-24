"""Generate the demo corpus on disk.

    python tools/make_corpus.py

Writes:
    corpus/inbox/*.eml          25 messages, built with email.message.EmailMessage
    corpus/contracts/*.txt      21 agreements
    corpus/PLANTED.json         ground truth for the survival scan
    corpus/META.json            reference date + counts, safe to show
    corpus/TRUTH.json           per-file expected extraction, for scoring

Everything is deterministic. Running it twice produces byte-identical output,
which is what makes the repo reproducible for anyone who clones it.

PLANTED.json and TRUTH.json are never included in a prompt. The runner asserts
that separately.
"""

import json
import sys
from email.message import EmailMessage
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from corpus_contracts import CONTRACTS, REFERENCE_DATE
from corpus_contracts import summary as contracts_summary
from corpus_inbox import EMAILS
from corpus_inbox import summary as inbox_summary

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / "corpus"


def write_inbox() -> list[dict]:
    """Emit .eml files. Returns planted-identifier records."""
    outdir = CORPUS / "inbox"
    outdir.mkdir(parents=True, exist_ok=True)
    planted = []

    for spec in EMAILS:
        msg = EmailMessage()
        msg["From"] = f'{spec["from_name"]} <{spec["from_addr"]}>'
        msg["To"] = "hello@cedarridge.example"
        msg["Subject"] = spec["subject"]
        msg["Date"] = spec["date"]
        msg["Message-ID"] = f'<{spec["name"].removesuffix(".eml")}@cedarridge.example>'
        msg.set_content(spec["body"])

        path = outdir / spec["name"]
        path.write_bytes(bytes(msg))

        for text, kind in spec["planted"]:
            planted.append({
                "file": f'inbox/{spec["name"]}',
                "text": text,
                "kind": kind,
            })

    return planted


def write_contracts() -> list[dict]:
    """Emit contract .txt files. Returns planted-identifier records."""
    outdir = CORPUS / "contracts"
    outdir.mkdir(parents=True, exist_ok=True)
    planted = []

    for spec in CONTRACTS:
        path = outdir / spec["name"]
        path.write_text(spec["body"], encoding="utf-8")

        for text, kind in spec["planted"]:
            planted.append({
                "file": f'contracts/{spec["name"]}',
                "text": text,
                "kind": kind,
            })

    return planted


def write_truth() -> None:
    """Expected extraction per file. Used for scoring, never for prompting."""
    truth = {"reference_date": REFERENCE_DATE, "inbox": {}, "contracts": {}}

    for spec in EMAILS:
        truth["inbox"][f'inbox/{spec["name"]}'] = {
            "category": spec["category"],
            "urgency": spec["urgency"],
            "owner": spec["owner"],
            "contains_personal_data": spec["pii"],
        }

    for spec in CONTRACTS:
        truth["contracts"][f'contracts/{spec["name"]}'] = {
            "doc_type": spec["doc_type"],
            "counterparty": spec["counterparty"],
            "renewal_basis": spec["renewal_basis"],
            "renewal_date": spec["renewal_date"],
            "notice_days": spec["notice_days"],
            "expires_within_90_days": spec["expires"],
            "contains_personal_data": spec["pii"],
        }

    (CORPUS / "TRUTH.json").write_text(
        json.dumps(truth, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    CORPUS.mkdir(exist_ok=True)

    planted = write_inbox() + write_contracts()
    for i, rec in enumerate(planted, start=1):
        rec["id"] = f"P{i:02d}"
    planted = [{"id": r["id"], "file": r["file"], "text": r["text"],
                "kind": r["kind"]} for r in planted]

    (CORPUS / "PLANTED.json").write_text(
        json.dumps({
            "generated_on": REFERENCE_DATE,
            "note": "Ground truth for the survival scan. Never shown to a model.",
            "identifiers": planted,
        }, indent=2) + "\n",
        encoding="utf-8",
    )

    inbox, contracts = inbox_summary(), contracts_summary()
    meta = {
        "reference_date": REFERENCE_DATE,
        "window_days": 90,
        "synthetic": True,
        "note": "Every document is synthetic. No real person, company, or agreement.",
        "inbox": inbox,
        "contracts": contracts,
        "planted_identifiers_total": len(planted),
    }
    (CORPUS / "META.json").write_text(
        json.dumps(meta, indent=2) + "\n", encoding="utf-8")

    write_truth()

    print(f"inbox      {inbox['total']:>3} messages   "
          f"{inbox['with_personal_data']} carrying personal data")
    print(f"contracts  {contracts['total']:>3} agreements  "
          f"{contracts['with_personal_data']} carrying personal data")
    print()
    print(f"expiring within 90 days of {REFERENCE_DATE}: "
          f"{contracts['expiring_within_90_days']}")
    print(f"  of those, behind a computed renewal basis: "
          f"{contracts['expiring_behind_computed_basis']}")
    print(f"  (a regex baseline cannot reach those)")
    print()
    print("renewal_basis spread:")
    for basis, n in sorted(contracts["by_basis"].items()):
        print(f"  {basis:<28} {n}")
    print()
    print(f"planted identifiers: {len(planted)}  -> corpus/PLANTED.json")


if __name__ == "__main__":
    main()
