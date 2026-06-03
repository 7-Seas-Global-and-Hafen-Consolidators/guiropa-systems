/** Resolve public asset paths against Vite base (e.g. /guiropa-systems/). */
export function assetUrl(path) {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
