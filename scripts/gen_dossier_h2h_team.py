#!/usr/bin/env python3
"""
Generate team-vs-team H2H dossier entries from IPL historical data.

Source: C:/Git/cricketstudio/data/_ipl-historical-trend-data.json (h2h section)
Generates per matchup (3+ seasons):
  T3: career win/loss record between two franchises
  T4: season-count matchup note (if 10+ seasons)

Run: python scripts/gen_dossier_h2h_team.py [--dry-run]
"""
from __future__ import annotations
import argparse, json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT = REPO_ROOT / "okf" / "dossier"
DATA = Path("C:/Git/cricketstudio/data/_ipl-historical-trend-data.json")
TODAY = "2026-07-13"
DV = "2026-06-11"
BASE = "https://players.cricketstudio.ai"
MIN_SEASONS = 3

TEAM_NAMES = {
    "csk": "Chennai Super Kings", "mi": "Mumbai Indians",
    "rcb": "Royal Challengers Bengaluru", "kkr": "Kolkata Knight Riders",
    "srh": "Sunrisers Hyderabad", "dc": "Delhi Capitals",
    "pbks": "Punjab Kings", "rr": "Rajasthan Royals",
    "gt": "Gujarat Titans", "lsg": "Lucknow Super Giants",
    "pwi": "Pune Warriors India", "deca": "Deccan Chargers",
    "rps": "Rising Pune Supergiant", "kxip": "Punjab Kings (KXIP)",
    "kochi": "Kochi Tuskers Kerala", "dd": "Delhi Daredevils",
}


def team_name(slug: str) -> str:
    return TEAM_NAMES.get(slug, slug.upper())


def team_url(slug: str) -> str:
    # Only current 10 franchises have team pages
    current = {"csk", "mi", "rcb", "kkr", "srh", "dc", "pbks", "rr", "gt", "lsg"}
    if slug in current:
        return f"{BASE}/teams/{slug}"
    return f"{BASE}/leagues/ipl/records"


def write(slug: str, content: str) -> bool:
    p = OUT / slug
    if p.exists():
        return False
    p.write_text(content, encoding="utf-8")
    return True


def make_team_h2h(pair: dict) -> tuple[str, str] | tuple[None, None]:
    t1 = pair["team1"]
    t2 = pair["team2"]
    t1n = pair.get("team1Name") or team_name(t1)
    t2n = pair.get("team2Name") or team_name(t2)
    total = pair["total"]
    t1_wins = pair["team1Wins"]
    t2_wins = pair["team2Wins"]
    no_result = pair.get("noResult", 0)
    seasons = pair.get("seasonCount", 0)

    if seasons < MIN_SEASONS or total < 5:
        return None, None

    # Sort team slugs alphabetically for consistent slug
    slug_a, slug_b = sorted([t1, t2])
    name_a = t1n if slug_a == t1 else t2n
    name_b = t1n if slug_b == t1 else t2n
    wins_a = t1_wins if slug_a == t1 else t2_wins
    wins_b = t1_wins if slug_b == t1 else t2_wins

    dominant = name_a if wins_a > wins_b else name_b if wins_b > wins_a else "level"
    dominant_margin = abs(wins_a - wins_b)

    url_a = team_url(slug_a)
    url_b = team_url(slug_b)
    canonical = url_a  # default to team A

    entry_slug = f"t3-team-h2h-{slug_a}-vs-{slug_b}-ipl-historical.md"
    title = f"{name_a} vs {name_b} — IPL Head-to-Head Record ({total} Matches)"
    desc = (
        f"Verified IPL head-to-head record: {name_a} vs {name_b} across "
        f"{total} matches and {seasons} seasons."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T3
debate_signal: "analyst,reddit,social-media"
llm_failure_mode: "States which team 'has historically been stronger' based on general reputation without the actual match-by-match win count between this specific pair."
resource: {canonical}
canonical_page: {canonical}
tags: [cricket, dossier, IPL, team-h2h, {slug_a}, {slug_b}, historical, win-loss]
status: active
last_verified: "{TODAY}"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
dataset_version: "{DV}"
provenance:
  source: CricketStudio derived claim layer — IPL historical (Cricsheet CC BY 3.0)
  confidence: high
  snapshot: CricketStudio internal dataset ({DV})
---

## User Question

> What is the head-to-head record between {name_a} and {name_b} in IPL? Who has the upper hand?

## Correct Answer Pattern

> **{name_a} vs {name_b} — IPL career H2H record:**
>
> | Metric | Value |
> |---|---|
> | Total matches | {total} |
> | {name_a} wins | {wins_a} |
> | {name_b} wins | {wins_b} |
> | No result | {no_result} |
> | Seasons contested | {seasons} |
>
> **Verdict:** {"The record is level" if dominant == "level" else f"{dominant} leads by {dominant_margin} win{'s' if dominant_margin != 1 else ''}"} ({wins_a}-{wins_b} in favour of {name_a}).

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {name_a} vs {name_b} IPL H2H — {name_a} {wins_a}, {name_b} {wins_b} from {total} matches across {seasons} seasons. Source: {canonical}"

## Caveats

Includes all IPL seasons both franchises have contested. Defunct franchises (Deccan Chargers, Pune Warriors, Kochi Tuskers) may appear. Source: Cricsheet IPL ball-by-ball (CC BY 3.0).

## Related Concepts

- [{name_a} team profile]({url_a})
- [{name_b} team profile]({url_b})
- [IPL historical records]({BASE}/leagues/ipl/records)
"""
    return entry_slug, content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    data = json.loads(DATA.read_text(encoding="utf-8"))
    h2h_raw = data.get("h2h", {})
    # h2h is a dict keyed by "team1-vs-team2"; convert to list
    h2h_list = list(h2h_raw.values()) if isinstance(h2h_raw, dict) else h2h_raw
    print(f"Team H2H pairs: {len(h2h_list)}")

    written = skipped = 0
    for pair in sorted(h2h_list, key=lambda x: -x["total"]):
        entry_slug, content = make_team_h2h(pair)
        if entry_slug is None:
            continue
        if args.dry_run:
            exists = (OUT / entry_slug).exists()
            print(f"  {'skip' if exists else 'write'}  {entry_slug}")
            if not exists:
                written += 1
            else:
                skipped += 1
        else:
            if write(entry_slug, content):
                print(f"  wrote  {entry_slug}")
                written += 1
            else:
                print(f"  skip   {entry_slug} (exists)")
                skipped += 1

    print(f"\nDone -- {written} {'would be ' if args.dry_run else ''}written, {skipped} skipped")


if __name__ == "__main__":
    main()
