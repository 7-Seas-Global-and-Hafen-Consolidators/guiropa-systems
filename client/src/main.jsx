import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import { RadioPlayerProvider } from "./audio/RadioPlayerContext.jsx";
import PersistentPlayer from "./components/PersistentPlayer.jsx";

import "./styles/global.css";

const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <BrowserRouter
      basename={routerBasename || undefined}
    >
      <LanguageProvider>
        <RadioPlayerProvider>
          <App />
          <PersistentPlayer />
        </RadioPlayerProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
