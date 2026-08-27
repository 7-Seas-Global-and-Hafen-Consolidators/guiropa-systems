import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_LOGO_SRC } from "../data/brandAssets.js";

export default function GuiropaLogo({ variant = "hero", className = "" }) {
  const { t } = useLanguage();
  const alt = `${t.brands.guiropa.name} — ${t.hero.brandTagline}`;

  const sizes = {
    header: { width: 150, ratio: "2.4 / 1", radius: 15, padding: 4 },
    footer: { width: 170, ratio: "16 / 10", radius: 24, padding: 10 },
    hero: { width: 260, ratio: "2 / 3", radius: 42, padding: 16 },
  };

  const config = sizes[variant] || sizes.hero;

  return (
    <span
      className={`guiropa-logo-plaque guiropa-logo-plaque--${variant} ${className}`.trim()}
      style={{
        width: `${config.width}px`,
        aspectRatio: config.ratio,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: `${config.padding}px`,
        borderRadius: `${config.radius}px`,
        border: "1px solid rgba(201,154,69,.52)",
        background: "linear-gradient(145deg,#171513 0%,#090909 54%,#191512 100%)",
        boxShadow: "0 10px 26px rgba(31,21,13,.22), inset 0 1px 0 rgba(255,222,157,.10)",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <img
        src={GUIROPA_LOGO_SRC}
        alt={alt}
        className={`guiropa-logo guiropa-logo--${variant}`}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          maxWidth: "none",
          objectFit: "contain",
          objectPosition: "center",
          borderRadius: `${Math.max(config.radius - 7, 9)}px`,
        }}
        loading={variant === "hero" ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={variant === "hero" ? "high" : "auto"}
      />
    </span>
  );
}
