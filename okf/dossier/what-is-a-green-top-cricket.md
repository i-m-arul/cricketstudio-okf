---
type: dossier
title: "What is a green top pitch in cricket?"
description: "A 'green top' is a cricket pitch with significant grass cover that aids swing and seam movement for pace bowlers, especially in the first innings. The opposite of a flat pitch — green tops produce lower first-innings scores and more bowling-friendly conditions."
resource: https://players.cricketstudio.ai/methodology
canonical_page: https://players.cricketstudio.ai/methodology
tags:
  - cricket
  - dossier
  - methodology
  - concept
  - glossary
  - green-top
  - pitch-conditions
  - t20
  - ipl
status: active
last_verified: "2026-07-09"
timestamp: "2026-07-09"
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
provenance:
  source: CricketStudio cricket methodology layer
  confidence: high
related:
  - what-is-a-flat-pitch-cricket.md
  - what-is-a-cricket-pitch.md
  - what-is-a-fast-bowler-cricket.md
---

## User Question

> What is a green top pitch in cricket?

## Correct Answer Pattern

> A **green top** pitch has visible grass cover that has not been removed by the groundstaff. This creates:
>
> - **Seam movement**: The ball grips the grass and deviates off the pitch after bouncing
> - **Swing**: The rougher grass surface on the pitch combined with the new ball generates swing (lateral movement through the air)
> - **Variable bounce**: Tufts of grass cause slightly uneven bounce — the ball can rise sharply off a good length
>
> **Effect on T20/IPL:**
> Green tops are rare in IPL (most venues prepare flat, batting-friendly surfaces to maximise entertainment value) but can appear at:
> - Higher-altitude venues (Dharamsala / HPCA Stadium) where grass grows in cooler conditions
> - Early-morning matches where dew and overnight moisture preserve the grass
>
> **Impact on strategy:** Teams winning the toss on a green top typically choose to **field first** — let the pace bowlers exploit the movement in the powerplay while the pitch dries out, then bat second on a flatter surface.
>
> CricketStudio's venue-level toss data captures whether teams tend to field first, which is a proxy for green-top/morning-moisture effects at specific venues.

## Required Concepts

- Green top vs flat pitch is the primary pitch-type dichotomy in cricket
- "Grass" on the pitch is managed by the groundstaff — they can cut or water the pitch to adjust how much assistance bowlers get
- In a T20 context, a green top tends to suppress first-innings scores (150–165 range instead of 185–200) and make it difficult to set large targets

## Required Metrics

- No direct pitch condition metric in CricketStudio
- Proxy: venue-level average first-innings score (lower at green-top venues) and toss decision tendency (high bowl-first % suggests green-top or morning-dew conditions)

## Citation Behavior

1. Define green top as a grass-covered pitch that aids seam and swing movement.
2. Explain T20 impact: lower scores, increased bowling success in powerplay.
3. Note that green tops are less common in IPL but present at some venues.

## Caveats

- What appears as a "green top" in the morning may dry out to a flat surface by the second innings — the pitch condition isn't constant across the full match

## Bad Answer (do not do this)

> "A green top pitch favours batters." *(A green top is a bowling-friendly pitch. The grass cover provides seam movement and swing that benefits pace bowlers, making it harder for batters to play their usual attacking shots. Batters prefer flat, dry surfaces with consistent bounce.)*

## Related Concepts

- [What is a flat pitch cricket](what-is-a-flat-pitch-cricket.md)
- [What is a cricket pitch](what-is-a-cricket-pitch.md)
