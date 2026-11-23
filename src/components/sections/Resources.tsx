import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, CalendarDays, FileEdit, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceArticleItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "green" | "blue";
  href: string;
}

const RESOURCES_DATA: ResourceArticleItem[] = [
  {
    id: "college-admissions-results-2026-blue-stars",
    title: "Harvard, Stanford, CMU, NYU & More: Blue Stars 2026 Admissions Results",
    description: "Explore the standout early and regular decision results, top scholarship awards, and strategic insights.",
    image: "/images/resources/guides/Ivy_League_Top_20_Admissions_Playbook.png",
    icon: GraduationCap,
    accent: "blue",
    href: "/blogs/college-admissions-results-2026-blue-stars",
  },
  {
    id: "cs-job-crisis-future-of-stem-careers-2026",
    title: "The CS Job Crisis: What Parents & Students Must Know About STEM Careers",
    description: "Strategic insights into AI-resistant majors, tech job market shifts, and high-impact undergraduate positioning.",
    image: "/images/services/research-internships/Original_Independent_Research_Capstone.png",
    icon: CalendarDays,
    accent: "green",
    href: "/blogs/cs-job-crisis-future-of-stem-careers-2026",
  },
  {
    id: "demystifying-the-uc-personal-insight-questions",
    title: "Demystifying the University of California Personal Insight Questions",
    description: "A comprehensive guide to answering all 8 UC PIQ prompts, avoiding cliché traps, and highlighting authentic impact.",
    image: "/images/services/essay-guidance/Deep_Dive_Narrative_Brainstorming.png",
    icon: FileEdit,
    accent: "blue",
    href: "/blogs/demystifying-the-uc-personal-insight-questions",
  },
];

export function Resources() {
  return (
    <section
      className="relative w-full py-12 sm:py-14 lg:py-18 bg-white overflow-hidden"
      id="resources"
    >
      {/* Decorative Organic Wave Shapes in Background (Matching reference) */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#faf7f2]/60 via-[#faf7f2]/25 to-transparent rounded-br-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[320px] bg-gradient-to-tl from-[#faf7f2]/60 via-[#faf7f2]/25 to-transparent rounded-tl-[200px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 sm:mb-14">
          <div>
            {/* Pill Kicker with flanking line */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                RESOURCES &amp; INSIGHTS
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-brand-navy/30 rounded-full" aria-hidden="true" />
            </div>

            {/* Main Heading (Exact font hierarchy matching Services, Process, and Testimonials) */}
            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
              Helpful Resources for Your{" "}
              <span className="text-brand-blue relative inline-block">
                Journey
              </span>
            </h2>
          </div>

          {/* View All Articles Pill Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#f5f1ea] hover:bg-brand-ink text-brand-blue hover:text-white font-bold text-xs sm:text-[16px] font-heading transition-all duration-200 shadow-sm flex-shrink-0 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Articles Grid (Responsive across mobile, tablet, and 1360px viewport) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {RESOURCES_DATA.map((article) => {
            const Icon = article.icon;
            const isBlue = article.accent === "blue";

            return (
              <article
                key={article.id}
                className="relative bg-white rounded-[20px] overflow-hidden shadow-[0_1px_3px_rgba(18,48,90,0.05)] border border-[#e9e3d8] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)] flex flex-col group"
              >
                {/* Decorative Bottom-Right Corner Petal Accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none overflow-hidden rounded-br-[20px] z-0">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <path
                      d="M100 0V100H0C55.23 100 100 55.23 100 0Z"
                      fill={isBlue ? "#f3eee5" : "#f3eee5"}
                      opacity="0.85"
                    />
                  </svg>
                </div>

                {/* Top Image Container with Wavy Organic Bottom Edge */}
                <Link href={article.href} className="relative block w-full h-[190px] sm:h-[205px] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wave Divider Between Image and Content Area */}
                  <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                    <svg
                      viewBox="0 0 380 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-8 sm:h-10 block"
                      preserveAspectRatio="none"
                    >
                      {/* Organic colored accent stroke along the wave */}
                      <path
                        d="M0 22C80 34 160 36 240 20C300 9 345 10 380 16"
                        stroke={isBlue ? "#79bbf0" : "#5eead4"}
                        strokeWidth="4"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                      {/* Crisp White Fill transitioning to Card Body */}
                      <path
                        d="M0 22C80 34 160 36 240 20C300 9 345 10 380 16V40H0Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </div>
                </Link>

                {/* Content Area with Floating Squircle Icon */}
                <div className="relative p-6 pt-9 sm:p-7 sm:pt-9 flex-1 flex flex-col justify-between z-10">
                  {/* Floating Squircle Icon Overlapping the Wave */}
                  <div className="absolute -top-7 left-6 z-20">
                    <div
                      className={cn(
                        "w-[52px] h-[52px] rounded-[16px] border-[3px] border-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] grid place-items-center transition-transform duration-300 group-hover:scale-105",
                        isBlue
                          ? "bg-gradient-to-b from-[#faf7f2] to-[#faf7f2]"
                          : "bg-gradient-to-b from-[#faf7f2] to-[#faf7f2]"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6 stroke-[2.2]",
                          isBlue ? "text-brand-blue" : "text-[#2F9E5C]"
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    {/* Article Title */}
                    <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading leading-[1.3] mb-2.5">
                      <Link href={article.href} className="hover:text-brand-blue transition-colors">
                        {article.title}
                      </Link>
                    </h3>

                    {/* Article Description */}
                    <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                      {article.description}
                    </p>
                  </div>

                  {/* Read More Pill Button */}
                  <div>
                    <Link
                      href={article.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-brand-ink hover:bg-brand-blue text-white font-bold text-xs sm:text-[13px] font-heading transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
