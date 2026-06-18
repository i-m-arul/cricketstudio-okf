"""Tests for scripts/check_links.py internal-link checking. No network access."""
from pathlib import Path

import check_links as c

REPO_ROOT = Path(__file__).resolve().parent.parent


def test_collect_links_separates_internal_and_external(tmp_path):
    p = tmp_path / "f.md"
    p.write_text(
        "[a](./other.md) and [b](https://example.com) and [c](#anchor)\n",
        encoding="utf-8",
    )
    internal, external = c.collect_links(p)
    assert "./other.md" in internal
    assert "https://example.com" in external
    assert all(not t.startswith("#") for t in internal)


def test_frontmatter_related_collected(tmp_path):
    p = tmp_path / "f.md"
    p.write_text(
        "---\ntype: index\nrelated:\n  - ../x/y.md\n---\nbody\n",
        encoding="utf-8",
    )
    internal, _ = c.collect_links(p)
    assert "../x/y.md" in internal


def test_broken_internal_link_reported(tmp_path):
    p = tmp_path / "f.md"
    p.write_text("See [missing](./nope.md).\n", encoding="utf-8")
    errors: list[str] = []
    internal, _ = c.collect_links(p)
    c.check_internal(p, internal, errors)
    assert errors


def test_resolvable_internal_link_ok(tmp_path):
    (tmp_path / "target.md").write_text("# Target\n", encoding="utf-8")
    p = tmp_path / "f.md"
    p.write_text("See [ok](./target.md).\n", encoding="utf-8")
    errors: list[str] = []
    internal, _ = c.collect_links(p)
    c.check_internal(p, internal, errors)
    assert errors == []


def test_real_repo_internal_links_clean():
    rc = c.main(["check_links.py", str(REPO_ROOT)])
    assert rc == 0
