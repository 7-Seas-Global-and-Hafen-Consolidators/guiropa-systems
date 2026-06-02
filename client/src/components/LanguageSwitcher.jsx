import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { lang, setLang, langs, t } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label={t.a11y.langSwitch}>
      {langs.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-switcher__btn${lang === code ? " is-active" : ""}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
