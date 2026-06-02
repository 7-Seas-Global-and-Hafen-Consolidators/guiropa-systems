import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, LANG_OPTIONS } from "./translations.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "guiropa-lang";

function resolveLang(code) {
  return translations[code] ? code : "pt";
}

function detectInitialLang() {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return resolveLang(saved);
  const nav = (navigator.language || "pt").toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  return "pt";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = (code) => {
    if (!translations[code]) return;
    setLangState(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const t = translations[lang];

  useEffect(() => {
    const htmlLang = lang === "pt" ? "pt-BR" : lang;
    document.documentElement.lang = htmlLang;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t.meta.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute(
        "content",
        lang === "pt" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US"
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t.meta.description);

    document.title = t.meta.title;
  }, [lang, t.meta.description, t.meta.title]);

  const value = useMemo(
    () => ({ lang, setLang, t, langs: LANG_OPTIONS }),
    [lang, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
