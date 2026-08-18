import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

const ASAAS_URL = "https://www.asaas.com/c/n17o931m5w6ze64t";
const PAYPAL_URL = "https://www.paypal.com/ncp/payment/Y4KB4YKHPKS88";

const SUPPORT_COPY = {
  pt: {
    eyebrow: "GUIROPA RADIO · APOIE",
    title: "Apoie.",
    lead: "Ajude a manter a GUIROPA no ar, ampliar a programação, o acervo e os próximos projetos.",
    introEyebrow: "VOCÊ ESCOLHE O VALOR",
    introTitle: "Mantenha a estação tocando.",
    introLead: "Não há valor fixo. Escolha quanto deseja contribuir e use o meio de pagamento que preferir.",
    optionsEyebrow: "APOIO DIRETO",
    optionsTitle: "Escolha como contribuir.",
    asaasNumber: "01",
    asaasTag: "BRASIL",
    asaasTitle: "Asaas",
    asaasText: "Pix, boleto e cartão em checkout seguro.",
    asaasAction: "APOIAR VIA ASAAS",
    paypalNumber: "02",
    paypalTag: "BRASIL · INTERNACIONAL",
    paypalTitle: "PayPal",
    paypalText: "PayPal e cartões de débito ou crédito.",
    paypalAction: "APOIAR VIA PAYPAL",
    noteEyebrow: "SEM VALOR FIXO",
    noteTitle: "Você decide quanto.",
    noteText: "A contribuição é voluntária e o valor é escolhido por você.",
    finalEyebrow: "GUIROPA RADIO · 1950 — 1990",
    finalTitle: "GET UP. TURN IT UP. GUIROPA.",
    finalLead: "Cada contribuição ajuda a manter a estação no ar e os próximos projetos em movimento.",
    operator: "Operação e pagamentos: 7 Seas Global.",
  },
  en: {
    eyebrow: "GUIROPA RADIO · SUPPORT",
    title: "Support.",
    lead: "Help keep GUIROPA on air, expand programming, the archive and the next projects.",
    introEyebrow: "YOU CHOOSE THE AMOUNT",
    introTitle: "Keep the station playing.",
    introLead: "There is no fixed amount. Choose how much you want to contribute and use the payment method you prefer.",
    optionsEyebrow: "DIRECT SUPPORT",
    optionsTitle: "Choose how to contribute.",
    asaasNumber: "01",
    asaasTag: "BRAZIL",
    asaasTitle: "Asaas",
    asaasText: "Pix, bank slip and card through a secure checkout.",
    asaasAction: "SUPPORT VIA ASAAS",
    paypalNumber: "02",
    paypalTag: "BRAZIL · INTERNATIONAL",
    paypalTitle: "PayPal",
    paypalText: "PayPal and debit or credit cards.",
    paypalAction: "SUPPORT VIA PAYPAL",
    noteEyebrow: "NO FIXED AMOUNT",
    noteTitle: "You decide how much.",
    noteText: "The contribution is voluntary and the amount is chosen by you.",
    finalEyebrow: "GUIROPA RADIO · 1950 — 1990",
    finalTitle: "GET UP. TURN IT UP. GUIROPA.",
    finalLead: "Every contribution helps keep the station on air and the next projects moving.",
    operator: "Operation and payments: 7 Seas Global.",
  },
  es: {
    eyebrow: "GUIROPA RADIO · APOYA",
    title: "Apoya.",
    lead: "Ayuda a mantener GUIROPA al aire, ampliar la programación, el archivo y los próximos proyectos.",
    introEyebrow: "TÚ ELIGES EL VALOR",
    introTitle: "Mantén la estación sonando.",
    introLead: "No hay un valor fijo. Elige cuánto quieres aportar y usa el medio de pago que prefieras.",
    optionsEyebrow: "APOYO DIRECTO",
    optionsTitle: "Elige cómo contribuir.",
    asaasNumber: "01",
    asaasTag: "BRASIL",
    asaasTitle: "Asaas",
    asaasText: "Pix, boleto y tarjeta en un checkout seguro.",
    asaasAction: "APOYAR VIA ASAAS",
    paypalNumber: "02",
    paypalTag: "BRASIL · INTERNACIONAL",
    paypalTitle: "PayPal",
    paypalText: "PayPal y tarjetas de débito o crédito.",
    paypalAction: "APOYAR VIA PAYPAL",
    noteEyebrow: "SIN VALOR FIJO",
    noteTitle: "Tú decides cuánto.",
    noteText: "La contribución es voluntaria y el valor lo eliges tú.",
    finalEyebrow: "GUIROPA RADIO · 1950 — 1990",
    finalTitle: "GET UP. TURN IT UP. GUIROPA.",
    finalLead: "Cada contribución ayuda a mantener la estación al aire y los próximos proyectos en movimiento.",
    operator: "Operación y pagos: 7 Seas Global.",
  },
};

export default function SupportPage() {
  const { lang } = useLanguage();
  const copy = SUPPORT_COPY[lang] || SUPPORT_COPY.pt;

  return (
    <main className="guiropa-support-page">
      <style>{`
        .guiropa-support-page {
          --paper:#f5ead6;
          --paper-deep:#ead0a8;
          --ink:#211b16;
          --soft:#6e5f4d;
          --red:#b83224;
          --gold:#c99a45;
          --gold-light:#e0bb70;
          --gold-dark:#75501f;
          --line:rgba(76,56,39,.18);
          min-height:100vh;
          color:var(--ink);
          background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.62),transparent 36%),linear-gradient(180deg,#f8efdf 0%,var(--paper) 58%,var(--paper-deep) 100%);
        }
        .guiropa-support-page *,
        .guiropa-support-page *::before,
        .guiropa-support-page *::after { box-sizing:border-box; }
        .guiropa-support-shell { width:min(1180px,calc(100% - 40px)); margin:0 auto; }
        .guiropa-support-eyebrow { display:block; color:var(--red); font-size:.67rem; font-weight:900; letter-spacing:.23em; text-transform:uppercase; }
        .guiropa-support-hero { padding:clamp(4.5rem,8vw,7rem) 0 clamp(4rem,7vw,6rem); }
        .guiropa-support-hero__grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(190px,270px); gap:clamp(3rem,7vw,6rem); align-items:end; }
        .guiropa-support-hero h1 { margin:.8rem 0 0; font-size:clamp(4.2rem,9vw,8.8rem); font-weight:800; line-height:.86; letter-spacing:-.065em; }
        .guiropa-support-hero__lead { max-width:730px; margin:2rem 0 0; color:var(--soft); font-size:clamp(1rem,1.7vw,1.26rem); line-height:1.65; }
        .guiropa-support-emblem { display:flex; justify-content:flex-end; }
        .guiropa-support-emblem img,
        .guiropa-support-final img { display:block; width:min(100%,220px); height:auto; overflow:hidden; border:1px solid rgba(201,154,69,.30); border-radius:28px; background:#0d0c0b; box-shadow:0 18px 36px rgba(53,35,22,.18); }
        .guiropa-support-intro { padding:clamp(4rem,7vw,6.5rem) 0; background:linear-gradient(180deg,#181410 0%,#0f0d0b 100%); color:#f1dfbd; }
        .guiropa-support-intro__grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(260px,430px); gap:clamp(3rem,7vw,6rem); align-items:end; }
        .guiropa-support-intro .guiropa-support-eyebrow,
        .guiropa-support-final .guiropa-support-eyebrow { color:var(--gold-light); }
        .guiropa-support-intro h2,
        .guiropa-support-final h2,
        .guiropa-support-options__head h2,
        .guiropa-support-option h3,
        .guiropa-support-note h3 { font-family:Georgia,"Times New Roman",serif; font-weight:400; letter-spacing:-.045em; }
        .guiropa-support-intro h2 { margin:.8rem 0 0; max-width:720px; font-size:clamp(2.8rem,5.7vw,5.2rem); line-height:.98; }
        .guiropa-support-intro p { margin:0; color:#a99575; font-size:1rem; line-height:1.75; }
        .guiropa-support-options { padding:clamp(4.8rem,8vw,7rem) 0 clamp(5rem,9vw,8rem); }
        .guiropa-support-options__head { display:flex; justify-content:space-between; gap:2rem; align-items:end; padding-bottom:1.5rem; border-bottom:1px solid var(--line); }
        .guiropa-support-options__head h2 { margin:0; font-size:clamp(2.7rem,5vw,4.8rem); line-height:1; }
        .guiropa-support-options__grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); border-bottom:1px solid var(--line); }
        .guiropa-support-option { min-height:360px; display:flex; flex-direction:column; padding:clamp(1.8rem,3vw,2.6rem); border-right:1px solid var(--line); background:rgba(255,250,240,.20); transition:transform .28s ease,background .28s ease; }
        .guiropa-support-option:last-child { border-right:0; }
        .guiropa-support-option:hover { transform:translateY(-4px); background:rgba(255,248,232,.38); }
        .guiropa-support-option__number { color:var(--gold-dark); font-size:.64rem; font-weight:900; letter-spacing:.15em; }
        .guiropa-support-option__tag { margin-top:2rem; color:var(--red); font-size:.58rem; font-weight:900; letter-spacing:.14em; text-transform:uppercase; }
        .guiropa-support-option h3 { margin:.9rem 0 0; font-size:clamp(2.5rem,4.5vw,4rem); line-height:1; }
        .guiropa-support-option p { max-width:470px; margin:1rem 0 0; color:var(--soft); font-size:.9rem; line-height:1.65; }
        .guiropa-support-option__action { min-height:50px; display:inline-flex; align-items:center; justify-content:space-between; gap:1.2rem; margin-top:auto; padding:0 16px; border:1px solid var(--ink); background:var(--ink); color:#fff8ed; font-size:.63rem; font-weight:900; letter-spacing:.08em; text-decoration:none; text-transform:uppercase; transition:background .2s ease,border-color .2s ease; }
        .guiropa-support-option__action:hover { border-color:var(--red); background:var(--red); }
        .guiropa-support-option__action strong { color:var(--gold-light); font-size:.95rem; }
        .guiropa-support-note { display:grid; grid-template-columns:minmax(0,1fr) minmax(260px,420px); gap:clamp(3rem,7vw,6rem); align-items:center; padding:clamp(3rem,5vw,4rem) 0; border-bottom:1px solid var(--line); }
        .guiropa-support-note h3 { margin:.8rem 0 0; font-size:clamp(2rem,3.7vw,3.5rem); line-height:1; }
        .guiropa-support-note p { margin:0; color:var(--soft); font-size:.92rem; line-height:1.7; }
        .guiropa-support-operator { margin-top:1rem; color:rgba(110,95,77,.58); font-size:.56rem; font-weight:700; letter-spacing:.08em; text-align:right; }
        .guiropa-support-final { padding:clamp(5rem,8vw,7rem) 0; background:linear-gradient(180deg,#17130f,#0e0c0a); color:#f0dfbd; }
        .guiropa-support-final__grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(200px,290px); gap:clamp(3rem,7vw,6rem); align-items:center; }
        .guiropa-support-final h2 { margin:.8rem 0 0; max-width:780px; font-size:clamp(2.8rem,5.8vw,5.4rem); line-height:.98; }
        .guiropa-support-final p { max-width:680px; margin:1.3rem 0 0; color:#a99575; font-size:1rem; line-height:1.7; }
        .guiropa-support-final img { margin-left:auto; box-shadow:0 20px 44px rgba(0,0,0,.32); }
        .guiropa-support-final__operator { margin-top:1.4rem; color:rgba(224,187,112,.48); font-size:.52rem; font-weight:700; letter-spacing:.08em; }
        @media(max-width:900px){
          .guiropa-support-hero__grid,
          .guiropa-support-intro__grid,
          .guiropa-support-note,
          .guiropa-support-final__grid{grid-template-columns:1fr;}
          .guiropa-support-emblem{justify-content:flex-start;}
          .guiropa-support-final img{margin-left:0;}
          .guiropa-support-options__grid{grid-template-columns:1fr;}
          .guiropa-support-option{border-right:0;border-bottom:1px solid var(--line);}
          .guiropa-support-option:last-child{border-bottom:0;}
          .guiropa-support-operator{text-align:left;}
        }
        @media(max-width:600px){
          .guiropa-support-shell{width:min(100% - 24px,650px);}
          .guiropa-support-hero{padding-top:4rem;}
          .guiropa-support-hero h1{font-size:clamp(3.8rem,18vw,6.5rem);}
          .guiropa-support-options__head{display:block;}
        }
      `}</style>

      <section className="guiropa-support-hero">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-hero__grid">
            <div>
              <span className="guiropa-support-eyebrow">{copy.eyebrow}</span>
              <h1>{copy.title}</h1>
              <p className="guiropa-support-hero__lead">{copy.lead}</p>
            </div>
            <div className="guiropa-support-emblem" aria-hidden="true">
              <img src={GUIROPA_EMBLEM_SRC} alt="" loading="eager" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="guiropa-support-intro">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-intro__grid">
            <div>
              <span className="guiropa-support-eyebrow">{copy.introEyebrow}</span>
              <h2>{copy.introTitle}</h2>
            </div>
            <p>{copy.introLead}</p>
          </div>
        </div>
      </section>

      <section className="guiropa-support-options">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-options__head">
            <h2>{copy.optionsTitle}</h2>
            <span className="guiropa-support-eyebrow">{copy.optionsEyebrow}</span>
          </div>

          <div className="guiropa-support-options__grid">
            <article className="guiropa-support-option">
              <span className="guiropa-support-option__number">{copy.asaasNumber}</span>
              <span className="guiropa-support-option__tag">{copy.asaasTag}</span>
              <h3>{copy.asaasTitle}</h3>
              <p>{copy.asaasText}</p>
              <a className="guiropa-support-option__action" href={ASAAS_URL} target="_blank" rel="noopener noreferrer">
                <span>{copy.asaasAction}</span>
                <strong aria-hidden="true">↗</strong>
              </a>
            </article>

            <article className="guiropa-support-option">
              <span className="guiropa-support-option__number">{copy.paypalNumber}</span>
              <span className="guiropa-support-option__tag">{copy.paypalTag}</span>
              <h3>{copy.paypalTitle}</h3>
              <p>{copy.paypalText}</p>
              <a className="guiropa-support-option__action" href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                <span>{copy.paypalAction}</span>
                <strong aria-hidden="true">↗</strong>
              </a>
            </article>
          </div>

          <div className="guiropa-support-note">
            <div>
              <span className="guiropa-support-eyebrow">{copy.noteEyebrow}</span>
              <h3>{copy.noteTitle}</h3>
            </div>
            <p>{copy.noteText}</p>
          </div>

          <div className="guiropa-support-operator">{copy.operator}</div>
        </div>
      </section>

      <section className="guiropa-support-final">
        <div className="guiropa-support-shell">
          <div className="guiropa-support-final__grid">
            <div>
              <span className="guiropa-support-eyebrow">{copy.finalEyebrow}</span>
              <h2>{copy.finalTitle}</h2>
              <p>{copy.finalLead}</p>
              <div className="guiropa-support-final__operator">{copy.operator}</div>
            </div>
            <img src={GUIROPA_EMBLEM_SRC} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </main>
  );
}
