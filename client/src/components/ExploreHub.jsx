import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ExploreHub() {
  const { t } = useLanguage();

  return (
    <section
      className="guiropa-decades section guiropa-decades-static"
      id="decadas"
    >
      <div className="container">
        <div className="guiropa-section-heading">
          <span className="guiropa-section-kicker">
            {t.decades.eyebrow}
          </span>

          <h2>
            {t.decades.headline}
          </h2>

          <p>
            {t.decades.lead}
          </p>
        </div>

        <div className="guiropa-decades-grid">
          {t.decades.items.map((item) => (
            <article
              key={item.year}
              className={`guiropa-decade guiropa-decade--${item.code}`}
            >
              <span className="guiropa-decade__number">
                {item.year}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .guiropa-decades-static {
          min-height: 0 !important;

          padding:
            clamp(4.8rem, 8vw, 7rem)
            0 !important;
        }

        .guiropa-decades-static
        .guiropa-section-heading {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }

        .guiropa-decades-static
        .guiropa-decades-grid {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }

        .guiropa-decades-static
        .guiropa-decade {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none;
        }

        .guiropa-decades-static
        .guiropa-decade:hover {
          transform:
            translateY(-4px);
        }

        @media (max-width: 900px) {
          .guiropa-decades-static {
            padding:
              4.5rem
              0 !important;
          }
        }

        @media (max-width: 600px) {
          .guiropa-decades-static {
            padding:
              3.8rem
              0 !important;
          }
        }
      `}</style>
    </section>
  );
}
