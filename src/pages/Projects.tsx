import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Search, X, ExternalLink, Expand, Check } from "lucide-react";
import { projects, categories } from "../content/projects";

import { ProjectCard, ProjectVisual } from "../components/Cards";
import {
  PageIntro,
  Modal,
  asset,
  Button,
  SectionHeading,
  TextLink,
} from "../components/UI";
import { useLocale } from "../i18n";
import { NotFound } from "./StaticPages";
export default function Projects() {
  const { t, text } = useLocale();
  const [params, setParams] = useSearchParams();
  const readFilters = (value: URLSearchParams) => ({
    search: value.get("q") || "",
    category: value.get("category") || "all",
    featured: value.get("featured") === "true",
  });
  const [{ search, category, featured }, setFilters] = useState(() =>
    readFilters(params),
  );
  useEffect(() => setFilters(readFilters(params)), [params]);
  function change(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setFilters(readFilters(next));
    setParams(next, { replace: true, preventScrollReset: true });
  }
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u064B-\u065F]/g, "")
      .replace(/[أإآ]/g, "ا");
  const filtered = projects.filter(
    (p) =>
      (category === "all" || category === p.category) &&
      (!featured || p.featured) &&
      normalize(
        [p.title.ar, p.title.en, p.summary.ar, p.summary.en, ...p.stack].join(
          " ",
        ),
      ).includes(normalize(search.trim())),
  );
  return (
    <>
      <PageIntro
        label="PROJECT ARCHIVE"
        title={t("أعمال لها سياق. وأثر.", "Work with context. And purpose.")}
        description={t(
          "استكشف مشاريع مدار وأعمال أعضاء الفريق. نربط كل وصف بما يتوفر من توثيق، ونوضح حدود الجاهزية ونسبة المساهمات.",
          "Explore MADAR assets and team member projects. Every description is grounded in available evidence, with readiness limits and attribution made explicit.",
        )}
      />
      <section className="section container">
        <div className="project-toolbar">
          <div className="search-field">
            <Search size={20} aria-hidden="true" />
            <label className="sr-only" htmlFor="project-search">
              {t("ابحث في المشاريع", "Search projects")}
            </label>
            <input
              id="project-search"
              value={search}
              onChange={(e) => change("q", e.target.value)}
              placeholder={t(
                "ابحث باسم المشروع أو التقنية…",
                "Search by project or technology…",
              )}
            />
            {search && (
              <button
                className="icon-button"
                onClick={() => change("q", "")}
                aria-label={t("مسح البحث", "Clear search")}
              >
                <X size={17} />
              </button>
            )}
          </div>
          <label className="featured-checkbox">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                change("featured", e.target.checked ? "true" : "")
              }
            />
            {t("المشاريع المختارة فقط", "Featured projects only")}
          </label>
        </div>
        <div
          className="filters"
          aria-label={t("تصفية المشاريع", "Project filters")}
        >
          <button
            aria-pressed={category === "all"}
            onClick={() => change("category", "all")}
          >
            {t("جميع الأعمال", "All work")}
            <span>{projects.length}</span>
          </button>
          {Object.entries(categories).map(([key, name]) => (
            <button
              aria-pressed={category === key}
              key={key}
              onClick={() => change("category", key)}
            >
              {text(name)}
            </button>
          ))}
        </div>
        <p className="results-count" role="status" aria-live="polite">
          {t(
            `عرض ${filtered.length} من ${projects.length} مشروعًا`,
            `Showing ${filtered.length} of ${projects.length} projects`,
          )}
        </p>
        {filtered.length ? (
          <div className="project-library">
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={40} />
            <h2>{t("لم نجد مشروعًا مطابقًا.", "No matching projects.")}</h2>
            <p>
              {t(
                "جرّب كلمة أخرى أو أزل التصفية.",
                "Try another keyword or clear the filters.",
              )}
            </p>
            <button
              className="button button-secondary"
              onClick={() => setParams({})}
            >
              {t("مسح جميع الفلاتر", "Clear all filters")}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { t, text, path } = useLocale();
  const [image, setImage] = useState<string | null>(null);
  if (!project) return <NotFound />;
  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  return (
    <>
      <PageIntro
        label="PROJECT FILE / CASE STUDY"
        title={text(project.title)}
        description={text(project.summary)}
      />
      <section className="section container project-detail">
        <div className="detail-visual">
          <ProjectVisual project={project} large />
          {project.images && (
            <button
              className="image-expand"
              onClick={() => setImage(project.images![0])}
            >
              <Expand size={17} />
              {t("اعرض اللقطة كاملة", "View full screenshot")}
            </button>
          )}
        </div>
        <div className="detail-facts">
          <div>
            <span>{t("المجال", "Discipline")}</span>
            <strong>{text(categories[project.category])}</strong>
          </div>
          <div>
            <span>{t("حالة الدليل", "Evidence status")}</span>
            <strong>{text(project.status)}</strong>
          </div>
          <div>
            <span>{t("نسبة العمل", "Attribution")}</span>
            <strong>{text(project.attribution)}</strong>
          </div>
        </div>
        <div className="detail-grid">
          <article>
            <div className="eyebrow">01 / CONTEXT</div>
            <h2>{t("التحدّي والسياق", "Challenge & context")}</h2>
            <p>{text(project.challenge)}</p>
            <div className="eyebrow detail-label">02 / APPROACH</div>
            <h2>{t("منهج الحل", "Solution approach")}</h2>
            <p>{text(project.approach)}</p>
            {project.capabilities.length > 0 && (
              <>
                <div className="eyebrow detail-label">
                  03 / DOCUMENTED CAPABILITIES
                </div>
                <h2>
                  {t(
                    "ما يدعمه الدليل المتاح",
                    "What the available evidence supports",
                  )}
                </h2>
                <ul className="check-list">
                  {project.capabilities.map((c) => (
                    <li key={c.en}>
                      <Check size={17} />
                      {text(c)}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {project.images && (
              <div className="screenshot-gallery">
                {project.images.map((file) => (
                  <button
                    key={file}
                    onClick={() => setImage(file)}
                    aria-label={
                      t("تكبير لقطة ", "Enlarge screenshot ") +
                      text(project.title)
                    }
                  >
                    <img
                      loading="lazy"
                      src={asset("projects/" + file)}
                      width="800"
                      height="450"
                      alt={t(
                        "لقطة أصلية من المشروع",
                        "Original project screenshot",
                      )}
                    />
                    <Expand size={18} />
                  </button>
                ))}
              </div>
            )}
          </article>
          <aside className="detail-sidebar">
            <div className="eyebrow">PROJECT RESOURCES</div>
            <h3>{t("التقنيات والمراجع", "Technology & references")}</h3>
            {project.stack.length ? (
              <div className="tags">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            ) : (
              <p>
                {t(
                  "لم تتوفر وثائق كافية للتحقق من التقنيات المستخدمة.",
                  "No sufficient technical documentation was available to verify the technology stack.",
                )}
              </p>
            )}
            {project.repo && (
              <a
                className="resource-link"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("مرجع المستودع", "Repository reference")}
                <ExternalLink size={16} />
              </a>
            )}
            {project.source && (
              <a
                className="resource-link"
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("التوثيق الأصلي README", "Original README")}
                <ExternalLink size={16} />
              </a>
            )}
            {project.demo && (
              <a
                className="resource-link"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("العرض التجريبي الثابت", "Static demo showcase")}
                <ExternalLink size={16} />
              </a>
            )}
            <p className="small-note">
              {t(
                "تاريخ مراجعة المصادر: 22 أكتوبر 2026. الوصف وفق الوثائق المتاحة، ولا يمثل تحققًا مستقلًا من الأداء أو نتائج المشروع.",
                "Sources reviewed on 22 October 2026. Descriptions follow available documentation and do not represent independent performance or outcome verification.",
              )}
            </p>
            <Button to={path("/contact")}>
              {t("ناقش مشروعًا مشابهًا", "Discuss a similar project")}
            </Button>
          </aside>
        </div>
        <TextLink to={path("/projects")}>
          {t("العودة إلى جميع الأعمال", "Back to all projects")}
        </TextLink>
      </section>
      {related.length > 0 && (
        <section className="section section-deeper">
          <div className="container">
            <SectionHeading
              label="KEEP EXPLORING"
              title={t("من المدار نفسه.", "In the same orbit.")}
            />
            <div className="featured-grid">
              {related.map((p, i) => (
                <ProjectCard project={p} index={i} key={p.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
      <Modal
        wide
        open={!!image}
        onClose={() => setImage(null)}
        title={
          t("لقطة أصلية — ", "Original screenshot — ") + text(project.title)
        }
      >
        {image && (
          <img
            className="full-screenshot"
            src={asset("projects/" + image)}
            alt={t(
              "لقطة كاملة من الواجهة الأصلية",
              "Full original interface screenshot",
            )}
          />
        )}
      </Modal>
    </>
  );
}
