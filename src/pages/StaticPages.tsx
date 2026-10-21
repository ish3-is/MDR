import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, Mail, MessageCircle, BookOpen } from "lucide-react";
import { useLocale } from "../i18n";
import {
  PageIntro,
  SectionHeading,
  Button,
  Icon,
  Accordion,
  AnimatedCounter,
  TextLink,
} from "../components/UI";
import {
  founders,
  contributors,
  channels,
  researchTitle,
} from "../content/people";
import { TeamCard } from "../components/Cards";
import { ProcessSection, FoundersSection } from "../components/Sections";
import { QuoteForm } from "../components/QuoteForm";
import { EMAIL, WHATSAPP } from "../lib/quote";
export function About() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        label="ABOUT MADAR"
        title={t(
          "خبرات تلتقي. وآفاق تتّسع.",
          "Expertise connects. Horizons expand.",
        )}
        description={t(
          "مدار مبادرة تقنية سعودية في مرحلة التأسيس، تجمع تخصصات متنوعة لتطوير حلول رقمية ومشاريع تقنية وتجارب تعليمية.",
          "MADAR is an emerging Saudi technology initiative connecting diverse disciplines through digital solutions, technical projects and learning experiences.",
        )}
      />
      <section className="section container">
        <div className="manifesto">
          <span className="eyebrow">OUR POINT OF VIEW</span>
          <h2>
            {t("نرى في التقنية وسيلةً", "We see technology as a way")}
            <br />
            <span>
              {t(
                "لفهم العالم، وبناء ما ينفعه.",
                "to understand the world and build what helps.",
              )}
            </span>
          </h2>
          <p>
            {t(
              "تتقاطع في مدار خبرات نظم المعلومات والأمن السيبراني والذكاء الاصطناعي والشبكات. نسعى لتحويل هذا التقاطع إلى تنفيذ مدروس، وتوثيق واضح، ومعرفة يمكن مشاركتها.",
              "Information systems, cybersecurity, artificial intelligence and networks meet at MADAR. We aim to turn that intersection into thoughtful execution, clear documentation and shareable knowledge.",
            )}
          </p>
        </div>
        <div className="vision-grid">
          <article>
            <span className="mono">01 / VISION</span>
            <h2>{t("رؤيتنا", "Our vision")}</h2>
            <p>
              {t(
                "بناء كيان تقني سعودي مؤثر يربط الإبداع بالتنفيذ ويسهم في تطوير الحلول الرقمية والوعي المعرفي.",
                "To build a Saudi technology organization that connects creativity with execution and contributes to digital solutions and technical understanding.",
              )}
            </p>
          </article>
          <article>
            <span className="mono">02 / MISSION</span>
            <h2>{t("رسالتنا", "Our mission")}</h2>
            <p>
              {t(
                "تطوير حلول تقنية مدروسة، وإظهار التجربة العملية بصدق، وتمكين الأفراد من خلال التعلم والتعاون بين التخصصات.",
                "To develop thoughtful technical solutions, present practical experience honestly and empower people through learning and interdisciplinary collaboration.",
              )}
            </p>
          </article>
        </div>
      </section>
      <section className="section section-pearl">
        <div className="container">
          <SectionHeading
            label="WHAT GUIDES US"
            title={t("قيم نترجمها إلى عمل.", "Principles put into practice.")}
          />
          <div className="principles-grid">
            {[
              [
                t("الوضوح", "Clarity"),
                t(
                  "نحدد ما سنبنيه، وما يدعمه الدليل.",
                  "We define what we build and what the evidence supports.",
                ),
              ],
              [
                t("التكامل", "Connection"),
                t(
                  "نجمع التخصصات حول المشكلة، لا حول الأداة.",
                  "We connect disciplines around a problem.",
                ),
              ],
              [
                t("المسؤولية", "Responsibility"),
                t(
                  "نحترم الخصوصية والحقوق والنزاهة الأكاديمية.",
                  "We respect privacy, ownership and academic integrity.",
                ),
              ],
              [
                t("التعلم", "Learning"),
                t(
                  "نجعل التوثيق ومشاركة المعرفة جزءًا من المخرجات.",
                  "We make documentation and shared knowledge part of delivery.",
                ),
              ],
            ].map(([title, description], i) => (
              <article key={title}>
                <span className="mono">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="notice">
            {t(
              "الوضع الحالي: مبادرة قيد التأسيس. لا تمثل مدار حاليًا منشأة تجارية مسجلة أو مركز تدريب معتمدًا، ولا تدّعي شراكات مؤسسية غير موثقة.",
              "Current status: an emerging initiative. MADAR is not currently a registered commercial entity or accredited training center, and does not claim undocumented institutional partnerships.",
            )}
          </div>
        </div>
      </section>
      <FoundersSection />
      <ProcessSection />
    </>
  );
}
export function Team() {
  const { t } = useLocale();
  const [filter, setFilter] = useState("all");
  const people = contributors.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      <PageIntro
        label="THE PEOPLE BEHIND THE WORK"
        title={t(
          "تنوّع في الخبرة. وحدة في الرؤية.",
          "Diverse expertise. A shared vision.",
        )}
        description={t(
          "ثلاثة أعضاء في فريق التأسيس والقيادة، وكفاءات تقنية مساندة. الأدوار المعروضة تعكس التخصصات المقدمة دون افتراض مسميات تنفيذية.",
          "Three equal founding leadership members, supported by technical contributors. Roles reflect supplied specialties without assumed executive titles.",
        )}
      />
      <section className="section container">
        <SectionHeading
          label="FOUNDING & LEADERSHIP TEAM"
          title={t("فريق التأسيس والقيادة", "Founding & leadership team")}
        />
        <div className="founder-grid">
          {founders.map((person, index) => (
            <TeamCard key={person.name.en} person={person} index={index} />
          ))}
        </div>
      </section>
      <section className="section section-deeper">
        <div className="container">
          <SectionHeading
            label="TECHNICAL CONTRIBUTORS"
            title={t(
              "خبرات تتكامل مع الفريق.",
              "Expertise supporting the team.",
            )}
            description={t(
              "مساهمون تقنيون بحسب الأسماء والتخصصات المقدمة. لا يفترض هذا العرض علاقة توظيف رسمية.",
              "Technical contributors listed by supplied name and specialty. This presentation does not imply formal employment.",
            )}
          />
          <div className="filters">
            {[
              ["all", t("جميع التخصصات", "All specialties")],
              ["cyber", t("الأمن والتحقيق الرقمي", "Security & forensics")],
              ["networks", t("الشبكات والأنظمة", "Networks & systems")],
            ].map(([key, name]) => (
              <button
                key={key}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="results-count" aria-live="polite">
            {t(`${people.length} مساهمين`, `${people.length} contributors`)}
          </p>
          <div className="contributor-grid">
            {people.map((p, i) => (
              <TeamCard
                key={p.name.en}
                compact
                person={{ ...p, links: [] }}
                index={i}
              />
            ))}
          </div>
          <p className="small-note">
            {t(
              "الأفاتارات رموز هندسية تعريفية وليست صورًا للأشخاص. لا تُعرض ملفات المرشحين أو معلوماتهم الخاصة.",
              "Avatars are geometric identifiers, not photographs. Candidate profiles and private contact information are not displayed.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
export function Academy() {
  const { t, path } = useLocale();
  const topics = [
    t("أساسيات الأمن السيبراني", "Cybersecurity fundamentals"),
    t("عمليات SOC", "SOC operations"),
    t("الحوكمة والمخاطر والامتثال", "Governance, risk & compliance"),
    t("التحقيق الرقمي", "Digital forensics"),
    t("الذكاء الاصطناعي", "Artificial intelligence"),
    t("نظم المعلومات", "Information systems"),
    t("المشاريع التقنية", "Technical projects"),
  ];
  return (
    <>
      <PageIntro
        label="MADAR ACADEMY / LEARN & SHARE"
        title={t("نتعلّم. نطبّق. نشارك.", "Learn. Practice. Share.")}
        description={t(
          "مساحة للمحتوى التقني والتعلّم المشترك. نميّز بوضوح بين التجارب التي نُفذت والمحتوى المتاح والأفكار المخططة.",
          "A space for technical content and shared learning, with clear distinctions between delivered activities, available content and planned directions.",
        )}
      />
      <section className="section container">
        <div className="bootcamp-panel">
          <div>
            <span className="tag">{t("تجربة سابقة", "PREVIOUS ACTIVITY")}</span>
            <h2>{t("معسكر الاختراق الأخلاقي", "Ethical hacking bootcamp")}</h2>
            <p>
              {t(
                "معسكر تعليمي سابق امتد أسبوعًا. وفق بيانات الفريق، بلغ عدد الطلاب المستفيدين 135 طالبًا. هذا العدد يخص المعسكر وحده ولا يدل على شهادات اعتماد مهني.",
                "A previously delivered one-week learning bootcamp. According to team-reported figures, it benefited 135 students. This number relates only to that bootcamp and does not imply professional certification.",
              )}
            </p>
            <Button secondary to={path("/contact") + "?service=training"}>
              {t("استفسر عن تدريب مخصص", "Discuss tailored training")}
            </Button>
          </div>
          <div className="bootcamp-numbers">
            <strong>
              <AnimatedCounter value={135} />
            </strong>
            <span>
              {t(
                "طالبًا مستفيدًا • وفق بيانات الفريق",
                "student beneficiaries • team-reported",
              )}
            </span>
            <div>
              <span>{t("المدة", "DURATION")}</span>
              <b>{t("أسبوع واحد", "One week")}</b>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-pearl">
        <div className="container">
          <SectionHeading
            label="AVAILABLE LEARNING CHANNELS"
            title={t(
              "المعرفة، على امتداد مجتمعنا.",
              "Knowledge across our community.",
            )}
            description={t(
              "روابط القنوات التعليمية المقدمة من الفريق، بأسماء معرّفاتها دون افتراض موضوعات أو أعداد مشتركين.",
              "Educational channel links supplied by the team, labeled by handle without assumed subjects or subscriber counts.",
            )}
          />
          <div className="channel-grid">
            {channels.map((channel, index) => (
              <a
                className="channel-card"
                key={channel}
                href={"https://t.me/" + channel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mono">0{index + 1} / TELEGRAM</span>
                <BookOpen size={26} strokeWidth={1.3} />
                <h3 dir="ltr">@{channel}</h3>
                <span>
                  {t("زيارة القناة", "Visit channel")}
                  <ExternalLink size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          label="FUTURE LEARNING DIRECTIONS"
          title={t("مسارات نتطلع إليها.", "Directions we are exploring.")}
          description={t(
            "تصنيفات محتوى مخططة، وليست برامج مفتوحة للتسجيل حاليًا. تتحدد التفاصيل عند الإعلان عن كل نشاط.",
            "Planned content categories, not programs currently open for enrollment. Details will be defined when each activity is announced.",
          )}
        />
        <div className="topic-list">
          {topics.map((topic, i) => (
            <div key={topic}>
              <span className="mono">0{i + 1}</span>
              <h3>{topic}</h3>
              <span className="tag">{t("مخطط", "PLANNED")}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export function Research() {
  const { t, path } = useLocale();
  return (
    <>
      <PageIntro
        label="RESEARCH & INNOVATION"
        title={t(
          "أسئلة تفتح آفاقًا جديدة.",
          "Questions that open new horizons.",
        )}
        description={t(
          "نستكشف تقاطع الذكاء الاصطناعي والأمن السيبراني والتحقيق الرقمي. نعرض مجال البحث والإطار المقصود دون ادعاء نتائج أو نشر علمي غير موثق.",
          "Exploring the intersection of AI, cybersecurity and digital forensics. We present the research domain and intended framework without claiming undocumented results or publication.",
        )}
      />
      <section className="section container">
        <article className="research-feature">
          <div className="research-feature-top">
            <span className="tag">
              {t("تعريف بمسار بحثي", "RESEARCH DIRECTION")}
            </span>
            <span className="mono">AI / XAI / DIGITAL FORENSICS</span>
          </div>
          <h2 dir="ltr">{researchTitle}</h2>
          <p>
            {t(
              "إطار مقترح يربط كشف التسلل في الشبكات بنماذج ذكاء اصطناعي قابلة للتفسير، ثم ينظر في كيفية دعم إعادة بناء الأدلة الرقمية.",
              "An intended framework connecting network intrusion detection with explainable AI and exploring support for digital evidence reconstruction.",
            )}
          </p>
          <div className="research-flow">
            {[
              [t("الإشارات الشبكية", "Network signals"), "network"],
              [t("كشف قابل للتفسير", "Explainable detection"), "brain"],
              [t("إعادة بناء الأدلة", "Evidence reconstruction"), "file"],
            ].map(([label, icon], i) => (
              <div key={icon}>
                <span className="mono">0{i + 1}</span>
                <Icon name={icon} size={40} />
                <h3>{label}</h3>
              </div>
            ))}
          </div>
          <p className="small-note">
            {t(
              "مخطط تصوري لمجال الدراسة، ولا يثبت تطبيقًا مكتملًا أو نتائج تجريبية.",
              "A conceptual diagram of the study domain; it does not establish a completed implementation or experimental results.",
            )}
          </p>
        </article>
        <div className="detail-grid research-context">
          <article>
            <h2>{t("المشكلة التي يستكشفها البحث", "The problem domain")}</h2>
            <p>
              {t(
                "كيف نربط رصد السلوك الشبكي بتفسير يساعد المحلل على فهم الإشارة، ثم بتوثيق أدلة يسهل تتبعه؟ هذا هو نطاق الاستكشاف، وليس إعلانًا عن نظام معتمد.",
                "How can network monitoring connect to explanations useful to an analyst and to traceable evidence documentation? This is the exploration domain, not an announcement of an accredited system.",
              )}
            </p>
            <h2>{t("المشاركة البحثية", "Research participation")}</h2>
            <p>
              {t(
                "بحسب المعلومات المقدمة، يشمل العمل مشاركين مرتبطين بجامعة الحدود الشمالية. تُحفظ نسبة المساهمات بصورة محايدة إلى حين تأكيد المشاركين وحقوق النشر. لا يُفترض تأييد مؤسسي من الجامعة.",
                "The supplied brief describes participants associated with Northern Border University. Attribution remains neutral pending confirmation of participants and publication rights. No university endorsement is implied.",
              )}
            </p>
          </article>
          <aside className="detail-sidebar">
            <span className="eyebrow">EVIDENCE & REFERENCES</span>
            <h3>{t("حالة التوثيق", "Documentation status")}</h3>
            <p>
              {t(
                "لم تُقدّم ورقة منشورة أو رابط رسمي أو نتائج قابلة للتحقق. لذلك لا تُعرض مجلة أو مشرف أو نسب أداء.",
                "No published paper, official reference or verifiable results were supplied. No journal, supervisor or performance figures are listed.",
              )}
            </p>
            <Button
              secondary
              to={path("/contact") + "?service=research-support"}
            >
              {t("استفسر عن المسار البحثي", "Ask about the research direction")}
            </Button>
          </aside>
        </div>
        <SectionHeading
          label="KNOWLEDGE NOTES"
          title={t("مصطلحات في سياقها.", "Concepts in context.")}
        />
        <Accordion
          items={[
            {
              question: t(
                "ما المقصود بالذكاء الاصطناعي القابل للتفسير؟",
                "What is explainable AI?",
              ),
              answer: t(
                "أساليب تساعد على فهم العوامل التي أثرت في مخرجات النموذج. التفسير يحتاج تقييمًا مستقلًا، ولا يجعل القرار صحيحًا تلقائيًا.",
                "Methods that help explain factors influencing model outputs. Explanations need evaluation and do not automatically make a decision correct.",
              ),
            },
            {
              question: t(
                "لماذا إعادة بناء الأدلة الرقمية؟",
                "Why digital evidence reconstruction?",
              ),
              answer: t(
                "لتنظيم آثار الأحداث وعلاقاتها وتوثيق مصدرها. هذا وصف لمجال الدراسة وليس إثباتًا لصلاحية قانونية أو نتيجة بحثية.",
                "To organize event traces, their relationships and their provenance. This describes a study domain, not legal admissibility or a research result.",
              ),
            },
          ]}
        />
      </section>
    </>
  );
}
export function Contact() {
  const { t } = useLocale();
  const [params] = useSearchParams();
  return (
    <>
      <PageIntro
        label="LET’S START A CONVERSATION"
        title={t("ما الذي ترغب في بنائه؟", "What would you like to build?")}
        description={t(
          "ابدأ بفكرتك أو التحدّي الذي تواجهه. نناقش المتطلبات والمخرجات ثم نحدد نطاقًا واضحًا لعرض السعر.",
          "Start with your idea or challenge. We discuss requirements and deliverables before defining a clear scope for your quotation.",
        )}
      />
      <section className="section section-pearl">
        <div className="container contact-grid">
          <div className="contact-form-panel">
            <h2>{t("اطلب عرض سعر", "Request a quotation")}</h2>
            <QuoteForm
              initialService={params.get("service") || ""}
              id="contact-quote"
            />
          </div>
          <aside className="contact-aside">
            <span className="eyebrow">DIRECT CHANNELS</span>
            <h2>{t("نبدأ بمحادثة.", "Start a conversation.")}</h2>
            <p>
              {t(
                "يمكنك التواصل مباشرة أو تجهيز تفاصيل طلبك عبر النموذج.",
                "Contact us directly or prepare your inquiry through the form.",
              )}
            </p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={24} />
              <span>
                <small>{t("واتساب مدار", "MADAR WhatsApp")}</small>
                <b dir="ltr">+966 59 607 3350</b>
              </span>
              <ExternalLink size={17} />
            </a>
            <a href={`mailto:${EMAIL}`}>
              <Mail size={24} />
              <span>
                <small>{t("البريد الإلكتروني", "Email")}</small>
                <b dir="ltr">{EMAIL}</b>
              </span>
              <ExternalLink size={17} />
            </a>
            <a
              href="https://www.linkedin.com/company/mdr-org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="linkedin-icon">in</span>
              <span>
                <small>{t("تعرّف على مدار", "Meet MADAR")}</small>
                <b>LinkedIn</b>
              </span>
              <ExternalLink size={17} />
            </a>
            <div className="notice">
              {t(
                "يرسل الطلب عبر التطبيق الذي تختاره، ولا يخزنه الموقع أو يدّعي استلامه تلقائيًا. لا تُدخل كلمات مرور أو معلومات حساسة.",
                "You send your inquiry through your chosen app. The site does not store it or automatically claim receipt. Do not enter passwords or sensitive information.",
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
export function Privacy() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        label="PRIVACY / TRANSPARENCY"
        title={t("خصوصيتك، بوضوح.", "Your privacy, clearly explained.")}
        description={t(
          "كيف يتعامل موقع مدار مع بيانات الزيارة وطلبات التواصل. آخر تحديث: 22 أكتوبر 2026.",
          "How the MADAR website handles visits and contact inquiries. Last updated: 22 October 2026.",
        )}
      />
      <article className="section container narrow prose">
        <h2>{t("نموذج التواصل", "Contact form")}</h2>
        <p>
          {t(
            "تُعالج الحقول في ذاكرة صفحة المتصفح لتحضير رسالة، ولا تُرسل إلى خادم مدار ولا تُحفظ في localStorage أو قاعدة بيانات. إغلاق الصفحة يفقد المدخلات. بعد اختيار واتساب أو تطبيق البريد، تنطبق سياسة مزوّد تلك الخدمة.",
            "Form fields are processed in browser-page memory to prepare a message. They are not sent to a MADAR server or saved in localStorage or a database. Closing the page discards the input. After choosing WhatsApp or an email app, that provider’s policy applies.",
          )}
        </p>
        <h2>{t("البيانات المطلوبة", "Information requested")}</h2>
        <p>
          {t(
            "الاسم، وسيلة التواصل، نوع الخدمة، وصف المشروع، والمدة المتوقعة؛ الميزانية اختيارية. استخدم أقل قدر من المعلومات اللازمة ولا تدخل بيانات حساسة.",
            "Name, contact method, service, project description and expected timing are requested; budget is optional. Share only what is necessary and avoid sensitive information.",
          )}
        </p>
        <h2>{t("التتبع والاستضافة", "Tracking and hosting")}</h2>
        <p>
          {t(
            "لا يضيف الموقع تحليلات زيارة أو ملفات تتبع أو ملفات تعريف ارتباط. الخطوط والوسائط مستضافة مع الموقع. قد يحتفظ مزوّد الاستضافة بسجلات تقنية مثل عنوان IP وطلبات الملفات وفق سياسته.",
            "The site adds no analytics, trackers or cookies. Fonts and media are self-hosted. The hosting provider may retain technical logs, such as IP addresses and file requests, under its own policy.",
          )}
        </p>
        <h2>{t("الروابط الخارجية", "External links")}</h2>
        <p>
          {t(
            "ينقلك الموقع عند الطلب إلى GitHub وTelegram وLinkedIn وWhatsApp. هذه خدمات مستقلة، ولا يحمّل الموقع محتواها متضمنًا داخل الصفحة.",
            "The site links to GitHub, Telegram, LinkedIn and WhatsApp when requested. These are independent services; their content is not embedded into the page.",
          )}
        </p>
        <h2>{t("الاستفسار أو طلب الحذف", "Questions or deletion requests")}</h2>
        <p>
          {t(
            "للاستفسار عن معلومات أرسلتها عبر قنوات التواصل، راسل البريد التالي. تعتمد إمكانية الحذف على القناة التي استُخدمت والالتزامات السارية.",
            "For questions about information you sent through a contact channel, use the email below. Deletion options depend on the channel used and applicable obligations.",
          )}
        </p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </article>
    </>
  );
}
export function Terms() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro
        label="TERMS OF USE"
        title={t("أساس واضح للاستخدام.", "A clear basis for use.")}
        description={t(
          "شروط استخدام الموقع وحدود المعلومات والخدمات المعروضة. آخر تحديث: 22 أكتوبر 2026.",
          "Website use and the limits of the information and services presented. Last updated: 22 October 2026.",
        )}
      />
      <article className="section container narrow prose">
        <h2>{t("وضع المبادرة", "Initiative status")}</h2>
        <p>
          {t(
            "مدار مبادرة تقنية سعودية في مرحلة التأسيس، وليست منشأة تجارية مسجلة أو جهة اعتماد حاليًا. لا يُعد الموقع إثباتًا لترخيص مهني أو شراكة مؤسسية.",
            "MADAR is an emerging Saudi technology initiative, not currently a registered commercial entity or accreditation body. The website is not evidence of a professional license or institutional partnership.",
          )}
        </p>
        <h2>{t("المشاريع والمحتوى", "Projects and content")}</h2>
        <p>
          {t(
            "تُعرض المشاريع بحسب الأصول والمراجع المتاحة مع نسبة المساهمات وحدود الجاهزية. أوصاف README ليست تحققًا مستقلًا من الأداء، والمشاريع التعليمية لا تعني عقودًا تجارية أو نتائج مضمونة. تظل حقوق المشاريع لأصحابها وتطبق تراخيص مستودعاتها.",
            "Projects are presented according to available assets and sources, with attribution and readiness limits. README descriptions are not independent performance verification, and educational projects imply no commercial contracts or guaranteed outcomes. Project rights remain with their owners and repository licenses apply.",
          )}
        </p>
        <h2>{t("طلبات الخدمات", "Service inquiries")}</h2>
        <p>
          {t(
            "تحضير رسالة أو فتح قناة تواصل لا يشكل عقدًا أو تأكيد قبول. يبدأ أي عمل بعد الاتفاق على النطاق والمخرجات والتكلفة والشروط المناسبة بصورة مستقلة.",
            "Preparing a message or opening a contact channel does not establish a contract or confirm acceptance. Work begins only after separate agreement on scope, deliverables, cost and appropriate terms.",
          )}
        </p>
        <h2>{t("الاستخدام المسؤول", "Responsible use")}</h2>
        <p>
          {t(
            "تُنفذ الخدمات الأمنية في نطاق مأذون فقط. المساندة الأكاديمية تعليم ومراجعة وإرشاد ولا تشمل تسليم أعمال تقييمية نيابة عن الطالب. لا تستخدم الموقع للإساءة أو مشاركة بيانات سرية.",
            "Security services are limited to authorized scope. Academic support covers teaching, review and mentoring, not assessed submissions on behalf of students. Do not misuse the site or share confidential data.",
          )}
        </p>
        <h2>{t("التحديث والتواصل", "Updates and contact")}</h2>
        <p>
          {t(
            "قد يتطور المحتوى والخدمات مع نمو المبادرة. للاستفسار أو تصحيح معلومة أو نسبة عمل، تواصل معنا عبر البريد الرسمي.",
            "Content and services may evolve as the initiative develops. For questions, corrections or attribution requests, contact the official email.",
          )}
        </p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </article>
    </>
  );
}
export function NotFound() {
  const { t, path } = useLocale();
  return (
    <section className="section container not-found">
      <span className="mono">404 / OUTSIDE THIS ORBIT</span>
      <h1>{t("هذا المسار خارج المدار.", "This path is outside our orbit.")}</h1>
      <p>
        {t(
          "قد تكون الصفحة انتقلت، أو أن الرابط غير صحيح.",
          "The page may have moved, or the link may be incorrect.",
        )}
      </p>
      <Button to={path("/")}>{t("العودة للرئيسية", "Return home")}</Button>
      <TextLink to={path("/projects")}>
        {t("استكشف الأعمال", "Explore projects")}
      </TextLink>
    </section>
  );
}
