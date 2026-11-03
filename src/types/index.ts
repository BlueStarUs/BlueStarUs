export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'building' | 'doc' | 'pencil' | 'coins' | 'compass' | 'palette';
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
  quote: string;
  image: string;
  schoolOrRole?: string;
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
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

