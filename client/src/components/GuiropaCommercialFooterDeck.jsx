import { Link } from "react-router-dom";

const AMAZON_MAIN = "https://www.amazon.com.br/b?node=104007590011&linkCode=ll2&tag=passportradio-20&linkId=edae5781198a3cecf47411d190e375a1&ref_=as_li_ss_tl";
const AMAZON_ALT = "https://amzn.to/4gi1vah";
const SHOPEE = "https://s.shopee.com.br/3qMaqyNivG";

export default function GuiropaCommercialFooterDeck() {
  return (
    <section className="guiropa-revenue-deck" aria-label="Publicidade e parceiros">
      <style>{`
        .guiropa-revenue-deck{background:#0f0c0a;color:#fff3dd;border-top:6px solid #b83224;border-bottom:3px solid #0f0c0a;padding:0;font-family:Inter,Arial,Helvetica,sans-serif}.guiropa-revenue-deck__alarm{overflow:hidden;background:#b83224;border-bottom:2px solid #0f0c0a}.guiropa-revenue-deck__track{display:flex;width:max-content;min-width:200%;white-space:nowrap;animation:guiropaRevenueMarquee 6.2s linear infinite}.guiropa-revenue-deck__track span{display:block;min-width:50%;padding:8px 26px;font-size:10px;font-weight:1000;letter-spacing:.16em;text-transform:uppercase}.guiropa-revenue-deck__grid{display:grid;grid-template-columns:1.2fr 1fr 1fr 1.2fr;width:min(1240px,100%);margin:0 auto;border-left:1px solid rgba(255,255,255,.14);border-right:1px solid rgba(255,255,255,.14)}.guiropa-revenue-card{--bg:#17120e;--fg:#fff4df;--accent:#e6bd62;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;gap:18px;min-height:210px;padding:22px;background:var(--bg);color:var(--fg)!important;text-decoration:none!important;border-right:1px solid rgba(255,255,255,.16)}.guiropa-revenue-card:last-child{border-right:0}.guiropa-revenue-card[data-network="AMAZON"]{--bg:#ff9900;--fg:#17120e;--accent:#17120e}.guiropa-revenue-card[data-network="SHOPEE"]{--bg:#ee4d2d;--fg:#fff;--accent:#fff}.guiropa-revenue-card[data-network="GUIROPA"]{--bg:#b83224;--fg:#fff6e5;--accent:#eac675}.guiropa-revenue-card::after{content:"";position:absolute;inset:0;border:5px solid transparent;pointer-events:none;animation:guiropaRevenueFlash 1.05s steps(1,end) infinite}.guiropa-revenue-card small{font-size:8px;font-weight:1000;letter-spacing:.16em;text-transform:uppercase}.guiropa-revenue-card small::before{content:"●";margin-right:8px;animation:guiropaRevenueDot .68s steps(1,end) infinite}.guiropa-revenue-card strong{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.8rem,3vw,3.5rem);font-weight:400;line-height:.9;letter-spacing:-.05em}.guiropa-revenue-card span{font-size:10px;font-weight:1000;letter-spacing:.12em;text-transform:uppercase;animation:guiropaRevenueCta .8s steps(1,end) infinite}.guiropa-revenue-deck__legal{width:min(1240px,calc(100% - 24px));margin:0 auto;padding:10px 0 12px;color:#9c8d7c;font-size:8px;line-height:1.45;letter-spacing:.06em;text-transform:uppercase}
        @keyframes guiropaRevenueMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes guiropaRevenueFlash{0%,42%,100%{border-color:transparent;box-shadow:inset 0 0 0 rgba(255,255,255,0)}43%,72%{border-color:var(--accent);box-shadow:inset 0 0 30px rgba(255,255,255,.32)}}@keyframes guiropaRevenueDot{0%,44%,100%{opacity:1}45%,74%{opacity:.06}}@keyframes guiropaRevenueCta{0%,48%,100%{opacity:1}49%,75%{opacity:.24}}
        @media(max-width:920px){.guiropa-revenue-deck__grid{grid-template-columns:1fr 1fr}.guiropa-revenue-card:nth-child(2){border-right:0}.guiropa-revenue-card:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.16)}}@media(max-width:600px){.guiropa-revenue-deck__grid{grid-template-columns:1fr}.guiropa-revenue-card{min-height:128px;border-right:0;border-bottom:1px solid rgba(255,255,255,.16)}.guiropa-revenue-card:last-child{border-bottom:0}.guiropa-revenue-card strong{font-size:2rem}.guiropa-revenue-deck__track{animation-duration:5s}}@media(prefers-reduced-motion:reduce){.guiropa-revenue-deck__track,.guiropa-revenue-card::after,.guiropa-revenue-card small::before,.guiropa-revenue-card span{animation:none!important}}@media print{.guiropa-revenue-deck{display:none!important}}
      `}</style>

      <div className="guiropa-revenue-deck__alarm" aria-hidden="true">
        <div className="guiropa-revenue-deck__track">
          <span>PUBLICIDADE · APOIE QUEM MANTÉM A MÚSICA NO AR · AMAZON · SHOPEE · ANUNCIE NA GUIROPA · PUBLICIDADE ·</span>
          <span>PUBLICIDADE · APOIE QUEM MANTÉM A MÚSICA NO AR · AMAZON · SHOPEE · ANUNCIE NA GUIROPA · PUBLICIDADE ·</span>
        </div>
      </div>

      <div className="guiropa-revenue-deck__grid">
        <a className="guiropa-revenue-card" data-network="AMAZON" href={AMAZON_MAIN} target="_blank" rel="nofollow sponsored noopener noreferrer">
          <small>PUBLICIDADE · AMAZON</small>
          <strong>Vinil, áudio e cultura pop.</strong>
          <span>VER SELEÇÃO →</span>
        </a>
        <a className="guiropa-revenue-card" data-network="SHOPEE" href={SHOPEE} target="_blank" rel="nofollow sponsored noopener noreferrer">
          <small>PUBLICIDADE · SHOPEE</small>
          <strong>Ofertas em movimento.</strong>
          <span>ABRIR →</span>
        </a>
        <a className="guiropa-revenue-card" data-network="AMAZON" href={AMAZON_ALT} target="_blank" rel="nofollow sponsored noopener noreferrer">
          <small>PUBLICIDADE · AMAZON</small>
          <strong>Outra descoberta.</strong>
          <span>VER OFERTA →</span>
        </a>
        <Link className="guiropa-revenue-card" data-network="GUIROPA" to="/anuncie">
          <small>PUBLICIDADE · GUIROPA</small>
          <strong>Quer aparecer aqui?</strong>
          <span>ANUNCIE NA GUIROPA →</span>
        </Link>
      </div>
      <div className="guiropa-revenue-deck__legal">Links comerciais e de afiliados são identificados como publicidade. A navegação editorial e o áudio permanecem independentes.</div>
    </section>
  );
}
