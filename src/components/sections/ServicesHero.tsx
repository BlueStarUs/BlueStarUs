"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  // GSAP: Ambient Floating Animation & ScrollTrigger Depth
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Gentle continuous floating effect on graduation cap & books
      if (imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          y: -12,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Scroll parallax linked to scroll direction (both scroll down and up)
      if (heroRef.current && imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
          y: 35,
          opacity: 0.85,
          scale: 0.96,
          ease: "none",
        });
      }

      // 3. Ambient glow pulsing
      if (glowRef1.current && glowRef2.current) {
        gsap.to([glowRef1.current, glowRef2.current], {
          scale: 1.15,
          opacity: 0.25,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 1.5,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-gradient-to-r from-[#063359] via-[#084876] to-[#0c598b] text-white overflow-hidden border-b border-[#0d4f7c]"
    >
      {/* Soft Ambient Radial Lights */}
      <div
        ref={glowRef1}
        className="absolute top-0 right-1/4 w-[360px] h-[180px] bg-[#00b4d8]/15 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        ref={glowRef2}
        className="absolute bottom-0 left-10 w-[260px] h-[140px] bg-[#2ba3ea]/15 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Star Twinkles */}
      <span className="absolute top-6 left-1/3 w-1.5 h-1.5 bg-white/70 rounded-full animate-ping pointer-events-none" />
      <span className="absolute bottom-6 left-1/4 w-1 h-1 bg-[#38bdf8]/80 rounded-full pointer-events-none" />
      <span className="absolute top-5 right-1/3 w-1.5 h-1.5 bg-[#7dd3fc]/60 rounded-full pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 relative z-10">
        {/* Compact Breadcrumbs Row (Animated on both scroll directions) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex justify-center sm:justify-start mb-3 sm:mb-4"
        >
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center flex-wrap gap-1 sm:gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-sans text-[#d0e6f7] shadow-xs">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 font-medium text-[#bfe2fa] hover:text-white transition-colors"
                >
                  <Home className="w-3 h-3" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="inline-flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#79c3f7]/60" />
                <span className="font-bold font-heading text-white">Our Services</span>
              </li>
            </ol>
          </nav>
        </motion.div>

        {/* Compact 2-Column Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Top Sub-Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#7dd3fc] text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase font-heading mb-2 sm:mb-2.5 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
              <span>COLLEGE ADMISSIONS ADVISORY</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[22px] sm:text-2xl md:text-[28px] lg:text-[34px] font-extrabold text-white font-heading tracking-tight leading-[28px] sm:leading-[34px] lg:leading-[42px] mb-2 sm:mb-2.5 max-w-xl"
            >
              Comprehensive Support for Your College Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[21px] sm:leading-[23px] lg:leading-[25px] text-brand-sky/90 font-sans mb-4 sm:mb-5 max-w-xl mx-auto lg:mx-0"
            >
              Build the right plan, explore programs, get expert guidance, and access the resources you need — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto"
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#programs"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full bg-white text-brand-navy hover:bg-brand-sky text-xs sm:text-[13px] font-bold font-heading transition-colors shadow-xs hover:shadow-md cursor-pointer"
              >
                Find a Program
              </motion.a>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full border border-white/60 hover:border-white text-white hover:bg-white/10 text-xs sm:text-[13px] font-bold font-heading transition-colors shadow-xs"
                >
                  Explore Resources
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image (Graduation Cap, Books, Diploma with GSAP Float) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-1 sm:mt-2 lg:mt-0"
          >
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[340px] aspect-[16/10] will-change-transform"
            >
              <Image
                src="/images/services/OUR_ADMISSIONS_SERVICES.png"
                alt="College Graduation Cap, Academic Books, and Certificate"
                fill
                priority
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
