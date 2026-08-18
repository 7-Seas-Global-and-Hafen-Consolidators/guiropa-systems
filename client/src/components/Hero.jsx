import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "../data/brandAssets.js";

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

        <div className="guiropa-radio-hero__emblem">
          <img
            src={GUIROPA_EMBLEM_SRC}
            alt="GUIROPA RADIO"
            className="guiropa-radio-hero__emblem-image"
            width="720"
            height="1080"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="guiropa-radio-hero__copy">
          <h1 id="hero-title">
            {t.hero.headline}
          </h1>

          <p>
            {t.hero.lead}
          </p>

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

            <span>
              {t.hero.ctaPrimary}
            </span>
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

      <style>{`
        .guiropa-radio-hero__emblem {
          position: relative;
          z-index: 4;

          width: min(
            560px,
            68vw
          );

          margin:
            0 auto;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .guiropa-radio-hero__emblem::before {
          content: "";

          position: absolute;

          z-index: -1;

          left: 50%;
          top: 52%;

          width: 88%;
          height: 76%;

          transform:
            translate(
              -50%,
              -50%
            );

          background:
            radial-gradient(
              ellipse at center,
              rgba(
                203,
                159,
                83,
                0.18
              ) 0%,
              rgba(
                203,
                159,
                83,
                0.08
              ) 42%,
              transparent 72%
            );

          filter:
            blur(24px);

          pointer-events:
            none;
        }

        .guiropa-radio-hero__emblem-image {
          display: block;

          width: 100%;
          height: auto;

          max-height: 60vh;

          object-fit: contain;

          border-radius:
            17% / 9%;

          box-shadow:
            0 18px 38px
            rgba(
              58,
              38,
              24,
              0.18
            );

          filter:
            brightness(1.06)
            contrast(1.03)
            saturate(1.05);

          transition:
            transform .35s ease,
            filter .35s ease,
            box-shadow .35s ease;
        }

        .guiropa-radio-hero__emblem:hover
        .guiropa-radio-hero__emblem-image {
          transform:
            translateY(-3px);

          filter:
            brightness(1.09)
            contrast(1.03)
            saturate(1.06);

          box-shadow:
            0 22px 44px
            rgba(
              58,
              38,
              24,
              0.20
            );
        }

        .guiropa-radio-hero__copy {
          margin-top:
            1.35rem;
        }

        @media (
          max-width: 900px
        ) {
          .guiropa-radio-hero__emblem {
            width:
              min(
                500px,
                76vw
              );
          }

          .guiropa-radio-hero__emblem-image {
            max-height:
              56vh;
          }
        }

        @media (
          max-width: 600px
        ) {
          .guiropa-radio-hero__emblem {
            width:
              min(
                390px,
                88vw
              );
          }

          .guiropa-radio-hero__emblem-image {
            max-height:
              none;

            border-radius:
              16% / 8%;
          }

          .guiropa-radio-hero__copy {
            margin-top:
              1rem;
          }
        }
      `}</style>
    </section>
  );
}
