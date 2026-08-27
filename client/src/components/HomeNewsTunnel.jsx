import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";

function stamp(value){if(!value)return"—";const date=new Date(value);if(Number.isNaN(date.getTime()))return"—";return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(date);}
function isReady(item){return Boolean(item?.editorialStatus==="ready"&&item?.titlePt&&Array.isArray(item?.bodyPt)&&item.bodyPt.length>=4);}

export default function HomeNewsTunnel(){
  const [data,setData]=useState({items:[],updatedAt:null,editorialUpdatedAt:null,publishedPt:0});
  useEffect(()=>{Promise.all([
    fetch(`${assetUrl("data/rss-world-feed.json")}?t=${Date.now()}`,{cache:"no-store"}).then(r=>r.ok?r.json():({items:[]})).catch(()=>({items:[]})),
    fetch(`${assetUrl("data/guiropa-editorial-features.json")}?t=${Date.now()}`,{cache:"no-store"}).then(r=>r.ok?r.json():({items:[]})).catch(()=>({items:[]}))
  ]).then(([rss,editorial])=>setData({...rss,items:[...(editorial.items||[]),...(rss.items||[])],editorialUpdatedAt:editorial.updatedAt||rss.editorialUpdatedAt,publishedPt:Number(rss.publishedPt||0)+(editorial.items||[]).filter(isReady).length}));},[]);
  const readyItems=useMemo(()=>(data.items||[]).filter(isReady),[data.items]);
  const items=useMemo(()=>readyItems.slice(0,3),[readyItems]);
  return <section className="guiropa-home-news" aria-label="GUIROPA Radio News Tunnel em português">
    <style>{`
      .guiropa-home-news{background:#15110e;color:#f6ead5;border-top:1px solid #34291f;border-bottom:1px solid #34291f}.guiropa-home-news__shell{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:clamp(3.5rem,6vw,5rem) 0}.guiropa-home-news__head{display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:end;margin-bottom:1.8rem}.guiropa-home-news__eyebrow{font-size:.58rem;font-weight:900;letter-spacing:.18em;color:#e6bd62}.guiropa-home-news h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(2.8rem,5vw,5rem);line-height:.9;letter-spacing:-.055em;margin:.6rem 0 0}.guiropa-home-news__meta{text-align:right;font-size:.54rem;line-height:1.7;letter-spacing:.1em;color:#8d7b68}.guiropa-home-news__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#3d3025;border:1px solid #3d3025}.guiropa-home-news__card{background:#201913;padding:1.2rem;min-height:190px;display:flex;flex-direction:column;text-decoration:none;color:#f6ead5}.guiropa-home-news__card:hover{background:#2a211a}.guiropa-home-news__brand{font-size:.47rem;font-weight:900;letter-spacing:.12em;color:#c69843}.guiropa-home-news__card h3{font-family:Georgia,"Times New Roman",serif;font-size:1.35rem;line-height:1.05;font-weight:400;margin:.9rem 0 1.2rem}.guiropa-home-news__foot{margin-top:auto;display:flex;justify-content:space-between;gap:.8rem;font-size:.45rem;letter-spacing:.08em;color:#8f7d6b}.guiropa-home-news__cta{display:inline-flex;align-items:center;min-height:44px;padding:0 15px;margin-top:1.4rem;border:1px solid #e6bd62;color:#f6ead5;text-decoration:none;font-size:.58rem;font-weight:900;letter-spacing:.11em}.guiropa-home-news__waiting{border:1px solid #3d3025;background:#201913;padding:1.25rem;color:#b8a58e}@media(max-width:800px){.guiropa-home-news__head{grid-template-columns:1fr}.guiropa-home-news__meta{text-align:left}.guiropa-home-news__grid{grid-template-columns:1fr}}@media(max-width:560px){.guiropa-home-news__shell{width:min(100% - 24px,650px)}}
    `}</style>
    <div className="guiropa-home-news__shell">
      <div className="guiropa-home-news__head"><div><div className="guiropa-home-news__eyebrow">GUIROPA RADIO · WORLD WIRE</div><h2>News Tunnel™</h2></div><div className="guiropa-home-news__meta"><div>{Number(data.publishedPt||readyItems.length)} matérias completas em português</div><div>Atualizado {stamp(data.editorialUpdatedAt||data.updatedAt)}</div></div></div>
      {items.length?<div className="guiropa-home-news__grid">{items.map((item)=><Link className="guiropa-home-news__card" to={`/world-wire/${item.id}`} key={item.id}><div className="guiropa-home-news__brand">GUIROPA RADIO · EDITORIAL</div><h3>{item.titlePt}</h3><div className="guiropa-home-news__foot"><span>{item.region||"MUNDO"}</span><span>{stamp(item.publishedAt||item.discoveredAt)}</span></div></Link>)}</div>:<div className="guiropa-home-news__waiting">As próximas matérias só aparecem quando a versão completa em português estiver pronta.</div>}
      <Link className="guiropa-home-news__cta" to="/world-wire">ENTRAR NO NEWS TUNNEL →</Link>
    </div>
  </section>;
}
