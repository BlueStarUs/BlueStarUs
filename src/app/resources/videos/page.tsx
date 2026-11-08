import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Video } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { VideosListing } from "@/components/sections/VideosListing";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";

export const metadata: Metadata = {
  title: "Video Library & Masterclasses | Blue Stars Admissions Consulting",
  description:
    "Explore on-demand admissions video masterclasses, essay breakdowns, UC application walkthroughs, and student success interviews.",
};

const VIDEO_FAQS = [
  {
    question: "Are these video masterclasses suitable for 9th and 10th graders?",
    answer:
      "Yes. Our video library includes foundational roadmaps on high school course selection, passion project planning, and habit formation specifically tailored for early high schoolers.",
  },
  {
    question: "Do you have video walkthroughs of application portals like UC and Common App?",
    answer:
      "Yes! Our senior counselors provide complete screen-share walkthroughs guiding you through entering coursework, describing extracurriculars, and submitting materials correctly.",
  },
  {
    question: "Can I watch these videos with my parents?",
    answer:
      "We strongly encourage parents and students to watch together. Having shared admissions vocabulary and timelines makes the process far more collaborative and stress-free.",
  },
];

export default function VideosPage() {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Video Library & Masterclasses" },
        ]}
        badge="ON-DEMAND VIDEO LIBRARY"
        title="Admissions Video Masterclasses & Campus Insights"
        description="Watch concise video masterclasses on essay brainstorming, UC application walkthroughs, portfolio critiques, and student journeys from admitted seniors."
      />

      {/* Interactive Videos Listing */}
      <VideosListing />

      {/* Elevated CTA Banner */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[8px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            {/* Ambient Flowing Light in Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              {/* Left Column: Text & Action Buttons */}
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>TAILORED STRATEGY</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
                  Ready to Turn Strategy into Personal Results?
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  While our video library offers great frameworks, every student’s journey is distinct. Book a free 30-minute diagnostic session with our senior counseling team.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Book Free Diagnostic Session</span>
                    <ArrowRight className="w-4 h-4 text-[#07466f]" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    <span>View Our Programs</span>
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
                <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[340px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0">
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

