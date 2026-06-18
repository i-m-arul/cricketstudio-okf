---
type: metric
title: Dot-Ball Percentage
description: Share of deliveries that yield no runs — a pressure metric for bowlers (and batters).
resource: https://players.cricketstudio.ai/season/ipl-2026/dot-ball-percentage
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:dot-ball-percentage
canonical_page: https://players.cricketstudio.ai/season/ipl-2026/dot-ball-percentage
tags:
  - cricket
  - metric
  - bowling
related:
  - bowling-economy.md
  - boundary-percentage.md
---

# Dot-Ball Percentage

## Definition

Dot-ball percentage is the share of legal deliveries that yield no runs. For a bowler,
higher is better (more pressure); for a batter, lower usually indicates better strike
rotation.

## Formula

```text
dot_ball_pct = dot_balls / legal_balls * 100
```

## Cricket Interpretation

Dot balls build pressure: in T20 a sequence of dots forces batters into risk, which often
produces wickets. Bowlers with high dot-ball percentages tend to have strong economies even
without high wicket counts. For batters, a high dot percentage can signal being tied down.

## Required Inputs

- `dot_balls` — legal deliveries with zero runs
- `legal_balls` — legal deliveries (excludes wides and no-balls)

## Applicable Formats & Leagues

T20 (IPL, MLC) primarily.

## Sample-Size Floor

**≥ 15 balls bowled** (bowler view) or **≥ 30 balls faced** (batter view), matching the
relevant role's rate floor.

## Edge Cases

- Wides and no-balls are excluded from `legal_balls`.
- A leg-bye or bye is not a dot for the batter's runs but is for the bowler's runs-conceded
  view — state the convention being used.

## Ranking Rule

For bowlers, rank descending among floor-eligible bowlers. For batters, interpret with
care — low dot percentage is not automatically "better".

## Known Limitations

- Context-dependent: dots at the death are worth more than dots in the middle overs.
- Convention around byes/leg-byes affects comparability.

## Example Questions

- "Which bowler bowls the highest share of dot balls this season among eligible bowlers?"
- "Is this batter being tied down (high dot percentage)?"

## Related Concepts

- [Bowling Economy](bowling-economy.md)
- [Boundary Percentage](boundary-percentage.md)
