import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";

function stamp(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
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

export default function HomeNewsTunnel() {
  const [data, setData] = useState({
    items: [],
    updatedAt: null,
    editorialUpdatedAt: null,
    publishedPt: 0,
  });

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
      .catch(() =>
        setData({
          items: [],
          updatedAt: null,
          editorialUpdatedAt: null,
          publishedPt: 0,
        })
      );
  }, []);

  const readyItems = useMemo(
    () => (data.items || []).filter(isReady),
    [data.items]
  );

  const items = useMemo(
    () => readyItems.slice(0, 10),
    [readyItems]
  );

  return (
    <section
      className="guiropa-home-news"
      aria-label="GUIROPA Radio News Tunnel em português"
    >
      <style>{`
        .guiropa-home-news{background:#15110e;color:#f6ead5;border-top:6px solid #b83224;border-bottom:1px solid #34291f;padding:0}.guiropa-home-news__ticker{overflow:hidden;border-bottom:1px solid rgba(255,255,255,.12);background:#b83224}.guiropa-home-news__track{display:flex;width:max-content;min-width:200%;white-space:nowrap;animation:ghnTicker 28s linear infinite}.guiropa-home-news__track span{display:block;min-width:50%;padding:9px 22px;font-size:9px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}.guiropa-home-news__shell{width:min(1240px,calc(100% - 34px));margin:0 auto;padding:clamp(2.8rem,6vw,5rem) 0}.guiropa-home-news__head{display:grid;grid-template-columns:1.4fr auto;gap:2rem;align-items:end;margin-bottom:2rem}.guiropa-home-news__eyebrow{font-size:.58rem;font-weight:1000;letter-spacing:.18em;color:#e6bd62;text-transform:uppercase}.guiropa-home-news h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(3.2rem,7vw,6.8rem);line-height:.83;letter-spacing:-.06em;margin:.7rem 0 0}.guiropa-home-news__meta{text-align:right;font-size:.55rem;line-height:1.7;letter-spacing:.12em;text-transform:uppercase;color:#aa9984}.guiropa-home-news__grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1px;background:#3d3025;border:1px solid #3d3025}.guiropa-home-news__card{background:#201913;padding:1.15rem;min-height:210px;display:flex;flex-direction:column;text-decoration:none;color:#f6ead5}.guiropa-home-news__card:hover{background:#2a211a}.guiropa-home-news__brand{font-size:.47rem;font-weight:1000;letter-spacing:.15em;color:#c69843;text-transform:uppercase}.guiropa-home-news__card h3{font-family:Georgia,"Times New Roman",serif;font-size:1.45rem;line-height:1.02;font-weight:400;letter-spacing:-.03em;margin:.9rem 0 1.2rem}.guiropa-home-news__foot{margin-top:auto;display:flex;justify-content:space-between;gap:.8rem;font-size:.45rem;letter-spacing:.09em;text-transform:uppercase;color:#8f7d6b}.guiropa-home-news__cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 16px;margin-top:1.5rem;border:1px solid #e6bd62;color:#f6ead5;text-decoration:none;font-size:.58rem;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}.guiropa-home-news__cta:hover{background:#e6bd62;color:#17120f}.guiropa-home-news__waiting{border:1px solid #3d3025;background:#201913;padding:1.25rem;color:#b8a58e;font-family:Georgia,"Times New Roman",serif;font-size:1.1rem;line-height:1.5}@keyframes ghnTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:1050px){.guiropa-home-news__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.guiropa-home-news__head{grid-template-columns:1fr}.guiropa-home-news__meta{text-align:left}.guiropa-home-news__grid{grid-template-columns:1fr}.guiropa-home-news__card{min-height:0}}@media(prefers-reduced-motion:reduce){.guiropa-home-news__track{animation:none}}
      `}</style>

      <div className="guiropa-home-news__ticker" aria-hidden="true">
        <div className="guiropa-home-news__track">
          <span>GUIROPA RADIO · NEWS TUNNEL™ · PORTUGUÊS · MATÉRIAS COMPLETAS · CONTÍNUO · GUIROPA RADIO ·</span>
          <span>GUIROPA RADIO · NEWS TUNNEL™ · PORTUGUÊS · MATÉRIAS COMPLETAS · CONTÍNUO · GUIROPA RADIO ·</span>
        </div>
      </div>

      <div className="guiropa-home-news__shell">
        <div className="guiropa-home-news__head">
          <div>
            <div className="guiropa-home-news__eyebrow">
              GUIROPA RADIO · PASSPORT RADIO NETWORK · AO VIVO
            </div>
            <h2>News Tunnel™</h2>
          </div>

          <div className="guiropa-home-news__meta">
            <div>{Number(data.publishedPt || readyItems.length)} matérias completas em português</div>
            <div>Atualizado {stamp(data.editorialUpdatedAt || data.updatedAt)}</div>
          </div>
        </div>

        {items.length ? (
          <div className="guiropa-home-news__grid">
            {items.map((item) => (
              <Link
                className="guiropa-home-news__card"
                to={`/world-wire/${item.id}`}
                key={item.id}
              >
                <div className="guiropa-home-news__brand">
                  GUIROPA RADIO · PASSPORT RADIO NETWORK
                </div>
                <h3>{item.titlePt}</h3>
                <div className="guiropa-home-news__foot">
                  <span>{item.region || "MUNDO"}</span>
                  <span>{stamp(item.publishedAt || item.discoveredAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="guiropa-home-news__waiting">
            As próximas matérias estão sendo apuradas e preparadas editorialmente em português. Elas só aparecem aqui quando a versão completa estiver pronta.
          </div>
        )}

        <Link className="guiropa-home-news__cta" to="/world-wire">
          ENTRAR NO NEWS TUNNEL →
        </Link>
      </div>
    </section>
  );
}
