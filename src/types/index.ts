export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface NavServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  href: string;
  badge?: string;
  accent: 'blue' | 'green';
  iconName: 'compass' | 'palette' | 'building' | 'doc' | 'pencil' | 'coins' | 'research' | 'sparkles';
}

export interface NavResourceItem {
  id: string;
  title: string;
  shortDescription: string;
  href: string;
  badge?: string;
  accent: 'blue' | 'green';
  iconName: 'book' | 'radio' | 'video' | 'help' | 'newspaper' | 'award';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'building' | 'doc' | 'pencil' | 'coins' | 'compass' | 'palette' | 'research' | 'sparkles';
  accent?: 'blue' | 'green';
  linkHref: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: 'search' | 'doc' | 'gear' | 'send';
  isFinal?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  title?: string;
  quote: string;
  image?: string;
  schoolOrRole?: string;
  authorRole?: string;
  location?: string;
  admittedTo?: string;
  rating?: number;
  fullStory?: string[];
  tags?: string[];
  accent?: "blue" | "green";
}

export interface SuccessStory {
  id: string;
  name: string;
  title?: string;
  quote: string;
  image?: string;
  accent: "blue" | "green";
  admittedTo?: string;
  major?: string;
  highSchool?: string;
  program?: string;
  fullStory?: string[];
  keyOutcome?: string;
  tags?: string[];
  category?: string;
  schoolOrRole?: string;
  authorRole?: string;
  location?: string;
  rating?: number;
}

export interface ResourceArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  readMoreHref: string;
  date?: string;
  category?: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogCallout {
  type: "tip" | "insight" | "quote";
  title?: string;
  text: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: BlogCallout;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: "College Planning" | "Admissions Strategy" | "Essay Writing" | "Financial Aid" | "Interviews";
  readTime: string;
  publishedAt: string;
  author: BlogAuthor;
  accent: "blue" | "green";
  featured?: boolean;
  tags: string[];
  intro: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  conclusion: string[];
  relatedSlugs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface BenefitItem {
  text: string;
}

export type LeadStatus = "new" | "contacted" | "consulted" | "enrolled" | "archived";

export interface ConsultationLead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  studentGrade?: string;
  interest: string;
  targetColleges?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export interface AdminUser {
  email: string;
  role: "superadmin" | "admin" | "counselor";
  name: string;
}

export interface HeroConfig {
  kicker: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  description: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText: string;
  secondaryBtnHref: string;
  image: string;
  feature1: string;
  feature2: string;
  feature3: string;
  card1: string;
  card2: string;
  card3: string;
}

export type AnnouncementType = "banner" | "alert" | "webinar" | "urgent" | "success";

export interface Announcement {
  id: string;
  title: string;
  message?: string;
  badge?: string;
  linkText?: string;
  linkUrl?: string;
  type?: AnnouncementType;
  isActive: boolean;
  priority: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}



