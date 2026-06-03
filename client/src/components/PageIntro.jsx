import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import PageHero from "./PageHero.jsx";

/**
 * Página de introdução — conteúdo institucional.
 * Área funcional (formulário, simuladores) entra na fase seguinte.
 */
export default function PageIntro({ content }) {
  const { t } = useLanguage();
  const p = t.page;
  const whatsappHref = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.footer.whatsappMessage)}`;

  return (
    <main className="page-main">
      <PageHero eyebrow={content.eyebrow} title={content.title} lead={content.lead} wide />

      <section className="page-intro section">
        <div className="container page-intro__layout">
          {content.body ? (
            <Reveal className="page-intro__body">
              <p>{content.body}</p>
            </Reveal>
          ) : null}

          {content.highlights?.length ? (
            <Reveal as="ul" className="page-intro__highlights" delay={0.06}>
              {content.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Reveal>
          ) : null}

          <Reveal className="page-intro__panel" delay={0.1}>
            <span className="page-intro__badge">{p.comingSoon}</span>
            <p className="page-intro__panel-label">{content.functionalLabel}</p>
            <h2 className="page-intro__panel-title">{content.functionalTitle}</h2>
            <p className="page-intro__panel-note">{content.functionalNote}</p>
          </Reveal>

          <Reveal className="page-intro__actions" delay={0.14}>
            <a
              href={whatsappHref}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.contactCta}
            </a>
            <Link to="/contato" className="btn-secondary">
              {p.viewContact}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
