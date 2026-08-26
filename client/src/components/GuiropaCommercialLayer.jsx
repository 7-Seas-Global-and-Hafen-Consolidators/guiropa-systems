import { useEffect } from "react";
import { Link } from "react-router-dom";

const AMAZON_MAIN = "https://www.amazon.com.br/b?node=104007590011&linkCode=ll2&tag=passportradio-20&linkId=edae5781198a3cecf47411d190e375a1&ref_=as_li_ss_tl";
const AMAZON_ALT = "https://amzn.to/4xnpFWZ";
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
    if (document.querySelector(`script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = ADSENSE;
    script.crossOrigin = "anonymous";
    script.dataset.guiropaAdsense = "1";
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <style>{`
        .guiropa-commercial-top,.guiropa-commercial-marquee,.guiropa-commercial-side{box-sizing:border-box;font-family:Inter,Arial,Helvetica,sans-serif}.guiropa-commercial-top *,.guiropa-commercial-marquee *,.guiropa-commercial-side *{box-sizing:border-box}.guiropa-commercial-top{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(360px,.9fr);width:100%;border-top:3px solid #17120e;border-bottom:3px solid #17120e;background:#17120e;position:relative;z-index:70}.guiropa-commercial-link{--gc-bg:#17120e;--gc-fg:#fff7e8;--gc-accent:#c73c2f;position:relative;overflow:hidden;background:var(--gc-bg);color:var(--gc-fg)!important;text-decoration:none!important}.guiropa-commercial-link[data-network="AMAZON"]{--gc-bg:#ff9900;--gc-fg:#17120e;--gc-accent:#17120e}.guiropa-commercial-link[data-network="SHOPEE"]{--gc-bg:#ee4d2d;--gc-fg:#fff;--gc-accent:#fff}.guiropa-commercial-link[data-network="GUIROPA"]{--gc-bg:#b83224;--gc-fg:#fff7e8;--gc-accent:#e7bc61}.guiropa-commercial-link::after{content:"";position:absolute;inset:0;border:3px solid transparent;pointer-events:none;animation:guiropaCommercialAlarm 1.15s steps(1,end) infinite}.guiropa-commercial-link small::before{content:"●";margin-right:7px;color:#b83224;text-shadow:0 0 10px currentColor;animation:guiropaCommercialDot .78s steps(1,end) infinite}.guiropa-commercial-link[data-network="SHOPEE"] small::before,.guiropa-commercial-link[data-network="GUIROPA"] small::before{color:#fff}.guiropa-commercial-link span{animation:guiropaCommercialCta .95s steps(1,end) infinite}.guiropa-commercial-top__main{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;min-height:76px;padding:12px max(18px,calc((100vw - 1180px)/2));padding-right:22px}.guiropa-commercial-top__mini{display:grid;grid-template-columns:1fr 1fr;background:#17120e}.guiropa-commercial-mini{display:grid;align-content:center;gap:5px;min-height:76px;padding:12px 16px;border-left:1px solid rgba(255,255,255,.18)}.guiropa-commercial-top small,.guiropa-commercial-side small{font-size:8px;font-weight:1000;letter-spacing:.16em;text-transform:uppercase}.guiropa-commercial-top strong{font-size:clamp(1rem,2vw,1.55rem);font-weight:1000;letter-spacing:-.04em}.guiropa-commercial-top span{font-size:9px;font-weight:1000;letter-spacing:.11em;text-transform:uppercase}.guiropa-commercial-top__advertise{display:grid;align-content:center;gap:5px;min-height:76px;padding:12px 16px;color:#fff7e8!important;text-decoration:none!important;background:#b83224;position:relative;overflow:hidden}.guiropa-commercial-top__advertise::after{content:"";position:absolute;inset:0;border:3px solid transparent;animation:guiropaCommercialAlarm 1.15s steps(1,end) infinite}.guiropa-commercial-top__advertise small{font-size:8px;font-weight:1000;letter-spacing:.16em}.guiropa-commercial-top__advertise strong{font-size:clamp(.9rem,1.3vw,1.15rem)}.guiropa-commercial-top__advertise span{font-size:9px;font-weight:1000;letter-spacing:.11em}.guiropa-commercial-marquee{width:100%;overflow:hidden;border-bottom:2px solid #17120e;background:#17120e;color:#fff7e8;min-height:31px;display:flex;align-items:center;position:relative;z-index:69}.guiropa-commercial-marquee__track{display:flex;width:max-content;min-width:200%;white-space:nowrap;animation:guiropaCommercialMarquee 8s linear infinite}.guiropa-commercial-marquee__track span{display:inline-block;min-width:50%;padding:7px 26px;font-size:10px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}.guiropa-commercial-side{display:none;position:fixed;top:34vh;z-index:94;width:48px}.guiropa-commercial-side--left{left:0}.guiropa-commercial-side--right{right:0}.guiropa-commercial-side a{display:flex;min-height:220px;align-items:center;justify-content:center;border:3px solid #17120e;writing-mode:vertical-rl;text-orientation:mixed;padding:10px 8px;font-size:10px;font-weight:1000;letter-spacing:.13em;text-transform:uppercase}.guiropa-commercial-side--left a{transform:rotate(180deg)}
        @keyframes guiropaCommercialAlarm{0%,43%,100%{border-color:transparent;box-shadow:inset 0 0 0 rgba(255,255,255,0)}44%,72%{border-color:var(--gc-accent,#e7bc61);box-shadow:inset 0 0 20px rgba(255,255,255,.38)}}@keyframes guiropaCommercialDot{0%,44%,100%{opacity:1}45%,72%{opacity:.08}}@keyframes guiropaCommercialCta{0%,48%,100%{opacity:1}49%,73%{opacity:.25}}@keyframes guiropaCommercialMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(min-width:1320px){.guiropa-commercial-side{display:block}}@media(max-width:840px){.guiropa-commercial-top{grid-template-columns:1fr}.guiropa-commercial-top__main{grid-template-columns:1fr auto;min-height:64px;padding:10px 14px}.guiropa-commercial-top__main small{grid-column:1/-1}.guiropa-commercial-top__mini{grid-template-columns:1fr 1fr}.guiropa-commercial-mini,.guiropa-commercial-top__advertise{min-height:58px;padding:9px 11px}.guiropa-commercial-mini strong,.guiropa-commercial-top__advertise strong{font-size:11px}.guiropa-commercial-marquee__track{animation-duration:6s}}@media(prefers-reduced-motion:reduce){.guiropa-commercial-link::after,.guiropa-commercial-link small::before,.guiropa-commercial-link span,.guiropa-commercial-top__advertise::after,.guiropa-commercial-marquee__track{animation:none!important}}@media print{.guiropa-commercial-top,.guiropa-commercial-marquee,.guiropa-commercial-side{display:none!important}}
      `}</style>

      <aside className="guiropa-commercial-top" aria-label="Publicidade">
        <ExternalAd
          href={AMAZON_MAIN}
          network="AMAZON"
          eyebrow="PUBLICIDADE · AMAZON"
          title="Música, vinil, áudio e cultura pop"
          cta="VER SELEÇÃO →"
          className="guiropa-commercial-top__main"
        />
        <div className="guiropa-commercial-top__mini">
          <ExternalAd
            href={SHOPEE}
            network="SHOPEE"
            eyebrow="PUBLICIDADE · SHOPEE"
            title="Ofertas em movimento"
            cta="VER →"
            className="guiropa-commercial-mini"
          />
          <Link className="guiropa-commercial-top__advertise" to="/anuncie">
            <small>PUBLICIDADE · GUIROPA</small>
            <strong>Seu negócio aqui</strong>
            <span>ANUNCIAR →</span>
          </Link>
        </div>
      </aside>

      <div className="guiropa-commercial-marquee" aria-hidden="true">
        <div className="guiropa-commercial-marquee__track">
          <span>PUBLICIDADE · AMAZON · SHOPEE · ANUNCIE NA GUIROPA · WORLD WIRE 24H · 1950 · 1960 · 1970 · 1980 · PUBLICIDADE · AMAZON · SHOPEE ·</span>
          <span>PUBLICIDADE · AMAZON · SHOPEE · ANUNCIE NA GUIROPA · WORLD WIRE 24H · 1950 · 1960 · 1970 · 1980 · PUBLICIDADE · AMAZON · SHOPEE ·</span>
        </div>
      </div>

      <aside className="guiropa-commercial-side guiropa-commercial-side--left" aria-label="Oferta Amazon">
        <ExternalAd href={AMAZON_ALT} network="AMAZON" eyebrow="PUBLICIDADE" title="AMAZON" cta="OFERTA →" />
      </aside>
      <aside className="guiropa-commercial-side guiropa-commercial-side--right" aria-label="Publicidade GUIROPA">
        <Link className="guiropa-commercial-link" data-network="GUIROPA" to="/anuncie">
          <small>PUBLICIDADE</small>
          <strong>ANUNCIE</strong>
          <span>GUIROPA →</span>
        </Link>
      </aside>
    </>
  );
}
