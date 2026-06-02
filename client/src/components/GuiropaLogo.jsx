import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_LOGO_SRC } from "../data/brandAssets.js";

/**
 * Lockup oficial (emblema + GUIROPA SYSTEMS + tagline).
 * @param {"hero" | "header" | "footer"} variant
 */
export default function GuiropaLogo({ variant = "hero", className = "" }) {
  const { t } = useLanguage();
  const alt = `${t.brands.guiropa.name} — ${t.hero.brandTagline}`;

  return (
    <img
      src={GUIROPA_LOGO_SRC}
      alt={alt}
      className={`guiropa-logo guiropa-logo--${variant} ${className}`.trim()}
      width={variant === "header" ? 120 : variant === "footer" ? 100 : 420}
      height={variant === "header" ? 120 : variant === "footer" ? 100 : 420}
      loading={variant === "hero" ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={variant === "hero" ? "high" : "auto"}
    />
  );
}
