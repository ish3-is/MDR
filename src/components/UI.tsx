import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpLeft,
  ArrowUpRight,
  X,
  ShieldCheck,
  Activity,
  Scale,
  Code2,
  BrainCircuit,
  ChartNoAxesCombined,
  Network,
  BookOpen,
  UserRound,
  FileText,
  GraduationCap,
} from "lucide-react";
import { useLocale } from "../i18n";
export const asset = (path: string) => import.meta.env.BASE_URL + path;
export function Arrow({ size = 18 }: { size?: number }) {
  return useLocale().lang === "ar" ? (
    <ArrowUpLeft size={size} aria-hidden="true" />
  ) : (
    <ArrowUpRight size={size} aria-hidden="true" />
  );
}
export function Button({
  to,
  children,
  secondary = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <Arrow />
    </Link>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
  link,
}: {
  number?: string;
  label: string;
  title: string;
  description?: string;
  link?: string;
}) {
  const { t } = useLocale();
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          {number && <span className="section-number">{number}</span>}
          {label}
        </div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && (
        <TextLink to={link}>{t("استكشف المزيد", "Explore more")}</TextLink>
      )}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  const { t, path } = useLocale();
  return (
    <section className="page-intro">
      <div className="container">
        <nav
          aria-label={t("مسار التنقل", "Breadcrumb")}
          className="breadcrumbs"
        >
          <Link to={path("/")}>{t("الرئيسية", "Home")}</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>
        <div className="eyebrow">{label}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <span className="intro-orbit" aria-hidden="true" />
    </section>
  );
}
export function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const icons: Record<string, typeof ShieldCheck> = {
    shield: ShieldCheck,
    activity: Activity,
    scale: Scale,
    code: Code2,
    brain: BrainCircuit,
    chart: ChartNoAxesCombined,
    network: Network,
    book: BookOpen,
    user: UserRound,
    file: FileText,
    grad: GraduationCap,
  };
  const Component = icons[name] || Code2;
  return <Component size={size} strokeWidth={1.35} aria-hidden="true" />;
}
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useLocale();
  useEffect(() => {
    if (!open || !ref.current) return;
    const previous = document.activeElement as HTMLElement;
    ref.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      ref.current?.close();
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""}`}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const nodes = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]',
          ),
        ].filter((el) => el.getClientRects().length > 0);
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
      aria-label={title}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label={t("إغلاق", "Close")}
          autoFocus
        >
          <X size={22} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <details key={i}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !ref.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          ref.current?.classList.add("reveal-seen");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!ref.current || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        setCount(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{count}</span>
    </span>
  );
}
