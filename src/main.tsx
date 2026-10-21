import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";

import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";

import "./styles/tokens.css";
import "./styles/site.css";
const root = document.getElementById("root")!;
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const app = (
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
if (root.dataset.prerender === "true") hydrateRoot(root, app);
else createRoot(root).render(app);
