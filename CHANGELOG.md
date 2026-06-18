# Changelog

All notable changes to CricketStudio OKF are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-06-18 (unreleased)

Initial curated MVP bundle.

### Added

- Repository scaffold and governance docs: `README.md`, `CONSTITUTION.md`,
  `OPERATING_SYSTEM.md`, `LICENSE.md`, `ATTRIBUTION.md`, `DATA_LICENSE_BOUNDARIES.md`,
  `manifest.yaml`.
- Frontmatter and manifest JSON Schemas under `schema/`.
- OKF index and per-folder indexes under `okf/`.
- Methodology files: sample-size floors, ranking eligibility, phase definitions,
  citation policy, correction policy, data refresh policy.
- Metric files: batting strike rate, batting average, bowling economy, bowling strike
  rate, death-overs economy, powerplay strike rate, boundary percentage, dot-ball
  percentage, orange cap, purple cap.
- Source files: Cricsheet, Sportmonks licensed-feed boundaries, CricketStudio derived claims.
- Concept files: leagues (IPL, MLC), season (IPL 2026), teams (RCB, MI, RR),
  players (Virat Kohli, Jasprit Bumrah, Vaibhav Suryavanshi), venues
  (Narendra Modi Stadium, Wankhede Stadium), and the IPL 2026 final match.
- Example Q&A files teaching agent answering patterns.
- Runbooks for common maintenance tasks.
- `scripts/validate_okf.py`, `scripts/check_links.py`, and a `pytest` suite.
- GitHub Actions for validation and publishing.
- Design notes for the generator, hosted viewer, and MCP integration.

### Data provenance

- IPL 2026 content derived from CricketStudio's claim layer (snapshot dated 2026-06-11);
  underlying live data licensed from Sportmonks, raw feed not redistributed.
- IPL historical and MLC content derived from Cricsheet (CC BY 3.0).
