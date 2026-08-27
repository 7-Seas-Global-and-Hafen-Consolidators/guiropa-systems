export const LIVE_EVENTS = [
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

export const MONTHS = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

export function futureLiveEvents(now = new Date()) {
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  return LIVE_EVENTS.filter((event) => event.dateISO >= today).sort((a,b) => a.dateISO.localeCompare(b.dateISO));
}

export function liveDateParts(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return { day:String(day).padStart(2,"0"), month:MONTHS[month - 1], year };
}
