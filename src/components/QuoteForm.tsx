import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, MessageCircle, Mail } from "lucide-react";
import { useLocale } from "../i18n";
import { services } from "../content/services";
import {
  quoteErrors,
  quoteMessage,
  whatsappUrl,
  emailUrl,
  type Quote,
} from "../lib/quote";
import { Arrow, Modal } from "./UI";
export function QuoteForm({
  initialService = "",
  id = "quote",
}: {
  initialService?: string;
  id?: string;
}) {
  const { lang, t, text, path } = useLocale();
  const safeService = services.some((s) => s.slug === initialService)
    ? initialService
    : "";
  const [values, setValues] = useState<Quote>({
    name: "",
    contact: "",
    service: safeService,
    description: "",
    timeframe: "",
    budget: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Quote, string>>>(
    {},
  );
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState("");
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    setValues((v) => ({ ...v, service: safeService }));
  }, [safeService]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 8000);
    return () => clearTimeout(timer);
  }, [notice]);
  const update = (key: keyof Quote, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  function submit(event: FormEvent) {
    event.preventDefault();
    const found = quoteErrors(values, lang);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setPreview(true);
  }
  const service = services.find((s) => s.slug === values.service);
  const timeframe =
    (
      {
        soon: t("خلال شهر", "Within one month"),
        quarter: t("خلال 1–3 أشهر", "Within 1–3 months"),
        flexible: t("مرن", "Flexible"),
      } as Record<string, string>
    )[values.timeframe] || values.timeframe;
  const messageValues = {
    ...values,
    timeframe,
    service: service ? text(service.title) : values.service,
  };
  const attr = (key: keyof Quote) => ({
    id: `${id}-${key}`,
    name: key,
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });
  const error = (key: keyof Quote) =>
    errors[key] && (
      <span className="field-error" id={`${id}-${key}-error`}>
        {errors[key]}
      </span>
    );
  return (
    <>
      <form ref={form} className="quote-form" onSubmit={submit} noValidate>
        <div className="form-row">
          <label htmlFor={`${id}-name`}>
            {t("الاسم أو الجهة", "Name or organization")}{" "}
            <span aria-hidden="true">*</span>
            <input
              {...attr("name")}
              autoComplete="name"
              maxLength={100}
              required
              placeholder={t("كيف نناديك؟", "How should we address you?")}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {error("name")}
          </label>
          <label htmlFor={`${id}-contact`}>
            {t("بريد إلكتروني أو رقم هاتف", "Email or phone number")}{" "}
            <span aria-hidden="true">*</span>
            <input
              {...attr("contact")}
              autoComplete="email"
              maxLength={160}
              required
              dir="auto"
              placeholder="name@example.com / +966…"
              value={values.contact}
              onChange={(e) => update("contact", e.target.value)}
            />
            {error("contact")}
          </label>
        </div>
        <label htmlFor={`${id}-service`}>
          {t("الخدمة المطلوبة", "Service required")}{" "}
          <span aria-hidden="true">*</span>
          <select
            {...attr("service")}
            required
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">
              {t("اختر الخدمة المناسبة", "Choose a service")}
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {text(s.title)}
              </option>
            ))}
          </select>
          {error("service")}
        </label>
        <label htmlFor={`${id}-description`}>
          {t("أخبرنا عن مشروعك", "Tell us about your project")}{" "}
          <span aria-hidden="true">*</span>
          <textarea
            {...attr("description")}
            required
            rows={4}
            maxLength={2000}
            minLength={20}
            placeholder={t(
              "الفكرة، التحدّي، والمخرجات التي تتطلّع إليها…",
              "The idea, the challenge, and your intended deliverables…",
            )}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
          />
          {error("description")}
        </label>
        <div className="form-row">
          <label htmlFor={`${id}-timeframe`}>
            {t("الإطار الزمني", "Expected timeframe")}{" "}
            <span aria-hidden="true">*</span>
            <select
              {...attr("timeframe")}
              required
              value={values.timeframe}
              onChange={(e) => update("timeframe", e.target.value)}
            >
              <option value="">
                {t("اختر المدة المتوقعة", "Choose a timeframe")}
              </option>
              {[
                ["soon", "خلال شهر", "Within one month"],
                ["quarter", "خلال 1–3 أشهر", "Within 1–3 months"],
                ["flexible", "مرن / نناقشه معًا", "Flexible / let’s discuss"],
              ].map(([value, ar, en]) => (
                <option key={value} value={value}>
                  {t(ar, en)}
                </option>
              ))}
            </select>
            {error("timeframe")}
          </label>
          <label htmlFor={`${id}-budget`}>
            {t("الميزانية التقريبية", "Approximate budget")}{" "}
            <small>{t("(اختياري)", "(optional)")}</small>
            <input
              {...attr("budget")}
              maxLength={100}
              placeholder={t(
                "بالريال السعودي، إن وُجدت",
                "In SAR, if available",
              )}
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
            />
          </label>
        </div>
        <label className="consent" htmlFor={`${id}-consent`}>
          <input
            {...attr("consent")}
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
          />
          <span>
            {t(
              "أوافق على تحضير بيانات الطلب ومشاركتها عبر قناة التواصل التي أختارها. قرأت",
              "I agree to prepare these details and share them through my chosen contact channel. I have read the",
            )}{" "}
            <Link to={path("/privacy")}>
              {t("سياسة الخصوصية", "privacy policy")}
            </Link>
            .
          </span>
        </label>
        {error("consent")}
        <p className="form-note">
          {t(
            "لا يحفظ الموقع بيانات الطلب. ستراجع الرسالة قبل فتح واتساب أو البريد؛ إرسالها يتم بواسطتك. لا تُدخل بيانات حساسة.",
            "The site does not store your inquiry. Review the message before opening WhatsApp or email; you send it yourself. Do not include sensitive data.",
          )}
        </p>
        <button type="submit" className="button button-primary form-submit">
          {t("مراجعة طلب عرض السعر", "Review quotation request")}
          <Arrow />
        </button>
        <div role="status" aria-live="polite" className="form-status">
          {notice && (
            <>
              <Check size={16} />
              {notice}
            </>
          )}
        </div>
      </form>
      <Modal
        open={preview}
        onClose={() => setPreview(false)}
        title={t(
          "راجع رسالتك واختر قناة التواصل",
          "Review your message and choose a channel",
        )}
      >
        <p>
          {t(
            "هذه معاينة محلية. لم تُرسل الرسالة إلى مدار بعد.",
            "This is a local preview. Your message has not been sent to MADAR.",
          )}
        </p>
        <pre className="quote-preview">{quoteMessage(messageValues, lang)}</pre>
        <div className="modal-actions">
          <a
            className="button button-primary"
            href={whatsappUrl(messageValues, lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              setNotice(
                t(
                  "رابط واتساب جاهز. أكمل الإرسال في واتساب.",
                  "WhatsApp link prepared. Complete sending in WhatsApp.",
                ),
              )
            }
          >
            <MessageCircle size={18} />
            {t("فتح واتساب", "Open WhatsApp")}
          </a>
          <a
            className="button button-secondary"
            href={emailUrl(messageValues, lang)}
          >
            <Mail size={18} />
            {t("فتح تطبيق البريد", "Open email app")}
          </a>
        </div>
      </Modal>
    </>
  );
}
