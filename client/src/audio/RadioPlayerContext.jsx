import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { assetUrl } from "../utils/assetUrl.js";

/* =========================================================
   GUIROPA RADIO — GLOBAL RANDOM LIVE PLAYER
   ---------------------------------------------------------
   Uses the local catalog in client/public/audio/radio/.
   Original uploaded filenames are preserved.
   Playback is random and automatically advances on "ended".
   ========================================================= */

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

const GUIROPA_LIVE_CATALOG = [
  { artist: "Paul McCartney And Wings", file: "'My Love' (from 'Rockshow') - Paul McCartney And Wings.mp3" },
  { artist: "10CC", file: "10CC Not in Love live at Bluesfest 2010.mp3" },
  { artist: "Andy Williams", file: "ANDY WILLIAMS ~ _MOON RIVER_ LIVE 1962.mp3" },
  { artist: "Aretha Franklin", file: "Aretha Franklin - I Say A Little Prayer （Live）.mp3" },
  { artist: "Styx", file: "Babe (Live) - 1996 - Styx.mp3" },
  { artist: "Bee Gees", file: "Bee Gees - How Deep Is Your Love (Live in Las Vegas, 1997 - One Night Only).mp3" },
  { artist: "Bee Gees", file: "Bee Gees - Too Much Heaven (Unicef 1979) I Lip Sync or Not.._.mp3" },
  { artist: "Ben E. King", file: "Ben E King - Spanish Harlem.mp3" },
  { artist: "Ben E. King", file: "Ben e. King stand by me 1961 live #1961 #standbyme #classic #60s.mp3" },
  { artist: "Bread", file: "Bread - Everything I Own LIVE FULL HD (with lyrics) 1978.mp3" },
  { artist: "Bread", file: "Bread - If _ LIVE FULL HD (with lyrics) 1978.mp3" },
  { artist: "Buddy Holly & The Crickets", file: "Buddy Holly & The Crickets _Peggy Sue_ on The Ed Sullivan Show.mp3" },
  { artist: "Zachary Stevenson", file: "Buddy Holly's Everyday LIVE - Zachary Stevenson.mp3" },
  { artist: "Carpenters", file: "Carpenters _We've Only Just Begun_ on The Ed Sullivan Show.mp3" },
  { artist: "Chicago", file: "Chicago - If You Leave Me Now. Live. 1982.mp3" },
  { artist: "Carpenters", file: "Close To You - Carpenters Live BBC.mp3" },
  { artist: "Dean Martin", file: "Dean Martin - Memories Are Made Of This.mp3" },
  { artist: "Dean Martin", file: "Dean Martin - That's Amore (rare 1953 live).mp3" },
  { artist: "Elvis Presley", file: "Elvis Presley - Can't Help Falling In Love (Aloha From Hawaii, Live in Honolulu, 1973).mp3" },
  { artist: "Elvis Presley", file: "Elvis Presley - Don't Be Cruel ('68 Comeback Special).mp3" },
  { artist: "Elvis Presley", file: "Elvis Presley - Jailhouse Rock ('68 Comeback Special).mp3" },
  { artist: "Elvis Presley", file: "Elvis Presley - Medley_ Heartbreak Hotel _ Hound Dog _ All Shook Up ('68 Comeback Special).mp3" },
  { artist: "Elvis Presley", file: "Elvis Presley - _Love Me Tender_ (Live 1970).mp3" },
  { artist: "Elvis Presley", file: "Elvis Presley-Heartbreak Hotel (Live in Las Vegas, 1970).mp3" },
  { artist: "The Everly Brothers", file: "Everly Brothers- _All I Have To Do Is Dream_Cathy's Clown_ 1960 (Reelin' In The Years Archives).mp3" },
  { artist: "Fleetwood Mac", file: "Fleetwood Mac - Dreams 1997 Live Video HQ.mp3" },
  { artist: "Fleetwood Mac", file: "Fleetwood Mac - Landslide (Live) (Official Video) [HD].mp3" },
  { artist: "Frank Sinatra", file: "Frank Sinatra - Come Fly With Me _ Live from A Man and His Music (1965).mp3" },
  { artist: "Bee Gees", file: "I started a joke Bee Gees Live at Festival Hall, 1971.mp3" },
  { artist: "Frank Sinatra", file: "I've Got You Under My Skin (From Sinatra In Concert At Royal Festival Hall).mp3" },
  { artist: "John Lennon", file: "John Lennon - imagine (live 1975).mp3" },
  { artist: "Kansas", file: "Kansas - Dust in the Wind (Live from Canada Jam).mp3" },
  { artist: "Barry Manilow", file: "Mandy - Barry Manilow _ The Midnight Special.mp3" },
  { artist: "The Manhattans", file: "Manhattans - Kiss and Say Goodbye.avi.mp3" },
  { artist: "Marvin Gaye", file: "Marvin Gaye - LIVE How Sweet It Is 1965.mp3" },
  { artist: "Bee Gees", file: "Massachusetts - Bee Gees _ The Midnight Special.mp3" },
  { artist: "Elvis Presley", file: "My Way _ Elvis Presley 4K (Live Music Video) Remastered Tribute Edition _ Elvis In Concert 1977.mp3" },
  { artist: "Nat King Cole", file: "Nat King Cole - Mona Lisa (Live HD-Technicolor).mp3" },
  { artist: "Nat King Cole", file: "Nat King Cole - Unforgettable (Live in HD).mp3" },
  { artist: "Nat King Cole", file: "Nat King Cole _Mona Lisa & Too Young_ on The Ed Sullivan Show.mp3" },
  { artist: "Nazareth", file: "Nazareth - Love Hurts (Live).mp3" },
  { artist: "Paul Anka", file: "Paul Anka - Lonely Boy (1959) - HD - feat. Mamie Van Doren.mp3" },
  { artist: "Paul Anka", file: "Paul Anka _Diana_ on The Ed Sullivan Show.mp3" },
  { artist: "Paul Anka", file: "Paul Anka _Put Your Head On My Shoulder_ on The Ed Sullivan Show.mp3" },
  { artist: "Peaches & Herb", file: "Peaches & Herb Reunited Live.mp3" },
  { artist: "Player", file: "Player - Baby Come Back (Don Kirshner’s Rock Concert, 1978).mp3" },
  { artist: "Procol Harum", file: "Procol Harum - a white shade of pale, at Gala du Midem 1968.mp3" },
  { artist: "Dean Martin", file: "RAT Pack Live 1965 #5 _ Dean Martin _Volare_.mp3" },
  { artist: "Ray Charles & The Raelettes", file: "Ray Charles & The Raelettes (feat. Billy Preston) _What'd I Say_ on The Ed Sullivan Show.mp3" },
  { artist: "Ray Charles", file: "Ray Charles - 'Hallelujah I Love Her So' live [Colourised] 1961.mp3" },
  { artist: "Roy Orbison", file: "Roy Orbison - Blue Bayou & Pretty Woman [Very rare!] (1964).mp3" },
  { artist: "Roy Orbison", file: "Roy Orbison - Crying (Monument Concert 1965).mp3" },
  { artist: "Roy Orbison", file: "Roy Orbison - In Dreams (Live 1966).mp3" },
  { artist: "Roy Orbison", file: "Roy Orbison - It's Over (Monument Concert 1965).mp3" },
  { artist: "Roy Orbison", file: "Roy Orbison - Only the Lonely (Monument Concert 1965).mp3" },
  { artist: "Bee Gees", file: "Run to Me - Bee Gees _ The Midnight Special.mp3" },
  { artist: "Simon & Garfunkel", file: "SIMON & GARFUNKEL - Sound of silence (1967 Live).mp3" },
  { artist: "Stevie Wonder", file: "Stevie Wonder - My Cherie Amour (Live).mp3" },
  { artist: "Tom Jones", file: "THE GREEN GREEN GRASS OF HOME...TOM JONES LIVE.mp3" },
  { artist: "The Platters", file: "THE PLATTERS - The Great Pretender ⭐Ultimate Quality⭐ (1956) AI 8K Colorized Enhanced.mp3" },
  { artist: "The Association", file: "The Association - Cherish - Live, 1979.mp3" },
  { artist: "The Beatles", file: "The Beatles - Something (Madison Square Garden).mp3" },
  { artist: "The Beatles", file: "The Beatles - Yesterday (Live With Spoken Word Intro, New York) [Remastered 2015].mp3" },
  { artist: "The Eagles", file: "The Eagles - New Kid In Town (Live At Capital Centre).mp3" },
  { artist: "The Eagles", file: "The Eagles I CAN'T TELL YOU WHY Live (Video Inedito en you tube) - YouTube.mp3" },
  { artist: "The Everly Brothers", file: "The Everly Brothers - Bye Bye Love (Shindig, Nov 18, 1964).mp3" },
  { artist: "The Flamingos", file: "The Flamingos _I Only Have Eyes for You_.mp3" },
  { artist: "The Mamas & The Papas", file: "The Mamas & The Papas - Monday, Monday - Monterey Pop Festival - 1967.mp3" },
  { artist: "The Mamas & The Papas", file: "The Mamas & the Papas - California Dreamin' (Live in Monterey).mp3" },
  { artist: "The Platters", file: "The Platters _Only You (And You Alone)_ On The Ed Sullivan Show.mp3" },
  { artist: "The Platters", file: "The Platters _Smoke Gets In Your Eyes_ on The Ed Sullivan Show.mp3" },
  { artist: "The Ronettes", file: "The Ronettes _Walking In The Rain_ LIVE on U.S. TV 1973.mp3" },
  { artist: "The Temptations", file: "The Temptations ft Eddie Kendricks David Ruffin & Dennis Edwards - I Wish It Would Rain (Live) UK TV.mp3" },
  { artist: "The Temptations", file: "_ You're My Everything _ The Temptations 1967.mp3" }
];

const RadioPlayerContext = createContext(null);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function safeRead(key, fallback = null) {
  if (typeof window === "undefined") return fallback;

  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Storage unavailable.
  }
}

function readRecentTracks() {
  const raw = safeRead(GUIROPA_STORAGE.recent, "[]");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

function sameTrack(a, b) {
  return a?.file === b?.file;
}

function trackUrl(file) {
  return assetUrl(`audio/radio/${encodeURIComponent(file)}`);
}

function pickRandomIndex(currentIndex = -1) {
  const total = GUIROPA_LIVE_CATALOG.length;

  if (total <= 1) return 0;

  let next = currentIndex;

  while (next === currentIndex) {
    next = Math.floor(Math.random() * total);
  }

  return next;
}

export function RadioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const currentIndexRef = useRef(-1);
  const wantsPlaybackRef = useRef(false);

  const [status, setStatus] = useState("ready");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [volume, setVolumeState] = useState(() => {
    const saved = Number(
      safeRead(GUIROPA_STORAGE.volume, GUIROPA_DEFAULT_VOLUME)
    );

    return Number.isFinite(saved)
      ? clamp(saved, 0, 1)
      : GUIROPA_DEFAULT_VOLUME;
  });

  const [isMuted, setIsMuted] = useState(
    () => safeRead(GUIROPA_STORAGE.muted, "false") === "true"
  );

  const [favorite, setFavorite] = useState(
    () => safeRead(GUIROPA_STORAGE.favorite, "false") === "true"
  );

  const [nowPlaying, setNowPlaying] = useState({
    title: "",
    artist: "",
    artwork: "",
    file: "",
  });

  const [recentTracks, setRecentTracks] = useState(readRecentTracks);

  const addToHistory = useCallback((track) => {
    if (!track?.file) return;

    setRecentTracks((current) => {
      const withoutDuplicate = current.filter(
        (item) => !sameTrack(item, track)
      );

      const next = [
        {
          id: `${Date.now()}-${track.file}`,
          title: "LIVE",
          artist: track.artist,
          artwork: "",
          file: track.file,
        },
        ...withoutDuplicate,
      ].slice(0, 8);

      try {
        localStorage.setItem(
          GUIROPA_STORAGE.recent,
          JSON.stringify(next)
        );
      } catch {
        // Ignore storage failure.
      }

      return next;
    });
  }, []);

  const loadTrackByIndex = useCallback(
    (index, { rememberPrevious = true } = {}) => {
      const audio = audioRef.current;
      const track = GUIROPA_LIVE_CATALOG[index];

      if (!audio || !track) return null;

      if (rememberPrevious && nowPlaying.file) {
        addToHistory(nowPlaying);
      }

      currentIndexRef.current = index;

      const nextNowPlaying = {
        title: "LIVE",
        artist: track.artist,
        artwork: "",
        file: track.file,
      };

      setNowPlaying(nextNowPlaying);

      audio.src = trackUrl(track.file);
      audio.load();

      return track;
    },
    [addToHistory, nowPlaying]
  );

  const playRandomTrack = useCallback(
    async ({ rememberPrevious = true } = {}) => {
      const audio = audioRef.current;

      if (!audio || GUIROPA_LIVE_CATALOG.length === 0) {
        setStatus("error");
        return;
      }

      const nextIndex = pickRandomIndex(currentIndexRef.current);

      loadTrackByIndex(nextIndex, { rememberPrevious });

      try {
        setIsLoading(true);
        setStatus("loading");
        wantsPlaybackRef.current = true;

        await audio.play();
      } catch (error) {
        console.warn("GUIROPA local audio play failed:", error);
        setIsPlaying(false);
        setIsLoading(false);
        setStatus("error");
      }
    },
    [loadTrackByIndex]
  );

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "metadata";
    audio.volume = volume;
    audio.muted = isMuted;

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
        setStatus("ready");
      }
    }

    function handleWaiting() {
      if (wantsPlaybackRef.current) {
        setIsLoading(true);
        setStatus("loading");
      }
    }

    function handleEnded() {
      if (wantsPlaybackRef.current) {
        playRandomTrack();
      }
    }

    function handleError() {
      setIsPlaying(false);
      setIsLoading(false);

      if (wantsPlaybackRef.current) {
        setStatus("loading");

        window.setTimeout(() => {
          if (wantsPlaybackRef.current) {
            playRandomTrack();
          }
        }, 800);
      } else {
        setStatus("error");
      }
    }

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("stalled", handleWaiting);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      wantsPlaybackRef.current = false;
      audio.pause();

      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("stalled", handleWaiting);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);

      audioRef.current = null;
    };
  }, [playRandomTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    safeWrite(GUIROPA_STORAGE.volume, volume);
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = isMuted;
    safeWrite(GUIROPA_STORAGE.muted, isMuted);
  }, [isMuted]);

  useEffect(() => {
    safeWrite(GUIROPA_STORAGE.favorite, favorite);
  }, [favorite]);

  const play = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || GUIROPA_LIVE_CATALOG.length === 0) {
      setStatus("error");
      return;
    }

    wantsPlaybackRef.current = true;

    try {
      setIsLoading(true);
      setStatus("loading");

      if (currentIndexRef.current < 0 || !audio.src) {
        const firstIndex = pickRandomIndex(-1);
        loadTrackByIndex(firstIndex, { rememberPrevious: false });
      }

      await audio.play();
    } catch (error) {
      console.warn("GUIROPA local audio play failed:", error);
      setIsPlaying(false);
      setIsLoading(false);
      setStatus("error");
    }
  }, [loadTrackByIndex]);

  const pause = useCallback(() => {
    wantsPlaybackRef.current = false;

    const audio = audioRef.current;

    if (audio) {
      audio.pause();
    }

    setIsPlaying(false);
    setIsLoading(false);
    setStatus("ready");
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const nextTrack = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || GUIROPA_LIVE_CATALOG.length === 0) return;

    const shouldResume =
      wantsPlaybackRef.current || isPlaying;

    const nextIndex =
      pickRandomIndex(currentIndexRef.current);

    loadTrackByIndex(nextIndex);

    if (shouldResume) {
      wantsPlaybackRef.current = true;

      try {
        setIsLoading(true);
        setStatus("loading");
        await audio.play();
      } catch (error) {
        console.warn("GUIROPA next track failed:", error);
        setIsLoading(false);
        setStatus("error");
      }
    }
  }, [isPlaying, loadTrackByIndex]);

  const setVolume = useCallback((value) => {
    const next = clamp(Number(value), 0, 1);

    setVolumeState(next);

    if (next > 0) {
      setIsMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  const toggleFavorite = useCallback(() => {
    setFavorite((current) => !current);
  }, []);

  const clearHistory = useCallback(() => {
    setRecentTracks([]);

    try {
      localStorage.removeItem(GUIROPA_STORAGE.recent);
    } catch {
      // Ignore.
    }
  }, []);

  const displayTitle =
    nowPlaying.title || GUIROPA_STATION.name;

  const displayArtist =
    nowPlaying.artist ||
    `${GUIROPA_STATION.era} · ${GUIROPA_STATION.format}`;

  const statusText = useMemo(() => {
    switch (status) {
      case "playing":
        return "LIVE";

      case "loading":
        return "CARREGANDO";

      case "error":
        return "ÁUDIO INDISPONÍVEL";

      default:
        return "PRONTA";
    }
  }, [status]);

  const value = useMemo(
    () => ({
      station: GUIROPA_STATION,

      streamConfigured:
        GUIROPA_LIVE_CATALOG.length > 0,

      metadataConfigured: false,

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
      nextTrack,

      setVolume,
      toggleMute,
      toggleFavorite,

      clearHistory,

      catalogSize:
        GUIROPA_LIVE_CATALOG.length,
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
      nextTrack,
      setVolume,
      toggleMute,
      toggleFavorite,
      clearHistory,
    ]
  );

  return (
    <RadioPlayerContext.Provider value={value}>
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayer() {
  const context = useContext(RadioPlayerContext);

  if (!context) {
    throw new Error(
      "useRadioPlayer must be used within RadioPlayerProvider"
    );
  }

  return context;
}
