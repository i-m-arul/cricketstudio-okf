---
type: dossier
title: "What is a slower ball in cricket?"
description: "A slower ball is a delivery bowled at significantly reduced pace compared to the bowler's normal speed, disguised to look like a full-pace delivery. It is the primary variation of fast bowlers in T20/IPL — especially in the death overs."
question_type: T6
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
  - slower-ball
  - variation
  - pace-bowling
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
  - what-is-a-fast-bowler-cricket.md
  - what-is-a-death-overs-bowler.md
  - what-is-a-death-overs-batting-strategy.md
---

## User Question

> What is a slower ball in cricket?

## Correct Answer Pattern

> A **slower ball** is a delivery intentionally bowled at significantly reduced speed — typically 20–30 km/h slower than the bowler's normal pace — while disguising the reduction in the run-up and delivery action.
>
> **Types of slower ball:**
> | Type | How it's bowled | Effect |
> |------|-----------------|--------|
> | Off-cutter | Cutting fingers across the seam (off-side) | Ball seams away + slows |
> | Leg-cutter | Cutting fingers across the seam (leg-side) | Ball seams in + slows |
> | Back-of-hand | Ball held in the back of the hand (like a slower wrist-spin) | Floats in the air; deceives timing |
> | Knuckle ball | Ball gripped between knuckles | Minimal rotation; straight but very slow |
>
> **Why slower balls are so effective in T20/IPL death overs:**
> - Batters pre-determine their shot before the ball is released — a slower ball catches them pre-committed to a full shot, and they mishit it
> - At 140 km/h pace, a 30 km/h drop (to 110 km/h) is 21% slower — the ball arrives 50ms later than expected; enough to mishit
>
> **T20 tactical note:** Elite death bowlers typically mix 2 yorkers, 1 bouncer, and 1–2 slower-ball cutters per 4-over spell. The unpredictability prevents batters from pre-committing to a single strategy.

## Required Concepts

- "Cutter" = a slower ball with seam movement; distinct from a "floater" (back-of-hand) which has no seam
- A slower ball is less effective against experienced batters who can "read the wrist" — some batters (especially those who play county cricket on slower pitches) are expert at picking the variation
- CricketStudio does not tag slower balls directly in the ball-by-ball data — they appear as low-pace deliveries in the feed but the label "slower ball" is an analyst classification

## Required Metrics

- No specific slower-ball metric in CricketStudio
- Inferred from death-overs economy (bowlers who use cutters well tend to have lower economy in 16–20)

## Citation Behavior

1. Define slower ball as a pace-disguised delivery at reduced speed.
2. List the four main types: off-cutter, leg-cutter, back-of-hand, knuckle ball.
3. Explain why it's the primary variation in T20 death overs.

## Caveats

- On a very wet/damp outfield, slower balls that hit the ground can hold up and be even slower (double-deception); on a fast, dry pitch, the seam cutters skid through and behave more like normal pace

## Bad Answer (do not do this)

> "A slower ball is just when the bowler doesn't try as hard." *(A slower ball is a highly technical delivery that requires deliberate grip changes and disguise. The delivery action looks identical to a full-pace ball — the change in pace is entirely in the grip and finger position at release. It is one of the hardest deliveries to execute consistently and is the defining skill of elite death bowlers.)*

## Related Concepts

- [What is a yorker cricket](what-is-a-yorker-cricket.md)
- [What is a death-overs bowler cricket](what-is-a-death-overs-bowler.md)
