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

// Curated first bridge. Feeds can be expanded without changing the engine.
// RSS is treated as a discovery signal: GUIROPA stores metadata/excerpts and
// always links readers back to the publisher; it never mirrors full articles.
const SOURCES = [
  { id: "npr-music", name: "NPR Music", region: "USA", url: "https://feeds.npr.org/1039/rss.xml" },
  { id: "guardian-music", name: "The Guardian · Music", region: "Europe / UK", url: "https://www.theguardian.com/music/rss" },
  { id: "music-news", name: "Music-News.com", region: "Europe / UK", url: "https://www.music-news.com/rss/UK/news" },
  { id: "ultimate-classic-rock", name: "Ultimate Classic Rock", region: "USA", url: "https://ultimateclassicrock.com/feed/" },
  { id: "loudwire", name: "Loudwire", region: "USA", url: "https://loudwire.com/feed/" },
  { id: "the-music-au", name: "The Music", region: "Asia-Pacific / Australia", url: "https://themusic.com.au/feed" },
  { id: "unite-asia", name: "Unite Asia", region: "Asia-Pacific", url: "https://uniteasia.org/feed/" },
  { id: "jrock-news", name: "JROCK NEWS", region: "Asia-Pacific / Japan", url: "https://jrocknews.com/feed" },
  { id: "score-magazine", name: "The Score Magazine", region: "Asia-Pacific / India", url: "https://highonscore.com/feed/" },
  { id: "jpost-music", name: "The Jerusalem Post · Music", region: "Middle East / Israel", url: "https://www.jpost.com/rss/rssfeedsmusic.aspx" },
];

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

function atomLink(block) {
  const alternate = block.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/i);
  if (alternate) return decodeEntities(alternate[1]);
  const any = block.match(/<link[^>]+href=["']([^"']+)["']/i);
  return any ? decodeEntities(any[1]) : "";
}

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
    return {
      id: key,
      sourceId: source.id,
      source: source.name,
      region: source.region,
      title,
      excerpt: description.slice(0, 700),
      url: link,
      publishedAt: date,
      discoveredAt: new Date().toISOString(),
      originalLanguage: "auto",
    };
  }).filter(Boolean);
}

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return fallback; }
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(source.url, {
      headers: { "user-agent": "GUIROPA-Radio-RSS-World-Bridge/1.0 (+https://guiropa.world/)" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseFeed(await response.text(), source);
  } finally {
    clearTimeout(timer);
  }
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
    sourceStatus.push({ id: source.id, name: source.name, region: source.region, ok: true, seen: items.length, added });
  } catch (error) {
    sourceStatus.push({ id: source.id, name: source.name, region: source.region, ok: false, error: String(error?.message || error) });
  }
}

const combined = [...incoming, ...(feed.items || [])]
  .sort((a, b) => Date.parse(b.publishedAt || b.discoveredAt || 0) - Date.parse(a.publishedAt || a.discoveredAt || 0))
  .slice(0, MAX_PUBLIC_ITEMS);

const output = {
  updatedAt: new Date().toISOString(),
  bridge: "GUIROPA RSS WORLD BRIDGE",
  aiCalls: 0,
  itemCount: combined.length,
  newItems: incoming.length,
  sources: sourceStatus,
  items: combined,
};

await fs.writeFile(FEED_FILE, `${JSON.stringify(output, null, 2)}\n`);
await fs.writeFile(LEDGER_FILE, `${JSON.stringify({ updatedAt: output.updatedAt, ids: [...known].slice(-MAX_LEDGER_ITEMS) }, null, 2)}\n`);

console.log(`[GUIROPA RSS WORLD BRIDGE] ${incoming.length} new items · ${combined.length} public items · 0 AI calls`);
for (const status of sourceStatus) console.log(JSON.stringify(status));
