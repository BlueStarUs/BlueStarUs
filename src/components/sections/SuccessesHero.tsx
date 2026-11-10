"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Calendar, GraduationCap } from "lucide-react";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";

export function SuccessesHero() {
  return (
    <section className="relative w-full py-8 sm:py-10 lg:py-12 overflow-hidden flex flex-col justify-center border-b border-[#0d4f7c]">
      {/* Background Campus Scene & Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sub_images/Clean_University_Campus_Background.png"
          alt="Blue Stars Admissions Consulting University Campus Successes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />

        {/* Ambient Dark Navy Brand Overlays for Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#032e54]/95 via-[#073d63]/85 to-[#032e54]/95 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#021f3a]/70 via-transparent to-[#021b33]/80 pointer-events-none"
          aria-hidden="true"
        />

        {/* Soft Radial Center Light */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
        {/* Breadcrumbs */}
        <div className="flex justify-start mb-3">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full text-xs font-sans bg-white/10 backdrop-blur-md border border-white/20 text-[#d0e6f7] shadow-xs">
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
                  Successes & Results
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Centered Hero Content */}
        <div className="flex flex-col items-center justify-center text-center mx-auto max-w-5xl">
          {/* Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase font-heading mb-3 sm:mb-4 shadow-xs">
            <span
              className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"
              aria-hidden="true"
            />
            <span>PROVEN TRACK RECORD OF SUCCESS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold font-heading text-white tracking-tight leading-[1.15] mb-3 sm:mb-4">
            A Proven Track Record of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ec2ff] via-[#86d2ff] to-[#ffffff]">
              College Admissions Success
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg font-sans text-[#cfe6fa] leading-relaxed max-w-3xl mb-6 sm:mb-8">
            Year after year, we have helped our students achieve their dreams and get into their desired schools. Here are some of our student’s successes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <a
              href={HUBSPOT_CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-gradient-to-r from-[#0B63B5] to-[#2A8FD6] hover:from-[#095296] hover:to-[#1b7ec5] text-white font-heading font-semibold text-sm sm:text-base shadow-md transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Free Consultation</span>
            </a>

            <a
              href="#cycles-records"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[5px] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-heading font-medium text-sm sm:text-base transition-all duration-200"
            >
              <GraduationCap className="w-4 h-4 text-[#79c3f7]" />
              <span>Explore Yearly Acceptances</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

