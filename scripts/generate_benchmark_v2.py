#!/usr/bin/env python3
"""
Generate cricket-qa-v2.jsonl benchmark from dossier T3-T6 entries.

These are real cricket knowledge questions — not meta questions about CricketStudio.
LLMs are expected to struggle on raw knowledge but improve significantly when given
CricketStudio OKF context (the "with CricketStudio" pass in the benchmark).

Sampling:
  T3: 500  one-condition factual (e.g. career stats, season totals)
  T4: 250  cross-season / multi-entity (e.g. compare two players across seasons)
  T5: 150  multi-condition (e.g. best death-over economy + min wicket threshold)
  T6:  70  causal / debate (e.g. why does X perform better in chases?)
  ────────
  Total: 970 (T5/T6 pool may be smaller — script takes all available then fills from T3/T4)

Output: viewer/public/evals/cricket-qa-v2.jsonl

Usage:
  python scripts/generate_benchmark_v2.py          # default 1000-question corpus
  python scripts/generate_benchmark_v2.py --check  # print counts, no file write
"""

import os
import re
import sys
import json
import random
import yaml
from pathlib import Path

SEED = 42
DOSSIER_DIR = Path(__file__).parent.parent / "okf" / "dossier"
OUTPUT = Path(__file__).parent.parent / "viewer" / "public" / "evals" / "cricket-qa-v2.jsonl"

# How many to sample per type. Total = 1000 (or less if pools are smaller).
TARGET = {"T3": 500, "T4": 250, "T5": 150, "T6": 100}

CHECK_ONLY = "--check" in sys.argv


def parse_dossier(path: Path):
    """Parse a dossier .md file and return a benchmark entry or None."""
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        return None

    parts = text.split("---", 2)
    if len(parts) < 3:
        return None

    try:
        fm = yaml.safe_load(parts[1])
    except Exception:
        return None

    if not fm or fm.get("type") != "dossier":
        return None

    qt = fm.get("question_type", "")
    if qt not in TARGET:
        return None

    body = parts[2]

    # Extract question — the first blockquote under "## User Question"
    q_match = re.search(r"##\s*User Question\s*\n+((?:>.*\n?)+)", body)
    if not q_match:
        return None
    question = _strip_blockquote(q_match.group(1))

    # Extract answer — the first blockquote under "## Correct Answer Pattern"
    a_match = re.search(r"##\s*Correct Answer Pattern\s*\n+((?:>.*\n?)+)", body)
    if not a_match:
        return None
    answer = _strip_blockquote(a_match.group(1))

    if not question or not answer:
        return None

    # Build per-question context from dossier data sections.
    # Deliberately excludes "Correct Answer Pattern" and "Bad Answer" — the model
    # must derive the answer from the raw data, not copy a template.
    context = _build_context(fm, body)

    return {
        "id": f"v2-{path.stem}",
        "question": question,
        "answer": answer,
        "context": context,
        "question_type": qt,
        "category": "cricket-knowledge",
        "canonical_url": fm.get("canonical_page") or fm.get("resource") or "",
    }


def _strip_blockquote(block: str) -> str:
    """Strip leading '> ' from a markdown blockquote block."""
    lines = []
    for line in block.strip().split("\n"):
        stripped = line.strip()
        if stripped.startswith(">"):
            stripped = stripped[1:].lstrip()
        lines.append(stripped)
    return "\n".join(lines).strip()


def _extract_section(body: str, heading: str) -> str:
    """Extract everything under a ## heading until the next ## heading."""
    pattern = rf"##\s*{re.escape(heading)}\s*\n+([\s\S]*?)(?=\n##|\Z)"
    m = re.search(pattern, body)
    return m.group(1).strip() if m else ""


def _build_context(fm: dict, body: str) -> str:
    """
    Build the per-question CricketStudio context block.

    Includes: description, Required Metrics, Required Concepts, Citation Behavior.
    Excludes: Correct Answer Pattern, Bad Answer (those are held out for judging).
    """
    parts = []

    description = fm.get("description", "")
    canonical = fm.get("canonical_page") or fm.get("resource") or ""
    source = fm.get("provenance", {}).get("source", "CricketStudio ball-by-ball dataset")

    header = f"CricketStudio verified cricket data\nSource: {source}"
    if canonical:
        header += f"\nCanonical page: {canonical}"
    if description:
        header += f"\n\nSummary: {description}"
    parts.append(header)

    for section in ("Required Metrics", "Required Concepts", "Citation Behavior"):
        content = _extract_section(body, section)
        if content:
            parts.append(f"### {section}\n{content}")

    return "\n\n".join(parts)


def main():
    random.seed(SEED)

    by_type: dict[str, list] = {t: [] for t in TARGET}
    skipped = 0

    for f in sorted(DOSSIER_DIR.glob("*.md")):
        entry = parse_dossier(f)
        if entry is None:
            skipped += 1
            continue
        by_type[entry["question_type"]].append(entry)

    print("Dossier pool:")
    for qt in TARGET:
        print(f"  {qt}: {len(by_type[qt])} entries")
    print(f"  skipped (no Q/A or wrong type): {skipped}")

    if CHECK_ONLY:
        return

    sampled = []
    for qt, n in TARGET.items():
        pool = by_type[qt]
        if len(pool) < n:
            print(f"  ! {qt}: only {len(pool)} available (need {n}) -- using all")
            sampled.extend(pool)
        else:
            sampled.extend(random.sample(pool, n))

    # Fill any shortfall from the T3 pool (largest)
    target_total = sum(TARGET.values())
    shortfall = target_total - len(sampled)
    if shortfall > 0:
        already_ids = {e["id"] for e in sampled}
        extra_pool = [e for e in by_type["T3"] if e["id"] not in already_ids]
        fill = random.sample(extra_pool, min(shortfall, len(extra_pool)))
        sampled.extend(fill)
        print(f"  Filled {len(fill)} extra from T3 pool to compensate for T5/T6 shortfall")

    random.shuffle(sampled)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8", newline="\n") as f:
        for entry in sampled:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    dist = {qt: sum(1 for e in sampled if e["question_type"] == qt) for qt in TARGET}
    print(f"\nDone: {len(sampled)} questions -> {OUTPUT}")
    print(f"   Distribution: {dist}")
    print(f"   Sample question ({sampled[0]['question_type']}): {sampled[0]['question'][:80]}...")


if __name__ == "__main__":
    main()
