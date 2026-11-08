"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function StoriesHero() {
  return (
    <section className="relative w-full py-5 sm:py-7 lg:py-8 overflow-hidden flex flex-col justify-center border-b border-[#0d4f7c]">
      {/* Background Generated College Campus & Academic Scene */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stories/hero_success_stories_bg.jpg"
          alt="Student Success Stories - Blue Stars Admissions Consulting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />

        {/* Ambient Dark Azure Gradient Overlays for Readability & High Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#032e54]/85 via-[#073d63]/65 to-[#032e54]/85 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#021f3a]/55 via-transparent to-[#021b33]/65 pointer-events-none"
          aria-hidden="true"
        />

        {/* Soft Radial Center Light */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[240px] bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
        {/* Row 1: Breadcrumbs (Aligned to Left) */}
        <div className="flex justify-start mb-2.5 sm:mb-3">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-xs sm:text-[12px] font-sans bg-white/10 backdrop-blur-md border border-white/20 text-[#d0e6f7] shadow-xs">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-medium text-[#bfe2fa] hover:text-white transition-colors"
                >
                  <Home className="w-3.5 h-3.5 text-[#79c3f7]" />
                  <span>Home</span>
                </Link>
              </li>

              <li className="inline-flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3 h-3 text-[#79c3f7]/70 flex-shrink-0" />
                <span className="font-bold font-heading text-white">
                  Success Stories
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Row 2: Hero Centered Content */}
        <div className="flex flex-col items-center justify-center text-center mx-auto max-w-4xl px-2">
          {/* Kicker / Sub-badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[10.5px] sm:text-xs font-bold tracking-[0.16em] uppercase font-heading mb-2 sm:mb-2.5 shadow-xs">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"
              aria-hidden="true"
            />
            <span>REAL STUDENT JOURNEYS</span>
          </div>

          {/* Main Title with Yellow Artistic Underline Accent */}
          <h1 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-white font-heading tracking-tight leading-[30px] sm:leading-[38px] lg:leading-[44px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            Student Success Stories &amp; Acceptance{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">Outcomes</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-[8px] text-[#fbbf24] overflow-visible pointer-events-none"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C28 2 72 2 98 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[22px] sm:leading-[25px] font-sans text-[#d8ebf9] mt-2 sm:mt-2.5 max-w-2xl text-center mx-auto drop-shadow-xs">
            Explore real stories from Blue Stars students — their journeys, strategies, and acceptance results at top universities, with insights you can learn from.
          </p>

          {/* Carousel Indicator Dots */}
          <div
            className="flex items-center justify-center gap-2 mt-3.5 sm:mt-4"
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
