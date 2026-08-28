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
  }
}

const raw = JSON.parse(await fs.readFile(FEED_FILE, "utf8"));
const sanitizedItems = [...new Map(
  (raw.items || [])
    .filter(ready)
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

console.log(`[GUIROPA RSS VAULT] published=${sanitizedItems.length} · raw provenance discarded · ledger=published-only`);
