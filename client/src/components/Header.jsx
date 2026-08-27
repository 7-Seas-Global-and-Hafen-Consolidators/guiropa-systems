import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import GuiropaLogo from "./GuiropaLogo.jsx";

const SOCIALS = ["INSTAGRAM", "YOUTUBE", "FACEBOOK", "TIKTOK", "SPOTIFY"];

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => { document.body.classList.toggle("nav-open", menuOpen); return () => document.body.classList.remove("nav-open"); }, [menuOpen]);
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>36);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);

  return <><style>{`
    .guiropa-radio-header{gap:clamp(14px,2vw,30px)!important}.guiropa-header-socials{display:flex;align-items:center;gap:12px;white-space:nowrap}.guiropa-header-socials span{font-size:10px;font-weight:900;letter-spacing:.08em;color:#6f604f}.guiropa-header-support{display:inline-flex;align-items:center;min-height:34px;padding:0 13px;border:1px solid #b83224;background:#b83224;color:#fff4df!important;text-decoration:none;font-size:10px;font-weight:1000;letter-spacing:.12em}.guiropa-radio-header__logo{flex:0 0 auto}.guiropa-radio-header .header-actions{gap:13px}@media(max-width:1240px){.guiropa-header-socials{gap:8px}.guiropa-header-socials span{font-size:9px}}@media(max-width:1080px){.guiropa-header-socials{display:none}}@media(max-width:760px){.guiropa-header-support{min-height:30px;padding:0 9px;font-size:8px}}
  `}</style><button type="button" className={`nav-backdrop${menuOpen?" is-visible":""}`} aria-label={t.a11y.closeMenu} aria-hidden={!menuOpen} tabIndex={menuOpen?0:-1} onClick={()=>setMenuOpen(false)}/><header className={`site-header guiropa-radio-header${scrolled?" scrolled":""}`}><Link to="/" className="logo-link guiropa-radio-header__logo" aria-label={t.a11y.home}><GuiropaLogo variant="header"/></Link><nav className={`main-nav${menuOpen?" open":""}`} aria-label={t.a11y.navPrimary}>{t.nav.map(({href,label,cta})=><NavLink key={href} to={href} className={({isActive})=>["guiropa-nav-link",isActive?"is-active":"",cta?"nav-cta":""].filter(Boolean).join(" ")} onClick={()=>setMenuOpen(false)}>{label}</NavLink>)}</nav><div className="header-actions"><div className="guiropa-header-socials" aria-label="Redes sociais GUIROPA">{SOCIALS.map(name=><span key={name}>{name}</span>)}</div><Link className="guiropa-header-support" to="/apoie">APOIE</Link><LanguageSwitcher/><button type="button" className="menu-toggle" aria-label={menuOpen?t.a11y.closeMenu:t.a11y.openMenu} aria-expanded={menuOpen} onClick={()=>setMenuOpen(open=>!open)}><span/><span/><span/></button></div></header></>;
}
