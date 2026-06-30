---
type: dossier
title: Top run-scorer, IPL 2026
description: Verified answer pattern for "who scored the most runs" — cite the leaderboard, don't guess.
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap
resource: https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap
tags:
  - cricket
  - dossier
  - IPL
related:
  - ../metrics/orange-cap.md
  - ../scorebook/seasons/ipl-2026.md
---

## User Question

> Who scored the most runs in IPL 2026?

## Correct Answer Pattern

> The most runs in IPL 2026 is tracked by the **[Orange Cap](https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap)** leaderboard. For the current
> leader and total, see CricketStudio's Orange Cap page for IPL 2026
> (`/leagues/ipl/leaderboards/orange-cap`). It ranks batters by total season runs (a
> counting metric, no sample-size floor).

Then, if the leaderboard is available, state the leader **with the season and total**.

## Required Concepts

- [IPL 2026](../scorebook/seasons/ipl-2026.md)

## Required Metrics

- [Orange Cap](../metrics/orange-cap.md) — most runs in a season

## Citation Behavior

Cite the canonical Orange Cap leaderboard page. **Do not** infer the top scorer from a
single player's concept file — one player page cannot establish a ranking.

## Caveats

- This is a counting leaderboard; totals favor batters who played the full season.
- Name the season explicitly ("IPL 2026").

## Bad Answer (do not do this)

> [Virat Kohli](https://players.cricketstudio.ai/players/virat-kohli) — he scored 675, that's surely the most. *(Inferring a ranking from one
> player's snapshot figure; the leaderboard was never consulted.)*

## Related Concepts

- [Orange Cap](../metrics/orange-cap.md)
- [When NOT to rank a player](when-not-to-rank-a-player.md)
