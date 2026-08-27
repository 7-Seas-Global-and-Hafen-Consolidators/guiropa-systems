#!/usr/bin/env python3
"""GUIROPA News Tunnel™ Full Story editorial engine.

Zero-cost architecture derived from Passport Radio:
- fail-closed Portuguese Full Story publication gates
- Groq -> Gemini -> OpenRouter -> local Ollama cascade
- up to 12 stories per run; local zero-key mode defaults to 1
- 500 stories/day hard publication target
"""
from __future__ import annotations

import html
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "client/public/data/rss-world-feed.json"
BATCH_SIZE = 12
DAILY_LIMIT = 500
MAX_SOURCE_CHARS = 9000
FETCH_BYTES = 220000
API_TIMEOUT = 360
MAX_OUTPUT_TOKENS = 9000
LOCAL_MAX_OUTPUT_TOKENS = 2200
UA = "Mozilla/5.0 (compatible; GUIROPA-News-Editorial/3.0; +https://guiropa.world/)"


def read_json(path: Path, fallback):
    try:
        return json.loads(path.read_text("utf-8"))
    except Exception:
        return fallback


def write_json(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def strip_html(raw: str) -> str:
    raw = re.sub(r"(?is)<script.*?>.*?</script>", " ", raw)
    raw = re.sub(r"(?is)<style.*?>.*?</style>", " ", raw)
    raw = re.sub(r"(?is)<noscript.*?>.*?</noscript>", " ", raw)
    raw = re.sub(r"(?s)<[^>]+>", " ", raw)
    return re.sub(r"\s+", " ", html.unescape(raw)).strip()


def fetch_source(url: str) -> str:
    if not url:
        return ""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml"})
    with urllib.request.urlopen(req, timeout=18) as response:
        ctype = response.headers.get("Content-Type", "")
        if "text" not in ctype and "html" not in ctype:
            return ""
        raw = response.read(FETCH_BYTES).decode("utf-8", errors="ignore")
    return strip_html(raw)[:MAX_SOURCE_CHARS]


def is_ready(item: dict) -> bool:
    return (
        item.get("editorialStatus") == "ready"
        and bool(str(item.get("titlePt") or "").strip())
        and bool(str(item.get("excerptPt") or "").strip())
        and isinstance(item.get("bodyPt"), list)
        and len(item.get("bodyPt") or []) >= 4
    )


def generated_today(item: dict, day: str) -> bool:
    stamp = str(item.get("editorialGeneratedAt") or "")
    return is_ready(item) and stamp[:10] == day


def external_provider_available() -> bool:
    return any(os.environ.get(name, "").strip() for name in ("GROQ_API_KEY", "GEMINI_API_KEY", "OPENROUTER_API_KEY"))


def select_targets(feed: dict, remaining_today: int) -> list[dict]:
    limit = max(0, min(BATCH_SIZE, remaining_today))
    if not external_provider_available():
        local_batch = max(1, min(BATCH_SIZE, int(os.environ.get("GUIROPA_LOCAL_BATCH", "1"))))
        limit = min(limit, local_batch)
    return [item for item in (feed.get("items") or []) if not is_ready(item)][:limit]


def source_packet(item: dict) -> dict:
    source_text = ""
    try:
        source_text = fetch_source(str(item.get("url") or ""))
    except Exception as exc:
        print(f"[GUIROPA EDITORIAL] source fetch failed {item.get('id')}: {type(exc).__name__}", file=sys.stderr)
    if len(source_text) < 500:
        source_text = str(item.get("excerpt") or "")
    return {
        "id": item.get("id"),
        "source": item.get("source") or "Fonte editorial",
        "host": urlparse(str(item.get("url") or "")).netloc,
        "region": item.get("region") or "WORLD",
        "publishedAt": item.get("publishedAt"),
        "title": item.get("title") or "",
        "rssExcerpt": item.get("excerpt") or "",
        "evidence": source_text,
    }


def build_prompt(packets: list[dict]) -> str:
    evidence = json.dumps(packets, ensure_ascii=False)
    return f"""Você é o editor do GUIROPA RADIO · NEWS TUNNEL™.

Transforme CADA sinal abaixo em UMA MATÉRIA EDITORIAL ORIGINAL, COMPLETA E EM PORTUGUÊS DO BRASIL.

REGRAS ABSOLUTAS:
- Use somente fatos sustentados pelo pacote de evidências de cada item.
- Não invente datas, falas, números, causas, bastidores, reações ou contexto.
- Compreenda qualquer idioma de origem e reescreva naturalmente em pt-BR; não faça tradução literal.
- Não reproduza a matéria-fonte integralmente nem copie frases longas.
- Preserve a grafia oficial de artistas, bandas, músicas, álbuns, festivais, gravadoras, locais e demais nomes próprios.
- Priorize o corpo factual extraído da página; o resumo RSS é apenas fallback.
- Se a evidência for curta, seja mais breve em vez de preencher lacunas.
- Escreva como revista musical humana, clara e informativa, nunca como verbete SEO.
- Sem emojis e sem markdown.
- Título, deck e toda a matéria devem estar em português brasileiro natural e consistente.
- Produza de 4 a 8 parágrafos por matéria, normalmente 300 a 650 palavras quando houver evidência suficiente.
- bodyPt DEVE ser um array JSON com NO MÍNIMO 4 strings não vazias; nunca compacte a matéria em 1, 2 ou 3 strings.
- Mesmo quando a matéria for breve, distribua o texto factual já escrito em pelo menos 4 parágrafos sem acrescentar fatos.
- O deck deve ter 1 ou 2 frases.
- A saída deve conter somente IDs recebidos.
- Responda exclusivamente com JSON puro e válido.

FORMATO OBRIGATÓRIO:
{{"stories":[{{"id":"id original","titlePt":"título","excerptPt":"deck","bodyPt":["parágrafo 1","parágrafo 2","parágrafo 3","parágrafo 4"]}}]}}

PACOTE DE EVIDÊNCIAS:
{evidence}
"""


def parse_json_text(text: str) -> dict:
    value = str(text or "").strip()
    if value.startswith("```"):
        value = re.sub(r"^```(?:json)?\s*", "", value, flags=re.I)
        value = re.sub(r"\s*```$", "", value)
    try:
        return json.loads(value)
    except Exception:
        match = re.search(r"\{.*\}", value, flags=re.S)
        if not match:
            raise RuntimeError("provider did not return a JSON object")
        return json.loads(match.group(0))


def post_json(url: str, payload: dict, headers: dict, timeout: int = API_TIMEOUT) -> dict:
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")[-1200:]
        raise RuntimeError(f"HTTP {exc.code}: {body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"network error: {exc.reason}") from exc


def call_groq(prompt: str) -> dict:
    key = os.environ.get("GROQ_API_KEY", "").strip()
    if not key:
        raise RuntimeError("GROQ_API_KEY unavailable")
    model = os.environ.get("GUIROPA_GROQ_MODEL", "openai/gpt-oss-120b").strip()
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "temperature": 0.35, "max_completion_tokens": MAX_OUTPUT_TOKENS, "response_format": {"type": "json_object"}}
    data = post_json("https://api.groq.com/openai/v1/chat/completions", payload, {"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    return parse_json_text(data["choices"][0]["message"]["content"])


def call_gemini(prompt: str) -> dict:
    key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not key:
        raise RuntimeError("GEMINI_API_KEY unavailable")
    model = os.environ.get("GUIROPA_GEMINI_MODEL", "gemini-2.5-flash-lite").strip()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{urllib.parse.quote(model, safe='')}:generateContent"
    payload = {"contents": [{"role": "user", "parts": [{"text": prompt}]}], "generationConfig": {"temperature": 0.35, "maxOutputTokens": MAX_OUTPUT_TOKENS, "responseMimeType": "application/json"}}
    data = post_json(url, payload, {"x-goog-api-key": key, "Content-Type": "application/json"})
    parts = data["candidates"][0]["content"]["parts"]
    return parse_json_text("".join(str(part.get("text", "")) for part in parts))


def call_openrouter(prompt: str) -> dict:
    key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not key:
        raise RuntimeError("OPENROUTER_API_KEY unavailable")
    model = os.environ.get("GUIROPA_OPENROUTER_MODEL", "openrouter/free").strip()
    if model != "openrouter/free" and not model.endswith(":free"):
        raise RuntimeError("paid OpenRouter model rejected; use openrouter/free or :free")
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "temperature": 0.35, "max_tokens": MAX_OUTPUT_TOKENS}
    data = post_json("https://openrouter.ai/api/v1/chat/completions", payload, {"Authorization": f"Bearer {key}", "Content-Type": "application/json", "HTTP-Referer": "https://guiropa.world/", "X-Title": "GUIROPA News Tunnel Editorial Engine"})
    return parse_json_text(data["choices"][0]["message"]["content"])


def call_ollama_local(prompt: str) -> dict:
    endpoint = os.environ.get("GUIROPA_OLLAMA_URL", "http://127.0.0.1:11434/api/chat").strip()
    model = os.environ.get("GUIROPA_OLLAMA_MODEL", "qwen2.5:0.5b-instruct").strip()
    if not endpoint.startswith("http://127.0.0.1:") and not endpoint.startswith("http://localhost:"):
        raise RuntimeError("Ollama endpoint rejected: local loopback only")
    payload = {
        "model": model,
        "stream": False,
        "format": "json",
        "messages": [{"role": "user", "content": prompt}],
        "options": {"temperature": 0.3, "num_predict": min(LOCAL_MAX_OUTPUT_TOKENS, MAX_OUTPUT_TOKENS), "num_ctx": 16384},
    }
    data = post_json(endpoint, payload, {"Content-Type": "application/json"}, timeout=420)
    text = str((data.get("message") or {}).get("content") or "")
    if not text:
        raise RuntimeError("Ollama returned empty content")
    return parse_json_text(text)


def call_zero_cost_multiprovider(prompt: str) -> tuple[dict, str]:
    failures = []
    for name, provider in (
        ("groq-free", call_groq),
        ("gemini-free", call_gemini),
        ("openrouter-free", call_openrouter),
        ("ollama-local-zero-key", call_ollama_local),
    ):
        try:
            result = provider(prompt)
            print(f"ZERO_COST_PROVIDER_OK provider={name}", file=sys.stderr)
            return result, name
        except Exception as exc:
            detail = str(exc).replace("\n", " ")[-700:]
            failures.append(f"{name}: {detail}")
            print(f"ZERO_COST_PROVIDER_FAIL provider={name} detail={detail}", file=sys.stderr)
    raise RuntimeError("all_zero_cost_providers_exhausted | " + " | ".join(failures))


def normalize_story_shape(story: dict) -> dict:
    """Repair paragraph boundaries only; never add, remove, or rewrite factual text."""
    body = story.get("bodyPt")
    if isinstance(body, str):
        paragraphs = [body.strip()] if body.strip() else []
    elif isinstance(body, list):
        paragraphs = [str(p).strip() for p in body if str(p).strip()]
    else:
        return story

    if len(paragraphs) >= 4:
        return {**story, "bodyPt": paragraphs}

    sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", " ".join(paragraphs)) if part.strip()]
    if len(sentences) < 4:
        return {**story, "bodyPt": paragraphs}

    groups: list[list[str]] = [[] for _ in range(4)]
    total_words = sum(len(sentence.split()) for sentence in sentences)
    target_words = max(1, total_words / 4)
    group_index = 0
    group_words = 0
    for sentence_index, sentence in enumerate(sentences):
        remaining_sentences = len(sentences) - sentence_index
        remaining_groups = 4 - group_index
        if (
            group_index < 3
            and groups[group_index]
            and group_words >= target_words
            and remaining_sentences >= remaining_groups
        ):
            group_index += 1
            group_words = 0
        groups[group_index].append(sentence)
        group_words += len(sentence.split())

    repaired = [" ".join(group).strip() for group in groups if group]
    if len(repaired) == 4:
        print(f"[GUIROPA EDITORIAL] normalized paragraph boundaries for {story.get('id')}", file=sys.stderr)
        return {**story, "bodyPt": repaired}
    return {**story, "bodyPt": paragraphs}


def validate_story(story: dict, allowed_ids: set[str]) -> None:
    sid = str(story.get("id") or "")
    if sid not in allowed_ids:
        raise ValueError(f"unexpected id: {sid}")
    title = str(story.get("titlePt") or "").strip()
    excerpt = str(story.get("excerptPt") or "").strip()
    body = story.get("bodyPt")
    if not title or not excerpt:
        raise ValueError(f"missing Portuguese title/deck for {sid}")
    if not isinstance(body, list) or len(body) < 4 or len(body) > 10:
        raise ValueError(f"unsafe paragraph count for {sid}")
    paragraphs = [str(p).strip() for p in body if str(p).strip()]
    if len(paragraphs) < 4:
        raise ValueError(f"empty paragraphs for {sid}")
    words = sum(len(paragraph.split()) for paragraph in paragraphs)
    if words < 120 or words > 1100:
        raise ValueError(f"unsafe editorial word count for {sid}: {words}")


def main() -> int:
    feed = read_json(FEED, {"items": []})
    now = datetime.now(timezone.utc)
    day = now.date().isoformat()
    already_today = sum(1 for item in (feed.get("items") or []) if generated_today(item, day))
    remaining = max(0, DAILY_LIMIT - already_today)
    if remaining <= 0:
        print(f"[GUIROPA EDITORIAL] daily limit reached: {already_today}/{DAILY_LIMIT}")
        return 0

    targets = select_targets(feed, remaining)
    if not targets:
        print("[GUIROPA EDITORIAL] no pending stories")
        return 0

    packets = [source_packet(item) for item in targets]
    result, provider = call_zero_cost_multiprovider(build_prompt(packets))
    stories = result.get("stories")
    if not isinstance(stories, list):
        raise RuntimeError("provider response missing stories array")

    allowed = {str(item.get("id")) for item in targets}
    valid: dict[str, dict] = {}
    for story in stories:
        story = normalize_story_shape(story)
        validate_story(story, allowed)
        valid[str(story["id"])] = story
    if not valid:
        raise RuntimeError("EDITORIAL BLOCKED — provider returned zero valid Full Stories")

    stamp = now.isoformat()
    enriched = []
    for item in feed.get("items") or []:
        story = valid.get(str(item.get("id")))
        if not story:
            enriched.append(item)
            continue
        enriched.append({**item, "titlePt": str(story["titlePt"]).strip(), "excerptPt": str(story["excerptPt"]).strip(), "bodyPt": [str(p).strip() for p in story["bodyPt"] if str(p).strip()], "translationStatus": "pt-ready", "editorialStatus": "ready", "editorialGeneratedAt": stamp, "editorialProvider": provider})

    feed["items"] = enriched
    feed["translatedPt"] = sum(1 for item in enriched if item.get("titlePt"))
    feed["translationPending"] = len(enriched) - feed["translatedPt"]
    feed["publishedPt"] = sum(1 for item in enriched if is_ready(item))
    feed["editorialPending"] = len(enriched) - feed["publishedPt"]
    feed["aiCalls"] = int(feed.get("aiCalls") or 0) + 1
    feed["editorialUpdatedAt"] = stamp
    feed["editorialDailyLimit"] = DAILY_LIMIT
    feed["editorialBatchSize"] = BATCH_SIZE
    feed["editorialLocalBatchSize"] = int(os.environ.get("GUIROPA_LOCAL_BATCH", "1"))
    feed["editorialPublishedToday"] = already_today + len(valid)
    write_json(FEED, feed)
    print(f"[GUIROPA EDITORIAL] {len(valid)} Full Stories ready · {already_today + len(valid)}/{DAILY_LIMIT} today · {feed['publishedPt']} PT published · {feed['editorialPending']} pending · provider={provider}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())