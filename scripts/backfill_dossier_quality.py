#!/usr/bin/env python3
"""
Backfill question_type, debate_signal, and llm_failure_mode into legacy
dossier entries that predate the quality gate.

Inference rules:
  question_type:
    - "by season" / "season-by-season" / "evolution" → T4
    - "powerplay vs" / "vs pace" / "chasing vs" / "home vs" → T5
    - Default → T3

  debate_signal: always "analyst,reddit,fantasy" (safe default for stats)

  llm_failure_mode: inferred from title pattern

Only writes files that are MISSING at least one of the three fields.
Does NOT overwrite entries that already have all three (i.e. the 20 samples
and the newly generated t3/t4/t5/t6 entries).

Run: python scripts/backfill_dossier_quality.py [--dry-run]
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
DOSSIER_DIR = REPO_ROOT / "okf" / "dossier"

DEFAULT_DEBATE = "analyst,reddit,fantasy"


def infer_question_type(title: str, description: str) -> str:
    combined = (title + " " + description).lower()
    # T4 signals: cross-season temporal
    if any(kw in combined for kw in [
        "by season", "season-by-season", "evolution", "across season",
        "2007/08", "19 season", "all season", "per season",
        "season trend", "year by year",
    ]):
        return "T4"
    # T5 signals: multi-condition stacked
    if any(kw in combined for kw in [
        "vs pace and spin", "vs rh and lh", "powerplay vs",
        "chasing vs defending", "home vs away", "win toss and",
        "both conditions", "when chasing in away", "stacked"
    ]):
        return "T5"
    # T6 signals: debate/hot-take/GOAT
    if any(kw in combined for kw in [
        "hot take", "goat", "debate", "verdict", "era-adjusted",
        "is it true", "does it", "is the", "best ever", "overrated",
        "real advantage", "narrative"
    ]):
        return "T6"
    # Default: T3
    return "T3"


def infer_llm_failure_mode(title: str, description: str) -> str:
    tl = title.lower()
    dl = description.lower()

    if "h2h" in tl or "vs" in tl:
        batter = re.search(r"^([\w\s\-]+?) vs", title, re.IGNORECASE)
        bowler = re.search(r" vs ([\w\s\-]+?) —", title, re.IGNORECASE)
        b = batter.group(1).strip() if batter else "the batter"
        bl = bowler.group(1).strip() if bowler else "the bowler"
        return (
            f"Gives a general reputation summary of {b} and {bl} "
            f"without the actual career delivery count, SR, dot-ball %, and dismissal record "
            f"between this specific pair."
        )

    if "powerplay" in tl:
        return (
            "States the player's general batting or bowling reputation without "
            "the specific powerplay figure from ball-by-ball data — cannot distinguish "
            "powerplay vs overall career numbers."
        )

    if "death" in tl:
        return (
            "Gives the player's overall economy or reputation as a death bowler without "
            "the specific death-over (overs 17–20) figure from ball-by-ball data."
        )

    if "middle" in tl:
        return (
            "States overall career stats without the middle-overs (7–16) phase-split figure "
            "— cannot distinguish performance by phase."
        )

    if "career" in tl:
        player_m = re.search(r"^([\w\s]+?) —", title)
        player = player_m.group(1).strip() if player_m else "this player"
        return (
            f"May produce approximate or outdated career figures for {player} "
            f"without tracing to the Cricsheet ball-by-ball corpus or providing "
            f"a verifiable sample size."
        )

    if "season" in tl and "2026" in tl:
        return (
            "Cannot produce IPL 2026 in-season figures — knowledge cutoff predates "
            "the tournament or stats are approximate without ball-by-ball provenance."
        )

    if "bat-first" in tl or "chase" in tl or "toss" in tl:
        return (
            "Gives general advice or repeats venue narrative without the actual "
            "win-rate figures from Cricsheet ball-by-ball data."
        )

    if "team" in tl or "franchise" in tl:
        return (
            "States the team's general reputation without the specific phase-split "
            "batting SR or bowling economy figure from ball-by-ball data."
        )

    # Generic fallback
    metric = "the requested statistic"
    return (
        f"Cannot verify {metric} with a specific sample size and date window — "
        f"gives a general impression rather than a ball-by-ball-derived figure."
    )


def parse_frontmatter_raw(text: str) -> tuple[str, str, str]:
    """Return (before_fm, fm_block, after_fm) strings."""
    if not text.startswith("---"):
        return "", "", text
    end = text.find("\n---", 3)
    if end == -1:
        return "", text[3:], ""
    fm_block = text[3:end]
    after = text[end + 4:]
    return "---", fm_block, after


def patch_entry(path: Path, dry_run: bool = False) -> bool:
    text = path.read_text(encoding="utf-8")
    prefix, fm_block, after = parse_frontmatter_raw(text)
    if not fm_block:
        return False

    fm = yaml.safe_load(fm_block) or {}
    if fm.get("type") != "dossier":
        return False

    # Only patch if missing at least one field
    needs_patch = not (
        fm.get("question_type") and fm.get("debate_signal") and fm.get("llm_failure_mode")
    )
    if not needs_patch:
        return False

    title = fm.get("title", "")
    description = fm.get("description", "")

    if not fm.get("question_type"):
        fm["question_type"] = infer_question_type(title, description)
    if not fm.get("debate_signal"):
        fm["debate_signal"] = DEFAULT_DEBATE
    if not fm.get("llm_failure_mode"):
        fm["llm_failure_mode"] = infer_llm_failure_mode(title, description)

    if dry_run:
        print(
            f"  [DRY] {path.name} -> qt={fm['question_type']}, ds={fm['debate_signal'][:20]}"
        )
        return True

    # Rebuild the file preserving the original YAML style as much as possible
    # We insert the three new fields right after `description:` if present, else after `title:`
    lines = fm_block.split("\n")
    new_lines = []
    inserted = False
    for line in lines:
        new_lines.append(line)
        # Insert after "type: dossier" — always a single-line value, safe insertion point
        if not inserted and line.strip().startswith("type:"):
            qt_val = fm["question_type"]
            ds_val = fm["debate_signal"]
            lf_val = fm["llm_failure_mode"].replace('"', '\\"').replace("'", "''")
            new_lines.append(f'question_type: {qt_val}')
            new_lines.append(f'debate_signal: "{ds_val}"')
            new_lines.append(f'llm_failure_mode: "{lf_val}"')
            inserted = True

    new_fm = "\n".join(new_lines)
    new_text = f"---{new_fm}\n---{after}"
    path.write_text(new_text, encoding="utf-8")
    return True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    files = sorted(DOSSIER_DIR.glob("*.md"))
    patched = 0
    skipped = 0

    for f in files:
        if patch_entry(f, dry_run=args.dry_run):
            if not args.dry_run:
                print(f"  patched  {f.name}")
            patched += 1
        else:
            skipped += 1

    print(f"\nDone — {patched} patched, {skipped} already complete / non-dossier")


if __name__ == "__main__":
    main()
