import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="guiropa-not-found">
      <style>{`
        .guiropa-not-found{min-height:72vh;display:grid;place-items:center;padding:clamp(4rem,9vw,8rem) 0;background:#f4ead7;color:#211a15}.guiropa-not-found__shell{width:min(860px,calc(100% - 40px));margin:0 auto}.guiropa-not-found__eyebrow{color:#b83224;font-size:.62rem;font-weight:900;letter-spacing:.2em}.guiropa-not-found h1{margin:.8rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3.5rem,9vw,8rem);font-weight:400;line-height:.86;letter-spacing:-.06em}.guiropa-not-found p{max-width:650px;margin:1.4rem 0 0;color:#6f5d4b;font-size:1rem;line-height:1.7}.guiropa-not-found__actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:2rem}.guiropa-not-found__actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 16px;border:1px solid #6c5136;color:#362719;text-decoration:none;font-size:.6rem;font-weight:900;letter-spacing:.1em}.guiropa-not-found__actions a:first-child{background:#211a15;color:#f4ead7}.guiropa-not-found__actions a:hover{background:#b83224;border-color:#b83224;color:#fff}.guiropa-not-found__actions a:focus-visible{outline:3px solid #b83224;outline-offset:3px}@media(max-width:560px){.guiropa-not-found__shell{width:min(100% - 24px,650px)}.guiropa-not-found__actions{display:grid}.guiropa-not-found__actions a{width:100%;min-height:48px}}
      `}</style>
      <div className="guiropa-not-found__shell">
        <span className="guiropa-not-found__eyebrow">GUIROPA RADIO · 404</span>
        <h1>Essa porta não leva a lugar nenhum.</h1>
        <p>A rota não existe ou mudou de endereço. A GUIROPA continua funcionando: volte para a entrada, ouça a rádio ou siga para a programação.</p>
        <nav className="guiropa-not-found__actions" aria-label="Saídas da página não encontrada">
          <Link to="/">VOLTAR À HOME →</Link>
          <Link to="/ouvir">OUVIR GUIROPA →</Link>
          <Link to="/programacao">VER PROGRAMAÇÃO →</Link>
        </nav>
      </div>
    </main>
  );
}
