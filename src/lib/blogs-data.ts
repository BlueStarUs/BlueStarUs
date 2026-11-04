import { BlogPost } from "@/types";

export const BLOG_CATEGORIES = [
  "All",
  "College Planning",
  "Admissions Strategy",
  "Essay Writing",
  "Financial Aid",
  "Interviews",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-colleges",
    title: "How to Choose the Right Colleges for Your Goals",
    excerpt:
      "Tips to find the best fit based on your interests, profile and future plans. Discover our strategic framework for balancing reach, match, and safety schools.",
    coverImage: "/images/blogs/blogs1.png",
    category: "College Planning",
    readTime: "7 min read",
    publishedAt: "October 18, 2026",
    accent: "green",
    featured: true,
    tags: ["College List", "Foundational Planning", "Ivy League", "Campus Culture"],
    author: {
      name: "Dr. Amy Morgenstern",
      role: "Founder & Master Admissions Consultant",
      avatar: "/images/person/person1.png",
      bio: "Dr. Amy Morgenstern ('Dr. M') founded BlueStars Admissions Consulting in 2010. Holding degrees from UC Berkeley and Stanford University, she has guided hundreds of students to top-tier university admissions through 'The Calm Way' methodology.",
    },
    intro: [
      "Building a college list is one of the most consequential decisions of a high school student's academic journey. Yet all too often, families fall into the trap of letting commercial rankings, brand prestige, or hearsay dictate their selections. The result is often an unbalanced list heavy with reach schools, leading to avoidable anxiety and disappointing outcomes.",
      "At BlueStars Admissions Consulting, we approach college list construction through a holistic lens of institutional fit: academic alignment, social culture, pedagogical philosophy, and long-term career acceleration. In this comprehensive guide, we share the exact strategic framework we use with our students to curate balanced, inspiring, and de-risked college lists.",
    ],
    keyTakeaways: [
      "Focus on institutional alignment and academic philosophy over US News & World Report rankings.",
      "Implement the 2-4-2 list balancing principle (Reaches, Matches, and Foundational Safeties).",
      "Evaluate campus culture, departmental research funding, and post-grad placement data.",
      "Conduct intentional virtual and in-person campus visits with tailored inquiry questions.",
    ],
    sections: [
      {
        heading: "1. Moving Beyond Generic Rankings: The Institutional Fit Matrix",
        paragraphs: [
          "Every university possesses a distinct cultural DNA, academic rigor, and undergraduate ethos. A student who thrives in a collaborative, open-curriculum environment like Brown University or Amherst College might feel constrained by Columbia University's structured Core Curriculum or the technical specialization of Carnegie Mellon.",
          "When researching potential colleges, examine the educational philosophy. Does the university emphasize interdisciplinary inquiry? What percentage of undergraduate classes are taught by full professors rather than teaching assistants? How accessible are faculty-led research opportunities for underclassmen?",
        ],
        bullets: [
          "Curriculum Architecture: Core curriculum vs. distribution requirements vs. open curriculum.",
          "Classroom Environment: Seminar-style discussion tables vs. large 300-person lecture halls.",
          "Undergraduate Research Access: Percentage of students participating in paid or accredited research before junior year.",
          "Geographic & Physical Setting: Urban immersion, traditional suburban campuses, or self-contained college towns.",
        ],
        callout: {
          type: "insight",
          title: "The Calm Way Insight",
          text: "Never add a college to your list that you wouldn't genuinely celebrate attending. Every 'safety' or likely school must be a place where your student will thrive academically and socially.",
        },
      },
      {
        heading: "2. Balancing Academics, Social Culture, and Long-Term Outcomes",
        paragraphs: [
          "A great college education extends far beyond course syllabi. Social environment, student body collaboration versus competition, mental health resources, and extracurricular vitality directly impact student well-being and graduation success.",
          "Look deeply into graduation and career placement metrics. What are the medical school and law school acceptance rates for undergraduates from that institution? Which companies recruit heavily on campus? What is the strength and reach of the alumni network in your target industry?",
        ],
        bullets: [
          "Career Center Track Record: Average starting salaries and 6-month post-graduation employment rates.",
          "Alumni Network Vitality: Dedicated mentorship programs and geographic distribution of active alumni chapters.",
          "Campus Atmosphere: Collaborative community vs. high-pressure competitive environment.",
        ],
      },
      {
        heading: "3. Structuring a Smart, De-Risked College List (The 2-4-2 Rule)",
        paragraphs: [
          "A balanced list typically encompasses between 8 and 12 thoughtfully curated institutions. We advise against applying to 25+ colleges, which dilutes essay quality and leads to application fatigue.",
          "Our foundational rule of thumb is the 2-4-2 structure for every tier of student profile:",
        ],
        bullets: [
          "Reach Schools (2-3): Selective institutions with acceptance rates below 15% or where the student's academic metrics sit in the middle-50% range.",
          "Target / Match Schools (4-5): Institutions where the student's GPA and test scores sit comfortably in the top 25-50% and acceptance rates are 20-45%.",
          "Likely / Foundational Schools (2-3): Institutions where the student's profile exceeds the 75th percentile and acceptance rates exceed 50%, with high financial or merit aid probability.",
        ],
        callout: {
          type: "tip",
          title: "Strategic Tip",
          text: "Ensure your likely schools have special honors colleges or accelerated scholar tracks. Being in the top 5% of an honors program often yields far greater research funding and mentorship than being in the middle of a hyper-competitive reach school.",
        },
      },
      {
        heading: "4. Campus Visits and Virtual Engagement: What to Actually Look For",
        paragraphs: [
          "Standard campus information sessions and student-led walking tours tend to sound very similar. To unearth the authentic character of an institution, students must look beyond the admissions pitch.",
          "Eat a meal in the student union or dining hall. Pick up a copy of the independent student newspaper. Read the opinions section to understand the issues students currently care about. Sit in on an introductory class in your intended major and observe how actively students participate.",
        ],
        bullets: [
          "Observe student interactions between classes—do students seem energized and engaged?",
          "Ask tour guides what they would change about the university if they could.",
          "Reach out to undergraduate department club heads via LinkedIn or campus email.",
        ],
      },
      {
        heading: "5. Next Steps: Refining Your List with Admissions Mentorship",
        paragraphs: [
          "Finalizing your college list is an iterative process. As students take diagnostic practice tests, complete sophomore or junior coursework, and deepen their extracurricular passions, the list should naturally evolve.",
          "Working with a dedicated BlueStars mentor ensures your list reflects realistic admissions probability while preserving ambitious aspirational targets.",
        ],
      },
    ],
    conclusion: [
      "Selecting colleges isn't about chasing someone else's definition of prestige; it is about discovering the environments that will unlock your student's unique intellectual curiosity and lifelong potential.",
      "If you would like a personalized review of your student's academic profile and college list, schedule a complimentary 30-minute consultation with our senior advisory team.",
    ],
    relatedSlugs: ["application-timeline", "strong-personal-statement", "extracurricular-profile-spike"],
  },
  {
    slug: "application-timeline",
    title: "College Application Timeline: Key Dates to Know",
    excerpt:
      "A step-by-step guide to important deadlines, milestones, and strategic checkpoints from early high school to senior year decision season.",
    coverImage: "/images/blogs/blogs2.png",
    category: "Admissions Strategy",
    readTime: "8 min read",
    publishedAt: "October 26, 2026",
    accent: "blue",
    featured: false,
    tags: ["Timeline", "Deadlines", "Early Action", "Senior Year", "Common App"],
    author: {
      name: "Dr. Amy Morgenstern",
      role: "Founder & Master Admissions Consultant",
      avatar: "/images/person/person2.png",
      bio: "Dr. Amy Morgenstern ('Dr. M') founded BlueStars Admissions Consulting in 2010. Holding degrees from UC Berkeley and Stanford University, she has guided hundreds of students to top-tier university admissions through 'The Calm Way' methodology.",
    },
    intro: [
      "The college admissions timeline is a multi-year marathon, not a sprint in October of senior year. When families wait until 12th grade to consider standardized testing, letter of recommendation relationships, and essay drafts, stress levels skyrocket and strategic opportunities are permanently missed.",
      "By breaking the application cycle into manageable, intentional checkpoints beginning in freshman and sophomore year, students can approach senior year with calm confidence, refined narratives, and polished applications.",
    ],
    keyTakeaways: [
      "Junior year spring and summer are the critical window for drafting Common App personal statements.",
      "Understand the binding nature of Early Decision (ED) vs. non-binding Early Action (EA) and Single-Choice Early Action (SCEA).",
      "UC application submission window opens October 1 and closes November 30.",
      "FAFSA and CSS Profile financial aid documentation should be submitted concurrently with early deadlines.",
    ],
    sections: [
      {
        heading: "1. The Multi-Year Horizon: Freshman & Sophomore Foundation",
        paragraphs: [
          "Admissions committees assess academic trajectory over all four years. Freshman and sophomore years are about establishing study discipline, exploring intellectual curiosity, and joining clubs without over-committing.",
          "By the conclusion of 10th grade, students should have identified 1-2 core areas of focus—whether STEM research, visual arts, creative writing, or community activism—where they will build depth over breadth.",
        ],
        bullets: [
          "9th Grade: Solidify high school study habits; choose rigorous foundational courses; explore varied clubs.",
          "10th Grade: Take PSAT 10 or diagnostic ACT; step into secondary leadership roles; plan meaningful summer projects.",
        ],
      },
      {
        heading: "2. Junior Year: The Defining Academic & Strategic Phase",
        paragraphs: [
          "Junior year is the most rigorous academic year on a student's transcript. It is also the year when testing strategies must be finalized and key teacher relationships cultivated for letters of recommendation.",
        ],
        bullets: [
          "Fall (Sept - Nov): Take official PSAT/NMSQT; finalize SAT/ACT prep schedule; attend college fairs.",
          "Winter (Dec - Feb): First official SAT or ACT sitting; start preliminary college list research.",
          "Spring (March - May): Second testing sitting if needed; ask two core academic teachers for recommendation letters in person; register for AP/IB exams.",
          "Summer (June - August): Draft the Common App personal statement; visit top-choice campuses; begin drafting institutional supplemental essays.",
        ],
        callout: {
          type: "tip",
          title: "Summer Milestone",
          text: "Our most successful BlueStars students finalize their Common App Personal Statement draft before the first day of senior year high school classes. This single milestone prevents burnout during the intense fall semester.",
        },
      },
      {
        heading: "3. Senior Fall: The Early Round Deadline Sprint",
        paragraphs: [
          "Senior fall moves rapidly. Between managing AP coursework, varsity sports or arts rehearsals, and application portals, precision organization is non-negotiable.",
        ],
        bullets: [
          "August 1: The Common Application officially launches for the new cycle.",
          "October 1: University of California (UC) application submission window opens.",
          "October 15: Early Action deadlines for certain southern and public flagships (e.g. UNC Chapel Hill, Georgia Tech).",
          "November 1: Primary Early Action (EA), Early Decision I (ED I), and SCEA deadlines (Harvard, Yale, Princeton, Stanford, MIT, etc.).",
          "November 15: Secondary Early Action / ED deadlines.",
          "November 30: Firm deadline for all University of California campuses.",
        ],
        callout: {
          type: "insight",
          title: "Early Round Strategy",
          text: "Applying Early Action or Early Decision can double or triple admissions odds at selective universities. However, never apply ED to a school you are not 100% prepared to attend or where financial aid awards cannot be anticipated.",
        },
      },
      {
        heading: "4. Senior Winter: Regular Decision & Early Outcomes",
        paragraphs: [
          "Mid-December brings Early round decisions. Whether the result is an acceptance, deferral, or denial, maintaining focus for Regular Decision submissions is essential.",
        ],
        bullets: [
          "Mid-December: Early Action / Early Decision results released; celebrate wins or pivot to Regular Decision.",
          "January 1 - 15: Regular Decision (RD) and Early Decision II (ED II) deadlines for Ivy League and most private universities.",
          "February: Submit mid-year grade reports and letters of continued interest (LOCI) for deferred early applicants.",
        ],
      },
      {
        heading: "5. Senior Spring: Decisions, Financial Comparison, and Commitment",
        paragraphs: [
          "From late March through April 1, Regular Decision notifications arrive. Students then have until May 1—National College Decision Day—to compare financial aid packages, attend admitted student days, and make their final deposit.",
        ],
      },
    ],
    conclusion: [
      "A structured timeline transforms what could be a chaotic, anxiety-ridden senior year into an orderly, celebratory rite of passage.",
      "BlueStars advisors build customized, milestone-driven calendars for every student, ensuring no deadline is missed and every essay is polished to perfection.",
    ],
    relatedSlugs: ["how-to-choose-colleges", "strong-personal-statement", "navigating-merit-scholarships"],
  },
  {
    slug: "strong-personal-statement",
    title: "How to Write a Strong Personal Statement",
    excerpt:
      "Practical tips to tell your authentic story, uncover your unique voice, and stand out in selective admissions pools without cliches.",
    coverImage: "/images/blogs/blogs3.png",
    category: "Essay Writing",
    readTime: "6 min read",
    publishedAt: "November 02, 2026",
    accent: "green",
    featured: false,
    tags: ["Personal Statement", "Common App Essay", "Storytelling", "Writing Tips"],
    author: {
      name: "Dr. Amy Morgenstern",
      role: "Founder & Master Admissions Consultant",
      avatar: "/images/person/person3.png",
      bio: "Dr. Amy Morgenstern ('Dr. M') founded BlueStars Admissions Consulting in 2010. Holding degrees from UC Berkeley and Stanford University, she has guided hundreds of students to top-tier university admissions through 'The Calm Way' methodology.",
    },
    intro: [
      "With thousands of applicants possessing near-identical GPAs and standardized test scores, the personal statement is often the single most decisive component of a selective college application. It is the one place where admissions officers hear your authentic speaking voice.",
      "Yet most high school students approach the personal statement as an extended resume or a dramatic retelling of a sports victory or hardship. In this guide, we reveal how to identify meaningful personal narratives, craft vivid imagery, and convey intellectual humility.",
    ],
    keyTakeaways: [
      "The essay should reveal how you think and process the world, not just what you achieved.",
      "Avoid the classic 'cliché traps': the sports injury comeback, mission trip epiphany, or resume recap.",
      "Show, don't merely tell: ground abstract values in specific, sensory moments.",
      "Use the 'Three Passes' editing method: Structure first, tone second, mechanics last.",
    ],
    sections: [
      {
        heading: "1. The Purpose of the Personal Statement in Holistic Review",
        paragraphs: [
          "Admissions readers at selective colleges spend approximately 3 to 7 minutes reviewing an entire application file. During that brief window, your essay must answer one primary question: 'Who will this student be as a roommate, seminar classmate, and campus community member?'",
          "Your personal statement is not a platform to boast or list accolades—those belong in the Common App Activities list. Instead, it is an invitation for self-reflection, vulnerability, and genuine curiosity.",
        ],
        callout: {
          type: "quote",
          title: "The Golden Rule of Admissions Essays",
          text: "'If any other student could put their name on top of your essay and it would still make sense, you haven't gone deep enough into your unique personal truth.' — Dr. Amy Morgenstern",
        },
      },
      {
        heading: "2. Brainstorming Core Values: The 5-Why Exercise",
        paragraphs: [
          "Great essays rarely come from extraordinary events; they come from ordinary moments examined with extraordinary insight. A student repairing vintage mechanical clocks, cooking an elaborate Sunday family meal, or debating urban zoning laws with a local council can craft an unforgettable personal statement.",
          "We use the '5-Why Exercise' to extract deeper meaning from everyday habits. Ask yourself why a particular interest matters to you, and then ask 'why' five times consecutively until you arrive at your foundational values.",
        ],
        bullets: [
          "Identify 3 core personal values (e.g. intellectual curiosity, empathy, civic responsibility).",
          "Pinpoint specific physical objects or rituals in your daily life connected to those values.",
          "Highlight a moment of genuine uncertainty where your worldview evolved.",
        ],
      },
      {
        heading: "3. Crafting a Captivating Narrative Arc without Clichés",
        paragraphs: [
          "Begin in medias res—in the middle of action or thought. Avoid opening with famous quotes, rhetorical questions, or dictionary definitions ('Webster defines passion as...').",
          "Ensure your narrative follows a satisfying structural arc: the inciting moment, the internal conflict or challenge, the intellectual realization, and the broader application to your future goals.",
        ],
        bullets: [
          "Cliché to Avoid #1: The big championship game where you scored or missed the final shot.",
          "Cliché to Avoid #2: The short volunteer trip where you realized how fortunate you are.",
          "Cliché to Avoid #3: The trauma dump without reflection on resilience and personal growth.",
        ],
        callout: {
          type: "tip",
          title: "Vivid Sensory Detail",
          text: "Replace vague generalizations ('I was nervous before the presentation') with precise sensory details ('The hum of the fluorescent projector was the only sound competing with my pulse as I adjusted the microphone').",
        },
      },
      {
        heading: "4. The Three Passes Editing Strategy",
        paragraphs: [
          "Never attempt to polish commas and word count on your first draft. Follow our structured editing protocol:",
        ],
        bullets: [
          "Pass 1 (Architecture & Theme): Does the essay flow logically? Are paragraphs cohesive? Is the central message unmistakable?",
          "Pass 2 (Voice & Tone): Does it sound like an intelligent 17-year-old speaking naturally, or a thesaurus-driven academic robot?",
          "Pass 3 (Micro-Polish): Eliminate passive verbs, tighten sentences under the 650-word cap, and eliminate typos.",
        ],
      },
      {
        heading: "5. Final Pre-Submission Verification",
        paragraphs: [
          "Read your essay out loud slowly. When you read aloud, your ear immediately catches awkward transitions, repetitive phrasing, and breathlessness that your eyes glance over.",
        ],
      },
    ],
    conclusion: [
      "Your personal statement is the beating heart of your application. When crafted with honesty, nuance, and structural mastery, it transforms numbers into a memorable human being.",
      "Explore BlueStars Essay & Personal Statement Guidance to work one-on-one with our master writing coaches and former Ivy League admissions evaluators.",
    ],
    relatedSlugs: ["how-to-choose-colleges", "application-timeline", "extracurricular-profile-spike"],
  },
  {
    slug: "extracurricular-profile-spike",
    title: "Building an Authentic Extracurricular 'Spike' for Top Admissions",
    excerpt:
      "How ambitious students can move past 'well-rounded' checklists to create deep, impactful projects that capture the attention of Ivy League and top-20 committees.",
    coverImage: "/images/sub_images/Students_hero.png",
    category: "Admissions Strategy",
    readTime: "9 min read",
    publishedAt: "September 15, 2026",
    accent: "blue",
    featured: false,
    tags: ["Extracurriculars", "Admissions Spike", "Leadership", "Capstone Projects"],
    author: {
      name: "Dr. Amy Morgenstern",
      role: "Founder & Master Admissions Consultant",
      avatar: "/images/person/person1.png",
      bio: "Dr. Amy Morgenstern ('Dr. M') founded BlueStars Admissions Consulting in 2010. Holding degrees from UC Berkeley and Stanford University, she has guided hundreds of students to top-tier university admissions through 'The Calm Way' methodology.",
    },
    intro: [
      "For decades, high school students were told that colleges wanted 'well-rounded' individuals: a varsity sport, an instrument, five honor societies, and 100 hours of assorted community service. Today, that conventional wisdom is not only obsolete—it is a recipe for application mediocrity.",
      "Selective universities do not seek well-rounded students; they build a well-rounded class composed of angular, deeply focused students with distinct 'spikes'. In this article, we explain what a spike is, how to identify yours, and how to execute self-directed capstone initiatives.",
    ],
    keyTakeaways: [
      "Depth and quantifiable impact consistently outrank superficial participation across 10 clubs.",
      "An effective spike connects coursework, summer activities, independent research, and community leadership.",
      "Self-initiated projects demonstrate genuine agency, entrepreneurial drive, and intellectual vitality.",
      "Learn how to tier your activities list on the Common App to highlight your primary narrative.",
    ],
    sections: [
      {
        heading: "1. The Demise of the Well-Rounded Resume",
        paragraphs: [
          "Admissions committees at Stanford, MIT, and Ivy League universities review tens of thousands of applicants with perfect GPA transcripts. What separates admitted students is evidence of exceptional dedication to a specific intellectual or creative domain.",
          "When an applicant lists 10 unrelated extracurriculars, each receiving 1-2 hours per week, admissions readers see a student checking boxes. Conversely, when an applicant dedicates 15 hours per week to an independent robotics outreach program or published computational biology paper, they project clarity of purpose.",
        ],
      },
      {
        heading: "2. The Anatomy of an Admissions Spike",
        paragraphs: [
          "A spike is not simply being good at math or playing the violin. A compelling spike integrates three interlocking dimensions:",
        ],
        bullets: [
          "Intellectual Curiosity: Pursuing knowledge far beyond the high school curriculum through college courses, independent research, or specialized certifications.",
          "Tangible Execution: Producing concrete deliverables: a published paper, open-source software, an art exhibition, or a community policy proposal.",
          "Generative Leadership: Inspiring and elevating others, creating lasting community infrastructure rather than just holding a club officer title.",
        ],
        callout: {
          type: "insight",
          title: "The Calm Way Principle",
          text: "A spike should never be forced or fabricated. When mentorship meets a student's natural organic interests, hard work feels exciting rather than exhausting.",
        },
      },
      {
        heading: "3. Launching Independent Capstone Initiatives",
        paragraphs: [
          "The most powerful extracurriculars are often those created outside institutional school walls. Rather than waiting for a school club to provide an opportunity, proactive students initiate their own solutions.",
        ],
        bullets: [
          "Step 1: Identify a hyper-local problem at the intersection of your academic passion and community needs.",
          "Step 2: Partner with local organizations, municipal agencies, or university labs to pilot a solution.",
          "Step 3: Document quantitative metrics: number of people served, funds raised, or datasets analyzed.",
        ],
      },
      {
        heading: "4. Framing Your Activities on the Common Application",
        paragraphs: [
          "The Common App gives you only 150 characters for activity descriptions and 50 characters for leadership titles. Every word must carry action verbs and quantifiable results.",
        ],
      },
    ],
    conclusion: [
      "Cultivating an extracurricular spike is an empowering developmental journey that prepares students for college leadership and lifelong fulfillment.",
      "Learn more about how BlueStars Admissions Consulting mentors high school students from 8th to 12th grade to build world-class capstone portfolios.",
    ],
    relatedSlugs: ["how-to-choose-colleges", "application-timeline", "ivy-league-interview-prep"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);

  const related = BLOG_POSTS.filter((post) => current.relatedSlugs.includes(post.slug));
  if (related.length >= count) return related.slice(0, count);

  const remaining = BLOG_POSTS.filter(
    (post) => post.slug !== currentSlug && !related.some((r) => r.slug === post.slug)
  );

  return [...related, ...remaining].slice(0, count);
}
