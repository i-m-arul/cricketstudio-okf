---
type: runbook
title: Update a season
description: Procedure for refreshing a season concept when a new snapshot is published.
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
  - regenerate-from-snapshot.md
---

# Runbook — Update a season

## When to use

A new snapshot has been published (new `dataset_version`) and a season concept needs to
reflect updated standings, champion, or counts.

## Steps

1. **Note the new snapshot date** from `CricketStudio internal dataset/CricketStudio internal dataset`.
2. **Update** `manifest.yaml` → `dataset_version`.
3. **Refresh the season file** (e.g. [ipl-2026.md](../scorebook/seasons/ipl-2026.md)):
   standings, champion (from the final fixture), and corpus counts — each with a refreshed
   `provenance.computed_at`.
4. **Refresh dependent concepts** (teams, players, matches) whose sourced figures changed.
5. **Bump `last_verified`** on every file you touched.
6. **Validate** and **link-check**.
7. **CHANGELOG** entry describing what changed and the new snapshot date.
8. **PR** for review.

## Pitfalls

- Distinguish league-phase standings from the playoff champion.
- Do not let stale `computed_at` dates linger on updated numbers.
- During a live tournament, remember the bundle is not a live source — see the
  the [methodology index](../methodology/index.md).

## Related

- [Methodology](../methodology/index.md)
- [Regenerate from the snapshot](regenerate-from-snapshot.md)
