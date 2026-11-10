"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Compass,
  X,
} from "lucide-react";
import { SUCCESS_CYCLES } from "@/lib/successes-data";
import { cn } from "@/lib/utils";

const FILTER_TAGS = [
  "All",
  "Ivy League",
  "UC System",
  "Merit Scholarship",
  "STEM",
  "Business",
  "Art & Design",
  "Elite Privates",
  "Liberal Arts",
];

export function SuccessesListing() {
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [activeTab, setActiveTab] = useState<"admissions" | "summer">("admissions");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get current active cycle data
  const currentCycle = useMemo(() => {
    return SUCCESS_CYCLES.find((c) => c.year === selectedYear) || SUCCESS_CYCLES[0];
  }, [selectedYear]);

  // Filter admissions based on search & tag
  const filteredAdmissions = useMemo(() => {
    return currentCycle.admissions.filter((item) => {
      const matchesTag =
        selectedTag === "All" || (item.tags && item.tags.includes(selectedTag));

      if (!matchesTag) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchInst = item.institution.toLowerCase().includes(q);
      const matchHighlight = (item.highlight || "").toLowerCase().includes(q);
      const matchTag = item.tags?.some((t) => t.toLowerCase().includes(q));

      return matchInst || matchHighlight || matchTag;
    });
  }, [currentCycle, selectedTag, searchQuery]);

  // Filter summer programs based on search
  const filteredSummerPrograms = useMemo(() => {
    if (!currentCycle.summerPrograms) return [];
    if (!searchQuery.trim()) return currentCycle.summerPrograms;

    const q = searchQuery.toLowerCase();
    return currentCycle.summerPrograms.filter(
      (prog) =>
        prog.name.toLowerCase().includes(q) ||
        (prog.highlight || "").toLowerCase().includes(q)
    );
  }, [currentCycle, searchQuery]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("All");
  };

  return (
    <section
      id="cycles-records"
      className="w-full py-8 sm:py-14 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] border-y border-[#e2eef9]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 sm:mb-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase font-heading mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
              <span>Verified Results Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-tight">
              College Admissions & Summer Placements
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[25px] text-brand-text font-sans max-w-2xl mt-1.5">
              Browse Blue Stars students’ college acceptances, full-ride scholarships, and selective summer programs across multiple admissions cycles.
            </p>
          </div>
        </div>

        {/* Admissions Cycle Year Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4 sm:mb-5">
          {SUCCESS_CYCLES.map((cycle) => {
            const isSelected = selectedYear === cycle.year;
            return (
              <button
                key={cycle.year}
                onClick={() => {
                  setSelectedYear(cycle.year);
                  if (
                    activeTab === "summer" &&
                    (!cycle.summerPrograms || cycle.summerPrograms.length === 0)
                  ) {
                    setActiveTab("admissions");
                  }
                }}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-[5px] font-heading text-xs sm:text-[13.5px] font-bold transition-all duration-150 border",
                  isSelected
                    ? "bg-brand-navy text-white border-brand-navy shadow-sm scale-[1.01]"
                    : "bg-white text-brand-navy border-[#e2eef9] hover:bg-[#E3F1FC]/50 hover:text-brand-blue"
                )}
              >
                <span>College {cycle.year}</span>
              </button>
            );
          })}
        </div>

        {/* Active Cycle Context Box & Compact Controls */}
        <div className="bg-white rounded-[5px] border border-[#e2eef9] p-4 sm:p-5 shadow-[0_4px_16px_rgba(10,61,107,0.04)] mb-6">
          {/* Top Row: Cycle Headline + Mode Switcher & Total Count Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-[#e2eef9]">
            <div>
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-blue">
                Admissions Cycle
              </span>
              <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-brand-navy font-heading leading-snug">
                {currentCycle.headline}
              </h3>
            </div>

            {/* Total Badge & Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              {/* Prominent Total Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#E3F1FC] border border-brand-blue/20 text-brand-blue text-xs sm:text-[13px] font-extrabold font-heading">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                <span>
                  {activeTab === "admissions"
                    ? `Total: ${currentCycle.admissions.length} Universities / Colleges`
                    : `Total: ${currentCycle.summerPrograms?.length || 0} Programs`}
                </span>
              </div>

              {/* Mode Switcher */}
              <div className="inline-flex p-1 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab("admissions")}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] text-xs sm:text-[13px] font-heading font-bold transition-all",
                    activeTab === "admissions"
                      ? "bg-brand-blue text-white shadow-xs"
                      : "text-brand-text hover:text-brand-navy"
                  )}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>College Admissions ({currentCycle.admissions.length})</span>
                </button>

                {currentCycle.summerPrograms && currentCycle.summerPrograms.length > 0 && (
                  <button
                    onClick={() => setActiveTab("summer")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] text-xs sm:text-[13px] font-heading font-bold transition-all",
                      activeTab === "summer"
                        ? "bg-brand-blue text-white shadow-xs"
                        : "text-brand-text hover:text-brand-navy"
                    )}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Summer Programs ({currentCycle.summerPrograms.length})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Compact Search & Category Filter Controls */}
          <div className="pt-3 flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3">
            {/* Compact Search Input */}
            <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === "admissions"
                    ? "Search university, scholarship..."
                    : "Search summer program..."
                }
                className="w-full pl-9 pr-8 py-2 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-xs sm:text-[13.5px] font-sans text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-1.5 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-text/50 hover:text-brand-navy"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Category Filter Pills */}
            {activeTab === "admissions" && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
                {FILTER_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "px-3 py-1.5 rounded-[5px] text-xs sm:text-[12.5px] font-heading font-semibold transition-all whitespace-nowrap border",
                      selectedTag === tag
                        ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                        : "bg-[#f8fbfe] text-brand-text border-[#e2eef9] hover:bg-[#E3F1FC]/60 hover:text-brand-navy"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RESULTS GRID: COLLEGE ADMISSIONS */}
        {activeTab === "admissions" && (
          <div>
            {filteredAdmissions.length === 0 ? (
              <div className="bg-white rounded-[5px] border border-[#e2eef9] p-8 text-center shadow-xs">
                <Compass className="w-10 h-10 text-brand-lightBlue mx-auto mb-2 opacity-60" />
                <h4 className="text-base sm:text-lg font-heading font-bold text-brand-navy">
                  No matching university acceptances found
                </h4>
                <p className="text-xs sm:text-sm font-sans text-brand-text max-w-md mx-auto mt-1 mb-3">
                  We couldn’t find any entries matching &ldquo;{searchQuery}&rdquo; in the {selectedYear} cycle.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] bg-brand-navy text-white text-xs sm:text-[13px] font-heading font-semibold hover:bg-brand-darkNavy transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
                {filteredAdmissions.map((item, index) => (
                  <div
                    key={`${item.institution}-${index}`}
                    className="group relative bg-white rounded-[5px] border border-[#e2eef9] hover:border-brand-blue/60 shadow-[0_4px_16px_rgba(10,61,107,0.04)] hover:shadow-[0_12px_28px_rgba(10,61,107,0.10)] hover:-translate-y-0.5 p-3.5 sm:p-4 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Institution Name & Optional Count */}
                      <div className="flex items-start justify-between gap-2.5 mb-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="w-6 h-6 rounded-[5px] bg-[#E3F1FC] flex items-center justify-center flex-shrink-0 mt-0.5 text-brand-blue group-hover:bg-brand-navy group-hover:text-white transition-colors duration-200">
                            <GraduationCap className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="text-[14px] sm:text-[15px] font-heading font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-200 leading-snug break-words">
                            {item.institution}
                          </h4>
                        </div>

                        {item.count && item.count > 1 && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-[5px] bg-[#E3F1FC] text-brand-blue border border-[#0B63B5]/20 text-[11px] sm:text-xs font-heading font-bold">
                            {item.count} Admits
                          </span>
                        )}
                      </div>

                      {/* Special Highlight Ribbon */}
                      {item.highlight && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#e2f7eb] border border-[#2F9E5C]/30 text-[#2F9E5C] text-xs sm:text-[12.5px] font-heading font-semibold leading-tight">
                          <Award className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{item.highlight}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="pt-2.5 border-t border-[#e2eef9]/80 flex items-center gap-1.5 flex-wrap mt-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-[11px] font-sans font-medium text-brand-text"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RESULTS GRID: SELECTIVE SUMMER PROGRAMS */}
        {activeTab === "summer" && (
          <div>
            {filteredSummerPrograms.length === 0 ? (
              <div className="bg-white rounded-[5px] border border-[#e2eef9] p-8 text-center shadow-xs">
                <BookOpen className="w-10 h-10 text-brand-lightBlue mx-auto mb-2 opacity-60" />
                <h4 className="text-base sm:text-lg font-heading font-bold text-brand-navy">
                  No matching summer programs found
                </h4>
                <p className="text-xs sm:text-sm font-sans text-brand-text max-w-md mx-auto mt-1 mb-3">
                  We couldn’t find any summer programs matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] bg-brand-navy text-white text-xs sm:text-[13px] font-heading font-semibold hover:bg-brand-darkNavy transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Search</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
                {filteredSummerPrograms.map((prog, index) => (
                  <div
                    key={`${prog.name}-${index}`}
                    className="group relative bg-white rounded-[5px] border border-[#e2eef9] hover:border-brand-blue/60 shadow-[0_4px_16px_rgba(10,61,107,0.04)] hover:shadow-[0_12px_28px_rgba(10,61,107,0.10)] hover:-translate-y-0.5 p-3.5 sm:p-4 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-2.5 min-w-0 mb-1.5">
                        <div className="w-6 h-6 rounded-[5px] bg-[#e2f7eb] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#2F9E5C] group-hover:bg-[#2F9E5C] group-hover:text-white transition-colors duration-200">
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-[13.5px] sm:text-[14.5px] font-heading font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-200 leading-snug break-words">
                          {prog.name}
                        </h4>
                      </div>

                      {prog.highlight && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-[#E3F1FC] text-brand-blue border border-brand-blue/20 text-[11px] font-heading font-semibold">
                          <Sparkles className="w-3 h-3" />
                          <span>{prog.highlight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
