import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import HomePage from "./pages/HomePage.jsx";
import MarvinGayePage from "./pages/MarvinGayePage.jsx";
import Guiropa70sTunnelPage from "./pages/Guiropa70sTunnelPage.jsx";
import Guiropa80sTunnelPage from "./pages/Guiropa80sTunnelPage.jsx";
import WorldWireContinuousPage from "./pages/WorldWireContinuousPage.jsx";
import NewsTunnelStoryPage from "./pages/NewsTunnelStoryPage.jsx";

import ListenPage from "./ListenPage.jsx";
import SchedulePage from "./SchedulePage.jsx";
import StorePage from "./StorePage.jsx";
import ContactPage from "./ContactPage.jsx";
import AdvertisePage from "./AdvertisePage.jsx";
import SupportPage from "./SupportPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="1977" element={<Guiropa70sTunnelPage />} />
      <Route path="70s" element={<Guiropa70sTunnelPage />} />
      <Route path="1986" element={<Guiropa80sTunnelPage />} />

      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="marvin-gaye" element={<MarvinGayePage />} />
        <Route path="world-wire" element={<WorldWireContinuousPage />} />
        <Route path="world-wire/:id" element={<NewsTunnelStoryPage />} />
        <Route path="mundo" element={<WorldWireContinuousPage />} />

        <Route path="ouvir" element={<ListenPage />} />
        <Route path="listen" element={<ListenPage />} />

        <Route path="programacao" element={<SchedulePage />} />
        <Route path="schedule" element={<SchedulePage />} />

        <Route path="loja" element={<StorePage />} />
        <Route path="store" element={<StorePage />} />

        <Route path="contato" element={<ContactPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="anuncie" element={<AdvertisePage />} />
        <Route path="advertise" element={<AdvertisePage />} />

        <Route path="apoie" element={<SupportPage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>
    </Routes>
  );
}
