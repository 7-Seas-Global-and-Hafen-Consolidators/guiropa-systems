import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { artistsForDecade } from "../data/artistEditorialCatalog.js";
import { assetUrl } from "../utils/assetUrl.js";

const DECADE_RULES = {
  "1950s": /\b(195\d|anos? 50|década de 1950|1950s)\b/i,
  "1960s": /\b(196\d|anos? 60|década de 1960|1960s)\b/i,
  "1970s": /\b(197\d|anos? 70|década de 1970|1970s)\b/i,
  "1980s": /\b(198\d|anos? 80|década de 1980|1980s)\b/i,
  "1990": /\b(1990|ano de 1990|ano 1990)\b/i,
};

function isReady(item) {
  return Boolean(
    item?.editorialStatus === "ready" &&
      item?.titlePt &&
      item?.excerptPt &&
      Array.isArray(item?.bodyPt) &&
      item.bodyPt.length >= 4,
  );
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function artistRule(decade) {
  const names = artistsForDecade(decade)
    .map((artist) => artist.name?.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (!names.length) return null;
  return new RegExp(`(^|[^a-zà-ÿ0-9])(${names.join("|")})(?=$|[^a-zà-ÿ0-9])`, "i");
}

function belongsToDecade(item, decade, artists) {
  const text = `${item.region || ""} ${item.titlePt || ""} ${item.excerptPt || ""} ${(item.bodyPt || []).join(" ")}`;
  return Boolean(DECADE_RULES[decade]?.test(text) || artists?.test(text));
}

function stamp(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function DecadeNewsFeed({ decade }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(`${assetUrl("data/rss-world-feed.json")}?t=${Date.now()}`, { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : { items: [] }))
        .catch(() => ({ items: [] })),
      fetch(`${assetUrl("data/guiropa-editorial-features.json")}?t=${Date.now()}`, { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : { items: [] }))
        .catch(() => ({ items: [] })),
    ]).then(([rss, editorial]) => {
      if (!alive) return;
      const merged = [...(editorial.items || []), ...(rss.items || [])];
      const deduped = [...new Map(merged.map((item) => [item.id, item])).values()];
      setItems(deduped);
    });
    return () => {
      alive = false;
    };
  }, [decade]);

  const selected = useMemo(() => {
    const artists = artistRule(decade);
    return items
      .filter(isReady)
      .filter((item) => belongsToDecade(item, decade, artists))
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b.discoveredAt || 0).getTime() -
          new Date(a.publishedAt || a.discoveredAt || 0).getTime(),
      )
      .slice(0, 6);
  }, [items, decade]);

  if (!selected.length) return null;

  return (
    <section className="decade-news" aria-label={`Sinais editoriais ${decade}`}>
      <style>{`
        .decade-news{margin-top:clamp(3rem,6vw,5rem);padding-top:2rem;border-top:1px solid rgba(54,38,25,.2)}.decade-news__eyebrow{display:block;color:#b83224;font-size:.58rem;font-weight:900;letter-spacing:.17em}.decade-news h2{margin:.7rem 0 .8rem;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.4rem,5vw,4.7rem);font-weight:400;line-height:.95;letter-spacing:-.045em}.decade-news__lead{max-width:720px;margin:0 0 1.6rem;color:#725f4d;line-height:1.65}.decade-news__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(54,38,25,.2);border:1px solid rgba(54,38,25,.2)}.decade-news__card{min-height:245px;display:flex;flex-direction:column;padding:1.35rem;background:#f8efdf;color:#201914;text-decoration:none}.decade-news__card:hover,.decade-news__card:focus-visible{background:#201914;color:#f8efdf;outline:2px solid #b83224;outline-offset:-2px}.decade-news__brand{color:#b83224;font-size:.48rem;font-weight:900;letter-spacing:.12em}.decade-news__card h3{margin:.9rem 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2.4vw,2rem);font-weight:400;line-height:1.06}.decade-news__card p{margin:0;color:#806d59;font-size:.78rem;line-height:1.55;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;overflow:hidden}.decade-news__card:hover p,.decade-news__card:focus-visible p{color:#cbbba7}.decade-news__foot{display:flex;justify-content:space-between;gap:.8rem;margin-top:auto;padding-top:1.2rem;font-size:.48rem;font-weight:900;letter-spacing:.08em;color:#927553}.decade-news__card:hover .decade-news__foot,.decade-news__card:focus-visible .decade-news__foot{color:#d6c4ae}@media(max-width:850px){.decade-news__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.decade-news__grid{grid-template-columns:1fr}.decade-news__card{min-height:0}}
      `}</style>
      <span className="decade-news__eyebrow">GUIROPA RADIO · SINAIS DA DÉCADA · EM PORTUGUÊS</span>
      <h2>O arquivo continua acontecendo.</h2>
      <p className="decade-news__lead">
        Matérias completas relacionadas a artistas, histórias e acontecimentos ligados a {decade}. Nenhuma chamada incompleta entra neste bloco.
      </p>
      <div className="decade-news__grid">
        {selected.map((item) => (
          <Link className="decade-news__card" to={`/world-wire/${item.id}`} key={item.id}>
            <span className="decade-news__brand">GUIROPA RADIO · EDITORIAL</span>
            <h3>{item.titlePt}</h3>
            <p>{item.excerptPt}</p>
            <span className="decade-news__foot">
              <span>{item.region || decade}</span>
              <span>{stamp(item.publishedAt || item.discoveredAt)}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
