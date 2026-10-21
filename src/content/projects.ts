import { l, type Project, type Category, type Localized } from "./types";
export const categories: Record<Category, Localized> = {
  grc: l("الحوكمة والمخاطر", "Governance & risk"),
  cyber: l("الأمن السيبراني", "Cybersecurity"),
  systems: l("الأنظمة الرقمية", "Digital systems"),
  ai: l("الذكاء الاصطناعي", "Artificial intelligence"),
  other: l("تجارب تقنية", "Technical explorations"),
};
const member = l(
  "من أعمال أعضاء الفريق؛ لا يعني العرض تعاقدًا تجاريًا باسم مدار.",
  "A team member portfolio project; inclusion does not imply a MADAR commercial engagement.",
);
const documented = l(
  "موثّق في README؛ لم يُجرَ تحقق تشغيلي مستقل.",
  "Documented in the README; not independently operationally verified.",
);
const sparse = l(
  "التوثيق المتاح لا يكفي لتوصيف الوظائف أو التقنيات.",
  "Available documentation is insufficient to describe features or technologies.",
);
const gh = (repo: string) => "https://github.com/" + repo;
const source = (repo: string) => gh(repo) + "/blob/main/README.md";
export const projects: Project[] = [
  {
    slug: "mizan",
    title: l("ميزان | MIZAN", "MIZAN | ميزان"),
    category: "grc",
    code: "MZ",
    featured: true,
    summary: l(
      "حوكمة واضحة. قرارات موثوقة. منصة موجّهة للحوكمة والمخاطر والامتثال، كما تظهر في الواجهة المقدّمة.",
      "Clear governance. Informed decisions. A governance, risk and compliance platform represented by the supplied interface.",
    ),
    stack: [],
    capabilities: [
      l(
        "واجهة عربية وإنجليزية ظاهرة في اللقطة",
        "Arabic and English interface options visible in the screenshot",
      ),
      l("واجهة دخول لمساحة العمل", "Workspace sign-in interface"),
    ],
    challenge: l(
      "تقديم مفهوم الحوكمة في واجهة عربية واضحة؛ لا تتوفر وثائق فنية للنظام حتى الآن.",
      "Presenting governance through a clear Arabic interface; detailed system documentation has not been supplied.",
    ),
    approach: l(
      "نعرض لقطة أصلية من بيئة محلية باعتبارها دليلًا على الواجهة فقط. اللقطة تتضمن خطأ طلب ولا تثبت جاهزية تشغيلية.",
      "An original local-environment screenshot is presented as interface evidence only. It includes a request error and does not establish operational readiness.",
    ),
    attribution: l(
      "مشروع مقدّم ضمن أصول مدار.",
      "A project included in the supplied MADAR assets.",
    ),
    status: l(
      "واجهة محلية • التوثيق قيد الاستكمال",
      "Local interface • documentation pending",
    ),
    images: ["mizan.webp"],
  },
  {
    slug: "digital-club",
    title: l(
      "المقر الرقمي لنادي التقنية الرقمية",
      "Digital Technology Club Platform",
    ),
    category: "systems",
    code: "DT",
    featured: true,
    summary: l(
      "بيئة عربية لتشغيل أعمال النادي: اللجان والمهام والفعاليات والصلاحيات في مكان واحد.",
      "An Arabic operations platform bringing committees, tasks, events and scoped permissions together.",
    ),
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle"],
    capabilities: [
      l(
        "إدارة المهام واللجان والفعاليات",
        "Task, committee and event management",
      ),
      l("صلاحيات بحسب الدور والنطاق", "Role-based and scoped permissions"),
      l("حوكمة وتقارير وسجل تدقيق", "Governance, reporting and audit trails"),
    ],
    challenge: l(
      "تنظيم أعمال النادي مع الفصل بين العرض والمراجعة والاعتماد.",
      "Organizing club operations while separating visibility, review and approval.",
    ),
    approach: l(
      "وفق README: وحدات مترابطة، وصلاحيات نطاقية، وفصل بيانات العرض التجريبي عن الإنتاج.",
      "The README describes connected modules, scoped authorization and separation of demo and production data.",
    ),
    attribution: l(
      "من أعمال مشعل الجذمي لنادي التقنية الرقمية؛ لا يُعرض باعتباره شراكة مؤسسية مع مدار.",
      "A Meshal Aljathmi project for the Digital Technology Club; no institutional partnership with MADAR is implied.",
    ),
    status: documented,
    repo: gh("ish3-is/Digital-Technology-Club-Platform"),
    source: source("ish3-is/Digital-Technology-Club-Platform"),
  },
  {
    slug: "purpleops",
    title: l("R-M PurpleOps Pro", "R-M PurpleOps Pro"),
    category: "cyber",
    code: "PO",
    featured: true,
    summary: l(
      "بيئة تجمع محاكاة الهجمات والرصد والاستجابة والتحليل الأمني في لوحة عمليات واحدة.",
      "A security assessment environment combining attack simulation, monitoring, response and analysis.",
    ),
    stack: ["Python", "Streamlit", "Wazuh", "Velociraptor", "OpenSearch"],
    capabilities: [
      l("محاكاة تقنيات MITRE ATT&CK", "MITRE ATT&CK technique simulation"),
      l("متابعة تنبيهات Wazuh", "Wazuh alert monitoring"),
      l("ربط الاستجابة وتقارير PDF", "Response integration and PDF reporting"),
    ],
    challenge: l(
      "ربط المحاكاة الهجومية بإشارات الرصد والاستجابة ضمن بيئة اختبار مأذونة.",
      "Connecting authorized attack simulation to monitoring signals and response in a test environment.",
    ),
    approach: l(
      "يوثّق المستودع دمج Wazuh وVelociraptor مع لوحة Streamlit؛ لا نعيد نشر نسب الكشف غير المتحقق منها.",
      "The repository documents Wazuh and Velociraptor integration through Streamlit; unverified detection percentages are omitted.",
    ),
    attribution: member,
    status: documented,
    repo: gh("ish3-is/R-MPurpleOps-Pro"),
    source: source("ish3-is/R-MPurpleOps-Pro"),
  },
  {
    slug: "dualshield",
    title: l("MR-SOC DualShield", "MR-SOC DualShield"),
    category: "cyber",
    code: "DS",
    featured: true,
    summary: l(
      "نموذج عمليات أمنية يربط الرصد والاستجابة الآلية وإدارة الحوادث والتقارير.",
      "A SOC demonstration connecting monitoring, automated response, incident management and reporting.",
    ),
    stack: ["Python", "Flask", "Wazuh", "TheHive", "OpenSearch"],
    capabilities: [
      l("رصد سجلات وتنبيهات أمنية", "Security log and alert monitoring"),
      l("مسارات استجابة آلية", "Automated response workflows"),
      l("توثيق الحوادث عبر TheHive", "Incident documentation through TheHive"),
    ],
    challenge: l(
      "تقليل تشتت أدوات الرصد والاستجابة وتوثيق الحادثة.",
      "Bringing monitoring, response and incident documentation into a coherent workflow.",
    ),
    approach: l(
      "يعرض README ربط Wazuh بمحرك Python وTheHive ولوحة Flask. العرض توثيقي ولا يعد بتغطية تشغيلية تجارية.",
      "The README describes Wazuh, Python, TheHive and a Flask dashboard. This is documentation evidence, not a commercial monitoring guarantee.",
    ),
    attribution: l(
      "عمل مشترك لمشعل الجذمي وريماس القحطاني وفق توثيق المستودع.",
      "A collaborative project by Meshal Aljathmi and Remas Alqahtani, as credited in the repository.",
    ),
    status: documented,
    repo: gh("ish3-is/MR-SOC---DualShield"),
    source: source("ish3-is/MR-SOC---DualShield"),
  },
  {
    slug: "basirah",
    title: l("بصيرة | BASIRAH", "BASIRAH | بصيرة"),
    category: "ai",
    code: "BS",
    summary: l(
      "نظام استشاري لتحليل المحتوى الرقمي والروابط والصور، يجمع أدلة متعددة لدعم القرار.",
      "An advisory system combining evidence from digital content, URLs and images to support decisions.",
    ),
    stack: ["React", "Vite", "FastAPI", "Python"],
    capabilities: [
      l("تجميع الأدلة وسجل التحليل", "Evidence fusion and analysis timelines"),
      l("تحليل استشاري متعدد المصادر", "Multi-source advisory analysis"),
    ],
    challenge: l(
      "تقييم المحتوى المصطنع دون ادعاء كشف قطعي أو مساواة غياب المؤشرات بالأصالة.",
      "Assessing synthetic content without claiming perfect detection or equating absent indicators with authenticity.",
    ),
    approach: l(
      "التحليل الحقيقي يتطلب الخادم المحلي. العرض العام ثابت وتجريبي فقط ولا ينفذ استدلالًا أو تحليلًا مباشرًا.",
      "Real analysis requires the local backend. The public showcase is static, demo-only and performs no inference or live analysis.",
    ),
    attribution: member,
    status: l(
      "تحليل استشاري / بحثي • عرض عام تجريبي",
      "Advisory / research-grade • demo-only public showcase",
    ),
    repo: gh("ish3-is/Aljuri"),
    source: source("ish3-is/Aljuri"),
    demo: "https://ish3-is.github.io/Aljuri/",
    images: ["basirah.webp", "basirah-2.webp"],
  },
  {
    slug: "ueba",
    title: l("R-M UEBA AI Engine", "R-M UEBA AI Engine"),
    category: "ai",
    code: "AI",
    summary: l(
      "تجربة للتحقق المستمر من الهوية باستخدام أنماط توقيت الكتابة والتحليل السلوكي.",
      "A continuous authentication exploration using keystroke timing and behavioral analytics.",
    ),
    stack: ["Python", "Streamlit", "Random Forest", "Splunk"],
    capabilities: [
      l(
        "قياسات زمن الضغط والفواصل بين المفاتيح",
        "Dwell-time and inter-key timing features",
      ),
      l("لوحة متابعة وإشارات JSON", "A monitoring dashboard and JSON signals"),
    ],
    challenge: l(
      "تحليل اختلاف نمط المستخدم خلال الجلسة مع مراعاة حساسية البيانات السلوكية.",
      "Studying behavioral drift during a session while acknowledging the sensitivity of behavioral data.",
    ),
    approach: l(
      "يوثّق المستودع نموذج Random Forest وربط إشارات التحليل بـ SIEM. لا نعرض أرقام دقة غير متحقق منها.",
      "The repository documents a Random Forest model and SIEM signals. Unverified accuracy figures are not repeated.",
    ),
    attribution: member,
    status: documented,
    repo: gh("ish3-is/R-M-UEBA-AI-Engine"),
    source: source("ish3-is/R-M-UEBA-AI-Engine"),
  },
  {
    slug: "sentinel",
    title: l("RM Sentinel", "RM Sentinel"),
    category: "cyber",
    code: "RS",
    summary: l(
      "مشروع لمراقبة سلامة الملفات وأحداث الأجهزة وعرض التنبيهات في لوحة SOC.",
      "A project for file integrity monitoring, endpoint events and a SOC dashboard.",
    ),
    stack: ["Python", "FastAPI", "PostgreSQL", "Streamlit"],
    capabilities: [
      l("مراقبة تغيير الملفات", "File change monitoring"),
      l("عرض أحداث وتنبيهات", "Event and alert visualization"),
    ],
    challenge: l(
      "جمع إشارات الجهاز وتحويلها إلى متابعة واضحة.",
      "Turning endpoint signals into readable monitoring.",
    ),
    approach: l(
      "يوثّق README وكيلًا للمراقبة وخادمًا ولوحة عرض وتنبيهات Telegram.",
      "The README describes a monitoring agent, server, dashboard and Telegram alerts.",
    ),
    attribution: member,
    status: documented,
    repo: gh("ish3-is/RM_Sentinel"),
    source: source("ish3-is/RM_Sentinel"),
  },
  {
    slug: "wazuh-lab",
    title: l("Wazuh SIEM SOC Lab", "Wazuh SIEM SOC Lab"),
    category: "cyber",
    code: "WZ",
    summary: l(
      "مختبر افتراضي يجمع سجلات Windows وLinux مع سيناريوهات رصد واستجابة دفاعية.",
      "A virtual lab connecting Windows and Linux telemetry with defensive detection and response scenarios.",
    ),
    stack: ["Wazuh", "VirtualBox", "Ubuntu", "Windows Server"],
    capabilities: [
      l("تجميع سجلات من أكثر من نظام", "Multi-platform log ingestion"),
      l("تجارب Active Response", "Active Response exercises"),
    ],
    challenge: l(
      "فهم سلسلة الرصد والاستجابة عبر أجهزة مختلفة.",
      "Understanding detection and response across different hosts.",
    ),
    approach: l(
      "بيئة مختبر معزولة موثّقة تشمل إعداد الوكلاء ومراجعة السجلات وقواعد الاستجابة.",
      "A documented lab environment covering agents, log review and response rules.",
    ),
    attribution: member,
    status: documented,
    repo: gh("ish3-is/Wazuh-SIEM-SOC-Lab"),
    source: source("ish3-is/Wazuh-SIEM-SOC-Lab"),
  },
  {
    slug: "splunk",
    title: l("Splunk Firewall Monitoring", "Splunk Firewall Monitoring"),
    category: "cyber",
    code: "SP",
    summary: l(
      "تحويل سجلات الجدار الناري إلى لوحات متابعة واستعلامات تدعم التحقيق الأولي.",
      "Turning firewall logs into dashboards and queries for initial investigation.",
    ),
    stack: ["Splunk", "SPL", "Regex", "Dashboard Studio"],
    capabilities: [
      l("استخراج حقول السجلات", "Structured log field extraction"),
      l(
        "متابعة الاتصالات المسموحة والمرفوضة",
        "Allowed and denied connection views",
      ),
    ],
    challenge: l(
      "تحويل الأحداث الخام إلى معلومات قابلة للفحص.",
      "Making raw events useful for analyst review.",
    ),
    approach: l(
      "استعلامات SPL وحقول Regex ولوحات للمنافذ والوجهات. مؤشرات توجيه للتحليل، وليست إثباتًا مستقلًا على هجوم.",
      "SPL queries, regex fields and port/destination dashboards provide triage signals, not independent proof of an attack.",
    ),
    attribution: l(
      "عمل تعاوني لمشعل الجذمي وميسم وفق README.",
      "A collaborative project by Meshal Jathmi and Maysam, according to the README.",
    ),
    status: documented,
    repo: gh("ish3-is/Splunk-Firewall-Security-Monitoring"),
    source: source("ish3-is/Splunk-Firewall-Security-Monitoring"),
    images: ["splunk.webp"],
  },
  {
    slug: "human-layer",
    title: l("خط الدفاع | HUMAN LAYER", "HUMAN LAYER | خط الدفاع"),
    category: "cyber",
    code: "HL",
    summary: l(
      "تجربة عربية تفاعلية للتوعية الأمنية عبر مواقف وقرارات وتحديات تعليمية.",
      "An interactive Arabic cybersecurity awareness experience with scenarios, decisions and learning challenges.",
    ),
    stack: ["React", "TypeScript", "Vite"],
    capabilities: [
      l("سيناريوهات توعوية وتغذية راجعة", "Awareness scenarios and feedback"),
      l("دعم RTL واللمس ولوحة المفاتيح", "RTL, touch and keyboard support"),
    ],
    challenge: l(
      "تحويل التوعية الأمنية إلى ممارسة تفاعلية.",
      "Turning cybersecurity awareness into interactive practice.",
    ),
    approach: l(
      "سيناريوهات داخل المتصفح مع تقييم توعوي للجولة؛ ليست أداة اعتماد مهني.",
      "Browser-based scenarios with learning feedback; this is not a professional certification tool.",
    ),
    attribution: l(
      "مبادرة تعاونية لجُمانة ومشعل الجذمي حسب المستودع؛ لا يُفترض ارتباط مؤسسي بمدار.",
      "A collaborative initiative by Jumanah and Meshal Aljathmi according to the repository; no institutional MADAR affiliation is implied.",
    ),
    status: documented,
    repo: gh("ish3-is/CYS"),
    source: source("ish3-is/CYS"),
  },
  ...[
    { slug: "r-m", name: "R-M", repo: "ish3-is/R-M", code: "RM" },
    { slug: "project", name: "Project", repo: "ish3-is/Project", code: "PR" },
    {
      slug: "housing-system",
      name: "Housing System",
      repo: "teeeaf345/housing-system",
      code: "HS",
    },
  ].map((p) => ({
    slug: p.slug,
    title: l(p.name, p.name),
    category: "other" as const,
    code: p.code,
    summary: sparse,
    stack: [],
    capabilities: [],
    challenge: sparse,
    approach: l(
      "نحتفظ بمرجع المستودع دون نسبة وظائف غير موثّقة إليه.",
      "The repository reference is retained without attributing undocumented functionality.",
    ),
    attribution: member,
    status:
      p.slug === "housing-system"
        ? l(
            "مستودع عام • لم يتوفر README",
            "Public repository • README unavailable",
          )
        : l(
            "README مختصر • تفاصيل غير متاحة",
            "Minimal README • details unavailable",
          ),
    repo: gh(p.repo),
  })),
];
