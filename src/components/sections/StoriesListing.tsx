"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  GraduationCap,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SuccessStory } from "@/types";
import { STORY_CATEGORIES, UNIVERSITY_ACCEPTANCES } from "@/lib/stories-data";
import { Constellation } from "@/components/ui/Constellation";
import { cn } from "@/lib/utils";

interface StoriesListingProps {
  initialStories: SuccessStory[];
}

// 4 rows in desktop grid (3 cols = 12), and exactly 6 on mobile as requested
const DESKTOP_ITEMS_PER_PAGE = 12;
const MOBILE_ITEMS_PER_PAGE = 6;

const METRICS = [
  { value: "16+", label: "Years mentoring" },
  { value: "Top 20", label: "& UC admits" },
  { value: "55+", label: "Success stories" },
  { value: "100%", label: "Personalized" },
];

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 12.5C0 5.6 4.4 1.2 9.5 0L10.8 2.8C7.5 3.8 5.6 6.2 5.2 8.8C6.3 8.3 7.6 8.2 8.8 8.8C10.7 9.8 11.8 11.8 11.5 14C11.1 16.8 8.8 19 6 19C2.7 19 0 16.1 0 12.5ZM12.5 12.5C12.5 5.6 16.9 1.2 22 0L23.3 2.8C20 3.8 18.1 6.2 17.7 8.8C18.8 8.3 20.1 8.2 21.3 8.8C23.2 9.8 24.3 11.8 24 14C23.6 16.8 21.3 19 18.5 19C15.2 19 12.5 16.1 12.5 12.5Z" />
    </svg>
  );
}

export function StoriesListing({ initialStories }: StoriesListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Stories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile viewport (< 768px) to show 6 cards per page
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE;

  // Filter stories based on selected category and search input
  const filteredStories = useMemo(() => {
    return initialStories.filter((story) => {
      const matchesCategory =
        selectedCategory === "All Stories" || story.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = story.name.toLowerCase().includes(q);
      const matchTitle = (story.title || "").toLowerCase().includes(q);
      const matchQuote = story.quote.toLowerCase().includes(q);
      const matchAdmitted = (story.admittedTo || "").toLowerCase().includes(q);
      const matchRole = (story.authorRole || "").toLowerCase().includes(q);

      return matchName || matchTitle || matchQuote || matchAdmitted || matchRole;
    });
  }, [initialStories, selectedCategory, searchQuery]);

  // Reset pagination to page 1 when category, search, or mobile layout changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, isMobile]);

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredStories.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStories.length);
  const paginatedStories = filteredStories.slice(startIndex, endIndex);

  // Clamp current page if outside range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Scroll smoothly back to top of grid when page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const gridElem = document.getElementById("stories-grid-top");
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-22 bg-brand-ivory overflow-hidden">
      <div className="absolute -top-6 left-0 w-[420px] h-[300px] text-brand-blue opacity-[0.07] pointer-events-none" aria-hidden="true">
        <Constellation variant={4} />
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Intro & key figures */}
        <div className="mb-12 sm:mb-14">
          <p className="inline-flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4 font-sans">
            <span className="h-px w-8 bg-brand-blue" aria-hidden="true" />
            Testimonials &amp; success stories
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-end">
            <div>
              <h2 className="text-[30px] sm:text-[40px] leading-[1.1] text-brand-ink mb-5">
                Inspiring Journeys from Blue Stars Families &amp; Students
              </h2>
              <p className="text-[16px] leading-[1.7] text-[#5b6472] max-w-[560px]">
                Read firsthand accounts of how structured guidance, calm timelines, and authentic storytelling opened doors to the nation&rsquo;s most competitive universities and merit scholarships.
              </p>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 items-start lg:border-l lg:border-[#e3dccf] lg:pl-10">
              {METRICS.map((m) => (
                <li key={m.label}>
                  <span className="block whitespace-nowrap font-display text-[32px] sm:text-[34px] leading-none text-brand-blue">{m.value}</span>
                  <span className="block mt-2 text-[12.5px] leading-snug text-[#5b6472] whitespace-nowrap">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Anchor for smooth scroll on pagination */}
        <div id="stories-grid-top" className="scroll-mt-24" />

        {/* Filter and search controls */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {STORY_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isSelected}
                  className={cn(
                    "px-4 sm:px-5 py-2 rounded-full text-[12.5px] sm:text-[13px] font-semibold font-sans whitespace-nowrap transition-colors duration-200 cursor-pointer flex-shrink-0",
                    isSelected
                      ? "bg-brand-ink text-white"
                      : "bg-white text-brand-ink/80 hover:text-brand-ink hover:border-brand-ink/40 border border-[#e3dccf]"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72 md:flex-shrink-0">
            <Search className="w-4 h-4 text-brand-text/60 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, schools..."
              aria-label="Search stories and schools"
              className="w-full pl-11 pr-4 py-3 rounded-full text-[13px] bg-white border border-[#e3dccf] text-brand-ink placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue font-sans transition-all"
            />
          </div>
        </div>

        {/* Stories Cards Grid (4 Rows = 12 Cards per Page) */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-[22px] border border-[#ece6db]">
            <p className="font-display text-[22px] text-brand-ink mb-1">
              No matching stories found
            </p>
            <p className="text-sm text-brand-text font-sans mb-4">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All Stories");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-brand-ink text-white text-[13px] font-semibold hover:bg-brand-blue transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {paginatedStories.map((story) => {
                const authorRole =
                  story.authorRole ||
                  story.highSchool ||
                  story.schoolOrRole ||
                  "Blue Stars Family";
                const initial = story.name.trim().charAt(0).toUpperCase() || "B";

                return (
                  <article
                    key={story.id}
                    className="group relative flex flex-col justify-between rounded-[20px] bg-white border border-[#ece6db] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(18,48,90,0.12)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <QuoteIcon className="w-7 h-6 text-brand-mint flex-shrink-0" />
                        <div className="flex items-center gap-0.5 pt-1" aria-label="5 stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                          ))}
                        </div>
                      </div>

                      {story.category && (
                        <p className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-brand-blue mb-2.5 font-sans">
                          {story.category}
                        </p>
                      )}

                      <h3 className="font-display text-[21px] sm:text-[22px] !font-medium leading-[1.25] text-brand-ink mb-3 group-hover:text-brand-blue transition-colors line-clamp-3">
                        <Link href={`/stories/${story.id}`}>{story.title || "Admissions Consulting Success"}</Link>
                      </h3>

                      <p className="font-display italic text-[15.5px] leading-[1.65] text-[#4a5568] line-clamp-4">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6">
                      {story.admittedTo && (
                        <span className="mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full bg-brand-ivory border border-[#ece6db] px-3 py-1.5 text-[12px] font-semibold text-brand-ink font-sans">
                          <GraduationCap className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" aria-hidden="true" />
                          <span className="truncate">{story.admittedTo}</span>
                        </span>
                      )}

                      <div className="pt-5 border-t border-[#ece6db] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-10 h-10 rounded-full bg-brand-ink text-white grid place-items-center flex-shrink-0 font-display text-[18px]"
                            aria-hidden="true"
                          >
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[14.5px] font-semibold text-brand-ink font-sans truncate">{story.name}</div>
                            <div className="text-[12.5px] leading-snug text-[#6b7280] truncate font-sans">{authorRole}</div>
                          </div>
                        </div>

                        <Link
                          href={`/stories/${story.id}`}
                          className="inline-flex items-center gap-1 flex-shrink-0 text-[12.5px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[5px] hover:text-brand-blue font-sans"
                          aria-label={`Read full story: ${story.title || story.name}`}
                        >
                          <span>Read story</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Modern Pagination Controls - strictly rounded-[5px] & mobile responsive */}
            {totalPages > 1 && (
              <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e3dccf]">
                {/* Result Counter Info */}
                <div className="text-xs sm:text-[13px] font-sans text-brand-text order-2 sm:order-1 text-center sm:text-left">
                  Showing <span className="font-bold text-brand-navy">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-brand-navy">{endIndex}</span> of{" "}
                  <span className="font-bold text-brand-navy">{filteredStories.length}</span> stories
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
                  {/* Previous Page Button */}
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={cn(
                      "inline-flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-semibold font-sans border transition-colors select-none",
                      currentPage === 1
                        ? "bg-white text-brand-text/40 border-[#ece6db] cursor-not-allowed"
                        : "bg-white hover:bg-brand-ink text-brand-ink hover:text-white border-[#e3dccf] cursor-pointer"
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Mobile Compact Page Indicator */}
                  <div className="flex sm:hidden items-center px-4 py-2 rounded-full bg-white border border-[#e3dccf] text-[13px] font-semibold text-brand-ink font-sans">
                    <span>{currentPage} / {totalPages}</span>
                  </div>

                  {/* Desktop & Tablet Numbered Page Buttons */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={cn(
                            "w-9 h-9 rounded-full text-[13px] font-semibold font-sans flex items-center justify-center transition-colors cursor-pointer select-none",
                            isActive
                              ? "bg-brand-ink text-white"
                              : "bg-white text-brand-ink border border-[#e3dccf] hover:border-brand-ink/50"
                          )}
                          aria-current={isActive ? "page" : undefined}
                          aria-label={`Page ${pageNum}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={cn(
                      "inline-flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-semibold font-sans border transition-colors select-none",
                      currentPage === totalPages
                        ? "bg-white text-brand-text/40 border-[#ece6db] cursor-not-allowed"
                        : "bg-white hover:bg-brand-ink text-brand-ink hover:text-white border-[#e3dccf] cursor-pointer"
                    )}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* University Acceptances Wall - Strictly rounded-[5px] */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-[22px] bg-white border border-[#ece6db]">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4 font-sans">
              Proven admissions destinations
            </p>
            <h2 className="text-[28px] sm:text-[36px] leading-[1.12] text-brand-ink mb-4">
              Where Our Students Learn &amp; Lead
            </h2>
            <p className="text-[15px] leading-[1.7] text-[#5b6472] font-sans">
              From Ivy League campuses to top-ranked engineering universities and premier art institutes, Blue Stars students earn admissions offers at America&apos;s most selective institutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {UNIVERSITY_ACCEPTANCES.map((university) => (
              <div
                key={university}
                className="px-4 py-2 rounded-full bg-brand-ivory hover:bg-white border border-[#ece6db] text-[13px] font-medium font-sans text-brand-ink hover:border-brand-blue/40 transition-colors"
              >
                {university}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
