---
type: spec
title: Cricket OKF Conformance Levels
description: Five conformance levels (0–4) for cricket OKF bundles. Defines what each level requires, how to self-certify, and what the CricketStudio OKF reference bundle achieves. Allows any cricket data provider to assess their own OKF compliance.
status: active
last_verified: 2026-06-22
timestamp: 2026-06-22
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
entity_id: cricketstudio:spec:conformance
tags:
  - cricket
  - okf
  - specification
  - conformance
  - standard
---

## What Is a Conformance Level?

Cricket OKF conformance levels describe how completely a bundle implements the cricket OKF profile on top of Google OKF v0.1. They are:

- **Honest** — a bundle claims only the level it can demonstrate.
- **Graduated** — each level includes all requirements of levels below it.
- **Implementation-neutral** — any cricket data provider can use them, not just CricketStudio.
- **Independently verifiable** — each level's requirements are explicit enough to check with a validator.

---

## Level 0 — Cataloged

The bundle uses Google OKF file format with cricket-domain type values. No provenance, no metric definitions, no citation rules.

**Requirements:**
- Every `.md` file has valid YAML frontmatter
- Every file has a non-empty `type` field using cricket OKF vocabulary
- Every file has `title` and `description`

**Limitation:** Claims cannot be cited independently. No source traceability.

---

## Level 1 — Citable

Every file in the bundle can be cited with a stable URL and a declared source boundary.

**Requirements (all Level 0 +):**
- Every data-bearing file has `canonical_page` or `resource` (a citable URL)
- Every file declares `source_boundary`
- Every file declares `license`
- Every file declares `source_system`

**What this enables:** Journalists and agents can link to a specific file and disclose its source. Still no metric definitions or sample-size rules.

---

## Level 2 — Evidence-Backed ✓ CricketStudio OKF reference bundle

Every data-bearing claim in the bundle has a traceable evidence reference, a declared freshness date, and is backed by explicit metric definitions and sample-size rules.

**Requirements (all Level 1 +):**
- Every data-bearing file has a `provenance` block with `source` and `confidence`
- Every file has `last_verified` (ISO date)
- Every file has `dataset_version` where applicable
- The bundle includes metric files for every metric cited in ranked claims
- Every metric file has: formula, sample-size floor, limitations, ranking rule
- The bundle includes methodology files for: sample-size floors, phase definitions, ranking eligibility
- Leaderboard/ranking files declare the floor and scope they apply

**What this enables:** Agents can safely answer questions with correct scope, sample size, and confidence. Claims are traceable to source and dated.

**CricketStudio OKF reference bundle self-certification:** ✓ **Level 2 (June 2026)**

---

## Level 3 — Agent-Safe (Roadmap: v0.4)

The bundle provides structured, machine-readable claim objects that agents can parse without natural language extraction.

**Requirements (all Level 2 +):**
- The bundle includes machine-readable claim objects with: `claim_id`, `claim_type`, `entity_refs`, `metric_refs`, `evidence_refs`, `scope`, `sample_size`, `sample_size_rule`, `confidence`, `limitations`, `canonical_url`
- The bundle includes a published JSON Schema for the claim object
- The bundle includes evaluation cases (`/evals`) showing correct and incorrect agent behavior
- The bundle includes an agent usage specification with machine-parseable rules

**What this enables:** RAG systems, MCP tools, and agent pipelines can ingest structured claim objects without relying on prose parsing.

---

## Level 4 — Auditable (Roadmap: v1.0)

The bundle is versioned, regression-tested, and independently auditable. External implementations exist.

**Requirements (all Level 3 +):**
- Versioned schema releases with breaking-change documentation
- Published conformance reports per release
- Automated regression tests on claim objects (not just schema validation)
- Published eval results showing pass/fail per eval case per release
- At least one external implementation or community validation of conformance

**What this enables:** OKF becomes a credible open standard. Implementors can certify conformance. Researchers and journalists can audit the standard's own compliance.

---

## Conformance Checklist

Use this checklist to assess a bundle:

### Level 0 Checklist
- [ ] All `.md` files have valid YAML frontmatter
- [ ] All files have a non-empty `type` value
- [ ] All files have `title` and `description`

### Level 1 Additional Requirements
- [ ] All data-bearing files have `canonical_page` or `resource`
- [ ] All files declare `source_boundary`
- [ ] All files declare `license`
- [ ] All files declare `source_system`

### Level 2 Additional Requirements
- [ ] All data-bearing files have `provenance.source` and `provenance.confidence`
- [ ] All files have `last_verified`
- [ ] Metric files exist for every cited metric
- [ ] Each metric file has: formula, floor, limitations, ranking rule
- [ ] Methodology files exist for: sample-size floors, phase definitions, ranking eligibility
- [ ] Ranking files declare floor and scope

### Level 3 Additional Requirements (Roadmap)
- [ ] Machine-readable claim objects with full schema
- [ ] JSON Schema for claim objects published
- [ ] Eval cases published at `/evals`
- [ ] Agent usage spec published

### Level 4 Additional Requirements (Roadmap)
- [ ] Versioned releases with change docs
- [ ] Published conformance reports
- [ ] Automated regression test suite
- [ ] Eval results published per release
- [ ] External implementation or community validation

---

## Self-Certification

To self-certify your bundle's conformance level:

1. Run the Level N checklist against your bundle.
2. Confirm every item passes (or explicitly acknowledge what is missing and why).
3. Publish your self-certification in your bundle's README or a `conformance.md` file at the bundle root.
4. Link to this specification page as the authority.

**CricketStudio OKF self-certification:**

| Bundle | Level | Date | Notes |
|--------|-------|------|-------|
| cricketstudio-okf v0.3 | Level 2 | 2026-07-07 | CI-validated; 1,700+ files; metric + methodology coverage |

---

## How Another Provider Uses This

Any cricket data provider can implement the cricket OKF profile:

1. Use Google OKF v0.1 as the base format (Markdown + YAML, `type` field).
2. Follow the cricket OKF type vocabulary ([spec/types](./types.md)).
3. Declare provenance per the provenance convention ([spec/provenance](./provenance.md)).
4. Write metric files per the metric standard ([spec/metrics](./metrics.md)).
5. Apply sample-size floors per the doctrine ([spec/sample-size](./sample-size.md)).
6. Self-certify at the level they achieve using this checklist.

No license fee, no registration, no approval required.

---

## Related

- [Type Vocabulary](./types.md)
- [Provenance Convention](./provenance.md)
- [Metric Standard](./metrics.md)
- [Sample-Size Doctrine](./sample-size.md)
- [Claim Discipline](./claims.md)
- [Releases](/releases)
