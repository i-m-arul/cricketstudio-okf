#!/usr/bin/env python3
"""
Check all players.cricketstudio.ai and okf.cricketstudio.ai URLs referenced in OKF files.

Two tracks:
  1. okf.cricketstudio.ai  -- filesystem check against okf/ directory (instant)
  2. players.cricketstudio.ai -- parallel HTTP HEAD requests (live 404 detection)

Outputs:
  - MALFORMED  : URL has obvious formatting errors (backtick, bracket placeholder)
  - OKF-MISSING: okf.cricketstudio.ai URL whose file doesn't exist on disk
  - HTTP-404   : players.cricketstudio.ai URL returning 404 or 410
  - HTTP-ERR   : any other HTTP error / connection failure

Run: python scripts/check_canonical_urls.py [--workers N] [--players-only] [--okf-only]
"""
from __future__ import annotations

import argparse
import re
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
OKF_ROOT = REPO_ROOT / "okf"

URL_RE = re.compile(r'https?://(players|okf)\.cricketstudio\.ai(/[^\s\")\]>,`\']*)?')

# Known-good static paths (no need to hit the network)
PLAYERS_STATIC_OK = {
    "/", "/standings", "/about", "/leaderboards",
    "/leagues/ipl", "/leagues/ipl/leaderboards", "/leagues/ipl/records",
    "/leagues/mlc", "/leagues/mlc/leaderboards",
    "/trust-manifest.json", "/metrics.json", "/claims.jsonl",
    "/queries.jsonl", "/versions.jsonl",
    "/evals/cricket-qa-v1.jsonl",
}

# OKF slug-to-subdir mapping
OKF_SLUG_MAP = {
    "dossier": OKF_ROOT / "dossier",
    "stories": OKF_ROOT / "stories",
    "research": OKF_ROOT / "research",
    "metrics": OKF_ROOT / "metrics",
    "spec": OKF_ROOT / "spec",
    "scorebook": OKF_ROOT / "scorebook",
    "journeys": OKF_ROOT / "journeys",
    "methodology": OKF_ROOT / "methodology",
}


def extract_urls() -> dict[str, set[str]]:
    """Return {url: set_of_source_files}."""
    url_to_sources: dict[str, set[str]] = defaultdict(set)
    for f in OKF_ROOT.rglob("*.md"):
        text = f.read_text(encoding="utf-8")
        for m in URL_RE.finditer(text):
            raw = m.group(0).rstrip(".,;`'\"")
            url_to_sources[raw].add(str(f.relative_to(REPO_ROOT)))
    return url_to_sources


def is_malformed(url: str) -> str | None:
    if "[" in url or "]" in url:
        return "placeholder/template URL (contains brackets)"
    if "`" in url or "'" in url:
        return "formatting artifact (backtick/quote in URL)"
    if url.endswith(".jsonl`") or url.endswith(".json`"):
        return "backtick formatting artifact"
    return None


def check_okf_url(url: str) -> tuple[str, str | None]:
    """Check an okf.cricketstudio.ai URL against the filesystem. Returns (url, error_or_None)."""
    path = url.replace("https://okf.cricketstudio.ai", "").split("#")[0].rstrip("/")
    if not path or path == "/":
        return url, None  # Root is fine

    parts = [p for p in path.split("/") if p]
    if not parts:
        return url, None

    section = parts[0]
    slug = parts[1] if len(parts) > 1 else None

    if section not in OKF_SLUG_MAP:
        # Top-level OKF routes we don't have on disk (viewer SPA routes)
        return url, None

    dir_ = OKF_SLUG_MAP[section]
    if slug is None:
        # Section index — fine
        return url, None

    # Check for slug.md
    candidate = dir_ / f"{slug}.md"
    if not candidate.exists():
        # Also try index.md
        if not (dir_ / slug / "index.md").exists():
            return url, f"OKF file not found: okf/{section}/{slug}.md"
    return url, None


def http_head(url: str) -> tuple[str, int | None, str | None]:
    """Return (url, status_code, error_string)."""
    req = urllib.request.Request(
        url, method="HEAD",
        headers={"User-Agent": "CricketStudio-OKF-LinkCheck/1.0"}
    )
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            return url, resp.status, None
    except urllib.error.HTTPError as exc:
        return url, exc.code, str(exc)
    except Exception as exc:
        return url, None, str(exc)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=30, help="HTTP parallel workers")
    parser.add_argument("--players-only", action="store_true")
    parser.add_argument("--okf-only", action="store_true")
    parser.add_argument("--sample", type=int, default=0, help="Only check first N players URLs (0=all)")
    args = parser.parse_args()

    print("Extracting URLs from OKF files...")
    url_sources = extract_urls()
    print(f"  Found {len(url_sources)} unique URLs")

    malformed = []
    okf_urls = []
    players_urls = []

    for url in sorted(url_sources):
        err = is_malformed(url)
        if err:
            malformed.append((url, err, url_sources[url]))
            continue
        if "okf.cricketstudio.ai" in url:
            okf_urls.append(url)
        elif "players.cricketstudio.ai" in url:
            players_urls.append(url)

    print(f"  Malformed: {len(malformed)}")
    print(f"  OKF URLs: {len(okf_urls)}")
    print(f"  Players URLs: {len(players_urls)}")

    results = []

    # --- Malformed ---
    for url, reason, sources in malformed:
        results.append(("MALFORMED", url, reason, sorted(sources)[:3]))

    # --- OKF filesystem check ---
    if not args.players_only:
        print(f"\nChecking {len(okf_urls)} OKF URLs against filesystem...")
        for url in sorted(okf_urls):
            _, err = check_okf_url(url)
            if err:
                results.append(("OKF-MISSING", url, err, sorted(url_sources[url])[:3]))
        print(f"  Done")

    # --- Players HTTP check ---
    if not args.okf_only:
        check_list = players_urls
        if args.sample:
            check_list = players_urls[:args.sample]

        # Filter out known-good static paths to avoid unnecessary requests
        to_check = []
        for url in check_list:
            path = url.replace("https://players.cricketstudio.ai", "").rstrip("/") or "/"
            if path in PLAYERS_STATIC_OK:
                continue
            to_check.append(url)

        print(f"\nHTTP-checking {len(to_check)} players.cricketstudio.ai URLs ({args.workers} workers)...")
        done = 0
        with ThreadPoolExecutor(max_workers=args.workers) as pool:
            futures = {pool.submit(http_head, url): url for url in to_check}
            for future in as_completed(futures):
                url, status, err = future.result()
                done += 1
                if done % 50 == 0:
                    print(f"  {done}/{len(to_check)}...", flush=True)
                if status is not None and status >= 400:
                    results.append((f"HTTP-{status}", url, f"HTTP {status}", sorted(url_sources[url])[:3]))
                elif err and status is None:
                    results.append(("HTTP-ERR", url, err[:80], sorted(url_sources[url])[:3]))
        print(f"  Done ({len(to_check)} checked)")

    # --- Print report ---
    print(f"\n{'='*70}")
    print(f"REPORT: {len(results)} issues found")
    print(f"{'='*70}\n")

    by_type: dict[str, list] = defaultdict(list)
    for item in results:
        by_type[item[0]].append(item)

    for kind in ["MALFORMED", "OKF-MISSING", "HTTP-404", "HTTP-410", "HTTP-ERR"]:
        items = by_type.get(kind, [])
        if not items:
            continue
        print(f"[{kind}] — {len(items)} issues")
        for _, url, reason, sources in sorted(items, key=lambda x: x[1]):
            print(f"  {url}")
            print(f"    reason: {reason}")
            if sources:
                print(f"    in:     {sources[0]}" + (f" +{len(sources)-1} more" if len(sources) > 1 else ""))
        print()

    # Summary
    error_count = sum(len(v) for k, v in by_type.items() if k not in ("HTTP-ERR",))
    print(f"{'='*70}")
    print(f"MALFORMED: {len(by_type.get('MALFORMED', []))}")
    print(f"OKF-MISSING: {len(by_type.get('OKF-MISSING', []))}")
    for k in sorted(k for k in by_type if k.startswith("HTTP-")):
        print(f"{k}: {len(by_type[k])}")
    print(f"{'='*70}")

    return 1 if error_count > 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
