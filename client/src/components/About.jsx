import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section className="about section" id="about">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{a.eyebrow}</span>
        </Reveal>

        <div className="about-mv-grid">
          <Reveal className="about-mv-card" delay={0.08}>
            <h3>{a.mission.label}</h3>
            <p>{a.mission.text}</p>
          </Reveal>
          <Reveal className="about-mv-card" delay={0.12}>
            <h3>{a.vision.label}</h3>
            <p>{a.vision.text}</p>
          </Reveal>
        </div>

        <p className="about-divisions-title">{a.divisionsTitle}</p>
        <div className="about-divisions">
          {a.divisions.map((d, i) => (
            <Reveal key={d.title} className="about-division-card" delay={0.16 + i * 0.06}>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
