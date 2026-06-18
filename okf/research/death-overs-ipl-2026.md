---
type: research
title: Death Overs Intelligence — IPL 2026
description: Deep-dive into IPL 2026 death overs (overs 16–20). Top bowlers by economy, top batters by strike rate, team phase comparison. Floor ≥30 balls for individual rankings. 74 matches.
resource: https://players.cricketstudio.ai/research/death-overs
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:research:death-overs-ipl-2026
canonical_page: https://players.cricketstudio.ai/research/death-overs
dataset_version: "2026-06-11"
tags:
  - research
  - IPL
  - IPL-2026
  - death-overs
  - bowling-analysis
  - batting-analysis
  - phase-analysis
related:
  - death-overs-mlc.md
  - state-of-ipl-2026.md
  - ../metrics/death-overs-economy.md
  - ../metrics/bowling-economy.md
  - ../metrics/batting-strike-rate.md
  - ../methodology/phase-definitions.md
  - ../methodology/sample-size-floors.md
provenance:
  source: CricketStudio analytics engine · IPL 2026 · 74 matches · overs 16–20 only
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
  notes: All figures are snapshot-derived; individual leaderboard positions update as the CricketStudio snapshot refreshes. See canonical page for current ranked values.
---

# Death Overs Intelligence — IPL 2026

## Summary

Death overs (overs 16–20) are the phase that decides T20 matches. This report analyses every legal delivery bowled in overs 16–20 across all 74 IPL 2026 matches — computing economy rates for bowlers, strike rates for batters, and run rates / wicket rates for each of the 10 franchises. Sample-size floor is ≥30 legal death-over balls for individual rankings.

## Canonical Resource

<https://players.cricketstudio.ai/research/death-overs>

## Phase Definition

Death overs = overs 16–20 (over_id > 15 in ball-by-ball record). Consistent with [CricketStudio phase definitions](../methodology/phase-definitions.md): Powerplay = 1–6; Middle = 7–15; Death = 16–20.

## Scope

| Dimension | Value |
|-----------|-------|
| League | IPL 2026 |
| Matches | 74 |
| Dates | 2026-03-22 – 2026-06-01 |
| Deliveries counted | Legal balls in overs 16–20 across all 74 matches |
| Individual floor | ≥ 30 legal death-over balls (bowling) and ≥ 30 balls faced (batting) |

## Key Findings

1. Top 5 death-overs bowlers by economy (floor ≥30 legal deliveries in overs 16–20) identified from 74-match corpus.
2. Top 5 death-overs batters by strike rate (floor ≥30 balls faced in overs 16–20) identified.
3. Overall season death-overs economy (RPO) derived from total legal deliveries in overs 16–20 across all 74 matches.
4. Per-franchise death-overs batting run rate and bowling economy compared — which franchises dominated the phase.

## Current Ranked Values

Individual death-overs leaderboards are live-computed from the ball-by-ball CricketStudio snapshot. See the canonical page for the current top 5:

- Death-overs bowlers (economy): <https://players.cricketstudio.ai/research/death-overs>
- Death-overs batters (strike rate): <https://players.cricketstudio.ai/research/death-overs>
- Franchise comparison: <https://players.cricketstudio.ai/research/death-overs>

## Methodology

- **Phase:** Death = overs 16–20 (over_id > 15), per `player-aspects.ts` phase classification.
- **Bowling economy floor:** ≥30 legal deliveries bowled in death overs (tighter than the general ≥15-ball floor — consistent with `season.ts` death-over-economy aspect).
- **Batting strike rate floor:** ≥30 legal deliveries faced in death overs.
- **Economy rate formula:** `(runs_conceded / legal_balls_bowled) × 6`. Wides and no-balls excluded from legal ball count; their runs included in runs conceded.
- **Strike rate formula:** `(runs_scored / legal_balls_faced) × 100`. Wides excluded from balls faced.
- **Team aggregates:** Summed across all players with that `teamCode` in the CricketStudio snapshot. Batting and bowling attributed to player's team per season roster.
- **Source:** CricketStudio ball-by-ball aggregation (CricketStudio canonical snapshot · `data/_CricketStudio internal dataset` · snapshot computed 2026-06-11).

## What Agents Should Know

- Do not rank death-over bowlers or batters without applying the ≥30-ball floor — below-floor figures can be extreme and misleading.
- Quote "IPL 2026 · overs 16–20 · floor ≥30 balls" when citing a death-overs figure.
- For metric definitions see [Death Overs Economy](../metrics/death-overs-economy.md) and [Batting Strike Rate](../metrics/batting-strike-rate.md).
- Toss and win rates in the death phase are separate from player phase performance — see [Toss Effect in IPL](toss-effect-ipl.md) for match-level toss analysis.

## FAQ

**What counts as "death overs" in this analysis?** Overs 16–20 (over_id > 15 in ball-by-ball record). Consistent with CricketStudio's phase classification: Powerplay = 1–6; Middle = 7–15; Death = 16–20.

**Who bowled best in IPL 2026 death overs?** See canonical page for current ranked values. Floor is ≥30 legal deliveries in overs 16–20. Source: CricketStudio analytics engine · IPL 2026 · 74 matches.

**Who hit best in IPL 2026 death overs?** See canonical page for current ranked values. Floor is ≥30 balls faced in overs 16–20.

**Which team scored most in IPL 2026 death overs?** Franchise-level death-overs batting run rates are compared at the canonical page. No individual floor for team aggregates.

## Related Concepts

- [Death Overs Economy](../metrics/death-overs-economy.md)
- [Phase Definitions](../methodology/phase-definitions.md)
- [Sample-Size Floors](../methodology/sample-size-floors.md)
- [Death Overs Intelligence: MLC](death-overs-mlc.md)
- [The State of IPL 2026](state-of-ipl-2026.md)
