#!/usr/bin/env python3
from __future__ import annotations

import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "client/public/data/rss-world-feed.json"
BRIDGE_URL = "https://raw.githubusercontent.com/7-Seas-Global-and-Hafen-Consolidators/passport-radio/main/data/guiropa-editorial-bridge.json"
UA = "Mozilla/5.0 (compatible; GUIROPA-Editorial-Bridge-Consumer/1.0; +https://guiropa.world/)"


def read_json(path: Path, fallback):
    try:
        return json.loads(path.read_text("utf-8"))
    except Exception:
        return fallback


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=40) as response:
        return json.loads(response.read().decode("utf-8"))


def is_ready(item: dict) -> bool:
    return item.get("editorialStatus") == "ready" and bool(item.get("titlePt")) and bool(item.get("excerptPt")) and isinstance(item.get("bodyPt"), list) and len(item.get("bodyPt") or []) >= 4


def validate_story(story: dict) -> tuple[str, str, str, list[str]]:
    sid = str(story.get("id") or "").strip()
    title = str(story.get("titlePt") or "").strip()
    excerpt = str(story.get("excerptPt") or "").strip()
    body = [str(x).strip() for x in (story.get("bodyPt") or []) if str(x).strip()]
    if not sid or not title or not excerpt or len(body) < 4 or len(body) > 10:
        raise ValueError(f"invalid bridge story {sid or '<missing>'}")
    words = sum(len(p.split()) for p in body)
    if words < 120 or words > 1100:
        raise ValueError(f"unsafe bridge story length {sid}:{words}")
    return sid, title, excerpt, body


def main() -> int:
    feed = read_json(FEED, {"items": []})
    packet = fetch_json(BRIDGE_URL)
    stories = packet.get("stories") or []
    if not isinstance(stories, list):
        raise SystemExit("EDITORIAL BRIDGE BLOCKED — stories is not a list")

    mapped = {}
    for story in stories:
        sid, title, excerpt, body = validate_story(story)
        mapped[sid] = (title, excerpt, body)

    stamp = str(packet.get("generatedAt") or datetime.now(timezone.utc).isoformat())
    provider = str(packet.get("provider") or "passport-secret-bridge")
    changed = 0
    enriched = []

    for item in feed.get("items") or []:
        sid = str(item.get("id") or "")
        if is_ready(item) or sid not in mapped:
            enriched.append(item)
            continue
        title, excerpt, body = mapped[sid]
        enriched.append({
            **item,
            "titlePt": title,
            "excerptPt": excerpt,
            "bodyPt": body,
            "translationStatus": "pt-ready",
            "editorialStatus": "ready",
            "editorialGeneratedAt": stamp,
            "editorialProvider": provider,
            "editorialBridge": "passport-radio",
        })
        changed += 1

    if changed == 0:
        print("[GUIROPA BRIDGE] no new matching stories")
        return 0

    feed["items"] = enriched
    feed["translatedPt"] = sum(1 for x in enriched if x.get("titlePt"))
    feed["translationPending"] = len(enriched) - feed["translatedPt"]
    feed["publishedPt"] = sum(1 for x in enriched if is_ready(x))
    feed["editorialPending"] = len(enriched) - feed["publishedPt"]
    feed["editorialUpdatedAt"] = datetime.now(timezone.utc).isoformat()
    feed["editorialDailyLimit"] = 500
    feed["editorialBatchSize"] = 12
    day = datetime.now(timezone.utc).date().isoformat()
    feed["editorialPublishedToday"] = sum(1 for x in enriched if is_ready(x) and str(x.get("editorialGeneratedAt") or "")[:10] == day)

    FEED.write_text(json.dumps(feed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"[GUIROPA BRIDGE] applied={changed} publishedPt={feed['publishedPt']} pending={feed['editorialPending']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
