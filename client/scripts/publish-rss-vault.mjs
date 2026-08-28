import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "client", "public", "data");
const FEED_FILE = process.env.GUIROPA_RSS_FEED_FILE
  ? path.resolve(process.env.GUIROPA_RSS_FEED_FILE)
  : path.join(PUBLIC_DIR, "rss-world-feed.json");
const LEDGER_FILE = path.join(PUBLIC_DIR, "rss-world-ledger.json");
const MAX_PUBLIC_ITEMS = 5000;

const FORBIDDEN_KEYS = new Set([
  "source",
  "sourceId",
  "url",
  "title",
  "excerpt",
  "originalLanguage",
  "editorialProvider",
  "editorialModel",
  "editorialGeneratedAt",
  "editorialQualityReset",
]);

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

function ready(item) {
  return Boolean(
    item &&
      item.editorialStatus === "ready" &&
      String(item.titlePt || "").trim() &&
      String(item.excerptPt || "").trim() &&
      Array.isArray(item.bodyPt) &&
      item.bodyPt.filter((p) => String(p || "").trim()).length >= 4,
  );
}

function publicText(item) {
  return [item.titlePt, item.excerptPt, ...(item.bodyPt || [])].map((v) => String(v || "")).join(" ");
}

function editoriallySafe(item) {
  if (!ready(item)) return false;
  const text = publicText(item);
  if (CONTENT_LEAK_PATTERNS.some((pattern) => pattern.test(text))) return false;
  if (BAD_PT_PATTERNS.some((pattern) => pattern.test(text))) return false;
  const ownSource = String(item.source || "").trim();
  if (ownSource && text.toLocaleLowerCase("pt-BR").includes(ownSource.toLocaleLowerCase("pt-BR"))) return false;
  if (SOURCE_MARKERS.some((marker) => text.toLocaleLowerCase("pt-BR").includes(marker.toLocaleLowerCase("pt-BR")))) return false;
  return true;
}

function safeItem(item) {
  const clean = {
    id: String(item.id || "").trim(),
    region: String(item.region || "MUNDO").trim() || "MUNDO",
    titlePt: String(item.titlePt || "").trim(),
    excerptPt: String(item.excerptPt || "").trim(),
    bodyPt: (item.bodyPt || []).map((p) => String(p || "").trim()).filter(Boolean),
    editorialStatus: "ready",
    translationStatus: "pt-ready",
    publishedAt: item.publishedAt || null,
    discoveredAt: item.discoveredAt || null,
  };
  if (!clean.id) throw new Error("RSS vault blocked an item without id");
  return clean;
}

function timeOf(item) {
  const value = Date.parse(item.publishedAt || item.discoveredAt || 0);
  return Number.isFinite(value) ? value : 0;
}

function assertSanitized(feed) {
  for (const item of feed.items || []) {
    for (const key of Object.keys(item)) {
      if (FORBIDDEN_KEYS.has(key)) throw new Error(`RSS vault leak blocked: ${key}`);
    }
    if (!ready(item)) throw new Error(`RSS vault blocked incomplete PT-BR item: ${item.id || "unknown"}`);
    if (!editoriallySafe(item)) throw new Error(`RSS vault blocked source/quality leak after seal: ${item.id || "unknown"}`);
  }
}

const raw = JSON.parse(await fs.readFile(FEED_FILE, "utf8"));
const candidates = raw.items || [];
const blocked = candidates.filter((item) => ready(item) && !editoriallySafe(item));
const sanitizedItems = [...new Map(
  candidates
    .filter(editoriallySafe)
    .map(safeItem)
    .map((item) => [item.id, item]),
).values()]
  .sort((a, b) => timeOf(b) - timeOf(a))
  .slice(0, MAX_PUBLIC_ITEMS);

const now = new Date().toISOString();
const published = {
  updatedAt: now,
  brand: "GUIROPA RADIO",
  itemCount: sanitizedItems.length,
  publishedPt: sanitizedItems.length,
  editorialPending: 0,
  items: sanitizedItems,
};

assertSanitized(published);
await fs.mkdir(PUBLIC_DIR, { recursive: true });
await fs.writeFile(path.join(PUBLIC_DIR, "rss-world-feed.json"), `${JSON.stringify(published, null, 2)}\n`, "utf8");
await fs.writeFile(LEDGER_FILE, `${JSON.stringify({ updatedAt: now, ids: sanitizedItems.map((item) => item.id) }, null, 2)}\n`, "utf8");

console.log(`[GUIROPA RSS VAULT] published=${sanitizedItems.length} · blocked=${blocked.length} source/quality leaks · raw provenance discarded · ledger=published-only`);
