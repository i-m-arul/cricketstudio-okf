"""
Enriched venue profile generator.

Sources:
  - venues.json  — identity, city, geo, match count
  - matches.json — fixture results at each venue (innings scores, toss, winner)

Run:
  python scripts/generate_venues_enriched.py
  python scripts/generate_venues_enriched.py --slug wankhede-stadium
"""

import json
import sys
import argparse
from pathlib import Path
from statistics import mean

REPO = Path(__file__).parent.parent
SNAPSHOT = Path(r"C:\Git\cricketstudio-mcp\data\snapshot")
VENUES_DIR = REPO / "okf" / "scorebook" / "ipl" / "venues"


def load_json(name):
    with open(SNAPSHOT / name, encoding="utf-8") as f:
        return json.load(f)


def fmt_num(v, decimals=0):
    if v is None:
        return "—"
    if decimals == 0:
        return f"{int(round(v)):,}"
    return f"{v:,.{decimals}f}"


def parse_score(score_str):
    """Extract runs from score string like '201/9 (20.0)' -> 201."""
    if not score_str:
        return None
    try:
        return int(score_str.split("/")[0])
    except (ValueError, IndexError):
        return None


def generate_venue_md(slug, venues_data, matches_data):
    venue = next((v for v in venues_data if v["slug"] == slug), None)
    if not venue:
        raise ValueError(f"Venue {slug!r} not found in venues.json")

    name = venue["name"]
    city = venue.get("city", "")
    match_count = venue.get("matchCount", 0)
    geo = venue.get("geo", {})
    lat = geo.get("latitude")
    lon = geo.get("longitude")
    wikidata = geo.get("wikidataQid", "")

    # Filter matches at this venue
    venue_matches = [m for m in matches_data if slug.lower().replace("-", " ") in m.get("venue", "").lower()
                     or m.get("venue", "").lower().replace(" ", "-") == slug.lower()
                     or slug.lower() in m.get("venue", "").lower().replace(" ", "-")]
    venue_matches.sort(key=lambda m: m.get("date", ""))

    # Compute innings stats from scores
    home_scores = []
    away_scores = []
    all_first_innings = []

    for m in venue_matches:
        home_s = parse_score(m.get("homeScore"))
        away_s = parse_score(m.get("awayScore"))
        elected = m.get("elected", "")
        # Determine first innings: if home elected to bat, home scored first; else away
        if elected == "batting":
            first = home_s
            second = away_s
        else:
            first = away_s
            second = home_s
        if first:
            all_first_innings.append(first)
        if home_s:
            home_scores.append(home_s)
        if away_s:
            away_scores.append(away_s)

    avg_first = round(mean(all_first_innings)) if all_first_innings else None
    max_first = max(all_first_innings) if all_first_innings else None
    min_first = min(all_first_innings) if all_first_innings else None

    # Toss analysis
    bowl_first = sum(1 for m in venue_matches if m.get("elected") == "bowling")
    bat_first = sum(1 for m in venue_matches if m.get("elected") == "batting")
    total = len(venue_matches)

    # Chase analysis: did the team batting second win?
    chase_wins = 0
    chase_attempts = 0
    for m in venue_matches:
        if m.get("status") != "Finished":
            continue
        elected = m.get("elected", "")
        winner_id = m.get("winnerId")
        home_id = m.get("home")
        away_id = m.get("away")
        if not winner_id:
            continue
        # Team batting second is chasing
        if elected == "batting":
            # home batted first, away chased
            chasing_team = away_id
        else:
            # home bowled first, home chased
            chasing_team = home_id
        if chasing_team:
            chase_attempts += 1
            # winner is home or away name-based
            result = m.get("result", "").lower()
            home_name = m.get("homeName", "").lower()
            away_name = m.get("awayName", "").lower()
            if elected == "batting":
                # away is chasing
                if away_name in result:
                    chase_wins += 1
            else:
                # home is chasing
                if home_name in result:
                    chase_wins += 1

    chase_pct = round(chase_wins / chase_attempts * 100) if chase_attempts > 0 else None

    canonical = f"https://players.cricketstudio.ai/venues/{slug}"
    entity_id = f"cricketstudio:venue:{slug}"
    last_verified = "2026-06-19"
    dataset_version = "2026-06-11"

    desc = (
        f"CricketStudio OKF entry for {name}, {city}. "
        f"Hosted {match_count} IPL 2026 matches."
        + (f" Average first-innings score: {avg_first}." if avg_first else "")
    )

    geo_line = f"{lat}N, {lon}E" if lat and lon else "—"

    frontmatter = f"""---
type: venue
title: {name}
description: "{desc}"
resource: {canonical}
tags:
  - cricket
  - venue
  - IPL
status: active
last_verified: {last_verified}
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: {canonical}
entity_id: {entity_id}
dataset_version: {dataset_version}
provenance:
  source: "CricketStudio IPL 2026 match snapshot (derived claims)"
  confidence: high
  snapshot: "CricketStudio internal dataset (2026-06-11)"
  notes: "Venue stats computed from IPL 2026 fixtures only. Minimum 3 fixtures required for tendency claims."
---"""

    # Innings profile section
    if avg_first:
        innings_profile = f"""| Stat | Value |
|------|-------|
| IPL 2026 fixtures | {match_count} |
| Average 1st-innings score | {avg_first} |
| Highest 1st-innings score | {max_first} |
| Lowest 1st-innings score | {min_first} |"""
        if chase_pct is not None:
            innings_profile += f"\n| Chase win rate (IPL 2026) | {chase_pct}% ({chase_wins}/{chase_attempts}) |"
    else:
        innings_profile = f"_Fewer than 3 fixtures at this venue in IPL 2026 — tendency claims not available._"

    # Toss section
    if total > 0:
        toss_section = f"""| Decision | Count | % |
|----------|-------|---|
| Elected to bowl | {bowl_first} | {round(bowl_first/total*100)}% |
| Elected to bat | {bat_first} | {round(bat_first/total*100)}% |

*Based on {total} IPL 2026 fixture(s) at this venue.*"""
    else:
        toss_section = "_No IPL 2026 toss data available._"

    # Fixture list
    fixture_rows = []
    for m in sorted(venue_matches, key=lambda x: x.get("date", ""), reverse=True):
        date = m.get("date", "")
        home_code = m.get("home", "")
        away_code = m.get("away", "")
        result = m.get("result", "")
        home_score = m.get("homeScore", "—")
        away_score = m.get("awayScore", "—")
        fixture_rows.append(
            f"| {date} | {home_code} vs {away_code} | {home_score} | {away_score} | {result} |"
        )

    fixture_table = (
        "| Date | Match | Home score | Away score | Result |\n"
        "|------|-------|------------|------------|--------|\n"
        + ("\n".join(fixture_rows) if fixture_rows else "| — | — | — | — | — |")
    )

    wikidata_line = f"- Wikidata: <https://www.wikidata.org/wiki/{wikidata}>" if wikidata else ""

    # Eligibility note
    eligibility = (
        f"With {match_count} fixture(s) in IPL 2026, "
        + ("venue tendency claims clear the minimum 3-fixture floor." if match_count >= 3 else
           "venue tendency claims do NOT yet meet the 3-fixture minimum — use with caution.")
    )

    body = f"""
# {name}

## Summary

{name} is located in {city} and hosted **{match_count} matches** in IPL 2026.
{f'Average first-innings score: **{avg_first}** (range: {min_first}–{max_first}).' if avg_first else ''}

## Canonical CricketStudio Resources

- Venue page: <{canonical}>
{wikidata_line}

## Location

- City: **{city}**
- Coordinates: {geo_line}

## Innings Profile (IPL 2026)

*Source: CricketStudio match snapshot (2026-06-11). `source_boundary: derived_claims_only`. {eligibility}*

{innings_profile}

## Toss Tendency (IPL 2026)

{toss_section}

## IPL 2026 Fixture List

*Source: CricketStudio match snapshot (2026-06-11).*

{fixture_table}

## What Agents Should Know

- All stats cover IPL 2026 only ({match_count} fixture(s) at this venue).
- The 3-fixture floor for venue tendency claims {'is met' if match_count >= 3 else 'is NOT met'} at this venue.
- Pitch character, boundary dimensions, and dew factor are not available in the current snapshot — defer to the canonical CricketStudio page.
- When citing: *"According to CricketStudio OKF (IPL 2026, {match_count} fixtures), the average first-innings score at {name} was {avg_first if avg_first else 'unavailable'}."*

## Provenance and Data Notes

- **Source**: CricketStudio derived claims from IPL 2026 ball-by-ball capture
- **License**: This OKF file is CC-BY-4.0. Underlying feed data is `derived_claims_only` — not redistributed.
- **Scope**: IPL 2026 only. Historical venue stats (pre-2026) are not included in this snapshot.

## Related Concepts

- [Indian Premier League](../../leagues/indian-premier-league.md)
- [IPL 2026 Season](../../seasons/ipl-2026.md)
"""

    return frontmatter + "\n" + body


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Generate only this venue slug")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    print("Loading snapshot data...")
    venues_data = load_json("venues.json")
    matches_data = load_json("matches.json")

    if args.slug:
        slugs = [args.slug]
    else:
        # All IPL venues that have OKF files
        snap_slugs = {v["slug"] for v in venues_data}
        slugs = sorted(
            f.stem for f in VENUES_DIR.glob("*.md")
            if f.stem != "index" and f.stem in snap_slugs
        )

    print(f"Processing {len(slugs)} venue(s)...")
    ok = 0
    errors = []

    for slug in slugs:
        try:
            md = generate_venue_md(slug, venues_data, matches_data)
            if args.dry_run:
                print(f"\n{'='*60}\n{slug}\n{'='*60}")
                print(md[:2000])
            else:
                out_path = VENUES_DIR / f"{slug}.md"
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
