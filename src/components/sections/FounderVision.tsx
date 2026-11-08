"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Sparkles, Compass, Target, BarChart3, HeartHandshake } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";

export function FounderVision() {
  return (
    <section className="py-14 sm:py-18 lg:py-22 bg-gradient-to-b from-[#f4f9fd] via-white to-[#f4f9fd] border-y border-[#dbe7f3] relative overflow-hidden" id="founder">
      {/* Ambient Radial Brand Glows */}
      <div
        className="absolute top-10 right-0 w-[420px] h-[360px] bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-[380px] h-[320px] bg-[#2ba3ea]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill Kicker */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
              BOUTIQUE ADMISSIONS EXCELLENCE
            </span>
            <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[40px] lg:leading-[46px] mb-3">
            A Boutique Philosophy:{" "}
            <span className="text-brand-blue">Dr. Amy Morgenstern&apos;s Vision</span>
          </h2>

          {/* Brand Statement Banner */}
          <div className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-[#E8F3FC] border border-[#bfe0f7] text-[#07466F] text-xs sm:text-[13.5px] font-extrabold font-heading tracking-wide shadow-xs mt-1">
            <span className="text-brand-blue">Personalized.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A8FD6]" aria-hidden="true" />
            <span className="text-brand-navy">Data Driven.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A8FD6]" aria-hidden="true" />
            <span className="text-[#2F9E5C]">Results Oriented.</span>
          </div>
        </div>

        {/* 2-Column Founder Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Founder Photo & Credentials Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[420px] mx-auto lg:mx-0">
              {/* Decorative Brand Frame Background */}
              <div
                className="absolute -top-3 -left-3 w-full h-full rounded-[12px] bg-gradient-to-br from-[#0B63B5]/20 via-[#0A3D6B]/15 to-transparent -z-10 transform -rotate-1 sm:-rotate-2"
                aria-hidden="true"
              />

              {/* Main Photo Card */}
              <div className="relative rounded-[6px] bg-white border border-[#dbe7f3] shadow-[0_20px_48px_rgba(10,61,107,0.12)] overflow-hidden">
                <div className="relative aspect-square w-full bg-slate-100">
                  <Image
                    src="/images/teams/Dr_Amy_Morgenstern.png"
                    alt="Dr. Amy Morgenstern - Founder & CEO of Blue Stars Admissions Consulting"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Brand Star */}
                  <div
                    className="absolute top-3 right-3 w-8 h-8 text-[#3bd386] opacity-90 drop-shadow-md pointer-events-none"
                    aria-hidden="true"
                  >
                    <BrandStar className="w-full h-full fill-current" />
                  </div>

                  {/* Glassmorphism Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[6px] bg-[#07466f]/90 backdrop-blur-md text-white border border-white/20">
                    <div className="text-sm sm:text-base font-extrabold font-heading">
                      Dr. Amy Morgenstern
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-[#79c3f7] font-heading mt-0.5">
                      Founder &amp; CEO, Blue Stars Admissions Consulting
                    </div>
                  </div>
                </div>

                {/* Sub-Card Badges */}
                <div className="p-4 sm:p-5 bg-white border-t border-[#edf4fb] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-brand-sky text-brand-blue flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-brand-navy font-heading">Ph.D. &amp; MFA</div>
                      <div className="text-[11px] text-brand-text font-sans">Former University Faculty</div>
                    </div>
                  </div>

                  <div className="h-7 w-[1px] bg-[#dbe7f3]" aria-hidden="true" />

                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#e3f5ea] text-[#2F9E5C] flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-brand-navy font-heading">16+ Years</div>
                      <div className="text-[11px] text-brand-text font-sans">Boutique Leadership</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vision & Narrative */}
          <div className="lg:col-span-8 flex flex-col items-start text-left gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-brand-sky border border-brand-border text-brand-blue text-[11px] sm:text-xs font-bold tracking-wider uppercase font-heading mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>THE BLUE STARS BOUTIQUE COMMITMENT</span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-[28px] font-extrabold text-brand-navy font-heading tracking-tight leading-[28px] sm:leading-[34px] md:leading-[38px] mb-4">
              We Never Treat Students Like Numbers on an Assembly Line
            </h3>

            {/* Founder Quote */}
            <blockquote className="relative p-5 sm:p-6 rounded-[8px] bg-white border-l-4 border-brand-blue border border-[#e2eef9] shadow-[0_6px_20px_rgba(10,61,107,0.05)] mb-6 text-brand-navy">
              <p className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] font-sans italic text-brand-navy/90">
                &ldquo;We intentionally founded Blue Stars as a boutique admissions firm. Unlike commercial agencies that churn out hundreds of formulaic applications, our senior team limits our student cohort to mentor each teenager with deep Socratic inquiry, institutional data, and unwavering personal care.&rdquo;
              </p>
              <footer className="mt-3 flex items-center gap-2 text-xs font-bold text-brand-blue font-heading not-italic">
                <span>— Dr. Amy Morgenstern (&ldquo;Dr. M&rdquo;)</span>
              </footer>
            </blockquote>

            {/* 3 Core Pillars: Personalized, Data Driven, Results Oriented */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-7">
              {/* Pillar 1 */}
              <div className="p-4 rounded-[6px] bg-white border border-[#e2eef9] shadow-xs">
                <div className="w-12 h-12 rounded-[5px] bg-brand-sky text-brand-blue flex items-center justify-center mb-2.5">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div className="text-[16.5px] sm:text-[17.5px]  font-extrabold text-brand-navy font-heading mb-1">
                  Personalized
                </div>
                <div className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] font-sans">
                  Custom Socratic coaching uncovering each student&apos;s genuine intellectual spark.
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-[6px] bg-white border border-[#e2eef9] shadow-xs">
                <div className="w-12 h-12 rounded-[5px] bg-[#eef7ff] text-[#07466F] flex items-center justify-center mb-2.5">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="text-[16.5px] sm:text-[17.5px]  font-extrabold text-brand-navy font-heading mb-1">
                  Data Drivenc
                </div>
                <div className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] text-brand-text leading-[18px] font-sans">
                  Deep admissions committee analytics and holistic scoring rubrics across top-tier colleges.
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-[6px] bg-white border border-[#e2eef9] shadow-xs">
                <div className="w-12 h-12 rounded-[5px] bg-[#e3f5ea] text-[#2F9E5C] flex items-center justify-center mb-2.5">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-[16.5px] sm:text-[17.5px] font-extrabold text-brand-navy font-heading mb-1">
                  Results Oriented
                </div>
                <div className="text-[15px] sm:text-[16px] leading-[25px] sm:leading-[27px] text-brand-text leading-[18px] font-sans">
                  98% top-choice college acceptance and $14M+ in merit scholarships won.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Book a Free 30 Minute Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link> 
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-brand-navy border border-brand-border bg-white hover:bg-[#f0f7fe] transition-all duration-200"
              >
                <span>Learn More About Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
