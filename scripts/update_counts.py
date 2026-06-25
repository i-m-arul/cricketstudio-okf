#!/usr/bin/env python3
"""
Update OKF counts across manifest.yaml and viewer/public/llms.txt.

Counts OKF markdown files by frontmatter type, then syncs:
  - manifest.yaml  counts: block
  - viewer/public/llms.txt  inline count numbers

Usage:
  python scripts/update_counts.py          # Update all targets
  python scripts/update_counts.py --check  # Check only — exit 1 if stale (CI)
  python scripts/update_counts.py --print  # Print count table and exit

Run this before every commit that adds or removes OKF files.
"""

import argparse
import re
import sys
from collections import Counter
from pathlib import Path

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML not installed. Run: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
OKF_DIR = ROOT / "okf"
MANIFEST = ROOT / "manifest.yaml"
LLMS_TXT = ROOT / "viewer" / "public" / "llms.txt"


def _extract_type(path: Path):
    """Return the `type:` value from YAML frontmatter, or None."""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError:
        return None
    if not text.startswith("---"):
        return None
    end = text.find("---", 3)
    if end == -1:
        return None
    fm = text[3:end]
    m = re.search(r"^type:\s*([^\n]+)", fm, re.MULTILINE)
    if not m:
        return None
    return m.group(1).strip().strip("\"'")


def count_files(okf_dir: Path):
    """
    Walk okf_dir and count .md files by `type` frontmatter field.
    Index files (slug == 'index' or ending '/index') are excluded from type
    counts but included in the total.
    Returns (Counter, total_int).
    """
    by_type = Counter()
    total = 0
    for md in sorted(okf_dir.rglob("*.md")):
        total += 1
        slug = md.relative_to(okf_dir).as_posix()[:-3]
        if slug == "index" or slug.endswith("/index"):
            continue
        t = _extract_type(md)
        if t:
            by_type[t] += 1
    return by_type, total


def _print_table(by_type: Counter, total: int) -> None:
    print(f"\n{'Type':<22} {'Count':>6}")
    print("-" * 30)
    for k in sorted(by_type):
        print(f"  {k:<20} {by_type[k]:>6}")
    print("-" * 30)
    print(f"  {'TOTAL (.md files)':<20} {total:>6}")
    print()


def _update_manifest(by_type: Counter, check_only: bool) -> bool:
    """Sync counts: block in manifest.yaml. Returns True if no change needed."""
    content = MANIFEST.read_text(encoding="utf-8")
    data = yaml.safe_load(content)
    current = data.get("counts", {})

    # Merge existing + new type keys, all sorted
    all_keys = sorted(set(list(current.keys()) + list(by_type.keys())))
    new_counts = {k: by_type.get(k, 0) for k in all_keys}

    stale = {k for k in all_keys if current.get(k, 0) != new_counts[k]}
    if not stale:
        return True

    if check_only:
        for k in sorted(stale):
            print(f"  [STALE] manifest.yaml counts.{k}: {current.get(k, 0)} → {new_counts[k]}")
        return False

    lines = ["counts:"]
    for k in all_keys:
        lines.append(f"  {k}: {new_counts[k]}")
    new_block = "\n".join(lines) + "\n"

    updated = re.sub(r"^counts:\n(?:  [^\n]+\n)*", new_block, content, flags=re.MULTILINE)
    MANIFEST.write_text(updated, encoding="utf-8")
    print(f"  manifest.yaml: updated {len(stale)} count(s) — {', '.join(sorted(stale))}")
    return True


def _update_llms_txt(by_type: Counter, check_only: bool) -> bool:
    """Sync count numbers in llms.txt. Returns True if no change needed."""
    content = LLMS_TXT.read_text(encoding="utf-8")
    original = content

    dossier_n = by_type.get("dossier", 0)
    story_n = by_type.get("story", 0)
    player_n = by_type.get("player", 0)
    metric_n = by_type.get("metric", 0)
    research_n = by_type.get("research", 0)

    # Dossier index: "N verified Q&A patterns"
    content = re.sub(
        r"(\[Dossier index\][^:]+:\s*)\d+( verified Q&A patterns)",
        rf"\g<1>{dossier_n}\2",
        content,
    )

    # Journeys index: "N cricket stories"
    content = re.sub(
        r"(\[Journeys index\][^:]+:\s*)\d+( cricket stories)",
        rf"\g<1>{story_n}\2",
        content,
    )

    # Players: "N players"
    content = re.sub(
        r"(\[Players\][^:]+:\s*)\d+( players\b)",
        rf"\g<1>{player_n}\2",
        content,
    )

    # Metrics index: "N metric files"
    content = re.sub(
        r"(\[Metrics index\][^:]+:\s*)\d+( metric files)",
        rf"\g<1>{metric_n}\2",
        content,
    )

    # Research: insert or update count line
    research_index = (
        f"- [Research index](https://okf.cricketstudio.ai/research/): "
        f"{research_n} reports — IPL 2026, MLC seasons, toss effects, death overs, powerplay, batting"
    )
    if re.search(r"\[Research index\]", content):
        content = re.sub(
            r"(\[Research index\][^:]+:\s*)\d+( reports\b)",
            rf"\g<1>{research_n}\2",
            content,
        )
    else:
        # Insert as first bullet under ## Research reports
        content = re.sub(
            r"(## Research reports\n\n)",
            rf"\1{research_index}\n",
            content,
        )

    if content == original:
        return True

    if check_only:
        print("  [STALE] viewer/public/llms.txt counts are out of date")
        return False

    LLMS_TXT.write_text(content, encoding="utf-8")
    print("  llms.txt: updated count lines")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync OKF counts to manifest and llms.txt.")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check only — exit 1 if manifest or llms.txt are stale (use in CI).",
    )
    parser.add_argument(
        "--print",
        dest="print_only",
        action="store_true",
        help="Print count table to stdout and exit.",
    )
    args = parser.parse_args()

    by_type, total = count_files(OKF_DIR)
    _print_table(by_type, total)

    if args.print_only:
        return

    ok = True
    ok = _update_manifest(by_type, check_only=args.check) and ok
    ok = _update_llms_txt(by_type, check_only=args.check) and ok

    if args.check and not ok:
        print(
            "\nERROR: Counts are stale. Run `python scripts/update_counts.py` and commit the result.",
            file=sys.stderr,
        )
        sys.exit(1)

    if not args.check:
        print("Done. Run `python scripts/validate_okf.py` to confirm bundle integrity.")


if __name__ == "__main__":
    main()
