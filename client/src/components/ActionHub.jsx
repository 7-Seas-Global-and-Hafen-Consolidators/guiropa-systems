import { Link } from "react-router-dom";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "../data/brandAssets.js";

export default function ActionHub() {
  const { t } = useLanguage();

  return (
    <section
      className="guiropa-destinations section guiropa-entry-hub"
      id="explorar"
    >
      <style>{`
        .guiropa-entry-hub {
          position: relative;

          min-height: 0 !important;

          padding:
            clamp(4.5rem, 8vw, 7rem)
            0
            clamp(4.5rem, 8vw, 7rem) !important;

          overflow: hidden;

          background:
            radial-gradient(
              ellipse 58% 46% at 50% 0%,
              rgba(180, 138, 67, 0.12),
              transparent 72%
            ),
            linear-gradient(
              180deg,
              #241d17 0%,
              #171411 58%,
              #1d1814 100%
            ) !important;

          color: #f6ead2;
        }

        .guiropa-entry-hub::before {
          content: "";

          position: absolute;

          left: 50%;
          top: 0;

          width: min(760px, 78vw);
          height: 1px;

          transform: translateX(-50%);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(210, 176, 108, 0.52),
              transparent
            );
        }

        .guiropa-entry-hub__top {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(150px, 230px);

          align-items: center;

          gap:
            clamp(2rem, 6vw, 5rem);

          padding-bottom:
            clamp(2.8rem, 5vw, 4.2rem);

          border-bottom:
            1px solid
            rgba(210, 176, 108, 0.18);
        }

        .guiropa-entry-hub__kicker {
          display: block;

          color: #d6ae63;

          font-size: 0.65rem;
          font-weight: 800;

          letter-spacing: 0.28em;

          text-transform: uppercase;
        }

        .guiropa-entry-hub__title {
          margin:
            0.8rem 0 0;

          max-width: 760px;

          color: #f7ead3;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.5rem,
              5.5vw,
              4.8rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-entry-hub__lead {
          max-width: 680px;

          margin:
            1.3rem 0 0;

          color: #bfae94;

          font-size:
            clamp(
              0.95rem,
              1.35vw,
              1.08rem
            );

          line-height: 1.75;
        }

        .guiropa-entry-hub__emblem {
          display: flex;

          justify-content: flex-end;

          align-items: center;
        }

        .guiropa-entry-hub__emblem img {
          display: block;

          width:
            min(
              100%,
              205px
            );

          height: auto;

          border-radius:
            17% / 9%;

          filter:
            brightness(1.08)
            contrast(1.03)
            saturate(1.05);

          box-shadow:
            0 14px 32px
            rgba(0, 0, 0, 0.30);
        }

        .guiropa-entry-hub__signal {
          display: flex;

          align-items: center;

          gap: 0.7rem;

          margin-top: 1.8rem;
        }

        .guiropa-entry-hub__signal-dot {
          width: 7px;
          height: 7px;

          flex: 0 0 auto;

          border-radius: 50%;

          background: #b83224;

          box-shadow:
            0 0 0 5px
            rgba(184, 50, 36, 0.11);
        }

        .guiropa-entry-hub__signal-text {
          color: #d5c29f;

          font-size: 0.63rem;
          font-weight: 800;

          letter-spacing: 0.18em;

          text-transform: uppercase;
        }

        .guiropa-entry-hub__grid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          margin-top:
            clamp(2rem, 4vw, 3rem);

          border-top:
            1px solid
            rgba(210, 176, 108, 0.19);

          border-bottom:
            1px solid
            rgba(210, 176, 108, 0.19);
        }

        .guiropa-entry-card {
          position: relative;

          min-height: 260px;

          display: flex;
          flex-direction: column;

          padding:
            clamp(
              1.8rem,
              3vw,
              2.5rem
            );

          color: #f7ead3;

          text-decoration: none;

          border-right:
            1px solid
            rgba(210, 176, 108, 0.17);

          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.018),
              rgba(255, 255, 255, 0)
            );

          transition:
            background 0.28s ease,
            transform 0.28s ease,
            border-color 0.28s ease;
        }

        .guiropa-entry-card:last-child {
          border-right: 0;
        }

        .guiropa-entry-card:hover {
          transform: translateY(-4px);

          background:
            linear-gradient(
              145deg,
              rgba(179, 52, 40, 0.16),
              rgba(180, 138, 67, 0.07)
            );
        }

        .guiropa-entry-card__index {
          display: block;

          color: #d8b469;

          font-size: 0.62rem;
          font-weight: 900;

          letter-spacing: 0.16em;
        }

        .guiropa-entry-card h3 {
          margin:
            auto 0 0;

          color: #f7ead3;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              1.8rem,
              3vw,
              2.8rem
            );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.035em;
        }

        .guiropa-entry-card p {
          min-height: 3.4em;

          margin:
            1rem 0 0;

          color: #ae9c82;

          font-size: 0.86rem;

          line-height: 1.65;
        }

        .guiropa-entry-card__bottom {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 1rem;

          margin-top: 1.6rem;

          padding-top: 1.15rem;

          border-top:
            1px solid
            rgba(210, 176, 108, 0.12);
        }

        .guiropa-entry-card__era {
          color: rgba(216, 180, 105, 0.74);

          font-size: 0.57rem;
          font-weight: 800;

          letter-spacing: 0.17em;

          text-transform: uppercase;
        }

        .guiropa-entry-card__arrow {
          color: #d8b469;

          font-size: 1.25rem;

          transition:
            transform 0.25s ease;
        }

        .guiropa-entry-card:hover
        .guiropa-entry-card__arrow {
          transform:
            translateX(5px);
        }

        .guiropa-entry-hub__timeline {
          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          margin-top: 2.2rem;
        }

        .guiropa-entry-hub__timeline span {
          padding:
            0.6rem 0;

          text-align: center;

          font-size: 0.61rem;
          font-weight: 800;

          letter-spacing: 0.13em;
        }

        .guiropa-entry-hub__timeline span:nth-child(1) {
          color: #c74739;
        }

        .guiropa-entry-hub__timeline span:nth-child(2) {
          color: #4ba3a0;
        }

        .guiropa-entry-hub__timeline span:nth-child(3) {
          color: #e58b35;
        }

        .guiropa-entry-hub__timeline span:nth-child(4) {
          color: #ee4b82;
        }

        .guiropa-entry-hub__timeline span:nth-child(5) {
          color: #4b82bb;
        }

        @media (max-width: 800px) {
          .guiropa-entry-hub__top {
            grid-template-columns: 1fr;
          }

          .guiropa-entry-hub__emblem {
            justify-content: flex-start;
          }

          .guiropa-entry-hub__emblem img {
            width: 170px;
          }

          .guiropa-entry-hub__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-entry-card {
            min-height: 220px;

            border-right: 0;

            border-bottom:
              1px solid
              rgba(210, 176, 108, 0.17);
          }

          .guiropa-entry-card:last-child {
            border-bottom: 0;
          }
        }

        @media (max-width: 520px) {
          .guiropa-entry-hub {
            padding:
              4rem 0 !important;
          }

          .guiropa-entry-hub__title {
            font-size:
              clamp(
                2.3rem,
                12vw,
                3.6rem
              );
          }

          .guiropa-entry-hub__timeline {
            overflow-x: auto;

            grid-template-columns:
              repeat(
                5,
                minmax(72px, 1fr)
              );
          }
        }
      `}</style>

      <div className="container">
        <div className="guiropa-entry-hub__top">
          <div>
            <span className="guiropa-entry-hub__kicker">
              {t.hub.eyebrow}
            </span>

            <h2 className="guiropa-entry-hub__title">
              {t.hub.headline}
            </h2>

            <p className="guiropa-entry-hub__lead">
              {t.hub.lead}
            </p>

            <div
              className="guiropa-entry-hub__signal"
              aria-hidden="true"
            >
              <span className="guiropa-entry-hub__signal-dot" />

              <span className="guiropa-entry-hub__signal-text">
                GUIROPA RADIO · 1950 — 1990
              </span>
            </div>
          </div>

          <div
            className="guiropa-entry-hub__emblem"
            aria-hidden="true"
          >
            <img
              src={GUIROPA_EMBLEM_SRC}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="guiropa-entry-hub__grid">
          {t.hub.cards.map((card, index) => (
            <Link
              key={card.href}
              to={card.href}
              className="guiropa-entry-card"
            >
              <span className="guiropa-entry-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>
                {card.title}
              </h3>

              <p>
                {card.description}
              </p>

              <div className="guiropa-entry-card__bottom">
                <span className="guiropa-entry-card__era">
                  1950 — 1990
                </span>

                <span
                  className="guiropa-entry-card__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="guiropa-entry-hub__timeline"
          aria-hidden="true"
        >
          <span>1950</span>
          <span>1960</span>
          <span>1970</span>
          <span>1980</span>
          <span>1990</span>
        </div>
      </div>
    </section>
  );
}
