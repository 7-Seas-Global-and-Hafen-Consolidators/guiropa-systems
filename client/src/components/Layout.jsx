import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import EarthGlobe from "./EarthGlobe.jsx";

export default function Layout() {
  return (
    <>
      <EarthGlobe />
      <div className="app-shell">
        <div id="top" className="scroll-anchor" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
