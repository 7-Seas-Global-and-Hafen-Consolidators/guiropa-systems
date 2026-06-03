import Contact from "../components/Contact.jsx";
import Payment from "../components/Payment.jsx";
import SectionPage from "../components/SectionPage.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <SectionPage hero={t.pages.contact}>
      <Contact />
      <Payment />
    </SectionPage>
  );
}
