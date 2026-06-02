/** Normaliza e limita texto vindo da API pública. */
export function cleanText(value, maxLen = 500) {
  return String(value ?? "")
    .replace(/[\0\x08\x0B\x0C\x0E-\x1F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
