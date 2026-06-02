import { useLanguage } from "../i18n/LanguageContext.jsx";
import NavLinkItem from "./NavLinkItem.jsx";
import { CommercialChannels, HrChannels } from "./ContactChannels.jsx";

function InstagramIcon() {
  return (
    <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}

function scrollToTop() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const { guiropa, sevenSeas } = t.brands;
  const year = new Date().getFullYear();
  const navLinks = t.navFooter || [];

  return (
    <footer className="site-footer">
      <div className="footer-accent" aria-hidden="true" />

      <div className="container footer-inner">
        <header className="footer-intro">
          <p className="footer-quote">{f.quote}</p>
        </header>

        <div className="footer-grid">
          <nav className="footer-col" aria-label={t.a11y.footerNav}>
            <h3 className="footer-col-title">{f.navTitle}</h3>
            <ul className="footer-links">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <NavLinkItem href={href}>{label}</NavLinkItem>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3 className="footer-col-title">{f.contactTitle}</h3>
            <CommercialChannels layout="footer" />
          </div>

          <div className="footer-col footer-col--stack">
            <div className="footer-subcol">
              <h3 className="footer-col-title">{f.hrTitle}</h3>
              <HrChannels layout="footer" />
            </div>
            <div className="footer-subcol">
              <h3 className="footer-col-title">{f.socialTitle}</h3>
              <ul className="footer-social-list">
                <li>
                  <a
                    href={guiropa.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-card"
                    aria-label={`Instagram GUIROPA ${guiropa.instagramHandle}`}
                  >
                    <span className="footer-social-card__icon">
                      <InstagramIcon />
                    </span>
                    <span className="footer-social-card__text">
                      <span className="footer-social-card__brand">GUIROPA</span>
                      <span className="footer-social-card__handle">{guiropa.instagramHandle}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={sevenSeas.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-card"
                    aria-label={`Instagram 7 SEAS ${sevenSeas.instagramHandle}`}
                  >
                    <span className="footer-social-card__icon">
                      <InstagramIcon />
                    </span>
                    <span className="footer-social-card__text">
                      <span className="footer-social-card__brand">7 SEAS GLOBAL</span>
                      <span className="footer-social-card__handle">{sevenSeas.instagramHandle}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <div className="footer-bar-meta">
            <p className="footer-copy">
              &copy; {year} {guiropa.name} &amp; {sevenSeas.name}. {f.copySuffix}
            </p>
            <p className="footer-legal">{f.legal}</p>
          </div>
          <button type="button" className="footer-top" onClick={scrollToTop}>
            <span className="footer-top__arrow" aria-hidden="true">
              ↑
            </span>
            {f.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
