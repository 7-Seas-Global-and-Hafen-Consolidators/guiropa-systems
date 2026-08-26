const TARGETS = { pt: "pt", en: "en", es: "es" };
const CACHE_PREFIX = "guiropa-news-translation-v1:";
const MAX_CACHE_AGE = 1000 * 60 * 60 * 24 * 30;
const queue = [];
let active = 0;
const MAX_CONCURRENT = 4;

function cacheKey(id, lang) {
  return `${CACHE_PREFIX}${lang}:${id}`;
}

function readCache(id, lang) {
  try {
    const raw = localStorage.getItem(cacheKey(id, lang));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > MAX_CACHE_AGE) return null;
    return parsed.value || null;
  } catch {
    return null;
  }
}

function writeCache(id, lang, value) {
  try {
    localStorage.setItem(cacheKey(id, lang), JSON.stringify({ savedAt: Date.now(), value }));
  } catch {}
}

function runQueue() {
  while (active < MAX_CONCURRENT && queue.length) {
    const task = queue.shift();
    active += 1;
    task().finally(() => {
      active -= 1;
      runQueue();
    });
  }
}

function enqueue(task) {
  return new Promise((resolve, reject) => {
    queue.push(() => task().then(resolve, reject));
    runQueue();
  });
}

async function translateText(text, target) {
  const value = String(text || "").trim();
  if (!value) return "";
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(value)}`;
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) throw new Error(`translation HTTP ${response.status}`);
  const payload = await response.json();
  return (payload?.[0] || []).map((part) => part?.[0] || "").join("").trim() || value;
}

export async function translateNewsItem(item, lang = "pt") {
  if (!item?.id) return { title: item?.title || "", excerpt: item?.excerpt || "" };
  const target = TARGETS[lang] || "pt";
  const cached = readCache(item.id, target);
  if (cached) return cached;

  const separator = "\n<<<GUIROPA_SPLIT>>>\n";
  const joined = `${item.title || ""}${separator}${item.excerpt || ""}`;

  try {
    const translated = await enqueue(() => translateText(joined, target));
    const parts = translated.split(/<<<\s*GUIROPA_SPLIT\s*>>>/i);
    const value = {
      title: (parts[0] || item.title || "").trim(),
      excerpt: (parts.slice(1).join(" ") || item.excerpt || "").trim(),
    };
    writeCache(item.id, target, value);
    return value;
  } catch {
    return { title: item.title || "", excerpt: item.excerpt || "" };
  }
}

export async function translateNewsItems(items, lang = "pt") {
  const results = await Promise.all((items || []).map(async (item) => [item.id, await translateNewsItem(item, lang)]));
  return Object.fromEntries(results);
}
