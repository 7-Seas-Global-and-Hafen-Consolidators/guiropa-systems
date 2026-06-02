import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Corridor() {
  const { t } = useLanguage();
  const c = t.corridor;

  return (
    <section className="corridor section section--compact" id="corridor">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.headline}</h2>
          <p className="section-lead">{c.lead}</p>
        </Reveal>
        <div className="corridor-grid">
          {c.cards.map((card, i) => (
            <Reveal key={card.title} className="corridor-card" delay={i * 0.06}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
