# Data License Boundaries

This file defines what CricketStudio OKF may and may not publish. It governs the
`source_boundary` frontmatter field and is enforced by `scripts/validate_okf.py`.

## The boundary values

| `source_boundary` | Meaning | May redistribute? |
|-------------------|---------|-------------------|
| `derived_claims_only` | Claims derived from a licensed feed (e.g. Sportmonks). | Derived claims only — never the raw feed. |
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

- Raw proprietary licensed feed data (e.g. the Sportmonks JSON feed).
- Raw ball-by-ball delivery data from restricted sources.
- Redistributed source data where the license does not allow redistribution.
- Third-party content beyond allowed quotation/attribution.

## Why reading the snapshot is in-license

The OKF generator reads `cricketstudio-mcp/data/snapshot/*.json`. That snapshot is, by
its own `metadata.json`, a *"pre-computed projection of CricketStudio's data spine"* in
which *"live match state (docs/match/\*) is NOT bundled"*. It is the permitted
derived-claims layer — already stripped of raw licensed deliveries — which is precisely
why it is the correct input for an openly published bundle.

## Restricted-data tripwires (validator)

`validate_okf.py` fails the build if a file appears to embed raw feed material, including
(non-exhaustive): large embedded ball-by-ball arrays, a `"balls": [` delivery dump,
Sportmonks raw fixture payloads, or any block tagged as a verbatim proprietary feed. When
in doubt, link to the canonical page instead of pasting data.
