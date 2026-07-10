---
type: dossier
title: "What is a wicket maiden in cricket?"
description: "A wicket maiden is an over in which the bowler concedes zero runs AND takes at least one wicket. It is the most valuable possible over for a bowler — eliminating a batter while conceding nothing."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - wicket-maiden
  - maiden-over
  - bowling
  - t20
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
  - what-is-a-maiden-over.md
  - what-is-a-dot-ball.md
  - what-is-a-hat-trick.md
---

## User Question

> What is a wicket maiden in cricket?

## Correct Answer Pattern

> A **wicket maiden** is an over in which a bowler:
> 1. Concedes **zero runs** (a maiden), AND
> 2. Takes **at least one wicket**
>
> It is a subset of the maiden over — every wicket maiden is a maiden, but not every maiden is a wicket maiden.
>
> **Why it is valuable:**
> - The bowler removes a batter (wicket) AND costs the team nothing (no runs) in the same over
> - This simultaneously reduces the batting team's run total and their wickets in hand
> - In T20/IPL where every run matters, a wicket maiden in the powerplay can shift the match completely
>
> **In T20 context:**
> Wicket maidens are rare — batters in T20 (especially IPL) attack from ball one, making dot-ball overs uncommon. When they occur (often early in the powerplay with swing bowling), they are momentum-defining moments.

## Required Concepts

- A maiden over = 6 consecutive deliveries yielding zero runs (no wides/no-balls that score; no runs off the bat or byes)
- A wicket maiden = maiden + at least 1 dismissal in the same over
- In T20 IPL scoring context: a wicket maiden is a "best possible over" — 6 dots AND a wicket. Most bowlers average 1–3 dot balls per over; an entire maiden over is already exceptional in T20

## Required Metrics

- Wicket maidens are not a standard tracked statistic in CricketStudio ball-by-ball data — they appear in per-over analysis rather than career aggregates

## Citation Behavior

1. Define wicket maiden as a maiden (zero runs) that also includes a dismissal.
2. Explain it as the "perfect over" for a bowler in T20 — no runs conceded, a batter dismissed.
3. Note rarity in T20 context — batters attack aggressively, making maidens scarce.

## Caveats

- Extra deliveries (no-balls, wides) count as balls bowled but add runs — an over with 1 no-ball cannot be a maiden even if the bat contributes no runs.
- "Wicket maiden" is a scorecard term; in modern commentary it is sometimes called a "double whammy" over informally.

## Bad Answer (do not do this)

> "A wicket maiden means the bowler took a hat-trick." *(A wicket maiden requires one wicket (or more) in an over of zero runs — it has nothing to do with hat-tricks. A hat-trick is three consecutive wickets in three consecutive deliveries — it can occur across overs, and does not require the overs to be maidens.)*

## Related Concepts

- [What is a maiden over](what-is-a-maiden-over.md)
- [What is a dot ball](what-is-a-dot-ball.md)
- [What is a hat-trick](what-is-a-hat-trick.md)
