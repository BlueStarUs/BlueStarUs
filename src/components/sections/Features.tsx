import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WHY_CHOOSE_BENEFITS } from "@/lib/constants";

function BlueCircleCheck({ className = "w-5 h-5 flex-shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#0B63B5" />
      <path
        d="M6 10.2L8.7 12.8L14 7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Features() {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white" id="about">
      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Image with Rounded Corners & Subtle Elevation */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[1.3/1] lg:aspect-[1.28/1] rounded-[5px] overflow-hidden shadow-[0_12px_36px_rgba(10,61,107,0.1)] border border-brand-border/60">
            <Image
              src="/images/sub_images/choose.png"
              alt="Guidance That Puts Your Goals First - BlueStars Admissions Consulting"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-start text-left lg:pl-2">
            {/* Pill Kicker / Subtitle */}
            <div className="text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase text-brand-blue mb-6 font-heading">
              WHY CHOOSE BLUESTARS
            </div>

            {/* Main Heading (Exact font size & hierarchy maintained) */}
            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[1.2] mb-6">
              Guidance That Puts{" "}
              <span className="text-brand-blue block sm:inline">Your Goals First</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8 max-w-xl">
              We take a personalized, student-centric approach to college admissions, focusing on your unique strengths, interests and aspirations.
            </p>

            {/* Benefits Checklist with Custom Blue Circle Checkmark */}
            <ul className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-10 w-full">
              {WHY_CHOOSE_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-[14px] sm:text-[16px] text-brand-navy font-medium font-sans"
                >
                  <BlueCircleCheck className="w-[18px] h-[18px] sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-6 py-3 sm:py-3.5 rounded-[5px] bg-brand-blue hover:bg-brand-navy text-white text-xs sm:text-sm font-semibold font-heading transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
