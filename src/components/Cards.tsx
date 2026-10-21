import { Link } from "react-router-dom";
import {
  ExternalLink,
  ScanLine,
  Layers2,
  Shield,
  Scale,
  Network,
} from "lucide-react";
import { categories } from "../content/projects";
import { type Project, type Service } from "../content/types";
import { founders } from "../content/people";
import { useLocale } from "../i18n";
import { Arrow, asset, Icon } from "./UI";
export function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const { t, text } = useLocale();
  const ConceptIcon =
    project.category === "cyber"
      ? Shield
      : project.category === "grc"
        ? Scale
        : project.category === "systems"
          ? Layers2
          : Network;
  return (
    <div
      className={`project-visual project-${project.category} ${large ? "project-visual-large" : ""}`}
    >
      {project.images?.length ? (
        <img
          src={asset("projects/" + project.images[0])}
          width="1600"
          height="900"
          loading="lazy"
          alt={
            t("لقطة أصلية من ", "Original screenshot of ") + text(project.title)
          }
        />
      ) : (
        <div className="project-concept">
          <div className="concept-orbit" />
          <div className="concept-icon">
            <ConceptIcon size={large ? 66 : 48} strokeWidth={0.8} />
            <span className="mono">{project.code}</span>
          </div>
          <span className="concept-caption">
            {t(
              "تصوّر بصري • ليس لقطة للنظام",
              "VISUAL CONCEPT • NOT A SYSTEM SCREENSHOT",
            )}
          </span>
        </div>
      )}
      <div className="visual-top">
        <span className="mono">{project.code} / PROJECT FILE</span>
        <ScanLine size={16} />
      </div>
      {project.images?.length && (
        <span className="image-label">
          {t("من الواجهة الأصلية", "Original interface")}
        </span>
      )}
    </div>
  );
}
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { t, text, path } = useLocale();
  return (
    <article className="project-card">
      <Link
        className="project-image-link"
        tabIndex={-1}
        aria-hidden="true"
        to={path("/projects/" + project.slug)}
      >
        <ProjectVisual project={project} />
      </Link>
      <div className="project-card-copy">
        <div className="card-meta">
          <span>{text(categories[project.category])}</span>
          {project.featured && (
            <span className="featured-label">{t("مختار", "SELECTED")}</span>
          )}
        </div>
        <h3>
          <Link to={path("/projects/" + project.slug)}>
            {text(project.title)}
            <Arrow />
          </Link>
        </h3>
        <p>{text(project.summary)}</p>
        <div className="card-bottom">
          <span className="mono">
            {project.stack.slice(0, 3).join(" / ") ||
              t("التوثيق قيد الاستكمال", "Documentation pending")}
          </span>
          <span className="card-index mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const { text, t, path } = useLocale();
  return (
    <article className="service-card">
      <div className="service-top">
        <Icon name={service.icon} />
        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="service-subtitle mono">{service.subtitle}</div>
      <h3>
        <Link to={path("/services/" + service.slug)}>
          {text(service.title)}
        </Link>
      </h3>
      <p>{text(service.overview)}</p>
      <Link className="service-link" to={path("/services/" + service.slug)}>
        {t("اكتشف الخدمة", "Explore service")}
        <Arrow />
      </Link>
    </article>
  );
}
export function TeamCard({
  person,
  index = 0,
  compact = false,
}: {
  person: (typeof founders)[number];
  index?: number;
  compact?: boolean;
}) {
  const { text, t } = useLocale();
  return (
    <article className={`team-card ${compact ? "team-compact" : ""}`}>
      <div
        className={"person-art person-art-" + (index % 3)}
        aria-hidden="true"
      >
        <span className="avatar-ring ring-one" />
        <span className="avatar-ring ring-two" />
        <span className="avatar-initials">{text(person.initials)}</span>
        <span className="person-index mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="avatar-caption mono">
          {compact ? "TECHNICAL CONTRIBUTOR" : "FOUNDING & LEADERSHIP TEAM"}
        </span>
      </div>
      <div className="person-info">
        {!compact && (
          <span className="person-role">
            {t("فريق التأسيس والقيادة", "Founding & leadership team")}
          </span>
        )}
        <h3>{text(person.name)}</h3>
        <p>{text(person.field)}</p>
        {person.links.length > 0 && (
          <div className="person-links">
            {person.links.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                key={link.url}
                aria-label={`${link.title} — ${text(person.name)}`}
              >
                {link.title}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
