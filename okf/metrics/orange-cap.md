---
type: metric
title: Orange Cap
description: The IPL award and leaderboard for the most runs scored in a season.
resource: https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:orange-cap
canonical_page: https://players.cricketstudio.ai/leagues/ipl/leaderboards/orange-cap
tags:
  - cricket
  - metric
  - batting
  - award
related:
  - ../methodology/ranking-eligibility.md
  - purple-cap.md
  - ../dossier/explain-orange-cap.md
---

# Orange Cap

## Definition

The Orange Cap is awarded to the batter with the **most runs** in an IPL season. As a
metric it is a season-long **counting** leaderboard ranked on total runs.

## Formula

```text
orange_cap_rank = rank by total season runs (descending)
```

## Cricket Interpretation

The Orange Cap rewards aggregate run production across a full season — a combination of
volume (matches played, time at the crease) and quality. Because it ranks totals, it favors
batters who bat high in the order and play the full season.

## Required Inputs

- `runs` — total runs scored across the season for each batter

## Applicable Formats & Leagues

IPL (and analogous "most runs" leaderboards in other leagues; MLC exposes an equivalent
orange-cap aspect).

## Sample-Size Floor

**None** — it is a counting metric, not a rate. Totals are facts. (Contrast with rate
leaderboards such as strike rate, which require the
[batting floor](../methodology/sample-size-floors.md).)

## Edge Cases

- A batter who plays every match has more opportunity than one who missed games — this is
  inherent to a counting award, not a flaw.
- Ties on runs are broken by the official IPL tiebreaker (typically strike rate, then fewer
  innings); disclose the tiebreaker used.

## Ranking Rule

Rank descending by total runs. No floor.

## Known Limitations

- Rewards volume; says nothing about tempo or efficiency. Pair with
  [Batting Strike Rate](batting-strike-rate.md) and [Batting Average](batting-average.md)
  for a fuller assessment.

## Example Questions

- "Who holds the Orange Cap in IPL 2026?"
- "How many runs does the current Orange Cap leader have?"

## Agent Guidance

This is a counting leaderboard — cite the canonical Orange Cap page for the current leader
and total, and note the season. Do not infer the leader from a single player's page.

## Related Concepts

- [Purple Cap](purple-cap.md)
- [Explain the Orange Cap](../dossier/explain-orange-cap.md)
- [Top run-scorer, IPL 2026](../dossier/top-run-scorer-ipl-2026.md)
