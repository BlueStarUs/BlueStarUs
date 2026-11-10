"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Palette,
  Award,
  Layers,
  Star,
  Quote,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { ServiceResourcesBanner } from "@/components/sections/ServiceResourcesBanner";
import { BrandStar } from "@/components/ui/Icons";
import { ServiceDetail } from "@/lib/services-data";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

interface ArtAdmissionsViewProps {
  service: ServiceDetail;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const STARS_METHOD_STEPS = [
  {
    letter: "S",
    title: "Skills & Technical Range",
    description:
      "Demonstrating foundational observational drawing, composition, line quality, medium mastery, and dynamic spatial awareness.",
    badge: "FOUNDATION",
  },
  {
    letter: "T",
    title: "Theory & Conceptual Depth",
    description:
      "Infusing artwork with critical inquiry, intellectual curiosity, philosophical meaning, and unique narrative intent.",
    badge: "CONCEPT",
  },
  {
    letter: "A",
    title: "Authentic Artist Statement",
    description:
      "Translating visual experiments into articulate, reflective prose that captures the teen's creative voice and artistic identity.",
    badge: "NARRATIVE",
  },
  {
    letter: "R",
    title: "Refined Portfolio Curation",
    description:
      "Selecting 12–20 cohesive works that exhibit technical breadth, conceptual focus, and sketchbook developmental progress.",
    badge: "CURATION",
  },
  {
    letter: "S",
    title: "Strategic SlideRoom Submission",
    description:
      "High-resolution documentation, detailed piece descriptions, National Portfolio Day coaching, and institutional scholarship targeting.",
    badge: "PLACEMENT",
  },
];

const SPECIALIZED_ART_SERVICES = [
  {
    title: "Full-Service BFA & BA Program Consulting",
    kicker: "UNDERGRADUATE ART MAJORS",
    description:
      "Comprehensive college planning for students applying to dedicated art institutes (RISD, CalArts, Pratt, Parsons, SAIC, ArtCenter) and prestigious university visual arts departments (UCLA, USC, NYU Tisch, Carnegie Mellon, and Ivy League visual arts supplements).",
    bullets: [
      "Targeted art academy and university college list architecture",
      "Common App, UC PIQs, and school-specific essay development",
      "Studio art interview prep and faculty portfolio review coaching",
    ],
    accent: "blue" as const,
  },
  {
    title: "High School Art Portfolio Mentorship",
    kicker: "STUDIO & SKETCHBOOK DEVELOPMENT",
    description:
      "One-on-one studio critiques and thematic guidance for 9th–12th graders looking to build, refine, and curate a breathtaking body of work that commands attention in competitive admissions pools.",
    bullets: [
      "Piece-by-piece studio critiques led by MFA faculty Dr. Amy Morgenstern",
      "Sketchbook habituation and creative process documentation",
      "National Portfolio Day preparation and mock faculty evaluations",
    ],
    accent: "green" as const,
  },
  {
    title: "MFA Graduate Program Admissions Mentorship",
    kicker: "GRADUATE STUDIO PRACTICE",
    description:
      "Strategic advising for artists, designers, and creative professionals targeting top Master of Fine Arts (MFA) programs across visual arts, design, painting, sculpture, and new media.",
    bullets: [
      "Rigorous studio critique and cohesive body-of-work consolidation",
      "MFA artist statement, research proposal, and CV development",
      "Strategic faculty outreach and graduate interview preparation",
    ],
    accent: "blue" as const,
  },
];

export function ArtAdmissionsView({ service }: ArtAdmissionsViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bottomStudentRef = useRef<HTMLDivElement>(null);
  const star1Ref = useRef<HTMLDivElement>(null);
  const star2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bottomStudentRef.current) {
        gsap.to(bottomStudentRef.current, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (star1Ref.current && star2Ref.current) {
        gsap.to(star1Ref.current, {
          rotation: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
        });
        gsap.to(star2Ref.current, {
          rotation: -360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full bg-white">
      {/* 1. Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Our Services", href: "/services" },
          { label: service.title },
        ]}
        badge="SPECIALIZED CREATIVE SERVICE"
        title={service.title}
        description={service.subtitle}
      />

      {/* 2. Top Key Stats Bar */}
      <section className="border-b border-[#e2eef9] bg-[#f8fbfe] py-6 sm:py-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-[5px] p-4 sm:p-5 border border-[#e2eef9] shadow-xs text-center">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading">
                15+ Years
              </span>
              <span className="block text-xs sm:text-[13px] text-brand-text font-sans mt-0.5">
                Creative Admissions Mentorship
              </span>
            </div>
            <div className="bg-white rounded-[5px] p-4 sm:p-5 border border-[#e2eef9] shadow-xs text-center">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading">
                MFA Led
              </span>
              <span className="block text-xs sm:text-[13px] text-brand-text font-sans mt-0.5">
                Contemporary Art Faculty Direction
              </span>
            </div>
            <div className="bg-white rounded-[5px] p-4 sm:p-5 border border-[#e2eef9] shadow-xs text-center">
              <span className="block text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading">
                12–20
              </span>
              <span className="block text-xs sm:text-[13px] text-brand-text font-sans mt-0.5">
                Curated Works per SlideRoom Portfolio
              </span>
            </div>
            <div className="bg-white rounded-[5px] p-4 sm:p-5 border border-[#e2eef9] shadow-xs text-center">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#2F9E5C] font-heading">
                Top BFA &amp; MFA
              </span>
              <span className="block text-xs sm:text-[13px] text-brand-text font-sans mt-0.5">
                Acceptances &amp; Merit Scholarships
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Hero Feature 1: Let's Get Your Teen Ready for the Art Program of Their Dreams */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 xl:gap-16 items-center"
          >
            {/* Left Narrative */}
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  ART ADMISSIONS MENTORSHIP
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-4">
                Let&apos;s Get Your Teen Ready for the Art Program of Their Dreams
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                College art programs are significantly more competitive than standard undergraduate admissions because committees admit students through specialized portfolio evaluations with strict studio cohort limits.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Led by Blue Stars founder Dr. Amy Morgenstern—who holds an MFA in contemporary art and has taught university art theory—our personalized mentorship helps students channel their raw creative drive into an authentic, technically accomplished, and conceptually rich body of work.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] sm:text-[15px] text-brand-navy font-sans leading-snug">
                    <strong>BFA, BA &amp; MFA Placements:</strong> Proven success at RISD, CalArts, Pratt, Parsons, SAIC, ArtCenter, UCLA, USC, Carnegie Mellon, and Ivy League visual arts supplements.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] sm:text-[15px] text-brand-navy font-sans leading-snug">
                    <strong>Piece-by-Piece Studio Critiques:</strong> Constructive, university-level critiques that elevate composition, materials, color theory, and conceptual storytelling.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] sm:text-[15px] text-brand-navy font-sans leading-snug">
                    <strong>Merit Scholarship Targeting:</strong> Portfolios curated to win substantial four-year presidential, trustee, and talent scholarships.
                  </span>
                </div>
              </div>

              <div>
                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  <span>Book a Free 30-Min Creative Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="relative rounded-[5px] overflow-hidden border border-[#e2eef9] shadow-[0_12px_36px_rgba(10,61,107,0.08)] group aspect-[4/3] bg-[#f8fbfe]">
              <Image
                src="/images/services/others_images/Dream_art_Programs.png"
                alt="Student developing art portfolio for dream college admissions"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D6B]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-[5px] bg-white/90 backdrop-blur-md border border-white/40">
                <span className="block text-xs font-bold text-brand-navy font-heading">
                  Dream College Art Portfolio Mentorship
                </span>
                <span className="block text-[11px] text-brand-text font-sans">
                  Structured studio guidance that turns creative ideas into admissions offers.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Hero Feature 2: Creating a Successful Artistic Profile — Start Early to Get Ahead */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 xl:gap-16 items-center"
          >
            {/* Left Image Container */}
            <div className="relative rounded-[5px] overflow-hidden border border-[#e2eef9] shadow-[0_12px_36px_rgba(10,61,107,0.08)] group aspect-[4/3] bg-[#f8fbfe] order-2 lg:order-1">
              <Image
                src="/images/services/others_images/Early_art_Development.png"
                alt="Early high school art development and sketchbook mentorship"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D6B]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-[5px] bg-white/90 backdrop-blur-md border border-white/40">
                <span className="block text-xs font-bold text-brand-navy font-heading">
                  Early Artistic Profile Cultivation
                </span>
                <span className="block text-[11px] text-brand-text font-sans">
                  From 8th–10th grade sketches to polished 12th-grade SlideRoom portfolios.
                </span>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-[#2F9E5C] rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#2F9E5C] font-heading">
                  START EARLY TO GET AHEAD
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-4">
                Creating a Successful Artistic Profile Requires Years of Cultivation
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                Many of the strongest applicants begin developing their portfolios years in advance. Creating 12 to 20 distinctive, gallery-caliber pieces requires experimenting with multiple media, building sketchbook habits, and developing a cohesive personal philosophy.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Guided by &ldquo;The Calm Way,&rdquo; we structure the entire multi-year timeline into manageable, exciting milestones—preventing senior-year panic and giving your teen the space to take creative risks that truly stand out.
              </p>

              <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs mb-8">
                <h4 className="text-sm font-bold text-brand-navy font-heading mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  <span>The Blue Stars Advantage for Young Artists</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-[13.5px] text-brand-text font-sans">
                  <li>&bull; Curating a balanced body of observational drawings, self-directed conceptual works, and digital studies.</li>
                  <li>&bull; Comprehensive National Portfolio Day preparation and mock admissions panel critiques.</li>
                  <li>&bull; Crafting an authentic artist statement that reveals the thinking behind every stroke.</li>
                </ul>
              </div>

              <div>
                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-navy text-white hover:bg-brand-blue transition-all duration-200 shadow-xs hover:shadow-sm"
                >
                  <span>Start Your Teen&apos;s Creative Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Specialized Art Consulting Services (3 Cards: BFA, High School Mentorship, MFA) */}
      <section className="py-14 sm:py-18 lg:py-22 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                TAILORED PROGRAMS
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-3">
              3 Ways We Can Pave a Successful Path to College Art Programs
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
              From early high school portfolio cultivation to senior BFA/BA applications and advanced MFA graduate advising.
            </p>
          </div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {SPECIALIZED_ART_SERVICES.map((item) => (
              <motion.div
                key={item.title}
                variants={cardItemVariants}
                className="bg-white rounded-[5px] border border-[#e2eef9] shadow-[0_6px_24px_rgba(10,61,107,0.06)] hover:shadow-[0_16px_36px_rgba(10,61,107,0.12)] transition-all duration-300 hover:-translate-y-1.5 p-6 flex flex-col justify-between group"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-[11px] font-bold font-heading mb-3">
                    {item.kicker}
                  </span>

                  <h3 className="text-[19px] sm:text-[20px] font-extrabold text-brand-navy font-heading mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[14px] sm:text-[14.5px] leading-[22px] sm:leading-[24px] text-brand-text font-sans mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#edf4fb] mb-6">
                    {item.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-brand-navy font-sans leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 py-3 px-4 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 shadow-xs font-heading group-hover:scale-[1.01]"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. The STARS Method for Art Admissions */}
      <section className="py-14 sm:py-18 lg:py-22 bg-[#073d63] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#073d63] via-[#094c79]/95 to-[#0c5989]/90 z-0" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#9ed5ff] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>THE BLUE STARS FORMULA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-3">
              The STARS Method Makes the Difference
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] font-sans">
              Our 5-pillar proprietary framework guiding high school artists from raw sketchbook exploration to triumphant admissions offers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {STARS_METHOD_STEPS.map((s) => (
              <div
                key={s.letter}
                className="bg-white/10 backdrop-blur-md rounded-[5px] p-5 border border-white/15 hover:bg-white/15 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[5px] bg-[#38bdf8] text-[#0A3D6B] font-extrabold text-xl font-heading grid place-items-center mb-3 shadow-xs">
                    {s.letter}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-white/20 text-[#bfe2fa] text-[10px] font-bold font-heading mb-2">
                    {s.badge}
                  </span>
                  <h4 className="text-[16px] sm:text-[17px] font-bold text-white font-heading mb-2 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-xs sm:text-[12.5px] leading-[19px] text-[#d4e8f8] font-sans">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Student Testimonial: Jeanie (Admitted to RISD) */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] border-b border-[#e2eef9]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[5px] border border-[#e2eef9] p-6 sm:p-10 shadow-[0_12px_36px_rgba(10,61,107,0.06)] relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#eef5fb]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#e2f7eb] text-[#2F9E5C] text-xs font-bold font-heading">
                <Award className="w-3.5 h-3.5" />
                <span>Admitted to Dream School: Rhode Island School of Design (RISD)</span>
              </div>
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
            </div>

            <Quote className="w-8 h-8 text-brand-blue/30 mb-3" />

            <p className="text-[15px] sm:text-[16.5px] leading-[26px] sm:leading-[28px] text-brand-navy font-sans mb-6">
              &ldquo;When I first started working with Blue Stars, I wasn&apos;t completely sure I wanted to pursue art. She encouraged me to immerse myself in the art world by visiting art museums and listening to podcasts. These engaging activities inspired me, and I became more passionate about studying art in the future. With Blue Stars&apos; guidance during the college admissions process, <strong>I was admitted into my dream school, RISD!</strong> It became easier to complete everything once it was broken down into specific tasks. Blue Stars gave me lots of excellent feedback on my essays, and I became more confident in what I wanted to convey in my writing.&rdquo;
            </p>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#eef5fb]">
              <div>
                <span className="block text-base font-bold text-brand-navy font-heading">
                  Jeanie
                </span>
                <span className="block text-xs sm:text-[13px] text-brand-text font-sans">
                  Blue Stars Student &bull; Gunn High School, Palo Alto, CA
                </span>
              </div>
              <Link
                href="/stories/jeanie-risd-arts"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 4-Step Roadmap to College Art Admissions */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading mb-2">
              HOW TO GET STARTED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading tracking-tight">
              Four Steps to Your Dream Art School Acceptance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#f8fbfe] rounded-[5px] p-5 sm:p-6 border border-[#e2eef9] shadow-xs">
              <span className="block text-sm font-extrabold text-brand-blue font-heading mb-1">
                STEP 01
              </span>
              <h3 className="text-base font-bold text-brand-navy font-heading mb-2">
                Free 30-Min Consultation
              </h3>
              <p className="text-xs sm:text-[13px] text-brand-text font-sans leading-relaxed">
                Connect with our team to discuss your teen&apos;s artistic aspirations, target colleges, and current creative body of work.
              </p>
            </div>

            <div className="bg-[#f8fbfe] rounded-[5px] p-5 sm:p-6 border border-[#e2eef9] shadow-xs">
              <span className="block text-sm font-extrabold text-brand-blue font-heading mb-1">
                STEP 02
              </span>
              <h3 className="text-base font-bold text-brand-navy font-heading mb-2">
                Strategic Studio Assessment
              </h3>
              <p className="text-xs sm:text-[13px] text-brand-text font-sans leading-relaxed">
                A 90-minute deep-dive diagnostic evaluating sketchbook work, medium breadth, thematic strengths, and target BFA/BA/MFA programs.
              </p>
            </div>

            <div className="bg-[#f8fbfe] rounded-[5px] p-5 sm:p-6 border border-[#e2eef9] shadow-xs">
              <span className="block text-sm font-extrabold text-brand-blue font-heading mb-1">
                STEP 03
              </span>
              <h3 className="text-base font-bold text-brand-navy font-heading mb-2">
                Studio Mentorship &amp; Curation
              </h3>
              <p className="text-xs sm:text-[13px] text-brand-text font-sans leading-relaxed">
                Iterative project production, piece-by-piece studio critiques, National Portfolio Day coaching, and artist statement writing.
              </p>
            </div>

            <div className="bg-[#f8fbfe] rounded-[5px] p-5 sm:p-6 border border-[#e2eef9] shadow-xs">
              <span className="block text-sm font-extrabold text-brand-blue font-heading mb-1">
                STEP 04
              </span>
              <h3 className="text-base font-bold text-brand-navy font-heading mb-2">
                SlideRoom &amp; Application Success
              </h3>
              <p className="text-xs sm:text-[13px] text-brand-text font-sans leading-relaxed">
                High-resolution portfolio upload, precise caption polish, essay review, and aligned submission for maximum scholarship award.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs */}
      <section className="py-14 sm:py-18 bg-white border-t border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] mb-4">
                Questions About Art Admissions &amp; Portfolio Mentorship
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans max-w-md">
                Have specific questions about BFA vs. BA paths, SlideRoom requirements, or building a portfolio from scratch? Speak with Dr. Amy Morgenstern during your free consultation.
              </p>

              <div className="mt-6">
                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors"
                >
                  <span>Need custom advice? Book a free consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <ServiceFAQAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* 10. Consultation CTA Banner with Student Cutout */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4">
          <div className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>READY TO ELEVATE YOUR ART PORTFOLIO?</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Make the College Art Admissions Process Less Stressful and More Successful
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule a complimentary 30-minute introductory consultation with Dr. Amy Morgenstern to evaluate your student&apos;s art portfolio trajectory.
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-[13.5px] text-[#bfe2fa] font-medium font-sans">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>Free 30-Min Diagnostic</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3bd386] flex-shrink-0" />
                    <span>MFA Contemporary Art Faculty Direction</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>No Obligation</span>
                  </span>
                </div>

                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[5px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>Book Free Creative Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#0A3D6B] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Student Cutout */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-full min-h-[250px] lg:min-h-[300px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
                <div
                  ref={star1Ref}
                  className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                <div
                  ref={star2Ref}
                  className="absolute right-[3%] sm:right-[5%] lg:right-[1%] top-[8%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[136px] lg:h-[136px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                <div
                  ref={bottomStudentRef}
                  className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[335px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0"
                >
                  <Image
                    src="/images/sub_images/ready_to_take.png"
                    alt="Student smiling with portfolio ready for college success"
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

      {/* 11. Resources Banner */}
      <ServiceResourcesBanner />
    </div>
  );
}

