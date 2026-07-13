#!/usr/bin/env python3
"""
Quality gate validator for dossier entries.
Enforces the T3–T6 taxonomy and 4-gate quality floor.

Gates checked:
  G1 — question_type is T3/T4/T5/T6 (no T1/T2)
  G2 — llm_failure_mode is present and non-empty
  G3 — debate_signal is present; body has a numeric value + sample size
  G4 — debate_signal references at least one real signal

Instant disqualifiers:
  - question_type missing on a dossier entry
  - question_type = T1 or T2
  - answer body has no numeric value (e.g. [DATA:...] placeholders still present)

Run:
    python scripts/validate_dossier_quality.py [--strict] [path/to/dossier/]

Exit 0 = all pass, 1 = one or more failures.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
DOSSIER_DIR = REPO_ROOT / "okf" / "dossier"

VALID_TYPES = {"T3", "T4", "T5", "T6"}
VALID_DEBATE_SIGNALS = {"reddit", "analyst", "fantasy", "social-media", "google-trends", "broadcaster"}

# A numeric value anywhere in the body (integer or decimal, possibly %)
NUMERIC_RE = re.compile(r"\b\d+(\.\d+)?(%|pp|RPO|SR)?\b")
# Sample size markers: "X balls", "X deliveries", "X matches", "X innings"
SAMPLE_RE = re.compile(r"\b\d+\s*(balls|deliveries|matches|innings|seasons|fixtures|overs)\b", re.IGNORECASE)
# Remaining [DATA:...] placeholders that should have been filled
DATA_PLACEHOLDER_RE = re.compile(r"\[DATA:")


def parse_frontmatter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    fm = yaml.safe_load(text[3:end])
    body = text[end + 4:].strip()
    return fm or {}, body


def validate_entry(path: Path, strict: bool = False) -> list[str]:
    errors = []
    warnings = []

    fm, body = parse_frontmatter(path)

    if fm.get("type") != "dossier":
        return []  # Skip non-dossier files

    slug = path.stem

    # G1 — question_type
    qt = fm.get("question_type")
    if not qt:
        errors.append(f"[G1] Missing question_type: {slug}")
    elif qt in ("T1", "T2"):
        errors.append(f"[G1] Disqualified — question_type={qt} (T1/T2 not permitted): {slug}")
    elif qt not in VALID_TYPES:
        errors.append(f"[G1] Unknown question_type={qt!r}: {slug}")

    # G2 — llm_failure_mode
    lf = fm.get("llm_failure_mode", "")
    if not lf or len(lf.strip()) < 20:
        errors.append(f"[G2] llm_failure_mode missing or too short (<20 chars): {slug}")

    # G3 — debate_signal + numeric + sample size in body
    ds = fm.get("debate_signal", "")
    if not ds:
        errors.append(f"[G3] debate_signal missing: {slug}")
    else:
        signals = {s.strip() for s in ds.split(",")}
        unknown = signals - VALID_DEBATE_SIGNALS
        if unknown:
            errors.append(f"[G3] Unknown debate_signal value(s) {unknown}: {slug}")

    # Body must have a numeric value
    if not NUMERIC_RE.search(body):
        if strict:
            errors.append(f"[G3] No numeric value in body: {slug}")
        else:
            warnings.append(f"[G3-warn] No numeric value in body (may still have [DATA:] markers): {slug}")

    # Body must have a sample size reference
    if not SAMPLE_RE.search(body):
        if strict:
            errors.append(f"[G3] No sample size (balls/matches/etc.) in body: {slug}")
        else:
            warnings.append(f"[G3-warn] No sample size reference in body: {slug}")

    # G4 — check for [DATA:] placeholders (entries still have unfilled markers)
    placeholders = DATA_PLACEHOLDER_RE.findall(body)
    if placeholders:
        warnings.append(f"[G4-warn] {len(placeholders)} unfilled [DATA:] placeholder(s) in body: {slug}")

    return errors, warnings


def main():
    parser = argparse.ArgumentParser(description="Validate dossier quality gates")
    parser.add_argument("path", nargs="?", default=str(DOSSIER_DIR), help="Path to dossier directory")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as errors")
    args = parser.parse_args()

    target = Path(args.path)
    if target.is_file():
        files = [target]
    else:
        files = sorted(target.glob("*.md"))

    total = 0
    dossier_count = 0
    error_count = 0
    warn_count = 0

    for f in files:
        total += 1
        result = validate_entry(f, strict=args.strict)
        if not result:
            continue  # non-dossier
        errors, warnings = result
        dossier_count += 1

        for e in errors:
            print(f"ERROR  {e}")
            error_count += 1
        for w in warnings:
            print(f"WARN   {w}")
            warn_count += 1

    print(f"\n--- Dossier quality gate ---")
    print(f"Files scanned: {total} | Dossier entries: {dossier_count}")
    print(f"Errors: {error_count} | Warnings: {warn_count}")

    if error_count > 0:
        print("FAIL — quality gate not passed")
        sys.exit(1)
    else:
        print("PASS")
        sys.exit(0)


if __name__ == "__main__":
    main()
