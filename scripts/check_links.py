#!/usr/bin/env python3
"""Check links across the CricketStudio OKF repository.

Default mode (no network): verifies that every relative Markdown link and every
frontmatter `related` path resolves to a file on disk. This runs in CI.

With `--external`, additionally checks that external http(s) URLs are reachable. This
mode makes network requests and is intended for occasional local/manual runs, never the
default CI gate.

Exit code 0 = all good, 1 = one or more broken links.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {".git", "node_modules", ".venv", "venv", "dist", "build", "__pycache__"}

MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
# Bare autolinks <https://...> are external; we only resolve relative .md targets here.


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def iter_markdown(root: Path):
    for path in root.rglob("*.md"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        yield path


def frontmatter_related(text: str) -> list[str]:
    if not text.startswith("---"):
        return []
    lines = text.split("\n")
    if lines[0].strip() != "---":
        return []
    end = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
    if end is None:
        return []
    try:
        data = yaml.safe_load("\n".join(lines[1:end])) or {}
    except yaml.YAMLError:
        return []
    related = data.get("related") if isinstance(data, dict) else None
    return [str(r) for r in related] if isinstance(related, list) else []


def collect_links(path: Path):
    """Return (internal_relative_targets, external_urls)."""
    text = path.read_text(encoding="utf-8")
    internal: list[str] = []
    external: list[str] = []
    for target in frontmatter_related(text):
        internal.append(target)
    for m in MD_LINK_RE.finditer(text):
        target = m.group(1).strip()
        if target.startswith(("http://", "https://")):
            external.append(target)
        elif target.startswith("#") or target.startswith("mailto:"):
            continue
        else:
            internal.append(target)
    return internal, external


def check_internal(path: Path, targets: list[str], errors: list[str]) -> None:
    for t in targets:
        clean = t.split("#", 1)[0]
        if not clean:
            continue
        resolved = (path.parent / clean).resolve()
        if not resolved.exists():
            errors.append(f"{rel(path)}: broken internal link -> {t}")


def check_external(path: Path, urls: list[str], errors: list[str]) -> None:
    import urllib.error
    import urllib.request

    for url in urls:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "okf-link-check"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status >= 400:
                    errors.append(f"{rel(path)}: external link {url} -> HTTP {resp.status}")
        except urllib.error.HTTPError as exc:
            if exc.code >= 400:
                errors.append(f"{rel(path)}: external link {url} -> HTTP {exc.code}")
        except Exception as exc:  # noqa: BLE001 - report any reachability failure
            errors.append(f"{rel(path)}: external link {url} -> {exc}")


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--external", action="store_true", help="also check external URLs (network)")
    parser.add_argument("root", nargs="?", default=str(REPO_ROOT), help="root directory to scan")
    args = parser.parse_args(argv[1:])

    root = Path(args.root).resolve()
    errors: list[str] = []
    count = 0
    for path in iter_markdown(root):
        count += 1
        internal, external = collect_links(path)
        check_internal(path, internal, errors)
        if args.external:
            check_external(path, external, errors)

    for e in errors:
        print(f"ERROR {e}")
    mode = "internal + external" if args.external else "internal"
    print(f"\nChecked {count} markdown file(s) ({mode} links): {len(errors)} broken link(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
