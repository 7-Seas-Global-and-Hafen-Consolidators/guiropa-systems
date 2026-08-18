export const GUIROPA_STREAM_URL =
  import.meta.env.VITE_GUIROPA_STREAM_URL || "";

export const GUIROPA_METADATA_URL =
  import.meta.env.VITE_GUIROPA_METADATA_URL || "";

export const GUIROPA_METADATA_INTERVAL = 15000;

export const GUIROPA_DEFAULT_VOLUME = 0.82;

export const GUIROPA_STORAGE = {
  volume: "guiropa-radio-volume",
  muted: "guiropa-radio-muted",
  favorite: "guiropa-radio-favorite",
  recent: "guiropa-radio-recent",
};

export const GUIROPA_STATION = {
  name: "GUIROPA RADIO",
  era: "1950 — 1990",
  format: "Soft Rock · Rock Ballads · Classic Hits",
  slogan: "GET UP. TURN IT UP. GUIROPA.",
};
