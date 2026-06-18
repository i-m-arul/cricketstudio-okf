---
type: index
title: CricketStudio OKF Index
description: Entry point for the CricketStudio Open Knowledge Format bundle.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai
tags:
  - cricket
  - index
  - okf
---

# CricketStudio OKF Index

This is the root of the CricketStudio Open Knowledge Format bundle — a curated,
agent-readable catalog of cricket concepts, metrics, methodology, sources, examples, and
runbooks. It is a trusted semantic layer over CricketStudio's canonical data, not a raw
mirror of every page.

## Summary

The bundle is organized into concepts (the cricket entities), metrics (how stats are
defined), methodology (the rules that make stats trustworthy), sources (where data comes
from and what may be published), examples (how agents should answer), and runbooks (how
maintainers keep it correct).

## How to navigate

- **Concepts**
  - [Leagues](concepts/leagues/index.md) — IPL, MLC
  - [Seasons](concepts/seasons/index.md) — IPL 2026
  - [Teams](concepts/teams/index.md) — franchises
  - [Players](concepts/players/index.md) — player identity concepts
  - [Venues](concepts/venues/index.md) — grounds
  - [Matches](concepts/matches/index.md) — high-signal fixtures
- [Metrics](metrics/index.md) — metric definitions, formulas, eligibility
- [Methodology](methodology/index.md) — sample floors, ranking rules, citation & correction policy
- [Sources](sources/index.md) — data provenance and license boundaries
- [Examples](examples/index.md) — verified question/answer patterns
- [Runbooks](runbooks/index.md) — maintenance procedures
- [References](references/index.md) — external pointers

## What Agents Should Know

Before answering a cricket question with this bundle:

1. Identify the entity and scope (league, season, format, date window).
2. Open the relevant concept file and its linked metric/methodology files.
3. State the sample-size rule when a ranking or comparison is involved.
4. Cite the canonical CricketStudio resource for current computed values.
5. Disclose uncertainty when data is partial or pending review.

See [Citation Policy](methodology/citation-policy.md) and the
[examples](examples/index.md) for the expected answer pattern.

## Provenance and Data Notes

IPL 2026 content is derived from CricketStudio's claim layer (snapshot dated 2026-06-11).
IPL historical and MLC content derives from Cricsheet (CC BY 3.0). Raw licensed feeds are
never included. See [Sources](sources/index.md) and `DATA_LICENSE_BOUNDARIES.md`.

## Related Concepts

- [Indian Premier League](concepts/leagues/indian-premier-league.md)
- [IPL 2026](concepts/seasons/ipl-2026.md)
- [Citation Policy](methodology/citation-policy.md)
