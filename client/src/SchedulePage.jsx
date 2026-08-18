const decades = [
  {
    year: "1950s",
    label: "A FAÍSCA",
    description:
      "Rock 'n' roll, rhythm & blues, doo-wop, harmonias vocais e as canções que deram início a tudo.",
    shows: [
      ["MON — 18:00", "The Birth of Rock"],
      ["WED — 20:00", "Rhythm & Blues"],
      ["FRI — 21:00", "Rock 'n' Roll Classics"],
    ],
  },
  {
    year: "1960s",
    label: "TUDO MUDOU",
    description:
      "Pop, soul, Motown, folk rock, rock melódico e o lado mais suave da British Invasion.",
    shows: [
      ["TUE — 18:00", "British Invasion"],
      ["THU — 20:00", "Motown & Soul"],
      ["SAT — 19:00", "Sixties Radio"],
    ],
  },
  {
    year: "1970s",
    label: "ANOS DOURADOS",
    description:
      "Soft rock, baladas clássicas, soul, disco, pop melódico e harmonias inesquecíveis.",
    shows: [
      ["MON — 20:00", "Seventies Gold"],
      ["WED — 21:00", "Soft Rock Nights"],
      ["SAT — 21:00", "Disco & Soul"],
    ],
  },
  {
    year: "1980s",
    label: "HITS ETERNOS",
    description:
      "Soft rock, power ballads, adult contemporary, synthpop, arena rock e as grandes vozes da década.",
    shows: [
      ["TUE — 20:00", "Eighties Forever"],
      ["FRI — 20:00", "Power Ballads"],
      ["SAT — 22:00", "After Dark 80s"],
    ],
  },
  {
    year: "1990",
    label: "A ÚLTIMA PARADA",
    description:
      "Rock ballads, soft rock e canções eternas. A GUIROPA chega a 1990 — e para exatamente aqui.",
    shows: [
      ["WED — 19:00", "The Final Chapter"],
      ["FRI — 22:00", "1990"],
      ["SUN — 20:00", "Guiropa Classics"],
    ],
  },
];

export default function SchedulePage() {
  return (
    <main className="guiropa-schedule">
      <section className="section guiropa-schedule-hero">
        <div className="container">
          <span className="eyebrow">GUIROPA RADIO · 1950 — 1990</span>

          <h1>Programação</h1>

          <p className="guiropa-schedule-intro">
            Cinco décadas. Cinco universos sonoros. Uma programação construída
            em torno da música que atravessou gerações.
          </p>
        </div>
      </section>

      <section className="section guiropa-schedule-content">
        <div className="container">
          <header className="guiropa-schedule-heading">
            <span className="eyebrow">NO AR</span>

            <h2>Uma década de cada vez.</h2>

            <p>
              Da primeira explosão do rock 'n' roll às últimas grandes canções
              de 1990. Escolha uma época e entre nela.
            </p>
          </header>

          <div className="guiropa-schedule-grid">
            {decades.map((decade, index) => (
              <article
                className={`guiropa-schedule-card guiropa-schedule-card--${index + 1}`}
                key={decade.year}
              >
                <div className="guiropa-schedule-card__top">
                  <span className="guiropa-schedule-card__number">
                    0{index + 1}
                  </span>

                  <span className="guiropa-schedule-card__year">
                    {decade.year}
                  </span>
                </div>

                <h3>{decade.label}</h3>

                <p className="guiropa-schedule-card__description">
                  {decade.description}
                </p>

                <div className="guiropa-schedule-card__shows">
                  {decade.shows.map(([time, title]) => (
                    <div
                      className="guiropa-schedule-show"
                      key={`${decade.year}-${title}`}
                    >
                      <span>{time}</span>
                      <strong>{title}</strong>
                    </div>
                  ))}
                </div>

                <div className="guiropa-schedule-card__footer">
                  GUIROPA RADIO
                </div>
              </article>
            ))}
          </div>

          <div className="guiropa-schedule-signature">
            <span>1950</span>
            <span>1960</span>
            <span>1970</span>
            <span>1980</span>
            <span>1990</span>
          </div>
        </div>
      </section>
    </main>
  );
}
