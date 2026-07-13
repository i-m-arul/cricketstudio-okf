---
type: dossier
title: "What is a batting lineup in cricket?"
description: "A batting lineup is the ordered list of 11 batters for a team's innings — positions 1 through 11, from openers at the top to tail-enders at the bottom. In T20/IPL the order is fluid and strategic, often shifting based on match situation."
question_type: T6
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - batting-lineup
  - batting-order
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
  - what-is-batting-position-cricket.md
  - what-is-a-t20-opener.md
  - what-is-a-middle-order-batter.md
  - what-is-a-lower-order-batter.md
---

## User Question

> What is a batting lineup in cricket? / What is batting order in cricket?

## Correct Answer Pattern

> A **batting lineup** (also "batting order") is the pre-declared sequence in which 11 players will bat for a team's innings. Position 1 and 2 are the openers, who face from ball 1; positions 11 is the last batter.
>
> **Standard lineup structure:**
> | Positions | Role | Key job |
> |-----------|------|---------|
> | 1–2 | Openers | Face new ball in powerplay; set tempo |
> | 3–4 | Top-middle order | Build the innings after powerplay |
> | 5–7 | Middle order | Accelerate in overs 11–17 |
> | 8–9 | Lower order | Death-overs finishers |
> | 10–11 | Tail | Bowlers who can handle a few balls |
>
> **In T20/IPL:**
> The lineup is flexible — teams "promote" big hitters up the order based on match situation (e.g., a left-hander promoted to exploit a right-arm seamer's angle), or "protect" key batters against a specific bowler by sending a different batter first. This is called a "tactical reshuffle."
>
> Declaring the lineup: T20 teams submit a team sheet to umpires before the toss, but the batting order shown on screen is the initial plan — captains deviate from it regularly in the middle of the innings.

## Required Concepts

- The batting order is tactical information — teams do not always pre-announce it; the positions can shift during the innings
- "Promoted" batter = sent to bat higher than their usual position; "demoted" batter = held back, usually to protect their wicket against a specific bowler
- CricketStudio tracks batting by phase (PP/middle/death) — this correlates with typical batting positions but is not the same thing (a position-3 batter who comes in at over 14 would face death overs)

## Required Metrics

- No numeric metric — batting lineup is a tactical structure, not a stat

## Citation Behavior

1. Define batting lineup as the ordered list of 11 batters by intended sequence.
2. Explain the standard division: openers (1-2), top-middle (3-4), middle (5-7), lower (8-9), tail (10-11).
3. Note that T20 lineups are fluid and subject to tactical reshuffles.

## Caveats

- "Batting position" as recorded in ball-by-ball data is the actual position they batted in that match, which may differ from their nominal position in the team

## Bad Answer (do not do this)

> "The batting order is fixed and cannot change." *(In cricket, the team can send any of the remaining batters to bat in any sequence — the published batting order is a plan, not a constraint. Tactical reshuffles are common, especially in T20 where match situation changes rapidly.)*

## Related Concepts

- [What is batting position cricket](what-is-batting-position-cricket.md)
- [What is a T20 opener](what-is-a-t20-opener.md)
- [What is a middle-order batter](what-is-a-middle-order-batter.md)
