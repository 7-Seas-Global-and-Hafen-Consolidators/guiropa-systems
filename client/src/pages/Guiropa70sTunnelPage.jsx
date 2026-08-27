import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SIGNALS = [
  { name: "Super 70s", note: "FULL DECADE SIGNAL", url: "https://listen.181fm.com/181-70s_128k.mp3" },
  { name: "Super 70s", note: "BACKUP SIGNAL", url: "https://listen.181fm.com/181-70s_128k.mp3" },
];

export default function Guiropa70sTunnelPage() {
  const audioRef = useRef(null);
  const [signalIndex, setSignalIndex] = useState(0);
  const [status, setStatus] = useState("READY");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.82);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
  useEffect(() => () => { const a = audioRef.current; if (a) { a.pause(); a.src = ""; } }, []);

  async function start() {
    const audio = audioRef.current;
    if (!audio) return;
    const signal = SIGNALS[signalIndex];
    if (!audio.src || !audio.src.includes(signal.url)) { audio.src = signal.url; audio.load(); }
    setStatus("CONNECTING");
    try { await audio.play(); } catch { setStatus("ERROR"); setPlaying(false); }
  }
  function pause() { audioRef.current?.pause(); }
  function retry() {
    const next = (signalIndex + 1) % SIGNALS.length;
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
    setSignalIndex(next); setPlaying(false); setStatus("READY");
    window.setTimeout(start, 0);
  }

  return (
    <main className="g70">
      <style>{`
        *{box-sizing:border-box}.g70{min-height:100vh;background:#100a05;color:#f5e7ca;font-family:Inter,Arial,sans-serif;overflow:hidden;position:relative}.g70:before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle at 72% 38%,rgba(196,112,38,.16),transparent 32%),repeating-linear-gradient(90deg,transparent 0 79px,rgba(255,255,255,.012) 80px)}.g70__top{height:72px;border-bottom:1px solid rgba(212,175,55,.22);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(22px,5vw,72px);position:relative;z-index:2}.g70__brand{font-family:Georgia,serif;font-size:1.05rem;letter-spacing:.08em;color:#f5e7ca;text-decoration:none}.g70__secret{font-size:.55rem;font-weight:900;letter-spacing:.2em;color:#a9834f}.g70__shell{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:clamp(54px,8vw,100px) 0 110px;position:relative;z-index:1}.g70__kicker{font-size:.58rem;font-weight:900;letter-spacing:.24em;color:#d57a24}.g70__grid{display:grid;grid-template-columns:.82fr 1.18fr;gap:clamp(42px,8vw,105px);align-items:center;margin-top:20px}.g70__title{font-family:Georgia,serif;font-weight:400;font-size:clamp(5rem,11vw,10rem);line-height:.72;letter-spacing:-.075em;margin:30px 0 0}.g70__title span{display:block;color:#d57a24;font-style:italic;font-size:.56em;margin-left:.65em}.g70__lead{max-width:410px;margin:42px 0 0;color:#b0a087;line-height:1.75;font-size:.95rem}.g70__year{margin-top:30px;font-size:.58rem;font-weight:900;letter-spacing:.24em;color:#786852}.g70__receiver{border:1px solid #4b3825;background:linear-gradient(145deg,#21150c,#090604 62%);box-shadow:0 35px 90px rgba(0,0,0,.55),inset 0 1px rgba(255,255,255,.04);padding:clamp(24px,4vw,44px)}.g70__receiver:before{content:"GUIROPA · STEREO RECEIVER · 1977";display:block;color:#8b6b45;font-size:.5rem;font-weight:900;letter-spacing:.2em;margin-bottom:24px}.g70__display{border:1px solid #593a1d;background:#070402;padding:26px;box-shadow:inset 0 0 35px rgba(213,122,36,.08)}.g70__status{display:flex;justify-content:space-between;color:#d57a24;font-size:.52rem;font-weight:900;letter-spacing:.18em}.g70__station{font-family:Georgia,serif;font-size:clamp(2.5rem,6vw,5rem);line-height:.95;margin-top:20px;color:#f3cc8d}.g70__note{margin-top:12px;color:#80694d;font-size:.55rem;font-weight:900;letter-spacing:.22em}.g70__dial{height:48px;margin-top:30px;border-top:1px solid #49331e;border-bottom:1px solid #49331e;background:repeating-linear-gradient(90deg,#735633 0 1px,transparent 1px 10%);position:relative}.g70__dial:after{content:"";position:absolute;top:-5px;bottom:-5px;width:2px;background:#d57a24;left:70%;box-shadow:0 0 12px rgba(213,122,36,.8)}.g70__years{display:flex;justify-content:space-between;margin-top:8px;color:#6e5b44;font-size:.48rem;font-weight:800}.g70__controls{display:grid;grid-template-columns:auto auto 1fr;gap:12px;align-items:center;margin-top:26px}.g70__btn{height:52px;min-width:70px;border:1px solid #58442f;background:#1b120b;color:#dec7a5;cursor:pointer;font-weight:900}.g70__play{height:62px;border-color:#d57a24;background:#d57a24;color:#0b0703;font-size:1.05rem}.g70__volume{display:flex;align-items:center;gap:12px;justify-content:flex-end;color:#806d55;font-size:.5rem;font-weight:900;letter-spacing:.12em}.g70__volume input{accent-color:#d57a24;width:min(170px,20vw)}.g70__manifest{margin-top:28px;padding-top:22px;border-top:1px solid #352718;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.g70__manifest div{border-left:2px solid #6c431e;padding-left:12px}.g70__manifest strong{display:block;color:#cbb28c;font-size:.62rem}.g70__manifest span{display:block;margin-top:5px;color:#685640;font-size:.48rem;letter-spacing:.1em}.g70__bottom{margin-top:28px;display:flex;justify-content:space-between;color:#695945;font-size:.5rem;font-weight:900;letter-spacing:.16em}.g70__exit{color:#9c805b;text-decoration:none}@media(max-width:850px){.g70__grid{grid-template-columns:1fr}.g70__manifest{grid-template-columns:1fr 1fr}}@media(max-width:520px){.g70__shell{width:min(100% - 24px,700px)}.g70__top{padding:0 16px}.g70__secret{display:none}.g70__receiver{padding:16px}.g70__controls{grid-template-columns:auto auto}.g70__volume{grid-column:1/-1;justify-content:flex-start}.g70__volume input{width:100%}.g70__manifest{grid-template-columns:1fr}.g70__bottom{display:block}.g70__exit{display:inline-block;margin-top:12px}}
      `}</style>
      <header className="g70__top"><Link className="g70__brand" to="/">GUIROPA RADIO</Link><span className="g70__secret">PRIVATE FREQUENCY · 1970—1979</span></header>
      <div className="g70__shell">
        <div className="g70__kicker">GUIROPA RADIO™ · 24 HOURS · CONTINUOUS</div>
        <div className="g70__grid">
          <section><h1 className="g70__title">70s<span>Tunnel™</span></h1><p className="g70__lead">Uma década inteira sem escolher lados. Rock, pop, soul, funk, disco, soft rock, baladas e tudo aquilo que fez os anos 70 soarem como nenhum outro lugar.</p><div className="g70__year">still somewhere in 1977.</div></section>
          <section className="g70__receiver">
            <div className="g70__display"><div className="g70__status"><span>{status}</span><span>1970—1979</span></div><div className="g70__station">{SIGNALS[signalIndex].name}</div><div className="g70__note">{SIGNALS[signalIndex].note} · CONTINUOUS SIGNAL</div><div className="g70__dial"/><div className="g70__years"><span>70</span><span>72</span><span>74</span><span>76</span><span>78</span><span>79</span></div></div>
            <div className="g70__controls"><button className="g70__btn g70__play" type="button" onClick={playing ? pause : start}>{playing ? "Ⅱ PAUSE" : "▶ PLAY"}</button><button className="g70__btn" type="button" onClick={retry}>RETRY</button><label className="g70__volume">VOL <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e)=>setVolume(Number(e.target.value))}/></label></div>
            <div className="g70__manifest"><div><strong>FULL DECADE</strong><span>1970—1979</span></div><div><strong>ALL STYLES</strong><span>NO GENRE WALLS</span></div><div><strong>CONTINUOUS</strong><span>24 HOURS</span></div></div>
            <audio ref={audioRef} preload="none" onPlaying={()=>{setPlaying(true);setStatus("ON AIR")}} onPause={()=>{setPlaying(false);setStatus(s=>s==="ERROR"?s:"PAUSED")}} onWaiting={()=>setStatus("BUFFERING")} onStalled={()=>setStatus("BUFFERING")} onError={()=>{setPlaying(false);setStatus("ERROR")}}/>
          </section>
        </div>
        <div className="g70__bottom"><span>FREQUENCY LOCKED · 1970—1979</span><Link className="g70__exit" to="/">EXIT TUNNEL →</Link></div>
      </div>
    </main>
  );
}
