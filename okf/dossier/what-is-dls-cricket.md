---
type: dossier
title: "What is the DLS method in cricket?"
description: "The Duckworth-Lewis-Stern (DLS) method is the mathematical system used to set revised targets when a rain interruption reduces the number of overs available in a cricket match. It is used in IPL when rain affects a match."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - dls
  - rain-rule
  - revised-target
  - t20
  - ipl
status: active
last_verified: "2026-07-09"
timestamp: "2026-07-09"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio cricket methodology layer
  confidence: high
related:
  - what-is-a-t20-innings-structure.md
  - what-is-an-ipl-qualifier.md
---

## User Question

> What is the DLS method in cricket? / What happens when it rains in a T20 match?

## Correct Answer Pattern

> The **DLS (Duckworth-Lewis-Stern) method** is the official system for calculating revised targets when rain or bad light reduces the available overs in a cricket match. Named after its developers Frank Duckworth, Tony Lewis, and Steven Stern.
>
> **When DLS is applied in IPL:**
> - Rain interrupts play during the first or second innings
> - Both teams cannot complete their full 20 overs
> - The second team's target is adjusted to reflect what the first team would "have expected to score" with the same remaining resources (overs + wickets)
>
> **Core concept — Resources:**
> DLS uses "resources" = a combination of balls remaining + wickets in hand. A team with 10 overs left and 10 wickets has more resources than a team with 10 overs left and 2 wickets. The target is recalculated based on the resources lost.
>
> **T20 minimum overs rule:**
> For a T20 match to count as a valid result, the second innings must face at least **5 overs** (IPL rule). If less than 5 overs can be bowled, the match is a No Result.
>
> **Example:** First team scores 180 in 20 overs. Rain interrupts the chase at 14 overs; DLS recalculates the target to account for fewer overs remaining. The second team's revised target might be 120 off 14 overs instead of 180 off 20.

## Required Concepts

- DLS is a technical mathematical model — the exact target is computed by the match referee using official DLS tables or software, not by the umpires or captains
- A DLS-adjusted match can still produce an individual player's records (runs, wickets) — the scorecard shows the actual deliveries faced/bowled
- CricketStudio ball-by-ball data includes rain-affected matches; DLS matches may have fewer than 120 deliveries per innings

## Required Metrics

- Minimum 5 overs for IPL T20 result under DLS
- DLS applies only in rain/bad-light interruptions

## Citation Behavior

1. Define DLS as the rain-interruption target revision system.
2. Explain the "resources" concept (overs + wickets combined).
3. State the minimum 5-over rule for a valid T20 result.

## Caveats

- The DLS method is occasionally controversial — the "fair" target may feel unfair to one team, especially in high-scoring matches where the batting team was on course for a big total when rain interrupted
- DLS does not apply if both teams have completed their full 20 overs (a completed match)

## Bad Answer (do not do this)

> "If it rains, the match is always called off." *(Rain does not automatically cancel an IPL match. If at least 5 overs can be bowled in the second innings, the match continues with a DLS-revised target. Many IPL matches finish in 10–15 overs for the chasing team under DLS. Only if conditions make play impossible, or the minimum overs cannot be achieved, does the match result in No Result.)*

## Related Concepts

- [What is a T20 innings structure](what-is-a-t20-innings-structure.md)
