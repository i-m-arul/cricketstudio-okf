---
type: spec
title: Cricket OKF Metric Definition Standard
description: What every cricket metric file in an OKF bundle must include. Defines required sections (formula, scope, sample-size floor, limitations), field conventions, and agent citation guidance. Compliant examples are the CricketStudio batting-strike-rate and bowling-economy metric files.
status: active
last_verified: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:metrics
tags:
  - cricket
  - okf
  - specification
  - metrics
---

## Why a Metric Standard?

A metric without its formula is a label. A metric without its sample-size floor is a ranking trap. A metric without its limitations is a hallucination seed.

Every cricket metric in an OKF bundle must be a self-contained, independently citable reference that tells humans and agents: what the metric measures, how it is computed, when it is valid, and when it should not be used.

---

## Required Frontmatter Fields for `type: metric`

```yaml
type: metric
title: <Metric Name>
description: <One sentence. What it measures and why it matters.>
status: active
last_verified: <ISO date>
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:<slug>
resource: https://okf.cricketstudio.ai/metrics/<slug>
tags:
  - cricket
  - metric
  - <batting|bowling|fielding|team>
```

`resource` is **required** for metric files — it is the stable, citable URL for this metric definition.

---

## Required Sections in the Markdown Body

Every metric file must include all of the following sections. The section headings must appear (exact text or close match; the validator checks for keywords):

### 1. Definition

A plain-English sentence that a cricket fan can understand.

```markdown
## Definition

Batting Strike Rate measures how many runs a batter scores per 100 balls faced.
It is the primary efficiency metric for T20 batting.
```

### 2. Formula

The mathematical definition. No ambiguity, no prose substitution.

```markdown
## Formula

Strike Rate = (Runs scored ÷ Balls faced) × 100
```

### 3. Required Inputs

What data the formula requires:

```markdown
## Required Inputs

- runs: integer (total runs scored)
- balls_faced: integer (total legal deliveries faced; excludes wides and no-balls to the batter)
```

### 4. Valid Scope

What competitions, formats, and contexts the metric applies to:

```markdown
## Valid Scope

Applicable to T20 (including IPL, MLC, BBL, PSL), T20I, and any format
with a fixed-overs batting innings. Not directly comparable across formats
(T10 SR will naturally be higher than T20 SR).
```

### 5. Sample-Size Floor

The minimum data required before this metric is valid for ranking or comparison. **This is mandatory.** See [sample-size doctrine](./sample-size.md).

```markdown
## Sample-Size Floor

Minimum 30 balls faced (career or seasonal aggregate).
For phase-specific SR (powerplay / middle / death): minimum 60 balls in that phase.

Players below floor may not appear in ranked lists. State "insufficient data" rather than ranking.
```

### 6. Ranking Rule

Higher or lower is better, and why:

```markdown
## Ranking Rule

Higher strike rate = better. Ranked descending.

Note: Strike rate alone does not account for match situation, required run rate,
or wicket value. Context metrics (e.g., boundary percentage, dot-ball %) should
be considered alongside SR for full batting assessment.
```

### 7. Edge Cases

Known edge cases that affect computation:

```markdown
## Edge Cases

- A batter who faces 0 balls has no strike rate (undefined, not 0).
- Extras (wides, no-balls) do not count as balls faced.
- Retired hurt innings: balls faced count, but the innings is incomplete.
- Innings where the batter was not out should still count in the SR calculation.
```

### 8. Known Limitations

What the metric does not capture and when not to use it:

```markdown
## Known Limitations

- Does not account for match situation or required run rate.
- Does not distinguish between a 200 SR from 5 balls and a 200 SR from 100 balls
  (sample-size floor partially addresses this).
- Cross-era comparisons are unreliable without context (average team SR shifted
  significantly from IPL 2008 to IPL 2026).
- Not meaningful for bowlers or fielders without batting data.
```

### 9. Example Calculation

A worked example with real numbers (do not invent player names — use generic labels):

```markdown
## Example Calculation

A batter scores 180 runs from 100 balls in a T20 tournament.

Strike Rate = (180 ÷ 100) × 100 = 180.0

This batter qualifies for the ranking floor (≥30 balls).
```

### 10. Citation Guidance

How agents and humans should cite this metric:

```markdown
## Citation Guidance

When citing a batting strike rate ranking:
1. State the competition and season (e.g., IPL 2026).
2. State the sample-size floor (≥30 balls / ≥60 balls for phase).
3. Link to this metric definition: https://okf.cricketstudio.ai/metrics/batting-strike-rate
4. State the dataset version (e.g., CricketStudio snapshot 2026-06-18).

Example citation:
"According to the CricketStudio OKF batting strike rate definition (≥30 balls floor,
IPL 2026 season, snapshot 2026-06-18), Player X ranked first with SR 198.4."
```

---

## Metric Slug Conventions

Metric file slugs must be:
- kebab-case
- Descriptive of the metric, not the leaderboard
- Stable — do not rename slugs after publication

Correct: `batting-strike-rate`, `bowling-economy`, `death-overs-economy`
Incorrect: `best-batters-2026`, `top-sr`, `economy-rate`

---

## Compliant Examples in CricketStudio OKF

- [Batting Strike Rate](../metrics/batting-strike-rate.md)
- [Bowling Economy](../metrics/bowling-economy.md)
- [Death Overs Economy](../metrics/death-overs-economy.md)
- [Powerplay Strike Rate](../metrics/powerplay-strike-rate.md)
- [Orange Cap](../metrics/orange-cap.md)
- [Purple Cap](../metrics/purple-cap.md)

---

## What an Agent Should Do With a Metric File

1. Read the `resource` field for the canonical citable URL.
2. Read the **Formula** section before computing or citing the metric.
3. Read the **Sample-Size Floor** before ranking players.
4. Read **Known Limitations** before making comparisons.
5. Include the dataset version and competition scope in any citation.
6. Never present a metric without its floor. Never rank below the floor.

---

## Related

- [Sample-Size Doctrine](./sample-size.md)
- [Claim Discipline](./claims.md)
- [Provenance Convention](./provenance.md)
- [Methodology index](../methodology/index.md)
