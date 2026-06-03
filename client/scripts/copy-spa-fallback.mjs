import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const index = path.join(dist, "index.html");
const fallback = path.join(dist, "404.html");

if (!fs.existsSync(index)) {
  console.error("Build ausente:", index);
  process.exit(1);
}

fs.copyFileSync(index, fallback);
console.log("GitHub Pages: index.html copiado para 404.html (rotas SPA)");
