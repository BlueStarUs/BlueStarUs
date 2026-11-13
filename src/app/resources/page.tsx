import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Radio,
  Video,
  HelpCircle,
  Newspaper,
  Award,
  Download,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  RESOURCE_GUIDES,
  WEBINARS_DATA,
  VIDEO_RESOURCES,
  FAQ_CATEGORIES,
} from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "College Admissions Resources & Toolkits",
  description:
    "Comprehensive college admissions guides, live webinars, video masterclasses, FAQs, and expert insights designed to guide high school students toward top colleges.",
  alternates: {
    canonical: "https://bluestars.us/resources",
  },
  openGraph: {
    title: "College Admissions Resources & Toolkits | Blue Stars",
    description:
      "Comprehensive college admissions guides, live webinars, video masterclasses, FAQs, and expert insights designed to guide high school students toward top colleges.",
    url: "https://bluestars.us/resources",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting Resources & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Resources & Toolkits | Blue Stars",
    description:
      "Comprehensive college admissions guides, live webinars, video masterclasses, FAQs, and expert insights designed to guide high school students toward top colleges.",
    images: ["/images/og-image.png"],
  },
};

const RESOURCE_HUBS = [
  {
    id: "guides",
    title: "Application Guides & Toolkits",
    category: "FREE DOWNLOADS",
    description:
      "Comprehensive, downloadable PDF blueprints, UC PIQ handbooks, Common App checklists, and 4-year planning roadmaps.",
    href: "/resources/guides",
    badge: "6 Comprehensive Guides",
    accent: "blue" as const,
    icon: BookOpen,
    highlights: [
      "Ivy League & Top 20 Admissions Playbook",
      "UC PIQ Writing Mastery Handbook",
      "9th–12th Grade College Planning Master Checklist",
    ],
    actionText: "Browse All Guides",
  },
  {
    id: "webinars",
    title: "Live Webinars & Workshops",
    category: "INTERACTIVE SESSIONS",
    description:
      "Interactive masterclasses and live strategy breakdowns hosted by Dr. Amy Morgenstern and our senior counseling team with live Q&A.",
    href: "/resources/webinars",
    badge: "Upcoming & On-Demand",
    accent: "green" as const,
    icon: Radio,
    highlights: [
      "Demystifying Top 20 Admissions Strategy",
      "Cracking the UC System (Berkeley & UCLA)",
      "High School Extracurricular Passion Projects",
    ],
    actionText: "View Schedule & Replays",
  },
  {
    id: "videos",
    title: "Video Library & Masterclasses",
    category: "ON-DEMAND STREAMING",
    description:
      "Curated admissions video tutorials, student journey interviews, and campus insight tours to watch at your own pace.",
    href: "/resources/videos",
    badge: "15+ Free Videos",
    accent: "blue" as const,
    icon: Video,
    highlights: [
      "Essay Brainstorming Blueprint Walkthrough",
      "Complete UC Application Portal Screen-Share",
      "Admitted Student Journeys: Stanford, RISD, NYU",
    ],
    actionText: "Watch Video Library",
  },
  {
    id: "faq",
    title: "Admissions FAQ & Knowledge Base",
    category: "KNOWLEDGE BASE",
    description:
      "Clear, detailed answers to over 50+ of the most frequent admissions questions on testing, letters of recommendation, and timelines.",
    href: "/resources/faq",
    badge: "5 Essential Categories",
    accent: "green" as const,
    icon: HelpCircle,
    highlights: [
      "College list balance & early decision strategies",
      "Digital SAT / ACT test-optional policies",
      "FAFSA, CSS Profile & merit aid negotiation",
    ],
    actionText: "Explore Knowledge Base",
  },
  {
    id: "blogs",
    title: "Admissions Blog & Articles",
    category: "EXPERT ADVICE",
    description:
      "In-depth analytical articles, high school strategy reflections, and essay breakdowns written directly by experienced college counselors.",
    href: "/blogs",
    badge: "Updated Weekly",
    accent: "blue" as const,
    icon: Newspaper,
    highlights: [
      "How to Choose the Right Colleges for Your Goals",
      "College Application Timeline: Key Milestones",
      "How to Write an Authentic Personal Statement",
    ],
    actionText: "Read Admissions Blog",
  },
  {
    id: "stories",
    title: "Student Success Stories",
    category: "CASE STUDIES",
    description:
      "Explore 50+ real admissions transformations, student case studies, and parent testimonials from 16+ years of Blue Stars mentorship.",
    href: "/stories",
    badge: "50+ Verified Stories",
    accent: "green" as const,
    icon: Award,
    highlights: [
      "Acceptances to Stanford, Harvard, MIT, Columbia & Yale",
      "UC Berkeley, UCLA, and Top Engineering Programs",
      "RISD, Pratt, Parsons, and Specialized Arts Colleges",
    ],
    actionText: "Read Success Stories",
  },
];

const GENERAL_RESOURCE_FAQS = [
  {
    question: "Are all the guides, checklists, and video resources on this page free?",
    answer:
      "Yes! All Blue Stars admissions guides, application checklists, and video masterclasses are completely free. We believe in providing families with transparent, accessible, high-caliber admissions intelligence.",
  },
  {
    question: "How frequently are the admissions guides and checklists updated?",
    answer:
      "Our counseling team updates all toolkits, UC PIQ handbooks, and Common App guides annually each summer to reflect the latest testing policies, prompt revisions, and institutional admissions trends for the active cycle.",
  },
  {
    question: "Can parents attend the live admissions webinars?",
    answer:
      "Yes, our webinars are specifically designed for both parents and high school students (grades 8–12). We encourage families to attend together, as college planning is most successful as a collaborative endeavor.",
  },
  {
    question: "How do I take the next step after reading a guide?",
    answer:
      "If you would like personalized, one-on-one advising tailored to your student's unique strengths, schedule a free 30-minute introductory consultation with our senior advisory team.",
  },
];

export default function ResourcesPage() {
  const featuredGuides = RESOURCE_GUIDES.slice(0, 3);
  const upcomingWebinars = WEBINARS_DATA.slice(0, 2);
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Short, Compact Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "Resources & Insights" }]}
        badge="RESOURCES & INSIGHTS"
        title="Comprehensive Admissions Guides, Tools & Expert Insights"
        description="Explore our curated collection of expert admissions articles, downloadable application checklists, video masterclasses, and live webinars designed to give your family clarity at every milestone."
      />

      {/* 6 Core Resource Hubs Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f9fcff] border-b border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                EXPLORE BY CATEGORY
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
              Select a Resource Hub to Get Started
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mt-2 max-w-2xl">
              Whether you are just beginning 9th grade exploration or finalizing senior applications, dive into our specialized libraries below.
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {RESOURCE_HUBS.map((hub) => {
              const IconComp = hub.icon;
              return (
                <div
                  key={hub.id}
                  className="bg-white rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 group hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={`w-12 h-12 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-xs ${
                          hub.accent === "green"
                            ? "bg-brand-green text-brand-greenDark"
                            : "bg-brand-sky text-brand-blue"
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>

                      <span
                        className={`text-[10px] sm:text-[10.5px] font-bold px-2.5 py-1 rounded-[5px] uppercase tracking-wider font-heading ${
                          hub.accent === "green"
                            ? "bg-brand-green text-brand-greenDark border border-brand-greenDark/20"
                            : "bg-brand-sky text-brand-blue border border-brand-blue/20"
                        }`}
                      >
                        {hub.badge}
                      </span>
                    </div>

                    {/* Category Kicker */}
                    <span className="text-[11px] sm:text-xs font-bold text-brand-blue tracking-[0.12em] uppercase font-heading block mb-1">
                      {hub.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl sm:text-[21px] font-extrabold text-brand-navy font-heading mb-2.5 leading-snug group-hover:text-brand-blue transition-colors">
                      <Link href={hub.href} className="focus:outline-none">
                        {hub.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-[14.5px] sm:text-[15px] leading-[22px] sm:leading-[24px] text-brand-text font-sans mb-5">
                      {hub.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 mb-6 pt-3 border-t border-[#edf4fb]">
                      {hub.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-brand-navy/90 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-3 border-t border-[#edf4fb]">
                    <Link
                      href={hub.href}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-brand-blue bg-[#e4f1fc] hover:bg-brand-blue hover:text-white transition-all duration-200 font-heading shadow-xs group-hover:shadow-sm"
                    >
                      <span>{hub.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Downloadable Guides Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  POPULAR DOWNLOADS
                </span>
              </div>
              <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
                Featured Admissions Guides & E-Books
              </h2>
            </div>

            <Link
              href="/resources/guides"
              className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-bold text-brand-blue hover:text-brand-navy font-heading group"
            >
              <span>View All 6 Downloadable Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8f2fc]">
                    <Image
                      src={guide.coverImage}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md text-white text-[10.5px] font-bold uppercase tracking-wider font-heading border border-white/20">
                      <span>{guide.category}</span>
                    </div>
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-semibold">
                      <span>{guide.pages} Pages</span>
                      <span>Free PDF Guide</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg sm:text-[19px] font-extrabold text-brand-navy font-heading mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-[14px] leading-[22px] text-brand-text font-sans mb-4 line-clamp-3">
                      {guide.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[#edf4fb]">
                      {guide.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-brand-navy/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/resources/guides#${guide.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-colors font-heading shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Free Guide</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming & On-Demand Webinars Highlight */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f9fcff] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  LIVE ADMISSIONS SESSIONS
                </span>
              </div>
              <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
                Interactive Webinars &amp; Strategy Masterclasses
              </h2>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-bold text-brand-blue hover:text-brand-navy font-heading group"
            >
              <span>View All Events &amp; Webinars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {upcomingWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-[5px] border border-[#e2eef9] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#E3F5EA] text-[#2F9E5C] text-[11px] font-bold uppercase tracking-wider font-heading border border-[#2F9E5C]/20">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span>{webinar.category}</span>
                    </span>

                    <span className="text-xs font-semibold text-brand-text flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-blue" />
                      <span>{webinar.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-[22px] font-extrabold text-brand-navy font-heading mb-2 leading-snug">
                    {webinar.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-brand-blue mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{webinar.date} • {webinar.time}</span>
                  </div>

                  <p className="text-[14.5px] leading-[23px] text-brand-text font-sans mb-6">
                    {webinar.description}
                  </p>

                  {/* Speaker Info */}
                  <div className="flex items-center gap-3 p-3.5 rounded-[5px] bg-brand-bg/80 border border-brand-border/60 mb-6">
                    <div className="w-11 h-11 rounded-[5px] overflow-hidden relative flex-shrink-0">
                      <Image
                        src={webinar.speaker.avatar}
                        alt={webinar.speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-brand-navy font-heading">
                        {webinar.speaker.name}
                      </div>
                      <div className="text-[11px] sm:text-xs text-brand-text">
                        {webinar.speaker.role}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#edf4fb] flex items-center justify-between gap-3">
                  <span className="text-xs text-brand-text font-sans">
                    Free live registration • Interactive Q&A
                  </span>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-colors font-heading shadow-xs"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Masterclasses Quick Access Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  ON-DEMAND VIDEO LIBRARY
                </span>
              </div>
              <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
                Watch Admissions Masterclasses & Student Insights
              </h2>
            </div>

            <Link
              href="/resources/videos"
              className="inline-flex items-center gap-2 text-xs sm:text-[13.5px] font-bold text-brand-blue hover:text-brand-navy font-heading group"
            >
              <span>Explore All Video Masterclasses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {VIDEO_RESOURCES.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8f2fc]">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Video className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md text-white text-[10.5px] font-bold uppercase tracking-wider font-heading">
                      <span>{video.category}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-white text-[11px] font-bold px-2 py-0.5 rounded-[5px] bg-black/75">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base sm:text-[17px] font-bold text-brand-navy font-heading mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-[13.5px] leading-[21px] text-brand-text font-sans mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="text-xs font-semibold text-brand-blue font-heading">
                      Speaker: {video.speaker}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/resources/videos#${video.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-brand-blue bg-[#e4f1fc] hover:bg-brand-blue hover:text-white transition-colors font-heading"
                  >
                    <span>Watch Masterclass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f9fcff] border-t border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  NEED CLARITY?
                </span>
              </div>

              <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px] mb-4">
                Resources & Admissions FAQs
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Have questions about how to utilize our free tools, when to begin working with a counselor, or how Blue Stars compares to other consulting programs?
              </p>

              <div className="p-6 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs">
                <h4 className="text-[15px] font-bold text-brand-navy font-heading mb-1.5">
                  Looking for the Complete 50+ Question FAQ Hub?
                </h4>
                <p className="text-[13.5px] leading-[21px] text-brand-text font-sans mb-4">
                  Explore our dedicated knowledge base covering testing policies, UC PIQs, Early Decision rules, and financial aid strategies.
                </p>
                <Link
                  href="/resources/faq"
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-brand-blue hover:text-brand-navy font-heading"
                >
                  <span>Visit Full Admissions FAQ Knowledge Base</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div>
              <ServiceFAQAccordion faqs={GENERAL_RESOURCE_FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Elevated Blue Stars CTA Banner Card (Exact match with Services page) */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4 lg:px-4">
          <div className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            {/* Ambient Background Waves */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />

              <svg
                className="absolute -bottom-6 left-0 w-[500px] h-[180px] text-[#00b4d8] opacity-20 blur-xs"
                viewBox="0 0 500 180"
                fill="none"
              >
                <path d="M0 100 C 130 160, 280 40, 500 120 L 500 180 L 0 180 Z" fill="currentColor" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              {/* Left Column */}
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>CUSTOMIZED ADMISSIONS STRATEGY</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Turn Admissions Insights into Acceptance Letters
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Ready to craft an authentic extracurricular spike and write essays that truly resonate? Schedule a free 30-minute introductory consultation with our senior mentors.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                  <Link
                    href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span>Schedule Free Consultation</span>
                    <ArrowRight className="w-4 h-4 text-[#07466f]" />
                  </Link>

                  <Link
                    href="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
                  >
                    <span>Explore Our Programs</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Value Props */}
              <div className="hidden lg:flex flex-col justify-center p-8 xl:p-12 border-t lg:border-t-0 lg:border-l border-white/15 bg-white/[0.03]">
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-heading font-bold text-white text-sm">
                        16+ Years Guiding Top Students
                      </div>
                      <div className="text-xs text-[#d4e8f8] mt-0.5 font-sans">
                        Proven holistic approach under Dr. Amy Morgenstern.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-heading font-bold text-white text-sm">
                        Top 20 & Elite University Admits
                      </div>
                      <div className="text-xs text-[#d4e8f8] mt-0.5 font-sans">
                        Students admitted to Ivies, Stanford, MIT, and UC campuses.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-heading font-bold text-white text-sm">
                        100% Tailored Mentorship
                      </div>
                      <div className="text-xs text-[#d4e8f8] mt-0.5 font-sans">
                        No generic formulas or one-size-fits-all advising.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

