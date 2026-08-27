#!/usr/bin/env python3
"""GUIROPA grounded local editorial envelope.

Passport-derived structural JSON envelope plus a GUIROPA grounding firewall:
- one story per local inference;
- exactly four bounded paragraphs;
- skip weak evidence before inference;
- reject numeric claims absent from the Fact Pack;
- one grounded corrective retry;
- automatically unpublish legacy local drafts that predate grounding provenance.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from datetime import datetime, timezone

import guiropa_news_editorial as core

PARAGRAPH_MIN_CHARS = 200
PARAGRAPH_MAX_CHARS = 650
TITLE_MIN_CHARS = 12
TITLE_MAX_CHARS = 140
DECK_MIN_CHARS = 50
DECK_MAX_CHARS = 320
MIN_EVIDENCE_CHARS = 1200
CANDIDATE_SCAN = 18
GROUNDING_VERSION = "passport-envelope-v2"


def local_story_schema() -> dict:
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["stories"],
        "properties": {
            "stories": {
                "type": "array",
                "minItems": 1,
                "maxItems": 1,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["id", "titlePt", "excerptPt", "bodyPt"],
                    "properties": {
                        "id": {"type": "string", "minLength": 1, "maxLength": 240},
                        "titlePt": {"type": "string", "minLength": TITLE_MIN_CHARS, "maxLength": TITLE_MAX_CHARS},
                        "excerptPt": {"type": "string", "minLength": DECK_MIN_CHARS, "maxLength": DECK_MAX_CHARS},
                        "bodyPt": {
                            "type": "array",
                            "minItems": 4,
                            "maxItems": 4,
                            "items": {
                                "type": "string",
                                "minLength": PARAGRAPH_MIN_CHARS,
                                "maxLength": PARAGRAPH_MAX_CHARS,
                            },
                        },
                    },
                },
            }
        },
    }


_base_build_prompt = core.build_prompt
_base_retry_prompt = core.build_grounded_retry_prompt


def _envelope_note() -> str:
    return (
        "\nCONTRATO ESTRUTURAL E FACTUAL LOCAL OBRIGATORIO: a resposta deve conter exatamente UMA story; "
        "bodyPt deve conter EXATAMENTE 4 paragrafos; cada paragrafo deve ter entre "
        f"{PARAGRAPH_MIN_CHARS} e {PARAGRAPH_MAX_CHARS} caracteres; titlePt entre "
        f"{TITLE_MIN_CHARS} e {TITLE_MAX_CHARS} caracteres; excerptPt entre "
        f"{DECK_MIN_CHARS} e {DECK_MAX_CHARS} caracteres. "
        "Todo numero, data, quantidade, posicao, duracao ou ano citado precisa existir literalmente no pacote de evidencias. "
        "Cumprir o envelope NUNCA autoriza inventar fatos, repetir frases ou preencher lacunas."
    )


def build_prompt(packets: list[dict]) -> str:
    return _base_build_prompt(packets) + _envelope_note()


def build_grounded_retry_prompt(packet: dict, reason: str) -> str:
    return _base_retry_prompt(packet, reason) + _envelope_note()


def call_ollama_local(prompt: str) -> dict:
    endpoint = os.environ.get("GUIROPA_OLLAMA_URL", "http://127.0.0.1:11434/api/chat").strip()
    model = os.environ.get("GUIROPA_OLLAMA_MODEL", "qwen2.5:1.5b-instruct").strip()
    if not endpoint.startswith("http://127.0.0.1:") and not endpoint.startswith("http://localhost:"):
        raise RuntimeError("Ollama endpoint rejected: local loopback only")
    payload = {
        "model": model,
        "stream": False,
        "format": local_story_schema(),
        "messages": [{"role": "user", "content": prompt}],
        "options": {
            "temperature": 0.15,
            "num_predict": 1900,
            "num_ctx": int(os.environ.get("GUIROPA_OLLAMA_CONTEXT", "8192")),
        },
    }
    data = core.post_json(endpoint, payload, {"Content-Type": "application/json"}, timeout=420)
    text = str((data.get("message") or {}).get("content") or "")
    if not text:
        raise RuntimeError("Ollama returned empty content")
    parsed = core.parse_json_text(text)
    stories = parsed.get("stories")
    if not isinstance(stories, list) or len(stories) != 1:
        raise RuntimeError("local structural envelope rejected stories shape")
    return parsed


def evidence_text(packet: dict) -> str:
    return " ".join(
        str(packet.get(key) or "")
        for key in ("title", "rssExcerpt", "evidence", "publishedAt", "source", "region")
    )


def numeric_tokens(text: str) -> set[str]:
    return set(re.findall(r"(?<!\w)\d+(?:[.,]\d+)?(?!\w)", text or ""))


def grounding_guard(story: dict, packet: dict) -> None:
    evidence = evidence_text(packet)
    if len(str(packet.get("evidence") or "")) < MIN_EVIDENCE_CHARS:
        raise ValueError(f"insufficient evidence: {len(str(packet.get('evidence') or ''))} chars")
    generated = " ".join(
        [str(story.get("titlePt") or ""), str(story.get("excerptPt") or "")]
        + [str(p) for p in (story.get("bodyPt") or [])]
    )
    unsupported_numbers = sorted(numeric_tokens(generated) - numeric_tokens(evidence))
    if unsupported_numbers:
        raise ValueError(f"unsupported numeric claims: {unsupported_numbers[:8]}")
    source_title = re.sub(r"\s+", " ", str(packet.get("title") or "")).strip().casefold()
    pt_title = re.sub(r"\s+", " ", str(story.get("titlePt") or "")).strip().casefold()
    if source_title and pt_title == source_title:
        raise ValueError("title was not rewritten to pt-BR")


def sanitize_legacy_local_ready(feed: dict) -> int:
    cleared = 0
    for item in feed.get("items") or []:
        if (
            item.get("editorialStatus") == "ready"
            and item.get("editorialProvider") == "ollama-local-zero-key"
            and item.get("editorialGroundingVersion") != GROUNDING_VERSION
        ):
            item["bodyPt"] = []
            item["editorialStatus"] = "pending"
            item["editorialGeneratedAt"] = None
            item.pop("editorialProvider", None)
            item.pop("editorialEvidenceChars", None)
            item.pop("editorialEvidenceSha256", None)
            cleared += 1
    return cleared


def choose_grounded_target(feed: dict) -> tuple[dict, dict] | tuple[None, None]:
    pending = [item for item in (feed.get("items") or []) if not core.is_ready(item)][:CANDIDATE_SCAN]
    ranked: list[tuple[int, dict, dict]] = []
    for item in pending:
        packet = core.source_packet(item)
        chars = len(str(packet.get("evidence") or ""))
        if chars >= MIN_EVIDENCE_CHARS:
            ranked.append((chars, item, packet))
        else:
            print(f"[GUIROPA GROUNDING] skip weak evidence id={item.get('id')} chars={chars}")
    if not ranked:
        return None, None
    ranked.sort(key=lambda row: row[0], reverse=True)
    _, item, packet = ranked[0]
    return item, packet


def main() -> int:
    feed = core.read_json(core.FEED, {"items": []})
    cleared = sanitize_legacy_local_ready(feed)
    if cleared:
        print(f"[GUIROPA GROUNDING] unpublished {cleared} legacy local story/stories without grounding provenance")

    now = datetime.now(timezone.utc)
    day = now.date().isoformat()
    already_today = sum(1 for item in (feed.get("items") or []) if core.generated_today(item, day))
    if already_today >= core.DAILY_LIMIT:
        core.write_json(core.FEED, feed)
        return 0

    target, packet = choose_grounded_target(feed)
    if target is None or packet is None:
        feed["publishedPt"] = sum(1 for item in (feed.get("items") or []) if core.is_ready(item))
        feed["editorialPending"] = len(feed.get("items") or []) - feed["publishedPt"]
        core.write_json(core.FEED, feed)
        print("[GUIROPA GROUNDING] no sufficiently grounded candidate available")
        return 0

    allowed = {str(target.get("id"))}
    result, provider = core.call_zero_cost_multiprovider(build_prompt([packet]))
    stories = result.get("stories")
    if not isinstance(stories, list) or len(stories) != 1:
        raise RuntimeError("provider response missing single stories item")

    story = core.normalize_story_shape(stories[0])
    sid = str(story.get("id") or "")
    try:
        core.validate_story(story, allowed)
        grounding_guard(story, packet)
    except ValueError as exc:
        if provider != "ollama-local-zero-key" or sid not in allowed:
            raise
        print(f"[GUIROPA GROUNDING] one corrective retry for {sid}: {exc}")
        retry = call_ollama_local(build_grounded_retry_prompt(packet, str(exc)))
        retry_stories = retry.get("stories")
        if not isinstance(retry_stories, list) or len(retry_stories) != 1:
            raise RuntimeError("grounded retry returned invalid stories array") from exc
        story = core.normalize_story_shape(retry_stories[0])
        core.validate_story(story, allowed)
        grounding_guard(story, packet)

    stamp = now.isoformat()
    evidence = str(packet.get("evidence") or "")
    for item in feed.get("items") or []:
        if str(item.get("id")) != sid:
            continue
        item.update({
            "titlePt": str(story["titlePt"]).strip(),
            "excerptPt": str(story["excerptPt"]).strip(),
            "bodyPt": [str(p).strip() for p in story["bodyPt"] if str(p).strip()],
            "translationStatus": "pt-ready",
            "editorialStatus": "ready",
            "editorialGeneratedAt": stamp,
            "editorialProvider": provider,
            "editorialGroundingVersion": GROUNDING_VERSION,
            "editorialEvidenceChars": len(evidence),
            "editorialEvidenceSha256": hashlib.sha256(evidence.encode("utf-8")).hexdigest(),
        })
        break

    items = feed.get("items") or []
    feed["translatedPt"] = sum(1 for item in items if item.get("titlePt"))
    feed["translationPending"] = len(items) - feed["translatedPt"]
    feed["publishedPt"] = sum(1 for item in items if core.is_ready(item))
    feed["editorialPending"] = len(items) - feed["publishedPt"]
    feed["aiCalls"] = int(feed.get("aiCalls") or 0) + 1
    feed["editorialUpdatedAt"] = stamp
    feed["editorialDailyLimit"] = core.DAILY_LIMIT
    feed["editorialBatchSize"] = core.BATCH_SIZE
    feed["editorialLocalBatchSize"] = 1
    feed["editorialPublishedToday"] = already_today + 1
    feed["editorialGroundingVersion"] = GROUNDING_VERSION
    feed["editorialLegacyUnpublished"] = int(feed.get("editorialLegacyUnpublished") or 0) + cleared
    core.write_json(core.FEED, feed)
    print(
        f"[GUIROPA GROUNDING] grounded Full Story ready id={sid} · evidence={len(evidence)} chars · "
        f"publishedPt={feed['publishedPt']} · pending={feed['editorialPending']} · provider={provider}"
    )
    return 0


core.MAX_SOURCE_CHARS = min(core.MAX_SOURCE_CHARS, 5000)
core.LOCAL_MAX_OUTPUT_TOKENS = min(core.LOCAL_MAX_OUTPUT_TOKENS, 1900)
core.build_prompt = build_prompt
core.build_grounded_retry_prompt = build_grounded_retry_prompt
core.call_ollama_local = call_ollama_local

if __name__ == "__main__":
    print(
        "[GUIROPA ENVELOPE] grounded local contract active: "
        f"1 story · 4 paragraphs · {PARAGRAPH_MIN_CHARS}-{PARAGRAPH_MAX_CHARS} chars/paragraph · "
        f"minimum evidence {MIN_EVIDENCE_CHARS} chars"
    )
    raise SystemExit(main())
