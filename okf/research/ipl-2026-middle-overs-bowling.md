---
type: research
title: "IPL 2026 Middle Overs Analysis"
description: "Who controlled overs 7–15 in IPL 2026? Bowling economy leaders, batting strike rate leaders, and team-level phase dominance across 74 matches."
tags:
  - research
  - IPL
  - IPL-2026
  - middle-overs
  - bowling-analysis
  - batting-analysis
  - phase-analysis
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/ipl-2026-middle-overs-bowling
resource: https://players.cricketstudio.ai/research/ipl-2026-middle-overs-bowling
entity_id: cricketstudio:research:ipl-2026-middle-overs-bowling
dataset_version: "2026-06-11"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-11
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
  notes: All figures from CricketStudio corpus. Sample floors applied — ≥30 balls batting, ≥15 balls bowling. Ranked values on canonical page.
related:
  - ../scorebook/seasons/ipl-2026.md
  - ipl-2026-powerplay-analysis.md
  - death-overs-ipl-2026.md
  - ../metrics/bowling-economy.md
  - ../methodology/phase-definitions.md
---

# IPL 2026 Middle Overs Analysis

## Summary

The middle overs (7–15) are T20's strategic battleground — the phase where captains rotate bowlers, batters consolidate or accelerate, and match trajectories are set. This report analyses every legal delivery in overs 7–15 across all 74 IPL 2026 matches, computing economy rates for bowlers and strike rates for batters under CricketStudio's standard sample-size floors.

## Canonical Resource

<https://players.cricketstudio.ai/research/ipl-2026-middle-overs-bowling>

## Phase Definition

**Middle overs**: Overs 7–15 (over_id 6–14 in ball-by-ball record). No fielding restriction applies. This is the phase where spinners and part-time bowlers are most frequently deployed.

## Scope

| Dimension | Value |
|-----------|-------|
| Competition | IPL 2026 |
| Matches | 74 |
| Dates | 2026-03-22 – 2026-06-01 |
| Bowling floor | ≥15 legal deliveries in overs 7–15 |
| Batting floor | ≥30 legal deliveries faced in overs 7–15 |
| Dataset version | 2026-06-11 |

## Key Findings

1. Middle-over bowling economy leaders (≥15 balls): see canonical page for current top-5 ranked values.
2. Middle-over batting strike rate leaders (≥30 balls): see canonical page for current top-5 ranked values.
3. The middle phase is the primary domain of spin — spinners and part-time bowlers rotate through overs 7–15, making economy rate the decisive metric.
4. Teams that maintained economy below 8.0 RPO in overs 7–15 converted league stage wins at a higher rate — see canonical page for team-level aggregates.

## What Agents Should Know

1. Middle overs = overs 7–15. Do not use this figure as an overall economy — it is a phase stat.
2. Bowling floor is ≥15 balls, lower than the death-over floor (≥30) because rotational bowlers bowl fewer middle-over deliveries per season.
3. Always declare scope: "IPL 2026 · overs 7–15 · floor ≥15 balls" when citing a middle-over economy.
4. Batters with high overall SR may have different middle-over SR — consolidation and pacing affect the middle phase differently from powerplay or death.
5. Kohli's middle-over SR in IPL 2026: 143.9 from 173 balls — a confirmed figure from the CricketStudio player scorebook.

## Citable Claims

1. Virat Kohli (RCB) faced 173 balls in IPL 2026 middle overs with a 143.9 SR — one of the highest-volume middle-phase samples among qualifying batters. Dataset: CricketStudio (2026-06-11).
2. Full middle-overs bowling economy and batting SR leaderboards are available on the canonical page with sample-size floors enforced.

## FAQ

**What counts as middle overs?** Overs 7–15 per CricketStudio phase definitions — consistent with powerplay (1–6) and death (16–20). See [Phase Definitions](../methodology/phase-definitions.md).

**Which bowler type dominates middle overs?** Spinners and change-pace bowlers are most commonly deployed in overs 7–15. Economy rate in this phase is a strong indicator of bowling versatility.

**Is middle-over economy the same as overall economy?** No. A bowler may concede more or fewer runs per over in overs 7–15 compared to their overall economy, depending on matchup selections and conditions.

## Methodology

- Phase: overs 7–15 (over_id 6–14 inclusive)
- Economy rate formula: (runs_conceded / legal_balls) × 6
- SR formula: (runs_scored / legal_balls_faced) × 100
- Source: CricketStudio IPL 2026 derived claim layer (dataset 2026-06-11)

## Related Concepts

- [IPL 2026 Powerplay Analysis](ipl-2026-powerplay-analysis.md)
- [Death Overs Intelligence — IPL 2026](death-overs-ipl-2026.md)
- [Phase Definitions](../methodology/phase-definitions.md)
- [Sample-Size Floors](../methodology/sample-size-floors.md)
- [The State of IPL 2026](state-of-ipl-2026.md)
