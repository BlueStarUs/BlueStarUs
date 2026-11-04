"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, GraduationCap, User } from "lucide-react";
import { SuccessStory } from "@/types";
import { SUCCESS_STORIES } from "@/lib/stories-data";
import { StoryModal } from "@/components/ui/StoryModal";
import { cn } from "@/lib/utils";

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

export function Testimonials() {
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);

  // Pick top 3 signature testimonials for the home page showcase
  const featuredStories = SUCCESS_STORIES.slice(0, 3);

  return (
    <section
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden"
      id="stories"
    >
      {/* Decorative Organic Wave Shapes in Background */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/60 via-[#edf6fd]/25 to-transparent rounded-br-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[320px] bg-gradient-to-tl from-[#e5f2fc]/60 via-[#eef6fe]/25 to-transparent rounded-tl-[200px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Row: Title & View More Stories Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 sm:mb-12">
          <div>
            {/* Kicker with accent line matching Services Page */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-[5px]" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                STUDENT SUCCESS STORIES
              </span>
            </div>

            {/* Main Title matching Services Page Typography */}
            <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
              Real Students.{" "}
              <span className="text-brand-blue relative inline-block">
                Real Journeys.
                {/* Curved Arc Highlight */}
                <span className="absolute -bottom-2 left-0 right-0 flex justify-center pointer-events-none">
                  <svg
                    className="w-36 sm:w-44 h-2.5 text-[#79bbf0] opacity-85"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 9.5C55 2.5 145 2.5 198 9.5"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h2>
          </div>

          {/* View More Stories Button - strictly rounded-[5px] */}
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#E3F1FC] hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs sm:text-[14px] font-heading transition-all duration-200 shadow-xs flex-shrink-0 group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Story Cards Grid (Modern, Clean Cards with Very Small Image Avatar & Read More Popup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featuredStories.map((story) => {
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
                <div>
                  {/* Top Bar: Category + 5 Stars */}
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

                  {/* Admitted School Badge - strictly rounded-[5px] */}
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
                      {/* Modern Person Icon - strictly rounded-[5px] (40px) */}
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

                      <div className="min-w-0">
                        <div className="text-[13.5px] font-bold text-brand-navy font-heading truncate">
                          {story.name}
                        </div>
                        <div className="text-[11.5px] text-brand-text truncate font-sans">
                          {authorRole}
                        </div>
                      </div>
                    </div>

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
      </div>

      {/* Story Detail Modal */}
      <StoryModal
        story={activeStory}
        isOpen={Boolean(activeStory)}
        onClose={() => setActiveStory(null)}
      />
    </section>
  );
}
