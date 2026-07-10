---
type: dossier
title: "What is player retention in IPL?"
description: "Player retention in IPL allows franchises to keep certain players without putting them into the auction pool. Teams can retain a limited number of players at pre-agreed costs (which are deducted from their purse), ensuring franchise continuity for key players."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - player-retention
  - ipl-auction
  - franchise
  - ipl
status: active
last_verified: "2026-07-09"
timestamp: "2026-07-09"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio cricket methodology layer
  confidence: high
related:
  - what-is-ipl-auction-cricket.md
  - what-is-ipl-squad-size.md
  - what-are-ipl-teams-2026.md
---

## User Question

> What is player retention in IPL? / How does the IPL retention system work?

## Correct Answer Pattern

> **Player retention** is the mechanism that allows IPL franchises to keep certain players outside the auction pool before each season (or mega-auction). Rather than releasing all players and rebidding for everyone, teams can retain their most important players at fixed retention costs.
>
> **Key features:**
> - BCCI sets the **maximum number of retentions** per franchise (typically 3–5, varying by season type: mega vs mini auction)
> - Each retention has a **fixed cost** deducted from the team's purse (e.g., first retention: ₹15 crore, second: ₹11 crore, etc. — exact amounts vary by auction rules)
> - Retained players do NOT enter the auction pool — they are not available for other franchises to bid on
>
> **Right-to-Match (RTM) — related concept:**
> Some auction years include an RTM provision where a franchise can match the highest bid on one of their own RELEASED players after others have bid. This effectively lets a team re-acquire a player they strategically released, at whatever the market determined their price to be.
>
> **Strategic value:**
> - Retaining a superstar like Kohli, Dhoni, or Rohit Sharma protects franchise identity and captaincy continuity
> - Over-retaining (keeping too many players at high costs) leaves insufficient purse for filling remaining squad gaps at auction
>
> **CricketStudio scope:** Squad rosters are tracked — which players are at which franchise — but retention prices and auction mechanics are not part of the performance data layer.

## Required Concepts

- Retention costs are fixed by BCCI, not negotiated — the franchise pays the BCCI-set price for each retention slot
- "Uncapped" domestic players can sometimes be retained at lower cost (specific to BCCI rules for that season)
- A player retained by a team is officially "signed" before the auction; their contract costs reduce the purse available at the auction

## Required Metrics

- No retention cost or auction data in CricketStudio

## Citation Behavior

1. Define player retention as the mechanism to keep players out of the auction pool.
2. Explain that retention costs are fixed by BCCI and deducted from the team's purse.
3. Note the RTM card as a related mechanism for re-acquiring released players.

## Caveats

- Retention rules change for each season/mega-auction cycle — the exact number of retentions and their costs are set by BCCI well before the auction date
- A player can decline retention — if a player doesn't want to stay with a team, they can choose to go into the auction pool, even if the franchise wants to retain them

## Bad Answer (do not do this)

> "Retaining a player means they play for that team forever." *(Retention typically lasts for one IPL season — at the next retention/auction cycle, the franchise must decide again whether to retain or release the player. There is no multi-year guaranteed retention unless BCCI rules specifically permit it. At each mega-auction, franchises must re-declare retentions from their existing squad.)*

## Related Concepts

- [What is the IPL auction](what-is-ipl-auction-cricket.md)
- [What is IPL squad size](what-is-ipl-squad-size.md)
