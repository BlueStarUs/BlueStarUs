import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentStoryItem {
  id: string;
  name: string;
  quote: string;
  image: string;
  accent: "blue" | "green";
}

const TESTIMONIALS_DATA: StudentStoryItem[] = [
  {
    id: "aisha",
    name: "Aisha",
    quote: 'The guidance I received helped me stay organized and confident throughout the process."',
    image: "/images/person/person1.png",
    accent: "blue",
  },
  {
    id: "rohan",
    name: "Rohan",
    quote: "'They truly understood my goals and helped me find the right colleges for my profile.'",
    image: "/images/person/person2.png",
    accent: "green",
  },
  {
    id: "maya",
    name: "Maya",
    quote: "'The support with my essay made a huge difference. I felt more confident and prepared.'",
    image: "/images/person/person3.png",
    accent: "blue",
  },
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

export function Testimonials() {
  return (
    <section
      className="relative w-full py-12 sm:py-14 lg:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden"
      id="stories"
    >
      {/* Decorative Organic Wave Shapes in Background (Matching reference) */}
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
        {/* Header Row: Title & View More Stories Pill Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 sm:mb-14">
          <div>
            {/* Pill Kicker with flanking line */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                STUDENT SUCCESS STORIES
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-brand-navy/30 rounded-full" aria-hidden="true" />
            </div>

            {/* Main Title (Exact font hierarchy matching Services & Process) */}
            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[1.2]">
              Real Students.{" "}
              <span className="text-brand-blue relative inline-block">
                Real Journeys.
                {/* Curved Arc Highlight Underneath "Journeys." */}
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
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#E3F1FC] hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs sm:text-[16px] font-heading transition-all duration-200 shadow-sm flex-shrink-0 group"
          >
            <span>View More Stories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Story Cards Grid (Responsive across mobile, tablet, and 1360px viewport) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {TESTIMONIALS_DATA.map((story) => {
            const isBlue = story.accent === "blue";

            return (
              <article
                key={story.id}
                className="relative bg-white rounded-[5px] p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(10,61,107,0.06)] border border-[#e2eef9] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(10,61,107,0.12)] flex flex-row items-stretch gap-3.5 sm:gap-4.5 overflow-hidden group"
              >
                {/* Decorative Top-Right Corner Petal Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden rounded-tr-[5px]">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <path
                      d="M0 0H100V100C100 44.77 55.23 0 0 0Z"
                      fill={isBlue ? "#d8edfd" : "#daf5e5"}
                      opacity={isBlue ? 0.75 : 0.8}
                    />
                  </svg>
                </div>

                {/* Decorative Bottom-Right Corner Petal Accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none overflow-hidden rounded-br-[5px]">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <path
                      d="M100 0V100H0C55.23 100 100 55.23 100 0Z"
                      fill={isBlue ? "#e2f2fd" : "#e3f8ec"}
                      opacity={isBlue ? 0.7 : 0.75}
                    />
                  </svg>
                </div>

                {/* Left: Person Image from public/images/person/ */}
                <div className="relative w-[110px] sm:w-[136px] lg:w-[140px] xl:w-[146px] aspect-[3/4] rounded-[5px] overflow-hidden flex-shrink-0 z-10 shadow-sm border border-[#e8f1fa]">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="(max-width: 640px) 120px, (max-width: 1024px) 150px, 160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Right: Content Area (Quote Icon, Testimonial Text & Name Badge) */}
                <div className="flex-1 flex flex-col justify-between items-start py-1 sm:py-2 z-10 min-w-0">
                  <div>
                    {/* Large Quote Icon */}
                    <QuoteIcon
                      className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 mb-2 flex-shrink-0",
                        isBlue ? "text-[#7ebbf0]" : "text-[#58d492]"
                      )}
                    />

                    {/* Testimonial Quote Text */}
                    <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-navy font-medium font-sans">
                      {story.quote}
                    </p>
                  </div>

                  {/* Name Pill Badge */}
                  <div
                    className={cn(
                      "mt-3 px-4 py-1 rounded-full font-bold text-xs font-heading select-none",
                      isBlue
                        ? "bg-[#E3F1FC] text-brand-blue"
                        : "bg-[#e2f7eb] text-[#1e9e5a]"
                    )}
                  >
                    {story.name}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
