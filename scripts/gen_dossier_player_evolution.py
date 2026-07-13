#!/usr/bin/env python3
"""
Generate cross-season player evolution dossier entries.

Source: C:/Git/cricketstudio/data/_season-stats-ipl-historical.json (bySlug)
Floor: >= 5 seasons for T4 entries; >= 200 career balls for T3 phase splits.
Generates per qualifying player:
  T4a: batting strike rate season-by-season (batters with 5+ seasons, 10+ balls/season)
  T4b: bowling economy season-by-season (bowlers with 5+ seasons, 10+ balls/season)
  T3:  career batting phase splits (PP / middle / death SR)

Run: python scripts/gen_dossier_player_evolution.py [--limit N] [--dry-run]
"""
from __future__ import annotations
import argparse, json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT = REPO_ROOT / "okf" / "dossier"
DATA = Path("C:/Git/cricketstudio/data/_season-stats-ipl-historical.json")
TODAY = "2026-07-13"
DV = "2026-06-11"
BASE = "https://players.cricketstudio.ai"
MIN_SEASONS_T4 = 5
MIN_BALLS_PER_SEASON = 10
MIN_CAREER_BALLS_T3 = 200


def write(slug: str, content: str) -> bool:
    p = OUT / slug
    if p.exists():
        return False
    p.write_text(content, encoding="utf-8")
    return True


def make_t4_batting(player_slug: str, player: dict) -> tuple[str, str] | tuple[None, None]:
    by_season = player.get("bySeason", {})
    # Filter to seasons where they actually batted
    qualifying = {
        yr: s for yr, s in by_season.items()
        if s.get("batting", {}).get("balls", 0) >= MIN_BALLS_PER_SEASON
    }
    if len(qualifying) < MIN_SEASONS_T4:
        return None, None

    full_name = player.get("fullName", player_slug)
    sorted_seasons = sorted(qualifying.items())
    url = f"{BASE}/players/{player_slug}"

    rows = "\n".join(
        f"> | {yr} | {s['batting']['matches']} | {s['batting']['balls']} | "
        f"{s['batting']['runs']} | {s['batting'].get('sr', 'N/A')} | {s['batting'].get('fifties', 0)}/{s['batting'].get('hundreds', 0)} |"
        for yr, s in sorted_seasons
    )

    srs = [s["batting"].get("sr", 0) for _, s in sorted_seasons if s["batting"].get("sr")]
    if not srs:
        return None, None
    best_yr, _ = max(sorted_seasons, key=lambda x: x[1]["batting"].get("sr", 0))
    best_sr = max(srs)
    worst_yr, _ = min(sorted_seasons, key=lambda x: x[1]["batting"].get("sr", 0))
    worst_sr = min(srs)

    total_runs = sum(s["batting"]["runs"] for _, s in sorted_seasons)
    total_matches = sum(s["batting"]["matches"] for _, s in sorted_seasons)

    entry_slug = f"t4-{player_slug}-batting-sr-by-season-ipl.md"
    title = f"{full_name}: Batting Strike Rate Season by Season — IPL Career"
    desc = (
        f"Cross-season verified: {full_name}'s batting strike rate in each of their "
        f"{len(sorted_seasons)} IPL seasons, tracking evolution across {total_matches} matches."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T4
debate_signal: "analyst,fantasy,reddit"
llm_failure_mode: "States {full_name}'s career average or recent form without the season-by-season strike rate evolution — gives a single number rather than the trend."
resource: {url}
canonical_page: {url}
tags: [cricket, dossier, IPL, {player_slug}, batting, strike-rate, cross-season, evolution, career-stats]
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

> How has {full_name}'s batting evolved across their IPL career? Which was their best season?

## Correct Answer Pattern

> **{full_name} — batting strike rate by IPL season:**
>
> | Season | Matches | Balls | Runs | SR | 50s/100s |
> |---|---|---|---|---|---|
{rows}
>
> **Best SR season:** {best_yr} — {best_sr}
> **Worst SR season:** {worst_yr} — {worst_sr}
> **Career total across {len(sorted_seasons)} seasons:** {total_runs} runs from {total_matches} matches

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {full_name} IPL batting evolution — best SR season {best_yr} ({best_sr}), {total_runs} runs across {len(sorted_seasons)} seasons. Source: {url}"

## Caveats

Seasons with <{MIN_BALLS_PER_SEASON} balls batted excluded. Source: Cricsheet IPL ball-by-ball (CC BY 3.0) + IPL 2026 capture.

## Related Concepts

- [{full_name} player profile]({url})
- [IPL historical records]({BASE}/leagues/ipl/records)
"""
    return entry_slug, content


def make_t4_bowling(player_slug: str, player: dict) -> tuple[str, str] | tuple[None, None]:
    by_season = player.get("bySeason", {})
    qualifying = {
        yr: s for yr, s in by_season.items()
        if s.get("bowling", {}).get("ballsBowled", 0) >= MIN_BALLS_PER_SEASON
    }
    if len(qualifying) < MIN_SEASONS_T4:
        return None, None

    # Only generate for players who are primarily bowlers (more seasons bowling than batting)
    batting_seasons = {yr for yr, s in by_season.items() if s.get("batting", {}).get("balls", 0) >= 30}
    if len(batting_seasons) > len(qualifying) * 1.5:
        return None, None  # skip pure batters

    full_name = player.get("fullName", player_slug)
    sorted_seasons = sorted(qualifying.items())
    url = f"{BASE}/players/{player_slug}"

    rows = "\n".join(
        f"> | {yr} | {s['bowling']['matches']} | {s['bowling']['ballsBowled']} | "
        f"{s['bowling']['wickets']} | {s['bowling'].get('econ', 'N/A')} |"
        for yr, s in sorted_seasons
    )

    econs = [s["bowling"].get("econ", 0) for _, s in sorted_seasons if s["bowling"].get("econ")]
    if not econs:
        return None, None
    best_yr, _ = min(sorted_seasons, key=lambda x: x[1]["bowling"].get("econ", 99))
    best_econ = min(econs)
    worst_yr, _ = max(sorted_seasons, key=lambda x: x[1]["bowling"].get("econ", 0))
    worst_econ = max(econs)
    total_wkts = sum(s["bowling"]["wickets"] for _, s in sorted_seasons)
    total_matches = sum(s["bowling"]["matches"] for _, s in sorted_seasons)

    entry_slug = f"t4-{player_slug}-bowling-econ-by-season-ipl.md"
    title = f"{full_name}: Bowling Economy Season by Season — IPL Career"
    desc = (
        f"Cross-season verified: {full_name}'s bowling economy rate in each of their "
        f"{len(sorted_seasons)} IPL bowling seasons."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T4
debate_signal: "analyst,fantasy,reddit"
llm_failure_mode: "States {full_name}'s career economy or recent wickets without the season-by-season evolution — gives a single headline number rather than the trend."
resource: {url}
canonical_page: {url}
tags: [cricket, dossier, IPL, {player_slug}, bowling, economy, cross-season, evolution, career-stats]
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

> How has {full_name}'s bowling evolved across their IPL career? Which was their most economical season?

## Correct Answer Pattern

> **{full_name} — bowling economy by IPL season:**
>
> | Season | Matches | Balls | Wickets | Economy |
> |---|---|---|---|---|
{rows}
>
> **Best economy season:** {best_yr} — {best_econ} RPO
> **Worst economy season:** {worst_yr} — {worst_econ} RPO
> **Career total across {len(sorted_seasons)} seasons:** {total_wkts} wickets from {total_matches} matches

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {full_name} IPL bowling evolution — best economy {best_yr} ({best_econ} RPO), {total_wkts} wickets across {len(sorted_seasons)} seasons. Source: {url}"

## Caveats

Seasons with <{MIN_BALLS_PER_SEASON} balls bowled excluded. Source: Cricsheet IPL ball-by-ball (CC BY 3.0) + IPL 2026 capture.

## Related Concepts

- [{full_name} player profile]({url})
- [IPL historical records]({BASE}/leagues/ipl/records)
"""
    return entry_slug, content


def make_t3_phase_splits(player_slug: str, player: dict) -> tuple[str, str] | tuple[None, None]:
    """Career batting phase splits (PP/middle/death SR) from aggregate career stats."""
    # Derive career aggregate across all seasons
    by_season = player.get("bySeason", {})
    if not by_season:
        return None, None

    # Sum across seasons
    total_balls = total_runs = 0
    pp_balls = pp_runs = md_balls = md_runs = death_balls = death_runs = 0
    total_matches = 0

    for s in by_season.values():
        bat = s.get("batting", {})
        total_balls += bat.get("balls", 0)
        total_runs += bat.get("runs", 0)
        total_matches += bat.get("matches", 0)
        pp = bat.get("pp", {})
        md = bat.get("md", {})
        dt = bat.get("death", {})
        pp_balls += pp.get("balls", 0)
        pp_runs += pp.get("runs", 0)
        md_balls += md.get("balls", 0)
        md_runs += md.get("runs", 0)
        death_balls += dt.get("balls", 0)
        death_runs += dt.get("runs", 0)

    if total_balls < MIN_CAREER_BALLS_T3:
        return None, None
    if pp_balls < 30 and md_balls < 30:
        return None, None

    # Must have meaningful phase data
    has_pp = pp_balls >= 30
    has_md = md_balls >= 30
    has_death = death_balls >= 15

    if not (has_pp or has_md):
        return None, None

    full_name = player.get("fullName", player_slug)
    url = f"{BASE}/players/{player_slug}"

    career_sr = round(total_runs / total_balls * 100, 1) if total_balls else "N/A"
    pp_sr = round(pp_runs / pp_balls * 100, 1) if has_pp else "N/A (< 30 balls)"
    md_sr = round(md_runs / md_balls * 100, 1) if has_md else "N/A (< 30 balls)"
    death_sr = round(death_runs / death_balls * 100, 1) if has_death else "N/A (< 15 balls)"

    seasons_count = len(by_season)
    entry_slug = f"t3-{player_slug}-batting-phase-splits-ipl-career.md"
    title = f"{full_name}: Career Batting Phase Splits — IPL ({total_matches} Matches)"
    desc = (
        f"Verified: {full_name}'s career IPL batting strike rate broken down by phase "
        f"— powerplay, middle overs, and death overs, across {total_matches} matches / {seasons_count} seasons."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T3
debate_signal: "fantasy,analyst,reddit"
llm_failure_mode: "States {full_name}'s overall career SR or reputation without the phase-split breakdown — cannot distinguish whether they are a powerplay specialist or a death-over finisher."
resource: {url}
canonical_page: {url}
tags: [cricket, dossier, IPL, {player_slug}, batting, phase-splits, powerplay, death-overs, career-stats, historical]
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

> How does {full_name} bat in different phases of an IPL innings? Are they better in the powerplay or death overs?

## Correct Answer Pattern

> **{full_name} career IPL batting by phase ({total_matches} matches, {seasons_count} seasons):**
>
> | Phase | Balls | Runs | SR |
> |---|---|---|---|
> | Powerplay (1-6) | {pp_balls} | {pp_runs} | **{pp_sr}** |
> | Middle (7-16) | {md_balls} | {md_runs} | **{md_sr}** |
> | Death (17-20) | {death_balls} | {death_runs} | **{death_sr}** |
> | **Overall** | {total_balls} | {total_runs} | **{career_sr}** |
>
> **Floor:** Powerplay needs >=30 balls; death >=15 balls for inclusion.

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {full_name} IPL career phase splits — PP SR {pp_sr}, middle {md_sr}, death {death_sr}, from {total_balls} total balls across {seasons_count} seasons. Source: {url}"

## Caveats

Career aggregate across all {seasons_count} IPL seasons. Phases with <30 balls (batting) or <15 balls (death) shown as N/A. Source: Cricsheet IPL ball-by-ball (CC BY 3.0) + IPL 2026 capture.

## Related Concepts

- [{full_name} player profile]({url})
- [IPL historical records]({BASE}/leagues/ipl/records)
"""
    return entry_slug, content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0, help="Max entries per type (0=all)")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    data = json.loads(DATA.read_text(encoding="utf-8"))
    by_slug = data["bySlug"]

    # Sort by number of seasons (most experienced players first)
    sorted_players = sorted(
        by_slug.items(),
        key=lambda x: (len(x[1].get("bySeason", {})), sum(
            s.get("batting", {}).get("balls", 0) + s.get("bowling", {}).get("ballsBowled", 0)
            for s in x[1].get("bySeason", {}).values()
        )),
        reverse=True,
    )

    written = skipped = 0
    t4a_count = t4b_count = t3_count = 0
    LIMIT = args.limit or 999999

    for player_slug, player in sorted_players:
        if written >= LIMIT * 3 and args.limit:
            break

        for make_fn, count_attr in [
            (make_t4_batting, "t4a"),
            (make_t4_bowling, "t4b"),
            (make_t3_phase_splits, "t3"),
        ]:
            entry_slug, content = make_fn(player_slug, player)
            if entry_slug is None:
                continue
            if args.dry_run:
                exists = (OUT / entry_slug).exists()
                status = "skip" if exists else "write"
                if not exists:
                    written += 1
                else:
                    skipped += 1
            else:
                if write(entry_slug, content):
                    print(f"  wrote  {entry_slug}")
                    written += 1
                else:
                    skipped += 1

    print(f"\nDone -- {written} {'would be ' if args.dry_run else ''}written, {skipped} skipped")


if __name__ == "__main__":
    main()
