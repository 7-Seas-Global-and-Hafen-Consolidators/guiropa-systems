#!/usr/bin/env python3
"""Fail-closed post-publish guard for GUIROPA News Tunnel pt-BR stories."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "client/public/data/rss-world-feed.json"

STRONG_ENGLISH = (
    r"\bgrievances?\b", r"\baccording to\b", r"\bhowever\b", r"\breportedly\b",
    r"\balthough\b", r"\btherefore\b", r"\bmeanwhile\b", r"\bthe musician\b",
    r"\bthe guitarist\b", r"\bthe band\b", r"\bwas released\b", r"\bhas announced\b",
    r"\bpreview\b", r"\bpocket\b",
)

UNNATURAL_PTBR = (
    r"\baqui estamos tudo\b", r"\bdrogaditas?\b", r"\bex-bancos roubados\b",
    r"\ba[cç][aã]o de pet\b", r"\buma humanizada vers[aã]o\b", r"\bensina filhos\b",
    r"\bfalaçoado\b", r"\bfalação de\b", r"\breimplanta[cç][aã]o de p[eé]\b",
    r"\bexperimentou um problema\b", r"\bem europa\b", r"\bseu tour\b",
)

OFF_TOPIC_TITLE = (
    r"\bgrand theft auto\b",
    r"\bgta\s*(?:vi|6)\b",
)

TYPOGRAPHY_PTBR = (
    (r"\s+[,.!?;:]", "space_before_punctuation"),
    (r"[!?]{3,}", "excessive_terminal_punctuation"),
    (r"(?<!\.)\.{4,}(?!\.)", "excessive_periods"),
    (r"\s{3,}", "excessive_whitespace"),
)
MOJIBAKE = ("�", "Ã©", "Ã£", "Ã§", "Ã³", "â€™", "â€œ", "â€")

SOURCE_MARKERS = (
    "NPR Music", "The Guardian", "Music-News.com", "Ultimate Classic Rock", "Loudwire", "NME",
    "Pitchfork", "AllMusic", "Consequence", "XS Noize", "Nialler9", "Aipate", "The Music",
    "Unite Asia", "JROCK NEWS", "The Score Magazine", "The Jerusalem Post", "La Presse",
    "Le Figaro", "La Croix", "Aficia", "Amarok Magazine", "RTBF", "RTS", "DoSol",
    "Rock On Board", "Hits Perdidos", "Blog n' Roll", "A&R Factory", "Nagamag",
    "Where the Music Meets",
)
SOURCE_DISCLOSURE = (
    r"\breportagem\s+(?:foi\s+)?publicada\s+(?:pelo|pela|por)\b",
    r"\bpublicado\s+(?:pelo|pela|por)\b",
    r"\bidentificad[ao]\s+.*?\ba\s+partir\s+de\b",
    r"\bregistro\s+de\s+origem\b",
    r"\ba\s+pauta\s+permanece\s+conectada\s+à\s+fonte\b",
    r"\blink\s+original\b",
    r"\bfonte\s+(?:original|consultada|externa)\b",
    r"\bsegundo\s+a\s+fonte\b",
    r"\bde\s+acordo\s+com\s+a\s+fonte\b",
)

SANTANA_ID = "f1c6bdcd8900a71d789a3f8e7b128023ce3b17cd341c07c26341ee559b31065b"
SANTANA_REPAIR = {
    "titlePt": "Carlos Santana relaciona ressentimentos ao câncer em fala controversa no Red Rocks",
    "excerptPt": "Durante um show no Red Rocks, Carlos Santana afirmou que guardar ressentimentos estaria ligado ao câncer. A declaração provocou críticas por apresentar como causal uma relação que não é sustentada por evidências médicas.",
    "bodyPt": [
        "Carlos Santana fez uma declaração controversa durante sua apresentação no Red Rocks, em 24 de agosto. Ao falar com o público sobre perdão e ressentimentos, o guitarrista afirmou que carregar mágoas poderia causar câncer e aconselhou os fãs a deixarem essas emoções para trás.",
        "A fala provocou reação negativa porque tratou como certeza uma relação entre ressentimento e câncer. Doenças oncológicas têm causas e fatores de risco complexos, e não há evidência científica de que guardar mágoas seja uma causa direta da doença.",
        "Santana também relatou ter ouvido de um especialista em câncer que ele jamais teria encontrado um paciente sem ressentimentos. A anedota foi apresentada no palco como reforço de sua ideia, mas não constitui evidência científica para estabelecer uma relação causal entre emoções e desenvolvimento de câncer.",
        "Reconhecido mundialmente por sua trajetória no rock e pela fusão de rock, blues e ritmos latinos, Santana acabou gerando repercussão menos por sua defesa do perdão e mais pela forma categórica como associou esse comportamento à prevenção de uma doença complexa."
    ],
}

MAYNARD_ID = "5e581d9cfaa3191b947865f34e7bd124d956ef4e5351d39d2deccd335355c0bd"
MAYNARD_REPAIR = {
    "titlePt": "Maynard James Keenan passa por cirurgia de substituição do quadril e mantém planos de voltar aos palcos",
    "excerptPt": "Maynard James Keenan, vocalista de Tool, A Perfect Circle e Puscifer, revelou que passou por uma cirurgia de substituição do quadril após enfrentar fortes dores durante a turnê europeia do A Perfect Circle.",
    "bodyPt": [
        "Maynard James Keenan revelou que passou por uma cirurgia de substituição do quadril em 26 de agosto. O problema começou em 3 de julho, em Luxemburgo, durante a turnê europeia do A Perfect Circle, quando o músico sentiu uma dor intensa no quadril esquerdo.",
        "Mesmo com o desconforto, Keenan concluiu as apresentações restantes da turnê e precisou usar uma bengala para se locomover. Depois de retornar aos Estados Unidos e passar por avaliação médica, recebeu a indicação de que seria necessário substituir a articulação.",
        "O cantor optou por realizar o procedimento antes de setembro para ampliar o período de recuperação antes dos compromissos já marcados com Tool, A Perfect Circle e Puscifer no segundo semestre de 2026.",
        "Na mensagem aos fãs, Keenan destacou o esforço de quem já havia comprado ingressos e organizado viagens para os próximos shows. Até o momento de sua publicação, a intenção declarada era manter a agenda prevista e trabalhar na recuperação para voltar aos palcos."
    ],
}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip().casefold()


def public_text(item: dict) -> str:
    body = item.get("bodyPt") if isinstance(item.get("bodyPt"), list) else []
    return " ".join([str(item.get("titlePt") or ""), str(item.get("excerptPt") or ""), *[str(p) for p in body]])


def strip_quoted(text: str) -> str:
    return re.sub(r"[\"“‘'][^\"”’']{1,160}[\"”’']", " ", text)


def violations(item: dict) -> list[str]:
    if item.get("editorialStatus") != "ready":
        return []
    body = item.get("bodyPt")
    if not isinstance(body, list) or len(body) < 4:
        return ["invalid_body"]
    paragraphs = [str(p).strip() for p in body if str(p).strip()]
    if len(paragraphs) < 4:
        return ["invalid_body"]

    reasons: list[str] = []
    title = str(item.get("titlePt") or "")
    text = public_text(item)
    unquoted = strip_quoted(text)
    lowered = unquoted.casefold()

    for pattern in OFF_TOPIC_TITLE:
        if re.search(pattern, title, flags=re.I):
            reasons.append(f"off_topic:{pattern}")
            break
    for pattern in STRONG_ENGLISH:
        if re.search(pattern, lowered, flags=re.I):
            reasons.append(f"english_residual:{pattern}")
            break
    for pattern in UNNATURAL_PTBR:
        if re.search(pattern, lowered, flags=re.I):
            reasons.append(f"unnatural_ptbr:{pattern}")
            break
    for pattern in SOURCE_DISCLOSURE:
        if re.search(pattern, lowered, flags=re.I):
            reasons.append(f"source_disclosure:{pattern}")
            break

    own_source = normalize(item.get("source") or "")
    if own_source and own_source in normalize(text):
        reasons.append("source_disclosure:own_source_name")
    else:
        normalized_text = normalize(text)
        for marker in SOURCE_MARKERS:
            if normalize(marker) in normalized_text:
                reasons.append(f"source_disclosure:known_source:{marker}")
                break

    for pattern, label in TYPOGRAPHY_PTBR:
        if re.search(pattern, text):
            reasons.append(f"typography:{label}")
            break
    if any(token in text for token in MOJIBAKE):
        reasons.append("mojibake")

    seen: set[str] = set()
    for paragraph in paragraphs:
        key = normalize(paragraph)
        if key in seen:
            reasons.append("duplicate_paragraph")
            break
        seen.add(key)

    last = paragraphs[-1]
    if len(last) < 60 or last[-1:] not in ".!?…”’\"":
        reasons.append("possibly_truncated")
    return reasons


def reset_pending(item: dict, why: list[str]) -> dict:
    cleaned = dict(item)
    cleaned.update({
        "titlePt": "", "excerptPt": "", "bodyPt": [],
        "translationStatus": "pending", "editorialStatus": "pending",
        "editorialGeneratedAt": None, "editorialQualityReset": ",".join(why),
    })
    cleaned.pop("editorialProvider", None)
    cleaned.pop("editorialModel", None)
    return cleaned


def main() -> int:
    feed = json.loads(FEED.read_text("utf-8"))
    changed = False
    guarded = []
    for item in feed.get("items") or []:
        current = dict(item)
        item_id = str(current.get("id") or "")
        if item_id == SANTANA_ID and current.get("editorialStatus") == "ready":
            current.update(SANTANA_REPAIR)
            current["translationStatus"] = "pt-ready"
            current["editorialStatus"] = "ready"
            current["editorialProvider"] = "guiropa-ptbr-quality-repair"
            changed = True
        elif item_id == MAYNARD_ID and current.get("editorialStatus") == "ready":
            current.update(MAYNARD_REPAIR)
            current["translationStatus"] = "pt-ready"
            current["editorialStatus"] = "ready"
            current["editorialProvider"] = "guiropa-ptbr-quality-repair"
            changed = True

        why = violations(current)
        if why:
            print(f"RESET {current.get('id')} :: {';'.join(why)}")
            current = reset_pending(current, why)
            changed = True
        guarded.append(current)

    if not changed:
        print("GUIROPA pt-BR guard: no changes")
        return 0

    feed["items"] = guarded
    feed["translatedPt"] = sum(1 for item in guarded if str(item.get("titlePt") or "").strip())
    feed["translationPending"] = len(guarded) - feed["translatedPt"]
    feed["publishedPt"] = sum(1 for item in guarded if item.get("editorialStatus") == "ready" and isinstance(item.get("bodyPt"), list) and len(item.get("bodyPt") or []) >= 4)
    feed["editorialPending"] = len(guarded) - feed["publishedPt"]
    FEED.write_text(json.dumps(feed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"GUIROPA pt-BR guard: published={feed['publishedPt']} pending={feed['editorialPending']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
