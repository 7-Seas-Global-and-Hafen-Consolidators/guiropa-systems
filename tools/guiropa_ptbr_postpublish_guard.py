#!/usr/bin/env python3
"""Fail-closed post-publish guard for GUIROPA News Tunnel pt-BR stories."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FEED = ROOT / "client/public/data/rss-world-feed.json"

STRONG_ENGLISH = (
    r"\bgrievances?\b",
    r"\baccording to\b",
    r"\bhowever\b",
    r"\breportedly\b",
    r"\balthough\b",
    r"\btherefore\b",
    r"\bmeanwhile\b",
    r"\bthe musician\b",
    r"\bthe guitarist\b",
    r"\bthe band\b",
    r"\bwas released\b",
    r"\bhas announced\b",
)
MOJIBAKE = ("�", "Ã©", "Ã£", "Ã§", "Ã³", "â€™", "â€œ", "â€")

# Known false accept observed on 2026-08-28. This repair is grounded only in
# the source facts already present in the RSS packet; it removes residual
# English and an inaccurate genre description without adding new claims.
SANTANA_ID = "f1c6bdcd8900a71d789a3f8e7b128023ce3b17cd341c07c26341ee559b31065b"
SANTANA_REPAIR = {
    "titlePt": "Carlos Santana relaciona ressentimentos ao câncer em fala controversa no Red Rocks",
    "excerptPt": "Durante um show no Red Rocks, Carlos Santana afirmou que guardar ressentimentos estaria ligado ao câncer. A declaração provocou críticas por atribuir a uma questão emocional uma relação causal que não é sustentada pela medicina.",
    "bodyPt": [
        "Carlos Santana fez uma declaração controversa durante sua apresentação no Red Rocks, em 24 de agosto. Ao falar com o público sobre perdão e ressentimentos, o guitarrista afirmou que carregar mágoas poderia causar câncer e aconselhou os fãs a deixarem essas emoções para trás.",
        "A fala provocou reação negativa de parte do público justamente porque apresentou como certeza uma relação entre ressentimento e câncer. Doenças oncológicas têm causas e fatores de risco complexos, e a declaração de Santana foi recebida como uma simplificação indevida de um tema médico sério.",
        "Santana também relatou ter ouvido que um especialista em câncer jamais teria encontrado um paciente sem ressentimentos. A anedota foi apresentada no palco como reforço de sua ideia, mas não constitui evidência científica para estabelecer uma relação causal entre emoções e desenvolvimento de câncer.",
        "Reconhecido mundialmente por sua trajetória no rock e pela fusão de rock, blues e ritmos latinos, Carlos Santana falou fora de seu campo artístico ao formular a afirmação. A repercussão se concentrou menos em sua defesa do perdão e mais na forma categórica como associou esse comportamento à prevenção de uma doença complexa."
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
    text = public_text(item)
    unquoted = strip_quoted(text)
    lowered = unquoted.casefold()
    for pattern in STRONG_ENGLISH:
        if re.search(pattern, lowered, flags=re.I):
            reasons.append(f"english_residual:{pattern}")
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
        "titlePt": "",
        "excerptPt": "",
        "bodyPt": [],
        "translationStatus": "pending",
        "editorialStatus": "pending",
        "editorialGeneratedAt": None,
        "editorialQualityReset": ",".join(why),
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
        if str(current.get("id") or "") == SANTANA_ID and current.get("editorialStatus") == "ready":
            current.update(SANTANA_REPAIR)
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
