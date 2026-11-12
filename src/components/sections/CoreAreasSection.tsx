"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Target,
  Lightbulb,
  PenTool,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CoreAreaItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
  href: string;
}

const CORE_AREAS_DATA: CoreAreaItem[] = [
  {
    id: "ignite-passions",
    title: "Identify and ignite passions",
    description:
      "Uncover genuine intellectual curiosities so coursework, capstones, and extracurricular spikes develop naturally.",
    icon: Compass,
    accent: "blue",
    href: "/services/college-planning",
  },
  {
    id: "organized-focused",
    title: "Become more organized and focused",
    description:
      "Cultivate high-level executive functioning, disciplined study systems, and balanced schedules for AP/IB demands.",
    icon: Target,
    accent: "green",
    href: "/services/college-admissions-consulting",
  },
  {
    id: "solve-problems",
    title: "Solve problems on their own",
    description:
      "Foster independent thinking, resilience, and personal initiative so students self-advocate and lead impactful projects.",
    icon: Lightbulb,
    accent: "blue",
    href: "/services/research-internships",
  },
  {
    id: "sharpen-story",
    title: "Sharpen their story and write eloquently",
    description:
      "Socratic narrative coaching that helps teens explore core values, build distinctive voice, and write standout essays.",
    icon: PenTool,
    accent: "green",
    href: "/services/essay-guidance",
  },
  {
    id: "calm-way",
    title: "Become calmer and function effectively",
    description:
      "Embrace 'The Calm Way'—replacing admissions anxiety with clarity, emotional balance, and lifelong healthy habits.",
    icon: ShieldCheck,
    accent: "blue",
    href: "/about",
  },
];

export function CoreAreasSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-[#FBFDFF] via-white to-[#F8FBFE] relative overflow-hidden border-b border-[#e2eef9]",
        className
      )}
      id="core-areas"
    >
      {/* Subtle compact ambient background glows */}
      <div
        className="absolute top-0 right-0 w-[320px] h-[260px] bg-gradient-to-bl from-[#e3f1fc]/50 via-transparent to-transparent rounded-bl-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[280px] h-[220px] bg-gradient-to-tr from-[#e5f2fc]/40 via-transparent to-transparent rounded-tr-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Section Header with Exact Font Matching */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase font-heading mb-2.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>WHOLE-STUDENT MENTORSHIP</span>
          </div>

          <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px] mb-2.5">
            Core Areas We Focus On
          </h2>

          <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans max-w-2xl">
            Admissions consulting should build confidence, not frenzy. We mentor teens across five foundational dimensions that pave the way to top colleges and meaningful lives.
          </p>
        </div>

        {/* 5-Column Modern & Compact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-5 items-stretch">
          {CORE_AREAS_DATA.map((item, idx) => {
            const Icon = item.icon;
            const isBlue = item.accent === "blue";

            return (
              <Link
                key={item.id}
                href={item.href}
                className="bg-white rounded-[5px] border border-[#e5eef7] shadow-xs hover:shadow-[0_14px_32px_rgba(10,61,107,0.1)] hover:-translate-y-1 transition-all duration-300 p-5 sm:p-5.5 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Color Accent Line on Hover */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-[2.5px] transition-all duration-300 opacity-60 group-hover:opacity-100",
                    isBlue ? "bg-brand-blue" : "bg-[#2F9E5C]"
                  )}
                  aria-hidden="true"
                />

                {/* Card Top: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-2.5 mb-4">
                    <span className="text-xs sm:text-[13px] font-bold font-mono px-2 py-0.5 rounded-[4px] bg-[#f0f6fc] text-brand-navy/70 border border-[#e2eef9]">
                      0{idx + 1}
                    </span>
                    <div
                      className={cn(
                        "w-10 h-10 rounded-[5px] grid place-items-center transition-all duration-300 group-hover:scale-105 shadow-xs",
                        isBlue
                          ? "bg-[#E3F1FC] text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                          : "bg-[#E3F5EA] text-[#2F9E5C] group-hover:bg-[#2F9E5C] group-hover:text-white"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-[19px] sm:text-[20px] md:text-[21px] lg:text-[22px] font-bold text-brand-navy font-heading leading-snug group-hover:text-brand-blue transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[23px] sm:leading-[25px] text-brand-text font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 mt-4 border-t border-[#edf4fb] flex items-center justify-between text-[14px] sm:text-[15px] font-bold text-brand-blue font-heading">
                  <span>Learn more</span>
                  <div className="w-7 h-7 rounded-full bg-[#E3F1FC] group-hover:bg-brand-blue text-brand-blue group-hover:text-white grid place-items-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
