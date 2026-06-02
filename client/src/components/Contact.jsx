import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { CommercialChannels, HrChannels } from "./ContactChannels.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section className="contact-block section section--compact" id="contact">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.headline}</h2>
          {c.lead ? <p className="section-lead contact-block__lead">{c.lead}</p> : null}
        </Reveal>

        <Reveal className="contact-discreet" delay={0.06}>
          <CommercialChannels layout="chips" />

          {c.careersNote ? (
            <details className="discreet-details contact-hr-details">
              <summary className="discreet-details__summary">{c.careersLabel}</summary>
              <div className="discreet-details__body">
                {c.hrLead ? <p className="contact-hr-details__lead">{c.hrLead}</p> : null}
                <HrChannels layout="chips" />
              </div>
            </details>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
