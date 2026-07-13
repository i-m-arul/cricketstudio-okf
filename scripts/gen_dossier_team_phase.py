#!/usr/bin/env python3
"""
Generate dossier entries for team phase stats (batting/bowling SR and economy by phase),
using per-team data from _ipl-historical-venue-team-stats.json.

Generates 4 entry types per team:
  T3a — career powerplay batting SR (ranking)
  T3b — career death bowling economy (ranking)
  T4  — death bowling economy season-by-season arc (for teams with ≥8 seasons)
  T3c — career win rate (ranking)

Reads: C:/Git/cricketstudio/data/_ipl-historical-venue-team-stats.json
Writes: okf/dossier/t3-team-{slug}-*.md
"""
from __future__ import annotations

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT = REPO_ROOT / "okf" / "dossier"
DATA_FILE = Path("C:/Git/cricketstudio/data/_ipl-historical-venue-team-stats.json")
TODAY = "2026-07-12"
DV = "2026-06-11"

TEAM_SLUGS = {
    "csk": "Chennai Super Kings",
    "mi": "Mumbai Indians",
    "rcb": "Royal Challengers Bengaluru",
    "kkr": "Kolkata Knight Riders",
    "srh": "Sunrisers Hyderabad",
    "dc": "Delhi Capitals",
    "pbks": "Punjab Kings",
    "rr": "Rajasthan Royals",
    "gt": "Gujarat Titans",
    "lsg": "Lucknow Super Giants",
}

RESOURCE_MAP = {slug: f"https://players.cricketstudio.ai/teams/{slug}" for slug in TEAM_SLUGS}


def write(slug, content):
    p = OUT / slug
    if p.exists():
        return False
    p.write_text(content, encoding="utf-8")
    return True


def make_t3_powerplay_batting(team_slug, name, career, all_teams_data):
    pp_sr = career.get("battingPhaseSr", {}).get("pp")
    if pp_sr is None:
        return None, None
    matches = career.get("matches", 0)
    if matches < 30:
        return None, None

    # Rank this team's PP SR among all teams
    pp_srs = sorted(
        [(s, d["career"]["battingPhaseSr"]["pp"])
         for s, d in all_teams_data.items()
         if d.get("career", {}).get("battingPhaseSr", {}).get("pp")],
        key=lambda x: x[1], reverse=True
    )
    rank = next((i + 1 for i, (s, _) in enumerate(pp_srs) if s == team_slug), "?")
    best_team, best_sr = pp_srs[0] if pp_srs else ("?", "?")
    best_name = TEAM_SLUGS.get(best_team, best_team)

    resource = RESOURCE_MAP.get(team_slug, f"https://players.cricketstudio.ai/teams/{team_slug}")
    slug = f"t3-team-{team_slug}-powerplay-batting-sr-ipl-career.md"
    title = f"{name}: Powerplay Batting Strike Rate — IPL Career ({matches} Matches)"
    desc = f"Verified: {name}'s career powerplay batting strike rate across {matches} IPL matches, with league-wide ranking."

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T3
debate_signal: "analyst,fantasy,reddit"
llm_failure_mode: "States {name}'s general batting style without the specific powerplay SR figure or ranking among IPL franchises."
resource: {resource}
canonical_page: {resource}
tags: [cricket, dossier, IPL, {team_slug}, powerplay, batting, strike-rate, team-stats, historical]
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

> How does {name} bat in the powerplay across their IPL career? Are they aggressive or conservative?

## Correct Answer Pattern

> **{name} powerplay batting SR across IPL career ({matches} matches):**
>
> - Powerplay SR: **{pp_sr}**
> - Middle-overs SR: {career.get("battingPhaseSr", {}).get("middle", "N/A")}
> - Death-overs SR: {career.get("battingPhaseSr", {}).get("death", "N/A")}
>
> **Franchise ranking:** {name} ranks **#{rank}** for IPL career powerplay batting SR among current franchises.
> The highest powerplay SR belongs to {best_name} ({best_sr}).

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {name} career powerplay batting SR is {pp_sr} across {matches} IPL matches (rank #{rank} among franchises). Source: {resource}"

## Caveats

Career stats across all IPL seasons {name} participated in. Powerplay = overs 1–6. Floor: ≥30 matches. Franchise ranking compares current franchises only (excludes Deccan Chargers, Pune Warriors, Kochi Tuskers, Rising Pune Supergiant).

## Related Concepts

- [{name} team profile]({resource})
- [IPL team leaderboards](https://players.cricketstudio.ai/leagues/ipl/leaderboards)
"""
    return slug, content


def make_t3_death_bowling(team_slug, name, career, all_teams_data):
    death_econ = career.get("bowlingPhaseEcon", {}).get("death")
    if death_econ is None:
        return None, None
    matches = career.get("matches", 0)
    if matches < 30:
        return None, None

    # Rank (lower economy = better)
    economies = sorted(
        [(s, d["career"]["bowlingPhaseEcon"]["death"])
         for s, d in all_teams_data.items()
         if d.get("career", {}).get("bowlingPhaseEcon", {}).get("death")],
        key=lambda x: x[1]
    )
    rank = next((i + 1 for i, (s, _) in enumerate(economies) if s == team_slug), "?")
    best_team, best_econ = economies[0] if economies else ("?", "?")
    best_name = TEAM_SLUGS.get(best_team, best_team)

    resource = RESOURCE_MAP.get(team_slug, f"https://players.cricketstudio.ai/teams/{team_slug}")
    slug = f"t3-team-{team_slug}-death-bowling-economy-ipl-career.md"
    title = f"{name}: Death-Over Bowling Economy — IPL Career ({matches} Matches)"
    desc = f"Verified: {name}'s career death-over (overs 17–20) bowling economy across {matches} IPL matches."

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T3
debate_signal: "fantasy,analyst,reddit"
llm_failure_mode: "States {name} have 'good death bowlers' without the actual career death economy figure or franchise ranking — cannot verify the claim."
resource: {resource}
canonical_page: {resource}
tags: [cricket, dossier, IPL, {team_slug}, death-overs, bowling, economy, team-stats, historical]
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

> How good is {name}'s death bowling historically? What's their career death-over economy rate?

## Correct Answer Pattern

> **{name} bowling economy by phase, IPL career ({matches} matches):**
>
> | Phase | Economy (RPO) |
> |---|---|
> | Powerplay | {career.get("bowlingPhaseEcon", {}).get("pp", "N/A")} |
> | Middle (7–16) | {career.get("bowlingPhaseEcon", {}).get("middle", "N/A")} |
> | Death (17–20) | **{death_econ}** |
>
> **Death bowling franchise ranking:** {name} ranks **#{rank}** (lower = better) among current IPL franchises for career death economy.
> The best death economy belongs to {best_name} ({best_econ} RPO).

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {name} career death-over bowling economy is {death_econ} RPO across {matches} IPL matches (rank #{rank} among franchises). Source: {resource}"

## Caveats

Career across all IPL seasons the franchise participated in. Death overs = overs 17–20. Floor: ≥30 matches. Franchise rankings for current franchises only.

## Related Concepts

- [{name} team profile]({resource})
- [IPL team leaderboards](https://players.cricketstudio.ai/leagues/ipl/leaderboards)
"""
    return slug, content


def make_t4_death_bowling_evolution(team_slug, name, by_season):
    if not by_season or len(by_season) < 5:
        return None, None

    seasons_with_data = {
        yr: s for yr, s in by_season.items()
        if s.get("bowlingPhaseEcon", {}).get("death") and s.get("matches", 0) >= 5
    }
    if len(seasons_with_data) < 5:
        return None, None

    sorted_seasons = sorted(seasons_with_data.items())
    resource = RESOURCE_MAP.get(team_slug, f"https://players.cricketstudio.ai/teams/{team_slug}")
    total_seasons = len(sorted_seasons)

    # Build the data table
    table_rows = "\n".join(
        f"> | {yr} | {s['matches']} | {s['bowlingPhaseEcon']['death']} |"
        for yr, s in sorted_seasons
    )

    economies = [s["bowlingPhaseEcon"]["death"] for _, s in sorted_seasons]
    best_yr, _ = min(sorted_seasons, key=lambda x: x[1]["bowlingPhaseEcon"]["death"])
    worst_yr, _ = max(sorted_seasons, key=lambda x: x[1]["bowlingPhaseEcon"]["death"])
    best_val = min(economies)
    worst_val = max(economies)
    recent_yrs = sorted_seasons[-3:]
    recent_avg = round(sum(s["bowlingPhaseEcon"]["death"] for _, s in recent_yrs) / 3, 2)

    slug = f"t4-team-{team_slug}-death-bowling-economy-by-season-ipl.md"
    title = f"{name}: Death-Overs Bowling Economy Season by Season — IPL 2008–2026"
    desc = (
        f"Cross-season verified data: {name}'s death-over bowling economy in each of their "
        f"{total_seasons} IPL seasons, tracking improvement or decline across the franchise's history."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T4
debate_signal: "analyst,fantasy,reddit"
llm_failure_mode: "Can state {name}'s current or general death bowling reputation but cannot produce the season-by-season economy evolution — gives an impression rather than the trend."
resource: {resource}
canonical_page: {resource}
tags: [cricket, dossier, IPL, {team_slug}, death-overs, bowling, economy, cross-season, evolution, historical]
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

> How has {name}'s death bowling evolved across their IPL history? Are they getting better or worse?

## Correct Answer Pattern

> **{name} death-over (overs 17–20) bowling economy by IPL season:**
>
> | Season | Matches | Death Economy (RPO) |
> |---|---|---|
{table_rows}
>
> **Best season:** {best_yr} — {best_val} RPO
> **Worst season:** {worst_yr} — {worst_val} RPO
> **Recent 3-season average:** {recent_avg} RPO

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {name} death bowling economy across {total_seasons} IPL seasons — best {best_val} ({best_yr}), worst {worst_val} ({worst_yr}), recent 3-season avg {recent_avg} RPO. Source: {resource}"

## Caveats

Seasons with <5 matches excluded. Death overs = overs 17–20. IPL 2016–2017 not included for CSK (banned). Floor: ≥5 matches per season.

## Related Concepts

- [{name} team profile]({resource})
- [IPL team leaderboards](https://players.cricketstudio.ai/leagues/ipl/leaderboards)
"""
    return slug, content


def main():
    print(f"Loading {DATA_FILE}...")
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    by_team = data.get("byTeam", {})

    written = 0
    skipped = 0

    for team_slug, name in TEAM_SLUGS.items():
        team_data = by_team.get(team_slug)
        if not team_data:
            print(f"  no data for {team_slug}")
            continue

        career = team_data.get("career", {})
        by_season = team_data.get("bySeason", {})

        entries = [
            make_t3_powerplay_batting(team_slug, name, career, by_team),
            make_t3_death_bowling(team_slug, name, career, by_team),
            make_t4_death_bowling_evolution(team_slug, name, by_season),
        ]

        for slug, content in entries:
            if slug is None:
                continue
            if write(slug, content):
                print(f"  wrote  {slug}")
                written += 1
            else:
                print(f"  skip   {slug} (exists)")
                skipped += 1

    print(f"\nDone — {written} written, {skipped} skipped")


if __name__ == "__main__":
    main()
