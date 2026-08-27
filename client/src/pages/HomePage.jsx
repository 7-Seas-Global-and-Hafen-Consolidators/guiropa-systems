import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ExploreHub from "../components/ExploreHub.jsx";
import HomeLiveAgenda from "../components/HomeLiveAgenda.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { assetUrl } from "../utils/assetUrl.js";
import marvinPortrait from "../assets/marvin.gaye.webp";

const ADVERTISING_ART = assetUrl("assets/guiropa-radio-anuncie-vintage-15-dias.png");

const COPY={
  pt:{marvinTitle:"MARVIN GAYE",marvinLead:"A voz que decidiu não ficar calada.",marvinAction:"LER A HISTÓRIA",ad:"PUBLICIDADE · GUIROPA RADIO",adAction:"ANUNCIE NA GUIROPA",support:"APOIE A GUIROPA",supportTitle:"R$ 1 já ajuda a manter a GUIROPA no ar.",supportLead:"Você ouve, lê, entra nos túneis e usa a GUIROPA. Se puder, ajuda a manter tudo funcionando.",supportAction:"APOIAR AGORA →"},
  en:{marvinTitle:"MARVIN GAYE",marvinLead:"The voice that chose not to stay quiet.",marvinAction:"READ THE STORY",ad:"ADVERTISING · GUIROPA RADIO",adAction:"ADVERTISE ON GUIROPA",support:"SUPPORT GUIROPA",supportTitle:"Even a small contribution helps keep GUIROPA on air.",supportLead:"If you listen, read and use the tunnels, you can help keep everything running.",supportAction:"SUPPORT NOW →"},
  es:{marvinTitle:"MARVIN GAYE",marvinLead:"La voz que decidió no quedarse callada.",marvinAction:"LEER LA HISTORIA",ad:"PUBLICIDAD · GUIROPA RADIO",adAction:"ANÚNCIATE EN GUIROPA",support:"APOYA A GUIROPA",supportTitle:"Incluso una pequeña contribución ayuda a mantener GUIROPA al aire.",supportLead:"Si escuchas, lees y usas los túneles, puedes ayudar a mantener todo funcionando.",supportAction:"APOYAR AHORA →"},
};

export default function HomePage(){
  const {lang}=useLanguage();
  const copy=COPY[lang]||COPY.pt;
  return <main className="guiropa-radio-home guiropa-home-portal">
    <style>{`
      .guiropa-home-portal{background:#f4ead7;color:#211a15}.guiropa-home-portal__ad{padding:clamp(2.2rem,4vw,3.5rem) 0;background:#efe0c4;border-block:1px solid rgba(78,57,38,.15)}.guiropa-home-portal__shell{width:min(1180px,calc(100% - 40px));margin:0 auto}.guiropa-home-portal__ad-frame{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;padding:14px;border:1px solid rgba(69,48,30,.22);border-radius:16px;background:#f7ecd9}.guiropa-home-portal__ad img{display:block;width:100%;max-height:220px;object-fit:contain;border-radius:10px}.guiropa-home-portal__ad-copy{min-width:170px}.guiropa-home-portal__ad-copy span{display:block;color:#8d6b3d;font-size:.56rem;font-weight:900;letter-spacing:.17em}.guiropa-home-portal__button{display:inline-flex;align-items:center;min-height:42px;margin-top:.8rem;padding:0 14px;border:1px solid #211a15;background:#211a15;color:#fff4df;text-decoration:none;font-size:.58rem;font-weight:900;letter-spacing:.1em}.guiropa-home-feature{padding:clamp(3.5rem,6vw,5rem) 0;background:#f7eedf}.guiropa-home-feature__grid{display:grid;grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr);gap:clamp(2rem,5vw,4rem);align-items:center}.guiropa-home-feature img{display:block;width:100%;max-height:390px;object-fit:cover;object-position:center;border-radius:18px;filter:grayscale(1)}.guiropa-home-feature__eyebrow{color:#b83224;font-size:.6rem;font-weight:900;letter-spacing:.2em}.guiropa-home-feature h2{margin:.7rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:400;line-height:.9;letter-spacing:-.055em}.guiropa-home-feature p{max-width:620px;color:#766654;font-size:clamp(1.1rem,2vw,1.6rem);line-height:1.4}.guiropa-home-support{padding:clamp(3.5rem,6vw,5rem) 0;background:#17120e;color:#f5ead6;border-top:1px solid #332419}.guiropa-home-support__grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end}.guiropa-home-support__eyebrow{color:#d9b467;font-size:.62rem;font-weight:900;letter-spacing:.19em}.guiropa-home-support h2{max-width:800px;margin:.8rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.5rem,5vw,4.8rem);font-weight:400;line-height:.95;letter-spacing:-.05em}.guiropa-home-support p{max-width:720px;color:#aa9984;line-height:1.7}.guiropa-home-support a{display:inline-flex;min-height:48px;align-items:center;padding:0 18px;background:#b83224;color:#fff5e7;text-decoration:none;font-size:.62rem;font-weight:900;letter-spacing:.11em;white-space:nowrap}@media(max-width:760px){.guiropa-home-portal__shell{width:min(100% - 24px,650px)}.guiropa-home-portal__ad-frame,.guiropa-home-feature__grid,.guiropa-home-support__grid{grid-template-columns:1fr}.guiropa-home-portal__ad-copy{min-width:0}.guiropa-home-feature img{max-height:320px}.guiropa-home-support a{justify-self:start}}
    `}</style>
    <Hero />
    <ExploreHub />
    <HomeLiveAgenda />

    <section className="guiropa-home-portal__ad" aria-label={copy.ad}>
      <div className="guiropa-home-portal__shell">
        <div className="guiropa-home-portal__ad-frame">
          <img src={ADVERTISING_ART} alt={copy.ad} loading="lazy" decoding="async" />
          <div className="guiropa-home-portal__ad-copy"><span>{copy.ad}</span><Link className="guiropa-home-portal__button" to="/anuncie">{copy.adAction}</Link></div>
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
