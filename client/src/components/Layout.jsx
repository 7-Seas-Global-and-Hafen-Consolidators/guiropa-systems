import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import GuiropaCommercialLayer from "./GuiropaCommercialLayer.jsx";
import GuiropaCommercialFooterDeck from "./GuiropaCommercialFooterDeck.jsx";
import GuiropaCommercialFloat from "./GuiropaCommercialFloat.jsx";
import GuiropaCommercialInterstitial from "./GuiropaCommercialInterstitial.jsx";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <GuiropaCommercialLayer />

      <div className="app-shell guiropa-radio-shell">
        <Outlet />
      </div>

      <GuiropaCommercialInterstitial />
      <GuiropaCommercialFooterDeck />
      <Footer />
      <GuiropaCommercialFloat />
    </>
  );
}
