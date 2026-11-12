"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Compass,
  Award,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProcessStepItem {
  step: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
  ctaText?: string;
  ctaHref?: string;
}

const GET_STARTED_STEPS: ProcessStepItem[] = [
  {
    step: "Step 1",
    stepNumber: "01",
    title: "Book a free 30-min consultation",
    description:
      "Let’s get together and talk about what Blue Stars can do for your teen and family. Meet one of our counselors and get to know us. If it feels right and we’re a good fit, we’ll set up the next step.",
    icon: Calendar,
    accent: "blue",
    ctaText: "Book Free Session",
    ctaHref: HUBSPOT_CONSULTATION_URL,
  },
  {
    step: "Step 2",
    stepNumber: "02",
    title: "Get ready for College Admissions with a strategic plan",
    description:
      "We’ll meet for a 90-min in-depth consultation. Our lead counselor will assess your teen’s career path and create a detailed proposal showcasing their path to successful college admission and beyond.",
    icon: Compass,
    accent: "green",
  },
  {
    step: "Step 3",
    stepNumber: "03",
    title: "Solidify success. The future awaits great people",
    description:
      "Once you accept the proposal, we’ll celebrate our partnership and get started working with a designated counselor just for you and your teen.",
    icon: Award,
    accent: "blue",
  },
  {
    step: "Step 4",
    stepNumber: "04",
    title: "Strategic & aligned for successful admissions applications",
    description:
      "Support. Skills development. Confidence. Self-reliance. Personal development leads the way to a desired college and becoming the leader the world needs your child to be.",
    icon: GraduationCap,
    accent: "green",
  },
];

export function Process() {
  return (
    <section
      className="relative w-full py-14 sm:py-18 lg:py-22 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden border-b border-[#e2eef9]"
      id="planning"
    >
      {/* Decorative Organic Wave Shapes in Background */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/70 via-[#edf6fd]/30 to-transparent rounded-br-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[320px] bg-gradient-to-tl from-[#e5f2fc]/70 via-[#eef6fe]/30 to-transparent rounded-tl-[200px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Centered & Responsive with Services Styling */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="w-12 h-[3px] bg-brand-blue rounded-full mb-3.5 origin-center" aria-hidden="true" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>OUR 4-STEP ADMISSIONS PATHWAY</span>
          </div>

          <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px] mb-3.5">
            Here’s how to get started
          </h2>

          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans max-w-2xl">
            A clear, collaborative, four-step path designed to guide your teen from initial exploration to admission into their dream college and beyond.
          </p>
        </div>

        {/* 4-Step Responsive Cards Grid with Stepper Flow */}
        <div className="relative">
          {/* Subtle Stepper Line Behind Cards (Desktop) */}
          <div
            className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#2A8FD6]/20 via-[#0B63B5]/40 to-[#2F9E5C]/30 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch relative z-10">
            {GET_STARTED_STEPS.map((item, index) => {
              const Icon = item.icon;
              const isBlue = item.accent === "blue";

              return (
                <div
                  key={item.step}
                  className="bg-white rounded-[5px] border border-[#e5eef7] shadow-xs hover:shadow-[0_16px_36px_rgba(10,61,107,0.12)] hover:-translate-y-1.5 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Card Top: Step Badge & Icon */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#E3F1FC] text-brand-blue font-heading font-extrabold text-xs sm:text-[12.5px] uppercase tracking-wider">
                        <span>{item.step}</span>
                      </div>

                      <div
                        className={cn(
                          "w-12 h-12 rounded-[5px] grid place-items-center transition-all duration-300 shadow-xs group-hover:scale-110",
                          isBlue
                            ? "bg-brand-blue text-white"
                            : "bg-[#2F9E5C] text-white"
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Step Title matching Services cards */}
                    <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-3 leading-snug group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h3>

                    {/* Step Description matching Services cards */}
                    <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom: Optional CTA or Progress Marker */}
                  <div className="pt-5 mt-5 border-t border-[#edf4fb] flex items-center justify-between">
                    {item.ctaHref ? (
                      <Link
                        href={item.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[13.5px] sm:text-[14.5px] text-brand-text/80 font-medium font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#2F9E5C]" />
                        <span>Step {index + 1} of 4</span>
                      </div>
                    )}

                    <span className="text-xs font-mono font-bold text-brand-navy/30">
                      {item.stepNumber}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quick Action Banner */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href={HUBSPOT_CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[5px] text-[14.5px] sm:text-[16px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Book Your Free 30-Min Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
