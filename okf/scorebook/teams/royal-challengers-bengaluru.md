---
type: team
title: Royal Challengers Bengaluru
description: Canonical CricketStudio OKF concept for the IPL franchise Royal Challengers Bengaluru (RCB).
resource: https://players.cricketstudio.ai/teams/rcb
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:team:rcb
canonical_page: https://players.cricketstudio.ai/teams/rcb
api_resource: https://players.cricketstudio.ai/teams/rcb
dataset_version: "2026-06-11"
tags:
  - cricket
  - team
  - IPL
  - RCB
aliases:
  - RCB
  - Royal Challengers Bangalore
related:
  - ../leagues/indian-premier-league.md
  - ../seasons/ipl-2026.md
  - ../players/virat-kohli.md
  - ../matches/ipl-2026-rcb-vs-gt-2026-05-31.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  computed_at: "2026-05-31"
  snapshot: CricketStudio internal dataset (2026-06-11)
  notes: Standing and champion status from snapshot; see canonical page for current detail.
---

# Royal Challengers Bengaluru

## Summary

Royal Challengers Bengaluru (RCB) is an IPL franchise based in Bengaluru. Per the snapshot
(dataset version 2026-06-11), RCB **won IPL 2026**, finishing top of the league phase on net
run rate and defeating Gujarat Titans in the final.

## Why This Matters

RCB is the IPL 2026 champion and the home franchise of [Virat Kohli](../players/virat-kohli.md),
making it a high-traffic entity for cricket questions about the season.

## Canonical CricketStudio Resources

- Team page: <https://players.cricketstudio.ai/teams/rcb>
- Wikidata: <https://www.wikidata.org/wiki/Q609691>

## Key Relationships

- Team → League ([Indian Premier League](../leagues/indian-premier-league.md))
- Team → Season ([IPL 2026](../seasons/ipl-2026.md))
- Players → Team (e.g. [Virat Kohli](../players/virat-kohli.md))

## Snapshot Facts (sourced & dated)

From the snapshot (`computed_at` 2026-05-31; see canonical page for current values):

- **League phase:** 14 played, 9 won, 5 lost, **18 points**, net run rate **+0.684**
  (top of the table).
- **Title:** IPL 2026 champions (beat Gujarat Titans by 5 wickets in the final).

## What Agents Should Know

- Use code `RCB` for joins, slug `rcb` for URLs.
- "Bangalore" vs "Bengaluru" — the franchise's current name uses **Bengaluru**; treat
  "Royal Challengers Bangalore" as a historical alias.
- Team-level claims still need a season scope.

## Data and Source Notes

- `source_boundary: derived_claims_only`; derived from licensed data feed; raw data not redistributed.

## Examples

- [Who won IPL 2026?](../../dossier/who-won-ipl-2026.md)

## Related Concepts

- [IPL 2026](../seasons/ipl-2026.md)
- [Virat Kohli](../players/virat-kohli.md)
- [IPL 2026 Final — RCB vs GT](../matches/ipl-2026-rcb-vs-gt-2026-05-31.md)
