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
      item.bodyPt.length >= 4,
  );
}

export default function ScheduleNewsFeed() {
  const [feed, setFeed] = useState({
    items: [],
    updatedAt: null,
    editorialUpdatedAt: null,
    publishedPt: 0,
  });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${assetUrl("data/rss-world-feed.json")}?t=${Date.now()}`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`RSS HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!alive) return;
        setFeed(data);
        setFailed(false);
      })
      .catch(() => {
        if (!alive) return;
        setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const items = useMemo(
    () => (feed.items || []).filter(isReady).slice(0, 5),
    [feed.items],
  );

  return (
    <section className="schedule-wire" aria-label="GUIROPA World Wire RSS">
      <div className="schedule-shell">
        <header className="schedule-wire__head">
          <div>
            <span className="schedule-wire__eye">WORLD WIRE · RSS AO VIVO</span>
            <h2>O mundo da música chega aqui.</h2>
            <p>
              O RSS da GUIROPA agora desembarca diretamente na Programação: notícias
              coletadas no mundo, publicadas em português e ligadas à matéria completa.
            </p>
          </div>
          <div className="schedule-wire__meta">
            <span>{Number(feed.publishedPt || items.length)} matérias publicadas</span>
            <span>Atualizado {stamp(feed.editorialUpdatedAt || feed.updatedAt)}</span>
          </div>
        </header>

        {items.length > 0 ? (
          <div className="schedule-wire__grid">
            {items.map((item) => (
              <Link
                className="schedule-wire__story"
                to={`/world-wire/${item.id}`}
                key={item.id}
              >
                <span className="schedule-wire__source">
                  {item.source || "GUIROPA WORLD WIRE"}
                </span>
                <strong>{item.titlePt}</strong>
                <span className="schedule-wire__foot">
                  <span>{item.region || "MUNDO"}</span>
                  <span>{stamp(item.publishedAt || item.discoveredAt)}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="schedule-wire__empty" role="status">
            {failed
              ? "O sinal RSS não respondeu nesta tentativa. A Programação continua disponível e o feed será tentado novamente no próximo acesso."
              : "Carregando as matérias publicadas pelo World Wire…"}
          </div>
        )}

        <Link className="schedule-wire__all" to="/world-wire">
          VER TODAS AS MATÉRIAS →
        </Link>
      </div>
      <style>{`
        .schedule-wire{padding:clamp(3.5rem,6vw,5.5rem) 0;background:#17120e;color:#f6ead5;border-top:1px solid #35291e;border-bottom:1px solid #35291e}.schedule-wire__head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2rem;align-items:end;margin-bottom:1.7rem}.schedule-wire__eye{display:block;color:#d9b467;font-size:.59rem;font-weight:900;letter-spacing:.18em}.schedule-wire__head h2{margin:.65rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.7rem,5vw,4.8rem);font-weight:400;line-height:.94;letter-spacing:-.05em}.schedule-wire__head p{max-width:720px;margin:1rem 0 0;color:#b5a18b;line-height:1.65}.schedule-wire__meta{display:flex;flex-direction:column;gap:.25rem;text-align:right;color:#887765;font-size:.5rem;letter-spacing:.08em}.schedule-wire__grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border:1px solid #3d3025;background:#3d3025;gap:1px}.schedule-wire__story{min-height:205px;padding:1.1rem;background:#211a14;color:#f6ead5;text-decoration:none;display:flex;flex-direction:column;transition:background .2s ease}.schedule-wire__story:hover,.schedule-wire__story:focus-visible{background:#2c221a;outline:2px solid #d9b467;outline-offset:-2px}.schedule-wire__source{color:#c89945;font-size:.47rem;font-weight:900;letter-spacing:.1em}.schedule-wire__story strong{margin:.9rem 0 1.2rem;font-family:Georgia,"Times New Roman",serif;font-size:1.12rem;line-height:1.08;font-weight:400}.schedule-wire__foot{margin-top:auto;display:flex;justify-content:space-between;gap:.7rem;color:#8e7c6a;font-size:.43rem;letter-spacing:.06em}.schedule-wire__all{display:inline-flex;align-items:center;min-height:44px;margin-top:1.35rem;padding:0 15px;border:1px solid #d9b467;color:#f6ead5;text-decoration:none;font-size:.57rem;font-weight:900;letter-spacing:.1em}.schedule-wire__empty{padding:1.25rem;border:1px solid #3d3025;background:#211a14;color:#b5a18b}@media(max-width:1050px){.schedule-wire__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:720px){.schedule-wire__head{grid-template-columns:1fr}.schedule-wire__meta{text-align:left}.schedule-wire__grid{grid-template-columns:1fr}.schedule-wire__story{min-height:0}}
      `}</style>
    </section>
  );
}
