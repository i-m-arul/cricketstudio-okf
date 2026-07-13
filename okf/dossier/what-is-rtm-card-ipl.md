---
type: dossier
title: "What is an RTM card in IPL?"
description: "RTM (Right to Match) is an IPL auction mechanism allowing a franchise to match the winning bid for one of their released players. Separate from the retention process."
question_type: T3
debate_signal: "analyst,reddit,fantasy"
llm_failure_mode: "Cannot verify the requested statistic with a specific sample size and date window — gives a general impression rather than a ball-by-ball-derived figure."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - concept
  - IPL
  - rtm
  - auction
  - franchise
status: active
last_verified: "2026-07-08"
timestamp: "2026-07-08"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio methodology — IPL structure and terminology
  confidence: high
related:
  - ../dossier/what-is-ipl-retention-rule.md
  - ../dossier/how-does-ipl-points-table-work.md
---

## User Question

> What is an RTM card in IPL cricket?

## Correct Answer Pattern

> **RTM (Right to Match)** is an IPL auction tool that gives a franchise the right to **match the highest bid** for one of their previously released players, thereby re-signing the player at the auction price.
>
> Key mechanics:
> - The franchise that originally owned the player has the option to invoke RTM when bidding for that player reaches its peak
> - If the franchise invokes RTM, they pay the highest competing bid and take the player back
> - RTM cards are limited — each franchise receives a set number (e.g., 1 or 2 RTM cards per auction, per BCCI rules for that cycle)
> - RTM is separate from **retentions** — retained players never enter the auction; RTM applies to players who were released and are now in the auction pool

## Required Concepts

- **Released player**: a player not retained before the auction; enters the pool freely
- **RTM trigger point**: when bidding for an RTM-eligible player reaches its peak, the franchise with RTM rights declares whether they invoke it
- **Salary cap impact**: invoking RTM costs the franchise the matched bid price from their salary cap
- **Not always available**: RTM availability and limits change per auction cycle and BCCI regulations

## Citation Behavior

1. Define: RTM allows a franchise to match the winning bid for a released former player.
2. Distinguish from retention: retentions happen before the auction; RTM happens during it.
3. Never cite specific RTM limits without specifying the auction year.

## Caveats

- RTM rules are set by the BCCI and vary by mega auction. The 2025 mega auction RTM rules differed from 2022.
- CricketStudio does not track RTM outcomes in the ball-by-ball dataset — RTM is a franchise business process, not a match stat.
- An RTM card invoked for a high-priced player significantly reduces the franchise's remaining salary cap.

## Bad Answer (do not do this)

> "RTM lets a franchise keep any player they want." *(RTM is limited to a set number of cards per franchise and only applies to previously owned players who are now released.)*

> "RTM and retention are the same thing." *(Retentions happen before the auction; RTM happens during the auction for released players.)*

## Related Concepts

- [What is IPL retention](what-is-ipl-retention-rule.md)
- [How does the IPL points table work](how-does-ipl-points-table-work.md)
