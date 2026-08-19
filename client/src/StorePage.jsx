import { useLanguage } from "./i18n/LanguageContext.jsx";
import { GUIROPA_EMBLEM_SRC } from "./data/brandAssets.js";

const PRODUCTS = [
  { code: "GR-P001", type: "Camiseta", title: "Woodstock 69 Poster", price: "R$ 78,89", image: "https://www.passportradio.online/images/store/woodstock-69.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20Woodstock%2069%20Poster%20por%20R%24%2078%2C89%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P002", type: "Camiseta", title: "The Cure — Boys Don't Cry", price: "R$ 78,89", image: "https://www.passportradio.online/images/store/the-cure-boys-dont-cry.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20The%20Cure%20%E2%80%94%20Boys%20Don%27t%20Cry%20por%20R%24%2078%2C89%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P003", type: "Camiseta", title: "Def Leppard — Hysteria", price: "R$ 78,89", image: "https://www.passportradio.online/images/store/def-leppard-hysteria.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20Def%20Leppard%20%E2%80%94%20Hysteria%20por%20R%24%2078%2C89%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P004", type: "Tênis · Cano alto", title: "ABBA", price: "R$ 249,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-04-45%20ABBA%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20ABBA%20por%20R%24%20249%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P005", type: "Tênis · Cano alto", title: "Van Halen", price: "R$ 249,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-05-48%20Van%20Halen%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20Van%20Halen%20por%20R%24%20249%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P006", type: "Tênis · Cano baixo", title: "Stevie Nicks", price: "R$ 199,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-06-25%20Stevie%20Nicks%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20Stevie%20Nicks%20por%20R%24%20199%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P007", type: "Tênis · Cano alto", title: "David Bowie", price: "R$ 249,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-07-09%20DAVID%20BOWIE%20limited%20editiob%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20David%20Bowie%20por%20R%24%20249%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P008", type: "Tênis · Cano alto", title: "Bon Jovi", price: "R$ 249,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-07-33%20BON%20JOVI%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20Bon%20Jovi%20por%20R%24%20249%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P009", type: "Tênis · Cano alto", title: "Elvis Presley", price: "R$ 249,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-10-18%20ELVIS%20PRESLEY%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20Elvis%20Presley%20por%20R%24%20249%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" },
  { code: "GR-P010", type: "Tênis · Cano alto", title: "U2", price: "R$ 249,90", image: "https://www.passportradio.online/images/store/tenis/Screenshot%202026-08-10%20at%2022-09-33%20U2%20shoes%20%E2%80%93%20Bornrocker%20Brand.png", buy: "https://wa.me/48732099369?text=Ol%C3%A1%21%20Quero%20comprar%20U2%20por%20R%24%20249%2C90%20pela%20GUIROPA%20RADIO.%20Pode%20me%20passar%20disponibilidade%20e%20o%20link%20de%20pagamento%3F" }
];

const COPY = {
  pt: {
    eyebrow: "GUIROPA RADIO · LOJA",
    title: "Loja.",
    lead: "1950 — 1990. Música, estrada, estilo e objetos que atravessam décadas.",
    introEyebrow: "GUIROPA STORE",
    introTitle: "Entrou. Viu. Gostou. Comprou.",
    introLead: "Uma seleção inicial trazida da operação Passport Radio para colocar a loja GUIROPA para funcionar agora.",
    productsTitle: "Seleção disponível.",
    buy: "COMPRAR",
    installments: "Pagamento facilitado · condições no atendimento",
    operator: "Operação comercial e pagamentos: 7 Seas Global.",
    finalEyebrow: "GET UP. TURN IT UP. GUIROPA.",
    finalTitle: "A rádio sai das caixas de som.",
    finalLead: "Peças escolhidas para conversar com o universo musical e visual da GUIROPA."
  },
  en: {
    eyebrow: "GUIROPA RADIO · STORE",
    title: "Store.",
    lead: "1950 — 1990. Music, road, style and objects crossing decades.",
    introEyebrow: "GUIROPA STORE",
    introTitle: "See it. Like it. Get it.",
    introLead: "An initial selection brought from the Passport Radio operation to put the GUIROPA store live now.",
    productsTitle: "Available selection.",
    buy: "BUY",
    installments: "Flexible payment · conditions via direct service",
    operator: "Commercial operation and payments: 7 Seas Global.",
    finalEyebrow: "GET UP. TURN IT UP. GUIROPA.",
    finalTitle: "The radio moves beyond the speakers.",
    finalLead: "Pieces selected to match GUIROPA's musical and visual universe."
  },
  es: {
    eyebrow: "GUIROPA RADIO · TIENDA",
    title: "Tienda.",
    lead: "1950 — 1990. Música, carretera, estilo y objetos que atraviesan décadas.",
    introEyebrow: "GUIROPA STORE",
    introTitle: "Entró. Vio. Gustó. Compró.",
    introLead: "Una selección inicial traída de la operación Passport Radio para poner la tienda GUIROPA en marcha ahora.",
    productsTitle: "Selección disponible.",
    buy: "COMPRAR",
    installments: "Pago facilitado · condiciones por atención directa",
    operator: "Operación comercial y pagos: 7 Seas Global.",
    finalEyebrow: "GET UP. TURN IT UP. GUIROPA.",
    finalTitle: "La radio sale de los altavoces.",
    finalLead: "Piezas elegidas para conversar con el universo musical y visual de GUIROPA."
  }
};

export default function StorePage() {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.pt;

  return (
    <main className="guiropa-store-page">
      <style>{`
        .guiropa-store-page{--paper:#f5ead6;--deep:#ead0a8;--ink:#211b16;--soft:#6e5f4d;--red:#b83224;--gold:#c99a45;--black:#0d0c0b;--line:rgba(76,56,39,.18);min-height:100vh;color:var(--ink);background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.62),transparent 36%),linear-gradient(180deg,#f8efdf 0%,var(--paper) 58%,var(--deep) 100%)}
        .guiropa-store-page *{box-sizing:border-box}
        .guiropa-store-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .guiropa-store-eyebrow{display:block;color:var(--red);font-size:.66rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase}
        .guiropa-store-hero{padding:clamp(4.5rem,8vw,7rem) 0 clamp(4rem,7vw,6rem)}
        .guiropa-store-hero__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(190px,270px);gap:clamp(3rem,7vw,6rem);align-items:end}
        .guiropa-store-hero h1{margin:.8rem 0 0;font-size:clamp(4.2rem,9vw,8.8rem);font-weight:800;line-height:.86;letter-spacing:-.065em}
        .guiropa-store-hero p{max-width:760px;margin:2rem 0 0;color:var(--soft);font-size:clamp(1rem,1.7vw,1.26rem);line-height:1.65}
        .guiropa-store-emblem{display:flex;justify-content:flex-end}
        .guiropa-store-emblem img,.guiropa-store-final img{display:block;width:min(100%,220px);height:auto;border:1px solid rgba(201,154,69,.3);border-radius:28px;background:#0d0c0b;box-shadow:0 18px 36px rgba(53,35,22,.18)}
        .guiropa-store-intro{padding:clamp(4rem,7vw,6.5rem) 0;background:linear-gradient(180deg,#181410,#0f0d0b);color:#f1dfbd}
        .guiropa-store-intro__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,430px);gap:clamp(3rem,7vw,6rem);align-items:end}
        .guiropa-store-intro .guiropa-store-eyebrow,.guiropa-store-final .guiropa-store-eyebrow{color:#e0bb70}
        .guiropa-store-intro h2,.guiropa-store-products h2,.guiropa-store-final h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-.045em}
        .guiropa-store-intro h2{margin:.8rem 0 0;font-size:clamp(2.8rem,5.7vw,5.2rem);line-height:.98}
        .guiropa-store-intro p{margin:0;color:#a99575;line-height:1.75}
        .guiropa-store-products{padding:clamp(4.8rem,8vw,7rem) 0}
        .guiropa-store-products__head{display:flex;justify-content:space-between;align-items:end;gap:2rem;padding-bottom:1.5rem;border-bottom:1px solid var(--line)}
        .guiropa-store-products__head h2{margin:0;font-size:clamp(2.7rem,5vw,4.8rem);line-height:1}
        .guiropa-store-products__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-left:1px solid var(--line)}
        .guiropa-store-product{display:flex;min-width:0;flex-direction:column;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:rgba(255,250,240,.22)}
        .guiropa-store-product__media{aspect-ratio:1/1;overflow:hidden;background:#e8d7ba}
        .guiropa-store-product__media img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease}
        .guiropa-store-product:hover .guiropa-store-product__media img{transform:scale(1.025)}
        .guiropa-store-product__body{display:flex;flex:1;flex-direction:column;padding:1.5rem}
        .guiropa-store-product__code{font-size:.58rem;font-weight:900;letter-spacing:.15em;color:var(--gold)}
        .guiropa-store-product__type{margin-top:1.4rem;color:var(--red);font-size:.58rem;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .guiropa-store-product h3{margin:.55rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.55rem,2.6vw,2.2rem);font-weight:400;line-height:1.03}
        .guiropa-store-product__price{margin-top:1.2rem;font-size:1.35rem;font-weight:900}
        .guiropa-store-product__installments{margin:.35rem 0 1.4rem;color:var(--soft);font-size:.72rem;line-height:1.45}
        .guiropa-store-product__buy{min-height:46px;display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding:0 14px;background:var(--ink);color:#fff8ed;text-decoration:none;font-size:.62rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .guiropa-store-product__buy strong{color:#e0bb70;font-size:1rem}
        .guiropa-store-product__buy:hover{background:var(--red)}
        .guiropa-store-operator{padding-top:1.2rem;color:rgba(110,95,77,.65);font-size:.58rem;font-weight:700;letter-spacing:.08em;text-align:right}
        .guiropa-store-final{padding:clamp(5rem,8vw,7rem) 0;background:linear-gradient(180deg,#17130f,#0e0c0a);color:#f0dfbd}
        .guiropa-store-final__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(200px,290px);gap:clamp(3rem,7vw,6rem);align-items:center}
        .guiropa-store-final h2{margin:.8rem 0 0;max-width:780px;font-size:clamp(2.8rem,5.8vw,5.4rem);line-height:.98}
        .guiropa-store-final p{max-width:680px;margin:1.3rem 0 0;color:#a99575;line-height:1.7}
        .guiropa-store-final img{margin-left:auto}
        @media(max-width:900px){.guiropa-store-hero__grid,.guiropa-store-intro__grid,.guiropa-store-final__grid{grid-template-columns:1fr}.guiropa-store-emblem{justify-content:flex-start}.guiropa-store-final img{margin-left:0}.guiropa-store-products__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:600px){.guiropa-store-shell{width:min(100% - 24px,650px)}.guiropa-store-hero h1{font-size:clamp(3.8rem,18vw,6.5rem)}.guiropa-store-products__head{display:block}.guiropa-store-products__grid{grid-template-columns:1fr}}
      `}</style>

      <section className="guiropa-store-hero">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-hero__grid">
            <div>
              <span className="guiropa-store-eyebrow">{copy.eyebrow}</span>
              <h1>{copy.title}</h1>
              <p>{copy.lead}</p>
            </div>
            <div className="guiropa-store-emblem" aria-hidden="true">
              <img src={GUIROPA_EMBLEM_SRC} alt="" loading="eager" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="guiropa-store-intro">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-intro__grid">
            <div>
              <span className="guiropa-store-eyebrow">{copy.introEyebrow}</span>
              <h2>{copy.introTitle}</h2>
            </div>
            <p>{copy.introLead}</p>
          </div>
        </div>
      </section>

      <section className="guiropa-store-products">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-products__head">
            <h2>{copy.productsTitle}</h2>
            <span className="guiropa-store-eyebrow">PASSPORT → GUIROPA</span>
          </div>
          <div className="guiropa-store-products__grid">
            {PRODUCTS.map((product) => (
              <article className="guiropa-store-product" key={product.code}>
                <div className="guiropa-store-product__media">
                  <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
                </div>
                <div className="guiropa-store-product__body">
                  <span className="guiropa-store-product__code">{product.code}</span>
                  <span className="guiropa-store-product__type">{product.type}</span>
                  <h3>{product.title}</h3>
                  <div className="guiropa-store-product__price">{product.price}</div>
                  <div className="guiropa-store-product__installments">{copy.installments}</div>
                  <a className="guiropa-store-product__buy" href={product.buy} target="_blank" rel="noopener noreferrer">
                    <span>{copy.buy}</span><strong aria-hidden="true">↗</strong>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="guiropa-store-operator">{copy.operator}</div>
        </div>
      </section>

      <section className="guiropa-store-final">
        <div className="guiropa-store-shell">
          <div className="guiropa-store-final__grid">
            <div>
              <span className="guiropa-store-eyebrow">{copy.finalEyebrow}</span>
              <h2>{copy.finalTitle}</h2>
              <p>{copy.finalLead}</p>
            </div>
            <img src={GUIROPA_EMBLEM_SRC} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </main>
  );
}
