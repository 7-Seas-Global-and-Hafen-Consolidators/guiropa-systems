import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GuiropaLogo from "./GuiropaLogo.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const { headline } = t.about;
  const lockupRef = useRef(null);

  useEffect(() => {
    const el = lockupRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.96)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    });
  }, []);

  return (
    <section className="hero hero--simple" aria-labelledby="hero-title">
      <div className="hero-core">
        <div className="hero-lockup" ref={lockupRef}>
          <div className="hero-logo-wrap">
            <GuiropaLogo variant="hero" />
          </div>
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-copy__title">
              {headline}
            </h1>
          </div>
        </div>

        <Link to="/orcamento" className="btn-primary hero-cta-single">
          {h.ctaPrimary}
        </Link>
      </div>
    </section>
  );
}
