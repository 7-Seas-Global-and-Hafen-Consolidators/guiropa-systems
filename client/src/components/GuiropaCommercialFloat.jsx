import { Link } from "react-router-dom";

const AMAZON = "https://amzn.to/4xnpFWZ";
const SHOPEE = "https://s.shopee.com.br/3qMaqyNivG";

export default function GuiropaCommercialFloat() {
  return (
    <aside className="guiropa-commercial-float" aria-label="Publicidade">
      <style>{`
        .guiropa-commercial-float{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:120;display:grid;grid-template-columns:1fr 1fr 1fr;width:min(760px,calc(100% - 24px));border:3px solid #15110e;background:#15110e;box-shadow:0 12px 34px rgba(0,0,0,.35);font-family:Inter,Arial,Helvetica,sans-serif}.guiropa-commercial-float a{--bg:#15110e;--fg:#fff6e6;--accent:#e8bd63;position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:center;min-height:58px;padding:9px 12px;background:var(--bg);color:var(--fg)!important;text-decoration:none!important;border-right:1px solid rgba(255,255,255,.22)}.guiropa-commercial-float a:last-child{border-right:0}.guiropa-commercial-float a[data-network="AMAZON"]{--bg:#ff9900;--fg:#17120e;--accent:#17120e}.guiropa-commercial-float a[data-network="SHOPEE"]{--bg:#ee4d2d;--fg:#fff;--accent:#fff}.guiropa-commercial-float a[data-network="GUIROPA"]{--bg:#b83224;--fg:#fff;--accent:#efc66f}.guiropa-commercial-float a::after{content:"";position:absolute;inset:0;border:3px solid transparent;pointer-events:none;animation:guiropaFloatFlash 1s steps(1,end) infinite}.guiropa-commercial-float small{grid-column:1/-1;font-size:7px;font-weight:1000;letter-spacing:.15em;text-transform:uppercase}.guiropa-commercial-float small::before{content:"●";margin-right:6px;animation:guiropaFloatDot .62s steps(1,end) infinite}.guiropa-commercial-float strong{font-size:12px;line-height:1.05}.guiropa-commercial-float span{justify-self:end;font-size:8px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase;animation:guiropaFloatCta .72s steps(1,end) infinite}@keyframes guiropaFloatFlash{0%,43%,100%{border-color:transparent}44%,73%{border-color:var(--accent);box-shadow:inset 0 0 18px rgba(255,255,255,.34)}}@keyframes guiropaFloatDot{0%,44%,100%{opacity:1}45%,72%{opacity:.08}}@keyframes guiropaFloatCta{0%,49%,100%{opacity:1}50%,76%{opacity:.2}}@media(max-width:720px){.guiropa-commercial-float{grid-template-columns:1fr 1fr;bottom:86px}.guiropa-commercial-float a:nth-child(3){display:none}.guiropa-commercial-float a:nth-child(2){border-right:0}.guiropa-commercial-float strong{font-size:10px}.guiropa-commercial-float span{font-size:7px}}@media(prefers-reduced-motion:reduce){.guiropa-commercial-float a::after,.guiropa-commercial-float small::before,.guiropa-commercial-float span{animation:none!important}}@media print{.guiropa-commercial-float{display:none!important}}
      `}</style>
      <a href={AMAZON} target="_blank" rel="nofollow sponsored noopener noreferrer" data-network="AMAZON">
        <small>PUBLICIDADE · AMAZON</small><strong>Oferta do momento</strong><span>ABRIR →</span>
      </a>
      <a href={SHOPEE} target="_blank" rel="nofollow sponsored noopener noreferrer" data-network="SHOPEE">
        <small>PUBLICIDADE · SHOPEE</small><strong>Ofertas em movimento</strong><span>VER →</span>
      </a>
      <Link to="/anuncie" data-network="GUIROPA">
        <small>PUBLICIDADE · GUIROPA</small><strong>Sua marca aqui</strong><span>ANUNCIAR →</span>
      </Link>
    </aside>
  );
}
