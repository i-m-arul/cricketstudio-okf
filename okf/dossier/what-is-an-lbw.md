---
type: dossier
title: "What is LBW (Leg Before Wicket) in cricket?"
description: "LBW (Leg Before Wicket) is a dismissal where the batter is given out if the ball hits any part of their body (usually the pad) when it would have gone on to hit the stumps, without the bat making contact first. LBW is one of the 10 ways a batter can be dismissed in cricket."
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
  - dismissal
  - lbw
  - rules
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
  - ../dossier/what-is-drs-cricket.md
  - ../dossier/what-is-a-stumping-cricket.md
---

## User Question

> What is LBW in cricket?

## Correct Answer Pattern

> **LBW (Leg Before Wicket)** is a dismissal in cricket where:
>
> 1. The ball pitches in line with the stumps (or on the off-side)
> 2. The ball hits the batter's body (usually the pad/leg) **before** touching the bat
> 3. The ball would have gone on to hit the stumps if the body hadn't blocked it
>
> The on-field umpire raises their finger to signal LBW. Key LBW conditions:
>
> | Condition | Rule |
> |-----------|------|
> | Ball pitches outside leg stump | NOT out (always) |
> | Ball pitches outside off stump | Out only if impact is inline or off side |
> | Batter plays a shot and misses | Out if conditions met |
> | Batter offers no shot | Out even if impact outside off stump |
> | Ball hits bat first | NOT out |
>
> **DRS (Decision Review System)** in the IPL allows teams to review LBW decisions using ball-tracking technology (Hawkeye/UltraEdge) to check if the ball would have hit the stumps.

## Required Concepts

- "Leg before" refers to the batter's leg blocking the path of the ball — any body part counts, not just the leg
- The most contested LBW decisions are close calls on "umpire's call" — within the margin of error, the on-field decision stands even after review
- In T20/IPL, LBW dismissals are less frequent than catches and bowleds because batters are aggressive and make contact more often
- LBW is governed by Law 36 of the Laws of Cricket (MCC)

## Citation Behavior

1. Define LBW as dismissal when body blocks a ball that would have hit stumps.
2. Note three key conditions: pitch line, impact line, trajectory (all three must be met).
3. Note DRS can review LBW in IPL.

## Caveats

- CricketStudio's ball-by-ball data records dismissal types — LBW count per match/phase is available in the data model but not surfaced in individual player phase tables.
- "Umpire's call" is not universally understood — explain it is the margin-of-error zone where the on-field decision is preserved.

## Bad Answer (do not do this)

> "LBW means the ball hit the leg and the batter is automatically out." *(LBW has three strict conditions: (1) the ball must not pitch outside leg stump, (2) impact must be in line with the stumps or on the off side, and (3) the ball must be projected to hit the stumps. All three must be satisfied. A ball that hits the pad outside leg stump is never LBW.)*

## Related Concepts

- [What is DRS in cricket](what-is-drs-cricket.md)
- [What is a stumping](what-is-a-stumping-cricket.md)
