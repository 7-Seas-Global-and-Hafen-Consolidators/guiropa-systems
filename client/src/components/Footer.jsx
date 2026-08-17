import { Link } from "react-router-dom";
import GuiropaLogo from "./GuiropaLogo.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="guiropa-radio-footer">
      <div className="container guiropa-radio-footer__inner">
        <div className="guiropa-radio-footer__brand">
          <GuiropaLogo variant="footer" />

          <p>{t.footer.statement}</p>
        </div>

        <nav
          className="guiropa-radio-footer__nav"
          aria-label={t.a11y.footerNav}
        >
          <Link to="/">{t.footer.home}</Link>
          <Link to="/ouvir">{t.footer.listen}</Link>
          <Link to="/programacao">
            {t.footer.schedule}
          </Link>
          <Link to="/loja">{t.footer.store}</Link>
        </nav>

        <div className="guiropa-radio-footer__meta">
          <span>1950 — 1990</span>

          <span>
            © {new Date().getFullYear()} GUIROPA RADIO
          </span>
        </div>
      </div>
    </footer>
  );
}
