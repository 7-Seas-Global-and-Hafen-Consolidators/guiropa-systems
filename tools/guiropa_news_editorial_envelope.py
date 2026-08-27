#!/usr/bin/env python3
"""GUIROPA local editorial — Passport-style Fact Pack + structural envelope.

Fail closed. The engine owns story identity; the model only writes bounded PT-BR
copy and paragraph-level Fact Pack references. Bad legacy local stories are
removed even when a new candidate cannot pass the editorial firewall.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from datetime import datetime, timezone

import guiropa_news_editorial as core

PARAGRAPH_MIN_CHARS = 140
PARAGRAPH_MAX_CHARS = 420
TITLE_MIN_CHARS = 12
TITLE_MAX_CHARS = 140
DECK_MIN_CHARS = 50
DECK_MAX_CHARS = 300
MIN_EVIDENCE_CHARS = 1200
CANDIDATE_SCAN = 20
MAX_FACTS = 14
GROUNDING_VERSION = "passport-fact-pack-v3"
FACT_IDS = [f"F{i}" for i in range(1, MAX_FACTS + 1)]


def local_story_schema() -> dict:
    paragraph = {
        "type": "object",
        "additionalProperties": False,
        "required": ["text", "factRefs"],
        "properties": {
            "text": {"type": "string", "minLength": PARAGRAPH_MIN_CHARS, "maxLength": PARAGRAPH_MAX_CHARS},
            "factRefs": {
                "type": "array", "minItems": 1, "maxItems": 3,
                "items": {"type": "string", "enum": FACT_IDS},
            },
        },
    }
    return {
        "type": "object",
        "additionalProperties": False,
        "required": ["stories"],
        "properties": {
            "stories": {
                "type": "array", "minItems": 1, "maxItems": 1,
                "items": {
                    "type": "object", "additionalProperties": False,
                    "required": ["titlePt", "excerptPt", "bodyPt"],
                    "properties": {
                        "titlePt": {"type": "string", "minLength": TITLE_MIN_CHARS, "maxLength": TITLE_MAX_CHARS},
                        "excerptPt": {"type": "string", "minLength": DECK_MIN_CHARS, "maxLength": DECK_MAX_CHARS},
                        "bodyPt": {"type": "array", "minItems": 4, "maxItems": 4, "items": paragraph},
                    },
                },
            }
        },
    }


def split_facts(text: str) -> list[str]:
    clean = re.sub(r"\s+", " ", str(text or "")).strip()
    candidates = re.split(r"(?<=[.!?;])\s+(?=[A-ZÀ-Ý0-9\"'“‘(])|(?<=:)\s+(?=[A-ZÀ-Ý0-9])", clean)
    facts: list[str] = []
    seen: set[str] = set()
    for sentence in candidates:
        sentence = sentence.strip()
        if len(sentence) < 55 or len(sentence) > 700:
            continue
        key = re.sub(r"\W+", " ", sentence.casefold()).strip()
        if not key or key in seen:
            continue
        seen.add(key)
        facts.append(sentence)
        if len(facts) >= MAX_FACTS:
            break
    return facts


def attach_fact_pack(packet: dict) -> dict:
    source = " ".join([
        str(packet.get("rssExcerpt") or ""),
        str(packet.get("evidence") or ""),
    ])
    facts = split_facts(source)
    enriched = dict(packet)
    enriched["factPack"] = [{"id": f"F{i+1}", "fact": fact} for i, fact in enumerate(facts)]
    return enriched


def fact_pack_prompt(packet: dict, correction: str = "") -> str:
    facts = packet.get("factPack") or []
    correction_note = f"\nCORREÇÃO DA TENTATIVA ANTERIOR: {correction}\n" if correction else ""
    return f"""Você é o editor factual do GUIROPA RADIO · NEWS TUNNEL™.
Escreva UMA matéria curta e original em português brasileiro usando SOMENTE o Fact Pack abaixo.
{correction_note}
REGRAS ABSOLUTAS:
- Não invente, complete, suponha ou contextualize fatos ausentes.
- NÃO crie nem devolva campo id; a identidade da matéria é controlada pelo engine.
- Não use citações diretas. Parafraseie apenas o que o Fact Pack sustenta.
- Todo número, data, quantidade, duração ou ano usado deve existir literalmente no Fact Pack.
- Preserve nomes próprios existentes; não crie nomes, cargos, lugares ou relações novas.
- bodyPt tem EXATAMENTE 4 objetos. Cada objeto possui text e factRefs.
- Cada parágrafo deve ter {PARAGRAPH_MIN_CHARS}-{PARAGRAPH_MAX_CHARS} caracteres e citar 1-3 IDs que realmente sustentam aquele parágrafo.
- Não repita a mesma informação para preencher espaço.
- Título e deck em pt-BR natural. Sem markdown, sem emojis, sem comentários fora do JSON.
- Responda apenas JSON compatível com o schema.

TÍTULO ORIGINAL: {packet.get('title')}
FONTE: {packet.get('source')}
FACT PACK:
{json.dumps(facts, ensure_ascii=False)}
"""


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
            "temperature": 0.05,
            "num_predict": 1500,
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
        raise RuntimeError("Fact Pack schema rejected stories shape")
    return parsed


def materialize_story(raw: dict, sid: str) -> tuple[dict, list[list[str]]]:
    body = raw.get("bodyPt")
    if not isinstance(body, list) or len(body) != 4:
        raise ValueError("bodyPt must contain exactly four provenance paragraphs")
    texts: list[str] = []
    refs: list[list[str]] = []
    for row in body:
        if not isinstance(row, dict):
            raise ValueError("bodyPt paragraph must be an object with text/factRefs")
        text = str(row.get("text") or "").strip()
        fact_refs = [str(x) for x in (row.get("factRefs") or []) if str(x)]
        texts.append(text)
        refs.append(fact_refs)
    return {
        "id": sid,
        "titlePt": str(raw.get("titlePt") or "").strip(),
        "excerptPt": str(raw.get("excerptPt") or "").strip(),
        "bodyPt": texts,
    }, refs


def numeric_tokens(text: str) -> set[str]:
    return set(re.findall(r"(?<!\w)\d+(?:[.,]\d+)?(?!\w)", text or ""))


def token_set(text: str) -> set[str]:
    return {x for x in re.findall(r"[a-zà-ÿ0-9]+", str(text).casefold()) if len(x) > 3}


def validate_grounding(story: dict, refs: list[list[str]], packet: dict) -> None:
    facts = packet.get("factPack") or []
    fact_by_id = {str(row.get("id")): str(row.get("fact") or "") for row in facts}
    if len(fact_by_id) < 4:
        raise ValueError(f"Fact Pack too small: {len(fact_by_id)}")
    if len(refs) != 4:
        raise ValueError("missing paragraph provenance")
    for index, fact_refs in enumerate(refs):
        if not fact_refs or any(ref not in fact_by_id for ref in fact_refs):
            raise ValueError(f"invalid factRefs in paragraph {index + 1}: {fact_refs}")

    evidence = " ".join(fact_by_id.values())
    generated = " ".join(
        [str(story.get("titlePt") or ""), str(story.get("excerptPt") or "")]
        + [str(p) for p in (story.get("bodyPt") or [])]
    )
    unsupported_numbers = sorted(numeric_tokens(generated) - numeric_tokens(evidence))
    if unsupported_numbers:
        raise ValueError(f"unsupported numeric claims: {unsupported_numbers[:8]}")

    paragraphs = [str(p) for p in story.get("bodyPt") or []]
    for i in range(len(paragraphs)):
        for j in range(i + 1, len(paragraphs)):
            a, b = token_set(paragraphs[i]), token_set(paragraphs[j])
            if a and b and len(a & b) / max(1, min(len(a), len(b))) > 0.72:
                raise ValueError(f"repetitive paragraphs: {i + 1}/{j + 1}")

    source_title = re.sub(r"\s+", " ", str(packet.get("title") or "")).strip().casefold()
    pt_title = re.sub(r"\s+", " ", str(story.get("titlePt") or "")).strip().casefold()
    if source_title and pt_title == source_title:
        raise ValueError("title was not rewritten to pt-BR")

    if any(mark in " ".join(paragraphs) for mark in ('“', '”', '"')):
        raise ValueError("direct quotations are disabled in local editorial")


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
            for key in (
                "editorialProvider", "editorialEvidenceChars", "editorialEvidenceSha256",
                "editorialGroundingVersion", "editorialFactRefs", "editorialFactPackSha256",
            ):
                item.pop(key, None)
            cleared += 1
    return cleared


def refresh_feed_counters(feed: dict, cleared: int, stamp: str | None = None) -> None:
    items = feed.get("items") or []
    feed["translatedPt"] = sum(1 for item in items if item.get("titlePt"))
    feed["translationPending"] = len(items) - feed["translatedPt"]
    feed["publishedPt"] = sum(1 for item in items if core.is_ready(item))
    feed["editorialPending"] = len(items) - feed["publishedPt"]
    feed["editorialGroundingVersion"] = GROUNDING_VERSION
    feed["editorialLegacyUnpublished"] = int(feed.get("editorialLegacyUnpublished") or 0) + cleared
    if stamp:
        feed["editorialUpdatedAt"] = stamp


def choose_grounded_target(feed: dict) -> tuple[dict, dict] | tuple[None, None]:
    pending = [item for item in (feed.get("items") or []) if not core.is_ready(item)][:CANDIDATE_SCAN]
    ranked: list[tuple[int, dict, dict]] = []
    for item in pending:
        packet = attach_fact_pack(core.source_packet(item))
        evidence_chars = len(str(packet.get("evidence") or ""))
        fact_count = len(packet.get("factPack") or [])
        if evidence_chars >= MIN_EVIDENCE_CHARS and fact_count >= 4:
            ranked.append((fact_count * 10000 + evidence_chars, item, packet))
        else:
            print(f"[GUIROPA FACT PACK] skip id={item.get('id')} evidence={evidence_chars} facts={fact_count}")
    if not ranked:
        return None, None
    ranked.sort(key=lambda row: row[0], reverse=True)
    _, item, packet = ranked[0]
    return item, packet


def generate_and_validate(packet: dict, sid: str, correction: str = "") -> tuple[dict, list[list[str]]]:
    raw = call_ollama_local(fact_pack_prompt(packet, correction))
    rows = raw.get("stories") or []
    if len(rows) != 1:
        raise ValueError("local provider returned wrong story count")
    story, refs = materialize_story(rows[0], sid)
    core.validate_story(story, {sid})
    validate_grounding(story, refs, packet)
    return story, refs


def main() -> int:
    feed = core.read_json(core.FEED, {"items": []})
    cleared = sanitize_legacy_local_ready(feed)
    if cleared:
        print(f"[GUIROPA FACT PACK] unpublished {cleared} legacy local story/stories")

    now = datetime.now(timezone.utc)
    stamp = now.isoformat()
    day = now.date().isoformat()
    already_today = sum(1 for item in (feed.get("items") or []) if core.generated_today(item, day))
    if already_today >= core.DAILY_LIMIT:
        refresh_feed_counters(feed, cleared, stamp)
        core.write_json(core.FEED, feed)
        return 0

    target, packet = choose_grounded_target(feed)
    if target is None or packet is None:
        refresh_feed_counters(feed, cleared, stamp)
        core.write_json(core.FEED, feed)
        print("[GUIROPA FACT PACK] no publishable grounded candidate")
        return 0

    sid = str(target.get("id"))
    try:
        try:
            story, refs = generate_and_validate(packet, sid)
        except Exception as first_error:
            print(f"[GUIROPA FACT PACK] one corrective retry id={sid}: {first_error}")
            story, refs = generate_and_validate(packet, sid, str(first_error)[:500])
    except Exception as final_error:
        refresh_feed_counters(feed, cleared, stamp)
        feed["editorialLastBlockedReason"] = str(final_error)[:700]
        core.write_json(core.FEED, feed)
        print(f"[GUIROPA FACT PACK] publication blocked after retry id={sid}: {final_error}")
        return 0

    evidence = str(packet.get("evidence") or "")
    facts_json = json.dumps(packet.get("factPack") or [], ensure_ascii=False, sort_keys=True)
    for item in feed.get("items") or []:
        if str(item.get("id")) != sid:
            continue
        item.update({
            "titlePt": str(story["titlePt"]).strip(),
            "excerptPt": str(story["excerptPt"]).strip(),
            "bodyPt": [str(p).strip() for p in story["bodyPt"]],
            "translationStatus": "pt-ready",
            "editorialStatus": "ready",
            "editorialGeneratedAt": stamp,
            "editorialProvider": "ollama-local-zero-key",
            "editorialGroundingVersion": GROUNDING_VERSION,
            "editorialEvidenceChars": len(evidence),
            "editorialEvidenceSha256": hashlib.sha256(evidence.encode("utf-8")).hexdigest(),
            "editorialFactPackSha256": hashlib.sha256(facts_json.encode("utf-8")).hexdigest(),
            "editorialFactRefs": refs,
        })
        break

    refresh_feed_counters(feed, cleared, stamp)
    feed["aiCalls"] = int(feed.get("aiCalls") or 0) + 1
    feed["editorialDailyLimit"] = core.DAILY_LIMIT
    feed["editorialBatchSize"] = core.BATCH_SIZE
    feed["editorialLocalBatchSize"] = 1
    feed["editorialPublishedToday"] = already_today + 1
    feed.pop("editorialLastBlockedReason", None)
    core.write_json(core.FEED, feed)
    print(
        f"[GUIROPA FACT PACK] published grounded story id={sid} facts={len(packet.get('factPack') or [])} "
        f"evidence={len(evidence)} publishedPt={feed['publishedPt']} pending={feed['editorialPending']}"
    )
    return 0


if __name__ == "__main__":
    print(
        "[GUIROPA FACT PACK] engine-owned identity + Passport provenance active · "
        f"four factual paragraphs · {PARAGRAPH_MIN_CHARS}-{PARAGRAPH_MAX_CHARS} chars each"
    )
    raise SystemExit(main())
