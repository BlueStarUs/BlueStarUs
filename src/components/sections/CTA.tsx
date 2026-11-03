import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";

export function CTA() {
  return (
    <section
      className="relative w-full bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden"
      id="consultation"
    >
      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center min-h-[250px] lg:min-h-[270px]">
          {/* Left Column: Text & CTA Button */}
          <div className="py-10 sm:py-12 lg:py-14 z-20 flex flex-col items-start text-left">
            {/* Kicker */}
            <div className="text-[#bfe2fa] text-xs sm:text-[12.5px] font-bold tracking-[0.14em] uppercase mb-2 font-heading">
              READY TO TAKE THE NEXT STEP?
            </div>

            {/* Main Title (Identical font hierarchy to preceding sections) */}
            <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-white mb-2.5 font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
              Let&apos;s Plan Your Brighter Future Together
            </h2>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d8ebf9] mb-6 max-w-lg font-sans">
              Book a free consultation and get personalized guidance for your college journey.
            </p>

            {/* Primary Action Button */}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 sm:py-3.5 rounded-[8px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] text-xs sm:text-[16px] font-bold font-heading shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#0A3D6B]" />
            </Link>
          </div>

          {/* Right Column: Student Image & Decorative Brand Stars */}
          <div className="relative h-[240px] sm:h-[260px] lg:h-full min-h-[250px] lg:min-h-[270px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
            {/* Ambient Radial Soft Glow */}
            <div
              className="absolute right-[10%] top-[15%] w-[260px] h-[260px] bg-[#229ae3]/25 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Cyan/Blue 4-point Brand Star */}
            <div
              className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[30%] sm:top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
              aria-hidden="true"
            >
              <BrandStar className="w-full h-full fill-current" />
            </div>

            {/* Mint Green 4-point Brand Star */}
            <div
              className="absolute right-[2%] sm:right-[4%] lg:right-[0%] top-[8%] sm:top-[6%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[140px] lg:h-[140px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
              aria-hidden="true"
            >
              <BrandStar className="w-full h-full fill-current" />
            </div>

            {/* Student Cutout Image (ready_to_take.png grounded at bottom) */}
            <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[340px] h-[240px] sm:h-[260px] lg:h-[270px] z-10 flex-shrink-0">
              <Image
                src="/images/sub_images/ready_to_take.png"
                alt="Student smiling with phone and backpack, ready for college success"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                className="object-contain object-bottom select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
