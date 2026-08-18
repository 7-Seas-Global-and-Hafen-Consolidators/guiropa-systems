import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================================
   GUIROPA RADIO — GLOBAL PLAYER ENGINE
   Self-contained configuration
   ========================================================= */

const GUIROPA_STREAM_URL =
  import.meta.env.VITE_GUIROPA_STREAM_URL || "";

const GUIROPA_METADATA_URL =
  import.meta.env.VITE_GUIROPA_METADATA_URL || "";

const GUIROPA_METADATA_INTERVAL = 15000;
const GUIROPA_DEFAULT_VOLUME = 0.82;

const GUIROPA_STORAGE = {
  volume: "guiropa-radio-volume",
  muted: "guiropa-radio-muted",
  favorite: "guiropa-radio-favorite",
  recent: "guiropa-radio-recent",
};

const GUIROPA_STATION = {
  name: "GUIROPA RADIO",
  era: "1950 — 1990",
  format: "Soft Rock · Rock Ballads · Classic Hits",
  slogan: "GET UP. TURN IT UP. GUIROPA.",
};

const RadioPlayerContext = createContext(null);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function safeRead(key, fallback = null) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = localStorage.getItem(key);

    return value === null
      ? fallback
      : value;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      key,
      String(value)
    );
  } catch {
    // Storage indisponível.
  }
}

function readRecentTracks() {
  const raw = safeRead(
    GUIROPA_STORAGE.recent,
    "[]"
  );

  try {
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed.slice(0, 8)
      : [];
  } catch {
    return [];
  }
}

function unwrapMetadata(data) {
  if (!data || typeof data !== "object") {
    return {};
  }

  return (
    data.now_playing ||
    data.nowPlaying ||
    data.current ||
    data.current_track ||
    data.currentTrack ||
    data.song ||
    data.track ||
    data
  );
}

function normalizeMetadata(data) {
  const source = unwrapMetadata(data);

  if (typeof source === "string") {
    const parts = source
      .split(" - ")
      .map((part) => part.trim());

    if (parts.length >= 2) {
      return {
        artist: parts.shift(),
        title: parts.join(" - "),
        artwork: "",
      };
    }

    return {
      title: source.trim(),
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
    title: String(title || "").trim(),
    artist: String(artist || "").trim(),
    artwork: String(artwork || "").trim(),
  };
}

function sameTrack(a, b) {
  return (
    a?.title === b?.title &&
    a?.artist === b?.artist
  );
}

export function RadioPlayerProvider({
  children,
}) {
  const audioRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const wantsPlaybackRef = useRef(false);

  const [status, setStatus] = useState(
    GUIROPA_STREAM_URL
      ? "ready"
      : "waiting"
  );

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [volume, setVolumeState] =
    useState(() => {
      const saved = Number(
        safeRead(
          GUIROPA_STORAGE.volume,
          GUIROPA_DEFAULT_VOLUME
        )
      );

      return Number.isFinite(saved)
        ? clamp(saved, 0, 1)
        : GUIROPA_DEFAULT_VOLUME;
    });

  const [isMuted, setIsMuted] =
    useState(
      () =>
        safeRead(
          GUIROPA_STORAGE.muted,
          "false"
        ) === "true"
    );

  const [favorite, setFavorite] =
    useState(
      () =>
        safeRead(
          GUIROPA_STORAGE.favorite,
          "false"
        ) === "true"
    );

  const [nowPlaying, setNowPlaying] =
    useState({
      title: "",
      artist: "",
      artwork: "",
    });

  const [recentTracks, setRecentTracks] =
    useState(readRecentTracks);

  const addToHistory = useCallback(
    (track) => {
      if (!track?.title) {
        return;
      }

      setRecentTracks((current) => {
        const withoutDuplicate =
          current.filter(
            (item) =>
              !sameTrack(item, track)
          );

        const next = [
          {
            id: `${Date.now()}-${track.artist}-${track.title}`,
            title: track.title,
            artist: track.artist,
            artwork: track.artwork,
          },
          ...withoutDuplicate,
        ].slice(0, 8);

        try {
          localStorage.setItem(
            GUIROPA_STORAGE.recent,
            JSON.stringify(next)
          );
        } catch {
          // Ignora falha de storage.
        }

        return next;
      });
    },
    []
  );

  const applyMetadata = useCallback(
    (next) => {
      if (!next.title) {
        return;
      }

      setNowPlaying((previous) => {
        if (
          previous.title &&
          !sameTrack(previous, next)
        ) {
          addToHistory(previous);
        }

        return {
          title: next.title,
          artist:
            next.artist ||
            previous.artist ||
            "",
          artwork:
            next.artwork ||
            previous.artwork ||
            "",
        };
      });
    },
    [addToHistory]
  );

  const scheduleReconnect =
    useCallback(() => {
      if (
        !GUIROPA_STREAM_URL ||
        reconnectTimerRef.current ||
        !wantsPlaybackRef.current
      ) {
        return;
      }

      setStatus("reconnecting");

      reconnectTimerRef.current =
        setTimeout(async () => {
          reconnectTimerRef.current = null;

          const audio = audioRef.current;

          if (
            !audio ||
            !wantsPlaybackRef.current
          ) {
            return;
          }

          try {
            setIsLoading(true);

            audio.src =
              `${GUIROPA_STREAM_URL}${
                GUIROPA_STREAM_URL.includes("?")
                  ? "&"
                  : "?"
              }guiropa_reconnect=${Date.now()}`;

            await audio.play();
          } catch {
            setIsPlaying(false);
            setIsLoading(false);
            setStatus("error");

            scheduleReconnect();
          }
        }, 3500);
    }, []);

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "none";
    audio.volume = volume;
    audio.muted = isMuted;

    if (GUIROPA_STREAM_URL) {
      audio.src = GUIROPA_STREAM_URL;
    }

    audioRef.current = audio;

    function handlePlaying() {
      setIsPlaying(true);
      setIsLoading(false);
      setStatus("playing");
    }

    function handlePause() {
      setIsPlaying(false);
      setIsLoading(false);

      if (!wantsPlaybackRef.current) {
        setStatus(
          GUIROPA_STREAM_URL
            ? "ready"
            : "waiting"
        );
      }
    }

    function handleWaiting() {
      if (wantsPlaybackRef.current) {
        setIsLoading(true);
        setStatus("loading");
      }
    }

    function handleError() {
      setIsPlaying(false);
      setIsLoading(false);
      setStatus("error");

      if (
        wantsPlaybackRef.current &&
        GUIROPA_STREAM_URL
      ) {
        scheduleReconnect();
      }
    }

    audio.addEventListener(
      "playing",
      handlePlaying
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    audio.addEventListener(
      "waiting",
      handleWaiting
    );

    audio.addEventListener(
      "stalled",
      handleWaiting
    );

    audio.addEventListener(
      "error",
      handleError
    );

    return () => {
      audio.pause();

      audio.removeEventListener(
        "playing",
        handlePlaying
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "waiting",
        handleWaiting
      );

      audio.removeEventListener(
        "stalled",
        handleWaiting
      );

      audio.removeEventListener(
        "error",
        handleError
      );

      audioRef.current = null;

      if (reconnectTimerRef.current) {
        clearTimeout(
          reconnectTimerRef.current
        );
      }
    };
  }, [scheduleReconnect]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;

    safeWrite(
      GUIROPA_STORAGE.volume,
      volume
    );
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = isMuted;

    safeWrite(
      GUIROPA_STORAGE.muted,
      isMuted
    );
  }, [isMuted]);

  useEffect(() => {
    safeWrite(
      GUIROPA_STORAGE.favorite,
      favorite
    );
  }, [favorite]);

  useEffect(() => {
    if (!GUIROPA_METADATA_URL) {
      return undefined;
    }

    let cancelled = false;

    async function loadMetadata() {
      try {
        const separator =
          GUIROPA_METADATA_URL.includes("?")
            ? "&"
            : "?";

        const response = await fetch(
          `${GUIROPA_METADATA_URL}${separator}_=${Date.now()}`,
          {
            cache: "no-store",
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

        const normalized =
          normalizeMetadata(data);

        applyMetadata(normalized);
      } catch (error) {
        console.warn(
          "GUIROPA metadata unavailable:",
          error
        );
      }
    }

    loadMetadata();

    const timer = setInterval(
      loadMetadata,
      GUIROPA_METADATA_INTERVAL
    );

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [applyMetadata]);

  const play = useCallback(
    async () => {
      const audio = audioRef.current;

      if (
        !audio ||
        !GUIROPA_STREAM_URL
      ) {
        setStatus("waiting");
        return;
      }

      wantsPlaybackRef.current = true;

      try {
        setIsLoading(true);
        setStatus("loading");

        if (!audio.src) {
          audio.src =
            GUIROPA_STREAM_URL;
        }

        await audio.play();
      } catch (error) {
        console.warn(
          "GUIROPA stream play failed:",
          error
        );

        setIsPlaying(false);
        setIsLoading(false);
        setStatus("error");
      }
    },
    []
  );

  const pause = useCallback(() => {
    wantsPlaybackRef.current = false;

    if (reconnectTimerRef.current) {
      clearTimeout(
        reconnectTimerRef.current
      );

      reconnectTimerRef.current = null;
    }

    const audio = audioRef.current;

    if (audio) {
      audio.pause();
    }

    setIsPlaying(false);
    setIsLoading(false);

    setStatus(
      GUIROPA_STREAM_URL
        ? "ready"
        : "waiting"
    );
  }, []);

  const togglePlayback =
    useCallback(() => {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    }, [
      isPlaying,
      pause,
      play,
    ]);

  const setVolume =
    useCallback((value) => {
      const next = clamp(
        Number(value),
        0,
        1
      );

      setVolumeState(next);

      if (next > 0) {
        setIsMuted(false);
      }
    }, []);

  const toggleMute =
    useCallback(() => {
      setIsMuted(
        (current) => !current
      );
    }, []);

  const toggleFavorite =
    useCallback(() => {
      setFavorite(
        (current) => !current
      );
    }, []);

  const clearHistory =
    useCallback(() => {
      setRecentTracks([]);

      try {
        localStorage.removeItem(
          GUIROPA_STORAGE.recent
        );
      } catch {
        // Ignora.
      }
    }, []);

  const displayTitle =
    nowPlaying.title ||
    GUIROPA_STATION.name;

  const displayArtist =
    nowPlaying.artist ||
    `${GUIROPA_STATION.era} · ${GUIROPA_STATION.format}`;

  const statusText = useMemo(() => {
    switch (status) {
      case "playing":
        return "LIVE";

      case "loading":
        return "CONECTANDO";

      case "reconnecting":
        return "RECONECTANDO";

      case "error":
        return "SINAL INDISPONÍVEL";

      case "waiting":
        return "STREAM EM PREPARAÇÃO";

      default:
        return "PRONTA";
    }
  }, [status]);

  const value = useMemo(
    () => ({
      station:
        GUIROPA_STATION,

      streamConfigured:
        Boolean(
          GUIROPA_STREAM_URL
        ),

      metadataConfigured:
        Boolean(
          GUIROPA_METADATA_URL
        ),

      status,
      statusText,

      isPlaying,
      isLoading,

      volume,
      isMuted,

      favorite,

      nowPlaying,
      displayTitle,
      displayArtist,

      recentTracks,

      play,
      pause,
      togglePlayback,

      setVolume,
      toggleMute,
      toggleFavorite,

      clearHistory,
    }),
    [
      status,
      statusText,
      isPlaying,
      isLoading,
      volume,
      isMuted,
      favorite,
      nowPlaying,
      displayTitle,
      displayArtist,
      recentTracks,
      play,
      pause,
      togglePlayback,
      setVolume,
      toggleMute,
      toggleFavorite,
      clearHistory,
    ]
  );

  return (
    <RadioPlayerContext.Provider
      value={value}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayer() {
  const context =
    useContext(
      RadioPlayerContext
    );

  if (!context) {
    throw new Error(
      "useRadioPlayer must be used within RadioPlayerProvider"
    );
  }

  return context;
}
