import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ListenPage from "./ListenPage.jsx";
import SchedulePage from "./SchedulePage.jsx";
import StorePage from "./StorePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="ouvir" element={<ListenPage />} />
        <Route path="programacao" element={<SchedulePage />} />
        <Route path="loja" element={<StorePage />} />
      </Route>
    </Routes>
  );
}
