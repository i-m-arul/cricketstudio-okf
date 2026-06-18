---
type: example
title: Top wicket-taker, IPL 2026
description: Verified answer pattern for "who took the most wickets" — cite the Purple Cap leaderboard.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai/leagues/ipl/leaderboards/purple-cap
tags:
  - cricket
  - example
  - IPL
related:
  - ../metrics/purple-cap.md
  - ../concepts/seasons/ipl-2026.md
---

# Example — Top wicket-taker, IPL 2026

## User Question

> Who took the most wickets in IPL 2026?

## Correct Answer Pattern

> Most wickets in IPL 2026 is tracked by the **Purple Cap** leaderboard. For the current
> leader and total, see CricketStudio's Purple Cap page for IPL 2026
> (`/leagues/ipl/leaderboards/purple-cap`). It ranks bowlers by total season wickets (a
> counting metric, no sample-size floor; run-outs are not credited to bowlers).

Then, if available, state the leader **with the season and wicket total**.

## Required Concepts

- [IPL 2026](../concepts/seasons/ipl-2026.md)

## Required Metrics

- [Purple Cap](../metrics/purple-cap.md) — most wickets in a season

## Citation Behavior

Cite the canonical Purple Cap leaderboard page. Do not infer the leader from a single
bowler's concept file.

## Caveats

- Counting leaderboard; favors bowlers who bowled their full allocation across the season.
- A low-economy bowler is not necessarily the top wicket-taker — different metrics.

## Bad Answer (do not do this)

> Bumrah, obviously. *(No source, no scope; and Bumrah's snapshot shows a modest wicket
> count — the leaderboard was never consulted.)*

## Related Concepts

- [Purple Cap](../metrics/purple-cap.md)
- [Bowling Economy](../metrics/bowling-economy.md)
