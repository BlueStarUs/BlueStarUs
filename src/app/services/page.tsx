import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { Services } from "@/components/sections/Services";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { ServiceResourcesBanner } from "@/components/sections/ServiceResourcesBanner";
import { BrandStar } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Our Services | BlueStars Admissions Consulting",
  description:
    "Explore our personalized college admissions programs: College Admissions Consulting, Art Admissions Consulting, College Planning, Application Strategy, Essay Guidance, and Scholarships & Financial Aid.",
};

const GENERAL_SERVICES_FAQS = [
  {
    question: "How do I choose which service package is right for my student?",
    answer:
      "During your free 30-minute consultation, our senior advisors evaluate your student's current grade level, academic profile, and specific timeline to recommend whether our comprehensive multi-year planning or targeted application package is the best fit.",
  },
  {
    question: "Do you offer combined or comprehensive full-cycle packages?",
    answer:
      "Yes. Most families choose our Comprehensive Full-Cycle Admissions Consulting package, which seamlessly integrates all four services—planning, application strategy, essay coaching, and financial aid guidance—under one dedicated team.",
  },
  {
    question: "Who works directly with my student?",
    answer:
      "Each student is paired with a primary senior admissions consultant alongside a specialized writing coach and strategists overseen by our founder, Dr. Amy Morgenstern.",
  },
  {
    question: "Are your services available remotely for non-California families?",
    answer:
      "Yes. We serve families across the entire United States as well as international students worldwide through our interactive video counseling, shared Google Docs workspaces, and parent update portals.",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full bg-white">
      {/* Short, Compact Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "Our Services" }]}
        badge="OUR ADMISSIONS SERVICES"
        title="Comprehensive Support for Your College Journey"
        description="Explore our specialized admissions consulting programs designed to guide high school students from foundational high school roadmaps to acceptance letters at top-tier universities."
      />

      {/* Home Page Our Services Component (4-Column Layout with links to each dedicated page) */}
      <Services
        kicker="SPECIALIZED PROGRAMS"
        title={
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
            Select a Program to Explore Details
          </h2>
        }
        description="Click into any service below for in-depth program curriculum, methodology, timelines, deliverables, and FAQs."
        showViewAllLink={false}
        id="specialized-programs"
      />

      {/* Why BlueStars Approach */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
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
                Unlike transactional agencies that churn out formulaic essays, BlueStars Admissions Consulting takes a life-coaching approach. Founded by Dr. Amy Morgenstern, we partner with students to build genuine self-awareness, leadership impact, and academic resilience.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8">
                Our students do not just get admitted to dream colleges—they arrive on campus equipped with the executive function, writing prowess, and intellectual vigor to excel.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">16+</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Years Guiding Families</div>
                </div>
                <div className="p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">98%</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Top-Choice Admits</div>
                </div>
                <div className="p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">100%</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Personalized Mentorship</div>
                </div>
              </div>
            </div>

            {/* General FAQs Accordion */}
            <div>
              <div className="mb-6">
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading block mb-1">
                  COMMON QUESTIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              <ServiceFAQAccordion faqs={GENERAL_SERVICES_FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* Resources to Help Teens & Families (Blog, Videos, Live Webinars) */}
      <ServiceResourcesBanner />

      {/* Modern Elevated CTA Banner Card */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4 lg:px-4">
          <div className="relative rounded-[5px]  bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>READY TO TAKE THE NEXT STEP?</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Let&apos;s Plan Your Brighter Future Together
                </h2>

                {/* Description */}
                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule a free 30-minute introductory consultation to discuss your student&apos;s goals and college plan with our senior advisory team.
                </p>

                {/* Modern Trust Badges */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-[13.5px] text-[#bfe2fa] font-medium font-sans">
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
                </div>

                {/* Primary Action Button */}
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[10px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#0A3D6B] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
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
                  className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Mint Green 4-Point Brand Star */}
                <div
                  className="absolute right-[3%] sm:right-[5%] lg:right-[1%] top-[8%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[136px] lg:h-[136px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Student Cutout Image */}
                <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[335px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0">
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
        </div>
      </section>
    </div>
  );
}

