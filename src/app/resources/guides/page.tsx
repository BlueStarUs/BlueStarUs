import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { GuidesListing } from "@/components/sections/GuidesListing";
import { FreeWorkbookSection } from "@/components/sections/FreeWorkbookSection";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { BrandStar } from "@/components/ui/Icons";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "College Application Guides & Free PDF Downloads",
  description:
    "Free downloadable admissions guides, UC PIQ handbooks, Common App essay blueprints, and grade-by-grade college planning checklists created by senior counselors.",
  alternates: {
    canonical: "https://bluestars.us/resources/guides",
  },
  openGraph: {
    title: "College Application Guides & Free PDF Downloads | Blue Stars",
    description:
      "Free downloadable admissions guides, UC PIQ handbooks, Common App essay blueprints, and grade-by-grade college planning checklists created by senior counselors.",
    url: "https://bluestars.us/resources/guides",
    images: [
      {
        url: "/images/workbook-cover.png",
        width: 1200,
        height: 630,
        alt: "College Application Guides & Toolkits - Blue Stars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Application Guides & Free PDF Downloads | Blue Stars",
    description:
      "Free downloadable admissions guides, UC PIQ handbooks, Common App essay blueprints, and grade-by-grade college planning checklists created by senior counselors.",
    images: ["/images/workbook-cover.png"],
  },
};

const GUIDES_FAQS = [
  {
    question: "Are these guides really 100% free with no hidden charges?",
    answer:
      "Yes. Blue Stars provides these full-length guides, checklists, and templates completely free of charge to help families navigate the complex college admissions process with greater clarity and less anxiety.",
  },
  {
    question: "Can I share these guides with my high school counselor or study group?",
    answer:
      "Absolutely. You are welcome to share our PDF guides and checklists with your high school counselors, teachers, classmates, and family members.",
  },
  {
    question: "How do your guides compare to generic advice found online?",
    answer:
      "Our guides are developed by experienced admissions strategists and master educators led by Dr. Amy Morgenstern. Rather than surface-level tips, our blueprints include proven narrative frameworks, strategic self-reflection prompts, holistic scoring rubrics, and concrete action plans.",
  },
  {
    question: "Do you offer individualized guidance if we need personalized help?",
    answer:
      "Yes. If your family wants dedicated 1-on-1 counseling to build an application strategy, develop extracurricular spikes, and polish essays, you can book a free 30-minute consultation with our advisory team.",
  },
];

export default function GuidesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: "Application Guides", url: "/resources/guides" },
  ];

  return (
    <div className="w-full bg-white">
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Application Guides & Toolkits" },
        ]}
        badge="FREE ADMISSIONS DOWNLOADS"
        title="College Application Guides, Handbooks & Checklists"
        description="Download our complete library of strategic admissions playbooks, UC PIQ guides, Common App essay workbooks, and grade-by-grade planning calendars."
      />

      {/* Interactive Guides Filter & Downloads Grid */}
      <GuidesListing />

      {/* Free Workbook Lead Capture & Instant PDF Download */}
      <FreeWorkbookSection />

      {/* Why Blue Stars Guides Section */}
      <section className="py-12 sm:py-16 bg-[#f8fbfe] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  DATA-DRIVEN METHODOLOGY
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-4">
                Tested & Proven by 16+ Years of Admissions Success
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                Our resources are not theoretical—they represent the exact frameworks, rubrics, and checklists that have guided Blue Stars students to acceptances at Stanford, Harvard, MIT, Columbia, Yale, UC Berkeley, UCLA, and Rhode Island School of Design.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9]">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">16+</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Years of Success</div>
                </div>
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9]">
                  <div className="text-2xl font-extrabold text-brand-blue font-heading">100%</div>
                  <div className="text-xs font-semibold text-brand-navy font-heading mt-0.5">Free & Unrestricted</div>
                </div>
              </div>
            </div>

            <div>
              <ServiceFAQAccordion faqs={GUIDES_FAQS} />
            </div>
          </div>
        </div>
      </section>

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
                  <span>ONE-ON-ONE MENTORSHIP</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
                  Need Help Implementing These Blueprints?
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Connect directly with our senior counseling team to review your student&apos;s coursework, extracurricular profile, and personalized college list.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Schedule Free 30-Min Consultation</span>
                    <ArrowRight className="w-4 h-4 text-[#07466f]" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[6px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    <span>Explore Consulting Services</span>
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

