import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import NetworkPage from "./pages/NetworkPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";
import QuotePage from "./pages/QuotePage.jsx";
import CareersPage from "./pages/CareersPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="servicos" element={<ServicesPage />} />
        <Route path="rede-global" element={<NetworkPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="simuladores" element={<ToolsPage />} />
        <Route path="orcamento" element={<QuotePage />} />
        <Route path="trabalhe-conosco" element={<CareersPage />} />
      </Route>
    </Routes>
  );
}
