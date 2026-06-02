import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const w = t.whyUs;

  return (
    <section className="why-us section" id="why-us">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{w.eyebrow}</span>
          <h2>{w.headline}</h2>
          {w.lead ? <p className="section-lead">{w.lead}</p> : null}
        </Reveal>
        <ul className="why-us-list">
          {w.items.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.05}>
              {item}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
