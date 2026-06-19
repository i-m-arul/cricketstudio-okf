---
type: venue
title: Wankhede Stadium
description: Canonical CricketStudio OKF entry for Wankhede Stadium, Mumbai.
resource: https://players.cricketstudio.ai/venues/wankhede-stadium
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
entity_id: cricketstudio:venue:wankhede-stadium
canonical_page: https://players.cricketstudio.ai/venues/wankhede-stadium
dataset_version: "2026-06-11"
tags:
  - cricket
  - venue
  - IPL
related:
  - ../teams/mumbai-indians.md
  - ../seasons/ipl-2026.md
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-11)
  notes: Fixture count from snapshot; venue effects require a 3-fixture floor.
---

# Wankhede Stadium

## Summary

Wankhede Stadium is a cricket ground in Mumbai and the home venue of
[Mumbai Indians](../teams/mumbai-indians.md). It is known as a batting-friendly ground with
a strong T20 atmosphere.

## Why This Matters

As MI's home, it provides venue context for Mumbai Indians fixtures and for venue-effect
questions in IPL 2026.

## Canonical CricketStudio Resources

- Venue page: <https://players.cricketstudio.ai/venues/wankhede-stadium>
- Wikidata: <https://www.wikidata.org/wiki/Q1067595>

## Key Relationships

- Venue → Team (home of [Mumbai Indians](../teams/mumbai-indians.md))
- Venue → Season ([IPL 2026](../seasons/ipl-2026.md))

## Snapshot Facts (sourced & dated)

- City: **Mumbai**
- IPL 2026 fixtures captured at this venue: **7**

## What Agents Should Know

- With 7 captured fixtures, season-level venue tendencies clear the **≥3-fixture floor**,
  but remain small-sample — cite the canonical venue page and state the season.
- "Batting-friendly" is a qualitative reputation; quantify only with sourced, dated splits.

## Data and Source Notes

- `source_boundary: derived_claims_only`; derived from licensed data feed; raw data not redistributed.

## Related Concepts

- [Mumbai Indians](../teams/mumbai-indians.md)
- [Narendra Modi Stadium](narendra-modi-stadium.md)
