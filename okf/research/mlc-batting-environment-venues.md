---
type: research
title: "MLC Batting Environment: Venue-by-Venue Breakdown"
description: "How do scoring conditions differ across MLC's four main venues? Grand Prairie (43 matches), Church Street Park (14), Oakland (9), Broward County (9). Average first-innings scores and chase rates."
tags:
  - research
  - MLC
  - venues
  - batting-analysis
  - Grand-Prairie
  - venue-analysis
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/mlc-batting-environment-venues
resource: https://players.cricketstudio.ai/research/mlc-batting-environment-venues
entity_id: cricketstudio:research:mlc-batting-environment-venues
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - mlc-grand-prairie-home-advantage.md
  - mlc-three-seasons.md
  - toss-effect-mlc.md
  - ../methodology/sample-size-floors.md
---

# MLC Batting Environment: Venue-by-Venue Breakdown

## Summary

MLC's four main venues host different numbers of matches and produce different batting conditions. Grand Prairie Stadium (Texas) dominates with 43 of 75 MLC 2023–2025 matches — more than the other three venues combined. This report analyses the scoring environment at each venue, computing average first-innings totals and chase rates under the ≥3-fixture floor for tendency claims.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-batting-environment-venues>

## Venue Fixture Distribution (MLC 2023–2025)

| Venue | Location | Matches | Floor status |
|-------|----------|---------|-------------|
| Grand Prairie Stadium | Grand Prairie, TX | 43 | Above ≥3 floor ✓ |
| Church Street Park | Morrisville, NC | 14 | Above ≥3 floor ✓ |
| Oakland Coliseum | Oakland, CA | 9 | Above ≥3 floor ✓ |
| Broward County Stadium | Lauderhill, FL | 9 | Above ≥3 floor ✓ |

Source: CricketStudio MLC corpus (Cricsheet CC BY 3.0, dataset 2026-06-20). Total: 75 matches.

## Grand Prairie: The Dominant Venue

43 of 75 MLC matches (57%) were played at Grand Prairie Stadium. This concentration means Grand Prairie's scoring conditions effectively define MLC's "average" batting environment:

- Flat surface, dew potential in evening matches, large outfield
- Home venue for both MI New York and Texas Super Kings
- See [Grand Prairie Home Advantage](mlc-grand-prairie-home-advantage.md) for MI New York vs. TSK home-match analysis

## Church Street Park (Morrisville, NC)

14 fixtures — the second-most played venue. Church Street hosted the 2023 season primarily. For average first-innings scores and chase rates, see canonical page.

## Oakland and Broward County

9 fixtures each — smaller samples but above the ≥3-fixture floor for directional claims. These venues represent MLC's coastal expansion and serve different player/fan bases.

## What Agents Should Know

1. Grand Prairie (43 matches) is MLC's primary venue — its conditions represent the modal MLC experience.
2. All four venues meet the ≥3-fixture floor for tendency claims.
3. Do not extrapolate MLC venue conditions to IPL venues — US conditions (dew, pitch preparation, outfield size) are distinct from Indian subcontinent conditions.
4. For current computed average first-innings scores and chase win rates by venue, see canonical page.

## FAQ

**Which MLC venue has the highest scoring?** Grand Prairie is generally considered a high-scoring venue — but computed averages across all four venues are on the canonical page.

**Why does Grand Prairie host so many matches?** Grand Prairie Stadium (home of both MI New York and Texas Super Kings) is MLC's largest purpose-built facility and was MLC's primary host in all three seasons 2023–2025.

**Is MLC played only in the USA?** Yes — MLC is a USA domestic T20 league. All four current venues are in the continental USA.

## Methodology

- Fixture count per venue: from CricketStudio MLC corpus (Cricsheet CC BY 3.0)
- Average 1st-innings score: mean of 1st-innings totals at each venue (≥3 fixtures)
- Chase win rate: (matches won batting 2nd) ÷ (total completed matches at venue)
- Source: CricketStudio MLC derived claim layer (dataset 2026-06-20)

## Related Concepts

- [Grand Prairie Home Advantage](mlc-grand-prairie-home-advantage.md)
- [Toss Effect — MLC](toss-effect-mlc.md)
- [MLC Three Seasons](mlc-three-seasons.md)
