import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function SevenSeasLogo({ className = "", alt }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <p className={`seven-seas-fallback ${className}`.trim()} aria-hidden="true">
        <strong>7 SEAS</strong>
        <span>GLOBAL</span>
      </p>
    );
  }

  return (
    <img
      src={t.brands.sevenSeas.logo}
      alt={alt || t.a11y.sevenSeasLogo}
      className={`seven-seas-logo ${className}`.trim()}
      width={200}
      height={200}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
