"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceFAQAccordionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function ServiceFAQAccordion({ faqs }: ServiceFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-[5px]  border border-[#e2eef9] shadow-[0_14px_38px_rgba(10,61,107,0.08)] overflow-hidden transition-all duration-300">
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
}

