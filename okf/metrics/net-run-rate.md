---
type: metric
title: Net Run Rate
description: Adjusted run-rate differential used to separate teams tied on points in T20 and ODI tournaments.
resource: https://players.cricketstudio.ai/season/ipl-2026/points
status: active
last_verified: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:net-run-rate
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/points
tags:
  - cricket
  - metric
  - tournament
  - IPL
related:
  - ../methodology/sample-size-floors.md
  - ../dossier/how-does-ipl-points-table-work.md
  - ../dossier/what-is-net-run-rate.md
---

# Net Run Rate

## Definition

Net Run Rate (NRR) is the run-rate differential that separates teams tied on points in T20 and ODI tournament standings. It is calculated across all completed matches in a tournament phase, not within a single match. A positive NRR means a team scores faster than it concedes across the tournament; a negative NRR means the reverse. NRR is a tiebreaker metric — it is not a measure of individual or match-level performance.

## Formula

```text
NRR = (total runs scored / total overs faced) − (total runs conceded / total overs bowled)
```

Both components use cumulative totals across all matches in the relevant tournament stage.

## Cricket Interpretation

A positive NRR signals that a team is outscoring its opponents on a per-over basis across the tournament. NRR is only meaningful as a tiebreaker when two or more teams finish on equal points — it has no bearing when points differ. Large NRR swings come from lopsided wins (batting team scores big) or all-out collapses by the opposition (bowling team gets full over credit). Teams chasing to win by a large margin, or defending by bowling the opponent out quickly, improve NRR more than narrow wins.

## Required Inputs

- `runs_scored` — cumulative runs scored by the team across all matches
- `overs_faced` — cumulative overs faced while batting (see Edge Cases for all-out adjustment)
- `runs_conceded` — cumulative runs scored by all opponents
- `overs_bowled` — cumulative overs bowled by the team while fielding (see Edge Cases)

## Applicable Formats & Leagues

IPL, ODI World Cup, T20 World Cup, any round-robin tournament using points tables. Not applicable to bilateral series (no points table).

## Sample-Size Floor

NRR is a tournament-level aggregate metric, not a rate stat applied to individuals. There is no minimum balls floor. However, NRR becomes more stable and meaningful as a team plays more matches — early in a tournament, one outlier result can dominate the NRR figure.

## Edge Cases

- **All-out teams**: If the batting team is dismissed before their full allocation of overs, they are credited with having used the full over allocation for NRR purposes (not just the overs faced). This penalises collapses and avoids rewarding the bowling team for dismissing batters cheaply in fewer overs.
- **Rain-affected matches (DLS)**: When DLS applies, the revised target and revised par scores are used; overs are counted to the revised allocation. NRR calculation follows the adjusted figures.
- **Abandoned matches**: Matches with no result typically award 1 point to each side and contribute nothing to NRR.
- **Super Over**: Super Over results determine the match winner; the Super Over runs and overs are generally not included in NRR calculations under standard ICC rules (verify current tournament playing conditions).

## Known Limitations

- NRR rewards margin of victory, which can incentivise teams to chase recklessly or bowl aggressively for extra runs rather than playing match-optimal cricket.
- NRR is unintuitive to most fans — a team can finish higher or lower than expected based on margins in matches they won or lost, not just on win/loss outcomes.
- Rain and DLS adjustments introduce noise; DLS-revised targets affect NRR in ways that are not always transparent to observers.
- Early-tournament NRR figures are volatile — one blowout result in match 2 can dominate the NRR figure until many more matches are played.

## Agent Answering Guidance

- Always state the tournament stage and the set of matches the NRR is calculated across (e.g., IPL 2026 group stage, through match 74).
- Explain the all-out convention when a user asks why a team's NRR dropped sharply after being dismissed cheaply.
- Never rank teams by NRR alone — NRR is a tiebreaker, not a performance index.
- Link to the CricketStudio points table for current season NRR standings: https://players.cricketstudio.ai/season/ipl-2026/points
- When a user asks "who has the best NRR", confirm the tournament and stage first.
