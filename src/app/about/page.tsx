import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Award,
  Globe2,
  Sparkles,
  Users2,
  GraduationCap,
  Heart,
  Lightbulb,
  Compass,
  ShieldCheck,
  Target,
  Trophy,
  ExternalLink,
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { BrandStar } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Us | BlueStars Admissions Consulting",
  description:
    "Learn about BlueStars Admissions Consulting, founded by Dr. Amy Morgenstern. Discover our whole-student philosophy, senior counseling team, global reach, and track record of dream college admissions.",
};

const STRATEGIC_PILLARS = [
  "Holistic Student & Strength Assessment",
  "Individualized Multi-Year High School Roadmaps (8th–12th Grade)",
  "Authentic Socratic Narrative & Essay Development",
  "Strategic Course Rigor, AP/IB & Testing Timelines",
  "Balanced College List Architecture (Reach, Target, Likely)",
  "Stress-Free Milestone Execution Following 'The Calm Way'",
];

const ACHIEVEMENTS_DATA = [
  { value: "16+", label: "Years Guiding Families", subtext: "Since 2010 in SF Bay Area" },
  { value: "98%", label: "Top-Choice College Admits", subtext: "Stanford, Ivy League & UCs" },
  { value: "100%", label: "Custom Socratic Mentorship", subtext: "Never formulaic or outsourced" },
  { value: "$14M+", label: "Merit Aid Won for Students", subtext: "Institutional & outside scholarships" },
];

const TEAM_MEMBERS = [
  {
    name: "Dr. Amy Morgenstern",
    role: "Founder & Lead Admissions Strategist",
    credentials: "Ph.D. in Philosophy, MFA in Contemporary Art",
    bio: "Former university philosophy professor and honors program associate director. Dr. Morgenstern founded BlueStars in 2010 to replace admissions frenzy with thoughtful, whole-student mentorship guided by 'The Calm Way.'",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    badge: "FOUNDER & FACULTY MENTOR",
  },
  {
    name: "Lisa Sommer",
    role: "Senior Admissions Counselor & Writing Director",
    credentials: "M.A. in English & Education, Former Admissions Reader",
    bio: "With over 12 years evaluating university applications, Lisa coaches students to eliminate clichés, unearth personal vulnerability, and craft unforgettable Common App personal statements.",
    image: "https://images.unsplash.com/photo-1580894732488-81e0503f8cb7?q=80&w=800&auto=format&fit=crop",
    badge: "ESSAY & NARRATIVE LEAD",
  },
  {
    name: "Jonathan Chen",
    role: "Senior College Strategist & STEM Advisory Lead",
    credentials: "M.S. in Computer Science, 10+ Years College Counseling",
    bio: "Jonathan guides aspiring engineers, computer scientists, and pre-med students to build compelling academic 'spikes,' navigate prestigious research labs, and win national STEM Olympiads.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    badge: "STEM & RESEARCH SPECIALIST",
  },
];

const SUCCESS_PRINCIPLES = [
  {
    step: "1",
    title: "Personal growth leads the way",
  },
  {
    step: "2",
    title: "Build life skills for now, college, and beyond.",
  },
  {
    step: "3",
    title: "Practice a culture of deep, open, nonjudgmental conversation and active integrated listening.",
  },
  {
    step: "4",
    title: "Where there is a teen, there are structured exercises leading to action plans tailor-made for them.",
  },
  {
    step: "5",
    title: "Driven by analytical thinking at every level of service.",
  },
  {
    step: "6",
    title: "Spirited by a growth mindset.",
  },
  {
    step: "7",
    title: "We believe in long-term relationships.",
  },
];

const CORE_VALUES = [
  {
    title: "Adaptability",
    description: "Fostering mental agility and resilience so students smoothly adapt, pivot, and excel through evolving college admissions criteria.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Ambition",
    description: "Inspiring students to aim high, discover their true academic capabilities, and craft reach-school portfolios with bold confidence.",
    icon: Target,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Authenticity",
    description: "Uncovering each student's genuine voice so admissions committees connect with the real person behind the grades and test scores.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Caring",
    description: "Providing warm, individualized mentorship that protects family harmony and supports students emotionally across high school.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Compassion",
    description: "Practicing integrated, nonjudgmental listening that honors every teen's unique background, personal story, and individual pace.",
    icon: Users2,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Results",
    description: "Delivering world-class admissions outcomes: 98% acceptance into top-choice colleges and over $14M in merit scholarships won.",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=800&auto=format&fit=crop",
  },
];

function BlueCircleCheck({ className = "w-5 h-5 flex-shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#0B63B5" />
      <path
        d="M6 10.2L8.7 12.8L14 7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* 1. Modern Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "About Us" }]}
        badge="OUR STORY &amp; PHILOSOPHY"
        title="Navigating Futures, Crafting Success Stories"
        description="16+ years of dedicated admissions consulting partnering with teens and families to make higher education admissions an empowering, transformative milestone."
      />

      {/* 2. Elevated Consultation Highlight Card */}
      <section className="relative mt-8 z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[6px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white p-6 sm:p-8 lg:p-10 shadow-[0_16px_44px_rgba(10,61,107,0.22)] border border-[#2072a7]/40 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#9ed5ff] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>SAVE TIME &bull; STRESS LESS &bull; ACHIEVE CONTINUOUSLY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-[30px] sm:leading-[38px] mb-2">
                Begin Your Journey With a Complimentary Consultation
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] font-sans">
                Schedule a 30-minute introductory strategy session to evaluate where your student stands and map an actionable roadmap toward selective college acceptances.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-[6px] border border-white/20">
              <div className="text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  Free 30-Min
                </span>
                <span className="block text-xs sm:text-[13px] text-[#bfe2fa] font-sans mt-0.5">
                  1-on-1 Strategic Discovery Session
                </span>
              </div>
              <Link
                href="/#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[5px] font-bold text-xs sm:text-[14px] font-heading bg-white text-brand-navy hover:bg-[#f0f7fe] transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 text-brand-navy" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Paving the Way for Personal & Academic Excellence */}
      <section className="py-14 sm:py-18 lg:py-22 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-18 items-center">
            {/* Left: Image with Petal Accent */}
            <div className="relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-white group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                  alt="Student focused on high school academics and college planning"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  HOLISTIC DEVELOPMENT
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                Paving the Way for Personal and Academic Excellence
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                At BlueStars, we believe higher education consulting should be transformative rather than transactional. Our personalized advising empowers high school students to build genuine self-reliance, academic vigor, and intellectual vitality.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Guided by our signature &ldquo;The Calm Way&rdquo; methodology, we help teens eliminate application panic while uncovering their singular passions, resulting in cohesive, standout admissions profiles.
              </p>

              <ul className="space-y-2.5 mb-8">
                {STRATEGIC_PILLARS.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-2.5">
                    <BlueCircleCheck className="w-4 h-4 flex-shrink-0 mt-1" />
                    <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                      {pillar}
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  <span>Learn More About Our Approach</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose BlueStars Admissions Consulting */}
      <section className="py-14 sm:py-18 lg:py-22 bg-[#f8fbfe] border-y border-[#e2eef9] relative overflow-hidden">
        {/* Ambient Organic Waves */}
        <div
          className="absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#e3f1fc]/80 via-[#edf6fd]/40 to-transparent rounded-bl-[220px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-18 items-center">
            {/* Left: Text & Stats */}
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  THE BLUESTARS DIFFERENCE
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                Why Choose BlueStars Admissions Consulting?
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                Founded in 2010 by Dr. Amy Morgenstern (&ldquo;Dr. M&rdquo;), BlueStars provides proactive, student-centered admissions mentoring. Unlike transactional agencies that churn out formulaic essays, we take a whole-student life-coaching approach that builds genuine leadership, executive function, and lasting academic confidence.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8">
                Our students do not just get admitted to their dream colleges—they arrive on campus equipped with the communication skills, intellectual stamina, and self-advocacy needed to thrive in university and career life.
              </p>

              {/* 4 Stats Cards Grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                {ACHIEVEMENTS_DATA.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 sm:p-5 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs hover:shadow-card transition-shadow"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading tracking-tight">
                      {item.value}
                    </div>
                    <div className="text-base sm:text-[17px] font-extrabold text-brand-navy font-heading mt-1 leading-snug">
                      {item.label}
                    </div>
                    <div className="text-[14px] sm:text-[14.5px] text-brand-text font-sans mt-0.5">
                      {item.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Modern Framed Image */}
            <div className="relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-white group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                  alt="High school student smiling with college admissions materials"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. We Work With Students All Over the World */}
      <section className="py-14 sm:py-18 lg:py-22 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-18 items-center">
            {/* Left: Global Crystal Earth / World Visual */}
            <div className="relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-slate-900 group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                  alt="Glowing world globe representing global admissions reach"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#073d63]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Global Reach Pill */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md border border-white/20 text-white shadow-sm">
                  <Globe2 className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-xs sm:text-[13px] font-bold font-heading">
                    Students Across 30+ US States &amp; 14+ Countries
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  NATIONWIDE &amp; INTERNATIONAL REACH
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                We Work With Students All Over the World
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                Headquartered in the San Francisco Bay Area, BlueStars partners with students across the United States as well as international families in Asia, Europe, and the Middle East.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Through interactive video counseling, shared Google Docs workspaces, and transparent parent milestone portals, distance is never a barrier to world-class admissions advising.
              </p>

              <div className="p-4 rounded-[6px] bg-[#f8fbfe] border border-[#e2eef9] mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <p className="text-[14px] sm:text-[15px] text-brand-navy font-medium font-sans leading-relaxed">
                    Whether you are attending a public high school in California, an East Coast boarding school, or an international baccalaureate academy abroad, our strategies adapt to your academic system.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  <span>Connect With Our Global Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Who We Are (Counselors Make All the Difference) - Centered & Fully Responsive */}
      <section className="relative py-14 sm:py-18 lg:py-22 bg-[#073d63] text-white overflow-hidden">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
            alt="University campus students and counselors"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#073d63] via-[#094c79]/95 to-[#0c5989]/90 z-0" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
            {/* Centered Glowing Pill Kicker */}
            <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-[#9ed5ff] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3.5 shadow-xs">
              <Users2 className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>EXPERIENCED COUNSELORS</span>
            </div>

            {/* Centered Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-white font-heading tracking-tight leading-[32px] sm:leading-[38px] md:leading-[42px] lg:!leading-[46px] mb-4 max-w-3xl mx-auto">
              Our College Counselors Make All the Difference. Combined, We Have Over 25 Years of Experience.
            </h2>

            {/* Centered Description */}
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] font-sans mb-8 mt-4 max-w-2xl mx-auto">
              At BlueStars Admissions Consulting, our team blends former university faculty insight, Ivy League academic backgrounds, and executive functioning coaching. We listen deeply to student aspirations, helping them find joy and confidence in the admissions journey.
            </p>

            {/* Centered 2-Column Responsive Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl w-full mx-auto mb-9 text-left mt-4">
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-[6px] bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-colors">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#38bdf8] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                  Former university faculty &amp; admissions readers
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-[6px] bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-colors">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#38bdf8] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                  Published authors &amp; MFA writing coaches
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-[6px] bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-colors">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#38bdf8] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                  Dedicated student mentors who listen deeply
                </span>
              </div>
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-[6px] bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-colors">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#38bdf8] flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                  Executive function &amp; resilience advisors
                </span>
              </div>
            </div>

            {/* Centered CTA Button */}
            <div className="flex justify-center w-full">
              <Link
                href="#team"
                className="inline-flex items-center justify-center sm:mt-4 gap-2 px-7 py-3.5 rounded-[5px] font-bold text-xs sm:text-[14px] font-heading bg-white text-brand-navy hover:bg-[#f0f7fe] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Meet Our Full Team Below</span>
                <ArrowRight className="w-4 h-4 text-brand-navy" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Meet Our Team */}
      <section id="team" className="py-14 sm:py-18 lg:py-22 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                LEADERSHIP &amp; STRATEGY
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-3">
              Meet Our Senior Advisory Team
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
              Dedicated mentors combining academic rigor, admissions reader insight, and compassionate coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-[6px] border border-[#e5f0fa] shadow-[0_10px_32px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_44px_rgba(10,61,107,0.12)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-[4px] bg-[#07466f]/90 backdrop-blur-md text-white text-[11px] font-bold font-heading border border-white/20">
                      {member.badge}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-1">
                      {member.name}
                    </h3>
                    <div className="text-xs sm:text-[13px] font-bold text-brand-blue font-heading mb-1.5">
                      {member.role}
                    </div>
                    <div className="text-xs text-brand-text/80 font-sans italic mb-3.5">
                      {member.credentials}
                    </div>
                    <p className="text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[25px] text-brand-text font-sans">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-[#edf4fb]">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-brand-blue hover:text-brand-navy transition-colors font-heading group-hover:translate-x-0.5"
                    >
                      <span>Book Consultation With Team</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Leading Hundreds of College-Bound Teens to Success (7 Core Principles) */}
      <section className="py-14 sm:py-18 lg:py-22 bg-gradient-to-b from-[#eaf6f0] via-[#f5fbf7] to-[#eef7f2] border-y border-[#d2ebdc] relative overflow-hidden">
        {/* Decorative Ambient Background Wave */}
        <div
          className="absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#2F9E5C]/10 via-transparent to-transparent rounded-bl-[220px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[380px] h-[300px] bg-gradient-to-tr from-[#0B63B5]/10 via-transparent to-transparent rounded-tr-[200px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered Section Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-[#2F9E5C] rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#2F9E5C] font-heading">
                OUR PHILOSOPHY &amp; APPROACH
              </span>
              <span className="w-6 h-[2px] bg-[#2F9E5C] rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-3">
              Leading Hundreds of College-Bound Teens to Success
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
              Our 7 developmental principles guiding students from self-awareness to lifelong collegiate achievement.
            </p>
          </div>

          {/* 7 Modern Principles in Clean Vertical Responsive Stack */}
          <div className="space-y-3 sm:space-y-3.5 max-w-3xl mx-auto">
            {SUCCESS_PRINCIPLES.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-[6px] border border-[#d6ecdf] hover:border-[#2F9E5C]/60 p-4 sm:p-5 shadow-[0_4px_16px_rgba(10,61,107,0.04)] hover:shadow-[0_8px_24px_rgba(47,158,92,0.12)] transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-4 sm:gap-5 group"
              >
                {/* Number Badge */}
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-[8px] bg-gradient-to-br from-[#0B63B5] to-[#0A3D6B] text-white font-extrabold text-sm sm:text-[15px] font-heading grid place-items-center shadow-xs flex-shrink-0 group-hover:from-[#2F9E5C] group-hover:to-[#1e7e44] transition-all">
                  {item.step}
                </div>

                {/* Principle Title */}
                <p className="text-[15px] sm:text-[16.5px] font-bold text-brand-navy font-heading leading-snug group-hover:text-brand-blue transition-colors flex-1">
                  {item.title}
                </p>

                {/* Checkmark Accent */}
                <CheckCircle2 className="w-5 h-5 text-[#2F9E5C] flex-shrink-0 ml-auto transition-transform group-hover:scale-110" />
              </div>
            ))}
          </div>

          {/* Centered Read More Action Link */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-[5px] text-xs sm:text-[14px] font-bold text-brand-blue bg-[#e4f1fc] hover:bg-brand-blue hover:text-white transition-all duration-200 font-heading shadow-xs hover:shadow-sm group"
            >
              <span>Read more about our philosophy and what each stage accomplishes</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Our Commitment to Your Teen and Your Family (6 Core Values) */}
      <section className="py-14 sm:py-18 lg:py-22 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                GUIDING PRINCIPLES
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-3">
              Our Commitment to Your Teen and Your Family
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
              Six foundational values shape every consultation, essay review, and strategic milestone at BlueStars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-[6px] border border-[#e5f0fa] shadow-[0_10px_32px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_44px_rgba(10,61,107,0.12)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={val.image}
                      alt={val.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#073d63]/85 via-black/30 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md border border-white/20 text-white shadow-sm">
                      <Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="text-xs sm:text-[13px] font-bold font-heading tracking-wide">
                        {val.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-[19px] sm:text-[20px] font-bold text-brand-navy font-heading mb-2">
                      {val.title}
                    </h3>
                    <p className="text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[25px] text-brand-text font-sans">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. The Blue Star Manifesto Banner */}
      <section className="py-14 sm:py-18 lg:py-20 bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white relative overflow-hidden">
        {/* Luminous Glowing Waves in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#0096c7]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-10 w-[500px] h-[320px] bg-[#00b4d8]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-[12%] w-24 h-24 text-[#38bdf8] opacity-25 blur-xs">
            <BrandStar className="w-full h-full fill-current" />
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
              <span>THE BLUE STAR MANIFESTO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-extrabold text-white font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[46px] mb-2">
              More than just our business name,
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-[28px] font-extrabold text-[#79c3f7] font-heading tracking-tight leading-[1.25] mb-6">
              it&apos;s our guiding star. No star shines as bright as THE BLUE STAR.
            </h3>

            <p className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] text-[#d4e8f8] font-sans mb-4">
              In astronomy, blue stars burn the hottest, shine the brightest, and illuminate the farthest corners of space. In our counseling practice, we believe every student possesses a distinct, powerful spark.
            </p>

            <p className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] text-[#d4e8f8] font-sans mb-8">
              Our mission is to help teens uncover, ignite, and project that spark into the world—creating college applications that burn brightly in selective admissions pools, and personal confidence that lasts a lifetime.
            </p>

            <div className="inline-block p-4 rounded-[6px] bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="block text-base sm:text-[17px] font-bold text-[#bfe2fa] tracking-wider uppercase font-heading">
                &mdash; DR. AMY MORGENSTERN, PH.D.
              </span>
              <span className="block text-[14px] sm:text-[14.5px] text-[#9ed5ff] font-sans mt-0.5">
                Founder &amp; Lead Strategist, BlueStars Admissions Consulting
              </span>
            </div>

            <div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-[5px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Begin Your BlueStars Journey</span>
                <ArrowRight className="w-4 h-4 text-[#0A3D6B]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Modern Elevated Final CTA Banner */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4">
          <div className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            {/* Luminous Glow Waves */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>READY TO GET STARTED?</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Make College Admissions Less Stressful and More Successful
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule your complimentary 30-minute introductory consultation to map your student&apos;s personalized admissions roadmap.
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-[13.5px] text-[#bfe2fa] font-medium font-sans">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>Free 30-Min Discovery</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3bd386] flex-shrink-0" />
                    <span>Whole-Student Mentorship</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>No Obligation</span>
                  </span>
                </div>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[5px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#0A3D6B] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Student Cutout & Glowing Brand Stars */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-full min-h-[250px] lg:min-h-[300px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
                <div
                  className="absolute right-[12%] top-[18%] w-[260px] h-[260px] bg-[#229ae3]/25 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                <div
                  className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                <div
                  className="absolute right-[3%] sm:right-[5%] lg:right-[1%] top-[8%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[136px] lg:h-[136px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[335px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0">
                  <Image
                    src="/images/sub_images/ready_to_take.png"
                    alt="Student smiling with phone and backpack, ready for college success"
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                    className="object-contain object-bottom select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
