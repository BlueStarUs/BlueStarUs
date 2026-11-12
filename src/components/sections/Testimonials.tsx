import React from "react";
import Link from "next/link";
import { ArrowRight, Star, GraduationCap, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentStoryItem {
  id: string;
  name: string;
  role: string;
  admittedTo: string;
  quote: string;
  accent: "blue" | "green";
  tags?: string[];
}

const TESTIMONIALS_DATA: StudentStoryItem[] = [
  {
    id: "sandy-los-gatos",
    name: "Sandy",
    role: "Blue Stars Parent • Los Gatos, CA",
    admittedTo: "Harvard, Stanford, UC Berkeley & NYU Stern",
    quote:
      "We have trusted Blue Stars with all three of our children. Our first was admitted to NYU Stern, our second to UC Berkeley, and our third was admitted to both Stanford and Harvard. Each child is completely different, and Blue Stars found the story true to each of them. We are deeply grateful for their guidance throughout each journey.",
    accent: "blue",
    tags: ["All 3 Children", "Ivy & Stanford", "Merit Honors"],
  },
  {
    id: "sharon-washu-ed",
    name: "Sharon",
    role: "Parent of Student Accepted ED",
    admittedTo: "Washington University in St. Louis (ED)",
    quote:
      "Helen has been an absolute gift to our family over the past four years. From the beginning, she respected my daughter’s clarity of purpose and academic direction, supporting her goals rather than trying to reshape her into someone else for the sake of admissions optics.",
    accent: "green",
    tags: ["Early Decision", "Washington University", "First Choice"],
  },
  {
    id: "jeanie-risd-arts",
    name: "Jeanie",
    role: "Blue Stars Student • Palo Alto, CA",
    admittedTo: "Rhode Island School of Design (RISD)",
    quote:
      "When I first started working with Blue Stars, I wasn’t completely sure I wanted to pursue art. She encouraged me to immerse myself in the art world by visiting art museums and listening to podcasts. With Blue Stars’ guidance during the college admissions process, I was admitted into my dream school, RISD!",
    accent: "blue",
    tags: ["RISD Acceptance", "Arts & Portfolio", "Dream School"],
  },
];

export function Testimonials() {
  return (
    <section
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden border-t border-[#e2eef9]"
      id="stories"
    >
      {/* Subtle Ambient Background Gradients */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/50 via-[#edf6fd]/20 to-transparent rounded-br-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[320px] bg-gradient-to-tl from-[#e5f2fc]/50 via-[#eef6fe]/20 to-transparent rounded-tl-[200px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Row: Title & View More Stories Pill Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-8 sm:mb-12">
          <div>
            {/* Pill Kicker */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                STUDENT SUCCESS STORIES
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-brand-navy/30 rounded-full" aria-hidden="true" />
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
              Real Students.{" "}
              <span className="text-brand-blue relative inline-block">
                Real Journeys.
                {/* Curved Arc Highlight Underneath */}
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

          {/* View More Stories Pill Button */}
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#E3F1FC] hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs sm:text-[14px] font-heading transition-all duration-200 shadow-xs flex-shrink-0 group"
          >
            <span>View More Stories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Story Cards Grid (Responsive, Modern, Image-free) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS_DATA.map((story) => {
            const isBlue = story.accent === "blue";

            return (
              <article
                key={story.id}
                className={cn(
                  "relative bg-white rounded-[5px] p-5 sm:p-6 shadow-[0_4px_16px_rgba(10,61,107,0.05)] border border-[#e2eef9] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(10,61,107,0.10)] hover:border-brand-blue/40 flex flex-col justify-between group",
                  "md:max-lg:last:col-span-2 md:max-lg:last:max-w-md md:max-lg:last:mx-auto md:max-lg:last:w-full"
                )}
              >
                {/* Top Section */}
                <div>
                  {/* Top Bar: Admitted Badge & 5 Stars */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#eef5fb]">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-[11.5px] sm:text-xs font-heading font-bold max-w-[70%] truncate">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0 text-brand-blue" />
                      <span className="truncate">{story.admittedTo}</span>
                    </div>

                    {/* 5 Rating Stars */}
                    <div className="flex items-center gap-0.5 flex-shrink-0" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Icon & Text */}
                  <div className="mb-5">
                    <Quote
                      className={cn(
                        "w-6 h-6 mb-2.5",
                        isBlue ? "text-brand-blue/30" : "text-[#2F9E5C]/30"
                      )}
                    />
                    <p className="text-[14px] sm:text-[15px] leading-[23px] sm:leading-[25px] text-brand-navy font-normal font-sans">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>

                  {/* Tags */}
                  {story.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {story.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-[11px] font-sans font-medium text-brand-text"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Section: Author Info & Read Link */}
                <div className="pt-4 border-t border-[#eef5fb] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Monogram Initial Avatar */}
                    <div
                      className={cn(
                        "w-9 h-9 rounded-[5px] flex items-center justify-center font-heading font-extrabold text-sm flex-shrink-0 border",
                        isBlue
                          ? "bg-[#E3F1FC] text-brand-blue border-brand-blue/20"
                          : "bg-[#e2f7eb] text-[#2F9E5C] border-[#2F9E5C]/20"
                      )}
                    >
                      {story.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-[14.5px] sm:text-[15px] font-heading font-bold text-brand-navy leading-tight truncate">
                        {story.name}
                      </h4>
                      <p className="text-[11.5px] sm:text-xs text-brand-text font-sans truncate">
                        {story.role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/stories/${story.id}`}
                    className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-heading font-bold text-brand-blue hover:text-brand-navy transition-colors flex-shrink-0 group/link"
                  >
                    <span>Story</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
