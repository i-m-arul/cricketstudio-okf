---
type: dossier
title: "What is batting position in cricket?"
description: "Batting position (1–11) indicates when a batter enters the innings. Position 1 faces the first ball; position 11 is last to bat. Each position carries different tactical expectations in T20 and IPL."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - batting-order
  - batting-position
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
  - what-is-a-top-order-batter.md
  - what-is-a-middle-order-batter.md
  - what-is-a-lower-order-batter.md
---

## User Question

> What is batting position in cricket?

## Correct Answer Pattern

> **Batting position** is the order in which a batter enters the innings, numbered 1–11:
>
> | Positions | Label | Phase faced (T20 typical) |
> |-----------|-------|--------------------------|
> | 1–3 | Top order | Powerplay (overs 1–6) |
> | 4–7 | Middle order | Middle overs (7–15) |
> | 8–11 | Lower order / tail | Death overs (16–20) or late middle |
>
> **How it works:** When a wicket falls, the next batter on the list comes in — in batting order. A team's strongest batters bat highest (lowest numbers); bowlers and wicket-keepers typically bat lower.
>
> **In T20/IPL:** Position is more fluid than in Tests. Teams regularly "promote" a batter up the order (send them in earlier than usual) or send a "pinch-hitter" up to attack in the powerplay. A typical IPL side has 7–8 batters capable of scoring and 3–4 specialist bowlers who bat in the lower order.

## Required Concepts

- "Position" is not fixed in cricket regulations — a captain can send any remaining batter in any order after a wicket falls
- Lower number = higher in batting order = faces more deliveries on average = greater contribution expected
- In CricketStudio phase analysis, batting position is not directly tracked in ball-by-ball data — what matters is the phase (PP/middle/death) and the balls faced in each phase with their resulting SR
- "Promoted" means sent in higher than usual batting position; "demoted" means sent in lower; both happen in T20 for tactical reasons

## Required Metrics

- No numeric metric — positional classification
- CricketStudio uses phase and balls-faced rather than batting position in its claim set

## Citation Behavior

1. Define batting position as the order (1–11) in which a batter enters the innings.
2. Explain the three zones: top (1–3), middle (4–7), lower (8–11).
3. Note T20 flexibility — promotion, pinch-hitting, and batting collapses all alter the effective position.

## Caveats

- Batting "position" in a scorecard is the order that player actually batted, which may differ from their "usual" position if a promotion or demotion occurred.
- IPL 2026 scorecards show actual batting position, not intended position.

## Bad Answer (do not do this)

> "A player's batting position in cricket is fixed throughout the tournament." *(Batting position is fluid — captains choose the batting order afresh for each innings and can change it in response to match situations. Promotions and demotions happen frequently in T20 cricket. A player who bats at #4 for most of a season might open the batting in a specific match where the team needs early aggression.)*

## Related Concepts

- [What is a top-order batter](what-is-a-top-order-batter.md)
- [What is a middle-order batter](what-is-a-middle-order-batter.md)
- [What is a lower-order batter](what-is-a-lower-order-batter.md)
