import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Radio, Calendar, Users, Award } from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { WebinarsListing } from "@/components/sections/WebinarsListing";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";

export const metadata: Metadata = {
  title: "Admissions Webinars & Workshops | BlueStars Admissions Consulting",
  description:
    "Join live admissions strategy masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
};

const WEBINAR_FAQS = [
  {
    question: "Do I need to pay to attend BlueStars live webinars?",
    answer:
      "No. All of our live webinars and online strategy workshops are completely free. We host these sessions to empower families with accurate admissions information and actionable advice.",
  },
  {
    question: "What happens if I register but cannot attend live?",
    answer:
      "All registered attendees receive an on-demand video replay link along with downloadable presentation slides and worksheets via email within 24 hours of the live session.",
  },
  {
    question: "Can I ask specific questions about my student's profile?",
    answer:
      "Yes! Every live session concludes with a dedicated 25–30 minute interactive Q&A session where attendees can submit questions live to our counselors.",
  },
  {
    question: "Who leads these webinars?",
    answer:
      "Our sessions are led by our founder, Dr. Amy Morgenstern, alongside senior admissions consultants, former admissions reviewers, and guest student speakers from Stanford, Harvard, and UC campuses.",
  },
];

export default function WebinarsPage() {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Live Webinars & Workshops" },
        ]}
        badge="LIVE ADMISSIONS SESSIONS"
        title="Interactive Webinars, Masterclasses & Live Q&As"
        description="Join Dr. Amy Morgenstern and our senior counseling team for interactive online masterclasses on highly selective admissions, UC strategy, passion projects, and art portfolios."
      />

      {/* Interactive Tabs & Listing Grid */}
      <WebinarsListing />

      {/* Why Attend BlueStars Masterclasses */}
      <section className="py-12 sm:py-16 bg-[#f8fbfe] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  EXPERT-LED SESSIONS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-4">
                Real Answers, Actionable Blueprints, Zero Hype
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Unlike corporate seminars that hide real advice behind paywalls, BlueStars webinars break down specific holistic scoring matrices, real essay revisions, and tactical timelines you can implement immediately.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9]">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">15,000+</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Families Attended</div>
                </div>
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9]">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">30 Min</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Live Audience Q&A</div>
                </div>
              </div>
            </div>

            <div>
              <ServiceFAQAccordion faqs={WEBINAR_FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* Elevated CTA Banner */}
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
                  <span>TAKE THE NEXT STEP</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white mb-3 font-heading tracking-tight">
                  Want 1-on-1 Guidance Tailored to Your Student?
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule a free 30-minute private diagnostic with our senior advisors to map out a personalized multi-year college admissions plan.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md transition-all"
                  >
                    <span>Schedule Free Diagnostic</span>
                    <ArrowRight className="w-4 h-4 text-[#07466f]" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    <span>Explore Our Programs</span>
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

