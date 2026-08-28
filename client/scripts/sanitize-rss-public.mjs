import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const file = resolve(process.cwd(), "dist/data/rss-world-feed.json");
const raw = JSON.parse(await readFile(file, "utf8"));

const SOURCE_MARKERS = [
  "NPR Music", "The Guardian", "Music-News.com", "Ultimate Classic Rock", "Loudwire", "NME",
  "Pitchfork", "AllMusic", "Consequence", "XS Noize", "Nialler9", "Aipate", "The Music",
  "Unite Asia", "JROCK NEWS", "The Score Magazine", "The Jerusalem Post", "La Presse",
  "Le Figaro", "La Croix", "Aficia", "Amarok Magazine", "RTBF", "RTS", "DoSol",
  "Rock On Board", "Hits Perdidos", "Blog n' Roll", "A&R Factory", "Nagamag",
  "Where the Music Meets",
];
const CONTENT_LEAK_PATTERNS = [
  /\breportagem\s+(?:foi\s+)?publicada\s+(?:pelo|pela|por)\b/i,
  /\bpublicado\s+(?:pelo|pela|por)\b/i,
  /\bidentificad[ao]\s+.*?\ba\s+partir\s+de\b/i,
  /\bregistro\s+de\s+origem\b/i,
  /\ba\s+pauta\s+permanece\s+conectada\s+à\s+fonte\b/i,
  /\blink\s+original\b/i,
  /\bfonte\s+(?:original|consultada|externa)\b/i,
  /\bsegundo\s+a\s+fonte\b/i,
  /\bde\s+acordo\s+com\s+a\s+fonte\b/i,
];
const BAD_PT_PATTERNS = [
  /\bfalaçoado\b/i,
  /\bfalação\s+de\b/i,
  /\baqui\s+estamos\s+tudo\b/i,
  /\bdrogaditas?\b/i,
  /\bex-bancos\s+roubados\b/i,
  /\buma\s+humanizada\s+vers[aã]o\b/i,
  /\bensina\s+filhos\b/i,
  /[�]|Ã©|Ã£|Ã§|Ã³|â€™|â€œ|â€/,
];

function complete(item) {
  return Boolean(
    item?.editorialStatus === "ready" &&
      typeof item?.titlePt === "string" &&
      item.titlePt.trim() &&
      typeof item?.excerptPt === "string" &&
      item.excerptPt.trim() &&
      Array.isArray(item?.bodyPt) &&
      item.bodyPt.filter((p) => String(p || "").trim()).length >= 4,
  );
}

function publicText(item) {
  return [item.titlePt, item.excerptPt, ...(item.bodyPt || [])].map((v) => String(v || "")).join(" ");
}

function safeContent(item) {
  if (!complete(item)) return false;
  const text = publicText(item);
  const lower = text.toLocaleLowerCase("pt-BR");
  if (CONTENT_LEAK_PATTERNS.some((pattern) => pattern.test(text))) return false;
  if (BAD_PT_PATTERNS.some((pattern) => pattern.test(text))) return false;
  if (SOURCE_MARKERS.some((marker) => lower.includes(marker.toLocaleLowerCase("pt-BR")))) return false;
  return true;
}

const accepted = (raw.items || []).filter(safeContent);
const blocked = (raw.items || []).filter((item) => complete(item) && !safeContent(item));

const items = accepted.map((item) => ({
  id: String(item.id || "").trim(),
  region: String(item.region || "MUNDO").trim() || "MUNDO",
  titlePt: item.titlePt.trim(),
  excerptPt: item.excerptPt.trim(),
  bodyPt: item.bodyPt.map((p) => String(p || "").trim()).filter(Boolean),
  editorialStatus: "ready",
  translationStatus: "pt-ready",
  publishedAt: item.publishedAt || null,
  discoveredAt: item.discoveredAt || null,
}));

const publicFeed = {
  updatedAt: raw.updatedAt || null,
  brand: "GUIROPA RADIO",
  itemCount: items.length,
  publishedPt: items.length,
  editorialPending: 0,
  items,
};

await writeFile(file, `${JSON.stringify(publicFeed, null, 2)}\n`, "utf8");
console.log(`GUIROPA public RSS sanitized: ${items.length} complete PT-BR stories; ${blocked.length} source/quality leaks blocked.`);
