---
type: spec
title: Cricket OKF Specification
description: Formal specification for representing cricket knowledge as Google OKF-conformant bundles. Defines the Cricket OKF type vocabulary, provenance convention, metric standard, claim discipline, entity identity rules, and sample-size doctrine.
status: active
last_verified: 2026-06-22
timestamp: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:index
tags:
  - cricket
  - okf
  - specification
  - standard
---

## What is the Cricket OKF Specification?

**CricketStudio OKF** is a curated cricket knowledge catalog built on the [Google Open Knowledge Format (OKF) v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) — a portable, agent-readable format for representing knowledge as plain Markdown files with YAML frontmatter.

Google OKF defines the base format. This specification defines the **cricket domain profile on top of it**: a vocabulary, provenance convention, metric standard, claim discipline, entity identity rules, and sample-size doctrine that any cricket data provider can implement.

```
Google OKF v0.1          →  base format (1 required field: type)
Cricket OKF profile      →  this spec (cricket types, provenance, metrics, claims)
cricketstudio-okf bundle →  reference implementation (1,900+ files, CI-validated)
```

CricketStudio.ai is an independent product that links to and cites OKF. It is not described as an OKF implementation.

---

## Scope

This specification covers:

- Cricket OKF **type vocabulary** — the canonical `type` values for cricket entities
- **Provenance convention** — how to declare source, boundary, confidence, and freshness
- **Metric definition standard** — what every cricket metric file must include
- **Claim discipline** — how to make a verifiable cricket assertion
- **Entity identity rules** — slug conventions, aliases, external IDs, disambiguation
- **Sample-size doctrine** — minimum data thresholds before a claim is valid

This specification does **not** cover:

- Raw ball-by-ball data redistribution
- Live cricket scores or real-time feeds
- Fantasy cricket analytics
- Any format other than T20 (unless explicitly stated in scope)

---

## Specification Documents

| Document | Path | What it defines |
|----------|------|-----------------|
| Types | [spec/types](./types.md) | Cricket OKF type vocabulary (19 types) |
| Provenance | [spec/provenance](./provenance.md) | Source, boundary, confidence, freshness fields |
| Metrics | [spec/metrics](./metrics.md) | What every metric file must include |
| Claims | [spec/claims](./claims.md) | How to make a verifiable cricket assertion |
| Identity | [spec/identity](./identity.md) | Entity identity rules and slug conventions |
| Sample Size | [spec/sample-size](./sample-size.md) | Minimum data floors for valid claims |
| Conformance | [spec/conformance](./conformance.md) | Conformance levels (0–4) and checklist |

---

## Version

This is **Cricket OKF Profile v0.3**. See [/releases](/releases) for the version history.

---

## Relationship to Google OKF

Google OKF v0.1 requires only one field: `type`. All other fields are optional.

This cricket profile extends Google OKF with domain-specific required fields (`source_boundary`, `license`, `last_verified`) and a richer provenance model. Extensions use additional YAML keys, which Google OKF explicitly permits: *"Producers MAY include any additional keys."*

The `cricketstudio-okf` bundle is a conformant Google OKF domain bundle at Level 2 (Evidence-Backed). See [conformance](./conformance.md).

---

## Related

- [Google OKF SPEC.md](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
- [About CricketStudio OKF](/about)
- [Conformance](/conformance)
- [Releases](/releases)
