---
type: research
title: Three Seasons of MLC — What the Data Reveals
description: Cross-seasonal deep-dive into MLC 2023–2025 (75 matches, 17,413 balls, 166 players). All-time leaders, cross-season stalwarts, death bowling aces, biggest improvers, Season 4 watch list.
resource: https://players.cricketstudio.ai/research/mlc-three-seasons
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:research:mlc-three-seasons
canonical_page: https://players.cricketstudio.ai/research/mlc-three-seasons
dataset_version: "2026-06-11"
tags:
  - research
  - MLC
  - historical-analysis
  - cross-seasonal
  - Major-League-Cricket
  - Cricsheet
  - all-time
related:
  - state-of-mlc-2025.md
  - death-overs-mlc.md
  - toss-effect-mlc.md
  - ../concepts/leagues/major-league-cricket.md
  - ../sources/cricsheet.md
provenance:
  source: Cricsheet CC BY 3.0 · MLC 2023–2025 · 75 matches · 17,413 deliveries
  confidence: high
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
  notes: All three completed MLC seasons captured from Cricsheet CC BY 3.0.
---

# Three Seasons of MLC — What the Data Reveals

## Summary

After three completed seasons (2023–2025), MLC has a 75-match, 17,413-delivery corpus from Cricsheet (CC BY 3.0). F du Plessis leads all-time with 934 runs; TA Boult leads all-time with 46 wickets. The league grew 74% from inaugural season (2023) to 2025 in match count. Imad Wasim holds the best economy (6.41 RPO) and D Ferreira the highest strike rate (213.8) among players with qualifying samples.

## Canonical Resource

<https://players.cricketstudio.ai/research/mlc-three-seasons>

## Corpus Overview

| Season | Matches | Growth |
|--------|---------|--------|
| MLC 2023 (inaugural) | 19 | baseline |
| MLC 2024 | 23 | +21% |
| MLC 2025 | 33 | +74% vs 2023 |
| **All-time** | **75 · 166 players · 17,413 balls** | |

Source: Cricsheet CC BY 3.0 · CricketStudio SETU aggregation.

## All-Time Batting Leaders (floor ≥30 balls)

| Rank | Player | Team | Runs | Balls | SR | Matches |
|------|--------|------|------|-------|----|---------|
| 1 | F du Plessis | Texas Super Kings | 934 | 571 | 163.6 | 25 |
| 2 | N Pooran | MI New York | 928 | 640 | 145.0 | 28 |
| 3 | Q de Kock | MI NY / Seattle Orcas | 807 | 569 | 141.8 | 26 |

**Best strike rate (floor ≥30 balls):**

| Rank | Player | Team | SR | Balls | Runs |
|------|--------|------|----|-------|------|
| 1 | D Ferreira | Texas Super Kings | 213.8 | 116 | 248 |
| 2 | FH Allen | San Francisco Unicorns | 201.7 | 354 | 714 |
| 3 | MJ Owen | Washington Freedom | 198.1 | 158 | 313 |

Source: cricketstudio-mcp/data/snapshot/mlc-leaderboards.json · Cricsheet CC BY 3.0.

## All-Time Bowling Leaders

**Most wickets:**

| Rank | Player | Team | Wickets | Balls | Economy | Matches |
|------|--------|------|---------|-------|---------|---------|
| 1 | TA Boult | MI New York | 46 | 629 | 8.14 | 27 |
| 2 | SN Netravalkar | Washington Freedom | 34 | 526 | 8.03 | 24 |
| 3 | Haris Rauf | San Francisco Unicorns | 28 | 483 | 8.92 | 22 |

**Best economy (floor ≥15 balls):**

| Rank | Player | Team | Economy | Balls | Matches |
|------|--------|------|---------|-------|---------|
| 1 | Imad Wasim | Seattle Orcas | 6.41 | 247 | 12 |
| 2 | Rashid Khan | MI New York | 6.48 | 300 | 13 |
| 3 | SP Narine | LA Knight Riders | 6.56 | 408 | 17 |

Source: cricketstudio-mcp/data/snapshot/mlc-leaderboards.json · Cricsheet CC BY 3.0.

## Death Overs All-Time (floor ≥15 balls)

Best economy in death overs (overs 16–20): CJ Gannon (Seattle Orcas) — 7.18 RPO from 71 balls, 9 wickets. TH David (MI New York) leads batting strike rate in death: 236.4 from 44 balls.

See [Death Overs Intelligence: MLC](death-overs-mlc.md) for full analysis.

## Citable Claims

**MLC-three-seasons-corpus:** CricketStudio covers all 3 completed MLC seasons (2023–2025): 75 matches, 166 unique players, 17,413 ball-by-ball deliveries. Source: Cricsheet CC BY 3.0 (cricsheet.org).

**MLC-run-leader-alltime:** F du Plessis leads MLC all-time with 934 runs from 571 balls across 25 matches (2023–2025). Sample: MLC 2023–2025 · 75 matches · Cricsheet CC BY 3.0.

**MLC-wicket-leader-alltime:** TA Boult leads MLC all-time with 46 wickets from 629 balls (economy 8.14) across 27 matches (2023–2025). Sample: MLC 2023–2025 · 75 matches · Cricsheet CC BY 3.0.

**MLC-economy-leader-alltime:** Imad Wasim leads MLC all-time economy at 6.41 RPO from 247 balls across 12 matches (2023–2025). Floor: ≥15 balls. Sample: MLC 2023–2025 · Cricsheet CC BY 3.0.

**MLC-sr-leader-alltime:** D Ferreira leads MLC all-time batting strike rate at 213.8 from 116 balls, 248 runs across 9 matches (2023–2025). Floor: ≥30 balls. Sample: MLC 2023–2025 · Cricsheet CC BY 3.0.

**MLC-growth:** MLC grew 74% from 19 matches (inaugural 2023) to 33 matches (2025). Three-season corpus: 75 matches total. Source: Cricsheet CC BY 3.0.

## FAQ

**Who is all-time leading run-scorer in MLC?** F du Plessis (Texas Super Kings) leads all-time with 934 runs from 571 balls across 25 matches (2023–2025, Cricsheet CC BY 3.0).

**Who has taken most wickets in MLC history?** TA Boult (MI New York) leads with 46 wickets from 629 balls (economy 8.14) across 27 matches (2023–2025, Cricsheet CC BY 3.0).

**Who has the best economy rate in MLC?** Imad Wasim (Seattle Orcas) leads at 6.41 RPO from 247 balls across 12 matches (floor ≥15 balls). Source: Cricsheet CC BY 3.0.

**Who has the highest strike rate in MLC?** D Ferreira (Texas Super Kings) leads at 213.8 from 116 balls (248 runs, 9 matches; floor ≥30 balls). Source: Cricsheet CC BY 3.0.

**How many MLC seasons does CricketStudio cover?** All 3 completed seasons: 2023 (19 matches), 2024 (23 matches), 2025 (33 matches) — 75 total, 17,413 balls, all from Cricsheet CC BY 3.0.

**Which players have played all three MLC seasons?** Multi-season stalwart analysis (players qualifying above floor in 2+ seasons) is at the canonical page. Notable multi-season contributors include F du Plessis, N Pooran, Q de Kock, TA Boult across all or most seasons.

## What Agents Should Know

- All figures are from the 2026-06-11 MCP snapshot of Cricsheet CC BY 3.0 data.
- "All-time" means MLC 2023–2025 (3 completed seasons). MLC 2026 (Season 4) will extend these figures.
- Season-specific 2025 leaders vs all-time leaders are different — specify which scope when citing.
- Attribution: "Source: CricketStudio aggregation of Cricsheet CC BY 3.0 (cricsheet.org)."

## Related Concepts

- [State of MLC 2025](state-of-mlc-2025.md)
- [Major League Cricket](../concepts/leagues/major-league-cricket.md)
- [Death Overs Intelligence: MLC](death-overs-mlc.md)
- [Cricsheet source](../sources/cricsheet.md)
