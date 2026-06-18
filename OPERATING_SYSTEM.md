# CricketStudio OKF Operating System

How the project runs week to week.

## Release model

Semantic versions:

| Version | Theme |
|---------|-------|
| `v0.1`  | Curated MVP bundle (this release) |
| `v0.2`  | Generator + validation pipeline over the snapshot |
| `v0.3`  | Hosted viewer (`okf.cricketstudio.ai`) + MCP integration |
| `v1.0`  | Stable public cricket OKF with quality gates and contribution model |

## Governance roles

One person may hold several roles, but each role should still be exercised mentally.

| Role | Responsibility |
|------|----------------|
| Product owner | Scope and release priorities |
| Cricket analyst | Validates cricket meaning and methodology |
| Data engineer | Generation, validation, CI/CD |
| Open-source maintainer | Issues, PRs, docs, releases |
| Fan reviewer | Ensures language is understandable and useful |

## Work in small, reviewable increments

Prefer small, coherent commits and PR-sized changes. Before editing many files, build or
update the generator/validator so changes are reproducible. Do not perform broad rewrites
unless explicitly requested.

## Change management — every PR answers

1. What concept changed?
2. Why does the change matter?
3. What source supports it?
4. Does it affect licensing?
5. Does it affect downstream agents or MCP tools?
6. Does it require a CHANGELOG entry?

## Quality gates (a PR fails validation if)

- Required frontmatter is missing or invalid YAML.
- `type` is missing or not one of the approved values.
- A required canonical/resource URL is missing or malformed.
- An internal link is broken.
- A metric file lacks a formula or limitations.
- A data-dependent claim lacks provenance.
- `source_boundary` is not declared.
- A restricted raw-data pattern is detected.
- A concept duplicates another (`entity_id`/slug) without alias mapping.
- `review_required: true` appears in a release-blocking path.

Run locally before pushing:

```bash
python scripts/validate_okf.py
python scripts/check_links.py
pytest
```

## Definition of done

A task is done only when files changed intentionally, validation passes (or failure is
reported clearly), tests pass (or gaps are acknowledged), docs are updated if behavior
changed, licensing/provenance was considered, and the change is summarized.

This consolidates CLAUDE.md §5 and REQUIREMENTS.md §10.
