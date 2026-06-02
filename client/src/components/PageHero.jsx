import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function PageHero({ eyebrow, title, lead, wide = false }) {
  const { t } = useLanguage();
  const p = t.page;

  return (
    <header className={`page-hero${wide ? " page-hero--wide" : ""}`}>
      <div className="container page-hero__inner">
        <Reveal>
          <Link to="/" className="page-hero__back">
            <span aria-hidden="true">←</span>
            {p.backHome}
          </Link>
        </Reveal>
        <Reveal className="page-hero__content" delay={0.05}>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {lead ? <p className="page-hero__lead">{lead}</p> : null}
        </Reveal>
      </div>
    </header>
  );
}
