import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

const COPY = {
  pt: {
    eyebrow: "GUIROPA RADIO · PROGRAMAÇÃO",
    title: "Programação",
    lead:
      "Cinco décadas. Cinco universos sonoros. Uma programação construída em torno da música que atravessou gerações.",

    sectionEyebrow: "NO AR",
    sectionTitle: "Uma década de cada vez.",
    sectionLead:
      "Da primeira explosão do rock 'n' roll às últimas grandes canções de 1990. Escolha uma época e entre nela.",

    station: "GUIROPA RADIO",
    schedule: "PROGRAMAÇÃO",

    decades: [
      {
        year: "1950s",
        code: "50",
        title: "A FAÍSCA",
        description:
          "Rock 'n' roll, rhythm & blues, doo-wop, harmonias vocais e as canções que deram início a tudo.",
        shows: [
          ["SEG · 18:00", "The Birth of Rock"],
          ["QUA · 20:00", "Rhythm & Blues"],
          ["SEX · 21:00", "Rock 'n' Roll Classics"],
        ],
      },
      {
        year: "1960s",
        code: "60",
        title: "TUDO MUDOU",
        description:
          "Pop, soul, Motown, folk rock, rock melódico e o lado mais suave da British Invasion.",
        shows: [
          ["TER · 18:00", "British Invasion"],
          ["QUI · 20:00", "Motown & Soul"],
          ["SÁB · 19:00", "Sixties Radio"],
        ],
      },
      {
        year: "1970s",
        code: "70",
        title: "ANOS DOURADOS",
        description:
          "Soft rock, baladas clássicas, soul, disco, pop melódico e harmonias inesquecíveis.",
        shows: [
          ["SEG · 20:00", "Seventies Gold"],
          ["QUA · 21:00", "Soft Rock Nights"],
          ["SÁB · 21:00", "Disco & Soul"],
        ],
      },
      {
        year: "1980s",
        code: "80",
        title: "HITS ETERNOS",
        description:
          "Soft rock, power ballads, adult contemporary, synthpop, arena rock e as grandes vozes da década.",
        shows: [
          ["TER · 20:00", "Eighties Forever"],
          ["SEX · 20:00", "Power Ballads"],
          ["SÁB · 22:00", "After Dark 80s"],
        ],
      },
      {
        year: "1990",
        code: "90",
        title: "A ÚLTIMA PARADA",
        description:
          "Rock ballads, soft rock e canções eternas. A GUIROPA chega a 1990 — e para exatamente aqui.",
        shows: [
          ["QUA · 19:00", "The Final Chapter"],
          ["SEX · 22:00", "1990"],
          ["DOM · 20:00", "GUIROPA Classics"],
        ],
      },
    ],
  },

  en: {
    eyebrow: "GUIROPA RADIO · SCHEDULE",
    title: "Schedule",
    lead:
      "Five decades. Five musical worlds. Programming built around the music that crossed generations.",

    sectionEyebrow: "ON AIR",
    sectionTitle: "One decade at a time.",
    sectionLead:
      "From the first explosion of rock 'n' roll to the last great songs of 1990. Choose an era and enter it.",

    station: "GUIROPA RADIO",
    schedule: "SCHEDULE",

    decades: [
      {
        year: "1950s",
        code: "50",
        title: "THE SPARK",
        description:
          "Rock 'n' roll, rhythm & blues, doo-wop, vocal harmonies and the songs that started it all.",
        shows: [
          ["MON · 18:00", "The Birth of Rock"],
          ["WED · 20:00", "Rhythm & Blues"],
          ["FRI · 21:00", "Rock 'n' Roll Classics"],
        ],
      },
      {
        year: "1960s",
        code: "60",
        title: "EVERYTHING CHANGED",
        description:
          "Pop, soul, Motown, folk rock, melodic rock and the softer side of the British Invasion.",
        shows: [
          ["TUE · 18:00", "British Invasion"],
          ["THU · 20:00", "Motown & Soul"],
          ["SAT · 19:00", "Sixties Radio"],
        ],
      },
      {
        year: "1970s",
        code: "70",
        title: "GOLDEN YEARS",
        description:
          "Soft rock, classic ballads, soul, disco, melodic pop and unforgettable harmonies.",
        shows: [
          ["MON · 20:00", "Seventies Gold"],
          ["WED · 21:00", "Soft Rock Nights"],
          ["SAT · 21:00", "Disco & Soul"],
        ],
      },
      {
        year: "1980s",
        code: "80",
        title: "TIMELESS HITS",
        description:
          "Soft rock, power ballads, adult contemporary, synthpop, arena rock and the great voices of the decade.",
        shows: [
          ["TUE · 20:00", "Eighties Forever"],
          ["FRI · 20:00", "Power Ballads"],
          ["SAT · 22:00", "After Dark 80s"],
        ],
      },
      {
        year: "1990",
        code: "90",
        title: "THE FINAL STOP",
        description:
          "Rock ballads, soft rock and timeless songs. GUIROPA reaches 1990 — and stops right there.",
        shows: [
          ["WED · 19:00", "The Final Chapter"],
          ["FRI · 22:00", "1990"],
          ["SUN · 20:00", "GUIROPA Classics"],
        ],
      },
    ],
  },

  es: {
    eyebrow: "GUIROPA RADIO · PROGRAMACIÓN",
    title: "Programación",
    lead:
      "Cinco décadas. Cinco universos sonoros. Una programación construida alrededor de la música que atravesó generaciones.",

    sectionEyebrow: "AL AIRE",
    sectionTitle: "Una década a la vez.",
    sectionLead:
      "Desde la primera explosión del rock 'n' roll hasta las últimas grandes canciones de 1990. Elige una época y entra en ella.",

    station: "GUIROPA RADIO",
    schedule: "PROGRAMACIÓN",

    decades: [
      {
        year: "1950s",
        code: "50",
        title: "LA CHISPA",
        description:
          "Rock 'n' roll, rhythm & blues, doo-wop, armonías vocales y las canciones que iniciaron todo.",
        shows: [
          ["LUN · 18:00", "The Birth of Rock"],
          ["MIÉ · 20:00", "Rhythm & Blues"],
          ["VIE · 21:00", "Rock 'n' Roll Classics"],
        ],
      },
      {
        year: "1960s",
        code: "60",
        title: "TODO CAMBIÓ",
        description:
          "Pop, soul, Motown, folk rock, rock melódico y el lado más suave de la British Invasion.",
        shows: [
          ["MAR · 18:00", "British Invasion"],
          ["JUE · 20:00", "Motown & Soul"],
          ["SÁB · 19:00", "Sixties Radio"],
        ],
      },
      {
        year: "1970s",
        code: "70",
        title: "AÑOS DORADOS",
        description:
          "Soft rock, baladas clásicas, soul, disco, pop melódico y armonías inolvidables.",
        shows: [
          ["LUN · 20:00", "Seventies Gold"],
          ["MIÉ · 21:00", "Soft Rock Nights"],
          ["SÁB · 21:00", "Disco & Soul"],
        ],
      },
      {
        year: "1980s",
        code: "80",
        title: "ÉXITOS ETERNOS",
        description:
          "Soft rock, power ballads, adult contemporary, synthpop, arena rock y las grandes voces de la década.",
        shows: [
          ["MAR · 20:00", "Eighties Forever"],
          ["VIE · 20:00", "Power Ballads"],
          ["SÁB · 22:00", "After Dark 80s"],
        ],
      },
      {
        year: "1990",
        code: "90",
        title: "LA ÚLTIMA PARADA",
        description:
          "Rock ballads, soft rock y canciones eternas. GUIROPA llega a 1990 — y se detiene exactamente allí.",
        shows: [
          ["MIÉ · 19:00", "The Final Chapter"],
          ["VIE · 22:00", "1990"],
          ["DOM · 20:00", "GUIROPA Classics"],
        ],
      },
    ],
  },
};

export default function SchedulePage() {
  const { lang } = useLanguage();

  const copy =
    COPY[lang] ||
    COPY.pt;

  return (
    <main className="guiropa-schedule-page">
      <style>{`
        .guiropa-schedule-page {
          --schedule-ink: #211c17;
          --schedule-soft: #665846;
          --schedule-red: #b83224;
          --schedule-gold: #b58a45;
          --schedule-line: rgba(77, 57, 39, 0.19);

          min-height: 100vh;

          background:
            linear-gradient(
              180deg,
              #f7eddc 0%,
              #f1dfc0 54%,
              #e9d2ae 100%
            );

          color:
            var(--schedule-ink);
        }

        .guiropa-schedule-page *,
        .guiropa-schedule-page *::before,
        .guiropa-schedule-page *::after {
          box-sizing: border-box;
        }

        .guiropa-schedule-shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin:
            0 auto;
        }

        .guiropa-schedule-hero {
          padding:
            clamp(4.2rem, 8vw, 7rem)
            0
            clamp(3rem, 6vw, 5rem);
        }

        .guiropa-schedule-hero__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(180px, 280px);

          gap:
            clamp(2.5rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-schedule-eyebrow {
          display: block;

          color:
            var(--schedule-red);

          font-size: 0.68rem;
          font-weight: 900;

          letter-spacing: 0.24em;

          text-transform: uppercase;
        }

        .guiropa-schedule-hero h1 {
          margin:
            0.85rem 0 0;

          font-size:
            clamp(
              4rem,
              9vw,
              8.5rem
            );

          font-weight: 800;

          line-height: 0.86;

          letter-spacing: -0.065em;
        }

        .guiropa-schedule-hero__lead {
          max-width: 760px;

          margin:
            2rem 0 0;

          color:
            var(--schedule-soft);

          font-size:
            clamp(
              1rem,
              1.7vw,
              1.28rem
            );

          line-height: 1.65;
        }

        .guiropa-schedule-emblem {
          display: flex;

          justify-content: flex-end;
        }

        .guiropa-schedule-emblem img {
          display: block;

          width:
            min(
              100%,
              220px
            );

          height: auto;

          filter:
            brightness(1.05)
            contrast(1.02)
            saturate(1.04);

          box-shadow:
            0 17px 34px
            rgba(58, 38, 24, 0.16);
        }

        .guiropa-schedule-content {
          padding:
            clamp(4rem, 7vw, 6.5rem)
            0
            clamp(5rem, 9vw, 8rem);

          border-top:
            1px solid
            var(--schedule-line);

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.16),
              rgba(255,255,255,0)
            );
        }

        .guiropa-schedule-heading {
          max-width: 800px;
        }

        .guiropa-schedule-heading h2 {
          margin:
            0.8rem 0 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.7rem,
              5.4vw,
              5rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-schedule-heading p {
          max-width: 700px;

          margin:
            1.35rem 0 0;

          color:
            var(--schedule-soft);

          font-size: 1rem;

          line-height: 1.7;
        }

        .guiropa-schedule-grid {
          display: grid;

          grid-template-columns:
            repeat(
              5,
              minmax(0, 1fr)
            );

          margin-top:
            clamp(3rem, 6vw, 5rem);

          border-top:
            1px solid
            var(--schedule-line);

          border-bottom:
            1px solid
            var(--schedule-line);

          background:
            rgba(255, 249, 238, 0.36);
        }

        .guiropa-schedule-card {
          position: relative;

          min-width: 0;

          display: flex;

          flex-direction: column;

          padding:
            clamp(
              1.5rem,
              2.7vw,
              2.2rem
            );

          border-right:
            1px solid
            var(--schedule-line);

          transition:
            transform 0.28s ease,
            background 0.28s ease,
            box-shadow 0.28s ease;
        }

        .guiropa-schedule-card:last-child {
          border-right: 0;
        }

        .guiropa-schedule-card:hover {
          transform:
            translateY(-5px);

          background:
            var(--decade-wash);

          box-shadow:
            0 16px 34px
            rgba(69, 47, 30, 0.10);
        }

        .guiropa-schedule-card--1 {
          --decade-accent: #c53a2d;
          --decade-wash: rgba(197, 58, 45, 0.065);
        }

        .guiropa-schedule-card--2 {
          --decade-accent: #258b88;
          --decade-wash: rgba(37, 139, 136, 0.065);
        }

        .guiropa-schedule-card--3 {
          --decade-accent: #df7a20;
          --decade-wash: rgba(223, 122, 32, 0.065);
        }

        .guiropa-schedule-card--4 {
          --decade-accent: #ed2f76;
          --decade-wash: rgba(237, 47, 118, 0.06);
        }

        .guiropa-schedule-card--5 {
          --decade-accent: #2864a0;
          --decade-wash: rgba(40, 100, 160, 0.065);
        }

        .guiropa-schedule-card::after {
          content: "";

          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 4px;

          background:
            var(--decade-accent);
        }

        .guiropa-schedule-card__top {
          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 1rem;
        }

        .guiropa-schedule-card__number {
          color:
            rgba(79, 61, 43, 0.50);

          font-size: 0.63rem;
          font-weight: 900;

          letter-spacing: 0.14em;
        }

        .guiropa-schedule-card__year {
          color:
            var(--decade-accent);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.2rem,
              3.8vw,
              3.3rem
            );

          line-height: 1;
        }

        .guiropa-schedule-card h3 {
          margin:
            2rem 0 0;

          color:
            var(--decade-accent);

          font-size: 0.72rem;

          font-weight: 900;

          letter-spacing: 0.12em;

          text-transform: uppercase;
        }

        .guiropa-schedule-card__description {
          min-height: 8em;

          margin:
            1rem 0 0;

          color:
            #5e5143;

          font-size: 0.82rem;

          line-height: 1.65;
        }

        .guiropa-schedule-card__shows {
          margin-top:
            1.6rem;

          border-top:
            1px solid
            var(--schedule-line);
        }

        .guiropa-schedule-show {
          padding:
            1rem 0;

          border-bottom:
            1px solid
            var(--schedule-line);
        }

        .guiropa-schedule-show span {
          display: block;

          color:
            var(--decade-accent);

          font-size: 0.57rem;

          font-weight: 900;

          letter-spacing: 0.11em;

          text-transform: uppercase;
        }

        .guiropa-schedule-show strong {
          display: block;

          margin-top: 0.32rem;

          color:
            #2a221b;

          font-size: 0.88rem;

          line-height: 1.35;
        }

        .guiropa-schedule-card__footer {
          margin-top: auto;

          padding-top:
            1.5rem;

          color:
            rgba(73, 57, 42, 0.48);

          font-size: 0.55rem;

          font-weight: 900;

          letter-spacing: 0.16em;
        }

        .guiropa-schedule-timeline {
          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          margin-top: 2.4rem;
        }

        .guiropa-schedule-timeline span {
          text-align: center;

          font-size: 0.61rem;

          font-weight: 900;

          letter-spacing: 0.14em;
        }

        .guiropa-schedule-timeline span:nth-child(1) {
          color: #c53a2d;
        }

        .guiropa-schedule-timeline span:nth-child(2) {
          color: #258b88;
        }

        .guiropa-schedule-timeline span:nth-child(3) {
          color: #df7a20;
        }

        .guiropa-schedule-timeline span:nth-child(4) {
          color: #ed2f76;
        }

        .guiropa-schedule-timeline span:nth-child(5) {
          color: #2864a0;
        }

        @media (max-width: 1000px) {
          .guiropa-schedule-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }

          .guiropa-schedule-card {
            border-bottom:
              1px solid
              var(--schedule-line);
          }

          .guiropa-schedule-card:nth-child(2n) {
            border-right: 0;
          }

          .guiropa-schedule-card:last-child {
            grid-column:
              1 / -1;

            border-bottom: 0;
          }

          .guiropa-schedule-card__description {
            min-height: 0;
          }
        }

        @media (max-width: 720px) {
          .guiropa-schedule-shell {
            width:
              min(
                100% - 24px,
                650px
              );
          }

          .guiropa-schedule-hero__grid {
            grid-template-columns:
              1fr;
          }

          .guiropa-schedule-emblem {
            justify-content:
              flex-start;
          }

          .guiropa-schedule-emblem img {
            width: 170px;
          }

          .guiropa-schedule-grid {
            grid-template-columns:
              1fr;
          }

          .guiropa-schedule-card,
          .guiropa-schedule-card:nth-child(2n),
          .guiropa-schedule-card:last-child {
            grid-column: auto;

            border-right: 0;

            border-bottom:
              1px solid
              var(--schedule-line);
          }

          .guiropa-schedule-card:last-child {
            border-bottom: 0;
          }

          .guiropa-schedule-timeline {
            overflow-x: auto;

            grid-template-columns:
              repeat(
                5,
                minmax(75px, 1fr)
              );
          }
        }
      `}</style>

      <section className="guiropa-schedule-hero">
        <div className="guiropa-schedule-shell">
          <div className="guiropa-schedule-hero__grid">
            <div>
              <span className="guiropa-schedule-eyebrow">
                {copy.eyebrow}
              </span>

              <h1>
                {copy.title}
              </h1>

              <p className="guiropa-schedule-hero__lead">
                {copy.lead}
              </p>
            </div>

            <div
              className="guiropa-schedule-emblem"
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

      <section className="guiropa-schedule-content">
        <div className="guiropa-schedule-shell">
          <header className="guiropa-schedule-heading">
            <span className="guiropa-schedule-eyebrow">
              {copy.sectionEyebrow}
            </span>

            <h2>
              {copy.sectionTitle}
            </h2>

            <p>
              {copy.sectionLead}
            </p>
          </header>

          <div className="guiropa-schedule-grid">
            {copy.decades.map(
              (decade, index) => (
                <article
                  key={decade.year}
                  className={`guiropa-schedule-card guiropa-schedule-card--${
                    index + 1
                  }`}
                >
                  <div className="guiropa-schedule-card__top">
                    <span className="guiropa-schedule-card__number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="guiropa-schedule-card__year">
                      {decade.year}
                    </span>
                  </div>

                  <h3>
                    {decade.title}
                  </h3>

                  <p className="guiropa-schedule-card__description">
                    {decade.description}
                  </p>

                  <div className="guiropa-schedule-card__shows">
                    {decade.shows.map(
                      ([time, title]) => (
                        <div
                          className="guiropa-schedule-show"
                          key={`${decade.year}-${title}`}
                        >
                          <span>
                            {time}
                          </span>

                          <strong>
                            {title}
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                  <div className="guiropa-schedule-card__footer">
                    {copy.station}
                  </div>
                </article>
              )
            )}
          </div>

          <div
            className="guiropa-schedule-timeline"
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
    </main>
  );
}
