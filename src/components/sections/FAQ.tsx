"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative w-full py-12 sm:py-14 lg:py-18 bg-gradient-to-r from-[#f1f8fd] via-[#e9f4fc] to-[#f2f8fd] overflow-hidden"
      id="faq"
    >
      {/* Decorative Organic Wave & Ambient Backdrops */}
      <div
        className="absolute top-0 left-0 w-[460px] h-[380px] bg-gradient-to-br from-[#e1f1fc]/80 via-[#edf6fd]/40 to-transparent rounded-br-[240px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[420px] h-[340px] bg-gradient-to-tl from-[#e3f2fd]/80 via-[#edf6fe]/40 to-transparent rounded-tl-[220px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating 4-Point Brand Stars in Background (Matching reference) */}
      <div
        className="absolute left-[34%] lg:left-[36%] top-[12%] lg:top-[16%] w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] lg:w-[145px] lg:h-[145px] text-[#7ec2f5] opacity-35 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <BrandStar className="w-full h-full fill-current" />
      </div>
      <div
        className="absolute left-[27%] lg:left-[29%] top-[48%] sm:top-[44%] w-[75px] h-[75px] sm:w-[88px] sm:h-[88px] lg:w-[100px] lg:h-[100px] text-[#7ec2f5] opacity-25 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <BrandStar className="w-full h-full fill-current" />
      </div>

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] xl:grid-cols-[1fr_1.35fr] gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Left Column: Section Title & Kicker */}
          <div className="flex flex-col items-start text-left">
            {/* Pill Kicker with flanking line */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-brand-navy/30 rounded-full" aria-hidden="true" />
            </div>

            {/* Main Heading (Exact font hierarchy maintained) */}
            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-[1.18]">
              Got Questions?
              We&apos;ve Got Answers.
            </h2>
          </div>

          {/* Right Column: Unified Elevated FAQ Card */}
          <div className="bg-white rounded-[5px] border border-[#e2eef9] shadow-[0_14px_38px_rgba(10,61,107,0.08)] overflow-hidden transition-all duration-300">
            <div className="divide-y divide-[#edf3f9]">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={faq.question} className="group transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="w-full text-left cursor-pointer px-5 py-4 sm:px-7 sm:py-5 flex justify-between items-center gap-4 select-none focus:outline-none focus:bg-brand-sky/30 transition-colors"
                      aria-expanded={isOpen}
                    >
                      {/* Question Text */}
                      <span className="text-[13.5px] sm:text-[14.5px] font-bold text-brand-navy font-heading leading-snug group-hover:text-brand-blue transition-colors">
                        {faq.question}
                      </span>

                      {/* Interactive Plus / Rotate Icon */}
                      <span className="flex-shrink-0 text-[#0A3D6B] w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
                        <Plus
                          className={cn(
                            "w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.6] transition-transform duration-300",
                            isOpen
                              ? "rotate-45 text-brand-blue scale-110"
                              : "text-[#0A3D6B] group-hover:text-brand-blue"
                          )}
                        />
                      </span>
                    </button>

                    {/* Collapsible Answer */}
                    {isOpen && (
                      <div className="px-5 sm:px-7 pb-5 pt-1 font-sans animate-in fade-in slide-in-from-top-1 duration-200">
                        <p className="border-t border-brand-border/40 pt-3 text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
