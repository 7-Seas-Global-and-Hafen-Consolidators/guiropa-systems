import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_LOGO_SRC } from "../data/brandAssets.js";

/**
 * Logo oficial GUIROPA RADIO.
 * A largura varia conforme o contexto.
 * A altura permanece automática para preservar
 * integralmente a proporção original da arte.
 *
 * @param {"hero" | "header" | "footer"} variant
 */
export default function GuiropaLogo({ variant = "hero", className = "" }) {
  const { t } = useLanguage();
  const alt = `${t.brands.guiropa.name} — ${t.hero.brandTagline}`;

  const widths = {
    header: 150,
    footer: 120,
    hero: 420,
  };

  return (
    <img
      src={GUIROPA_LOGO_SRC}
      alt={alt}
      className={`guiropa-logo guiropa-logo--${variant} ${className}`.trim()}
      width={widths[variant] ?? widths.hero}
      loading={variant === "hero" ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={variant === "hero" ? "high" : "auto"}
    />
  );
}
