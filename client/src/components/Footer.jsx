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
          <Link to="/programacao">{t.footer.schedule}</Link>
          <Link to="/loja">{t.footer.store}</Link>
          <Link to="/contato">{t.footer.contact}</Link>
          <Link to="/anuncie">{t.footer.advertise}</Link>
          <a
            href="https://www.asaas.com/c/n17o931m5w6ze64t"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.support}
          </a>
        </nav>

        <div className="guiropa-radio-footer__meta">
          <span>1950 — 1990</span>

          <span>
            © {new Date().getFullYear()} GUIROPA RADIO ·{" "}
            {t.footer.rights}
          </span>
        </div>

        <div className="guiropa-radio-footer__operator">
          7 SEAS GLOBAL
        </div>
      </div>
    </footer>
  );
}
