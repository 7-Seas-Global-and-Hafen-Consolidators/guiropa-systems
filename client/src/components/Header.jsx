import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import GuiropaLogo from "./GuiropaLogo.jsx";

const SOCIALS = [
  { name: "INSTAGRAM", href: "https://www.instagram.com/guiropasystemss/" },
  { name: "SPOTIFY", href: "https://open.spotify.com/playlist/5qJ9iLyWFxGs9zVCSAOMLD" },
];

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => { document.body.classList.toggle("nav-open", menuOpen); return () => document.body.classList.remove("nav-open"); }, [menuOpen]);
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>36);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);

  return <><style>{`
    .guiropa-radio-header{gap:clamp(14px,2vw,30px)!important}.guiropa-header-socials{display:flex;align-items:center;gap:8px;white-space:nowrap}.guiropa-header-socials a{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:0 7px;font-size:9px;font-weight:900;letter-spacing:.08em;color:#6f604f;text-decoration:none}.guiropa-header-socials a:hover{color:#b83224}.guiropa-header-support{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 13px;border:1px solid #b83224;background:#b83224;color:#fff4df!important;text-decoration:none;font-size:10px;font-weight:1000;letter-spacing:.12em}.guiropa-radio-header__logo{flex:0 0 auto}.guiropa-radio-header .header-actions{gap:10px}.guiropa-header-socials a:focus-visible,.guiropa-header-support:focus-visible,.guiropa-nav-link:focus-visible,.menu-toggle:focus-visible,.lang-switcher__btn:focus-visible,.logo-link:focus-visible{outline:3px solid #b83224;outline-offset:3px}.lang-switcher__btn{min-width:36px;min-height:36px}@media(max-width:1080px){.guiropa-header-socials{display:none}}@media(max-width:760px){.guiropa-header-support{min-height:42px;padding:0 10px;font-size:8px}.lang-switcher__btn{min-width:40px;min-height:40px}.menu-toggle{min-width:44px;min-height:44px}}
  `}</style><button type="button" className={`nav-backdrop${menuOpen?" is-visible":""}`} aria-label={t.a11y.closeMenu} aria-hidden={!menuOpen} tabIndex={menuOpen?0:-1} onClick={()=>setMenuOpen(false)}/><header className={`site-header guiropa-radio-header${scrolled?" scrolled":""}`}><Link to="/" className="logo-link guiropa-radio-header__logo" aria-label={t.a11y.home}><GuiropaLogo variant="header"/></Link><nav className={`main-nav${menuOpen?" open":""}`} aria-label={t.a11y.navPrimary}>{t.nav.map(({href,label,cta})=><NavLink key={href} to={href} className={({isActive})=>["guiropa-nav-link",isActive?"is-active":"",cta?"nav-cta":""].filter(Boolean).join(" ")} onClick={()=>setMenuOpen(false)}>{label}</NavLink>)}</nav><div className="header-actions"><nav className="guiropa-header-socials" aria-label="Redes sociais GUIROPA">{SOCIALS.map(({name,href})=><a key={name} href={href} target="_blank" rel="noopener noreferrer">{name}</a>)}</nav><Link className="guiropa-header-support" to="/apoie">APOIE</Link><LanguageSwitcher/><button type="button" className="menu-toggle" aria-label={menuOpen?t.a11y.closeMenu:t.a11y.openMenu} aria-expanded={menuOpen} onClick={()=>setMenuOpen(open=>!open)}><span/><span/><span/></button></div></header></>;
}
