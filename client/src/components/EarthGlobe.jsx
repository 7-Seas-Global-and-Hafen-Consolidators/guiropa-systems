import { useEffect, useState } from "react";
import { EARTH_MAP_SRC } from "../data/mapAssets.js";
import { buildEarthTextureDataUrl } from "../utils/earthTexture.js";

/**
 * Globo terrestre em rotação contínua (fundo fixo, atrás do conteúdo).
 */
export default function EarthGlobe() {
  const [mapSrc, setMapSrc] = useState(() => {
    if (typeof document === "undefined") return null;
    return buildEarthTextureDataUrl();
  });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setMapSrc(EARTH_MAP_SRC);
    img.onerror = () => setMapSrc(buildEarthTextureDataUrl());
    img.src = EARTH_MAP_SRC;
  }, []);

  return (
    <div className="earth-globe" aria-hidden="true">
      <div className="earth-globe__atmosphere" />
      <div className="earth-globe__sphere">
        {mapSrc ? (
          <div className="earth-globe__track">
            <img className="earth-globe__map" src={mapSrc} alt="" decoding="async" />
            <img className="earth-globe__map" src={mapSrc} alt="" decoding="async" />
          </div>
        ) : (
          <div className="earth-globe__placeholder" />
        )}
      </div>
      <div className="earth-globe__veil" />
    </div>
  );
}
