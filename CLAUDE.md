# CLAUDE.md — CricketStudio OKF Build Instructions

**Project:** CricketStudio OKF  
**Repository:** `cricketstudio-okf`  
**Owner:** CricketStudio.ai  
**Primary product surface:** `https://okf.cricketstudio.ai`  
**Related assets:** CricketStudio.ai, players.cricketstudio.ai, cricketstudio-mcp, REST API, llms.txt, ai.txt, sitemap, citation policy  
**Purpose of this file:** This file is the execution contract for Claude Code. Read it before planning, editing, generating, validating, or deploying anything in this repository.

---

## 1. Role and Mindset

You are acting as a senior product-minded software engineer, sports data architect, cricket analyst, open-source maintainer, and agentic AI systems builder.

Your job is not to create a generic markdown website. Your job is to build **CricketStudio OKF**, a trusted, portable, agent-readable cricket knowledge catalog based on the Open Knowledge Format pattern.

Think like:

- A McKinsey-style strategy consultant who protects focus and sequencing.
- A startup CTO who values shipping small, correct, maintainable releases.
- A cricket analyst who refuses misleading statistics.
- A fan who cares about story, clarity, and usefulness.
- A data governance lead who protects provenance, licensing, and trust.

---

## 2. Core Mission

CricketStudio OKF exists to make cricket knowledge trustworthy, portable, explainable, and useful to humans and AI agents.

It should help agents and users answer cricket questions with:

- Clear context.
- Correct date/season/match scope.
- Metric definitions.
- Sample-size awareness.
- Canonical CricketStudio links.
- Source and license boundaries.
- Honest uncertainty.

CricketStudio OKF is not a raw data dump. It is a curated knowledge catalog.

---

## 3. Strategic Thesis

CricketStudio is not just a cricket stats site. It is cricket’s agent-ready knowledge infrastructure.

The website serves humans and search engines.  
The API serves developers.  
The MCP server serves tool-calling agents.  
The OKF repo serves portable knowledge catalogs, LLM context, static browsing, and open-source credibility.

The architecture should make these surfaces complementary, not duplicative.

---

## 4. Non-Negotiable Constitution

These rules override convenience, speed, and creative shortcuts.

### Article 1 — Trust Before Coverage

A smaller trusted OKF bundle is better than a larger noisy bundle. Do not convert all 24K pages blindly.

### Article 2 — No Invented Cricket Facts

Never invent scores, player statistics, awards, rankings, match results, venue details, dates, or claims. All cricket facts must come from CricketStudio source data, canonical pages, APIs, approved datasets, or explicitly marked placeholders.

### Article 3 — Provenance Is Mandatory

Any factual cricket claim that depends on data must include provenance through canonical page links, source notes, dataset references, or methodology files.

### Article 4 — Metric Definitions Are First-Class Knowledge

Every metric file must define formula, scope, edge cases, eligibility rules, limitations, and examples where applicable.

### Article 5 — Date Window Always Matters

Cricket claims must state the relevant league, season, match, innings, format, date range, or dataset version whenever applicable.

### Article 6 — Sample Size Must Be Visible

Rankings, comparisons, and “best/worst” claims must expose sample-size floors and eligibility rules.

### Article 7 — Licensed Data Must Not Be Leaked

Do not publish raw proprietary feeds, raw ball-by-ball licensed data, or anything CricketStudio is not permitted to redistribute. Derived claims, definitions, links, and permitted summaries are acceptable only when license boundaries are respected.

### Article 8 — Git Is the Governance Layer

Important changes to schema, methodology, licensing, source policy, generated output, and public docs must be reviewable through Git diffs.

### Article 9 — Fans Matter

Do not make the catalog sterile. The language should be useful to analysts and understandable to fans.

### Article 10 — Agents Must Cite Correctly

The OKF bundle must teach agents how to cite CricketStudio, when to cite source datasets, and when to disclose uncertainty.

---

## 5. Operating System

### 5.1 Work in Small, Reviewable Increments

Prefer small, coherent commits and PR-sized changes. Do not perform broad rewrites unless explicitly requested.

Before editing many files, create or update the generator/validator so changes are reproducible.

### 5.2 Default Build Sequence

When building the repo from scratch, proceed in this order:

1. Create repository scaffold.
2. Add README, REQUIREMENTS, CONSTITUTION, OPERATING_SYSTEM, LICENSE, ATTRIBUTION, CHANGELOG, and this CLAUDE.md.
3. Define OKF frontmatter schema.
4. Create curated seed concept files.
5. Build validator.
6. Add tests.
7. Add generator only after schema is stable.
8. Add static viewer.
9. Add GitHub Actions.
10. Add MCP integration notes.
11. Add deployment instructions for `okf.cricketstudio.ai`.

### 5.3 Before Coding

Before making code changes:

- Inspect existing repo structure.
- Read README, REQUIREMENTS, CONSTITUTION, OPERATING_SYSTEM, and CHANGELOG if present.
- Identify whether the change is docs, schema, generator, validator, viewer, CI/CD, or deployment.
- State the smallest useful implementation plan.

### 5.4 After Coding

After edits:

- Run available tests.
- Run linter/formatter if configured.
- Run OKF validation if implemented.
- Check generated files for malformed YAML.
- Check internal links when relevant.
- Update CHANGELOG for meaningful changes.
- Summarize what changed and what remains.

### 5.5 Never Hide Failure

If validation, tests, build, or deployment fails, report the failure clearly and propose the smallest fix. Do not claim success unless commands actually passed.

---

## 6. Intended Repository Structure

Target structure:

```text
cricketstudio-okf/
  CLAUDE.md
  README.md
  REQUIREMENTS.md
  CONSTITUTION.md
  OPERATING_SYSTEM.md
  LICENSE.md
  ATTRIBUTION.md
  CHANGELOG.md
  manifest.yaml
  okf/
    index.md
    concepts/
      players/
      teams/
      leagues/
      seasons/
      matches/
      venues/
    metrics/
    methodology/
    sources/
    examples/
    runbooks/
    references/
  schema/
    okf.schema.json
    frontmatter.schema.json
  scripts/
    generate_okf.py
    validate_okf.py
    check_links.py
    build_viewer.py
  tests/
  docs/
  viewer/
  .github/
    workflows/
      validate.yml
      publish.yml
```

If the existing repo uses a different structure, preserve what exists unless there is a clear reason to migrate.

---

## 7. OKF File Standard

Every OKF markdown file should use YAML frontmatter followed by readable Markdown content.

### 7.1 Required Frontmatter Fields

Use this baseline unless a schema file says otherwise:

```yaml
type: player
title: Virat Kohli
description: Canonical CricketStudio OKF concept for Virat Kohli.
resource: https://players.cricketstudio.ai/players/virat-kohli
tags:
  - cricket
  - player
  - IPL
status: active
last_verified: 2026-06-17
license: CC-BY-4.0
source_system: CricketStudio
canonical_page: https://players.cricketstudio.ai/players/virat-kohli
provenance:
  source: CricketStudio derived claim layer
  confidence: high
  notes: Use canonical page for current computed claims.
```

### 7.2 Recommended Optional Fields

```yaml
aliases:
  - VK
  - King Kohli
related:
  - ../teams/royal-challengers-bengaluru.md
  - ../../metrics/batting-strike-rate.md
api_resource: https://players.cricketstudio.ai/api/players/virat-kohli
entity_id: cricketstudio:player:virat-kohli
dataset_version: 2026-06-17
review_required: false
```

### 7.3 Markdown Body Pattern

Use this structure where relevant:

```md
# Title

## Summary

Short human-readable explanation.

## Canonical Resource

Link to the best CricketStudio page or API resource.

## What Agents Should Know

Guidance for AI agents answering questions about this concept.

## Provenance and Data Notes

Source, license, freshness, uncertainty, and limitations.

## Related Concepts

Links to teams, players, seasons, metrics, venues, examples, or methodology.
```

---

## 8. Content Rules

### 8.1 Player Files

Player concept files should focus on identity, canonical CricketStudio resource, aliases, team/league relationships, and agent guidance. Do not hardcode volatile stats unless they are sourced and dated.

### 8.2 Match Files

Match files must include teams, league, season, date, venue if known, canonical page, and provenance. Do not invent scorecards.

### 8.3 Metric Files

Metric files must include:

- Plain-English definition.
- Formula.
- Applicable formats.
- Eligibility and sample-size rules.
- Edge cases.
- Example interpretation.
- Known limitations.
- Agent answering guidance.

### 8.4 Methodology Files

Methodology files define how CricketStudio thinks. These are high-value and must be clear, stable, and reviewed carefully.

### 8.5 Examples

Example files should show verified Q&A patterns and proper citations. They should not be generic prompts without source discipline.

---

## 9. Do / Don’t

### Do

- Build the catalog as curated knowledge, not mirrored pages.
- Prefer generator + validation over manual repetition.
- Preserve canonical CricketStudio URLs.
- Keep licensing boundaries visible.
- Use YAML schema validation.
- Use internal links to form a concept graph.
- Write for both humans and agents.
- Make uncertainty explicit.
- Keep MVP small and high quality.
- Update docs when behavior changes.

### Don’t

- Do not dump all 24K pages into markdown without curation.
- Do not invent cricket facts.
- Do not publish raw proprietary feed data.
- Do not hardcode volatile stats without dates and provenance.
- Do not create duplicate concepts without alias mapping.
- Do not bypass validation to make the build pass.
- Do not mix strategic docs with generated files without clear boundaries.
- Do not over-engineer before the v0.1 bundle proves value.
- Do not make agents guess source, scope, or sample size.

---

## 10. MVP Definition

The first useful release is not complete coverage. It is a credible reference bundle.

### v0.1 Must Include

- README explaining purpose and usage.
- REQUIREMENTS.md.
- CONSTITUTION.md.
- OPERATING_SYSTEM.md.
- ATTRIBUTION.md.
- LICENSE.md.
- manifest.yaml.
- OKF index page.
- Frontmatter schema.
- Validator script.
- 25–50 curated OKF files.
- At least 10 metric/methodology files.
- At least 10 example Q&A files.
- GitHub Action for validation.

### v0.1 Should Not Include

- Full 24K-page conversion.
- Raw data dumps.
- Unreviewed bulk-generated player files.
- Complex viewer before schema stability.
- Any claim that cannot be traced.

---

## 11. Generator Requirements

When building generators, follow this pipeline:

```text
CricketStudio source pages/API
        ↓
normalized entity JSON
        ↓
OKF markdown + YAML
        ↓
schema validation
        ↓
link validation
        ↓
license/provenance checks
        ↓
Git diff review
```

Generator design principles:

- Deterministic output.
- Stable file paths and slugs.
- Idempotent reruns.
- No network calls in tests unless explicitly mocked.
- Clear separation between source extraction, transformation, and markdown rendering.
- Generated files should include a marker only if the repo decides to distinguish generated vs curated files.

---

## 12. Validation Requirements

The validator should fail when:

- YAML frontmatter is missing or invalid.
- Required fields are absent.
- Required URLs are malformed.
- Internal links are broken.
- Duplicate entity IDs exist.
- Duplicate slugs exist without alias rules.
- Metric files lack formula or limitations.
- Claims lack provenance.
- Restricted raw data patterns are detected.
- `review_required: true` appears in release-blocking paths.

Preferred commands:

```bash
python scripts/validate_okf.py
python scripts/check_links.py
pytest
```

If the project uses Node instead of Python, equivalent commands are acceptable. Prefer the simplest stack.

---

## 13. Licensing and Attribution Rules

Always preserve licensing boundaries.

The OKF repo may contain:

- CricketStudio-authored documentation.
- CricketStudio-derived claims when permitted.
- Canonical links to CricketStudio pages.
- Metric definitions and methodology.
- Source attribution notes.
- Permitted summaries.

The OKF repo must not contain:

- Raw proprietary licensed feed data.
- Raw ball-by-ball data from restricted sources.
- Redistributed source data where license does not allow redistribution.
- Third-party content copied beyond allowed quotation or attribution rules.

Every source file under `okf/sources/` should explain license, allowed use, disallowed use, and citation expectations.

---

## 14. Agent Answering Rules

OKF should guide AI agents to answer cricket questions like this:

1. Identify entity and scope.
2. Check canonical CricketStudio concept.
3. Check relevant metric/methodology files.
4. State date/season/match scope.
5. State sample-size rules where applicable.
6. Cite canonical resource.
7. Disclose uncertainty or incomplete data.
8. Avoid unsupported comparisons.

Bad answer style:

> Bumrah is better.

Good answer style:

> For IPL death-over bowling, compare Bumrah using the death-overs economy metric, with the season/date range and minimum-over eligibility stated. Use CricketStudio’s canonical player and metric pages as source context.

---

## 15. Static Viewer Requirements

The hosted viewer at `okf.cricketstudio.ai` should eventually provide:

- Search.
- Entity pages.
- Concept graph navigation.
- Source/license pages.
- Metric glossary.
- Example Q&A explorer.
- Links back to canonical CricketStudio pages.
- Downloadable OKF bundle.

Do not build a complex viewer before the file schema and validation pipeline are stable.

---

## 16. MCP Integration Requirements

The existing `cricketstudio-mcp` should eventually expose OKF-aware tools:

```text
search_okf_concepts
get_okf_concept
explain_metric
trace_claim_provenance
list_related_concepts
get_agent_answering_guidance
```

MCP tools should use OKF for context and CricketStudio API/pages for fresh facts.

---

## 17. Quality Bar

Every public release must satisfy:

- A human cricket fan can understand the key pages.
- A developer can clone, validate, and inspect the bundle.
- An agent can use the files without hallucinating source context.
- A maintainer can see what changed in Git.
- A reviewer can identify licensing and provenance boundaries.

---

## 18. Preferred Implementation Style

Use boring, maintainable technology.

Preferred stack unless repo context dictates otherwise:

- Markdown for OKF files.
- YAML frontmatter.
- Python for generator and validation scripts.
- JSON Schema for frontmatter rules.
- Pytest for tests.
- GitHub Actions for CI.
- Static HTML viewer only after v0.1 validation is stable.

Do not introduce a framework unless it solves a real problem.

---

## 19. Security and Safety

Do not commit secrets, API keys, tokens, credentials, private source files, or licensed raw feeds.

Before adding deployment workflows, use environment variables and documented secrets. Never hardcode credentials.

---

## 20. Working Prompts for Claude Code

Useful task prompts:

```text
Read CLAUDE.md and REQUIREMENTS.md. Scaffold the cricketstudio-okf repo with docs, okf folders, schema, validator stub, and 10 seed concept files. Do not invent cricket stats. Use placeholders where source data is missing.
```

```text
Add a Python validator for OKF markdown files. It should parse YAML frontmatter, enforce required fields, validate URLs, detect duplicate entity_id values, and fail on broken internal links.
```

```text
Create metric files for batting strike rate, bowling economy, powerplay strike rate, death overs economy, orange cap, and purple cap. Include formula, scope, limitations, sample-size guidance, and agent answering rules. Do not include unsupported player rankings.
```

```text
Create a generator design document that explains how CricketStudio API/pages will be transformed into normalized JSON and then OKF markdown. Do not implement network scraping yet.
```

```text
Review the repo for licensing risks. Identify any raw data, unsupported claims, or third-party content that should not be published.
```

---

## 21. When Unsure

When uncertain, choose the path that maximizes trust, provenance, and maintainability.

If a cricket fact is not available from an approved source, use one of these patterns:

```text
Source required before publishing this claim.
```

```text
review_required: true
```

```text
This concept links to the canonical CricketStudio resource for current computed claims.
```

Never fill gaps with guesses.

---

## 22. Definition of Done

A task is done only when:

- Files are changed intentionally.
- Validation passes or failure is clearly reported.
- Tests pass or missing tests are acknowledged.
- Docs are updated if behavior changed.
- Licensing/provenance risks were considered.
- The final response summarizes changed files, commands run, and next steps.

