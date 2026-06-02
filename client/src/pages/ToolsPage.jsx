import PageIntro from "../components/PageIntro.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ToolsPage() {
  const { t } = useLanguage();
  return <PageIntro content={t.pageIntros.tools} />;
}
