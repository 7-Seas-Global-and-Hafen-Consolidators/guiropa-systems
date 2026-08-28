import { Link, useParams } from "react-router-dom";
import { artistsForDecade } from "../data/artistEditorialCatalog.js";

const META={
  "1950s":{kicker:"A FAÍSCA",lead:"Rock 'n' roll, doo-wop, rhythm & blues e as vozes que abriram a porta."},
  "1960s":{kicker:"TUDO MUDOU",lead:"British Invasion, Motown, folk-rock, soul e psicodelia em movimento."},
  "1970s":{kicker:"ANOS DOURADOS",lead:"Álbuns gigantes, soft rock, arena, soul, disco e uma indústria no auge."},
  "1980s":{kicker:"HITS ETERNOS",lead:"Arena rock, new wave, synthpop, adult contemporary e produção monumental."},
  "1990":{kicker:"A ÚLTIMA PARADA",lead:"A linha GUIROPA chega a 1990 com melodias, baladas e bandas atravessando a mudança de época."},
};

export default function DecadeArtistsPage(){
  const {decade}=useParams();
  const meta=META[decade];
  const artists=artistsForDecade(decade);
  if(!meta) return <main className="artist-index"><div className="artist-index__shell"><h1>Arquivo não encontrado.</h1><Link to="/">VOLTAR À GUIROPA →</Link></div></main>;
  return <main className={`artist-index artist-index--${decade}`}>
    <style>{`
      .artist-index{min-height:100vh;background:#f4ead7;color:#201914;padding:clamp(4rem,8vw,7rem) 0 6rem}.artist-index__shell{width:min(1180px,calc(100% - 40px));margin:0 auto}.artist-index__top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2rem;align-items:end;padding-bottom:2rem;border-bottom:1px solid rgba(54,38,25,.2)}.artist-index__eyebrow{color:#b83224;font-size:.62rem;font-weight:900;letter-spacing:.2em}.artist-index h1{margin:.7rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(4rem,9vw,8rem);font-weight:400;line-height:.82;letter-spacing:-.065em}.artist-index__lead{max-width:700px;margin:1.4rem 0 0;color:#725f4d;font-size:1.05rem;line-height:1.7}.artist-index__links{display:flex;flex-wrap:wrap;gap:.65rem;justify-content:flex-end}.artist-index__links a{display:inline-flex;min-height:42px;align-items:center;padding:0 13px;border:1px solid #6c5136;color:#362719;text-decoration:none;font-size:.56rem;font-weight:900;letter-spacing:.11em}.artist-index__links a:hover{background:#201914;color:#f4ead7}.artist-index__count{margin:2rem 0 1rem;color:#927553;font-size:.6rem;font-weight:900;letter-spacing:.17em}.artist-index__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(54,38,25,.2);border-left:1px solid rgba(54,38,25,.2)}.artist-index__card{min-height:245px;display:flex;flex-direction:column;padding:1.5rem;border-right:1px solid rgba(54,38,25,.2);border-bottom:1px solid rgba(54,38,25,.2);color:inherit;text-decoration:none;background:rgba(255,255,255,.13);transition:.2s ease}.artist-index__card:hover{background:#201914;color:#f4ead7;transform:translateY(-2px)}.artist-index__number{color:#b83224;font-size:.58rem;font-weight:900;letter-spacing:.16em}.artist-index__card h2{margin:auto 0 .8rem;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.6rem,3vw,2.45rem);font-weight:400;line-height:.96;letter-spacing:-.035em}.artist-index__card p{margin:0;color:#806d59;font-size:.78rem;line-height:1.55}.artist-index__card:hover p{color:#cbbba7}.artist-index__enter{display:block;margin-top:1rem;padding-top:.9rem;border-top:1px solid rgba(128,96,62,.25);font-size:.55rem;font-weight:900;letter-spacing:.11em}.artist-index--1960s .artist-index__number{color:#267c7a}.artist-index--1970s .artist-index__number{color:#d57a24}.artist-index--1980s .artist-index__number{color:#e62e6b}.artist-index--1990 .artist-index__number{color:#245a91}@media(max-width:850px){.artist-index__top{grid-template-columns:1fr}.artist-index__links{justify-content:flex-start}.artist-index__grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.artist-index__shell{width:min(100% - 24px,650px)}.artist-index__grid{grid-template-columns:1fr}.artist-index__card{min-height:210px}}
    `}</style>
    <div className="artist-index__shell">
      <header className="artist-index__top"><div><span className="artist-index__eyebrow">THE GUIROPA ARCHIVES · {meta.kicker}</span><h1>{decade}</h1><p className="artist-index__lead">{meta.lead} Cada nome abaixo abre uma matéria editorial completa, com trajetória, discos, recomendações e performance em vídeo.</p></div><nav className="artist-index__links" aria-label="Arquivo da década"><Link to={`/decada/${decade}`}>HISTÓRIA DA DÉCADA →</Link>{decade==="1970s"&&<Link to="/1977">ENTER 70s TUNNEL™ →</Link>}<Link to="/">HOME →</Link></nav></header>
      <div className="artist-index__count">{artists.length} MATÉRIAS · GUIROPA EDITORIAL ARCHIVE</div>
      <section className="artist-index__grid" aria-label={`Artistas ${decade}`}>
        {artists.map((a,i)=><Link className="artist-index__card" key={`${a.decade}-${a.slug}`} to={`/decada/${decade}/artistas/${a.slug}`}><span className="artist-index__number">{String(i+1).padStart(2,"0")} · {decade}</span><h2>{a.name}</h2><p>{a.subtitle}</p><span className="artist-index__enter">ABRIR MATÉRIA →</span></Link>)}
      </section>
    </div>
  </main>;
}
