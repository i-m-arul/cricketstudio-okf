"""
Enriched team profile generator.

Sources:
  - teams.json        — identity, slug, wikidataQid
  - standings.json    — IPL 2026 season record
  - players.json      — squad roster, roles
  - season-stats.json — top scorers and wicket-takers
  - team-h2h.json     — head-to-head vs each opponent
  - ipl-historical.json — historical season record

Run:
  python scripts/generate_teams_enriched.py
  python scripts/generate_teams_enriched.py --slug mi
"""

import json
import os
import sys
import argparse
from pathlib import Path

REPO = Path(__file__).parent.parent
SNAPSHOT = Path(r"C:\Git\cricketstudio-mcp\data\snapshot")
TEAMS_DIR = REPO / "okf" / "scorebook" / "teams"

# OKF file slug -> snapshot slug (short code-based slug)
OKF_TO_SNAPSHOT_SLUG = {
    "chennai-super-kings":       "csk",
    "delhi-capitals":            "dc",
    "gujarat-titans":            "gt",
    "kolkata-knight-riders":     "kkr",
    "lucknow-super-giants":      "lsg",
    "mumbai-indians":            "mi",
    "punjab-kings":              "pbks",
    "rajasthan-royals":          "rr",
    "royal-challengers-bengaluru": "rcb",
    "sunrisers-hyderabad":       "srh",
}


def load_json(name):
    with open(SNAPSHOT / name, encoding="utf-8") as f:
        return json.load(f)


def fmt_num(v, decimals=0):
    if v is None:
        return "—"
    if decimals == 0:
        return f"{int(round(v)):,}"
    return f"{v:,.{decimals}f}"


def role_label(role):
    return {
        "batter": "Batter",
        "bowler": "Bowler",
        "all-rounder": "All-rounder",
        "wicket-keeper": "WK",
        "wk-batter": "WK-Batter",
    }.get(role, role.title() if role else "—")


def hand_label(h):
    return "RHB" if h == "right" else ("LHB" if h == "left" else "—")


def generate_team_md(okf_slug, teams_data, standings_data, players_data,
                     season_stats, team_h2h, hist_data):

    snap_slug = OKF_TO_SNAPSHOT_SLUG.get(okf_slug, okf_slug)
    team = next((t for t in teams_data if t["slug"] == snap_slug), None)
    if not team:
        raise ValueError(f"Team {snap_slug!r} not found in teams.json (from OKF slug {okf_slug!r})")
    slug = okf_slug  # use full-name slug for file paths and entity_id

    code = team["code"]
    name = team["name"]
    wikidata = team.get("wikidataQid", "")

    # Standings
    standing = next((s for s in standings_data if s["teamCode"] == code), None)

    # Squad: all players on this team in IPL 2026
    squad = sorted(
        [p for p in players_data.values() if p.get("team") == name],
        key=lambda p: p.get("fullName", "")
    )

    # Top scorers: batters sorted by runs (min 3 matches)
    batter_stats = []
    for p in squad:
        s = season_stats.get(p["slug"]) if "slug" in p else None
        if s and s["batting"].get("runs", 0) > 0 and s["batting"].get("matches", 0) >= 3:
            batter_stats.append((p["fullName"], s["batting"]))
    batter_stats.sort(key=lambda x: x[1].get("runs", 0), reverse=True)

    # Top wicket-takers (min 3 matches)
    bowler_stats = []
    for p in squad:
        s = season_stats.get(p["slug"]) if "slug" in p else None
        if s and s["bowling"].get("wickets", 0) > 0 and s["bowling"].get("matches", 0) >= 3:
            bowler_stats.append((p["fullName"], s["bowling"]))
    bowler_stats.sort(key=lambda x: x[1].get("wickets", 0), reverse=True)

    # H2H records involving this team
    team_h2h_recs = {
        k: v for k, v in team_h2h.items()
        if v.get("a", {}).get("slug") == slug or v.get("b", {}).get("slug") == slug
    }

    # Historical record
    hist_by_season = {}
    for season_key, season_data in hist_data.get("bySeason", {}).items():
        team_data = season_data.get("byTeam", {}).get(code.lower()) or season_data.get("byTeam", {}).get(slug)
        if team_data:
            hist_by_season[season_key] = team_data

    # Build historical summary from ipl-historical bySeason by checking each season
    # The historical data has a bySeason with team-level records
    canonical = f"https://players.cricketstudio.ai/teams/{snap_slug}"
    entity_id = f"cricketstudio:team:{snap_slug}"
    last_verified = "2026-06-19"
    dataset_version = "2026-06-11"

    # Standing summary
    if standing:
        pos = next((i+1 for i,s in enumerate(standings_data) if s["teamCode"] == code), "—")
        season_summary = (
            f"IPL 2026: **#{pos} of 10** — "
            f"{standing['won']}W/{standing['lost']}L, "
            f"{standing['points']} pts, NRR {standing['nrr']:+.3f}"
        )
        did_qualify = standing.get("points", 0) >= 16
    else:
        season_summary = "IPL 2026 standing not available."
        did_qualify = False

    desc = f"CricketStudio OKF entry for {name} ({code}). {season_summary}."

    frontmatter = f"""---
type: team
title: {name}
description: "{desc}"
resource: {canonical}
tags:
  - cricket
  - team
  - IPL
  - {code}
status: active
last_verified: {last_verified}
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: {canonical}
entity_id: {entity_id}
dataset_version: {dataset_version}
aliases:
  - {code}
related:
  - ../leagues/indian-premier-league.md
  - ../seasons/ipl-2026.md
provenance:
  source: "CricketStudio IPL 2026 snapshot (derived claims) + Cricsheet CC BY 3.0 (historical)"
  confidence: high
  snapshot: "CricketStudio internal dataset (2026-06-11)"
  notes: "source_boundary: derived_claims_only — raw licensed feed not redistributed. See canonical page for current standings."
---"""

    # Season record table
    if standing:
        season_table = f"""| Stat | Value |
|------|-------|
| Position | #{pos} of 10 |
| Played | {standing['played']} |
| Won | {standing['won']} |
| Lost | {standing['lost']} |
| Points | {standing['points']} |
| NRR | {standing['nrr']:+.3f} |
| Runs scored | {fmt_num(standing.get('runsFor', 0))} |
| Runs conceded | {fmt_num(standing.get('runsAgainst', 0))} |"""
    else:
        season_table = "_Season record not available._"

    # Squad roster table
    # Only link to players that have OKF files
    okf_player_slugs = {f.stem for f in (REPO / "okf" / "scorebook" / "players").glob("*.md") if f.stem != "index"}

    squad_rows = []
    for p in squad:
        role = role_label(p.get("role", ""))
        hand = hand_label(p.get("battingHandedness", ""))
        bowl = p.get("bowlingStyle", "—")
        player_slug = p.get("slug", "")
        if player_slug and player_slug in okf_player_slugs:
            display = f"[{p['fullName']}](../players/{player_slug}.md)"
        else:
            display = p["fullName"]
        squad_rows.append(f"| {display} | {role} | {hand} | {bowl} |")

    squad_table = "| Player | Role | Bat | Bowling style |\n|--------|------|-----|---------------|\n"
    squad_table += "\n".join(squad_rows) if squad_rows else "| — | — | — | — |"

    # Top scorers table
    scorer_rows = []
    for name_s, b in batter_stats[:8]:
        scorer_rows.append(
            f"| {name_s} | {b.get('matches',0)} | {fmt_num(b.get('runs',0))} "
            f"| {fmt_num(b.get('avg'),1)} | {fmt_num(b.get('sr'),1)} | "
            f"{b.get('fifties',0)} | {b.get('hundreds',0)} |"
        )
    scorer_table = (
        "| Player | M | Runs | Avg | SR | 50s | 100s |\n"
        "|--------|---|------|-----|-----|-----|------|\n"
        + ("\n".join(scorer_rows) if scorer_rows else "| — | — | — | — | — | — | — |")
    )

    # Top wicket-takers table
    bowler_rows = []
    for name_b, bw in bowler_stats[:8]:
        bowler_rows.append(
            f"| {name_b} | {bw.get('matches',0)} | {fmt_num(bw.get('wickets',0))} "
            f"| {fmt_num(bw.get('econ'),2)} | {fmt_num(bw.get('avg'),1)} |"
        )
    bowler_table = (
        "| Player | M | Wkts | Econ | Avg |\n"
        "|--------|---|------|------|-----|\n"
        + ("\n".join(bowler_rows) if bowler_rows else "| — | — | — | — | — |")
    )

    # H2H table
    h2h_rows = []
    for _, rec in sorted(team_h2h_recs.items()):
        a = rec.get("a", {})
        b_team = rec.get("b", {})
        if a.get("slug") == slug:
            opp = b_team.get("name", b_team.get("code", "?"))
            wins = rec.get("aWon", 0)
            losses = rec.get("bWon", 0)
        else:
            opp = a.get("name", a.get("code", "?"))
            wins = rec.get("bWon", 0)
            losses = rec.get("aWon", 0)
        total = rec.get("matches", 0)
        h2h_rows.append(f"| {opp} | {total} | {wins} | {losses} | {total - wins - losses} |")

    h2h_table = (
        "| Opponent | Played | Won | Lost | No result |\n"
        "|----------|--------|-----|------|----------|\n"
        + ("\n".join(h2h_rows) if h2h_rows else "_No H2H records available._")
    )

    # Wikidata link
    wd_link = f"- Wikidata: <https://www.wikidata.org/wiki/{wikidata}>" if wikidata else ""

    body = f"""
# {name}

## Summary

{name} ({code}) is an IPL franchise competing in IPL 2026. {season_summary}.

## Canonical CricketStudio Resources

- Team page: <{canonical}>
{wd_link}

## IPL 2026 Season Record

*Source: CricketStudio standings snapshot (2026-06-11). `source_boundary: derived_claims_only`.*

{season_table}

## Squad — IPL 2026

*Source: CricketStudio IPL 2026 player roster, dataset 2026-06-11. {len(squad)} players listed.*

{squad_table}

## Top Run-scorers — IPL 2026

*Minimum 3 matches. Source: CricketStudio season-stats snapshot (2026-06-11).*

{scorer_table}

## Top Wicket-takers — IPL 2026

*Minimum 3 matches. Source: CricketStudio season-stats snapshot (2026-06-11).*

{bowler_table}

## Head-to-Head — IPL 2026

*Source: CricketStudio team-h2h snapshot (2026-06-11). IPL 2026 season only.*

{h2h_table}

## What Agents Should Know

- Season standings and NRR are from the 2026-06-11 snapshot; cite the canonical page for current standings.
- Squad roster reflects IPL 2026 — player availability may change due to injuries or squad changes.
- `source_boundary: derived_claims_only` — all stats are derived from a licensed data feed; raw data is not redistributed.
- When citing: *"According to CricketStudio OKF (IPL 2026 snapshot, 2026-06-11), {name} finished #{pos if standing else 'position unavailable'} in the IPL 2026 table."*

## Provenance and Data Notes

- **Standings / stats**: CricketStudio derived claims from IPL 2026 ball-by-ball capture
- **Historical**: Cricsheet CC BY 3.0 (historical seasons via ipl-historical dataset)
- **License**: This OKF file is CC-BY-4.0. Underlying licensed feed data is not redistributed.
- **Live data**: See the [canonical team page]({canonical}) for current-season standings.

## Related Concepts

- [Indian Premier League](../leagues/indian-premier-league.md)
- [IPL 2026 Season](../seasons/ipl-2026.md)
"""

    return frontmatter + "\n" + body


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Generate only this team slug")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    print("Loading snapshot data...")
    teams_data = load_json("teams.json")
    standings_data = load_json("standings.json")
    players_raw = load_json("players.json")
    # Add slug to each player record for easy lookup
    for slug, p in players_raw.items():
        p["slug"] = slug
    season_stats_raw = load_json("season-stats.json")
    season_stats = season_stats_raw.get("bySlug", {})
    team_h2h = load_json("team-h2h.json")
    hist_raw = load_json("ipl-historical.json")

    if args.slug:
        slugs = [args.slug]
    else:
        # Generate for all known IPL teams (creating files if missing)
        slugs = sorted(OKF_TO_SNAPSHOT_SLUG.keys())

    print(f"Processing {len(slugs)} team(s)...")
    ok = 0
    errors = []

    for slug in slugs:
        try:
            md = generate_team_md(slug, teams_data, standings_data, players_raw,
                                  season_stats, team_h2h, hist_raw)
            if args.dry_run:
                print(f"\n{'='*60}\n{slug}\n{'='*60}")
                print(md[:2000])
            else:
                out_path = TEAMS_DIR / f"{slug}.md"
                out_path.write_text(md, encoding="utf-8")
                print(f"  OK {slug}")
            ok += 1
        except Exception as e:
            errors.append((slug, str(e)))
            print(f"  ERR {slug}: {e}")

    print(f"\nDone: {ok} generated, {len(errors)} errors.")
    if errors:
        for slug, err in errors:
            print(f"  ERROR {slug}: {err}")
        sys.exit(1)


if __name__ == "__main__":
    main()
