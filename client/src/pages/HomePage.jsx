import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import Presence from "../components/Presence.jsx";
import Corridor from "../components/Corridor.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Partners from "../components/Partners.jsx";
import Payment from "../components/Payment.jsx";
import ActionHub from "../components/ActionHub.jsx";
import Contact from "../components/Contact.jsx";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Presence />
      <Corridor />
      <WhyChooseUs />
      <Partners />
      <Payment />
      <ActionHub />
      <Contact />
    </main>
  );
}
