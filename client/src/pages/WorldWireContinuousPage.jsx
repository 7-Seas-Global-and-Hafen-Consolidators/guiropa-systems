import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";

const PAGE_SIZE = 36;
const REFRESH_MS = 60000;

const TAG_RULES = [
  ["1950s", /\b(195\d|50s|anos 50)\b/i],
  ["1960s", /\b(196\d|60s|anos 60)\b/i],
  ["1970s", /\b(197\d|70s|anos 70)\b/i],
  ["1980s", /\b(198\d|80s|anos 80)\b/i],
  ["ROCK", /\b(rock|punk|metal|guitarra|banda)\b/i],
  ["SOUL", /\b(soul|motown|r&b|rhythm and blues|funk)\b/i],
  ["JAZZ", /\b(jazz|bebop|swing)\b/i],
  ["POP", /\b(pop|synthpop|new wave)\b/i],
  ["AO VIVO", /\b(ao vivo|show|concerto|turnê|festival|palco)\b/i],
  ["ARQUIVO", /\b(arquivo|raro|inédito|história|aniversário)\b/i],
  ["REEDIÇÃO", /\b(reedição|remaster|deluxe|box set|vinil)\b/i],
  ["ENTREVISTA", /\b(entrevista|conversa|declara)\b/i],
  ["OBITUÁRIO", /\b(morre|morreu|morte|obituário|faleceu)\b/i],
];

function isReady(item) {
  return Boolean(
    item?.editorialStatus === "ready" &&
    item?.titlePt &&
    Array.isArray(item?.bodyPt) &&
    item.bodyPt.length >= 4
  );
}

function tagsFor(item) {
  const text = `${item.titlePt || ""} ${item.excerptPt || ""} ${(item.bodyPt || []).join(" ")}`;
  const tags = TAG_RULES.filter(([, rule]) => rule.test(text)).map(([tag]) => tag);
  return tags.length ? tags.slice(0, 3) : ["WORLD WIRE"];
}

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

export default function WorldWireContinuousPage() {
  const [data, setData] = useState({
    items: [],
    sources: [],
    updatedAt: null,
    editorialUpdatedAt: null,
    publishedPt: 0,
    connectedPoints: 0,
  });
  const [region, setRegion] = useState("ALL");
  const [tag, setTag] = useState("ALL");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(`${assetUrl("data/rss-world-feed.json")}?t=${Date.now()}`, {
        cache: "no-store",
      })
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(new Error("feed unavailable"))
        )
        .then((payload) => {
          if (alive) setData(payload);
        })
        .catch(() => {});

    load();
    const timer = window.setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, []);

  const enriched = useMemo(
    () =>
      (data.items || [])
        .filter(isReady)
        .map((item) => ({ ...item, tags: tagsFor(item) })),
    [data.items]
  );

  const regions = useMemo(
    () => [...new Set(enriched.map((item) => item.region).filter(Boolean))],
    [enriched]
  );

  const tags = useMemo(
    () => [...new Set(enriched.flatMap((item) => item.tags))],
    [enriched]
  );

  const filtered = useMemo(
    () =>
      enriched.filter(
        (item) =>
          (region === "ALL" || item.region === region) &&
          (tag === "ALL" || item.tags.includes(tag))
      ),
    [enriched, region, tag]
  );

  const shown = filtered.slice(0, visible);
  const activeSources = Number(
    data.connectedPoints ||
      (data.sources || []).filter(
        (source) => source.ok && Number(source.seen || 0) > 0
      ).length
  );

  useEffect(() => setVisible(PAGE_SIZE), [region, tag]);

  return (
    <main className="guiropa-continuous-wire">
      <style>{`
        .guiropa-continuous-wire{background:#efe1c7;color:#18130f;min-height:100vh;padding-bottom:7rem}.guiropa-cw-ticker{overflow:hidden;background:#17120f;color:#f6ead5;border-top:5px solid #b83224}.guiropa-cw-track{display:flex;width:max-content;min-width:200%;white-space:nowrap;animation:cwTicker 34s linear infinite}.guiropa-cw-track span{display:block;min-width:50%;padding:10px 24px;font-size:9px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}.guiropa-cw-shell{width:min(1320px,calc(100% - 30px));margin:0 auto}.guiropa-cw-hero{display:grid;grid-template-columns:1.35fr .65fr;gap:3rem;align-items:end;padding:clamp(4rem,8vw,7rem) 0 2.5rem;border-bottom:1px solid rgba(70,48,31,.2)}.guiropa-cw-kicker{font-size:.6rem;font-weight:1000;letter-spacing:.2em;color:#b83224;text-transform:uppercase}.guiropa-cw-hero h1{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(4.4rem,10vw,9rem);line-height:.8;letter-spacing:-.07em;margin:1rem 0}.guiropa-cw-hero p{max-width:760px;color:#756451;line-height:1.7}.guiropa-cw-stats{display:grid;background:#17120f;color:#f6ead5;border:1px solid #17120f}.guiropa-cw-stats div{display:flex;justify-content:space-between;padding:1rem;border-bottom:1px solid rgba(255,255,255,.12);font-size:.56rem;letter-spacing:.12em;text-transform:uppercase}.guiropa-cw-stats div:last-child{border-bottom:0}.guiropa-cw-stats strong{color:#d8b46f}.guiropa-cw-controls{position:sticky;top:0;z-index:25;background:rgba(239,225,199,.98);backdrop-filter:blur(10px);padding:1rem 0;border-bottom:1px solid rgba(70,48,31,.22)}.guiropa-cw-row{display:flex;gap:7px;overflow-x:auto;margin-bottom:7px}.guiropa-cw-row:last-child{margin-bottom:0}.guiropa-cw-row button{flex:0 0 auto;min-height:34px;padding:0 11px;border:1px solid rgba(70,48,31,.28);background:transparent;font-size:.54rem;font-weight:1000;letter-spacing:.09em;text-transform:uppercase}.guiropa-cw-row button.on{background:#17120f;color:#f6ead5}.guiropa-cw-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(70,48,31,.2);border:1px solid rgba(70,48,31,.2);margin-top:1.5rem}.guiropa-cw-card{background:#f7ecd8;min-height:320px;padding:1.25rem;display:flex;flex-direction:column}.guiropa-cw-brand{font-size:.48rem;font-weight:1000;letter-spacing:.16em;color:#b83224;text-transform:uppercase}.guiropa-cw-card h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2vw,2.15rem);font-weight:400;line-height:1.03;letter-spacing:-.035em;margin:.9rem 0}.guiropa-cw-tags{display:flex;gap:5px;flex-wrap:wrap}.guiropa-cw-tags span{font-size:.43rem;font-weight:1000;letter-spacing:.09em;border:1px solid rgba(70,48,31,.25);padding:4px 6px;text-transform:uppercase}.guiropa-cw-excerpt{color:#756451;font-size:.84rem;line-height:1.55;margin:1rem 0 1.5rem;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:6;overflow:hidden}.guiropa-cw-actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}.guiropa-cw-actions a{display:inline-flex;align-items:center;min-height:36px;padding:0 10px;border:1px solid #17120f;text-decoration:none;font-size:.5rem;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;background:#17120f;color:#f6ead5}.guiropa-cw-origin{margin-top:1rem;padding-top:.7rem;border-top:1px solid rgba(70,48,31,.15);font-size:.45rem;color:#97836f}.guiropa-cw-load{display:flex;justify-content:center;margin-top:2rem}.guiropa-cw-load button{min-height:48px;padding:0 18px;background:#17120f;color:#f6ead5;border:1px solid #17120f;font-size:.56rem;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}.guiropa-cw-empty{padding:4rem 0;color:#756451;font-family:Georgia,"Times New Roman",serif;font-size:1.15rem;line-height:1.6}@keyframes cwTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:1100px){.guiropa-cw-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:900px){.guiropa-cw-hero{grid-template-columns:1fr}.guiropa-cw-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.guiropa-cw-shell{width:calc(100% - 18px)}.guiropa-cw-grid{grid-template-columns:1fr}.guiropa-cw-card{min-height:0}}@media(prefers-reduced-motion:reduce){.guiropa-cw-track{animation:none}}
      `}</style>

      <div className="guiropa-cw-ticker">
        <div className="guiropa-cw-track">
          <span>GUIROPA RADIO · PASSPORT RADIO NETWORK · NEWS TUNNEL™ · MATÉRIAS COMPLETAS EM PORTUGUÊS · CONTÍNUO ·</span>
          <span>GUIROPA RADIO · PASSPORT RADIO NETWORK · NEWS TUNNEL™ · MATÉRIAS COMPLETAS EM PORTUGUÊS · CONTÍNUO ·</span>
        </div>
      </div>

      <div className="guiropa-cw-shell">
        <header className="guiropa-cw-hero">
          <div>
            <div className="guiropa-cw-kicker">
              GUIROPA RADIO · PASSPORT RADIO NETWORK · CONTÍNUO
            </div>
            <h1>News Tunnel™</h1>
            <p>
              Notícias chegam do mundo inteiro, passam por apuração editorial e só aparecem aqui quando a matéria completa em português está pronta.
            </p>
          </div>

          <div className="guiropa-cw-stats">
            <div>
              <span>MATÉRIAS EM PORTUGUÊS</span>
              <strong>{Number(data.publishedPt || enriched.length)}</strong>
            </div>
            <div>
              <span>PONTOS CONECTADOS</span>
              <strong>{activeSources}</strong>
            </div>
            <div>
              <span>ÚLTIMA PUBLICAÇÃO</span>
              <strong>{stamp(data.editorialUpdatedAt || data.updatedAt)}</strong>
            </div>
          </div>
        </header>

        <section className="guiropa-cw-controls">
          <div className="guiropa-cw-row">
            <button
              className={region === "ALL" ? "on" : ""}
              onClick={() => setRegion("ALL")}
            >
              TUDO
            </button>
            {regions.map((value) => (
              <button
                key={value}
                className={region === value ? "on" : ""}
                onClick={() => setRegion(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="guiropa-cw-row">
            <button
              className={tag === "ALL" ? "on" : ""}
              onClick={() => setTag("ALL")}
            >
              TODAS AS CATEGORIAS
            </button>
            {tags.map((value) => (
              <button
                key={value}
                className={tag === value ? "on" : ""}
                onClick={() => setTag(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </section>

        {!shown.length ? (
          <p className="guiropa-cw-empty">
            As próximas matérias estão sendo apuradas e preparadas editorialmente em português. Nenhuma chamada incompleta ou em outro idioma é publicada aqui.
          </p>
        ) : (
          <section className="guiropa-cw-grid">
            {shown.map((item) => (
              <article className="guiropa-cw-card" key={item.id}>
                <div className="guiropa-cw-brand">
                  GUIROPA RADIO · PASSPORT RADIO NETWORK
                </div>
                <h2>{item.titlePt}</h2>
                <div className="guiropa-cw-tags">
                  {item.tags.map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
                {item.excerptPt ? (
                  <p className="guiropa-cw-excerpt">{item.excerptPt}</p>
                ) : null}
                <div className="guiropa-cw-actions">
                  <Link to={`/world-wire/${item.id}`}>ABRIR MATÉRIA</Link>
                </div>
                <div className="guiropa-cw-origin">
                  GUIROPA RADIO · WORLD WIRE · {item.region || "MUNDO"} · {stamp(item.publishedAt || item.discoveredAt)}
                </div>
              </article>
            ))}
          </section>
        )}

        {visible < filtered.length ? (
          <div className="guiropa-cw-load">
            <button onClick={() => setVisible((current) => current + PAGE_SIZE)}>
              CARREGAR MAIS {Math.min(PAGE_SIZE, filtered.length - visible)}
            </button>
          </div>
        ) : null}

        <div style={{ marginTop: "2rem" }}>
          <Link
            to="/"
            style={{
              color: "#17120f",
              fontSize: ".55rem",
              fontWeight: 900,
              letterSpacing: ".1em",
              textDecoration: "none",
            }}
          >
            ← GUIROPA RADIO
          </Link>
        </div>
      </div>
    </main>
  );
}
