import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const AMAZON_MAIN = "https://www.amazon.com.br/b?node=104007590011&linkCode=ll2&tag=passportradio-20&linkId=edae5781198a3cecf47411d190e375a1&ref_=as_li_ss_tl";
const AMAZON_ALT = "https://amzn.to/4gi1vah";
const SHOPEE = "https://s.shopee.com.br/3qMaqyNivG";

const copy = {
  pt: {
    eyebrow: "GUIROPA RADIO · WORLD WIRE · CONTINUOUS",
    title: "News Tunnel™",
    lead: "Um fluxo contínuo de música, memória, artistas, arquivos, lançamentos, reedições e cultura chegando do mundo inteiro para a GUIROPA RADIO.",
    live: "TÚNEL AO VIVO",
    stories: "MATÉRIAS NO FLUXO",
    sources: "PONTOS CONECTADOS",
    updated: "ÚLTIMA VARREDURA",
    all: "TUDO",
    open: "ABRIR MATÉRIA",
    translate: "TRADUZIR",
    empty: "O túnel está aguardando a próxima varredura.",
    ad: "PUBLICIDADE",
    advertise: "ANUNCIE NA GUIROPA",
    advertiseLead: "Sua marca dentro do fluxo mundial da GUIROPA RADIO.",
    preserved: "IDIOMA ORIGINAL · GUIROPA RADIO WORLD WIRE",
    origin: "ORIGEM EDITORIAL",
  },
  en: {
    eyebrow: "GUIROPA RADIO · WORLD WIRE · CONTINUOUS",
    title: "News Tunnel™",
    lead: "A continuous stream of music, memory, artists, archives, releases, reissues and culture arriving from around the world into GUIROPA RADIO.",
    live: "TUNNEL LIVE",
    stories: "STORIES IN FLOW",
    sources: "CONNECTED POINTS",
    updated: "LAST SWEEP",
    all: "ALL",
    open: "OPEN STORY",
    translate: "TRANSLATE",
    empty: "The tunnel is waiting for the next sweep.",
    ad: "ADVERTISING",
    advertise: "ADVERTISE ON GUIROPA",
    advertiseLead: "Put your brand inside GUIROPA RADIO's global flow.",
    preserved: "ORIGINAL LANGUAGE · GUIROPA RADIO WORLD WIRE",
    origin: "EDITORIAL ORIGIN",
  },
  es: {
    eyebrow: "GUIROPA RADIO · WORLD WIRE · CONTINUOUS",
    title: "News Tunnel™",
    lead: "Un flujo continuo de música, memoria, artistas, archivos, lanzamientos, reediciones y cultura llegando desde todo el mundo a GUIROPA RADIO.",
    live: "TÚNEL EN VIVO",
    stories: "NOTICIAS EN FLUJO",
    sources: "PUNTOS CONECTADOS",
    updated: "ÚLTIMO BARRIDO",
    all: "TODO",
    open: "ABRIR NOTICIA",
    translate: "TRADUCIR",
    empty: "El túnel espera el próximo barrido.",
    ad: "PUBLICIDAD",
    advertise: "ANÚNCIATE EN GUIROPA",
    advertiseLead: "Tu marca dentro del flujo mundial de GUIROPA RADIO.",
    preserved: "IDIOMA ORIGINAL · GUIROPA RADIO WORLD WIRE",
    origin: "ORIGEN EDITORIAL",
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
  if (variant === 1) return <a className="guiropa-wire-ad guiropa-wire-ad--amazon" href={AMAZON_MAIN} target="_blank" rel="nofollow sponsored noopener noreferrer"><small>{t.ad} · GUIROPA RADIO + AMAZON</small><strong>Música. Vinil. Áudio. Cultura.</strong><span>VER SELEÇÃO →</span></a>;
  if (variant === 2) return <a className="guiropa-wire-ad guiropa-wire-ad--shopee" href={SHOPEE} target="_blank" rel="nofollow sponsored noopener noreferrer"><small>{t.ad} · GUIROPA RADIO + SHOPEE</small><strong>Ofertas em movimento.</strong><span>VER OFERTAS →</span></a>;
  if (variant === 3) return <a className="guiropa-wire-ad guiropa-wire-ad--amazon-dark" href={AMAZON_ALT} target="_blank" rel="nofollow sponsored noopener noreferrer"><small>{t.ad} · GUIROPA RADIO + AMAZON</small><strong>Outra parada. Outra descoberta.</strong><span>ABRIR →</span></a>;
  return <Link className="guiropa-wire-ad guiropa-wire-ad--guiropa" to="/anuncie"><small>{t.ad} · GUIROPA RADIO</small><strong>{t.advertise}</strong><p>{t.advertiseLead}</p><span>ENTRAR →</span></Link>;
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
  const tickerItems = (data.items || []).slice(0, 18);

  const entries = useMemo(() => {
    const output = [];
    items.forEach((item, index) => {
      output.push({ type: "story", key: item.id, item });
      if ((index + 1) % 5 === 0) output.push({ type: "ad", key: `ad-${index}`, variant: ((index / 5) % 4) + 1 });
    });
    return output;
  }, [items]);

  return (
    <main className="guiropa-world-wire">
      <style>{`
        .guiropa-world-wire{--paper:#efe1c7;--cream:#f7ecd8;--ink:#17120f;--soft:#756451;--red:#b83224;--gold:#c69843;min-height:100vh;background:var(--paper);color:var(--ink);padding:0 0 8rem}.guiropa-wire-ticker{overflow:hidden;background:#17120f;color:#f7e8ca;border-top:4px solid #b83224;border-bottom:1px solid #5f482f}.guiropa-wire-ticker__track{display:flex;width:max-content;min-width:200%;animation:wireTicker 38s linear infinite;white-space:nowrap}.guiropa-wire-ticker__track span{display:block;padding:10px 26px;font-size:.62rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.guiropa-wire-ticker b{color:#e7b95f;margin-right:10px}.guiropa-world-wire__shell{width:min(1280px,calc(100% - 34px));margin:0 auto}.guiropa-world-wire__hero{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,.55fr);gap:3rem;align-items:end;padding:clamp(5rem,9vw,8rem) 0 3rem;border-bottom:1px solid rgba(73,48,28,.25)}.guiropa-world-wire__eyebrow{display:flex;align-items:center;gap:10px;font-size:.64rem;font-weight:1000;letter-spacing:.2em;text-transform:uppercase;color:var(--red)}.guiropa-world-wire__eyebrow::before{content:"";width:9px;height:9px;border-radius:50%;background:#d9291c;box-shadow:0 0 15px rgba(217,41,28,.7);animation:wireLive .9s steps(1,end) infinite}.guiropa-world-wire h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(4.3rem,10vw,9rem);font-weight:400;line-height:.8;letter-spacing:-.075em;margin:1.1rem 0 0}.guiropa-world-wire__lead{max-width:780px;font-size:clamp(1rem,1.7vw,1.22rem);line-height:1.75;color:var(--soft);margin:2rem 0 0}.guiropa-world-wire__status{display:grid;border:1px solid rgba(73,48,28,.3);background:#17120f;color:#f5e7cf}.guiropa-world-wire__stat{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:end;padding:1rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.12)}.guiropa-world-wire__stat:last-child{border-bottom:0}.guiropa-world-wire__stat small{font-size:.56rem;font-weight:900;letter-spacing:.16em;color:#d8b46f}.guiropa-world-wire__stat strong{font-family:Georgia,"Times New Roman",serif;font-size:1.45rem;font-weight:400}.guiropa-world-wire__filters{display:flex;gap:7px;overflow-x:auto;padding:1rem 0 1.1rem;position:sticky;top:0;z-index:30;background:rgba(239,225,199,.97);backdrop-filter:blur(12px);border-bottom:1px solid rgba(73,48,28,.22)}.guiropa-world-wire__filters button{flex:0 0 auto;min-height:35px;padding:0 12px;border:1px solid rgba(73,48,28,.3);background:transparent;color:var(--ink);font-size:.56rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}.guiropa-world-wire__filters button.is-active{background:var(--ink);color:#f8ecd6}.guiropa-world-wire__grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(73,48,28,.2);border:1px solid rgba(73,48,28,.2);margin-top:1.6rem}.guiropa-world-wire__item{background:var(--cream);padding:1.35rem;display:flex;flex-direction:column;min-height:320px;position:relative}.guiropa-world-wire__brand{font-size:.52rem;font-weight:1000;letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin-bottom:1rem}.guiropa-world-wire__meta{display:flex;justify-content:space-between;gap:1rem;font-size:.5rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#8c765f}.guiropa-world-wire__item h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.4rem,2.2vw,2.25rem);font-weight:400;line-height:1.02;letter-spacing:-.04em;margin:1rem 0}.guiropa-world-wire__excerpt{color:var(--soft);line-height:1.58;margin:0 0 1.6rem;font-size:.86rem;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}.guiropa-world-wire__actions{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:auto}.guiropa-world-wire__actions a{display:inline-flex;align-items:center;min-height:38px;padding:0 10px;border:1px solid var(--ink);color:var(--ink);text-decoration:none;font-size:.52rem;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}.guiropa-world-wire__actions a:first-child{background:var(--ink);color:#fff2dc}.guiropa-world-wire__origin{margin-top:1rem;padding-top:.8rem;border-top:1px solid rgba(73,48,28,.16);font-size:.47rem;line-height:1.4;color:#9b8874}.guiropa-world-wire__origin b{color:#6e5a47;letter-spacing:.08em;text-transform:uppercase}.guiropa-world-wire__language{display:block;margin-top:.45rem;font-size:.44rem;font-weight:900;letter-spacing:.1em;color:#a38d74;text-transform:uppercase}.guiropa-wire-ad{--ad-bg:#111;--ad-fg:#fff;--ad-accent:#e6bd62;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;min-height:320px;padding:1.35rem;background:var(--ad-bg);color:var(--ad-fg)!important;text-decoration:none!important}.guiropa-wire-ad--amazon{--ad-bg:#ff9900;--ad-fg:#17120e;--ad-accent:#17120e}.guiropa-wire-ad--shopee{--ad-bg:#ee4d2d;--ad-fg:#fff;--ad-accent:#fff}.guiropa-wire-ad--amazon-dark{--ad-bg:#17120e;--ad-fg:#f7e8c9;--ad-accent:#ff9900}.guiropa-wire-ad--guiropa{--ad-bg:#b83224;--ad-fg:#fff5e3;--ad-accent:#e9c26f}.guiropa-wire-ad::after{content:"";position:absolute;inset:0;border:4px solid transparent;pointer-events:none;animation:wireAdFlash 1.15s steps(1,end) infinite}.guiropa-wire-ad small{font-size:.54rem;font-weight:1000;letter-spacing:.14em}.guiropa-wire-ad strong{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,3.4vw,3.4rem);font-weight:400;line-height:.9;letter-spacing:-.055em;margin:1rem 0}.guiropa-wire-ad p{line-height:1.5;opacity:.82}.guiropa-wire-ad span{font-size:.58rem;font-weight:1000;letter-spacing:.12em}.guiropa-world-wire__empty{padding:4rem 0;color:var(--soft)}@keyframes wireTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes wireLive{0%,50%,100%{opacity:1}51%,76%{opacity:.18}}@keyframes wireAdFlash{0%,45%,100%{border-color:transparent}46%,73%{border-color:var(--ad-accent)}}@media(max-width:1100px){.guiropa-world-wire__grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:900px){.guiropa-world-wire__hero{grid-template-columns:1fr}.guiropa-world-wire__status{grid-template-columns:repeat(4,1fr)}.guiropa-world-wire__stat{display:block}.guiropa-world-wire__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.guiropa-world-wire__shell{width:calc(100% - 20px)}.guiropa-world-wire__status{grid-template-columns:1fr}.guiropa-world-wire__grid{grid-template-columns:1fr}.guiropa-world-wire__item,.guiropa-wire-ad{min-height:0}.guiropa-wire-ticker__track{animation-duration:28s}}@media(prefers-reduced-motion:reduce){.guiropa-wire-ticker__track,.guiropa-world-wire__eyebrow::before,.guiropa-wire-ad::after{animation:none!important}}
      `}</style>

      {tickerItems.length ? <div className="guiropa-wire-ticker" aria-label="GUIROPA RADIO live headlines"><div className="guiropa-wire-ticker__track">{[...tickerItems, ...tickerItems].map((item, i) => <span key={`${item.id}-${i}`}><b>GUIROPA RADIO</b>{item.title}</span>)}</div></div> : null}

      <div className="guiropa-world-wire__shell">
        <header className="guiropa-world-wire__hero">
          <div><span className="guiropa-world-wire__eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p className="guiropa-world-wire__lead">{t.lead}</p></div>
          <div className="guiropa-world-wire__status" aria-label={t.live}>
            <div className="guiropa-world-wire__stat"><small>{t.live}</small><strong>ON</strong></div>
            <div className="guiropa-world-wire__stat"><small>{t.stories}</small><strong>{data.itemCount || (data.items || []).length}</strong></div>
            <div className="guiropa-world-wire__stat"><small>{t.sources}</small><strong>{activeSources}</strong></div>
            <div className="guiropa-world-wire__stat"><small>{t.updated}</small><strong>{stamp(data.updatedAt, lang)}</strong></div>
          </div>
        </header>

        <nav className="guiropa-world-wire__filters" aria-label="GUIROPA RADIO World Wire regions"><button className={region === "ALL" ? "is-active" : ""} onClick={() => setRegion("ALL")}>{t.all}</button>{regions.map((itemRegion) => <button key={itemRegion} className={region === itemRegion ? "is-active" : ""} onClick={() => setRegion(itemRegion)}>{itemRegion}</button>)}</nav>

        {!items.length ? <p className="guiropa-world-wire__empty">{t.empty}</p> : <section className="guiropa-world-wire__grid" aria-label="GUIROPA RADIO News Tunnel">{entries.map((entry) => entry.type === "ad" ? <CommercialCard key={entry.key} variant={entry.variant} t={t} /> : <article className="guiropa-world-wire__item" key={entry.key}><div className="guiropa-world-wire__brand">GUIROPA RADIO · WORLD WIRE</div><div className="guiropa-world-wire__meta"><span>{entry.item.region}</span><span>{stamp(entry.item.publishedAt, lang)}</span></div><h2>{entry.item.title}</h2>{entry.item.excerpt ? <p className="guiropa-world-wire__excerpt">{entry.item.excerpt}</p> : null}<div className="guiropa-world-wire__actions"><a href={entry.item.url} target="_blank" rel="noopener noreferrer">{t.open}</a><a href={googleTranslateUrl(entry.item.url)} target="_blank" rel="noopener noreferrer">🌐 {t.translate}</a></div><div className="guiropa-world-wire__origin"><b>{t.origin}:</b> {entry.item.source}</div><span className="guiropa-world-wire__language">{t.preserved}</span></article>)}</section>}
      </div>
    </main>
  );
}
