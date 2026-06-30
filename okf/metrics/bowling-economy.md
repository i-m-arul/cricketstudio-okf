---
type: metric
title: Bowling Economy
description: Runs conceded per over — the core measure of how restrictive a bowler is.
resource: https://players.cricketstudio.ai/season/ipl-2026/economy
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:bowling-economy
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/economy
tags:
  - cricket
  - metric
  - bowling
related:
  - death-overs-economy.md
  - bowling-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# Bowling Economy

## Definition

Bowling economy measures how many runs a bowler concedes per over. Lower is better. It is
the primary measure of containment in limited-overs cricket.

## Formula

```text
economy = runs_conceded / overs_bowled
        = (runs_conceded * 6) / balls_bowled
```

## Cricket Interpretation

Economy must be read against phase. An economy of 8.0 is poor in the powerplay but good at
the death, where batters attack and yorkers leak boundaries less than full tosses. Always
state the phase or note that it is a full-innings figure.

## Required Inputs

- `runs_conceded` — runs off the bowler (including wides/no-balls per scoring convention)
- `balls_bowled` — legal deliveries bowled

## Applicable Formats & Leagues

T20 and ODIs (IPL, MLC); central to T20 bowling evaluation.

## Sample-Size Floor

**≥ 15 balls bowled** in the scope before economy is treated as a rankable rate. See
[Sample-Size Floors](../methodology/sample-size-floors.md).

## Edge Cases

- Conceding conventions for extras follow CricketStudio's ball-by-ball capture.
- A bowler with one tidy over has a flattering economy — the floor exists to prevent this.
- Phase economy requires the phase floor.

## Ranking Rule

Rank ascending (lower is better) among floor-eligible bowlers. Tiebreak by more balls
bowled, then by more wickets.

## Known Limitations

- Economy ignores wickets — a containing bowler who never takes wickets may still let a
  game drift. Pair with [Bowling Strike Rate](bowling-strike-rate.md).
- Phase and match situation strongly affect interpretation.

## Example Questions

- "What is Jasprit Bumrah's IPL 2026 economy, and over how many overs?"
- "Who is the most economical bowler at the death this season among eligible bowlers?"

## Related Concepts

- [Death-Overs Economy](death-overs-economy.md)
- [Bowling Strike Rate](bowling-strike-rate.md)
- [Dot-Ball Percentage](dot-ball-percentage.md)
