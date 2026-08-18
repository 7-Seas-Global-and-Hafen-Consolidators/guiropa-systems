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
    el.style.transform = "translateY(14px)";

    requestAnimationFrame(() => {
      el.style.transition =
        "opacity .85s ease, transform .85s cubic-bezier(.22,1,.36,1)";

      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section
      className="hero guiropa-radio-hero guiropa-radio-hero--emblem"
      aria-labelledby="hero-title"
    >
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
        /*
         * NOVO EMBLEMA:
         * elimina completamente os fundos/halos herdados
         * do logo retangular anterior.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__glow {
          display: none !important;
        }

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__logo {
          display: none !important;
        }

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem {
          position: relative;
          z-index: 4;

          width: min(430px, 52vw);

          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: center;

          background: transparent !important;

          border: 0 !important;

          box-shadow: none !important;

          overflow: visible;
        }

        /*
         * Mata qualquer pseudo-elemento antigo
         * que esteja criando aquela placa clara vazia.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem::before,
        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem::after {
          content: none !important;
          display: none !important;
          background: none !important;
          box-shadow: none !important;
        }

        /*
         * A própria imagem agora é a protagonista.
         * Sem moldura CSS, sem fundo adicional,
         * sem "quadro branco".
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem-image {
          display: block;

          width: 100%;
          height: auto;

          max-height: 48vh;

          object-fit: contain;

          background: transparent !important;

          border: 0 !important;

          border-radius: 0 !important;

          box-shadow:
            0 17px 30px
            rgba(66, 43, 23, 0.14);

          filter:
            brightness(1.04)
            contrast(1.02)
            saturate(1.04);

          transition:
            transform .3s ease,
            filter .3s ease,
            box-shadow .3s ease;
        }

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem:hover
        .guiropa-radio-hero__emblem-image {
          transform: translateY(-2px);

          filter:
            brightness(1.07)
            contrast(1.02)
            saturate(1.05);

          box-shadow:
            0 20px 34px
            rgba(66, 43, 23, 0.16);
        }

        /*
         * Aproxima texto e marca.
         * Menos espaço morto no topo.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-era {
          margin-bottom: 1rem;
        }

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__copy {
          margin-top: 1.15rem;
        }

        /*
         * Garante que nenhum pseudo-elemento antigo
         * do hero faça aquela grande mancha arredondada.
         */

        .guiropa-radio-hero--emblem::before,
        .guiropa-radio-hero--emblem::after {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /*
         * Mantém apenas o fundo quente geral.
         */

        .guiropa-radio-hero--emblem {
          background:
            radial-gradient(
              ellipse 55% 42% at 50% 18%,
              rgba(179, 52, 40, 0.055),
              transparent 72%
            ),
            linear-gradient(
              180deg,
              #f8eedc 0%,
              #f2e1c3 55%,
              #e7cda4 100%
            ) !important;
        }

        @media (max-width: 900px) {
          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__emblem {
            width: min(390px, 60vw);
          }

          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__emblem-image {
            max-height: 46vh;
          }
        }

        @media (max-width: 600px) {
          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__emblem {
            width: min(330px, 72vw);
          }

          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__emblem-image {
            max-height: none;
          }

          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__copy {
            margin-top: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
