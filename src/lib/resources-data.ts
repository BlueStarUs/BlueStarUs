export interface ResourceGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Strategy" | "Essays" | "UC System" | "Checklists" | "High School";
  description: string;
  coverImage: string;
  pages: number;
  readTime: string;
  downloadCount: string;
  updatedAt: string;
  featured?: boolean;
  highlights: string[];
  tableOfContents: string[];
  targetAudience: string;
}

export interface WebinarItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  speaker: {
    name: string;
    role: string;
    avatar: string;
  };
  status: "upcoming" | "past";
  duration: string;
  category: string;
  description: string;
  topics: string[];
  takeaways: string[];
  registrationUrl?: string;
  recordingUrl?: string;
}

export interface VideoResource {
  id: string;
  slug: string;
  title: string;
  category: "Masterclass" | "Campus Tours" | "Student Stories" | "Admissions Q&A";
  duration: string;
  speaker: string;
  description: string;
  thumbnail: string;
  keyTopics: string[];
  featured?: boolean;
}

export interface FAQCategoryItem {
  category: string;
  description: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: "ivy-t20-playbook",
    slug: "ivy-league-t20-playbook",
    title: "The Ivy League & Top 20 Admissions Playbook",
    subtitle: "A multi-year strategic blueprint for highly selective college admissions.",
    category: "Strategy",
    description: "Learn how top universities evaluate applications holistically, how to build an undeniable spike, and how to position your high school activities for maximum institutional impact.",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    pages: 42,
    readTime: "25 min read",
    downloadCount: "4,820+",
    updatedAt: "Fall 2024",
    featured: true,
    highlights: [
      "Deconstructing the 'Holistic Scoring Rubric' used by Ivy League committees",
      "How to craft a coherent academic and extracurricular 'Spike'",
      "Timeline and milestones from 9th grade through 12th grade",
      "Strategies for securing glowing letters of recommendation from teachers",
    ],
    tableOfContents: [
      "1. Introduction: The Changing Paradigm of Top 20 Admissions",
      "2. The Academic Foundation: Course Rigor and Transcripts",
      "3. Developing Your Spike: Beyond Surface-Level Clubs",
      "4. The Common App Strategic Narrative Architecture",
      "5. Letters of Recommendation: What Admissions Officers Actually Read",
      "6. Early Decision vs. Early Action vs. Regular Decision Tactics",
    ],
    targetAudience: "High school 9th–11th graders and parents targeting Ivy League, Stanford, MIT, and Top 25 universities.",
  },
  {
    id: "uc-piq-handbook",
    slug: "uc-piq-writing-handbook",
    title: "University of California PIQ Mastery Handbook",
    subtitle: "Complete analysis, prompts breakdown, and annotated winning essays for the UC system.",
    category: "UC System",
    description: "Step-by-step guidance on all 8 Personal Insight Questions (PIQs), how UC readers evaluate them without interviews or teacher recommendations, and how to write clear, context-rich responses.",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    pages: 36,
    readTime: "20 min read",
    downloadCount: "6,150+",
    updatedAt: "Updated for 2024–2025",
    featured: true,
    highlights: [
      "Breakdown of all 8 UC Personal Insight Prompts",
      "Annotated real essays from admitted UC Berkeley & UCLA applicants",
      "The 'Context, Action, Result' formula for 350-word limits",
      "UC Activities List optimization strategies (20 slots explained)",
    ],
    tableOfContents: [
      "1. How UC Admissions Differs from the Common Application",
      "2. Prompt-by-Prompt Strategy & Brainstorming Exercises",
      "3. Real Student Essay Breakdowns (Accepted to Cal & UCLA)",
      "4. Maximizing the 20 UC Activities and Awards Entries",
      "5. Common Mistakes That Derail UC Applications",
    ],
    targetAudience: "California residents and out-of-state/international applicants targeting UC Berkeley, UCLA, UCSD, UC Irvine, and UC Davis.",
  },
  {
    id: "common-app-essay-guide",
    slug: "common-application-essay-guide",
    title: "The Ultimate Common App Personal Statement Guide",
    subtitle: "Finding your authentic voice and crafting an unforgettable 650-word personal essay.",
    category: "Essays",
    description: "Our signature essay-writing methodology created by Dr. Amy Morgenstern. Discover how to brainstorm non-cliché topics, identify your core emotional truth, and avoid generic tropes.",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    pages: 38,
    readTime: "22 min read",
    downloadCount: "5,340+",
    updatedAt: "Fall 2024",
    featured: true,
    highlights: [
      "The 'Vulnerability and Reflection' matrix that catches admissions eyes",
      "How to avoid the 'Sports Injury' and 'Mission Trip' cliché traps",
      "5 complete drafts showing the evolution from rough sketch to finished piece",
      "Hook styles: 4 narrative openings that immediately engage the reader",
    ],
    tableOfContents: [
      "1. The Core Purpose of the Personal Statement",
      "2. Brainstorming Exercises to Unearth Your Authentic Theme",
      "3. Structuring Your Essay: Narrative Arc vs. Montage Framework",
      "4. The Art of Reflection: Showing Emotional Maturity",
      "5. Word Economy & Line-Editing Polish",
    ],
    targetAudience: "Rising seniors and high school students preparing to write their main college personal statements.",
  },
  {
    id: "high-school-checklist-timeline",
    slug: "high-school-4-year-timeline",
    title: "9th–12th Grade College Planning Master Checklist",
    subtitle: "Month-by-month actionable milestones for coursework, testing, activities, and summer planning.",
    category: "Checklists",
    description: "Never miss a deadline or milestone. This comprehensive PDF timeline provides a structured calendar from freshman orientation through senior decision day.",
    coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    pages: 24,
    readTime: "15 min read",
    downloadCount: "7,890+",
    updatedAt: "2024–2025 Edition",
    highlights: [
      "Grade-by-grade academic course selection guidance",
      "Summer program planning calendars (deadlines in Nov–Feb)",
      "Standardized testing timetable (Digital SAT, ACT, and APs)",
      "Financial aid preparation dates (FAFSA and CSS Profile)",
    ],
    tableOfContents: [
      "1. Freshman Year: Establishing Habits and Exploration",
      "2. Sophomore Year: Depth, Leadership, and Standardized Test Prep",
      "3. Junior Year: The Pivotal Academic Term & College List Building",
      "4. Summer Before Senior Year: Essay Bootcamps and Early Strategy",
      "5. Senior Year: Application Sprints, Deadlines, and Financial Aid",
    ],
    targetAudience: "High school parents, counselors, and students seeking structured multi-year roadmaps.",
  },
  {
    id: "summer-programs-research-guide",
    slug: "summer-programs-research-guide",
    title: "Summer Programs & Independent Research Directory",
    subtitle: "A curated guide to selective summer programs, STEM labs, arts residencies, and publishing.",
    category: "High School",
    description: "Detailed evaluation of over 75+ free and selective summer programs (RSI, COSMOS, SSP, TASP, Clark Scholars) versus fee-based pay-to-play programs.",
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    pages: 32,
    readTime: "18 min read",
    downloadCount: "3,950+",
    updatedAt: "2024 Edition",
    highlights: [
      "The Tier 1 vs Tier 4 summer program breakdown (what colleges actually value)",
      "Cold-emailing professors for high school research assistant positions",
      "Independent science fair competitions (ISEF, STS, Regeneron)",
      "Humanities, creative writing, and arts summer residency deadlines",
    ],
    tableOfContents: [
      "1. Debunking Pay-to-Play College Summer Camp Myths",
      "2. The Most Prestigious Free/Merit-Based STEM & Humanities Programs",
      "3. How to Cold-Email University Professors (Templates Included)",
      "4. Independent Passion Projects and Community Organizations",
    ],
    targetAudience: "Ambitious 9th–11th grade students looking to maximize their summer break.",
  },
  {
    id: "financial-aid-scholarships-toolkit",
    slug: "financial-aid-scholarship-toolkit",
    title: "College Financial Aid & Merit Scholarship Toolkit",
    subtitle: "How to maximize institutional aid, appeal awards, and win competitive outside scholarships.",
    category: "Strategy",
    description: "Demystifying FAFSA, CSS Profile, institutional methodology, and merit aid grids so your family can access tens of thousands of dollars in college funding.",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    pages: 30,
    readTime: "18 min read",
    downloadCount: "3,410+",
    updatedAt: "Updated for New FAFSA",
    highlights: [
      "Understanding the Student Aid Index (SAI) calculation",
      "List of 50+ top colleges offering generous non-need-based merit awards",
      "Step-by-step financial aid appeal letter templates",
      "CSS Profile asset reporting rules and strategies",
    ],
    tableOfContents: [
      "1. How Financial Aid Truly Works: Need vs. Merit",
      "2. Navigating the Simplified FAFSA and CSS Profile",
      "3. Finding Generous Colleges (The 'Net Price' Mindset)",
      "4. Writing an Effective Appeal Letter for More Aid",
    ],
    targetAudience: "Families of all income brackets planning for college tuition and seeking merit scholarships.",
  },
];

export const WEBINARS_DATA: WebinarItem[] = [
  {
    id: "webinar-t20-blueprint",
    slug: "t20-admissions-mastery-webinar",
    title: "Demystifying Highly Selective Admissions in 2024–2025",
    subtitle: "Insider strategies for standing out at Ivy League, Stanford, MIT, and Top 25 universities.",
    date: "Wednesday, November 20, 2024",
    time: "5:30 PM – 7:00 PM PST",
    speaker: {
      name: "Dr. Amy Morgenstern",
      role: "Founder & Master Admissions Strategist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
    status: "upcoming",
    duration: "90 min (including 30-min live Q&A)",
    category: "Admissions Strategy",
    description: "Join Dr. Amy Morgenstern for an in-depth analysis of recent admissions cycles, test-optional policies, affirmative action rulings, and how high schoolers can build authentic, memorable applications.",
    topics: [
      "How top college admissions officers read files in 8 minutes or less",
      "Building a compelling extracurricular spike that showcases intellectual curiosity",
      "The role of high school context and counselor recommendations",
      "Live interactive Q&A where Dr. Amy answers parent and student questions",
    ],
    takeaways: [
      "Actionable 9–12th grade roadmap",
      "Checklist of what matters vs what is a waste of time in high school",
      "Free downloadable presentation slides and resource bundle",
    ],
    registrationUrl: "/contact",
  },
  {
    id: "webinar-uc-admissions-secrets",
    slug: "uc-admissions-secrets-masterclass",
    title: "Cracking the UC System: Berkeley, UCLA, and Beyond",
    subtitle: "How to maximize your chances across all nine University of California undergraduate campuses.",
    date: "Tuesday, December 3, 2024",
    time: "6:00 PM – 7:30 PM PST",
    speaker: {
      name: "Helen C.",
      role: "Senior UC Admissions Specialist & Lead Mentor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    },
    status: "upcoming",
    duration: "90 min with live audience Q&A",
    category: "UC Admissions",
    description: "With record application volumes at UCLA and Berkeley, navigating the UC comprehensive review requires strategic precision. Learn how to write PIQs that score high and how the UC algorithm ranks applicants.",
    topics: [
      "The 13 Factors of UC Comprehensive Review explained",
      "How to choose the best 4 of the 8 Personal Insight Prompts",
      "Maximizing the 350-character limit on the 20 UC activity slots",
      "Out-of-state and international applicant strategies for the UC system",
    ],
    takeaways: [
      "UC PIQ Brainstorming Worksheet",
      "Activities List formatting template",
      "Video replay recording available for all registered attendees",
    ],
    registrationUrl: "/contact",
  },
  {
    id: "webinar-stem-humanities-spike",
    slug: "building-compelling-passion-project",
    title: "Building an Authentic High School Passion Project",
    subtitle: "From independent scientific research to community initiatives that win admissions.",
    date: "Past Recording (October 2024)",
    time: "Recorded Live Session",
    speaker: {
      name: "Dr. Amy Morgenstern & BlueStars Counselors",
      role: "Founder & Admissions Mentors",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
    status: "past",
    duration: "75 min on-demand replay",
    category: "Extracurriculars",
    description: "Admissions committees are exhausted by laundry lists of disconnected clubs. In this recorded session, we show how students identified their authentic interests to create impactful initiatives, non-profits, and research papers.",
    topics: [
      "How to find your genuine 'Why' and turn it into a tangible project",
      "Case studies: Real students who launched literacy programs, robotics camps, and published research",
      "Avoiding the appearance of 'admissions resume padding'",
      "How to describe projects on the Common Application and resume",
    ],
    takeaways: [
      "Independent Project Action Plan PDF",
      "Faculty cold email templates for high school research",
      "Immediate on-demand streaming access",
    ],
    recordingUrl: "/contact",
  },
  {
    id: "webinar-art-portfolio-excellence",
    slug: "art-portfolio-architecture-admissions",
    title: "Visual Arts, Design & Architecture Portfolio Strategy",
    subtitle: "Curating a standout Slideroom portfolio for RISD, Cooper Union, Cornell, and top art programs.",
    date: "Past Recording (September 2024)",
    time: "Recorded Live Session",
    speaker: {
      name: "BlueStars Arts Advisory Team",
      role: "Senior Arts Portfolio Mentors",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    status: "past",
    duration: "80 min on-demand replay",
    category: "Art Admissions",
    description: "A deep dive into how art school faculty and university admissions review portfolios. Learn the balance between observational drawing, experimental media, and personal voice.",
    topics: [
      "The anatomy of a winning 15–20 piece portfolio",
      "Writing a captivating artist statement that complements your artwork",
      "Applying to specialized art colleges (RISD, CalArts, Pratt) vs. university art departments (Brown, USC, UCLA)",
      "High-resolution digital photography and lighting techniques for artwork",
    ],
    takeaways: [
      "Art School Portfolio Guidelines Comparison Sheet",
      "Artist Statement Outline & Sample Prompts",
    ],
    recordingUrl: "/contact",
  },
];

export const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: "video-essay-brainstorming",
    slug: "essay-brainstorming-blueprint",
    title: "How to Brainstorm an Authentic College Essay Topic",
    category: "Masterclass",
    duration: "14:20",
    speaker: "Dr. Amy Morgenstern",
    description: "Discover our core brainstorming exercises that help students bypass clichés and unearth personal stories that genuinely move admissions officers.",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    keyTopics: ["Core Value Identification", "Story Arc Techniques", "Vulnerability vs. TMI", "Finding Your Voice"],
    featured: true,
  },
  {
    id: "video-uc-application-walkthrough",
    slug: "complete-uc-application-walkthrough",
    title: "Complete UC Application Walkthrough: Step-by-Step",
    category: "Masterclass",
    duration: "22:45",
    speaker: "Helen C., Senior Counselor",
    description: "Watch a senior counselor walk through the entire University of California portal, showing how to avoid common pitfalls in the academic history and activities sections.",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    keyTopics: ["UC Portal Navigation", "Reporting AP & Honors Courses", "Activities Description Optimization", "PIQ Upload Process"],
    featured: true,
  },
  {
    id: "video-stanford-admit-story",
    slug: "student-journey-to-stanford",
    title: "Student Story: How Alya Found Her Niche and Got Into Stanford",
    category: "Student Stories",
    duration: "18:10",
    speaker: "Alya (Stanford Admit) & Helen",
    description: "BlueStars student Alya shares how she worked with Helen to create a niche science-literacy initiative, narrow down summer research programs, and write reflective essays that earned admission to Stanford.",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    keyTopics: ["STEM & Humanities Synthesis", "Independent Science Literacy Non-Profit", "High School Habits", "Authentic Mentorship"],
    featured: true,
  },
  {
    id: "video-campus-tour-nyu",
    slug: "campus-tours-nyu-stern-experience",
    title: "Campus Insight: Inside NYU Stern & The Liberal Studies Program",
    category: "Campus Tours",
    duration: "12:35",
    speaker: "BlueStars Student Ambassadors",
    description: "Get an unfiltered look at student life in Greenwich Village, internships in NYC, and the transition from high school to a major global university.",
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    keyTopics: ["NYU Campus Culture", "Stern Business Academics", "Living in NYC", "Application Advice"],
  },
  {
    id: "video-risd-portfolio-critique",
    slug: "risd-accepted-portfolio-walkthrough",
    title: "Portfolio Breakdown: Inside Jeanie's Accepted RISD Portfolio",
    category: "Student Stories",
    duration: "16:50",
    speaker: "Jeanie (RISD Student)",
    description: "Explore the sketchbooks, mixed media works, and personal artist statements that helped Jeanie gain acceptance to the prestigious Rhode Island School of Design.",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    keyTopics: ["Sketchbook Development", "Observational vs Conceptual Art", "Artist Statements", "RISD Assignment Tips"],
  },
  {
    id: "video-letters-of-recommendation",
    slug: "letters-of-recommendation-mastery",
    title: "How to Ask for Letters of Recommendation That Truly Stand Out",
    category: "Admissions Q&A",
    duration: "09:40",
    speaker: "Dr. Amy Morgenstern",
    description: "A concise masterclass on when to ask teachers, how to prepare a 'Brag Sheet', and how to ensure your recommenders highlight your intellectual vitality.",
    thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    keyTopics: ["Teacher Selection", "Preparing the Brag Sheet", "Timeline & Etiquette", "Counselor Letter Strategy"],
  },
];

export const FAQ_CATEGORIES: FAQCategoryItem[] = [
  {
    category: "Application Strategy & College Lists",
    description: "Everything you need to know about building balanced college lists and choosing application rounds.",
    faqs: [
      {
        question: "How many colleges should a high school senior typically apply to?",
        answer: "We typically recommend a balanced list of 10 to 14 colleges: 2 to 3 'Likely' schools (where admit rate is high and stats are well above the 75th percentile), 4 to 6 'Target' schools (where credentials align with middle 50%), and 3 to 5 'Reach' or highly selective schools (including Ivies, UCs, and top national universities). Applying to too many schools dilutes essay quality and leads to application fatigue.",
      },
      {
        question: "What is the difference between Early Decision (ED), Early Action (EA), and Regular Decision (RD)?",
        answer: "Early Decision (ED) is legally binding—if accepted, you must enroll and withdraw all other applications. It typically provides a meaningful statistical advantage at schools that value yield. Early Action (EA) is non-binding, allowing you to apply early and receive an early decision without commitment. Regular Decision (RD) has standard January deadlines with decisions in late March or April.",
      },
      {
        question: "When should high school students start the college planning process?",
        answer: "The earlier, the better. While junior and senior years focus on essays and applications, 9th and 10th grades are when crucial foundations are built—course rigor, leadership development, passion projects, and summer research. Starting early eliminates last-minute stress and ensures a coherent academic spike.",
      },
      {
        question: "Does BlueStars help students create balanced college lists?",
        answer: "Yes, personalized college list development is a cornerstone of our work. We evaluate your student's academic strengths, personality, desired learning environment, career ambitions, and family financial parameters to curate an intentional, exciting list of schools.",
      },
    ],
  },
  {
    category: "Essays & Personal Statements",
    description: "Tips, timelines, and guidelines for crafting memorable, authentic essays.",
    faqs: [
      {
        question: "What makes a college application essay stand out to admissions officers?",
        answer: "Admissions officers read thousands of essays. What stands out is authentic reflection and vulnerability rather than a recited resume. Top essays reveal how a student thinks, how they navigate setbacks, and what values guide their curiosity. Our founder, Dr. Amy Morgenstern, coaches students to locate their distinct narrative voice.",
      },
      {
        question: "How many drafts does a student typically write for their Common App essay?",
        answer: "On average, our students go through 4 to 6 thoughtful iterations. We begin with extensive ideation and free-writing, progress into structural outlining, and culminate in detailed line-editing and word-count polish. We never write for the student; we help them unlock their own finest literary voice.",
      },
      {
        question: "How do supplemental essays differ from the main personal statement?",
        answer: "While the personal statement is about WHO you are, supplemental essays usually answer 'Why THIS College?', 'Why THIS Major?', or ask about community contributions. They require deep school-specific research into specific professors, campus traditions, courses, and labs to prove genuine fit.",
      },
      {
        question: "Can BlueStars help with the 8 UC Personal Insight Questions (PIQs)?",
        answer: "Absolutely. The UC system requires 4 essays of up to 350 words each. Because UCs don't conduct interviews or review teacher recommendations, PIQs are evaluated differently from Common App essays—they require clarity, context, and quantifiable impact. We have a dedicated UC PIQ curriculum.",
      },
    ],
  },
  {
    category: "Extracurriculars, Research & Passions",
    description: "How to develop meaningful leadership, independent projects, and summer initiatives.",
    faqs: [
      {
        question: "What is an 'admissions spike' and is it better than being well-rounded?",
        answer: "Top universities no longer look for well-rounded students; they look for a well-rounded class comprised of singularly focused, angular students ('pointy' or 'spiky' profiles). A student who demonstrates deep, multi-year dedication to a focused intersection (e.g., computational biology and community health) stands out far more than someone who joins 10 unrelated clubs.",
      },
      {
        question: "Do prestigious paid summer programs help with college admissions?",
        answer: "Generally, no. Programs that cost thousands of dollars and admit anyone who can pay are viewed as 'pay-to-play' by admissions officers. Conversely, highly selective, free or merit-subsidized programs (like RSI, SSP, Clark Scholars, TASP, COSMOS) carry genuine admissions weight. We help students target truly competitive opportunities or design independent projects.",
      },
      {
        question: "How can high school students secure independent research with university professors?",
        answer: "Through targeted academic literature review and well-crafted outreach. We guide students on how to read professors' published papers, identify relevant research questions, and compose thoughtful cold emails that demonstrate genuine intellectual engagement.",
      },
    ],
  },
  {
    category: "Testing, GPA & Coursework",
    description: "Guidance on AP/IB courses, Digital SAT/ACT, and test-optional admissions.",
    faqs: [
      {
        question: "Are colleges truly test-optional, and should my student submit their score?",
        answer: "While many schools remain test-optional, an increasing number of elite institutions (MIT, Dartmouth, Yale, UT Austin, Georgetown) have reinstated test requirements. At test-optional schools, submitting a score at or above the school's median 50% percentile strongly bolsters an application. We evaluate your score against each college's specific profile to advise whether to submit or withhold.",
      },
      {
        question: "Is it better to get a B in an AP class or an A in a regular class?",
        answer: "As selective admissions deans frequently state: 'It is best to get an A in an AP class!' Highly selective colleges look for students who maximize the academic rigor available at their high school. A 'B' in an AP course is generally preferred over an unchallenging course load, but course selection should be balanced to maintain student well-being.",
      },
      {
        question: "How does the Digital SAT differ from the old paper test?",
        answer: "The Digital SAT is adaptive: your performance on the first module determines the difficulty level of questions in the second module. It is also significantly shorter (approx. 2 hours and 14 minutes) with shorter reading passages and a built-in Desmos graphing calculator for all math sections.",
      },
    ],
  },
  {
    category: "Financial Aid & Scholarships",
    description: "Demystifying FAFSA, CSS Profile, and merit scholarship strategies.",
    faqs: [
      {
        question: "Does applying for financial aid hurt my chances of getting accepted?",
        answer: "For 'need-blind' universities (like Harvard, Princeton, Yale, Stanford, MIT, and many top liberal arts colleges), a family's financial need is not considered during admissions evaluation. For 'need-aware' schools, financial need may be a factor, particularly for borderline candidates. We help families navigate need-blind vs need-aware dynamics.",
      },
      {
        question: "Can middle and upper-middle income families receive financial aid or scholarships?",
        answer: "Yes! Many private universities have extensive non-need-based merit scholarships awarded purely on academic and extracurricular talent, regardless of income. Additionally, universities with massive endowments often provide need-based grants to families with incomes up to $150k–$250k. We help identify colleges where your student is in the top 10% of applicants, maximizing merit award potential.",
      },
      {
        question: "Can you appeal a financial aid package if the initial offer is insufficient?",
        answer: "Yes. Financial aid offers can be formally appealed, especially if there has been a change in financial circumstances, unexpected medical expenses, or if you have competing merit offers from peer institutions. We provide families with proven appeal letter frameworks.",
      },
    ],
  },
];

