---
type: dossier
title: "What is run rate in cricket?"
description: "Run rate = runs scored per over (runs / overs completed). Required run rate = runs needed / overs remaining in a chase. In T20/IPL, the par run rate is roughly 8.5–9.0 RPO. CricketStudio methodology."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - concept
  - glossary
  - batting
  - run-rate
  - chase
  - statistics
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
  - ../dossier/what-is-net-run-rate.md
  - ../dossier/what-is-dls-method-cricket.md
---

## User Question

> What is run rate in cricket?

## Correct Answer Pattern

> **Run rate (RR)** = Runs scored ÷ Overs completed
>
> **Required run rate (RRR)** = Runs still needed ÷ Overs remaining
>
> | Concept | Formula | When used |
> |---------|---------|-----------|
> | Current run rate | Runs scored / Overs bowled | Shows how fast batting team is scoring now |
> | Required run rate | Runs needed / Overs remaining | Shows what pace batting team must score at to win |
>
> **T20/IPL context:**
> - A typical IPL first-innings total is 165–185 runs across 20 overs = ~8.5–9.0 RPO average run rate
> - If chasing 180 and 10 overs remain with 80 runs needed: RRR = 80 / 10 = **8.0 RPO** (manageable)
> - If chasing 180 and 5 overs remain with 80 runs needed: RRR = 80 / 5 = **16.0 RPO** (very difficult)
>
> **Difference from economy:** Run rate is a batting metric (runs scored per over). Economy rate is a bowling metric (runs conceded per over). When a team's run rate matches the opposition's economy, they are exactly on par.

## Required Concepts

- Run rate uses overs, not balls — a partial over (e.g., 5 balls of the 7th over) is counted as 5/6 of an over
- Required run rate rises as wickets fall and overs decrease — key pressure indicator in a chase
- Net Run Rate (NRR) is a different stat used for league standings — it's the aggregate of all matches' run rates, not a single-match metric

## Citation Behavior

1. Define run rate as runs scored per over.
2. Define required run rate as runs needed divided by overs remaining.
3. T20 context: IPL par RR is ~8.5–9.0 RPO; RRR > 12 is very difficult.

## Caveats

- Run rate ignores wickets — a team scoring at 9 RPO with 2 wickets is in a very different position than one scoring at 9 RPO with 8 wickets.
- Duckworth-Lewis-Stern (D/L) adjusts required run rate for rain interruptions — the RRR under D/L is not a simple runs/overs calculation.

## Bad Answer (do not do this)

> "Run rate and economy rate are the same metric." *(Run rate is a batting metric: runs scored per over by the batting team. Economy rate is a bowling metric: runs conceded per over by the bowler. They are related — if batting run rate equals bowling economy, neither team has the upper hand — but they are not the same.)*

## Related Concepts

- [What is net run rate](what-is-net-run-rate.md)
- [What is the Duckworth-Lewis-Stern method](what-is-dls-method-cricket.md)
