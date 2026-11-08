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
          className="relative rounded-[12px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden"
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
                className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans"
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
                  <span>Free 30-Min Discovery</span>
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
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[10px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-200 group cursor-pointer"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#0A3D6B] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Student Cutout & Glowing Brand Stars */}
            <div className="relative h-[240px] sm:h-[280px] lg:h-full min-h-[250px] lg:min-h-[300px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
              {/* Radial Glow */}
              <div
                className="absolute right-[12%] top-[18%] w-[260px] h-[260px] bg-[#229ae3]/25 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Cyan 4-Point Brand Star */}
              <div
                ref={starCyanRef}
                className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                aria-hidden="true"
              >
                <BrandStar className="w-full h-full fill-current" />
              </div>

              {/* Mint Green 4-Point Brand Star */}
              <div
                ref={starGreenRef}
                className="absolute right-[3%] sm:right-[5%] lg:right-[1%] top-[8%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[136px] lg:h-[136px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                aria-hidden="true"
              >
                <BrandStar className="w-full h-full fill-current" />
              </div>

              {/* Student Cutout Image */}
              <div
                ref={studentRef}
                className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[335px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0"
              >
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
        </motion.div>
      </div>
    </section>
  );
}

