import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const DATA_DIR = path.join(PUBLIC, "data");
const FEED_FILE = path.join(DATA_DIR, "rss-world-feed.json");
const LEDGER_FILE = path.join(DATA_DIR, "rss-world-ledger.json");

const MAX_PUBLIC_ITEMS = 5000;
const MAX_LEDGER_ITEMS = 25000;
const REQUEST_TIMEOUT_MS = 15000;
const TRANSLATION_TIMEOUT_MS = 12000;
const TRANSLATION_BACKFILL_PER_RUN = 80;
const TRANSLATION_CONCURRENCY = 4;

const SOURCES = [
  { id: "npr-music", name: "NPR Music", region: "USA", url: "https://feeds.npr.org/1039/rss.xml" },
  { id: "guardian-music", name: "The Guardian · Music", region: "Europe / UK", url: "https://www.theguardian.com/music/rss" },
  { id: "music-news", name: "Music-News.com", region: "Europe / UK", url: "https://www.music-news.com/rss/UK/news" },
  { id: "ultimate-classic-rock", name: "Ultimate Classic Rock", region: "USA", url: "https://ultimateclassicrock.com/feed/" },
  { id: "loudwire", name: "Loudwire", region: "USA", url: "https://loudwire.com/feed/" },
  { id: "nme", name: "NME", region: "Europe / UK", url: "https://www.nme.com/feed" },
  { id: "pitchfork", name: "Pitchfork", region: "USA", url: "https://pitchfork.com/rss/news/" },
  { id: "allmusic", name: "AllMusic", region: "USA", url: "https://www.allmusic.com/rss" },
  { id: "consequence", name: "Consequence", region: "USA", url: "https://consequenceofsound.net/feed/" },
  { id: "xs-noize", name: "XS Noize", region: "Europe / UK", url: "https://www.xsnoize.com/feed/" },
  { id: "nialler9", name: "Nialler9", region: "Europe / Ireland", url: "https://feeds.feedburner.com/nialler9/rss" },
  { id: "aipate", name: "Aipate", region: "Africa / Kenya", url: "https://aipate.com/feed/" },
  { id: "the-music-au", name: "The Music", region: "Asia-Pacific / Australia", url: "https://themusic.com.au/feed" },
  { id: "unite-asia", name: "Unite Asia", region: "Asia-Pacific", url: "https://uniteasia.org/feed" },
  { id: "jrock-news", name: "JROCK NEWS", region: "Asia-Pacific / Japan", url: "https://jrocknews.com/feed" },
  { id: "score-magazine", name: "The Score Magazine", region: "Asia-Pacific / India", url: "https://highonscore.com/feed/" },
  { id: "jpost-music", name: "The Jerusalem Post · Music", region: "Middle East / Israel", url: "https://www.jpost.com/rss/rssfeedsmusic.aspx" },
  { id: "lapresse-music", name: "La Presse · Musique", region: "Canada / Québec", url: "https://www.lapresse.ca/arts/musique/rss" },
  { id: "lefigaro-music", name: "Le Figaro · Musique", region: "Europe / France", url: "https://www.lefigaro.fr/rss/figaro_musique.xml" },
  { id: "lacroix-music", name: "La Croix · Musique", region: "Europe / France", url: "https://www.la-croix.com/feeds/rss/Culture/Musique.xml" },
  { id: "aficia", name: "Aficia", region: "Europe / France", url: "https://www.aficia.info/feed" },
  { id: "amarok", name: "Amarok Magazine", region: "Europe / France", url: "https://www.amarok-mag.com/cat/amarok-magazine-musique/feed/" },
  { id: "rtbf-music", name: "RTBF · Musique", region: "Europe / Belgium", url: "https://rss.rtbf.be/article/rss/highlight_rtbf_musique.xml?source=internal" },
  { id: "rts-music", name: "RTS · Musiques", region: "Europe / Switzerland", url: "https://www.rts.ch/info/culture/musiques/?format=rss/news" },
  { id: "dosol", name: "DoSol", region: "Latin America / Brazil", url: "https://dosol.com.br/feed/" },
  { id: "rockonboard", name: "Rock On Board", region: "Latin America / Brazil", url: "https://www.rockonboard.com.br/feed/" },
  { id: "hits-perdidos", name: "Hits Perdidos", region: "Latin America / Brazil", url: "https://hitsperdidos.com/feed/" },
  { id: "blognroll", name: "Blog n' Roll", region: "Latin America / Brazil", url: "https://blognroll.com.br/category/musica/feed/" },
  { id: "anr-factory", name: "A&R Factory", region: "Global / UK", url: "https://www.anrfactory.com/feed/?format=xml" },
  { id: "nagamag", name: "Nagamag", region: "Global", url: "https://www.nagamag.com/feed/" },
  { id: "where-music-meets", name: "Where the Music Meets", region: "Global", url: "https://www.wherethemusicmeets.com/feed/" },
];

function decodeEntities(value = "") {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}
function stripHtml(value = "") { return decodeEntities(value).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function tag(block, name) { const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i")); return match ? decodeEntities(match[1]).trim() : ""; }
function atomLink(block) { const alternate = block.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/i); if (alternate) return decodeEntities(alternate[1]); const any = block.match(/<link[^>]+href=["']([^"']+)["']/i); return any ? decodeEntities(any[1]) : ""; }

function parseFeed(xml, source) {
  const rssItems = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map((m) => m[1]);
  const atomItems = [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)].map((m) => m[1]);
  const blocks = rssItems.length ? rssItems : atomItems;
  return blocks.map((block) => {
    const title = stripHtml(tag(block, "title"));
    const link = stripHtml(tag(block, "link")) || atomLink(block);
    const guid = stripHtml(tag(block, "guid")) || stripHtml(tag(block, "id")) || link;
    const description = stripHtml(tag(block, "description") || tag(block, "summary") || tag(block, "content"));
    const rawDate = stripHtml(tag(block, "pubDate") || tag(block, "published") || tag(block, "updated"));
    const date = rawDate && !Number.isNaN(Date.parse(rawDate)) ? new Date(rawDate).toISOString() : null;
    if (!title || !link) return null;
    const key = crypto.createHash("sha256").update(`${source.id}\n${guid || link}`).digest("hex");
    return { id: key, sourceId: source.id, source: source.name, region: source.region, title, excerpt: description.slice(0, 700), url: link, publishedAt: date, discoveredAt: new Date().toISOString(), originalLanguage: "auto" };
  }).filter(Boolean);
}

function publicItem(item) {
  return {
    id: item.id,
    sourceId: item.sourceId || "",
    source: item.source || "",
    region: item.region || "WORLD",
    url: item.url || "",
    title: item.title,
    excerpt: item.excerpt || "",
    titlePt: item.titlePt || "",
    excerptPt: item.excerptPt || "",
    bodyPt: Array.isArray(item.bodyPt) ? item.bodyPt : [],
    editorialStatus: item.editorialStatus === "ready" && Array.isArray(item.bodyPt) && item.bodyPt.length >= 4 ? "ready" : "pending",
    editorialGeneratedAt: item.editorialGeneratedAt || null,
    translationStatus: item.titlePt ? "pt-ready" : "pending",
    publishedAt: item.publishedAt || null,
    discoveredAt: item.discoveredAt || null,
    originalLanguage: item.originalLanguage || "auto",
  };
}

async function readJson(file, fallback) { try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return fallback; } }

async function fetchSource(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(source.url, { headers: { "user-agent": "GUIROPA-Radio-RSS-World-Bridge/4.1 (+https://guiropa.world/)" }, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseFeed(await response.text(), source);
  } finally { clearTimeout(timer); }
}

async function translateTextToPt(text) {
  const value = String(text || "").trim();
  if (!value) return "";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TRANSLATION_TIMEOUT_MS);
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(value)}`;
    const response = await fetch(url, { headers: { "user-agent": "GUIROPA-Radio-Translation-Bridge/1.0" }, signal: controller.signal });
    if (!response.ok) throw new Error(`translation HTTP ${response.status}`);
    const payload = await response.json();
    return (payload?.[0] || []).map((part) => part?.[0] || "").join("").trim() || value;
  } finally {
    clearTimeout(timer);
  }
}

async function translateItemToPt(item) {
  if (item.titlePt) return item;
  try {
    const [titlePt, excerptPt] = await Promise.all([
      translateTextToPt(item.title),
      translateTextToPt(item.excerpt || ""),
    ]);
    return { ...item, titlePt: titlePt || item.title, excerptPt: excerptPt || item.excerpt || "" };
  } catch (error) {
    console.log(`[GUIROPA TRANSLATION] ${item.id} failed: ${String(error?.message || error)}`);
    return item;
  }
}

async function translateBackfill(items) {
  const targets = items.filter((item) => !item.titlePt).slice(0, TRANSLATION_BACKFILL_PER_RUN);
  if (!targets.length) return items;
  const translatedById = new Map();
  let cursor = 0;
  async function worker() {
    while (cursor < targets.length) {
      const index = cursor++;
      const translated = await translateItemToPt(targets[index]);
      translatedById.set(translated.id, translated);
    }
  }
  await Promise.all(Array.from({ length: Math.min(TRANSLATION_CONCURRENCY, targets.length) }, () => worker()));
  return items.map((item) => translatedById.get(item.id) || item);
}

await fs.mkdir(DATA_DIR, { recursive: true });
const feed = await readJson(FEED_FILE, { updatedAt: null, items: [] });
const ledger = await readJson(LEDGER_FILE, { ids: [] });
const known = new Set(ledger.ids || []);
const incoming = [];
const sourceStatus = [];

for (const source of SOURCES) {
  try {
    const items = await fetchSource(source);
    let added = 0;
    for (const item of items) {
      if (known.has(item.id)) continue;
      known.add(item.id);
      incoming.push(item);
      added += 1;
    }
    sourceStatus.push({ region: source.region, ok: true, seen: items.length, added });
  } catch (error) {
    sourceStatus.push({ region: source.region, ok: false, error: String(error?.message || error) });
  }
}

const combinedRaw = [...incoming, ...(feed.items || [])]
  .sort((a, b) => Date.parse(b.publishedAt || b.discoveredAt || 0) - Date.parse(a.publishedAt || a.discoveredAt || 0))
  .slice(0, MAX_PUBLIC_ITEMS);

const translatedRaw = await translateBackfill(combinedRaw);
const combined = translatedRaw.map(publicItem);
const translatedCount = combined.filter((item) => item.translationStatus === "pt-ready").length;
const publishedPt = combined.filter((item) => item.editorialStatus === "ready").length;

const output = {
  updatedAt: new Date().toISOString(),
  bridge: "GUIROPA RADIO · PASSPORT RADIO NETWORK · RSS WORLD BRIDGE",
  aiCalls: Number(feed.aiCalls || 0),
  itemCount: combined.length,
  publishedPt,
  editorialPending: combined.length - publishedPt,
  newItems: incoming.length,
  translatedPt: translatedCount,
  translationPending: combined.length - translatedCount,
  connectedPoints: sourceStatus.filter((source) => source.ok && Number(source.seen || 0) > 0).length,
  sources: sourceStatus,
  items: combined,
};

await fs.writeFile(FEED_FILE, `${JSON.stringify(output, null, 2)}\n`);
await fs.writeFile(LEDGER_FILE, `${JSON.stringify({ updatedAt: output.updatedAt, ids: [...known].slice(-MAX_LEDGER_ITEMS) }, null, 2)}\n`);
console.log(`[GUIROPA RSS WORLD BRIDGE] ${incoming.length} new items · ${combined.length} public items · ${translatedCount} PT-ready · ${SOURCES.length} configured sources`);
for (const status of sourceStatus) console.log(JSON.stringify(status));
