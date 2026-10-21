import { useLocale } from "../i18n";
import { SectionHeading, TextLink, Icon, AnimatedCounter } from "./UI";
import { TeamCard } from "./Cards";
import { founders } from "../content/people";
import { QuoteForm } from "./QuoteForm";
export function FoundersSection() {
  const { t, path } = useLocale();
  return (
    <section className="section container">
      <SectionHeading
        number="07"
        label="THE FOUNDING MINDS"
        title={t("ثلاث رؤى. مدار واحد.", "Three perspectives. One MADAR.")}
        description={t(
          "قيادة مشتركة، وتخصصات تتكامل من الفكرة إلى التنفيذ.",
          "Shared leadership and complementary expertise, from idea to implementation.",
        )}
        link={path("/team")}
      />
      <div className="founder-grid">
        {founders.map((person, index) => (
          <TeamCard key={person.name.en} person={person} index={index} />
        ))}
      </div>
    </section>
  );
}
export function ProcessSection() {
  const { t } = useLocale();
  const steps = [
    [
      t("نفهم قبل أن نبني", "Understand first"),
      t(
        "نستمع للاحتياج، ونحدد المشكلة والنتيجة المطلوبة.",
        "We listen, frame the problem and define the desired outcome.",
      ),
    ],
    [
      t("نرسم مسارًا واضحًا", "Define the path"),
      t(
        "نوضح النطاق والمخرجات والتقنية والتكلفة المتفق عليها.",
        "We agree scope, deliverables, technology and cost.",
      ),
    ],
    [
      t("ننّفذ ونراجع", "Build and review"),
      t(
        "نعمل على مراحل، ونراجع الجودة معك في كل خطوة.",
        "We build in stages and review quality with you along the way.",
      ),
    ],
    [
      t("نسلّم ونوثّق", "Deliver with clarity"),
      t(
        "مخرجات واضحة ووثائق تساعدك على التشغيل والتطوير.",
        "Clear deliverables and documentation for operation and growth.",
      ),
    ],
  ];
  return (
    <section className="section section-bordered">
      <div className="container">
        <SectionHeading
          number="08"
          label="OUR WAY OF WORKING"
          title={t("وضوح في كل خطوة.", "Clarity at every step.")}
        />
        <div className="process-grid">
          {steps.map(([title, description], i) => (
            <article key={title}>
              <span className="process-number mono">
                0{i + 1}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function QuoteSection() {
  const { t } = useLocale();
  return (
    <section className="section section-pearl" id="request-quote">
      <div className="container quote-section">
        <div className="quote-intro">
          <div className="eyebrow">
            <span className="section-number">09</span>LET’S BUILD YOUR NEXT
          </div>
          <h2>
            {t("كل مشروع عظيم،", "Every meaningful project")}
            <br />
            <span>{t("يبدأ بمحادثة.", "starts with a conversation.")}</span>
          </h2>
          <p>
            {t(
              "شاركنا فكرتك. نناقش احتياجك ونحدد نطاقًا واضحًا، ثم نجهّز عرض سعر يناسب المشروع.",
              "Share your idea. We discuss your needs, define a clear scope and prepare a tailored quotation.",
            )}
          </p>
          <div className="quote-promise">
            <Icon name="file" />
            <div>
              <strong>
                {t("نطاق واضح، من البداية.", "A clear scope, from the start.")}
              </strong>
              <p>
                {t(
                  "لا أسعار افتراضية. كل عرض يُبنى على احتياجك.",
                  "No assumed prices. Each quotation starts with your needs.",
                )}
              </p>
            </div>
          </div>
          <span className="quote-watermark" aria-hidden="true">
            LET’S TALK.
          </span>
        </div>
        <QuoteForm id="home-quote" />
      </div>
    </section>
  );
}
export function AcademyHighlight() {
  const { t, path } = useLocale();
  return (
    <section className="section section-pearl academy-highlight">
      <div className="container academy-grid">
        <div>
          <div className="eyebrow">
            <span className="section-number">06</span>MADAR ACADEMY
          </div>
          <h2>
            {t("المعرفة التي نكتسبها،", "Knowledge gained.")}
            <br />
            {t("نشاركها.", "Knowledge shared.")}
          </h2>
          <p>
            {t(
              "مساحة للتعلّم والتطبيق وتبادل الخبرة. من المحتوى التقني إلى المعسكرات والورش التعليمية.",
              "A space for learning, practice and shared expertise, from technical content to bootcamps and workshops.",
            )}
          </p>
          <TextLink to={path("/academy")}>
            {t("اكتشف الأكاديمية", "Discover the academy")}
          </TextLink>
        </div>
        <div className="bootcamp-metric">
          <span className="metric-label">
            PREVIOUS ETHICAL HACKING BOOTCAMP
          </span>
          <strong>
            <AnimatedCounter value={135} />
            <span>↗</span>
          </strong>
          <div className="metric-bottom">
            <h3>{t("طالبًا مستفيدًا", "student beneficiaries")}</h3>
            <p>
              {t(
                "في معسكر الاختراق الأخلاقي السابق لمدة أسبوع، وفق بيانات الفريق.",
                "In the previous one-week ethical hacking bootcamp, according to team-reported figures.",
              )}
            </p>
            <span>
              {t(
                "تجربة تعليمية، دون ادعاء اعتماد مهني.",
                "A learning experience; no professional accreditation claimed.",
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
