"""
Generate enriched MLC venue OKF files.

Input:  cricketstudio-mcp/data/snapshot/mlc-matches.json
Output: okf/scorebook/mlc/venues/{slug}.md (overwrites existing thin files)

Run from repo root:
    python scripts/generate_mlc_venues.py
"""

import json
from collections import defaultdict
from pathlib import Path

SNAPSHOT_DIR = Path("C:/Git/cricketstudio-mcp/data/snapshot")
OUT_DIR = Path("okf/scorebook/mlc/venues")
LAST_VERIFIED = "2026-06-21"
DATASET_VERSION = "2026-06-20"

TEAM_NAMES = {
    "los-angeles-knight-riders": "Los Angeles Knight Riders",
    "mi-new-york": "MI New York",
    "san-francisco-unicorns": "San Francisco Unicorns",
    "seattle-orcas": "Seattle Orcas",
    "texas-super-kings": "Texas Super Kings",
    "washington-freedom": "Washington Freedom",
}

# Additional venue metadata not in match data
VENUE_META = {
    "grand-prairie-stadium": {
        "aliases": ["Grand Prairie Cricket Stadium", "GP Stadium"],
        "city": "Grand Prairie, Texas, USA",
        "notes": "Primary MLC venue across all three seasons. Hosted all 2023 matches.",
    },
    "church-street-park": {
        "aliases": ["Church Street Park", "Church Street Park Morrisville"],
        "city": "Morrisville, North Carolina, USA",
        "notes": "Home of Triangle Cricket and key MLC venue since season 1.",
    },
    "central-broward-regional-park": {
        "aliases": ["Central Broward Park", "CB Stadium"],
        "city": "Lauderhill, Florida, USA",
        "notes": "Long-established cricket venue in South Florida, used from MLC 2024.",
    },
    "knight-riders-cricket-field-fairplex": {
        "aliases": ["Fairplex Cricket Field", "KR Cricket Field"],
        "city": "Pomona, California, USA",
        "notes": "Home ground for Los Angeles Knight Riders, added in 2026 season.",
    },
    "oakland-coliseum": {
        "aliases": ["RingCentral Coliseum"],
        "city": "Oakland, California, USA",
        "notes": "Iconic multi-sport venue repurposed for MLC 2025.",
    },
}


def pct(num, denom):
    if denom == 0:
        return None
    return round(100.0 * num / denom, 1)


def avg_score(scores):
    if not scores:
        return None
    return round(sum(scores) / len(scores), 1)


def build_venue_stats(matches_at_venue):
    """Compute venue statistics from list of match dicts."""
    total = len(matches_at_venue)
    no_results = 0
    first_inns_scores = []
    second_inns_scores = []
    toss_bat = 0
    toss_field = 0
    chase_wins = 0
    decided_matches = 0
    seasons_seen = set()
    team_counts = defaultdict(int)
    team_wins = defaultdict(int)

    for m in matches_at_venue:
        seasons_seen.add(m["season"])
        result = m.get("result", {})
        outcome = result.get("outcome")
        winner_slug = result.get("winnerSlug")
        toss = m.get("toss", {})
        innings = m.get("innings", [])

        # Toss decision
        toss_decision = toss.get("decision")
        if toss_decision == "bat":
            toss_bat += 1
        elif toss_decision == "field":
            toss_field += 1

        # No result
        if outcome == "no-result" or not winner_slug:
            no_results += 1
            continue

        decided_matches += 1

        # Innings scores
        for inn in innings:
            batting_team = inn.get("battingTeamSlug", "")
            runs = inn.get("totalRuns")
            inn_num = inn.get("inningsNumber")
            if runs is not None:
                team_counts[batting_team] += 1
                if inn_num == 1:
                    first_inns_scores.append(runs)
                elif inn_num == 2:
                    second_inns_scores.append(runs)

        # Chase: did second batting team win?
        if len(innings) >= 2:
            second_batting = innings[1].get("battingTeamSlug", "")
            if winner_slug == second_batting:
                chase_wins += 1

        if winner_slug:
            team_wins[winner_slug] += 1

    # Most frequent teams by appearance
    top_teams = sorted(team_counts.items(), key=lambda x: -x[1])[:3]

    return {
        "total": total,
        "no_results": no_results,
        "decided": decided_matches,
        "seasons": sorted(seasons_seen),
        "first_inns_avg": avg_score(first_inns_scores),
        "first_inns_high": max(first_inns_scores) if first_inns_scores else None,
        "first_inns_low": min(first_inns_scores) if first_inns_scores else None,
        "second_inns_avg": avg_score(second_inns_scores),
        "second_inns_high": max(second_inns_scores) if second_inns_scores else None,
        "second_inns_low": min(second_inns_scores) if second_inns_scores else None,
        "toss_bat": toss_bat,
        "toss_field": toss_field,
        "chase_wins": chase_wins,
        "chase_pct": pct(chase_wins, decided_matches),
        "top_teams": top_teams,
        "team_wins": team_wins,
    }


def toss_tendency_label(bat, field):
    total = bat + field
    if total == 0:
        return "insufficient data"
    if bat > field:
        return f"bat first ({bat}/{total} times = {pct(bat, total)}%)"
    elif field > bat:
        return f"field first ({field}/{total} times = {pct(field, total)}%)"
    else:
        return f"evenly split ({bat} bat / {field} field)"


def generate_venue_file(venue_slug, venue_name, city, stats, meta):
    canon_url = f"https://players.cricketstudio.ai/venues/{venue_slug}"
    seasons_str = ", ".join(stats["seasons"])
    aliases = meta.get("aliases", [])
    notes = meta.get("notes", "")

    aliases_yaml = "\n".join(f"  - {a}" for a in aliases)
    aliases_block = f"aliases:\n{aliases_yaml}" if aliases else ""

    frontmatter = f"""---
type: venue
title: {venue_name}
description: CricketStudio OKF entry for {venue_name} — MLC host venue (seasons {seasons_str}). {stats['total']} matches hosted.
resource: {canon_url}
status: active
last_verified: {LAST_VERIFIED}
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:venue:{venue_slug}
canonical_page: {canon_url}
dataset_version: "{DATASET_VERSION}"
{aliases_block}
tags:
  - cricket
  - venue
  - MLC
  - T20
provenance:
  source: Cricsheet CC BY 3.0 via CricketStudio derived claim layer
  confidence: high
  computed_at: "{DATASET_VERSION}"
  notes: Match-level stats computed from Cricsheet open data. Attribution required per CC BY 3.0.
---"""

    # Innings analysis
    fi_avg = f"{stats['first_inns_avg']:.1f}" if stats["first_inns_avg"] else "—"
    fi_high = str(stats["first_inns_high"]) if stats["first_inns_high"] else "—"
    fi_low = str(stats["first_inns_low"]) if stats["first_inns_low"] else "—"
    si_avg = f"{stats['second_inns_avg']:.1f}" if stats["second_inns_avg"] else "—"
    si_high = str(stats["second_inns_high"]) if stats["second_inns_high"] else "—"
    si_low = str(stats["second_inns_low"]) if stats["second_inns_low"] else "—"

    chase_pct = f"{stats['chase_pct']:.1f}%" if stats["chase_pct"] is not None else "—"
    toss_label = toss_tendency_label(stats["toss_bat"], stats["toss_field"])

    # Top teams
    team_lines = []
    for ts, count in stats["top_teams"]:
        wins = stats["team_wins"].get(ts, 0)
        name = TEAM_NAMES.get(ts, ts.replace("-", " ").title())
        team_lines.append(f"  - {name}: {count} innings ({wins} wins at this venue)")

    top_teams_block = "\n".join(team_lines) if team_lines else "  - Data not available"

    body = f"""# {venue_name}

## Summary

{venue_name} is located in {city}. It hosted **{stats['total']} MLC matches** across seasons {seasons_str}. {notes}

## Canonical Resource

[players.cricketstudio.ai/venues/{venue_slug}]({canon_url})

## Venue Stats (MLC {seasons_str})

| Metric | Value |
|--------|-------|
| Total matches hosted | {stats['total']} |
| Seasons active | {seasons_str} |
| Decided matches | {stats['decided']} |
| No results | {stats['no_results']} |
| Chase success rate | {chase_pct} ({stats['chase_wins']} of {stats['decided']} decided matches) |
| Toss tendency | Winner chose to {toss_label} |

## Innings Scores

| Innings | Avg score | Highest | Lowest |
|---------|-----------|---------|--------|
| First innings | {fi_avg} | {fi_high} | {fi_low} |
| Second innings | {si_avg} | {si_high} | {si_low} |

*Based on {stats['decided']} decided matches at this venue (MLC {seasons_str}).*

## Most Active Teams at This Venue

{top_teams_block}

## What Agents Should Know

- Chase success rate of {chase_pct} (from {stats['decided']} decided matches) indicates whether this is a bat-first or chase-friendly ground.
- First-innings average of {fi_avg} gives a baseline for par scores when batting first at this venue.
- Toss tendency: teams winning the toss typically chose to {toss_label}.
- Scope is MLC seasons {seasons_str} only. For live or current season data, use the canonical CricketStudio page.
- Source: Cricsheet CC BY 3.0. Sample size is {stats['total']} matches — treat as indicative, not definitive.

## Data and Source Notes

- `source_boundary: public_open_data` — Cricsheet CC BY 3.0.
- Attribution: Cricsheet (<https://cricsheet.org>) required per CC BY 3.0.
- Snapshot: {DATASET_VERSION}. MLC Season 4 (2026) matches not yet included.

## Related Concepts

- [Major League Cricket](../../leagues/major-league-cricket.md)
- [MLC Seasons](../../seasons/)
- [MLC Teams](../../teams/)
"""

    return frontmatter + "\n\n" + body


def main():
    matches_data = json.load(open(SNAPSHOT_DIR / "mlc-matches.json"))
    matches = list(matches_data.values())

    # Group by venue slug
    venue_groups = defaultdict(list)
    venue_names = {}
    venue_cities = {}
    for m in matches:
        v = m.get("venue", {})
        slug = v.get("slug")
        if slug:
            venue_groups[slug].append(m)
            venue_names[slug] = v.get("name", slug.replace("-", " ").title())
            venue_cities[slug] = v.get("city", "USA")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0

    for slug, venue_matches in venue_groups.items():
        stats = build_venue_stats(venue_matches)
        name = venue_names[slug]
        city = venue_cities.get(slug, "USA")
        meta = VENUE_META.get(slug, {})
        city_full = meta.get("city", city + ", USA")

        content = generate_venue_file(slug, name, city_full, stats, meta)
        out_path = OUT_DIR / f"{slug}.md"
        out_path.write_text(content, encoding="utf-8")
        written += 1
        print(f"  {slug}: {stats['total']} matches")

    print(f"\nGenerated {written} MLC venue files → {OUT_DIR}/")


if __name__ == "__main__":
    main()
