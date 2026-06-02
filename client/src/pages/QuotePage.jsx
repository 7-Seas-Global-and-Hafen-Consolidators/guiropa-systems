import PageIntro from "../components/PageIntro.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function QuotePage() {
  const { t } = useLanguage();
  return <PageIntro content={t.pageIntros.quote} />;
}
