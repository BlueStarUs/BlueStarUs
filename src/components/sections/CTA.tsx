import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { HUBSPOT_CONSULTATION_URL, HUBSPOT_STRATEGY_CONSULTATION_URL } from "@/lib/constants";

export function CTA() {
  return (
    <section
      className="relative w-full bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden mb-0"
      id="consultation"
    >
      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] items-end">
          {/* Left Column: Text & CTA Button */}
          <div className="py-7 sm:py-10 lg:py-12 xl:py-14 z-20 flex flex-col items-start text-left">
            {/* Kicker */}
            <div className="text-[#bfe2fa] text-[11px] sm:text-[12.5px] font-bold tracking-[0.14em] uppercase mb-2 font-heading">
              READY TO TAKE THE NEXT STEP?
            </div>

            {/* Main Title (Identical font hierarchy to preceding sections) */}
            <h2 className="text-xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-white mb-2 sm:mb-2.5 font-heading tracking-tight leading-snug sm:leading-[36px] lg:leading-[42px]">
              Let&apos;s Plan Your Brighter Future Together
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-[15px] sm:text-[16px] leading-relaxed sm:leading-[26px] text-[#d8ebf9] mb-4 sm:mb-6 max-w-2xl font-sans">
              Book a free initial consultation and get personalized guidance for your college journey.
            </p>

            {/* Primary Initial & Strategy Consultation Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Link
                href={HUBSPOT_CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-[8px] bg-white hover:bg-[#f0f7fe] text-brand-navy text-xs sm:text-[14.5px] font-bold font-heading shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
              >
                <span>Book Your Initial Consultation (30 Min)</span>
                <ArrowRight className="w-4 h-4 text-brand-navy shrink-0" />
              </Link>

              <Link
                href={HUBSPOT_STRATEGY_CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-[8px] bg-white/10 hover:bg-white/20 text-white text-xs sm:text-[14.5px] font-bold font-heading border border-white/40 hover:border-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-xs text-center"
              >
                <span>Schedule Strategy Consultation (75 Min)</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: Student Image & Decorative Brand Stars (Grounded on Desktop & Mobile) */}
          <div className="relative w-full flex items-end justify-center lg:justify-end self-end overflow-hidden lg:overflow-visible pt-2 lg:pt-0">
            {/* Unified container for student and stars that scales, grounds at bottom, and stays aligned */}
            <div className="relative w-[210px] sm:w-[260px] md:w-[290px] lg:w-[330px] xl:w-[350px] h-[190px] sm:h-[240px] md:h-[260px] lg:h-[300px] xl:h-[320px] flex items-end justify-center">
              {/* Ambient Radial Soft Glow */}
              <div
                className="absolute inset-0 bg-[#229ae3]/25 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Cyan/Blue 4-point Brand Star (Positioned relative to student) */}
              <div
                className="absolute -left-3 sm:-left-6 top-8 sm:top-12 lg:top-14 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                aria-hidden="true"
              >
                <BrandStar className="w-full h-full fill-current" />
              </div>

              {/* Mint Green 4-point Brand Star (Positioned relative to student) */}
              <div
                className="absolute -right-4 sm:-right-8 top-1 sm:top-2 lg:top-3 w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                aria-hidden="true"
              >
                <BrandStar className="w-full h-full fill-current" />
              </div>

              {/* Student Cutout Image (ready_to_take.png grounded at bottom) */}
              <div className="relative w-full h-full z-10 flex-shrink-0">
                <Image
                  src="/images/teams/dr-amy-morgenstern-cutout.webp"
                  alt="Dr. Amy Morgenstern, founder of Blue Stars Admissions Consulting"
                  fill
                  priority
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 290px, 350px"
                  className="object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
