---
type: methodology
title: Alignment with Google Open Knowledge Format v0.1
description: How cricketstudio-okf maps to Google OKF v0.1. Documents field-level alignment between CricketStudio's extended frontmatter and Google's recommended fields, confirms conformance as a domain bundle, and explains which extensions are cricket-specific additions vs. base spec fields.
status: active
last_verified: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:methodology:google-okf-alignment
tags:
  - cricket
  - okf
  - methodology
  - google-okf
  - alignment
  - standard
---

## Overview

The `cricketstudio-okf` bundle is a **conformant Google OKF domain bundle**. It uses the Google Open Knowledge Format v0.1 as its base format — Markdown files with YAML frontmatter and an open `type` vocabulary — and extends it with cricket-specific fields that Google OKF explicitly permits.

This document records the alignment so maintainers and contributors understand which fields are from the base spec and which are cricket domain additions.

---

## Base Format Conformance

Google OKF v0.1 requires:

| Field | Required? | CricketStudio OKF | Notes |
|-------|-----------|-------------------|-------|
| `type` | **Required** | ✓ Present on every file | Extended with cricket vocabulary |

Google OKF v0.1 recommends:

| Field | Google OKF name | CricketStudio OKF equivalent | Notes |
|-------|-----------------|------------------------------|-------|
| Human-readable display name | `title` | `title` | ✓ Direct match |
| One-sentence summary | `description` | `description` | ✓ Direct match |
| URI for the underlying asset | `resource` | `canonical_page` / `resource` | Both accepted; `resource` is the Google OKF name |
| Cross-cutting labels | `tags` | `tags` | ✓ Direct match |
| ISO 8601 last-changed timestamp | `timestamp` | `last_verified` / `timestamp` | Both accepted; `timestamp` is the Google OKF name |

### Field Aliases

`canonical_page` and `resource` are functionally equivalent in this bundle. New files should use `resource` (Google OKF recommended name). Existing files use `canonical_page` — both are accepted by the schema.

`last_verified` and `timestamp` are aliases. New files may include both. `last_verified` is an ISO date (YYYY-MM-DD); `timestamp` accepts the same.

---

## Cricket Domain Extensions

These fields are added by the cricket OKF profile and are not part of Google OKF v0.1. Google OKF explicitly permits additional keys: *"Producers MAY include any additional keys."*

| Field | Purpose | Required by |
|-------|---------|-------------|
| `status` | Lifecycle state (active/draft/deprecated) | Cricket OKF profile |
| `license` | SPDX license identifier | Cricket OKF profile |
| `source_system` | Which system produced the data | Cricket OKF profile |
| `source_boundary` | Redistribution and licensing envelope | Cricket OKF profile |
| `entity_id` | Stable machine identifier | Cricket OKF profile |
| `provenance` | Source, confidence, snapshot | Cricket OKF profile |
| `dataset_version` | Snapshot date or version label | Cricket OKF profile |
| `review_required` | Release-blocking flag | Cricket OKF profile |
| `same_as` | External entity IDs (Cricsheet, Wikidata) | Cricket OKF profile |
| `aliases` | Name variants and alternate identifiers | Cricket OKF profile |
| `related` | Internal links forming concept graph | Cricket OKF profile |
| `canonical_page` | Canonical CricketStudio URL | Cricket OKF profile (alias of `resource`) |

---

## Type Vocabulary

Google OKF's `type` field is open — values are not registered centrally. The cricket OKF profile defines 19 cricket-specific type values as a community vocabulary. See [spec/types](../spec/types.md).

These types do not conflict with other domain bundles because they are descriptive cricket terms unlikely to collide with non-cricket type vocabularies.

---

## Contribution to Google OKF

The `examples/cricket/` directory at this repository root contains a standalone cricket domain example bundle prepared as a PR contribution to [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog). The bundle demonstrates:

- Cricket type vocabulary
- Provenance convention
- Sample-size doctrine
- Metric definition standard (batting strike rate, bowling economy, death-overs economy)
- Dossier Q&A pattern

The contribution bundle is clean of CricketStudio-internal paths and prepared for standalone use.

---

## Conformance Declaration

`cricketstudio-okf` is a Google OKF-conformant domain bundle:

- Format: Google OKF v0.1 (Markdown + YAML frontmatter, open `type`)
- Domain: Cricket
- Profile: Cricket OKF v0.3
- Conformance level: Level 2 — Evidence-Backed (per [spec/conformance](../spec/conformance.md))
- CI validation: `python scripts/validate_okf.py && pytest` on every PR

---

## Links

- [Google OKF SPEC.md](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
- [Cricket OKF Specification](../spec/index.md)
- [Cricket OKF Conformance Levels](../spec/conformance.md)
- [Cricket OKF Type Vocabulary](../spec/types.md)
