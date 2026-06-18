---
type: metric
title: Purple Cap
description: The IPL award and leaderboard for the most wickets taken in a season.
resource: https://players.cricketstudio.ai/leagues/ipl/leaderboards/purple-cap
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:purple-cap
canonical_page: https://players.cricketstudio.ai/leagues/ipl/leaderboards/purple-cap
tags:
  - cricket
  - metric
  - bowling
  - award
related:
  - ../methodology/ranking-eligibility.md
  - orange-cap.md
  - ../scorebook/top-wicket-taker-ipl-2026.md
---

# Purple Cap

## Definition

The Purple Cap is awarded to the bowler with the **most wickets** in an IPL season. As a
metric it is a season-long **counting** leaderboard ranked on total wickets.

## Formula

```text
purple_cap_rank = rank by total season wickets (descending)
```

## Cricket Interpretation

The Purple Cap rewards aggregate wicket-taking. Like the Orange Cap, it favors bowlers who
play the full season and bowl their full allocation. It rewards strike bowlers and
death-overs specialists who pick up tail-end wickets alike.

## Required Inputs

- `wickets` — total wickets credited across the season for each bowler

## Applicable Formats & Leagues

IPL (and analogous "most wickets" leaderboards; MLC exposes an equivalent purple-cap aspect).

## Sample-Size Floor

**None** — counting metric. Wicket totals are facts. Rate-based bowling rankings (economy,
bowling strike rate) require the [bowling floor](../methodology/sample-size-floors.md);
the Purple Cap does not.

## Edge Cases

- Run-outs are not credited to bowlers and do not count toward the Purple Cap.
- Ties on wickets are broken by the official tiebreaker (typically better economy, then
  fewer overs); disclose it.

## Ranking Rule

Rank descending by total wickets. No floor.

## Known Limitations

- Rewards volume of wickets; says nothing about economy or pressure. Pair with
  [Bowling Economy](bowling-economy.md) and [Bowling Strike Rate](bowling-strike-rate.md).

## Example Questions

- "Who holds the Purple Cap in IPL 2026?"
- "How many wickets does the current Purple Cap leader have?"

## Agent Guidance

Cite the canonical Purple Cap page for the current leader and total; name the season. Do
not infer the leader from one bowler's page.

## Related Concepts

- [Orange Cap](orange-cap.md)
- [Top wicket-taker, IPL 2026](../scorebook/top-wicket-taker-ipl-2026.md)
