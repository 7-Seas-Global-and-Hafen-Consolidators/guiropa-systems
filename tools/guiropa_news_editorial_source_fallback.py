#!/usr/bin/env python3
"""Zero-cost factual fallback for GUIROPA News Tunnel.

Builds complete Portuguese editorial envelopes only from fields already present
in the RSS item. It never invents facts; when source detail is thin, it states
that limitation and points readers to the linked original source.
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
    text = re.sub(r"\s+", " ", text).strip()
    return text


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
    return first(item, "sourceName", "source", "publisher") or "a fonte original"


def enough_title(title: str) -> bool:
    return len(title) >= 8 and len(title.split()) >= 2


def build_story(item: dict[str, Any]) -> tuple[str, str, list[str]] | None:
    title = first(item, "titlePt", "title")
    if not enough_title(title):
        return None

    excerpt = first(
        item,
        "excerptPt",
        "excerpt",
        "summaryPt",
        "summary",
        "descriptionPt",
        "description",
        "contentSnippet",
    )
    if not excerpt:
        excerpt = f"A GUIROPA acompanha a atualização publicada por {source_name(item)}."

    region = first(item, "region", "country", "category") or "Mundo"
    source = source_name(item)
    published = first(item, "publishedAt", "pubDate", "discoveredAt", "date")
    url = first(item, "url", "link", "sourceUrl")

    p1 = sentence(excerpt)
    p2 = (
        f"A informação foi identificada no fluxo da GUIROPA a partir de {source}, "
        f"na cobertura classificada como {region}."
    )
    if published:
        p2 += f" O registro de origem traz a marca temporal {published}."

    detail = first(item, "contentPt", "content", "details", "context", "fullText")
    if detail and detail != excerpt:
        p3 = sentence(detail[:1400])
    else:
        p3 = (
            "Este registro preserva apenas informações efetivamente presentes na publicação de origem; "
            "a GUIROPA não acrescenta nomes, números, declarações ou circunstâncias que não tenham vindo do material coletado."
        )

    p4 = (
        f"A matéria permanece conectada à fonte {source}. "
        + ("O link original está disponível neste registro para conferência e atualização direta." if url else
           "A GUIROPA continuará acompanhando novas atualizações verificáveis desta pauta pelo seu fluxo de fontes.")
    )

    body = [x for x in (p1, p2, p3, p4) if len(clean(x)) >= 20]
    if len(body) < 4:
        return None

    return title, excerpt, body


def main() -> int:
    data = json.loads(FEED.read_text("utf-8"))
    items = data.get("items") or []
    today = datetime.now(timezone.utc).date().isoformat()
    used_today = int(data.get("editorialPublishedToday") or 0)
    saved_day = str(data.get("editorialPublishedDay") or "")
    if saved_day != today:
        used_today = 0

    allowance = max(0, DAILY_LIMIT - used_today)
    limit = min(BATCH, allowance)
    published = 0

    pending = [x for x in items if x.get("editorialStatus") != "ready"]
    for item in pending:
        if published >= limit:
            break
        built = build_story(item)
        if not built:
            continue
        title, excerpt, body = built
        item["titlePt"] = title
        item["excerptPt"] = excerpt
        item["bodyPt"] = body
        item["editorialStatus"] = "ready"
        item["editorialProvider"] = "source-structured"
        item["editorialModel"] = "zero-cost-factual-envelope-v1"
        item["editorialUpdatedAt"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        published += 1

    ready = [x for x in items if x.get("editorialStatus") == "ready" and x.get("titlePt") and len(x.get("bodyPt") or []) >= 4]
    data["publishedPt"] = len(ready)
    data["editorialPending"] = max(0, len(items) - len(ready))
    data["editorialPublishedDay"] = today
    data["editorialPublishedToday"] = used_today + published
    data["editorialDailyLimit"] = DAILY_LIMIT
    data["editorialUpdatedAt"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

    if published:
        FEED.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", "utf-8")

    print(f"GUIROPA source fallback: published={published} ready={len(ready)} pending={data['editorialPending']} today={data['editorialPublishedToday']}/{DAILY_LIMIT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
