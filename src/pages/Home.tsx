import { Link } from "react-router-dom";
import { Check, Network } from "lucide-react";
import { useLocale } from "../i18n";
import { projects, categories } from "../content/projects";
import { services } from "../content/services";
import { VideoHero } from "../components/VideoHero";
import { ProjectCard, ProjectVisual, ServiceCard } from "../components/Cards";
import { SectionHeading, TextLink, ScrollReveal, Icon } from "../components/UI";
import {
  FoundersSection,
  ProcessSection,
  QuoteSection,
  AcademyHighlight,
} from "../components/Sections";
export default function Home() {
  const { t, text, path } = useLocale();
  const mizan = projects[0];
  return (
    <>
      <VideoHero />
      <div className="expertise-ribbon">
        <div className="container">
          {[
            ["CYBERSECURITY", "الأمن السيبراني"],
            ["ARTIFICIAL INTELLIGENCE", "الذكاء الاصطناعي"],
            ["DIGITAL SYSTEMS", "الأنظمة الرقمية"],
            ["RESEARCH & EDUCATION", "البحث والتعليم"],
          ].map(([en, ar], i) => (
            <span key={en}>
              <span className="ribbon-marker" aria-hidden="true">
                ✦
              </span>
              {t(ar, en)}
              <small className="mono">0{i + 1}</small>
            </span>
          ))}
        </div>
      </div>
      <section className="section container expertise-section" id="expertise">
        <div className="eyebrow">
          <span className="section-number">01</span>A MULTIDISCIPLINARY
          PERSPECTIVE
        </div>
        <div className="expertise-intro">
          <h2>
            {t("التقنية أقوى،", "Technology is stronger")}
            <br />
            <span>{t("حين تتكامل الخبرات.", "when expertise connects.")}</span>
          </h2>
          <div>
            <p>
              {t(
                "نحن مدار. مبادرة تقنية سعودية تجمع نظم المعلومات والأمن السيبراني والذكاء الاصطناعي في رؤية واحدة: بناء حلول تُفهم، وتُستخدم، وتصنع فرقًا.",
                "We are MADAR. An emerging Saudi initiative connecting information systems, cybersecurity and artificial intelligence to build solutions people can understand, use and learn from.",
              )}
            </p>
            <TextLink to={path("/about")}>
              {t("تعرّف على مدار", "Meet MADAR")}
            </TextLink>
          </div>
        </div>
        <div className="expertise-notes">
          {[
            [
              t("نفكّر بعمق", "Think deeply"),
              t(
                "فهم المشكلة قبل اختيار التقنية.",
                "Understand the problem before choosing technology.",
              ),
            ],
            [
              t("نبني بعناية", "Build carefully"),
              t(
                "مخرجات محددة، وتجربة مدروسة.",
                "Defined deliverables and considered experiences.",
              ),
            ],
            [
              t("نشارك المعرفة", "Share knowledge"),
              t(
                "لأن الأثر يتّسع حين نتعلّم معًا.",
                "Impact grows when we learn together.",
              ),
            ],
          ].map(([title, description], i) => (
            <div key={title}>
              <span className="mono">0{i + 1} /</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-deeper">
        <div className="container">
          <SectionHeading
            number="02"
            label="SELECTED WORK / PROJECT ARCHIVE"
            title={t(
              "من الفكرة، إلى ما تراه.",
              "From an idea to something real.",
            )}
            description={t(
              "مشاريع مختارة من أصول مدار وأعمال أعضاء الفريق. أدلة على التجربة التقنية، مع توضيح المساهمة وحدود كل مشروع.",
              "Selected work from MADAR assets and team member portfolios, with clear attribution and project limitations.",
            )}
            link={path("/projects")}
          />
          <ScrollReveal>
            <article className="featured-project">
              <Link
                className="featured-image"
                tabIndex={-1}
                aria-hidden="true"
                to={path("/projects/mizan")}
              >
                <ProjectVisual project={mizan} large />
              </Link>
              <div className="featured-copy">
                <div className="featured-kicker">
                  <span className="featured-label">
                    {t("في دائرة الضوء", "IN FOCUS")}
                  </span>
                  <span className="mono">01 / GRC</span>
                </div>
                <span className="eyebrow">{text(categories.grc)}</span>
                <h3>
                  {t("ميزان.", "MIZAN.")}
                  <br />
                  <span>{t("حوكمة بوضوح.", "Governance with clarity.")}</span>
                </h3>
                <p>{text(mizan.summary)}</p>
                <div className="project-status">
                  <span className="status-dot" />
                  {text(mizan.status)}
                </div>
                <TextLink to={path("/projects/mizan")}>
                  {t("استكشف المشروع", "Explore the project")}
                </TextLink>
              </div>
            </article>
          </ScrollReveal>
          <div className="featured-grid">
            {projects
              .filter((p) => p.featured && p.slug !== "mizan")
              .map((project, index) => (
                <ScrollReveal key={project.slug}>
                  <ProjectCard project={project} index={index + 1} />
                </ScrollReveal>
              ))}
          </div>
          <div className="archive-link">
            <span className="mono">REAL PROJECTS. TRANSPARENT CONTEXT.</span>
            <TextLink to={path("/projects")}>
              {t("تصفّح مكتبة المشاريع", "Browse the project library")}
            </TextLink>
          </div>
        </div>
      </section>
      <section className="section section-pearl">
        <div className="container">
          <SectionHeading
            number="03"
            label="SOLUTIONS, WITH PURPOSE"
            title={t(
              "حلول متعددة. معيار واحد.",
              "Different solutions. One standard.",
            )}
            description={t(
              "نبدأ بما تحتاجه، ونختار من خبراتنا ما يخدمه. كل خدمة بمخرجات ونطاق يُتفق عليهما بوضوح.",
              "We start with what you need, then connect the right expertise. Every service has a clearly agreed scope and deliverables.",
            )}
            link={path("/services")}
          />
          <div className="service-grid">
            {[
              services[0],
              services[2],
              services[3],
              services[4],
              services[6],
              services[7],
            ].map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="section container why-section">
        <div className="why-art" aria-hidden="true">
          <div className="why-orbit one" />
          <div className="why-orbit two" />
          <div className="why-orbit three" />
          <span>
            IMPACT
            <br />
            <b>BY DESIGN.</b>
          </span>
          <small className="mono">THINK / BUILD / SHARE</small>
        </div>
        <div>
          <div className="eyebrow">
            <span className="section-number">04</span>WHY MADAR
          </div>
          <h2>
            {t("ما نبنيه،", "What we build")}
            <br />
            <span>{t("يبدأ بما نؤمن به.", "starts with what we value.")}</span>
          </h2>
          <p>
            {t(
              "فريق متعدد التخصصات، وطريقة عمل تربط الفهم بالتنفيذ. نعرض ما نعرفه بوضوح، ونكون صريحين بشأن ما يحتاج إلى تحقق.",
              "A multidisciplinary team with a way of working that connects understanding and implementation. We are clear about our knowledge and honest about what needs verification.",
            )}
          </p>
          <ul className="check-list">
            {[
              t(
                "تكامل الأمن والأنظمة والذكاء الاصطناعي",
                "Connected security, systems and AI expertise",
              ),
              t(
                "نطاق ومخرجات موثّقة قبل التنفيذ",
                "Documented scope and deliverables before work",
              ),
              t(
                "مشاريع بروابط وأدلة يمكن الاطلاع عليها",
                "Projects with inspectable references and evidence",
              ),
            ].map((s) => (
              <li key={s}>
                <Check size={17} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section research-home">
        <div className="container research-home-grid">
          <div>
            <div className="eyebrow">
              <span className="section-number">05</span>RESEARCH & INNOVATION
            </div>
            <h2>
              {t("نسأل. نبحث.", "Question. Explore.")}
              <br />
              <span>{t("لنفتح مدارًا جديدًا.", "Open a new orbit.")}</span>
            </h2>
            <p>
              {t(
                "مسار بحثي يربط كشف التسلل الشبكي بالذكاء الاصطناعي القابل للتفسير وإعادة بناء الأدلة الرقمية.",
                "A research direction connecting AI-driven intrusion detection, explainable AI and digital evidence reconstruction.",
              )}
            </p>
            <TextLink to={path("/research")}>
              {t("اطّلع على الإطار البحثي", "Explore the research framework")}
            </TextLink>
          </div>
          <div className="research-graphic" aria-hidden="true">
            <div className="research-node">
              <Icon name="network" />
              <span>NETWORK SIGNALS</span>
            </div>
            <div className="research-connector" />
            <div className="research-core">
              <Network size={54} strokeWidth={0.8} />
              <span>EXPLAINABLE AI</span>
            </div>
            <div className="research-connector" />
            <div className="research-node">
              <Icon name="file" />
              <span>DIGITAL EVIDENCE</span>
            </div>
            <small>CONCEPTUAL RESEARCH FRAMEWORK</small>
          </div>
        </div>
      </section>
      <AcademyHighlight />
      <FoundersSection />
      <ProcessSection />
      <QuoteSection />
    </>
  );
}
