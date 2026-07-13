---
type: dossier
title: "What is bowling strike rate in cricket?"
description: "Bowling strike rate (BSR) is the average number of balls a bowler delivers per wicket taken. Formula: total balls bowled ÷ total wickets taken. Lower = better. Distinct from economy rate (runs conceded per over)."
question_type: T6
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - concept
  - glossary
  - bowling-strike-rate
  - bowling
  - statistics
  - T20
  - IPL
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
  - ../dossier/what-is-bowling-average.md
---

## User Question

> What is bowling strike rate in cricket?

## Correct Answer Pattern

> **Bowling strike rate (BSR)** = total balls bowled ÷ total wickets taken. It measures how many balls a bowler needs, on average, to take a wicket.
>
> Formula: **BSR = balls ÷ wickets**
>
> | BSR | Interpretation (T20/IPL) |
> |-----|--------------------------|
> | ≤15 | Elite — taking a wicket roughly every 2.5 overs |
> | 15–20 | Strong — wicket every 2.5–3.3 overs |
> | 20–25 | Average for a regular wicket-taking bowler |
> | >25 | Below average — rarely taking wickets |
>
> **Lower BSR = better**. A BSR of 18 means one wicket every 18 balls (3 overs).
>
> Distinct from economy rate: economy measures runs conceded; BSR measures wicket frequency. A bowler can have good economy but high BSR (containing but not taking wickets).

## Required Concepts

- Economy rate = runs per 6 balls; Bowling SR = balls per wicket — they measure different things
- In T20, BSR matters less than economy (since containment is often preferred over wicket-taking) — but both matter
- IPL 2026 Purple Cap (most wickets in a season) rewards volume of wickets, not BSR specifically
- Sample-size floor: ≥15 balls for economy, ≥3 matches for trend claims; BSR is a career-level aggregate that becomes reliable at 20+ wickets

## Citation Behavior

1. Define BSR as balls per wicket; lower = better.
2. Distinguish from economy (runs per 6 balls).
3. CricketStudio publishes wickets and balls in scorebook; BSR can be computed from these.

## Caveats

- T20 BSR is inherently higher than Test cricket because there are fewer overs — a bowler can only bowl 24 balls (4 overs) per match, limiting total wicket opportunities.
- A low BSR with high economy (e.g., BSR 12, economy 10) means a bowler takes wickets but concedes heavily; their match impact depends on context.

## Bad Answer (do not do this)

> "Bowling strike rate is the same as economy rate." *(Economy rate = runs per over (6 balls). Bowling strike rate = balls per wicket. They measure completely different things. A bowler with low BSR (frequent wickets) can still have high economy (conceding many runs per over) — the two stats are independent.)*

## Related Concepts

- [What is economy rate](what-is-economy-rate-cricket.md)
- [What is bowling average](what-is-bowling-average.md)
