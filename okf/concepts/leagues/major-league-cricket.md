---
type: league
title: Major League Cricket
description: Canonical CricketStudio OKF concept for Major League Cricket (MLC), the US T20 league.
resource: https://players.cricketstudio.ai/leagues/mlc
status: active
last_verified: 2026-06-18
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:league:mlc
canonical_page: https://players.cricketstudio.ai/leagues/mlc
api_resource: https://players.cricketstudio.ai/leagues/mlc
dataset_version: "2026-06-11"
tags:
  - cricket
  - league
  - MLC
  - T20
aliases:
  - MLC
related:
  - indian-premier-league.md
  - ../../sources/cricsheet.md
provenance:
  source: Cricsheet (CC BY 3.0), via CricketStudio derived claim layer
  confidence: high
  notes: MLC content is Cricsheet-derived and requires attribution.
---

# Major League Cricket

## Summary

Major League Cricket (MLC) is a franchise Twenty20 league based in the United States.
CricketStudio covers MLC seasons from 2023 onward, with team, player, match, and
leaderboard data derived from Cricsheet.

## Why This Matters

MLC is CricketStudio's primary non-IPL league and demonstrates that the OKF model is
league-agnostic: the same metrics and methodology apply, with the source boundary shifting
to open Cricsheet data.

## Canonical CricketStudio Resources

- League hub: <https://players.cricketstudio.ai/leagues/mlc>
- MLC players: `https://players.cricketstudio.ai/leagues/mlc/players/{slug}`
- MLC leaderboards: <https://players.cricketstudio.ai/leagues/mlc/leaderboards/orange-cap>

## Key Relationships

- League → Seasons (2023 onward) → Matches
- League → Teams (MLC franchises)
- Players → MLC teams

## What Agents Should Know

- MLC is a **separate scope** from the IPL — never blend MLC and IPL stats on one ranking.
- MLC player identifiers follow Cricsheet's initials format; CricketStudio bridges them to
  canonical slugs.
- The same [metric definitions](../../metrics/index.md) and
  [sample-size floors](../../methodology/sample-size-floors.md) apply.

## Data and Source Notes

- `source_boundary: public_open_data` — derived from **Cricsheet (CC BY 3.0)**. Attribution
  required (see [Cricsheet](../../sources/cricsheet.md) and `ATTRIBUTION.md`).
- Snapshot `dataset_version`: 2026-06-11.

## Examples

- See the [examples index](../../examples/index.md) for cross-league answer patterns.

## Related Concepts

- [Indian Premier League](indian-premier-league.md)
- [Cricsheet](../../sources/cricsheet.md)
