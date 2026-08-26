import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const AMAZON_MAIN = "https://www.amazon.com.br/b?node=104007590011&linkCode=ll2&tag=passportradio-20&linkId=edae5781198a3cecf47411d190e375a1&ref_=as_li_ss_tl";
const AMAZON_ALT = "https://amzn.to/4gi1vah";
const SHOPEE = "https://s.shopee.com.br/3qMaqyNivG";

const copy = {
  pt: {
    eyebrow: "GUIROPA RADIO · RSS WORLD BRIDGE · 24H",
    title: "World Wire",
    lead: "Uma redação musical ligada ao mundo. Publicações chegam automaticamente em seu idioma original, são preservadas como sinal editorial e levam você direto à fonte.",
    live: "PONTE AO VIVO",
    stories: "SINAIS",
    sources: "FONTES ATIVAS",
    updated: "ATUALIZADO",
    all: "TODAS",
    read: "LER NA FONTE",
    translate: "TRADUZIR",
    empty: "A ponte está aguardando os próximos sinais.",
    ad: "PUBLICIDADE",
    advertise: "ANUNCIE NA GUIROPA",
    advertiseLead: "Sua marca no meio da conversa musical.",
    original: "IDIOMA ORIGINAL PRESERVADO",
  },
  en: {
    eyebrow: "GUIROPA RADIO · RSS WORLD BRIDGE · 24H",
    title: "World Wire",
    lead: "A music newsroom connected to the world. Publications arrive automatically in their original language, are preserved as editorial signals and take you directly to the source.",
    live: "BRIDGE LIVE",
    stories: "SIGNALS",
    sources: "ACTIVE SOURCES",
    updated: "UPDATED",
    all: "ALL",
    read: "READ AT SOURCE",
    translate: "TRANSLATE",
    empty: "The bridge is waiting for the next signals.",
    ad: "ADVERTISING",
    advertise: "ADVERTISE ON GUIROPA",
    advertiseLead: "Put your brand inside the music conversation.",
    original: "ORIGINAL LANGUAGE PRESERVED",
  },
  es: {
    eyebrow: "GUIROPA RADIO · RSS WORLD BRIDGE · 24H",
    title: "World Wire",
    lead: "Una redacción musical conectada al mundo. Las publicaciones llegan automáticamente en su idioma original, se conservan como señales editoriales y te llevan directamente a la fuente.",
    live: "PUENTE EN VIVO",
    stories: "SEÑALES",
    sources: "FUENTES ACTIVAS",
    updated: "ACTUALIZADO",
    all: "TODAS",
    read: "LEER EN LA FUENTE",
    translate: "TRADUCIR",
    empty: "El puente espera las próximas señales.",
    ad: "PUBLICIDAD",
    advertise: "ANÚNCIATE EN GUIROPA",
    advertiseLead: "Tu marca dentro de la conversación musical.",
    original: "IDIOMA ORIGINAL PRESERVADO",
  },
};

function googleTranslateUrl(url) {
  return `https://translate.google.com/translate?sl=auto&tl=auto&u=${encodeURIComponent(url)}`;
}

function stamp(value, lang) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function CommercialCard({ variant, t }) {
  if (variant === 1) {
    return (
      <a className="guiropa-wire-ad guiropa-wire-ad--amazon" href={AMAZON_MAIN} target="_blank" rel="nofollow sponsored noopener noreferrer">
        <small>{t.ad} · AMAZON</small>
        <strong>Música. Vinil. Áudio. Cultura.</strong>
        <span>VER SELEÇÃO →</span>
      </a>
    );
  }
  if (variant === 2) {
    return (
      <a className="guiropa-wire-ad guiropa-wire-ad--shopee" href={SHOPEE} target="_blank" rel="nofollow sponsored noopener noreferrer">
        <small>{t.ad} · SHOPEE</small>
        <strong>Ofertas em movimento.</strong>
        <span>VER OFERTAS →</span>
      </a>
    );
  }
  if (variant === 3) {
    return (
      <a className="guiropa-wire-ad guiropa-wire-ad--amazon-dark" href={AMAZON_ALT} target="_blank" rel="nofollow sponsored noopener noreferrer">
        <small>{t.ad} · AMAZON</small>
        <strong>Outra parada. Outra descoberta.</strong>
        <span>ABRIR →</span>
      </a>
    );
  }
  return (
    <Link className="guiropa-wire-ad guiropa-wire-ad--guiropa" to="/anuncie">
      <small>{t.ad} · GUIROPA RADIO</small>
      <strong>{t.advertise}</strong>
      <p>{t.advertiseLead}</p>
      <span>ENTRAR →</span>
    </Link>
  );
}

export default function WorldWirePage() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.pt;
  const [data, setData] = useState({ items: [], sources: [], updatedAt: null, itemCount: 0 });
  const [region, setRegion] = useState("ALL");

  useEffect(() => {
    fetch(assetUrl("data/rss-world-feed.json"), { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("feed unavailable")))
      .then(setData)
      .catch(() => setData({ items: [], sources: [], updatedAt: null, itemCount: 0 }));
  }, []);

  const regions = useMemo(() => [...new Set((data.items || []).map((item) => item.region).filter(Boolean))], [data.items]);
  const items = useMemo(() => {
    const source = data.items || [];
    return region === "ALL" ? source : source.filter((item) => item.region === region);
  }, [data.items, region]);
  const activeSources = (data.sources || []).filter((source) => source.ok && Number(source.seen || 0) > 0).length;

  const entries = useMemo(() => {
    const output = [];
    items.forEach((item, index) => {
      output.push({ type: "story", key: item.id, item });
      if ((index + 1) % 6 === 0) output.push({ type: "ad", key: `ad-${index}`, variant: ((index / 6) % 4) + 1 });
    });
    return output;
  }, [items]);

  return (
    <main className="guiropa-world-wire">
      <style>{`
        .guiropa-world-wire{--wire-paper:#efe1c7;--wire-cream:#f7ecd8;--wire-ink:#1b1612;--wire-soft:#756451;--wire-red:#b83224;--wire-gold:#c69843;min-height:100vh;background:var(--wire-paper);color:var(--wire-ink);padding:clamp(4rem,7vw,7rem) 0 8rem}.guiropa-world-wire__shell{width:min(1240px,calc(100% - 36px));margin:0 auto}.guiropa-world-wire__hero{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(310px,.55fr);gap:3rem;align-items:end;padding-bottom:3rem;border-bottom:1px solid rgba(73,48,28,.25)}.guiropa-world-wire__eyebrow{display:flex;align-items:center;gap:10px;font-size:.64rem;font-weight:1000;letter-spacing:.2em;text-transform:uppercase;color:var(--wire-red)}.guiropa-world-wire__eyebrow::before{content:"";width:9px;height:9px;border-radius:50%;background:#d9291c;box-shadow:0 0 15px rgba(217,41,28,.7);animation:wireLive .9s steps(1,end) infinite}.guiropa-world-wire h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(4.6rem,11vw,9.6rem);font-weight:400;line-height:.78;letter-spacing:-.075em;margin:1.25rem 0 0}.guiropa-world-wire__lead{max-width:770px;font-size:clamp(1rem,1.7vw,1.2rem);line-height:1.75;color:var(--wire-soft);margin:2.3rem 0 0}.guiropa-world-wire__status{display:grid;border:1px solid rgba(73,48,28,.3);background:#1a1511;color:#f5e7cf}.guiropa-world-wire__stat{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:end;padding:1rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.12)}.guiropa-world-wire__stat:last-child{border-bottom:0}.guiropa-world-wire__stat small{font-size:.58rem;font-weight:900;letter-spacing:.16em;color:#d8b46f}.guiropa-world-wire__stat strong{font-family:Georgia,"Times New Roman",serif;font-size:1.55rem;font-weight:400}.guiropa-world-wire__filters{display:flex;gap:7px;overflow-x:auto;padding:1.1rem 0 1.2rem;scrollbar-width:thin;border-bottom:1px solid rgba(73,48,28,.22);position:sticky;top:0;z-index:20;background:rgba(239,225,199,.96);backdrop-filter:blur(12px)}.guiropa-world-wire__filters button{flex:0 0 auto;min-height:36px;padding:0 12px;border:1px solid rgba(73,48,28,.3);background:transparent;color:var(--wire-ink);font-size:.58rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}.guiropa-world-wire__filters button.is-active{background:var(--wire-ink);color:#f8ecd6}.guiropa-world-wire__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(73,48,28,.22);border:1px solid rgba(73,48,28,.22);margin-top:2rem}.guiropa-world-wire__item{background:var(--wire-cream);padding:clamp(1.35rem,2.5vw,2rem);display:flex;flex-direction:column;min-height:340px;transition:transform .18s ease,background .18s ease}.guiropa-world-wire__item:hover{background:#fff3df;transform:translateY(-2px);position:relative;z-index:2}.guiropa-world-wire__meta{display:grid;grid-template-columns:1fr auto;gap:1rem;font-size:.56rem;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;color:var(--wire-red)}.guiropa-world-wire__time{color:#8d7964;text-align:right}.guiropa-world-wire__item h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.55rem,2.7vw,2.55rem);font-weight:400;line-height:1.02;letter-spacing:-.04em;margin:1.15rem 0}.guiropa-world-wire__source{font-size:.57rem;font-weight:900;letter-spacing:.13em;text-transform:uppercase;color:#9a813f}.guiropa-world-wire__excerpt{color:var(--wire-soft);line-height:1.62;margin:1rem 0 2rem;font-size:.92rem;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}.guiropa-world-wire__actions{display:flex;gap:.65rem;flex-wrap:wrap;margin-top:auto}.guiropa-world-wire__actions a{display:inline-flex;align-items:center;min-height:40px;padding:0 12px;border:1px solid var(--wire-ink);color:var(--wire-ink);text-decoration:none;font-size:.56rem;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}.guiropa-world-wire__actions a:first-child{background:var(--wire-ink);color:#fff2dc}.guiropa-world-wire__language{margin-top:1rem;font-size:.5rem;font-weight:900;letter-spacing:.12em;color:#9c8a75;text-transform:uppercase}.guiropa-wire-ad{--ad-bg:#111;--ad-fg:#fff;--ad-accent:#e6bd62;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;min-height:340px;padding:clamp(1.4rem,2.5vw,2rem);background:var(--ad-bg);color:var(--ad-fg)!important;text-decoration:none!important}.guiropa-wire-ad--amazon{--ad-bg:#ff9900;--ad-fg:#17120e;--ad-accent:#17120e}.guiropa-wire-ad--shopee{--ad-bg:#ee4d2d;--ad-fg:#fff;--ad-accent:#fff}.guiropa-wire-ad--amazon-dark{--ad-bg:#17120e;--ad-fg:#f7e8c9;--ad-accent:#ff9900}.guiropa-wire-ad--guiropa{--ad-bg:#b83224;--ad-fg:#fff5e3;--ad-accent:#e9c26f}.guiropa-wire-ad::after{content:"";position:absolute;inset:0;border:5px solid transparent;pointer-events:none;animation:wireAdFlash 1.15s steps(1,end) infinite}.guiropa-wire-ad small{font-size:.58rem;font-weight:1000;letter-spacing:.16em}.guiropa-wire-ad small::before{content:"●";margin-right:8px;animation:wireAdDot .75s steps(1,end) infinite}.guiropa-wire-ad strong{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.2rem,4vw,4rem);font-weight:400;line-height:.9;letter-spacing:-.055em;margin:1rem 0}.guiropa-wire-ad p{max-width:340px;line-height:1.5;opacity:.8}.guiropa-wire-ad span{font-size:.62rem;font-weight:1000;letter-spacing:.12em;animation:wireAdCta .9s steps(1,end) infinite}.guiropa-world-wire__empty{padding:4rem 0;color:var(--wire-soft)}@keyframes wireLive{0%,50%,100%{opacity:1}51%,76%{opacity:.18}}@keyframes wireAdFlash{0%,45%,100%{border-color:transparent;box-shadow:inset 0 0 0 rgba(255,255,255,0)}46%,73%{border-color:var(--ad-accent);box-shadow:inset 0 0 30px rgba(255,255,255,.32)}}@keyframes wireAdDot{0%,45%,100%{opacity:1}46%,72%{opacity:.12}}@keyframes wireAdCta{0%,48%,100%{opacity:1}49%,74%{opacity:.25}}@media(max-width:980px){.guiropa-world-wire__hero{grid-template-columns:1fr}.guiropa-world-wire__status{grid-template-columns:repeat(3,1fr)}.guiropa-world-wire__stat{display:block}.guiropa-world-wire__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.guiropa-world-wire{padding-top:3rem}.guiropa-world-wire__shell{width:calc(100% - 20px)}.guiropa-world-wire__status{grid-template-columns:1fr}.guiropa-world-wire__grid{grid-template-columns:1fr}.guiropa-world-wire__item,.guiropa-wire-ad{min-height:0}.guiropa-world-wire__filters{top:0}}@media(prefers-reduced-motion:reduce){.guiropa-world-wire__eyebrow::before,.guiropa-wire-ad::after,.guiropa-wire-ad small::before,.guiropa-wire-ad span{animation:none!important}}
      `}</style>

      <div className="guiropa-world-wire__shell">
        <header className="guiropa-world-wire__hero">
          <div>
            <span className="guiropa-world-wire__eyebrow">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p className="guiropa-world-wire__lead">{t.lead}</p>
          </div>
          <div className="guiropa-world-wire__status" aria-label={t.live}>
            <div className="guiropa-world-wire__stat"><small>{t.live}</small><strong>ON</strong></div>
            <div className="guiropa-world-wire__stat"><small>{t.stories}</small><strong>{data.itemCount || (data.items || []).length}</strong></div>
            <div className="guiropa-world-wire__stat"><small>{t.sources}</small><strong>{activeSources}</strong></div>
            <div className="guiropa-world-wire__stat"><small>{t.updated}</small><strong>{stamp(data.updatedAt, lang)}</strong></div>
          </div>
        </header>

        <nav className="guiropa-world-wire__filters" aria-label="World Wire regions">
          <button className={region === "ALL" ? "is-active" : ""} onClick={() => setRegion("ALL")}>{t.all}</button>
          {regions.map((itemRegion) => (
            <button key={itemRegion} className={region === itemRegion ? "is-active" : ""} onClick={() => setRegion(itemRegion)}>{itemRegion}</button>
          ))}
        </nav>

        {!items.length ? <p className="guiropa-world-wire__empty">{t.empty}</p> : (
          <section className="guiropa-world-wire__grid" aria-label="GUIROPA World Wire">
            {entries.map((entry) => entry.type === "ad" ? (
              <CommercialCard key={entry.key} variant={entry.variant} t={t} />
            ) : (
              <article className="guiropa-world-wire__item" key={entry.key}>
                <div className="guiropa-world-wire__meta"><span>{entry.item.region}</span><span className="guiropa-world-wire__time">{stamp(entry.item.publishedAt, lang)}</span></div>
                <h2>{entry.item.title}</h2>
                <span className="guiropa-world-wire__source">{entry.item.source}</span>
                {entry.item.excerpt ? <p className="guiropa-world-wire__excerpt">{entry.item.excerpt}</p> : null}
                <div className="guiropa-world-wire__actions">
                  <a href={entry.item.url} target="_blank" rel="noopener noreferrer">{t.read}</a>
                  <a href={googleTranslateUrl(entry.item.url)} target="_blank" rel="noopener noreferrer">🌐 {t.translate}</a>
                </div>
                <span className="guiropa-world-wire__language">{t.original}</span>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
