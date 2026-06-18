---
type: methodology
title: Ranking Eligibility
description: Rules for who qualifies to appear on a CricketStudio leaderboard or ranked comparison.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - methodology
  - ranking
related:
  - sample-size-floors.md
  - ../metrics/orange-cap.md
  - ../examples/when-not-to-rank-a-player.md
---

# Ranking Eligibility

## Summary

Eligibility rules decide who may appear on a ranked list. A leaderboard is only
trustworthy if everyone on it cleared the same bar: the same season scope, the same
format, and the same sample-size floor.

## Why This Matters

Two batters with identical strike rates are not comparable if one faced 30 balls and the
other faced 400. Eligibility rules make rankings apples-to-apples.

## The Rules

1. **Single scope.** A ranking covers one league, one season, and one format. Do not mix
   IPL 2026 with IPL historical, or T20 with ODI, on the same list.
2. **Sample-size floor.** Every ranked player must clear the floor for that metric — see
   [Sample-Size Floors](sample-size-floors.md).
3. **Phase consistency.** Phase rankings (powerplay, death) require the phase floor, not
   just the season floor.
4. **Counting vs rate.** Counting leaderboards (most runs, most wickets) rank on totals
   and have no floor. Rate leaderboards (best SR, best economy) require the floor.
5. **Ties.** Disclose the tiebreaker used (e.g. fewer balls for batting SR, more wickets
   for economy) rather than presenting an arbitrary order.

## Edge Cases

- A player who is injured mid-season still ranks on totals but may fall below a rate floor.
- New or young players (small samples) are frequently floor-ineligible for rate metrics
  even when their raw numbers look spectacular — this is by design.

## Agent Guidance

- State the scope and floor whenever you present a "best/worst" or "top N" claim.
- If asked to rank players who do not share a scope, decline and explain why.
- Prefer citing the canonical season leaderboard page over reconstructing a ranking.

## Related Concepts

- [Sample-Size Floors](sample-size-floors.md)
- [Orange Cap](../metrics/orange-cap.md)
- [When NOT to rank a player](../examples/when-not-to-rank-a-player.md)
