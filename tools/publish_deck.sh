#!/usr/bin/env bash
#
# Publish the Tech Coast 2026 deck into docs/talk/ so GitHub Pages serves it
# next to the write-up, at /understudy/talk/.
#
# The deck source lives outside this repo. Only its built output is committed
# here, which keeps this repo's "standard library only, no build step" claim
# intact: nothing in CI installs npm, and a reader who clones this repo gets a
# deck that opens by double-clicking a file.
#
# The build is done in a scratch directory with the speaker outline replaced by
# a public stub. The deck imports that outline with ?raw for its review panel
# (R key), so a straight `vite build` would inline ~19 KB of private prep notes
# into a public bundle. Swapping the file is the one method that cannot silently
# fail: an alias or a dead-code guard could leave the string in the chunk.
#
#   ./tools/publish_deck.sh              # uses the default deck path
#   DECK_DIR=/path/to/deck ./tools/publish_deck.sh
#   KEEP_NOTES=1 ./tools/publish_deck.sh # publish the outline panel too
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DECK_DIR="${DECK_DIR:-/Users/namanraj/Workspace/EB1A-Kiro/local_changes/talks/tech_coast_2026_deck}"
OUT="$REPO/docs/talk"
OUTLINE_NAME="tech_coast_2026_talk_outline.md"

[ -d "$DECK_DIR/src" ] || { echo "No deck at $DECK_DIR (set DECK_DIR)" >&2; exit 1; }
[ -d "$DECK_DIR/node_modules" ] || { echo "Run npm install in $DECK_DIR first" >&2; exit 1; }

SCRATCH="$(mktemp -d)"
trap 'rm -rf "$SCRATCH"' EXIT

# The deck imports ../../<outline>.md, so the scratch layout has to keep that
# relative shape: outline beside the deck directory, not inside it.
mkdir -p "$SCRATCH/deck"
tar -C "$DECK_DIR" --exclude node_modules --exclude dist -cf - . | tar -C "$SCRATCH/deck" -xf -
ln -s "$DECK_DIR/node_modules" "$SCRATCH/deck/node_modules"

if [ "${KEEP_NOTES:-0}" = "1" ]; then
  cp "$DECK_DIR/../$OUTLINE_NAME" "$SCRATCH/$OUTLINE_NAME"
  echo "  notes  publishing the real outline (KEEP_NOTES=1)"
else
  cat > "$SCRATCH/$OUTLINE_NAME" <<'STUB'
# Speaker notes

Not published. The reasoning, the measurements, and every number in this deck
are written up in full at
[namanrajpal.github.io/understudy](https://namanrajpal.github.io/understudy/).
STUB
  echo "  notes  stubbed out of the public build"
fi

# Minimal config for the public build: relative base so the deck works at any
# path, and no sourcemap, because a sourcemap republishes the original sources
# including the outline this script just stripped.
cat > "$SCRATCH/deck/vite.config.js" <<'CONF'
import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  build: { assetsInlineLimit: 0, sourcemap: false, outDir: "dist", emptyOutDir: true },
});
CONF

( cd "$SCRATCH/deck" && npx --no-install vite build >/dev/null 2>&1 ) \
  || { echo "vite build failed; rerun without the output filter to see why" >&2; exit 1; }

# Fail loudly rather than shipping a bundle that still carries the notes.
#
# The probe is derived from the outline at run time: the longest line in it that
# appears nowhere in the deck's own sources. A hand-picked phrase is the wrong
# tool here, because the deck's outline.js legitimately quotes section headings
# from the outline, so any heading would report a leak that is not one.
if [ "${KEEP_NOTES:-0}" != "1" ]; then
  python3 - "$DECK_DIR/../$OUTLINE_NAME" "$DECK_DIR/src" "$SCRATCH/deck/dist" <<'PY'
import pathlib, sys

outline, src_dir, dist_dir = (pathlib.Path(a) for a in sys.argv[1:4])
src = "\n".join(p.read_text(errors="ignore") for p in src_dir.rglob("*") if p.is_file())
candidates = sorted(
    (l.strip() for l in outline.read_text().splitlines() if len(l.strip()) > 60),
    key=len,
    reverse=True,
)
probe = next((c for c in candidates if c not in src), None)
if probe is None:
    sys.exit("Could not derive a probe from the outline. Refusing to publish blind.")

bundle = "\n".join(p.read_text(errors="ignore") for p in dist_dir.rglob("*") if p.is_file())
if probe in bundle:
    sys.exit(f"Speaker notes survived into the bundle: {probe[:60]!r}. Not publishing.")
print(f"  check  no speaker notes in the bundle (probed {len(probe)} chars)")
PY
fi

rm -rf "$OUT"
mkdir -p "$OUT"
cp -R "$SCRATCH/deck/dist/." "$OUT/"

echo "  built  $(du -sh "$OUT" | cut -f1) into docs/talk/"
echo "  local  open $OUT/index.html"
echo "  live   https://namanrajpal.github.io/understudy/talk/ (once committed and pushed)"
