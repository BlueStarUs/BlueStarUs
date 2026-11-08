"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Microscope,
  Users,
  Award,
  BookOpen,
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

interface ResearchInternshipsViewProps {
  service: ServiceDetail;
}

// 4 Images for Core Pillars (What We Focus On)
const RESEARCH_PILLAR_IMAGES = [
  "/images/services/research-internships/Original_Independent_Research_Capstone.png",
  "/images/services/research-internships/Faculty_Outreach_University_Lab_Placements.png",
  "/images/services/research-internships/Prestigious_Summer_Research_Programs.png",
  "/images/services/research-internships/Journal_Publishing_Competition_Submissions.png",
];

// 4 Images for Methodology (How We Guide You Step-by-Step from step_img)
const RESEARCH_STEP_IMAGES = [
  "/images/services/research-internships/step_img/Curiosity_Assessment_Domain_Exploration.png",
  "/images/services/research-internships/step_img/Hypothesis_Formulation_Literature_Review.png",
  "/images/services/research-internships/step_img/Execution_Mentorship_Faculty_Outreach.png",
  "/images/services/research-internships/step_img/Scholarly_Paper_Publication_Admissions_Integration.png",
];

// Motion Variants for Scroll Down and Scroll Up Re-triggering
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

export function ResearchInternshipsView({ service }: ResearchInternshipsViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bottomStudentRef = useRef<HTMLDivElement>(null);
  const star1Ref = useRef<HTMLDivElement>(null);
  const star2Ref = useRef<HTMLDivElement>(null);

  // GSAP continuous animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle floating on bottom student cutout
      if (bottomStudentRef.current) {
        gsap.to(bottomStudentRef.current, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Subtle rotation & pulse on decorative brand stars
      if (star1Ref.current && star2Ref.current) {
        gsap.to(star1Ref.current, {
          rotate: 15,
          scale: 1.08,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(star2Ref.current, {
          rotate: -15,
          scale: 1.1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const isBlue = service.accent === "blue";

  return (
    <div ref={rootRef} className="w-full bg-white overflow-hidden">
      {/* ========================================================
          1. HERO SECTION: BreadcrumbHero
          ======================================================== */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Our Services", href: "/services" },
          { label: service.title },
        ]}
        badge={service.badge}
        title={service.title}
        description={service.subtitle}
      />

      {/* ========================================================
          2. OVERVIEW & APPROACH SECTION
          ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* Left: Rich Overview Narrative + 3 Stats */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  OVERVIEW &amp; APPROACH
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-4">
                {service.overview.heading}
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                {service.overview.intro}
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8">
                {service.overview.paragraph2}
              </p>

              {/* Key Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-brand-border/60">
                {service.overview.keyStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -3 }}
                    className="p-3.5 sm:p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center"
                  >
                    <div className="text-lg sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Modern Program Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-gradient-to-br from-[#f8fbfe] to-white rounded-[5px] border border-[#e2eef9] shadow-[0_14px_38px_rgba(10,61,107,0.07)] p-6 sm:p-8 overflow-hidden"
            >
              {/* Corner Petal Accent */}
              <svg
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M100 0H28C28 39.76 60.24 72 100 72V0Z"
                  fill={isBlue ? "#d8edfd" : "#daf5e5"}
                  opacity="0.8"
                />
              </svg>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3F1FC] text-brand-blue text-xs font-bold font-heading mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Program Profile</span>
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading tracking-tight mb-6">
                  Who This Service Is For
                </h3>

                <ul className="space-y-3 mb-8">
                  {service.overview.targetAudience.map((audience) => (
                    <li key={audience} className="flex items-start gap-3">
                      <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-[15px] sm:text-[16px] text-brand-navy font-medium font-sans leading-snug">
                        {audience}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Link
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span>Book a Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. WHAT WE FOCUS ON DURING YOUR PROGRAM (CORE PILLARS)
             (With 4 Images from research-internships, compact height)
          ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] border-y border-[#e2eef9] relative overflow-hidden">
        {/* Background Organic Waves */}
        <div
          className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/70 to-transparent rounded-br-[220px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                CORE PILLARS
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-4">
              What We Focus On During Your Program
            </h2>
          </motion.div>

          {/* 4 Pillar Cards Grid - 2x2 with Compact Height Images */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-stretch"
          >
            {service.pillars.map((pillar, idx) => {
              const imageSrc =
                RESEARCH_PILLAR_IMAGES[idx] || RESEARCH_PILLAR_IMAGES[0];

              return (
                <motion.div
                  key={pillar.title}
                  variants={cardItemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="bg-white rounded-[5px] border border-[#e7f0f9] shadow-[0_10px_30px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_42px_rgba(10,61,107,0.12)] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Decorative Top-Right Corner Arc */}
                  <svg
                    className="absolute top-0 right-0 w-24 h-24 pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M100 0H28C28 39.76 60.24 72 100 72V0Z"
                      fill={idx % 2 === 0 ? "#e2f2fd" : "#daf5e5"}
                      opacity="0.8"
                    />
                  </svg>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Icon Squircle Badge */}
                      <div
                        className={cn(
                          "w-[56px] h-[56px] rounded-[5px] grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-105 shadow-xs",
                          idx % 2 === 0
                            ? "bg-[#e5f1fc] text-brand-blue"
                            : "bg-[#e2f7eb] text-[#2F9E5C]"
                        )}
                      >
                        {idx === 0 && <Microscope className="w-6 h-6 stroke-[2.2]" />}
                        {idx === 1 && <Users className="w-6 h-6 stroke-[2.2]" />}
                        {idx === 2 && <Award className="w-6 h-6 stroke-[2.2]" />}
                        {idx === 3 && <BookOpen className="w-6 h-6 stroke-[2.2]" />}
                      </div>

                      {/* Pillar Title (Exact Previous Font Size) */}
                      <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy mb-2.5 font-heading leading-snug group-hover:text-brand-blue transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Pillar Description */}
                      <p className="text-[15px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans mb-3.5">
                        {pillar.description}
                      </p>

                      {/* Compact Responsive Pillar Image from research-internships folder */}
                      <div className="relative w-full h-[140px] sm:h-[180px] md:h-[200px] rounded-[6px] overflow-hidden mb-4 border border-[#e8f1f9] bg-[#f8fbfe] shadow-2xs group-hover:shadow-xs transition-shadow">
                        <Image
                          src={imageSrc}
                          alt={pillar.title}
                          fill
                          className="object-cover object-top group-hover:scale-104 transition-transform duration-500 ease-out"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Highlights List */}
                    <ul className="space-y-2 pt-3 border-t border-[#edf4fb]">
                      {pillar.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          4. METHODOLOGY SECTION (How We Guide You Step-by-Step)
             (With 4 Images from step_img folder)
          ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                OUR METHODOLOGY
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
              How We Guide You Step-by-Step
            </h2>
          </motion.div>

          {/* 4 Step Cards with step_img */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch"
          >
            {service.methodology.map((step, sIdx) => {
              const stepImageSrc =
                RESEARCH_STEP_IMAGES[sIdx] || RESEARCH_STEP_IMAGES[0];

              return (
                <motion.div
                  key={step.stepNumber}
                  variants={cardItemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="relative rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group overflow-hidden"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-extrabold text-sm font-heading grid place-items-center mb-4 shadow-sm">
                      {step.stepNumber}
                    </div>

                    <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-[15px] sm:text-[16px] text-brand-text leading-[22px] sm:leading-[24px] font-sans mb-4 min-h-[48px]">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Image from step_img folder */}
                  <div className="relative w-full aspect-[16/10] rounded-[5px] overflow-hidden border border-[#dce8f5] bg-white mt-2">
                    <Image
                      src={stepImageSrc}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          5. KEY DELIVERABLES SECTION (What's Included)
          ======================================================== */}
      <section className="py-12 sm:py-16 bg-[#f5f9fd] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="bg-white rounded-[6px] p-6 sm:p-10 border border-[#e2eef9] shadow-[0_12px_36px_rgba(10,61,107,0.06)]"
          >
            <div className="max-w-2xl mb-8">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading block mb-2">
                PROGRAM DELIVERABLES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
                What&apos;s Included in Your Engagement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {service.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e8f2fc]"
                >
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[15px] sm:text-[16px] font-semibold text-brand-navy font-heading">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          6. FAQ SECTION
          ======================================================== */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-14 items-start">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-4">
                Questions About {service.title}
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans max-w-md">
                Have more questions about our methodology, lab placements, or research timelines? Speak directly with our senior counseling team.
              </p>

              <div className="mt-6">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors"
                >
                  <span>Need custom guidance? Contact our team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Interactive Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55 }}
            >
              <ServiceFAQAccordion faqs={service.faqs} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. RESOURCES TO HELP TEENS & FAMILIES
          ======================================================== */}
      <ServiceResourcesBanner />

      {/* ========================================================
          8. MODERN ELEVATED CTA BANNER CARD
          ======================================================== */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden"
          >
            {/* Luminous Wave Ribbons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              {/* Left Column: Text, Highlights & Action Button */}
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>READY TO TAKE THE NEXT STEP?</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Elevate Your Profile with Original Research
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule a complimentary 30-minute introductory consultation with our senior advisory team to start planning high-impact research projects and lab placements.
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-[13.5px] text-[#bfe2fa] font-medium font-sans">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>Free 30-Min Discovery</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3bd386] flex-shrink-0" />
                    <span>Faculty Mentorship</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>No Obligation</span>
                  </span>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[5px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-200 group"
                  >
                    <span>Book a Free Consultation</span>
                    <ArrowRight className="w-4 h-4 text-[#0A3D6B] transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>

              {/* Right Column: Student Cutout & Glowing Brand Stars */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-full min-h-[250px] lg:min-h-[300px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
                {/* Radial Glow */}
                <div
                  className="absolute right-[12%] top-[18%] w-[260px] h-[260px] bg-[#229ae3]/25 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Decorative Brand Stars */}
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

                {/* Student Cutout Image */}
                <div
                  ref={bottomStudentRef}
                  className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[335px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0"
                >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}

