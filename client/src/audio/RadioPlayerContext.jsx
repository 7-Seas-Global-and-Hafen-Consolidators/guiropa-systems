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
   GUIROPA RADIO — GLOBAL LIVE PLAYER + REAL PROGRAMMING
   ---------------------------------------------------------
   Local catalog: client/public/audio/radio/
   Schedule-aware playback with automatic advance.
   Original filenames are preserved.
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
  { artist: "Paul McCartney And Wings", decade: "1970s", tags: ["soft-rock", "pop"], file: "'My Love' (from 'Rockshow') - Paul McCartney And Wings.mp3" },
  { artist: "10CC", decade: "1970s", tags: ["soft-rock", "pop"], file: "10CC Not in Love live at Bluesfest 2010.mp3" },
  { artist: "Andy Williams", decade: "1960s", tags: ["ballad", "classic"], file: "ANDY WILLIAMS ~ _MOON RIVER_ LIVE 1962.mp3" },
  { artist: "Aretha Franklin", decade: "1960s", tags: ["soul", "rnb", "motown-era"], file: "Aretha Franklin - I Say A Little Prayer （Live）.mp3" },
  { artist: "Styx", decade: "1980s", tags: ["rock", "ballad", "arena-rock"], file: "Babe (Live) - 1996 - Styx.mp3" },
  { artist: "Bee Gees", decade: "1970s", tags: ["soft-rock", "pop", "ballad"], file: "Bee Gees - How Deep Is Your Love (Live in Las Vegas, 1997 - One Night Only).mp3" },
  { artist: "Bee Gees", decade: "1970s", tags: ["pop", "soul", "disco"], file: "Bee Gees - Too Much Heaven (Unicef 1979) I Lip Sync or Not.._.mp3" },
  { artist: "Ben E. King", decade: "1960s", tags: ["soul", "rnb"], file: "Ben E King - Spanish Harlem.mp3" },
  { artist: "Ben E. King", decade: "1960s", tags: ["soul", "rnb", "classic"], file: "Ben e. King stand by me 1961 live #1961 #standbyme #classic #60s.mp3" },
  { artist: "Bread", decade: "1970s", tags: ["soft-rock", "ballad"], file: "Bread - Everything I Own LIVE FULL HD (with lyrics) 1978.mp3" },
  { artist: "Bread", decade: "1970s", tags: ["soft-rock", "ballad"], file: "Bread - If _ LIVE FULL HD (with lyrics) 1978.mp3" },
  { artist: "Buddy Holly & The Crickets", decade: "1950s", tags: ["rock-n-roll", "rock"], file: "Buddy Holly & The Crickets _Peggy Sue_ on The Ed Sullivan Show.mp3" },
  { artist: "Zachary Stevenson", decade: "1950s", tags: ["rock-n-roll", "rock"], file: "Buddy Holly's Everyday LIVE - Zachary Stevenson.mp3" },
  { artist: "Carpenters", decade: "1970s", tags: ["soft-rock", "ballad", "pop"], file: "Carpenters _We've Only Just Begun_ on The Ed Sullivan Show.mp3" },
  { artist: "Chicago", decade: "1980s", tags: ["soft-rock", "ballad", "adult-contemporary"], file: "Chicago - If You Leave Me Now. Live. 1982.mp3" },
  { artist: "Carpenters", decade: "1970s", tags: ["soft-rock", "ballad", "pop"], file: "Close To You - Carpenters Live BBC.mp3" },
  { artist: "Dean Martin", decade: "1950s", tags: ["classic", "crooner"], file: "Dean Martin - Memories Are Made Of This.mp3" },
  { artist: "Dean Martin", decade: "1950s", tags: ["classic", "crooner"], file: "Dean Martin - That's Amore (rare 1953 live).mp3" },
  { artist: "Elvis Presley", decade: "1970s", tags: ["rock", "ballad", "classic"], file: "Elvis Presley - Can't Help Falling In Love (Aloha From Hawaii, Live in Honolulu, 1973).mp3" },
  { artist: "Elvis Presley", decade: "1960s", tags: ["rock-n-roll", "rock", "classic"], file: "Elvis Presley - Don't Be Cruel ('68 Comeback Special).mp3" },
  { artist: "Elvis Presley", decade: "1960s", tags: ["rock-n-roll", "rock"], file: "Elvis Presley - Jailhouse Rock ('68 Comeback Special).mp3" },
  { artist: "Elvis Presley", decade: "1960s", tags: ["rock-n-roll", "rock"], file: "Elvis Presley - Medley_ Heartbreak Hotel _ Hound Dog _ All Shook Up ('68 Comeback Special).mp3" },
  { artist: "Elvis Presley", decade: "1970s", tags: ["ballad", "classic"], file: "Elvis Presley - _Love Me Tender_ (Live 1970).mp3" },
  { artist: "Elvis Presley", decade: "1970s", tags: ["rock-n-roll", "rock", "classic"], file: "Elvis Presley-Heartbreak Hotel (Live in Las Vegas, 1970).mp3" },
  { artist: "The Everly Brothers", decade: "1960s", tags: ["rock-n-roll", "vocal", "pop"], file: "Everly Brothers- _All I Have To Do Is Dream_Cathy's Clown_ 1960 (Reelin' In The Years Archives).mp3" },
  { artist: "Fleetwood Mac", decade: "1990", tags: ["soft-rock", "rock", "classic"], file: "Fleetwood Mac - Dreams 1997 Live Video HQ.mp3" },
  { artist: "Fleetwood Mac", decade: "1990", tags: ["soft-rock", "ballad", "classic"], file: "Fleetwood Mac - Landslide (Live) (Official Video) [HD].mp3" },
  { artist: "Frank Sinatra", decade: "1960s", tags: ["classic", "crooner"], file: "Frank Sinatra - Come Fly With Me _ Live from A Man and His Music (1965).mp3" },
  { artist: "Bee Gees", decade: "1970s", tags: ["pop", "soft-rock"], file: "I started a joke Bee Gees Live at Festival Hall, 1971.mp3" },
  { artist: "Frank Sinatra", decade: "1960s", tags: ["classic", "crooner"], file: "I've Got You Under My Skin (From Sinatra In Concert At Royal Festival Hall).mp3" },
  { artist: "John Lennon", decade: "1970s", tags: ["rock", "ballad", "classic"], file: "John Lennon - imagine (live 1975).mp3" },
  { artist: "Kansas", decade: "1970s", tags: ["rock", "soft-rock", "ballad"], file: "Kansas - Dust in the Wind (Live from Canada Jam).mp3" },
  { artist: "Barry Manilow", decade: "1970s", tags: ["ballad", "adult-contemporary"], file: "Mandy - Barry Manilow _ The Midnight Special.mp3" },
  { artist: "The Manhattans", decade: "1970s", tags: ["soul", "rnb", "ballad"], file: "Manhattans - Kiss and Say Goodbye.avi.mp3" },
  { artist: "Marvin Gaye", decade: "1960s", tags: ["soul", "rnb", "motown"], file: "Marvin Gaye - LIVE How Sweet It Is 1965.mp3" },
  { artist: "Bee Gees", decade: "1970s", tags: ["pop", "soft-rock"], file: "Massachusetts - Bee Gees _ The Midnight Special.mp3" },
  { artist: "Elvis Presley", decade: "1970s", tags: ["ballad", "classic"], file: "My Way _ Elvis Presley 4K (Live Music Video) Remastered Tribute Edition _ Elvis In Concert 1977.mp3" },
  { artist: "Nat King Cole", decade: "1950s", tags: ["classic", "crooner", "ballad"], file: "Nat King Cole - Mona Lisa (Live HD-Technicolor).mp3" },
  { artist: "Nat King Cole", decade: "1950s", tags: ["classic", "crooner", "ballad"], file: "Nat King Cole - Unforgettable (Live in HD).mp3" },
  { artist: "Nat King Cole", decade: "1950s", tags: ["classic", "crooner", "ballad"], file: "Nat King Cole _Mona Lisa & Too Young_ on The Ed Sullivan Show.mp3" },
  { artist: "Nazareth", decade: "1970s", tags: ["rock", "ballad"], file: "Nazareth - Love Hurts (Live).mp3" },
  { artist: "Paul Anka", decade: "1950s", tags: ["pop", "classic", "ballad"], file: "Paul Anka - Lonely Boy (1959) - HD - feat. Mamie Van Doren.mp3" },
  { artist: "Paul Anka", decade: "1950s", tags: ["pop", "classic"], file: "Paul Anka _Diana_ on The Ed Sullivan Show.mp3" },
  { artist: "Paul Anka", decade: "1950s", tags: ["pop", "ballad", "classic"], file: "Paul Anka _Put Your Head On My Shoulder_ on The Ed Sullivan Show.mp3" },
  { artist: "Peaches & Herb", decade: "1970s", tags: ["soul", "rnb", "disco"], file: "Peaches & Herb Reunited Live.mp3" },
  { artist: "Player", decade: "1970s", tags: ["soft-rock", "ballad"], file: "Player - Baby Come Back (Don Kirshner’s Rock Concert, 1978).mp3" },
  { artist: "Procol Harum", decade: "1960s", tags: ["rock", "classic"], file: "Procol Harum - a white shade of pale, at Gala du Midem 1968.mp3" },
  { artist: "Dean Martin", decade: "1960s", tags: ["classic", "crooner"], file: "RAT Pack Live 1965 #5 _ Dean Martin _Volare_.mp3" },
  { artist: "Ray Charles & The Raelettes", decade: "1960s", tags: ["soul", "rnb"], file: "Ray Charles & The Raelettes (feat. Billy Preston) _What'd I Say_ on The Ed Sullivan Show.mp3" },
  { artist: "Ray Charles", decade: "1960s", tags: ["soul", "rnb"], file: "Ray Charles - 'Hallelujah I Love Her So' live [Colourised] 1961.mp3" },
  { artist: "Roy Orbison", decade: "1960s", tags: ["rock", "ballad", "classic"], file: "Roy Orbison - Blue Bayou & Pretty Woman [Very rare!] (1964).mp3" },
  { artist: "Roy Orbison", decade: "1960s", tags: ["ballad", "classic"], file: "Roy Orbison - Crying (Monument Concert 1965).mp3" },
  { artist: "Roy Orbison", decade: "1960s", tags: ["ballad", "classic"], file: "Roy Orbison - In Dreams (Live 1966).mp3" },
  { artist: "Roy Orbison", decade: "1960s", tags: ["ballad", "classic"], file: "Roy Orbison - It's Over (Monument Concert 1965).mp3" },
  { artist: "Roy Orbison", decade: "1960s", tags: ["ballad", "classic"], file: "Roy Orbison - Only the Lonely (Monument Concert 1965).mp3" },
  { artist: "Bee Gees", decade: "1970s", tags: ["pop", "soft-rock"], file: "Run to Me - Bee Gees _ The Midnight Special.mp3" },
  { artist: "Simon & Garfunkel", decade: "1960s", tags: ["folk-rock", "ballad", "classic"], file: "SIMON & GARFUNKEL - Sound of silence (1967 Live).mp3" },
  { artist: "Stevie Wonder", decade: "1960s", tags: ["soul", "rnb", "motown"], file: "Stevie Wonder - My Cherie Amour (Live).mp3" },
  { artist: "Tom Jones", decade: "1960s", tags: ["pop", "ballad", "classic"], file: "THE GREEN GREEN GRASS OF HOME...TOM JONES LIVE.mp3" },
  { artist: "The Platters", decade: "1950s", tags: ["doo-wop", "vocal", "rnb"], file: "THE PLATTERS - The Great Pretender ⭐Ultimate Quality⭐ (1956) AI 8K Colorized Enhanced.mp3" },
  { artist: "The Association", decade: "1970s", tags: ["soft-rock", "pop"], file: "The Association - Cherish - Live, 1979.mp3" },
  { artist: "The Beatles", decade: "1960s", tags: ["british-invasion", "rock", "pop"], file: "The Beatles - Something (Madison Square Garden).mp3" },
  { artist: "The Beatles", decade: "1960s", tags: ["british-invasion", "rock", "pop"], file: "The Beatles - Yesterday (Live With Spoken Word Intro, New York) [Remastered 2015].mp3" },
  { artist: "The Eagles", decade: "1970s", tags: ["soft-rock", "rock"], file: "The Eagles - New Kid In Town (Live At Capital Centre).mp3" },
  { artist: "The Eagles", decade: "1970s", tags: ["soft-rock", "rock", "ballad"], file: "The Eagles I CAN'T TELL YOU WHY Live (Video Inedito en you tube) - YouTube.mp3" },
  { artist: "The Everly Brothers", decade: "1960s", tags: ["rock-n-roll", "vocal", "pop"], file: "The Everly Brothers - Bye Bye Love (Shindig, Nov 18, 1964).mp3" },
  { artist: "The Flamingos", decade: "1950s", tags: ["doo-wop", "vocal", "rnb"], file: "The Flamingos _I Only Have Eyes for You_.mp3" },
  { artist: "The Mamas & The Papas", decade: "1960s", tags: ["folk-rock", "pop"], file: "The Mamas & The Papas - Monday, Monday - Monterey Pop Festival - 1967.mp3" },
  { artist: "The Mamas & The Papas", decade: "1960s", tags: ["folk-rock", "pop"], file: "The Mamas & the Papas - California Dreamin' (Live in Monterey).mp3" },
  { artist: "The Platters", decade: "1950s", tags: ["doo-wop", "vocal", "rnb"], file: "The Platters _Only You (And You Alone)_ On The Ed Sullivan Show.mp3" },
  { artist: "The Platters", decade: "1950s", tags: ["doo-wop", "vocal", "rnb"], file: "The Platters _Smoke Gets In Your Eyes_ on The Ed Sullivan Show.mp3" },
  { artist: "The Ronettes", decade: "1960s", tags: ["pop", "rnb", "girl-group"], file: "The Ronettes _Walking In The Rain_ LIVE on U.S. TV 1973.mp3" },
  { artist: "The Temptations", decade: "1960s", tags: ["soul", "rnb", "motown"], file: "The Temptations ft Eddie Kendricks David Ruffin & Dennis Edwards - I Wish It Would Rain (Live) UK TV.mp3" },
  { artist: "The Temptations", decade: "1960s", tags: ["soul", "rnb", "motown"], file: "_ You're My Everything _ The Temptations 1967.mp3" }
];

/*
  JavaScript weekday numbers:
  0 Sunday, 1 Monday, 2 Tuesday, 3 Wednesday,
  4 Thursday, 5 Friday, 6 Saturday.

  Each published slot owns its starting hour. This avoids overlap between
  the adjacent shows already displayed on the Schedule page.
*/
const GUIROPA_PROGRAMMING = [
  { day: 1, hour: 18, name: "THE BIRTH OF ROCK", decades: ["1950s"], tags: ["rock-n-roll", "doo-wop", "rnb"] },
  { day: 1, hour: 20, name: "SEVENTIES GOLD", decades: ["1970s"] },

  { day: 2, hour: 18, name: "BRITISH INVASION", decades: ["1960s"], tags: ["british-invasion", "rock", "pop"] },
  { day: 2, hour: 20, name: "EIGHTIES FOREVER", decades: ["1980s"] },

  { day: 3, hour: 19, name: "THE FINAL CHAPTER", decades: ["1990"] },
  { day: 3, hour: 20, name: "RHYTHM & BLUES", decades: ["1950s", "1960s"], tags: ["rnb", "soul", "doo-wop"] },
  { day: 3, hour: 21, name: "SOFT ROCK NIGHTS", decades: ["1970s", "1980s"], tags: ["soft-rock", "ballad", "adult-contemporary"] },

  { day: 4, hour: 20, name: "MOTOWN & SOUL", decades: ["1960s", "1970s"], tags: ["motown", "soul", "rnb"] },

  { day: 5, hour: 20, name: "POWER BALLADS", decades: ["1980s"], tags: ["ballad", "arena-rock", "soft-rock"] },
  { day: 5, hour: 21, name: "ROCK 'N' ROLL CLASSICS", decades: ["1950s", "1960s"], tags: ["rock-n-roll", "rock"] },
  { day: 5, hour: 22, name: "1990", decades: ["1990"] },

  { day: 6, hour: 19, name: "SIXTIES RADIO", decades: ["1960s"] },
  { day: 6, hour: 21, name: "DISCO & SOUL", decades: ["1970s"], tags: ["disco", "soul", "rnb"] },
  { day: 6, hour: 22, name: "AFTER DARK 80S", decades: ["1980s"], tags: ["ballad", "adult-contemporary", "soft-rock"] },

  { day: 0, hour: 20, name: "GUIROPA CLASSICS", decades: ["1950s", "1960s", "1970s", "1980s", "1990"] },
];

const DEFAULT_PROGRAM = {
  name: "GUIROPA RADIO",
  decades: ["1950s", "1960s", "1970s", "1980s", "1990"],
  tags: [],
};

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
  return `/audio/radio/${encodeURIComponent(file)}`;
}

function getCurrentProgram(date = new Date()) {
  const exact = GUIROPA_PROGRAMMING.find(
    (program) =>
      program.day === date.getDay() &&
      program.hour === date.getHours()
  );

  return exact || DEFAULT_PROGRAM;
}

function trackMatchesDecade(track, program) {
  return !program.decades?.length || program.decades.includes(track.decade);
}

function trackMatchesTag(track, program) {
  if (!program.tags?.length) return true;
  return program.tags.some((tag) => track.tags?.includes(tag));
}

function indexesForProgram(program) {
  const strict = GUIROPA_LIVE_CATALOG
    .map((track, index) => ({ track, index }))
    .filter(({ track }) => trackMatchesDecade(track, program) && trackMatchesTag(track, program))
    .map(({ index }) => index);

  if (strict.length) return strict;

  const decadeFallback = GUIROPA_LIVE_CATALOG
    .map((track, index) => ({ track, index }))
    .filter(({ track }) => trackMatchesDecade(track, program))
    .map(({ index }) => index);

  if (decadeFallback.length) return decadeFallback;

  return GUIROPA_LIVE_CATALOG.map((_, index) => index);
}

function pickRandomIndex(currentIndex = -1, program = DEFAULT_PROGRAM) {
  const pool = indexesForProgram(program);

  if (pool.length <= 1) return pool[0] ?? 0;

  const withoutCurrent = pool.filter((index) => index !== currentIndex);
  const source = withoutCurrent.length ? withoutCurrent : pool;

  return source[Math.floor(Math.random() * source.length)];
}

export function RadioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const currentIndexRef = useRef(-1);
  const wantsPlaybackRef = useRef(false);
  const advanceRef = useRef(null);
  const programRef = useRef(getCurrentProgram());
  const nowPlayingRef = useRef({
    title: "",
    artist: "",
    artwork: "",
    file: "",
  });

  const [status, setStatus] = useState("ready");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(programRef.current);

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

  const [nowPlaying, setNowPlayingState] = useState(
    nowPlayingRef.current
  );

  const [recentTracks, setRecentTracks] = useState(readRecentTracks);

  const refreshProgram = useCallback(() => {
    const next = getCurrentProgram();
    programRef.current = next;
    setCurrentProgram(next);
    return next;
  }, []);

  const addToHistory = useCallback((track) => {
    if (!track?.file) return;

    setRecentTracks((current) => {
      const withoutDuplicate = current.filter(
        (item) => !sameTrack(item, track)
      );

      const next = [
        {
          id: `${Date.now()}-${track.file}`,
          title: track.title || "LIVE",
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

  const setNowPlaying = useCallback((track) => {
    nowPlayingRef.current = track;
    setNowPlayingState(track);
  }, []);

  const loadTrackByIndex = useCallback(
    (index, { rememberPrevious = true, program = programRef.current } = {}) => {
      const audio = audioRef.current;
      const track = GUIROPA_LIVE_CATALOG[index];

      if (!audio || !track) return null;

      const previous = nowPlayingRef.current;

      if (rememberPrevious && previous?.file) {
        addToHistory(previous);
      }

      currentIndexRef.current = index;

      setNowPlaying({
        title: program?.name || "LIVE",
        artist: track.artist,
        artwork: "",
        file: track.file,
        decade: track.decade,
      });

      audio.src = trackUrl(track.file);
      audio.load();

      return track;
    },
    [addToHistory, setNowPlaying]
  );

  const playRandomTrack = useCallback(
    async ({ rememberPrevious = true } = {}) => {
      const audio = audioRef.current;

      if (!audio || GUIROPA_LIVE_CATALOG.length === 0) {
        setStatus("error");
        return;
      }

      const program = refreshProgram();
      const nextIndex = pickRandomIndex(currentIndexRef.current, program);

      loadTrackByIndex(nextIndex, { rememberPrevious, program });

      try {
        wantsPlaybackRef.current = true;
        setIsLoading(true);
        setStatus("loading");
        await audio.play();
      } catch (error) {
        console.warn("GUIROPA local audio play failed:", error);
        setIsPlaying(false);
        setIsLoading(false);
        setStatus("error");
      }
    },
    [loadTrackByIndex, refreshProgram]
  );

  advanceRef.current = playRandomTrack;

  useEffect(() => {
    const audio = new Audio();

    audio.preload = "metadata";
    audio.volume = Number(
      safeRead(GUIROPA_STORAGE.volume, GUIROPA_DEFAULT_VOLUME)
    );
    audio.muted =
      safeRead(GUIROPA_STORAGE.muted, "false") === "true";

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
        advanceRef.current?.();
      }
    }

    function handleError() {
      setIsPlaying(false);
      setIsLoading(false);

      if (wantsPlaybackRef.current) {
        setStatus("loading");

        window.setTimeout(() => {
          if (wantsPlaybackRef.current) {
            advanceRef.current?.();
          }
        }, 600);
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
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      refreshProgram();
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [refreshProgram]);

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
        const program = refreshProgram();
        const firstIndex = pickRandomIndex(-1, program);

        loadTrackByIndex(firstIndex, {
          rememberPrevious: false,
          program,
        });
      }

      await audio.play();
    } catch (error) {
      console.warn("GUIROPA local audio play failed:", error);
      setIsPlaying(false);
      setIsLoading(false);
      setStatus("error");
    }
  }, [loadTrackByIndex, refreshProgram]);

  const pause = useCallback(() => {
    wantsPlaybackRef.current = false;

    const audio = audioRef.current;
    if (audio) audio.pause();

    setIsPlaying(false);
    setIsLoading(false);
    setStatus("ready");
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const nextTrack = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || GUIROPA_LIVE_CATALOG.length === 0) return;

    const shouldResume = wantsPlaybackRef.current || isPlaying;
    const program = refreshProgram();
    const nextIndex = pickRandomIndex(currentIndexRef.current, program);

    loadTrackByIndex(nextIndex, { program });

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
  }, [isPlaying, loadTrackByIndex, refreshProgram]);

  const setVolume = useCallback((value) => {
    const next = clamp(Number(value), 0, 1);
    setVolumeState(next);

    if (next > 0) setIsMuted(false);
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

  const displayTitle = nowPlaying.title || currentProgram.name || GUIROPA_STATION.name;
  const displayArtist =
    nowPlaying.artist || `${GUIROPA_STATION.era} · ${GUIROPA_STATION.format}`;

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
      currentProgram,
      streamConfigured: GUIROPA_LIVE_CATALOG.length > 0,
      metadataConfigured: true,
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
      catalogSize: GUIROPA_LIVE_CATALOG.length,
    }),
    [
      currentProgram,
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
