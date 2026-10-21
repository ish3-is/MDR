import { l, type Service, type Localized } from "./types";
const entry = (
  slug: string,
  title: Localized,
  subtitle: string,
  icon: string,
  overview: Localized,
  deliverables: Localized[],
  audience: Localized,
  approach: Localized,
  examples: string[],
): Service => ({
  slug,
  title,
  subtitle,
  icon,
  overview,
  deliverables,
  audience,
  approach,
  examples,
  faq: [
    {
      question: l(
        "كيف يُحدَّد نطاق العمل والسعر؟",
        "How are scope and price agreed?",
      ),
      answer: l(
        "نراجع الاحتياج والمخرجات والمدة، ثم نقدّم عرضًا مخصصًا قبل بدء التنفيذ. لا توجد أسعار ثابتة مفترضة.",
        "We review requirements, deliverables and timing, then prepare a tailored quotation before work begins. No fixed price is assumed.",
      ),
    },
    {
      question: l("ما الذي يشمله التسليم؟", "What does handover include?"),
      answer: l(
        "تُحدد الملفات والتوثيق وجلسات الشرح المطلوبة في النطاق المتفق عليه. أي دعم لاحق أو ربط خارجي يُناقش بصورة مستقلة.",
        "Files, documentation and walkthroughs are defined in the agreed scope. Follow-up support and external integrations are discussed separately.",
      ),
    },
    {
      question: l(
        "هل الخدمة معتمدة رسميًا؟",
        "Is this a formally accredited service?",
      ),
      answer: l(
        "مدار مبادرة تقنية في مرحلة التأسيس وليست جهة اعتماد أو منشأة تجارية مسجلة حاليًا. لا ندّعي تراخيص أو اعتمادات غير موثقة.",
        "MADAR is an emerging technology initiative, not an accreditation body or a currently registered commercial entity. No undocumented license or accreditation is claimed.",
      ),
    },
  ],
});
export const services: Service[] = [
  entry(
    "cybersecurity",
    l("حلول الأمن السيبراني", "Cybersecurity solutions"),
    "CYBERSECURITY",
    "shield",
    l(
      "من فهم المخاطر إلى بناء بيئات دفاعية قابلة للفحص. نناقش متطلباتك ونحدد التقييمات والمختبرات المأذونة ضمن نطاق واضح.",
      "From understanding risk to inspectable defensive environments. We scope authorized assessments and labs around your requirements.",
    ),
    [
      l("خطة تقييم تقني محددة النطاق", "A scoped technical assessment plan"),
      l(
        "توثيق الإعداد والملاحظات الفنية",
        "Configuration and technical findings documentation",
      ),
      l(
        "توصيات تحسين مرتّبة بالأولوية",
        "Prioritized improvement recommendations",
      ),
    ],
    l(
      "الفرق التقنية والمبادرات التي ترغب بفهم بيئتها الأمنية.",
      "Technical teams and initiatives seeking to understand their security environment.",
    ),
    l(
      "نحدد الأصول المسموح فحصها والضوابط أولًا، ثم ننفذ ونراجع الأدلة ونوثق التوصيات.",
      "We agree authorized assets and boundaries, then implement, review evidence and document recommendations.",
    ),
    ["purpleops", "wazuh-lab"],
  ),
  entry(
    "soc",
    l("الرصد والعمليات الأمنية", "Security monitoring & SOC"),
    "SECURITY OPERATIONS",
    "activity",
    l(
      "دعم بناء بيئات رصد وتجارب استجابة تربط السجلات والتنبيهات ومسار التحقيق. التغطية التشغيلية تُحدد حسب الاتفاق.",
      "Support for monitoring environments and response exercises connecting logs, alerts and investigation workflows. Operational coverage is defined by agreement.",
    ),
    [
      l("خريطة مصادر السجلات", "A log source map"),
      l("قواعد رصد ولوحات متابعة", "Detection rules and monitoring views"),
      l("سيناريوهات استجابة موثّقة", "Documented response scenarios"),
    ],
    l(
      "الفرق التقنية والمهتمون ببناء مختبرات SOC.",
      "Technical teams and SOC lab builders.",
    ),
    l(
      "نربط مصادر البيانات، نضبط الرصد، ثم نختبر السيناريوهات في بيئة مأذونة.",
      "We connect data sources, configure monitoring and test scenarios in an authorized environment.",
    ),
    ["dualshield", "splunk", "sentinel"],
  ),
  entry(
    "grc",
    l("الحوكمة والمخاطر والامتثال", "Governance, risk & compliance"),
    "GOVERNANCE & RISK",
    "scale",
    l(
      "مساندة تقنية في تنظيم السياسات وسجلات المخاطر ومتطلبات الامتثال، مع توضيح حدود العمل والمراجعات اللازمة.",
      "Technical support for policies, risk registers and compliance requirements, with explicit scope and review needs.",
    ),
    [
      l(
        "نماذج سياسات وإجراءات حسب النطاق",
        "Scoped policy and procedure templates",
      ),
      l("سجل مخاطر وخطة متابعة", "A risk register and follow-up plan"),
      l("مصفوفة متطلبات وأدلة", "A requirements and evidence matrix"),
    ],
    l(
      "المبادرات والفرق التي تنظم ممارساتها الداخلية.",
      "Initiatives and teams organizing internal practices.",
    ),
    l(
      "نفهم السياق، نراجع الوثائق المتاحة، ونبني أدوات متابعة. لا نمثل جهة إصدار اعتماد.",
      "We understand context, review existing documents and build tracking tools. We do not issue accreditation.",
    ),
    ["mizan"],
  ),
  entry(
    "digital-systems",
    l("الأنظمة الرقمية وتطبيقات الويب", "Digital systems & web apps"),
    "DIGITAL ENGINEERING",
    "code",
    l(
      "تجارب رقمية تبدأ من احتياج المستخدم وتصل إلى نظام موثق قابل للتطوير، من المواقع إلى لوحات العمليات.",
      "Digital experiences grounded in user needs, developed into documented systems, from websites to operations dashboards.",
    ),
    [
      l("تحليل متطلبات ومسارات استخدام", "Requirements and user journeys"),
      l(
        "واجهات متجاوبة عربية وإنجليزية",
        "Responsive Arabic and English interfaces",
      ),
      l("ملفات المشروع ودليل التشغيل", "Project source and operating guide"),
    ],
    l(
      "المبادرات والأندية والفرق وأصحاب المنتجات الرقمية.",
      "Initiatives, clubs, teams and digital product owners.",
    ),
    l(
      "نكتشف المتطلبات، نصمم الواجهات، نبني على مراحل، ثم نختبر ونسلم.",
      "We discover requirements, design, build in stages, then test and hand over.",
    ),
    ["digital-club"],
  ),
  entry(
    "ai",
    l("حلول الذكاء الاصطناعي", "Artificial intelligence"),
    "APPLIED INTELLIGENCE",
    "brain",
    l(
      "نماذج أولية وتطبيقات مدروسة للذكاء الاصطناعي، مع بيان جودة البيانات وحدود النتائج ومتطلبات التقييم.",
      "Considered AI prototypes and applications with clear data quality, evaluation requirements and result limitations.",
    ),
    [
      l(
        "تحديد المشكلة وملاءمة البيانات",
        "Problem framing and data suitability",
      ),
      l("نموذج أولي قابل للتقييم", "An evaluable prototype"),
      l("تقرير بالحدود وخطة التحسين", "Limitations and improvement report"),
    ],
    l(
      "الفرق التي تختبر فكرة مبنية على البيانات أو التعلم الآلي.",
      "Teams exploring data-driven or machine-learning ideas.",
    ),
    l(
      "نقيّم جدوى الحل والبيانات، نبني نموذجًا أوليًا، ونوضح ما يمكن استنتاجه من التقييم.",
      "We assess feasibility and data, prototype, then explain what evaluation supports.",
    ),
    ["basirah", "ueba"],
  ),
  entry(
    "data-analytics",
    l("تحليل البيانات", "Data analytics"),
    "DATA & INSIGHT",
    "chart",
    l(
      "تحويل البيانات المتاحة إلى عرض مفهوم واستنتاجات يمكن تتبعها إلى مصدرها، مع احترام خصوصية البيانات.",
      "Turning available data into readable views and source-traceable insights while respecting privacy.",
    ),
    [
      l("مراجعة وتنظيف البيانات المتاحة", "Available data review and cleaning"),
      l(
        "لوحات ومؤشرات موثقة التعريف",
        "Dashboards with documented metric definitions",
      ),
      l("تقرير قراءة النتائج والقيود", "Results and limitations report"),
    ],
    l(
      "الفرق التي تحتاج إلى فهم بياناتها التشغيلية.",
      "Teams seeking to understand operational data.",
    ),
    l(
      "نحدد الأسئلة، نراجع المصادر، ونبني مؤشرات مع توثيق الافتراضات.",
      "We define questions, review sources and build metrics with documented assumptions.",
    ),
    ["splunk", "digital-club"],
  ),
  entry(
    "networks",
    l("إدارة الشبكات والأنظمة", "Networks & systems"),
    "INFRASTRUCTURE",
    "network",
    l(
      "دعم إعداد البيئات والشبكات والخوادم ومتابعتها، بما يتناسب مع صلاحيات الفريق والاحتياج الفعلي.",
      "Support for configuring and monitoring environments, networks and servers within agreed access and needs.",
    ),
    [
      l("تصور بنية البيئة", "An environment architecture outline"),
      l("إعدادات وتشغيل موثق", "Documented configuration and operation"),
      l("قائمة مراجعة المتابعة", "A monitoring checklist"),
    ],
    l(
      "الفرق التقنية والمختبرات التعليمية.",
      "Technical teams and educational labs.",
    ),
    l(
      "نراجع المتطلبات ونخطط الإعداد والنسخ الاحتياطي قبل التغيير، ثم نختبر الاتصال والتشغيل.",
      "We plan configuration and backup before changes, then verify connectivity and operation.",
    ),
    ["wazuh-lab"],
  ),
  entry(
    "training",
    l("التدريب والتعليم التقني", "Technical training"),
    "LEARNING & DEVELOPMENT",
    "book",
    l(
      "ورش ومسارات تعليمية تتدرج من المفهوم إلى التطبيق. الموضوع والمدة والمخرجات تُتفق حسب مستوى المشاركين.",
      "Workshops and learning paths from concepts to practice, scoped to participant levels and desired outcomes.",
    ),
    [
      l("خطة محتوى وأهداف تعلم", "Content plan and learning objectives"),
      l(
        "تمارين تطبيقية ومواد مساندة",
        "Practical exercises and supporting materials",
      ),
      l("مراجعة وتغذية راجعة", "Review and feedback"),
    ],
    l(
      "الطلاب والمهتمون بالتقنية والفرق الراغبة بالتعلم.",
      "Students, technology learners and teams.",
    ),
    l(
      "نحدد المستوى والأهداف، نصمم التطبيق، ثم نراجع فهم المشاركين.",
      "We establish levels and goals, design practice and review understanding.",
    ),
    ["human-layer"],
  ),
  entry(
    "professional-profile",
    l("الملف المهني والسيرة الذاتية", "Professional portfolios & CVs"),
    "PROFESSIONAL PRESENCE",
    "user",
    l(
      "تنظيم خبراتك ومشاريعك في سيرة وملف مهني يعكسان ما أنجزته فعلًا، دون إضافة مؤهلات غير موجودة.",
      "Organize genuine experience and projects in a CV and portfolio without adding nonexistent qualifications.",
    ),
    [
      l("مراجعة بنية السيرة ومحتواها", "CV structure and content review"),
      l("تنظيم وصف المشاريع والمهارات", "Project and skill descriptions"),
      l("نسخة قابلة للتحديث", "An editable version"),
    ],
    l(
      "الطلاب والخريجون والباحثون عن تطوير حضورهم المهني.",
      "Students, graduates and people improving professional presentation.",
    ),
    l(
      "نراجع المعلومات التي تقدمها، نعيد تنظيمها، ثم نراجع الدقة معك.",
      "We review supplied information, restructure it and check accuracy with you.",
    ),
    [],
  ),
  entry(
    "research-support",
    l("البحث والتوثيق التقني", "Research & technical documentation"),
    "RESEARCH SUPPORT",
    "file",
    l(
      "مساندة في تنظيم المراجع والمنهجية والتوثيق التقني وصياغة الشرح، مع حفظ حقوق المؤلف ونسبة المساهمات.",
      "Support for references, methods and technical explanations with respect for authorship and attribution.",
    ),
    [
      l("هيكل وثيقة أو تقرير", "A document or report outline"),
      l("مراجعة فنية وملاحظات مراجع", "Technical review and reference notes"),
      l("تحسين توثيق المشروع", "Improved project documentation"),
    ],
    l(
      "الباحثون وفرق المشاريع التقنية.",
      "Researchers and technical project teams.",
    ),
    l(
      "نتفق على حدود المساندة ونراجع المحتوى والمصادر مع بقاء التأليف والمسؤولية لصاحب العمل.",
      "We agree support boundaries and review sources, with authorship and responsibility retained by the original author.",
    ),
    [],
  ),
  entry(
    "mentoring",
    l("إرشاد المشاريع والتوجيه التقني", "Project mentoring"),
    "TECHNICAL MENTORING",
    "grad",
    l(
      "توجيه ومراجعة وشرح يساعدك على تنفيذ مشروعك وفهمه بنفسك، ضمن متطلبات النزاهة الأكاديمية.",
      "Guidance, review and explanations that help you build and understand your own project within academic integrity requirements.",
    ),
    [
      l("خطة تعلم وتنفيذ مرحلية", "A staged learning and implementation plan"),
      l("جلسات شرح ومراجعة تقنية", "Technical explanation and review sessions"),
      l(
        "ملاحظات لتحسين الكود والتوثيق",
        "Code and documentation improvement feedback",
      ),
    ],
    l(
      "الطلاب وأصحاب المشاريع التعليمية.",
      "Students and educational project builders.",
    ),
    l(
      "نناقش فكرتك ونراجع محاولاتك ونشرح الخيارات. لا نقدم عملًا تقييميًا يُسلّم بدلًا عنك.",
      "We discuss your idea, review your attempts and explain options. We do not produce assessed work for submission on your behalf.",
    ),
    [],
  ),
];
