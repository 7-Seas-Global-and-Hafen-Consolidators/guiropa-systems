import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Partners() {
  const { t } = useLanguage();
  const p = t.partners;

  return (
    <section className="partners section" id="partners">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2>{p.headline}</h2>
          <p className="section-lead">{p.lead}</p>
        </Reveal>
        <div className="partners-grid">
          {p.placeholders.map((name, i) => (
            <Reveal key={name} className="partners-logo-slot" delay={i * 0.05}>
              <span>{name}</span>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="partners-note" delay={0.2}>
          {p.note}
        </Reveal>
      </div>
    </section>
  );
}
