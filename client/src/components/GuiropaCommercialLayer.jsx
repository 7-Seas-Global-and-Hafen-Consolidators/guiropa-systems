import { useEffect } from "react";
import { Link } from "react-router-dom";

const AMAZON_MAIN = "https://www.amazon.com.br/b?node=104007590011&linkCode=ll2&tag=passportradio-20&linkId=edae5781198a3cecf47411d190e375a1&ref_=as_li_ss_tl";
const SHOPEE = "https://s.shopee.com.br/3qMaqyNivG";
const ADSENSE = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5489546241643636";

function ExternalAd({ href, network, eyebrow, title, cta, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`guiropa-commercial-link ${className}`.trim()}
      data-network={network}
    >
      <small>{eyebrow}</small>
      <strong>{title}</strong>
      <span>{cta}</span>
    </a>
  );
}

export default function GuiropaCommercialLayer() {
  useEffect(() => {
    if (document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = ADSENSE;
    script.crossOrigin = "anonymous";
    script.dataset.guiropaAdsense = "1";
    document.head.appendChild(script);
  }, []);

  return (
    <section className="guiropa-commercial-head" aria-label="Publicidade">
      <style>{`
        .guiropa-commercial-top-zone{padding-top:var(--header-h);position:relative;z-index:30;background:#17120e}.guiropa-commercial-head{box-sizing:border-box;width:100%;font-family:Inter,Arial,Helvetica,sans-serif;background:#17120e;border-bottom:2px solid #17120e}.guiropa-commercial-head *{box-sizing:border-box}.guiropa-commercial-head__rail{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(220px,.72fr) minmax(220px,.72fr);gap:2px;background:#17120e}.guiropa-commercial-link,.guiropa-commercial-head__house{min-height:76px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;padding:12px clamp(14px,2vw,24px);text-decoration:none!important;overflow:hidden}.guiropa-commercial-link[data-network="AMAZON"]{background:#ff9900;color:#17120e!important}.guiropa-commercial-link[data-network="SHOPEE"]{background:#ee4d2d;color:#fff!important}.guiropa-commercial-head__house{background:#b83224;color:#fff7e8!important}.guiropa-commercial-head small{font-size:8px;font-weight:1000;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}.guiropa-commercial-head strong{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1rem,1.8vw,1.45rem);font-weight:400;line-height:1.05}.guiropa-commercial-head span{font-size:8px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}.guiropa-commercial-head__ticker{display:flex;align-items:center;min-height:30px;overflow:hidden;background:#090706;color:#fff4df;border-top:2px solid #17120e}.guiropa-commercial-head__ticker-track{display:flex;width:max-content;min-width:200%;white-space:nowrap;animation:guiropaHeadTicker 14s linear infinite}.guiropa-commercial-head__ticker-track span{display:block;min-width:50%;padding:6px 24px;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}@keyframes guiropaHeadTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:900px){.guiropa-commercial-head__rail{grid-template-columns:1fr 1fr}.guiropa-commercial-link[data-network="AMAZON"]{grid-column:1/-1}.guiropa-commercial-link,.guiropa-commercial-head__house{min-height:64px;grid-template-columns:1fr auto;gap:8px}.guiropa-commercial-head small{grid-column:1/-1}.guiropa-commercial-head strong{font-size:1rem}}@media(max-width:560px){.guiropa-commercial-head__rail{grid-template-columns:1fr}.guiropa-commercial-link[data-network="AMAZON"]{grid-column:auto}.guiropa-commercial-link,.guiropa-commercial-head__house{min-height:58px;padding:10px 12px}.guiropa-commercial-head__ticker-track{animation-duration:11s}}@media(prefers-reduced-motion:reduce){.guiropa-commercial-head__ticker-track{animation:none!important}}@media print{.guiropa-commercial-top-zone{padding-top:0}.guiropa-commercial-head{display:none!important}}
      `}</style>

      <div className="guiropa-commercial-head__rail">
        <ExternalAd
          href={AMAZON_MAIN}
          network="AMAZON"
          eyebrow="PUBLICIDADE · AMAZON"
          title="Música, vinil, áudio e cultura pop"
          cta="VER SELEÇÃO →"
        />
        <ExternalAd
          href={SHOPEE}
          network="SHOPEE"
          eyebrow="PUBLICIDADE · SHOPEE"
          title="Achados do dia"
          cta="VER →"
        />
        <Link className="guiropa-commercial-head__house" to="/anuncie">
          <small>PUBLICIDADE · GUIROPA</small>
          <strong>Seu negócio aqui</strong>
          <span>ANUNCIAR →</span>
        </Link>
      </div>

      <div className="guiropa-commercial-head__ticker" aria-hidden="true">
        <div className="guiropa-commercial-head__ticker-track">
          <span>PUBLICIDADE · AMAZON · SHOPEE · ANUNCIE NA GUIROPA · WORLD WIRE 24H · 1950 · 1960 · 1970 · 1980 ·</span>
          <span>PUBLICIDADE · AMAZON · SHOPEE · ANUNCIE NA GUIROPA · WORLD WIRE 24H · 1950 · 1960 · 1970 · 1980 ·</span>
        </div>
      </div>
    </section>
  );
}
