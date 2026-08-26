import { useEffect, useMemo, useState } from "react";
import { assetUrl } from "../utils/assetUrl.js";

const copy = {
  pt: { eyebrow: "GUIROPA RADIO · RSS WORLD BRIDGE", title: "World Wire", lead: "Música chegando do mundo em seu idioma original. A GUIROPA preserva a publicação e leva você diretamente à fonte.", read: "LER NA FONTE", translate: "TRADUZIR", empty: "A ponte está aguardando os primeiros sinais." },
  en: { eyebrow: "GUIROPA RADIO · RSS WORLD BRIDGE", title: "World Wire", lead: "Music arriving from around the world in its original language. GUIROPA preserves the publication and takes you directly to its source.", read: "READ AT SOURCE", translate: "TRANSLATE", empty: "The bridge is waiting for its first signals." },
  es: { eyebrow: "GUIROPA RADIO · RSS WORLD BRIDGE", title: "World Wire", lead: "Música que llega desde todo el mundo en su idioma original. GUIROPA preserva la publicación y te lleva directamente a la fuente.", read: "LEER EN LA FUENTE", translate: "TRADUCIR", empty: "El puente espera sus primeras señales." },
};

function googleTranslateUrl(url) {
  return `https://translate.google.com/translate?sl=auto&tl=auto&u=${encodeURIComponent(url)}`;
}

export default function WorldWirePage() {
  const lang = document.documentElement.lang?.slice(0, 2) || "pt";
  const t = copy[lang] || copy.pt;
  const [data, setData] = useState({ items: [], updatedAt: null });

  useEffect(() => {
    fetch(assetUrl("data/rss-world-feed.json"), { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("feed unavailable")))
      .then(setData)
      .catch(() => setData({ items: [], updatedAt: null }));
  }, []);

  const items = useMemo(() => data.items || [], [data]);

  return (
    <main className="guiropa-world-wire">
      <style>{`
        .guiropa-world-wire{min-height:100vh;background:#efe3cb;color:#201914;padding:clamp(6rem,10vw,9rem) 0}.guiropa-world-wire__shell{width:min(1180px,calc(100% - 40px));margin:0 auto}.guiropa-world-wire__eyebrow{font-size:.62rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:#a82f22}.guiropa-world-wire h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(4rem,10vw,8.5rem);font-weight:400;line-height:.86;letter-spacing:-.065em;margin:1rem 0 0}.guiropa-world-wire__lead{max-width:720px;font-size:1.05rem;line-height:1.8;color:#6d5c4b;margin:2rem 0 4rem}.guiropa-world-wire__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:rgba(70,48,31,.18);border:1px solid rgba(70,48,31,.18)}.guiropa-world-wire__item{background:#f5ead6;padding:clamp(1.5rem,4vw,2.5rem);display:flex;flex-direction:column;min-height:330px}.guiropa-world-wire__meta{display:flex;justify-content:space-between;gap:1rem;font-size:.58rem;font-weight:900;letter-spacing:.13em;text-transform:uppercase;color:#9e3024}.guiropa-world-wire__item h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.65rem,3vw,2.6rem);font-weight:400;line-height:1.05;letter-spacing:-.035em;margin:1.2rem 0}.guiropa-world-wire__excerpt{color:#6d5c4b;line-height:1.65;margin:0 0 2rem}.guiropa-world-wire__actions{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:auto}.guiropa-world-wire__actions a{display:inline-flex;align-items:center;min-height:42px;padding:0 14px;border:1px solid #201914;color:#201914;text-decoration:none;font-size:.58rem;font-weight:900;letter-spacing:.1em}.guiropa-world-wire__actions a:first-child{background:#201914;color:#fff5e4}.guiropa-world-wire__empty{padding:4rem 0;color:#6d5c4b}@media(max-width:760px){.guiropa-world-wire__grid{grid-template-columns:1fr}.guiropa-world-wire__item{min-height:0}}
      `}</style>
      <div className="guiropa-world-wire__shell">
        <span className="guiropa-world-wire__eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p className="guiropa-world-wire__lead">{t.lead}</p>
        {!items.length ? <p className="guiropa-world-wire__empty">{t.empty}</p> : (
          <section className="guiropa-world-wire__grid" aria-label="GUIROPA World Wire">
            {items.map((item) => (
              <article className="guiropa-world-wire__item" key={item.id}>
                <div className="guiropa-world-wire__meta"><span>{item.region}</span><span>{item.source}</span></div>
                <h2>{item.title}</h2>
                {item.excerpt ? <p className="guiropa-world-wire__excerpt">{item.excerpt}</p> : null}
                <div className="guiropa-world-wire__actions">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{t.read}</a>
                  <a href={googleTranslateUrl(item.url)} target="_blank" rel="noopener noreferrer">🌐 {t.translate}</a>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
