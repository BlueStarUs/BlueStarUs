"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Laptop,
  GraduationCap,
  BarChart3,
  Users,
  Banknote,
  Plane,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
  image: string;
  href: string;
}

export const SERVICES_PROGRAMS: ProgramItem[] = [
  {
    id: "undergraduate-programs",
    title: "College/Undergraduate Programs",
    description:
      "Explore bachelor's programs, eligibility, and admission processes across top colleges and universities.",
    icon: Laptop,
    accent: "blue",
    image: "/images/services/Undergraduate_Programs.png",
    href: "/services/college-admissions-consulting",
  },
  {
    id: "masters-programs",
    title: "Master's Programs",
    description:
      "Discover master's programs, key entrance requirements, and specializations to advance your academic and career goals.",
    icon: GraduationCap,
    accent: "green",
    image: "/images/services/Masters_Programs.png",
    href: "/services/college-planning",
  },
  {
    id: "college-university-rankings",
    title: "College & University Rankings",
    description:
      "Check the latest rankings, compare colleges, and find the best fit based on your goals and preferences.",
    icon: BarChart3,
    accent: "blue",
    image: "/images/services/College_University_Rankings.png",
    href: "/services/college-planning",
  },
  {
    id: "application-admission-process",
    title: "Application & Admission Process",
    description:
      "Get step-by-step guidance on application timelines, required documents, and key admission tips to maximize your chances.",
    icon: Users,
    accent: "blue",
    image: "/images/services/Application_&_Admission_Process.png",
    href: "/services/application-strategy",
  },
  {
    id: "fees-financial-aid-scholarships",
    title: "Fees & Financial Aid/scholarships",
    description:
      "Learn about tuition fees, financial aid options, scholarships, and other funding resources to make your education more affordable.",
    icon: Banknote,
    accent: "green",
    image: "/images/services/Fees_&_Financial_Aid_Scholarships.png",
    href: "/services/college-planning",
  },
  {
    id: "international-study-options",
    title: "International Study Options",
    description:
      "Explore global education opportunities, application requirements, visa processes, and support for studying at universities abroad.",
    icon: Plane,
    accent: "blue",
    image: "/images/services/International_Study_Options.png",
    href: "/services/college-admissions-consulting",
  },
  {
    id: "career-guidance-support",
    title: "Career Guidance & Support",
    description:
      "Get career planning tips, skill recommendations, and resources to help you build a successful future after your studies.",
    icon: ShieldCheck,
    accent: "green",
    image: "/images/services/Career_Guidance_&_Support.png",
    href: "/services/research-internships",
  },
];

// Motion Variants for Staggered Scroll-In & Scroll-Up Re-triggering
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ServicesProgramsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // GSAP: ScrollTrigger Parallax and Subtle Directional Reaction
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridContainerRef.current) {
        // Subtle scroll parallax for the background ambient shapes
        gsap.to(".gsap-ambient-shape", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          y: (i) => (i % 2 === 0 ? -40 : 40),
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-[#FBFDFF] relative overflow-hidden"
      id="programs"
    >
      {/* Subtle organic background glows (Animated with GSAP ScrollTrigger) */}
      <div
        className="gsap-ambient-shape absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#e3f1fc]/60 via-[#edf6fd]/30 to-transparent rounded-bl-[200px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="gsap-ambient-shape absolute bottom-0 left-0 w-[380px] h-[320px] bg-gradient-to-tr from-[#e5f2fc]/50 via-[#eef6fe]/20 to-transparent rounded-tr-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Animates on both scroll down & scroll up */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-12 h-[3px] bg-brand-blue rounded-full mb-3.5 origin-center"
            aria-hidden="true"
          />
          <h2 className="text-2xl sm:text-[30px] md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-2.5">
            Select a Program to Explore Details
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
            Choose from a wide range of college programs, understand eligibility, compare options, and plan your next step.
          </p>
        </motion.div>

        {/* 3-Column Responsive Grid with Staggered Motion (Animates on both scroll directions) */}
        <motion.div
          ref={gridContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
        >
          {SERVICES_PROGRAMS.map((item) => {
            const Icon = item.icon;
            const isBlue = item.accent === "blue";

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="bg-white rounded-[12px] border border-[#e5eef7] shadow-xs hover:shadow-[0_18px_40px_rgba(10,61,107,0.12)] transition-shadow duration-300 p-5 sm:p-6 flex flex-col justify-between group overflow-hidden relative cursor-default"
              >
                {/* Top-Right Decorative Curve Accent */}
                <div
                  className={cn(
                    "absolute top-0 right-0 w-24 h-24 rounded-bl-[75px] pointer-events-none transition-transform duration-300 group-hover:scale-110",
                    isBlue
                      ? "bg-gradient-to-bl from-[#e8f3fc] to-transparent"
                      : "bg-gradient-to-bl from-[#e3f7eb] to-transparent"
                  )}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Icon Squircle Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className={cn(
                      "w-11 h-11 rounded-[12px] flex items-center justify-center mb-3.5 transition-colors duration-300 shadow-2xs",
                      isBlue
                        ? "bg-[#eaf4fc] text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                        : "bg-[#e3f5ea] text-[#2F9E5C] group-hover:bg-[#2F9E5C] group-hover:text-white"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans mb-4 min-h-[58px]">
                    {item.description}
                  </p>

                  {/* Program Image (From public/images/services) with smooth scale */}
                  <div className="relative w-full aspect-[16/9] rounded-[8px] overflow-hidden mb-4 border border-[#e8f1f9] bg-[#f8fbfe] shadow-2xs">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* View Details Action Button with Hover Micro-Interaction */}
                <div className="relative z-10 pt-1">
                  <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[5px] bg-[#eaf3fc] hover:bg-brand-blue text-brand-blue hover:text-white text-[15px] sm:text-[16px] font-bold font-heading transition-all shadow-2xs group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
