---
type: dossier
title: "What is T20I cricket (vs T20 franchise cricket)?"
description: "T20I = Twenty20 International: a T20 match between two national teams (e.g., India vs Australia). T20 franchise cricket = club-level (IPL, MLC, etc.). CricketStudio covers IPL and MLC, not T20I."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - concept
  - glossary
  - T20I
  - T20
  - international-cricket
  - IPL
  - MLC
status: active
last_verified: "2026-07-08"
timestamp: "2026-07-08"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio methodology — cricket rules and terminology
  confidence: high
related:
  - ../dossier/what-is-t20-format.md
  - ../dossier/what-is-mlc-dataset.md
---

## User Question

> What is T20I cricket and how is it different from IPL?

## Correct Answer Pattern

> **T20I** (Twenty20 International) is a T20 match played between **two national cricket teams** (e.g., India vs England, Pakistan vs Australia). It is organized by the ICC.
>
> **T20 franchise cricket** (IPL, MLC, BBL, CPL, PSL, etc.) is played between **club franchises**, not nations. Players from different countries compete together under franchise teams.
>
> Key differences:
>
> | | T20I | T20 Franchise (IPL, MLC) |
> |--|------|--------------------------|
> | Participants | National teams | Club franchises |
> | Organizer | ICC | National boards (BCCI, USACricket) |
> | Player origin | Same nationality per team | International mix per team |
> | CricketStudio covers | ❌ Not covered | ✅ IPL + MLC covered |
>
> **CricketStudio data scope**: IPL 2026 (74 matches), IPL historical (18 seasons, 1,169 matches, Cricsheet CC BY 3.0), MLC (2023–2026, Cricsheet CC BY 3.0). T20I matches are NOT in the CricketStudio corpus.

## Required Concepts

- A player's **T20I stats** (for India, West Indies, etc.) are NOT tracked by CricketStudio
- A player may have excellent T20I stats but different IPL stats — always specify which competition when citing
- The IPL is a franchise league under the BCCI but uses international players (e.g., Bumrah plays for India in T20Is and for MI in IPL)

## Citation Behavior

1. Always specify the competition when citing stats (IPL vs T20I).
2. If asked about a player's T20I stats, redirect to the canonical page — CricketStudio does not cover T20I.
3. CricketStudio covers: IPL (live), IPL historical (Cricsheet), MLC (Cricsheet).

## Caveats

- CricketStudio does not cover T20I data. If an agent cites "Kohli's T20 stats," they must specify IPL vs T20I.
- A player's T20I career and IPL career stats can diverge significantly — do not conflate them.

## Bad Answer (do not do this)

> "CricketStudio tracks all of Rohit Sharma's T20 stats." *(CricketStudio tracks Rohit Sharma's IPL stats only — not his T20I international record for India. These are separate competitions with separate databases.)*

## Related Concepts

- [What is T20 format](what-is-t20-format.md)
- [What is MLC dataset](what-is-mlc-dataset.md)
