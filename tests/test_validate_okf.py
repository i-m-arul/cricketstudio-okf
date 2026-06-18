"""Unit and integration tests for scripts/validate_okf.py. No network access."""
import datetime
from pathlib import Path

import pytest

import validate_okf as v

REPO_ROOT = Path(__file__).resolve().parent.parent

GOOD_FRONTMATTER = """---
type: player
title: Test Player
description: A test player concept.
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: derived_claims_only
canonical_page: https://players.cricketstudio.ai/players/test-player
entity_id: cricketstudio:player:test-player
provenance:
  source: CricketStudio derived claim layer
  confidence: high
---

# Test Player

## Summary
Body text.
"""


def schema():
    return v.load_schema(v.FRONTMATTER_SCHEMA)


# --- frontmatter parsing -------------------------------------------------

def test_split_frontmatter_valid():
    fm, body = v.split_frontmatter(GOOD_FRONTMATTER)
    assert fm["type"] == "player"
    assert "# Test Player" in body


def test_split_frontmatter_missing_returns_none():
    fm, body = v.split_frontmatter("# No frontmatter here\n")
    assert fm is None


def test_split_frontmatter_unclosed_raises():
    with pytest.raises(ValueError):
        v.split_frontmatter("---\ntype: player\nno closing fence\n")


def test_split_frontmatter_not_mapping_raises():
    with pytest.raises(ValueError):
        v.split_frontmatter("---\n- just\n- a\n- list\n---\nbody\n")


# --- date normalization --------------------------------------------------

def test_normalize_dates_converts_date_to_string():
    out = v.normalize_dates({"last_verified": datetime.date(2026, 6, 18)})
    assert out["last_verified"] == "2026-06-18"


def test_normalize_dates_recurses():
    out = v.normalize_dates({"provenance": {"computed_at": datetime.date(2026, 1, 2)}})
    assert out["provenance"]["computed_at"] == "2026-01-02"


# --- schema conformance --------------------------------------------------

def test_schema_accepts_good_frontmatter():
    fm, _ = v.split_frontmatter(GOOD_FRONTMATTER)
    fm = v.normalize_dates(fm)
    assert list(schema().iter_errors(fm)) == []


def test_schema_rejects_missing_required_field():
    fm, _ = v.split_frontmatter(GOOD_FRONTMATTER)
    del fm["source_boundary"]
    errors = list(schema().iter_errors(v.normalize_dates(fm)))
    assert any("source_boundary" in e.message for e in errors)


def test_schema_rejects_unapproved_type():
    fm, _ = v.split_frontmatter(GOOD_FRONTMATTER)
    fm["type"] = "not-a-real-type"
    errors = list(schema().iter_errors(v.normalize_dates(fm)))
    assert errors


def test_schema_rejects_bad_source_boundary():
    fm, _ = v.split_frontmatter(GOOD_FRONTMATTER)
    fm["source_boundary"] = "reference"  # not in the enum
    errors = list(schema().iter_errors(v.normalize_dates(fm)))
    assert errors


# --- content rules via validate_file on temp files -----------------------

def _write(tmp_path, name, content):
    p = tmp_path / name
    p.write_text(content, encoding="utf-8")
    return p


def test_validate_file_clean(tmp_path):
    p = _write(tmp_path, "test-player.md", GOOD_FRONTMATTER)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert f.errors == []


def test_validate_file_flags_review_required(tmp_path):
    content = GOOD_FRONTMATTER.replace(
        "status: active", "status: active\nreview_required: true"
    )
    p = _write(tmp_path, "rr.md", content)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert any("review_required" in e for e in f.errors)


def test_validate_file_flags_missing_provenance(tmp_path):
    content = GOOD_FRONTMATTER.replace(
        "provenance:\n  source: CricketStudio derived claim layer\n  confidence: high\n",
        "",
    )
    p = _write(tmp_path, "no-prov.md", content)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert any("provenance" in e for e in f.errors)


def test_validate_file_flags_restricted_raw_feed(tmp_path):
    content = GOOD_FRONTMATTER + '\n```json\n{"balls": [{"over": 1}]}\n```\n'
    p = _write(tmp_path, "raw.md", content)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert any("restricted" in e for e in f.errors)


def test_validate_file_flags_broken_internal_link(tmp_path):
    content = GOOD_FRONTMATTER + "\nSee [missing](./does-not-exist.md).\n"
    p = _write(tmp_path, "linky.md", content)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert any("broken internal link" in e for e in f.errors)


def test_validate_file_flags_bad_date(tmp_path):
    content = GOOD_FRONTMATTER.replace("last_verified: 2026-06-18", 'last_verified: "June 2026"')
    p = _write(tmp_path, "baddate.md", content)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert any("ISO date" in e for e in f.errors)


def test_duplicate_entity_id_detected(tmp_path):
    a = _write(tmp_path, "a.md", GOOD_FRONTMATTER)
    b = _write(tmp_path, "b.md", GOOD_FRONTMATTER)  # same entity_id
    f = v.Findings()
    seen_ids, seen_slugs = {}, {}
    v.validate_file(a, schema(), f, seen_ids, seen_slugs)
    v.validate_file(b, schema(), f, seen_ids, seen_slugs)
    assert any("duplicate entity_id" in e for e in f.errors)


def test_metric_requires_formula(tmp_path):
    metric_fm = """---
type: metric
title: Bad Metric
description: A metric missing its formula.
resource: https://players.cricketstudio.ai/x
status: active
last_verified: 2026-06-18
license: CC-BY-4.0
source_system: CricketStudio
source_boundary: methodology_only
---

# Bad Metric

Just prose, no formula and no limitations.
"""
    p = _write(tmp_path, "bad-metric.md", metric_fm)
    f = v.Findings()
    v.validate_file(p, schema(), f, {}, {})
    assert any("Formula" in e for e in f.errors)


# --- integration: the real bundle must validate clean --------------------

def test_real_bundle_validates_clean():
    rc = v.main(["validate_okf.py"])
    assert rc == 0
