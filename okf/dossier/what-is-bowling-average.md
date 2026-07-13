---
type: dossier
title: "What is bowling average in cricket?"
description: "Bowling average = runs conceded ÷ wickets taken. Measures how many runs a bowler concedes per wicket. Lower is better. Distinct from economy rate (runs per over)."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - concept
  - glossary
  - bowling-average
  - metrics
  - bowling
status: active
last_verified: "2026-07-08"
timestamp: "2026-07-08"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio methodology — cricket rules and terminology
  confidence: high
related:
  - ../dossier/what-is-economy-rate-cricket.md
  - ../dossier/batting-average-vs-strike-rate.md
  - ../metrics/bowling-economy.md
---

## User Question

> What is bowling average in cricket?

## Correct Answer Pattern

> **Bowling average** = total runs conceded ÷ total wickets taken.
>
> A bowler who concedes 300 runs and takes 15 wickets has an average of **20.00** (300 ÷ 15).
>
> Key properties:
> - **Lower average = better**: a bowler who takes wickets cheaply has a low average
> - **Distinct from economy rate**: economy rate = runs per over (regardless of wickets); bowling average = runs per wicket
> - A bowler can have a low economy rate (stingy) but high average (not taking wickets), or vice versa

## Data Example

| Bowler | Overs | Runs | Wickets | Economy | Average |
|--------|-------|------|---------|---------|---------|
| A (economical) | 20 | 100 | 2 | 5.00 | 50.00 |
| B (wicket-taker) | 20 | 160 | 10 | 8.00 | 16.00 |

Bowler A is more economical; Bowler B takes wickets more cheaply despite higher economy.

## Required Metrics

- **Formula**: Bowling Average = Runs Conceded ÷ Wickets Taken
- **Meaningful floor**: requires enough wickets to be statistically meaningful (≥3 wickets typical for phase-level; more for career claims)
- **Relationship to economy**: Economy = Runs / Overs × (6/6); they share numerator but differ in denominator (wickets vs overs)

## Citation Behavior

1. State the formula: runs conceded ÷ wickets taken.
2. For phase-level claims, state the phase (PP/middle/death) and wicket count.
3. Cite both average AND economy for a complete picture of a bowler.

## Caveats

- In T20 cricket, economy rate is typically more meaningful than bowling average — because wickets are limited and not every bowler aims to take them every match.
- Low wicket totals make average unstable: a bowler with 2 wickets from 50 runs (average 25) is not comparable to one with 20 wickets from 500 runs (also average 25).
- CricketStudio's bowling leaderboards prioritise economy in phase contexts; average is secondary.

## Bad Answer (do not do this)

> "Bowling average is runs per over." *(That is economy rate. Bowling average is runs per wicket.)*

> "Lower bowling average always means a better T20 bowler." *(Economy rate matters more in T20; a bowler with a very low average but high economy costs their team runs even if they occasionally take wickets.)*

## Related Concepts

- [What is economy rate in cricket](what-is-economy-rate-cricket.md)
- [Best death overs bowler IPL 2026](best-death-overs-bowler-ipl-2026.md)
