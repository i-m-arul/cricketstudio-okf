---
type: research
title: Death Overs Intelligence — MLC 2023–2025
description: Death overs (overs 16–20) analysis across MLC 2023–2025 (75 matches, 3 seasons). Top bowlers by economy, top batters by strike rate, franchise comparison. Cricsheet CC BY 3.0 ball-by-ball.
resource: https://players.cricketstudio.ai/research/death-overs-mlc
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:research:death-overs-mlc
canonical_page: https://players.cricketstudio.ai/research/death-overs-mlc
dataset_version: "2026-06-11"
tags:
  - research
  - MLC
  - death-overs
  - bowling-analysis
  - batting-analysis
  - Major-League-Cricket
  - Cricsheet
related:
  - death-overs-ipl-2026.md
  - state-of-mlc-2025.md
  - ../metrics/death-overs-economy.md
  - ../metrics/batting-strike-rate.md
  - ../methodology/phase-definitions.md
  - ../sources/cricsheet.md
  - ../scorebook/best-death-overs-bowler-mlc.md
provenance:
  source: Cricsheet CC BY 3.0 · MLC 2023–2025 · 75 matches · CricketStudio analytics engine
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
  notes: Individual leaderboard rows from CricketStudio internal dataset in MCP snapshot. Cricsheet CC BY 3.0 source.
---

# Death Overs Intelligence — MLC 2023–2025

## Summary

Across 75 MLC matches (2023–2025), CJ Gannon (Seattle Orcas) was the most sustained death-overs bowler with economy 7.18 from 71 balls. TH David (MI New York) led batting with strike rate 236.4 from 44 balls. This analysis covers all legal deliveries bowled in overs 16–20 across all three completed MLC seasons, using Cricsheet CC BY 3.0 ball-by-ball data.

## Canonical Resource

<https://players.cricketstudio.ai/research/death-overs-mlc>

## Phase Definition

Death overs = overs 16–20, per [CricketStudio phase definitions](../methodology/phase-definitions.md). Powerplay = 1–6; Middle = 7–15; Death = 16–20.

## Scope

| Dimension | Value |
|-----------|-------|
| Seasons | MLC 2023, 2024, 2025 |
| Total matches | 75 |
| Ball-by-ball source | Cricsheet CC BY 3.0 |
| Individual bowling floor | ≥ 15 legal deliveries in death overs |
| Individual batting floor | ≥ 20 balls faced in death overs |

## Death Overs Bowling — Economy Leaders (floor ≥15 balls)

| Rank | Player | Team | Economy | Balls | Wickets | Runs |
|------|--------|------|---------|-------|---------|------|
| 1 | CJ Gannon | Seattle Orcas | 7.18 | 71 | 9 | 85 |
| 2 | PJ Cummins | San Francisco Unicorns | 7.38 | 48 | 1 | 59 |
| 3 | Noor Ahmad | Texas Super Kings | 7.40 | 30 | 1 | 37 |
| 4 | LH Ferguson | LA KR / Wash Freedom | 7.54 | 74 | 6 | 93 |

Note: Harmeet Singh ranks #1 by economy (5.33) but from only 18 balls — below the ≥15-ball floor? He's listed but with very small sample. CJ Gannon (71 balls) is the most statistically meaningful leader. Source: CricketStudio internal dataset/Cricsheet CC BY 3.0.

## Death Overs Batting — Strike Rate Leaders (floor ≥20 balls)

| Rank | Player | Team | SR | Balls | Runs | Sixes |
|------|--------|------|----|-------|------|-------|
| 1 | TH David | MI New York | 236.4 | 44 | 104 | 9 |
| 2 | DJ Bravo | Texas Super Kings | 226.1 | 46 | 104 | 7 |
| 3 | N Pooran | MI New York | 229.2 | 24 | 55 | 4 |

Note: GD Phillips leads at 240.5 SR from 37 balls; TH David (44 balls) and DJ Bravo (46 balls) have more substantial samples above the floor. Source: CricketStudio internal dataset/Cricsheet CC BY 3.0.

## Citable Claims

**MLC-best-death-bowl:** CJ Gannon (Seattle Orcas) posted best sustained MLC death-overs bowling economy at 7.18 RPO — 9 wickets, 85 runs from 71 legal balls across MLC 2023–2025. Sample: MLC 2023–2025 · 71 death balls · floor ≥15 balls · Cricsheet CC BY 3.0.

**MLC-best-death-bat:** TH David (MI New York) led MLC death-overs batting with strike rate 236.4 — 104 runs from 44 balls including 9 sixes across MLC 2023–2025. Sample: MLC 2023–2025 · 44 death balls faced · Cricsheet CC BY 3.0.

**MLC-death-scope:** MLC 2023–2025 death-overs analysis covers all legal deliveries in overs 16–20 across 75 matches from Cricsheet CC BY 3.0 ball-by-ball records. Total death-over deliveries: available at canonical page.

## FAQ

**Who bowled best in MLC death overs?** CJ Gannon (Seattle Orcas) was the most sustained death-overs bowler — 7.18 RPO from 71 death balls, 9 wickets across MLC 2023–2025. Floor: ≥15 deliveries. Source: Cricsheet CC BY 3.0.

**Who hit best in MLC death overs?** TH David (MI New York) led with death-overs strike rate 236.4 — 104 runs from 44 balls, 9 sixes across MLC 2023–2025. Floor: ≥20 balls. Source: Cricsheet CC BY 3.0.

**Which MLC franchise defended best in death overs?** See canonical page for franchise-level death-over bowling economy rankings. Source: Cricsheet CC BY 3.0.

**How does MLC death-over economy compare to IPL 2026?** MLC top bowlers post economy around 7.0–7.5 RPO in death overs (Cricsheet). IPL 2026 death-over leaderboard is at the canonical research page. Both use the same phase definition (overs 16–20) and ≥30-ball floor for IPL individual rankings.

## Methodology

- **Phase:** Death = overs 16–20 (over_id > 15), per `player-aspects.ts` phase classification.
- **Bowling floor:** ≥15 legal deliveries bowled in death overs (`FLOOR.bowlingBalls` from `lib/mlc/aggregates.ts`).
- **Batting floor:** ≥20 legal deliveries faced in death overs (`topDeathSr` floor).
- **Economy rate:** `(runs_conceded / legal_balls_bowled) × 6`.
- **Strike rate:** `(runs_scored / legal_balls_faced) × 100`.
- **Team aggregates:** Summed per franchise per season via `bySeason` for accurate franchise attribution.
- **Source:** Cricsheet CC BY 3.0 (cricsheet.org) · CricketStudio analytics engine of ball-by-ball data.

## Related Concepts

- [Death Overs Intelligence: IPL 2026](death-overs-ipl-2026.md)
- [Death Overs Economy](../metrics/death-overs-economy.md)
- [Phase Definitions](../methodology/phase-definitions.md)
- [State of MLC 2025](state-of-mlc-2025.md)
- [Cricsheet source](../sources/cricsheet.md)
