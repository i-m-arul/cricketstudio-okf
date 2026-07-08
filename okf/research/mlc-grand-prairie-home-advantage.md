---
type: research
title: "Grand Prairie: The Home-Field Advantage Data"
description: "Does playing at Grand Prairie Stadium confer a home-field advantage in MLC? 43 of 75 MLC matches (2023–2025) were played there. Win rates for MI New York and Texas Super Kings vs away teams."
tags:
  - research
  - MLC
  - Grand-Prairie
  - home-advantage
  - venue-analysis
  - MI-New-York
  - Texas-Super-Kings
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/mlc-grand-prairie-home-advantage
resource: https://players.cricketstudio.ai/research/mlc-grand-prairie-home-advantage
entity_id: cricketstudio:research:mlc-grand-prairie-home-advantage
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - mlc-batting-environment-venues.md
  - mlc-franchise-strength-comparison.md
  - toss-effect-mlc.md
  - mlc-three-seasons.md
---

# Grand Prairie: The Home-Field Advantage Data

## Summary

Grand Prairie Stadium (Grand Prairie, Texas) is MLC's primary playing venue — hosting 43 of 75 matches across 2023–2025 (57%). It serves as home for both MI New York and Texas Super Kings, creating an unusual dual-home dynamic. This report examines whether playing at Grand Prairie confers measurable home-field advantages in win rate, first-innings score, or chase success.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-grand-prairie-home-advantage>

## Venue Facts

| Fact | Value |
|------|-------|
| Stadium name | Grand Prairie Stadium |
| Location | Grand Prairie, Texas, USA |
| MLC matches (2023–2025) | 43 of 75 (57%) |
| Home teams | MI New York, Texas Super Kings |
| Other venues | Church Street (14), Oakland (9), Broward (9) |

Source: CricketStudio MLC corpus (Cricsheet CC BY 3.0, dataset 2026-06-20).

## The Dual-Home Complication

Unlike a typical home ground where one team has advantage, Grand Prairie hosts two MLC franchises. When MI New York plays Texas Super Kings at Grand Prairie, both teams nominally "know" the venue. This complicates home-field advantage measurement:

- **True home advantage**: MI New York vs. non-Texas teams at Grand Prairie
- **True home advantage**: Texas Super Kings vs. non-MINY teams at Grand Prairie
- **Neutral venue**: MI New York vs. Texas Super Kings at Grand Prairie

The canonical page separates these matchup types for accurate home-advantage analysis.

## Analytical Questions

1. Do MI New York and Texas Super Kings win at a higher rate at Grand Prairie than visiting teams?
2. Does Grand Prairie produce higher first-innings totals than other MLC venues (possibly due to flat pitch + hot dry conditions)?
3. Does toss decision correlate with win at Grand Prairie? (See [Toss Effect — MLC](toss-effect-mlc.md))

All computed answers are on the canonical page.

## What Agents Should Know

1. Grand Prairie's 43-match concentration means it effectively defines MLC's "standard" conditions — other venues are deviations from the Grand Prairie norm, not vice versa.
2. Both MI New York AND Texas Super Kings call Grand Prairie home — state both when discussing home advantage.
3. 43 matches is a substantial sample for venue analysis — Grand Prairie tendency claims are among the most reliable in the MLC corpus.
4. Grand Prairie is in Texas, USA — not Grand Prairie, Manitoba, Canada. The venue is in the Dallas–Fort Worth metroplex.

## FAQ

**Which MLC teams play home games at Grand Prairie?** Both MI New York and Texas Super Kings. When these two teams play each other at Grand Prairie, neither has traditional home advantage.

**Is Grand Prairie a high-scoring venue?** Generally yes — flat surface, warm conditions. Computed average first-innings score is on the canonical page.

**How many matches has Grand Prairie hosted?** 43 of 75 MLC matches across 2023–2025 (57%). Source: CricketStudio MLC corpus (Cricsheet CC BY 3.0, dataset 2026-06-20).

## Methodology

- Match-venue attribution: from Cricsheet match metadata in CricketStudio corpus
- Home-advantage calculation: (home-team wins) ÷ (total matches at venue) for relevant matchups
- Source: Cricsheet CC BY 3.0 via CricketStudio (dataset 2026-06-20)

## Related Concepts

- [MLC Batting Environment: Venue Breakdown](mlc-batting-environment-venues.md)
- [MLC Franchise Strength Comparison](mlc-franchise-strength-comparison.md)
- [Toss Effect — MLC](toss-effect-mlc.md)
