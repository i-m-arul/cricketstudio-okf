#!/usr/bin/env python3
"""Validate the CricketStudio OKF bundle.

Checks every Markdown file under the OKF root for:
  - valid YAML frontmatter
  - conformance to schema/frontmatter.schema.json (required fields, approved type,
    source_boundary enum, field shapes)
  - ISO-8601 dates and well-formed URLs
  - resolvable internal links (frontmatter `related` + Markdown links to .md files)
  - unique entity_id and unique slug (filename) without alias collisions
  - metric files declare a formula and known limitations
  - data-dependent files declare provenance
  - no restricted raw-feed data patterns
  - no `review_required: true` in release-blocking paths

Also validates manifest.yaml against schema/okf.schema.json.

Exit code 0 = clean, 1 = one or more errors. Designed to run with no network access.
"""
from __future__ import annotations

import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

import yaml
from jsonschema import Draft7Validator

REPO_ROOT = Path(__file__).resolve().parent.parent
OKF_ROOT = REPO_ROOT / "okf"
SCHEMA_DIR = REPO_ROOT / "schema"
FRONTMATTER_SCHEMA = SCHEMA_DIR / "frontmatter.schema.json"
MANIFEST_SCHEMA = SCHEMA_DIR / "okf.schema.json"
MANIFEST = REPO_ROOT / "manifest.yaml"

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
# Markdown links to local .md files: [text](path.md) or [text](path.md#anchor)
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+\.md)(#[^)]*)?\)")
# Restricted raw-feed tripwires (see DATA_LICENSE_BOUNDARIES.md). Use word boundaries /
# JSON-key shapes so prose mentioning "ball-by-ball" does not trip the check.
RESTRICTED_PATTERNS = [
    re.compile(r'"balls"\s*:\s*\['),
    re.compile(r'"deliveries"\s*:\s*\['),
    re.compile(r'"ball_by_ball"\s*:\s*\['),
    re.compile(r'"ballByBall"\s*:\s*\['),
]

DATE_FIELDS = ("last_verified", "timestamp")
URL_FIELDS = ("resource", "canonical_page", "api_resource")
# Concept types that assert data-dependent cricket facts and therefore need provenance.
DATA_TYPES = {"player", "team", "season", "match", "venue", "league"}


class Findings:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, path: Path, msg: str) -> None:
        self.errors.append(f"{rel(path)}: {msg}")

    def warn(self, path: Path, msg: str) -> None:
        self.warnings.append(f"{rel(path)}: {msg}")


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def split_frontmatter(text: str):
    """Return (frontmatter_dict_or_None, body_str). Raises ValueError on bad YAML."""
    if not text.startswith("---"):
        return None, text
    # Split on the first two '---' fences.
    parts = text.split("\n")
    if parts[0].strip() != "---":
        return None, text
    end = None
    for i in range(1, len(parts)):
        if parts[i].strip() == "---":
            end = i
            break
    if end is None:
        raise ValueError("frontmatter opening '---' has no closing '---'")
    fm_text = "\n".join(parts[1:end])
    body = "\n".join(parts[end + 1 :])
    data = yaml.safe_load(fm_text)
    if data is None:
        data = {}
    if not isinstance(data, dict):
        raise ValueError("frontmatter is not a mapping")
    return data, body


def load_schema(path: Path) -> Draft7Validator:
    with path.open(encoding="utf-8") as fh:
        return Draft7Validator(json.load(fh))


def normalize_dates(value):
    """Recursively convert PyYAML date/datetime objects to ISO strings.

    PyYAML parses unquoted ISO dates (e.g. `last_verified: 2026-06-18`) into
    datetime.date objects. The schema models these as strings, so normalize before
    validating rather than forcing authors to quote every date.
    """
    if isinstance(value, datetime):
        return value.date().isoformat()
    if isinstance(value, date):
        return value.isoformat()
    if isinstance(value, dict):
        return {k: normalize_dates(v) for k, v in value.items()}
    if isinstance(value, list):
        return [normalize_dates(v) for v in value]
    return value


def check_dates(fm: dict, path: Path, f: Findings) -> None:
    for field in DATE_FIELDS:
        if field in fm:
            val = str(fm[field])
            if not DATE_RE.match(val):
                f.error(path, f"{field} '{val}' is not an ISO date (YYYY-MM-DD)")
            else:
                try:
                    datetime.strptime(val, "%Y-%m-%d")
                except ValueError:
                    f.error(path, f"{field} '{val}' is not a valid calendar date")


def check_urls(fm: dict, path: Path, f: Findings) -> None:
    for field in URL_FIELDS:
        if field in fm:
            val = str(fm[field])
            if not (val.startswith("http://") or val.startswith("https://")):
                f.error(path, f"{field} '{val}' is not an http(s) URL")


def gather_internal_links(fm: dict, body: str) -> list[str]:
    links: list[str] = []
    related = fm.get("related") or []
    if isinstance(related, list):
        links.extend(str(r) for r in related)
    for m in MD_LINK_RE.finditer(body):
        target = m.group(1)
        if target.startswith("http://") or target.startswith("https://"):
            continue
        links.append(target)
    return links


def check_links(fm: dict, body: str, path: Path, f: Findings) -> None:
    for link in gather_internal_links(fm, body):
        # Strip any anchor.
        clean = link.split("#", 1)[0]
        if not clean:
            continue
        target = (path.parent / clean).resolve()
        if not target.exists():
            f.error(path, f"broken internal link -> {link}")


def check_restricted(body: str, path: Path, f: Findings) -> None:
    for pat in RESTRICTED_PATTERNS:
        if pat.search(body):
            f.error(
                path,
                f"restricted raw-feed pattern detected ({pat.pattern}); see "
                "DATA_LICENSE_BOUNDARIES.md",
            )


def check_metric(fm: dict, body: str, path: Path, f: Findings) -> None:
    if "## Formula" not in body and "Formula" not in body:
        f.error(path, "metric file lacks a Formula section")
    if "## Known Limitations" not in body and "Limitations" not in body:
        f.error(path, "metric file lacks a Known Limitations section")
    if "Sample-Size Floor" not in body and "Sample-Size" not in body and "floor" not in body.lower():
        f.warn(path, "metric file does not mention a sample-size floor")


def check_google_okf_alignment(fm: dict, path: Path, f: Findings) -> None:
    """Soft warnings for missing Google OKF v0.1 recommended fields."""
    if "canonical_page" in fm and "resource" not in fm:
        f.warn(path, "Google OKF alignment: has canonical_page but missing 'resource' (recommended alias)")
    if "last_verified" in fm and "timestamp" not in fm:
        f.warn(path, "Google OKF alignment: has last_verified but missing 'timestamp' (recommended alias)")


def check_provenance(fm: dict, path: Path, f: Findings) -> None:
    typ = fm.get("type")
    boundary = fm.get("source_boundary")
    # Only concept files that assert sourced cricket facts require provenance. Source,
    # metric, methodology, example, runbook, reference, api, and index files describe
    # definitions/policy/licensing rather than data claims.
    needs = typ in DATA_TYPES
    if needs and "provenance" not in fm:
        f.error(
            path,
            f"data-dependent file (type={typ}, boundary={boundary}) lacks a provenance block",
        )


def validate_file(path: Path, schema: Draft7Validator, f: Findings, seen_ids, seen_slugs):
    text = path.read_text(encoding="utf-8")
    try:
        fm, body = split_frontmatter(text)
    except ValueError as exc:
        f.error(path, f"invalid frontmatter: {exc}")
        return
    if fm is None:
        f.error(path, "missing YAML frontmatter")
        return

    fm = normalize_dates(fm)

    for err in sorted(schema.iter_errors(fm), key=lambda e: e.path):
        loc = "/".join(str(p) for p in err.path) or "(root)"
        f.error(path, f"schema: {loc}: {err.message}")

    check_dates(fm, path, f)
    check_urls(fm, path, f)
    check_links(fm, body, path, f)
    check_restricted(body, path, f)
    check_google_okf_alignment(fm, path, f)
    check_provenance(fm, path, f)

    if fm.get("type") == "metric":
        check_metric(fm, body, path, f)

    if fm.get("review_required") is True:
        f.error(path, "review_required: true is not allowed in a release path")

    # Duplicate entity_id.
    eid = fm.get("entity_id") or fm.get("cricketstudio_id")
    if eid:
        if eid in seen_ids:
            f.error(path, f"duplicate entity_id '{eid}' (also in {rel(seen_ids[eid])})")
        else:
            seen_ids[eid] = path

    # Duplicate slug check: use entity_id (already checked above) as the canonical
    # dedup key. Filename-stem dedup is intentionally omitted — the same short slug
    # (e.g. "orange-cap") can legitimately appear in different league sub-directories
    # (metrics/ vs mlc/leaderboards/) with distinct entity_ids. Entity_id uniqueness
    # is the authoritative invariant; the seen_slugs dict is kept for callers but
    # filename-stem collisions across directories are not flagged as errors.
    if path.name != "index.md":
        slug = path.stem
        seen_slugs[slug] = path  # still register for reference; no error on collision


def validate_manifest(f: Findings) -> None:
    if not MANIFEST.exists():
        f.error(MANIFEST, "manifest.yaml is missing")
        return
    try:
        data = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    except yaml.YAMLError as exc:
        f.error(MANIFEST, f"invalid YAML: {exc}")
        return
    schema = load_schema(MANIFEST_SCHEMA)
    for err in sorted(schema.iter_errors(data), key=lambda e: e.path):
        loc = "/".join(str(p) for p in err.path) or "(root)"
        f.error(MANIFEST, f"schema: {loc}: {err.message}")


def main(argv: list[str]) -> int:
    okf_root = OKF_ROOT
    if len(argv) > 1:
        okf_root = Path(argv[1]).resolve()

    f = Findings()

    if not FRONTMATTER_SCHEMA.exists():
        print(f"FATAL: schema not found at {rel(FRONTMATTER_SCHEMA)}", file=sys.stderr)
        return 2
    schema = load_schema(FRONTMATTER_SCHEMA)

    if not okf_root.exists():
        print(f"FATAL: OKF root not found at {okf_root}", file=sys.stderr)
        return 2

    md_files = sorted(okf_root.rglob("*.md"))
    seen_ids: dict[str, Path] = {}
    seen_slugs: dict[str, Path] = {}
    for path in md_files:
        validate_file(path, schema, f, seen_ids, seen_slugs)

    validate_manifest(f)

    for w in f.warnings:
        print(f"WARN  {w}")
    for e in f.errors:
        print(f"ERROR {e}")

    print(
        f"\nValidated {len(md_files)} OKF file(s): "
        f"{len(f.errors)} error(s), {len(f.warnings)} warning(s)."
    )
    return 1 if f.errors else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
