import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cleanText, isValidEmail } from "./lib/sanitize.js";
import { contactRateLimit, securityHeaders } from "./middleware/security.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const dist = path.join(__dirname, "../../client/dist");
const isProd =
  process.env.NODE_ENV === "production" || fs.existsSync(path.join(dist, "index.html"));

const app = express();
app.disable("x-powered-by");

app.use(securityHeaders(isProd));
app.use(
  cors({
    origin: isProd ? false : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "guiropa-api" });
});

app.post("/api/contact", contactRateLimit, (req, res) => {
  const name = cleanText(req.body?.name, 120);
  const email = cleanText(req.body?.email, 160);
  const message = cleanText(req.body?.message, 2000);

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "name, email and message are required",
      errorPt: "Nome, e-mail e mensagem são obrigatórios.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "invalid email", errorPt: "E-mail inválido." });
  }

  console.log("[contact]", { name, email, message: message.slice(0, 500) });
  res.json({ ok: true });
});

if (isProd) {
  app.use(
    express.static(dist, {
      index: false,
      maxAge: "7d",
      setHeaders(res, filePath) {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    })
  );
  app.get("*", (_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`GUIROPA API → http://localhost:${PORT}`);
});
