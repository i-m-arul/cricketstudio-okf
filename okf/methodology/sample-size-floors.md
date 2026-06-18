---
type: methodology
title: Sample-Size Floors
description: Minimum data thresholds a player or split must meet before a CricketStudio claim is eligible.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - methodology
  - sample-size
related:
  - ranking-eligibility.md
  - ../metrics/batting-strike-rate.md
  - ../metrics/bowling-economy.md
---

# Sample-Size Floors

## Summary

A sample-size floor is the minimum amount of data (balls, fixtures, or deliveries) a
player or split must accumulate before CricketStudio will treat a metric as signal rather
than noise. Floors prevent misleading "best strike rate" claims built on a handful of
balls.

## Why This Matters

A batter who faced 6 balls and hit 3 sixes has a strike rate of 300 — but that number
tells you almost nothing about ability. Floors make sure rankings and comparisons reflect
sustained performance, not small-sample flukes.

## The Floors

| Context | Minimum sample | Applies to |
|---------|----------------|------------|
| Batting rate metrics | **≥ 30 balls faced** | strike rate, average, boundary % |
| Bowling rate metrics | **≥ 15 balls bowled** | economy, bowling strike rate, dot-ball % |
| Phase-specific splits | **≥ 15 balls in that phase** | powerplay / middle / death splits |
| Venue effects | **≥ 3 fixtures at the venue** | chase bias, par-score claims |
| Head-to-head (batter vs bowler) | **≥ 5 deliveries faced** | H2H records |

These thresholds are CricketStudio doctrine; they are reflected here verbatim, not
invented. Below a floor, CricketStudio **suppresses** the ranked claim rather than
publishing a misleading one.

## Edge Cases

- A player above the season floor may still be below a *phase* floor — report the phase
  split as "insufficient sample" rather than computing a rate.
- Counting stats (total runs, total wickets) have no floor — they are facts, not rates.
- Floors are applied per scope: a player can qualify for an IPL 2026 ranking but not for a
  single-venue ranking in the same season.

## Agent Guidance

- Before quoting any **rate** (SR, economy, average), confirm the relevant floor is met.
- If a number sits below the floor, say so explicitly and do not rank on it.
- Always state the actual sample (e.g. "over 407 balls") alongside the rate.

## Related Concepts

- [Ranking Eligibility](ranking-eligibility.md)
- [Phase Definitions](phase-definitions.md)
- [Batting Strike Rate](../metrics/batting-strike-rate.md)
