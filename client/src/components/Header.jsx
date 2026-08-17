import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import GuiropaLogo from "./GuiropaLogo.jsx";

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

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`nav-backdrop${menuOpen ? " is-visible" : ""}`}
        aria-label={t.a11y.closeMenu}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <header
        className={`site-header guiropa-radio-header${
          scrolled ? " scrolled" : ""
        }`}
      >
        <Link
          to="/"
          className="logo-link guiropa-radio-header__logo"
          aria-label={t.a11y.home}
        >
          <GuiropaLogo variant="header" />
        </Link>

        <nav
          className={`main-nav${menuOpen ? " open" : ""}`}
          aria-label={t.a11y.navPrimary}
        >
          {t.nav.map(({ href, label, cta }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                [
                  "guiropa-nav-link",
                  isActive ? "is-active" : "",
                  cta ? "nav-cta" : "",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />

          <button
            type="button"
            className="menu-toggle"
            aria-label={
              menuOpen ? t.a11y.closeMenu : t.a11y.openMenu
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
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
