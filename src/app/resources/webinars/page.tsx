import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Radio, Calendar, Users, Award } from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { WebinarsListing } from "@/components/sections/WebinarsListing";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { BrandStar } from "@/components/ui/Icons";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "College Admissions Webinars & Live Workshops",
  description:
    "Join live admissions strategy masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
  alternates: {
    canonical: "https://bluestars.us/resources/webinars",
  },
  openGraph: {
    title: "College Admissions Webinars & Live Workshops | Blue Stars",
    description:
      "Join live admissions strategy masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
    url: "https://bluestars.us/resources/webinars",
    images: [
      {
        url: "/images/sub_images/live_Admissions_Webinars.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting Webinars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Webinars & Live Workshops | Blue Stars",
    description:
      "Join live admissions strategy masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
    images: ["/images/sub_images/live_Admissions_Webinars.png"],
  },
};

const WEBINAR_FAQS = [
  {
    question: "Do I need to pay to attend Blue Stars live webinars?",
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
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: "Webinars", url: "/resources/webinars" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
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

      {/* Why Attend Blue Stars Masterclasses with Clean University Campus Background */}
      <section className="relative py-8 sm:py-14 lg:py-18 overflow-hidden border-y border-[#e2eef9]">
        {/* Background Campus Image with Responsive Fill & Aspect Ratio */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sub_images/Clean_University_Campus_Background.png"
            alt="Clean University Campus background"
            fill
            priority={false}
            className="object-cover object-center select-none pointer-events-none"
            sizes="100vw"
          />
          {/* Dark Midnight & Charcoal Gradient Overlay for Contrast & Readability */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#18222b]/98 via-[#0d143a]/97 to-[#070c26]/96 backdrop-blur-[5px]"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#38bdf8] rounded-full" aria-hidden="true" />
                <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.14em] uppercase text-[#79c3f7] font-heading">
                  EXPERT-LED SESSIONS
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl md:text-[34px] font-extrabold text-white font-heading tracking-tight leading-snug sm:leading-[38px] lg:leading-[42px] mb-3">
                Real Answers, Actionable Blueprints, Zero Hype
              </h2>

              <p className="text-xs sm:text-[15px] leading-relaxed sm:leading-[25px] text-brand-blue font-sans mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-[5px]">
                Unlike corporate seminars that hide real advice behind paywalls, Blue Stars webinars break down specific holistic scoring matrices, real essay revisions, and tactical timelines you can implement immediately.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-5 rounded-[5px] bg-white/95 backdrop-blur-xs border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                  <div className="text-xl sm:text-3xl font-extrabold text-brand-blue font-heading">100%</div>
                  <div className="text-[11px] sm:text-[13px] font-semibold text-brand-navy font-heading mt-0.5">Free Access</div>
                </div>
                <div className="p-3 sm:p-5 rounded-[5px] bg-white/95 backdrop-blur-xs border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                  <div className="text-xl sm:text-3xl font-extrabold text-brand-blue font-heading">30 Min</div>
                  <div className="text-[11px] sm:text-[13px] font-semibold text-brand-navy font-heading mt-0.5">Live Audience Q&amp;A</div>
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
      <section className="relative w-full py-6 sm:py-10 lg:py-14 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="relative rounded-[6px] sm:rounded-[8px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              <div className="p-5 sm:p-8 lg:p-12 xl:p-14 flex flex-col items-start text-left z-20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[10px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-2.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>TAKE THE NEXT STEP</span>
                </div>

                <h2 className="text-xl sm:text-3xl md:text-[34px] font-extrabold text-white mb-2 sm:mb-3 font-heading tracking-tight leading-snug sm:leading-[38px] lg:leading-[42px]">
                  Want 1-on-1 Guidance Tailored to Your Student?
                </h2>

                <p className="text-xs sm:text-[15px] sm:text-[16px] leading-relaxed sm:leading-[26px] text-[#d4e8f8] mb-4 sm:mb-6 max-w-xl font-sans">
                  Schedule a free 30-minute Initial Consultation with our senior advisors to map out a personalized multi-year college admissions plan.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                  <Link
                    href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Book Your Initial Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#07466f]" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all text-center"
                  >
                    <span>Explore Our Programs</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Student Cutout Image & Decorative Brand Stars (Mobile Responsive Unified Wrapper) */}
              <div className="relative w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible pt-2 lg:pt-0">
                {/* Unified container for student and stars that scales and centers together on all viewports */}
                <div className="relative w-[210px] sm:w-[260px] md:w-[290px] lg:w-[320px] xl:w-[340px] h-[190px] sm:h-[240px] md:h-[260px] lg:h-[280px] flex items-end justify-center">
                  {/* Radial Glow */}
                  <div
                    className="absolute inset-0 bg-[#229ae3]/20 rounded-full blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Cyan 4-Point Brand Star (Positioned relative to student) */}
                  <div
                    className="absolute -left-3 sm:-left-6 top-8 sm:top-12 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                    aria-hidden="true"
                  >
                    <BrandStar className="w-full h-full fill-current" />
                  </div>

                  {/* Mint Green 4-Point Brand Star (Positioned relative to student) */}
                  <div
                    className="absolute -right-4 sm:-right-8 top-1 sm:top-2 w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                    aria-hidden="true"
                  >
                    <BrandStar className="w-full h-full fill-current" />
                  </div>

                  {/* Student Cutout Image */}
                  <div className="relative w-full h-full z-10 flex-shrink-0">
                    <Image
                      src="/images/teams/dr-amy-morgenstern-cutout.webp"
                      alt="Dr. Amy Morgenstern, founder of Blue Stars Admissions Consulting"
                      fill
                      priority
                      sizes="(max-width: 640px) 210px, (max-width: 1024px) 280px, 340px"
                      className="object-contain object-bottom select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

