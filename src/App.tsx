import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LocaleContext, useLocale } from "./i18n";
import { Navigation, Footer } from "./components/Navigation";
import { pageMeta } from "./lib/seo";
import Home from "./pages/Home";
import Projects, { ProjectDetail } from "./pages/Projects";
import Services, { ServiceDetail } from "./pages/Services";
import {
  About,
  Team,
  Academy,
  Research,
  Contact,
  Privacy,
  Terms,
  NotFound,
} from "./pages/StaticPages";
function RouteEffects() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  useEffect(() => {
    const meta = pageMeta(pathname);
    document.documentElement.lang = meta.lang;
    document.documentElement.dir = meta.lang === "ar" ? "rtl" : "ltr";
    document.title = meta.title;
    const setMeta = (key: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let node = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attr, key);
        document.head.appendChild(node);
      }
      node.content = content;
    };
    setMeta("description", meta.description);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:locale", meta.lang === "ar" ? "ar_SA" : "en_US", true);
    setMeta("robots", meta.known ? "index,follow" : "noindex,follow");
    const origin = import.meta.env.VITE_SITE_URL;
    if (origin) {
      const url =
        origin.replace(/\/$/, "") +
        (pathname.endsWith("/") ? pathname : pathname + "/");
      let canonical = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      setMeta("og:url", url, true);
      document
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((el) => el.remove());
      for (const language of ["ar", "en", "x-default"]) {
        const el = document.createElement("link");
        el.rel = "alternate";
        el.hreflang = language;
        el.href =
          origin.replace(/\/$/, "") +
          (language === "en" ? "/en" : "") +
          (meta.route === "/" ? "/" : meta.route + "/");
        document.head.appendChild(el);
      }
    }
    if (previous.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document
        .querySelector<HTMLElement>("#main")
        ?.focus({ preventScroll: true });
      previous.current = pathname;
    }
  }, [pathname]);
  return null;
}
function LocalizedRoutes() {
  const { path } = useLocale();
  return (
    <>
      <RouteEffects />
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path={path("/")} element={<Home />} />
          <Route path={path("/about")} element={<About />} />
          <Route path={path("/services")} element={<Services />} />
          <Route path={path("/services/:slug")} element={<ServiceDetail />} />
          <Route path={path("/projects")} element={<Projects />} />
          <Route path={path("/projects/:slug")} element={<ProjectDetail />} />
          <Route path={path("/portfolio")} element={<Projects />} />
          <Route path={path("/academy")} element={<Academy />} />
          <Route path={path("/research")} element={<Research />} />
          <Route path={path("/team")} element={<Team />} />
          <Route path={path("/contact")} element={<Contact />} />
          <Route path={path("/privacy")} element={<Privacy />} />
          <Route path={path("/terms")} element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  const { pathname } = useLocation();
  return (
    <LocaleContext.Provider value={pageMeta(pathname).lang}>
      <LocalizedRoutes />
    </LocaleContext.Provider>
  );
}
