import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ActionHub() {
  const { t } = useLanguage();

  return (
    <section
      className="guiropa-destinations section"
      id="explorar"
    >
      <div className="container">
        <Reveal className="guiropa-section-heading">
          <span className="guiropa-section-kicker">
            {t.hub.eyebrow}
          </span>

          <h2>{t.hub.headline}</h2>

          <p>{t.hub.lead}</p>
        </Reveal>

        <div className="guiropa-destinations-grid">
          {t.hub.cards.map((card, index) => (
            <Reveal
              key={card.href}
              delay={index * 0.08}
            >
              <Link
                to={card.href}
                className="guiropa-destination"
              >
                <span className="guiropa-destination__index">
                  0{index + 1}
                </span>

                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>

                <span
                  className="guiropa-destination__arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
