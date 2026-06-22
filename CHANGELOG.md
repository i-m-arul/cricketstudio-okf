# Changelog

All notable changes to CricketStudio OKF are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## [0.3.0] — 2026-06-22

Cricket OKF Standards Layer — formal specification, conformance levels, releases, Google OKF alignment, and contribution bundle.

### Added

- `okf/spec/` — 8 specification files: index, types, provenance, metrics, claims,
  identity, sample-size, conformance. Defines the Cricket OKF domain profile on top of
  Google OKF v0.1.
- `okf/releases/` — versioned release notes: v0.1.md, v0.2.md, v0.3.md.
- `okf/sources/google-okf-alignment.md` — field-level alignment with Google OKF v0.1.
- `examples/cricket/` — 13-file standalone contribution bundle for PR to
  GoogleCloudPlatform/knowledge-catalog.
- `viewer/src/app/conformance/page.tsx` — dedicated conformance page with level
  checklist and Level 2 self-certification.
- `viewer/src/app/releases/page.tsx` — dedicated releases page with version history.
- "Spec" nav link in Header.tsx.
- "Specification" and "Conformance" cards on homepage.

### Changed

- Homepage hero copy: updated to "Open Knowledge Framework for Cricket Data".
  Removed overreach language ("OKF gives you the open standard behind them" referring
  to CricketStudio.ai — CricketStudio.ai is an independent product that links to OKF).
- `schema/frontmatter.schema.json`: added "spec" to type enum.
- `scripts/validate_okf.py`: added soft warnings for missing Google OKF recommended
  fields (resource, timestamp) — not blocking errors.
- `viewer/src/lib/constants.ts`: added TYPE_LABELS entries for spec, leaderboard,
  claim, api.
- `manifest.yaml`: bumped to v0.3.0; updated description; added spec and leaderboard
  to counts.
- `viewer/public/llms.txt`: added spec section, Google OKF alignment statement,
  conformance declaration.

### Conformance

Level 2 — Evidence-Backed. Self-certified 2026-06-22.

---

## [0.1.0] — 2026-06-18

Initial curated MVP bundle.

### Added

- Repository scaffold and governance docs: `README.md`, `LICENSE.md`, `ATTRIBUTION.md`,
  `DATA_LICENSE_BOUNDARIES.md`, `manifest.yaml`.
- Frontmatter and manifest JSON Schemas under `schema/`.
- OKF index and per-folder indexes under `okf/`.
- Methodology files: sample-size floors, ranking eligibility, phase definitions,
  citation policy.
- Metric files: batting strike rate, batting average, bowling economy, bowling strike
  rate, death-overs economy, powerplay strike rate, boundary percentage, dot-ball
  percentage, orange cap, purple cap.
- Source files: Cricsheet attribution, CricketStudio derived claims.
- Concept files: leagues (IPL, MLC), seasons (IPL 2026, IPL 2026 Champions), teams (RCB,
  MI, RR), players (Virat Kohli, Jasprit Bumrah, Vaibhav Suryavanshi), venues
  (Narendra Modi Stadium, Wankhede Stadium), and the IPL 2026 final match.
- Research reports: State of IPL 2026, State of MLC 2025, MLC Three Seasons, toss
  effects (IPL + MLC), death-overs intelligence (IPL 2026 + MLC).
- 22 example Q&A files teaching agent answering patterns.

### Data provenance

- IPL 2026 content derived from CricketStudio's claim layer (dataset version 2026-06-11);
  raw licensed feed not redistributed.
- IPL historical and MLC content derived from Cricsheet (CC BY 3.0).
