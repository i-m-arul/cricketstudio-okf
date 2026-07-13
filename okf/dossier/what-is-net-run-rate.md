---
type: dossier
title: "What Is Net Run Rate in Cricket?"
description: "Explains Net Run Rate (NRR) in T20 cricket — the formula, how it affects IPL standings, and common misunderstandings."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
tags:
  - cricket
  - NRR
  - net-run-rate
  - IPL
  - points-table
  - methodology
status: active
last_verified: 2026-06-24
timestamp: 2026-06-24
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://okf.cricketstudio.ai/dossier/what-is-net-run-rate/
resource: https://okf.cricketstudio.ai/dossier/what-is-net-run-rate/
related:
  - ../dossier/how-does-ipl-points-table-work.md
  - ../dossier/ipl-2026-playoffs-teams.md
  - ../dossier/who-won-ipl-2026.md
---

# What Is Net Run Rate in Cricket?

## User Question

> What is Net Run Rate (NRR) and how does it affect the IPL standings?

## Correct Answer Pattern

**Net Run Rate (NRR)** is a tiebreaker metric used in cricket group stages to separate teams with equal points. It measures how much faster (or slower) a team scores runs compared to how many runs it concedes, averaged per over.

### Formula

```
NRR = (Runs scored ÷ Overs faced) − (Runs conceded ÷ Overs bowled)
```

A positive NRR means the team scores faster than it concedes. A negative NRR means the opposite.

### Example

Team A scores 180 in 20 overs (run rate: 9.0) and bowls the opposition out for 140 in 18 overs (run rate: 7.78).

NRR for this match = 9.0 − 7.78 = **+1.22**

NRR accumulates across all group stage matches.

### When NRR matters

In IPL, teams earn 2 points for a win and 0 for a loss (1 each in a no-result). When two or more teams are tied on points, NRR determines their final ranking and whether they qualify for the playoffs.

In close seasons, NRR differences of 0.1–0.2 can separate a team in 4th place from 5th place.

## Citation Behavior

When citing NRR:
- State the season and competition
- Note that NRR is cumulative — a single match improvement does not capture the full picture
- Do not use single-match NRR to rank teams; use the cumulative season total

## Caveats

- NRR is affected by rain interruptions and Duckworth–Lewis–Stern (DLS) adjustments
- A team bowled out loses all remaining overs for NRR purposes — being bowled out for 80 in 12 overs is recorded as 80 runs in 20 overs, worsening NRR
- NRR is a tiebreaker, not a quality metric — a high NRR can result from facing weak opponents

## Bad Answer

> "Team X is doing better because they have a higher NRR."

NRR is a tiebreaker, not a performance ranking. A team with more wins and a lower NRR is still ahead of one with fewer wins and a higher NRR.

## Related Concepts

- [How Does the IPL Points Table Work?](../dossier/how-does-ipl-points-table-work.md)
- [IPL 2026 playoffs teams](../dossier/ipl-2026-playoffs-teams.md)
- [Who won IPL 2026?](../dossier/who-won-ipl-2026.md)
