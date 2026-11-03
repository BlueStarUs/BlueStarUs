import { NavItem, ServiceItem, ProcessStep, Testimonial, ResourceArticle, FAQItem } from "@/types";

export const SITE_CONFIG = {
  name: "BlueStars Admissions Consulting",
  shortName: "BlueStars",
  tagline: "ADMISSIONS CONSULTING",
  description:
    "Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.",
  url: "https://bluestars.us",
  contact: {
    email: "hello@bluestars.us",
    phone: "+1 (855) 123-4567",
    address: "United States",
  },
  socials: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Our Services", href: "/services" },
  { label: "College Planning", href: "/#planning" },
  { label: "Resources", href: "/#resources" },
  { label: "About", href: "/about" },
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
    id: "art-admissions-consulting",
    title: "Art Admissions Consulting",
    description: "Build a stunning art portfolio and create a captivating artist statement for top art & design programs.",
    iconName: "palette",
    accent: "green",
    linkHref: "/services/art-admissions-consulting",
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
    id: "scholarship-aid",
    title: "Scholarship & Financial Aid Guidance",
    description: "Explore funding opportunities and get guidance on financial aid.",
    iconName: "coins",
    accent: "green",
    linkHref: "/services/scholarships",
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
    id: "aisha",
    name: "Aisha",
    quote: "The guidance I received helped me stay organized and confident throughout the process.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    schoolOrRole: "Stanford University '28",
  },
  {
    id: "rohan",
    name: "Rohan",
    quote: "They truly understood my goals and helped me find the right colleges for my profile.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    schoolOrRole: "UC Berkeley '28",
  },
  {
    id: "maya",
    name: "Maya",
    quote: "The support with my essay made a huge difference. I felt more confident and prepared.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    schoolOrRole: "Columbia University '28",
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
    question: "Can you help with scholarship and financial aid guidance?",
    answer: "Absolutely. We help you explore funding opportunities and understand financial aid options and deadlines.",
  },
  {
    question: "When should I start the college planning process?",
    answer: "The earlier the better. Ideally start 12 to 18 months before applications are due, but we support students at every stage.",
  },
];

