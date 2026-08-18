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
        /* =====================================================
           GUIROPA RADIO — HERO EMBLEM FINAL
           O contêiner acompanha EXATAMENTE a imagem vertical.
           ===================================================== */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__glow {
          display: none !important;
        }

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__logo {
          display: none !important;
        }

        /*
         * CRÍTICO:
         * não existe mais largura fixa grande no wrapper.
         * Ele passa a ter exatamente a largura da imagem.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem {
          position: relative;
          z-index: 4;

          display: flex;

          width: fit-content !important;
          max-width: none !important;
          height: auto !important;

          margin: 0 auto;

          padding: 0 !important;

          align-items: center;
          justify-content: center;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          box-shadow: none !important;

          overflow: visible !important;
        }

        /*
         * Mata QUALQUER decoração antiga
         * que ainda tente gerar painel atrás.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem::before,
        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem::after {
          content: none !important;

          display: none !important;

          width: 0 !important;
          height: 0 !important;

          background: transparent !important;

          border: 0 !important;

          box-shadow: none !important;

          opacity: 0 !important;
        }

        /*
         * Agora QUEM DEFINE A LARGURA é a própria imagem.
         *
         * Sem max-height.
         * Sem wrapper mais largo.
         * Sem espaço claro lateral.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__emblem-image {
          display: block !important;

          width: clamp(
            230px,
            25vw,
            330px
          ) !important;

          max-width: 330px !important;

          height: auto !important;

          max-height: none !important;

          margin: 0 !important;

          padding: 0 !important;

          object-fit: contain;

          background: transparent !important;

          border: 0 !important;
          border-radius: 0 !important;

          opacity: 1 !important;

          box-shadow:
            0 16px 30px
            rgba(
              63,
              41,
              23,
              0.16
            );

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
            0 19px 34px
            rgba(
              63,
              41,
              23,
              0.18
            );
        }

        /*
         * Remove também qualquer pseudo-elemento
         * herdado do hero antigo.
         */

        .guiropa-radio-hero--emblem::before,
        .guiropa-radio-hero--emblem::after {
          opacity: 0 !important;

          background: none !important;

          pointer-events: none !important;
        }

        /*
         * Fundo único e contínuo.
         * Não existe mais nenhuma placa por trás do emblema.
         */

        .guiropa-radio-hero--emblem {
          background:
            radial-gradient(
              ellipse 46% 34%
              at 50% 18%,
              rgba(
                179,
                52,
                40,
                0.05
              ),
              transparent 72%
            ),
            linear-gradient(
              180deg,
              #f8eedc 0%,
              #f2e1c3 55%,
              #e7cda4 100%
            ) !important;
        }

        /*
         * Compacta um pouco o conjunto.
         */

        .guiropa-radio-hero--emblem
        .guiropa-radio-era {
          margin-bottom: 1rem;
        }

        .guiropa-radio-hero--emblem
        .guiropa-radio-hero__copy {
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__emblem-image {
            width: clamp(
              220px,
              34vw,
              300px
            ) !important;

            max-width: 300px !important;
          }
        }

        @media (max-width: 600px) {
          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__emblem-image {
            width: min(
              260px,
              68vw
            ) !important;

            max-width: 260px !important;
          }

          .guiropa-radio-hero--emblem
          .guiropa-radio-hero__copy {
            margin-top: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
