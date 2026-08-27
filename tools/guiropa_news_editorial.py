#!/usr/bin/env python3
from __future__ import annotations
import html, json, os, re, subprocess, sys, urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "client/public/data/rss-world-feed.json"
BATCH_SIZE = 4
MAX_SOURCE_CHARS = 12000
FETCH_BYTES = 280000
UA = "Mozilla/5.0 (compatible; GUIROPA-News-Editorial/1.0; +https://guiropa.world/)"

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
    raw = html.unescape(raw)
    return re.sub(r"\s+", " ", raw).strip()

def fetch_source(url: str) -> str:
    if not url:
        return ""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml"})
    with urllib.request.urlopen(req, timeout=20) as response:
        ctype = response.headers.get("Content-Type", "")
        if "text" not in ctype and "html" not in ctype:
            return ""
        raw = response.read(FETCH_BYTES).decode("utf-8", errors="ignore")
    return strip_html(raw)[:MAX_SOURCE_CHARS]

def select_targets(feed: dict) -> list[dict]:
    return [
        item for item in (feed.get("items") or [])
        if item.get("editorialStatus") != "ready"
        or not item.get("titlePt")
        or len(item.get("bodyPt") or []) < 4
    ][:BATCH_SIZE]

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
- Use apenas fatos sustentados pelo pacote de evidências de cada item.
- Não invente datas, falas, números, causas, bastidores, reações ou contexto não sustentado.
- NÃO traduza nem reproduza a matéria-fonte integralmente.
- NÃO copie frases longas da fonte. Reescreva tudo com redação própria.
- Preserve nomes próprios, nomes de discos, músicas, turnês, empresas e obras.
- Se a evidência for curta, seja mais breve em vez de completar lacunas.
- Escreva como revista musical humana, clara e informativa, não como verbete SEO.
- Sem emojis. Sem markdown.
- O título e TODA a matéria devem estar em português.
- Produza de 4 a 8 parágrafos por matéria, normalmente 300 a 650 palavras quando houver evidência suficiente.
- O deck deve ter 1 ou 2 frases e funcionar como chamada editorial.
- A saída deve conter exatamente os IDs recebidos.

SAÍDA OBRIGATÓRIA: JSON puro e válido:
{{
  "stories": [
    {{
      "id": "id original",
      "titlePt": "título em português",
      "excerptPt": "deck/resumo em português",
      "bodyPt": ["parágrafo 1", "parágrafo 2", "parágrafo 3", "parágrafo 4"]
    }}
  ]
}}

PACOTE DE EVIDÊNCIAS:
{evidence}
"""

def call_copilot(prompt: str) -> dict:
    token = (os.environ.get("COPILOT_GITHUB_TOKEN", "").strip()
             or os.environ.get("GH_TOKEN", "").strip()
             or os.environ.get("GITHUB_TOKEN", "").strip())
    if not token:
        raise RuntimeError("No GitHub/Copilot token available")
    env = os.environ.copy()
    env["COPILOT_GITHUB_TOKEN"] = token
    env["GH_TOKEN"] = token
    env["GITHUB_TOKEN"] = token
    cmd = ["copilot", "-p", prompt, "-s", "--no-ask-user"]
    model = os.environ.get("GUIROPA_EDITORIAL_MODEL", "").strip()
    if model:
        cmd.extend(["--model", model])
    proc = subprocess.run(cmd, capture_output=True, text=True, env=env, timeout=300)
    if proc.returncode != 0:
        detail = (proc.stderr or proc.stdout or "Copilot failed").strip()
        raise RuntimeError(detail[-1600:])
    text = proc.stdout.strip()
    match = re.search(r"\{.*\}", text, flags=re.S)
    if not match:
        raise RuntimeError("Copilot did not return a JSON object")
    return json.loads(match.group(0))

def validate_story(story: dict, allowed_ids: set[str]) -> None:
    sid = str(story.get("id") or "")
    if sid not in allowed_ids:
        raise ValueError(f"unexpected id: {sid}")
    title = str(story.get("titlePt") or "").strip()
    excerpt = str(story.get("excerptPt") or "").strip()
    body = story.get("bodyPt")
    if not title or not excerpt:
        raise ValueError(f"missing Portuguese title/deck for {sid}")
    if not isinstance(body, list) or len(body) < 4:
        raise ValueError(f"bodyPt must have at least 4 paragraphs for {sid}")
    words = sum(len(str(paragraph).split()) for paragraph in body)
    if words < 120 or words > 1100:
        raise ValueError(f"unsafe editorial word count for {sid}: {words}")

def main() -> int:
    feed = read_json(FEED, {"items": []})
    targets = select_targets(feed)
    if not targets:
        print("[GUIROPA EDITORIAL] no pending stories")
        return 0

    packets = [source_packet(item) for item in targets]
    result = call_copilot(build_prompt(packets))
    stories = result.get("stories")
    if not isinstance(stories, list):
        raise RuntimeError("Copilot response missing stories array")

    allowed = {str(item.get("id")) for item in targets}
    valid = {}
    for story in stories:
        validate_story(story, allowed)
        valid[str(story["id"])] = story

    if not valid:
        raise RuntimeError("No valid stories returned")

    now = datetime.now(timezone.utc).isoformat()
    enriched = []
    for item in feed.get("items") or []:
        story = valid.get(str(item.get("id")))
        if not story:
            enriched.append(item)
            continue
        enriched.append({
            **item,
            "titlePt": str(story["titlePt"]).strip(),
            "excerptPt": str(story["excerptPt"]).strip(),
            "bodyPt": [str(p).strip() for p in story["bodyPt"] if str(p).strip()],
            "translationStatus": "pt-ready",
            "editorialStatus": "ready",
            "editorialGeneratedAt": now,
        })

    feed["items"] = enriched
    feed["translatedPt"] = sum(1 for item in enriched if item.get("titlePt"))
    feed["translationPending"] = len(enriched) - feed["translatedPt"]
    feed["publishedPt"] = sum(1 for item in enriched if item.get("editorialStatus") == "ready" and len(item.get("bodyPt") or []) >= 4)
    feed["editorialPending"] = len(enriched) - feed["publishedPt"]
    feed["aiCalls"] = int(feed.get("aiCalls") or 0) + 1
    feed["editorialUpdatedAt"] = now

    write_json(FEED, feed)
    print(f"[GUIROPA EDITORIAL] {len(valid)} stories ready · {feed['publishedPt']} PT published · {feed['editorialPending']} pending · 1 AI call")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
