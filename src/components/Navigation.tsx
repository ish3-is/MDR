import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  Globe2,
  Mail,
  Github,
  MessageCircle,
} from "lucide-react";
import { useLocale, navigation } from "../i18n";
import { services } from "../content/services";
import { asset, Arrow, Button, Icon, Modal } from "./UI";
import { EMAIL, WHATSAPP } from "../lib/quote";
export function Brand() {
  const { t, path } = useLocale();
  return (
    <Link
      className="brand"
      to={path("/")}
      aria-label={t("مدار — الرئيسية", "MADAR — Home")}
    >
      <img
        src={asset("brand/madar-192.webp")}
        width="72"
        height="72"
        alt={t("شعار مدار الأصلي", "Original MADAR logo")}
      />
      <span className="brand-caption">
        {t("معرفة. هندسة. أثر.", "Knowledge. Engineering. Impact.")}
        <small>TECHNOLOGY & INNOVATION</small>
      </span>
    </Link>
  );
}
export function Navigation() {
  const { lang, t, text, path } = useLocale();
  const location = useLocation();
  const [mobile, setMobile] = useState(false);
  const [mega, setMega] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaButton = useRef<HTMLButtonElement>(null);
  const raw = location.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const alternate =
    (lang === "ar" ? "/en" : "") + (raw === "/" ? "/" : raw) + location.search;
  useEffect(() => {
    setMobile(false);
    setMega(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!mega) return;
    function click(event: PointerEvent) {
      if (!megaRef.current?.contains(event.target as Node)) setMega(false);
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMega(false);
        megaButton.current?.focus();
      }
    }
    document.addEventListener("pointerdown", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", click);
      document.removeEventListener("keydown", key);
    };
  }, [mega]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("انتقل إلى المحتوى", "Skip to content")}
      </a>
      <header className="header">
        <div className="container navigation">
          <Brand />
          <nav
            className="desktop-nav"
            aria-label={t("التنقل الرئيسي", "Main navigation")}
          >
            {navigation.map((n) =>
              n.path === "/services" ? (
                <div
                  className="mega-wrap"
                  ref={megaRef}
                  key={n.path}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setMega(false);
                  }}
                >
                  <div className="nav-service">
                    <NavLink to={path(n.path)}>{n[lang]}</NavLink>
                    <button
                      ref={megaButton}
                      className="mega-toggle"
                      aria-label={t("عرض قائمة الخدمات", "Open services menu")}
                      aria-expanded={mega}
                      aria-controls="services-menu"
                      onClick={() => setMega(!mega)}
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>
                  {mega && (
                    <div id="services-menu" className="mega-menu">
                      <div className="mega-intro">
                        <span className="eyebrow">OUR CAPABILITIES</span>
                        <h2>{t("تخصصات تتكامل.", "Connected expertise.")}</h2>
                        <Link to={path("/services")}>
                          {t("جميع الخدمات", "All services")}
                          <Arrow />
                        </Link>
                      </div>
                      <div className="mega-grid">
                        {services.slice(0, 8).map((s) => (
                          <Link key={s.slug} to={path("/services/" + s.slug)}>
                            <Icon name={s.icon} size={21} />
                            <span>{text(s.title)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink end={n.path === "/"} to={path(n.path)} key={n.path}>
                  {n[lang]}
                </NavLink>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <Link
              className="language-switch"
              to={alternate}
              aria-label={t("Switch to English", "التبديل إلى العربية")}
            >
              <Globe2 size={15} />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </Link>
            <Button to={path("/contact")} className="nav-quote">
              {t("اطلب عرض سعر", "Get a quote")}
            </Button>
            <button
              className="mobile-toggle icon-button"
              aria-label={t("فتح قائمة التنقل", "Open navigation")}
              aria-expanded={mobile}
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <Modal
        open={mobile}
        onClose={() => setMobile(false)}
        title={t("استكشف مدار", "Explore MADAR")}
      >
        <nav
          className="mobile-nav"
          aria-label={t("قائمة الهاتف", "Mobile navigation")}
        >
          {navigation.map((n, i) => (
            <NavLink
              end={n.path === "/"}
              key={n.path}
              to={path(n.path)}
              onClick={() => setMobile(false)}
            >
              <span className="mono">0{i + 1}</span>
              {n[lang]}
              <Arrow />
            </NavLink>
          ))}
          <Button to={path("/contact")}>
            {t("اطلب عرض سعر", "Get a quote")}
          </Button>
        </nav>
      </Modal>
    </>
  );
}
export function Footer() {
  const { lang, t, path } = useLocale();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <span className="eyebrow">THE NEXT ORBIT STARTS WITH YOU</span>
            <h2>
              {t("لنفكّر أبعد. ونبني معًا.", "Think further. Build together.")}
            </h2>
          </div>
          <Button to={path("/contact")}>
            {t("لنتحدث عن مشروعك", "Let’s discuss your project")}
          </Button>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              {t(
                "مبادرة تقنية سعودية في مرحلة التأسيس. نجمع الخبرات لصناعة حلول مدروسة ومشاركة المعرفة.",
                "An emerging Saudi technology initiative, connecting expertise to build thoughtful solutions and share knowledge.",
              )}
            </p>
            <div className="footer-social">
              <a
                href="https://github.com/ish3-is"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={19} />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("واتساب مدار", "MADAR WhatsApp")}
              >
                <MessageCircle size={19} />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label={t("البريد الإلكتروني", "Email")}
              >
                <Mail size={19} />
              </a>
            </div>
          </div>
          <div>
            <h3>{t("استكشف", "Explore")}</h3>
            {navigation.slice(1, 5).map((n) => (
              <Link key={n.path} to={path(n.path)}>
                {n[lang]}
              </Link>
            ))}
          </div>
          <div>
            <h3>{t("المعرفة والفريق", "Knowledge & people")}</h3>
            {navigation.slice(5).map((n) => (
              <Link key={n.path} to={path(n.path)}>
                {n[lang]}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/company/mdr-org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <Arrow size={13} />
            </a>
          </div>
          <div>
            <h3>{t("نبدأ بمحادثة", "Start a conversation")}</h3>
            <a dir="ltr" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <a
              dir="ltr"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              +966 59 607 3350
            </a>
            <span className="location-label">
              {t("المملكة العربية السعودية", "Saudi Arabia")}
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MADAR.{" "}
            {t("جميع الحقوق محفوظة.", "All rights reserved.")}
          </span>
          <div>
            <Link to={path("/privacy")}>{t("الخصوصية", "Privacy")}</Link>
            <Link to={path("/terms")}>{t("شروط الاستخدام", "Terms")}</Link>
          </div>
        </div>
        <p className="legal-note">
          {t(
            "مدار مبادرة في مرحلة التأسيس، وليست منشأة تجارية مسجلة أو جهة اعتماد حاليًا.",
            "MADAR is an emerging initiative, not currently a registered commercial entity or an accreditation body.",
          )}
        </p>
      </div>
    </footer>
  );
}
