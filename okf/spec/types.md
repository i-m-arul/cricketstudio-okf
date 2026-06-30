---
type: spec
title: Cricket OKF Type Vocabulary
description: Canonical list of OKF type values for cricket domain bundles. Extends Google OKF's open type system with 19 cricket-specific types, each with a definition, required extra fields, and an example frontmatter block.
status: active
last_verified: 2026-06-22
timestamp: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:types
tags:
  - cricket
  - okf
  - specification
  - types
  - vocabulary
---

## Overview

Google OKF v0.1 uses an open `type` system — values are not registered centrally and producers choose descriptive, self-explanatory strings. This document defines the canonical cricket domain vocabulary: 19 `type` values that any cricket OKF bundle should use for interoperability.

Consumers must tolerate unknown types. These values are **not** a closed enum imposed on all OKF producers — they are the vocabulary CricketStudio OKF uses, offered as a community standard for cricket data.

---

## Cricket OKF Types

### Entity Types

| Type | Description | Primary use |
|------|-------------|-------------|
| `player` | An individual cricket player | Player profiles, career records |
| `team` | A cricket franchise or national team | Team profiles, season records |
| `league` | A cricket competition (IPL, MLC, BBL) | League overviews |
| `season` | A single edition of a competition | Season reports, standings |
| `match` | A single cricket match | Match metadata, results |
| `venue` | A cricket ground or stadium | Venue stats, toss data |

### Knowledge Types

| Type | Description | Primary use |
|------|-------------|-------------|
| `metric` | A cricket metric definition | Batting SR, bowling economy, etc. |
| `methodology` | An operational rule or doctrine | Sample-size floors, ranking rules |
| `research` | An analytical report or investigation | Season analysis, trend research |
| `dossier` | A verified Q&A pattern for AI agents | Agent answering guidance |
| `spec` | A formal specification document | This file and its siblings |
| `source` | A data source declaration | Cricsheet, licensed feed boundary |
| `record` | An all-time or historical record | Most runs, most wickets all-time |
| `leaderboard` | A ranked list for a specific metric | Top 10 batting SR in a season |
| `claim` | A machine-readable cricket assertion | Structured claim objects (Level 3) |

### Navigation Types

| Type | Description | Primary use |
|------|-------------|-------------|
| `index` | A directory or category index | `/scorebook/index.md`, `/metrics/index.md` |
| `runbook` | An operational procedure | Fix broken canonical URL |
| `reference` | An external resource pointer | External dataset links |
| `api` | An API resource description | API endpoint documentation |

---

## Required Extra Fields by Type

Beyond the base Google OKF fields (`type`, `title`, `description`), the cricket profile requires additional fields per type:

### All cricket domain types (except `index`, `runbook`, `reference`, `spec`)

```yaml
status: active          # active | draft | deprecated | archived
last_verified: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: public_open_data   # see provenance spec
```

### Entity types (`player`, `team`, `venue`, `match`, `league`, `season`)

```yaml
provenance:
  source: Cricsheet CC BY 3.0 · 75 MLC matches · 2026-06-20
  confidence: high
```

### `metric` type

```yaml
resource: https://okf.cricketstudio.ai/metrics/batting-strike-rate
# resource is required for metric type — the canonical definition URL
```

### `dossier` type

```yaml
canonical_page: https://players.cricketstudio.ai/...   # live data reference
```

---

## Example Frontmatter Blocks

### player

```yaml
---
type: player
title: Example T20 Batter
description: OKF player concept file. Links to canonical page for live computed claims.
status: active
last_verified: 2026-06-22
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:player:example-t20-batter
canonical_page: https://players.cricketstudio.ai/players/example-t20-batter
provenance:
  source: Cricsheet CC BY 3.0
  confidence: high
tags:
  - cricket
  - player
same_as:
  cricsheet: example_t20_batter
---
```

### metric

```yaml
---
type: metric
title: Batting Strike Rate
description: Runs scored per 100 balls faced. Core T20 batting efficiency metric.
status: active
last_verified: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:metric:batting-strike-rate
resource: https://okf.cricketstudio.ai/metrics/batting-strike-rate
tags:
  - cricket
  - metric
  - batting
---
```

### dossier

```yaml
---
type: dossier
title: Who leads MLC powerplay batting strike rate?
description: Verified answer pattern for MLC powerplay SR leader. Includes scope, floor, and citation behavior.
status: active
last_verified: 2026-06-22
license: CC-BY-3.0
source_system: CricketStudio
source_boundary: public_open_data
entity_id: cricketstudio:dossier:mlc-powerplay-sr-leader
canonical_page: https://players.cricketstudio.ai/leagues/mlc/leaderboards/powerplay-strike-rate
provenance:
  source: Cricsheet CC BY 3.0 · 75 MLC matches · 2026-06-20
  confidence: high
tags:
  - cricket
  - dossier
  - MLC
  - powerplay
---
```

---

## Agent Guidance

When identifying what a cricket OKF file contains, use the `type` field — not the file path or title — as the authoritative kind indicator. The same short name (e.g., `orange-cap`) can legitimately appear in different directories with different entity IDs and types; resolve ambiguity via `entity_id`, not filename.

---

## Related

- [Provenance Convention](./provenance.md)
- [Metric Standard](./metrics.md)
- [Entity Identity Rules](./identity.md)
- [Conformance Levels](./conformance.md)
