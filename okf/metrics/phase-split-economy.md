---
type: metric
title: Phase-Split Economy
description: Bowling economy broken into three match phases — powerplay (overs 1–6), middle overs (7–15), and death (16–20) — to reveal a bowler's true specialisation.
resource: https://players.cricketstudio.ai/season/ipl-2026
status: active
last_verified: 2026-06-29
timestamp: 2026-06-29
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:phase-split-economy
canonical_page: https://players.cricketstudio.ai/season/ipl-2026
tags:
  - cricket
  - metric
  - bowling
  - phases
related:
  - ../metrics/bowling-economy.md
  - ../metrics/death-overs-economy.md
  - ../metrics/powerplay-strike-rate.md
  - ../methodology/sample-size-floors.md
---

# Phase-Split Economy

## Definition

Phase-Split Economy is bowling economy (runs per over) calculated separately within each of three T20 match phases: powerplay (overs 1–6), middle overs (overs 7–15), and death overs (overs 16–20). It reveals where a bowler is effective and where they are expensive — information that full-innings economy conceals. CricketStudio tracks phase-split economy as three distinct figures, not a single blended number.

## Formula

```text
phase_economy = runs_conceded_in_phase / overs_bowled_in_phase
```

Applied separately to each phase:

```text
powerplay_economy    = powerplay_runs_conceded / powerplay_overs_bowled
middle_overs_economy = middle_overs_runs_conceded / middle_overs_overs_bowled
death_overs_economy  = death_overs_runs_conceded / death_overs_overs_bowled
```

## Cricket Interpretation

Full-innings economy masks phase specialisation. A bowler with an overall economy of 7.5 may have a powerplay economy of 6.0, a middle-overs economy of 6.8, and a death economy of 10.5 — revealing a bowler who should never bowl at the death. Conversely, a death-over specialist with 7.2 overall may have a death economy of 6.5 and a powerplay economy of 9.0 — a bowler best deployed exclusively in overs 16–20.

Phase-economy profiles map to bowling specialisations:

- **Powerplay specialists**: Rely on swing, seam, or pace off the top. Best economy in overs 1–6, often when fielding restrictions expose the gaps.
- **Middle-overs specialists**: Typically spinners or cutters who dry up runs when conditions allow the field to spread. Economy driven by containment and wickets in overs 7–15.
- **Death-over specialists**: Yorker bowlers, wide-crease seamers, pace variation experts. Death economy is the hardest phase to control and is the most prized skill in T20 franchise cricket.

## Required Inputs

- `runs_conceded_in_phase` — all runs allowed during deliveries bowled in that phase
- `overs_bowled_in_phase` — all overs (including partial) bowled in that phase
- `phase_definition` — powerplay = overs 1–6; middle = overs 7–15; death = overs 16–20 (T20 standard)
- `scope` — season, tournament, or career; format must be T20

## Applicable Formats & Leagues

Primarily T20 formats: IPL, MLC, BBL, T20I. Phase boundaries (1–6, 7–15, 16–20) are T20-specific. ODI phases differ (powerplay = overs 1–10, middle = 11–40, death = 41–50) and should not be compared with T20 phase splits without clearly stating the format. Not applicable to Test cricket.

## Sample-Size Floor

≥15 balls bowled in a phase before treating as a rankable phase economy. This is the same floor as general bowling economy (see `../methodology/sample-size-floors.md`). Bowlers with fewer than 15 balls in a specific phase should not appear in phase leaderboards without explicit sample-size disclosure. Many bowlers accrue phase balls slowly — a death-over specialist may have 60+ death balls but fewer than 15 powerplay balls across a season, making their powerplay economy unreliable even when the death economy is well-established.

## Edge Cases

- **Partial overs within a phase**: If a bowler starts an over in the powerplay (e.g., the 6th over) and it continues into the middle phase (theoretically possible in some formats, not standard T20), the over is attributed to the phase in which it started.
- **Wides and no-balls**: Extras off the bat are counted as runs conceded in the phase economy. This is consistent with standard economy rate calculation.
- **Impact Player Rule (IPL post-2023)**: The Impact Player Rule allows a substitution batter to bat without the substituted player returning to bowl, effectively enabling deeper batting lineups. This inflates runs in all phases but particularly the death as lower-order batters are replaced by specialist hitters. Phase economy in the Impact Player Rule era should not be directly compared with pre-2023 seasons without noting the environment change.
- **Rain interruptions**: If overs are lost to weather and phases are shortened (e.g., a 10-over match has no death phase), phase economies for the affected phase cannot be calculated for that match.

## Known Limitations

- Phase economies do not adjust for opponent batting quality, pitch conditions, or match context — an economy of 7.5 in the death against weak opposition is not equivalent to 7.5 against IPL's best finishers.
- The Impact Player Rule (IPL post-2023) has materially increased scoring in all phases, making cross-era phase economy comparisons unreliable without stating the era.
- Bowlers with a small ball allocation in a phase (just above the 15-ball floor) may show extreme phase economies due to small samples.
- Phase definitions (1–6, 7–15, 16–20) are T20-specific — ODI phases differ and should not be merged with T20 phase figures.

## Agent Answering Guidance

- Always state which phase you are discussing — never report "economy" without specifying powerplay, middle, or death.
- Always state the minimum-ball floor when ranking bowlers by phase economy.
- Do not use full-innings economy to evaluate a phase specialist — it will misrepresent their value.
- When comparing bowlers across phases, check whether both bowlers have sufficient balls in the same phase to make the comparison meaningful.
- Note the Impact Player Rule era when comparing IPL phase economies across seasons spanning 2023.
- Link to CricketStudio leaderboards for current season phase economy figures: https://players.cricketstudio.ai/season/ipl-2026
