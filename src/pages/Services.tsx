import { useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { services } from "../content/services";
import { projects } from "../content/projects";
import { useLocale } from "../i18n";
import {
  PageIntro,
  SectionHeading,
  Button,
  Icon,
  Accordion,
} from "../components/UI";
import { ServiceCard, ProjectCard } from "../components/Cards";
import { ProcessSection } from "../components/Sections";
import { NotFound } from "./StaticPages";
export default function Services() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        label="OUR EXPERTISE / YOUR NEXT STEP"
        title={t("نحوّل احتياجك إلى حل.", "From your needs to a solution.")}
        description={t(
          "تخصصات متعددة، ومنهج واحد: فهم دقيق، نطاق واضح، وتنفيذ مدروس. نحدد ما يناسب مشروعك قبل الاتفاق على التكلفة.",
          "Multiple disciplines, one approach: careful understanding, a clear scope and thoughtful execution. We define what fits your project before agreeing the cost.",
        )}
      />
      <section className="section section-pearl">
        <div className="container service-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
      <ProcessSection />
    </>
  );
}
export function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const { t, text, path } = useLocale();
  if (!service) return <NotFound />;
  const examples = projects.filter((p) => service.examples.includes(p.slug));
  return (
    <>
      <PageIntro
        label={service.subtitle}
        title={text(service.title)}
        description={text(service.overview)}
      />
      <section className="section container">
        <div className="detail-grid">
          <article>
            <div className="detail-service-icon">
              <Icon name={service.icon} size={48} />
            </div>
            <h2>
              {t(
                "مخرجات تُبنى على احتياجك.",
                "Deliverables shaped around your needs.",
              )}
            </h2>
            <p>
              {t(
                "هذه أمثلة للمخرجات المعتادة. النطاق النهائي والمدة يُحددان بعد مراجعة متطلبات المشروع.",
                "These are typical deliverable examples. Final scope and timing follow a review of project requirements.",
              )}
            </p>
            <ul className="deliverable-list">
              {service.deliverables.map((d, i) => (
                <li key={d.en}>
                  <span className="mono">0{i + 1}</span>
                  {text(d)}
                  <Check size={18} />
                </li>
              ))}
            </ul>
            <h2 className="detail-label">
              {t("لمن هذه الخدمة؟", "Who is it for?")}
            </h2>
            <p>{text(service.audience)}</p>
            <h2 className="detail-label">
              {t("كيف نعمل عليها؟", "How do we approach it?")}
            </h2>
            <p>{text(service.approach)}</p>
          </article>
          <aside className="detail-sidebar">
            <div className="eyebrow">LET’S DEFINE YOUR SCOPE</div>
            <h3>
              {t(
                "لديك احتياج في هذا المجال؟",
                "Working on something in this area?",
              )}
            </h3>
            <p>
              {t(
                "أخبرنا عن مشروعك، ونتناقش في النطاق والمخرجات قبل تقديم عرض سعر مخصص.",
                "Tell us about your project. We discuss scope and deliverables before preparing a tailored quotation.",
              )}
            </p>
            <Button to={path("/contact") + "?service=" + service.slug}>
              {t("اطلب عرض سعر", "Request a quotation")}
            </Button>
            <p className="small-note">
              {t(
                "مدار مبادرة تقنية في مرحلة التأسيس. لا تدّعي اعتمادًا أو ترخيصًا مهنيًا غير موثق.",
                "MADAR is an emerging technology initiative. No undocumented accreditation or professional license is claimed.",
              )}
            </p>
          </aside>
        </div>
      </section>
      {examples.length > 0 && (
        <section className="section section-deeper">
          <div className="container">
            <SectionHeading
              label="RELATED EXPERIENCE"
              title={t("مشاريع من هذا المجال.", "Explore related projects.")}
              description={t(
                "أمثلة تقنية من الحافظة، وليست دليلًا على عقود تجارية أو نتائج مضمونة.",
                "Portfolio examples, not evidence of commercial contracts or guaranteed outcomes.",
              )}
            />
            <div className="featured-grid">
              {examples.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section container narrow">
        <SectionHeading
          label="GOOD QUESTIONS"
          title={t("قبل أن نبدأ.", "Before we begin.")}
        />
        <Accordion
          items={service.faq.map((f) => ({
            question: text(f.question),
            answer: text(f.answer),
          }))}
        />
      </section>
    </>
  );
}
