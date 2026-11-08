"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Laptop,
  GraduationCap,
  ShieldCheck,
  BarChart3,
  Quote,
  Star,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { ServiceResourcesBanner } from "@/components/sections/ServiceResourcesBanner";
import { BrandStar } from "@/components/ui/Icons";
import { ServiceDetail } from "@/lib/services-data";

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

interface CollegeAdmissionsConsultingViewProps {
  service: ServiceDetail;
}

// Framer Motion Animation Variants (Both scroll down and scroll up)
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

export function CollegeAdmissionsConsultingView({ service }: CollegeAdmissionsConsultingViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bottomStudentRef = useRef<HTMLDivElement>(null);
  const star1Ref = useRef<HTMLDivElement>(null);
  const star2Ref = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle floating on bottom banner student cutout
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

  return (
    <div ref={rootRef} className="w-full bg-white overflow-hidden">
      {/* ========================================================
          1. PREVIOUS HERO SECTION: BreadcrumbHero exactly as it was
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
          2. OVERVIEW & THE BLUE STARS WAY (Narrative + Stats + Benefits Card)
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
                The Blue Stars Way: Fostering Curiosity, Authenticity &amp; Confidence
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                We believe the college admissions journey is more than just an application — it&apos;s a chance for students to discover their passions, build confidence, and shape their future. At Blue Stars, we combine expert guidance, personalized mentoring, and a student-centered approach to help applicants present their true selves to top universities.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8">
                From choosing the right programs to crafting compelling essays and preparing for interviews, we support students at every step. Our goal is to make the process clearer, less stressful, and more rewarding, so students can focus on what truly matters — their growth, learning, and long-term success.
              </p>

              {/* 3 Stats Row (Exact Previous Font Size) */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-brand-border/60">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-3.5 sm:p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center"
                >
                  <div className="text-lg sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    16+
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                    Years Guiding Families
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-3.5 sm:p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center"
                >
                  <div className="text-lg sm:text-2xl font-extrabold text-[#2F9E5C] font-heading tracking-tight">
                    98%
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                    Top-Choice Admits
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-3.5 sm:p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center col-span-2 lg:col-span-1"
                >
                  <div className="text-lg sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    100%
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                    Personalized Support
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Key Benefits Card (Exact Previous Font Size) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-gradient-to-br from-[#f8fbfe] to-white rounded-[5px] border border-[#e2eef9] shadow-[0_14px_38px_rgba(10,61,107,0.07)] p-6 sm:p-8 overflow-hidden"
            >
              {/* Corner Petal Accent */}
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-bl-[80px] bg-gradient-to-bl from-[#d8edfd] to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3F1FC] text-brand-blue text-xs font-bold font-heading mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Key Benefits</span>
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading tracking-tight mb-6">
                  With The Blue Stars Plan:
                </h3>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] sm:text-[16px] text-brand-navy font-medium font-sans leading-snug">
                      Expert, personalized 1-on-1 guidance throughout your journey
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] sm:text-[16px] text-brand-navy font-medium font-sans leading-snug">
                      Strategic college selection based on your goals, profile, and preferences
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] sm:text-[16px] text-brand-navy font-medium font-sans leading-snug">
                      Strong, authentic application support — from essays to interviews and recommendations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[15px] sm:text-[16px] text-brand-navy font-medium font-sans leading-snug">
                      Holistic development to stand out in a competitive international admissions process
                    </span>
                  </li>
                </ul>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Link
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span>Start Your Admissions Journey</span>
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
             (With Student_Collaboration_&_Teamwork.png in Fixed Modern Background)
          ======================================================== */}
      <section
        className="py-14 sm:py-18 lg:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-local sm:bg-fixed border-y border-[#e2eef9]"
        style={{
          backgroundImage: "url('/images/services/College_Admissions_Consulting/Student_Collaboration_&_Teamwork.png')",
        }}
      >
        {/* Modern Soft Blur & Gradient Overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#f8fbfe]/94 via-white/90 to-[#f3f8fd]/95 backdrop-blur-[2px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient subtle glow lights */}
        <div
          className="absolute top-0 right-0 w-[450px] h-[350px] bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#2ba3ea]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                CORE PILLARS
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px]">
              What We Focus On During Your Program
            </h2>
          </motion.div>

          {/* 4 Cards Grid - 2x2 responsive across the full width */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-stretch"
          >
            {/* Card 1 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-md rounded-[8px] border border-[#e2eef9] p-7 sm:p-8 shadow-[0_10px_32px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_44px_rgba(10,61,107,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-[6px] bg-[#e5f1fc] text-brand-blue flex items-center justify-center mb-5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2.5 leading-snug group-hover:text-brand-blue transition-colors">
                  Curiosity &amp; Intellectual Passion
                </h3>
                <ul className="space-y-2.5 pt-3 border-t border-[#edf4fb]">
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                    <span>Helping students explore their interests deeply and show genuine curiosity.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                    <span>Guidance on academic projects, research, and subject exploration.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                    <span>Support in presenting a clear, focused academic narrative.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-md rounded-[8px] border border-[#e2eef9] p-7 sm:p-8 shadow-[0_10px_32px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_44px_rgba(10,61,107,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-[6px] bg-[#e2f7eb] text-[#2F9E5C] flex items-center justify-center mb-5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2.5 leading-snug group-hover:text-brand-blue transition-colors">
                  Authentic Student Voice
                </h3>
                <ul className="space-y-2.5 pt-3 border-t border-[#edf4fb]">
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] flex-shrink-0 mt-2" />
                    <span>Crafting compelling, personal stories that reflect your true experiences.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] flex-shrink-0 mt-2" />
                    <span>Essay brainstorming, writing support, and detailed feedback.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] flex-shrink-0 mt-2" />
                    <span>Ensuring your application stands out with honesty and originality.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-md rounded-[8px] border border-[#e2eef9] p-7 sm:p-8 shadow-[0_10px_32px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_44px_rgba(10,61,107,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-[6px] bg-[#e5f1fc] text-brand-blue flex items-center justify-center mb-5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2.5 leading-snug group-hover:text-brand-blue transition-colors">
                  Confidence &amp; Resilience
                </h3>
                <ul className="space-y-2.5 pt-3 border-t border-[#edf4fb]">
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                    <span>Building a positive mindset for a competitive admissions process.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                    <span>Interview preparation and communication coaching.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-2" />
                    <span>Help in handling challenges and learning from setbacks.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/95 backdrop-blur-md rounded-[8px] border border-[#e2eef9] p-7 sm:p-8 shadow-[0_10px_32px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_44px_rgba(10,61,107,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-[6px] bg-[#e2f7eb] text-[#2F9E5C] flex items-center justify-center mb-5 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2.5 leading-snug group-hover:text-brand-blue transition-colors">
                  Balanced &amp; Strategic Positioning
                </h3>
                <ul className="space-y-2.5 pt-3 border-t border-[#edf4fb]">
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] flex-shrink-0 mt-2" />
                    <span>Showcasing academic achievements, leadership, and meaningful activities.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] flex-shrink-0 mt-2" />
                    <span>Guidance on program fit, university selection, and application timing.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] flex-shrink-0 mt-2" />
                    <span>A holistic approach to present your unique strengths and potential.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          4. MAKE COLLEGE ADMISSIONS STRESS-FREE & EXCITING! (Banner)
          ======================================================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="relative rounded-[6px] bg-gradient-to-br from-[#07466f] via-[#0b63b5] to-[#0a3d6b] text-white p-7 sm:p-10 lg:p-12 overflow-hidden shadow-[0_16px_44px_rgba(10,61,107,0.16)]"
          >
            {/* Luminous Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#9ed5ff] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>MAKE ADMISSIONS STRESS-FREE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-3">
                  Make College Admissions Stress-Free &amp; Exciting!
                </h3>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#e0effd] font-sans mb-6">
                  Let&apos;s discuss your academic goals, explore the right programs, and create a personalized plan to make your college journey a success.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                      Get expert advice from experienced counselors
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                      Understand your options and application timeline
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                      Build a clear and realistic roadmap
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultation Card (Exact Previous Font Size) */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-[6px] border border-white/20">
                <div className="text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    100% Free
                  </span>
                  <span className="block text-xs sm:text-[13px] text-[#bfe2fa] font-sans mt-0.5">
                    30-Minute Introductory Strategy Session
                  </span>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                  <Link
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[5px] font-bold text-xs sm:text-[14px] font-heading bg-white text-brand-navy hover:bg-[#f0f7fe] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span>Schedule Free Consultation</span>
                    <ArrowRight className="w-4 h-4 text-brand-navy" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          5. READY TO GET THE COMPETITIVE EDGE (Image Left + Text Right)
          ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f8fbfe] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* Image Left (Ready_to_get_competitive_edge.png) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-white group"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/services/College_Admissions_Consulting/Ready_to_get_competitive_edge.png"
                  alt="Students discussing college prep on campus"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-104 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Text Right (Exact Previous Font Size) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  COMPETITIVE EDGE
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                Ready to get the competitive edge your student needs?
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                At Blue Stars, we go beyond standard application advice to help students build a strong, authentic, and standout profile.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Through personalized strategy, expert admissions insights, and comprehensive support, we ensure your student is well-prepared to compete with confidence at top universities around the world.
              </p>

              <div className="mt-2">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="inline-block">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm"
                  >
                    <span>Schedule a Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. START EARLY TO GET AHEAD (Text Left + Image Right)
          ======================================================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* Text Left (Exact Previous Font Size) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center order-2 lg:order-1"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  PROACTIVE PREPARATION
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                Start early to get ahead in the admissions process
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                A well-planned and early start gives students more time to explore their interests, build a strong profile, and make thoughtful decisions. At Blue Stars, we help you stay organized, meet key deadlines, and maximize your opportunities for top college admissions.
              </p>

              <ul className="space-y-2.5 mb-6 mt-2">
                <li className="flex items-start gap-2.5">
                  <BlueCircleCheck className="w-4 h-4 flex-shrink-0 mt-1" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    Create a personalized timeline for a smooth application journey
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BlueCircleCheck className="w-4 h-4 flex-shrink-0 mt-1" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    Identify the right programs, universities, and application requirements
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BlueCircleCheck className="w-4 h-4 flex-shrink-0 mt-1" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    Build a strong academic and extracurricular profile step-by-step
                  </span>
                </li>
              </ul>

              <div className="mt-2">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="inline-block">
                  <Link
                    href="/services/college-planning"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm"
                  >
                    <span>Explore Early Planning Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Image Right (Admissions_Process_Students_Discussion.png) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-white group order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/services/College_Admissions_Consulting/Admissions_Process_Students_Discussion.png"
                  alt="Student working on laptop preparing admissions plan"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-104 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CURIOUS TO SEE HOW WE WORK? (Text Left + Image Right)
          ======================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f8fbfe] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* Text Left (Exact Previous Font Size) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  OUR SERVICE SCOPE
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                Curious to see how we work?
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-5">
                Take a look at our simple and supportive process to understand how we guide you from planning to submission, step-by-step.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 rounded-[5px] bg-white border border-[#e7f0f9]">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    We start with a one-on-one consultation to understand your goals.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-[5px] bg-white border border-[#e7f0f9]">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    Provide expert guidance on applications, essays, and interviews
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-[5px] bg-white border border-[#e7f0f9]">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    Create a personalized plan tailored to your academic journey.
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-[5px] bg-white border border-[#e7f0f9]">
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                    Stay with you at every step, from planning to final admission.
                  </span>
                </div>
              </div>

              {/* 3 Tags and CTA Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4 border-t border-[#e2eef9]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mr-1">
                    Specializations:
                  </span>
                  {["Personalized Support", "Expert Guidance", "Proven Results"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-[5px] bg-[#e6f2fc] text-brand-blue font-bold text-xs font-heading border border-[#d1e6f9]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 font-heading shadow-xs self-start sm:self-auto"
                >
                  <span>Book 30-Min Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Image Right (Curious_To_See_How_We_Work.png) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-white group w-full"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <Image
                  src="/images/services/College_Admissions_Consulting/Curious_To_See_How_We_Work.png"
                  alt="Students group with global admissions background"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-104 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. WHAT FAMILIES SAY ABOUT BLUESTARS (Reviews / Testimonials)
             (Strictly Preserving Exact Font Size and Text)
          ======================================================== */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-[#f4f9fd] border-b border-[#e2eef9]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  STUDENT &amp; PARENT SUCCESS
                </span>
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px]">
                What Families Say About Blue Stars
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {service.testimonials.map((t, idx) => (
                <motion.div
                  key={idx}
                  variants={cardItemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[6px] border border-[#e5f0fa] p-7 sm:p-8 shadow-[0_10px_32px_rgba(10,61,107,0.06)] flex flex-col justify-between relative group"
                >
                  <div>
                    <Quote className="w-8 h-8 text-[#b9dbf7] mb-3" />

                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 mb-3 text-[#f59e0b]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#edf4fb] flex items-center justify-between">
                    <div>
                      <h4 className="text-[16px] font-bold text-brand-navy font-heading">
                        {t.author}
                      </h4>
                      <p className="text-xs text-brand-blue font-semibold font-heading mt-0.5">
                        {t.role}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#eef7ee] text-[#2F9E5C] text-[11px] font-bold font-heading">
                      Verified Admit
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ========================================================
          9. HOW WE GUIDE YOU STEP-BY-STEP (4 Steps with Images Underneath)
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

          {/* 4 Step Cards with images (Exact Previous Font Size) */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch"
          >
            {/* Step 1 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group overflow-hidden"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-extrabold text-sm font-heading grid place-items-center mb-4 shadow-sm">
                  01
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2 leading-snug">
                  Initial Consultation
                </h3>

                <p className="text-[15px] sm:text-[16px] text-brand-text leading-[22px] sm:leading-[24px] font-sans mb-4 min-h-[48px]">
                  Understand your student&apos;s unique personality, academic trajectory, and goals.
                </p>
              </div>

              {/* Step 1 Image */}
              <div className="relative w-full aspect-[16/10] rounded-[5px] overflow-hidden border border-[#dce8f5] bg-white mt-2">
                <Image
                  src="/images/services/College_Admissions_Consulting/Initial_Consultation.png"
                  alt="Initial Consultation discussion"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group overflow-hidden"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-extrabold text-sm font-heading grid place-items-center mb-4 shadow-sm">
                  02
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2 leading-snug">
                  Strategic Assessment &amp; Roadmap
                </h3>

                <p className="text-[15px] sm:text-[16px] text-brand-text leading-[22px] sm:leading-[24px] font-sans mb-4 min-h-[48px]">
                  Diagnostic evaluation of benchmarks and activities to build a customized multi-year plan.
                </p>
              </div>

              {/* Step 2 Image */}
              <div className="relative w-full aspect-[16/10] rounded-[5px] overflow-hidden border border-[#dce8f5] bg-white mt-2">
                <Image
                  src="/images/services/College_Admissions_Consulting/Personalized_Strategy_Planning.png"
                  alt="Personalized Strategy and Planning roadmap"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group overflow-hidden"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-extrabold text-sm font-heading grid place-items-center mb-4 shadow-sm">
                  03
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2 leading-snug">
                  Mentorship &amp; Execution
                </h3>

                <p className="text-[15px] sm:text-[16px] text-brand-text leading-[22px] sm:leading-[24px] font-sans mb-4 min-h-[48px]">
                  Regular 1-on-1 strategy check-ins guiding course rigor, internships, and standardized tests.
                </p>
              </div>

              {/* Step 3 Image */}
              <div className="relative w-full aspect-[16/10] rounded-[5px] overflow-hidden border border-[#dce8f5] bg-white mt-2">
                <Image
                  src="/images/services/College_Admissions_Consulting/Profile_&_Application_Support.png"
                  alt="Profile and Application Support writing assistance"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group overflow-hidden"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-extrabold text-sm font-heading grid place-items-center mb-4 shadow-sm">
                  04
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2 leading-snug">
                  Application Sprint &amp; Submission
                </h3>

                <p className="text-[15px] sm:text-[16px] text-brand-text leading-[22px] sm:leading-[24px] font-sans mb-4 min-h-[48px]">
                  Line-by-line portal execution, reflective essays, and mock interviews for confident submissions.
                </p>
              </div>

              {/* Step 4 Image */}
              <div className="relative w-full aspect-[16/10] rounded-[5px] overflow-hidden border border-[#dce8f5] bg-white mt-2">
                <Image
                  src="/images/services/College_Admissions_Consulting/Final_Review_&_Submission.png"
                  alt="Final Review and Submission confirmation"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          10. WHAT'S INCLUDED IN YOUR ENGAGEMENT (Deliverables)
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
              {[
                "Custom Multi-Year High School Coursework & Milestone Roadmap",
                "Balanced Reach, Target, and Likely College List Architecture",
                "Common App & UC 20-Activity List Engineering with Impact Phrasing",
                "Authentic Personal Statement & Supplemental Essay Coaching",
                "1-on-1 Mock Admissions Interview Preparation & Video Feedback",
                "Comprehensive Parent Updates & Strategic Milestone Check-ins",
              ].map((item) => (
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
          11. QUESTIONS ABOUT COLLEGE ADMISSIONS CONSULTING (FAQ)
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
                Questions About College Admissions Consulting
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans max-w-md mb-6">
                Have more questions about our methodology, pricing, or admissions timelines? Speak directly with our senior counseling team.
              </p>

              <div>
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
          12. RESOURCES TO HELP TEENS & FAMILIES
          ======================================================== */}
      <ServiceResourcesBanner />

      {/* ========================================================
          13. ELEVATED CTA BANNER CARD
              (Make College Admissions Less Stressful and More Successful)
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
              {/* Left Column */}
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>READY TO TAKE THE NEXT STEP?</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Make College Admissions Less Stressful and More Successful
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule a complimentary 30-minute introductory consultation with our senior advisory team to map your student&apos;s personalized roadmap.
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

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
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
