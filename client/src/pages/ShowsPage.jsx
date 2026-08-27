import { useMemo } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { futureLiveEvents, liveDateParts } from "../data/liveAgenda.js";

const COPY={
  pt:{eyebrow:"GUIROPA · ON THE ROAD",title:"Agenda completa.",lead:"Shows futuros confirmados de artistas e bandas ligados às décadas de 1970, 1980 e 1990 — Brasil, América Latina e mundo.",source:"FONTE",show:"VER SHOW ↗",empty:"Nenhuma data futura confirmada no radar neste momento."},
  en:{eyebrow:"GUIROPA · ON THE ROAD",title:"Full agenda.",lead:"Confirmed future shows by artists and bands connected to the 1970s, 1980s and 1990s — Brazil, Latin America and the world.",source:"SOURCE",show:"VIEW SHOW ↗",empty:"No confirmed future dates are currently on the radar."},
  es:{eyebrow:"GUIROPA · ON THE ROAD",title:"Agenda completa.",lead:"Próximos shows confirmados de artistas y bandas vinculados a los años 70, 80 y 90 — Brasil, América Latina y el mundo.",source:"FUENTE",show:"VER SHOW ↗",empty:"No hay fechas futuras confirmadas en el radar en este momento."},
};

export default function ShowsPage(){
  const {lang}=useLanguage();
  const copy=COPY[lang]||COPY.pt;
  const events=useMemo(()=>futureLiveEvents(),[]);
  return <main className="guiropa-shows-page">
    <style>{`
      .guiropa-shows-page{min-height:100vh;background:#100b08;color:#f5ead6;padding:clamp(5rem,8vw,8rem) 0}.guiropa-shows-page__shell{width:min(1180px,calc(100% - 40px));margin:0 auto}.guiropa-shows-page__eyebrow{color:#d57a24;font-size:.62rem;font-weight:900;letter-spacing:.22em}.guiropa-shows-page h1{margin:.8rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(3.4rem,7vw,7rem);font-weight:400;line-height:.9;letter-spacing:-.055em}.guiropa-shows-page__lead{max-width:760px;margin:1.4rem 0 3rem;color:#ad9a80;line-height:1.7}.guiropa-shows-list{border-top:1px solid #3c2a1c}.guiropa-shows-event{display:grid;grid-template-columns:110px minmax(180px,1.2fr) minmax(180px,1fr) minmax(150px,.8fr) auto;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid #3c2a1c}.guiropa-shows-event time{color:#d57a24;font-family:Georgia,"Times New Roman",serif;font-size:1.35rem}.guiropa-shows-event strong{font-size:.84rem}.guiropa-shows-event small,.guiropa-shows-event__place,.guiropa-shows-event__source{color:#8d7962;font-size:.67rem;line-height:1.45}.guiropa-shows-event small{display:block;margin-top:4px}.guiropa-shows-event__source span{display:block;color:#5e4d3c;font-size:.5rem;font-weight:900;letter-spacing:.13em}.guiropa-shows-event a{display:inline-flex;min-height:38px;align-items:center;padding:0 13px;border:1px solid #70502e;color:#e9c996;text-decoration:none;font-size:.56rem;font-weight:900;letter-spacing:.1em;white-space:nowrap}.guiropa-shows-event a:hover{background:#d57a24;color:#100b08}@media(max-width:900px){.guiropa-shows-event{grid-template-columns:90px 1fr auto}.guiropa-shows-event__place,.guiropa-shows-event__source{grid-column:2/3}.guiropa-shows-event a{grid-column:3;grid-row:1/3}}@media(max-width:600px){.guiropa-shows-page__shell{width:min(100% - 24px,650px)}.guiropa-shows-event{grid-template-columns:76px 1fr;gap:12px}.guiropa-shows-event__place,.guiropa-shows-event__source,.guiropa-shows-event a{grid-column:2}.guiropa-shows-event a{grid-row:auto;justify-self:start}}
    `}</style>
    <div className="guiropa-shows-page__shell">
      <span className="guiropa-shows-page__eyebrow">{copy.eyebrow}</span>
      <h1>{copy.title}</h1>
      <p className="guiropa-shows-page__lead">{copy.lead}</p>
      <div className="guiropa-shows-list">
        {events.length?events.map((event)=>{const d=liveDateParts(event.dateISO);return <article className="guiropa-shows-event" key={`${event.dateISO}-${event.artist}-${event.city}`}>
          <time dateTime={event.dateISO}>{d.day} {d.month}<small>{d.year}</small></time>
          <div><strong>{event.artist}</strong><small>{event.city} · {event.country}</small></div>
          <div className="guiropa-shows-event__place">{event.venue}</div>
          <div className="guiropa-shows-event__source"><span>{copy.source}</span>{event.source}</div>
          <a href={event.url} target="_blank" rel="noopener noreferrer">{copy.show}</a>
        </article>}):<p>{copy.empty}</p>}
      </div>
    </div>
  </main>;
}
