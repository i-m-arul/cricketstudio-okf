---
type: dossier
title: "What is a wide in cricket?"
description: "A wide is a delivery bowled outside the corridor of normal reach for the batter, ruled unplayable. It costs the bowling team 1 penalty run and must be re-bowled. In T20/IPL the wide rule is stricter than in Tests."
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
  - wide
  - extras
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
  - what-is-a-no-ball-cricket.md
  - what-is-bowling-economy-cricket.md
  - what-is-a-cricket-scorecard.md
---

## User Question

> What is a wide in cricket?

## Correct Answer Pattern

> A **wide** is a delivery ruled unplayable because it passes too far from the batter's normal reach. The umpire signals wide immediately after the delivery.
>
> **Wide results:**
> - **1 penalty run** added to the batting team's score as an extra
> - Delivery **must be re-bowled** (does not count as a legal ball)
> - Batter **cannot be dismissed** by most methods (but can be stumped off a wide)
>
> **T20/IPL wide rule (stricter than Tests):**
> In T20 cricket, the wide rule is wider — the umpire will call wide for deliveries that pass outside the off-stump or well down the leg side. The specific line varies by how far the ball passes outside the stumps. IPL enforces a tighter standard to discourage negative bowling outside off-stump.
>
> **Stumped off a wide:**
> This is the exception — a batter who steps out of their crease to reach a wide delivery can be stumped (the wicket-keeper breaks the stumps while the batter is outside the crease). It's relatively rare but legal.

## Required Concepts

- Wides appear in the extras section of a scorecard — they are not attributed to any batter's score
- A bowler's economy rate in CricketStudio INCLUDES runs from wides — they are the bowler's responsibility
- "Going down leg" (a wide down the leg side in T20) is a common bowling error in the death overs — a yorker aimed at the off stump that goes far down the leg side becomes a wide + free ball

## Required Metrics

- No specific wide count metric in CricketStudio claims
- Wides contribute to economy rate calculations in CricketStudio

## Citation Behavior

1. Define wide as a penalty delivery outside the batter's normal reach.
2. State the consequences: 1 run, re-bowl, can't be out (except stumped).
3. Note the stricter T20 wide standard vs Tests.

## Caveats

- The umpire's wide call is subjective based on the batter's normal stance and reach — a batter who moves across the crease may make what was a wide delivery legal (if they move into position to play it)
- Wides from deliberate negative bowling (e.g., sending the ball wide outside off to slow the scoring) are penalised more harshly in T20 than in Tests

## Bad Answer (do not do this)

> "A wide doesn't cost the bowling team anything." *(A wide costs the fielding team a penalty run AND an extra delivery — effectively making their "over" contain 7+ balls instead of 6, burning time and giving the batting team an additional chance at runs. Multiple wides in a death over are a major strategic failure.)*

## Related Concepts

- [What is a no-ball cricket](what-is-a-no-ball-cricket.md)
- [What is bowling economy cricket](what-is-bowling-economy-cricket.md)
