import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import HomePage from "./pages/HomePage.jsx";
import MarvinGayePage from "./pages/MarvinGayePage.jsx";
import GuiropaUnifiedRadioPage from "./pages/GuiropaUnifiedRadioPage.jsx";
import WorldWireContinuousPage from "./pages/WorldWireContinuousPage.jsx";
import NewsTunnelStoryPage from "./pages/NewsTunnelStoryPage.jsx";
import ShowsPage from "./pages/ShowsPage.jsx";
import DecadeArchiveWithNewsPage from "./pages/DecadeArchiveWithNewsPage.jsx";
import DecadeArtistsPage from "./pages/DecadeArtistsPage.jsx";
import ArtistEditorialPage from "./pages/ArtistEditorialPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import SchedulePage from "./SchedulePage.jsx";
import StorePage from "./StorePage.jsx";
import ContactPage from "./ContactPage.jsx";
import AdvertisePassportPowerPage from "./AdvertisePassportPowerPage.jsx";
import SupportPage from "./SupportPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="1977" element={<GuiropaUnifiedRadioPage initialSource="70s" />} />
      <Route path="70s" element={<GuiropaUnifiedRadioPage initialSource="70s" />} />
      <Route path="disco" element={<GuiropaUnifiedRadioPage initialSource="disco-ca" />} />
      <Route path="disco-canada" element={<GuiropaUnifiedRadioPage initialSource="disco-ca" />} />
      <Route path="1986" element={<GuiropaUnifiedRadioPage initialSource="80s-pop" />} />

      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shows" element={<ShowsPage />} />
        <Route path="agenda" element={<ShowsPage />} />
        <Route path="decada/:decade" element={<DecadeArchiveWithNewsPage />} />
        <Route path="decada/:decade/artistas" element={<DecadeArtistsPage />} />
        <Route path="decada/:decade/artistas/:slug" element={<ArtistEditorialPage />} />

        <Route path="marvin-gaye" element={<MarvinGayePage />} />
        <Route path="world-wire" element={<WorldWireContinuousPage />} />
        <Route path="world-wire/:id" element={<NewsTunnelStoryPage />} />
        <Route path="mundo" element={<WorldWireContinuousPage />} />

        <Route path="ouvir" element={<GuiropaUnifiedRadioPage initialSource="guiropa" />} />
        <Route path="listen" element={<GuiropaUnifiedRadioPage initialSource="guiropa" />} />

        <Route path="programacao" element={<SchedulePage />} />
        <Route path="schedule" element={<SchedulePage />} />

        <Route path="loja" element={<StorePage />} />
        <Route path="store" element={<StorePage />} />

        <Route path="contato" element={<ContactPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="anuncie" element={<AdvertisePassportPowerPage />} />
        <Route path="advertise" element={<AdvertisePassportPowerPage />} />

        <Route path="apoie" element={<SupportPage />} />
        <Route path="support" element={<SupportPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
