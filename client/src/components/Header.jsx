import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import GuiropaLogo from "./GuiropaLogo.jsx";
import NavLinkItem from "./NavLinkItem.jsx";

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <button
      type="button"
      className={`nav-backdrop${menuOpen ? " is-visible" : ""}`}
      aria-label={t.a11y.closeMenu}
      aria-hidden={!menuOpen}
      tabIndex={menuOpen ? 0 : -1}
      onClick={closeMenu}
    />
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <Link to="/" className="logo-link" aria-label={t.a11y.home}>
        <GuiropaLogo variant="header" />
      </Link>

      <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label={t.a11y.navPrimary}>
        {t.nav.map(({ href, label, cta }) => (
          <NavLinkItem
            key={href}
            href={href}
            className={cta ? "nav-cta" : undefined}
            onClick={closeMenu}
          >
            {label}
          </NavLinkItem>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitcher />
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
    </>
  );
}
