import { NavItem, NavServiceItem, NavResourceItem, ServiceItem, ProcessStep, Testimonial, ResourceArticle, FAQItem, HeroConfig, Announcement } from "@/types";

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  kicker: "EXPERT GUIDANCE. BRIGHTER OPPORTUNITIES.",
  headingLine1: "Your Future Starts",
  headingLine2: "With the Right",
  headingLine3: "College Plan",
  description:
    "Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.",
  primaryBtnText: "Book a Free Consultation",
  primaryBtnHref: "/#contact",
  secondaryBtnText: "Explore Our Services",
  secondaryBtnHref: "/#services",
  image: "/images/sub_images/Students_hero.png",
  feature1: "Personalized\nGuidance",
  feature2: "Clear Application\nStrategy",
  feature3: "Support at\nEvery Step",
  card1: "Personalized\nGuidance",
  card2: "Holistic\nApproach",
  card3: "Student-Centric\nSupport",
};

export const SITE_CONFIG = {
  name: "Blue Stars Admissions Consulting",
  shortName: "Blue Stars",
  tagline: "ADMISSIONS CONSULTING",
  description:
    "Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.",
  url: "https://bluestars.us",
  contact: {
    email: "info@bluestars.us",
    phone: "415-426-9444",
    address: "San Francisco, CA",
  },
  socials: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Blogs", href: "/blogs" },
  { label: "College Planning", href: "/#planning" },
  { label: "About", href: "/about" },
];

export const NAV_RESOURCES: NavResourceItem[] = [
  {
    id: "guides",
    title: "Application Guides & Toolkits",
    shortDescription: "Comprehensive roadmaps, UC PIQ guides, Common App timelines, and checklists.",
    href: "/resources/guides",
    badge: "Free Downloads",
    accent: "blue",
    iconName: "book",
  },
  {
    id: "webinars",
    title: "Live Webinars & Workshops",
    shortDescription: "Interactive masterclasses, live Q&As, and seasonal strategy workshops with experts.",
    href: "/resources/webinars",
    badge: "Interactive",
    accent: "green",
    iconName: "radio",
  },
  {
    id: "videos",
    title: "Video Library & Masterclasses",
    shortDescription: "Curated admissions videos, campus tours, and student interview highlights.",
    href: "/resources/videos",
    badge: "On-Demand",
    accent: "blue",
    iconName: "video",
  },
  {
    id: "faq",
    title: "Admissions FAQ & Knowledge Base",
    shortDescription: "Detailed answers to 50+ common questions on applications, testing, and timelines.",
    href: "/resources/faq",
    badge: "Knowledge Base",
    accent: "green",
    iconName: "help",
  },
  {
    id: "blogs",
    title: "Admissions Blog & Articles",
    shortDescription: "In-depth insights, essay breakdowns, and educational strategies from counselors.",
    href: "/blogs",
    badge: "Articles",
    accent: "blue",
    iconName: "newspaper",
  },
  {
    id: "stories",
    title: "Student Success Stories",
    shortDescription: "Explore 50+ real admissions journeys and client transformations from 16+ years.",
    href: "/stories",
    badge: "50+ Stories",
    accent: "green",
    iconName: "award",
  },
];

export const NAV_SERVICES: NavServiceItem[] = [
  {
    id: "college-admissions-consulting",
    title: "College Admissions Consulting",
    shortDescription: "Personalized advising and mentoring to craft standout, authentic college applications.",
    href: "/services/college-admissions-consulting",
    badge: "Most Popular",
    accent: "blue",
    iconName: "compass",
  },
  {
    id: "research-internships",
    title: "Research & Internships",
    shortDescription: "Independent scientific & humanities research, lab placements, and summer program applications.",
    href: "/services/research-internships",
    badge: "Academic Spike",
    accent: "blue",
    iconName: "research",
  },
  {
    id: "college-planning",
    title: "College & University Planning",
    shortDescription: "Strategic multi-year high school roadmap and personalized college list development.",
    href: "/services/college-planning",
    badge: "Foundational",
    accent: "green",
    iconName: "building",
  },
  {
    id: "application-strategy",
    title: "Application Strategy",
    shortDescription: "Competitive positioning, balanced college lists, timeline planning, and application polish.",
    href: "/services/application-strategy",
    badge: "Strategic",
    accent: "blue",
    iconName: "doc",
  },
  {
    id: "essay-guidance",
    title: "Essay & Personal Statement Guidance",
    shortDescription: "Authentic storytelling, topic ideation, structural coaching, and meticulous line editing.",
    href: "/services/essay-guidance",
    badge: "Core Skill",
    accent: "blue",
    iconName: "pencil",
  },
  {
    id: "art-admissions-consulting",
    title: "Art Admissions Consulting",
    shortDescription: "Portfolio curation and artist statements for top art, design, and architecture programs.",
    href: "/services/art-admissions-consulting",
    badge: "Specialized",
    accent: "green",
    iconName: "palette",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "college-admissions-consulting",
    title: "College Admissions Consulting",
    description: "Individually tailored advising, coaching, and mentoring to ignite curiosity and build authentic applications.",
    iconName: "compass",
    accent: "blue",
    linkHref: "/services/college-admissions-consulting",
  },
  {
    id: "research-internships",
    title: "Research & Internships",
    description: "Mentorship for lab placements, Ivy League faculty outreach, original research papers, and prestigious summer programs.",
    iconName: "research",
    accent: "blue",
    linkHref: "/services/research-internships",
  },
  {
    id: "college-planning",
    title: "College & University Planning",
    description: "Find the right colleges that match your goals, interests and profile.",
    iconName: "building",
    accent: "green",
    linkHref: "/services/college-planning",
  },
  {
    id: "application-strategy",
    title: "Application Strategy",
    description: "Build a strong application with the right strategy and timeline.",
    iconName: "doc",
    accent: "blue",
    linkHref: "/services/application-strategy",
  },
  {
    id: "essay-guidance",
    title: "Essay & Personal Statement Guidance",
    description: "Tell your story effectively with expert feedback and support.",
    iconName: "pencil",
    accent: "blue",
    linkHref: "/services/essay-guidance",
  },
  {
    id: "art-admissions-consulting",
    title: "Art Admissions Consulting",
    description: "Build a stunning art portfolio and create a captivating artist statement for top art & design programs.",
    iconName: "palette",
    accent: "green",
    linkHref: "/services/art-admissions-consulting",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discover",
    description: "Understand your goals, interests and strengths.",
    iconName: "search",
  },
  {
    stepNumber: "02",
    title: "Plan",
    description: "Create a personalized college list and strategy.",
    iconName: "doc",
  },
  {
    stepNumber: "03",
    title: "Prepare",
    description: "Work on applications, essays and requirements.",
    iconName: "gear",
  },
  {
    stepNumber: "04",
    title: "Apply",
    description: "Submit strong applications with confidence.",
    iconName: "send",
    isFinal: true,
  },
];

export const WHY_CHOOSE_BENEFITS = [
  "One-on-one guidance from experienced consultants",
  "Personalized strategies for your goals",
  "Support for all aspects of the application process",
  "A caring and encouraging approach",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sandy-los-gatos",
    name: "Sandy",
    title: "Trusted Guidance for All Three of Our Children",
    quote:
      "We have trusted Blue Stars with all three of our children. Our first was admitted to NYU Stern, our second to UC Berkeley, and our third was admitted to both Stanford and Harvard. Each child is completely different, and Blue Stars found the story true to each of them.",
    image: "/images/person/person1.png",
    authorRole: "Blue Stars Parent, Los Gatos, CA",
    location: "Los Gatos, CA",
    admittedTo: "NYU Stern, UC Berkeley, Stanford & Harvard",
    rating: 5,
    accent: "blue",
    fullStory: [
      "We have trusted Blue Stars with all three of our children. Our first was admitted to NYU Stern, our second to UC Berkeley, and our third was admitted to both Stanford and Harvard.",
      "Each child is completely different, and Blue Stars found the story true to each of them. We are very grateful.",
      "Blue Stars Admissions Consulting provided dedicated, personalized mentoring that celebrated each child's individual voice, strengths, and personal journey without ever resorting to one-size-fits-all formulas.",
    ],
    tags: ["All 3 Children", "Stanford & Harvard", "UC Berkeley", "NYU Stern"],
  },
  {
    id: "sharon-washu-ed",
    name: "Sharon",
    title: "Calm, Structure, and a First-Choice Early Decision Acceptance",
    quote:
      "Helen has been an absolute gift to our family over the past four years. From the beginning, she respected my daughter’s clarity of purpose and academic direction, supporting her goals rather than trying to reshape her into someone else for the sake of admissions optics.",
    image: "/images/person/person2.png",
    authorRole: "Parent of Student Accepted to Washington University ED",
    location: "United States",
    admittedTo: "Washington University in St. Louis (ED)",
    rating: 5,
    accent: "blue",
    fullStory: [
      "Helen has been an absolute gift to our family over the past four years. From the beginning, she respected my daughter’s clarity of purpose and academic direction, supporting her goals rather than trying to reshape her into someone else for the sake of admissions optics. Instead, Helen elevated those goals by offering thoughtful ideas, strategic guidance, and encouragement that helped my daughter grow into her strongest, most authentic self.",
      "Helen has also been an invaluable sounding board for me as a parent. Whenever I had questions about college strategy or timing, she was consistently responsive, thoughtful, and reassuring. Her turnaround time is remarkable, and it is clear that she takes genuine pride in both her work and the success of the students she supports.",
      "During application season, Helen brought calm and structure to what can easily feel overwhelming. She helped my daughter map out a clear, manageable essay timeline and provided feedback that was timely, precise, and empowering. The process felt organized, focused, and never stressful.",
      "The result speaks for itself. My daughter was admitted to her first choice school through Early Decision. We are deeply grateful to Helen and the entire Blue Stars team for their dedication, care, and unwavering belief in our daughter.",
    ],
    tags: ["Early Decision", "Washington University", "Essay Timeline"],
  },
  {
    id: "jeanie-risd-arts",
    name: "Jeanie",
    title: "With Blue Stars’ Guidance, I Was Admitted into My Dream School, RISD!",
    quote:
      "When I first started working with Blue Stars, I wasn’t completely sure I wanted to pursue art. She encouraged me to immerse myself in the art world by visiting art museums and listening to podcasts. With Blue Stars’ guidance during the college admissions process, I was admitted into my dream school, RISD!",
    image: "/images/person/person3.png",
    authorRole: "Blue Stars Student, Gunn High School, Palo Alto, CA",
    location: "Palo Alto, CA",
    admittedTo: "Rhode Island School of Design (RISD)",
    rating: 5,
    accent: "green",
    fullStory: [
      "When I first started working with Blue Stars, I wasn’t completely sure I wanted to pursue art. She encouraged me to immerse myself in the art world by visiting art museums and listening to art related podcasts. These engaging activities inspired me and I became more passionate about studying art in the future. Through our weekly zoom meetings, Blue Stars gave me advice on setting goals for school and walked me through summer program applications.",
      "With Blue Stars’ guidance during the college admissions process, I was admitted into my dream school, RISD! I was very nervous because the applications felt overwhelming at first, but it became easier to complete everything once it was broken down into specific tasks. Blue Stars gave me lots of excellent feedback on my essays, and I became more confident in what I wanted to convey in my writing.",
      "Not only did Blue Stars help me academically, but she also enthusiastically instilled me with valuable life skills that I will take into the future.",
    ],
    tags: ["RISD Dream School", "Gunn High School", "Art Portfolio"],
  },
  {
    id: "adrian-brown-env",
    name: "Adrian",
    title: "Positive Encouragement and a Place at Brown University",
    quote:
      "Our son was introduced to Blue Stars in 10th grade. Although at that time he studied well and loved reading, he was not very confident and did not know which major to choose for college. After consulting his assigned counselor and Dr. Amy, he decided to major in environmental engineering.",
    image: "/images/person/person2.png",
    authorRole: "Blue Stars Parent",
    location: "California",
    admittedTo: "Brown University (Environmental Engineering)",
    rating: 5,
    accent: "green",
    fullStory: [
      "Our son was introduced to Blue Stars in 10th grade. Although at that time he studied well and loved reading, he was not very confident and did not know which major to choose for college. After consulting his assigned counselor and Dr. Amy, he decided to major in environmental engineering. She assisted us in applying for summer programs like Brown University Summer Camp and the COSMOS program.",
      "She also gave useful advice on college application essays and made sure our son was always staying on top of his college application schedule. We are deeply grateful to Blue Stars for their prompt and proper guidance and encouragement at each stage of the application process. The positive encouragement had a great influence on our son, and eventually, he was offered a place at Brown.",
    ],
    tags: ["Brown University", "COSMOS Program", "Environmental Engineering"],
  },
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: "how-to-choose-colleges",
    title: "How to Choose the Right Colleges for Your Goals",
    description: "Tips to find the best fit based on your interests, profile and future plans.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    readMoreHref: "/#contact",
    category: "Planning",
  },
  {
    id: "application-timeline",
    title: "College Application Timeline: Key Dates to Know",
    description: "A step-by-step guide to important deadlines and milestones.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    readMoreHref: "/#contact",
    category: "Timeline",
  },
  {
    id: "strong-personal-statement",
    title: "How to Write a Strong Personal Statement",
    description: "Practical tips to tell your story and stand out in your application.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    readMoreHref: "/#contact",
    category: "Essays",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "How does the consultation process work?",
    answer: "You book a free consultation, we learn about your goals and profile, and then we recommend a clear plan and next steps tailored to you.",
  },
  {
    question: "Do you help with international college applications?",
    answer: "Yes. We guide students applying to colleges in different countries, including requirements, timelines and documentation.",
  },
  {
    question: "Do you help students find research opportunities and internships?",
    answer: "Yes! Our Research Academy and internship mentorship connects students with university laboratory positions (including Ivy League labs), faculty cold-email frameworks, and prestigious summer research fellowships.",
  },
  {
    question: "When should I start the college planning process?",
    answer: "The earlier the better. Ideally start 12 to 18 months before applications are due, but we support students at every stage.",
  },
];

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "announcement-cohort-2026",
    title: "Class of 2026 & 2027 Admissions Cohort",
    message: "Now accepting high school students for comprehensive 1-on-1 college admissions mentoring. Limited advisory spots available.",
    badge: "LIMITED SPOTS",
    linkText: "Schedule Free 30-Min Consultation",
    linkUrl: "/contact",
    type: "banner",
    isActive: true,
    priority: 10,
    createdAt: "2026-11-08T00:00:00Z",
  },
  {
    id: "announcement-live-webinar",
    title: "Live Admissions Masterclass",
    message: "How to Build an Authentic Extracurricular Profile Spike That Stanford & Ivies Can't Ignore — with Dr. Amy Morgenstern.",
    badge: "FREE WEBINAR",
    linkText: "Reserve Free Seat",
    linkUrl: "/resources/webinars",
    type: "webinar",
    isActive: true,
    priority: 8,
    createdAt: "2026-11-07T00:00:00Z",
  },
  {
    id: "announcement-early-outcomes",
    title: "98% Top-3 College Acceptance Rate",
    message: "Explore our newly published student success case studies and accepted essays for Stanford, WashU, RISD & UC Berkeley.",
    badge: "NEW RESULTS",
    linkText: "Explore Student Stories",
    linkUrl: "/stories",
    type: "success",
    isActive: true,
    priority: 6,
    createdAt: "2026-11-06T00:00:00Z",
  },
];

