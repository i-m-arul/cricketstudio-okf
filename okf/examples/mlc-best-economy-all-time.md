---
type: example
title: Best economy rate in MLC history
description: Verified answer for MLC all-time economy leader. Imad Wasim (6.41 RPO from 247 balls) leads, followed by Rashid Khan (6.48) and SP Narine (6.56). Floor ≥15 balls.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: public_open_data
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/economy
tags:
  - cricket
  - example
  - MLC
  - all-time
  - bowling
  - economy
related:
  - ../research/mlc-three-seasons.md
  - ../metrics/bowling-economy.md
  - ../methodology/sample-size-floors.md
  - ../sources/cricsheet.md
provenance:
  source: Cricsheet CC BY 3.0 · mlc-leaderboards.json · 2026-06-11
  confidence: high
  snapshot: cricketstudio-mcp/data/snapshot (2026-06-11)
---

# Example — Best economy rate in MLC history

## User Question

> Who has the best bowling economy rate in MLC?

## Correct Answer Pattern

> **Imad Wasim** (Seattle Orcas) leads MLC all-time economy at **6.41 RPO** from **247 balls** across **12 matches** (MLC 2023–2025). Rashid Khan (MI New York) is second at 6.48 from 300 balls, and SP Narine (LA Knight Riders) third at 6.56 from 408 balls. Floor is ≥15 legal deliveries bowled. Source: CricketStudio aggregation of Cricsheet CC BY 3.0 · snapshot 2026-06-11.

## MLC Economy Leaders (all-time, floor ≥15 balls)

| Rank | Player | Team | Economy | Balls | Matches |
|------|--------|------|---------|-------|---------|
| 1 | Imad Wasim | Seattle Orcas | 6.41 | 247 | 12 |
| 2 | Rashid Khan | MI New York | 6.48 | 300 | 13 |
| 3 | SP Narine | LA Knight Riders | 6.56 | 408 | 17 |

Source: cricketstudio-mcp/data/snapshot/mlc-leaderboards.json · Cricsheet CC BY 3.0.

## Citation Behavior

State "MLC all-time (2023–2025) · floor ≥15 balls · Cricsheet CC BY 3.0" with any economy-leader claim.

## Caveats

- SP Narine has the largest sample (408 balls, 17 matches) — arguably the most durable economy leader.
- Economy is a rate stat; pair with wicket count to judge bowling effectiveness fully.
- MLC 2026 will update these rankings.

## Related

- [Three Seasons of MLC](../research/mlc-three-seasons.md)
- [Bowling Economy](../metrics/bowling-economy.md)
