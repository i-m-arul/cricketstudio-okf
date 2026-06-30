---
type: source
title: Cricsheet
description: Open ball-by-ball cricket data source (CC BY 3.0) behind IPL historical and MLC content.
resource: https://cricsheet.org
status: active
last_verified: 2026-06-18
timestamp: 2026-06-18
license: CC-BY-3.0
source_system: Cricsheet
source_boundary: public_open_data
entity_id: cricketstudio:source:cricsheet
canonical_page: https://cricsheet.org
tags:
  - cricket
  - source
  - cricsheet
related:
  - cricketstudio-derived-claims.md
  - ../methodology/citation-policy.md
---

# Cricsheet

## Summary

[Cricsheet](https://cricsheet.org) publishes ball-by-ball data for cricket matches under a
permissive open license. In this bundle it underpins **IPL historical** (2007/08–2025) and
**Major League Cricket** content.

## License

**Creative Commons Attribution 3.0 Unported (CC BY 3.0).**

- **Allowed:** use, adaptation, and redistribution of derived summaries, with attribution.
- **Required:** credit Cricsheet and indicate changes.
- **Disallowed:** removing attribution or implying Cricsheet endorsement.

## Allowed Use in OKF

Files derived from Cricsheet carry `source_boundary: public_open_data` and must preserve
the Cricsheet credit (see `ATTRIBUTION.md`). Derived aggregates and claims are publishable.

## Attribution Statement

> Match data sourced from Cricsheet (https://cricsheet.org), licensed under CC BY 3.0.

## Citation Expectations

When an agent answers using IPL-historical or MLC content, it should credit Cricsheet as
the underlying data source in addition to citing the canonical CricketStudio page.

## Data Notes

- Cricsheet identifies players with its own person IDs; CricketStudio bridges these to
  canonical slugs deterministically (never fuzzy-matched).
- Historical coverage spans 18 IPL seasons and MLC 2023–2026.

## Related Concepts

- [CricketStudio Derived Claims](cricketstudio-derived-claims.md)
- [Citation Policy](../methodology/citation-policy.md)
