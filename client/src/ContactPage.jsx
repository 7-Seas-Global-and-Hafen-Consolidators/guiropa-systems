import { useEffect, useRef } from "react";
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

const EMAIL_URL =
  "mailto:guiropasystems@gmail.com?subject=Contato%20GUIROPA%20RADIO";

const SPOTIFY_URL =
  "https://open.spotify.com/playlist/5qJ9iLyWFxGs9zVCSAOMLD";

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
          "A playlist oficial 1950 — 1990 está disponível aqui.",
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

    participationEyebrow: "AGORA É SUA VEZ",
    participationTitle: "A gaveta abre. Você entra.",
    participationLead:
      "Sugira uma música para a programação ou conte a história que uma canção deixou na sua vida.",

    nextEyebrow: "NÃO TENTE ADIVINHAR A PRÓXIMA",
    nextTitle: "O que vem depois?",
    nextLead:
      "Tem outra música na cabeça? Mande para a GUIROPA.",

    storyEyebrow:
      "TEM MÚSICA QUE VOCÊ ESCUTA. E TEM MÚSICA QUE ACONTECE COM VOCÊ.",
    storyTitle: "Qual é a sua?",
    storyLead:
      "Uma pessoa. Uma cidade. Uma noite. Uma perda. Um amor. Uma época inteira.",

    name: "NOME",
    email: "E-MAIL",
    artist: "ARTISTA",
    song: "MÚSICA",
    decade: "DÉCADA",
    beforeAfter:
      "O QUE DEVERIA TOCAR ANTES OU DEPOIS DELA?",
    beforeAfterPlaceholder:
      "Pode ser uma combinação perfeitamente sensata. Ou completamente irresponsável.",
    storyReason:
      "POR QUE ESSA MÚSICA FICOU COM VOCÊ?",
    storyPlaceholder:
      "Conte do seu jeito. Não precisa escrever bonito. Precisa ser verdadeiro.",
    chooseDecade: "Escolha a década",
    sendSuggestion: "MANDAR PARA A GUIROPA →",
    sendStory: "CONTAR PARA A GUIROPA →",

    termsPrefix: "Li e aceito os ",
    termsLink: "Termos de Envio",
    termsAnd: " e a ",
    privacyLink: "Política de Privacidade",
    termsSuffix: ".",

    publishText:
      "Autorizo a GUIROPA RADIO a mencionar esta história ou sugestão em seu conteúdo e programação.",

    formNote:
      "Enviado diretamente pelo Formspree. Seu e-mail é usado apenas para responder a esta mensagem.",

    legalEyebrow: "ENVIO E PRIVACIDADE",
    legalTitle: "Claro. Curto. Direto.",
    termsTitle: "Termos de Envio",
    termsBody:
      "Ao enviar, você confirma que as informações fornecidas são de sua responsabilidade. O envio não garante inclusão na programação.",
    privacyTitle: "Política de Privacidade",
    privacyBody:
      "Os dados enviados são usados para receber, analisar e responder à mensagem. Seu e-mail não é publicado.",

    operator:
      "Operação: 7 Seas Global.",

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
          "The official 1950 — 1990 playlist is available here.",
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

    participationEyebrow: "NOW IT'S YOUR TURN",
    participationTitle: "Open the drawer. Step in.",
    participationLead:
      "Suggest a song for the schedule or tell us the story a song left in your life.",

    nextEyebrow:
      "DON'T TRY TO GUESS WHAT COMES NEXT",
    nextTitle: "What comes next?",
    nextLead:
      "Got another song in your head? Send it to GUIROPA.",

    storyEyebrow:
      "SOME SONGS YOU HEAR. SOME SONGS HAPPEN TO YOU.",
    storyTitle: "What's yours?",
    storyLead:
      "A person. A city. A night. A loss. A love. An entire era.",

    name: "NAME",
    email: "E-MAIL",
    artist: "ARTIST",
    song: "SONG",
    decade: "DECADE",
    beforeAfter:
      "WHAT SHOULD PLAY BEFORE OR AFTER IT?",
    beforeAfterPlaceholder:
      "It can be perfectly sensible. Or completely irresponsible.",
    storyReason:
      "WHY DID THIS SONG STAY WITH YOU?",
    storyPlaceholder:
      "Tell it your way. It doesn't need to sound polished. It needs to be true.",
    chooseDecade: "Choose the decade",
    sendSuggestion: "SEND TO GUIROPA →",
    sendStory: "TELL GUIROPA →",

    termsPrefix: "I accept the ",
    termsLink: "Submission Terms",
    termsAnd: " and the ",
    privacyLink: "Privacy Policy",
    termsSuffix: ".",

    publishText:
      "I authorize GUIROPA RADIO to mention this story or suggestion in its content and programming.",

    formNote:
      "Sent directly through Formspree. Your e-mail is used only to reply to this message.",

    legalEyebrow: "SUBMISSIONS AND PRIVACY",
    legalTitle: "Clear. Short. Direct.",
    termsTitle: "Submission Terms",
    termsBody:
      "By submitting, you confirm that the information provided is your responsibility. Submission does not guarantee inclusion in programming.",
    privacyTitle: "Privacy Policy",
    privacyBody:
      "Submitted data is used to receive, review and reply to your message. Your e-mail is not published.",

    operator:
      "Operation: 7 Seas Global.",

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
          "La playlist oficial 1950 — 1990 está disponible aquí.",
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

    participationEyebrow: "AHORA ES TU TURNO",
    participationTitle: "Abre el cajón. Entra.",
    participationLead:
      "Sugiere una canción para la programación o cuenta la historia que una canción dejó en tu vida.",

    nextEyebrow:
      "NO INTENTES ADIVINAR LA PRÓXIMA",
    nextTitle: "¿Qué viene después?",
    nextLead:
      "¿Tienes otra canción en la cabeza? Envíala a GUIROPA.",

    storyEyebrow:
      "HAY MÚSICA QUE ESCUCHAS. Y HAY MÚSICA QUE TE PASA.",
    storyTitle: "¿Cuál es la tuya?",
    storyLead:
      "Una persona. Una ciudad. Una noche. Una pérdida. Un amor. Una época entera.",

    name: "NOMBRE",
    email: "CORREO",
    artist: "ARTISTA",
    song: "CANCIÓN",
    decade: "DÉCADA",
    beforeAfter:
      "¿QUÉ DEBERÍA SONAR ANTES O DESPUÉS?",
    beforeAfterPlaceholder:
      "Puede ser perfectamente sensato. O completamente irresponsable.",
    storyReason:
      "¿POR QUÉ ESTA CANCIÓN SE QUEDÓ CONTIGO?",
    storyPlaceholder:
      "Cuéntalo a tu manera. No tiene que sonar bonito. Tiene que ser verdadero.",
    chooseDecade: "Elige la década",
    sendSuggestion: "ENVIAR A GUIROPA →",
    sendStory: "CONTAR A GUIROPA →",

    termsPrefix: "Acepto los ",
    termsLink: "Términos de Envío",
    termsAnd: " y la ",
    privacyLink: "Política de Privacidad",
    termsSuffix: ".",

    publishText:
      "Autorizo a GUIROPA RADIO a mencionar esta historia o sugerencia en su contenido y programación.",

    formNote:
      "Enviado directamente por Formspree. Tu correo se usa solo para responder a este mensaje.",

    legalEyebrow: "ENVÍOS Y PRIVACIDAD",
    legalTitle: "Claro. Corto. Directo.",
    termsTitle: "Términos de Envío",
    termsBody:
      "Al enviar, confirmas que la información proporcionada es de tu responsabilidad. El envío no garantiza inclusión en la programación.",
    privacyTitle: "Política de Privacidad",
    privacyBody:
      "Los datos enviados se usan para recibir, revisar y responder tu mensaje. Tu correo no se publica.",

    operator:
      "Operación: 7 Seas Global.",

    footerEyebrow: "GUIROPA RADIO · 1950 — 1990",
    footerTitle: "GET UP. TURN IT UP. GUIROPA.",
  },
};

const FORMSPREE_URL =
  "https://formspree.io/f/xdenpydo";

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

  const participationRef = useRef(null);

  useEffect(() => {
    const node = participationRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle(
          "guiropa-contact-forms-visible",
          entry.isIntersecting
        );
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      document.body.classList.remove(
        "guiropa-contact-forms-visible"
      );
    };
  }, []);

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

        /* PARTICIPATION FORMS */

        .guiropa-contact-participation {
          padding:
            clamp(4.8rem, 8vw, 7rem)
            0;

          border-top:
            1px solid
            var(--gc-line);

          background:
            rgba(
              255,
              252,
              245,
              0.34
            );
        }

        .guiropa-contact-participation__head {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 430px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;

          margin-bottom:
            clamp(2.5rem, 5vw, 4rem);
        }

        .guiropa-contact-participation__head h2 {
          margin: 0.8rem 0 0;

          max-width: 820px;

          font-size:
            clamp(
              2.8rem,
              5.5vw,
              5.2rem
            );

          font-weight: 800;

          line-height: 0.96;

          letter-spacing: -0.05em;
        }

        .guiropa-contact-participation__head p {
          margin: 0;

          color:
            var(--gc-soft);

          font-size: 0.96rem;

          line-height: 1.7;
        }

        .guiropa-contact-forms {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;
        }

        .guiropa-contact-form {
          padding:
            clamp(
              1.6rem,
              3vw,
              2.4rem
            );

          border:
            1px solid
            var(--gc-line);

          background:
            rgba(
              255,
              252,
              245,
              0.70
            );
        }

        .guiropa-contact-form h3 {
          margin:
            0.7rem
            0
            0;

          font-size:
            clamp(
              2rem,
              3.8vw,
              3.4rem
            );

          font-weight: 800;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-contact-form__lead {
          margin:
            0.8rem
            0
            1.6rem;

          color:
            var(--gc-soft);

          font-size: 0.86rem;

          line-height: 1.6;
        }

        .guiropa-contact-form__grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 14px;
        }

        .guiropa-contact-field {
          display: grid;

          gap: 7px;
        }

        .guiropa-contact-field--full {
          grid-column:
            1 / -1;
        }

        .guiropa-contact-field label {
          color:
            var(--gc-ink);

          font-size: 0.58rem;
          font-weight: 900;

          letter-spacing: 0.11em;

          text-transform: uppercase;
        }

        .guiropa-contact-field input,
        .guiropa-contact-field select,
        .guiropa-contact-field textarea {
          width: 100%;

          border:
            1px solid
            rgba(
              76,
              56,
              39,
              0.28
            );

          border-radius: 0;

          background:
            rgba(
              255,
              255,
              255,
              0.54
            );

          color:
            var(--gc-ink);

          font: inherit;

          outline: none;
        }

        .guiropa-contact-field input,
        .guiropa-contact-field select {
          min-height: 46px;

          padding:
            0 12px;
        }

        .guiropa-contact-field textarea {
          min-height: 118px;

          padding: 12px;

          resize: vertical;
        }

        .guiropa-contact-field input:focus,
        .guiropa-contact-field select:focus,
        .guiropa-contact-field textarea:focus {
          border-color:
            var(--gc-gold);
        }

        .guiropa-contact-check {
          display: flex;

          gap: 9px;

          align-items:
            flex-start;

          margin-top: 12px;

          color:
            var(--gc-soft);

          font-size: 0.68rem;

          line-height: 1.45;
        }

        .guiropa-contact-check input {
          margin-top: 2px;

          accent-color:
            var(--gc-red);
        }

        .guiropa-contact-check a {
          color:
            var(--gc-gold-dark);

          font-weight: 800;

          text-decoration:
            underline;

          text-decoration-thickness:
            1px;

          text-underline-offset:
            2px;
        }

        .guiropa-contact-check a:hover {
          color:
            var(--gc-red);
        }

        .guiropa-contact-submit {
          width: 100%;

          min-height: 50px;

          margin-top: 16px;

          border: 0;

          background:
            var(--gc-ink);

          color:
            #fff8ed;

          font-size: 0.64rem;
          font-weight: 900;

          letter-spacing: 0.05em;

          cursor: pointer;

          text-transform: uppercase;
        }

        .guiropa-contact-submit:hover {
          background:
            var(--gc-red);
        }

        .guiropa-contact-form__note {
          margin:
            1rem
            0
            0;

          color:
            rgba(
              110,
              95,
              77,
              0.72
            );

          font-size: 0.58rem;

          line-height: 1.5;
        }

        .guiropa-contact-operator {
          margin-top: 0.7rem;

          color:
            rgba(
              110,
              95,
              77,
              0.50
            );

          font-size: 0.52rem;
          font-weight: 700;

          letter-spacing: 0.08em;

          text-align: right;
        }

        /* TERMS + PRIVACY */

        .guiropa-contact-legal {
          padding:
            clamp(4rem, 7vw, 6rem)
            0;

          border-top:
            1px solid
            var(--gc-line);

          background:
            rgba(
              255,
              250,
              240,
              0.24
            );
        }

        .guiropa-contact-legal__head {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 430px);

          gap:
            clamp(3rem, 7vw, 6rem);

          align-items: end;

          margin-bottom:
            clamp(2.5rem, 5vw, 4rem);
        }

        .guiropa-contact-legal__head h2 {
          margin: 0.8rem 0 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              2.5rem,
              5vw,
              4.6rem
            );

          font-weight: 400;

          line-height: 0.98;

          letter-spacing: -0.045em;
        }

        .guiropa-contact-legal__grid {
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

        .guiropa-contact-legal__item {
          scroll-margin-top: 110px;

          padding:
            clamp(
              1.8rem,
              3vw,
              2.5rem
            );

          border-right:
            1px solid
            var(--gc-line);

          border-bottom:
            1px solid
            var(--gc-line);
        }

        .guiropa-contact-legal__item h3 {
          margin: 0;

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
        }

        .guiropa-contact-legal__item p {
          margin: 1rem 0 0;

          color:
            var(--gc-soft);

          font-size: 0.82rem;

          line-height: 1.7;
        }

        body.guiropa-contact-forms-visible
        .guiropa-persistent-player {
          opacity: 0 !important;

          pointer-events: none !important;

          transform:
            translate(
              -50%,
              calc(100% + 40px)
            ) !important;

          transition:
            opacity 0.24s ease,
            transform 0.24s ease !important;
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

          .guiropa-contact-participation__head,
          .guiropa-contact-forms,
          .guiropa-contact-legal__head,
          .guiropa-contact-legal__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-contact-legal__item {
            border-right: 0;
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

          .guiropa-contact-form__grid {
            grid-template-columns: 1fr;
          }

          .guiropa-contact-field--full {
            grid-column: auto;
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

      <section
        ref={participationRef}
        className="guiropa-contact-participation"
      >
        <div className="guiropa-contact-shell">
          <div className="guiropa-contact-participation__head">
            <div>
              <span className="guiropa-contact-eyebrow">
                {copy.participationEyebrow}
              </span>

              <h2>
                {copy.participationTitle}
              </h2>
            </div>

            <p>
              {copy.participationLead}
            </p>
          </div>

          <div className="guiropa-contact-forms">
            <form
              className="guiropa-contact-form"
              action={FORMSPREE_URL}
              method="POST"
            >
              <input
                type="hidden"
                name="form_type"
                value="GUIROPA — O que vem depois?"
              />

              <input
                type="hidden"
                name="brand"
                value="GUIROPA RADIO"
              />

              <span className="guiropa-contact-eyebrow">
                {copy.nextEyebrow}
              </span>

              <h3>
                {copy.nextTitle}
              </h3>

              <p className="guiropa-contact-form__lead">
                {copy.nextLead}
              </p>

              <div className="guiropa-contact-form__grid">
                <div className="guiropa-contact-field">
                  <label htmlFor="next-name">
                    {copy.name}
                  </label>

                  <input
                    id="next-name"
                    name="name"
                    type="text"
                    required
                  />
                </div>

                <div className="guiropa-contact-field">
                  <label htmlFor="next-email">
                    {copy.email}
                  </label>

                  <input
                    id="next-email"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                <div className="guiropa-contact-field">
                  <label htmlFor="next-artist">
                    {copy.artist}
                  </label>

                  <input
                    id="next-artist"
                    name="artist"
                    type="text"
                    required
                  />
                </div>

                <div className="guiropa-contact-field">
                  <label htmlFor="next-song">
                    {copy.song}
                  </label>

                  <input
                    id="next-song"
                    name="song"
                    type="text"
                    required
                  />
                </div>

                <div className="guiropa-contact-field guiropa-contact-field--full">
                  <label htmlFor="next-decade">
                    {copy.decade}
                  </label>

                  <select
                    id="next-decade"
                    name="decade"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      {copy.chooseDecade}
                    </option>
                    <option value="1950s">1950s</option>
                    <option value="1960s">1960s</option>
                    <option value="1970s">1970s</option>
                    <option value="1980s">1980s</option>
                    <option value="1990">1990</option>
                  </select>
                </div>

                <div className="guiropa-contact-field guiropa-contact-field--full">
                  <label htmlFor="next-before-after">
                    {copy.beforeAfter}
                  </label>

                  <textarea
                    id="next-before-after"
                    name="before_after"
                    placeholder={copy.beforeAfterPlaceholder}
                  />
                </div>
              </div>

              <label className="guiropa-contact-check">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  value="yes"
                  required
                />

                <span>
                  {copy.termsPrefix}
                  <a href="#guiropa-submission-terms">
                    {copy.termsLink}
                  </a>
                  {copy.termsAnd}
                  <a href="#guiropa-privacy-policy">
                    {copy.privacyLink}
                  </a>
                  {copy.termsSuffix}
                </span>
              </label>

              <label className="guiropa-contact-check">
                <input
                  type="checkbox"
                  name="publication_authorized"
                  value="yes"
                />

                <span>
                  {copy.publishText}
                </span>
              </label>

              <button
                className="guiropa-contact-submit"
                type="submit"
              >
                {copy.sendSuggestion}
              </button>

              <p className="guiropa-contact-form__note">
                {copy.formNote}
              </p>

              <div className="guiropa-contact-operator">
                {copy.operator}
              </div>
            </form>

            <form
              className="guiropa-contact-form"
              action={FORMSPREE_URL}
              method="POST"
            >
              <input
                type="hidden"
                name="form_type"
                value="GUIROPA — Qual é a sua?"
              />

              <input
                type="hidden"
                name="brand"
                value="GUIROPA RADIO"
              />

              <span className="guiropa-contact-eyebrow">
                {copy.storyEyebrow}
              </span>

              <h3>
                {copy.storyTitle}
              </h3>

              <p className="guiropa-contact-form__lead">
                {copy.storyLead}
              </p>

              <div className="guiropa-contact-form__grid">
                <div className="guiropa-contact-field">
                  <label htmlFor="story-name">
                    {copy.name}
                  </label>

                  <input
                    id="story-name"
                    name="name"
                    type="text"
                    required
                  />
                </div>

                <div className="guiropa-contact-field">
                  <label htmlFor="story-email">
                    {copy.email}
                  </label>

                  <input
                    id="story-email"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                <div className="guiropa-contact-field">
                  <label htmlFor="story-artist">
                    {copy.artist}
                  </label>

                  <input
                    id="story-artist"
                    name="artist"
                    type="text"
                    required
                  />
                </div>

                <div className="guiropa-contact-field">
                  <label htmlFor="story-song">
                    {copy.song}
                  </label>

                  <input
                    id="story-song"
                    name="song"
                    type="text"
                    required
                  />
                </div>

                <div className="guiropa-contact-field guiropa-contact-field--full">
                  <label htmlFor="story-reason">
                    {copy.storyReason}
                  </label>

                  <textarea
                    id="story-reason"
                    name="story"
                    placeholder={copy.storyPlaceholder}
                    required
                  />
                </div>
              </div>

              <label className="guiropa-contact-check">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  value="yes"
                  required
                />

                <span>
                  {copy.termsPrefix}
                  <a href="#guiropa-submission-terms">
                    {copy.termsLink}
                  </a>
                  {copy.termsAnd}
                  <a href="#guiropa-privacy-policy">
                    {copy.privacyLink}
                  </a>
                  {copy.termsSuffix}
                </span>
              </label>

              <label className="guiropa-contact-check">
                <input
                  type="checkbox"
                  name="publication_authorized"
                  value="yes"
                />

                <span>
                  {copy.publishText}
                </span>
              </label>

              <button
                className="guiropa-contact-submit"
                type="submit"
              >
                {copy.sendStory}
              </button>

              <p className="guiropa-contact-form__note">
                {copy.formNote}
              </p>

              <div className="guiropa-contact-operator">
                {copy.operator}
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="guiropa-contact-legal">
        <div className="guiropa-contact-shell">
          <div className="guiropa-contact-legal__head">
            <div>
              <span className="guiropa-contact-eyebrow">
                {copy.legalEyebrow}
              </span>

              <h2>
                {copy.legalTitle}
              </h2>
            </div>
          </div>

          <div className="guiropa-contact-legal__grid">
            <article
              id="guiropa-submission-terms"
              className="guiropa-contact-legal__item"
            >
              <h3>
                {copy.termsTitle}
              </h3>

              <p>
                {copy.termsBody}
              </p>
            </article>

            <article
              id="guiropa-privacy-policy"
              className="guiropa-contact-legal__item"
            >
              <h3>
                {copy.privacyTitle}
              </h3>

              <p>
                {copy.privacyBody}
              </p>
            </article>
          </div>

          <div className="guiropa-contact-operator">
            {copy.operator}
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
