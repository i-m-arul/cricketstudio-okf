---
type: runbook
title: Regenerate from the snapshot
description: Procedure for refreshing curated files (and, in v0.2, generated files) from a new snapshot.
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: manual_curated_knowledge
canonical_page: https://players.cricketstudio.ai
resource: https://players.cricketstudio.ai
tags:
  - cricket
  - runbook
related:
  - ../methodology/index.md
  - update-season.md
---

# Runbook — Regenerate from the snapshot

## When to use

A new CricketStudio snapshot is available and you want the bundle's sourced figures to
reflect it.

## Inputs

- Source of truth: `CricketStudio internal dataset`
- The snapshot date in `CricketStudio internal dataset` (`generatedAt`).

## Steps (v0.1 — curated)

1. Read the new snapshot date; update `manifest.yaml` → `dataset_version`.
2. For each curated concept that pins sourced figures (players, teams, season, match,
   venues), re-read the corresponding snapshot record and update values + `computed_at`.
3. Bump `last_verified` on touched files.
4. `python scripts/validate_okf.py && python scripts/check_links.py && pytest`.
5. CHANGELOG + PR.

## Steps (v0.2 — generated, planned)

When `scripts/generate_okf.py` exists, regeneration is deterministic:

1. Point the generator at the new snapshot directory (path is configurable).
2. Run the generator; it emits OKF markdown with stable slugs (idempotent reruns).
3. Review the Git diff — curated files are preserved; generated files carry `generated: true`.
4. Validate, link-check, CHANGELOG, PR.

See the generator design notes in [README.md](../../README.md) and the [methodology index](../methodology/index.md).

## Pitfalls

- Reruns must be idempotent — no spurious diffs from nondeterministic ordering.
- Never pull from the main `cricketstudio/data/` directory, which mixes in raw licensed
  material; the MCP snapshot is the license-safe input.

## Related

- [Methodology](../methodology/index.md)
- [Update a season](update-season.md)
