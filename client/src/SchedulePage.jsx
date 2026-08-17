import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function SchedulePage() {
  const { t } = useLanguage();

  return (
    <main className="radio-page">
      <section className="radio-page-hero">
        <div className="container">
          <span className="guiropa-section-kicker">
            {t.schedule.eyebrow}
          </span>

          <h1>{t.schedule.title}</h1>

          <p>{t.schedule.lead}</p>
        </div>
      </section>

      <section className="radio-page-content">
        <div className="container">
          <div className="schedule-grid">
            {t.schedule.decades.map((decade) => (
              <article
                className="schedule-era"
                key={decade.year}
              >
                <span>{decade.year}</span>

                <h2>{decade.title}</h2>

                <p>{decade.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
