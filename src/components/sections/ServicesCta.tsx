"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandStar } from "@/components/ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);
  const starCyanRef = useRef<HTMLDivElement>(null);
  const starGreenRef = useRef<HTMLDivElement>(null);

  // GSAP: Ambient Stars Pulsing and Student Image Floating
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle floating on the student cutout
      if (studentRef.current) {
        gsap.to(studentRef.current, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Continuous rotating and pulsing on the brand stars
      if (starCyanRef.current && starGreenRef.current) {
        gsap.to(starCyanRef.current, {
          rotate: 15,
          scale: 1.08,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        gsap.to(starGreenRef.current, {
          rotate: -12,
          scale: 1.1,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 0.5,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[12px] bg-brand-ink text-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] border border-[#2072a7]/40 overflow-hidden"
        >
          {/* Luminous Flowing Wave Ribbons in Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />

            <svg
              className="absolute -bottom-6 left-0 w-[500px] h-[180px] text-[#00b4d8] opacity-20 blur-xs"
              viewBox="0 0 500 180"
              fill="none"
            >
              <path d="M0 100 C 130 160, 280 40, 500 120 L 500 180 L 0 180 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
            {/* Left Column: Text, Highlights & Action Button */}
            <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
              {/* Glowing Pill Kicker */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                <span>READY TO TAKE THE NEXT STEP?</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]"
              >
                Let&apos;s Plan Your Brighter Future Together
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#f3eee5] mb-6 max-w-xl font-sans"
              >
                Schedule a free 30-minute introductory consultation to discuss your student&apos;s goals and college plan with our senior advisory team.
              </motion.p>

              {/* Modern Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-[13.5px] text-[#bfe2fa] font-medium font-sans"
              >
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                  <span>Free Initial Consultation</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3bd386] flex-shrink-0" />
                  <span>Whole-Student Mentorship</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                  <span>No Obligation</span>
                </span>
              </motion.div>

              {/* Primary Action Button */}
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[10px] bg-white hover:bg-[#f3eee5] text-brand-navy font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-200 group cursor-pointer"
                >
                  <span>Book Your Initial Consultation</span>
                  <ArrowRight className="w-4 h-4 text-brand-navy transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Student Cutout & Glowing Brand Stars (Mobile Responsive Unified Wrapper) */}
            <div className="relative w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible pt-2 lg:pt-0">
              <div className="relative w-[210px] sm:w-[260px] md:w-[290px] lg:w-[320px] xl:w-[335px] h-[190px] sm:h-[240px] md:h-[260px] lg:h-[280px] flex items-end justify-center">
                {/* Radial Glow */}
                <div
                  className="absolute inset-0 bg-[#229ae3]/20 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Cyan 4-Point Brand Star (Positioned relative to student) */}
                <div
                  ref={starCyanRef}
                  className="absolute -left-3 sm:-left-6 top-8 sm:top-12 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Mint Green 4-Point Brand Star (Positioned relative to student) */}
                <div
                  ref={starGreenRef}
                  className="absolute -right-4 sm:-right-8 top-1 sm:top-2 w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Student Cutout Image */}
                <div
                  ref={studentRef}
                  className="relative w-full h-full z-10 flex-shrink-0"
                >
                  <Image
                    src="/images/teams/dr-amy-morgenstern-cutout.webp"
                    alt="Dr. Amy Morgenstern, founder of Blue Stars Admissions Consulting"
                    fill
                    priority
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 290px, 340px"
                    className="object-contain object-bottom select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

