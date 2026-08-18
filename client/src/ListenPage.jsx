import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_LOGO_SRC } from "../data/brandAssets.js";

const STREAM_URL =
  import.meta.env.VITE_GUIROPA_STREAM_URL || "";

const METADATA_URL =
  import.meta.env.VITE_GUIROPA_METADATA_URL || "";

const STORAGE_VOLUME = "guiropa-radio-volume";
const STORAGE_FAVORITE = "guiropa-radio-favorite";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeMetadata(data) {
  if (!data || typeof data !== "object") {
    return {
      title: "",
      artist: "",
      artwork: "",
    };
  }

  const title =
    data.title ||
    data.song ||
    data.track ||
    data.currentSong ||
    data.current_track ||
    data.nowPlaying ||
    "";

  const artist =
    data.artist ||
    data.performer ||
    data.currentArtist ||
    data.current_artist ||
    "";

  const artwork =
    data.artwork ||
    data.cover ||
    data.image ||
    data.albumArt ||
    data.album_art ||
    "";

  return {
    title: String(title || "").trim(),
    artist: String(artist || "").trim(),
    artwork: String(artwork || "").trim(),
  };
}

export default function ListenPage() {
  const { t } = useLanguage();

  const audioRef = useRef(null);
  const reconnectTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [volume, setVolume] = useState(() => {
    if (typeof window === "undefined") return 0.82;

    const saved = Number(
      localStorage.getItem(STORAGE_VOLUME)
    );

    if (Number.isFinite(saved)) {
      return clamp(saved, 0, 1);
    }

    return 0.82;
  });

  const [status, setStatus] = useState(
    STREAM_URL ? "ready" : "waiting"
  );

  const [favorite, setFavorite] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      localStorage.getItem(STORAGE_FAVORITE) ===
      "true"
    );
  });

  const [nowPlaying, setNowPlaying] = useState({
    title: "",
    artist: "",
    artwork: "",
  });

  const [recentTracks, setRecentTracks] = useState([]);

  const displayTitle =
    nowPlaying.title || "GUIROPA RADIO";

  const displayArtist =
    nowPlaying.artist ||
    "1950 — 1990 · Soft Rock · Rock Ballads · Classic Hits";

  const statusText = useMemo(() => {
    switch (status) {
      case "playing":
        return "LIVE";
      case "loading":
        return "CONECTANDO";
      case "reconnecting":
        return "RECONECTANDO";
      case "error":
        return "TRANSMISSÃO INDISPONÍVEL";
      case "waiting":
        return "STREAM EM PREPARAÇÃO";
      default:
        return "PRONTA";
    }
  }, [status]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_VOLUME,
      String(volume)
    );
  }, [volume]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_FAVORITE,
      String(favorite)
    );
  }, [favorite]);

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!METADATA_URL) return;

    let cancelled = false;

    async function loadMetadata() {
      try {
        const response = await fetch(
          `${METADATA_URL}${
            METADATA_URL.includes("?") ? "&" : "?"
          }_=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Metadata HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (cancelled) return;

        const next = normalizeMetadata(data);

        setNowPlaying((previous) => {
          const changed =
            next.title &&
            (
              next.title !== previous.title ||
              next.artist !== previous.artist
            );

          if (
            changed &&
            previous.title
          ) {
            setRecentTracks((items) => {
              const entry = {
                id: `${previous.artist}-${previous.title}-${Date.now()}`,
                title: previous.title,
                artist: previous.artist,
                artwork: previous.artwork,
              };

              return [
                entry,
                ...items,
              ].slice(0, 5);
            });
          }

          return {
            title:
              next.title || previous.title,
            artist:
              next.artist || previous.artist,
            artwork:
              next.artwork || previous.artwork,
          };
        });
      } catch (error) {
        console.warn(
          "GUIROPA metadata unavailable:",
          error
        );
      }
    }

    loadMetadata();

    const interval = setInterval(
      loadMetadata,
      15000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  async function playStream() {
    const audio = audioRef.current;

    if (!audio || !STREAM_URL) {
      setStatus("waiting");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("loading");

      if (!audio.src) {
        audio.src = STREAM_URL;
      }

      await audio.play();

      setIsPlaying(true);
      setStatus("playing");
    } catch (error) {
      console.warn(
        "GUIROPA stream play failed:",
        error
      );

      setIsPlaying(false);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  function pauseStream() {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();

    setIsPlaying(false);
    setStatus("ready");
  }

  function togglePlayback() {
    if (isPlaying) {
      pauseStream();
    } else {
      playStream();
    }
  }

  function scheduleReconnect() {
    if (
      !STREAM_URL ||
      reconnectTimerRef.current
    ) {
      return;
    }

    setStatus("reconnecting");

    reconnectTimerRef.current =
      setTimeout(async () => {
        reconnectTimerRef.current = null;

        const audio = audioRef.current;

        if (!audio) return;

        try {
          audio.src = STREAM_URL;

          if (isPlaying) {
            await audio.play();
            setStatus("playing");
          } else {
            setStatus("ready");
          }
        } catch {
          setStatus("error");
        }
      }, 3000);
  }

  function handleVolume(event) {
    const nextVolume =
      clamp(
        Number(event.target.value),
        0,
        1
      );

    setVolume(nextVolume);

    if (nextVolume > 0) {
      setIsMuted(false);
    }
  }

  function toggleMute() {
    setIsMuted((current) => !current);
  }

  return (
    <main className="guiropa-listen-page">
      <style>{`
        .guiropa-listen-page {
          --listen-ink: #201d19;
          --listen-soft: #6e6253;
          --listen-paper: #f4ead8;
          --listen-paper-2: #ead9bb;
          --listen-red: #a92f25;
          --listen-gold: #b18a43;
          --listen-panel: #151515;
          --listen-panel-soft: #24211e;
          --listen-line: rgba(58, 46, 36, .18);

          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255,255,255,.58),
              transparent 34%
            ),
            linear-gradient(
              180deg,
              #f7efdf 0%,
              var(--listen-paper) 58%,
              #e8d5b7 100%
            );

          color: var(--listen-ink);
        }

        .guiropa-listen-page *,
        .guiropa-listen-page *::before,
        .guiropa-listen-page *::after {
          box-sizing: border-box;
        }

        .guiropa-listen-shell {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 72px 0 110px;
        }

        .guiropa-listen-intro {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(260px, 390px);
          gap: 48px;
          align-items: end;
          padding-bottom: 40px;
          border-bottom:
            1px solid var(--listen-line);
        }

        .guiropa-listen-kicker {
          display: block;
          margin-bottom: 18px;
          color: var(--listen-red);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .guiropa-listen-intro h1 {
          margin: 0;
          max-width: 780px;
          font-size:
            clamp(44px, 7vw, 92px);
          line-height: .92;
          letter-spacing: -.05em;
          color: var(--listen-ink);
        }

        .guiropa-listen-intro p {
          max-width: 690px;
          margin: 28px 0 0;
          color: var(--listen-soft);
          font-size:
            clamp(17px, 2vw, 21px);
          line-height: 1.6;
        }

        .guiropa-listen-brand {
          display: flex;
          justify-content: flex-end;
        }

        .guiropa-listen-brand img {
          display: block;
          width: min(100%, 300px);
          height: auto;
          object-fit: contain;
        }

        .guiropa-radio-console {
          margin-top: 46px;
          overflow: hidden;
          border:
            1px solid rgba(73, 56, 39, .26);
          border-radius: 30px;

          background:
            linear-gradient(
              145deg,
              #2c241d 0%,
              #171513 46%,
              #24201c 100%
            );

          box-shadow:
            0 34px 80px
            rgba(52, 39, 27, .22);
        }

        .guiropa-console-top {
          display: grid;
          grid-template-columns:
            minmax(260px, 390px)
            minmax(0, 1fr);
        }

        .guiropa-cover {
          min-height: 390px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #c5a262,
              #72552f
            );
        }

        .guiropa-cover::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 28%,
              rgba(255,255,255,.30),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              transparent,
              rgba(0,0,0,.24)
            );
          pointer-events: none;
        }

        .guiropa-cover img {
          width: 100%;
          height: 100%;
          min-height: 390px;
          object-fit: cover;
        }

        .guiropa-cover-fallback {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #17120d;
        }

        .guiropa-cover-fallback strong {
          display: block;
          font-size: 42px;
          letter-spacing: -.05em;
        }

        .guiropa-cover-fallback span {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .guiropa-console-display {
          min-width: 0;
          padding:
            clamp(34px, 5vw, 68px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          color: #f3eadc;
        }

        .guiropa-live-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .guiropa-live-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .guiropa-live-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--listen-red);

          box-shadow:
            0 0 0 5px
            rgba(169, 47, 37, .15);
        }

        .guiropa-favorite {
          border: 0;
          background: transparent;
          color: #d7c7b3;
          font-size: 28px;
          cursor: pointer;
          transition:
            transform .2s ease,
            color .2s ease;
        }

        .guiropa-favorite:hover {
          transform: scale(1.08);
        }

        .guiropa-favorite.is-active {
          color: #d24b3f;
        }

        .guiropa-now-playing-label {
          margin-top: 64px;
          color: #a99782;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .guiropa-track-title {
          margin:
            12px 0 0;
          max-width: 720px;

          font-size:
            clamp(34px, 5vw, 66px);
          line-height: .98;
          letter-spacing: -.045em;
          overflow-wrap: anywhere;
        }

        .guiropa-track-artist {
          margin: 18px 0 0;
          max-width: 670px;
          color: #c5b7a5;
          font-size:
            clamp(15px, 1.7vw, 20px);
          line-height: 1.5;
        }

        .guiropa-console-controls {
          display: grid;
          grid-template-columns:
            auto minmax(0, 1fr) auto;
          gap: 26px;
          align-items: center;

          padding:
            25px clamp(26px, 4vw, 52px);

          border-top:
            1px solid rgba(255,255,255,.08);

          background:
            rgba(0,0,0,.24);
        }

        .guiropa-play-button {
          width: 74px;
          height: 74px;
          display: grid;
          place-items: center;

          border:
            1px solid rgba(255,255,255,.16);
          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #b88a43,
              #7b582b
            );

          color: #fff7e8;
          font-size: 28px;
          cursor: pointer;

          box-shadow:
            0 9px 24px
            rgba(0,0,0,.26);

          transition:
            transform .18s ease,
            filter .18s ease;
        }

        .guiropa-play-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.07);
        }

        .guiropa-play-button:disabled {
          cursor: not-allowed;
          opacity: .54;
        }

        .guiropa-console-message {
          min-width: 0;
        }

        .guiropa-console-message strong {
          display: block;
          color: #f4eadd;
          font-size: 14px;
          letter-spacing: .05em;
        }

        .guiropa-console-message span {
          display: block;
          margin-top: 5px;
          color: #9f9180;
          font-size: 12px;
          line-height: 1.45;
        }

        .guiropa-volume {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .guiropa-volume button {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background:
            rgba(255,255,255,.07);
          color: #eadfce;
          cursor: pointer;
        }

        .guiropa-volume input {
          width: 120px;
          accent-color:
            var(--listen-gold);
          cursor: pointer;
        }

        .guiropa-recent {
          padding-top: 56px;
        }

        .guiropa-recent-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 30px;
          padding-bottom: 20px;
          border-bottom:
            1px solid var(--listen-line);
        }

        .guiropa-recent-head span {
          color: var(--listen-red);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .20em;
          text-transform: uppercase;
        }

        .guiropa-recent-head h2 {
          margin: 8px 0 0;
          font-size:
            clamp(30px, 4vw, 50px);
          letter-spacing: -.04em;
        }

        .guiropa-recent-grid {
          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));
          border-bottom:
            1px solid var(--listen-line);
        }

        .guiropa-recent-item {
          min-width: 0;
          padding:
            25px 20px 28px;

          border-right:
            1px solid var(--listen-line);
        }

        .guiropa-recent-item:last-child {
          border-right: 0;
        }

        .guiropa-recent-index {
          color: var(--listen-gold);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .16em;
        }

        .guiropa-recent-item h3 {
          margin: 18px 0 0;
          font-size: 18px;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }

        .guiropa-recent-item p {
          margin: 8px 0 0;
          color: var(--listen-soft);
          font-size: 13px;
          line-height: 1.45;
        }

        .guiropa-recent-empty {
          grid-column: 1 / -1;
          padding: 36px 0;
          color: var(--listen-soft);
          font-size: 15px;
        }

        .guiropa-signal-strip {
          display: grid;
          grid-template-columns:
            repeat(5, 1fr);
          margin-top: 56px;
          border-top:
            1px solid var(--listen-line);
          border-bottom:
            1px solid var(--listen-line);
        }

        .guiropa-signal-strip div {
          padding: 22px 18px;
          text-align: center;
          border-right:
            1px solid var(--listen-line);
        }

        .guiropa-signal-strip div:last-child {
          border-right: 0;
        }

        .guiropa-signal-strip strong {
          display: block;
          font-size: 22px;
        }

        .guiropa-signal-strip span {
          display: block;
          margin-top: 5px;
          color: var(--listen-soft);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .guiropa-signal-strip div:nth-child(1) strong {
          color: #b83224;
        }

        .guiropa-signal-strip div:nth-child(2) strong {
          color: #267c7a;
        }

        .guiropa-signal-strip div:nth-child(3) strong {
          color: #d57a24;
        }

        .guiropa-signal-strip div:nth-child(4) strong {
          color: #e62e6b;
        }

        .guiropa-signal-strip div:nth-child(5) strong {
          color: #245a91;
        }

        @media (max-width: 900px) {
          .guiropa-listen-shell {
            width: min(100% - 24px, 720px);
            padding-top: 44px;
          }

          .guiropa-listen-intro {
            grid-template-columns: 1fr;
          }

          .guiropa-listen-brand {
            justify-content: flex-start;
          }

          .guiropa-listen-brand img {
            width: 210px;
          }

          .guiropa-console-top {
            grid-template-columns: 1fr;
          }

          .guiropa-cover {
            min-height: 300px;
          }

          .guiropa-cover img {
            min-height: 300px;
          }

          .guiropa-now-playing-label {
            margin-top: 42px;
          }

          .guiropa-console-controls {
            grid-template-columns:
              auto minmax(0, 1fr);
          }

          .guiropa-volume {
            grid-column: 1 / -1;
          }

          .guiropa-volume input {
            width: 100%;
          }

          .guiropa-recent-grid {
            grid-template-columns: 1fr;
          }

          .guiropa-recent-item {
            border-right: 0;
            border-bottom:
              1px solid var(--listen-line);
          }

          .guiropa-recent-item:last-child {
            border-bottom: 0;
          }

          .guiropa-signal-strip {
            grid-template-columns:
              repeat(5, minmax(70px, 1fr));
            overflow-x: auto;
          }
        }

        @media (max-width: 520px) {
          .guiropa-radio-console {
            border-radius: 20px;
          }

          .guiropa-console-display {
            padding: 30px 24px 36px;
          }

          .guiropa-console-controls {
            padding: 20px;
          }

          .guiropa-play-button {
            width: 62px;
            height: 62px;
          }
        }
      `}</style>

      <audio
        ref={audioRef}
        preload="none"
        playsInline
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
          setStatus("playing");
        }}
        onPause={() => {
          setIsPlaying(false);

          if (status !== "error") {
            setStatus(
              STREAM_URL
                ? "ready"
                : "waiting"
            );
          }
        }}
        onWaiting={() => {
          if (isPlaying) {
            setStatus("loading");
          }
        }}
        onStalled={scheduleReconnect}
        onError={() => {
          setIsPlaying(false);
          setIsLoading(false);
          setStatus("error");
          scheduleReconnect();
        }}
      />

      <div className="guiropa-listen-shell">
        <section className="guiropa-listen-intro">
          <div>
            <span className="guiropa-listen-kicker">
              GUIROPA RADIO · ON AIR
            </span>

            <h1>
              {t.listen?.title ||
                "Ouça a GUIROPA."}
            </h1>

            <p>
              A música que atravessou gerações.
              1950 → 1990. Soft rock,
              rock ballads, classic hits e
              grandes vozes.
            </p>
          </div>

          <div className="guiropa-listen-brand">
            <img
              src={GUIROPA_LOGO_SRC}
              alt="GUIROPA RADIO"
            />
          </div>
        </section>

        <section
          className="guiropa-radio-console"
          aria-label="GUIROPA RADIO player"
        >
          <div className="guiropa-console-top">
            <div className="guiropa-cover">
              {nowPlaying.artwork ? (
                <img
                  src={nowPlaying.artwork}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="guiropa-cover-fallback">
                  <strong>G</strong>
                  <span>GUIROPA RADIO</span>
                </div>
              )}
            </div>

            <div className="guiropa-console-display">
              <div className="guiropa-live-row">
                <div className="guiropa-live-status">
                  <span className="guiropa-live-dot" />
                  <span>{statusText}</span>
                </div>

                <button
                  type="button"
                  className={`guiropa-favorite ${
                    favorite
                      ? "is-active"
                      : ""
                  }`}
                  aria-label={
                    favorite
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                  aria-pressed={favorite}
                  onClick={() =>
                    setFavorite(
                      (current) => !current
                    )
                  }
                >
                  {favorite ? "♥" : "♡"}
                </button>
              </div>

              <div>
                <div className="guiropa-now-playing-label">
                  NOW PLAYING
                </div>

                <h2 className="guiropa-track-title">
                  {displayTitle}
                </h2>

                <p className="guiropa-track-artist">
                  {displayArtist}
                </p>
              </div>
            </div>
          </div>

          <div className="guiropa-console-controls">
            <button
              type="button"
              className="guiropa-play-button"
              onClick={togglePlayback}
              disabled={
                !STREAM_URL ||
                isLoading
              }
              aria-label={
                isPlaying
                  ? "Pausar GUIROPA RADIO"
                  : "Ouvir GUIROPA RADIO"
              }
            >
              {isLoading
                ? "…"
                : isPlaying
                  ? "Ⅱ"
                  : "▶"}
            </button>

            <div className="guiropa-console-message">
              <strong>
                GET UP. TURN IT UP. GUIROPA.
              </strong>

              <span>
                {STREAM_URL
                  ? "Transmissão preparada para conexão ao stream oficial."
                  : "Motor do player pronto. Falta apenas informar o endpoint oficial do stream."}
              </span>
            </div>

            <div className="guiropa-volume">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={
                  isMuted
                    ? "Ativar som"
                    : "Silenciar"
                }
              >
                {isMuted ||
                volume === 0
                  ? "×"
                  : "◖"}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                aria-label="Volume"
              />
            </div>
          </div>
        </section>

        <section className="guiropa-recent">
          <div className="guiropa-recent-head">
            <div>
              <span>HISTORY</span>
              <h2>Recently played.</h2>
            </div>
          </div>

          <div className="guiropa-recent-grid">
            {recentTracks.length > 0 ? (
              recentTracks.map(
                (track, index) => (
                  <article
                    key={track.id}
                    className="guiropa-recent-item"
                  >
                    <span className="guiropa-recent-index">
                      0{index + 1}
                    </span>

                    <h3>
                      {track.title}
                    </h3>

                    <p>
                      {track.artist ||
                        "GUIROPA RADIO"}
                    </p>
                  </article>
                )
              )
            ) : (
              <div className="guiropa-recent-empty">
                O histórico aparecerá aqui
                automaticamente quando o
                endpoint de metadata estiver
                conectado.
              </div>
            )}
          </div>
        </section>

        <section
          className="guiropa-signal-strip"
          aria-label="GUIROPA timeline"
        >
          <div>
            <strong>1950</strong>
            <span>The Spark</span>
          </div>

          <div>
            <strong>1960</strong>
            <span>Everything Changed</span>
          </div>

          <div>
            <strong>1970</strong>
            <span>Golden Years</span>
          </div>

          <div>
            <strong>1980</strong>
            <span>Timeless Hits</span>
          </div>

          <div>
            <strong>1990</strong>
            <span>The Final Stop</span>
          </div>
        </section>
      </div>
    </main>
  );
}
