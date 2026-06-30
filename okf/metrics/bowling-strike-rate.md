---
type: metric
title: Bowling Strike Rate
description: Balls bowled per wicket — how quickly a bowler takes wickets.
resource: https://players.cricketstudio.ai/season/ipl-2026/bowling-strike-rate
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:bowling-strike-rate
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/bowling-strike-rate
tags:
  - cricket
  - metric
  - bowling
related:
  - bowling-economy.md
  - ../methodology/sample-size-floors.md
---

# Bowling Strike Rate

## Definition

Bowling strike rate measures how many balls a bowler delivers per wicket taken. Lower is
better — it reflects wicket-taking threat rather than containment.

## Formula

```text
bowling_strike_rate = balls_bowled / wickets
```

## Cricket Interpretation

A strike bowler with a low bowling strike rate breaks partnerships and creates pressure,
even if their economy is higher. In T20, captains often trade economy for wickets at key
moments. Read this metric alongside [Bowling Economy](bowling-economy.md).

## Required Inputs

- `balls_bowled` — legal deliveries bowled
- `wickets` — wickets credited to the bowler

## Applicable Formats & Leagues

All limited-overs formats and Tests; here scoped to T20 (IPL, MLC).

## Sample-Size Floor

**≥ 15 balls bowled** as a rate floor. In practice, bowling strike rate also needs at least
one wicket to be defined.

## Edge Cases

- **Zero wickets:** the strike rate is undefined — report as "no wickets in scope", not
  infinity.
- Run-outs are not credited as bowler wickets.

## Ranking Rule

Rank ascending among floor-eligible bowlers with at least one wicket. Tiebreak by lower
economy.

## Known Limitations

- Says nothing about runs leaked between wickets — pair with economy.
- Highly sensitive to small wicket counts.

## Example Questions

- "Which bowler strikes most frequently in IPL 2026 among eligible bowlers?"
- "How many balls per wicket does this bowler average this season?"

## Related Concepts

- [Bowling Economy](bowling-economy.md)
- [Purple Cap](purple-cap.md)
