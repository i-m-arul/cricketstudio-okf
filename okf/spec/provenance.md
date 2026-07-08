---
type: spec
title: Cricket OKF Provenance Convention
description: How to declare source, boundary, confidence, and freshness in a cricket OKF file. Addresses what Google OKF v0.1 leaves undefined — no provenance fields are in the base spec. This convention adds them for cricket data trust and AI-safe citation.
status: active
last_verified: 2026-06-22
timestamp: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:provenance
tags:
  - cricket
  - okf
  - specification
  - provenance
  - licensing
---

## Why Provenance?

Google OKF v0.1 has no provenance fields. For cricket data, provenance is not optional — it determines whether a claim is citable, whether an AI can safely use it, and whether a journalist can publish it.

The cricket OKF provenance convention defines a small, consistent set of fields that declare:

- **Where** the data came from (source)
- **What license** applies (license)
- **What redistribution is allowed** (source_boundary)
- **How confident** we are in the data (confidence)
- **When** it was last verified (last_verified / timestamp)
- **Which dataset version** it draws from (dataset_version)

---

## Required Provenance Fields

Files with type `player`, `team`, `venue`, `match`, `season`, or `league` — all types that assert data-dependent cricket facts — **must** include a `provenance` block.

```yaml
provenance:
  source: Cricsheet CC BY 3.0 · 75 MLC matches · 2026-06-20
  confidence: high        # high | medium | low
```

### `provenance.source`

A human-readable string naming the source, license, and scope. Examples:

```yaml
source: Cricsheet CC BY 3.0 · IPL historical 2007/08–2025 · 1,169 matches
source: CricketStudio derived claim layer · IPL 2026 snapshot 2026-06-18
source: Cricsheet CC BY 3.0 · 75 MLC matches · 2026-06-20
```

### `provenance.confidence`

One of: `high`, `medium`, `low`.

- `high` — data traceable to a verified source without transformation uncertainty
- `medium` — data derived through transformation with known methodology
- `low` — partial data, inferred values, or source with known quality gaps

### Optional: `provenance.snapshot`

The dataset version or snapshot identifier:

```yaml
snapshot: CricketStudio MLC dataset (2026-06-20)
```

### Optional: `provenance.notes`

Free-text notes on limitations, known gaps, or special handling:

```yaml
notes: Season 2024 champion not confirmed in Cricsheet data — use canonical page.
```

---

## Source Boundary

Every file must declare `source_boundary` — the licensing and redistribution envelope that governs the data in this file.

### Enum Values

| Value | Meaning | Typical use |
|-------|---------|-------------|
| `public_open_data` | Data is from a publicly licensed open source (e.g., Cricsheet CC BY 3.0). Redistribution permitted with attribution. | MLC, IPL historical |
| `derived_claims_only` | Data is derived from a licensed feed. Raw feed not redistributed; derived claims and canonical links only. | IPL 2026 licensed feed |
| `methodology_only` | File defines rules, formulas, or methodology. No cricket data is included. | Metric files, methodology files, spec files |
| `manual_curated_knowledge` | Curated knowledge from public sources; no raw data redistribution. | Player bio, league overview |
| `proprietary_source_not_redistributed` | Sourced from proprietary data. Referenced only; raw data not included. | Internal benchmark |

### Decision Rule

```
Is the underlying data from Cricsheet?          → public_open_data
Is it from a licensed third-party feed?         → derived_claims_only
Is it metric formulas / methodology / spec?     → methodology_only
Is it curated from public knowledge?            → manual_curated_knowledge
Is it from an internal or proprietary source?   → proprietary_source_not_redistributed
```

---

## Freshness Fields

### `last_verified` (required for data-bearing files)

ISO-8601 date the content was last verified against source. Equivalent to Google OKF's recommended `timestamp` field — use both in new files.

```yaml
last_verified: 2026-06-22
timestamp: 2026-06-22
```

### `dataset_version`

The snapshot date or version label for the underlying dataset:

```yaml
dataset_version: "2026-06-20"
```

---

## License Field

Every file must declare `license`. Use SPDX identifiers or plain strings:

```yaml
license: CC-BY-4.0       # OKF docs, methodology, spec files
license: CC-BY-3.0       # Cricsheet-derived content (IPL historical, MLC)
```

Do not declare a license that grants more rights than the source allows.

---

## review_required

When set to `true`, marks a file as not release-ready. The validator will fail on any `review_required: true` file in a release path. Use it when a claim needs source confirmation before publishing:

```yaml
review_required: true
# Example: Season 2024 champion not confirmed — source required.
```

---

## What Provenance Enables for Agents

An agent reading a cricket OKF file should be able to answer:

1. Where did this data come from? → `provenance.source`
2. Can I cite it? → `license` + `source_boundary`
3. Is this data fresh? → `last_verified` / `dataset_version`
4. How confident should I be? → `provenance.confidence`
5. Is this safe to redistribute? → `source_boundary`

If any of these are missing, the agent should default to "not confirmed — use canonical page."

---

## Non-Negotiables

- Never declare `source_boundary: public_open_data` for data from a licensed feed.
- Never declare `confidence: high` when transformation steps introduce uncertainty.
- Never omit `last_verified` from a data-bearing file — freshness is a trust signal.
- Never cite generated prose as source evidence. The provenance fields must trace to real data.

---

## Related

- [Type Vocabulary](./types.md)
- [Metric Standard](./metrics.md)
- [Sample-Size Doctrine](./sample-size.md)
- [CricketStudio source declaration](../sources/cricketstudio-derived-claims.md)
- [Cricsheet source declaration](../sources/cricsheet.md)
