import About from "../components/About.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import SectionPage from "../components/SectionPage.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <SectionPage hero={t.pages.about}>
      <About />
      <WhyChooseUs />
    </SectionPage>
  );
}
