import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_LOGO_SRC } from "../data/brandAssets.js";

/**
 * GUIROPA RADIO — LOGO PLAQUE
 *
 * Mantém a mesma proporção visual em todo o site.
 * Apenas o tamanho muda conforme o contexto.
 *
 * @param {"hero" | "header" | "footer"} variant
 */
export default function GuiropaLogo({
  variant = "hero",
  className = "",
}) {
  const { t } = useLanguage();

  const alt =
    `${t.brands.guiropa.name} — ${t.hero.brandTagline}`;

  const sizes = {
    header: {
      width: 76,
      radius: 18,
      padding: 7,
    },

    footer: {
      width: 150,
      radius: 30,
      padding: 12,
    },

    hero: {
      width: 260,
      radius: 42,
      padding: 16,
    },
  };

  const config =
    sizes[variant] || sizes.hero;

  return (
    <span
      className={`guiropa-logo-plaque guiropa-logo-plaque--${variant} ${className}`.trim()}
      style={{
        width: `${config.width}px`,
        aspectRatio: "2 / 3",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",

        padding: `${config.padding}px`,

        borderRadius:
          `${config.radius}px`,

        border:
          "1px solid rgba(201, 154, 69, 0.52)",

        background:
          "linear-gradient(145deg, #171513 0%, #090909 54%, #191512 100%)",

        boxShadow:
          "0 16px 38px rgba(31, 21, 13, 0.24), inset 0 1px 0 rgba(255, 222, 157, 0.10)",

        flexShrink: 0,
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

          objectFit: "contain",
          objectPosition: "center",

          borderRadius:
            `${Math.max(
              config.radius - 8,
              10
            )}px`,
        }}

        loading={
          variant === "hero"
            ? "eager"
            : "lazy"
        }

        decoding="async"

        fetchPriority={
          variant === "hero"
            ? "high"
            : "auto"
        }
      />
    </span>
  );
}
