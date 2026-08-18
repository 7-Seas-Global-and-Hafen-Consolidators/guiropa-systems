import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

const TELEGRAM_URL =
  "https://t.me/m/t6seeX61ZTlk";

const WHATSAPP_URL =
  "https://wa.me/48732099369?text=Olá%21%20Quero%20anunciar%20na%20GUIROPA%20RADIO.";

const EMAIL_URL = "ethanscrovam@protonmail.ch";

const COPY = {
  pt: {
    eyebrow: "GUIROPA RADIO · PUBLICIDADE",
    title: "Anuncie.",
    lead: "Sua marca na GUIROPA Radio.",

    numbersEyebrow: "GUIROPA EM NÚMEROS",
    numbersTitle: "Espaço para aparecer.",

    metrics: [
      {
        value: "22",
        unit: "ANOS",
        label: "Experiência",
      },
      {
        value: "30",
        unit: "PAÍSES",
        label: "Alcance internacional",
      },
      {
        value: "22",
        unit: "PRESENÇAS",
        label: "Internacionais",
      },
      {
        value: "50K+",
        unit: "ALCANCE",
        label: "Projetado",
      },
    ],

    extraMetrics: [
      ["3 IDIOMAS", "PT · EN · ES"],
      ["24/7", "NO AR"],
      ["1950 — 1990", "PROGRAMAÇÃO"],
    ],

    formatsEyebrow: "FORMATOS",
    formatsTitle: "Escolha o espaço.",

    formats: [
      {
        number: "01",
        title: "Banner",
        description: "Home e páginas internas.",
      },
      {
        number: "02",
        title: "Destaque",
        description: "Posições de maior evidência.",
      },
      {
        number: "03",
        title: "Conteúdo",
        description: "Publicidade integrada e identificada.",
      },
      {
        number: "04",
        title: "Campanha",
        description: "Combinação de formatos e posições.",
      },
    ],

    periodEyebrow: "PERÍODO",
    periodTitle: "7 · 15 · 30 dias",
    periodLead: "Outros períodos sob consulta.",

    materialReady: "Material pronto",
    materialReadyText: "Envie sua peça.",

    materialCreate: "Precisa da peça?",
    materialCreateText: "A criação pode ser incluída.",

    placementEyebrow: "VEICULAÇÃO",
    placementTitle: "Onde aparece.",

    placements: [
      {
        title: "Home",
        text: "Topo · entre seções · destaque",
      },
      {
        title: "Ouvir",
        text: "Áreas selecionadas da experiência de rádio",
      },
      {
        title: "Programação",
        text: "Posições entre blocos e décadas",
      },
      {
        title: "Loja",
        text: "Áreas comerciais selecionadas",
      },
    ],

    contactEyebrow: "GUIROPA RADIO · PUBLICIDADE",
    contactTitle: "Quer anunciar?",
    contactLead:
      "Escolha o formato e o período. Fale conosco.",

    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "E-mail",
    unavailable: "Em preparação",
  },

  en: {
    eyebrow: "GUIROPA RADIO · ADVERTISING",
    title: "Advertise.",
    lead: "Your brand on GUIROPA Radio.",

    numbersEyebrow: "GUIROPA IN NUMBERS",
    numbersTitle: "Space to be seen.",

    metrics: [
      {
        value: "22",
        unit: "YEARS",
        label: "Experience",
      },
      {
        value: "30",
        unit: "COUNTRIES",
        label: "International reach",
      },
      {
        value: "22",
        unit: "PRESENCES",
        label: "International",
      },
      {
        value: "50K+",
        unit: "REACH",
        label: "Projected",
      },
    ],

    extraMetrics: [
      ["3 LANGUAGES", "PT · EN · ES"],
      ["24/7", "ON AIR"],
      ["1950 — 1990", "PROGRAMMING"],
    ],

    formatsEyebrow: "FORMATS",
    formatsTitle: "Choose the space.",

    formats: [
      {
        number: "01",
        title: "Banner",
        description: "Home and internal pages.",
      },
      {
        number: "02",
        title: "Feature",
        description: "Higher-visibility positions.",
      },
      {
        number: "03",
        title: "Content",
        description: "Integrated and identified advertising.",
      },
      {
        number: "04",
        title: "Campaign",
        description: "Combination of formats and positions.",
      },
    ],

    periodEyebrow: "PERIOD",
    periodTitle: "7 · 15 · 30 days",
    periodLead: "Other periods upon request.",

    materialReady: "Material ready",
    materialReadyText: "Send your artwork.",

    materialCreate: "Need the artwork?",
    materialCreateText: "Creation can be included.",

    placementEyebrow: "PLACEMENT",
    placementTitle: "Where it appears.",

    placements: [
      {
        title: "Home",
        text: "Top · between sections · feature",
      },
      {
        title: "Listen",
        text: "Selected areas of the radio experience",
      },
      {
        title: "Schedule",
        text: "Positions between blocks and decades",
      },
      {
        title: "Store",
        text: "Selected commercial areas",
      },
    ],

    contactEyebrow: "GUIROPA RADIO · ADVERTISING",
    contactTitle: "Want to advertise?",
    contactLead:
      "Choose the format and period. Talk to us.",

    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "E-mail",
    unavailable: "Coming soon",
  },

  es: {
    eyebrow: "GUIROPA RADIO · PUBLICIDAD",
    title: "Anúnciate.",
    lead: "Tu marca en GUIROPA Radio.",

    numbersEyebrow: "GUIROPA EN NÚMEROS",
    numbersTitle: "Espacio para aparecer.",

    metrics: [
      {
        value: "22",
        unit: "AÑOS",
        label: "Experiencia",
      },
      {
        value: "30",
        unit: "PAÍSES",
        label: "Alcance internacional",
      },
      {
        value: "22",
        unit: "PRESENCIAS",
        label: "Internacionales",
      },
      {
        value: "50K+",
        unit: "ALCANCE",
        label: "Proyectado",
      },
    ],

    extraMetrics: [
      ["3 IDIOMAS", "PT · EN · ES"],
      ["24/7", "AL AIRE"],
      ["1950 — 1990", "PROGRAMACIÓN"],
    ],

    formatsEyebrow: "FORMATOS",
    formatsTitle: "Elige el espacio.",

    formats: [
      {
        number: "01",
        title: "Banner",
        description: "Home y páginas internas.",
      },
      {
        number: "02",
        title: "Destacado",
        description: "Posiciones de mayor visibilidad.",
      },
      {
        number: "03",
        title: "Contenido",
        description: "Publicidad integrada e identificada.",
      },
      {
        number: "04",
        title: "Campaña",
        description: "Combinación de formatos y posiciones.",
      },
    ],

    periodEyebrow: "PERÍODO",
    periodTitle: "7 · 15 · 30 días",
    periodLead: "Otros períodos bajo consulta.",

    materialReady: "Material listo",
    materialReadyText: "Envía tu pieza.",

    materialCreate: "¿Necesitas la pieza?",
    materialCreateText: "La creación puede incluirse.",

    placementEyebrow: "PUBLICACIÓN",
    placementTitle: "Dónde aparece.",

    placements: [
      {
        title: "Home",
        text: "Parte superior · entre secciones · destacado",
      },
      {
        title: "Escuchar",
        text: "Áreas seleccionadas de la experiencia de radio",
      },
      {
        title: "Programación",
        text: "Posiciones entre bloques y décadas",
      },
      {
        title: "Tienda",
        text: "Áreas comerciales seleccionadas",
      },
    ],

    contactEyebrow: "GUIROPA RADIO · PUBLICIDAD",
    contactTitle: "¿Quieres anunciarte?",
    contactLead:
      "Elige el formato y el período. Habla con nosotros.",

    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "Correo",
    unavailable: "Próximamente",
  },
};

export default function AdvertisePage() {
  const { lang } = useLanguage();

  const copy =
    COPY[lang] ||
    COPY.pt;

  return (
    <main className="guiropa-advertise-page">
      <style>{`
        .guiropa-advertise-page {
          --ga-paper: #f5ead6;
          --ga-paper-deep: #ead0a8;

          --ga-ink: #211b16;
          --ga-soft: #6e5f4d;

          --ga-red: #b83224;

          --ga-gold: #c99a45;
          --ga-gold-light: #e0bb70;
          --ga-gold-dark: #75501f;

          --ga-black: #0d0c0b;
          --ga-black-two: #17130f;

          --ga-line:
            rgba(
              76,
              56,
              39,
              0.18
            );

          min-height: 100vh;

          color:
            var(--ga-ink);

          background:
            linear-gradient(
              180deg,
              #f8efdf 0%,
              var(--ga-paper) 62%,
              var(--ga-paper-deep) 100%
            );
        }

        .guiropa-advertise-page *,
        .guiropa-advertise-page *::before,
        .guiropa-advertise-page *::after {
          box-sizing: border-box;
        }

        .guiropa-advertise-shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin: 0 auto;
        }

        .guiropa-advertise-eyebrow {
          display: block;

          color:
            var(--ga-red);

          font-size: 0.67rem;

          font-weight: 900;

          letter-spacing: 0.22em;

          text-transform: uppercase;
        }

        /* HERO */

        .guiropa-advertise-hero {
          padding:
            clamp(4.5rem, 8vw, 7rem)
            0
            clamp(4rem, 7vw, 6rem);
        }

        .guiropa-advertise-hero__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(190px, 270px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-advertise-hero h1 {
          margin:
            0.8rem
            0
            0;

          font-size:
            clamp(
              4.3rem,
              10vw,
              9.2rem
            );

          font-weight: 800;

          line-height: 0.84;

          letter-spacing: -0.07em;
        }

        .guiropa-advertise-hero__lead {
          margin:
            2rem
            0
            0;

          color:
            var(--ga-soft);

          font-size:
            clamp(
              1.05rem,
              2vw,
              1.4rem
            );

          line-height: 1.6;
        }

        .guiropa-advertise-emblem {
          display: flex;

          justify-content:
            flex-end;
        }

        .guiropa-advertise-emblem img {
          display: block;

          width:
            min(
              100%,
              220px
            );

          height: auto;

          box-shadow:
            0
            18px
            36px
            rgba(
              53,
              35,
              22,
              0.18
            );
        }

        /* NUMBERS */

        .guiropa-advertise-numbers {
          padding:
            clamp(4.5rem, 8vw, 7rem)
            0;

          background:
            linear-gradient(
              180deg,
              #181410,
              #0d0c0a
            );

          color:
            #f1dfbd;
        }

        .guiropa-advertise-numbers
        .guiropa-advertise-eyebrow {
          color:
            var(--ga-gold-light);
        }

        .guiropa-advertise-numbers h2 {
          margin:
            0.8rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.8rem,
              5.5vw,
              5.2rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-advertise-metrics {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(0, 1fr)
            );

          margin-top:
            clamp(3rem, 6vw, 5rem);

          border-top:
            1px solid
            rgba(
              201,
              154,
              69,
              0.28
            );

          border-bottom:
            1px solid
            rgba(
              201,
              154,
              69,
              0.28
            );
        }

        .guiropa-advertise-metric {
          min-width: 0;

          padding:
            clamp(
              2rem,
              4vw,
              3.2rem
            )
            clamp(
              1rem,
              2vw,
              2rem
            );

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.20
            );
        }

        .guiropa-advertise-metric:last-child {
          border-right: 0;
        }

        .guiropa-advertise-metric strong {
          display: block;

          color:
            var(--ga-gold-light);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              3rem,
              6vw,
              6.2rem
            );

          font-weight: 400;

          line-height: 0.88;

          letter-spacing: -0.06em;
        }

        .guiropa-advertise-metric b {
          display: block;

          margin-top: 0.8rem;

          color:
            #f1ddba;

          font-size: 0.62rem;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .guiropa-advertise-metric span {
          display: block;

          margin-top: 0.4rem;

          color:
            #8f7c61;

          font-size: 0.72rem;

          line-height: 1.4;
        }

        .guiropa-advertise-extra {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          border-bottom:
            1px solid
            rgba(
              201,
              154,
              69,
              0.20
            );
        }

        .guiropa-advertise-extra div {
          padding:
            1.5rem
            1rem;

          text-align: center;

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.16
            );
        }

        .guiropa-advertise-extra div:last-child {
          border-right: 0;
        }

        .guiropa-advertise-extra strong {
          display: block;

          color:
            #d7b46f;

          font-size: 0.7rem;

          letter-spacing: 0.13em;
        }

        .guiropa-advertise-extra span {
          display: block;

          margin-top: 0.35rem;

          color:
            #88765e;

          font-size: 0.56rem;

          letter-spacing: 0.12em;
        }

        /* FORMATS */

        .guiropa-advertise-formats {
          padding:
            clamp(5rem, 8vw, 7rem)
            0;
        }

        .guiropa-advertise-formats h2,
        .guiropa-advertise-placement h2 {
          margin:
            0.8rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.8rem,
              5.5vw,
              5rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-advertise-format-grid {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(0, 1fr)
            );

          margin-top:
            clamp(3rem, 5vw, 4.5rem);

          border-top:
            1px solid
            var(--ga-line);

          border-bottom:
            1px solid
            var(--ga-line);
        }

        .guiropa-advertise-format {
          min-height: 280px;

          display: flex;

          flex-direction: column;

          padding:
            2rem;

          border-right:
            1px solid
            var(--ga-line);
        }

        .guiropa-advertise-format:last-child {
          border-right: 0;
        }

        .guiropa-advertise-format__number {
          color:
            var(--ga-gold-dark);

          font-size: 0.62rem;

          font-weight: 900;

          letter-spacing: 0.14em;
        }

        .guiropa-advertise-format h3 {
          margin: auto 0 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2rem,
              3.2vw,
              3rem
            );

          font-weight: 400;

          line-height: 1;
        }

        .guiropa-advertise-format p {
          margin:
            0.8rem
            0
            0;

          color:
            var(--ga-soft);

          font-size: 0.85rem;

          line-height: 1.55;
        }

        /* PERIOD */

        .guiropa-advertise-period {
          padding:
            clamp(4rem, 7vw, 6rem)
            0;

          background:
            #12100d;

          color:
            #f1dfbd;
        }

        .guiropa-advertise-period
        .guiropa-advertise-eyebrow {
          color:
            var(--ga-gold-light);
        }

        .guiropa-advertise-period__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(300px, 440px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: center;
        }

        .guiropa-advertise-period h2 {
          margin:
            0.8rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              3.3rem,
              7vw,
              6.8rem
            );

          font-weight: 400;

          line-height: 0.92;

          letter-spacing: -0.055em;
        }

        .guiropa-advertise-period__lead {
          margin:
            1rem
            0
            0;

          color:
            #8e7c63;

          font-size: 0.85rem;
        }

        .guiropa-advertise-materials {
          display: grid;

          grid-template-columns:
            1fr
            1fr;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.25
            );
        }

        .guiropa-advertise-material {
          padding:
            1.8rem;

          border-right:
            1px solid
            rgba(
              201,
              154,
              69,
              0.20
            );
        }

        .guiropa-advertise-material:last-child {
          border-right: 0;
        }

        .guiropa-advertise-material strong {
          display: block;

          color:
            #e0bb70;

          font-size: 0.72rem;
        }

        .guiropa-advertise-material span {
          display: block;

          margin-top:
            0.5rem;

          color:
            #8c7b63;

          font-size: 0.7rem;

          line-height: 1.5;
        }

        /* PLACEMENT */

        .guiropa-advertise-placement {
          padding:
            clamp(5rem, 8vw, 7rem)
            0;
        }

        .guiropa-advertise-placement-grid {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              1fr
            );

          margin-top:
            clamp(3rem, 5vw, 4.5rem);

          border-top:
            1px solid
            var(--ga-line);

          border-bottom:
            1px solid
            var(--ga-line);
        }

        .guiropa-advertise-placement-card {
          min-height: 190px;

          padding:
            2rem;

          border-right:
            1px solid
            var(--ga-line);
        }

        .guiropa-advertise-placement-card:last-child {
          border-right: 0;
        }

        .guiropa-advertise-placement-card strong {
          display: block;

          color:
            var(--ga-red);

          font-size:
            0.64rem;

          font-weight: 900;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .guiropa-advertise-placement-card p {
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
              1.35rem,
              2.4vw,
              2.1rem
            );

          line-height: 1.15;
        }

        /* CONTACT */

        .guiropa-advertise-contact {
          padding:
            clamp(5rem, 8vw, 7rem)
            0;

          background:
            linear-gradient(
              180deg,
              #181410,
              #0d0c0a
            );

          color:
            #f1dfbd;
        }

        .guiropa-advertise-contact
        .guiropa-advertise-eyebrow {
          color:
            var(--ga-gold-light);
        }

        .guiropa-advertise-contact h2 {
          margin:
            0.8rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              3rem,
              7vw,
              6.8rem
            );

          font-weight: 400;

          line-height: 0.92;

          letter-spacing: -0.055em;
        }

        .guiropa-advertise-contact p {
          margin:
            1.4rem
            0
            0;

          color:
            #9b876b;

          font-size: 1rem;
        }

        .guiropa-advertise-contact-actions {
          display: flex;

          flex-wrap: wrap;

          gap: 10px;

          margin-top:
            2.2rem;
        }

        .guiropa-advertise-contact-button {
          min-height: 46px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          padding:
            0
            18px;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.55
            );

          background:
            transparent;

          color:
            #e5c681;

          font-size:
            0.62rem;

          font-weight: 900;

          letter-spacing: 0.1em;

          text-decoration: none;

          text-transform: uppercase;
        }

        .guiropa-advertise-contact-button:hover {
          background:
            var(--ga-gold);

          border-color:
            var(--ga-gold);

          color:
            #15100b;
        }

        .guiropa-advertise-contact-button.is-disabled {
          opacity: 0.36;

          pointer-events: none;
        }

        @media (max-width: 900px) {
          .guiropa-advertise-hero__grid,
          .guiropa-advertise-period__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-advertise-emblem {
            justify-content: flex-start;
          }

          .guiropa-advertise-metrics,
          .guiropa-advertise-format-grid,
          .guiropa-advertise-placement-grid {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

          .guiropa-advertise-metric:nth-child(2),
          .guiropa-advertise-format:nth-child(2),
          .guiropa-advertise-placement-card:nth-child(2) {
            border-right: 0;
          }
        }

        @media (max-width: 600px) {
          .guiropa-advertise-shell {
            width:
              min(
                100% - 24px,
                650px
              );
          }

          .guiropa-advertise-metrics,
          .guiropa-advertise-format-grid,
          .guiropa-advertise-placement-grid,
          .guiropa-advertise-extra,
          .guiropa-advertise-materials {
            grid-template-columns: 1fr;
          }

          .guiropa-advertise-metric,
          .guiropa-advertise-format,
          .guiropa-advertise-placement-card,
          .guiropa-advertise-extra div,
          .guiropa-advertise-material {
            border-right: 0;

            border-bottom:
              1px solid
              var(--ga-line);
          }

          .guiropa-advertise-metric:last-child,
          .guiropa-advertise-format:last-child,
          .guiropa-advertise-placement-card:last-child,
          .guiropa-advertise-extra div:last-child,
          .guiropa-advertise-material:last-child {
            border-bottom: 0;
          }
        }
      `}</style>

      <section className="guiropa-advertise-hero">
        <div className="guiropa-advertise-shell">
          <div className="guiropa-advertise-hero__grid">
            <div>
              <span className="guiropa-advertise-eyebrow">
                {copy.eyebrow}
              </span>

              <h1>
                {copy.title}
              </h1>

              <p className="guiropa-advertise-hero__lead">
                {copy.lead}
              </p>
            </div>

            <div
              className="guiropa-advertise-emblem"
              aria-hidden="true"
            >
              <img
                src={GUIROPA_EMBLEM_SRC}
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="guiropa-advertise-numbers">
        <div className="guiropa-advertise-shell">
          <span className="guiropa-advertise-eyebrow">
            {copy.numbersEyebrow}
          </span>

          <h2>
            {copy.numbersTitle}
          </h2>

          <div className="guiropa-advertise-metrics">
            {copy.metrics.map(
              (metric) => (
                <div
                  className="guiropa-advertise-metric"
                  key={`${metric.value}-${metric.unit}`}
                >
                  <strong>
                    {metric.value}
                  </strong>

                  <b>
                    {metric.unit}
                  </b>

                  <span>
                    {metric.label}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="guiropa-advertise-extra">
            {copy.extraMetrics.map(
              ([title, value]) => (
                <div key={title}>
                  <strong>
                    {title}
                  </strong>

                  <span>
                    {value}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="guiropa-advertise-formats">
        <div className="guiropa-advertise-shell">
          <span className="guiropa-advertise-eyebrow">
            {copy.formatsEyebrow}
          </span>

          <h2>
            {copy.formatsTitle}
          </h2>

          <div className="guiropa-advertise-format-grid">
            {copy.formats.map(
              (format) => (
                <article
                  className="guiropa-advertise-format"
                  key={format.number}
                >
                  <span className="guiropa-advertise-format__number">
                    {format.number}
                  </span>

                  <h3>
                    {format.title}
                  </h3>

                  <p>
                    {format.description}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="guiropa-advertise-period">
        <div className="guiropa-advertise-shell">
          <div className="guiropa-advertise-period__grid">
            <div>
              <span className="guiropa-advertise-eyebrow">
                {copy.periodEyebrow}
              </span>

              <h2>
                {copy.periodTitle}
              </h2>

              <p className="guiropa-advertise-period__lead">
                {copy.periodLead}
              </p>
            </div>

            <div className="guiropa-advertise-materials">
              <div className="guiropa-advertise-material">
                <strong>
                  {copy.materialReady}
                </strong>

                <span>
                  {copy.materialReadyText}
                </span>
              </div>

              <div className="guiropa-advertise-material">
                <strong>
                  {copy.materialCreate}
                </strong>

                <span>
                  {copy.materialCreateText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guiropa-advertise-placement">
        <div className="guiropa-advertise-shell">
          <span className="guiropa-advertise-eyebrow">
            {copy.placementEyebrow}
          </span>

          <h2>
            {copy.placementTitle}
          </h2>

          <div className="guiropa-advertise-placement-grid">
            {copy.placements.map(
              (placement) => (
                <article
                  className="guiropa-advertise-placement-card"
                  key={placement.title}
                >
                  <strong>
                    {placement.title}
                  </strong>

                  <p>
                    {placement.text}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="guiropa-advertise-contact">
        <div className="guiropa-advertise-shell">
          <span className="guiropa-advertise-eyebrow">
            {copy.contactEyebrow}
          </span>

          <h2>
            {copy.contactTitle}
          </h2>

          <p>
            {copy.contactLead}
          </p>

          <div className="guiropa-advertise-contact-actions">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="guiropa-advertise-contact-button"
            >
              {copy.telegram}
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="guiropa-advertise-contact-button"
            >
              {copy.whatsapp}
            </a>

            {EMAIL_URL ? (
              <a
                href={EMAIL_URL}
                className="guiropa-advertise-contact-button"
              >
                {copy.email}
              </a>
            ) : (
              <span className="guiropa-advertise-contact-button is-disabled">
                {copy.email} · {copy.unavailable}
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
