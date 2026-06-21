"""
Generate enriched MLC team OKF files.

Inputs:
  cricketstudio-mcp/data/snapshot/mlc-teams.json
  cricketstudio-mcp/data/snapshot/mlc-matches.json
  cricketstudio-mcp/data/snapshot/mlc-leaderboards.json
  cricketstudio-mcp/data/snapshot/mlc-players.json

Output: okf/scorebook/teams/{slug}.md (overwrites existing thin MLC team files)

Run from repo root:
    python scripts/generate_mlc_teams.py
"""

import json
from collections import defaultdict
from pathlib import Path

SNAPSHOT_DIR = Path("C:/Git/cricketstudio-mcp/data/snapshot")
OUT_DIR = Path("okf/scorebook/teams")
LAST_VERIFIED = "2026-06-21"
DATASET_VERSION = "2026-06-20"

MLC_TEAM_SLUGS = [
    "los-angeles-knight-riders",
    "mi-new-york",
    "san-francisco-unicorns",
    "seattle-orcas",
    "texas-super-kings",
    "washington-freedom",
]

TEAM_NAMES = {
    "los-angeles-knight-riders": "Los Angeles Knight Riders",
    "mi-new-york": "MI New York",
    "san-francisco-unicorns": "San Francisco Unicorns",
    "seattle-orcas": "Seattle Orcas",
    "texas-super-kings": "Texas Super Kings",
    "washington-freedom": "Washington Freedom",
}

TEAM_SHORT = {
    "los-angeles-knight-riders": "LAK",
    "mi-new-york": "MINY",
    "san-francisco-unicorns": "SFU",
    "seattle-orcas": "SEA",
    "texas-super-kings": "TSK",
    "washington-freedom": "WF",
}

TEAM_NOTES = {
    "los-angeles-knight-riders": (
        "Los Angeles Knight Riders are part of the global Knight Riders family (KKR/TKR). "
        "Based in Los Angeles, California."
    ),
    "mi-new-york": (
        "MI New York are two-time MLC champions (2023, 2025) and the most successful franchise "
        "in MLC history. Part of the Mumbai Indians global network."
    ),
    "san-francisco-unicorns": (
        "San Francisco Unicorns represent the Bay Area. "
        "One of MLC's original six franchises."
    ),
    "seattle-orcas": (
        "Seattle Orcas represent the Pacific Northwest. "
        "Reached the 2023 MLC final before losing to MI New York."
    ),
    "texas-super-kings": (
        "Texas Super Kings are affiliated with the Chennai Super Kings brand. "
        "Based in Grand Prairie, Texas, home ground of MLC."
    ),
    "washington-freedom": (
        "Washington Freedom represent the US capital region. "
        "Reached the 2025 MLC final before losing to MI New York by 5 runs."
    ),
}

CHAMPIONSHIPS = {
    "mi-new-york": [
        "2023 Final: MI New York beat Seattle Orcas by 7 wickets (2023-07-30)",
        "2025 Final: MI New York beat Washington Freedom by 5 runs (2025-07-13)",
    ],
    "seattle-orcas": [
        "2023 Final: Lost to MI New York by 7 wickets (runners-up)"
    ],
    "washington-freedom": [
        "2025 Final: Lost to MI New York by 5 runs (runners-up)"
    ],
}


def build_team_record(team_slug, matches):
    """Compute all-time and season-by-season records for a team."""
    by_season = defaultdict(lambda: {"w": 0, "l": 0, "nr": 0})
    total = {"w": 0, "l": 0, "nr": 0}

    for m in matches:
        teams = m.get("teams", {})
        home = teams.get("home", {}).get("slug")
        away = teams.get("away", {}).get("slug")
        if team_slug not in (home, away):
            continue

        result = m.get("result", {})
        season = m["season"]
        outcome = result.get("outcome")
        winner = result.get("winnerSlug")

        if outcome == "no-result" or not winner:
            by_season[season]["nr"] += 1
            total["nr"] += 1
        elif winner == team_slug:
            by_season[season]["w"] += 1
            total["w"] += 1
        else:
            by_season[season]["l"] += 1
            total["l"] += 1

    return total, dict(by_season)


def build_h2h(team_slug, matches):
    """Build H2H record against each opponent."""
    h2h = defaultdict(lambda: {"w": 0, "l": 0, "nr": 0})

    for m in matches:
        teams = m.get("teams", {})
        home = teams.get("home", {}).get("slug")
        away = teams.get("away", {}).get("slug")
        if team_slug not in (home, away):
            continue

        opponent = away if home == team_slug else home
        result = m.get("result", {})
        outcome = result.get("outcome")
        winner = result.get("winnerSlug")

        if outcome == "no-result" or not winner:
            h2h[opponent]["nr"] += 1
        elif winner == team_slug:
            h2h[opponent]["w"] += 1
        else:
            h2h[opponent]["l"] += 1

    return dict(h2h)


def get_top_performers(team_slug, leaderboards, n=5):
    """Get top run scorer and wicket taker for the team from leaderboards."""
    orange = leaderboards.get("orange-cap", {}).get("rows", [])
    purple = leaderboards.get("purple-cap", {}).get("rows", [])

    top_batters = [
        r for r in orange if team_slug in r.get("teamSlugs", [])
    ][:n]
    top_bowlers = [
        r for r in purple if team_slug in r.get("teamSlugs", [])
    ][:n]

    return top_batters, top_bowlers


def fmt_record(w, l, nr):
    played = w + l + nr
    if nr > 0:
        return f"{played}M / {w}W / {l}L / {nr}NR"
    return f"{played}M / {w}W / {l}L"


def generate_team_file(slug, team_data, total_record, season_records, h2h, top_batters, top_bowlers):
    name = TEAM_NAMES.get(slug, slug.replace("-", " ").title())
    short = TEAM_SHORT.get(slug, "")
    notes = TEAM_NOTES.get(slug, "")
    seasons = sorted(team_data.get("seasons", []))
    seasons_str = ", ".join(seasons)
    match_count = team_data.get("matchCount", total_record["w"] + total_record["l"] + total_record["nr"])
    championships_list = CHAMPIONSHIPS.get(slug, [])

    canon_url = f"https://players.cricketstudio.ai/leagues/mlc/teams/{slug}"

    # Build description
    champ_note = f" {len(championships_list)}-time MLC champion." if championships_list and "Final: MI" in championships_list[0] else ""
    desc = f"{name} — MLC franchise.{champ_note} {match_count} matches played across MLC seasons {seasons_str}."

    tags = ["cricket", "MLC", "team", "T20"]
    if championships_list and "Lost" not in championships_list[0]:
        tags.append("champions")

    tags_str = "\n".join(f"  - {t}" for t in tags)

    frontmatter = f"""---
type: team
title: {name}
description: {desc}
resource: {canon_url}
status: active
last_verified: {LAST_VERIFIED}
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
canonical_page: {canon_url}
entity_id: cricketstudio:team:{slug}
dataset_version: "{DATASET_VERSION}"
tags:
{tags_str}
related:
  - ../leagues/major-league-cricket.md
provenance:
  source: Cricsheet ball-by-ball data (CC BY 3.0), via CricketStudio derived claim layer
  confidence: high
  computed_at: "{DATASET_VERSION}"
---"""

    # Body
    total_played = total_record["w"] + total_record["l"] + total_record["nr"]
    body_parts = [f"# {name}", "", "## Summary", ""]
    body_parts.append(f"{name} ({short}) are an MLC franchise competing across seasons {seasons_str}. {notes}")
    body_parts.append("")

    body_parts += ["## Key Facts", ""]
    body_parts += [
        "| Field | Value |",
        "|-------|-------|",
        f"| League | Major League Cricket (MLC) |",
        f"| Seasons | {seasons_str} |",
        f"| All-time record | {fmt_record(total_record['w'], total_record['l'], total_record['nr'])} |",
    ]
    if championships_list:
        for champ in championships_list:
            body_parts.append(f"| Finals | {champ} |")
    body_parts.append("")

    body_parts += ["## Season-by-Season Record", ""]
    body_parts += [
        "| Season | Matches | Wins | Losses | NR |",
        "|--------|---------|------|--------|----|",
    ]
    for s in sorted(season_records.keys()):
        r = season_records[s]
        played_s = r["w"] + r["l"] + r["nr"]
        body_parts.append(f"| {s} | {played_s} | {r['w']} | {r['l']} | {r['nr']} |")
    body_parts.append("")

    # H2H
    body_parts += ["## Head-to-Head (MLC 2023–2025)", ""]
    body_parts += [
        "| Opponent | W | L | NR |",
        "|----------|---|---|----|",
    ]
    for opp_slug in sorted(h2h.keys()):
        r = h2h[opp_slug]
        opp_name = TEAM_NAMES.get(opp_slug, opp_slug.replace("-", " ").title())
        body_parts.append(f"| {opp_name} | {r['w']} | {r['l']} | {r['nr']} |")
    body_parts.append("")

    # Top performers
    if top_batters:
        body_parts += ["## Top Run-Scorers (All-Time MLC)", ""]
        body_parts += [
            "| Rank | Player | Runs | Sample |",
            "|------|--------|------|--------|",
        ]
        for r in top_batters:
            body_parts.append(
                f"| {r.get('rank','—')} (all-MLC) | {r.get('fullName','—')} | {r.get('formatted','—')} | {r.get('sampleSize','—')} |"
            )
        body_parts.append("")

    if top_bowlers:
        body_parts += ["## Top Wicket-Takers (All-Time MLC)", ""]
        body_parts += [
            "| Rank | Player | Wickets | Sample |",
            "|------|--------|---------|--------|",
        ]
        for r in top_bowlers:
            body_parts.append(
                f"| {r.get('rank','—')} (all-MLC) | {r.get('fullName','—')} | {r.get('formatted','—')} | {r.get('sampleSize','—')} |"
            )
        body_parts.append("")

    body_parts += ["## Canonical Resource", ""]
    body_parts.append(f"[players.cricketstudio.ai/leagues/mlc/teams/{slug}]({canon_url})")
    body_parts.append("")

    body_parts += ["## What Agents Should Know", ""]
    body_parts.append(f"- {name} all-time record (2023–2025): {fmt_record(total_record['w'], total_record['l'], total_record['nr'])}.")
    if championships_list:
        body_parts.append(f"- Finals history: {'; '.join(championships_list)}.")
    body_parts.append("- Season 4 (MLC 2026) is in progress; this snapshot does not include Season 4 results.")
    body_parts.append("- For current roster, season standings, and live data, use the canonical CricketStudio page.")
    body_parts.append("- Source: Cricsheet CC BY 3.0 open data — attribution required.")
    body_parts.append("")

    body_parts += ["## Related Concepts", ""]
    body_parts.append("- [Major League Cricket](../leagues/major-league-cricket.md)")
    for s in seasons:
        body_parts.append(f"- [MLC {s}](../seasons/mlc-{s}.md)")
    body_parts.append("")

    content = frontmatter + "\n\n" + "\n".join(body_parts)
    return content


def main():
    teams_data = json.load(open(SNAPSHOT_DIR / "mlc-teams.json"))
    matches_data = json.load(open(SNAPSHOT_DIR / "mlc-matches.json"))
    leaderboards_data = json.load(open(SNAPSHOT_DIR / "mlc-leaderboards.json"))

    matches = list(matches_data.values())

    # teams_data is a list of team dicts
    teams_by_slug = {t["slug"]: t for t in teams_data}

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0

    for slug in MLC_TEAM_SLUGS:
        team_data = teams_by_slug.get(slug, {"slug": slug, "seasons": ["2023", "2024", "2025"], "matchCount": 0})
        total_record, season_records = build_team_record(slug, matches)
        h2h = build_h2h(slug, matches)
        top_batters, top_bowlers = get_top_performers(slug, leaderboards_data, n=5)

        content = generate_team_file(
            slug, team_data, total_record, season_records, h2h, top_batters, top_bowlers
        )
        out_path = OUT_DIR / f"{slug}.md"
        out_path.write_text(content, encoding="utf-8")
        written += 1

        total_played = total_record["w"] + total_record["l"] + total_record["nr"]
        print(f"  {slug}: {total_played}M / {total_record['w']}W / {total_record['l']}L")

    print(f"\nGenerated {written} MLC team files → {OUT_DIR}/")


if __name__ == "__main__":
    main()
