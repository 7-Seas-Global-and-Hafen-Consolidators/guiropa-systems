import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

const ASAAS_URL =
  "https://www.asaas.com/c/n17o931m5w6ze64t";

const PAYPAL_URL =
  "https://www.paypal.com/ncp/payment/Y4KB4YKHPKS88";

const COPY = {
  pt: {
    eyebrow: "GUIROPA RADIO · APOIE",
    title: "Apoie a GUIROPA.",
    lead:
      "Ajude a manter a estação no ar, ampliar a programação, o acervo e os próximos projetos da GUIROPA.",

    introEyebrow: "VOCÊ ESCOLHE O VALOR",
    introTitle: "Uma estação continua porque alguém decide mantê-la tocando.",
    introLead:
      "Não existe valor definido. Escolha quanto deseja contribuir e o meio de pagamento que preferir.",

    asaasLabel: "BRASIL",
    asaasTitle: "Asaas",
    asaasText:
      "Pix, boleto e cartão em um checkout direto.",
    asaasAction: "APOIAR VIA ASAAS",

    paypalLabel: "BRASIL · INTERNACIONAL",
    paypalTitle: "PayPal",
    paypalText:
      "PayPal e cartões de débito ou crédito.",
    paypalAction: "APOIAR VIA PAYPAL",

    noteTitle: "Sem valor mínimo definido pela GUIROPA.",
    noteText:
      "Você decide quanto quer contribuir.",

    finalEyebrow: "1950 — 1990",
    finalTitle: "GET UP. TURN IT UP. GUIROPA.",
    finalLead:
      "Sua contribuição ajuda a manter a GUIROPA no ar e os próximos projetos em movimento.",

    operator:
      "Operação e pagamentos: 7 Seas Global.",
  },

  en: {
    eyebrow: "GUIROPA RADIO · SUPPORT",
    title: "Support GUIROPA.",
    lead:
      "Help keep the station on air, expand programming, the archive and the next GUIROPA projects.",

    introEyebrow: "YOU CHOOSE THE AMOUNT",
    introTitle: "A station keeps going because someone decides to keep it playing.",
    introLead:
      "There is no fixed contribution amount. Choose how much you want to contribute and the payment method you prefer.",

    asaasLabel: "BRAZIL",
    asaasTitle: "Asaas",
    asaasText:
      "Pix, bank slip and card through a direct checkout.",
    asaasAction: "SUPPORT VIA ASAAS",

    paypalLabel: "BRAZIL · INTERNATIONAL",
    paypalTitle: "PayPal",
    paypalText:
      "PayPal and debit or credit cards.",
    paypalAction: "SUPPORT VIA PAYPAL",

    noteTitle: "No minimum amount defined by GUIROPA.",
    noteText:
      "You decide how much you want to contribute.",

    finalEyebrow: "1950 — 1990",
    finalTitle: "GET UP. TURN IT UP. GUIROPA.",
    finalLead:
      "Your contribution helps keep GUIROPA on air and its next projects moving.",

    operator:
      "Operation and payments: 7 Seas Global.",
  },

  es: {
    eyebrow: "GUIROPA RADIO · APOYA",
    title: "Apoya a GUIROPA.",
    lead:
      "Ayuda a mantener la estación al aire, ampliar la programación, el archivo y los próximos proyectos de GUIROPA.",

    introEyebrow: "TÚ ELIGES EL VALOR",
    introTitle: "Una estación continúa porque alguien decide mantenerla sonando.",
    introLead:
      "No existe un valor fijo de contribución. Elige cuánto quieres aportar y el medio de pago que prefieras.",

    asaasLabel: "BRASIL",
    asaasTitle: "Asaas",
    asaasText:
      "Pix, boleto y tarjeta en un checkout directo.",
    asaasAction: "APOYAR VIA ASAAS",

    paypalLabel: "BRASIL · INTERNACIONAL",
    paypalTitle: "PayPal",
    paypalText:
      "PayPal y tarjetas de débito o crédito.",
    paypalAction: "APOYAR VIA PAYPAL",

    noteTitle: "Sin valor mínimo definido por GUIROPA.",
    noteText:
      "Tú decides cuánto quieres aportar.",

    finalEyebrow: "1950 — 1990",
    finalTitle: "GET UP. TURN IT UP. GUIROPA.",
    finalLead:
      "Tu contribución ayuda a mantener GUIROPA al aire y sus próximos proyectos en movimiento.",

    operator:
      "Operación y pagos: 7 Seas Global.",
  },
};

export default function SupportPage() {
  const { lang } = useLanguage();

  const copy =
    COPY[lang] ||
    COPY.pt;

  return (
    <main className="guiropa-support-page">
      <style>{`
        .guiropa-support-page {
          --gs-paper: #f5ead6;
          --gs-paper-deep: #ead0a8;

          --gs-ink: #211b16;
          --gs-soft: #6e5f4d;

          --gs-red: #b83224;

          --gs-gold: #c99a45;
          --gs-gold-light: #e0bb70;
          --gs-gold-dark: #75501f;

          --gs-black: #0d0c0b;
          --gs-black-two: #17130f;

          --gs-line:
            rgba(
              76,
              56,
              39,
              0.18
            );

          min-height: 100vh;

          color:
            var(--gs-ink);

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
              var(--gs-paper) 58%,
              var(--gs-paper-deep) 100%
            );
        }

        .guiropa-support-page *,
        .guiropa-support-page *::before,
        .guiropa-support-page *::after {
          box-sizing: border-box;
        }

        .guiropa-support-shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin: 0 auto;
        }

        .guiropa-support-eyebrow {
          display: block;

          color:
            var(--gs-red);

          font-size: 0.67rem;
          font-weight: 900;

          letter-spacing: 0.23em;

          text-transform: uppercase;
        }

        /* HERO */

        .guiropa-support-hero {
          padding:
            clamp(4.5rem, 8vw, 7rem)
            0
            clamp(4rem, 7vw, 6rem);
        }

        .guiropa-support-hero__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(190px, 270px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-support-hero h1 {
          margin: 0.8rem 0 0;

          font-size:
            clamp(
              4rem,
              9vw,
              8.8rem
            );

          font-weight: 800;

          line-height: 0.86;

          letter-spacing: -0.065em;
        }

        .guiropa-support-hero__lead {
          max-width: 760px;

          margin: 2rem 0 0;

          color:
            var(--gs-soft);

          font-size:
            clamp(
              1rem,
              1.7vw,
              1.26rem
            );

          line-height: 1.65;
        }

        .guiropa-support-emblem {
          display: flex;

          justify-content: flex-end;
        }

        .guiropa-support-emblem img {
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

          border-radius: 28px;

          background:
            var(--gs-black);

          box-shadow:
            0
            18px
            40px
            rgba(
              53,
              35,
              21,
              0.20
            );

          filter:
            brightness(1.05)
            contrast(1.02)
            saturate(1.04);
        }

        /* INTRO */

        .guiropa-support-intro {
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

        .guiropa-support-intro__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(270px, 430px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-support-intro
        .guiropa-support-eyebrow {
          color:
            var(--gs-gold-light);
        }

        .guiropa-support-intro h2 {
          margin: 0.8rem 0 0;

          max-width: 800px;

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

        .guiropa-support-intro p {
          margin: 0;

          color: #a99575;

          font-size: 1rem;

          line-height: 1.75;
        }

        /* PAYMENT OPTIONS */

        .guiropa-support-options {
          padding:
            clamp(5rem, 8vw, 7rem)
            0;
        }

        .guiropa-support-options__grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          border-top:
            1px solid
            var(--gs-line);

          border-left:
            1px solid
            var(--gs-line);
        }

        .guiropa-support-card {
          min-height: 380px;

          display: flex;

          flex-direction: column;

          padding:
            clamp(
              2rem,
              4vw,
              3rem
            );

          border-right:
            1px solid
            var(--gs-line);

          border-bottom:
            1px solid
            var(--gs-line);

          background:
            rgba(
              255,
              250,
              240,
              0.22
            );

          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .guiropa-support-card:hover {
          transform:
            translateY(-4px);

          background:
            rgba(
              255,
              249,
              235,
              0.44
            );
        }

        .guiropa-support-card__label {
          color:
            var(--gs-red);

          font-size: 0.61rem;
          font-weight: 900;

          letter-spacing: 0.16em;

          text-transform: uppercase;
        }

        .guiropa-support-card h3 {
          margin:
            1rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.8rem,
              5vw,
              4.8rem
            );

          font-weight: 400;

          line-height: 0.95;

          letter-spacing: -0.045em;
        }

        .guiropa-support-card p {
          max-width: 470px;

          margin:
            1.2rem
            0
            0;

          color:
            var(--gs-soft);

          font-size: 0.92rem;

          line-height: 1.7;
        }

        .guiropa-support-card__action {
          min-height: 50px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap: 20px;

          margin-top: auto;

          padding:
            0
            18px;

          border:
            1px solid
            var(--gs-ink);

          background:
            var(--gs-ink);

          color:
            #fff8ed;

          font-size: 0.63rem;
          font-weight: 900;

          letter-spacing: 0.08em;

          text-decoration: none;

          text-transform: uppercase;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .guiropa-support-card__action:hover {
          border-color:
            var(--gs-red);

          background:
            var(--gs-red);
        }

        .guiropa-support-card__action span:last-child {
          font-size: 1rem;
        }

        /* NOTE */

        .guiropa-support-note {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(260px, 420px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: center;

          margin-top:
            clamp(3rem, 5vw, 4rem);

          padding:
            2rem
            0;

          border-top:
            1px solid
            var(--gs-line);

          border-bottom:
            1px solid
            var(--gs-line);
        }

        .guiropa-support-note strong {
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

          line-height: 1.1;
        }

        .guiropa-support-note p {
          margin: 0;

          color:
            var(--gs-soft);

          font-size: 0.9rem;

          line-height: 1.6;
        }

        .guiropa-support-operator {
          margin-top: 1rem;

          color:
            rgba(
              110,
              95,
              77,
              0.52
            );

          font-size: 0.54rem;
          font-weight: 700;

          letter-spacing: 0.08em;

          text-align: right;
        }

        /* FINAL */

        .guiropa-support-final {
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

        .guiropa-support-final__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(240px, 380px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-support-final
        .guiropa-support-eyebrow {
          color:
            var(--gs-gold-light);
        }

        .guiropa-support-final h2 {
          max-width: 880px;

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
              6vw,
              5.8rem
            );

          font-weight: 400;

          line-height: 0.96;

          letter-spacing: -0.045em;
        }

        .guiropa-support-final p {
          margin: 0;

          color:
            #a99575;

          font-size: 0.96rem;

          line-height: 1.7;
        }

        .guiropa-support-final__operator {
          margin-top: 2.2rem;

          color:
            rgba(
              224,
              187,
              112,
              0.48
            );

          font-size: 0.52rem;
          font-weight: 700;

          letter-spacing: 0.08em;
        }

        @media (max-width: 800px) {
          .guiropa-support-hero__grid,
          .guiropa-support-intro__grid,
          .guiropa-support-note,
          .guiropa-support-final__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-support-emblem {
            justify-content: flex-start;
          }

          .guiropa-support-options__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-support-card {
            min-height: 330px;
          }

          .guiropa-support-operator {
            text-align: left;
          }
        }

        @media (max-width: 520px) {
          .guiropa-support-shell {
            width:
              min(
                100% - 24px,
                650px
              );
          }

          .guiropa-support-hero h1 {
            font-size:
              clamp(
                3.8rem,
                18vw,
                6.5rem
              );
          }
        }
      `}</style>

      <section className="guiropa-support-hero">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-hero__grid">
            <div>
              <span className="guiropa-support-eyebrow">
                {copy.eyebrow}
              </span>

              <h1>
                {copy.title}
              </h1>

              <p className="guiropa-support-hero__lead">
                {copy.lead}
              </p>
            </div>

            <div
              className="guiropa-support-emblem"
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

      <section className="guiropa-support-intro">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-intro__grid">
            <div>
              <span className="guiropa-support-eyebrow">
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

      <section className="guiropa-support-options">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-options__grid">
            <article className="guiropa-support-card">
              <span className="guiropa-support-card__label">
                {copy.asaasLabel}
              </span>

              <h3>
                {copy.asaasTitle}
              </h3>

              <p>
                {copy.asaasText}
              </p>

              <a
                className="guiropa-support-card__action"
                href={ASAAS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {copy.asaasAction}
                </span>

                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            </article>

            <article className="guiropa-support-card">
              <span className="guiropa-support-card__label">
                {copy.paypalLabel}
              </span>

              <h3>
                {copy.paypalTitle}
              </h3>

              <p>
                {copy.paypalText}
              </p>

              <a
                className="guiropa-support-card__action"
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {copy.paypalAction}
                </span>

                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            </article>
          </div>

          <div className="guiropa-support-note">
            <strong>
              {copy.noteTitle}
            </strong>

            <p>
              {copy.noteText}
            </p>
          </div>

          <div className="guiropa-support-operator">
            {copy.operator}
          </div>
        </div>
      </section>

      <section className="guiropa-support-final">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-final__grid">
            <div>
              <span className="guiropa-support-eyebrow">
                {copy.finalEyebrow}
              </span>

              <h2>
                {copy.finalTitle}
              </h2>
            </div>

            <p>
              {copy.finalLead}
            </p>
          </div>

          <div className="guiropa-support-final__operator">
            {copy.operator}
          </div>
        </div>
      </section>
    </main>
  );
}
