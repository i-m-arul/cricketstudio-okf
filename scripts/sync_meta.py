#!/usr/bin/env python3
"""
sync_meta.py — propagate canonical metadata to all consumer files.

Single source of truth: manifest.yaml fields:
  version               -> OKF profile version (e.g. "0.5.2" -> profile "v0.5")
  conformance_level     -> integer (e.g. 3)
  conformance_level_name -> string (e.g. "Agent-Safe")
  counts                -> summed -> "2,200+" label for description fields

Consumer files updated automatically:
  manifest.yaml description        -> "N,NNN+ files"
  okf/spec/index.md                -> profile version + level
  okf/spec/conformance.md          -> file count label
  okf/sources/google-okf-alignment.md -> profile version + level
  okf/dossier/what-is-cricketstudio-okf.md -> file count + level
  okf/releases/v{major}.{minor}.md -> Conformance Level section (latest release)

Run standalone:
  python scripts/sync_meta.py           # Update all consumer files
  python scripts/sync_meta.py --check   # Report stale files; exit 1 if any

Called automatically by pre_ship.py step [3/5].
"""

import argparse
import io
import re
import sys
from pathlib import Path

# Ensure stdout handles Unicode on Windows (cp1252 doesn't cover em-dash etc.)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML not installed. Run: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "manifest.yaml"
OKF_DIR = ROOT / "okf"

# Level number -> canonical long name (authoritative list)
LEVEL_NAMES = {
    0: "Cataloged",
    1: "Citable",
    2: "Evidence-Backed",
    3: "Agent-Safe",
    4: "Auditable",
}


# ── Helpers ──────────────────────────────────────────────────────────────────

def _load_meta() -> dict:
    """Read canonical values from manifest.yaml."""
    data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))

    version = str(data.get("version", "0.0.0"))
    level_num = int(data.get("conformance_level", 0))
    level_name = data.get("conformance_level_name") or LEVEL_NAMES.get(level_num, "Unknown")
    # Use actual file count (index files excluded from type counts, so sum != total)
    total = sum(1 for _ in (ROOT / "okf").rglob("*.md"))
    rounded = (total // 100) * 100       # floor to nearest 100
    count_label = f"{rounded:,}+"        # "2,200+"

    # Profile version: major.minor only (drop patch so "0.5.2" -> "0.5")
    parts = version.split(".")
    profile_ver = ".".join(parts[:2])

    return {
        "version": version,
        "profile_ver": profile_ver,
        "level_num": level_num,
        "level_name": level_name,
        "level_full": f"Level {level_num} — {level_name}",    # "Level 3 — Agent-Safe"
        "level_paren": f"Level {level_num} ({level_name})",   # "Level 3 (Agent-Safe)"
        "count_label": count_label,
        "total": total,
    }


def _sub(path: Path, subs: list, label: str, check_only: bool) -> bool:
    """
    Apply a list of (pattern, replacement) pairs to a file.
    Returns True when the file was already up-to-date or was successfully written.
    Returns False in check_only mode when the file IS stale.
    """
    if not path.exists():
        return True   # optional file; skip silently

    original = path.read_text(encoding="utf-8")
    updated = original
    for pat, repl in subs:
        updated = re.sub(pat, repl, updated, flags=re.MULTILINE)

    if updated == original:
        return True   # already current

    if check_only:
        print(f"  [STALE] {label}")
        return False

    path.write_text(updated, encoding="utf-8")
    print(f"  Updated: {label}")
    return True


# ── Per-file sync rules ───────────────────────────────────────────────────────

def _rules(m: dict) -> list:
    """
    Return a list of (Path, subs, label) tuples — one per consumer file.
    subs is a list of (regex_pattern, replacement) pairs.
    """
    pv = m["profile_ver"]
    lf = m["level_full"]
    lp = m["level_paren"]
    cl = m["count_label"]

    rules = [
        # ── manifest.yaml description  ────────────────────────────────────
        (
            MANIFEST,
            [(r"(?<=with )\d[\d,]+\+(?= files)", cl)],
            f"manifest.yaml description -> {cl}",
        ),
        # ── okf/spec/index.md  ────────────────────────────────────────────
        (
            OKF_DIR / "spec" / "index.md",
            [
                (r"Cricket OKF Profile v[\d.]+", f"Cricket OKF Profile v{pv}"),
                (r"Level \d+ \([A-Za-z-]+\)", lp),
                # "reference implementation (N+ files, CI-validated)"
                (r"(?<=reference implementation \()[\d,]+\+(?= files, CI-validated\))", cl),
            ],
            f"okf/spec/index.md -> profile v{pv}, {lp}",
        ),
        # ── okf/spec/conformance.md  ──────────────────────────────────────
        (
            OKF_DIR / "spec" / "conformance.md",
            [(r"(?<=CI-validated; )[\d,]+\+(?= files;)", cl)],
            f"okf/spec/conformance.md -> {cl}",
        ),
        # ── okf/sources/google-okf-alignment.md  ─────────────────────────
        (
            OKF_DIR / "sources" / "google-okf-alignment.md",
            [
                (r"(?<=Profile: Cricket OKF v)[\d.]+", pv),
                (r"Level \d+ — [A-Za-z-]+", lf),
            ],
            f"okf/sources/google-okf-alignment.md -> profile v{pv}, {lf}",
        ),
        # ── okf/dossier/what-is-cricketstudio-okf.md  ────────────────────
        (
            OKF_DIR / "dossier" / "what-is-cricketstudio-okf.md",
            [
                (r"\d[\d,]+\+(?= CI-validated)", cl),
                (r"Level \d+ \([A-Za-z-]+\)", lp),
            ],
            f"okf/dossier/what-is-cricketstudio-okf.md -> {cl}, {lp}",
        ),
        # ── Latest release file: okf/releases/v{major}.{minor}.md  ───────
        (
            OKF_DIR / "releases" / f"v{pv}.md",
            [
                # Matches "Level N — Name" on the line immediately after
                # "## Conformance Level\n\n"
                (
                    r"(^## Conformance Level\n\nLevel) \d+ — [A-Za-z-]+",
                    rf"\g<1> {m['level_num']} — {m['level_name']}",
                ),
            ],
            f"okf/releases/v{pv}.md -> Conformance Level: {lf}",
        ),
    ]
    return rules


# ── Main ─────────────────────────────────────────────────────────────────────

def sync_all(check_only: bool = False) -> bool:
    m = _load_meta()
    all_ok = True

    for path, subs, label in _rules(m):
        ok = _sub(path, subs, label, check_only)
        if not ok:
            all_ok = False

    return all_ok


def main():
    parser = argparse.ArgumentParser(
        description="Sync OKF metadata (level, profile version, file count) to consumer files."
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check only — report stale files without writing; exit 1 if any are stale.",
    )
    args = parser.parse_args()

    ok = sync_all(check_only=args.check)
    if args.check and not ok:
        print(
            "\nERROR: Consumer files are stale. Run `python scripts/sync_meta.py` to fix.",
            file=sys.stderr,
        )
        sys.exit(1)

    if not args.check:
        m = _load_meta()
        print(
            f"sync_meta: level={m['level_full']}  profile=v{m['profile_ver']}  "
            f"count={m['count_label']}  (total: {m['total']} files)"
        )


if __name__ == "__main__":
    main()
