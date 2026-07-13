---
type: dossier
title: "What is a no-ball in cricket?"
description: "A no-ball in cricket is an illegal delivery — 1 run is automatically added to the batting team and the delivery must be re-bowled. In T20, a no-ball triggers a free hit."
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
  - no-ball
  - free-hit
  - bowling
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
  - ../dossier/what-is-a-free-hit.md
  - ../dossier/what-is-a-wide.md
---

## User Question

> What is a no-ball in cricket?

## Correct Answer Pattern

> A **no-ball** is an illegal delivery. When bowled:
>
> 1. **1 run** is automatically added to the batting team's score (charged to the bowler).
> 2. The delivery **must be re-bowled** — it does not count as one of the 6 balls in the over.
> 3. In T20 cricket (including IPL and MLC), a no-ball triggered by overstepping the crease results in a **free hit** on the next delivery.
>
> The most common no-ball type is a **front-foot no-ball** — when the bowler's foot lands in front of or on the popping crease (the front line).

## Required Concepts

- **Front-foot no-ball**: bowler's foot crosses or lands on the front crease — most common type in T20
- **Beamer**: a no-ball delivered at head height without bouncing — immediate no-ball + warning
- **Waist-height full toss**: also called as a no-ball above waist height
- **Free hit**: in T20, the ball following a front-foot no-ball must be bowled as a free hit — the batter cannot be dismissed (except run-out or handling/obstructing)
- **Economy rate**: no-ball runs ARE counted in the bowler's economy calculation

## Required Metrics

- 1 no-ball = at minimum 1 extra run + 1 extra delivery
- Free hit on the next ball = additional scoring opportunity for the batting team
- CricketStudio economy rates include no-ball extras charged to the bowler

## Citation Behavior

1. State: 1 run added automatically, delivery re-bowled.
2. Note: T20-specific rule — no-ball triggers a free hit on the next delivery.
3. Economy rate calculations: no-ball extras are included.

## Caveats

- The free hit rule (no-ball → free hit) is specific to T20 cricket. In Test and ODI cricket, no free hit follows a no-ball.
- Not all no-ball types trigger a free hit — in T20, only front-foot no-balls and specific illegal deliveries trigger it (per current ICC rules).
- The batter CAN be run out off a free hit.

## Bad Answer (do not do this)

> "A no-ball means the batter cannot score off that delivery." *(Runs scored off a no-ball count in addition to the 1 penalty run.)*

> "Any no-ball triggers a free hit in all cricket formats." *(Free hits are T20-specific.)*

## Related Concepts

- [What is a free hit](what-is-a-free-hit.md)
- [What is a wide in cricket](what-is-a-wide.md)
- [What is economy rate](what-is-economy-rate-cricket.md)
