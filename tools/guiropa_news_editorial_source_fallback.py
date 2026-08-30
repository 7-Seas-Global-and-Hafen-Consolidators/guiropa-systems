#!/usr/bin/env python3
"""Zero-cost factual fallback for GUIROPA News Tunnel.

Turns already-translated Portuguese RSS signals into complete source-grounded
bulletins. It never promotes untranslated copy and never invents facts.
"""
from __future__ import annotations

import html
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "client/public/data/rss-world-feed.json"
BATCH = max(1, int(os.getenv("GUIROPA_SOURCE_FALLBACK_BATCH", "100")))
DAILY_LIMIT = max(1, int(os.getenv("GUIROPA_EDITORIAL_DAILY_LIMIT", "500")))


def clean(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, list):
        value = " ".join(str(x) for x in value if x)
    text = html.unescape(str(value))
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def first(item: dict[str, Any], *keys: str) -> str:
    for key in keys:
        value = clean(item.get(key))
        if value:
            return value
    return ""


def sentence(text: str) -> str:
    text = clean(text).rstrip(" .")
    return text + "." if text else ""


def source_name(item: dict[str, Any]) -> str:
    return first(item, "sourceName", "source", "publisher")


def translated_pt_ready(item: dict[str, Any]) -> bool:
    title_pt = clean(item.get("titlePt"))
    excerpt_pt = clean(item.get("excerptPt"))
    if item.get("translationStatus") != "pt-ready" or len(title_pt) < 8 or len(excerpt_pt) < 24:
        return False
    original_title = clean(item.get("title"))
    original_excerpt = clean(item.get("excerpt"))
    region = clean(item.get("region")).lower()
    brazilian_source = "brazil" in region or "brasil" in region
    if not brazilian_source and original_title and title_pt.casefold() == original_title.casefold():
        return False
    if not brazilian_source and original_excerpt and excerpt_pt.casefold() == original_excerpt.casefold():
        return False
    return True


def build_story(item: dict[str, Any]) -> tuple[str, str, list[str]] | None:
    if not translated_pt_ready(item):
        return None

    title = clean(item.get("titlePt"))
    excerpt = clean(item.get("excerptPt"))
    region = first(item, "region", "country", "category") or "Mundo"
    source = source_name(item)

    # Mr. Nomad / GUIROPA public editorial must never expose the research outlet.
    # If the translated signal itself carries the outlet name, leave it pending
    # instead of publishing a story that the post-publish guard will reject.
    public_seed = f"{title} {excerpt}".casefold()
    if source and source.casefold() in public_seed:
        return None

    p1 = sentence(excerpt)
    p2 = (
        f"O registro chegou ao News Tunnel da GUIROPA classificado em {region}. "
        "A edição preserva somente as informações já disponíveis no sinal em português."
    )
    p3 = (
        "A matéria foi estruturada sem acrescentar nomes, números, declarações, causas "
        "ou circunstâncias que não estejam presentes no material coletado."
    )
    p4 = (
        "O acompanhamento permanece aberto para novas informações verificáveis. "
        "Quando houver atualização consistente, a GUIROPA poderá incorporar os novos dados em uma edição posterior."
    )

    body = [p1, p2, p3, p4]
    if any(len(clean(paragraph)) < 20 for paragraph in body):
        return None
    return title, excerpt, body


def main() -> int:
    data = json.loads(FEED.read_text("utf-8"))
    items = data.get("items") or []
    now = datetime.now(timezone.utc)
    today = now.date().isoformat()
    used_today = sum(1 for item in items if item.get("editorialStatus") == "ready" and str(item.get("editorialGeneratedAt") or "")[:10] == today)
    allowance = max(0, DAILY_LIMIT - used_today)
    limit = min(BATCH, allowance)
    published = 0
    stamp = now.isoformat()

    for item in items:
        if published >= limit:
            break
        if item.get("editorialStatus") == "ready":
            continue
        built = build_story(item)
        if not built:
            continue
        title, excerpt, body = built
        item["titlePt"] = title
        item["excerptPt"] = excerpt
        item["bodyPt"] = body
        item["editorialStatus"] = "ready"
        item["editorialGeneratedAt"] = stamp
        item["editorialProvider"] = "source-structured-pt"
        item["editorialModel"] = "zero-cost-factual-envelope-v3"
        published += 1

    ready = [item for item in items if item.get("editorialStatus") == "ready" and item.get("titlePt") and item.get("excerptPt") and isinstance(item.get("bodyPt"), list) and len(item.get("bodyPt") or []) >= 4]
    data["publishedPt"] = len(ready)
    data["editorialPending"] = max(0, len(items) - len(ready))
    data["editorialPublishedToday"] = used_today + published
    data["editorialDailyLimit"] = DAILY_LIMIT
    data["editorialUpdatedAt"] = stamp

    if published:
        FEED.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", "utf-8")

    print(f"GUIROPA PT source fallback: published={published} ready={len(ready)} pending={data['editorialPending']} today={data['editorialPublishedToday']}/{DAILY_LIMIT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
