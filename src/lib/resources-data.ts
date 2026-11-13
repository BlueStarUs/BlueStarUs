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
  downloadCount?: string;
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
  category: "College Tours" | "Alumni Interviews" | "Recorded Webinars" | "Admissions Strategy" | string;
  duration: string;
  speaker: string;
  description: string;
  thumbnail: string;
  youtubeId?: string;
  publishedAt?: string;
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
    coverImage: "/images/resources/guides/Ivy_League_Top_20_Admissions_Playbook.png",
    pages: 42,
    readTime: "25 min read",
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
    coverImage: "/images/resources/guides/University_of_California_PIQ_Mastery_Handbook.png",
    pages: 36,
    readTime: "20 min read",
    updatedAt: "Updated for 2024–2025",
    featured: true,
    highlights: [
      "Breakdown of all 8 UC Personal Insight Prompts",
      "Prompt-by-prompt strategies and proven UC insight frameworks",
      "The 'Context, Action, Result' formula for 350-word limits",
      "UC Activities List optimization strategies (20 slots explained)",
    ],
    tableOfContents: [
      "1. How UC Admissions Differs from the Common Application",
      "2. Prompt-by-Prompt Strategy & Brainstorming Exercises",
      "3. Proven PIQ Structure & Reflection Frameworks",
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
    coverImage: "/images/resources/guides/Common_App_Personal_Statement_Guide.png",
    pages: 38,
    readTime: "22 min read",
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
    coverImage: "/images/resources/guides/College_Planning_Master_Checklist_Timeline.png",
    pages: 24,
    readTime: "15 min read",
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
    coverImage: "/images/resources/guides/Summer_Programs_Research_Directory.png",
    pages: 32,
    readTime: "18 min read",
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
    coverImage: "/images/resources/guides/Financial_Aid_Merit_Scholarship_Toolkit.png",
    pages: 30,
    readTime: "18 min read",
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
      name: "Dr. Amy Morgenstern & Blue Stars Counselors",
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
    subtitle: "Curating a standout Slideroom portfolio for RISD, Pratt, Parsons, Cornell, and top art programs.",
    date: "Past Recording (September 2024)",
    time: "Recorded Live Session",
    speaker: {
      name: "Blue Stars Arts Advisory Team",
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
    "id": "yt-18ICjuPxpaY",
    "slug": "university-of-michigan-campus-tour-insights-academ",
    "title": "University of Michigan Campus Tour & Insights | Academics, Student Life, Clubs & Resources",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Join Dr. Amy Morgenstern of Blue Stars Admissions Consulting for an insider look at the University of Michigan, Ann Arbor—academics, student culture, and admissions strategy.",
    "thumbnail": "https://img.youtube.com/vi/18ICjuPxpaY/hqdefault.jpg",
    "youtubeId": "18ICjuPxpaY",
    "publishedAt": "2025-08-25",
    "keyTopics": [
      "University of Michigan",
      "Campus Tour",
      "Public Ivies",
      "Student Life"
    ],
    "featured": true
  },
  {
    "id": "yt-BVJfU_8lV_k",
    "slug": "celebrating-15-years-of-student-success",
    "title": "Celebrating 15 Years of Student Success",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Reflecting on 15+ years of empowering college-bound teens, whole-student mentorship, and guiding families to top university acceptances nationwide.",
    "thumbnail": "https://img.youtube.com/vi/BVJfU_8lV_k/hqdefault.jpg",
    "youtubeId": "BVJfU_8lV_k",
    "publishedAt": "2025-06-11",
    "keyTopics": [
      "15th Anniversary",
      "Student Success",
      "Whole-Student Mentoring",
      "Blue Stars Journey"
    ],
    "featured": false
  },
  {
    "id": "yt-tVW8-qKTCFE",
    "slug": "two-stanford-rea-students-share-admissions-tips",
    "title": "Two Stanford REA Students Share Admissions Tips",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Stanford REA Students",
    "description": "Two Blue Stars students admitted to Stanford University through Restrictive Early Action (REA) share their admissions strategies, essay timelines, and authentic advice.",
    "thumbnail": "https://img.youtube.com/vi/tVW8-qKTCFE/hqdefault.jpg",
    "youtubeId": "tVW8-qKTCFE",
    "publishedAt": "2024-05-11",
    "keyTopics": [
      "Stanford University",
      "Early Action",
      "REA Strategy",
      "Admissions Tips"
    ],
    "featured": true
  },
  {
    "id": "yt-KKsUocGuI9Q",
    "slug": "your-college-major-does-not-define-your-future-inc",
    "title": "🎓 Your College Major DOES NOT Define Your Future Income 🌟",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Dr. Amy Morgenstern breaks down why your undergraduate college major does not limit your long-term career earning potential, and how to pursue genuine intellectual passions.",
    "thumbnail": "https://img.youtube.com/vi/KKsUocGuI9Q/hqdefault.jpg",
    "youtubeId": "KKsUocGuI9Q",
    "publishedAt": "2024-02-19",
    "keyTopics": [
      "College Majors",
      "Career Pathways",
      "Income Myths",
      "Academic Passion"
    ],
    "featured": false
  },
  {
    "id": "yt-mrR9nbQeJEk",
    "slug": "making-college-campus-tours-worth-your-time",
    "title": "Making College Campus Tours Worth Your Time",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Practical strategies for families and students to maximize college campus visits, evaluate institutional fit, and engage meaningfully with admissions departments.",
    "thumbnail": "https://img.youtube.com/vi/mrR9nbQeJEk/hqdefault.jpg",
    "youtubeId": "mrR9nbQeJEk",
    "publishedAt": "2023-11-07",
    "keyTopics": [
      "College Visits",
      "Campus Tours",
      "Admissions Fit",
      "Demonstrated Interest"
    ],
    "featured": false
  },
  {
    "id": "yt-emsTxlBCf9o",
    "slug": "webinar-ai-for-all-an-interdisciplinary-introducti",
    "title": "Webinar - AI for All: An Interdisciplinary Introduction",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Comprehensive webinar exploring how high schoolers can engage with artificial intelligence across interdisciplinary STEM, humanities, and ethics projects.",
    "thumbnail": "https://img.youtube.com/vi/emsTxlBCf9o/hqdefault.jpg",
    "youtubeId": "emsTxlBCf9o",
    "publishedAt": "2023-10-11",
    "keyTopics": [
      "Artificial Intelligence",
      "Interdisciplinary STEM",
      "High School AI",
      "Research"
    ],
    "featured": true
  },
  {
    "id": "yt-52Yd17-jVO0",
    "slug": "interview-with-former-blue-stars-student-naomi-zim",
    "title": "Interview with former Blue Stars student Naomi Zimmerman",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Naomi Zimmerman (Alum) & Dr. M",
    "description": "Former Blue Stars student Naomi Zimmerman reflects on her high school journey, discovering her academic focus, and transitioning successfully to college life.",
    "thumbnail": "https://img.youtube.com/vi/52Yd17-jVO0/hqdefault.jpg",
    "youtubeId": "52Yd17-jVO0",
    "publishedAt": "2023-10-09",
    "keyTopics": [
      "Alumni Interview",
      "Student Journey",
      "College Transition",
      "High School Growth"
    ],
    "featured": false
  },
  {
    "id": "yt-6dMU6O1NJ3g",
    "slug": "webinar-prepare-for-a-career-in-ai-as-a-high-schoo",
    "title": "Webinar - Prepare for a Career in AI as a High Schooler",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Actionable guidance on preparing for future careers in AI, machine learning, and computational data science starting in 9th to 12th grade.",
    "thumbnail": "https://img.youtube.com/vi/6dMU6O1NJ3g/hqdefault.jpg",
    "youtubeId": "6dMU6O1NJ3g",
    "publishedAt": "2023-10-06",
    "keyTopics": [
      "AI Careers",
      "STEM Pathways",
      "High School Projects",
      "Future Skills"
    ],
    "featured": false
  },
  {
    "id": "yt-DvVTrzsYEjI",
    "slug": "webinar-the-new-digital-psat-sat-all-you-need-to-k",
    "title": "Webinar - The New Digital PSAT/SAT: All You Need to Know",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Essential breakdown of the Digital PSAT and SAT formats, adaptive testing scoring, preparation timelines, and strategic test-optional considerations.",
    "thumbnail": "https://img.youtube.com/vi/DvVTrzsYEjI/hqdefault.jpg",
    "youtubeId": "DvVTrzsYEjI",
    "publishedAt": "2023-08-08",
    "keyTopics": [
      "Digital SAT",
      "PSAT Prep",
      "Testing Strategy",
      "Score Improvement"
    ],
    "featured": false
  },
  {
    "id": "yt-HOyacSoA2no",
    "slug": "webinar-five-time-management-tips-for-summer-succe",
    "title": "Webinar - Five Time-Management Tips for Summer Success",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Five essential time-management, planning, and goal-setting strategies to make high school summers productive, rejuvenating, and admissions-impactful.",
    "thumbnail": "https://img.youtube.com/vi/HOyacSoA2no/hqdefault.jpg",
    "youtubeId": "HOyacSoA2no",
    "publishedAt": "2023-06-14",
    "keyTopics": [
      "Summer Planning",
      "Time Management",
      "High School Productivity",
      "Calm Execution"
    ],
    "featured": false
  },
  {
    "id": "yt-kmFQMiNBusA",
    "slug": "webinar-celebrating-your-child-s-unique-strengths",
    "title": "Webinar - Celebrating Your Child's Unique Strengths",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Inspiring webinar on discovering, celebrating, and cultivating each teen’s unique strengths rather than trying to fit a generic admissions mold.",
    "thumbnail": "https://img.youtube.com/vi/kmFQMiNBusA/hqdefault.jpg",
    "youtubeId": "kmFQMiNBusA",
    "publishedAt": "2023-05-02",
    "keyTopics": [
      "Student Strengths",
      "Growth Mindset",
      "Parent Partnership",
      "The Calm Way"
    ],
    "featured": false
  },
  {
    "id": "yt-qccVw0E8KYE",
    "slug": "interview-with-dr-irena-smith-author-of-the-golden",
    "title": "Interview with Dr. Irena Smith - Author of The Golden Ticket: A Life in College Admissions Essays",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Dr. Irena Smith & Dr. M",
    "description": "In-depth interview with Dr. Irena Smith, former Stanford admissions officer and author of The Golden Ticket, discussing sanity and authenticity in admissions.",
    "thumbnail": "https://img.youtube.com/vi/qccVw0E8KYE/hqdefault.jpg",
    "youtubeId": "qccVw0E8KYE",
    "publishedAt": "2023-04-15",
    "keyTopics": [
      "Dr. Irena Smith",
      "Author Interview",
      "Stanford Admissions",
      "The Golden Ticket"
    ],
    "featured": false
  },
  {
    "id": "yt-ATlWZyDiSkY",
    "slug": "5-college-admissions-tips-for-stem-students",
    "title": "5 College Admissions Tips for STEM Students",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Five proven strategies for students applying to competitive STEM, engineering, computer science, and pre-med programs at top-tier universities.",
    "thumbnail": "https://img.youtube.com/vi/ATlWZyDiSkY/hqdefault.jpg",
    "youtubeId": "ATlWZyDiSkY",
    "publishedAt": "2023-03-29",
    "keyTopics": [
      "STEM Admissions",
      "Engineering Applications",
      "Pre-Med Strategy",
      "Computer Science"
    ],
    "featured": false
  },
  {
    "id": "yt-ymAy4jL1VIk",
    "slug": "webinar-making-test-prep-work-for-you-with-eric-ra",
    "title": "Webinar - Making Test Prep Work For You with Eric Rath",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Eric Rath & Dr. M",
    "description": "Expert test prep webinar with Eric Rath exploring efficient SAT/ACT mastery, personalized study cadences, and reducing standardized testing stress.",
    "thumbnail": "https://img.youtube.com/vi/ymAy4jL1VIk/hqdefault.jpg",
    "youtubeId": "ymAy4jL1VIk",
    "publishedAt": "2023-01-24",
    "keyTopics": [
      "Eric Rath",
      "SAT & ACT Test Prep",
      "Study Habits",
      "Stress-Free Testing"
    ],
    "featured": false
  },
  {
    "id": "yt-O6dJL0Gbv4E",
    "slug": "webinar-making-test-prep-work-for-you-with-eric-ra",
    "title": "Webinar - Making Test Prep Work For You with Eric Rath (Promo)",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Eric Rath & Dr. M",
    "description": "Preview and highlights from our masterclass with Eric Rath on making standardized test preparation work for your student’s schedule.",
    "thumbnail": "https://img.youtube.com/vi/O6dJL0Gbv4E/hqdefault.jpg",
    "youtubeId": "O6dJL0Gbv4E",
    "publishedAt": "2023-01-20",
    "keyTopics": [
      "Test Prep Overview",
      "SAT Strategies",
      "Eric Rath",
      "Blue Stars Webinar"
    ],
    "featured": false
  },
  {
    "id": "yt-ynylPJNGzys",
    "slug": "stanford-blog-reflections",
    "title": "Stanford Blog Reflections",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Dr. Amy Morgenstern reflects on Stanford University admissions essays, personal narrative vulnerability, and what makes applicants memorable.",
    "thumbnail": "https://img.youtube.com/vi/ynylPJNGzys/hqdefault.jpg",
    "youtubeId": "ynylPJNGzys",
    "publishedAt": "2023-01-18",
    "keyTopics": [
      "Stanford Essays",
      "Personal Statements",
      "Reflective Writing",
      "Admissions Readers"
    ],
    "featured": false
  },
  {
    "id": "yt-ko4-tTFr7os",
    "slug": "oberlin-college-tour",
    "title": "Oberlin College Tour",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "On-campus walking tour and insider review of Oberlin College & Conservatory, highlighting progressive academics, research, and creative arts.",
    "thumbnail": "https://img.youtube.com/vi/ko4-tTFr7os/hqdefault.jpg",
    "youtubeId": "ko4-tTFr7os",
    "publishedAt": "2022-12-30",
    "keyTopics": [
      "Oberlin College",
      "Campus Tour",
      "Liberal Arts",
      "Creative Arts"
    ],
    "featured": false
  },
  {
    "id": "yt-Wn4ByAR71Dc",
    "slug": "williams-college-tour",
    "title": "Williams College Tour",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Explore Williams College in the Berkshires—tutorial-style learning, undergraduate research focus, and elite liberal arts admissions criteria.",
    "thumbnail": "https://img.youtube.com/vi/Wn4ByAR71Dc/hqdefault.jpg",
    "youtubeId": "Wn4ByAR71Dc",
    "publishedAt": "2022-12-30",
    "keyTopics": [
      "Williams College",
      "Campus Tour",
      "Top Liberal Arts",
      "Undergraduate Focus"
    ],
    "featured": true
  },
  {
    "id": "yt-H2cr7obUY1M",
    "slug": "ohio-wesleyan-college-tour",
    "title": "Ohio Wesleyan College Tour",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Campus tour of Ohio Wesleyan University exploring the OWU Connection, global travel opportunities, and personalized undergraduate mentoring.",
    "thumbnail": "https://img.youtube.com/vi/H2cr7obUY1M/hqdefault.jpg",
    "youtubeId": "H2cr7obUY1M",
    "publishedAt": "2022-12-30",
    "keyTopics": [
      "Ohio Wesleyan",
      "Campus Tour",
      "Global Connection",
      "Undergraduate Mentorship"
    ],
    "featured": false
  },
  {
    "id": "yt-fd6fu17gUgA",
    "slug": "intro-to-dr-m-s-college-tours",
    "title": "Intro to Dr. M's College Tours",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Introduction to Dr. M’s college tour series: How to look beyond the brochures and see what real undergraduate life is like.",
    "thumbnail": "https://img.youtube.com/vi/fd6fu17gUgA/hqdefault.jpg",
    "youtubeId": "fd6fu17gUgA",
    "publishedAt": "2022-12-30",
    "keyTopics": [
      "College Tour Guide",
      "Campus Research",
      "Dr. Amy Morgenstern",
      "Admissions Insights"
    ],
    "featured": false
  },
  {
    "id": "yt-oF1dYZ7yu3g",
    "slug": "kenyon-college-tour",
    "title": "Kenyon College Tour",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Explore Kenyon College in Gambier, Ohio—renowned writing traditions, collaborative community, and close faculty-student mentorship.",
    "thumbnail": "https://img.youtube.com/vi/oF1dYZ7yu3g/hqdefault.jpg",
    "youtubeId": "oF1dYZ7yu3g",
    "publishedAt": "2022-12-30",
    "keyTopics": [
      "Kenyon College",
      "Campus Tour",
      "Writing Excellence",
      "Collaborative Learning"
    ],
    "featured": false
  },
  {
    "id": "yt-nKd2OHxNvEY",
    "slug": "amherst-college-tour",
    "title": "Amherst College Tour",
    "category": "College Tours",
    "duration": "Campus Walk",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Comprehensive tour of Amherst College exploring open curriculum opportunities, undergraduate research, and selective admissions positioning.",
    "thumbnail": "https://img.youtube.com/vi/nKd2OHxNvEY/hqdefault.jpg",
    "youtubeId": "nKd2OHxNvEY",
    "publishedAt": "2022-12-30",
    "keyTopics": [
      "Amherst College",
      "Campus Tour",
      "Open Curriculum",
      "Top 10 Colleges"
    ],
    "featured": false
  },
  {
    "id": "yt-Mp84oQPjEG8",
    "slug": "on-becoming-a-doctor-a-panel-discussion-with-dr-m",
    "title": "On Becoming a Doctor: A Panel Discussion with Dr. M",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Medical Advisory Panel",
    "description": "Panel discussion with practicing physicians and pre-med advisors on the journey to medical school, undergraduate preparation, and clinical experience.",
    "thumbnail": "https://img.youtube.com/vi/Mp84oQPjEG8/hqdefault.jpg",
    "youtubeId": "Mp84oQPjEG8",
    "publishedAt": "2020-09-16",
    "keyTopics": [
      "Pre-Med Advice",
      "Medical School Pathways",
      "Doctor Panel",
      "Healthcare Careers"
    ],
    "featured": false
  },
  {
    "id": "yt-BzP9EFw_yEg",
    "slug": "tackling-the-common-app-essay",
    "title": "Tackling the Common App Essay",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Masterclass on architecting the Common Application personal statement—ideation, structuring, avoiding clichés, and polishing authentic voice.",
    "thumbnail": "https://img.youtube.com/vi/BzP9EFw_yEg/hqdefault.jpg",
    "youtubeId": "BzP9EFw_yEg",
    "publishedAt": "2020-08-15",
    "keyTopics": [
      "Common App Essay",
      "Personal Statement",
      "Brainstorming",
      "Essay Editing"
    ],
    "featured": false
  },
  {
    "id": "yt-NUb3dvxG9DE",
    "slug": "uc-personal-insight-question-8-what-makes-you-stan",
    "title": "UC Personal Insight Question 8: What Makes You Stand Out?",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Detailed breakdown of UC PIQ #8: Beyond grades and test scores, what makes you stand out as a strong candidate for the University of California?",
    "thumbnail": "https://img.youtube.com/vi/NUb3dvxG9DE/hqdefault.jpg",
    "youtubeId": "NUb3dvxG9DE",
    "publishedAt": "2020-07-31",
    "keyTopics": [
      "UC PIQ 8",
      "Standing Out",
      "UC Berkeley & UCLA",
      "Application Strategy"
    ],
    "featured": false
  },
  {
    "id": "yt-6CekYAesGy8",
    "slug": "uc-personal-insight-question-7-what-you-ve-done-to",
    "title": "UC Personal Insight Question 7: What You've Done to Make Your School/Community a Better Place",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Deep dive into UC PIQ #7: How you have worked to make your school, family, or community a better place through sustained impact.",
    "thumbnail": "https://img.youtube.com/vi/6CekYAesGy8/hqdefault.jpg",
    "youtubeId": "6CekYAesGy8",
    "publishedAt": "2020-07-20",
    "keyTopics": [
      "UC PIQ 7",
      "Community Impact",
      "Leadership Initiatives",
      "UC Applications"
    ],
    "featured": false
  },
  {
    "id": "yt-TkTFcJOu1qA",
    "slug": "uc-personal-insight-question-6-an-academic-subject",
    "title": "UC Personal Insight Question 6: An Academic Subject That Inspires You",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Strategies for UC PIQ #6: Describing your favorite academic subject and how it has influenced your intellectual vitality outside the classroom.",
    "thumbnail": "https://img.youtube.com/vi/TkTFcJOu1qA/hqdefault.jpg",
    "youtubeId": "TkTFcJOu1qA",
    "publishedAt": "2020-06-30",
    "keyTopics": [
      "UC PIQ 6",
      "Academic Passion",
      "Intellectual Curiosity",
      "Subject Mastery"
    ],
    "featured": false
  },
  {
    "id": "yt-KY0CF1B1puk",
    "slug": "uc-personal-insight-question-5-most-significant-ch",
    "title": "UC Personal Insight Question 5: Most Significant Challenge",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Coaching for UC PIQ #5: How to address your most significant challenge, personal resilience, and how you overcame obstacles without sounding like a victim.",
    "thumbnail": "https://img.youtube.com/vi/KY0CF1B1puk/hqdefault.jpg",
    "youtubeId": "KY0CF1B1puk",
    "publishedAt": "2020-06-23",
    "keyTopics": [
      "UC PIQ 5",
      "Overcoming Challenges",
      "Resilience",
      "Authentic Voice"
    ],
    "featured": false
  },
  {
    "id": "yt-EZs_l5696Jo",
    "slug": "uc-personal-insight-question-4-educational-opportu",
    "title": "UC Personal Insight Question 4: Educational Opportunity or Barrier",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Guidance on UC PIQ #4: Discussing an educational opportunity you took advantage of or an educational barrier you worked to overcome.",
    "thumbnail": "https://img.youtube.com/vi/EZs_l5696Jo/hqdefault.jpg",
    "youtubeId": "EZs_l5696Jo",
    "publishedAt": "2020-06-16",
    "keyTopics": [
      "UC PIQ 4",
      "Educational Opportunity",
      "Overcoming Barriers",
      "UC Prompts"
    ],
    "featured": false
  },
  {
    "id": "yt-5YFsT63GaxA",
    "slug": "uc-personal-insight-question-3-greatest-talent-or-",
    "title": "UC Personal Insight Question 3: Greatest Talent or Skill",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Analyzing UC PIQ #3: Showcasing your greatest talent or skill and how you have developed and demonstrated it over time.",
    "thumbnail": "https://img.youtube.com/vi/5YFsT63GaxA/hqdefault.jpg",
    "youtubeId": "5YFsT63GaxA",
    "publishedAt": "2020-06-10",
    "keyTopics": [
      "UC PIQ 3",
      "Greatest Talent",
      "Skill Development",
      "Creative Craft"
    ],
    "featured": false
  },
  {
    "id": "yt-eLEROi8Wny0",
    "slug": "uc-personal-insight-question-2-creativity",
    "title": "UC Personal Insight Question 2: Creativity",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Step-by-step coaching on UC PIQ #2: Expressing your creative side—through art, problem solving, innovative thinking, or unique passions.",
    "thumbnail": "https://img.youtube.com/vi/eLEROi8Wny0/hqdefault.jpg",
    "youtubeId": "eLEROi8Wny0",
    "publishedAt": "2020-06-04",
    "keyTopics": [
      "UC PIQ 2",
      "Creative Expression",
      "Problem Solving",
      "Arts & Design"
    ],
    "featured": false
  },
  {
    "id": "yt-GIB_zp_6e64",
    "slug": "uc-personal-insight-question-1-leadership",
    "title": "UC Personal Insight Question 1: Leadership",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Deconstructing UC PIQ #1: How to define and demonstrate leadership in family, clubs, community, or independent projects.",
    "thumbnail": "https://img.youtube.com/vi/GIB_zp_6e64/hqdefault.jpg",
    "youtubeId": "GIB_zp_6e64",
    "publishedAt": "2020-05-27",
    "keyTopics": [
      "UC PIQ 1",
      "Leadership",
      "Initiative",
      "UC System Insights"
    ],
    "featured": true
  },
  {
    "id": "yt-swsk9D8VUGo",
    "slug": "session-6-college-planning-and-covid-19-featuring-",
    "title": "Session 6: College Planning and COVID-19 Featuring New Trends in College Admissions",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Session 6: Navigating college planning, admissions trends, and evolving institutional criteria following the global health crisis.",
    "thumbnail": "https://img.youtube.com/vi/swsk9D8VUGo/hqdefault.jpg",
    "youtubeId": "swsk9D8VUGo",
    "publishedAt": "2020-05-21",
    "keyTopics": [
      "Admissions Trends",
      "Rapid Response",
      "College Planning",
      "Webinar Series"
    ],
    "featured": false
  },
  {
    "id": "yt-2jMMtrXySwk",
    "slug": "session-5-college-planning-and-covid-19-featuring-",
    "title": "Session 5: College Planning and COVID-19 Featuring Shelter-in-Place Summer Ideas",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Session 5: Creative shelter-in-place summer enrichment ideas, independent research projects, and online learning initiatives.",
    "thumbnail": "https://img.youtube.com/vi/2jMMtrXySwk/hqdefault.jpg",
    "youtubeId": "2jMMtrXySwk",
    "publishedAt": "2020-05-14",
    "keyTopics": [
      "Summer Projects",
      "Independent Learning",
      "Enrichment Strategy",
      "Webinar Series"
    ],
    "featured": false
  },
  {
    "id": "yt-G3V032hDPdk",
    "slug": "session-4-college-planning-and-covid-19-college-fu",
    "title": "Session 4: College Planning and COVID-19 + College Funding Advice",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Session 4: Financial planning, college funding advice, tuition transparency, and merit scholarship strategies for families.",
    "thumbnail": "https://img.youtube.com/vi/G3V032hDPdk/hqdefault.jpg",
    "youtubeId": "G3V032hDPdk",
    "publishedAt": "2020-05-14",
    "keyTopics": [
      "Financial Aid",
      "College Funding",
      "Merit Scholarships",
      "Webinar Series"
    ],
    "featured": false
  },
  {
    "id": "yt-w4_iLZxuMJQ",
    "slug": "session-3-college-planning-and-covid-19-rapid-resp",
    "title": "Session 3: College Planning and COVID-19 Rapid Response Webinar",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Session 3: Rapid response strategies for students adapting their high school trajectories, activities, and online schooling.",
    "thumbnail": "https://img.youtube.com/vi/w4_iLZxuMJQ/hqdefault.jpg",
    "youtubeId": "w4_iLZxuMJQ",
    "publishedAt": "2020-04-20",
    "keyTopics": [
      "Rapid Response",
      "High School Roadmap",
      "Adaptability",
      "Webinar Series"
    ],
    "featured": false
  },
  {
    "id": "yt-APDR9c9aDkI",
    "slug": "session-2-college-planning-covid-19-rapid-response",
    "title": "Session 2: College Planning & COVID-19 Rapid Response Webinar",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Session 2: Maintaining emotional well-being, executive functioning, and family harmony during turbulent academic semesters.",
    "thumbnail": "https://img.youtube.com/vi/APDR9c9aDkI/hqdefault.jpg",
    "youtubeId": "APDR9c9aDkI",
    "publishedAt": "2020-04-13",
    "keyTopics": [
      "Student Well-Being",
      "Executive Function",
      "Family Support",
      "The Calm Way"
    ],
    "featured": false
  },
  {
    "id": "yt-xtYCRa6gYKk",
    "slug": "session-1-college-planning-and-covid-19-rapid-resp",
    "title": "Session 1: College Planning and COVID-19 Rapid Response Webinar",
    "category": "Recorded Webinars",
    "duration": "60–90 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Session 1: Initial emergency roadmap and guidance for high school families navigating unprecedented school closures.",
    "thumbnail": "https://img.youtube.com/vi/xtYCRa6gYKk/hqdefault.jpg",
    "youtubeId": "xtYCRa6gYKk",
    "publishedAt": "2020-04-06",
    "keyTopics": [
      "Foundations Webinar",
      "Emergency Strategy",
      "Parent Roadmap",
      "Webinar Series"
    ],
    "featured": false
  },
  {
    "id": "yt-yM3ui1MPvEY",
    "slug": "college-admissions-the-calm-way-a-talk-by-dr-amy-m",
    "title": "College Admissions the Calm Way - A Talk by Dr. Amy Morgenstern",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Keynote talk by Dr. Amy Morgenstern on \"College Admissions the Calm Way\"—replacing frenzy with whole-student purpose and clarity.",
    "thumbnail": "https://img.youtube.com/vi/yM3ui1MPvEY/hqdefault.jpg",
    "youtubeId": "yM3ui1MPvEY",
    "publishedAt": "2018-08-01",
    "keyTopics": [
      "The Calm Way",
      "Dr. Amy Morgenstern",
      "Keynote Talk",
      "Admissions Philosophy"
    ],
    "featured": false
  },
  {
    "id": "yt--KzOic8VBBU",
    "slug": "how-do-you-get-students-to-write-amazing-admission",
    "title": "How do you get students to write amazing admissions essays?",
    "category": "Alumni Interviews",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Essential insights on helping teens find their true voice and write admissions essays that move selective review committees.",
    "thumbnail": "https://img.youtube.com/vi/-KzOic8VBBU/hqdefault.jpg",
    "youtubeId": "-KzOic8VBBU",
    "publishedAt": "2016-09-14",
    "keyTopics": [
      "Essay Coaching",
      "Storytelling Techniques",
      "Writing Masterclass",
      "Admissions Advice"
    ],
    "featured": false
  },
  {
    "id": "yt-YfGVLUJlZ1E",
    "slug": "dream-schools-are-for-everyone",
    "title": "Dream Schools are for Everyone!",
    "category": "Admissions Strategy",
    "duration": "15–30 min",
    "speaker": "Dr. Amy Morgenstern",
    "description": "Inspiring talk on why dream schools are accessible to everyone when students lead with authenticity, purpose, and deliberate effort.",
    "thumbnail": "https://img.youtube.com/vi/YfGVLUJlZ1E/hqdefault.jpg",
    "youtubeId": "YfGVLUJlZ1E",
    "publishedAt": "2015-12-06",
    "keyTopics": [
      "Dream Schools",
      "Access & Equity",
      "Keynote Address",
      "Blue Stars Philosophy"
    ],
    "featured": false
  }
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
        question: "Does Blue Stars help students create balanced college lists?",
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
        question: "Can Blue Stars help with the 8 UC Personal Insight Questions (PIQs)?",
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

// Aliases for admin store and resources management
export const WEBINARS_LIST = WEBINARS_DATA;
export const VIDEOS_LIST = VIDEO_RESOURCES;
export const FAQ_KNOWLEDGE_BASE = FAQ_CATEGORIES;


