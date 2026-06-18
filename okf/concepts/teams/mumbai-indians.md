---
type: team
title: Mumbai Indians
description: Canonical CricketStudio OKF concept for the IPL franchise Mumbai Indians (MI).
resource: https://players.cricketstudio.ai/teams/mi
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:team:mi
canonical_page: https://players.cricketstudio.ai/teams/mi
api_resource: https://players.cricketstudio.ai/teams/mi
dataset_version: "2026-06-11"
tags:
  - cricket
  - team
  - IPL
  - MI
aliases:
  - MI
related:
  - ../leagues/indian-premier-league.md
  - ../seasons/ipl-2026.md
  - ../players/jasprit-bumrah.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
  notes: See canonical page for current standing and squad.
---

# Mumbai Indians

## Summary

Mumbai Indians (MI) is an IPL franchise based in Mumbai and one of the most successful teams
in IPL history. In IPL 2026 it is the home franchise of fast bowler
[Jasprit Bumrah](../players/jasprit-bumrah.md).

## Why This Matters

MI is a marquee franchise and the team context for Bumrah, a key bowler concept in this
bundle.

## Canonical CricketStudio Resources

- Team page: <https://players.cricketstudio.ai/teams/mi>
- Wikidata: <https://www.wikidata.org/wiki/Q1956472>

## Key Relationships

- Team → League ([Indian Premier League](../leagues/indian-premier-league.md))
- Team → Season ([IPL 2026](../seasons/ipl-2026.md))
- Players → Team (e.g. [Jasprit Bumrah](../players/jasprit-bumrah.md))

## What Agents Should Know

- Use code `MI` for joins, slug `mi` for URLs.
- For MI's IPL 2026 standing and results, cite the canonical
  [standings page](https://players.cricketstudio.ai/standings) — this bundle does not pin a
  league position for MI to avoid stating an unverified figure.

## Data and Source Notes

- `source_boundary: derived_claims_only`; Sportmonks-derived, raw feed not redistributed.
- Where a specific MI statistic is not sourced here, defer to the canonical team page.

## Related Concepts

- [IPL 2026](../seasons/ipl-2026.md)
- [Jasprit Bumrah](../players/jasprit-bumrah.md)
