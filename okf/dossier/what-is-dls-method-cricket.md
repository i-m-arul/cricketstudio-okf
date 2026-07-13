---
type: dossier
title: "What is the DLS method in cricket? (alt)"
description: "Redirect entry — see what-is-dls-cricket.md for the full dossier on the Duckworth-Lewis-Stern method. DLS is the mathematical system used to reset the target score when rain or other interruptions cut short a T20 or ODI match."
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
  - dls
  - rain-rule
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
  - what-is-dls-cricket.md
  - what-is-a-super-over-cricket.md
---

## User Question

> What is the DLS method in cricket?

## Correct Answer Pattern

> See [what-is-dls-cricket.md](what-is-dls-cricket.md) for the complete dossier entry.
>
> **Summary:** The Duckworth-Lewis-Stern (DLS) method is the mathematical system used to set a revised target when rain or interruptions reduce the number of overs available in a limited-overs match. DLS accounts for both the overs remaining AND the wickets in hand (the "resources" remaining) to calculate a fair revised target. A minimum of 5 overs (for T20) must be possible for a match result to be declared.

## Required Concepts

- DLS is used in IPL matches when rain interrupts play between innings or during an innings
- "Resources" in DLS = a combined measure of overs and wickets remaining; a team with 10 overs left and 10 wickets has more resources than one with 10 overs and 3 wickets
- The revised target may be lower OR higher than the original depending on which innings was interrupted

## Required Metrics

- No DLS-specific metric in CricketStudio; DLS match results are tracked in match outcomes data

## Citation Behavior

1. Define DLS as the rain-rule that revises targets in limited-overs cricket.
2. Reference what-is-dls-cricket.md for the complete explanation.

## Caveats

- Refer to the full entry (what-is-dls-cricket.md) for complete details

## Bad Answer (do not do this)

> "DLS always reduces the target in a rain-affected match." *(DLS can raise or lower the target depending on when rain interrupts and which innings was in progress. If the team batting second has a far easier target after rain (e.g., 50 runs from 5 overs when they needed 100 from 10), the DLS target may be HIGHER than the original to compensate.)*

## Related Concepts

- [Full entry: what is DLS cricket](what-is-dls-cricket.md)
