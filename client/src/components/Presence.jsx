import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Presence() {
  const { t } = useLanguage();
  const p = t.presence;

  return (
    <section className="presence section" id="network-global">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2>{p.headline}</h2>
          <p className="section-lead">{p.lead}</p>
        </Reveal>

        <div className="presence-grid">
          {p.regions.map((region, i) => (
            <Reveal key={region.id} as="article" className="presence-card" delay={i * 0.06}>
              <div className="presence-card__head">
                <h3>{region.title}</h3>
                {region.badge && <span className="presence-badge">{region.badge}</span>}
              </div>
              <ul className="presence-cities">
                {region.cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {p.conversion && (
          <Reveal className="presence-conversion" delay={0.12}>
            <p>{p.conversion}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
