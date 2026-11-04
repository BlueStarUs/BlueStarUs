import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { FAQKnowledgeBaseListing } from "@/components/sections/FAQKnowledgeBaseListing";

export const metadata: Metadata = {
  title: "Admissions FAQ & Knowledge Base | BlueStars Admissions Consulting",
  description:
    "Comprehensive answers to top admissions questions covering college list strategy, Common App personal statements, UC PIQs, test-optional policies, and financial aid.",
};

export default function FAQPage() {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Admissions FAQ & Knowledge Base" },
        ]}
        badge="ADMISSIONS KNOWLEDGE BASE"
        title="Admissions FAQ & Comprehensive Knowledge Base"
        description="Find in-depth answers to 50+ common questions on application timing, early decision, essays, AP coursework, test-optional policies, and financial aid."
      />

      {/* Searchable and Categorized FAQ Hub */}
      <FAQKnowledgeBaseListing />

      {/* Still Have Questions? Banner */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4 lg:px-4">
          <div className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10 p-7 sm:p-10 lg:p-12 xl:p-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>HAVE A SPECIFIC QUESTION?</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white mb-3 font-heading tracking-tight">
                  Didn&apos;t Find Your Answer Above?
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Every student and family circumstance is unique. Speak directly with our admissions advisors to discuss your specific goals, test scores, or financial aid questions.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md transition-all"
                  >
                    <span>Ask Our Counselors</span>
                    <ArrowRight className="w-4 h-4 text-[#07466f]" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    <span>View Consulting Services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

