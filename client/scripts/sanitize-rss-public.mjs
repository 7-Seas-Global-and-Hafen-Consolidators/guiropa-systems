import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const file = resolve(process.cwd(), "dist/data/rss-world-feed.json");
const raw = JSON.parse(await readFile(file, "utf8"));

const ready = (raw.items || []).filter(
  (item) =>
    item?.editorialStatus === "ready" &&
    typeof item?.titlePt === "string" &&
    item.titlePt.trim() &&
    typeof item?.excerptPt === "string" &&
    item.excerptPt.trim() &&
    Array.isArray(item?.bodyPt) &&
    item.bodyPt.filter((p) => String(p || "").trim()).length >= 4,
);

const items = ready.map((item) => ({
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
console.log(`GUIROPA public RSS sanitized: ${items.length} complete PT-BR stories; provenance stripped from deploy payload.`);
