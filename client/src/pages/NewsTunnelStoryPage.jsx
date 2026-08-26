import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { translateNewsItem } from "../utils/autoTranslate.js";

function stamp(value, lang) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const locale = lang === "es" ? "es-ES" : lang === "en" ? "en-GB" : "pt-BR";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function NewsTunnelStoryPage() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [data, setData] = useState({ items: [] });
  const [translated, setTranslated] = useState(null);

  useEffect(() => {
    fetch(`${assetUrl("data/rss-world-feed.json")}?t=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("feed unavailable")))
      .then(setData)
      .catch(() => setData({ items: [] }));
  }, [id]);

  const item = useMemo(() => (data.items || []).find((entry) => entry.id === id), [data.items, id]);

  useEffect(() => {
    let alive = true;
    setTranslated(null);
    if (item && lang !== "pt") translateNewsItem({ ...item, title: item.titlePt || item.title, excerpt: item.excerptPt || item.excerpt }, lang).then((value) => { if (alive) setTranslated(value); });
    return () => { alive = false; };
  }, [item, lang]);

  const labels = lang === "en"
    ? { unavailable: "Signal unavailable.", back: "BACK TO NEWS TUNNEL", note: "GUIROPA RADIO · WORLD WIRE · CONTINUOUS" }
    : lang === "es"
      ? { unavailable: "Señal no disponible.", back: "VOLVER AL NEWS TUNNEL", note: "GUIROPA RADIO · WORLD WIRE · CONTINUOUS" }
      : { unavailable: "Sinal indisponível.", back: "VOLTAR AO NEWS TUNNEL", note: "GUIROPA RADIO · WORLD WIRE · CONTÍNUO" };

  if (!item) {
    return (
      <main style={{ minHeight: "70vh", background: "#efe1c7", color: "#18130f", padding: "8rem 1.2rem" }}>
        <div style={{ width: "min(900px,100%)", margin: "0 auto" }}>
          <div style={{ fontSize: ".6rem", fontWeight: 900, letterSpacing: ".16em", color: "#b83224" }}>GUIROPA RADIO · PASSPORT RADIO NETWORK</div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 400, lineHeight: .9 }}>{labels.unavailable}</h1>
          <Link to="/world-wire" style={{ color: "#18130f", fontWeight: 900, textDecoration: "none" }}>← {labels.back}</Link>
        </div>
      </main>
    );
  }

  const text = lang === "pt"
    ? { title: item.titlePt || "Matéria sendo preparada em português.", excerpt: item.excerptPt || "" }
    : (translated || { title: item.titlePt || item.title, excerpt: item.excerptPt || item.excerpt });

  return (
    <main className="guiropa-story-page">
      <style>{`
        .guiropa-story-page{min-height:100vh;background:#efe1c7;color:#18130f;padding:clamp(5rem,9vw,8rem) 0}.guiropa-story-shell{width:min(920px,calc(100% - 30px));margin:0 auto}.guiropa-story-kicker{font-size:.58rem;font-weight:1000;letter-spacing:.18em;color:#b83224;text-transform:uppercase}.guiropa-story-page h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,7vw,6.8rem);font-weight:400;line-height:.9;letter-spacing:-.055em;margin:1rem 0 1.5rem}.guiropa-story-meta{display:flex;gap:1rem;flex-wrap:wrap;padding:1rem 0;border-top:1px solid rgba(70,48,31,.2);border-bottom:1px solid rgba(70,48,31,.2);font-size:.55rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase;color:#806b56}.guiropa-story-lead{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2.4vw,2rem);line-height:1.5;color:#4f4033;margin:2.2rem 0}.guiropa-story-note{margin-top:2rem;padding:1.2rem;border-left:4px solid #b83224;background:#f7ecd8;color:#6e5b49;font-size:.82rem;line-height:1.6}.guiropa-story-back{display:inline-flex;margin-top:2.5rem;min-height:44px;align-items:center;padding:0 14px;border:1px solid #18130f;background:#18130f;color:#f6ead5;text-decoration:none;font-size:.55rem;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      `}</style>
      <div className="guiropa-story-shell">
        <div className="guiropa-story-kicker">GUIROPA RADIO · PASSPORT RADIO NETWORK · NEWS TUNNEL™</div>
        <h1>{text.title}</h1>
        <div className="guiropa-story-meta"><span>{item.region || "WORLD"}</span><span>{stamp(item.publishedAt || item.discoveredAt, lang)}</span><span>WORLD WIRE · CONTINUOUS</span></div>
        {text.excerpt ? <div className="guiropa-story-lead">{text.excerpt}</div> : null}
        <div className="guiropa-story-note">{labels.note}</div>
        <Link className="guiropa-story-back" to="/world-wire">← {labels.back}</Link>
      </div>
    </main>
  );
}
