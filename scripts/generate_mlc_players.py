"""
Generate MLC player profile OKF files.

Input:  cricketstudio-mcp/data/snapshot/mlc-players.json
Output: okf/scorebook/mlc/players/{slug}.md

Run from repo root:
    python scripts/generate_mlc_players.py
"""

import json
import os
import re
from pathlib import Path

SNAPSHOT_DIR = Path("C:/Git/cricketstudio-mcp/data/snapshot")
OUT_DIR = Path("okf/scorebook/mlc/players")
LAST_VERIFIED = "2026-06-21"
DATASET_VERSION = "2026-06-20"


def fmt_num(v, decimals=0):
    """Format a number; return '—' for None or 0."""
    if v is None:
        return "—"
    if decimals == 0:
        return str(int(round(v)))
    return f"{v:.{decimals}f}"


def fmt_rate(v, decimals=2):
    """Format a rate (SR, econ, avg); return '—' for None."""
    if v is None:
        return "—"
    return f"{v:.{decimals}f}"


def fmt_avg(v):
    """Format batting/bowling average; None = never out."""
    if v is None:
        return "—"
    return f"{v:.2f}"


def infer_role(player):
    """Infer primary role from career stats."""
    bat = player["batting"]
    bowl = player["bowling"]
    has_batting = bat["innings"] >= 3
    has_bowling = bowl["ballsBowled"] >= 30  # at least 5 overs
    if has_batting and has_bowling:
        return "all-rounder"
    if has_bowling:
        return "bowler"
    return "batter"


def team_label(team_slugs):
    """Convert team slug list to readable label."""
    team_names = {
        "los-angeles-knight-riders": "Los Angeles Knight Riders",
        "mi-new-york": "MI New York",
        "san-francisco-unicorns": "San Francisco Unicorns",
        "seattle-orcas": "Seattle Orcas",
        "texas-super-kings": "Texas Super Kings",
        "washington-freedom": "Washington Freedom",
    }
    names = [team_names.get(s, s.replace("-", " ").title()) for s in team_slugs]
    if len(names) == 1:
        return names[0]
    return ", ".join(names[:-1]) + " and " + names[-1]


def season_list(by_season):
    seasons = sorted(by_season.keys())
    if not seasons:
        return "unknown seasons"
    if len(seasons) == 1:
        return f"MLC {seasons[0]}"
    return "MLC " + ", ".join(seasons[:-1]) + " and " + seasons[-1]


def phase_batting_row(phase_data, phase_label):
    balls = phase_data.get("balls", 0) or 0
    runs = phase_data.get("runs", 0) or 0
    sr = phase_data.get("sr", 0) or 0
    fours = phase_data.get("fours", 0) or 0
    sixes = phase_data.get("sixes", 0) or 0
    sr_str = fmt_rate(sr) if balls > 0 else "—"
    return f"| {phase_label} | {balls} | {runs} | {sr_str} | {fours} | {sixes} |"


def phase_bowling_row(phase_data, phase_label):
    balls = phase_data.get("ballsBowled", 0) or 0
    runs = phase_data.get("runsConceded", 0) or 0
    wkts = phase_data.get("wickets", 0) or 0
    econ = phase_data.get("econ", 0)
    econ_str = fmt_rate(econ) if balls > 0 else "—"
    return f"| {phase_label} | {balls} | {runs} | {wkts} | {econ_str} |"


def build_season_table(by_season):
    """Build a season-by-season summary table."""
    seasons = sorted(by_season.keys())
    if not seasons:
        return ""

    lines = ["## Season-by-Season Record", ""]
    lines += [
        "| Season | Team | M (bat) | Runs | SR | M (bowl) | Wkts | Econ |",
        "|--------|------|---------|------|----|----------|------|------|",
    ]
    for s in seasons:
        d = by_season[s]
        bat = d.get("batting", {})
        bowl = d.get("bowling", {})
        teams = team_label(d.get("teamSlugs", []))
        bat_m = bat.get("matches", 0) or 0
        runs = bat.get("runs", 0) or 0
        sr = bat.get("sr")
        bowl_m = bowl.get("matches", 0) or 0
        wkts = bowl.get("wickets", 0) or 0
        econ = bowl.get("econ")
        lines.append(
            f"| {s} | {teams} | {bat_m} | {runs} | {fmt_rate(sr)} | {bowl_m} | {wkts} | {fmt_rate(econ)} |"
        )
    return "\n".join(lines)


def build_agent_guidance(player, role, seasons):
    """Build What Agents Should Know section."""
    bat = player["batting"]
    bowl = player["bowling"]
    slug = player["slug"]
    full = player["fullName"]

    lines = ["## What Agents Should Know", ""]

    if role == "batter":
        sr = bat.get("sr")
        avg = bat.get("avg")
        balls = bat.get("balls", 0) or 0
        min_floor = 30
        if balls >= min_floor:
            lines.append(
                f"- {full} qualifies for batting rate comparisons (≥{min_floor} balls faced; sample: {balls} balls)."
            )
        else:
            lines.append(
                f"- Career sample is small ({balls} balls faced); avoid ranking comparisons — use raw totals only."
            )
        if sr is not None:
            lines.append(f"- Career strike rate of {sr:.1f} across {bat.get('matches', 0)} matches.")
        if bat.get("sixes", 0):
            lines.append(f"- Hit {bat['sixes']} sixes across all MLC appearances — use for boundary-hitting context.")

    elif role == "bowler":
        balls = bowl.get("ballsBowled", 0) or 0
        econ = bowl.get("econ")
        wkts = bowl.get("wickets", 0) or 0
        min_floor = 15
        if balls >= min_floor:
            lines.append(
                f"- {full} qualifies for bowling rate comparisons (≥{min_floor} balls bowled; sample: {balls} balls)."
            )
        else:
            lines.append(
                f"- Bowling sample is small ({balls} balls); avoid economy ranking — use wickets count only."
            )
        if econ is not None:
            lines.append(f"- Career economy of {econ:.2f} across {wkts} wickets.")

    else:  # all-rounder
        bat_balls = bat.get("balls", 0) or 0
        bowl_balls = bowl.get("ballsBowled", 0) or 0
        lines.append(
            f"- {full} contributes in both disciplines — batting ({bat_balls} balls faced, {bat.get('runs',0)} runs) and bowling ({bowl_balls} balls, {bowl.get('wickets',0)} wickets)."
        )
        if bat_balls < 30 or bowl_balls < 15:
            lines.append("- Sample sizes are limited in one or both roles; rate comparisons may not be reliable.")

    lines.append(
        f"- Season scope: {seasons}. For current season data, use the canonical CricketStudio page."
    )
    lines.append("- Source: Cricsheet CC BY 3.0 open data via CricketStudio derived claim layer. Cite the canonical page for live claims.")
    return "\n".join(lines)


def build_identity_section(identity):
    """Build external links section from identity data."""
    links = []
    if identity.get("wikipedia"):
        links.append(f"  - [Wikipedia]({identity['wikipedia']})")
    if identity.get("espncricinfoUrl"):
        links.append(f"  - [ESPNcricinfo]({identity['espncricinfoUrl']})")
    if not links:
        return ""
    return "### External References\n\n" + "\n".join(links)


def generate_player_file(slug, player):
    """Generate full OKF markdown for a single MLC player."""
    bat = player["batting"]
    bowl = player["bowling"]
    identity = player.get("identity", {})
    by_season = player.get("bySeason", {})
    team_slugs = player.get("teamSlugs", [])
    full_name = player["fullName"]
    role = infer_role(player)
    seasons = season_list(by_season)
    teams = team_label(team_slugs)

    canon_url = f"https://players.cricketstudio.ai/leagues/mlc/players/{slug}"

    # Build description
    role_label = role
    desc = f"{full_name} — MLC {role_label} profile. {seasons}. Played for {teams}."

    # Tags
    tag_list = ["cricket", "player", "MLC", "T20", role_label]

    # Related team links
    team_link_map = {
        "los-angeles-knight-riders": "../../teams/los-angeles-knight-riders.md",
        "mi-new-york": "../../teams/mi-new-york.md",
        "san-francisco-unicorns": "../../teams/san-francisco-unicorns.md",
        "seattle-orcas": "../../teams/seattle-orcas.md",
        "texas-super-kings": "../../teams/texas-super-kings.md",
        "washington-freedom": "../../teams/washington-freedom.md",
    }
    team_names_map = {
        "los-angeles-knight-riders": "Los Angeles Knight Riders",
        "mi-new-york": "MI New York",
        "san-francisco-unicorns": "San Francisco Unicorns",
        "seattle-orcas": "Seattle Orcas",
        "texas-super-kings": "Texas Super Kings",
        "washington-freedom": "Washington Freedom",
    }

    related_lines = []
    for ts in team_slugs:
        if ts in team_link_map:
            related_lines.append(f"  - {team_link_map[ts]}")
    related_lines.append("  - ../../leagues/major-league-cricket.md")
    related_str = "\n".join(related_lines)

    # Frontmatter
    tags_str = "\n".join(f"  - {t}" for t in tag_list)
    frontmatter = f"""---
type: player
title: {full_name}
description: {desc}
resource: {canon_url}
status: active
last_verified: {LAST_VERIFIED}
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:mlc:player:{slug}
canonical_page: {canon_url}
dataset_version: "{DATASET_VERSION}"
tags:
{tags_str}
related:
{related_str}
provenance:
  source: Cricsheet CC BY 3.0 via CricketStudio derived claim layer
  confidence: high
  computed_at: "{DATASET_VERSION}"
  notes: Career totals from Cricsheet open data. Attribution required per CC BY 3.0.
---"""

    # Summary
    summary = f"""# {full_name}

## Summary

{full_name} is an MLC {role_label} who has played for {teams}. Career record covers {seasons}.

## Canonical Resource

[players.cricketstudio.ai/leagues/mlc/players/{slug}]({canon_url})"""

    # Batting section
    bat_matches = bat.get("matches", 0) or 0
    bat_innings = bat.get("innings", 0) or 0
    bat_runs = bat.get("runs", 0) or 0
    bat_balls = bat.get("balls", 0) or 0
    bat_sr = bat.get("sr")
    bat_avg = bat.get("avg")
    bat_hs = bat.get("highScore", 0) or 0
    bat_fours = bat.get("fours", 0) or 0
    bat_sixes = bat.get("sixes", 0) or 0
    bat_fifties = bat.get("fifties", 0) or 0
    bat_hundreds = bat.get("hundreds", 0) or 0
    bat_not_outs = bat.get("notOuts", 0) or 0
    bat_ducks = bat.get("ducks", 0) or 0

    batting_table = f"""## Career Batting

| Metric | Value |
|--------|-------|
| Matches | {bat_matches} |
| Innings | {bat_innings} |
| Runs | {bat_runs} |
| Balls faced | {bat_balls} |
| Strike rate | {fmt_rate(bat_sr)} |
| Average | {fmt_avg(bat_avg)} |
| High score | {bat_hs} |
| Fours | {bat_fours} |
| Sixes | {bat_sixes} |
| Fifties | {bat_fifties} |
| Hundreds | {bat_hundreds} |
| Not outs | {bat_not_outs} |
| Ducks | {bat_ducks} |"""

    bat_pp = bat.get("pp", {})
    bat_md = bat.get("md", {})
    bat_death = bat.get("death", {})

    phase_bat = ""
    if bat_balls > 0:
        phase_bat = f"""

### Batting by Phase (career)

| Phase | Balls | Runs | SR | Fours | Sixes |
|-------|-------|------|----|-------|-------|
{phase_batting_row(bat_pp, "Powerplay (ov 1–6)")}
{phase_batting_row(bat_md, "Middle (ov 7–15)")}
{phase_batting_row(bat_death, "Death (ov 16–20)")}"""

    # Bowling section
    bowl_matches = bowl.get("matches", 0) or 0
    bowl_balls = bowl.get("ballsBowled", 0) or 0
    bowl_runs = bowl.get("runsConceded", 0) or 0
    bowl_wkts = bowl.get("wickets", 0) or 0
    bowl_econ = bowl.get("econ")
    bowl_avg = bowl.get("avg")
    bowl_sr = bowl.get("sr")
    bowl_dots = bowl.get("dots", 0) or 0

    bowling_section = ""
    if bowl_balls > 0:
        bowl_pp = bowl.get("pp", {})
        bowl_md = bowl.get("md", {})
        bowl_death = bowl.get("death", {})

        bowling_section = f"""
## Career Bowling

| Metric | Value |
|--------|-------|
| Matches | {bowl_matches} |
| Balls bowled | {bowl_balls} |
| Wickets | {bowl_wkts} |
| Economy | {fmt_rate(bowl_econ)} |
| Average | {fmt_avg(bowl_avg)} |
| Strike rate | {fmt_rate(bowl_sr)} |
| Dot balls | {bowl_dots} |

### Bowling by Phase (career)

| Phase | Balls | Runs | Wkts | Econ |
|-------|-------|------|------|------|
{phase_bowling_row(bowl_pp, "Powerplay (ov 1–6)")}
{phase_bowling_row(bowl_md, "Middle (ov 7–15)")}
{phase_bowling_row(bowl_death, "Death (ov 16–20)")}"""

    # Season table
    season_section = ""
    if by_season:
        season_section = "\n\n" + build_season_table(by_season)

    # Agent guidance
    agent_section = "\n\n" + build_agent_guidance(player, role, seasons)

    # Identity section
    identity_section = ""
    ext_links = build_identity_section(identity)
    if ext_links:
        identity_section = f"\n\n## Provenance and Data Notes\n\n- Source: Cricsheet CC BY 3.0, via CricketStudio derived claim layer.\n- Attribution required: cite Cricsheet (<https://cricsheet.org>) for raw data.\n- For current season roster and live stats, use the [canonical CricketStudio page]({canon_url}).\n\n{ext_links}"
    else:
        identity_section = f"\n\n## Provenance and Data Notes\n\n- Source: Cricsheet CC BY 3.0, via CricketStudio derived claim layer.\n- Attribution required: cite Cricsheet (<https://cricsheet.org>) for raw data.\n- For current season roster and live stats, use the [canonical CricketStudio page]({canon_url})."

    # Related section
    related_section = "\n\n## Related Concepts\n\n" + "\n".join(
        f"- [{team_names_map.get(ts, ts)}]({team_link_map.get(ts, '#')})"
        for ts in team_slugs
        if ts in team_link_map
    )
    related_section += "\n- [Major League Cricket](../../leagues/major-league-cricket.md)"
    related_section += "\n- [MLC Leaderboards](../leaderboards/)"

    content = (
        frontmatter
        + "\n\n"
        + summary
        + "\n\n"
        + batting_table
        + phase_bat
        + bowling_section
        + season_section
        + agent_section
        + identity_section
        + related_section
        + "\n"
    )

    return content


def main():
    players = json.load(open(SNAPSHOT_DIR / "mlc-players.json"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    written = 0
    for slug, player in players.items():
        player["slug"] = slug
        content = generate_player_file(slug, player)
        out_path = OUT_DIR / f"{slug}.md"
        out_path.write_text(content, encoding="utf-8")
        written += 1

    print(f"Generated {written} MLC player files → {OUT_DIR}/")


if __name__ == "__main__":
    main()
