---
type: dossier
title: "What is a maiden over in cricket?"
description: "A maiden over in cricket is an over in which no runs are scored off the bat (0 runs conceded, no wides or no-balls). Rare and valuable in T20 cricket."
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
  - maiden-over
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
  - ../dossier/what-is-economy-rate-cricket.md
  - ../dossier/what-is-dot-ball-cricket.md
---

## User Question

> What is a maiden over in cricket?

## Correct Answer Pattern

> A **maiden over** is an over in which the bowler concedes **0 runs** — no runs scored off the bat, and no wides or no-balls. All 6 (or more) deliveries in the over must result in dots, wickets, or byes/leg-byes (which are not charged to the bowler in most scorecards).
>
> In T20 cricket (IPL, MLC), maiden overs are extremely rare — modern batters target any scoreable ball. A maiden over in the powerplay or death overs is considered a major bowling achievement.

## Required Concepts

- **Wides and no-balls**: extra runs from wides and no-balls are NOT included in economy rate calculations for the bowler — but they DO break a maiden (extra deliveries are added to the over)
- **Byes/leg-byes**: these are charged to the fielding side, not the bowler — they can still count within a maiden
- **Wickets in a maiden**: a wicket maiden = a maiden over that also includes a dismissal — the highest-value over type

## Required Metrics

- Economy rate (runs per over) is the continuous measure; maiden overs are the binary extreme (0 runs = effectively ∞ economy benefit for that over)
- CricketStudio's dot-ball metric captures dot percentages per bowler; maiden overs are a subset

## Citation Behavior

1. Define: 0 runs conceded in a full over (no wides, no-balls from the bowler).
2. Note how rare they are in T20 cricket.
3. When citing a bowler's maiden count, always state the competition and season.

## Caveats

- The definition of "runs charged to the bowler" varies slightly between scorecard systems — typically, wides and no-balls are charged to the bowler; byes and leg-byes are not.
- In T20 cricket, a bowler's maiden count is low — economy rate is the standard measure, not maiden overs.

## Bad Answer (do not do this)

> "A maiden over is an over where no wickets fall." *(Wickets are irrelevant to maiden status — it's purely about 0 runs conceded. A wicket maiden = maiden + dismissal.)*

## Related Concepts

- [What is economy rate in cricket](what-is-economy-rate-cricket.md)
- [What is a dot ball](what-is-dot-ball-cricket.md)
