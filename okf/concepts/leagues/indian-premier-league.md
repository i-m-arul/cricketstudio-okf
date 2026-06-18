---
type: league
title: Indian Premier League
description: Canonical CricketStudio OKF concept for the Indian Premier League (IPL).
resource: https://players.cricketstudio.ai/leagues/ipl
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:league:ipl
canonical_page: https://players.cricketstudio.ai/leagues/ipl
api_resource: https://players.cricketstudio.ai/leagues/ipl
dataset_version: "2026-06-11"
tags:
  - cricket
  - league
  - IPL
  - T20
aliases:
  - IPL
related:
  - major-league-cricket.md
  - ../seasons/ipl-2026.md
  - ../teams/royal-challengers-bengaluru.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  notes: Use the canonical league hub for current standings and leaderboards.
---

# Indian Premier League

## Summary

The Indian Premier League (IPL) is a professional Twenty20 (T20) franchise cricket league
in India and the highest-profile T20 competition in the world. CricketStudio covers IPL
across two scopes: the **live current season** and an **18-season historical archive**
(2007/08–2025).

## Why This Matters

The IPL is the anchor league for CricketStudio's data. Its format (20 overs per side,
fielding restrictions, phase structure) defines how most metrics in this bundle are
interpreted. Almost every player, team, and metric concept here is IPL-scoped.

## Canonical CricketStudio Resources

- League hub: <https://players.cricketstudio.ai/leagues/ipl>
- Historical leaderboards (e.g. all-time runs/wickets):
  <https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap>
- Current season: see [IPL 2026](../seasons/ipl-2026.md)

## Key Relationships

- League → Season → Matches
- League → Teams (ten franchises in IPL 2026)
- Players → Teams within the league

## What Agents Should Know

- Always pair "IPL" with a **season** and note whether you mean the live season or the
  historical archive — they are different scopes and must not be mixed
  ([Ranking Eligibility](../../methodology/ranking-eligibility.md)).
- IPL uses the T20 [phase structure](../../methodology/phase-definitions.md).
- Live IPL 2026 data is Sportmonks-derived; historical IPL is Cricsheet-derived.

## Data and Source Notes

- Current season: `source_boundary: derived_claims_only` (Sportmonks-derived; raw feed not
  redistributed — see [Licensed Feed Boundaries](../../sources/licensed-feed-boundaries.md)).
- Historical archive: Cricsheet (CC BY 3.0) — see [Cricsheet](../../sources/cricsheet.md).
- Snapshot `dataset_version`: 2026-06-11.

## Examples

- [Who won IPL 2026?](../../examples/who-won-ipl-2026.md)
- [Top run-scorer, IPL 2026](../../examples/top-run-scorer-ipl-2026.md)

## Related Concepts

- [Major League Cricket](major-league-cricket.md)
- [IPL 2026](../seasons/ipl-2026.md)
- [Orange Cap](../../metrics/orange-cap.md) · [Purple Cap](../../metrics/purple-cap.md)
