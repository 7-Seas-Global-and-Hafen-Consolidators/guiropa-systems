import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import GuiropaCommercialFooterDeck from "./GuiropaCommercialFooterDeck.jsx";
import HomeNewsTunnel from "./HomeNewsTunnel.jsx";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="app-shell guiropa-radio-shell"><Outlet /></div>
      {isHome ? <HomeNewsTunnel /> : null}
      <GuiropaCommercialFooterDeck />
      <Footer />
    </>
  );
}
