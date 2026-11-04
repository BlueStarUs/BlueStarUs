"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Star,
  GraduationCap,
  ArrowRight,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SuccessStory } from "@/types";
import { STORY_CATEGORIES, UNIVERSITY_ACCEPTANCES } from "@/lib/stories-data";
import { StoryModal } from "@/components/ui/StoryModal";
import { cn } from "@/lib/utils";

interface StoriesListingProps {
  initialStories: SuccessStory[];
}

// 4 rows in desktop grid (3 cols = 12), and exactly 6 on mobile as requested
const DESKTOP_ITEMS_PER_PAGE = 12;
const MOBILE_ITEMS_PER_PAGE = 6;

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
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);
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
    <section className="relative w-full py-10 sm:py-14 lg:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
      {/* Decorative Organic Wave Shapes in Background */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/60 via-[#edf6fd]/25 to-transparent rounded-br-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[320px] bg-gradient-to-tl from-[#e5f2fc]/60 via-[#eef6fe]/25 to-transparent rounded-tl-[200px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section Intro & Key Metrics Bar matching Services Page */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[2px] bg-brand-blue rounded-[5px]" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
              TESTIMONIALS &amp; SUCCESS STORIES
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px] mb-3">
                Inspiring Journeys from BlueStars Families &amp; Students
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                Read firsthand accounts of how structured guidance, calm timelines, and authentic storytelling opened doors to the nation’s most competitive universities and merit scholarships.
              </p>
            </div>

            {/* Quick Metrics Cards - Strictly rounded-[5px] */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 flex-shrink-0">
              <div className="p-3 sm:p-3.5 rounded-[5px] bg-white border border-[#e2eef9] text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading">16+</div>
                <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Years Mentoring
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-[5px] bg-white border border-[#e2eef9] text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading">98%</div>
                <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Top-Choice Admits
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-[5px] bg-white border border-[#e2eef9] text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading">5.0★</div>
                <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Family Rating
                </div>
              </div>
              <div className="p-3 sm:p-3.5 rounded-[5px] bg-white border border-[#e2eef9] text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading">100%</div>
                <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Personalized
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anchor for smooth scroll on pagination */}
        <div id="stories-grid-top" className="scroll-mt-24" />

        {/* Filter and Search Controls Bar */}
        <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 sm:p-3 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs">
          {/* Category Tabs - Strictly rounded-[5px] */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {STORY_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-3.5 sm:px-4 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading whitespace-nowrap transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "bg-brand-blue text-white shadow-xs"
                      : "bg-[#f8fbfe] text-brand-navy hover:text-brand-blue hover:bg-brand-sky border border-[#e2eef9]"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Box - Strictly rounded-[5px] */}
          <div className="relative w-full md:w-64 sm:flex-shrink-0">
            <Search className="w-4 h-4 text-brand-text/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, schools..."
              className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-[5px] text-xs sm:text-[13px] bg-[#f8fbfe] border border-[#e2eef9] text-brand-navy placeholder:text-brand-text/50 focus:outline-hidden focus:border-brand-blue focus:bg-white font-sans transition-all"
            />
          </div>
        </div>

        {/* Stories Cards Grid (4 Rows = 12 Cards per Page) */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-[5px] border border-[#e2eef9] shadow-xs">
            <p className="text-base text-brand-navy font-bold font-heading mb-1">
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
              className="px-4 py-2 rounded-[5px] bg-brand-blue text-white text-xs font-bold font-heading hover:bg-brand-darkNavy transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {paginatedStories.map((story) => {
                const isBlue = story.accent !== "green";
                const authorRole =
                  story.authorRole ||
                  story.highSchool ||
                  story.schoolOrRole ||
                  "BlueStars Family";

                return (
                  <article
                    key={story.id}
                    className="relative bg-white rounded-[5px] p-5 sm:p-6 shadow-[0_6px_24px_rgba(10,61,107,0.05)] border border-[#e2eef9] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(10,61,107,0.1)] flex flex-col justify-between group"
                  >
                    {/* Card Header: Category + Admitted School Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {story.category && (
                            <span
                              className={cn(
                                "px-2.5 py-0.5 rounded-[5px] text-[11px] font-bold font-heading tracking-wide uppercase",
                                isBlue
                                  ? "bg-brand-sky text-brand-blue border border-brand-border/60"
                                  : "bg-[#e2f7eb] text-[#1e9e5a] border border-[#c4eed6]"
                              )}
                            >
                              {story.category}
                            </span>
                          )}
                        </div>

                        {/* 5-Star Rating */}
                        <div className="flex items-center gap-0.5" aria-label="5 stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Admitted To Highlight Badge */}
                      {story.admittedTo && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-xs font-bold text-brand-navy font-heading">
                            <GraduationCap className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                            <span className="truncate">{story.admittedTo}</span>
                          </span>
                        </div>
                      )}

                      {/* Headline / Title */}
                      <h3 className="text-base sm:text-[17px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug mb-2.5 group-hover:text-brand-blue transition-colors line-clamp-2">
                        {story.title || "Admissions Consulting Success"}
                      </h3>

                      {/* Quote Preview - Clamped with Ellipsis */}
                      <p className="text-[14px] sm:text-[14.5px] leading-[22px] sm:leading-[24px] text-brand-text font-sans line-clamp-3">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                    </div>

                    {/* Card Bottom: Modern Person Icon + Author Info + Bottom Read More Button */}
                    <div className="mt-5 pt-4 border-t border-[#eef4fa] flex flex-col gap-3.5">
                      {/* Author Info Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Modern Person Icon - strictly rounded-[5px] */}
                          <div
                            className={cn(
                              "w-10 h-10 rounded-[5px] flex items-center justify-center flex-shrink-0 shadow-xs border transition-colors",
                              isBlue
                                ? "bg-gradient-to-br from-[#E3F1FC] to-[#d6ebfb] border-[#c4e0f7] text-brand-blue"
                                : "bg-gradient-to-br from-[#e2f7eb] to-[#d2f3e0] border-[#c0ebd2] text-[#1e9e5a]"
                            )}
                          >
                            <User className="w-5 h-5 stroke-[2.2]" />
                          </div>

                          {/* Author Name and Role */}
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-bold text-brand-navy font-heading truncate">
                              {story.name}
                            </div>
                            <div className="text-[11.5px] text-brand-text truncate font-sans">
                              {authorRole}
                            </div>
                          </div>
                        </div>

                        {/* Tiny Quote Indicator */}
                        <QuoteIcon
                          className={cn(
                            "w-4 h-4 flex-shrink-0 opacity-70",
                            isBlue ? "text-[#7ebbf0]" : "text-[#58d492]"
                          )}
                        />
                      </div>

                      {/* Dedicated Bottom Read Full Story Button - Responsive and Mobile-friendly */}
                      <button
                        type="button"
                        onClick={() => setActiveStory(story)}
                        className={cn(
                          "w-full py-2.5 px-4 rounded-[5px] font-bold text-xs sm:text-[13px] font-heading transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs border",
                          isBlue
                            ? "bg-[#f8fbfe] hover:bg-brand-blue text-brand-navy hover:text-white border-[#e2eef9] hover:border-brand-blue"
                            : "bg-[#f6fcf8] hover:bg-[#1e9e5a] text-brand-navy hover:text-white border-[#d2f3e0] hover:border-[#1e9e5a]"
                        )}
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Modern Pagination Controls - strictly rounded-[5px] & mobile responsive */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs">
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
                      "inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading border transition-colors select-none",
                      currentPage === 1
                        ? "bg-[#f8fbfe] text-brand-text/40 border-[#eef4fa] cursor-not-allowed"
                        : "bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue border-[#e2eef9] cursor-pointer shadow-2xs"
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Mobile Compact Page Indicator */}
                  <div className="flex sm:hidden items-center px-3 py-1.5 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-xs font-bold text-brand-navy font-heading">
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
                            "w-8 h-8 sm:w-9 sm:h-9 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading flex items-center justify-center transition-all cursor-pointer select-none",
                            isActive
                              ? "bg-brand-blue text-white shadow-xs"
                              : "bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue border border-[#e2eef9]"
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
                      "inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading border transition-colors select-none",
                      currentPage === totalPages
                        ? "bg-[#f8fbfe] text-brand-text/40 border-[#eef4fa] cursor-not-allowed"
                        : "bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue border-[#e2eef9] cursor-pointer shadow-2xs"
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
        <div className="mt-14 sm:mt-20 p-6 sm:p-8 lg:p-10 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-[5px] bg-brand-blue" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                PROVEN ADMISSIONS DESTINATIONS
              </span>
            </div>
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-brand-navy font-heading tracking-tight leading-tight mb-2.5">
              Where Our Students Learn &amp; Lead
            </h2>
            <p className="text-sm sm:text-[15px] leading-relaxed text-brand-text font-sans">
              From Ivy League campuses to top-ranked engineering universities and premier art institutes, BlueStars students earn admissions offers at America&apos;s most selective institutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {UNIVERSITY_ACCEPTANCES.map((university) => (
              <div
                key={university}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] bg-[#f8fbfe] hover:bg-brand-sky border border-[#e2eef9] text-xs sm:text-[13px] font-bold font-heading text-brand-navy hover:text-brand-blue shadow-xs transition-colors"
              >
                {university}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Popup Modal for Full Story Data */}
      <StoryModal
        story={activeStory}
        isOpen={Boolean(activeStory)}
        onClose={() => setActiveStory(null)}
      />
    </section>
  );
}
