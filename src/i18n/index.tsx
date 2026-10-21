import { createContext, useContext } from "react";
import type { Locale, Localized } from "../content/types";
export const LocaleContext = createContext<Locale>("ar");
export function useLocale() {
  const lang = useContext(LocaleContext);
  return {
    lang,
    t: (ar: string, en: string) => (lang === "ar" ? ar : en),
    text: (value: Localized) => value[lang],
    path: (route: string) =>
      (lang === "en" ? "/en" : "") + (route === "/" ? "/" : route),
  };
}
export const navigation = [
  { path: "/", ar: "الرئيسية", en: "Home" },
  { path: "/about", ar: "عن مدار", en: "About" },
  { path: "/services", ar: "خدماتنا", en: "Services" },
  { path: "/projects", ar: "أعمالنا", en: "Projects" },
  { path: "/academy", ar: "الأكاديمية", en: "Academy" },
  { path: "/research", ar: "الأبحاث والمعرفة", en: "Research" },
  { path: "/team", ar: "الفريق", en: "Team" },
  { path: "/contact", ar: "تواصل معنا", en: "Contact" },
];
