import Presence from "../components/Presence.jsx";
import Partners from "../components/Partners.jsx";
import SectionPage from "../components/SectionPage.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function NetworkPage() {
  const { t } = useLanguage();

  return (
    <SectionPage hero={t.pages.network}>
      <Presence />
      <Partners />
    </SectionPage>
  );
}
