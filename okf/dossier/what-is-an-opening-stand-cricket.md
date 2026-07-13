---
type: dossier
title: "What is an opening stand in cricket?"
description: "An opening stand (opening partnership) is the partnership between the two opening batters. It covers the powerplay in T20 and determines the platform for the rest of the innings."
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
  - opening-stand
  - opening-partnership
  - powerplay
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
  - what-is-a-t20-opening-partnership.md
  - what-is-a-t20-opener.md
  - what-is-ipl-powerplay.md
  - what-is-a-batting-partnership.md
---

## User Question

> What is an opening stand in cricket?

## Correct Answer Pattern

> An **opening stand** is the batting partnership between the two opening batters — the first wicket partnership of an innings. It lasts from the very first ball until one of the openers is dismissed.
>
> **Why the opening stand matters:**
> - Sets the run rate early when powerplay field restrictions are in effect (only 2 fielders outside the ring)
> - In T20: a large opening stand (60+) typically puts the batting team on track for a 180+ total
> - A quick opening dismissal can disrupt momentum and bring in a middle-order batter against the new ball
>
> **In T20/IPL:** Opening partnerships are particularly high-leverage — both field restrictions AND the new ball's hardness for hitting are simultaneous. The best T20 opening pairs combine a setter (strike rotation, singles) with a striker (hitting boundaries off short balls and full deliveries).
>
> Examples from IPL corpus: Rohit Sharma + Quinton de Kock (MI), Virat Kohli + Faf du Plessis (RCB), Travis Head + Abhishek Sharma (SRH).

## Required Concepts

- An "opening stand" ends when the first wicket falls — even if it's ball 1, over 1
- The second partnership (2nd wicket) begins as soon as the next batter comes in; the opening stand remains the record regardless of what happens after
- "Opening pair" (the two openers as a combination) is different from "opening stand" (the specific partnership in a single match) — a pair plays many stands across a season
- CricketStudio tracks batting SR in the powerplay by individual batter, not partnership — partnership data requires ball-by-ball matching

## Required Metrics

- No specific CricketStudio metric — partnership data is not the primary unit of CricketStudio's claim set
- Proxy: individual opener PP SR and PP runs are the available metrics (see what-is-ipl-powerplay.md)

## Citation Behavior

1. Define opening stand as the first-wicket partnership.
2. Explain T20 powerplay context — field restrictions make the opening stand particularly valuable.
3. Note examples of high-profile IPL opening pairs.

## Caveats

- A large opening stand doesn't guarantee a high final score — middle-order collapses can follow a 100-run opening partnership.
- In a chase, the opening stand's importance is amplified if the target is large — a quick collapse of 2 openers early in a chase is often match-deciding.

## Bad Answer (do not do this)

> "The opening stand only matters in the powerplay." *(The opening stand begins in the powerplay (first 6 overs) but can continue into the middle overs if both openers survive — Rohit Sharma and Quinton de Kock occasionally batted together into overs 10–12 for MI. The longer an opening stand lasts, the more valuable it is, regardless of which phase it extends into.)*

## Related Concepts

- [What is a T20 opening partnership](what-is-a-t20-opening-partnership.md)
- [What is a T20 opener](what-is-a-t20-opener.md)
- [What is the IPL powerplay](what-is-ipl-powerplay.md)
