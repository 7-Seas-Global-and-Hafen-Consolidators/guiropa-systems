import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx";

import HomePage from "./pages/HomePage.jsx";

import ListenPage from "./ListenPage.jsx";
import SchedulePage from "./SchedulePage.jsx";
import StorePage from "./StorePage.jsx";
import ContactPage from "./ContactPage.jsx";
import AdvertisePage from "./AdvertisePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

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
      </Route>
    </Routes>
  );
}
