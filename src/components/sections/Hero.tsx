import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  GraduationCapHeroIcon,
  TeamGroupHeroIcon,
  GrowthChartHeroIcon,
  HeroUsersIcon,
  HeroDocIcon,
  HeroHeartIcon,
} from "@/components/ui/Icons";

export function Hero() {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-[#f3f9ff] via-[#f8fbff] to-white overflow-hidden"
      id="home"
    >
      {/* Subtle modern ambient background glow */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[420px] bg-brand-sky/60 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"
        aria-hidden="true"
      />

      {/* Full-width responsive 2-column grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center min-h-[480px] lg:min-h-[520px] xl:min-h-[560px]">
        {/* Left Text Column: Increased font sizes with fluid responsive scaling */}
        <div className="w-full flex justify-center lg:justify-end py-8 sm:py-10 lg:py-12 xl:py-14 px-5 sm:px-8 lg:px-0 z-10">
          <div className="w-full max-w-[560px] lg:max-w-[580px] xl:max-w-[600px] lg:mr-6 xl:mr-14 2xl:mr-20 lg:pl-6">
            {/* Kicker */}
            <div className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue mb-2.5 sm:mb-3 font-heading">
              EXPERT GUIDANCE. BRIGHTER OPPORTUNITIES.
            </div>

            {/* Main Heading (Increased text size) */}
            <h1 className="text-[32px] xs:text-[36px] sm:text-[42px] md:text-[46px] lg:text-[48px] xl:text-[54px] 2xl:text-[58px] font-extrabold text-brand-navy mb-4 sm:mb-5 tracking-tight leading-[1.1] font-heading">
              Your Future Starts<br className="hidden sm:inline" />{" "}
              With the Right<br className="hidden sm:inline" />{" "}
              College Plan
            </h1>

            {/* Description (Increased text size) */}
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text mb-6 sm:mb-7 font-sans max-w-[480px]">
              Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 mb-7 sm:mb-8">
              <Button
                variant="primary"
                size="md"
                href="/#contact"
                className="shadow-[0_4px_14px_rgba(11,99,181,0.24)] hover:shadow-[0_8px_20px_rgba(11,99,181,0.34)] hover:-translate-y-0.5 transition-all duration-200 font-heading font-semibold text-xs sm:text-sm py-3 px-6 justify-center"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/#services"
                className="font-heading font-semibold text-xs sm:text-sm py-3 px-6 hover:bg-brand-sky/60 hover:-translate-y-0.5 transition-all duration-200 justify-center"
              >
                Explore Our Services
              </Button>
            </div>

            {/* Feature Highlights Row (Increased text & icon sizes) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-5 sm:gap-7 lg:gap-8 pt-4 sm:pt-5 border-t border-brand-border/60">
              <div className="flex items-center gap-2.5 text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-bold text-brand-navy leading-snug font-heading group">
                <HeroUsersIcon className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] flex-shrink-0 transition-transform group-hover:scale-105" />
                <span>
                  Personalized
                  <br />
                  Guidance
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-bold text-brand-navy leading-snug font-heading group">
                <HeroDocIcon className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] flex-shrink-0 transition-transform group-hover:scale-105" />
                <span>
                  Clear Application
                  <br />
                  Strategy
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-bold text-brand-navy leading-snug font-heading group">
                <HeroHeartIcon className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] flex-shrink-0 transition-transform group-hover:scale-105" />
                <span>
                  Support at
                  <br />
                  Every Step
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Width Hero Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[480px]">
          <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]">
            <Image
              src="/images/sub_images/Students_hero.png"
              alt="Smiling college students collaborating together on university campus"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center hero-img-mask"
            />
            {/* Seamless gradient fade on left edge for desktop */}
            <div
              className="absolute inset-y-0 left-0 w-24 sm:w-32 lg:w-44 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10 hidden sm:block"
              aria-hidden="true"
            />
            {/* Seamless gradient fade on top edge for mobile */}
            <div
              className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none z-10 sm:hidden"
              aria-hidden="true"
            />
          </div>

          {/* Floating Glassmorphic Card Above Image */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 lg:right-8 bottom-3 sm:bottom-6 z-20 w-[98%] sm:w-auto max-w-[650px]">
            <div className="bg-white/95 backdrop-blur-md rounded-[5px] shadow-[0_10px_30px_rgba(10,61,107,0.12)] border border-[#e2edf7] px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between sm:justify-start gap-0 transition-transform duration-200 hover:-translate-y-0.5">
              {/* Column 1: Personalized Guidance */}
              <div className="flex-1 sm:flex-initial flex flex-col items-center text-center px-2 sm:px-3.5">
                <GraduationCapHeroIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 transition-transform group-hover:scale-105" />
                <span className="text-[10px] sm:text-[11px] font-bold text-brand-navy font-heading leading-tight whitespace-nowrap">
                  Personalized
                  <br />
                  Guidance
                </span>
              </div>

              {/* Divider 1 */}
              <div className="w-px h-8 sm:h-9 bg-[#e2edf7] self-center flex-shrink-0" aria-hidden="true" />

              {/* Column 2: Holistic Approach */}
              <div className="flex-1 sm:flex-initial flex flex-col items-center text-center px-2 sm:px-3.5">
                <TeamGroupHeroIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 transition-transform group-hover:scale-105" />
                <span className="text-[10px] sm:text-[11px] font-bold text-brand-navy font-heading leading-tight whitespace-nowrap">
                  Holistic
                  <br />
                  Approach
                </span>
              </div>

              {/* Divider 2 */}
              <div className="w-px h-8 sm:h-9 bg-[#e2edf7] self-center flex-shrink-0" aria-hidden="true" />

              {/* Column 3: Student-Centric Support */}
              <div className="flex-1 sm:flex-initial flex flex-col items-center text-center px-2 sm:px-3.5">
                <GrowthChartHeroIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 transition-transform group-hover:scale-105" />
                <span className="text-[10px] sm:text-[11px] font-bold text-brand-navy font-heading leading-tight whitespace-nowrap">
                  Student-Centric
                  <br />
                  Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
