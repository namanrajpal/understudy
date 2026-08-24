"""Ollama client.

Contract, verified against current docs 2026-08-23:

- POST http://127.0.0.1:11434/api/generate
- `format` carries the full JSON Schema object at the TOP LEVEL of the body,
  not inside `options`.
- `stream: false`
- `keep_alive: -1` so the model does not unload mid-run. The default is 5 min.
- `format` constrains output, it does NOT validate it. Ollama's own docs say so.
  The checks in checks.py are required, not belt-and-braces.

Token counts come from Ollama's own `prompt_eval_count` and `eval_count`. They
are measured, never estimated, because the comparative panel makes claims off
them.
"""

import json
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field

HOST = "http://127.0.0.1:11434"
TIMEOUT = 300


@dataclass
class Usage:
    """Measured local work. Summed across the run."""
    calls: int = 0
    retries: int = 0
    prompt_tokens: int = 0
    output_tokens: int = 0
    wall_seconds: float = 0.0
    per_call: list = field(default_factory=list)

    def add(self, prompt_tokens: int, output_tokens: int, seconds: float,
            file: str = "") -> None:
        self.calls += 1
        self.prompt_tokens += prompt_tokens
        self.output_tokens += output_tokens
        self.wall_seconds += seconds
        self.per_call.append({
            "file": file,
            "prompt_tokens": prompt_tokens,
            "output_tokens": output_tokens,
            "seconds": round(seconds, 2),
        })

    def as_dict(self) -> dict:
        return {
            "calls": self.calls,
            "retries": self.retries,
            "prompt_tokens": self.prompt_tokens,
            "output_tokens": self.output_tokens,
            "wall_seconds": round(self.wall_seconds, 1),
            "tokens_per_second": (
                round(self.output_tokens / self.wall_seconds, 1)
                if self.wall_seconds > 0 else 0.0),
            "per_call": self.per_call,
        }


def _post(path: str, payload: dict, timeout: int = TIMEOUT) -> dict:
    req = urllib.request.Request(
        f"{HOST}{path}",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def available() -> list[dict]:
    req = urllib.request.Request(f"{HOST}/api/tags", method="GET")
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8")).get("models", [])
    except (urllib.error.URLError, TimeoutError, OSError):
        return []


def digest_for(model: str) -> str:
    for m in available():
        if m.get("name") == model:
            return (m.get("digest") or "")[:12]
    return ""


def warm(model: str) -> float:
    """Load the model and pin it. Returns load seconds.

    Anything timed before this reports cold-start latency instead of
    throughput, which would misstate the numbers in the report.
    """
    t0 = time.monotonic()
    _post("/api/generate", {"model": model, "keep_alive": -1}, timeout=600)
    return round(time.monotonic() - t0, 1)


def _payload(resp: dict) -> str:
    """Get the model's JSON out of an Ollama response.

    Normally that is `response`. But a thinking model in reasoning mode puts its
    output in `thinking` and returns `response` as an empty string. Measured on
    qwen3.5:9b: 21 of 21 documents came back with response="" and complete, valid
    JSON sitting in `thinking`. Reading only `response` scored that model 0% and
    the failure was entirely in this client.
    """
    text = (resp.get("response") or "").strip()
    if text:
        return text
    thinking = (resp.get("thinking") or "").strip()
    if thinking:
        # Reasoning prose may precede the object. Take the outermost JSON.
        start, end = thinking.find("{"), thinking.rfind("}")
        if start != -1 and end > start:
            return thinking[start:end + 1]
        return thinking
    return ""


def generate(model: str, prompt: str, schema: dict, options: dict,
             usage: Usage, file: str = "") -> tuple[dict | None, str]:
    """One constrained-extraction call.

    Returns (parsed_dict_or_None, raw_text). Retries once on a transport error
    or unparseable output, then gives up so the caller can mark the record
    needs_review. The run never crashes.
    """
    body = {
        "model": model,
        "prompt": prompt,
        "format": schema,          # top level, full JSON Schema
        "stream": False,
        "keep_alive": -1,
        # Thinking models (the qwen3.x family, and gemma4 in some tags) default
        # to reasoning mode. In that mode Ollama returns the JSON in `thinking`
        # and leaves `response` EMPTY, so a client that reads only `response`
        # sees "" and concludes the model failed. It did not.
        #
        # For constrained extraction against a fixed schema, reasoning tokens are
        # cost without benefit, so it is switched off here. `_extract` below
        # still falls back to `thinking` for any model that ignores the flag.
        "think": False,
        "options": options,
    }

    last_raw = ""
    for attempt in (1, 2):
        t0 = time.monotonic()
        try:
            resp = _post("/api/generate", body)
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            last_raw = f"transport error: {e}"
            usage.retries += 1
            continue

        elapsed = time.monotonic() - t0
        usage.add(
            prompt_tokens=resp.get("prompt_eval_count", 0) or 0,
            output_tokens=resp.get("eval_count", 0) or 0,
            seconds=elapsed,
            file=file,
        )

        last_raw = _payload(resp)
        try:
            return json.loads(last_raw), last_raw
        except json.JSONDecodeError:
            if attempt == 1:
                usage.retries += 1
                continue

    return None, last_raw
