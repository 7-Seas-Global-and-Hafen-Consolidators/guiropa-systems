import { useMemo } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const EVENTS = [
  { dateISO:"2026-08-28", artist:"Os Paralamas do Sucesso", city:"São Gonçalo do Amarante · CE", country:"Brasil", venue:"Praia da Taíba · Festival do Escargot", url:"https://www.osparalamas.com.br/agenda/", source:"AGENDA OFICIAL" },
  { dateISO:"2026-08-29", artist:"Capital Inicial", city:"Lavras Novas · MG", country:"Brasil", venue:"Almas Novas", url:"https://capitalinicial.com.br/", source:"SITE OFICIAL" },
  { dateISO:"2026-09-04", artist:"Capital Inicial", city:"Rio de Janeiro · RJ", country:"Brasil", venue:"Rock in Rio", url:"https://capitalinicial.com.br/", source:"SITE OFICIAL" },
  { dateISO:"2026-09-07", artist:"Scorpions", city:"Zapopan", country:"México", venue:"Auditorio Telmex", url:"https://www.the-scorpions.com/tour/", source:"TOUR OFICIAL" },
  { dateISO:"2026-09-10", artist:"Scorpions", city:"Ciudad de México", country:"México", venue:"Palacio de los Deportes", url:"https://www.the-scorpions.com/tour/", source:"TOUR OFICIAL" },
  { dateISO:"2026-09-13", artist:"Simple Minds", city:"Stirling", country:"Escócia", venue:"City Park · BBC Radio 2 In The Park", url:"https://www.simpleminds.com/2026/06/09/simple-minds-bbc-radio-2-in-the-park-2026/", source:"SITE OFICIAL" },
  { dateISO:"2026-09-16", artist:"Os Paralamas do Sucesso", city:"Santiago", country:"Chile", venue:"Teatro Nescafé de Las Artes", url:"https://www.osparalamas.com.br/agenda/", source:"AGENDA OFICIAL" },
  { dateISO:"2026-09-19", artist:"Capital Inicial", city:"Recife · PE", country:"Brasil", venue:"Festival Rock REC", url:"https://capitalinicial.com.br/", source:"SITE OFICIAL" },
  { dateISO:"2026-10-02", artist:"Duran Duran", city:"Oslo", country:"Noruega", venue:"Unity Arena", url:"https://duranduran.com/2026/duran-duran-announce-new-uk-eu-autumn-tour/", source:"TOUR OFICIAL" },
  { dateISO:"2026-10-11", artist:"Iron Maiden", city:"Bogotá", country:"Colômbia", venue:"Vive Claro", url:"https://www.ironmaiden.com/tour/run-for-your-lives-world-tour-2026/", source:"TOUR OFICIAL" },
  { dateISO:"2026-10-20", artist:"Iron Maiden", city:"Buenos Aires", country:"Argentina", venue:"Estadio Huracán", url:"https://www.ironmaiden.com/tour/run-for-your-lives-world-tour-2026/", source:"TOUR OFICIAL" },
  { dateISO:"2026-10-25", artist:"Iron Maiden", city:"São Paulo · SP", country:"Brasil", venue:"Nubank Parque", url:"https://www.ironmaiden.com/tour/run-for-your-lives-world-tour-2026/", source:"TOUR OFICIAL" },
  { dateISO:"2026-10-28", artist:"Iron Maiden", city:"Curitiba · PR", country:"Brasil", venue:"Arena da Baixada", url:"https://www.ironmaiden.com/tour/run-for-your-lives-world-tour-2026/", source:"TOUR OFICIAL" },
  { dateISO:"2026-10-28", artist:"Duran Duran", city:"Paris", country:"França", venue:"Accor Arena", url:"https://duranduran.com/2026/duran-duran-announce-new-uk-eu-autumn-tour/", source:"TOUR OFICIAL" },
  { dateISO:"2026-11-01", artist:"Duran Duran", city:"Lisboa", country:"Portugal", venue:"MEO Arena", url:"https://duranduran.com/2026/duran-duran-announce-new-uk-eu-autumn-tour/", source:"TOUR OFICIAL" },
  { dateISO:"2026-11-14", artist:"Capital Inicial", city:"Porto Alegre · RS", country:"Brasil", venue:"Auditório Araújo Vianna", url:"https://capitalinicial.com.br/", source:"SITE OFICIAL" },
  { dateISO:"2026-12-05", artist:"Deep Purple", city:"São Paulo · SP", country:"Brasil", venue:"Suhai Music Hall", url:"https://deep-purple.com/tour-dates-2/", source:"TOUR OFICIAL" },
  { dateISO:"2026-12-08", artist:"Deep Purple", city:"Santiago", country:"Chile", venue:"Movistar Arena", url:"https://deep-purple.com/tour-dates-2/", source:"TOUR OFICIAL" },
  { dateISO:"2026-12-10", artist:"Deep Purple", city:"Buenos Aires", country:"Argentina", venue:"Movistar Arena", url:"https://deep-purple.com/tour-dates-2/", source:"TOUR OFICIAL" },
  { dateISO:"2026-12-19", artist:"Deep Purple", city:"Ciudad de México", country:"México", venue:"Estadio Fray Nano", url:"https://deep-purple.com/tour-dates-2/", source:"TOUR OFICIAL" },
  { dateISO:"2027-03-06", artist:"Os Paralamas do Sucesso", city:"Montes Claros · MG", country:"Brasil", venue:"Rock in Moc Brasil · Montes Claros Shopping", url:"https://www.osparalamas.com.br/", source:"AGENDA OFICIAL" },
];

const COPY = {
  pt: { eyebrow:"GUIROPA · ON THE ROAD", title:"A história ainda está no palco.", lead:"Shows futuros confirmados de artistas e bandas ligados às décadas de 1970, 1980 e 1990 — Brasil, América Latina e mundo.", source:"FONTE", tickets:"VER SHOW ↗", empty:"Nenhuma data futura confirmada no radar neste momento." },
  en: { eyebrow:"GUIROPA · ON THE ROAD", title:"The history is still on stage.", lead:"Confirmed future shows by artists and bands connected to the 1970s, 1980s and 1990s — Brazil, Latin America and the world.", source:"SOURCE", tickets:"VIEW SHOW ↗", empty:"No confirmed future dates are currently on the radar." },
  es: { eyebrow:"GUIROPA · ON THE ROAD", title:"La historia sigue sobre el escenario.", lead:"Próximos shows confirmados de artistas y bandas vinculados a los años 70, 80 y 90 — Brasil, América Latina y el mundo.", source:"FUENTE", tickets:"VER SHOW ↗", empty:"No hay fechas futuras confirmadas en el radar en este momento." },
};

const MONTHS = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

function dateParts(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return { day:String(day).padStart(2,"0"), month:MONTHS[month - 1], year };
}

export default function HomeLiveAgenda() {
  const { lang } = useLanguage();
  const copy = COPY[lang] || COPY.pt;

  const futureEvents = useMemo(() => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
    return EVENTS.filter((event) => event.dateISO >= today).sort((a,b) => a.dateISO.localeCompare(b.dateISO));
  }, []);

  return (
    <section className="guiropa-live-agenda" aria-labelledby="guiropa-live-agenda-title">
      <style>{`
        .guiropa-live-agenda{background:#100b08;color:#f5ead6;border-top:1px solid #332419;border-bottom:1px solid #332419}.guiropa-live-agenda__shell{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:clamp(4.5rem,8vw,7rem) 0}.guiropa-live-agenda__eyebrow{display:block;color:#d57a24;font-size:.62rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase}.guiropa-live-agenda h2{margin:.9rem 0 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.7rem,6vw,5.9rem);font-weight:400;line-height:.92;letter-spacing:-.055em}.guiropa-live-agenda__lead{max-width:760px;margin:1.3rem 0 2.6rem;color:#ad9a80;line-height:1.7;font-size:clamp(.94rem,1.3vw,1.08rem)}.guiropa-live-agenda__list{border-top:1px solid #3c2a1c}.guiropa-live-event{display:grid;grid-template-columns:104px minmax(190px,1.1fr) minmax(180px,.85fr) minmax(190px,1fr) auto;gap:18px;align-items:center;padding:18px 0;border-bottom:1px solid #3c2a1c}.guiropa-live-event__date strong{display:block;color:#d57a24;font-family:Georgia,"Times New Roman",serif;font-size:1.45rem;font-weight:400;line-height:1}.guiropa-live-event__date span{display:block;margin-top:5px;color:#75634f;font-size:.58rem;font-weight:900;letter-spacing:.16em}.guiropa-live-event__artist strong{display:block;color:#f5ead6;font-size:.84rem;letter-spacing:.04em}.guiropa-live-event__artist small,.guiropa-live-event__place,.guiropa-live-event__source{color:#8d7962;font-size:.67rem;line-height:1.45}.guiropa-live-event__artist small{display:block;margin-top:4px}.guiropa-live-event__source span{display:block;color:#5e4d3c;font-size:.5rem;font-weight:900;letter-spacing:.14em;margin-bottom:3px}.guiropa-live-event__action{min-height:38px;display:inline-flex;align-items:center;justify-content:center;padding:0 13px;border:1px solid #70502e;color:#e9c996;text-decoration:none;font-size:.56rem;font-weight:900;letter-spacing:.1em;white-space:nowrap;transition:.2s ease}.guiropa-live-event__action:hover{background:#d57a24;border-color:#d57a24;color:#100b08}.guiropa-live-agenda__empty{padding:24px 0;color:#8d7962}@media(max-width:900px){.guiropa-live-event{grid-template-columns:84px 1fr auto}.guiropa-live-event__place,.guiropa-live-event__source{grid-column:2/3}.guiropa-live-event__action{grid-column:3;grid-row:1/3}}@media(max-width:600px){.guiropa-live-agenda__shell{width:min(100% - 24px,650px)}.guiropa-live-event{grid-template-columns:72px 1fr;gap:12px}.guiropa-live-event__place,.guiropa-live-event__source,.guiropa-live-event__action{grid-column:2}.guiropa-live-event__action{grid-row:auto;justify-self:start;margin-top:2px}}
      `}</style>
      <div className="guiropa-live-agenda__shell">
        <span className="guiropa-live-agenda__eyebrow">{copy.eyebrow}</span>
        <h2 id="guiropa-live-agenda-title">{copy.title}</h2>
        <p className="guiropa-live-agenda__lead">{copy.lead}</p>
        <div className="guiropa-live-agenda__list">
          {futureEvents.length ? futureEvents.map((event) => {
            const date = dateParts(event.dateISO);
            return (
              <article className="guiropa-live-event" key={`${event.dateISO}-${event.artist}-${event.city}`}>
                <div className="guiropa-live-event__date"><strong>{date.day} {date.month}</strong><span>{date.year}</span></div>
                <div className="guiropa-live-event__artist"><strong>{event.artist}</strong><small>{event.city} · {event.country}</small></div>
                <div className="guiropa-live-event__place">{event.venue}</div>
                <div className="guiropa-live-event__source"><span>{copy.source}</span>{event.source}</div>
                <a className="guiropa-live-event__action" href={event.url} target="_blank" rel="noopener noreferrer">{copy.tickets}</a>
              </article>
            );
          }) : <div className="guiropa-live-agenda__empty">{copy.empty}</div>}
        </div>
      </div>
    </section>
  );
}
