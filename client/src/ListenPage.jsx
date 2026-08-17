import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ListenPage() {
  const { t } = useLanguage();

  return (
    <main className="radio-page">
      <section className="radio-page-hero">
        <div className="container">
          <span className="guiropa-section-kicker">
            {t.listen.eyebrow}
          </span>

          <h1>{t.listen.title}</h1>

          <p>{t.listen.lead}</p>
        </div>
      </section>

      <section className="radio-page-content">
        <div className="container">
          <div className="radio-coming">
            <span className="radio-coming__status">
              GUIROPA RADIO
            </span>

            <h2>{t.listen.playerTitle}</h2>

            <p>{t.listen.playerNote}</p>

            <div className="radio-player-preview">
              <button
                type="button"
                className="radio-player-preview__play"
                aria-label={t.listen.play}
                disabled
              >
                ▶
              </button>

              <div>
                <span>1950 — 1990</span>
                <strong>{t.listen.waiting}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
