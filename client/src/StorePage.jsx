import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

const STORE_COPY = {
  pt: {
    eyebrow: "GUIROPA RADIO · STORE",
    title: "Loja",
    lead:
      "1950 — 1990. A identidade da GUIROPA fora das caixas de som.",

    introEyebrow: "GUIROPA COLLECTION",
    introTitle: "Leve a estação com você.",
    introLead:
      "Peças inspiradas na música, nos carros, no design e na cultura visual que atravessaram quatro décadas.",

    cta: "VER COLEÇÃO",
    unavailable: "EM PREPARAÇÃO",

    collections: [
      {
        number: "01",
        title: "GUIROPA Essentials",
        description:
          "Peças essenciais com a identidade oficial da estação.",
        tag: "CORE COLLECTION",
      },
      {
        number: "02",
        title: "Road & Radio",
        description:
          "Automóveis, estrada, noite e o espírito clássico da GUIROPA.",
        tag: "AUTOMOTIVE",
      },
      {
        number: "03",
        title: "1950 — 1990",
        description:
          "Coleções editoriais inspiradas em cada década da estação.",
        tag: "DECADES",
      },
    ],

    products: [
      {
        code: "GR-001",
        title: "GUIROPA RADIO T-Shirt",
        type: "APPAREL",
      },
      {
        code: "GR-002",
        title: "GUIROPA Radio Mug",
        type: "OBJECT",
      },
      {
        code: "GR-003",
        title: "GUIROPA Road Poster",
        type: "PRINT",
      },
      {
        code: "GR-004",
        title: "GUIROPA Classic Cap",
        type: "APPAREL",
      },
      {
        code: "GR-005",
        title: "GUIROPA Radio Bottle",
        type: "OBJECT",
      },
      {
        code: "GR-006",
        title: "GUIROPA Decades Print",
        type: "PRINT",
      },
    ],

    finalEyebrow: "1950 — 1990",
    finalTitle: "Uma estação. Quatro décadas. Uma identidade.",
    finalLead:
      "A loja da GUIROPA nasce da mesma linguagem da rádio: clássica, direta e feita para durar.",
    operator:
      "Operação comercial e pagamentos: 7 Seas Global.",
  },

  en: {
    eyebrow: "GUIROPA RADIO · STORE",
    title: "Store",
    lead:
      "1950 — 1990. The identity of GUIROPA beyond the speakers.",

    introEyebrow: "GUIROPA COLLECTION",
    introTitle: "Take the station with you.",
    introLead:
      "Pieces inspired by the music, cars, design and visual culture that crossed four decades.",

    cta: "VIEW COLLECTION",
    unavailable: "COMING SOON",

    collections: [
      {
        number: "01",
        title: "GUIROPA Essentials",
        description:
          "Essential pieces built around the official station identity.",
        tag: "CORE COLLECTION",
      },
      {
        number: "02",
        title: "Road & Radio",
        description:
          "Automobiles, roads, night and the classic spirit of GUIROPA.",
        tag: "AUTOMOTIVE",
      },
      {
        number: "03",
        title: "1950 — 1990",
        description:
          "Editorial collections inspired by each decade of the station.",
        tag: "DECADES",
      },
    ],

    products: [
      {
        code: "GR-001",
        title: "GUIROPA RADIO T-Shirt",
        type: "APPAREL",
      },
      {
        code: "GR-002",
        title: "GUIROPA Radio Mug",
        type: "OBJECT",
      },
      {
        code: "GR-003",
        title: "GUIROPA Road Poster",
        type: "PRINT",
      },
      {
        code: "GR-004",
        title: "GUIROPA Classic Cap",
        type: "APPAREL",
      },
      {
        code: "GR-005",
        title: "GUIROPA Radio Bottle",
        type: "OBJECT",
      },
      {
        code: "GR-006",
        title: "GUIROPA Decades Print",
        type: "PRINT",
      },
    ],

    finalEyebrow: "1950 — 1990",
    finalTitle: "One station. Four decades. One identity.",
    finalLead:
      "The GUIROPA store is born from the same language as the radio: classic, direct and built to last.",
    operator:
      "Commercial operation and payments: 7 Seas Global.",
  },

  es: {
    eyebrow: "GUIROPA RADIO · TIENDA",
    title: "Tienda",
    lead:
      "1950 — 1990. La identidad de GUIROPA fuera de los altavoces.",

    introEyebrow: "GUIROPA COLLECTION",
    introTitle: "Lleva la estación contigo.",
    introLead:
      "Piezas inspiradas en la música, los coches, el diseño y la cultura visual que atravesaron cuatro décadas.",

    cta: "VER COLECCIÓN",
    unavailable: "PRÓXIMAMENTE",

    collections: [
      {
        number: "01",
        title: "GUIROPA Essentials",
        description:
          "Piezas esenciales construidas alrededor de la identidad oficial de la estación.",
        tag: "CORE COLLECTION",
      },
      {
        number: "02",
        title: "Road & Radio",
        description:
          "Automóviles, carretera, noche y el espíritu clásico de GUIROPA.",
        tag: "AUTOMOTIVE",
      },
      {
        number: "03",
        title: "1950 — 1990",
        description:
          "Colecciones editoriales inspiradas en cada década de la estación.",
        tag: "DECADES",
      },
    ],

    products: [
      {
        code: "GR-001",
        title: "GUIROPA RADIO T-Shirt",
        type: "APPAREL",
      },
      {
        code: "GR-002",
        title: "GUIROPA Radio Mug",
        type: "OBJECT",
      },
      {
        code: "GR-003",
        title: "GUIROPA Road Poster",
        type: "PRINT",
      },
      {
        code: "GR-004",
        title: "GUIROPA Classic Cap",
        type: "APPAREL",
      },
      {
        code: "GR-005",
        title: "GUIROPA Radio Bottle",
        type: "OBJECT",
      },
      {
        code: "GR-006",
        title: "GUIROPA Decades Print",
        type: "PRINT",
      },
    ],

    finalEyebrow: "1950 — 1990",
    finalTitle: "Una estación. Cuatro décadas. Una identidad.",
    finalLead:
      "La tienda GUIROPA nace del mismo lenguaje que la radio: clásico, directo y hecho para durar.",
    operator:
      "Operación comercial y pagos: 7 Seas Global.",
  },
};

export default function StorePage() {
  const { lang } = useLanguage();

  const copy =
    STORE_COPY[lang] ||
    STORE_COPY.pt;

  return (
    <main className="guiropa-store-page">
      <style>{`
        .guiropa-store-page {
          --store-paper: #f5ead6;
          --store-paper-deep: #ead0a8;

          --store-ink: #211b16;
          --store-soft: #6e5f4d;

          --store-red: #b83224;

          --store-gold: #c99a45;
          --store-gold-light: #e0bb70;
          --store-gold-dark: #75501f;

          --store-black: #0d0c0b;
          --store-black-two: #17130f;

          --store-line:
            rgba(
              76,
              56,
              39,
              0.18
            );

          min-height: 100vh;

          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(
                255,
                255,
                255,
                0.62
              ),
              transparent 36%
            ),
            linear-gradient(
              180deg,
              #f8efdf 0%,
              var(--store-paper) 58%,
              var(--store-paper-deep) 100%
            );

          color:
            var(--store-ink);
        }

        .guiropa-store-page *,
        .guiropa-store-page *::before,
        .guiropa-store-page *::after {
          box-sizing: border-box;
        }

        .guiropa-store-shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin: 0 auto;
        }

        /* HERO */

        .guiropa-store-hero {
          padding:
            clamp(4.5rem, 8vw, 7rem)
            0
            clamp(4rem, 7vw, 6rem);
        }

        .guiropa-store-hero__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(190px, 270px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-store-eyebrow {
          display: block;

          color:
            var(--store-red);

          font-size: 0.67rem;
          font-weight: 900;

          letter-spacing: 0.23em;

          text-transform: uppercase;
        }

        .guiropa-store-hero h1 {
          margin: 0.8rem 0 0;

          font-size:
            clamp(
              4.2rem,
              9vw,
              8.8rem
            );

          font-weight: 800;

          line-height: 0.86;

          letter-spacing: -0.065em;
        }

        .guiropa-store-hero__lead {
          max-width: 730px;

          margin: 2rem 0 0;

          color:
            var(--store-soft);

          font-size:
            clamp(
              1rem,
              1.7vw,
              1.26rem
            );

          line-height: 1.65;
        }

        .guiropa-store-emblem {
          display: flex;

          justify-content: flex-end;
        }

        .guiropa-store-emblem img {
          display: block;

          width:
            min(
              100%,
              220px
            );

          height: auto;

          overflow: hidden;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.30
            );

          border-radius:
            28px;

          background:
            #0d0c0b;

          filter:
            brightness(1.05)
            contrast(1.02)
            saturate(1.04);

          box-shadow:
            0 18px 36px
            rgba(
              53,
              35,
              22,
              0.18
            );
        }

        /* INTRO DARK */

        .guiropa-store-intro {
          padding:
            clamp(4rem, 7vw, 6.5rem)
            0;

          background:
            linear-gradient(
              180deg,
              #181410 0%,
              #0f0d0b 100%
            );

          color: #f1dfbd;
        }

        .guiropa-store-intro__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(260px, 430px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-store-intro h2 {
          margin: 0.8rem 0 0;

          max-width: 720px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.8rem,
              5.7vw,
              5.2rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-store-intro p {
          margin: 0;

          color: #a99575;

          font-size: 1rem;

          line-height: 1.75;
        }

        .guiropa-store-intro
        .guiropa-store-eyebrow {
          color:
            var(--store-gold-light);
        }

        /* COLLECTIONS */

        .guiropa-store-collections {
          padding:
            clamp(4.8rem, 8vw, 7rem)
            0;
        }

        .guiropa-store-collections__grid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          border-top:
            1px solid
            var(--store-line);

          border-bottom:
            1px solid
            var(--store-line);
        }

        .guiropa-store-collection {
          min-height: 330px;

          display: flex;

          flex-direction: column;

          padding:
            clamp(
              1.8rem,
              3vw,
              2.5rem
            );

          border-right:
            1px solid
            var(--store-line);

          background:
            rgba(
              255,
              250,
              240,
              0.20
            );

          transition:
            transform 0.28s ease,
            background 0.28s ease;
        }

        .guiropa-store-collection:last-child {
          border-right: 0;
        }

        .guiropa-store-collection:hover {
          transform: translateY(-4px);

          background:
            rgba(
              255,
              248,
              232,
              0.38
            );
        }

        .guiropa-store-collection__number {
          color:
            var(--store-gold-dark);

          font-size: 0.64rem;
          font-weight: 900;

          letter-spacing: 0.15em;
        }

        .guiropa-store-collection__tag {
          margin-top: auto;

          color:
            var(--store-red);

          font-size: 0.58rem;
          font-weight: 900;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .guiropa-store-collection h3 {
          margin: 0.9rem 0 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2rem,
              3.3vw,
              3.1rem
            );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.04em;
        }

        .guiropa-store-collection p {
          margin: 1rem 0 0;

          color:
            var(--store-soft);

          font-size: 0.9rem;

          line-height: 1.65;
        }

        /* PRODUCTS */

        .guiropa-store-products {
          padding:
            0
            0
            clamp(5rem, 9vw, 8rem);
        }

        .guiropa-store-products__head {
          display: flex;

          justify-content: space-between;

          gap: 2rem;

          align-items: end;

          padding-bottom: 1.5rem;

          border-bottom:
            1px solid
            var(--store-line);
        }

        .guiropa-store-products__head h2 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.7rem,
              5vw,
              4.8rem
            );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.04em;
        }

        .guiropa-store-products__grid {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          border-bottom:
            1px solid
            var(--store-line);
        }

        .guiropa-store-product {
          min-height: 250px;

          display: flex;

          flex-direction: column;

          padding:
            clamp(
              1.6rem,
              2.7vw,
              2.2rem
            );

          border-right:
            1px solid
            var(--store-line);

          border-bottom:
            1px solid
            var(--store-line);
        }

        .guiropa-store-product:nth-child(3n) {
          border-right: 0;
        }

        .guiropa-store-product:nth-last-child(-n+3) {
          border-bottom: 0;
        }

        .guiropa-store-product__code {
          color:
            var(--store-gold-dark);

          font-size: 0.6rem;
          font-weight: 900;

          letter-spacing: 0.14em;
        }

        .guiropa-store-product__type {
          margin-top: 0.8rem;

          color:
            var(--store-red);

          font-size: 0.57rem;
          font-weight: 900;

          letter-spacing: 0.14em;

          text-transform: uppercase;
        }

        .guiropa-store-product h3 {
          margin: auto 0 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              1.6rem,
              2.8vw,
              2.5rem
            );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.035em;
        }

        .guiropa-store-product__footer {
          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 1rem;

          margin-top: 1.2rem;

          padding-top: 1rem;

          border-top:
            1px solid
            var(--store-line);
        }

        .guiropa-store-product__footer span {
          color:
            var(--store-soft);

          font-size: 0.63rem;
          font-weight: 800;

          letter-spacing: 0.11em;

          text-transform: uppercase;
        }

        .guiropa-store-product__footer strong {
          color:
            var(--store-gold-dark);

          font-size: 0.8rem;
        }

        .guiropa-store-operator {
          margin-top: 1rem;

          color:
            rgba(
              110,
              95,
              77,
              0.58
            );

          font-size: 0.56rem;
          font-weight: 700;

          letter-spacing: 0.08em;

          text-align: right;
        }

        /* FINAL */

        .guiropa-store-final {
          padding:
            clamp(5rem, 8vw, 7rem)
            0;

          background:
            linear-gradient(
              180deg,
              #17130f,
              #0e0c0a
            );

          color:
            #f0dfbd;
        }

        .guiropa-store-final__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(200px, 290px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: center;
        }

        .guiropa-store-final h2 {
          margin: 0.8rem 0 0;

          max-width: 780px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.8rem,
              5.8vw,
              5.4rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-store-final p {
          max-width: 680px;

          margin: 1.3rem 0 0;

          color: #a99575;

          font-size: 1rem;

          line-height: 1.7;
        }

        .guiropa-store-final img {
          display: block;

          width:
            min(
              100%,
              220px
            );

          margin-left: auto;

          height: auto;

          overflow: hidden;

          border:
            1px solid
            rgba(
              201,
              154,
              69,
              0.28
            );

          border-radius:
            28px;

          background:
            #0d0c0b;

          box-shadow:
            0 20px 44px
            rgba(
              0,
              0,
              0,
              0.32
            );
        }

        .guiropa-store-final
        .guiropa-store-eyebrow {
          color:
            var(--store-gold-light);
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .guiropa-store-hero__grid,
          .guiropa-store-intro__grid,
          .guiropa-store-final__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-store-emblem,
          .guiropa-store-final img {
            justify-content: flex-start;
            margin-left: 0;
          }

          .guiropa-store-collections__grid,
          .guiropa-store-products__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-store-collection,
          .guiropa-store-product {
            border-right: 0;

            border-bottom:
              1px solid
              var(--store-line);
          }

          .guiropa-store-collection:last-child,
          .guiropa-store-product:last-child {
            border-bottom: 0;
          }

          .guiropa-store-product:nth-last-child(-n+3) {
            border-bottom:
              1px solid
              var(--store-line);
          }

          .guiropa-store-product:last-child {
            border-bottom: 0;
          }
        }

        @media (max-width: 600px) {
          .guiropa-store-shell {
            width:
              min(
                100% - 24px,
                650px
              );
          }

          .guiropa-store-hero {
            padding-top: 4rem;
          }

          .guiropa-store-hero h1 {
            font-size:
              clamp(
                3.8rem,
                18vw,
                6.5rem
              );
          }

          .guiropa-store-products__head {
            display: block;
          }
        }
      `}</style>

      <section className="guiropa-store-hero">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-hero__grid">
            <div>
              <span className="guiropa-store-eyebrow">
                {copy.eyebrow}
              </span>

              <h1>
                {copy.title}
              </h1>

              <p className="guiropa-store-hero__lead">
                {copy.lead}
              </p>
            </div>

            <div
              className="guiropa-store-emblem"
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

      <section className="guiropa-store-intro">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-intro__grid">
            <div>
              <span className="guiropa-store-eyebrow">
                {copy.introEyebrow}
              </span>

              <h2>
                {copy.introTitle}
              </h2>
            </div>

            <p>
              {copy.introLead}
            </p>
          </div>
        </div>
      </section>

      <section className="guiropa-store-collections">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-collections__grid">
            {copy.collections.map((collection) => (
              <article
                className="guiropa-store-collection"
                key={collection.number}
              >
                <span className="guiropa-store-collection__number">
                  {collection.number}
                </span>

                <span className="guiropa-store-collection__tag">
                  {collection.tag}
                </span>

                <h3>
                  {collection.title}
                </h3>

                <p>
                  {collection.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guiropa-store-products">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-products__head">
            <h2>
              GUIROPA STORE
            </h2>

            <span className="guiropa-store-eyebrow">
              1950 — 1990
            </span>
          </div>

          <div className="guiropa-store-products__grid">
            {copy.products.map((product) => (
              <article
                className="guiropa-store-product"
                key={product.code}
              >
                <span className="guiropa-store-product__code">
                  {product.code}
                </span>

                <span className="guiropa-store-product__type">
                  {product.type}
                </span>

                <h3>
                  {product.title}
                </h3>

                <div className="guiropa-store-product__footer">
                  <span>
                    {copy.unavailable}
                  </span>

                  <strong>
                    →
                  </strong>
                </div>
              </article>
            ))}
          </div>

          <div className="guiropa-store-operator">
            {copy.operator}
          </div>
        </div>
      </section>

      <section className="guiropa-store-final">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-final__grid">
            <div>
              <span className="guiropa-store-eyebrow">
                {copy.finalEyebrow}
              </span>

              <h2>
                {copy.finalTitle}
              </h2>

              <p>
                {copy.finalLead}
              </p>
            </div>

            <img
              src={GUIROPA_EMBLEM_SRC}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
