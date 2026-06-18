# Data License Boundaries

This file defines what CricketStudio OKF may and may not publish. It governs the
`source_boundary` frontmatter field.

## The boundary values

| `source_boundary` | Meaning | May redistribute? |
|-------------------|---------|-------------------|
| `derived_claims_only` | Claims derived from a licensed third-party data feed. | Derived claims only — never the raw feed. |
| `public_open_data` | Open-licensed source (Cricsheet, CC BY 3.0). | Yes, with attribution. |
| `proprietary_source_not_redistributed` | Proprietary source referenced but not reproduced. | No data — links/references only. |
| `manual_curated_knowledge` | CricketStudio-authored prose. | Yes (CC-BY-4.0). |
| `methodology_only` | Definitions and methods, no entity data. | Yes (CC-BY-4.0). |

## What the OKF bundle MAY contain

- CricketStudio-authored documentation, methodology, and metric definitions.
- CricketStudio-derived claims **where the license permits**, with provenance.
- Canonical links to CricketStudio pages and API resources.
- Cricsheet-derived summaries, **with required CC BY 3.0 attribution**.
- Source attribution notes and permitted aggregate summaries.

## What the OKF bundle MUST NOT contain

- Raw proprietary licensed feed data.
- Raw ball-by-ball delivery data from restricted sources.
- Redistributed source data where the license does not allow redistribution.
- Third-party content beyond allowed quotation/attribution.

## Why derived claims are safe to publish

CricketStudio's OKF bundle contains only *derived claims* — computed aggregates, season
summaries, metric definitions, and canonical links. The underlying raw licensed ball-by-ball
data is never included. When in doubt, link to the canonical CricketStudio page instead of
pasting data.
