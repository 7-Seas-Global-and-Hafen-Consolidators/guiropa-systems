#!/usr/bin/env python3
"""GUIROPA Radio historical editorial generator.

Designed to spend at most ONE AI generation call per scheduled run.
All daily/monthly hard stops are evaluated before Copilot is invoked.
The engine is isolated from every audio/player/tunnel file.
"""
from __future__ import annotations

import argparse
import html
import json
import os
import re
import subprocess
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "data/guiropa-historical-editorial.json"
STATE_PATH = ROOT / "data/guiropa-historical-editorial-state.json"
OUT_DIR = ROOT / "client/public/editorial/history"
FEED_PATH = OUT_DIR / "index.json"

UA = "Mozilla/5.0 (compatible; GUIROPA-Historical-Editorial/1.0; +https://guiropa.world/)"


def read_json(path: Path, fallback):
    try:
        return json.loads(path.read_text("utf-8"))
    except FileNotFoundError:
        return fallback


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def iso_day(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d")


def iso_month(dt: datetime) -> str:
    return dt.strftime("%Y-%m")


def count_period(state: dict, now: datetime) -> tuple[int, int]:
    published = state.get("published") or []
    today = iso_day(now)
    month = iso_month(now)
    daily = sum(1 for item in published if str(item.get("published_at", "")).startswith(today))
    monthly = sum(1 for item in published if str(item.get("published_at", "")).startswith(month))
    return daily, monthly


def strip_html(raw: str) -> str:
    raw = re.sub(r"(?is)<script.*?>.*?</script>", " ", raw)
    raw = re.sub(r"(?is)<style.*?>.*?</style>", " ", raw)
    raw = re.sub(r"(?is)<noscript.*?>.*?</noscript>", " ", raw)
    raw = re.sub(r"(?s)<[^>]+>", " ", raw)
    raw = html.unescape(raw)
    raw = re.sub(r"\s+", " ", raw).strip()
    return raw


def fetch_source(url: str, max_chars: int = 18000) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xhtml+xml"})
    with urllib.request.urlopen(req, timeout=20) as response:
        content_type = response.headers.get("Content-Type", "")
        if "text" not in content_type and "html" not in content_type:
            return ""
        raw = response.read(350000).decode("utf-8", errors="ignore")
    text = strip_html(raw)
    return text[:max_chars]


def source_packet(urls: list[str]) -> list[dict]:
    packet = []
    for url in urls[:4]:
        try:
            text = fetch_source(url)
        except Exception as exc:
            print(f"source fetch failed: {url} :: {type(exc).__name__}", file=sys.stderr)
            continue
        if len(text) < 800:
            continue
        packet.append({
            "url": url,
            "host": urlparse(url).netloc,
            "text": text,
        })
    return packet


def select_candidate(config: dict, state: dict) -> dict | None:
    already = {item.get("slug") for item in state.get("published", [])}
    start = int(config["scope"]["start_year"])
    end = int(config["scope"]["end_year"])
    for item in config.get("queue", []):
        year = int(item.get("year", 0))
        if item.get("slug") in already:
            continue
        if start <= year <= end:
            return item
    return None


def build_prompt(candidate: dict, packet: list[dict]) -> str:
    evidence = []
    for i, src in enumerate(packet, 1):
        evidence.append(f"FONTE {i} ({src['host']}):\n{src['text']}")
    evidence_text = "\n\n".join(evidence)

    return f"""Você é o editor histórico da GUIROPA RADIO, uma publicação musical de caráter humano e editorial.

ESCREVA UMA ÚNICA MATÉRIA ORIGINAL EM PORTUGUÊS DO BRASIL.

REGRAS ABSOLUTAS:
- O foco histórico deve permanecer entre 1950 e 1989.
- Não invente fatos, datas, falas, citações, bastidores ou causalidades que não estejam sustentados pelo pacote de fontes abaixo.
- Não copie frases longas das fontes. Reconstrua tudo com redação própria.
- Não mencione nomes de sites-fontes no corpo da matéria.
- Não escreva como lista cronológica, verbete ou texto SEO.
- Escreva como uma revista musical humana: cena, contexto, pessoas, som, atmosfera, tensão cultural e consequência.
- Evite exageros vazios e frases publicitárias.
- Não use emojis.
- Não use markdown.

SAÍDA OBRIGATÓRIA: JSON puro e válido com estas chaves:
{{
  "title": "...",
  "deck": "...",
  "kicker": "GUIROPA ARCHIVES · {candidate['decade']}",
  "body": ["parágrafo 1", "parágrafo 2", "..."],
  "year": {int(candidate['year'])},
  "decade": "{candidate['decade']}"
}}

A matéria deve ter entre 700 e 1200 palavras no total dos parágrafos.

PAUTA:
Título de trabalho: {candidate['title']}
Ângulo: {candidate['angle']}

PACOTE DE FONTES PARA APURAÇÃO:
{evidence_text}
"""


def call_copilot(prompt: str) -> dict:
    # GitHub Actions' automatic GITHUB_TOKEN does not authenticate Copilot CLI.
    # Historical generation must use the dedicated personal Copilot token only;
    # the workflow safely skips generation when that secret is unavailable.
    token = os.environ.get("COPILOT_GITHUB_TOKEN", "").strip()
    if not token:
        raise RuntimeError("Dedicated Copilot token unavailable")

    env = os.environ.copy()
    env["COPILOT_GITHUB_TOKEN"] = token
    env["GH_TOKEN"] = token
    env["GITHUB_TOKEN"] = token

    cmd = ["copilot", "-p", prompt, "-s", "--no-ask-user"]
    model = os.environ.get("GUIROPA_EDITORIAL_MODEL", "").strip()
    if model:
        cmd.extend(["--model", model])

    proc = subprocess.run(cmd, capture_output=True, text=True, env=env, timeout=240)
    if proc.returncode != 0:
        detail = (proc.stderr or proc.stdout or "Copilot failed").strip()
        raise RuntimeError(detail[-1200:])

    text = proc.stdout.strip()
    match = re.search(r"\{.*\}", text, flags=re.S)
    if not match:
        raise RuntimeError("Copilot did not return a JSON object")
    return json.loads(match.group(0))


def validate_article(article: dict, candidate: dict, config: dict) -> None:
    required = ["title", "deck", "kicker", "body", "year", "decade"]
    for key in required:
        if key not in article:
            raise ValueError(f"missing key: {key}")
    if not isinstance(article["body"], list) or len(article["body"]) < 5:
        raise ValueError("body must contain at least five paragraphs")

    year = int(article["year"])
    start = int(config["scope"]["start_year"])
    end = int(config["scope"]["end_year"])
    if not start <= year <= end:
        raise ValueError("article year outside GUIROPA historical scope")
    if year != int(candidate["year"]):
        raise ValueError("article year drifted from candidate")

    words = sum(len(str(p).split()) for p in article["body"])
    if words < 650 or words > 1350:
        raise ValueError(f"article word count outside safe range: {words}")


def render_html(article: dict, candidate: dict, sources: list[dict], published_at: str) -> str:
    esc = html.escape
    paragraphs = "\n".join(f"<p>{esc(str(p))}</p>" for p in article["body"])
    source_links = "\n".join(
        f'<li><a href="{esc(src["url"], quote=True)}" rel="noopener noreferrer" target="_blank">{esc(src["host"])}</a></li>'
        for src in sources
    )
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="{esc(article['deck'], quote=True)}">
<title>{esc(article['title'])} | GUIROPA RADIO</title>
<style>
:root{{--paper:#f4ead7;--ink:#211a15;--muted:#756451;--red:#b83224;--line:rgba(78,57,38,.18)}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:Georgia,'Times New Roman',serif}}main{{width:min(860px,calc(100% - 36px));margin:0 auto;padding:72px 0 120px}}a{{color:inherit}}.k{{font:900 .68rem/1.2 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--red)}}h1{{font-size:clamp(3rem,8vw,6.7rem);line-height:.9;letter-spacing:-.055em;font-weight:400;margin:22px 0}}.deck{{font-size:clamp(1.2rem,2.3vw,1.65rem);line-height:1.45;color:var(--muted);margin:0 0 42px}}.meta{{padding:14px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font:800 .68rem/1.5 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--red);margin-bottom:45px}}article p{{font-size:1.12rem;line-height:1.85;margin:0 0 1.65rem}}.sources{{margin-top:60px;padding-top:25px;border-top:1px solid var(--line)}}.sources h2{{font-size:1.2rem;font-weight:400}}.sources li{{margin:.55rem 0;color:var(--muted)}}.back{{display:inline-block;margin-bottom:35px;font:800 .7rem Arial,sans-serif;letter-spacing:.12em;text-decoration:none}}
</style>
</head>
<body>
<main>
<a class="back" href="/">← GUIROPA RADIO</a>
<div class="k">{esc(article['kicker'])}</div>
<h1>{esc(article['title'])}</h1>
<p class="deck">{esc(article['deck'])}</p>
<div class="meta">{esc(str(article['year']))} · {esc(article['decade'])} · publicado {esc(published_at[:10])}</div>
<article>{paragraphs}</article>
<section class="sources"><h2>Pesquisa histórica</h2><ul>{source_links}</ul></section>
</main>
</body>
</html>"""


def run(apply: bool) -> int:
    config = read_json(CONFIG_PATH, {})
    state = read_json(STATE_PATH, {"version": 1, "published": []})
    now = utc_now()

    scope = config.get("scope") or {}
    daily, monthly = count_period(state, now)
    daily_hard = int(scope.get("daily_hard_stop", 2))
    monthly_hard = int(scope.get("monthly_hard_stop", 45))

    print(f"GUIROPA historical editorial: daily={daily}/{daily_hard} monthly={monthly}/{monthly_hard}")

    # Critical quota guard: NO AI process can be launched before these checks.
    if daily >= daily_hard:
        print("daily hard stop reached; no AI call")
        return 0
    if monthly >= monthly_hard:
        print("monthly hard stop reached; no AI call")
        return 0

    candidate = select_candidate(config, state)
    if not candidate:
        print("historical queue empty; no AI call")
        return 0

    packet = source_packet(candidate.get("sources") or [])
    if len(packet) < 2:
        print("fewer than two usable research sources; no AI call")
        return 0

    if not apply:
        print(f"dry run ready: {candidate['slug']} · {len(packet)} sources · no AI call")
        return 0

    # Exactly one AI call per run. There is deliberately no automatic retry/fallback.
    article = call_copilot(build_prompt(candidate, packet))
    validate_article(article, candidate, config)

    published_at = now.replace(microsecond=0).isoformat().replace("+00:00", "Z")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    article_path = OUT_DIR / f"{candidate['slug']}.html"
    article_path.write_text(render_html(article, candidate, packet, published_at), encoding="utf-8")

    record = {
        "slug": candidate["slug"],
        "url": f"/editorial/history/{candidate['slug']}.html",
        "title": article["title"],
        "deck": article["deck"],
        "year": int(article["year"]),
        "decade": article["decade"],
        "published_at": published_at,
    }
    state.setdefault("published", []).append(record)
    write_json(STATE_PATH, state)

    feed = read_json(FEED_PATH, {"version": 1, "items": []})
    items = [record] + [x for x in (feed.get("items") or []) if x.get("slug") != record["slug"]]
    feed["items"] = items[:60]
    write_json(FEED_PATH, feed)

    print(f"published: {record['url']}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="permit the single AI generation call and write output")
    args = parser.parse_args()
    return run(apply=args.apply)


if __name__ == "__main__":
    raise SystemExit(main())