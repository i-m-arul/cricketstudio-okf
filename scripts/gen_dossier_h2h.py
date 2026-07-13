#!/usr/bin/env python3
"""
Generate dossier entries for batter vs bowler H2H career stats.

Reads: C:/Git/cricketstudio/data/_h2h-career.json
Writes: okf/dossier/t3-h2h-{batter}-vs-{bowler}-ipl-career.md

Filters: ≥30 career deliveries (sample floor).
Sorted by deliveries desc, top 300 pairs.

Run: python scripts/gen_dossier_h2h.py [--limit N] [--min-balls N]
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT = REPO_ROOT / "okf" / "dossier"
DATA_FILE = Path("C:/Git/cricketstudio/data/_h2h-career.json")
TODAY = "2026-07-12"
DV = "2026-06-11"


def dismissal_rate(d):
    if d["deliveries"] == 0:
        return "n/a"
    rate = d["dismissals"] / d["deliveries"] * 6  # per over
    return f"1 wicket per {d['deliveries'] // max(d['dismissals'], 1)} balls"


def dot_pct(d):
    if d["deliveries"] == 0:
        return 0
    return round(d["dotBalls"] / d["deliveries"] * 100)


def write(slug, content):
    p = OUT / slug
    if p.exists():
        return False
    p.write_text(content, encoding="utf-8")
    return True


def make_h2h_entry(pair: dict) -> tuple[str, str]:
    batter = pair["batterName"]
    bowler = pair["bowlerName"]
    batter_slug = pair["batterSlug"]
    bowler_slug = pair["bowlerSlug"]
    pair_slug = pair["slug"]

    c = pair["iplCareer"]
    deliveries = c["deliveries"]
    runs = c["runs"]
    sr = c["strikeRate"]
    fours = c["fours"]
    sixes = c["sixes"]
    dots = c["dotBalls"]
    dismissals = c["dismissals"]
    matches = c["matches"]
    first_season = pair.get("firstSeason", "?")
    last_season = pair.get("lastSeason", "?")
    dot_rate = dot_pct(c)

    avg = round(runs / dismissals, 1) if dismissals > 0 else "not dismissed"

    # Is this a dominant batter or dominant bowler matchup?
    dominant = "batter" if sr > 130 else ("bowler" if sr < 100 else "balanced")
    dominant_label = {
        "batter": f"{batter} dominates",
        "bowler": f"{bowler} controls",
        "balanced": "closely contested",
    }[dominant]

    # 2026 block (may be None)
    ipl2026 = pair.get("ipl2026")
    has_2026 = ipl2026 and ipl2026.get("deliveries", 0) >= 6

    slug = f"t3-h2h-{pair_slug}-ipl-career.md"
    title = f"{batter} vs {bowler} — IPL Career H2H, {matches} Matches"
    desc = (
        f"Verified IPL career head-to-head record: {batter} facing {bowler} across "
        f"{matches} matches, {deliveries} balls ({first_season}–{last_season})."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T3
debate_signal: "reddit,social-media,fantasy"
llm_failure_mode: "Produces a general summary of each player's reputation rather than the actual career H2H delivery count, SR, dot-ball %, and dismissal record between this specific pair."
resource: https://players.cricketstudio.ai/players/{batter_slug}
canonical_page: https://players.cricketstudio.ai/players/{batter_slug}
tags: [cricket, dossier, IPL, h2h, {batter_slug}, {bowler_slug}, career-stats, batting, bowling]
status: active
last_verified: "{TODAY}"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
dataset_version: "{DV}"
provenance:
  source: CricketStudio derived claim layer — IPL historical (Cricsheet CC BY 3.0) + IPL 2026 ball-by-ball
  confidence: high
  snapshot: CricketStudio internal dataset ({DV})
---

## User Question

> What is {batter}'s record against {bowler} in IPL? Who has the upper hand?

## Correct Answer Pattern

> **{batter} vs {bowler} — IPL career H2H ({first_season}–{last_season}):**
>
> | Metric | Value |
> |---|---|
> | Matches | {matches} |
> | Balls faced | {deliveries} |
> | Runs scored | {runs} |
> | Strike rate | {sr} |
> | Fours | {fours} |
> | Sixes | {sixes} |
> | Dismissals | {dismissals} |
> | Average | {avg} |
> | Dot ball % | {dot_rate}% |
>
> **Verdict:** This matchup is **{dominant_label}** — {batter} scores at {sr} SR from {deliveries} balls, {"with " + str(dismissals) + " dismissal" + ("s" if dismissals != 1 else "") if dismissals > 0 else "without being dismissed"}."""

    if has_2026:
        d = ipl2026
        content += f"""
>
> **IPL 2026 edition:** {d['runs']} runs from {d['deliveries']} balls (SR {d['strikeRate']}) across {d['matches']} match{"es" if d['matches'] != 1 else ""}."""

    content += f"""

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {batter} vs {bowler} IPL career — {runs} runs, {deliveries} balls, SR {sr}, {dismissals} dismissal(s) across {matches} matches ({first_season}–{last_season}). Source: https://players.cricketstudio.ai/players/{batter_slug}"

## Caveats

Floor: ≥30 IPL career deliveries between this pair. Career span: {first_season}–{last_season}. Source: Cricsheet IPL ball-by-ball (CC BY 3.0) + IPL 2026 capture. H2H stats are batting perspective — SR reflects batter's performance against this specific bowler.

## Related Concepts

- [{batter} player profile](https://players.cricketstudio.ai/players/{batter_slug})
- [{bowler} player profile](https://players.cricketstudio.ai/players/{bowler_slug})
- [IPL H2H page](https://players.cricketstudio.ai/h2h/{pair_slug})
"""

    return slug, content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=300, help="Max entries to generate")
    parser.add_argument("--min-balls", type=int, default=30, help="Min career deliveries")
    args = parser.parse_args()

    print(f"Loading {DATA_FILE}...")
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    pairs = data.get("pairs", [])

    # Filter by minimum balls and sort by deliveries descending
    eligible = [
        p for p in pairs
        if p.get("iplCareer") and p["iplCareer"].get("deliveries", 0) >= args.min_balls
    ]
    eligible.sort(key=lambda p: p["iplCareer"]["deliveries"], reverse=True)
    eligible = eligible[: args.limit]

    print(f"Eligible pairs: {len(eligible)} (floor: >={args.min_balls} balls, top {args.limit})")

    written = 0
    skipped = 0

    for pair in eligible:
        try:
            slug, content = make_h2h_entry(pair)
            if write(slug, content):
                print(f"  wrote  {slug}")
                written += 1
            else:
                print(f"  skip   {slug} (exists)")
                skipped += 1
        except Exception as e:
            print(f"  ERROR  {pair.get('slug', '?')} — {e}")

    print(f"\nDone — {written} written, {skipped} skipped")


if __name__ == "__main__":
    main()
