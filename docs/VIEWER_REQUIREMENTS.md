# Viewer Requirements (v0.3)

Status: **design only.** Do not build the viewer before the file schema and validation
pipeline are stable (CLAUDE.md §15).

The hosted viewer at `okf.cricketstudio.ai` lets humans and agents browse the bundle.

## Minimum features

- Search by title, alias, tag, and type.
- Filter by type (player, team, metric, methodology, …).
- Render a Markdown concept view with its frontmatter.
- Show related concepts and backlinks (the concept graph).
- Link to the canonical CricketStudio page.
- Link to the GitHub source file.
- Downloadable OKF bundle.

## Nice-to-have

- Graph view of the concept network.
- Compare two players (using the [comparison pattern](../okf/examples/compare-two-players.md)).
- Source/license and confidence/review-status badges.
- Export a concept as JSON.
- Copy an agent-ready citation block (per the
  [Citation Policy](../okf/methodology/citation-policy.md)).

## Build approach

- Static site generated from the OKF markdown + a manifest/index built in CI.
- Boring, maintainable tech (CLAUDE.md §18); no heavy framework unless justified.
- **Search/agent-retrieval option:** index the bundle into a search store. Google's
  Vertex AI Agent Builder Data Store is a credible candidate (CricketStudio already runs on
  GCP), but a static client-side index (e.g. Lunr/Fuse) is the simpler default. Decide in
  v0.3; do not pre-commit.

## Hosting

GitHub Pages or Cloudflare Pages, published by CI on merge to main. Open question per
REQUIREMENTS.md §30.
