import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section className="services section" id="services">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2>{s.headline}</h2>
          {s.lead ? <p className="section-lead">{s.lead}</p> : null}
        </Reveal>
        <ul className="services-list">
          {s.items.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.04}>
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
