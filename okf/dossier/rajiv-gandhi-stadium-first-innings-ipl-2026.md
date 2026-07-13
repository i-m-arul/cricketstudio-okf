---
type: dossier
title: "Rajiv Gandhi International Stadium — first-innings scoring in IPL 2026"
description: "Rajiv Gandhi International Stadium (Hyderabad): average first-innings score 189 across 7 IPL 2026 fixtures (range 159–255). Chase win rate: 71% (5/7). Strong chasing venue."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/venues/rajiv-gandhi-international-stadium
canonical_page: https://players.cricketstudio.ai/venues/rajiv-gandhi-international-stadium
tags:
  - cricket
  - dossier
  - venue
  - IPL
  - ipl-2026
  - rajiv-gandhi-international-stadium
  - hyderabad
  - first-innings
  - chase
status: active
last_verified: "2026-07-08"
timestamp: "2026-07-08"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
dataset_version: "2026-06-11"
provenance:
  source: CricketStudio derived claim layer — IPL 2026 dataset
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
related:
  - ../scorebook/ipl/venues/rajiv-gandhi-international-stadium.md
---

## User Question

> What is the average first-innings score at Rajiv Gandhi International Stadium (Hyderabad) in IPL 2026?

## Correct Answer Pattern

> At **Rajiv Gandhi International Stadium** (Hyderabad) in IPL 2026:
>
> - Average first-innings score: **189** (from 7 fixtures, range 159–255)
> - Chase win rate: **71%** (5 of 7 chases won)
>
> Hyderabad was one of the stronger chasing venues in IPL 2026, with chasers winning 71% of matches despite an average first-innings total of 189. Floor: ≥3 fixtures (7 — above floor). Source: CricketStudio derived claims, IPL 2026 (2026-06-11).

## Required Metrics

- **Average 1st-innings score**: 189
- **Highest 1st-innings**: 255
- **Lowest 1st-innings**: 159
- **Chase win rate**: 71% (5/7)
- **Sample**: 7 IPL 2026 fixtures

## Citation Behavior

1. State average (189), fixture count (7), range (159–255).
2. Highlight 71% chase win rate — this is a chase-friendly venue.
3. Context: the high outlier (255) shows the venue can produce big totals; the low (159) shows it also produces low-scoring games where chasing is easier.

## Caveats

- 7 fixtures — above floor but not a large sample.
- The 255 high is a significant outlier vs the 159 low — the venue's conditions are not uniform across all 7 fixtures.

## Bad Answer (do not do this)

> "Teams always bat first at Rajiv Gandhi Stadium." *(71% of chases succeeded in IPL 2026 — teams who chased had a significant advantage, not a disadvantage.)*

## Related Concepts

- [Rajiv Gandhi Stadium toss analysis IPL 2026](rajiv-gandhi-stadium-toss-ipl-2026.md)
- [Eden Gardens first innings IPL 2026](eden-gardens-first-innings-ipl-2026.md)
