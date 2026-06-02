import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function IconCalc() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconQuote() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h12v16H6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8h6M9 12h4M9 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCareers() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ICONS = { tools: IconCalc, quote: IconQuote, careers: IconCareers };

export default function ActionHub() {
  const { t } = useLanguage();
  const h = t.hub;

  const cards = [
    { key: "tools", to: "/simuladores", icon: "tools" },
    { key: "quote", to: "/orcamento", icon: "quote" },
    { key: "careers", to: "/trabalhe-conosco", icon: "careers" },
  ];

  return (
    <section className="action-hub section" id="recursos">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{h.eyebrow}</span>
          <h2>{h.headline}</h2>
          <p className="section-lead">{h.lead}</p>
        </Reveal>

        <div className="hub-grid">
          {cards.map(({ key, to, icon }, i) => {
            const card = h.cards[key];
            const Icon = ICONS[icon];
            return (
              <Reveal key={key} delay={i * 0.08}>
                <Link to={to} className="hub-card">
                  <Icon />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="hub-card__cta">
                    {h.openPage}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
