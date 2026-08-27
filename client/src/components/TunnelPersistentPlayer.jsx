import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";

const CHANNELS = [
  { name: "80s POP", note: "BIG HITS", url: "https://listen.181fm.com/181-awesome80s_128k.mp3" },
  { name: "80s BALLADS", note: "SOFT SIGNAL", url: "https://listen.181fm.com/181-lite80s_128k.mp3" },
  { name: "80s COUNTRY", note: "OPEN ROAD", url: "https://listen.181fm.com/181-80scountry_128k.mp3" },
  { name: "80s SOUL", note: "LATE NIGHT", url: "https://listen.181fm.com/181-80sliternb_128k.mp3" },
  { name: "80s R&B", note: "SOUL SIGNAL", url: "https://listen.181fm.com/181-80srnb_128k.mp3" },
  { name: "80s ROCK", note: "LOUD SIGNAL", url: "https://listen.181fm.com/181-hairband_128k.mp3" },
];

const PLAYER_ART = assetUrl("assets/guiropa-radio-player-artdeco.jpg");
const HIDDEN_PATHS = new Set(["", "/", "/70s", "/1977", "/1986"]);

export default function TunnelPersistentPlayer() {
  const location = useLocation();
  const audioRef = useRef(null);
  const [channelIndex, setChannelIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("PRONTA");
  const [volume, setVolume] = useState(0.82);

  const channel = CHANNELS[channelIndex];
  const normalizedPath = location.pathname.replace(/\/+$/, "").toLowerCase();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  useEffect(() => () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
  }, []);

  async function play() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.src !== channel.url) {
      audio.src = channel.url;
      audio.load();
    }

    setStatus("CONECTANDO");

    try {
      await audio.play();
    } catch (error) {
      console.warn("GUIROPA tunnel stream failed:", error);
      setPlaying(false);
      setStatus("INDISPONÍVEL");
    }
  }

  function pause() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
    setStatus("PAUSADA");
  }

  function changeChannel(direction) {
    const next = (channelIndex + direction + CHANNELS.length) % CHANNELS.length;
    const audio = audioRef.current;
    const shouldResume = playing;

    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    setChannelIndex(next);
    setPlaying(false);
    setStatus("PRONTA");

    if (shouldResume) {
      window.setTimeout(async () => {
        const target = audioRef.current;
        if (!target) return;
        target.src = CHANNELS[next].url;
        target.load();
        setStatus("CONECTANDO");
        try {
          await target.play();
        } catch {
          setStatus("INDISPONÍVEL");
        }
      }, 0);
    }
  }

  if (HIDDEN_PATHS.has(normalizedPath)) return null;

  return (
    <>
      <style>{`
        .gtp{position:fixed;z-index:9999;left:50%;bottom:18px;transform:translateX(-50%);width:min(995px,calc(100% - 30px));min-height:86px;display:grid;grid-template-columns:150px minmax(220px,1.25fr) minmax(250px,1fr) auto;align-items:stretch;overflow:hidden;border:1px solid rgba(201,154,69,.68);border-radius:14px;background:linear-gradient(180deg,#171411 0%,#0c0b0a 55%,#15110e 100%);color:#f2e3c6;box-shadow:0 24px 72px rgba(39,26,15,.34),inset 0 1px 0 rgba(240,197,113,.13)}
        .gtp__art{overflow:hidden;border-right:1px solid rgba(201,154,69,.28);background:#0e0d0c}.gtp__art img{display:block;width:100%;height:100%;object-fit:cover;object-position:13% center}
        .gtp__info{min-width:0;display:flex;flex-direction:column;justify-content:center;padding:14px 17px}.gtp__status{display:flex;align-items:center;gap:8px;margin-bottom:7px;color:#e0bb70;font-size:8px;font-weight:900;letter-spacing:.18em}.gtp__dot{width:7px;height:7px;border-radius:50%;background:#bd3828;box-shadow:0 0 0 4px rgba(189,56,40,.11),0 0 12px rgba(189,56,40,.42)}.gtp__title{overflow:hidden;color:#f2dfbb;font-family:Georgia,serif;font-size:clamp(1.05rem,2vw,1.42rem);text-overflow:ellipsis;white-space:nowrap}.gtp__artist{margin-top:4px;color:#a89170;font-size:9px;letter-spacing:.08em}
        .gtp__dial{display:flex;align-items:center;padding:13px 17px;border-left:1px solid rgba(201,154,69,.16);border-right:1px solid rgba(201,154,69,.16)}.gtp__dialbox{position:relative;width:100%;padding:12px;border:1px solid rgba(201,154,69,.38);border-radius:8px;background:linear-gradient(180deg,#17120d,#2a190c);box-shadow:inset 0 0 18px rgba(214,138,35,.12)}.gtp__years{display:grid;grid-template-columns:repeat(6,1fr);gap:3px;color:#d9b36b;font-family:Georgia,serif;font-size:9px;text-align:center}.gtp__scale{position:relative;height:17px;margin-top:8px;border-top:1px solid rgba(214,138,35,.70);background:repeating-linear-gradient(90deg,transparent 0,transparent 8px,rgba(214,138,35,.72) 9px,rgba(214,138,35,.72) 10px)}.gtp__needle{position:absolute;top:3px;width:2px;height:28px;background:linear-gradient(180deg,#ffcf73,#c4611e);box-shadow:0 0 9px rgba(255,165,56,.68);transition:left .25s ease}
        .gtp__controls{display:grid;grid-template-columns:auto auto auto auto;align-items:center;gap:11px;padding:12px 15px}.gtp button{cursor:pointer}.gtp__play{width:46px;height:46px;border:1px solid #a9782e;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e4bb70 0%,#b27e31 36%,#65431d 76%,#2a1b0e 100%);color:#160f09;font-size:16px;font-weight:900}.gtp__next,.gtp__mute{width:34px;height:34px;border:1px solid rgba(201,154,69,.34);border-radius:50%;background:#1d1711;color:#d5af69}.gtp__volume{display:flex;align-items:center;gap:8px}.gtp__volume input{width:78px;accent-color:#c99a45}.gtp__open{min-height:40px;display:inline-flex;align-items:center;justify-content:center;padding:0 13px;border:1px solid rgba(201,154,69,.55);color:#e1bd76;font-size:8px;font-weight:900;letter-spacing:.13em;text-decoration:none;white-space:nowrap}
        @media(max-width:900px){.gtp{grid-template-columns:110px 1fr auto}.gtp__dial{display:none}.gtp__controls{grid-column:3}}@media(max-width:640px){.gtp{grid-template-columns:70px 1fr;bottom:10px;min-height:72px}.gtp__controls{grid-column:1/-1;border-top:1px solid rgba(201,154,69,.18);justify-content:center}.gtp__open{display:none}.gtp__volume input{width:90px}}
      `}</style>

      <aside className="gtp" aria-label="GUIROPA 80s Tunnel Player">
        <div className="gtp__art"><img src={PLAYER_ART} alt="GUIROPA RADIO" /></div>
        <div className="gtp__info">
          <div className="gtp__status"><span className="gtp__dot" />{status}</div>
          <span className="gtp__title">{channel.name}</span>
          <span className="gtp__artist">{channel.note} · 24 HOURS · CONTINUOUS</span>
        </div>
        <div className="gtp__dial">
          <div className="gtp__dialbox">
            <div className="gtp__years"><span>POP</span><span>BALLADS</span><span>COUNTRY</span><span>SOUL</span><span>R&B</span><span>ROCK</span></div>
            <div className="gtp__scale"><span className="gtp__needle" style={{ left: `${(channelIndex / (CHANNELS.length - 1)) * 100}%` }} /></div>
          </div>
        </div>
        <div className="gtp__controls">
          <button className="gtp__next" type="button" onClick={() => changeChannel(-1)} aria-label="Canal anterior">◀</button>
          <button className="gtp__play" type="button" onClick={playing ? pause : play} aria-label={playing ? "Pausar" : "Tocar"}>{playing ? "Ⅱ" : "▶"}</button>
          <button className="gtp__next" type="button" onClick={() => changeChannel(1)} aria-label="Próximo canal">▶</button>
          <div className="gtp__volume"><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></div>
          <Link className="gtp__open" to="/1986">ENTRAR NO TÚNEL</Link>
        </div>
        <audio ref={audioRef} preload="none" onPlaying={() => { setPlaying(true); setStatus("AO VIVO"); }} onPause={() => setPlaying(false)} onWaiting={() => setStatus("CONECTANDO")} onStalled={() => setStatus("CONECTANDO")} onError={() => { setPlaying(false); setStatus("INDISPONÍVEL"); }} />
      </aside>
    </>
  );
}
