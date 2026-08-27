import { useEffect, useMemo, useRef, useState } from "react";
import { useRadioPlayer } from "../audio/RadioPlayerContext.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const PLAYER_ART = assetUrl("assets/guiropa-radio-player-artdeco.jpg");

const SOURCES = [
  { id: "guiropa", group: "GUIROPA", label: "GUIROPA RADIO", short: "MAIN", subtitle: "1950—1990 · LIVE ARCHIVE", type: "catalog" },
  { id: "70s", group: "70s TUNNEL", label: "70s TUNNEL", short: "70s", subtitle: "ALL STYLES · 1970—1979", type: "stream", url: "https://listen.181fm.com/181-70s_128k.mp3", fallback: "https://listen.181fm.com/181-70s_64k.aac" },
  { id: "80s-pop", group: "80s TUNNEL", label: "80s POP", short: "POP", subtitle: "BIG HITS · 24 HOURS", type: "stream", url: "https://listen.181fm.com/181-awesome80s_128k.mp3" },
  { id: "80s-ballads", group: "80s TUNNEL", label: "80s BALLADS", short: "BALLADS", subtitle: "SOFT SIGNAL · 24 HOURS", type: "stream", url: "https://listen.181fm.com/181-lite80s_128k.mp3" },
  { id: "80s-country", group: "80s TUNNEL", label: "80s COUNTRY", short: "COUNTRY", subtitle: "OPEN ROAD · 24 HOURS", type: "stream", url: "https://listen.181fm.com/181-80scountry_128k.mp3" },
  { id: "80s-soul", group: "80s TUNNEL", label: "80s SOUL", short: "SOUL", subtitle: "LATE NIGHT · 24 HOURS", type: "stream", url: "https://listen.181fm.com/181-80sliternb_128k.mp3" },
  { id: "80s-rnb", group: "80s TUNNEL", label: "80s R&B", short: "R&B", subtitle: "SOUL SIGNAL · 24 HOURS", type: "stream", url: "https://listen.181fm.com/181-80srnb_128k.mp3" },
  { id: "80s-rock", group: "80s TUNNEL", label: "80s ROCK", short: "ROCK", subtitle: "LOUD SIGNAL · 24 HOURS", type: "stream", url: "https://listen.181fm.com/181-hairband_128k.mp3" },
];

export default function GuiropaUnifiedRadioPage({ initialSource = "guiropa" }) {
  const streamRef = useRef(null);
  const fallbackTriedRef = useRef(false);
  const [sourceId, setSourceId] = useState(initialSource);
  const [streamStatus, setStreamStatus] = useState("ready");
  const [streamPlaying, setStreamPlaying] = useState(false);
  const [streamVolume, setStreamVolume] = useState(0.82);

  const radio = useRadioPlayer();
  const sourceIndex = Math.max(0, SOURCES.findIndex((item) => item.id === sourceId));
  const source = SOURCES[sourceIndex] || SOURCES[0];
  const isCatalog = source.type === "catalog";

  useEffect(() => { setSourceId(initialSource); }, [initialSource]);
  useEffect(() => { if (streamRef.current) streamRef.current.volume = streamVolume; }, [streamVolume]);
  useEffect(() => () => {
    const audio = streamRef.current;
    if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
  }, []);

  useEffect(() => {
    const audio = streamRef.current;
    if (isCatalog) {
      if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
      setStreamPlaying(false); setStreamStatus("ready"); fallbackTriedRef.current = false;
    } else {
      radio.pause();
      if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
      setStreamPlaying(false); setStreamStatus("ready"); fallbackTriedRef.current = false;
    }
  }, [sourceId]);

  const displayTitle = isCatalog ? radio.displayTitle : source.label;
  const displayArtist = isCatalog ? radio.displayArtist : source.subtitle;
  const playing = isCatalog ? radio.isPlaying : streamPlaying;
  const loading = isCatalog ? radio.isLoading : streamStatus === "loading";
  const statusText = useMemo(() => {
    if (isCatalog) return radio.statusText;
    if (streamStatus === "playing") return "AO VIVO";
    if (streamStatus === "loading") return "CONECTANDO";
    if (streamStatus === "error") return "INDISPONÍVEL";
    return "PRONTA";
  }, [isCatalog, radio.statusText, streamStatus]);

  async function playStream() {
    const audio = streamRef.current;
    if (!audio) return;
    if (!audio.src) { audio.src = source.url; audio.load(); }
    setStreamStatus("loading");
    try { await audio.play(); } catch { setStreamStatus("error"); setStreamPlaying(false); }
  }

  function pauseStream() { streamRef.current?.pause(); setStreamPlaying(false); setStreamStatus("ready"); }
  function togglePlayback() {
    if (isCatalog) { radio.togglePlayback(); return; }
    if (streamPlaying) pauseStream(); else void playStream();
  }
  function selectSource(nextId) {
    if (nextId === sourceId) return;
    if (isCatalog) radio.pause(); else pauseStream();
    setSourceId(nextId);
  }
  function next() {
    if (isCatalog) { radio.nextTrack(); return; }
    selectSource(SOURCES[(sourceIndex + 1) % SOURCES.length].id);
  }
  function previousSource() { selectSource(SOURCES[(sourceIndex - 1 + SOURCES.length) % SOURCES.length].id); }
  function handleStreamError() {
    const audio = streamRef.current;
    if (!audio) return;
    if (source.fallback && !fallbackTriedRef.current) {
      fallbackTriedRef.current = true;
      audio.src = source.fallback; audio.load(); setStreamStatus("loading");
      audio.play().catch(() => { setStreamPlaying(false); setStreamStatus("error"); });
      return;
    }
    setStreamPlaying(false); setStreamStatus("error");
  }

  const volume = isCatalog ? radio.volume : streamVolume;
  const muted = isCatalog ? radio.isMuted : volume === 0;
  function changeVolume(value) { const nextValue = Number(value); if (isCatalog) radio.setVolume(nextValue); else setStreamVolume(nextValue); }
  function toggleMute() { if (isCatalog) radio.toggleMute(); else setStreamVolume((current) => (current > 0 ? 0 : 0.82)); }

  return (
    <main className="gurx">
      <style>{`
        .gurx{--paper:#f5ead6;--deep:#ead1aa;--ink:#201a15;--red:#b83224;--gold:#c99a45;--gold2:#e1bd76;min-height:100vh;background:linear-gradient(180deg,#f8efdf 0%,var(--paper) 58%,var(--deep) 100%);color:var(--ink);padding:64px 0 110px;font-family:Inter,Arial,sans-serif}.gurx *{box-sizing:border-box}.gurx__shell{width:min(1180px,calc(100% - 40px));margin:0 auto}.gurx__intro{display:flex;align-items:end;justify-content:space-between;gap:32px;margin-bottom:38px}.gurx__kicker{font-size:10px;font-weight:900;letter-spacing:.22em;color:var(--red)}.gurx__intro h1{font-family:Georgia,serif;font-size:clamp(46px,7vw,86px);line-height:.9;letter-spacing:-.05em;font-weight:400;margin:12px 0 0}.gurx__intro p{max-width:630px;color:#76634e;line-height:1.65}.gurx__receiver{overflow:hidden;border:1px solid rgba(201,154,69,.7);border-radius:18px;background:linear-gradient(180deg,#17130f 0%,#0c0b0a 52%,#16110d 100%);color:#f4e4c6;box-shadow:0 32px 78px rgba(55,37,22,.27)}.gurx__main{display:grid;grid-template-columns:230px minmax(0,1fr) 360px;min-height:350px}.gurx__art{overflow:hidden;border-right:1px solid rgba(201,154,69,.24);background:#0b0a09}.gurx__art img{width:100%;height:100%;object-fit:cover;object-position:10% center}.gurx__display{display:flex;flex-direction:column;justify-content:space-between;padding:36px clamp(28px,4vw,52px);border-right:1px solid rgba(201,154,69,.18)}.gurx__status{display:flex;align-items:center;gap:9px;color:var(--gold2);font-size:10px;font-weight:900;letter-spacing:.18em}.gurx__dot{width:8px;height:8px;border-radius:50%;background:#b83224;box-shadow:0 0 0 5px rgba(184,50,36,.12),0 0 14px rgba(184,50,36,.44)}.gurx__group{font-size:9px;letter-spacing:.18em;color:#8e7657;margin-top:28px}.gurx__title{font-family:Georgia,serif;font-size:clamp(38px,5vw,66px);line-height:.96;letter-spacing:-.04em;font-weight:400;color:#f3dfb9;margin:8px 0 0}.gurx__artist{color:#af9b7c;font-size:16px;line-height:1.5;margin-top:14px}.gurx__tuning{padding:28px 24px;background:linear-gradient(180deg,rgba(201,154,69,.04),transparent)}.gurx__tuning-head{font-size:9px;font-weight:900;letter-spacing:.2em;color:#9d896d}.gurx__dial{position:relative;margin-top:16px;border:1px solid rgba(201,154,69,.42);border-radius:9px;padding:18px 14px;background:linear-gradient(180deg,#16100b,#2b190b)}.gurx__dial-labels{display:grid;grid-template-columns:repeat(8,1fr);gap:2px;font-family:Georgia,serif;font-size:8px;color:#e0b86d;text-align:center}.gurx__scale{position:relative;height:38px;margin-top:12px;border-top:2px solid rgba(217,138,33,.62);background:repeating-linear-gradient(90deg,transparent 0,transparent 10px,rgba(217,138,33,.70) 11px,rgba(217,138,33,.70) 12px)}.gurx__needle{position:absolute;top:-8px;width:2px;height:54px;transform:translateX(-50%);background:linear-gradient(180deg,#ffd17b,#cc621b);box-shadow:0 0 12px rgba(255,159,43,.78);transition:left .22s ease}.gurx__banks{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:18px}.gurx__bank{border:1px solid rgba(201,154,69,.23);background:#15110e;color:#cdb991;padding:10px 9px;font-size:8px;font-weight:900;letter-spacing:.08em;cursor:pointer}.gurx__bank.is-active{border-color:#d5a64d;color:#16100b;background:#d5a64d}.gurx__controls{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:26px;padding:22px 34px;border-top:1px solid rgba(201,154,69,.23);background:linear-gradient(180deg,#100e0c,#090807)}.gurx__transport{display:flex;gap:10px;align-items:center}.gurx__round{width:46px;height:46px;border:1px solid rgba(201,154,69,.4);border-radius:50%;background:#17120e;color:#e3bd72;cursor:pointer}.gurx__play{width:70px;height:70px;border:1px solid #aa782e;border-radius:50%;background:radial-gradient(circle at 35% 28%,#efd18c 0%,#c89443 36%,#755021 72%,#2b1b0d 100%);color:#160f08;font-size:22px;font-weight:900;cursor:pointer}.gurx__copy strong{display:block;font-family:Georgia,serif;color:#e5c889;font-size:17px;font-weight:400}.gurx__copy span{display:block;color:#8f7e68;font-size:11px;margin-top:6px}.gurx__volume{display:flex;align-items:center;gap:10px;padding-left:18px;border-left:1px solid rgba(201,154,69,.17)}.gurx__volume button{width:42px;height:42px;border:1px solid rgba(201,154,69,.31);border-radius:50%;background:#1c1610;color:#dfb96f}.gurx__volume input{width:125px;accent-color:var(--gold)}.gurx__legend{display:grid;grid-template-columns:repeat(8,1fr);margin-top:26px;border-top:1px solid rgba(80,59,40,.18);border-bottom:1px solid rgba(80,59,40,.18)}.gurx__legend button{border:0;border-right:1px solid rgba(80,59,40,.18);background:transparent;padding:18px 10px;color:#66543f;cursor:pointer;font-weight:800}.gurx__legend button:last-child{border-right:0}.gurx__legend button.is-active{background:rgba(213,122,36,.09);color:#b65f18}.gurx__legend strong{display:block;font-size:12px}.gurx__legend span{display:block;font-size:8px;letter-spacing:.1em;margin-top:5px}.gurx__note{margin-top:26px;color:#7a674f;font-size:12px;line-height:1.6}@media(max-width:950px){.gurx__main{grid-template-columns:170px 1fr}.gurx__tuning{grid-column:1/-1;border-top:1px solid rgba(201,154,69,.18)}.gurx__display{border-right:0}.gurx__legend{grid-template-columns:repeat(4,1fr)}}@media(max-width:650px){.gurx{padding-top:38px}.gurx__shell{width:min(100% - 22px,720px)}.gurx__intro{display:block}.gurx__main{grid-template-columns:1fr}.gurx__art{height:170px}.gurx__display{padding:28px 22px}.gurx__controls{grid-template-columns:1fr;padding:20px}.gurx__volume{padding:14px 0 0;border-left:0;border-top:1px solid rgba(201,154,69,.16)}.gurx__volume input{width:100%}.gurx__legend{grid-template-columns:repeat(2,1fr)}.gurx__dial-labels{font-size:7px}}
      `}</style>
      <div className="gurx__shell">
        <header className="gurx__intro"><div><div className="gurx__kicker">GUIROPA RADIO · UNIFIED RECEIVER</div><h1>Ouvir.</h1></div><p>Um único receiver. GUIROPA RADIO, 70s Tunnel™ e todas as frequências 80s dentro da mesma central.</p></header>
        <section className="gurx__receiver" aria-label="GUIROPA unified radio receiver">
          <div className="gurx__main">
            <div className="gurx__art"><img src={PLAYER_ART} alt="GUIROPA RADIO" /></div>
            <div className="gurx__display"><div className="gurx__status"><span className="gurx__dot" />{statusText}</div><div><div className="gurx__group">{source.group}</div><h2 className="gurx__title">{displayTitle}</h2><div className="gurx__artist">{displayArtist}</div></div></div>
            <div className="gurx__tuning"><div className="gurx__tuning-head">GUIROPA SIGNAL SELECTOR</div><div className="gurx__dial"><div className="gurx__dial-labels">{SOURCES.map((item) => <span key={item.id}>{item.short}</span>)}</div><div className="gurx__scale"><span className="gurx__needle" style={{ left: `${(sourceIndex / (SOURCES.length - 1)) * 100}%` }} /></div></div><div className="gurx__banks">{SOURCES.map((item) => <button key={item.id} className={`gurx__bank ${item.id === sourceId ? "is-active" : ""}`} type="button" onClick={() => selectSource(item.id)}>{item.label}</button>)}</div></div>
          </div>
          <div className="gurx__controls"><div className="gurx__transport"><button className="gurx__round" type="button" onClick={previousSource} aria-label="Sinal anterior">◀</button><button className="gurx__play" type="button" onClick={togglePlayback} disabled={loading} aria-label={playing ? "Pausar" : "Tocar"}>{loading ? "…" : playing ? "Ⅱ" : "▶"}</button><button className="gurx__round" type="button" onClick={next} aria-label={isCatalog ? "Próxima faixa" : "Próximo sinal"}>▶▶</button></div><div className="gurx__copy"><strong>GET UP. TURN IT UP. GUIROPA.</strong><span>{isCatalog ? "Arquivo ao vivo GUIROPA. Próxima faixa sorteada automaticamente." : `${source.group} · ${source.subtitle}`}</span></div><div className="gurx__volume"><button type="button" onClick={toggleMute} aria-label="Som">{muted ? "×" : "◖"}</button><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => changeVolume(event.target.value)} /></div></div>
          <audio ref={streamRef} preload="none" onPlaying={() => { setStreamPlaying(true); setStreamStatus("playing"); }} onPause={() => setStreamPlaying(false)} onWaiting={() => setStreamStatus("loading")} onStalled={() => setStreamStatus("loading")} onError={handleStreamError} />
        </section>
        <div className="gurx__legend">{SOURCES.map((item) => <button key={item.id} type="button" className={item.id === sourceId ? "is-active" : ""} onClick={() => selectSource(item.id)}><strong>{item.label}</strong><span>{item.group}</span></button>)}</div>
        <p className="gurx__note">Os túneis antigos permanecem preservados no código como rollback. Esta página só unifica a interface e a seleção dos sinais.</p>
      </div>
    </main>
  );
}
