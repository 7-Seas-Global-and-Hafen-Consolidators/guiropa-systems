import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function IconAbout() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconServices() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v10H4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 11h16M9 7V5h6v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconNetwork() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12h20M12 3a15 15 0 010 18M12 3a15 15 0 000 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconContact() {
  return (
    <svg className="hub-card__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ICONS = { about: IconAbout, services: IconServices, network: IconNetwork, contact: IconContact };

export default function ExploreHub() {
  const { t } = useLanguage();
  const e = t.explore;

  const cards = [
    { key: "about", to: "/sobre", icon: "about" },
    { key: "services", to: "/servicos", icon: "services" },
    { key: "network", to: "/rede-global", icon: "network" },
    { key: "contact", to: "/contato", icon: "contact" },
  ];

  return (
    <section className="action-hub explore-hub section" id="explorar">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{e.eyebrow}</span>
          <h2>{e.headline}</h2>
          <p className="section-lead">{e.lead}</p>
        </Reveal>

        <div className="hub-grid hub-grid--four">
          {cards.map(({ key, to, icon }, i) => {
            const card = e.cards[key];
            const Icon = ICONS[icon];
            return (
              <Reveal key={key} delay={i * 0.06}>
                <Link to={to} className="hub-card">
                  <Icon />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="hub-card__cta">
                    {e.openPage}
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
