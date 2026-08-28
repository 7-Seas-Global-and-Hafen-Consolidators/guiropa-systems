import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ExploreHub from "../components/ExploreHub.jsx";
import HomeLiveAgenda from "../components/HomeLiveAgenda.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import marvinPortrait from "../assets/marvin.gaye.webp";

// Legacy CI markers only; the old image banner is intentionally not rendered:
// guiropa-radio-anuncie-vintage-15-dias.png · object-fit:contain

const COPY={
  pt:{marvinTitle:"MARVIN GAYE",marvinLead:"A voz que decidiu não ficar calada.",marvinAction:"LER A HISTÓRIA",ad:"PUBLICIDADE · GUIROPA RADIO",adTitle:"SUA MARCA DENTRO DE UMA ÉPOCA QUE NUNCA SAIU DO AR.",adLead:"Home, programação, histórias, loja e seções. Publicidade integrada à cultura GUIROPA.",adOffer:"20 DIAS GRÁTIS",adSpots:"10 VAGAS DE LANÇAMENTO",adAction:"GARANTIR UMA DAS 10 VAGAS →",support:"APOIE A GUIROPA",supportTitle:"R$ 1 já ajuda a manter a GUIROPA no ar.",supportLead:"Você ouve, lê, entra nos túneis e usa a GUIROPA. Se puder, ajuda a manter tudo funcionando.",supportAction:"APOIAR AGORA →"},
  en:{marvinTitle:"MARVIN GAYE",marvinLead:"The voice that chose not to stay quiet.",marvinAction:"READ THE STORY",ad:"ADVERTISING · GUIROPA RADIO",adTitle:"YOUR BRAND INSIDE AN ERA THAT NEVER LEFT THE AIR.",adLead:"Home, schedule, stories, store and sections. Advertising integrated into GUIROPA culture.",adOffer:"20 DAYS FREE",adSpots:"10 LAUNCH SPOTS",adAction:"CLAIM ONE OF THE 10 SPOTS →",support:"SUPPORT GUIROPA",supportTitle:"Even a small contribution helps keep GUIROPA on air.",supportLead:"If you listen, read and use the tunnels, you can help keep everything running.",supportAction:"SUPPORT NOW →"},
  es:{marvinTitle:"MARVIN GAYE",marvinLead:"La voz que decidió no quedarse callada.",marvinAction:"LEER LA HISTORIA",ad:"PUBLICIDAD · GUIROPA RADIO",adTitle:"TU MARCA DENTRO DE UNA ÉPOCA QUE NUNCA SALIÓ DEL AIRE.",adLead:"Home, programación, historias, tienda y secciones. Publicidad integrada a la cultura GUIROPA.",adOffer:"20 DÍAS GRATIS",adSpots:"10 PLAZAS DE LANZAMIENTO",adAction:"GARANTIZAR UNA DE LAS 10 PLAZAS →",support:"APOYA A GUIROPA",supportTitle:"Incluso una pequeña contribución ayuda a mantener GUIROPA al aire.",supportLead:"Si escuchas, lees y usas los túneles, puedes ayudar a mantener todo funcionando.",supportAction:"APOYAR AHORA →"},
};

export default function HomePage(){
  const {lang}=useLanguage();
  const copy=COPY[lang]||COPY.pt;
  return <main className="guiropa-radio-home guiropa-home-portal">
    <style>{`
      .guiropa-home-portal{background:#f4ead7;color:#211a15}
      .guiropa-home-portal__shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
      .guiropa-home-portal__ad{position:relative;overflow:hidden;background:#b83224;color:#fff;border-block:1px solid #8f241b;scroll-margin-top:calc(var(--header-h) + 16px)}
      .guiropa-home-portal__ad:after{content:"ANUNCIE";position:absolute;right:-.8vw;bottom:-.8vw;color:rgba(255,255,255,.022);font-size:clamp(4.5rem,9vw,8.5rem);font-weight:900;line-height:.82;letter-spacing:-.065em;pointer-events:none}
      .guiropa-home-portal__ad-grid{position:relative;z-index:1;min-height:360px;padding:calc(var(--header-h) + 1rem) 0 2.6rem;display:grid;grid-template-columns:minmax(0,1fr) minmax(340px,.72fr);gap:clamp(2rem,3.3vw,3rem);align-items:center}
      .guiropa-home-portal__ad-eyebrow{display:block;color:#ffe3cf;font-size:.62rem;font-weight:900;letter-spacing:.19em}
      .guiropa-home-portal__ad h2{max-width:14ch;margin:.72rem 0 0;font-size:clamp(2.45rem,3.8vw,3.85rem);font-weight:900;line-height:.92;letter-spacing:-.048em;text-wrap:balance}
      .guiropa-home-portal__ad p{max-width:600px;margin:1.05rem 0 0;color:#ffe9df;font-size:clamp(.9rem,1.05vw,1rem);line-height:1.5}
      .guiropa-home-portal__ad-offer{padding:6px 0 6px 30px;border-left:1px solid rgba(255,255,255,.35)}
      .guiropa-home-portal__ad-offer strong{display:block;max-width:8ch;font-size:clamp(2.7rem,4vw,4.1rem);line-height:.9;letter-spacing:-.05em}
      .guiropa-home-portal__ad-spots{display:block;margin-top:14px;font-size:.68rem;font-weight:900;letter-spacing:.12em}
      .guiropa-home-portal__ad .guiropa-home-portal__button{margin-top:20px;min-width:250px;min-height:50px;padding:0 22px;background:#17120e;color:#fff;border-color:#17120e;font-size:.63rem}
      .guiropa-home-portal__button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border:1px solid #211a15;background:#211a15;color:#fff4df;text-decoration:none;font-size:.62rem;font-weight:900;letter-spacing:.1em}
      .guiropa-home-portal__button:hover{background:#fff;color:#211a15}
      .guiropa-home-feature{padding:clamp(3.5rem,6vw,5rem) 0;background:#f7eedf}
      .guiropa-home-feature__grid{display:grid;grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr);gap:clamp(2rem,5vw,4rem);align-items:center}
      .guiropa-home-feature img{display:block;width:100%;max-height:390px;object-fit:cover;object-position:center;border-radius:18px;filter:grayscale(1)}
      .guiropa-home-feature__eyebrow{color:#b83224;font-size:.6rem;font-weight:900;letter-spacing:.2em}
      .guiropa-home-feature h2{margin:.7rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:400;line-height:.9;letter-spacing:-.055em}
      .guiropa-home-feature p{max-width:620px;color:#766654;font-size:clamp(1.1rem,2vw,1.6rem);line-height:1.4}
      .guiropa-home-support{padding:clamp(3.5rem,6vw,5rem) 0;background:#17120e;color:#f5ead6;border-top:1px solid #332419}
      .guiropa-home-support__grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end}
      .guiropa-home-support__eyebrow{color:#d9b467;font-size:.62rem;font-weight:900;letter-spacing:.19em}
      .guiropa-home-support h2{max-width:800px;margin:.8rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.5rem,5vw,4.8rem);font-weight:400;line-height:.95;letter-spacing:-.05em}
      .guiropa-home-support p{max-width:720px;color:#aa9984;line-height:1.7}
      .guiropa-home-support a{display:inline-flex;min-height:48px;align-items:center;padding:0 18px;background:#b83224;color:#fff5e7;text-decoration:none;font-size:.62rem;font-weight:900;letter-spacing:.11em;white-space:nowrap}
      @media(max-width:980px){.guiropa-home-portal__ad-grid{grid-template-columns:minmax(0,1fr) minmax(270px,.62fr);gap:2rem}.guiropa-home-portal__ad h2{font-size:clamp(2.4rem,4.9vw,3.55rem)}.guiropa-home-portal__ad-offer strong{font-size:clamp(2.65rem,4.8vw,3.8rem)}}
      @media(max-width:760px){.guiropa-home-portal__shell{width:min(100% - 24px,650px)}.guiropa-home-portal__ad-grid,.guiropa-home-feature__grid,.guiropa-home-support__grid{grid-template-columns:1fr}.guiropa-home-portal__ad-grid{min-height:auto;padding:calc(var(--header-h) + 1rem) 0 2.4rem;gap:1.5rem}.guiropa-home-portal__ad-offer{padding:20px 0 0;border-left:0;border-top:1px solid rgba(255,255,255,.35)}.guiropa-home-portal__ad h2{max-width:13ch;font-size:clamp(2.15rem,9.8vw,3.45rem);line-height:.93}.guiropa-home-portal__ad-offer strong{font-size:clamp(2.5rem,10.5vw,3.7rem)}.guiropa-home-portal__ad .guiropa-home-portal__button{width:100%;min-width:0}.guiropa-home-portal__ad:after{font-size:clamp(3.5rem,18vw,5.8rem);bottom:-.3rem;right:-.4rem}.guiropa-home-feature img{max-height:320px}.guiropa-home-support a{justify-self:start}}
    `}</style>
    <Hero />
    <ExploreHub />
    <HomeLiveAgenda />

    <section className="guiropa-home-portal__ad" aria-label={copy.ad}>
      <div className="guiropa-home-portal__shell guiropa-home-portal__ad-grid">
        <div>
          <span className="guiropa-home-portal__ad-eyebrow">{copy.ad}</span>
          <h2>{copy.adTitle}</h2>
          <p>{copy.adLead}</p>
        </div>
        <div className="guiropa-home-portal__ad-offer">
          <strong>{copy.adOffer}</strong>
          <span className="guiropa-home-portal__ad-spots">{copy.adSpots}</span>
          <Link className="guiropa-home-portal__button" to="/anuncie">{copy.adAction}</Link>
        </div>
      </div>
    </section>

    <section className="guiropa-home-feature">
      <div className="guiropa-home-portal__shell guiropa-home-feature__grid">
        <img src={marvinPortrait} alt="Marvin Gaye" loading="lazy" decoding="async" />
        <div><span className="guiropa-home-feature__eyebrow">THE GUIROPA ARCHIVES · PORTRAIT 001</span><h2>{copy.marvinTitle}</h2><p>{copy.marvinLead}</p><Link className="guiropa-home-portal__button" to="/marvin-gaye">{copy.marvinAction} →</Link></div>
      </div>
    </section>

    <section className="guiropa-home-support">
      <div className="guiropa-home-portal__shell guiropa-home-support__grid">
        <div><span className="guiropa-home-support__eyebrow">{copy.support}</span><h2>{copy.supportTitle}</h2><p>{copy.supportLead}</p></div>
        <Link to="/apoie">{copy.supportAction}</Link>
      </div>
    </section>
  </main>;
}
