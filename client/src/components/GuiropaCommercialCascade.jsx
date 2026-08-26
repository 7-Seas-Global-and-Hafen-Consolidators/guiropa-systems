import { Link } from "react-router-dom";

const AMAZON = "https://amzn.to/4xnpFWZ";
const SHOPEE = "https://s.shopee.com.br/3qMaqyNivG";

export default function GuiropaCommercialCascade() {
  return (
    <section className="guiropa-commercial-cascade" aria-label="Publicidade">
      <style>{`
        .guiropa-commercial-cascade{font-family:Inter,Arial,Helvetica,sans-serif;background:#17120e;border-bottom:4px solid #17120e;overflow:hidden}.guiropa-commercial-cascade__row{display:grid;grid-template-columns:1.15fr .85fr 1fr .9fr;gap:2px;background:#17120e}.guiropa-commercial-cascade a{position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;min-height:48px;padding:8px 12px;text-decoration:none!important;color:#17120e;background:#ff9900}.guiropa-commercial-cascade a:nth-child(2){background:#ee4d2d;color:#fff}.guiropa-commercial-cascade a:nth-child(3){background:#201914;color:#f7e6c5}.guiropa-commercial-cascade a:nth-child(4){background:#b83224;color:#fff3df}.guiropa-commercial-cascade small{font-size:7px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}.guiropa-commercial-cascade strong{font-family:Georgia,"Times New Roman",serif;font-size:clamp(.95rem,1.6vw,1.35rem);font-weight:400;line-height:1}.guiropa-commercial-cascade span{font-size:7px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}.guiropa-commercial-cascade a::after{content:"";position:absolute;inset:0;border:2px solid transparent;animation:guiropaCascadeFlash 1.05s steps(1,end) infinite}.guiropa-commercial-cascade a:nth-child(2)::after{animation-delay:.18s}.guiropa-commercial-cascade a:nth-child(3)::after{animation-delay:.36s}.guiropa-commercial-cascade a:nth-child(4)::after{animation-delay:.54s}.guiropa-commercial-cascade__ticker{display:flex;width:max-content;min-width:200%;white-space:nowrap;color:#fff4df;background:#090706;border-top:2px solid #17120e}.guiropa-commercial-cascade__ticker div{min-width:50%;padding:5px 22px;font-size:8px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase;animation:guiropaCascadeTicker 7s linear infinite}.guiropa-commercial-cascade__ticker div+div{animation:none}@keyframes guiropaCascadeFlash{0%,48%,100%{border-color:transparent;filter:none}49%,73%{border-color:currentColor;filter:brightness(1.22)}}@keyframes guiropaCascadeTicker{from{transform:translateX(0)}to{transform:translateX(-100%)}}@media(max-width:820px){.guiropa-commercial-cascade__row{grid-template-columns:1fr 1fr}.guiropa-commercial-cascade a{min-height:44px;grid-template-columns:1fr auto}.guiropa-commercial-cascade small{grid-column:1/-1}.guiropa-commercial-cascade strong{font-size:.95rem}}@media(max-width:520px){.guiropa-commercial-cascade__row{grid-template-columns:1fr}.guiropa-commercial-cascade a:nth-child(n+3){display:none}}@media(prefers-reduced-motion:reduce){.guiropa-commercial-cascade a::after,.guiropa-commercial-cascade__ticker div{animation:none!important}}@media print{.guiropa-commercial-cascade{display:none!important}}
      `}</style>
      <div className="guiropa-commercial-cascade__row">
        <a href={AMAZON} target="_blank" rel="nofollow sponsored noopener noreferrer"><small>PUBLICIDADE · AMAZON</small><strong>Som, vinil e obsessões.</strong><span>ABRIR →</span></a>
        <a href={SHOPEE} target="_blank" rel="nofollow sponsored noopener noreferrer"><small>PUBLICIDADE · SHOPEE</small><strong>Achados do dia.</strong><span>VER →</span></a>
        <Link to="/anuncie"><small>PUBLICIDADE · GUIROPA</small><strong>Patrocine uma década.</strong><span>ANUNCIAR →</span></Link>
        <Link to="/anuncie"><small>PUBLICIDADE · GUIROPA</small><strong>Compre este espaço.</strong><span>ENTRAR →</span></Link>
      </div>
      <div className="guiropa-commercial-cascade__ticker" aria-hidden="true"><div>1950 · 1960 · 1970 · 1980 · PUBLICIDADE · AMAZON · SHOPEE · PATROCÍNIO · GUIROPA RADIO · WORLD WIRE ·</div><div>1950 · 1960 · 1970 · 1980 · PUBLICIDADE · AMAZON · SHOPEE · PATROCÍNIO · GUIROPA RADIO · WORLD WIRE ·</div></div>
    </section>
  );
}
