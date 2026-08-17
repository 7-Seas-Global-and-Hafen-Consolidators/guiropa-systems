import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ExploreHub() {
  const { t } = useLanguage();

  return (
    <section
      className="guiropa-decades section"
      id="decadas"
    >
      <div className="container">
        <Reveal className="guiropa-section-heading">
          <span className="guiropa-section-kicker">
            {t.decades.eyebrow}
          </span>

          <h2>{t.decades.headline}</h2>

          <p>{t.decades.lead}</p>
        </Reveal>

        <div className="guiropa-decades-grid">
          {t.decades.items.map((item, index) => (
            <Reveal
              key={item.year}
              delay={index * 0.06}
              className={`guiropa-decade guiropa-decade--${item.code}`}
            >
              <span className="guiropa-decade__number">
                {item.year}
              </span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
