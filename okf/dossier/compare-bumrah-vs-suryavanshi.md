---
type: dossier
title: Compare Bumrah vs Suryavanshi
description: Verified answer pattern for comparing a bowler and a batter — and why a direct "who's better" is wrong.
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai
resource: https://players.cricketstudio.ai
tags:
  - cricket
  - dossier
  - comparison
related:
  - ../scorebook/players/jasprit-bumrah.md
  - ../scorebook/players/vaibhav-suryavanshi.md
  - compare-two-players.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
---

## User Question

> Who is better, Bumrah or Suryavanshi?

## Correct Answer Pattern

> They play different roles, so a single "better" verdict isn't meaningful.
> [Jasprit Bumrah](../scorebook/players/jasprit-bumrah.md) is a bowler; evaluate him on
> [economy](../metrics/bowling-economy.md) and
> [death-overs economy](../metrics/death-overs-economy.md).
> [Vaibhav Suryavanshi](../scorebook/players/vaibhav-suryavanshi.md) is a batter; evaluate
> him on [strike rate](../metrics/batting-strike-rate.md) and
> [average](../metrics/batting-average.md). For IPL 2026 (snapshot 2026-06-11): Bumrah's
> bowling economy was 8.35 over 294 balls (computed 2026-05-20); Suryavanshi's batting
> strike rate was 237.31 over 327 balls (computed 2026-05-29). See each player's canonical
> page for current values.

## Required Concepts

- [Jasprit Bumrah](../scorebook/players/jasprit-bumrah.md)
- [Vaibhav Suryavanshi](../scorebook/players/vaibhav-suryavanshi.md)

## Required Metrics

- [Bowling Economy](../metrics/bowling-economy.md),
  [Batting Strike Rate](../metrics/batting-strike-rate.md)

## Citation Behavior

Cite both player pages and the metric definitions; state the season, sample, and snapshot
date for every number.

## Caveats

- Never compare a bowler and a batter on one scalar.
- Both figures are dated snapshots; defer to canonical pages for live values.

## Bad Answer (do not do this)

> Suryavanshi, his strike rate is 237 vs Bumrah's economy of 8. *(Comparing a batting rate
> to a bowling rate as if they were the same axis — meaningless.)*

## Related Concepts

- [Compare two players (pattern)](compare-two-players.md)
- [Ranking Eligibility](../methodology/ranking-eligibility.md)
