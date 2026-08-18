import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

/*
 * Canais GUIROPA.
 *
 * Telegram e WhatsApp já podem funcionar.
 * E-mail e Spotify ficam prontos para receber os links oficiais
 * sem precisar reconstruir a página.
 */

const TELEGRAM_URL =
  "https://t.me/m/t6seeX61ZTlk";

const WHATSAPP_URL =
  "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20falar%20com%20a%20GUIROPA.";

const EMAIL_URL = "";

const SPOTIFY_URL = "";

const COPY = {
  pt: {
    eyebrow: "GUIROPA · CONTATO",
    title: "Contato",
    lead:
      "Escolha o canal. Fale diretamente com a GUIROPA.",

    directEyebrow: "CANAIS DIRETOS",
    directTitle: "Sem labirinto.",
    directLead:
      "Atendimento, loja, publicidade, fornecedores, propostas e assuntos institucionais.",

    channels: [
      {
        id: "telegram",
        label: "TELEGRAM",
        title: "Canal direto.",
        description:
          "Contato rápido com a GUIROPA pelo Telegram.",
        action: "ABRIR TELEGRAM",
      },
      {
        id: "whatsapp",
        label: "WHATSAPP",
        title: "Também estamos lá.",
        description:
          "Atendimento comercial e dúvidas rápidas pelo WhatsApp.",
        action: "ABRIR WHATSAPP",
      },
      {
        id: "email",
        label: "E-MAIL",
        title: "Documentos e negócios.",
        description:
          "Propostas, documentos, fornecedores, publicidade e assuntos institucionais.",
        action: "ENVIAR E-MAIL",
      },
      {
        id: "spotify",
        label: "SPOTIFY",
        title: "GUIROPA no Spotify.",
        description:
          "A playlist oficial 1950 — 1990 ficará disponível aqui.",
        action: "ABRIR SPOTIFY",
      },
    ],

    unavailable: "EM PREPARAÇÃO",

    businessEyebrow: "COMERCIAL",
    businessTitle: "Loja. Publicidade. Negócios.",
    businessLead:
      "Para produtos, pedidos, fornecedores, publicidade ou propostas comerciais, escolha o canal mais conveniente e fale diretamente com a GUIROPA.",

    telegramPriority: "CANAL DIRETO",
    whatsappNecessary: "ATENDIMENTO",
    emailBusiness: "NEGÓCIOS",
    spotifyOfficial: "PLAYLIST OFICIAL",

    footerEyebrow: "GUIROPA RADIO · 1950 — 1990",
    footerTitle: "GET UP. TURN IT UP. GUIROPA.",
  },

  en: {
    eyebrow: "GUIROPA · CONTACT",
    title: "Contact",
    lead:
      "Choose a channel. Talk directly to GUIROPA.",

    directEyebrow: "DIRECT CHANNELS",
    directTitle: "No maze.",
    directLead:
      "Support, store, advertising, suppliers, proposals and institutional matters.",

    channels: [
      {
        id: "telegram",
        label: "TELEGRAM",
        title: "Direct channel.",
        description:
          "Fast contact with GUIROPA through Telegram.",
        action: "OPEN TELEGRAM",
      },
      {
        id: "whatsapp",
        label: "WHATSAPP",
        title: "We are there too.",
        description:
          "Commercial support and quick questions through WhatsApp.",
        action: "OPEN WHATSAPP",
      },
      {
        id: "email",
        label: "E-MAIL",
        title: "Documents and business.",
        description:
          "Proposals, documents, suppliers, advertising and institutional matters.",
        action: "SEND E-MAIL",
      },
      {
        id: "spotify",
        label: "SPOTIFY",
        title: "GUIROPA on Spotify.",
        description:
          "The official 1950 — 1990 playlist will be available here.",
        action: "OPEN SPOTIFY",
      },
    ],

    unavailable: "COMING SOON",

    businessEyebrow: "COMMERCIAL",
    businessTitle: "Store. Advertising. Business.",
    businessLead:
      "For products, orders, suppliers, advertising or commercial proposals, choose the most convenient channel and talk directly to GUIROPA.",

    telegramPriority: "DIRECT CHANNEL",
    whatsappNecessary: "SUPPORT",
    emailBusiness: "BUSINESS",
    spotifyOfficial: "OFFICIAL PLAYLIST",

    footerEyebrow: "GUIROPA RADIO · 1950 — 1990",
    footerTitle: "GET UP. TURN IT UP. GUIROPA.",
  },

  es: {
    eyebrow: "GUIROPA · CONTACTO",
    title: "Contacto",
    lead:
      "Elige el canal. Habla directamente con GUIROPA.",

    directEyebrow: "CANALES DIRECTOS",
    directTitle: "Sin laberintos.",
    directLead:
      "Atención, tienda, publicidad, proveedores, propuestas y asuntos institucionales.",

    channels: [
      {
        id: "telegram",
        label: "TELEGRAM",
        title: "Canal directo.",
        description:
          "Contacto rápido con GUIROPA a través de Telegram.",
        action: "ABRIR TELEGRAM",
      },
      {
        id: "whatsapp",
        label: "WHATSAPP",
        title: "También estamos allí.",
        description:
          "Atención comercial y consultas rápidas por WhatsApp.",
        action: "ABRIR WHATSAPP",
      },
      {
        id: "email",
        label: "CORREO",
        title: "Documentos y negocios.",
        description:
          "Propuestas, documentos, proveedores, publicidad y asuntos institucionales.",
        action: "ENVIAR CORREO",
      },
      {
        id: "spotify",
        label: "SPOTIFY",
        title: "GUIROPA en Spotify.",
        description:
          "La playlist oficial 1950 — 1990 estará disponible aquí.",
        action: "ABRIR SPOTIFY",
      },
    ],

    unavailable: "PRÓXIMAMENTE",

    businessEyebrow: "COMERCIAL",
    businessTitle: "Tienda. Publicidad. Negocios.",
    businessLead:
      "Para productos, pedidos, proveedores, publicidad o propuestas comerciales, elige el canal más conveniente y habla directamente con GUIROPA.",

    telegramPriority: "CANAL DIRECTO",
    whatsappNecessary: "ATENCIÓN",
    emailBusiness: "NEGOCIOS",
    spotifyOfficial: "PLAYLIST OFICIAL",

    footerEyebrow: "GUIROPA RADIO · 1950 — 1990",
    footerTitle: "GET UP. TURN IT UP. GUIROPA.",
  },
};

const LINKS = {
  telegram: TELEGRAM_URL,
  whatsapp: WHATSAPP_URL,
  email: EMAIL_URL,
  spotify: SPOTIFY_URL,
};

export default function ContactPage() {
  const { lang } = useLanguage();

  const copy =
    COPY[lang] ||
    COPY.pt;

  return (
    <main className="guiropa-contact-page">
      <style>{`
        .guiropa-contact-page {
          --gc-paper: #f5ead6;
          --gc-paper-deep: #ead0a8;

          --gc-ink: #211b16;
          --gc-soft: #6e5f4d;

          --gc-red: #b83224;

          --gc-gold: #c99a45;
          --gc-gold-light: #e0bb70;
          --gc-gold-dark: #75501f;

          --gc-black: #0d0c0b;
          --gc-black-two: #17130f;

          --gc-line:
            rgba(
              76,
              56,
              39,
              0.18
            );

          min-height: 100vh;

          color:
            var(--gc-ink);

          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(
                255,
                255,
                255,
                0.60
              ),
              transparent 36%
            ),
            linear-gradient(
              180deg,
              #f8efdf 0%,
              var(--gc-paper) 58%,
              var(--gc-paper-deep) 100%
            );
        }

        .guiropa-contact-page *,
        .guiropa-contact-page *::before,
        .guiropa-contact-page *::after {
          box-sizing: border-box;
        }

        .guiropa-contact-shell {
          width:
            min(
              1180px,
              calc(100% - 40px)
            );

          margin: 0 auto;
        }

        /* HERO */

        .guiropa-contact-hero {
          padding:
            clamp(4.5rem, 8vw, 7rem)
            0
            clamp(4rem, 7vw, 6rem);
        }

        .guiropa-contact-hero__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(190px, 270px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-contact-eyebrow {
          display: block;

          color:
            var(--gc-red);

          font-size: 0.67rem;
          font-weight: 900;

          letter-spacing: 0.23em;

          text-transform: uppercase;
        }

        .guiropa-contact-hero h1 {
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

        .guiropa-contact-hero__lead {
          max-width: 720px;

          margin: 2rem 0 0;

          color:
            var(--gc-soft);

          font-size:
            clamp(
              1rem,
              1.7vw,
              1.26rem
            );

          line-height: 1.65;
        }

        .guiropa-contact-emblem {
          display: flex;

          justify-content: flex-end;
        }

        .guiropa-contact-emblem img {
          display: block;

          width:
            min(
              100%,
              220px
            );

          height: auto;

          box-shadow:
            0 18px 36px
            rgba(
              53,
              35,
              22,
              0.18
            );

          filter:
            brightness(1.05)
            contrast(1.02)
            saturate(1.04);
        }

        /* DARK INTRO */

        .guiropa-contact-intro {
          padding:
            clamp(4rem, 7vw, 6rem)
            0;

          background:
            linear-gradient(
              180deg,
              #181410 0%,
              #0e0c0a 100%
            );

          color: #f1dfbd;
        }

        .guiropa-contact-intro__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(260px, 420px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-contact-intro
        .guiropa-contact-eyebrow {
          color:
            var(--gc-gold-light);
        }

        .guiropa-contact-intro h2 {
          margin: 0.8rem 0 0;

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

        .guiropa-contact-intro p {
          margin: 0;

          color: #a99575;

          font-size: 1rem;

          line-height: 1.75;
        }

        /* CHANNEL GRID */

        .guiropa-contact-channels {
          padding:
            clamp(4.8rem, 8vw, 7rem)
            0;
        }

        .guiropa-contact-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          border-top:
            1px solid
            var(--gc-line);

          border-left:
            1px solid
            var(--gc-line);
        }

        .guiropa-contact-card {
          position: relative;

          min-height: 330px;

          display: flex;

          flex-direction: column;

          padding:
            clamp(
              1.8rem,
              3vw,
              2.6rem
            );

          border-right:
            1px solid
            var(--gc-line);

          border-bottom:
            1px solid
            var(--gc-line);

          background:
            rgba(
              255,
              250,
              240,
              0.22
            );

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        .guiropa-contact-card:hover {
          transform:
            translateY(-3px);

          background:
            rgba(
              255,
              249,
              235,
              0.42
            );
        }

        .guiropa-contact-card__label {
          color:
            var(--gc-red);

          font-size: 0.62rem;
          font-weight: 900;

          letter-spacing: 0.17em;

          text-transform: uppercase;
        }

        .guiropa-contact-card h3 {
          margin:
            1.1rem
            0
            0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2rem,
              3.6vw,
              3.3rem
            );

          font-weight: 400;

          line-height: 1;

          letter-spacing: -0.04em;
        }

        .guiropa-contact-card p {
          max-width: 470px;

          margin:
            1rem
            0
            0;

          color:
            var(--gc-soft);

          font-size: 0.88rem;

          line-height: 1.65;
        }

        .guiropa-contact-card__bottom {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          gap: 1rem;

          margin-top: auto;

          padding-top: 2.2rem;
        }

        .guiropa-contact-action {
          min-height: 42px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          padding:
            0 16px;

          border:
            1px solid
            var(--gc-ink);

          background:
            var(--gc-ink);

          color:
            #f7ead4;

          font-size: 0.59rem;
          font-weight: 900;

          letter-spacing: 0.08em;

          text-decoration: none;

          text-transform: uppercase;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .guiropa-contact-action:hover {
          border-color:
            var(--gc-red);

          background:
            var(--gc-red);

          color: #fff;
        }

        .guiropa-contact-action.is-disabled {
          border-color:
            rgba(
              76,
              56,
              39,
              0.22
            );

          background:
            transparent;

          color:
            rgba(
              76,
              56,
              39,
              0.45
            );

          cursor: default;
        }

        .guiropa-contact-channel-number {
          color:
            var(--gc-gold-dark);

          font-size: 0.65rem;
          font-weight: 900;

          letter-spacing: 0.14em;
        }

        /* BUSINESS STRIP */

        .guiropa-contact-business {
          padding:
            clamp(4.8rem, 8vw, 7rem)
            0;

          border-top:
            1px solid
            var(--gc-line);
        }

        .guiropa-contact-business__grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 430px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;
        }

        .guiropa-contact-business h2 {
          margin: 0.8rem 0 0;

          max-width: 780px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.8rem,
              5.4vw,
              5rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-contact-business p {
          margin: 0;

          color:
            var(--gc-soft);

          font-size: 0.96rem;

          line-height: 1.7;
        }

        /* CHANNEL STATUS */

        .guiropa-contact-status {
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
            var(--gc-line);

          border-bottom:
            1px solid
            var(--gc-line);
        }

        .guiropa-contact-status div {
          padding:
            1.6rem
            1rem;

          text-align: center;

          border-right:
            1px solid
            var(--gc-line);
        }

        .guiropa-contact-status div:last-child {
          border-right: 0;
        }

        .guiropa-contact-status strong {
          display: block;

          color:
            var(--gc-ink);

          font-size: 0.78rem;
        }

        .guiropa-contact-status span {
          display: block;

          margin-top: 0.35rem;

          color:
            var(--gc-gold-dark);

          font-size: 0.54rem;
          font-weight: 900;

          letter-spacing: 0.12em;

          text-transform: uppercase;
        }

        /* FINAL */

        .guiropa-contact-final {
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

        .guiropa-contact-final h2 {
          max-width: 900px;

          margin: 0.8rem 0 0;

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

        .guiropa-contact-final
        .guiropa-contact-eyebrow {
          color:
            var(--gc-gold-light);
        }

        @media (max-width: 800px) {
          .guiropa-contact-hero__grid,
          .guiropa-contact-intro__grid,
          .guiropa-contact-business__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-contact-emblem {
            justify-content:
              flex-start;
          }

          .guiropa-contact-grid {
            grid-template-columns: 1fr;
          }

          .guiropa-contact-status {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

          .guiropa-contact-status
          div:nth-child(2) {
            border-right: 0;
          }

          .guiropa-contact-status
          div:nth-child(-n+2) {
            border-bottom:
              1px solid
              var(--gc-line);
          }
        }

        @media (max-width: 520px) {
          .guiropa-contact-shell {
            width:
              min(
                100% - 24px,
                650px
              );
          }

          .guiropa-contact-status {
            grid-template-columns: 1fr;
          }

          .guiropa-contact-status div,
          .guiropa-contact-status
          div:nth-child(2) {
            border-right: 0;

            border-bottom:
              1px solid
              var(--gc-line);
          }

          .guiropa-contact-status
          div:last-child {
            border-bottom: 0;
          }
        }
      `}</style>

      <section className="guiropa-contact-hero">
        <div className="guiropa-contact-shell">
          <div className="guiropa-contact-hero__grid">
            <div>
              <span className="guiropa-contact-eyebrow">
                {copy.eyebrow}
              </span>

              <h1>
                {copy.title}
              </h1>

              <p className="guiropa-contact-hero__lead">
                {copy.lead}
              </p>
            </div>

            <div
              className="guiropa-contact-emblem"
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

      <section className="guiropa-contact-intro">
        <div className="guiropa-contact-shell">
          <div className="guiropa-contact-intro__grid">
            <div>
              <span className="guiropa-contact-eyebrow">
                {copy.directEyebrow}
              </span>

              <h2>
                {copy.directTitle}
              </h2>
            </div>

            <p>
              {copy.directLead}
            </p>
          </div>
        </div>
      </section>

      <section className="guiropa-contact-channels">
        <div className="guiropa-contact-shell">
          <div className="guiropa-contact-grid">
            {copy.channels.map(
              (channel, index) => {
                const url =
                  LINKS[channel.id];

                const enabled =
                  Boolean(url);

                return (
                  <article
                    className="guiropa-contact-card"
                    key={channel.id}
                  >
                    <span className="guiropa-contact-card__label">
                      {channel.label}
                    </span>

                    <h3>
                      {channel.title}
                    </h3>

                    <p>
                      {channel.description}
                    </p>

                    <div className="guiropa-contact-card__bottom">
                      {enabled ? (
                        <a
                          className="guiropa-contact-action"
                          href={url}
                          target={
                            channel.id ===
                            "email"
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            channel.id ===
                            "email"
                              ? undefined
                              : "noopener noreferrer"
                          }
                        >
                          {channel.action}
                        </a>
                      ) : (
                        <span className="guiropa-contact-action is-disabled">
                          {copy.unavailable}
                        </span>
                      )}

                      <span className="guiropa-contact-channel-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>
      </section>

      <section className="guiropa-contact-business">
        <div className="guiropa-contact-shell">
          <div className="guiropa-contact-business__grid">
            <div>
              <span className="guiropa-contact-eyebrow">
                {copy.businessEyebrow}
              </span>

              <h2>
                {copy.businessTitle}
              </h2>
            </div>

            <p>
              {copy.businessLead}
            </p>
          </div>

          <div className="guiropa-contact-status">
            <div>
              <strong>
                TELEGRAM
              </strong>

              <span>
                {copy.telegramPriority}
              </span>
            </div>

            <div>
              <strong>
                WHATSAPP
              </strong>

              <span>
                {copy.whatsappNecessary}
              </span>
            </div>

            <div>
              <strong>
                E-MAIL
              </strong>

              <span>
                {copy.emailBusiness}
              </span>
            </div>

            <div>
              <strong>
                SPOTIFY
              </strong>

              <span>
                {copy.spotifyOfficial}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="guiropa-contact-final">
        <div className="guiropa-contact-shell">
          <span className="guiropa-contact-eyebrow">
            {copy.footerEyebrow}
          </span>

          <h2>
            {copy.footerTitle}
          </h2>
        </div>
      </section>
    </main>
  );
}
