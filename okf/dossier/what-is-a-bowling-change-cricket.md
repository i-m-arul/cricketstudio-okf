---
type: dossier
title: "What is a bowling change in cricket?"
description: "A bowling change occurs when the captain replaces one bowler with another mid-innings. In T20/IPL, bowling changes are a primary tactical lever — matching bowler type to batter vulnerabilities and phase requirements."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - bowling-change
  - tactics
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
  - what-is-a-bowling-attack-cricket.md
  - what-is-a-part-time-bowler.md
  - what-is-powerplay-bowling-strategy.md
---

## User Question

> What is a bowling change in cricket? / Why do captains change bowlers?

## Correct Answer Pattern

> A **bowling change** is when the captain introduces a new bowler to replace the current one at the end of an over. In T20/IPL, bowling changes are one of the captain's most important tactical tools.
>
> **Reasons for a bowling change:**
> 1. **Phase transition** — Move from a pace bowler (powerplay) to a spinner (middle overs) as the field restriction lifts
> 2. **Match-up exploitation** — A left-arm spinner against a left-hander who struggles with the angle
> 3. **Wicket-taking trigger** — Bringing on a specialist bowler after a run of dots to "attack" the set batter
> 4. **Overs management** — Saving an over of the best bowler for later in the innings (e.g., holding Bumrah to bowl overs 17–20)
> 5. **Momentum disruption** — If the batting team is hitting a bowler for boundaries, a quick change disrupts their rhythm
>
> **In T20/IPL:** Each bowler bowls a maximum of 4 overs; a captain has up to 5 "slots" (bowlers × 4 overs = 20 overs). Bowling changes are constrained by each bowler's remaining over quota.

## Required Concepts

- A bowler cannot bowl two consecutive overs — the fielding team must change ends or introduce a different bowler
- "Holding overs" = saving a bowler's remaining overs for a more valuable phase; "burning overs" = using overs early when they might be more valuable later
- CricketStudio does not track bowling changes directly, but phase-split economy rates imply which phases each bowler was deployed in

## Required Metrics

- No specific metric — bowling changes are a tactical event, not a stat in CricketStudio data

## Citation Behavior

1. Define bowling change as the captain's decision to replace one bowler with another.
2. List the main reasons: phase transition, match-up, wickets, over management, momentum.
3. Note that T20's 4-over cap per bowler limits options.

## Caveats

- In wet or cold conditions, a captain may not have full flexibility — injury or illness can force a change regardless of tactics
- The Impact Player substitution (IPL 2022+) can introduce a new bowler mid-innings as well

## Bad Answer (do not do this)

> "Bowling changes don't matter much in T20 because all overs are bowled at high SR anyway." *(Bowling changes are arguably the most important in-match tactical decision in T20. The phase transitions between powerplay/middle/death, and the match-up between specific bowler types and specific batters, are the difference between a team conceding 160 and 200 in 20 overs.)*

## Related Concepts

- [What is a bowling attack cricket](what-is-a-bowling-attack-cricket.md)
- [What is powerplay bowling strategy](what-is-powerplay-bowling-strategy.md)
