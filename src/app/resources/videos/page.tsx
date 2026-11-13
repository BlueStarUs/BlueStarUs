import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Video, Sparkles, BookOpen, Tv, ExternalLink } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { VideosListing } from "@/components/sections/VideosListing";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "College Admissions Video Library & Campus Tours",
  description:
    "Watch 41+ authentic admissions videos: college campus tours, alumni interviews, UC PIQ masterclasses, and strategy sessions with Dr. Amy Morgenstern.",
  alternates: {
    canonical: "https://bluestars.us/resources/videos",
  },
  openGraph: {
    title: "College Admissions Video Library & Campus Tours | Blue Stars",
    description:
      "Watch 41+ authentic admissions videos: college campus tours, alumni interviews, UC PIQ masterclasses, and strategy sessions with Dr. Amy Morgenstern.",
    url: "https://bluestars.us/resources/videos",
    images: [
      {
        url: "/images/sub_images/Student_Videos.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting Video Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Video Library & Campus Tours | Blue Stars",
    description:
      "Watch 41+ authentic admissions videos: college campus tours, alumni interviews, UC PIQ masterclasses, and strategy sessions with Dr. Amy Morgenstern.",
    images: ["/images/sub_images/Student_Videos.png"],
  },
};

const VIDEO_FAQS = [
  {
    question: "Where are these videos sourced from, and who presents them?",
    answer:
      "All 41 videos are produced directly by Blue Stars Admissions Consulting and hosted on our official YouTube channel. They feature our founder, Dr. Amy Morgenstern, senior admissions advisors, and real Blue Stars alumni discussing college tours, UC Personal Insight Questions, Common App essays, and admissions strategies.",
  },
  {
    question: "Are these video masterclasses suitable for 9th and 10th graders?",
    answer:
      "Yes. Our video library includes foundational roadmaps on high school course rigor, passion project planning, extracurricular spike development, and habit formation specifically tailored for early high schoolers.",
  },
  {
    question: "Do you cover college tours for liberal arts colleges and public universities?",
    answer:
      "Yes! Dr. Amy has recorded on-the-ground campus visits to the University of Michigan, Amherst College, Williams College, Oberlin College, Kenyon College, Ohio Wesleyan, and more, breaking down what admissions officers look for in prospective applicants.",
  },
  {
    question: "Can I watch the UC PIQ and Common App strategy videos for free?",
    answer:
      "Yes, 100%. All 8 UC Personal Insight Question breakdowns, Common App essay masterclasses, and STEM admissions panels are completely free to stream on-demand with no paywalls or sign-up hurdles.",
  },
  {
    question: "How do I get individualized help after watching these videos?",
    answer:
      "You can book a free 30-minute diagnostic session with our senior counseling team or download our complimentary 4-Year College Planning Foundations Workbook to begin applying these frameworks to your student's profile.",
  },
];

export default function VideosPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: "Videos", url: "/resources/videos" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Modern Breadcrumb Hero with Blue Stars Services Palette */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Video Library & Masterclasses" },
        ]}
        badge="ON-DEMAND VIDEO LIBRARY"
        title="College Tours, Alumni Interviews & Recorded Webinars"
        description="Stream 41+ authentic masterclasses, campus walk-throughs, and admissions breakdowns led by Dr. Amy Morgenstern and our senior counseling team."
      />

      {/* Interactive 41-Video Catalog with Search, Category Pills & YouTube Modal */}
      <VideosListing />

      {/* Why Watch Blue Stars Videos - Services Style 3-Column Highlights */}
      <section className="py-12 sm:py-16 bg-[#F3F8FD] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="w-12 h-[3px] bg-brand-blue rounded-full mb-3.5 mx-auto" aria-hidden="true" />
            <h2 className="text-2xl sm:text-[30px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug">
              Why Families Rely On Blue Stars Video Insights
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] text-brand-text font-sans mt-2">
              Actionable, grounded admissions wisdom designed to replace frenzy with clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F1FC] text-brand-blue grid place-items-center mb-4">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-2">
                Unfiltered Campus Tours
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[22px] text-brand-text font-sans">
                Walk through Michigan, Amherst, Williams, and Oberlin with Dr. Amy to learn what institutional priorities and campus culture look like on the ground.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F5EA] text-[#2F9E5C] grid place-items-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-2">
                Alumni Success Stories
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[22px] text-brand-text font-sans">
                Hear directly from admitted Stanford REA, Ivy League, and BS/MD students sharing their actual timelines, essay drafts, and high school mindset.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F1FC] text-brand-blue grid place-items-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-2">
                UC PIQ &amp; Essay Masterclasses
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[22px] text-brand-text font-sans">
                Detailed breakdowns for every single UC Personal Insight Question (1 through 8) plus Common App personal statement brainstorming strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video FAQs Accordion */}
      <ServiceFAQAccordion
        faqs={VIDEO_FAQS}
        title="Frequently Asked Questions About Our Videos"
        subtitle="Common questions from parents and students on using our video library and admissions resources."
      />

      {/* Elevated CTA Banner (Services Styling) */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            {/* Ambient Flowing Light */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              {/* Left Column: Text & Buttons */}
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>TAILORED STRATEGY</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
                  Ready to Turn Strategy into Personal Results?
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  While our video library offers great frameworks, every student’s journey is distinct. Book a free 30-minute diagnostic session with Dr. Amy Morgenstern and our senior counseling team.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href={HUBSPOT_CONSULTATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Book Free Diagnostic Session</span>
                    <ArrowRight className="w-4 h-4 text-[#07466f]" />
                  </Link>
                  <Link
                    href="/free-workbook"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    <span>Download Free Workbook</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Student Cutout Image & Decorative Brand Stars */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-full min-h-[250px] lg:min-h-[300px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
                {/* Radial Glow */}
                <div
                  className="absolute right-[12%] top-[18%] w-[260px] h-[260px] bg-[#229ae3]/25 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Brand Stars */}
                <div
                  className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                <div
                  className="absolute right-[3%] sm:right-[5%] lg:right-[1%] top-[8%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[136px] lg:h-[136px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Student Cutout Image */}
                <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[340px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0">
                  <Image
                    src="/images/sub_images/ready_to_take.png"
                    alt="Student smiling ready for college success"
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
