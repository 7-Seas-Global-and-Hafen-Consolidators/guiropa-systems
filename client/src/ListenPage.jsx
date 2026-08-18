import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useLanguage } from "./i18n/LanguageContext.jsx";
import { assetUrl } from "./utils/assetUrl.js";

const STREAM_URL =
  import.meta.env.VITE_GUIROPA_STREAM_URL || "";

const METADATA_URL =
  import.meta.env.VITE_GUIROPA_METADATA_URL || "";

const STORAGE_VOLUME = "guiropa-radio-volume";
const STORAGE_FAVORITE = "guiropa-radio-favorite";

const PLAYER_ART =
  assetUrl("assets/guiropa-radio-player-artdeco.jpg");

const LISTEN_COPY = {
  pt: {
    kicker: "GUIROPA RADIO · NO AR",

    lead:
      "A música que atravessou gerações. 1950 → 1990. Soft rock, rock ballads, classic hits e grandes vozes.",

    nowPlaying: "TOCANDO AGORA",

    ready: "PRONTA",
    live: "AO VIVO",
    connecting: "CONECTANDO",
    reconnecting: "RECONECTANDO",
    unavailable: "TRANSMISSÃO INDISPONÍVEL",
    waiting: "STREAM EM PREPARAÇÃO",

    stationFallback:
      "1950 — 1990 · Soft Rock · Rock Ballads · Classic Hits",

    favoriteAdd: "Adicionar aos favoritos",
    favoriteRemove: "Remover dos favoritos",

    play: "Ouvir GUIROPA RADIO",
    pause: "Pausar GUIROPA RADIO",

    mute: "Silenciar",
    unmute: "Ativar som",
    volume: "Volume",

    engineReady:
      "Motor do player pronto. Falta apenas informar o endpoint oficial do stream.",

    streamReady:
      "Transmissão preparada para conexão ao stream oficial.",

    historyEyebrow: "HISTÓRICO",
    historyTitle: "Tocadas recentemente.",

    historyEmpty:
      "O histórico aparecerá aqui automaticamente quando o endpoint de metadata estiver conectado.",

    decadesLabel: "Linha do tempo GUIROPA",

    decade50: "A faísca",
    decade60: "Tudo mudou",
    decade70: "Anos dourados",
    decade80: "Hits eternos",
    decade90: "A última parada",
  },

  en: {
    kicker: "GUIROPA RADIO · ON AIR",

    lead:
      "The music that crossed generations. 1950 → 1990. Soft rock, rock ballads, classic hits and great voices.",

    nowPlaying: "NOW PLAYING",

    ready: "READY",
    live: "LIVE",
    connecting: "CONNECTING",
    reconnecting: "RECONNECTING",
    unavailable: "BROADCAST UNAVAILABLE",
    waiting: "STREAM IN PREPARATION",

    stationFallback:
      "1950 — 1990 · Soft Rock · Rock Ballads · Classic Hits",

    favoriteAdd: "Add to favourites",
    favoriteRemove: "Remove from favourites",

    play: "Listen to GUIROPA RADIO",
    pause: "Pause GUIROPA RADIO",

    mute: "Mute",
    unmute: "Unmute",
    volume: "Volume",

    engineReady:
      "The player engine is ready. Only the official stream endpoint remains to be configured.",

    streamReady:
      "Broadcast prepared for connection to the official stream.",

    historyEyebrow: "HISTORY",
    historyTitle: "Recently played.",

    historyEmpty:
      "Listening history will appear here automatically when the metadata endpoint is connected.",

    decadesLabel: "GUIROPA timeline",

    decade50: "The Spark",
    decade60: "Everything Changed",
    decade70: "Golden Years",
    decade80: "Timeless Hits",
    decade90: "The Final Stop",
  },

  es: {
    kicker: "GUIROPA RADIO · AL AIRE",

    lead:
      "La música que atravesó generaciones. 1950 → 1990. Soft rock, rock ballads, classic hits y grandes voces.",

    nowPlaying: "SONANDO AHORA",

    ready: "LISTA",
    live: "EN VIVO",
    connecting: "CONECTANDO",
    reconnecting: "RECONECTANDO",
    unavailable: "TRANSMISIÓN NO DISPONIBLE",
    waiting: "STREAM EN PREPARACIÓN",

    stationFallback:
      "1950 — 1990 · Soft Rock · Rock Ballads · Classic Hits",

    favoriteAdd: "Añadir a favoritos",
    favoriteRemove: "Eliminar de favoritos",

    play: "Escuchar GUIROPA RADIO",
    pause: "Pausar GUIROPA RADIO",

    mute: "Silenciar",
    unmute: "Activar sonido",
    volume: "Volumen",

    engineReady:
      "El motor del player está listo. Solo falta configurar el endpoint oficial del stream.",

    streamReady:
      "Transmisión preparada para conectarse al stream oficial.",

    historyEyebrow: "HISTORIAL",
    historyTitle: "Reproducidas recientemente.",

    historyEmpty:
      "El historial aparecerá aquí automáticamente cuando el endpoint de metadata esté conectado.",

    decadesLabel: "Línea del tiempo GUIROPA",

    decade50: "La chispa",
    decade60: "Todo cambió",
    decade70: "Años dorados",
    decade80: "Éxitos eternos",
    decade90: "La última parada",
  },
};

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

function normalizeMetadata(data) {
  if (
    !data ||
    typeof data !== "object"
  ) {
    return {
      title: "",
      artist: "",
      artwork: "",
    };
  }

  const source =
    data.now_playing ||
    data.nowPlaying ||
    data.current ||
    data.current_track ||
    data.currentTrack ||
    data.song ||
    data.track ||
    data;

  if (typeof source === "string") {
    const pieces =
      source
        .split(" - ")
        .map((part) =>
          part.trim()
        );

    if (pieces.length >= 2) {
      return {
        artist:
          pieces.shift(),
        title:
          pieces.join(" - "),
        artwork: "",
      };
    }

    return {
      title:
        source.trim(),
      artist: "",
      artwork: "",
    };
  }

  if (
    !source ||
    typeof source !== "object"
  ) {
    return {
      title: "",
      artist: "",
      artwork: "",
    };
  }

  const nestedSong =
    source.song &&
    typeof source.song === "object"
      ? source.song
      : {};

  const title =
    source.title ||
    source.name ||
    source.track ||
    source.song_title ||
    source.songTitle ||
    nestedSong.title ||
    nestedSong.name ||
    "";

  const artist =
    source.artist ||
    source.performer ||
    source.author ||
    source.song_artist ||
    source.songArtist ||
    nestedSong.artist ||
    "";

  const artwork =
    source.artwork ||
    source.art ||
    source.cover ||
    source.image ||
    source.album_art ||
    source.albumArt ||
    nestedSong.artwork ||
    nestedSong.art ||
    "";

  return {
    title:
      String(
        title || ""
      ).trim(),

    artist:
      String(
        artist || ""
      ).trim(),

    artwork:
      String(
        artwork || ""
      ).trim(),
  };
}

export default function ListenPage() {
  const {
    t,
    lang,
  } = useLanguage();

  const copy =
    LISTEN_COPY[lang] ||
    LISTEN_COPY.pt;

  const audioRef =
    useRef(null);

  const reconnectTimerRef =
    useRef(null);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    isMuted,
    setIsMuted,
  ] = useState(false);

  const [
    volume,
    setVolume,
  ] = useState(() => {
    if (
      typeof window === "undefined"
    ) {
      return 0.82;
    }

    const saved =
      Number(
        localStorage.getItem(
          STORAGE_VOLUME
        )
      );

    if (
      Number.isFinite(saved)
    ) {
      return clamp(
        saved,
        0,
        1
      );
    }

    return 0.82;
  });

  const [
    status,
    setStatus,
  ] = useState(
    STREAM_URL
      ? "ready"
      : "waiting"
  );

  const [
    favorite,
    setFavorite,
  ] = useState(() => {
    if (
      typeof window === "undefined"
    ) {
      return false;
    }

    return (
      localStorage.getItem(
        STORAGE_FAVORITE
      ) === "true"
    );
  });

  const [
    nowPlaying,
    setNowPlaying,
  ] = useState({
    title: "",
    artist: "",
    artwork: "",
  });

  const [
    recentTracks,
    setRecentTracks,
  ] = useState([]);

  const displayTitle =
    nowPlaying.title ||
    "GUIROPA RADIO";

  const displayArtist =
    nowPlaying.artist ||
    copy.stationFallback;

  const statusText =
    useMemo(() => {
      switch (status) {
        case "playing":
          return copy.live;

        case "loading":
          return copy.connecting;

        case "reconnecting":
          return copy.reconnecting;

        case "error":
          return copy.unavailable;

        case "waiting":
          return copy.waiting;

        default:
          return copy.ready;
      }
    }, [
      status,
      copy,
    ]);

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume =
      volume;

    audio.muted =
      isMuted;
  }, [
    volume,
    isMuted,
  ]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_VOLUME,
        String(volume)
      );
    } catch {
      // Ignora.
    }
  }, [volume]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_FAVORITE,
        String(favorite)
      );
    } catch {
      // Ignora.
    }
  }, [favorite]);

  useEffect(() => {
    return () => {
      if (
        reconnectTimerRef.current
      ) {
        clearTimeout(
          reconnectTimerRef.current
        );
      }
    };
  }, []);

  useEffect(() => {
    if (!METADATA_URL) {
      return undefined;
    }

    let cancelled =
      false;

    async function loadMetadata() {
      try {
        const separator =
          METADATA_URL.includes("?")
            ? "&"
            : "?";

        const response =
          await fetch(
            `${METADATA_URL}${separator}_=${Date.now()}`,
            {
              cache:
                "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            `Metadata HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        if (cancelled) {
          return;
        }

        const next =
          normalizeMetadata(
            data
          );

        setNowPlaying(
          (previous) => {
            const changed =
              next.title &&
              (
                next.title !==
                  previous.title ||
                next.artist !==
                  previous.artist
              );

            if (
              changed &&
              previous.title
            ) {
              setRecentTracks(
                (items) => {
                  const entry = {
                    id:
                      `${previous.artist}-${previous.title}-${Date.now()}`,

                    title:
                      previous.title,

                    artist:
                      previous.artist,

                    artwork:
                      previous.artwork,
                  };

                  const filtered =
                    items.filter(
                      (item) =>
                        !(
                          item.title ===
                            entry.title &&
                          item.artist ===
                            entry.artist
                        )
                    );

                  return [
                    entry,
                    ...filtered,
                  ].slice(
                    0,
                    5
                  );
                }
              );
            }

            return {
              title:
                next.title ||
                previous.title,

              artist:
                next.artist ||
                previous.artist,

              artwork:
                next.artwork ||
                previous.artwork,
            };
          }
        );
      } catch (error) {
        console.warn(
          "GUIROPA metadata unavailable:",
          error
        );
      }
    }

    loadMetadata();

    const interval =
      setInterval(
        loadMetadata,
        15000
      );

    return () => {
      cancelled =
        true;

      clearInterval(
        interval
      );
    };
  }, []);

  async function playStream() {
    const audio =
      audioRef.current;

    if (
      !audio ||
      !STREAM_URL
    ) {
      setStatus(
        "waiting"
      );

      return;
    }

    try {
      setIsLoading(
        true
      );

      setStatus(
        "loading"
      );

      if (!audio.src) {
        audio.src =
          STREAM_URL;
      }

      await audio.play();

      setIsPlaying(
        true
      );

      setStatus(
        "playing"
      );
    } catch (error) {
      console.warn(
        "GUIROPA stream play failed:",
        error
      );

      setIsPlaying(
        false
      );

      setStatus(
        "error"
      );
    } finally {
      setIsLoading(
        false
      );
    }
  }

  function pauseStream() {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();

    setIsPlaying(
      false
    );

    setStatus(
      STREAM_URL
        ? "ready"
        : "waiting"
    );
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

    setStatus(
      "reconnecting"
    );

    reconnectTimerRef.current =
      setTimeout(
        async () => {
          reconnectTimerRef.current =
            null;

          const audio =
            audioRef.current;

          if (!audio) {
            return;
          }

          try {
            audio.src =
              STREAM_URL;

            if (isPlaying) {
              await audio.play();

              setStatus(
                "playing"
              );
            } else {
              setStatus(
                "ready"
              );
            }
          } catch {
            setStatus(
              "error"
            );
          }
        },
        3000
      );
  }

  function handleVolume(
    event
  ) {
    const nextVolume =
      clamp(
        Number(
          event.target.value
        ),
        0,
        1
      );

    setVolume(
      nextVolume
    );

    if (
      nextVolume > 0
    ) {
      setIsMuted(
        false
      );
    }
  }

  function toggleMute() {
    setIsMuted(
      (current) =>
        !current
    );
  }

  return (
    <main className="guiropa-listen-page">
      <style>{`
        /* ======================================================
           GUIROPA RADIO
           LISTEN PAGE — ART DECO RECEIVER
           ====================================================== */

        .guiropa-listen-page {
          --paper: #f5ead6;
          --paper-deep: #ead1aa;

          --ink: #201a15;
          --soft: #756451;

          --red: #b83224;

          --gold: #c99a45;
          --gold-light: #e1bd76;
          --gold-dark: #76501f;

          --amber: #d98a21;

          --black: #0d0c0b;
          --black-two: #17130f;
          --black-three: #231a12;

          --line:
            rgba(
              80,
              59,
              40,
              0.18
            );

          min-height:
            100vh;

          color:
            var(--ink);

          background:
            radial-gradient(
              ellipse
              at 50% 0%,
              rgba(
                255,
                255,
                255,
                0.60
              ),
              transparent
              37%
            ),
            linear-gradient(
              180deg,
              #f8efdf
              0%,
              var(--paper)
              56%,
              var(--paper-deep)
              100%
            );
        }

        .guiropa-listen-page *,
        .guiropa-listen-page *::before,
        .guiropa-listen-page *::after {
          box-sizing:
            border-box;
        }

        .guiropa-listen-shell {
          width:
            min(
              1180px,
              calc(
                100% - 40px
              )
            );

          margin:
            0 auto;

          padding:
            72px
            0
            110px;
        }

        /* =========================
           INTRO
           ========================= */

        .guiropa-listen-intro {
          display:
            grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            260px;

          gap:
            56px;

          align-items:
            end;

          padding-bottom:
            44px;

          border-bottom:
            1px solid
            var(--line);
        }

        .guiropa-listen-kicker {
          display:
            block;

          margin-bottom:
            18px;

          color:
            var(--red);

          font-size:
            11px;

          font-weight:
            900;

          letter-spacing:
            0.22em;

          text-transform:
            uppercase;
        }

        .guiropa-listen-intro h1 {
          margin:
            0;

          max-width:
            800px;

          color:
            var(--ink);

          font-size:
            clamp(
              48px,
              7vw,
              92px
            );

          font-weight:
            800;

          line-height:
            0.90;

          letter-spacing:
            -0.055em;
        }

        .guiropa-listen-intro p {
          max-width:
            700px;

          margin:
            28px
            0
            0;

          color:
            var(--soft);

          font-size:
            clamp(
              17px,
              1.8vw,
              21px
            );

          line-height:
            1.6;
        }

        .guiropa-listen-brand {
          display:
            flex;

          justify-content:
            flex-end;

          align-items:
            flex-end;
        }

        .guiropa-listen-brand img {
          display:
            block;

          width:
            220px;

          max-width:
            100%;

          height:
            auto;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.22
            );

          box-shadow:
            0
            16px
            32px
            rgba(
              53,
              35,
              21,
              0.16
            );
        }

        /* =========================
           RECEIVER ART DECO
           ========================= */

        .guiropa-radio-receiver {
          position:
            relative;

          margin-top:
            46px;

          overflow:
            hidden;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.72
            );

          border-radius:
            18px;

          color:
            #f4e4c6;

          background:
            linear-gradient(
              180deg,
              #17130f
              0%,
              #0c0b0a
              52%,
              #16110d
              100%
            );

          box-shadow:
            0
            32px
            78px
            rgba(
              55,
              37,
              22,
              0.27
            ),
            inset
            0
            1px
            0
            rgba(
              240,
              198,
              119,
              0.13
            );

          isolation:
            isolate;
        }

        .guiropa-radio-receiver::before {
          content:
            "";

          position:
            absolute;

          inset:
            7px;

          z-index:
            0;

          pointer-events:
            none;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.20
            );

          border-radius:
            12px;
        }

        .guiropa-receiver-main {
          position:
            relative;

          z-index:
            1;

          display:
            grid;

          grid-template-columns:
            230px
            minmax(
              0,
              1fr
            )
            320px;

          min-height:
            340px;
        }

        /* =========================
           LEFT PANEL
           ========================= */

        .guiropa-receiver-art {
          position:
            relative;

          overflow:
            hidden;

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.26
            );

          background:
            #0b0a09;
        }

        .guiropa-receiver-art img {
          display:
            block;

          width:
            100%;

          height:
            100%;

          object-fit:
            cover;

          object-position:
            10% center;

          filter:
            brightness(
              0.96
            )
            contrast(
              1.08
            )
            saturate(
              1.04
            );
        }

        .guiropa-receiver-art::after {
          content:
            "";

          position:
            absolute;

          inset:
            0;

          pointer-events:
            none;

          background:
            linear-gradient(
              90deg,
              transparent
              45%,
              rgba(
                12,
                11,
                10,
                0.64
              )
              100%
            );
        }

        /* =========================
           CENTER DISPLAY
           ========================= */

        .guiropa-receiver-display {
          min-width:
            0;

          display:
            flex;

          flex-direction:
            column;

          justify-content:
            space-between;

          padding:
            36px
            clamp(
              28px,
              4vw,
              52px
            );

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.18
            );
        }

        .guiropa-live-row {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            20px;
        }

        .guiropa-live-status {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            9px;

          color:
            var(--gold-light);

          font-size:
            10px;

          font-weight:
            900;

          letter-spacing:
            0.18em;

          text-transform:
            uppercase;
        }

        .guiropa-live-dot {
          width:
            8px;

          height:
            8px;

          flex:
            0
            0
            auto;

          border-radius:
            50%;

          background:
            var(--red);

          box-shadow:
            0
            0
            0
            5px
            rgba(
              184,
              50,
              36,
              0.12
            ),
            0
            0
            14px
            rgba(
              184,
              50,
              36,
              0.44
            );
        }

        .guiropa-favorite {
          width:
            40px;

          height:
            40px;

          display:
            grid;

          place-items:
            center;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.24
            );

          border-radius:
            50%;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            #cdb991;

          font-size:
            20px;

          cursor:
            pointer;

          transition:
            transform
            0.2s
            ease,
            color
            0.2s
            ease,
            border-color
            0.2s
            ease;
        }

        .guiropa-favorite:hover {
          transform:
            scale(
              1.06
            );

          border-color:
            rgba(
              225,
              189,
              118,
              0.54
            );
        }

        .guiropa-favorite.is-active {
          color:
            #d85045;
        }

        .guiropa-now-playing-label {
          margin-top:
            34px;

          color:
            #a78f6f;

          font-size:
            10px;

          font-weight:
            900;

          letter-spacing:
            0.22em;

          text-transform:
            uppercase;
        }

        .guiropa-track-title {
          margin:
            10px
            0
            0;

          max-width:
            650px;

          color:
            #f3dfb9;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              36px,
              5vw,
              64px
            );

          font-weight:
            400;

          line-height:
            0.98;

          letter-spacing:
            -0.04em;

          overflow-wrap:
            anywhere;
        }

        .guiropa-track-artist {
          margin:
            15px
            0
            0;

          max-width:
            620px;

          color:
            #af9b7c;

          font-size:
            clamp(
              14px,
              1.6vw,
              18px
            );

          line-height:
            1.5;
        }

        /* =========================
           RIGHT TUNING PANEL
           ========================= */

        .guiropa-tuning-panel {
          display:
            flex;

          flex-direction:
            column;

          justify-content:
            space-between;

          padding:
            34px
            28px;

          background:
            linear-gradient(
              180deg,
              rgba(
                201,
                154,
                69,
                0.035
              ),
              rgba(
                0,
                0,
                0,
                0
              )
            );
        }

        .guiropa-tuning-heading {
          color:
            #9d896d;

          font-size:
            9px;

          font-weight:
            900;

          letter-spacing:
            0.20em;

          text-transform:
            uppercase;
        }

        .guiropa-tuning-box {
          position:
            relative;

          margin-top:
            18px;

          padding:
            24px
            18px
            22px;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.42
            );

          border-radius:
            9px;

          background:
            linear-gradient(
              180deg,
              #16100b,
              #2b190b
            );

          box-shadow:
            inset
            0
            0
            25px
            rgba(
              217,
              138,
              33,
              0.13
            );
        }

        .guiropa-tuning-years {
          display:
            grid;

          grid-template-columns:
            repeat(
              5,
              1fr
            );

          gap:
            3px;

          color:
            #e0b86d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            11px;

          text-align:
            center;
        }

        .guiropa-tuning-scale {
          position:
            relative;

          height:
            48px;

          margin-top:
            15px;

          border-top:
            2px solid
            rgba(
              217,
              138,
              33,
              0.62
            );

          background:
            repeating-linear-gradient(
              90deg,
              transparent
              0,
              transparent
              10px,
              rgba(
                217,
                138,
                33,
                0.70
              )
              11px,
              rgba(
                217,
                138,
                33,
                0.70
              )
              12px
            );
        }

        .guiropa-tuning-needle {
          position:
            absolute;

          left:
            50%;

          top:
            -9px;

          width:
            2px;

          height:
            63px;

          transform:
            translateX(
              -50%
            );

          background:
            linear-gradient(
              180deg,
              #ffd17b,
              #cc621b
            );

          box-shadow:
            0
            0
            12px
            rgba(
              255,
              159,
              43,
              0.78
            );
        }

        .guiropa-tuning-caption {
          margin-top:
            14px;

          color:
            #79664f;

          font-size:
            8px;

          font-weight:
            800;

          letter-spacing:
            0.15em;

          text-align:
            center;

          text-transform:
            uppercase;
        }

        /* =========================
           CONTROL DECK
           ========================= */

        .guiropa-receiver-controls {
          position:
            relative;

          z-index:
            1;

          display:
            grid;

          grid-template-columns:
            auto
            minmax(
              0,
              1fr
            )
            auto;

          gap:
            28px;

          align-items:
            center;

          padding:
            22px
            clamp(
              24px,
              4vw,
              44px
            );

          border-top:
            1px solid
            rgba(
              201,
              154,
              69,
              0.23
            );

          background:
            linear-gradient(
              180deg,
              #100e0c,
              #090807
            );
        }

        .guiropa-play-button {
          width:
            70px;

          height:
            70px;

          display:
            grid;

          place-items:
            center;

          border:
            1px solid
            #aa782e;

          border-radius:
            50%;

          color:
            #160f08;

          background:
            radial-gradient(
              circle
              at 35% 28%,
              #efd18c
              0%,
              #c89443
              36%,
              #755021
              72%,
              #2b1b0d
              100%
            );

          font-size:
            24px;

          font-weight:
            900;

          cursor:
            pointer;

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              245,
              211,
              0.46
            ),
            0
            7px
            18px
            rgba(
              0,
              0,
              0,
              0.34
            );

          transition:
            transform
            0.18s
            ease,
            filter
            0.18s
            ease;
        }

        .guiropa-play-button:hover {
          transform:
            translateY(
              -2px
            );

          filter:
            brightness(
              1.08
            );
        }

        .guiropa-play-button:disabled {
          cursor:
            not-allowed;

          opacity:
            0.46;

          transform:
            none;
        }

        .guiropa-console-message {
          min-width:
            0;
        }

        .guiropa-console-message strong {
          display:
            block;

          color:
            #e5c889;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            17px;

          font-weight:
            400;

          letter-spacing:
            0.03em;
        }

        .guiropa-console-message span {
          display:
            block;

          margin-top:
            6px;

          color:
            #8f7e68;

          font-size:
            11px;

          line-height:
            1.45;
        }

        .guiropa-volume {
          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          padding-left:
            22px;

          border-left:
            1px solid
            rgba(
              201,
              154,
              69,
              0.17
            );
        }

        .guiropa-volume button {
          width:
            42px;

          height:
            42px;

          display:
            grid;

          place-items:
            center;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.31
            );

          border-radius:
            50%;

          background:
            #1c1610;

          color:
            #dfb96f;

          cursor:
            pointer;
        }

        .guiropa-volume input {
          width:
            125px;

          accent-color:
            var(--gold);

          cursor:
            pointer;
        }

        /* =========================
           RECENT HISTORY
           ========================= */

        .guiropa-recent {
          padding-top:
            62px;
        }

        .guiropa-recent-head {
          display:
            flex;

          justify-content:
            space-between;

          align-items:
            end;

          gap:
            30px;

          padding-bottom:
            22px;

          border-bottom:
            1px solid
            var(--line);
        }

        .guiropa-recent-head span {
          color:
            var(--red);

          font-size:
            10px;

          font-weight:
            900;

          letter-spacing:
            0.20em;

          text-transform:
            uppercase;
        }

        .guiropa-recent-head h2 {
          margin:
            8px
            0
            0;

          font-size:
            clamp(
              32px,
              4vw,
              50px
            );

          letter-spacing:
            -0.04em;
        }

        .guiropa-recent-grid {
          display:
            grid;

          grid-template-columns:
            repeat(
              5,
              minmax(
                0,
                1fr
              )
            );

          border-bottom:
            1px solid
            var(--line);
        }

        .guiropa-recent-item {
          min-width:
            0;

          padding:
            25px
            20px
            28px;

          border-right:
            1px solid
            var(--line);
        }

        .guiropa-recent-item:last-child {
          border-right:
            0;
        }

        .guiropa-recent-index {
          color:
            var(--gold-dark);

          font-size:
            10px;

          font-weight:
            900;

          letter-spacing:
            0.16em;
        }

        .guiropa-recent-item h3 {
          margin:
            18px
            0
            0;

          font-size:
            18px;

          line-height:
            1.25;

          overflow-wrap:
            anywhere;
        }

        .guiropa-recent-item p {
          margin:
            8px
            0
            0;

          color:
            var(--soft);

          font-size:
            13px;

          line-height:
            1.45;
        }

        .guiropa-recent-empty {
          grid-column:
            1
            /
            -1;

          padding:
            38px
            0;

          color:
            var(--soft);

          font-size:
            15px;
        }

        /* =========================
           DECADE STRIP
           ========================= */

        .guiropa-signal-strip {
          display:
            grid;

          grid-template-columns:
            repeat(
              5,
              1fr
            );

          margin-top:
            58px;

          border-top:
            1px solid
            var(--line);

          border-bottom:
            1px solid
            var(--line);
        }

        .guiropa-signal-strip div {
          padding:
            22px
            18px;

          text-align:
            center;

          border-right:
            1px solid
            var(--line);
        }

        .guiropa-signal-strip div:last-child {
          border-right:
            0;
        }

        .guiropa-signal-strip strong {
          display:
            block;

          font-size:
            22px;
        }

        .guiropa-signal-strip span {
          display:
            block;

          margin-top:
            5px;

          color:
            var(--soft);

          font-size:
            9px;

          font-weight:
            900;

          letter-spacing:
            0.15em;

          text-transform:
            uppercase;
        }

        .guiropa-signal-strip
        div:nth-child(1)
        strong {
          color:
            #b83224;
        }

        .guiropa-signal-strip
        div:nth-child(2)
        strong {
          color:
            #267c7a;
        }

        .guiropa-signal-strip
        div:nth-child(3)
        strong {
          color:
            #d57a24;
        }

        .guiropa-signal-strip
        div:nth-child(4)
        strong {
          color:
            #e62e6b;
        }

        .guiropa-signal-strip
        div:nth-child(5)
        strong {
          color:
            #245a91;
        }

        /* =========================
           RESPONSIVE
           ========================= */

        @media (
          max-width:
          1020px
        ) {
          .guiropa-receiver-main {
            grid-template-columns:
              180px
              minmax(
                0,
                1fr
              )
              270px;
          }
        }

        @media (
          max-width:
          900px
        ) {
          .guiropa-listen-shell {
            width:
              min(
                100% - 24px,
                720px
              );

            padding-top:
              44px;
          }

          .guiropa-listen-intro {
            grid-template-columns:
              1fr;
          }

          .guiropa-listen-brand {
            justify-content:
              flex-start;
          }

          .guiropa-listen-brand img {
            width:
              180px;
          }

          .guiropa-receiver-main {
            grid-template-columns:
              160px
              minmax(
                0,
                1fr
              );
          }

          .guiropa-tuning-panel {
            grid-column:
              1
              /
              -1;

            border-top:
              1px solid
              rgba(
                201,
                154,
                69,
                0.18
              );
          }

          .guiropa-receiver-display {
            border-right:
              0;
          }

          .guiropa-receiver-controls {
            grid-template-columns:
              auto
              minmax(
                0,
                1fr
              );
          }

          .guiropa-volume {
            grid-column:
              1
              /
              -1;

            padding:
              18px
              0
              0;

            border-left:
              0;

            border-top:
              1px solid
              rgba(
                201,
                154,
                69,
                0.16
              );
          }

          .guiropa-volume input {
            width:
              100%;
          }

          .guiropa-recent-grid {
            grid-template-columns:
              1fr;
          }

          .guiropa-recent-item {
            border-right:
              0;

            border-bottom:
              1px solid
              var(--line);
          }

          .guiropa-recent-item:last-child {
            border-bottom:
              0;
          }

          .guiropa-signal-strip {
            grid-template-columns:
              repeat(
                5,
                minmax(
                  70px,
                  1fr
                )
              );

            overflow-x:
              auto;
          }
        }

        @media (
          max-width:
          620px
        ) {
          .guiropa-receiver-main {
            grid-template-columns:
              1fr;
          }

          .guiropa-receiver-art {
            height:
              180px;

            border-right:
              0;

            border-bottom:
              1px solid
              rgba(
                201,
                154,
                69,
                0.22
              );
          }

          .guiropa-receiver-art img {
            object-position:
              center
              46%;
          }

          .guiropa-receiver-display {
            padding:
              30px
              24px;
          }

          .guiropa-tuning-panel {
            padding:
              26px
              22px;
          }

          .guiropa-receiver-controls {
            gap:
              18px;

            padding:
              20px;
          }

          .guiropa-play-button {
            width:
              60px;

            height:
              60px;

            font-size:
              20px;
          }
        }
      `}</style>

      <audio
        ref={audioRef}
        preload="none"
        playsInline
        onPlaying={() => {
          setIsPlaying(
            true
          );

          setIsLoading(
            false
          );

          setStatus(
            "playing"
          );
        }}
        onPause={() => {
          setIsPlaying(
            false
          );

          if (
            status !== "error"
          ) {
            setStatus(
              STREAM_URL
                ? "ready"
                : "waiting"
            );
          }
        }}
        onWaiting={() => {
          if (isPlaying) {
            setStatus(
              "loading"
            );
          }
        }}
        onStalled={
          scheduleReconnect
        }
        onError={() => {
          setIsPlaying(
            false
          );

          setIsLoading(
            false
          );

          setStatus(
            "error"
          );

          scheduleReconnect();
        }}
      />

      <div className="guiropa-listen-shell">
        <section className="guiropa-listen-intro">
          <div>
            <span className="guiropa-listen-kicker">
              {copy.kicker}
            </span>

            <h1>
              {t.listen.title}
            </h1>

            <p>
              {copy.lead}
            </p>
          </div>

          <div className="guiropa-listen-brand">
            <img
              src={PLAYER_ART}
              alt="GUIROPA RADIO Art Deco"
            />
          </div>
        </section>

        <section
          className="guiropa-radio-receiver"
          aria-label="GUIROPA RADIO"
        >
          <div className="guiropa-receiver-main">
            <div
              className="guiropa-receiver-art"
              aria-hidden="true"
            >
              <img
                src={
                  nowPlaying.artwork ||
                  PLAYER_ART
                }
                alt=""
                onError={(event) => {
                  event.currentTarget.src =
                    PLAYER_ART;
                }}
              />
            </div>

            <div className="guiropa-receiver-display">
              <div className="guiropa-live-row">
                <div className="guiropa-live-status">
                  <span className="guiropa-live-dot" />

                  <span>
                    {statusText}
                  </span>
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
                      ? copy.favoriteRemove
                      : copy.favoriteAdd
                  }
                  aria-pressed={
                    favorite
                  }
                  onClick={() =>
                    setFavorite(
                      (current) =>
                        !current
                    )
                  }
                >
                  {favorite
                    ? "♥"
                    : "♡"}
                </button>
              </div>

              <div>
                <div className="guiropa-now-playing-label">
                  {copy.nowPlaying}
                </div>

                <h2 className="guiropa-track-title">
                  {displayTitle}
                </h2>

                <p className="guiropa-track-artist">
                  {displayArtist}
                </p>
              </div>
            </div>

            <div className="guiropa-tuning-panel">
              <div>
                <div className="guiropa-tuning-heading">
                  GUIROPA RADIO · 1950 — 1990
                </div>

                <div className="guiropa-tuning-box">
                  <div className="guiropa-tuning-years">
                    <span>
                      1950
                    </span>

                    <span>
                      1960
                    </span>

                    <span>
                      1970
                    </span>

                    <span>
                      1980
                    </span>

                    <span>
                      1990
                    </span>
                  </div>

                  <div className="guiropa-tuning-scale">
                    <span className="guiropa-tuning-needle" />
                  </div>
                </div>

                <div className="guiropa-tuning-caption">
                  THE MUSIC THAT CROSSED GENERATIONS
                </div>
              </div>
            </div>
          </div>

          <div className="guiropa-receiver-controls">
            <button
              type="button"
              className="guiropa-play-button"
              onClick={
                togglePlayback
              }
              disabled={
                !STREAM_URL ||
                isLoading
              }
              aria-label={
                isPlaying
                  ? copy.pause
                  : copy.play
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
                  ? copy.streamReady
                  : copy.engineReady}
              </span>
            </div>

            <div className="guiropa-volume">
              <button
                type="button"
                onClick={
                  toggleMute
                }
                aria-label={
                  isMuted
                    ? copy.unmute
                    : copy.mute
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
                value={
                  volume
                }
                onChange={
                  handleVolume
                }
                aria-label={
                  copy.volume
                }
              />
            </div>
          </div>
        </section>

        <section className="guiropa-recent">
          <div className="guiropa-recent-head">
            <div>
              <span>
                {copy.historyEyebrow}
              </span>

              <h2>
                {copy.historyTitle}
              </h2>
            </div>
          </div>

          <div className="guiropa-recent-grid">
            {recentTracks.length > 0 ? (
              recentTracks.map(
                (
                  track,
                  index
                ) => (
                  <article
                    key={
                      track.id
                    }
                    className="guiropa-recent-item"
                  >
                    <span className="guiropa-recent-index">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
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
                {copy.historyEmpty}
              </div>
            )}
          </div>
        </section>

        <section
          className="guiropa-signal-strip"
          aria-label={
            copy.decadesLabel
          }
        >
          <div>
            <strong>
              1950
            </strong>

            <span>
              {copy.decade50}
            </span>
          </div>

          <div>
            <strong>
              1960
            </strong>

            <span>
              {copy.decade60}
            </span>
          </div>

          <div>
            <strong>
              1970
            </strong>

            <span>
              {copy.decade70}
            </span>
          </div>

          <div>
            <strong>
              1980
            </strong>

            <span>
              {copy.decade80}
            </span>
          </div>

          <div>
            <strong>
              1990
            </strong>

            <span>
              {copy.decade90}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
