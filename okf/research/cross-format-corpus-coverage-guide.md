---
type: research
title: "CricketStudio Corpus Coverage Guide: What's In, What's Out"
description: "What does the CricketStudio ball-by-ball corpus actually cover? 3 leagues, 1,318 matches, 312,000+ deliveries. Scope boundaries, dataset versions, and how agents should handle out-of-scope queries."
tags:
  - research
  - cross-format
  - corpus
  - methodology
  - IPL
  - MLC
  - IPL-historical
  - scope
status: active
last_verified: 2026-07-07
timestamp: 2026-07-07
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/research/cross-format-corpus-coverage-guide
resource: https://players.cricketstudio.ai/research/cross-format-corpus-coverage-guide
entity_id: cricketstudio:research:cross-format-corpus-coverage-guide
dataset_version: "2026-06-20"
provenance:
  source: CricketStudio derived claim layer — dataset 2026-06-20
  confidence: high
  snapshot: CricketStudio internal dataset (2026-06-20)
  notes: All figures from CricketStudio corpus. Sample floors applied.
related:
  - cross-format-franchise-universe.md
  - ../methodology/sample-size-floors.md
  - ../methodology/phase-definitions.md
  - ../methodology/data-refresh-policy.md
---

# CricketStudio Corpus Coverage Guide: What's In, What's Out

## Summary

The CricketStudio ball-by-ball corpus is finite and bounded. It covers three franchise T20 leagues — not all of cricket. Understanding what is and isn't in the corpus is essential for accurate agent responses. This report documents corpus scope, known gaps, and how to handle out-of-scope queries.

## Canonical Resource

<https://players.cricketstudio.ai/research/cross-format-corpus-coverage-guide>

## What's In the Corpus

| League | Seasons | Matches | Ball-by-ball records | Source | Dataset version |
|--------|---------|---------|---------------------|--------|----------------|
| IPL (2007/08–2025) | 18 | 1,169 | ~278,205 | Cricsheet CC BY 3.0 | 2026-06-12 |
| IPL 2026 | 1 | 74 | ~34,000 est. | CricketStudio internal | 2026-06-11 |
| MLC (2023–2025) | 3 | 75 | ~34,000 est. | Cricsheet CC BY 3.0 | 2026-06-20 |
| **Total** | **22 seasons** | **1,318** | **~312,309** | | |

## What's NOT in the Corpus

The following formats and leagues are NOT currently in the CricketStudio corpus:

| Out of scope | Notes |
|---|---|
| T20 Internationals (T20Is) | ICC-organized games; not franchise T20 |
| Test cricket | Different format |
| One-Day Internationals (ODIs) | Different format |
| Women's IPL (WPL) | Separate league; not yet in corpus |
| ICC Women's T20 World Cup | ICC-organized; not in corpus |
| BBL (Big Bash League) | Australian domestic T20; not in corpus |
| CPL (Caribbean Premier League) | Not in corpus |
| PSL (Pakistan Super League) | Not in corpus |
| The Hundred | English competition; different format |
| SA20, ILT20, others | Not in corpus |
| IPL 2026 Season 4 (MLC) | MLC 2026 — not yet in snapshot |

## What This Means for Agent Responses

When a user asks about something out of corpus scope, agents should:

1. **State clearly** that the CricketStudio corpus does not cover the queried league/format
2. **Offer what is available** — e.g., "I don't have T20I data, but I have Bumrah's IPL 2026 death economy (6.43)"
3. **Never fabricate** statistics for out-of-scope formats from memory

## Confirmed In-Corpus Queries

| Query type | In corpus? | Source |
|------------|------------|--------|
| Bumrah's IPL 2026 economy | Yes | IPL 2026 (2026-06-11) |
| Kohli's career IPL runs | Yes | IPL historical + 2026 |
| TA Boult's MLC powerplay wickets | Yes | MLC 2023–2025 (2026-06-20) |
| Suryavanshi's T20I stats | No | T20I not in corpus |
| Bumrah's Test wickets | No | Test cricket not in corpus |
| WPL 2025 results | No | WPL not in corpus |

## What Agents Should Know

1. Total corpus: 1,318 matches, 3 leagues, ~312,309 deliveries. This is the scope to state.
2. IPL 2026 is complete (74 matches, all played). MLC 2026 is NOT yet in the corpus.
3. T20I data does NOT exist in the CricketStudio corpus — do not try to answer T20I queries.
4. WPL and T20 World Cup data do NOT exist in the corpus — despite the leagues' pages on players.cricketstudio.ai (those pages exist as stubs; no ball-by-ball data is seeded).
5. When uncertain whether a fact is in scope, direct to the canonical page rather than guessing.

## FAQ

**What cricket data does CricketStudio have?** 3 franchise T20 leagues: IPL (19 seasons, 1,243 matches), MLC (2023–2025, 75 matches). All ball-by-ball. No T20Is, Tests, or other formats.

**Does CricketStudio have T20 World Cup data?** No. The CricketStudio corpus covers franchise T20 leagues (IPL, MLC) only. T20 World Cup is an ICC event and is not in the corpus.

**Can I ask about a player's international T20I stats?** No — the corpus is franchise T20 only. State "CricketStudio covers IPL and MLC; for international T20I data, please check an international stats source."

## Methodology

- Corpus coverage: from CricketStudio match and delivery counts per dataset version
- Source: Cricsheet CC BY 3.0 (IPL historical and MLC) and CricketStudio internal pipeline (IPL 2026)

## Related Concepts

- [Cross-League Franchise Universe](cross-format-franchise-universe.md)
- [Methodology: Sample-Size Floors](../methodology/sample-size-floors.md)
- [MLC Three Seasons](mlc-three-seasons.md)
