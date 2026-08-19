import { Link } from "react-router-dom";

import Hero from "../components/Hero.jsx";
import ExploreHub from "../components/ExploreHub.jsx";
import ActionHub from "../components/ActionHub.jsx";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { assetUrl } from "../utils/assetUrl.js";

import marvinPortrait from "../assets/marvin.gaye.webp";

const ADVERTISING_ART =
  assetUrl("assets/guiropa-radio-anuncie-vintage-15-dias.png");

const ARCHIVE_COPY = {
  pt: {
    eyebrow:
      "THE GUIROPA ARCHIVES · PORTRAIT 001",

    name:
      "MARVIN GAYE",

    title:
      "A voz que decidiu não ficar calada.",

    lead:
      "Do menino que cantava numa igreja em Washington ao homem que enfrentou a própria gravadora para perguntar ao mundo: What's Going On?",

    years:
      "1939 — 1984",

    quote:
      "Amor. Política. Desejo. Perda. Contradição. Uma das vozes mais importantes do século XX.",

    action:
      "LER A HISTÓRIA",

    collection:
      "GUIROPA RADIO · THE ARCHIVES",

    adEyebrow:
      "PUBLICIDADE · GUIROPA RADIO",
    adTitle:
      "Seu negócio também pode estar aqui.",
    adLead:
      "15 dias por nossa conta. Experimente anunciar na GUIROPA.",
    adAction:
      "ANUNCIE NA GUIROPA",
  },

  en: {
    eyebrow:
      "THE GUIROPA ARCHIVES · PORTRAIT 001",

    name:
      "MARVIN GAYE",

    title:
      "The voice that chose not to stay quiet.",

    lead:
      "From the boy who sang in a Washington church to the man who challenged his own label and asked the world: What's Going On?",

    years:
      "1939 — 1984",

    quote:
      "Love. Politics. Desire. Loss. Contradiction. One of the most important voices of the twentieth century.",

    action:
      "READ THE STORY",

    collection:
      "GUIROPA RADIO · THE ARCHIVES",

    adEyebrow:
      "ADVERTISING · GUIROPA RADIO",
    adTitle:
      "Your business could be here too.",
    adLead:
      "15 days on us. Try advertising on GUIROPA.",
    adAction:
      "ADVERTISE ON GUIROPA",
  },

  es: {
    eyebrow:
      "THE GUIROPA ARCHIVES · PORTRAIT 001",

    name:
      "MARVIN GAYE",

    title:
      "La voz que decidió no quedarse callada.",

    lead:
      "Del niño que cantaba en una iglesia de Washington al hombre que desafió a su propia discográfica para preguntarle al mundo: What's Going On?",

    years:
      "1939 — 1984",

    quote:
      "Amor. Política. Deseo. Pérdida. Contradicción. Una de las voces más importantes del siglo XX.",

    action:
      "LEER LA HISTORIA",

    collection:
      "GUIROPA RADIO · THE ARCHIVES",

    adEyebrow:
      "PUBLICIDAD · GUIROPA RADIO",
    adTitle:
      "Tu negocio también puede estar aquí.",
    adLead:
      "15 días por nuestra cuenta. Prueba anunciarte en GUIROPA.",
    adAction:
      "ANÚNCIATE EN GUIROPA",
  },
};

export default function HomePage() {
  const { lang } = useLanguage();

  const copy =
    ARCHIVE_COPY[lang] ||
    ARCHIVE_COPY.pt;

  return (
    <main className="guiropa-radio-home">
      <style>{`
        .guiropa-home-archive {
          --gha-paper:
            #f4ead7;

          --gha-ink:
            #211a15;

          --gha-soft:
            #766654;

          --gha-red:
            #b83224;

          --gha-gold:
            #c69843;

          --gha-dark:
            #0d0b09;

          --gha-line:
            rgba(
              78,
              57,
              38,
              0.18
            );

          position: relative;

          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              #f7eedf 0%,
              var(--gha-paper) 100%
            );

          color:
            var(--gha-ink);

          border-top:
            1px solid
            var(--gha-line);

          border-bottom:
            1px solid
            var(--gha-line);
        }

        .guiropa-home-archive__shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin:
            0 auto;

          padding:
            clamp(
              5rem,
              9vw,
              8rem
            )
            0;
        }

        .guiropa-home-archive__grid {
          display: grid;

          grid-template-columns:
            minmax(
              320px,
              0.92fr
            )
            minmax(
              0,
              1.08fr
            );

          gap:
            clamp(
              3rem,
              7vw,
              6rem
            );

          align-items:
            center;
        }

        .guiropa-home-archive__image {
          position:
            relative;

          min-height:
            620px;

          overflow:
            hidden;

          background:
            #111;
        }

        .guiropa-home-archive__image img {
          display:
            block;

          width:
            100%;

          height:
            100%;

          min-height:
            620px;

          object-fit:
            cover;

          object-position:
            center;

          filter:
            grayscale(1)
            contrast(1.04);
        }

        .guiropa-home-archive__image::after {
          content:
            "";

          position:
            absolute;

          inset:
            0;

          pointer-events:
            none;

          background:
            linear-gradient(
              180deg,
              rgba(
                0,
                0,
                0,
                0
              )
              52%,
              rgba(
                0,
                0,
                0,
                0.22
              )
              100%
            );
        }

        .guiropa-home-archive__portrait {
          position:
            absolute;

          left:
            1.3rem;

          bottom:
            1.3rem;

          z-index:
            2;

          color:
            rgba(
              255,
              255,
              255,
              0.78
            );

          font-size:
            0.55rem;

          font-weight:
            900;

          letter-spacing:
            0.18em;

          text-transform:
            uppercase;
        }

        .guiropa-home-archive__eyebrow {
          display:
            block;

          color:
            var(--gha-red);

          font-size:
            0.63rem;

          font-weight:
            900;

          letter-spacing:
            0.22em;

          text-transform:
            uppercase;
        }

        .guiropa-home-archive__name {
          margin:
            1.2rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              4rem,
              8vw,
              7.7rem
            );

          font-weight:
            400;

          line-height:
            0.82;

          letter-spacing:
            -0.06em;
        }

        .guiropa-home-archive__title {
          max-width:
            700px;

          margin:
            1.6rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2rem,
              4vw,
              3.7rem
            );

          font-weight:
            400;

          line-height:
            1.04;

          letter-spacing:
            -0.04em;
        }

        .guiropa-home-archive__lead {
          max-width:
            660px;

          margin:
            2rem
            0
            0;

          color:
            var(--gha-soft);

          font-size:
            clamp(
              0.98rem,
              1.5vw,
              1.12rem
            );

          line-height:
            1.8;
        }

        .guiropa-home-archive__quote {
          max-width:
            640px;

          margin:
            2.2rem
            0
            0;

          padding:
            1.5rem
            0
            1.5rem
            1.5rem;

          border-left:
            1px solid
            var(--gha-red);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              1.2rem,
              2.3vw,
              1.8rem
            );

          line-height:
            1.42;
        }

        .guiropa-home-archive__meta {
          display:
            flex;

          justify-content:
            space-between;

          gap:
            1rem;

          margin-top:
            2.4rem;

          padding-top:
            1.2rem;

          border-top:
            1px solid
            var(--gha-line);
        }

        .guiropa-home-archive__years {
          color:
            var(--gha-red);

          font-size:
            0.66rem;

          font-weight:
            900;

          letter-spacing:
            0.18em;
        }

        .guiropa-home-archive__collection {
          color:
            var(--gha-soft);

          font-size:
            0.58rem;

          font-weight:
            800;

          letter-spacing:
            0.12em;

          text-align:
            right;

          text-transform:
            uppercase;
        }

        .guiropa-home-archive__action {
          min-height:
            52px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            2rem;

          margin-top:
            2rem;

          padding:
            0
            18px;

          border:
            1px solid
            var(--gha-dark);

          background:
            var(--gha-dark);

          color:
            #fff6e7;

          font-size:
            0.63rem;

          font-weight:
            900;

          letter-spacing:
            0.09em;

          text-decoration:
            none;

          text-transform:
            uppercase;

          transition:
            background
            0.2s
            ease,
            border-color
            0.2s
            ease,
            transform
            0.2s
            ease;
        }

        .guiropa-home-archive__action:hover {
          border-color:
            var(--gha-red);

          background:
            var(--gha-red);

          transform:
            translateY(
              -2px
            );
        }

        .guiropa-home-archive__action-arrow {
          color:
            var(--gha-gold);

          font-size:
            1rem;
        }


        /* ADVERTISING BANNER */

        .guiropa-home-ad {
          padding:
            clamp(4rem, 7vw, 6rem)
            0;

          border-top:
            1px solid
            rgba(78, 57, 38, 0.18);

          border-bottom:
            1px solid
            rgba(78, 57, 38, 0.18);

          background:
            linear-gradient(
              180deg,
              #f6ecd9 0%,
              #ead3ad 100%
            );
        }

        .guiropa-home-ad__shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin:
            0 auto;
        }

        .guiropa-home-ad__frame {
          overflow:
            hidden;

          border:
            1px solid
            rgba(69, 48, 30, 0.34);

          border-radius:
            20px;

          background:
            #ead3ad;

          box-shadow:
            0 26px 70px
            rgba(57, 38, 23, 0.18);
        }

        .guiropa-home-ad__image {
          display:
            block;

          width:
            100%;

          height:
            auto;

          max-height:
            820px;

          object-fit:
            contain;

          background:
            #ead3ad;
        }

        .guiropa-home-ad__content {
          display:
            grid;

          grid-template-columns:
            minmax(0, 1fr)
            auto;

          gap:
            clamp(1.5rem, 4vw, 3rem);

          align-items:
            center;

          padding:
            clamp(1.5rem, 4vw, 2.7rem);

          border-top:
            1px solid
            rgba(69, 48, 30, 0.20);
        }

        .guiropa-home-ad__eyebrow {
          display:
            block;

          color:
            #b83224;

          font-size:
            0.62rem;

          font-weight:
            900;

          letter-spacing:
            0.2em;

          text-transform:
            uppercase;
        }

        .guiropa-home-ad__title {
          margin:
            0.7rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.5rem,
              5vw,
              4.8rem
            );

          font-weight:
            400;

          line-height:
            0.96;

          letter-spacing:
            -0.05em;
        }

        .guiropa-home-ad__lead {
          margin:
            1rem
            0
            0;

          color:
            #756451;

          font-size:
            clamp(
              0.96rem,
              1.5vw,
              1.1rem
            );

          line-height:
            1.65;
        }

        .guiropa-home-ad__action {
          min-height:
            52px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            1rem;

          padding:
            0 20px;

          border:
            1px solid
            #0d0b09;

          background:
            #0d0b09;

          color:
            #fff4df;

          font-size:
            0.63rem;

          font-weight:
            900;

          letter-spacing:
            0.1em;

          text-decoration:
            none;

          text-transform:
            uppercase;

          white-space:
            nowrap;
        }

        .guiropa-home-ad__action:hover {
          border-color:
            #b83224;

          background:
            #b83224;
        }

        @media (
          max-width:
          900px
        ) {
          .guiropa-home-archive__grid,
          .guiropa-home-ad__content {
            grid-template-columns:
              1fr;
          }

          .guiropa-home-ad__action {
            justify-self:
              start;
          }

          .guiropa-home-archive__image {
            min-height:
              520px;
          }

          .guiropa-home-archive__image img {
            min-height:
              520px;
          }
        }

        @media (
          max-width:
          600px
        ) {
          .guiropa-home-archive__shell,
          .guiropa-home-ad__shell {
            width:
              min(
                100% - 24px,
                650px
              );
          }

          .guiropa-home-ad__frame {
            border-radius:
              14px;
          }

          .guiropa-home-ad__content {
            padding:
              1.25rem;
          }

          .guiropa-home-ad__action {
            width:
              100%;
          }

          .guiropa-home-archive__image {
            min-height:
              420px;
          }

          .guiropa-home-archive__image img {
            min-height:
              420px;
          }

          .guiropa-home-archive__name {
            font-size:
              clamp(
                3.8rem,
                18vw,
                6rem
              );
          }

          .guiropa-home-archive__meta {
            display:
              block;
          }

          .guiropa-home-archive__collection {
            margin-top:
              0.7rem;

            text-align:
              left;
          }
        }
      `}</style>

      <Hero />

      <ExploreHub />

      <section className="guiropa-home-ad">
        <div className="guiropa-home-ad__shell">
          <div className="guiropa-home-ad__frame">
            <img
              className="guiropa-home-ad__image"
              src={ADVERTISING_ART}
              alt={copy.adTitle}
              loading="eager"
              decoding="async"
            />

            <div className="guiropa-home-ad__content">
              <div>
                <span className="guiropa-home-ad__eyebrow">
                  {copy.adEyebrow}
                </span>

                <h2 className="guiropa-home-ad__title">
                  {copy.adTitle}
                </h2>

                <p className="guiropa-home-ad__lead">
                  {copy.adLead}
                </p>
              </div>

              <Link
                className="guiropa-home-ad__action"
                to="/anuncie"
              >
                <span>{copy.adAction}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="guiropa-home-archive">
        <div className="guiropa-home-archive__shell">
          <div className="guiropa-home-archive__grid">
            <div className="guiropa-home-archive__image">
              <img
                src={marvinPortrait}
                alt="Marvin Gaye"
                loading="lazy"
                decoding="async"
              />

              <span className="guiropa-home-archive__portrait">
                Portrait 001
              </span>
            </div>

            <div className="guiropa-home-archive__copy">
              <span className="guiropa-home-archive__eyebrow">
                {copy.eyebrow}
              </span>

              <h2 className="guiropa-home-archive__name">
                {copy.name}
              </h2>

              <div className="guiropa-home-archive__title">
                {copy.title}
              </div>

              <p className="guiropa-home-archive__lead">
                {copy.lead}
              </p>

              <div className="guiropa-home-archive__quote">
                {copy.quote}
              </div>

              <div className="guiropa-home-archive__meta">
                <span className="guiropa-home-archive__years">
                  {copy.years}
                </span>

                <span className="guiropa-home-archive__collection">
                  {copy.collection}
                </span>
              </div>

              <Link
                className="guiropa-home-archive__action"
                to="/marvin-gaye"
              >
                <span>
                  {copy.action}
                </span>

                <span
                  className="guiropa-home-archive__action-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ActionHub />
    </main>
  );
}
