import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";

function stamp(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function isReady(item) {
  return Boolean(
    item?.editorialStatus === "ready" &&
    item?.titlePt &&
    Array.isArray(item?.bodyPt) &&
    item.bodyPt.length >= 4
  );
}

export default function NewsTunnelStoryPage() {
  const { id } = useParams();
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    fetch(`${assetUrl("data/rss-world-feed.json")}?t=${Date.now()}`, {
      cache: "no-store",
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("feed unavailable"))
      )
      .then(setData)
      .catch(() => setData({ items: [] }));
  }, [id]);

  const item = useMemo(
    () => (data.items || []).find((entry) => entry.id === id),
    [data.items, id]
  );

  if (!isReady(item)) {
    return (
      <main className="guiropa-story-page guiropa-story-page--waiting">
        <style>{`
          .guiropa-story-page{min-height:100vh;background:#efe1c7;color:#18130f;padding:clamp(6rem,10vw,9rem) 0}.guiropa-story-shell{width:min(920px,calc(100% - 30px));margin:0 auto}.guiropa-story-kicker{font-size:.58rem;font-weight:1000;letter-spacing:.18em;color:#b83224;text-transform:uppercase}.guiropa-story-page h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,7vw,6.8rem);font-weight:400;line-height:.9;letter-spacing:-.055em;margin:1rem 0 1.5rem}.guiropa-story-lead{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2.4vw,2rem);line-height:1.5;color:#4f4033;margin:2.2rem 0}.guiropa-story-back{display:inline-flex;margin-top:2.5rem;min-height:44px;align-items:center;padding:0 14px;border:1px solid #18130f;background:#18130f;color:#f6ead5;text-decoration:none;font-size:.55rem;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
        `}</style>
        <div className="guiropa-story-shell">
          <div className="guiropa-story-kicker">
            GUIROPA RADIO · NEWS TUNNEL™ · PORTUGUÊS
          </div>
          <h1>Matéria em preparação.</h1>
          <p className="guiropa-story-lead">
            A GUIROPA só publica este sinal quando a versão editorial completa em português estiver pronta.
          </p>
          <Link className="guiropa-story-back" to="/world-wire">
            ← VOLTAR AO NEWS TUNNEL
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="guiropa-story-page">
      <style>{`
        .guiropa-story-page{min-height:100vh;background:#efe1c7;color:#18130f;padding:clamp(5rem,9vw,8rem) 0}.guiropa-story-shell{width:min(920px,calc(100% - 30px));margin:0 auto}.guiropa-story-kicker{font-size:.58rem;font-weight:1000;letter-spacing:.18em;color:#b83224;text-transform:uppercase}.guiropa-story-page h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,7vw,6.8rem);font-weight:400;line-height:.9;letter-spacing:-.055em;margin:1rem 0 1.5rem}.guiropa-story-meta{display:flex;gap:1rem;flex-wrap:wrap;padding:1rem 0;border-top:1px solid rgba(70,48,31,.2);border-bottom:1px solid rgba(70,48,31,.2);font-size:.55rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase;color:#806b56}.guiropa-story-lead{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2.4vw,2rem);line-height:1.5;color:#4f4033;margin:2.2rem 0 3rem}.guiropa-story-body{max-width:790px}.guiropa-story-body p{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.05rem,1.65vw,1.18rem);line-height:1.9;margin:0 0 1.6rem;color:#392f28}.guiropa-story-source{margin-top:3.8rem;padding:1.35rem 1.5rem;border-left:4px solid #b83224;background:#f7ecd8;color:#6e5b49;font-size:.82rem;line-height:1.65}.guiropa-story-source strong{display:block;color:#18130f;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.45rem}.guiropa-story-source a{color:#18130f;font-weight:900}.guiropa-story-back{display:inline-flex;margin-top:2.5rem;min-height:44px;align-items:center;padding:0 14px;border:1px solid #18130f;background:#18130f;color:#f6ead5;text-decoration:none;font-size:.55rem;font-weight:1000;letter-spacing:.1em;text-transform:uppercase}
      `}</style>

      <div className="guiropa-story-shell">
        <div className="guiropa-story-kicker">
          GUIROPA RADIO · PASSPORT RADIO NETWORK · NEWS TUNNEL™
        </div>

        <h1>{item.titlePt}</h1>

        <div className="guiropa-story-meta">
          <span>{item.region || "MUNDO"}</span>
          <span>{stamp(item.publishedAt || item.discoveredAt)}</span>
          <span>MATÉRIA EDITORIAL · PORTUGUÊS</span>
        </div>

        {item.excerptPt ? (
          <div className="guiropa-story-lead">{item.excerptPt}</div>
        ) : null}

        <article className="guiropa-story-body">
          {item.bodyPt.map((paragraph, index) => (
            <p key={`${item.id}-${index}`}>{paragraph}</p>
          ))}
        </article>

        <div className="guiropa-story-source">
          <strong>APURAÇÃO E ORIGEM</strong>
          Texto editorial original da GUIROPA RADIO, produzido a partir de apuração em fonte externa e reescrito integralmente em português.
          {item.source ? <> Fonte-base: {item.source}.</> : null}
          {item.url ? (
            <>
              {" "}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar fonte original ↗
              </a>
            </>
          ) : null}
        </div>

        <Link className="guiropa-story-back" to="/world-wire">
          ← VOLTAR AO NEWS TUNNEL
        </Link>
      </div>
    </main>
  );
}
