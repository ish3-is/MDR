import { projects } from "../content/projects";
import { services } from "../content/services";
import type { Locale } from "../content/types";
const pages: Record<string, { ar: [string, string]; en: [string, string] }> = {
  "/": {
    ar: [
      "نصنع التقنية. ونوسّع أثرها.",
      "مدار مبادرة تقنية سعودية تجمع الحلول الرقمية والأمن السيبراني والذكاء الاصطناعي والبحث والتعليم.",
    ],
    en: [
      "We build technology. And extend its impact.",
      "MADAR is an emerging Saudi initiative connecting digital solutions, cybersecurity, artificial intelligence, research and learning.",
    ],
  },
  "/about": {
    ar: ["عن مدار", "تعرف على رؤية مدار وقيمها وفريق تأسيسها متعدد التخصصات."],
    en: [
      "About MADAR",
      "Explore MADAR’s vision, principles and multidisciplinary founding team.",
    ],
  },
  "/services": {
    ar: [
      "خدماتنا",
      "حلول تقنية وخدمات أمن سيبراني وأنظمة وذكاء اصطناعي وتدريب بنطاق واضح ومخرجات متفق عليها.",
    ],
    en: [
      "Our services",
      "Explore scoped cybersecurity, digital systems, AI, infrastructure and technical education services.",
    ],
  },
  "/projects": {
    ar: [
      "أعمالنا",
      "مكتبة مشاريع مدار وأعضاء الفريق مع البحث والتصفية ومراجع التوثيق ونسبة العمل.",
    ],
    en: [
      "Project archive",
      "Search MADAR assets and team member projects with source references and clear attribution.",
    ],
  },
  "/academy": {
    ar: [
      "أكاديمية مدار",
      "محتوى تعليمي وقنوات معرفة ومعسكر الاختراق الأخلاقي السابق والمسارات المخططة.",
    ],
    en: [
      "MADAR Academy",
      "Learning channels, the previously delivered ethical hacking bootcamp and planned learning directions.",
    ],
  },
  "/research": {
    ar: [
      "الأبحاث والمعرفة",
      "استكشاف كشف التسلل الشبكي والذكاء الاصطناعي القابل للتفسير وإعادة بناء الأدلة الرقمية.",
    ],
    en: [
      "Research & knowledge",
      "Exploring AI-driven network intrusion detection, explainable AI and digital evidence reconstruction.",
    ],
  },
  "/team": {
    ar: [
      "فريق مدار",
      "فريق التأسيس والقيادة: مشعل الجذمي وريماس القحطاني والجوري المعاوي، والمساهمون التقنيون.",
    ],
    en: [
      "Our people",
      "Meet founding leadership members Meshal Aljathmi, Remas Alqahtani and Aljory Almaawi, and technical contributors.",
    ],
  },
  "/contact": {
    ar: [
      "تواصل واطلب عرض سعر",
      "جهز طلب عرض سعر من مدار عبر واتساب أو البريد مع معاينة محلية وخصوصية واضحة.",
    ],
    en: [
      "Contact & quotations",
      "Prepare a MADAR quotation inquiry through WhatsApp or email with local review and clear privacy information.",
    ],
  },
  "/privacy": {
    ar: [
      "سياسة الخصوصية",
      "تعرف كيف يتعامل موقع مدار مع نماذج التواصل والروابط الخارجية وبيانات الزيارة.",
    ],
    en: [
      "Privacy policy",
      "How MADAR handles contact forms, external links and website visits.",
    ],
  },
  "/terms": {
    ar: [
      "شروط الاستخدام",
      "حدود استخدام موقع مدار والمشاريع المعروضة وطلبات الخدمات.",
    ],
    en: [
      "Terms of use",
      "Website use, project evidence and service inquiry terms.",
    ],
  },
};
export function pageMeta(pathname: string) {
  const lang: Locale = /^\/en(?:\/|$)/.test(pathname) ? "en" : "ar";
  const originalRoute =
    pathname.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, "") || "/";
  const route = originalRoute === "/portfolio" ? "/projects" : originalRoute;
  const detail = route.startsWith("/projects/")
    ? projects.find((p) => p.slug === route.split("/")[2])
    : route.startsWith("/services/")
      ? services.find((s) => s.slug === route.split("/")[2])
      : undefined;
  const copy = detail
    ? [
        detail.title[lang],
        "summary" in detail ? detail.summary[lang] : detail.overview[lang],
      ]
    : pages[route]?.[lang] || [
        lang === "ar" ? "الصفحة غير موجودة" : "Page not found",
        lang === "ar"
          ? "هذا المسار غير متاح في موقع مدار."
          : "This page is not available on the MADAR website.",
      ];
  return {
    lang,
    route,
    title: `${copy[0]} | MADAR — مدار`,
    description: copy[1],
    known: !!detail || !!pages[route],
  };
}
export const publicRoutes = [
  ...Object.keys(pages),
  ...services.map((s) => "/services/" + s.slug),
  ...projects.map((p) => "/projects/" + p.slug),
];
