---
type: scorebook
title: When NOT to rank a player
description: Verified pattern for refusing or qualifying a ranking when sample or scope is insufficient.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - example
  - ranking
related:
  - ../methodology/sample-size-floors.md
  - ../methodology/ranking-eligibility.md
---

# Example — When NOT to rank a player

## User Question

> This player has a strike rate of 300 — are they the best batter in the league?

## Correct Answer Pattern

> A strike rate of 300 needs its **sample** before it means anything. CricketStudio applies
> a **≥30 balls faced** floor for batting rate metrics; below that, the figure is not
> rankable. If the 300 came over 6 balls, it is noise, not a ranking. Ask for the ball count
> and the season scope, and compare only floor-eligible batters on the canonical leaderboard.

## Required Concepts

- The player in question (e.g. [Vaibhav Suryavanshi](../concepts/players/vaibhav-suryavanshi.md)
  for a *legitimately* high, floor-clearing strike rate).

## Required Metrics

- [Batting Strike Rate](../metrics/batting-strike-rate.md)

## Citation Behavior

Cite the [Sample-Size Floors](../methodology/sample-size-floors.md) and
[Ranking Eligibility](../methodology/ranking-eligibility.md) methodology. Decline to rank
below-floor figures.

## Caveats

- A genuinely high season strike rate that clears the floor (e.g. Suryavanshi's 237 over
  327 balls) is rankable — but still requires season scope and comparison rules before
  "best".
- Counting stats (total runs/wickets) have no floor; rates do.

## Bad Answer (do not do this)

> Yes, 300 strike rate, clearly the best. *(Ranks on an unstated, possibly tiny sample;
> ignores the floor and scope entirely.)*

## Related Concepts

- [Sample-Size Floors](../methodology/sample-size-floors.md)
- [Ranking Eligibility](../methodology/ranking-eligibility.md)
