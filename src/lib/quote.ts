import type { Locale } from "../content/types";
export const WHATSAPP = "https://wa.me/966596073350";
export const EMAIL = "edubridge.tech@gmail.com";
export type Quote = {
  name: string;
  contact: string;
  service: string;
  description: string;
  timeframe: string;
  budget: string;
  consent: boolean;
};
export function validContact(value: string) {
  const s = value.trim();
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ||
    (/^\+?[\d\s()\-]{7,22}$/.test(s) && s.replace(/\D/g, "").length >= 7)
  );
}
export function quoteErrors(
  q: Quote,
  lang: Locale,
): Partial<Record<keyof Quote, string>> {
  const t = (a: string, e: string) => (lang === "ar" ? a : e);
  const errors: Partial<Record<keyof Quote, string>> = {};
  if (q.name.trim().length < 2 || q.name.trim().length > 100)
    errors.name = t(
      "أدخل اسمًا بين حرفين و100 حرف.",
      "Enter a name between 2 and 100 characters.",
    );
  if (!validContact(q.contact))
    errors.contact = t(
      "أدخل بريدًا إلكترونيًا أو رقم هاتف صحيحًا.",
      "Enter a valid email address or phone number.",
    );
  if (!q.service) errors.service = t("اختر نوع الخدمة.", "Choose a service.");
  if (q.description.trim().length < 20 || q.description.trim().length > 2000)
    errors.description = t(
      "اكتب وصفًا بين 20 و2000 حرف.",
      "Write between 20 and 2000 characters.",
    );
  if (!q.timeframe)
    errors.timeframe = t(
      "حدد الإطار الزمني المتوقع.",
      "Choose an expected timeframe.",
    );
  if (!q.consent)
    errors.consent = t(
      "موافقتك مطلوبة لتحضير الرسالة.",
      "Consent is required to prepare the message.",
    );
  return errors;
}
export function quoteMessage(q: Quote, lang: Locale) {
  const labels =
    lang === "ar"
      ? [
          "طلب عرض سعر — مدار",
          "الاسم",
          "وسيلة التواصل",
          "الخدمة",
          "التفاصيل",
          "المدة",
          "الميزانية التقريبية",
        ]
      : [
          "Quotation request — MADAR",
          "Name",
          "Contact",
          "Service",
          "Details",
          "Timeframe",
          "Approximate budget",
        ];
  return [
    labels[0],
    "",
    ...[
      q.name,
      q.contact,
      q.service,
      q.description,
      q.timeframe,
      q.budget || (lang === "ar" ? "غير محددة" : "Not specified"),
    ].map((value, i) => `${labels[i + 1]}: ${value.trim()}`),
  ].join("\n");
}
export function whatsappUrl(q: Quote, lang: Locale) {
  return WHATSAPP + "?text=" + encodeURIComponent(quoteMessage(q, lang));
}
export function emailUrl(q: Quote, lang: Locale) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(lang === "ar" ? "طلب عرض سعر — مدار" : "Quotation request — MADAR")}&body=${encodeURIComponent(quoteMessage(q, lang))}`;
}
