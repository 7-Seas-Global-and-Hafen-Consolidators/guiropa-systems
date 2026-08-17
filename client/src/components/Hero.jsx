import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GuiropaLogo from "./GuiropaLogo.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Hero() {
  const { t } = useLanguage();
  const lockupRef = useRef(null);

  useEffect(() => {
    const el = lockupRef.current;

    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";

    requestAnimationFrame(() => {
      el.style.transition =
        "opacity .9s ease, transform .9s cubic-bezier(.22,1,.36,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section
      className="hero guiropa-radio-hero"
      aria-labelledby="hero-title"
    >
      <div className="guiropa-radio-hero__glow" />

      <div
        className="guiropa-radio-hero__inner"
        ref={lockupRef}
      >
        <span className="guiropa-radio-era">
          1950 — 1990
        </span>

        <div className="guiropa-radio-hero__logo">
          <GuiropaLogo variant="hero" />
        </div>

        <div className="guiropa-radio-hero__copy">
          <h1 id="hero-title">
            {t.hero.headline}
          </h1>

          <p>{t.hero.lead}</p>

          <div className="guiropa-radio-origin">
            GET UP. TURN IT UP. GUIROPA.
          </div>

          <Link
            to="/ouvir"
            className="guiropa-radio-listen"
          >
            <span
              className="guiropa-radio-listen__play"
              aria-hidden="true"
            >
              ▶
            </span>

            <span>{t.hero.ctaPrimary}</span>
          </Link>
        </div>
      </div>

      <div
        className="guiropa-radio-hero__bottom"
        aria-hidden="true"
      >
        <span>1950</span>
        <span>1960</span>
        <span>1970</span>
        <span>1980</span>
        <span>1990</span>
      </div>
    </section>
  );
}
