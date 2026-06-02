import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Payment() {
  const { t } = useLanguage();
  const p = t.payment;

  return (
    <section className="payment section section--compact" id="payment">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2>{p.headline}</h2>
          <p className="section-lead">{p.lead}</p>
        </Reveal>
        <ul className="payment-list">
          {p.methods.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.04}>
              <strong>{m.name}</strong>
              <span>{m.detail}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
