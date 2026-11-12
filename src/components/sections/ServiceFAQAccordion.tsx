"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceFAQAccordionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ServiceFAQAccordion({
  faqs,
  title,
  subtitle,
  className,
}: ServiceFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionCard = (
    <div
      className={cn(
        "bg-white rounded-[5px] border border-[#e2eef9] shadow-[0_14px_38px_rgba(10,61,107,0.08)] overflow-hidden transition-all duration-300",
        !title && className
      )}
    >
      <div className="divide-y divide-[#edf3f9]">
        {faqs.map((faq, index) => {
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
                <span className="text-[14px] sm:text-[15.5px] font-bold text-brand-navy font-heading leading-snug group-hover:text-brand-blue transition-colors">
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
                  <p className="border-t border-brand-border/40 pt-3 text-[14.5px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (title) {
    return (
      <section className={cn("py-12 sm:py-16 lg:py-20 bg-white", className)}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="w-12 h-[3px] bg-brand-blue rounded-full mb-3.5 mx-auto" aria-hidden="true" />
            <h2 className="text-2xl sm:text-[30px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[14.5px] sm:text-[15.5px] text-brand-text font-sans mt-2">
                {subtitle}
              </p>
            )}
          </div>
          <div className="max-w-4xl mx-auto">{accordionCard}</div>
        </div>
      </section>
    );
  }

  return accordionCard;
}
