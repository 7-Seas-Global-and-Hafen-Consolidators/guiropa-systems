#!/usr/bin/env python3
"""GUIROPA local editorial structural envelope.

Adapts the proven Passport Radio local-output contract to the existing GUIROPA
editorial engine without relaxing its publication gates. The wrapper only
specializes the local Ollama fallback: one story, exactly four bounded
paragraphs, bounded title/deck, one grounded retry inherited from the core.
"""
from __future__ import annotations

import json
import os
import urllib.request

import guiropa_news_editorial as core

PARAGRAPH_MIN_CHARS = 200
PARAGRAPH_MAX_CHARS = 650
TITLE_MIN_CHARS = 12
TITLE_MAX_CHARS = 140
DECK_MIN_CHARS = 50
DECK_MAX_CHARS = 320


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
        "\nCONTRATO ESTRUTURAL LOCAL OBRIGATORIO: a resposta deve conter exatamente UMA story; "
        "bodyPt deve conter EXATAMENTE 4 paragrafos; cada paragrafo deve ter entre "
        f"{PARAGRAPH_MIN_CHARS} e {PARAGRAPH_MAX_CHARS} caracteres; titlePt entre "
        f"{TITLE_MIN_CHARS} e {TITLE_MAX_CHARS} caracteres; excerptPt entre "
        f"{DECK_MIN_CHARS} e {DECK_MAX_CHARS} caracteres. "
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
            "temperature": 0.2,
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


core.MAX_SOURCE_CHARS = min(core.MAX_SOURCE_CHARS, 5000)
core.LOCAL_MAX_OUTPUT_TOKENS = min(core.LOCAL_MAX_OUTPUT_TOKENS, 1900)
core.build_prompt = build_prompt
core.build_grounded_retry_prompt = build_grounded_retry_prompt
core.call_ollama_local = call_ollama_local

if __name__ == "__main__":
    print(
        "[GUIROPA ENVELOPE] local structural contract active: "
        f"1 story · 4 paragraphs · {PARAGRAPH_MIN_CHARS}-{PARAGRAPH_MAX_CHARS} chars/paragraph"
    )
    raise SystemExit(core.main())
