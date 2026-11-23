import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Award,
  Globe2,
  Sparkles,
  Users2,
  GraduationCap,
  Heart,
  Lightbulb,
  Compass,
  Flag,
  Flower2,
  Laptop,
  Layers,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  ExternalLink,
} from "lucide-react";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutBoutique } from "@/components/sections/AboutBoutique";
import { BrandStar } from "@/components/ui/Icons";
import { Constellation } from "@/components/ui/Constellation";
import { DifferencePanel } from "@/components/ui/DifferencePanel";
import { TeamMembersGrid } from "@/components/sections/TeamMembersGrid";
import { TEAM_MEMBERS } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "About Us & Expert College Counselors",
  description:
    "Learn about Blue Stars Admissions Consulting, founded by Dr. Amy Morgenstern. Discover our 16+ years of student success, whole-student philosophy, and senior counseling team.",
  alternates: {
    canonical: "https://bluestars.us/about",
  },
  openGraph: {
    title: "About Us & Expert College Counselors | Blue Stars",
    description:
      "Learn about Blue Stars Admissions Consulting, founded by Dr. Amy Morgenstern. Discover our 16+ years of student success, whole-student philosophy, and senior counseling team.",
    url: "https://bluestars.us/about",
    images: [
      {
        url: "/images/teams/Dr_Amy_Morgenstern.png",
        width: 1200,
        height: 630,
        alt: "Dr. Amy Morgenstern - Blue Stars Admissions Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us & Expert College Counselors | Blue Stars",
    description:
      "Learn about Blue Stars Admissions Consulting, founded by Dr. Amy Morgenstern. Discover our 16+ years of student success, whole-student philosophy, and senior counseling team.",
    images: ["/images/teams/Dr_Amy_Morgenstern.png"],
  },
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
  {
    value: "16+",
    label: "Years of Student Success",
    subtext: "Guiding families since 2010",
    icon: CalendarCheck,
  },
  {
    value: "100%",
    label: "Personalized Support",
    subtext: "The Calm Way to college success",
    icon: Users2,
  },
  {
    value: "Top 20",
    label: "Elite & UC Admissions",
    subtext: "Stanford, Ivy League & premier UCs",
    icon: Trophy,
  },
  {
    value: "1-on-1",
    label: "Dedicated Mentorship",
    subtext: "Tailored to every student's spike",
    icon: GraduationCap,
  },
];

const WHY_US_PILLARS = [
  {
    icon: Target,
    title: "1. Strategizing with Expert Guidance",
    description:
      "A proactive, multi-year roadmap tailored to your teen's authentic strengths, coursework rigor, testing timeline, and high-impact extracurricular spikes.",
  },
  {
    icon: GraduationCap,
    title: "2. Balanced School List Architecture",
    description:
      "Curating strategic reach, target, and likely institutions where your student will truly thrive academically, intellectually, and personally.",
  },
  {
    icon: Sparkles,
    title: "3. Standout Essay Development",
    description:
      "Guiding students through thoughtful Socratic inquiry to uncover their authentic voice and craft the most compelling, beautifully written personal statements of their lives.",
  },
];

const PROFESSIONAL_ACCREDITATIONS = [
  {
    name: "HECA",
    fullName: "Higher Education Consultants Association",
    description:
      "Dedicated to advancing high professional standards, ethical counseling practices, and student advocacy in independent college admissions consulting.",
    image: "/images/badges/heca-v2.webp",
    tag: "Verified Member",
  },
  {
    name: "WACAC",
    fullName: "Western Association for College Admission Counseling",
    description:
      "Regional affiliate of the National Association for College Admission Counseling (NACAC), upholding student-centered ethics across California, Nevada, and the West.",
    image: "/images/badges/wacac-v2.webp",
    tag: "Professional Member",
  },
  {
    name: "IECA",
    fullName: "Independent Educational Consultants Association",
    description:
      "The nation's premier professional association of experienced, vetted educational consultants committed to excellence, integrity, and whole-student mentorship.",
    image: "/images/badges/ieca-v2.webp",
    tag: "Professional Member",
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
    title:
      "Practice a culture of deep, open, nonjudgmental conversation and active integrated listening.",
  },
  {
    step: "4",
    title:
      "Where there is a teen, there are structured exercises leading to action plans tailor-made for them.",
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
    description:
      "Fostering mental agility and resilience so students smoothly adapt, pivot, and excel through evolving college admissions criteria.",
    icon: Compass,
    image: "/images/abouts/values/adaptability-v2.webp",
  },
  {
    title: "Ambition",
    description:
      "Inspiring students to aim high, discover their true academic capabilities, and craft reach-school portfolios with bold confidence.",
    icon: Target,
    image: "/images/abouts/values/ambition.webp",
  },
  {
    title: "Authenticity",
    description:
      "Uncovering each student's genuine voice so admissions committees connect with the real person behind the grades and test scores.",
    icon: ShieldCheck,
    image: "/images/abouts/values/authenticity.webp",
  },
  {
    title: "Caring",
    description:
      "Providing warm, individualized mentorship that protects family harmony and supports students emotionally across high school.",
    icon: Heart,
    image: "/images/abouts/values/caring.webp",
  },
  {
    title: "Compassion",
    description:
      "Practicing integrated, nonjudgmental listening that honors every teen's unique background, personal story, and individual pace.",
    icon: Users2,
    image: "/images/abouts/values/compassion.webp",
  },
  {
    title: "Results",
    description:
      "Delivering world-class admissions outcomes with personalized, holistic mentorship guiding students to top-choice universities nationwide.",
    icon: Trophy,
    image: "/images/abouts/values/results.webp",
  },
];

function BarsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="4" y="11" width="4" height="9" rx="1" />
      <rect x="10" y="4" width="4" height="16" rx="1" />
      <rect x="16" y="8" width="4" height="12" rx="1" />
    </svg>
  );
}

/** One icon per STRATEGIC_PILLARS entry, same order. */
const PILLAR_ICONS = [GraduationCap, Flag, BookOpen, BarsGlyph, Layers, Flower2];

const TEAM_HIGHLIGHTS = [
  { icon: GraduationCap, label: "Admissions Expertise" },
  { icon: Users2, label: "Personalized Mentorship" },
  { icon: BarsGlyph, label: "Proven Student Outcomes" },
];

/** Reach highlights shown on the photo card. Wording follows the approved design: confirm both claims are accurate. */
const REACH_BADGE = "Students Across 5+ Continents";
const REACH_STATS = [
  { icon: Users2, line1: "U.S. Students", line2: "(All 50 States)" },
  { icon: Globe2, line1: "International", line2: "Students" },
  { icon: Laptop, line1: "Remote & Online", line2: "Counseling" },
];

/** Extra display data for PROFESSIONAL_ACCREDITATIONS, matched by index. */
const ACCREDITATION_EXTRAS = [
  { statusIcon: ShieldCheck, highlightIcon: Award, highlight: "Ethical Standards & Student Advocacy" },
  { statusIcon: Users2, highlightIcon: Users2, highlight: "Regional Expertise & Professional Collaboration" },
  { statusIcon: Star, highlightIcon: Layers, highlight: "Excellence, Integrity & Holistic Mentorship" },
];

const COUNSELOR_HIGHLIGHTS = [
  { icon: GraduationCap, text: "Former university faculty & admissions advisors" },
  { icon: BookOpen, text: "Published authors & MFA writing coaches" },
  { icon: Users2, text: "Dedicated student mentors who listen deeply" },
  { icon: BarsGlyph, text: "Executive function & resilience advisors" },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* 1. Hero + consultation card */}
      <AboutHero />

      {/* 2b. Boutique story: founder's note, boutique vs. large agency, family voices */}
      <AboutBoutique />

      {/* 3. Paving the Way for Personal & Academic Excellence */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-14">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-[#f3eee5]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 160V90C200 40 420 60 640 100C860 140 1100 140 1440 70V160Z" opacity="0.75" />
          <path d="M0 160V120C260 90 520 120 760 140C1000 160 1240 130 1440 100V160Z" opacity="0.9" />
        </svg>

        <div className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-16 lg:px-8">
          {/* Left: tilted photo card with a floating note */}
          <div className="relative mx-auto w-full max-w-[640px] pb-24 sm:pb-28">
            <div
              className="pointer-events-none absolute -top-8 left-[22%] h-[40%] w-[55%] rounded-[50%] bg-gradient-to-br from-[#6cb7f4] to-[#2f86e0]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-2 -right-4 h-[58%] w-[44%] rounded-[50%] bg-gradient-to-br from-[#7ebff5] to-[#3a8fe3] opacity-90"
              aria-hidden="true"
            />

            <div className="group relative -rotate-[3deg] overflow-hidden rounded-[36px] border-[5px] border-white shadow-[0_1px_3px_rgba(18,48,90,0.05)]">
              <div className="relative aspect-[1/1.02] w-full">
                <Image
                  src="/images/abouts/paving-way.webp"
                  alt="A student looks toward a university building, beside signposts reading Self-Reliance, Academic Vigor, Intellectual Vitality and The Calm Way"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="absolute -bottom-0 left-[16%] w-[72%] max-w-[420px] rounded-[22px] border border-sky-200 bg-white/95 p-5 shadow-[0_1px_3px_rgba(18,48,90,0.05)] backdrop-blur-sm sm:left-[22%] sm:p-6">
              <p className="mb-1.5 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
                <BrandStar className="h-4 w-4" aria-hidden="true" />
                Our signature method
              </p>
              <p className="font-display text-[30px] leading-none text-brand-ink sm:text-[34px]">The Calm Way</p>
              <p className="mt-2.5 text-[14.5px] leading-[1.5] text-[#4a5568]">
                Less application panic, more clarity about who your student really is.
              </p>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-col justify-center">
            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#f3eee5] px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#0b63b5]">
              <BrandStar className="h-3.5 w-3.5" aria-hidden="true" />
              Our approach
            </p>

            <h2 className="mb-6 text-[32px] leading-[1.1] text-brand-ink sm:text-[44px] lg:text-[clamp(36px,5.6vh,52px)]">
              Paving the Way for Personal and{" "}
              <span className="relative inline-block text-brand-blue">
                Academic Excellence
              </span>
            </h2>

            <p className="mb-4 mt-2 text-[17px] leading-[1.65] text-[#1f2d44] sm:text-[18px] lg:text-[clamp(16px,2.1vh,19px)]">
              At Blue Stars, we believe higher education consulting should be transformative rather than
              transactional. Our personalized advising empowers high school students to build genuine
              self-reliance, academic vigor, and intellectual vitality.
            </p>

            <p className="mb-7 text-[15.5px] leading-[1.7] text-[#4a5568] lg:text-[clamp(14.5px,1.9vh,16.5px)]">
              Guided by our signature{" "}
              <strong className="font-semibold text-brand-blue">&ldquo;The Calm Way&rdquo;</strong> methodology, we
              help teens eliminate application panic while uncovering their singular passions, resulting in cohesive,
              standout admissions profiles.
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {STRATEGIC_PILLARS.map((pillar, i) => {
                const PillarIcon = PILLAR_ICONS[i % PILLAR_ICONS.length];
                return (
                  <li
                    key={pillar}
                    className="flex items-center gap-4 rounded-[18px] bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5]"
                  >
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-[#f3eee5] text-brand-blue">
                      <PillarIcon className="h-[22px] w-[22px]" />
                    </span>
                    <span className="text-[14.5px] font-semibold leading-snug text-brand-ink">{pillar}</span>
                  </li>
                );
              })}
            </ul>

            <div>
              <Link
                href="/services"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-ink px-6 py-4 text-center sm:inline-flex sm:w-auto sm:px-8 text-[15px] font-semibold tracking-wide text-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <span>Learn More About Our Approach</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Blue Stars Admissions Consulting */}
      <section
        id="why-us"
        className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 lg:py-24 bg-white border-y border-[#e9e3d8] relative overflow-hidden"
      >
        {/* Ambient Organic Waves */}

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-18 items-center">
            {/* Left: Text & Stats */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#f3eee5] px-4 py-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-[#0b63b5] font-sans mb-5">
                <BrandStar className="h-3.5 w-3.5" aria-hidden="true" />
                The Blue Stars Difference
              </p>

              <h2 className="relative text-[32px] sm:text-[44px] leading-[1.08] text-brand-ink mb-6">
                Why Choose Blue Stars
                <span className="block text-brand-blue">Admissions Consulting?</span>
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                The college-planning and application process is a deeply
                personal journey with long-lasting impact. Founded in 2010 by
                Dr. Amy Morgenstern (&ldquo;Dr. M&rdquo;), Blue Stars provides
                proactive, comprehensive college admissions guidance customized
                to the individual goals of each teen and family.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8">
                We’re not your ordinary admissions consulting service: we focus
                on enhancing your teen’s natural abilities while guiding their
                intellectual development. Our high-performance program
                integrates academic mentorship, community engagement, and
                personal development with experienced writers, editors,
                educators, and life coaches.
              </p>

              {/* 4 Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS_DATA.map((item) => {
                  const StatIcon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 rounded-[18px] bg-white border border-[#e9e3d8] p-5 shadow-[0_1px_3px_rgba(18,48,90,0.05)] transition-shadow hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)]"
                    >
                      <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-[14px] bg-[#f3eee5] text-brand-blue">
                        <StatIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="whitespace-nowrap font-display text-[32px] sm:text-[38px] leading-none text-brand-blue">
                          {item.value}
                        </div>
                        <div className="mt-1.5 text-[15px] font-semibold text-brand-ink font-heading leading-snug">
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-[13.5px] leading-snug text-[#5b6472] font-sans">{item.subtext}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Modern Framed Image */}
            <DifferencePanel />
          </div>

          {/* 3 Core Pillars: stars joined by a constellation line */}
          <div className="mt-16 border-t border-[#e9e3d8] pt-12 sm:mt-20 sm:pt-14">
            <div className="mb-12 grid gap-4 sm:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-14">
              <div>
                <p className="mb-4 inline-flex items-center gap-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  <span className="h-0.5 w-8 bg-brand-ink" aria-hidden="true" />
                  Our 3 core pillars
                </p>
                <h3 className="text-[28px] leading-[1.12] text-brand-ink sm:text-[38px]">
                  How We Guide Your Teen to <span className="text-brand-blue">Admissions Success</span>
                </h3>
              </div>
              <p className="max-w-[520px] font-sans text-[15.5px] leading-[1.7] text-[#4a5568]">
                A structured, whole-student approach ensuring every facet of your teen&apos;s application reflects
                authentic intellectual excellence.
              </p>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-0 hidden border-t-2 border-dashed border-brand-blue/35 md:block"
                aria-hidden="true"
              />

              <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
                {WHY_US_PILLARS.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <li
                      key={pillar.title}
                      className="group relative rounded-[24px] bg-white p-7 pt-11 shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)] sm:p-8 sm:pt-12"
                    >
                      <span className="absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white text-brand-blue shadow-sm ring-1 ring-[#f3eee5]">
                        <BrandStar className="h-4 w-4" aria-hidden="true" />
                      </span>

                      <span
                        className="absolute right-6 top-6 font-display text-[56px] leading-none text-brand-blue/15 transition-colors duration-300 group-hover:text-brand-blue/30"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="mb-5 grid h-14 w-14 place-items-center rounded-[16px] bg-[#f3eee5] text-brand-blue">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>

                      <h4 className="mb-3 font-display text-[22px] !font-medium leading-snug text-brand-ink sm:text-[24px]">
                        {pillar.title.replace(/^\d+\.\s*/, "")}
                      </h4>
                      <p className="font-sans text-[15px] leading-[1.7] text-[#4a5568]">{pillar.description}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 5. We Work With Students All Over the World */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-14">
        {/* Faint dotted "map" texture and waves (decorative) */}
        <div
          className="pointer-events-none absolute -right-10 top-8 hidden h-64 w-[34rem] opacity-30 lg:block"
          style={{
            backgroundImage: "radial-gradient(circle, #7ea6cf 1.3px, transparent 1.6px)",
            backgroundSize: "9px 9px",
            WebkitMaskImage: "radial-gradient(ellipse at 60% 45%, #000 20%, transparent 68%)",
            maskImage: "radial-gradient(ellipse at 60% 45%, #000 20%, transparent 68%)",
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-[#bcd9f6]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 200V150C160 120 300 150 420 175C520 195 560 200 600 200Z" opacity="0.5" />
          <path d="M700 200C900 190 1120 120 1440 60V200Z" opacity="0.85" />
        </svg>

        <div className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] lg:gap-14 lg:px-8">
          {/* Left: tilted photo card with floating badge and stat bar */}
          <div className="relative mx-auto w-full max-w-[760px] pb-14 pt-6">
            <div className="relative">
              <div className="overflow-hidden rounded-[38px] border-[4px] border-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] [transform:skewX(-5deg)_skewY(-3deg)]">
                <div className="relative aspect-[1.22/1] w-full [transform:skewY(3deg)_skewX(5deg)] scale-[1.18]">
                  <Image
                    src="/images/abouts/global-reach.webp"
                    alt="A student on a video call with a Blue Stars counselor, with a glowing globe connecting the Bay Area, New York, Europe, the Middle East and Asia"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 760px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="absolute -top-5 left-[2%] flex items-center gap-3 rounded-[20px] border border-sky-300/40 bg-[#0b2f5c]/95 px-4 py-3 shadow-[0_14px_34px_rgba(6,38,74,0.35)] backdrop-blur-md sm:px-5">
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-white/10 text-sky-200 ring-1 ring-white/15">
                  <Globe2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="max-w-[10.5rem] text-[14.5px] font-semibold leading-snug text-white">{REACH_BADGE}</span>
              </div>
            </div>

            <ul className="absolute bottom-0 left-[6%] right-[4%] flex items-center justify-between gap-2 rounded-[22px] border border-white/60 bg-[#0e3563]/95 px-3 py-3 shadow-[0_18px_44px_rgba(6,38,74,0.4)] backdrop-blur-md sm:gap-3 sm:px-5">
              {REACH_STATS.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <li
                    key={stat.line1}
                    className={
                      i > 0
                        ? "flex items-center gap-2.5 border-l border-white/20 pl-2 sm:gap-3 sm:pl-4"
                        : "flex items-center gap-2.5 sm:gap-3"
                    }
                  >
                    <span className="hidden h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-white/10 text-sky-200 ring-1 ring-white/15 sm:grid">
                      <StatIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-[12px] font-medium leading-snug text-white sm:text-[13.5px]">
                      {stat.line1}
                      <br />
                      {stat.line2}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: content */}
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-4 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              <span className="h-0.5 w-10 bg-brand-ink" aria-hidden="true" />
              Nationwide &amp; international reach
            </p>

            <h2 className="mb-7 text-[32px] leading-[1.1] text-brand-ink sm:text-[46px] lg:text-[clamp(36px,5.8vh,56px)]">
              We Work With Students
              <span className="block">
                All Over{" "}
                <span className="relative inline-block italic text-brand-blue">
                  the World
                </span>
              </span>
            </h2>

            <p className="mb-4 mt-2 text-[16px] leading-[1.7] text-[#1f2d44] lg:text-[clamp(15px,2vh,18px)]">
              Headquartered in the San Francisco Bay Area, Blue Stars partners with families across the United
              States&mdash;from California to New York&mdash;as well as international students across Europe, Asia
              (Shanghai, Chengdu, Tokyo), and the Middle East.
            </p>

            <p className="mb-7 text-[16px] leading-[1.7] text-[#1f2d44] lg:text-[clamp(15px,2vh,18px)]">
              We are proven experts at remote and online education. Through interactive 1-on-1 video counseling,
              shared digital workspaces, and proactive milestone tracking, distance is never an obstacle to
              transformative, personalized admissions mentoring.
            </p>

            <div className="mb-8 flex items-center gap-5 rounded-[20px] bg-[#f3eee5]/80 p-5 ring-1 ring-[#f3eee5] sm:gap-6 sm:p-6">
              <GraduationCap className="h-11 w-11 flex-shrink-0 text-brand-ink" aria-hidden="true" />
              <span className="hidden h-14 w-px bg-brand-ink/30 sm:block" aria-hidden="true" />
              <p className="text-[15px] font-medium leading-[1.65] text-brand-ink sm:text-[16px]">
                Whether you are attending a public high school in California, an East Coast boarding school, or an
                international baccalaureate academy abroad, our strategies adapt to your academic system.
              </p>
            </div>

            <div>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-ink px-6 py-4 text-center sm:inline-flex sm:w-auto sm:px-8 text-[15px] font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(7,29,61,0.35)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <span>Connect With Our Global Team</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Who We Are (Counselors Make All the Difference) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafcff] to-[#faf7f2] pb-32 pt-16 sm:pt-20 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:pb-40 lg:pt-14">
        <div className="pointer-events-none absolute -left-40 -top-24 h-80 w-[34rem] rounded-full bg-[#f3eee5]/80" aria-hidden="true" />

        {/* Blue waves at the bottom (no gold accents) */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full lg:h-40"
          aria-hidden="true"
        >
          <path d="M0 220V120C220 80 420 60 640 100C900 150 1150 150 1440 70V220Z" fill="#b9d6f5" opacity="0.7" />
          <path d="M0 220V160C260 120 520 150 760 185C1000 215 1240 190 1440 130V220Z" fill="#1d5fb4" />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="hidden h-px w-24 bg-brand-blue/40 sm:block" aria-hidden="true" />
              <p className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/60 bg-white px-5 py-2.5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-brand-ink">
                <Users2 className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                Experienced counselors
              </p>
              <span className="hidden h-px w-24 bg-brand-blue/40 sm:block" aria-hidden="true" />
            </div>

            <h2 className="mb-6 text-[32px] leading-[1.08] text-brand-ink sm:text-[48px] lg:text-[clamp(36px,6.4vh,60px)]">
              Our College Counselors Make All the{" "}
              <span className="relative inline-block italic text-brand-blue">
                Difference
              </span>
            </h2>

            <p className="mb-9 mt-3 max-w-3xl font-sans text-[16px] leading-[1.7] text-[#344155] lg:text-[clamp(15px,2.1vh,19px)]">
              At Blue Stars Admissions Consulting, our team blends former university faculty insight, Ivy League
              academic backgrounds, and executive functioning coaching. We listen deeply to student aspirations,
              helping them find joy and confidence in the admissions journey.
            </p>
          </div>

          <ul className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {COUNSELOR_HIGHLIGHTS.map((item) => {
              const HighlightIcon = item.icon;
              return (
                <li
                  key={item.text}
                  className="relative flex items-center gap-4 rounded-[18px] bg-white px-5 py-6 shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5] transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-[16px] bg-[#f3eee5] text-brand-blue">
                    <HighlightIcon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="font-sans text-[16px] font-semibold leading-snug text-brand-ink">{item.text}</span>
                  <span
                    className="absolute bottom-0 left-1/2 h-1 w-[34%] -translate-x-1/2 rounded-t-full bg-brand-ink"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>

          <div className="flex justify-center">
            <Link
              href="#team"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-brand-ink px-6 py-4 text-center sm:inline-flex sm:w-auto sm:px-9 text-[16px] font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(7,29,61,0.35)] transition-transform duration-200 hover:scale-[1.02]"
            >
              <span>Meet Our Full Team Below</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Meet Our Team */}
      <section
        id="team"
        className="relative overflow-hidden bg-white py-14 sm:py-18 lg:py-20"
      >
        <div className="pointer-events-none absolute -left-44 -top-10 h-[28rem] w-[28rem] rounded-full bg-white/60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-48 top-48 h-[30rem] w-[30rem] rounded-full bg-[#f3eee5]/45" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center sm:mb-10">
            <p className="mb-3 flex items-center gap-4 font-sans text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[#0b4f94]">
              <span className="h-0.5 w-9 bg-[#0b4f94]" aria-hidden="true" />
              Leadership &amp; strategy
              <span className="h-0.5 w-9 bg-[#0b4f94]" aria-hidden="true" />
            </p>

            <h2 className="mb-4 text-[32px] leading-[1.1] text-brand-ink sm:text-[46px]">
              Meet Our <span className="text-brand-blue">Senior Advisory Team</span>
            </h2>

            <p className="font-sans text-[15.5px] leading-[1.6] text-[#344155] sm:text-[17px]">
              Dedicated mentors combining academic rigor, university admissions insight, and compassionate coaching.
            </p>
          </div>

          <ul className="mx-auto mb-10 flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-5">
            {TEAM_HIGHLIGHTS.map((item) => {
              const HighlightIcon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5]"
                >
                  <HighlightIcon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                  <span className="font-sans text-[14.5px] font-semibold text-brand-ink">{item.label}</span>
                </li>
              );
            })}
          </ul>

          <TeamMembersGrid members={TEAM_MEMBERS} />
        </div>
      </section>

      {/* 7b. Professional Accreditations & Affiliations (HECA / WACAC / IECA Badges) */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-18 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-14">
        <div className="pointer-events-none absolute -left-40 -top-24 h-[24rem] w-[24rem] rounded-full bg-white/70" aria-hidden="true" />
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-[#f3eee5]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 120V80C140 100 320 110 480 120Z" opacity="0.8" />
          <path d="M1000 120C1200 100 1340 70 1440 60V120Z" opacity="0.8" />
        </svg>

        <div className="relative mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto mb-10 max-w-5xl text-center sm:mb-12">

            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="hidden h-0.5 w-16 bg-brand-blue/70 sm:block" aria-hidden="true" />
              <p className="inline-flex items-center gap-2.5 rounded-full bg-[#f3eee5] px-5 py-2.5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#0b4f94] shadow-sm">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Ethics &amp; professional standards
              </p>
              <span className="hidden h-0.5 w-16 bg-brand-blue/70 sm:block" aria-hidden="true" />
            </div>

            <h2 className="mb-3 text-[30px] leading-[1.1] text-brand-ink sm:text-[44px] lg:text-[clamp(32px,5.2vh,50px)]">
              <span className="sm:whitespace-nowrap">Professional Accreditations</span>{" "}
              <span className="text-brand-blue sm:whitespace-nowrap">&amp; Affiliations</span>
            </h2>
            <p className="mx-auto max-w-[560px] font-sans text-[15.5px] leading-[1.6] text-[#344155] sm:text-[17px]">
              Blue Stars adheres to the ethical codes and standards of the nation&apos;s foremost admissions
              associations.
            </p>
            <span className="mx-auto mt-5 block h-1 w-20 rounded-full bg-brand-ink" aria-hidden="true" />
          </div>

          <ul className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-8">
            {PROFESSIONAL_ACCREDITATIONS.map((badge, i) => {
              const extra = ACCREDITATION_EXTRAS[i % ACCREDITATION_EXTRAS.length];
              const StatusIcon = extra.statusIcon;
              const HighlightIcon = extra.highlightIcon;
              return (
                <li
                  key={badge.name}
                  className="group flex flex-col overflow-hidden rounded-[32px] border-b-[5px] border-b-[#1b5fb8] bg-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5] transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Logo on a soft wave */}
                  <div className="relative flex h-44 items-center justify-center px-6 pt-5">
                    <Image
                      src={badge.image}
                      alt={`${badge.name} - ${badge.fullName}`}
                      width={260}
                      height={110}
                      className="relative z-10 max-h-[8.5rem] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col items-center px-6 pb-5 text-center sm:px-7">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1b5fb8] px-5 py-2 font-sans text-[11.5px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(27,95,184,0.35)]">
                      <StatusIcon className="h-4 w-4" aria-hidden="true" />
                      {badge.tag}
                    </span>

                    <h3 className="mt-4 font-display text-[24px] leading-[1.15] !font-semibold text-brand-ink sm:text-[26px]">
                      {badge.fullName}
                    </h3>

                    <p className="mt-3 flex items-center gap-3 font-sans text-[14px] font-bold tracking-[0.2em] text-brand-blue">
                      <span className="h-px w-8 bg-brand-blue/50" aria-hidden="true" />
                      {badge.name}
                      <span className="h-px w-8 bg-brand-blue/50" aria-hidden="true" />
                    </p>

                    <p className="mt-3 font-sans text-[15px] leading-[1.6] text-[#344155]">{badge.description}</p>

                    <div className="mt-auto flex w-full items-center gap-4 border-t border-[#e9e3d8] pt-4 text-left">
                      <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[14px] bg-[#f3eee5] text-brand-blue">
                        <HighlightIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-[14.5px] font-bold leading-snug text-brand-ink">
                        {extra.highlight}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 8. Leading Hundreds of College-Bound Teens to Success (7 Core Principles) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#fafcff] to-[#faf7f2] py-16 sm:py-20 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-14">
        <div className="pointer-events-none absolute -left-32 -top-24 h-72 w-96 rounded-full bg-[#f3eee5]/70" aria-hidden="true" />
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-[#f3eee5]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 140V90C160 70 340 90 520 140Z" opacity="0.6" />
          <path d="M900 140C1100 120 1300 80 1440 50V140Z" opacity="0.8" />
        </svg>

        <div className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_1px_minmax(0,1.25fr)] lg:gap-12 lg:px-8">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-4 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              <span className="h-0.5 w-12 bg-brand-ink" aria-hidden="true" />
              Our philosophy &amp; approach
            </p>

            <h2 className="mb-6 text-[32px] leading-[1.08] text-brand-ink sm:text-[46px] lg:text-[clamp(36px,6vh,58px)]">
              Leading Hundreds of College-Bound Teens to{" "}
              <span className="relative inline-block italic text-brand-blue">
                Success
              </span>
            </h2>

            <p className="mb-8 mt-3 max-w-[470px] font-sans text-[16px] leading-[1.7] text-[#4a5568] lg:text-[clamp(15px,2.1vh,19px)]">
              Our 7 developmental principles guide students from self-awareness to lifelong collegiate achievement.
            </p>

            <div>
              <Link
                href="/#contact"
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-ink px-6 py-4 text-center sm:inline-flex sm:w-auto sm:px-8 text-[15px] font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(7,29,61,0.35)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <span>Read More About Our Philosophy</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden bg-[#f3eee5] lg:block" aria-hidden="true" />

          {/* Principles */}
          <ol className="flex flex-col justify-center gap-3.5 sm:gap-4">
            {SUCCESS_PRINCIPLES.map((item) => (
              <li
                key={item.step}
                className="group flex items-center gap-4 rounded-[34px] bg-white/85 px-4 py-3.5 shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)] sm:gap-5 sm:px-5 sm:py-4"
              >
                <span className="grid h-[3.8rem] w-[3.8rem] flex-shrink-0 place-items-center rounded-[18px] bg-[#f3eee5] font-sans text-[26px] font-bold text-brand-blue sm:h-[4.4rem] sm:w-[4.4rem] sm:text-[30px]">
                  {String(item.step).padStart(2, "0")}
                </span>
                <span className="h-11 w-px flex-shrink-0 bg-[#f3eee5]" aria-hidden="true" />
                <p className="font-display text-[18px] leading-[1.3] text-brand-ink sm:text-[21px]">
                  {item.title.endsWith(".") ? item.title : `${item.title}.`}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Our Commitment to Your Teen and Your Family (6 Core Values) */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-40 -top-24 h-[26rem] w-[26rem] rounded-full bg-[#f3eee5]/70" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-44 bottom-10 h-[24rem] w-[24rem] rounded-full bg-white/80" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-14">
            <p className="mb-4 flex items-center gap-4 font-sans text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[#0b4f94]">
              <span className="h-0.5 w-9 bg-[#0b4f94]" aria-hidden="true" />
              Guiding principles
              <span className="h-0.5 w-9 bg-[#0b4f94]" aria-hidden="true" />
            </p>

            <h2 className="mb-4 text-[30px] leading-[1.1] text-brand-ink sm:text-[44px]">
              Our Commitment to Your Teen and{" "}
              <span className="italic text-brand-blue">Your Family</span>
            </h2>

            <p className="font-sans text-[15.5px] leading-[1.65] text-[#344155] sm:text-[17px]">
              Six foundational values shape every consultation, essay review, and strategic milestone at Blue Stars.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <li
                  key={val.title}
                  className="group relative flex flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] ring-1 ring-[#f3eee5] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {"image" in val && val.image ? (
                      <Image
                        src={val.image}
                        alt={`${val.title}: illustration`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2f5c] via-[#14509a] to-[#3a8fe3]" />
                        <div className="absolute inset-0 text-white opacity-90">
                          <Constellation variant={idx} />
                        </div>
                      </>
                    )}

                    <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-brand-blue shadow-md">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span
                      className="absolute right-5 top-3 font-display text-[40px] leading-none text-white/60"
                      aria-hidden="true"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-7 pb-8 pt-6">
                    <h3 className="mb-3 font-display text-[24px] leading-snug !font-medium text-brand-ink sm:text-[26px]">
                      {val.title}
                    </h3>
                    <p className="font-sans text-[15.5px] leading-[1.7] text-[#344155]">{val.description}</p>
                  </div>

                  <span
                    className="absolute bottom-0 left-7 h-1 w-14 rounded-t-full bg-brand-ink transition-all duration-300 group-hover:w-24"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 10. The Blue Star Manifesto Banner */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-ink text-white relative overflow-hidden">
        {/* Luminous Glowing Waves in Background */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          aria-hidden="true"
        >
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-mint text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-4 shadow-xs">
              <span
                className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse"
                aria-hidden="true"
              />
              <span>THE BLUE STAR MANIFESTO</span>
            </div>

            <h2 className="text-[32px] sm:text-[46px] leading-[1.08] text-white mb-3">
              More than just our business name,
            </h2>
            <h3 className="font-display italic text-[22px] sm:text-[28px] !font-normal !text-brand-mint leading-[1.3] mb-8">
              it&apos;s our guiding star. No star shines as bright as THE BLUE
              STAR.
            </h3>

            <p className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] text-[#f3eee5] font-sans mb-4">
              In astronomy, blue stars burn the hottest, shine the brightest,
              and illuminate the farthest corners of space. In our counseling
              practice, we believe every student possesses a distinct, powerful
              spark.
            </p>

            <p className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] text-[#f3eee5] font-sans mb-8">
              Our mission is to help teens uncover, ignite, and project that
              spark into the world&mdash;creating college applications that burn
              brightly in selective admissions pools, and personal confidence
              that lasts a lifetime.
            </p>

            <div className="inline-block px-6 py-4 rounded-[12px] bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="block text-base sm:text-[17px] font-bold text-[#bfe2fa] tracking-wider uppercase font-heading">
                &mdash; DR. AMY MORGENSTERN, PH.D.
              </span>
              <span className="block text-[14px] sm:text-[14.5px] text-[#9ed5ff] font-sans mt-0.5">
                Founder &amp; CEO, Blue Stars Admissions Consulting
              </span>
            </div>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-brand-mint text-brand-ink font-semibold tracking-wide text-[14.5px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Begin Your Blue Stars Journey</span>
                <ArrowRight className="w-4 h-4 text-[#0A3D6B]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA banner */}
      <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-brand-ink text-white shadow-[0_30px_70px_rgba(6,38,74,0.3)]">
            {/* Glow and sweeping curves (decorative) */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 85% 40%, rgba(56,140,248,0.45), transparent 55%)" }}
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[55%] lg:block"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1000 0V400H300C520 380 760 260 820 0Z" fill="#1c6fdc" opacity="0.35" />
              <path d="M1000 120V400H520C760 360 900 250 1000 120Z" fill="#2d86e8" opacity="0.45" />
            </svg>

            <div className="relative z-10 grid grid-cols-1 items-center lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
              <div className="flex flex-col items-start p-7 sm:p-10 lg:p-12 xl:p-14">
                <p className="mb-6 inline-flex items-center gap-3 rounded-full border-2 border-sky-400/60 bg-white/5 px-5 py-2.5 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_0_24px_rgba(56,140,248,0.35)]">
                  <CalendarCheck className="h-5 w-5 text-sky-300" aria-hidden="true" />
                  Ready to get started?
                </p>

                <h2 className="mb-5 text-[30px] leading-[1.1] text-white sm:text-[44px] lg:text-[clamp(34px,5.4vh,54px)]">
                  Make College Admissions Less Stressful and{" "}
                  <span className="relative inline-block italic text-[#5cc7f5]">
                    More Successful
                  </span>
                </h2>

                <p className="mb-7 mt-3 max-w-xl font-sans text-[16px] leading-[1.65] text-white/85 sm:text-[18px]">
                  Schedule your complimentary 30-minute introductory consultation to map your student&apos;s
                  personalized admissions roadmap.
                </p>

                <ul className="mb-8 flex flex-wrap items-center gap-3">
                  <li className="flex items-center gap-3 rounded-full bg-white/[0.07] px-5 py-3 ring-1 ring-white/15">
                    <CalendarCheck className="h-6 w-6 text-sky-300" aria-hidden="true" />
                    <span className="font-sans text-[14.5px] font-medium text-white">Free Initial Consultation</span>
                  </li>
                  <li className="flex items-center gap-3 rounded-full bg-white/[0.07] px-5 py-3 ring-1 ring-white/15">
                    <Users2 className="h-6 w-6 text-sky-300" aria-hidden="true" />
                    <span className="font-sans text-[14.5px] font-medium text-white">Whole-Student Mentorship</span>
                  </li>
                  <li className="flex items-center gap-3 rounded-full bg-white/[0.07] px-5 py-3 ring-1 ring-white/15">
                    <ShieldCheck className="h-6 w-6 text-sky-300" aria-hidden="true" />
                    <span className="font-sans text-[14.5px] font-medium text-white">No Obligation</span>
                  </li>
                </ul>

                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-4 py-4 text-center sm:inline-flex sm:w-auto sm:gap-3 sm:px-9 font-sans text-[14.5px] sm:text-[16px] font-semibold tracking-normal sm:tracking-wide text-[#0a2f5c] shadow-[0_14px_34px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="whitespace-nowrap">Book Your Initial Consultation</span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Students inside a glowing circle */}
              <div className="relative h-[300px] w-full sm:h-[380px] lg:h-full lg:min-h-[28rem]">
                <div
                  className="pointer-events-none absolute bottom-[-18%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#2d86e8] to-[#0a4fa8] opacity-80 lg:left-[52%] lg:w-[92%]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-[-12%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full border-2 border-sky-300/50 lg:left-[48%] lg:w-[92%]"
                  aria-hidden="true"
                />
                <BrandStar
                  className="pointer-events-none absolute right-[6%] top-[12%] h-12 w-12 text-sky-200 drop-shadow-[0_0_16px_rgba(125,211,252,0.8)]"
                  aria-hidden="true"
                />
                <Image
                  src="/images/about/students-cutout.webp"
                  alt="Two smiling students with a notebook and a laptop"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="relative z-10 object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
