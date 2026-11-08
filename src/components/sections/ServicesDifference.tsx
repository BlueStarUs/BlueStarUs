"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesDifferenceProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function ServicesDifference({ faqs }: ServicesDifferenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP: Staggered Stat Numbers entrance on scroll (both directions)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsContainerRef.current) {
        gsap.from(".gsap-stat-box", {
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          y: 20,
          opacity: 0.2,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: The Blue Stars Difference Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                THE BLUESTARS DIFFERENCE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-4">
              Whole-Student Mentoring for Lifelong Confidence
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
              Unlike transactional agencies that churn out formulaic essays, Blue Stars Admissions Consulting takes a life-coaching approach. Founded by Dr. Amy Morgenstern, we partner with students to build genuine self-awareness, leadership impact, and academic resilience.
            </p>

            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-7 sm:mb-8">
              Our students do not just get admitted to dream colleges—they arrive on campus equipped with the executive function, writing prowess, and intellectual vigor to excel.
            </p>

            {/* Stats Cards (GSAP + Framer Motion interactive lift) */}
            <div ref={statsContainerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="gsap-stat-box p-4 rounded-[6px] bg-[#f8fbfe] border border-[#e2eef9] text-center shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading">
                  16+
                </div>
                <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Years Guiding Families
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="gsap-stat-box p-4 rounded-[6px] bg-[#f8fbfe] border border-[#e2eef9] text-center shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#2F9E5C] font-heading">
                  98%
                </div>
                <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Top-Choice Admits
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="gsap-stat-box p-4 rounded-[6px] bg-[#f8fbfe] border border-[#e2eef9] text-center col-span-2 sm:col-span-1 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading">
                  100%
                </div>
                <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">
                  Personalized Mentorship
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion with Entrance Animation on Scroll Up & Down */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 sm:mb-6">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading block mb-1">
                COMMON QUESTIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                Frequently Asked Questions
              </h3>
            </div>

            <ServiceFAQAccordion faqs={faqs} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

