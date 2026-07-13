#!/usr/bin/env python3
"""
Fix broken canonical_page / resource / Related Concepts URLs in OKF files.

Applies these corrections:
  - Wrong player slugs → correct slugs on players.cricketstudio.ai
  - /season/ipl-2026/{aspect} → /season/ipl-2026  (sub-pages don't exist)
  - /season/ipl-alltime/* → /leagues/ipl/leaderboards
  - /season (no index) → /leagues/ipl
  - /leagues/ipl/leaderboards/most-runs|most-wickets → /leagues/ipl/leaderboards
  - /leagues/ipl/records/ipl-hall-of-fame → /leagues/ipl/records
  - /leagues/mlc/leaderboards/economy|most-* → /leagues/mlc/leaderboards
  - /leagues/mlc/research/* → /leagues/mlc
  - /methodology → /about
  - /players/vaibhav-suryavanshi/by-* → /players/vaibhav-suryavanshi
  - Slug-based match URLs (/matches/ipl-2026-*) → /season/ipl-2026
  - /players/dinesh-karthik|suresh-raina (no profile) → /leagues/ipl/records

Run: python scripts/fix_404_urls.py [--dry-run]
"""
from __future__ import annotations
import argparse
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OKF_ROOT = REPO_ROOT / "okf"

BASE = "https://players.cricketstudio.ai"

# Exact string replacements (applied in order)
EXACT_REPLACEMENTS = [
    # --- Player slug corrections (wrong slug → correct slug) ---
    (f"{BASE}/players/chris-gayle",   f"{BASE}/players/ch-gayle"),
    (f"{BASE}/players/faf-du-plessis", f"{BASE}/players/f-du-plessis"),
    (f"{BASE}/players/david-warner",  f"{BASE}/players/da-warner"),
    (f"{BASE}/players/na-saini",      f"{BASE}/players/navdeep-saini"),
    # These players have no profile on the site → fallback to records page
    (f"{BASE}/players/dinesh-karthik", f"{BASE}/leagues/ipl/records"),
    (f"{BASE}/players/suresh-raina",   f"{BASE}/leagues/ipl/records"),
    # --- Leaderboard paths that don't have sub-pages ---
    (f"{BASE}/leagues/ipl/leaderboards/most-runs",    f"{BASE}/leagues/ipl/leaderboards"),
    (f"{BASE}/leagues/ipl/leaderboards/most-wickets", f"{BASE}/leagues/ipl/leaderboards"),
    # --- Records paths that don't exist as sub-pages ---
    (f"{BASE}/leagues/ipl/records/ipl-hall-of-fame",  f"{BASE}/leagues/ipl/records"),
    (f"{BASE}/leagues/ipl/records/hall-of-fame",      f"{BASE}/leagues/ipl/records"),
    # --- MLC leaderboard sub-paths (only batting-average and similar aspects exist) ---
    (f"{BASE}/leagues/mlc/leaderboards/economy",      f"{BASE}/leagues/mlc/leaderboards"),
    (f"{BASE}/leagues/mlc/leaderboards/most-runs",    f"{BASE}/leagues/mlc/leaderboards"),
    (f"{BASE}/leagues/mlc/leaderboards/most-wickets", f"{BASE}/leagues/mlc/leaderboards"),
    # --- MLC research (doesn't exist) → MLC hub ---
    (f"{BASE}/leagues/mlc/research/state-of-mlc-2025", f"{BASE}/leagues/mlc"),
    (f"{BASE}/leagues/mlc/research",                   f"{BASE}/leagues/mlc"),
    # --- /methodology → /about ---
    (f"{BASE}/methodology",  f"{BASE}/about"),
    # --- /season (no index page) → IPL hub ---
    (f"{BASE}/season)",      f"{BASE}/leagues/ipl)"),   # in markdown links
    # --- /season/ipl-alltime/* → leaderboards ---
    (f"{BASE}/season/ipl-alltime", f"{BASE}/leagues/ipl/leaderboards"),
    # --- Vaibhav sub-pages that don't exist ---
    (f"{BASE}/players/vaibhav-suryavanshi/by-length",     f"{BASE}/players/vaibhav-suryavanshi"),
    (f"{BASE}/players/vaibhav-suryavanshi/by-match-type", f"{BASE}/players/vaibhav-suryavanshi"),
]

# Regex replacements for patterns
REGEX_REPLACEMENTS: list[tuple[str, str]] = [
    # /season/ipl-2026/{anything} → /season/ipl-2026
    (
        r"https://players\.cricketstudio\.ai/season/ipl-2026/[a-z0-9\-]+",
        f"{BASE}/season/ipl-2026",
    ),
    # /matches/ipl-2026-* (slug-based, wrong format) → /season/ipl-2026
    (
        r"https://players\.cricketstudio\.ai/matches/ipl-2026-[a-z0-9\-]+",
        f"{BASE}/season/ipl-2026",
    ),
    # /season) standalone (as markdown link ending) → /leagues/ipl)
    # Handled above in exact replacements
]


def fix_file(path: Path, dry_run: bool) -> int:
    text = path.read_text(encoding="utf-8")
    original = text

    for old, new in EXACT_REPLACEMENTS:
        text = text.replace(old, new)

    for pattern, replacement in REGEX_REPLACEMENTS:
        text = re.sub(pattern, replacement, text)

    if text == original:
        return 0

    if dry_run:
        # Show what changed (ASCII-safe for Windows cmd)
        old_lines = original.splitlines()
        new_lines = text.splitlines()
        for i, (ol, nl) in enumerate(zip(old_lines, new_lines)):
            if ol != nl:
                safe_ol = ol.strip().encode("ascii", errors="replace").decode()
                safe_nl = nl.strip().encode("ascii", errors="replace").decode()
                print(f"    L{i+1}: {safe_ol!r}")
                print(f"       -> {safe_nl!r}")
        return 1

    path.write_text(text, encoding="utf-8")
    return 1


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    changed = 0
    for f in sorted(OKF_ROOT.rglob("*.md")):
        result = fix_file(f, dry_run=args.dry_run)
        if result:
            rel = str(f.relative_to(REPO_ROOT))
            print(f"  {'[DRY] ' if args.dry_run else ''}fixed  {rel}")
            changed += 1

    print(f"\nDone -- {changed} files {'would be ' if args.dry_run else ''}updated")


if __name__ == "__main__":
    main()
