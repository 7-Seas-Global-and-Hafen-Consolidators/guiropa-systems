import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function StorePage() {
  const { t } = useLanguage();

  return (
    <main className="radio-page">
      <section className="radio-page-hero">
        <div className="container">
          <span className="guiropa-section-kicker">
            {t.store.eyebrow}
          </span>

          <h1>{t.store.title}</h1>

          <p>{t.store.lead}</p>
        </div>
      </section>

      <section className="radio-page-content">
        <div className="container">
          <div className="store-preview">
            <span>GUIROPA RADIO</span>

            <h2>{t.store.collection}</h2>

            <p>{t.store.note}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
