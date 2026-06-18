# CricketStudio OKF Requirements

**Document version:** v0.1  
**Date:** 2026-06-17  
**Owner:** CricketStudio.ai  
**Proposed repository:** `cricketstudio-okf`  
**Proposed hosted site:** `https://okf.cricketstudio.ai`  
**Related assets:** `CricketStudio.ai`, `players.cricketstudio.ai`, `cricketstudio-mcp`, REST API, `llms.txt`, `ai.txt`, sitemap, citation policy

---

## 1. Executive Summary

CricketStudio OKF will be the open, agent-readable knowledge layer for cricket data, methodology, metrics, claims, and provenance. It will repurpose CricketStudio’s existing 24K+ canonical cricket pages into a curated Open Knowledge Format bundle rather than a raw mirror of every page.

The goal is to make CricketStudio the trusted cricket knowledge catalog for humans, developers, AI agents, search engines, analysts, journalists, fantasy players, and cricket fans.

CricketStudio already has the hard part: canonical player and match pages, structured cricket statistics, atomic claims, citation discipline, sample-size floors, REST APIs, MCP tooling, and AI-readable surfaces. OKF should turn those assets into a portable Git-based knowledge product.

The first release should not attempt to convert all 24K pages. It should launch as a curated, high-quality v0.1 bundle covering the most important concepts: leagues, seasons, teams, players, matches, venues, metrics, methodologies, source policies, examples, and runbooks.

The strategic thesis:

> CricketStudio is not just a cricket stats website. It is cricket’s agent-ready knowledge infrastructure.

---

## 2. Mission

To make cricket knowledge trustworthy, portable, explainable, and usable by both humans and AI agents.

CricketStudio OKF exists to answer cricket questions with context, citation, provenance, and methodology—not just raw numbers.

Examples:

- Not only “Who scored the most runs?” but “What is the metric definition, season scope, source, sample-size rule, and canonical CricketStudio URL?”
- Not only “What did Suryavanshi score against MI?” but “Which match, which innings, what source claim, what ball-by-ball lineage, and what confidence level?”
- Not only “Who is better?” but “Under which format, phase, opposition, venue, date range, and minimum sample?”

---

## 3. Vision

CricketStudio OKF should become the open cricket knowledge catalog that agents, analysts, fans, and developers can trust.

Long-term vision:

1. **For fans:** A clean way to understand cricket stories through verified facts.
2. **For analysts:** A curated semantic layer over cricket statistics and definitions.
3. **For developers:** A portable knowledge bundle that can be indexed, queried, versioned, and embedded.
4. **For AI agents:** A context layer that reduces hallucination and improves citation quality.
5. **For CricketStudio:** A defensible knowledge moat that connects the website, API, MCP, and future AI products.

The aspiration:

> If Wikipedia is the open encyclopedia of cricket facts and Cricbuzz/ESPNcricinfo are live media/stat portals, CricketStudio OKF should become the open agent-ready cricket knowledge catalog.

---

## 4. Strategic Rationale

### 4.1 Why Build This Now

Google’s Open Knowledge Format creates a simple pattern for publishing knowledge as a directory of Markdown files with YAML frontmatter. This aligns naturally with CricketStudio’s existing direction: canonical cricket pages, structured metadata, citation claims, and AI-readable discovery files.

The timing is attractive because OKF is early. A serious cricket-specific OKF bundle could become a reference implementation for sports data.

### 4.2 Why CricketStudio Is Uniquely Positioned

CricketStudio has assets most projects lack:

- Canonical URLs for cricket entities and claims.
- A large existing page corpus.
- REST API and MCP server strategy.
- Citation and provenance thinking.
- A sports-specific statistical model.
- A human fan perspective, not just database metadata.
- AI-native ambition through `llms.txt`, `ai.txt`, and MCP.

### 4.3 What This Unlocks

CricketStudio OKF can unlock:

- Better AI answers about cricket.
- Stronger GitHub/open-source credibility.
- Static hosted knowledge browser.
- Reusable context bundle for LLMs.
- MCP tools that expose curated cricket knowledge.
- Search and AI crawler visibility.
- Standardized metric and methodology definitions.
- Trust layer for future CricketStudio products.

---

## 5. Strategic Warning

Do not build CricketStudio OKF as a 24K-page markdown dump.

That would create noise, not trust.

The value of OKF is curation, structure, and context. CricketStudio should expose the 24K pages as references and canonical resources, but the OKF bundle should initially represent the highest-value cricket concepts and relationships.

The correct strategy:

> Start small, curated, opinionated, and trustworthy. Expand through automation only after the constitution and quality gates are proven.

---

## 6. Product Definition

CricketStudio OKF is a Git-hosted and statically hosted bundle of Markdown files with YAML frontmatter, representing cricket concepts, metrics, methodologies, examples, claims, and source policies.

It is not a replacement for the CricketStudio website, API, or MCP server. It is a companion layer.

### 6.1 Product Surfaces

| Surface | Audience | Purpose |
|---|---|---|
| `players.cricketstudio.ai` | Fans, search users, analysts | Human-readable cricket pages |
| REST API | Developers | Programmatic stats/data access |
| `cricketstudio-mcp` | AI agents and tool callers | Live tool access to CricketStudio data |
| `llms.txt` / `ai.txt` | AI crawlers and LLM tools | Discovery and usage guidance |
| `cricketstudio-okf` | Agents, developers, analysts, open-source users | Portable cricket knowledge bundle |
| `okf.cricketstudio.ai` | Humans and agents | Static browser and documentation hub |

---

## 7. Target Users

### 7.1 Primary Users

1. **AI agents** answering cricket questions.
2. **Developers** building sports analytics apps.
3. **Cricket analysts** needing clean definitions and provenance.
4. **Sports journalists and creators** needing citation-grade claims.
5. **Cricket fans** who want explainable stats.

### 7.2 Secondary Users

1. Fantasy cricket builders.
2. Data science students.
3. Open-source sports data contributors.
4. Search and AI discovery systems.
5. Startup partners and investors evaluating CricketStudio’s credibility.

---

## 8. Core Principles

### 8.1 Trust Before Coverage

A smaller trusted bundle is better than a larger noisy bundle.

### 8.2 Claim-Level Provenance

Every important claim must point to a source, canonical page, dataset, or methodology note.

### 8.3 Metric Definitions Are First-Class Knowledge

Cricket stats are meaningless without definitions. Every metric must have a definition, formula, scope, limitations, and examples.

### 8.4 Date Window Always Matters

Cricket answers must state scope: league, season, match, innings, format, date range, and dataset version where relevant.

### 8.5 Sample Size Must Be Visible

Rankings and comparisons must expose sample-size floors and eligibility rules.

### 8.6 Human and Agent Readability

Every OKF document must be readable by a cricket fan and useful to an AI agent.

### 8.7 Do Not Hide Uncertainty

If data is incomplete, licensed, derived, provisional, manually reviewed, or subject to correction, the document must say so.

### 8.8 Open Where Possible, Protected Where Required

Do not publish proprietary raw feed data. Publish CricketStudio’s permitted derived knowledge, definitions, links, and claims according to licensing boundaries.

---

## 9. CricketStudio OKF Constitution

The constitution defines the non-negotiable rules for the project.

### Article 1: CricketStudio OKF Is a Knowledge Catalog, Not a Raw Data Dump

The bundle must represent curated cricket knowledge, not replicate every webpage or every row of source data.

### Article 2: Every Concept Must Have a Reason to Exist

A document should exist only if it helps a human or agent understand cricket entities, claims, metrics, source context, or methodology.

### Article 3: Canonical URLs Must Be Preserved

Each concept should link to the best canonical CricketStudio page or API resource where one exists.

### Article 4: Provenance Is Mandatory for Claims

Any factual cricket claim that depends on data must include source metadata, canonical links, dataset notes, or a statement explaining the source boundary.

### Article 5: Licensed Data Must Not Be Leaked

The OKF bundle must not redistribute raw proprietary feeds, ball-by-ball licensed data, or data that CricketStudio is not permitted to publish.

### Article 6: Metric Semantics Must Be Explicit

Metric files must define formula, eligibility, edge cases, source tables, and known limitations.

### Article 7: No False Precision

Do not imply certainty where data is estimated, aggregated, derived, or pending review.

### Article 8: Git Is the Governance Layer

Changes to important concepts, metrics, methodology, licensing, or source policy must go through pull request review.

### Article 9: Fans Matter

CricketStudio OKF should not become sterile enterprise metadata. It must preserve the fan’s language, cricket intuition, and storytelling value.

### Article 10: Agents Must Cite CricketStudio Correctly

The bundle must teach agents when and how to cite CricketStudio pages, source datasets, and methodology files.

---

## 10. Operating System

The operating system defines how the project runs week to week.

### 10.1 Repository Model

Create a separate public repository:

```text
cricketstudio-okf/
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
    metrics/
    methodology/
    sources/
    examples/
    runbooks/
    references/
  scripts/
    generate_okf.py
    validate_okf.py
    build_viewer.py
  tests/
  docs/
```

### 10.2 Release Model

Use semantic release versions:

- `v0.1`: Curated MVP bundle.
- `v0.2`: Generator and validation pipeline.
- `v0.3`: Hosted viewer and MCP integration.
- `v1.0`: Stable public cricket OKF with quality gates and contribution model.

### 10.3 Governance Roles

| Role | Responsibility |
|---|---|
| Product owner | Defines scope and release priorities |
| Cricket analyst | Validates cricket meaning and methodology |
| Data engineer | Builds generation, validation, and CI/CD |
| Open-source maintainer | Manages issues, PRs, docs, releases |
| Fan reviewer | Ensures language is understandable and useful |

For now, one person can play multiple roles, but the roles should still exist mentally.

### 10.4 Change Management

Every PR should answer:

1. What concept changed?
2. Why does the change matter?
3. What source supports it?
4. Does it affect licensing?
5. Does it affect downstream agents or MCP tools?
6. Does it require changelog entry?

### 10.5 Quality Gates

A pull request should fail validation if:

- Required frontmatter is missing.
- Canonical URL is invalid.
- Internal links are broken.
- A metric lacks definition or formula.
- A claim lacks provenance.
- A file includes restricted raw source data.
- A generated file has malformed YAML.
- A concept duplicates another concept without alias mapping.

---

## 11. Architecture

### 11.1 Conceptual Architecture

```text
Source Data / Existing Assets
        |
        v
CricketStudio Data & Claim Layer
        |
        |-- Website pages
        |-- REST API
        |-- MCP server
        |-- llms.txt / ai.txt
        |
        v
OKF Generator + Curator Review
        |
        v
cricketstudio-okf GitHub Repository
        |
        |-- Markdown + YAML frontmatter
        |-- Manifest
        |-- Validation tests
        |-- Attribution and license docs
        |
        v
Hosted Static Viewer: okf.cricketstudio.ai
        |
        v
Consumers
        |-- Humans
        |-- LLMs
        |-- MCP clients
        |-- Search indexes
        |-- Sports analytics tools
```

### 11.2 Data Flow

1. Source cricket data is processed by CricketStudio.
2. CricketStudio creates canonical pages, claims, metrics, and API resources.
3. OKF generator extracts curated concepts and metadata.
4. Curator reviews high-value concept files.
5. Validation pipeline checks structure, links, license boundaries, and source notes.
6. GitHub release publishes the bundle.
7. Static viewer renders the bundle.
8. MCP and agents consume the OKF bundle for context.

### 11.3 Integration With MCP

The existing `cricketstudio-mcp` should eventually expose OKF-aware tools:

```text
search_okf_concepts
get_okf_concept
explain_metric
trace_claim_provenance
list_related_concepts
get_agent_answering_guidance
```

### 11.4 Integration With Website

Each CricketStudio page should eventually include a reciprocal link:

```text
View OKF concept
```

Each OKF concept should include:

```yaml
resource: https://players.cricketstudio.ai/...
canonical_page: https://players.cricketstudio.ai/...
api_resource: https://players.cricketstudio.ai/api/...
```

---

## 12. OKF Bundle Scope

### 12.1 Phase 1 Scope: Curated MVP

Phase 1 should include approximately 500–1,500 files, not 24K files.

Recommended Phase 1:

| Area | Approx. Count | Notes |
|---|---:|---|
| Leagues | 5–10 | IPL, MLC, T20 World Cup where available |
| Seasons | 20–40 | IPL seasons, MLC seasons, key tournament seasons |
| Teams | 20–50 | IPL teams, MLC teams, aliases |
| Players | 300–500 | Top traffic, active, high-value, ambiguous, star players |
| Matches | 100–300 | IPL 2026, finals, high-signal matches |
| Venues | 30–100 | Major venues with aliases |
| Metrics | 50–100 | Batting, bowling, fielding, phase, clutch, rankings |
| Methodology | 20–50 | Sample floors, rankings, claims, source policy |
| Examples | 50–100 | Verified Q&A patterns |
| Runbooks | 10–30 | Correction, refresh, data issue triage |

### 12.2 Phase 2 Scope

Add generated concept coverage for all important pages with strict validation:

- All IPL players with sufficient data.
- All IPL seasons.
- All IPL teams.
- All IPL 2026 matches.
- MLC expansion.
- Venue expansion.
- More examples and agent workflows.

### 12.3 Phase 3 Scope

Add complete corpus coverage only if the generated output remains useful:

- Full page-to-concept mapping.
- Generated aliases.
- Historical stat pages.
- Auto-refresh and changelog.
- Public contribution model.

---

## 13. Recommended Directory Structure

```text
okf/
  index.md
  concepts/
    players/
      index.md
      virat-kohli.md
      jasprit-bumrah.md
      vaibhav-suryavanshi.md
    teams/
      index.md
      mumbai-indians.md
      chennai-super-kings.md
      royal-challengers-bengaluru.md
    leagues/
      index.md
      indian-premier-league.md
      major-league-cricket.md
    seasons/
      index.md
      ipl-2026.md
      ipl-2025.md
    matches/
      index.md
      ipl-2026-mi-vs-csk-2026-05-03.md
    venues/
      index.md
  metrics/
    index.md
    batting-strike-rate.md
    bowling-economy.md
    death-overs-economy.md
    powerplay-strike-rate.md
    orange-cap.md
    purple-cap.md
  methodology/
    index.md
    sample-size-floors.md
    ranking-eligibility.md
    phase-definitions.md
    citation-policy.md
    correction-policy.md
    data-refresh-policy.md
  sources/
    index.md
    cricsheet.md
    licensed-feed-boundaries.md
    cricketstudio-derived-claims.md
  examples/
    index.md
    who-won-ipl-2026.md
    compare-bumrah-and-suryavanshi.md
    top-death-over-bowlers.md
  runbooks/
    index.md
    add-new-player.md
    update-season.md
    fix-broken-canonical-url.md
    handle-data-dispute.md
  references/
    index.md
```

---

## 14. Required Frontmatter Standard

Every OKF file should include a consistent frontmatter block.

### 14.1 Minimum Required Fields

```yaml
type: player
title: Virat Kohli
description: Canonical CricketStudio OKF concept for Virat Kohli.
resource: https://players.cricketstudio.ai/players/virat-kohli
tags:
  - cricket
  - player
  - IPL
timestamp: 2026-06-17
status: active
version: 0.1.0
```

### 14.2 Recommended CricketStudio Fields

```yaml
cricketstudio_id: player_virat_kohli
canonical_page: https://players.cricketstudio.ai/players/virat-kohli
api_resource: https://players.cricketstudio.ai/api/players/virat-kohli
source_system: CricketStudio
license: CC-BY-4.0 for derived claims unless otherwise stated
source_boundary: derived_claims_only
confidence: high
review_status: curated
last_verified: 2026-06-17
aliases:
  - V Kohli
  - King Kohli
related:
  - ../teams/royal-challengers-bengaluru.md
  - ../../metrics/batting-strike-rate.md
```

### 14.3 Type Values

Approved `type` values:

```text
index
player
team
league
season
match
venue
metric
methodology
source
example
runbook
reference
claim
api
```

---

## 15. Document Body Template

Each concept should follow a consistent body structure.

```markdown
# Title

## Summary

Plain-English explanation for a fan and analyst.

## Why This Matters

Why the concept matters in cricket context.

## Canonical CricketStudio Resources

- Page: ...
- API: ...
- Related MCP tool: ...

## Key Relationships

- Player → Team
- Player → Season
- Player → Metrics

## Agent Guidance

Instructions for how AI agents should use this concept.

## Data and Source Notes

Source boundary, license, refresh, confidence, caveats.

## Examples

Questions or answer patterns where this concept is useful.

## Related Concepts

Links to other OKF files.
```

---

## 16. Metric Document Requirements

Metric files are among the most important parts of the bundle.

Every metric must include:

1. Name.
2. Plain-English definition.
3. Formula.
4. Cricket interpretation.
5. Required input fields.
6. Eligible formats and leagues.
7. Sample-size floor.
8. Edge cases.
9. Ranking rule.
10. Known limitations.
11. Example questions.
12. Related API/resource links.

Example metric body:

```markdown
# Batting Strike Rate

## Definition

Batting strike rate measures how many runs a batter scores per 100 balls faced.

## Formula

`strike_rate = runs / balls_faced * 100`

## Cricket Interpretation

Higher strike rate generally indicates faster scoring, but interpretation depends on match format, innings phase, venue, role, and sample size.

## Minimum Sample Guidance

Do not rank players by strike rate unless the relevant sample-size floor is met.

## Agent Guidance

When answering strike-rate questions, always mention format, season, team, date window, and sample-size rule.
```

---

## 17. Agent Answering Constitution

CricketStudio OKF should teach agents to answer cricket questions responsibly.

### 17.1 Agents Must

- State the scope.
- Cite canonical CricketStudio resources.
- Use metric definitions.
- Mention sample-size constraints.
- Avoid overclaiming.
- Explain uncertainty.
- Link related concepts.
- Distinguish fact, ranking, inference, and opinion.

### 17.2 Agents Must Not

- Invent stats.
- Mix leagues or seasons without saying so.
- Compare players without matching context.
- Treat small samples as definitive.
- Use proprietary data beyond allowed derived claims.
- Present generated narrative as sourced fact.
- Omit source and date window for data-based claims.

### 17.3 Preferred Answer Pattern

```text
Answer → Scope → Source → Method → Caveat → Related link
```

Example:

```text
In IPL 2026, Player X led this metric among eligible players. This is based on CricketStudio’s IPL 2026 derived claims, using the minimum eligibility threshold defined in the sample-size methodology. See the canonical player and metric pages for details.
```

---

## 18. Do / Don’t

### 18.1 Do

- Do start with curated concepts.
- Do include canonical CricketStudio links.
- Do define every metric.
- Do include methodology and limitations.
- Do separate open derived claims from restricted source data.
- Do use GitHub PRs for review.
- Do validate YAML, links, and required fields.
- Do create a hosted static viewer.
- Do integrate with MCP after the bundle is stable.
- Do write for analysts and fans, not only machines.

### 18.2 Don’t

- Don’t dump all 24K pages into Markdown on day one.
- Don’t publish raw licensed feed data.
- Don’t create files with no useful context.
- Don’t rank players without eligibility rules.
- Don’t let agents answer without citation guidance.
- Don’t hide data limitations.
- Don’t duplicate concepts without alias control.
- Don’t overfit to Google’s examples if cricket needs different semantics.
- Don’t treat OKF as SEO spam.
- Don’t build a viewer before the knowledge model is credible.

---

## 19. Cricket Knowledge Model

### 19.1 Core Entities

```text
League
Season
Team
Player
Match
Innings
Venue
Metric
Claim
Source
Methodology
Example
Runbook
```

### 19.2 Core Relationships

```text
Player plays_for Team
Team participates_in League
League has Season
Season has Match
Match played_at Venue
Match has Innings
Player produces Metric
Metric supports Claim
Claim derived_from Source
Claim governed_by Methodology
Example uses Concept
Runbook maintains Concept
```

### 19.3 Cricket-Specific Dimensions

- Format: T20, ODI, Test, domestic T20.
- League: IPL, MLC, World Cup, etc.
- Season.
- Team.
- Opponent.
- Venue.
- Innings.
- Batting position.
- Bowling type.
- Match phase: powerplay, middle overs, death overs.
- Toss/match context where available.
- Qualification/sample threshold.

---

## 20. Examples as First-Class Assets

Examples are not optional. They teach agents how to use the bundle.

Recommended example files:

```text
examples/who-won-ipl-2026.md
examples/top-run-scorer-ipl-2026.md
examples/top-wicket-taker-ipl-2026.md
examples/compare-bumrah-vs-suryavanshi.md
examples/explain-orange-cap.md
examples/what-is-death-over-economy.md
examples/find-player-canonical-url.md
examples/how-to-cite-cricketstudio.md
examples/when-not-to-rank-a-player.md
```

Each example should include:

1. User question.
2. Correct answer pattern.
3. Required concepts.
4. Required metrics.
5. Source/citation behavior.
6. Caveats.
7. Bad answer examples.

---

## 21. Licensing and Attribution Requirements

The OKF repo must include clear licensing boundaries.

### 21.1 Required Files

```text
LICENSE.md
ATTRIBUTION.md
DATA_LICENSE_BOUNDARIES.md
```

### 21.2 Rules

- Derived CricketStudio claims may be published only under the license CricketStudio is allowed to use.
- Cricsheet-derived content must preserve required attribution.
- Licensed/proprietary feed data must not be redistributed.
- OKF files must distinguish derived claims from raw source data.
- Every source document should include license, attribution, and allowed usage.

### 21.3 Frontmatter Source Boundary Values

```yaml
source_boundary: derived_claims_only
source_boundary: public_open_data
source_boundary: proprietary_source_not_redistributed
source_boundary: manual_curated_knowledge
source_boundary: methodology_only
```

---

## 22. Validation Requirements

Create `scripts/validate_okf.py` or equivalent.

Validation should check:

- YAML frontmatter exists.
- `type` exists and is approved.
- `title` exists.
- `description` exists.
- `resource` exists where applicable.
- `timestamp` is valid ISO date.
- Internal links resolve.
- Canonical CricketStudio links return valid status.
- Duplicate IDs are not allowed.
- Aliases do not collide without mapping.
- Metric files include formula and sample guidance.
- Claim files include provenance.
- Source boundary is declared.
- Restricted data patterns are not present.

---

## 23. CI/CD Requirements

Use GitHub Actions.

Recommended workflows:

```text
validate-okf.yml
build-viewer.yml
publish-pages.yml
release-bundle.yml
link-check.yml
```

### 23.1 On Pull Request

Run:

- YAML validation.
- Markdown lint.
- Link check.
- Type validation.
- License boundary check.
- Broken internal link check.

### 23.2 On Merge to Main

Run:

- Generate manifest.
- Build static viewer.
- Publish to GitHub Pages or Cloudflare Pages.
- Create downloadable bundle artifact.

### 23.3 On Release

Create:

```text
cricketstudio-okf-v0.1.0.zip
cricketstudio-okf-v0.1.0.tar.gz
manifest.yaml
viz.html
```

---

## 24. Hosted Viewer Requirements

The viewer should help humans and agents browse the bundle.

Minimum features:

- Search by title, alias, tag, and type.
- Filter by type.
- Open Markdown concept view.
- Show frontmatter.
- Show related concepts.
- Show backlinks.
- Show graph view.
- Link to canonical CricketStudio page.
- Link to GitHub source file.

Nice-to-have features:

- Compare two players.
- Browse by league/season/team.
- Show source/license badges.
- Show confidence and review status.
- Export concept as JSON.
- Copy agent-ready citation block.

---

## 25. MCP Requirements

After v0.1 bundle is stable, extend `cricketstudio-mcp`.

### 25.1 Proposed Tools

```text
search_okf_concepts(query, type?, tags?)
get_okf_concept(concept_id)
explain_metric(metric_id)
get_related_concepts(concept_id)
trace_claim_provenance(claim_id)
get_answering_guidance(question)
```

### 25.2 MCP Design Rule

MCP tools should not return massive raw content by default. They should return concise context, canonical links, and next-step tool suggestions.

---

## 26. Content Quality Bar

A concept is good only if it answers these questions:

1. What is this?
2. Why does it matter in cricket?
3. What is the canonical CricketStudio resource?
4. What data or source supports it?
5. What are the limitations?
6. What related concepts should an agent know?
7. How should an agent cite or use it?

If a file does not answer these, it should not be published yet.

---

## 27. MVP Release Plan

### Sprint 1: Foundation

- Create repo.
- Add README, requirements, constitution, operating system.
- Define frontmatter schema.
- Create folder structure.
- Add 10 hand-curated sample files.
- Add validation script skeleton.

### Sprint 2: Cricket Core

- Add leagues, teams, top players, top metrics.
- Add methodology files.
- Add source/license boundary docs.
- Add examples.

### Sprint 3: Generator

- Build generator from existing CricketStudio metadata.
- Generate curated Phase 1 files.
- Add alias mapping.
- Add manifest generation.

### Sprint 4: Viewer and Publishing

- Build or adapt static viewer.
- Publish `okf.cricketstudio.ai`.
- Add GitHub Actions.
- Cut v0.1 release.

### Sprint 5: MCP Integration

- Add OKF search and concept tools.
- Add answer guidance tool.
- Add examples in MCP README.

---

## 28. Success Metrics

### 28.1 Product Metrics

- Number of curated OKF concepts.
- Percentage of files passing validation.
- Number of metrics with complete definitions.
- Number of examples with verified answer patterns.
- Broken-link count.
- Concept freshness.
- Viewer visits.
- GitHub stars/forks/issues.

### 28.2 Trust Metrics

- Percent of claims with provenance.
- Percent of ranked metrics with sample-size rules.
- Percent of concepts with source boundary declared.
- Number of data disputes resolved.
- Number of manual review flags.

### 28.3 Adoption Metrics

- MCP tool calls using OKF context.
- Referrals from AI agents or crawlers.
- External projects linking to OKF.
- PRs from contributors.
- Citations in content or analysis.

---

## 29. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 24K-page dump creates noise | High | Start curated; use generator later |
| Licensing mistake | High | Add source boundary validation and attribution docs |
| OKF spec changes | Medium | Keep generator simple and versioned |
| No adoption | Medium | Build viewer, examples, MCP tools |
| Too much maintenance | Medium | Automate validation and generation |
| Wrong cricket semantics | High | Analyst/fan review for metrics and examples |
| Agents misuse data | High | Add explicit answer guidance and caveats |
| Duplicated player/team aliases | Medium | Build alias registry |

---

## 30. Open Questions

1. What license should apply to CricketStudio-derived OKF content?
2. Which parts of the 24K page corpus are safe and useful to generate?
3. What is the first canonical entity ID strategy?
4. Should the repo include generated files, source generator only, or both?
5. Should `okf.cricketstudio.ai` be hosted on GitHub Pages, Cloudflare Pages, or Vercel?
6. Should MCP consume local OKF files, hosted OKF files, or generated JSON index?
7. Should examples include only CricketStudio answers or competitor/source comparison patterns?
8. How often should OKF be refreshed during live tournaments?
9. Should match-level OKF files be created for every match or only high-value matches in v0.1?
10. What is the policy for correcting historical data after source updates?

---

## 31. Recommended First 25 Files

Start with these hand-curated files before building automation.

```text
README.md
CONSTITUTION.md
OPERATING_SYSTEM.md
ATTRIBUTION.md
DATA_LICENSE_BOUNDARIES.md
okf/index.md
okf/concepts/leagues/indian-premier-league.md
okf/concepts/leagues/major-league-cricket.md
okf/concepts/seasons/ipl-2026.md
okf/concepts/teams/mumbai-indians.md
okf/concepts/teams/chennai-super-kings.md
okf/concepts/teams/royal-challengers-bengaluru.md
okf/concepts/players/virat-kohli.md
okf/concepts/players/jasprit-bumrah.md
okf/concepts/players/vaibhav-suryavanshi.md
okf/metrics/batting-strike-rate.md
okf/metrics/bowling-economy.md
okf/metrics/death-overs-economy.md
okf/metrics/orange-cap.md
okf/metrics/purple-cap.md
okf/methodology/sample-size-floors.md
okf/methodology/citation-policy.md
okf/methodology/ranking-eligibility.md
okf/sources/cricsheet.md
okf/sources/licensed-feed-boundaries.md
okf/examples/how-to-cite-cricketstudio.md
okf/examples/compare-two-players.md
okf/runbooks/handle-data-dispute.md
```

---

## 32. McKinsey-Style Strategic Recommendation

Proceed, but proceed with discipline.

CricketStudio OKF is strategically attractive because it turns existing CricketStudio work into an open, portable, agent-ready asset. It strengthens the company’s positioning as trusted cricket infrastructure rather than a commodity stats site.

However, value will come from curation, not volume. The first release should be deliberately small, credible, and defensible. The 24K pages are a powerful source corpus, but the OKF bundle should expose a clean semantic layer above them.

Recommended decision:

> Build CricketStudio OKF as a separate repo and hosted knowledge site. Launch v0.1 with a curated bundle, strict licensing boundaries, validation, source-aware methodology, and a clear MCP integration roadmap.

---

## 33. Cricketer-Turned-Analyst View

Cricket is context. A six in the powerplay, a six in the 19th over, and a six in a dead rubber are not the same cricket event.

That is why CricketStudio OKF must not be only a database dictionary. It must capture cricket meaning:

- pressure,
- role,
- phase,
- format,
- opponent,
- venue,
- sample size,
- match situation,
- source confidence.

The fan wants the story. The analyst wants the method. The agent needs the context. CricketStudio OKF should serve all three.

---

## 34. Final North Star

CricketStudio OKF should make this possible:

> Any AI agent can answer a cricket question using CricketStudio context, cite the right source, explain the method, respect data limits, and sound like it understands cricket.

That is the product.

That is the moat.

That is why this should be built.

