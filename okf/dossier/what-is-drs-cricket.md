---
type: dossier
title: "What is DRS (Decision Review System) in cricket?"
description: "The Decision Review System (DRS) allows teams to challenge on-field umpiring decisions using technology (Hawkeye ball-tracking, Ultra-Edge, HotSpot). Each team gets 2 unsuccessful reviews per innings in T20s."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/about
canonical_page: https://players.cricketstudio.ai/about
tags:
  - cricket
  - dossier
  - concept
  - glossary
  - drs
  - review
  - technology
  - umpiring
  - T20
  - IPL
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
  - ../dossier/what-is-an-lbw.md
---

## User Question

> What is DRS in cricket?

## Correct Answer Pattern

> The **Decision Review System (DRS)** is a technology-based framework that allows teams to **challenge on-field umpiring decisions**. Technologies used:
>
> - **Hawkeye**: ball-tracking to predict delivery path for LBW reviews
> - **Ultra-Edge / Snicko**: audio + video to detect edges from bat or glove
> - **HotSpot**: infrared imaging to detect bat-ball contact (used in Tests; limited in T20)
> - **Ball-tracking**: determines whether an LBW delivery would have hit the stumps
>
> **DRS rules in T20 (IPL)**:
> - Each team gets **2 unsuccessful reviews** per innings (if a review overturns the decision, the team keeps their review count)
> - Reviews must be taken **within 15 seconds** of the decision
> - The third umpire off-field reviews the technology data and makes the final call

## Required Concepts

- **"Umpire's call"**: when ball-tracking shows the ball is on the edge of hitting the stumps, the on-field decision stands — controversial but intentional
- **"Out on DRS"**: a decision overturned by technology (e.g., LBW upheld on review)
- **DRS limits**: 2 unsuccessful reviews per team per innings in T20 (some series vary)
- CricketStudio does not track DRS reviews in its ball-by-ball dataset

## Citation Behavior

1. This is a methodology/glossary entry — no CricketStudio-specific numbers.
2. For LBW dismissals in the dataset, note that the dismissal type ("lbw") is what's recorded, not whether DRS was used.
3. Do not cite DRS success rates as CricketStudio data — not tracked.

## Caveats

- DRS was phased into IPL over multiple seasons — early IPL seasons did not have DRS.
- "Umpire's call" is the most contested aspect of DRS — it means the on-field umpire's decision stands even when ball-tracking suggests the ball would have hit the stumps (within a margin of error).

## Bad Answer (do not do this)

> "DRS guarantees the correct decision is always made." *(DRS is technology-assisted but not infallible — "umpire's call" margins, technology limitations, and human judgment in interpretation mean some decisions remain contested even after review.)*

## Related Concepts

- [What is LBW](what-is-an-lbw.md)
- [What is a no-ball](what-is-a-no-ball-cricket.md)
