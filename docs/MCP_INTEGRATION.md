# MCP Integration (v0.3)

Status: **design only.** Extend `cricketstudio-mcp` with OKF-aware tools after the v0.1
bundle is stable.

## Context

`cricketstudio-mcp` already serves cricket data from a bundled JSON snapshot (no network,
no DB). OKF integration adds a **knowledge/context layer** on top: definitions, methodology,
provenance, and answering guidance — complementing the existing fact tools.

## Proposed tools (REQUIREMENTS.md §25)

```text
search_okf_concepts(query, type?, tags?)   -> concept summaries + canonical links
get_okf_concept(concept_id)                -> one concept (frontmatter + body)
explain_metric(metric_id)                  -> metric definition + formula + floor
get_related_concepts(concept_id)           -> graph neighbors
trace_claim_provenance(claim_id)           -> source, computed_at, boundary
get_answering_guidance(question)           -> the answer pattern + relevant examples
```

## Design rules

- **Return concise context, not raw dumps.** Tools return summaries, canonical links, and
  next-step suggestions — never the full bundle (REQUIREMENTS.md §25.2).
- **OKF for context, API/pages for fresh facts.** MCP tools use OKF for definitions,
  methodology, scope, and provenance, and point to CricketStudio pages/API for current
  computed values — consistent with the
  the [Methodology index](../okf/methodology/index.md) for scope and provenance details.
- **Consumption source (open question, REQUIREMENTS.md §30):** local OKF files, hosted OKF
  files, or a generated JSON index. A generated index (built from the same snapshot the
  bundle is built from) is the likely choice for speed and stability.

## Why this fits

The OKF bundle already encodes the answer pattern
(**Answer → Scope → Source → Method → Caveat → Related link**) and the
[examples](../okf/dossier/index.md). `get_answering_guidance` can surface exactly these,
so a tool-calling agent answers cricket questions with citation discipline by default.
