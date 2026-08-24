"""Network reachability probe.

A menu-bar Wi-Fi icon is not evidence. It is invisible past the third row of a
room and it proves nothing about a Thunderbolt ethernet dongle the venue handed
you. This does a real DNS resolution and a real TCP connect against hosts the
demo does not depend on, and prints what happened.

macOS has no airplane mode, so this is also the only thing that catches a second
active interface.
"""

import socket
import time
from datetime import datetime, timezone

# Deliberately not the model host. These are third-party endpoints that a
# working internet connection reaches and an air-gapped machine does not.
TARGETS = [
    ("api.openai.com", 443),
    ("api.anthropic.com", 443),
    ("cloudflare.com", 443),
]

OLLAMA = ("127.0.0.1", 11434)


def _try(host: str, port: int, timeout: float = 2.0) -> tuple[bool, str]:
    try:
        infos = socket.getaddrinfo(host, port, proto=socket.IPPROTO_TCP)
    except socket.gaierror as e:
        return False, f"getaddrinfo failed: {e.strerror or e}"
    except OSError as e:
        return False, f"resolve failed: {e}"

    family, socktype, proto, _, sockaddr = infos[0]
    s = socket.socket(family, socktype, proto)
    s.settimeout(timeout)
    try:
        s.connect(sockaddr)
        return True, f"connected to {sockaddr[0]}:{sockaddr[1]}"
    except (socket.timeout, TimeoutError):
        return False, "tcp connect timed out"
    except OSError as e:
        return False, f"tcp connect failed: {e.strerror or e}"
    finally:
        s.close()


def probe() -> dict:
    """Return the network verdict, plus confirmation the model host is up."""
    results = []
    reachable = False
    for host, port in TARGETS:
        t0 = time.monotonic()
        ok, detail = _try(host, port)
        results.append({
            "target": f"{host}:{port}",
            "reachable": ok,
            "detail": detail,
            "ms": round((time.monotonic() - t0) * 1000, 1),
        })
        reachable = reachable or ok

    local_ok, local_detail = _try(*OLLAMA, timeout=2.0)

    return {
        "probe": "reachable" if reachable else "unreachable",
        "detail": results[0]["detail"] if results else "",
        "targets": results,
        "model_host": {
            "target": f"{OLLAMA[0]}:{OLLAMA[1]}",
            "reachable": local_ok,
            "detail": local_detail,
        },
        "at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }


def render(p: dict) -> str:
    """Projector copy. Two lines, legible from the back of a room."""
    lines = []
    if p["probe"] == "unreachable":
        lines.append("network:    UNREACHABLE")
        for t in p["targets"]:
            lines.append(f"            {t['target']:<26} {t['detail']}")
    else:
        lines.append("network:    REACHABLE  <- this run is NOT offline")
        for t in p["targets"]:
            state = "reached" if t["reachable"] else t["detail"]
            lines.append(f"            {t['target']:<26} {state}")

    mh = p["model_host"]
    lines.append(
        f"model host: {'UP' if mh['reachable'] else 'DOWN'}  "
        f"{mh['target']}  (loopback, never leaves the machine)")
    return "\n".join(lines)


if __name__ == "__main__":
    print(render(probe()))
