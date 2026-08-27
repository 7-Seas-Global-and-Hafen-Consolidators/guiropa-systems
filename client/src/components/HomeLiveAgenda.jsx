import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { futureLiveEvents, liveDateParts } from "../data/liveAgenda.js";

const COPY = {
  pt:{eyebrow:"GUIROPA · ON THE ROAD",title:"A história ainda está no palco.",lead:"Uma amostra da agenda. Todas as datas futuras confirmadas ficam na página completa.",all:"VER AGENDA COMPLETA →"},
  en:{eyebrow:"GUIROPA · ON THE ROAD",title:"The history is still on stage.",lead:"A preview of the schedule. Every confirmed future date is on the full agenda page.",all:"VIEW FULL AGENDA →"},
  es:{eyebrow:"GUIROPA · ON THE ROAD",title:"La historia sigue sobre el escenario.",lead:"Una muestra de la agenda. Todas las fechas futuras confirmadas están en la página completa.",all:"VER AGENDA COMPLETA →"},
};

export default function HomeLiveAgenda() {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.pt;
  const events = useMemo(() => futureLiveEvents().slice(0, 5), []);

  return (
    <section className="guiropa-live-preview" aria-labelledby="guiropa-live-preview-title">
      <style>{`
        .guiropa-live-preview{background:#100b08;color:#f5ead6;border-top:1px solid #332419;border-bottom:1px solid #332419}.guiropa-live-preview__shell{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:clamp(3.5rem,6vw,5rem) 0}.guiropa-live-preview__eyebrow{color:#d57a24;font-size:.62rem;font-weight:900;letter-spacing:.22em}.guiropa-live-preview h2{margin:.7rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.6rem,5vw,4.8rem);font-weight:400;line-height:.94;letter-spacing:-.05em}.guiropa-live-preview__lead{max-width:720px;margin:1rem 0 2rem;color:#ad9a80;line-height:1.7}.guiropa-live-preview__grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border-top:1px solid #3c2a1c;border-left:1px solid #3c2a1c}.guiropa-live-preview__event{padding:1.1rem;border-right:1px solid #3c2a1c;border-bottom:1px solid #3c2a1c}.guiropa-live-preview__event time{display:block;color:#d57a24;font-family:Georgia,"Times New Roman",serif;font-size:1.35rem}.guiropa-live-preview__event strong{display:block;margin-top:.8rem;font-size:.82rem}.guiropa-live-preview__event span{display:block;margin-top:.35rem;color:#8d7962;font-size:.66rem;line-height:1.45}.guiropa-live-preview__action{display:inline-flex;margin-top:1.5rem;min-height:42px;align-items:center;padding:0 14px;border:1px solid #8c6439;color:#e9c996;text-decoration:none;font-size:.58rem;font-weight:900;letter-spacing:.11em}.guiropa-live-preview__action:hover{background:#d57a24;color:#100b08}@media(max-width:900px){.guiropa-live-preview__grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.guiropa-live-preview__shell{width:min(100% - 24px,650px)}.guiropa-live-preview__grid{grid-template-columns:1fr}}
      `}</style>
      <div className="guiropa-live-preview__shell">
        <span className="guiropa-live-preview__eyebrow">{copy.eyebrow}</span>
        <h2 id="guiropa-live-preview-title">{copy.title}</h2>
        <p className="guiropa-live-preview__lead">{copy.lead}</p>
        <div className="guiropa-live-preview__grid">
          {events.map((event) => { const d = liveDateParts(event.dateISO); return (
            <article className="guiropa-live-preview__event" key={`${event.dateISO}-${event.artist}-${event.city}`}>
              <time dateTime={event.dateISO}>{d.day} {d.month} · {d.year}</time>
              <strong>{event.artist}</strong>
              <span>{event.city} · {event.country}</span>
            </article>
          );})}
        </div>
        <Link className="guiropa-live-preview__action" to="/shows">{copy.all}</Link>
      </div>
    </section>
  );
}
