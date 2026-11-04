"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { FAQ_CATEGORIES, FAQCategoryItem } from "@/lib/resources-data";
import { cn } from "@/lib/utils";

export function FAQKnowledgeBaseListing() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "0-0": true, // open first item by default
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const categories = ["All", ...FAQ_CATEGORIES.map((c) => c.category)];

  // Filter logic
  const filteredCategories = FAQ_CATEGORIES.map((catGroup, groupIdx) => {
    if (selectedCat !== "All" && catGroup.category !== selectedCat) {
      return null;
    }

    const filteredFaqs = catGroup.faqs.filter((faq) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      );
    });

    if (filteredFaqs.length === 0) return null;

    return {
      ...catGroup,
      groupIdx,
      faqs: filteredFaqs,
    };
  }).filter(Boolean) as (FAQCategoryItem & { groupIdx: number })[];

  return (
    <section className="py-12 sm:py-10  bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar & Category Navigation */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
          {/* Search Input Box */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-brand-blue absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. Early Decision, UC PIQ, SAT, financial aid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-[5px] text-sm text-brand-navy border border-[#c4dcfa] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-blue uppercase hover:text-brand-navy"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-[5px] text-xs sm:text-[16px] font-bold font-heading transition-all duration-200 cursor-pointer border",
                    isActive
                      ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                      : "bg-[#f8fbfe] text-brand-navy border-[#e2eef9] hover:bg-brand-sky/60 hover:text-brand-blue"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories and Accordions */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] max-w-xl mx-auto">
            <HelpCircle className="w-12 h-12 text-brand-blue mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-brand-navy font-heading mb-1">
              No matching questions found
            </h3>
            <p className="text-xs text-brand-text mb-4">
              Try searching with different keywords or browse all categories above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("All");
              }}
              className="px-4 py-2 rounded-[5px] text-xs font-bold text-white bg-brand-blue hover:bg-brand-navy"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12 max-w-4xl mx-auto">
            {filteredCategories.map((group) => (
              <div key={group.category} className="space-y-4">
                {/* Category Header */}
                <div className="border-b border-[#e2eef9] pb-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-brand-blue" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy font-heading">
                      {group.category}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-brand-text font-sans">
                    {group.description}
                  </p>
                </div>

                {/* FAQ Accordion Items */}
                <div className="space-y-3">
                  {group.faqs.map((faq, faqIdx) => {
                    const itemKey = `${group.groupIdx}-${faqIdx}`;
                    const isOpen = Boolean(openItems[itemKey]);

                    return (
                      <div
                        key={faqIdx}
                        className={cn(
                          "rounded-[5px] border transition-all duration-200 overflow-hidden",
                          isOpen
                            ? "bg-white border-brand-blue/30 shadow-xs"
                            : "bg-[#f8fbfe] border-[#e2eef9] hover:bg-white hover:border-[#c5defa]"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(itemKey)}
                          aria-expanded={isOpen}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                        >
                          <span className="text-[14.5px] sm:text-[15.5px] font-bold text-brand-navy font-heading leading-snug">
                            {faq.question}
                          </span>
                          <span
                            className={cn(
                              "w-7 h-7 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-transform duration-200",
                              isOpen
                                ? "bg-brand-blue text-white rotate-180"
                                : "bg-brand-sky text-brand-blue"
                            )}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-[14px] sm:text-[14.5px] leading-[23px] sm:leading-[25px] text-brand-text font-sans border-t border-[#edf4fb] pt-3 animate-in fade-in duration-150">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

