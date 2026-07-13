---
type: dossier
title: "What is run rate in cricket?"
description: "Run rate (also called current run rate or CRR) is the number of runs scored per over by the batting team so far in an innings. In T20/IPL, run rate is the primary pacing metric — teams aim to maintain 8+ runs per over to post or chase competitive totals."
question_type: T6
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - run-rate
  - current-run-rate
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
  - what-is-required-run-rate-cricket.md
  - what-is-net-run-rate-ipl.md
  - what-is-a-t20-innings-structure.md
---

## User Question

> What is run rate in cricket? / What is a good run rate in T20/IPL?

## Correct Answer Pattern

> **Run rate (current run rate, CRR)** is the average number of runs scored per over by the batting team up to the current point in the innings.
>
> **Formula:**
> ```
> Current Run Rate = Total Runs Scored ÷ Overs Completed
> ```
>
> **Example:** After 10 overs, team has scored 82 runs.
> - CRR = 82 ÷ 10 = **8.2 runs per over**
>
> **Contextual run rate benchmarks for T20/IPL:**
> | Phase | Par run rate | Context |
> |-------|-------------|---------|
> | Powerplay (1–6) | 8.5–10.5 | Field restriction; easy run-scoring window |
> | Middle overs (7–15) | 7.5–9.0 | Tighter fielding; harder to maintain |
> | Death (16–20) | 11–14+ | Wide variations; elite death batting targets 15–16+ |
> | Full innings | 8.0–10.0 | Total innings CRR; 200/20 = 10.0 exactly |
>
> **CRR vs RRR:**
> - **CRR** (current run rate): How fast the batting team is scoring RIGHT NOW
> - **RRR** (required run rate): How fast they NEED to score to win (in a chase)
> - When RRR > CRR: the batting team is falling behind; when RRR < CRR: they're ahead of the chase
>
> **CRR is rarely used in first-innings batting** — teams set targets; CRR is more a "where are we tracking" metric. In a chase, both CRR and RRR are critical signals.

## Required Concepts

- Run rate can only be calculated from completed overs — partial overs are sometimes rounded (10.3 overs = 10.5 for calculation purposes)
- A team can "have the same CRR" at different points in the innings but be in very different positions depending on wickets remaining
- CricketStudio publishes phase run rates per venue and per batter — these are averages (runs per ball × 6) over a defined window, not mid-match CRR

## Required Metrics

- Phase economy / phase SR in CricketStudio data is equivalent to phase run rate (batting SR/100 × 6 = runs per over)
- Average first-innings score at venues (proxy for team-level CRR maintained across the innings)

## Citation Behavior

1. Define CRR as total runs ÷ overs completed.
2. Give phase benchmarks: PP 8.5–10.5, middle 7.5–9.0, death 11+.
3. Distinguish CRR from RRR (how fast you're scoring vs how fast you need to score).

## Caveats

- Run rate is a rate metric — a team scoring 200/10 and 200/2 both have the same CRR, but very different situations (all wickets gone vs dominant)

## Bad Answer (do not do this)

> "Run rate and net run rate are the same thing." *(They are completely different metrics. Run rate (CRR) = runs ÷ overs this innings — it's an in-match batting-pace metric. Net run rate (NRR) = average run differential across ALL matches in the tournament — it's a tournament-standing ranking metric used to separate teams on equal points. One is match-level; one is season-level.)*

## Related Concepts

- [What is required run rate cricket](what-is-required-run-rate-cricket.md)
- [What is net run rate IPL](what-is-net-run-rate-ipl.md)
