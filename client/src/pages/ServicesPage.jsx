import Services from "../components/Services.jsx";
import Corridor from "../components/Corridor.jsx";
import SectionPage from "../components/SectionPage.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <SectionPage hero={t.pages.services}>
      <Services />
      <Corridor />
    </SectionPage>
  );
}
