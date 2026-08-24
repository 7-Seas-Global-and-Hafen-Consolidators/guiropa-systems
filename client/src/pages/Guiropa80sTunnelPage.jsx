import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const STATIONS = [
  { name: "80s Hits", note: "THE BIG SIGNAL", url: "https://listen.181fm.com/181-awesome80s_128k.mp3" },
  { name: "80s Soft", note: "AFTER DARK", url: "https://listen.181fm.com/181-lite80s_128k.mp3" },
  { name: "80s Country", note: "OPEN ROAD", url: "https://listen.181fm.com/181-80scountry_128k.mp3" },
  { name: "80s Slow Jam", note: "LATE NIGHT", url: "https://listen.181fm.com/181-80sliternb_128k.mp3" },
  { name: "80s R&B", note: "SOUL SIGNAL", url: "https://listen.181fm.com/181-80srnb_128k.mp3" },
  { name: "80s Hair Rock", note: "LOUD & LIVE", url: "https://listen.181fm.com/181-hairband_128k.mp3" },
];

export default function Guiropa80sTunnelPage() {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("READY");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.82);

  const station = STATIONS[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  async function start() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src || !audio.src.includes(station.url)) {
      audio.src = station.url;
      audio.load();
    }
    setStatus("CONNECTING");
    try {
      await audio.play();
    } catch {
      setStatus("ERROR");
      setPlaying(false);
    }
  }

  function pause() {
    audioRef.current?.pause();
  }

  function selectStation(nextIndex, autoplay = true) {
    const normalized = (nextIndex + STATIONS.length) % STATIONS.length;
    const audio = audioRef.current;
    const shouldPlay = autoplay || (audio && !audio.paused);
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setIndex(normalized);
    setStatus("READY");
    setPlaying(false);
    if (shouldPlay) {
      window.setTimeout(() => {
        const target = audioRef.current;
        if (!target) return;
        target.src = STATIONS[normalized].url;
        target.load();
        setStatus("CONNECTING");
        target.play().catch(() => setStatus("ERROR"));
      }, 0);
    }
  }

  return (
    <main className="g80">
      <style>{`
        *{box-sizing:border-box}.g80{min-height:100vh;background:#090806;color:#f4ead7;font-family:Inter,Arial,sans-serif;overflow:hidden;position:relative}.g80:before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle at 72% 38%,rgba(213,122,36,.11),transparent 31%),repeating-linear-gradient(90deg,transparent 0 79px,rgba(255,255,255,.012) 80px);}.g80__top{height:72px;border-bottom:1px solid rgba(212,175,55,.22);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(22px,5vw,72px);position:relative;z-index:2}.g80__brand{font-family:Georgia,serif;font-size:1.05rem;letter-spacing:.08em;color:#f4ead7;text-decoration:none}.g80__secret{font-size:.55rem;font-weight:900;letter-spacing:.2em;color:#a68b58}.g80__shell{width:min(1220px,calc(100% - 40px));margin:0 auto;padding:clamp(54px,8vw,100px) 0 110px;position:relative;z-index:1}.g80__kicker{font-size:.58rem;font-weight:900;letter-spacing:.24em;color:#d57a24;text-transform:uppercase}.g80__grid{display:grid;grid-template-columns:.78fr 1.22fr;gap:clamp(42px,8vw,110px);align-items:center;margin-top:20px}.g80__title{font-family:Georgia,serif;font-weight:400;font-size:clamp(5rem,11vw,10rem);line-height:.72;letter-spacing:-.075em;margin:30px 0 0}.g80__title span{display:block;color:#d57a24;font-style:italic;font-size:.56em;margin-left:.65em}.g80__lead{max-width:390px;margin:42px 0 0;color:#a99c89;line-height:1.75;font-size:.95rem}.g80__year{margin-top:30px;font-size:.58rem;font-weight:900;letter-spacing:.24em;color:#6f665a;text-transform:uppercase}.g80__receiver{border:1px solid #3d352a;background:linear-gradient(145deg,#17130f,#080706 62%);box-shadow:0 35px 90px rgba(0,0,0,.55),inset 0 1px rgba(255,255,255,.04);padding:clamp(24px,4vw,44px);position:relative}.g80__receiver:before{content:"GUIROPA · STEREO RECEIVER · 1986";display:block;color:#7e6c50;font-size:.5rem;font-weight:900;letter-spacing:.2em;margin-bottom:24px}.g80__display{border:1px solid #493722;background:#060504;padding:24px;box-shadow:inset 0 0 32px rgba(213,122,36,.06)}.g80__status{display:flex;justify-content:space-between;gap:20px;color:#d57a24;font-size:.52rem;font-weight:900;letter-spacing:.18em}.g80__station{font-family:Georgia,serif;font-size:clamp(2.2rem,5vw,4.4rem);line-height:.95;margin-top:17px;color:#f3d49e}.g80__note{margin-top:12px;color:#786b59;font-size:.55rem;font-weight:900;letter-spacing:.22em}.g80__dial{height:44px;margin-top:26px;border-top:1px solid #3b3023;border-bottom:1px solid #3b3023;position:relative;background:repeating-linear-gradient(90deg,#6b5b42 0 1px,transparent 1px 9.09%)}.g80__dial:after{content:"";position:absolute;top:-5px;bottom:-5px;width:2px;background:#d57a24;left:calc((100% / 5) * var(--station-index));box-shadow:0 0 12px rgba(213,122,36,.7);transition:left .25s ease}.g80__years{display:flex;justify-content:space-between;margin-top:7px;color:#62584a;font-size:.48rem;font-weight:800}.g80__controls{display:grid;grid-template-columns:auto auto auto 1fr;gap:10px;align-items:center;margin-top:24px}.g80__btn{height:46px;min-width:46px;border:1px solid #4a4033;background:#15110d;color:#d8c8ad;cursor:pointer;font-weight:900}.g80__btn:hover{border-color:#d57a24;color:#fff}.g80__play{width:58px;height:58px;border-color:#d57a24;background:#d57a24;color:#0b0907;font-size:1.1rem}.g80__volume{display:flex;align-items:center;gap:12px;justify-content:flex-end;color:#756957;font-size:.5rem;font-weight:900;letter-spacing:.12em}.g80__volume input{accent-color:#d57a24;width:min(150px,18vw)}.g80__stations{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:26px}.g80__stationBtn{min-height:62px;border:1px solid #302a22;background:#0d0b09;color:#857867;text-align:left;padding:11px 13px;cursor:pointer}.g80__stationBtn strong{display:block;color:#b8aa94;font-size:.64rem}.g80__stationBtn span{display:block;margin-top:5px;color:#51483d;font-size:.46rem;font-weight:900;letter-spacing:.12em}.g80__stationBtn.is-active{border-color:#d57a24;background:#1b1209}.g80__stationBtn.is-active strong{color:#f2d49f}.g80__bottom{margin-top:28px;display:flex;justify-content:space-between;gap:20px;color:#5f5548;font-size:.5rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.g80__exit{color:#8e7c60;text-decoration:none}.g80__exit:hover{color:#d57a24}@media(max-width:850px){.g80__grid{grid-template-columns:1fr}.g80__title{font-size:clamp(5rem,22vw,8rem)}.g80__lead{max-width:600px}.g80__stations{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.g80__shell{width:min(100% - 24px,700px)}.g80__top{padding:0 16px}.g80__secret{display:none}.g80__receiver{padding:16px}.g80__display{padding:18px}.g80__controls{grid-template-columns:auto auto auto}.g80__volume{grid-column:1/-1;justify-content:flex-start;margin-top:8px}.g80__volume input{width:100%}.g80__bottom{display:block}.g80__exit{display:inline-block;margin-top:12px}}
      `}</style>

      <header className="g80__top">
        <Link className="g80__brand" to="/">GUIROPA RADIO</Link>
        <span className="g80__secret">PRIVATE FREQUENCY · 1980—1989</span>
      </header>

      <div className="g80__shell">
        <div className="g80__kicker">GUIROPA RADIO™ · 24 HOURS · CONTINUOUS</div>
        <div className="g80__grid">
          <section>
            <h1 className="g80__title">80s<span>Tunnel™</span></h1>
            <p className="g80__lead">Seis sinais contínuos presos em uma década. Escolha uma frequência e deixe 1986 continuar acontecendo.</p>
            <div className="g80__year">still somewhere in 1986.</div>
          </section>

          <section className="g80__receiver" style={{ "--station-index": index }}>
            <div className="g80__display">
              <div className="g80__status"><span>{status}</span><span>CH {String(index + 1).padStart(2, "0")} / 06</span></div>
              <div className="g80__station">{station.name}</div>
              <div className="g80__note">{station.note} · CONTINUOUS SIGNAL</div>
              <div className="g80__dial" />
              <div className="g80__years"><span>80</span><span>82</span><span>84</span><span>86</span><span>88</span><span>89</span></div>
            </div>

            <div className="g80__controls">
              <button className="g80__btn" type="button" onClick={() => selectStation(index - 1)} aria-label="Canal anterior">◀</button>
              <button className="g80__btn g80__play" type="button" onClick={playing ? pause : start} aria-label={playing ? "Pausar" : "Reproduzir"}>{playing ? "Ⅱ" : "▶"}</button>
              <button className="g80__btn" type="button" onClick={() => selectStation(index + 1)} aria-label="Próximo canal">▶</button>
              <label className="g80__volume">VOL <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /></label>
            </div>

            <div className="g80__stations">
              {STATIONS.map((item, i) => (
                <button key={item.name} className={`g80__stationBtn${i === index ? " is-active" : ""}`} type="button" onClick={() => selectStation(i)}>
                  <strong>{item.name}</strong><span>{item.note}</span>
                </button>
              ))}
            </div>

            <audio ref={audioRef} preload="none" onPlaying={() => { setPlaying(true); setStatus("ON AIR"); }} onPause={() => { setPlaying(false); setStatus((s) => s === "ERROR" ? s : "PAUSED"); }} onWaiting={() => setStatus("BUFFERING")} onStalled={() => setStatus("BUFFERING")} onError={() => { setPlaying(false); setStatus("ERROR"); }} />
          </section>
        </div>

        <div className="g80__bottom"><span>FREQUENCY LOCKED · 1980—1989</span><Link className="g80__exit" to="/">EXIT TUNNEL →</Link></div>
      </div>
    </main>
  );
}
