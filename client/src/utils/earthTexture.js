/** Gera textura equirectangular estilo Terra noturna (sem arquivo externo). */

function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function landAt(lon, lat) {
  const x = lon * Math.PI * 2;
  const y = lat * Math.PI;
  let v = 0;
  v += Math.sin(x * 1.1 + 0.4) * Math.cos(y * 2.2 - 0.3) * 0.55;
  v += Math.sin(x * 2.3 - 1.2) * Math.sin(y * 1.7 + 0.8) * 0.35;
  v += Math.cos(x * 0.7 + y * 1.4) * 0.25;
  v += (hash(Math.floor(lon * 48), Math.floor(lat * 24)) - 0.5) * 0.15;
  return v > 0.08;
}

export function buildEarthTextureDataUrl(width = 1024, height = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(width, height);
  const d = img.data;

  for (let py = 0; py < height; py++) {
    const lat = 0.5 - py / height;
    for (let px = 0; px < width; px++) {
      const lon = px / width;
      const i = (py * width + px) * 4;
      const onLand = landAt(lon, lat);
      const n = hash(px * 0.07, py * 0.11);

      const oceanR = 6 + n * 8;
      const oceanG = 14 + n * 12;
      const oceanB = 28 + n * 18;

      let r = oceanR;
      let g = oceanG;
      let b = oceanB;

      if (onLand) {
        r = 12 + n * 18;
        g = 22 + n * 20;
        b = 16 + n * 14;
      }

      if (onLand || n > 0.72) {
        const glow = onLand ? 0.35 + n * 0.45 : 0.12 + n * 0.2;
        r += 140 * glow;
        g += 100 * glow;
        b += 40 * glow;
      }

      const pole = Math.abs(lat) > 0.46 ? (Math.abs(lat) - 0.46) * 4 : 0;
      r *= 1 - pole * 0.35;
      g *= 1 - pole * 0.35;
      b = Math.min(255, b + pole * 40);

      d[i] = Math.min(255, r);
      d[i + 1] = Math.min(255, g);
      d[i + 2] = Math.min(255, b);
      d[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.82);
}
