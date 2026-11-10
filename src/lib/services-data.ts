export interface ServiceStory {
  kicker: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image: string;
  alt: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaHref?: string;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  badge: string;
  subtitle: string;
  shortDescription: string;
  accent: "green" | "blue";
  iconName: "building" | "doc" | "pencil" | "coins" | "compass" | "palette" | "research" | "sparkles";
  heroTagline: string;
  overview: {
    heading: string;
    intro: string;
    paragraph2: string;
    targetAudience: string[];
    keyStats: Array<{ label: string; value: string }>;
  };
  pillars: Array<{
    title: string;
    description: string;
    highlights: string[];
  }>;
  methodology: Array<{
    stepNumber: string;
    title: string;
    description: string;
  }>;
  deliverables: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  consultationBanner?: {
    kicker: string;
    heading: string;
    description: string;
    bullets: string[];
    ctaText: string;
    ctaHref?: string;
  };
  stories?: ServiceStory[];
  specializedService?: {
    kicker: string;
    title: string;
    description: string;
    bullets: string[];
    tags: string[];
    ctaText?: string;
    ctaHref?: string;
  };
  testimonials?: ServiceTestimonial[];
}

export const SERVICES_CATALOG: Record<string, ServiceDetail> = {
  "college-planning": {
    slug: "college-planning",
    title: "College & University Planning",
    badge: "FOUNDATIONAL ADMISSIONS SERVICE",
    subtitle:
      "A strategic 4-year roadmap designed to nurture academic excellence, extracurricular leadership, and intellectual curiosity starting in early high school.",
    shortDescription:
      "Find the right colleges that match your goals, interests and profile.",
    accent: "green",
    iconName: "building",
    heroTagline: "Start Early. Build Purpose. Stand Out to Admissions Committees.",
    overview: {
      heading: "Holistic, Long-Term Guidance Built for Top-Tier Results",
      intro:
        "College planning is not an eleventh-hour sprint—it is a thoughtful, multi-year developmental journey. Founded in 2010 in the San Francisco Bay Area by Dr. Amy Morgenstern ('Dr. M'), Blue Stars provides proactive, student-centered mentoring starting as early as 8th, 9th, and 10th grade. Guided by our signature 'The Calm Way' methodology, we help students eliminate admissions panic while cultivating a genuine academic 'spike' that distinguishes them in Ivy League, Stanford, and top-tier applicant pools.",
      paragraph2:
        "Rather than manufacturing a generic profile, our whole-student mentoring model uncovers each student's authentic passions. From choosing rigorous AP/IB/Honors coursework to developing high-impact summer research and leadership initiatives, we ensure every semester builds a cohesive, compelling admissions narrative.",
      targetAudience: [
        "8th, 9th, and 10th graders preparing a strategic 4-year high school trajectory",
        "11th graders seeking to clarify their academic focus and college list criteria",
        "Students targeting highly selective STEM, business, arts, or humanities programs",
        "Families who value balanced, low-stress, purposeful academic mentorship",
      ],
      keyStats: [
        { value: "16+ Years", label: "Proven Student Success" },
        { value: "Top 20", label: "Elite & UC Admissions" },
        { value: "4-Year", label: "Personalized Strategic Roadmap" },
      ],
    },
    pillars: [
      {
        title: "Academic Coursework & Curriculum Mapping",
        description:
          "Selecting the optimal balance of AP, IB, and honors courses that demonstrate intellectual rigor to top colleges without overwhelming the student.",
        highlights: [
          "Strategic 4-year class schedules tailored to intended majors",
          "Dual-enrollment and advanced university coursework advisement",
          "Executive function, study skills, and GPA optimization strategies",
        ],
      },
      {
        title: "Extracurricular & Leadership Positioning",
        description:
          "Moving beyond superficial club memberships to launch authentic, self-directed projects that demonstrate leadership and community impact.",
        highlights: [
          "Ideation of independent capstones, non-profit initiatives, and research",
          "Competition selection (Olympiads, ISEF, Scholastic Art & Writing)",
          "Demonstrating depth and commitment rather than generic resume-padding",
        ],
      },
      {
        title: "Summer Enrichment & Internship Strategy",
        description:
          "Targeting prestigious summer research programs, university labs, and internships that elevate the student's intellectual vitality.",
        highlights: [
          "Application coaching for highly selective summer programs (RSI, PROMYS, TASP/Telluride)",
          "Cold-emailing professors for high school lab internships and mentorship",
          "Designing high-impact self-directed creative or technical summer projects",
        ],
      },
      {
        title: "Standardized Testing Strategy",
        description:
          "Creating a realistic, diagnostic-backed testing timeline to maximize SAT or ACT scores while navigating modern test-optional policies.",
        highlights: [
          "Diagnostic SAT vs. ACT assessment and target score benchmarks",
          "Strategic test scheduling aligned with school workloads and AP exams",
          "Evaluation of test-optional vs. test-required policies across target institutions",
        ],
      },
    ],
    methodology: [
      {
        stepNumber: "01",
        title: "Free 30-Min Consultation & 90-Min Assessment",
        description:
          "We begin with a complimentary 30-minute discovery consultation, followed by a comprehensive 90-minute strategic assessment analyzing transcripts, diagnostic testing, extracurriculars, and personal values to map your roadmap 'The Calm Way'.",
      },
      {
        stepNumber: "02",
        title: "Custom 4-Year Academic & Extracurricular Blueprint",
        description:
          "We construct a semester-by-semester plan detailing course selections, leadership milestones, competition deadlines, and summer opportunities.",
      },
      {
        stepNumber: "03",
        title: "Ongoing Mentorship & Project Execution",
        description:
          "Bi-weekly or monthly 1-on-1 strategy check-ins ensure the student hits milestones, overcomes academic roadblocks, and develops independent initiatives.",
      },
      {
        stepNumber: "04",
        title: "Refinement & College Target Identification",
        description:
          "As the student enters junior year, we refine their college preferences, evaluate campus culture fit, and build an intentional admissions foundation.",
      },
    ],
    deliverables: [
      "Custom 4-Year High School Coursework & Exam Timeline",
      "Extracurricular Leadership & Capstone Project Execution Plan",
      "Vetted Summer Enrichment, Internship & Lab Research List",
      "Standardized Testing Strategy (SAT/ACT diagnostic roadmap)",
      "Ongoing 1-on-1 Mentorship Sessions with Detailed Parent Summaries",
      "Early College Fit & Campus Visit Guidance",
    ],
    faqs: [
      {
        question: "When is the ideal time to start college planning with Blue Stars?",
        answer:
          "Most families begin working with us in 8th, 9th, or 10th grade. Starting early allows us to strategically choose courses, establish strong study habits, and develop meaningful extracurricular initiatives before the high-pressure junior year.",
      },
      {
        question: "How does Blue Stars differ from our school counselor?",
        answer:
          "High school counselors often manage 300 to 500+ students and focus primarily on graduation requirements. Blue Stars provides boutique, dedicated 1-on-1 mentorship with frequent check-ins, insider knowledge of selective admissions, and personalized strategic planning.",
      },
      {
        question: "Do you help students who don't know what they want to study?",
        answer:
          "Yes! Exploratory students are one of our core specialties. We use reflective assessments, reading lists, and experiential micro-projects to help teens discover what excites them intellectually before finalizing their college targets.",
      },
      {
        question: "Can Blue Stars assist international students or students outside California?",
        answer:
          "Absolutely. While headquartered in the San Francisco Bay Area, Blue Stars works with students across the United States and internationally (including Asia, Europe, and Latin America) via our structured remote counseling platform.",
      },
    ],
  },

  "application-strategy": {
    slug: "application-strategy",
    title: "Application Strategy",
    badge: "STRATEGIC ADMISSIONS SERVICE",
    subtitle:
      "A rigorous, data-driven strategy covering college list architecture, Early Decision/Early Action tactical planning, and flawless application execution.",
    shortDescription:
      "Build a strong application with the right strategy and timeline.",
    accent: "blue",
    iconName: "doc",
    heroTagline: "Maximize Your Admissions Odds with Data-Backed Strategic Positioning.",
    overview: {
      heading: "Data-Driven Decisions for a Hyper-Competitive Landscape",
      intro:
        "Top-tier college admissions acceptance rates continue to hit record lows. In this environment, exceptional grades and test scores are merely the baseline. Success requires an intelligent, cohesive application strategy that aligns a student's unique profile with institutional priorities, institutional funding models, and admissions round mechanics.",
      paragraph2:
        "At Blue Stars, our senior strategists work directly with students to balance their college list into Reach, Target, and Safety tiers, master Early Decision (ED1/ED2), Early Action (EA), and Restrictive Early Action (REA) timing, and craft an unforgettable narrative that resonates with regional admissions readers.",
      targetAudience: [
        "Rising high school seniors (12th grade) preparing their college applications",
        "Second-semester juniors (11th grade) developing their initial balanced college list",
        "Students targeting Ivy League, Stanford, MIT, Duke, Northwestern, and top-tier public flagships (UCs, Michigan, UVA, UNC)",
        "Applicants applying to high-demand majors (CS, Pre-Med, Engineering, Finance)",
      ],
      keyStats: [
        { value: "Strategic", label: "Early Decision & Action Architecture" },
        { value: "100%", label: "Balanced List Architecture" },
        { value: "15+", label: "Application Portals Managed" },
      ],
    },
    pillars: [
      {
        title: "Balanced College List Architecture",
        description:
          "Developing a bespoke college list balanced across Reach, Target, and Likely tiers, grounded in admissions statistics and genuine campus culture fit.",
        highlights: [
          "Data-driven evaluation of GPA, test scores, and geographic quotas",
          "Assessment of academic programs, faculty mentorship, and career placement",
          "Financial alignment, merit scholarship probability, and affordability analysis",
        ],
      },
      {
        title: "Admissions Round Optimization (ED / EA / REA / RD)",
        description:
          "Strategically allocating Early Decision (ED1/ED2), Early Action, and Restrictive Early Action cards to multiply acceptance probabilities.",
        highlights: [
          "Evaluating Early Decision binding agreements against family financial plans",
          "Staggered submission timelines to maximize early application advantages",
          "Back-up contingency planning for Regular Decision rounds",
        ],
      },
      {
        title: "Major & Interdisciplinary Positioning",
        description:
          "Framing the applicant's academic interests to avoid hyper-saturated tracks and highlight compelling interdisciplinary intellectual spikes.",
        highlights: [
          "Framing competitive STEM/business profiles with unique humanistic angles",
          "Selecting optimal first-choice vs. second-choice majors across different universities",
          "Direct-admit program strategy (BS/MD, direct-admit business, honors colleges)",
        ],
      },
      {
        title: "Activity List & Common App Profile Engineering",
        description:
          "Transforming extracurricular activities into punchy, high-impact 150-character descriptions that convey genuine scale, leadership, and outcomes.",
        highlights: [
          "Common App 10-activity list hierarchy and impact-driven phrasing",
          "UC System 20-activity description framing with quantifiable metrics",
          "Additional Information section optimization for unusual contexts or disruptions",
        ],
      },
    ],
    methodology: [
      {
        stepNumber: "01",
        title: "Comprehensive Admissions Audit",
        description:
          "We analyze transcripts, standardized tests, academic rigor, honors, and extracurricular impact to assess applicant standing relative to target cohorts.",
      },
      {
        stepNumber: "02",
        title: "College List Architecture & Round Scheduling",
        description:
          "We finalize a curated list of 12-16 universities with strategic ED1, ED2, EA, and RD designations to optimize acceptance probabilities.",
      },
      {
        stepNumber: "03",
        title: "Portal & Profile Execution",
        description:
          "We guide line-by-line completion of the Common Application, Coalition Application, UC Application, and school-specific portals with zero margin for error.",
      },
      {
        stepNumber: "04",
        title: "Alumni & Admissions Interview Prep",
        description:
          "Mock interview sessions with former admissions committee members and Ivy alumni teach students to communicate their story with poise and authenticity.",
      },
    ],
    deliverables: [
      "Custom Balanced College List with Reach, Target, and Likely Classifications",
      "Strategic Early Decision / Early Action Timeline & Submission Schedule",
      "Optimized Common App Activity List (10 activities, 150-character polish)",
      "University of California 20-Activity Profile Engineering",
      "Letter of Recommendation Brag Sheets & Teacher Outreach Strategy",
      "1-on-1 Mock Admissions Interview Preparation & Video Feedback",
    ],
    faqs: [
      {
        question: "How many colleges should my student apply to?",
        answer:
          "We typically recommend a carefully balanced list of 12 to 16 universities: 4-5 Reach colleges, 5-6 Target colleges, and 3-4 Likely colleges where the student would genuinely be thrilled to attend.",
      },
      {
        question: "Should my student apply Early Decision (ED)?",
        answer:
          "Applying ED can significantly boost admissions chances at many elite private universities. However, ED is a binding commitment. We assess your family's financial parameters, the student's enthusiasm, and readiness before recommending an ED strategy.",
      },
      {
        question: "Do you help with University of California (UC) applications?",
        answer:
          "Yes! We have deep expertise with the UC System (UC Berkeley, UCLA, UCSD, etc.), including strategic major selection, PIQ essay strategies, and optimizing the 20-activity section.",
      },
      {
        question: "How do you handle mock interviews?",
        answer:
          "We conduct live video mock interview sessions, simulating actual alumni and admissions officer interviews. We review common and curveball questions, body language, storytelling, and impactful questions to ask the interviewer.",
      },
    ],
  },

  "essay-guidance": {
    slug: "essay-guidance",
    title: "Essay & Personal Statement Guidance",
    badge: "CREATIVE & NARRATIVE SERVICE",
    subtitle:
      "Transforming personal stories into unforgettable, deeply human personal statements and supplemental essays that captivate admissions officers.",
    shortDescription:
      "Tell your story effectively with expert feedback and support.",
    accent: "blue",
    iconName: "pencil",
    heroTagline: "Find Your Authentic Voice. Write an Essay That Admissions Committees Remember.",
    overview: {
      heading: "Beyond Proofreading: Authentic Narrative Discovery & Mentorship",
      intro:
        "Every year, admissions officers read tens of thousands of essays about winning the big game, volunteering on a mission trip, or struggling through a difficult calculus class. Generic essays get lost in the shuffle. To stand out, a student's personal statement must reveal authentic introspection, emotional maturity, intellectual curiosity, and vulnerability.",
      paragraph2:
        "Blue Stars founder Dr. Amy Morgenstern (Ph.D. in philosophy, MFA in contemporary art) and our writing mentors do not write essays for students. Instead, we use structured Socratic dialogue and deep active listening to help teens uncover their singular voice. Practicing 'The Calm Way,' we guide students piece-by-piece through iterative drafts until their essays captivate admissions committees with genuine vulnerability and insight.",
      targetAudience: [
        "High school seniors facing the Common App Personal Statement and school supplements",
        "Students applying to colleges requiring numerous supplemental essays (Stanford, Harvard, UChicago, Columbia, MIT)",
        "Applicants preparing the 4 University of California Personal Insight Questions (PIQs)",
        "STEM, pre-med, and creative students seeking standout essays and art portfolio statements",
      ],
      keyStats: [
        { value: "100%", label: "Authentic Student Voice Guaranteed" },
        { value: "4-6 Drafts", label: "Iterative Polish per Essay" },
        { value: "30+ Hours", label: "Dedicated Writing Coaching" },
      ],
    },
    pillars: [
      {
        title: "Deep-Dive Narrative Brainstorming",
        description:
          "Uncovering hidden stories, core values, and formative experiences that illuminate the student's unique worldview and character.",
        highlights: [
          "Socratic interview sessions to extract genuine moments of insight",
          "Deconstructing clichés and finding novel thematic angles",
          "Selecting the ideal Common Application prompt to frame the story",
        ],
      },
      {
        title: "Common App Personal Statement Architecture",
        description:
          "Developing a gripping narrative arc with vivid scene-setting, insightful reflection, and a memorable concluding realization.",
        highlights: [
          "Crafting attention-grabbing opening hooks that intrigue readers",
          "Mastering 'show, don't tell' storytelling techniques",
          "Demonstrating intellectual vitality and readiness for campus life",
        ],
      },
      {
        title: "Supplemental Essays & 'Why Us?' Mastery",
        description:
          "Writing hyper-specific supplemental essays that demonstrate deep institutional research, faculty alignment, and campus community contribution.",
        highlights: [
          "In-depth research on university labs, unique programs, and traditions",
          "Bespoke answers to quirky prompts (e.g. UChicago, Stanford, Yale)",
          "Avoiding copy-paste answers that fail to persuade specialized committees",
        ],
      },
      {
        title: "Multi-Tier Editorial & Senior Review",
        description:
          "Rigorous, line-by-line feedback from writing coaches and former admissions strategists to refine cadence, structure, and emotional resonance.",
        highlights: [
          "Checking tone, flow, sentence variety, and voice authenticity",
          "Ensuring total adherence to strict word limits without sacrificing nuance",
          "Final polish for grammatical precision and impactful closing statements",
        ],
      },
    ],
    methodology: [
      {
        stepNumber: "01",
        title: "Discovery & Socratic Brainstorming",
        description:
          "Through deep conversational prompts, writing exercises, and personal reflections, we extract 3-5 strong, non-cliché essay concepts.",
      },
      {
        stepNumber: "02",
        title: "Structural Outlining & Narrative Arc",
        description:
          "We map the essay's beginning, climax, and intellectual takeaway, ensuring a structured progression before writing the first full draft.",
      },
      {
        stepNumber: "03",
        title: "Iterative Drafting & Developmental Feedback",
        description:
          "Students draft in Google Docs with real-time comments, inline suggestions, and video conferences focusing on depth and voice.",
      },
      {
        stepNumber: "04",
        title: "Senior Editorial Polish & Final Sign-Off",
        description:
          "Our senior editorial board reviews the completed essay to verify that it aligns with admissions criteria and represents the student at their absolute best.",
      },
    ],
    deliverables: [
      "Common App 650-Word Personal Statement (Brainstorm to Final Polish)",
      "University of California Personal Insight Questions (4 distinct 350-word PIQs)",
      "Targeted School-Specific Supplemental Essays (for 10-15 universities)",
      "Line-by-line Developmental & Copy Editing from Senior Writing Coaches",
      "Essay Portfolio Management Spreadsheet tracking drafts and deadlines",
      "Deferred / Waitlist Letter of Continued Interest (LOCI) Coaching",
    ],
    faqs: [
      {
        question: "Will Blue Stars write or rewrite my student's essays?",
        answer:
          "Never. Admissions officers are trained to detect adult voices and AI-generated text immediately. We coach, guide, question, and polish, but the ideas, voice, and words always belong 100% to the student.",
      },
      {
        question: "How many drafts does each essay go through?",
        answer:
          "On average, the main Personal Statement undergoes 4 to 6 iterations. Supplements typically take 3 to 4 drafts until every word is purposeful and the pacing is captivating.",
      },
      {
        question: "What if my student is a STEM or business kid who hates writing?",
        answer:
          "Many of our happiest students are STEM and finance-focused! We specialize in breaking down the essay process into logical, structured steps that make writing accessible and engaging.",
      },
      {
        question: "Can you help with the UC Personal Insight Questions (PIQs)?",
        answer:
          "Yes! The UCs look for clear, direct evidence of leadership, creative problem-solving, and resilience. We help students pick the best 4 prompts and write punchy, high-impact responses.",
      },
    ],
  },

  "research-internships": {
    slug: "research-internships",
    title: "Research & Internships",
    badge: "SIGNATURE RESEARCH ACADEMY",
    subtitle:
      "Mentorship for high school students to pursue independent scientific and humanities research, university lab placements, faculty outreach, and selective summer programs.",
    shortDescription:
      "Mentorship for lab placements, Ivy League faculty outreach, original research papers, and prestigious summer programs.",
    accent: "blue",
    iconName: "research",
    heroTagline: "Cultivate Authentic Intellectual Vitality. Stand Out with Original Research.",
    overview: {
      heading: "Empowering High School Scholars with Original Research & University Placements",
      intro:
        "In today's hyper-competitive admissions landscape, stellar GPAs and high test scores alone are no longer enough for top-20 universities and Ivy League programs. Admissions committees actively seek out authentic 'intellectual vitality'—concrete evidence that a student creates knowledge, asks profound questions, and conducts meaningful inquiry beyond high school walls. Blue Stars’ Research & Internships program provides structured, 1-on-1 mentorship connecting ambitious high schoolers with real-world research opportunities.",
      paragraph2:
        "Guided by Dr. Amy Morgenstern and our network of university researchers and faculty mentors, students learn how to conduct literature reviews, formulate hypotheses, contact professors for lab positions, and submit papers to prestigious youth journals and national competitions like Regeneron STS, ISEF, and the Junior Science and Humanities Symposium (JSHS).",
      targetAudience: [
        "9th, 10th, and 11th graders seeking to build an authentic intellectual spike",
        "Aspiring STEM, Pre-Med, Computer Science, Economics, and Humanities scholars",
        "Students applying to selective summer research programs (RSI, MIT PRIMES, Simons, Clark Scholars, PROMYS)",
        "Teens eager to land university lab assistantships, clinical internships, and professor mentorship",
      ],
      keyStats: [
        { value: "100%", label: "Personalized Research Direction" },
        { value: "Ivy League", label: "Lab Placements & Faculty Outreach" },
        { value: "Top Tier", label: "Competition & Summer Program Admits" },
      ],
    },
    pillars: [
      {
        title: "Original Independent Research Capstone",
        description:
          "Guiding students through identifying novel research questions, conducting thorough literature reviews, designing experiments, and writing academic papers.",
        highlights: [
          "Topic ideation tailored to the student's unique intellectual interests",
          "Academic paper structure conforming to peer-reviewed scholarly standards",
          "Interdisciplinary research spanning STEM, machine learning, public policy, and humanities",
        ],
      },
      {
        title: "Faculty Outreach & University Lab Placements",
        description:
          "Teaching high schoolers our signature outreach methodology to secure research assistant positions and mentorship in elite university laboratories.",
        highlights: [
          "Curating targeted lists of principal investigators (PIs) and research labs",
          "Crafting professional academic CVs and personalized faculty cold emails",
          "Interview coaching for meeting professors and lab directors with confidence",
        ],
      },
      {
        title: "Prestigious Summer Research Programs",
        description:
          "Targeted application coaching for the world's most competitive high school research institutes, fellows, and STEM programs.",
        highlights: [
          "Coaching for top summer institutes (RSI, MIT PRIMES, SSP, Simons, Clark Scholars, TASP)",
          "Polishing research proposals, personal essays, and technical problem sets",
          "Strategic timeline management to submit flawless early applications",
        ],
      },
      {
        title: "Journal Publishing & Competition Submissions",
        description:
          "Assisting students in submitting their original findings to vetted academic journals and prestigious national research competitions.",
        highlights: [
          "Submission to journals such as JEI (Journal of Emerging Investigators) and The Concord Review",
          "Preparation for Regeneron STS, Regeneron ISEF, and local science fairs",
          "Integrating research findings seamlessly into Common App activity descriptions and supplements",
        ],
      },
    ],
    methodology: [
      {
        stepNumber: "01",
        title: "Curiosity Assessment & Domain Exploration",
        description:
          "We explore the student's passions through deep-dive diagnostic discussions, reading scientific and scholarly journals, and identifying high-impact areas where an authentic research project can be developed.",
      },
      {
        stepNumber: "02",
        title: "Hypothesis Formulation & Literature Review",
        description:
          "Under dedicated mentorship, the student conducts a literature review of recent studies, defines an original hypothesis or investigation, and establishes a clear methodology and timeline.",
      },
      {
        stepNumber: "03",
        title: "Execution, Mentorship & Faculty Outreach",
        description:
          "The student gathers data, conducts experiments or computational analysis, and connects with university faculty through our proven professional outreach process for lab placement.",
      },
      {
        stepNumber: "04",
        title: "Scholarly Paper, Publication & Admissions Integration",
        description:
          "We guide the final paper write-up, assist in submissions to competitions or journals, and showcase the research effectively in college essays and activity resumes.",
      },
    ],
    deliverables: [
      "Publication-Ready Independent Research Capstone Paper",
      "Curated Faculty Outreach List & Tailored Cold-Email Templates",
      "Professional Academic CV & Resume for High School Researchers",
      "Selective Summer Program Application Roadmap (RSI, MIT PRIMES, SSP, etc.)",
      "Science Fair & Competition Submission Plan (Regeneron STS, ISEF, JSHS)",
      "Letters of Recommendation Strategy from Research Mentors and PIs",
    ],
    faqs: [
      {
        question: "Does my student need prior research experience to join?",
        answer:
          "No prior research experience is required. We work with students who have a genuine spark of curiosity and guide them from foundational academic reading to designing and completing an original, high-level project.",
      },
      {
        question: "How do students secure research positions with university professors?",
        answer:
          "We teach students Dr. M's proven faculty outreach framework. This includes identifying active professors whose research aligns with the student's goals, preparing an academic CV, drafting respectful, individualized cold emails, and conducting mock interview prep.",
      },
      {
        question: "Is research only for STEM students or also for humanities and social sciences?",
        answer:
          "Both! While many students conduct research in computational biology, physics, AI, and chemistry, we also mentor students in economics, historical analysis (such as papers for The Concord Review), political science, and philosophy.",
      },
      {
        question: "How does conducting research elevate a college application?",
        answer:
          "Top-tier universities like Stanford, MIT, and Ivy League schools look for deep intellectual vitality. An original research paper, a prestigious summer program admit, or a letter of recommendation from a university research mentor demonstrates maturity, academic initiative, and genuine readiness for undergraduate scholarship.",
      },
    ],
  },

  "college-admissions-consulting": {
    slug: "college-admissions-consulting",
    title: "College Admissions Consulting",
    badge: "COMPREHENSIVE ADMISSIONS SERVICE",
    subtitle:
      "Individually tailored advising, coaching, and mentoring to ignite curiosity and motivation, designed to empower students to build authentic and most comprehensive college applications.",
    shortDescription:
      "Individually tailored advising, coaching, and mentoring to ignite curiosity and motivation.",
    accent: "blue",
    iconName: "compass",
    heroTagline: "Ignite Curiosity. Foster Authenticity. Build Confidence for Top-Tier Admissions.",
    overview: {
      heading: "The Blue Stars Way: Fostering Curiosity, Authenticity & Confidence",
      intro:
        "At Blue Stars Admissions Consulting, we believe higher education advising should be transformative rather than transactional. Founded in 2010 by Dr. Amy Morgenstern ('Dr. M'), our practice mentors students to navigate competitive admissions 'The Calm Way'—cultivating genuine intellectual curiosity, personal resilience, and authentic student voice.",
      paragraph2:
        "In today's hyper-competitive admissions landscape, strong grades and test scores alone are rarely enough. Admissions committees look for distinct intellectual spikes, authentic leadership, and self-directed initiatives. We guide teens to discover what genuinely excites them, helping them construct a compelling, cohesive high school profile and application narrative that captivates regional admissions readers.",
      targetAudience: [
        "High school students (8th–12th grade) targeting selective US universities",
        "Applicants seeking individualized, multi-year strategic roadmap planning",
        "Students navigating competitive STEM, Humanities, Business, or Pre-Med pathways",
        "Families seeking low-stress, purposeful advising that preserves family harmony",
      ],
      keyStats: [
        { value: "16+ Years", label: "Proven Advisory Experience" },
        { value: "Top 20", label: "Elite & UC Admissions" },
        { value: "100%", label: "Authentic Student Narrative" },
      ],
    },
    pillars: [
      {
        title: "Curiosity & Intellectual Passion",
        description:
          "Finding what students are genuinely fascinated by, helping them develop high-impact academic interests, capstones, and self-directed projects.",
        highlights: [
          "Identification of authentic intellectual curiosity and academic spikes",
          "Exploration of niche research topics and university lab opportunities",
          "Independent capstone project ideation and execution support",
        ],
      },
      {
        title: "Authentic Student Voice",
        description:
          "Cultivating writing and communication that reflects the student's real personality, values, and perspective rather than canned admissions formulas.",
        highlights: [
          "Socratic dialogue to uncover singular, personal stories",
          "Eliminating clichés and generic extracurricular narratives",
          "Developing introspective, compelling personal statements",
        ],
      },
      {
        title: "Confidence & Resilience",
        description:
          "Instilling the executive function, self-reliance, and grit needed to thrive throughout the high school journey, the admissions process, and university life.",
        highlights: [
          "Executive function, time management, and study habit coaching",
          "Low-stress milestone tracking following 'The Calm Way'",
          "Building interview poise and self-advocacy skills",
        ],
      },
      {
        title: "Balanced List & Strategic Positioning",
        description:
          "Structuring a data-backed college list across Reach, Target, and Likely tiers aligned with institutional funding models and admissions odds.",
        highlights: [
          "Curated 12-16 college portfolio based on academic and cultural fit",
          "Early Decision (ED1/ED2) and Early Action timing optimization",
          "Holistic Common App, Coalition, and UC profile packaging",
        ],
      },
    ],
    methodology: [
      {
        stepNumber: "01",
        title: "Free 30-Minute Consultation",
        description:
          "Initial discovery conversation to understand your student's unique personality, academic trajectory, and your family's college goals.",
      },
      {
        stepNumber: "02",
        title: "90-Minute Strategic Assessment & Roadmap",
        description:
          "Comprehensive diagnostic evaluation of transcripts, testing benchmarks, and extracurriculars to build a customized multi-year roadmap.",
      },
      {
        stepNumber: "03",
        title: "Multi-Year Mentorship & Execution",
        description:
          "Regular 1-on-1 strategy check-ins guiding course rigor, summer research internships, leadership initiatives, and standardized testing.",
      },
      {
        stepNumber: "04",
        title: "Application Sprint & Flawless Submission",
        description:
          "Line-by-line portal execution, reflective essay mentorship, brag sheets, and mock admissions interviews ensuring confident submissions.",
      },
    ],
    deliverables: [
      "Custom Multi-Year High School Coursework & Milestone Roadmap",
      "Balanced Reach, Target, and Likely College List Architecture",
      "Common App & UC 20-Activity List Engineering with Impact Phrasing",
      "Authentic Personal Statement & Supplemental Essay Coaching",
      "1-on-1 Mock Admissions Interview Preparation & Video Feedback",
      "Comprehensive Parent Updates & Strategic Milestone Check-ins",
    ],
    faqs: [
      {
        question: "When is the best time to start College Admissions Consulting?",
        answer:
          "We work with students from 8th grade through 12th grade. Starting earlier allows us to strategically shape course selection, build executive function, and cultivate authentic extracurricular leadership before the application crunch.",
      },
      {
        question: "How does 'The Blue Stars Way' differ from traditional college counseling?",
        answer:
          "Unlike transactional agencies that churn out cookie-cutter applications, Blue Stars takes a whole-student mentorship approach. We focus on personal growth, active listening, and genuine intellectual curiosity so students shine authentically.",
      },
      {
        question: "Do you guide students targeting Ivy League and top-30 colleges?",
        answer:
          "Yes. Our students consistently earn acceptances to Stanford, Harvard, MIT, Princeton, UC Berkeley, Columbia, Yale, and other selective institutions across the country.",
      },
      {
        question: "How do you help students stand out in hyper-competitive fields like STEM or Business?",
        answer:
          "We help students develop an intellectual 'spike'—combining technical prowess with interdisciplinary humanities, independent research, or community leadership that demonstrates genuine depth rather than standard resume-padding.",
      },
    ],
    consultationBanner: {
      kicker: "MAKE ADMISSIONS STRESS-FREE",
      heading: "Make College Admissions Stress-Free & Exciting",
      description:
        "Schedule your free discovery session to understand where your student stands and chart an actionable roadmap toward dream college acceptances.",
      bullets: [
        "Free 30-minute one-on-one consultation with senior advisors",
        "Assessment of student strengths, extracurricular profile, and goals",
        "Actionable roadmap tailored specifically to your family's timeline",
        "No pressure, transparent advising built on 'The Calm Way'",
      ],
      ctaText: "Schedule Free Consultation",
      ctaHref: "/#contact",
    },
    stories: [
      {
        kicker: "COMPETITIVE EDGE",
        title: "Ready to get the competitive edge your student needs?",
        paragraphs: [
          "At Blue Stars, we provide comprehensive college admissions advising tailored to high school students aiming for selective universities.",
          "Through 1-on-1 mentorship, students discover their core strengths, explore academic and extracurricular passions, and craft memorable application narratives.",
          "Our alumni have been admitted to top institutions nationwide, including Ivy League, UC campuses, and premier national universities.",
        ],
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
        alt: "High school student feeling confident about college admissions",
        imagePosition: "left",
        ctaText: "Schedule a Consultation",
        ctaHref: "/#contact",
      },
      {
        kicker: "PROACTIVE PREPARATION",
        title: "Start early to get ahead in the admissions process",
        paragraphs: [
          "Admissions committees at top universities look for sustained commitment and intellectual vitality developed over multiple years. Starting early gives students the time to explore authentic interests without overwhelming pressure.",
        ],
        bullets: [
          "Early profile building & coursework strategy (9th & 10th grade)",
          "Strategic course selection, AP/IB balancing & GPA management",
          "Meaningful extracurricular leadership & independent capstone impact",
          "Standardized testing strategy & diagnostic milestone tracking",
        ],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        alt: "Student working on academic planning and college roadmap",
        imagePosition: "right",
        ctaText: "Explore Early Planning Roadmap",
        ctaHref: "/services/college-planning",
      },
    ],
    specializedService: {
      kicker: "OUR SERVICE SCOPE",
      title: "Curious to see how we work?",
      description:
        "From initial self-discovery to final acceptance letters, our comprehensive advising covers every dimension of the application cycle.",
      bullets: [
        "Personalized college list research tailored to student personality and values",
        "Comprehensive application & personal statement guidance across Common App and UC portals",
        "Interview preparation and extracurricular portfolio enhancement",
        "Recommendation letter strategy and line-by-line deadline tracking",
      ],
      tags: [
        "Discover Your Path",
        "Strategic Positioning",
        "Flawless Execution",
      ],
      ctaText: "Book Your 30-Min Consultation",
      ctaHref: "/#contact",
    },
    testimonials: [
      {
        quote:
          "With Blue Stars, my daughter felt supported and confident every step of the way. She got accepted to her dream school at UC Berkeley! The Calm Way kept our whole family centered.",
        author: "Sarah M.",
        role: "Parent of UC Berkeley Admit",
      },
      {
        quote:
          "Working with Dr. Amy and the Blue Stars team completely transformed my application. They helped me discover what made my story special and how to articulate it authentically to Stanford.",
        author: "David L.",
        role: "Stanford University Class of '28 Admit",
      },
    ],
  },

  "art-admissions-consulting": {
    slug: "art-admissions-consulting",
    title: "Art Admissions Consulting",
    badge: "SPECIALIZED CREATIVE SERVICE",
    subtitle:
      "Build a stunning art portfolio and create a captivating artist statement that highlights skills, concept, commitment, critical independent creative thought, and connection to your vision.",
    shortDescription:
      "Build a stunning art portfolio and create a captivating artist statement for top art programs.",
    accent: "green",
    iconName: "palette",
    heroTagline: "Showcase Technical Mastery. Articulate Creative Vision. Secure Top Art Program Admissions.",
    overview: {
      heading: "Results-Driven Visual Arts & Design Portfolio Mentorship",
      intro:
        "Securing admission and prestigious merit scholarships to elite art schools and top university visual arts departments requires far more than technical proficiency. Admissions committees look for conceptual depth, creative risk-taking, sketchbook experimentation, and a distinctive personal vision.",
      paragraph2:
        "Blue Stars founder Dr. Amy Morgenstern holds an MFA in contemporary art and has taught university art theory and honors seminars. She provides piece-by-piece studio critiques, conceptual mentorship, and artist statement coaching. Whether you are aiming for specialized art academies (RISD, CalArts, Pratt, Parsons, SAIC) or premier university visual arts supplements (Ivy League, UCLA, USC, Carnegie Mellon), we help you assemble a cohesive, breathtaking body of work.",
      targetAudience: [
        "High school students applying to BFA, BA, or BS in Fine Arts, Design, Architecture, or Animation",
        "High-achieving applicants building supplemental visual arts portfolios for Ivy League and top universities",
        "Young artists seeking portfolio curation, critique, and National Portfolio Day preparation",
        "Creatives looking to craft authentic artist statements and win Scholastic Art & Writing Awards",
      ],
      keyStats: [
        { value: "MFA Led", label: "Contemporary Art Faculty Mentorship" },
        { value: "12-20", label: "Curated Original Works per Portfolio" },
        { value: "Top BFA", label: "Acceptances & Merit Recognition" },
      ],
    },
    pillars: [
      {
        title: "Standout Visual Portfolio Curation",
        description:
          "Curating a cohesive body of 12-20 original works demonstrating technical skill, conceptual depth, and personal artistic voice.",
        highlights: [
          "Medium exploration across drawing, painting, sculpture, and digital media",
          "Strategic balance of observational drawing and conceptual storytelling",
          "Selecting optimal pieces that showcase range and technical proficiency",
        ],
      },
      {
        title: "Captivating Artist Statement Coaching",
        description:
          "Articulating creative process, inspirations, and philosophical vision with authentic, articulate, and compelling prose.",
        highlights: [
          "Translating visual concepts into insightful written statements",
          "Writing piece-by-piece descriptive captions for SlideRoom",
          "Aligning the artist statement with the student's broader college application",
        ],
      },
      {
        title: "Top Art & Design Program Strategy",
        description:
          "Navigating specific faculty preferences and admissions criteria for premier art academies and selective university art departments.",
        highlights: [
          "Targeting programs like RISD, CalArts, Pratt, Parsons, SAIC, and ArtCenter",
          "Crafting visual arts supplements for Ivy League, Stanford, and UC campuses",
          "Strategic targeting of generous 4-year institutional merit scholarships",
        ],
      },
      {
        title: "Sketchbook & Process Documentation",
        description:
          "Highlighting the artistic journey, preliminary studies, creative risk-taking, and iterative problem-solving that admissions deans prize.",
        highlights: [
          "Curating sketchbook spreads showing experimentation and research",
          "Documenting step-by-step creative process and conceptual evolution",
          "Preparation for National Portfolio Day and mock faculty critiques",
        ],
      },
    ],
    methodology: [
      {
        stepNumber: "01",
        title: "Free Portfolio Diagnostic & Consultation",
        description:
          "We review existing artwork, sketchbook studies, and creative ambitions to assess technical foundation and conceptual direction.",
      },
      {
        stepNumber: "02",
        title: "90-Minute Creative Strategy Assessment",
        description:
          "Evaluating target art schools and university programs, identifying portfolio thematic gaps, and setting production milestones.",
      },
      {
        stepNumber: "03",
        title: "Studio Mentorship & Project Production",
        description:
          "Ongoing piece-by-piece studio critiques, medium experimentation, and iterative development of 12 to 20 core original works.",
      },
      {
        stepNumber: "04",
        title: "Curatorial Selection & SlideRoom Submission",
        description:
          "Final artwork ordering, professional high-resolution photography documentation, artist statement polish, and portal uploads.",
      },
    ],
    deliverables: [
      "Comprehensive Visual Arts Portfolio Audit & Thematic Gap Analysis",
      "12–20 Curated Portfolio Works Prepared for SlideRoom Upload",
      "Professional High-Resolution Artwork Photography Guidance",
      "Tailored Artist Statement & Piece-by-Piece Descriptive Captions",
      "National Portfolio Day Preparation & Mock Faculty Critiques",
      "Specialized Art School & University Supplemental Application Strategy",
    ],
    faqs: [
      {
        question: "What do art school admissions committees look for in a high school portfolio?",
        answer:
          "Committees look for technical proficiency (such as observational drawing and composition), but more importantly, conceptual curiosity, creative risk-taking, personal voice, and an authentic point of view.",
      },
      {
        question: "Does my student need to major in art to submit a visual arts portfolio?",
        answer:
          "No! Many of our students submit visual arts supplements to competitive universities (including Stanford, Harvard, Columbia, and Brown) alongside majors in Computer Science, Biology, or Humanities to demonstrate creative thinking.",
      },
      {
        question: "How early should a student begin building their art portfolio?",
        answer:
          "Ideally by sophomore or early junior year, which provides ample time to experiment with new mediums, generate a large body of work, and curate only the strongest 12 to 20 pieces.",
      },
      {
        question: "Do you help with National Portfolio Day preparation?",
        answer:
          "Yes. We conduct mock portfolio reviews simulating real faculty critiques, teaching students how to present their artwork, explain their process, and receive constructive feedback with confidence.",
      },
    ],
    consultationBanner: {
      kicker: "PORTFOLIO DIAGNOSTIC",
      heading: "Make Your Art Portfolio Review Stress-Free",
      description:
        "Schedule your free 30-minute portfolio diagnostic with Dr. Amy Morgenstern (MFA in contemporary art, former university faculty) to evaluate current artwork and target elite art schools.",
      bullets: [
        "Free 30-minute portfolio diagnostic and preliminary review",
        "Direct feedback from MFA-trained faculty on technique and concept",
        "Clear roadmap of needed pieces, thematic series, and media variety",
        "Strategic list of art school & university visual arts opportunities",
      ],
      ctaText: "Schedule Portfolio Diagnostic",
      ctaHref: "/#contact",
    },
    stories: [
      {
        kicker: "DREAM ART PROGRAMS",
        title: "Let's get your teen ready for the ART PROGRAM of their dreams",
        paragraphs: [
          "Applying to competitive BFA, BA, and architecture programs requires far more than technical drawing skills. Admissions committees look for distinct artistic voice, conceptual curiosity, and experimental drive.",
          "Led by Dr. Amy Morgenstern—who holds an MFA in contemporary art and taught university-level studio art—Blue Stars provides unmatched artistic mentorship.",
          "We guide students through idea generation, medium experimentation, and iterative critique, transforming raw talent into cohesive, high-impact portfolios.",
        ],
        image: "/images/services/others_images/Dream _art_Programs.png",
        alt: "Young artist in ceramic and painting studio working on portfolio artwork",
        imagePosition: "left",
        ctaText: "Schedule an Art Consultation",
        ctaHref: "/#contact",
      },
      {
        kicker: "EARLY ART DEVELOPMENT",
        title: "Start early to get ahead in art admissions",
        paragraphs: [
          "Building a premier visual arts portfolio cannot be rushed. Developing technical mastery and conceptual maturity requires time to experiment, iterate, and refine.",
        ],
        bullets: [
          "9th & 10th Grade: Medium exploration, observational drawing foundation, and conceptual sketchbook development",
          "11th Grade: Deep thematic focus, sustained series creation, and summer pre-college program applications",
          "12th Grade: Portfolio curation, professional photography/documentation, SlideRoom formatting, and artist statement writing",
        ],
        image: "/images/services/others_images/Early _art_Development.png",
        alt: "Artist painting on canvas easel developing high school art portfolio",
        imagePosition: "right",
        ctaText: "Explore Art Portfolio Roadmap",
        ctaHref: "/#contact",
      },
    ],
    specializedService: {
      kicker: "OUR SPECIALIZED ART SCOPE",
      title: "Specialized Art Admissions Consulting Services",
      description:
        "Whether applying directly to specialized art academies or preparing visual arts supplements for elite research universities, we tailor every aspect to your student's creative vision.",
      bullets: [
        "Curated portfolio selection: 12-20 original works tailored to individual school criteria",
        "In-depth artist statement and essay drafting connecting personal voice to creative concept",
        "SlideRoom media uploads and technical specifications (aspect ratio, lighting, color correction)",
        "National Portfolio Day preparation and live faculty review simulation",
      ],
      tags: [
        "BFA Studio Art Programs",
        "Visual Arts Supplements",
        "Design & Architecture Portfolios",
      ],
      ctaText: "Book Your Portfolio Diagnostic",
      ctaHref: "/#contact",
    },
    testimonials: [
      {
        quote:
          "Dr. Amy's feedback transformed my portfolio. Her insights as an MFA artist pushed my conceptual boundaries. I received acceptances to RISD and Pratt with a $28,000/yr merit scholarship!",
        author: "Elena R.",
        role: "Admitted to RISD & Pratt Institute",
      },
      {
        quote:
          "Blue Stars helped my son organize his artwork, write a stunning artist statement, and present his architectural drawings with absolute clarity. The guidance was indispensable.",
        author: "Marcus T.",
        role: "Parent of Brown University Visual Arts Admit",
      },
    ],
  },
};

