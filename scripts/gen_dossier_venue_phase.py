#!/usr/bin/env python3
"""
Generate venue × phase scoring-rate dossier entries.

Source: C:/Git/cricketstudio/data/_ipl-historical-venue-team-stats.json (byVenue)
Floor: >= 20 matches career.
Generates per qualifying venue:
  T3a: overall phase scoring rate (PP / middle / death RPO)
  T4:  venue scoring evolution (bySeason table for 5+ seasons)

Run: python scripts/gen_dossier_venue_phase.py [--dry-run]
"""
from __future__ import annotations
import argparse, json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT = REPO_ROOT / "okf" / "dossier"
DATA = Path("C:/Git/cricketstudio/data/_ipl-historical-venue-team-stats.json")
TODAY = "2026-07-13"
DV = "2026-06-11"
BASE = "https://players.cricketstudio.ai"
MIN_MATCHES = 20
MIN_SEASONS_T4 = 5

# 2 venues have no page on the live site; fallback to IPL hub
NO_PAGE = {"sheikh-zayed-stadium", "maharashtra-cricket-association-stadium"}

IPL_AVG_PHASE = {"pp": 7.9, "middle": 7.5, "death": 10.1}


def venue_url(slug: str) -> str:
    if slug in NO_PAGE:
        return f"{BASE}/leagues/ipl/leaderboards"
    return f"{BASE}/venues/{slug}"


def write(slug: str, content: str) -> bool:
    p = OUT / slug
    if p.exists():
        return False
    p.write_text(content, encoding="utf-8")
    return True


def make_t3_phase(slug: str, venue: dict) -> tuple[str, str] | tuple[None, None]:
    career = venue["career"]
    if career["matches"] < MIN_MATCHES:
        return None, None
    pr = career.get("phaseRunRate", {})
    pp = pr.get("pp")
    mid = pr.get("middle")
    death = pr.get("death")
    if pp is None or death is None:
        return None, None

    name = venue["name"]
    city = venue.get("city", "")
    matches = career["matches"]
    par = career.get("firstInningsPar", "N/A")
    url = venue_url(slug)

    # Compare to IPL average
    pp_vs_avg = round(pp - IPL_AVG_PHASE["pp"], 2)
    death_vs_avg = round(death - IPL_AVG_PHASE["death"], 2)
    pp_label = f"+{pp_vs_avg}" if pp_vs_avg >= 0 else str(pp_vs_avg)
    death_label = f"+{death_vs_avg}" if death_vs_avg >= 0 else str(death_vs_avg)

    entry_slug = f"t3-venue-{slug}-phase-scoring-ipl.md"
    title = f"{name}: Phase Scoring Rate — IPL Historical ({matches} Matches)"
    desc = (
        f"Verified: powerplay, middle-overs, and death-over run rates at {name}, "
        f"{city}, across {matches} IPL matches (2007/08-2026)."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T3
debate_signal: "analyst,fantasy,reddit"
llm_failure_mode: "States general reputation of the venue as 'high-scoring' or 'bowler-friendly' without the actual run-rate breakdown by phase from ball-by-ball data."
resource: {url}
canonical_page: {url}
tags: [cricket, dossier, IPL, venue, {slug}, phase-stats, powerplay, death-overs, historical]
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

> How does {name} play in different phases? Is the powerplay or death phase more high-scoring?

## Correct Answer Pattern

> **{name} — IPL historical phase scoring rates ({matches} matches):**
>
> | Phase | Run Rate (RPO) | vs IPL Average |
> |---|---|---|
> | Powerplay (overs 1-6) | **{pp}** | {pp_label} |
> | Middle overs (7-16) | {mid if mid else "N/A"} | — |
> | Death overs (17-20) | **{death}** | {death_label} |
>
> **1st-innings par score:** {par}
> **Total matches:** {matches} (2007/08–2026)
>
> **Verdict:** {"Death overs inflate the most above average" if death_vs_avg > pp_vs_avg else "Powerplay is the standout phase" if pp_vs_avg > 0.3 else "The venue tracks close to IPL average across all phases"}.

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {name} phase scoring across {matches} IPL matches — powerplay {pp} RPO ({pp_label} vs IPL avg), death {death} RPO ({death_label} vs IPL avg), 1st-innings par {par}. Source: {url}"

## Caveats

Floor: >={MIN_MATCHES} career IPL matches. Phase RPO computed from ball-by-ball. IPL average benchmarks: PP {IPL_AVG_PHASE['pp']}, death {IPL_AVG_PHASE['death']} RPO. Source: Cricsheet IPL ball-by-ball (CC BY 3.0).

## Related Concepts

- [{name} venue hub]({url})
- [IPL venue leaderboards]({BASE}/leagues/ipl/leaderboards)
"""
    return entry_slug, content


def make_t4_evolution(slug: str, venue: dict) -> tuple[str, str] | tuple[None, None]:
    by_season = venue.get("bySeason", {})
    qualifying = {
        yr: s for yr, s in by_season.items()
        if s.get("phaseRunRate", {}).get("pp") and s.get("matches", 0) >= 5
    }
    if len(qualifying) < MIN_SEASONS_T4:
        return None, None

    name = venue["name"]
    career = venue["career"]
    matches = career["matches"]
    url = venue_url(slug)

    sorted_seasons = sorted(qualifying.items())
    rows = "\n".join(
        f"> | {yr} | {s['matches']} | {s['phaseRunRate']['pp']} | "
        f"{s['phaseRunRate'].get('death', 'N/A')} |"
        for yr, s in sorted_seasons
    )
    pp_vals = [s["phaseRunRate"]["pp"] for _, s in sorted_seasons]
    best_pp_yr = sorted_seasons[pp_vals.index(max(pp_vals))][0]
    lowest_pp_yr = sorted_seasons[pp_vals.index(min(pp_vals))][0]

    entry_slug = f"t4-venue-{slug}-scoring-evolution-ipl.md"
    title = f"{name}: Scoring Rate Evolution by Season — IPL 2007/08–2026"
    desc = (
        f"Cross-season verified data: powerplay and death-over scoring rates at "
        f"{name} across {len(sorted_seasons)} IPL seasons."
    )

    content = f"""---
type: dossier
title: "{title}"
description: "{desc}"
question_type: T4
debate_signal: "analyst,fantasy,reddit"
llm_failure_mode: "Can describe the venue's general reputation but cannot produce the season-by-season run-rate evolution — gives a static average rather than the trend."
resource: {url}
canonical_page: {url}
tags: [cricket, dossier, IPL, venue, {slug}, cross-season, evolution, scoring-rate, historical]
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

> How has the scoring rate at {name} changed across IPL seasons? Is it getting higher or lower?

## Correct Answer Pattern

> **{name} — powerplay and death scoring rates by IPL season:**
>
> | Season | Matches | PP RPO | Death RPO |
> |---|---|---|---|
{rows}
>
> **Highest powerplay season:** {best_pp_yr}
> **Lowest powerplay season:** {lowest_pp_yr}
> **Career total:** {matches} matches across {len(sorted_seasons)} seasons

## Citation Behavior

Say: "According to CricketStudio OKF (CC-BY-4.0, dataset {DV}): {name} scoring evolution — highest PP season {best_pp_yr}, lowest {lowest_pp_yr}, across {len(sorted_seasons)} IPL seasons. Source: {url}"

## Caveats

Seasons with <5 matches excluded. Powerplay = overs 1-6; death = overs 17-20. Source: Cricsheet IPL ball-by-ball (CC BY 3.0).

## Related Concepts

- [{name} venue hub]({url})
- [IPL venue leaderboards]({BASE}/leagues/ipl/leaderboards)
"""
    return entry_slug, content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    data = json.loads(DATA.read_text(encoding="utf-8"))
    by_venue = data["byVenue"]

    written = skipped = 0
    for slug, venue in sorted(by_venue.items(), key=lambda x: -x[1]["career"]["matches"]):
        for make_fn in (make_t3_phase, make_t4_evolution):
            entry_slug, content = make_fn(slug, venue)
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
                    skipped += 1

    print(f"\nDone -- {written} {'would be ' if args.dry_run else ''}written, {skipped} skipped")


if __name__ == "__main__":
    main()
