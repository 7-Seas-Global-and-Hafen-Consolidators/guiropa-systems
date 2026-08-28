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
    item.bodyPt.length >= 4,
);

const items = ready.map((item) => ({
  id: item.id,
  region: item.region || "MUNDO",
  titlePt: item.titlePt,
  excerptPt: item.excerptPt,
  bodyPt: item.bodyPt,
  editorialStatus: "ready",
  publishedAt: item.publishedAt || null,
  discoveredAt: item.discoveredAt || null,
}));

const publicFeed = {
  updatedAt: raw.updatedAt || null,
  editorialUpdatedAt: raw.editorialUpdatedAt || null,
  bridge: "GUIROPA RADIO · WORLD WIRE",
  itemCount: items.length,
  publishedPt: items.length,
  editorialPending: 0,
  connectedPoints: Number(raw.connectedPoints || 0),
  items,
};

await writeFile(file, `${JSON.stringify(publicFeed, null, 2)}\n`, "utf8");
console.log(`GUIROPA public RSS sanitized: ${items.length} complete PT-BR stories; provenance stripped from deploy payload.`);
