import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Award,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { FreeWorkbookSection } from "@/components/sections/FreeWorkbookSection";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free 4-Year College Planning Workbook PDF",
  description:
    "Download Dr. Amy Morgenstern's 4-Year College Planning Foundations Workbook. Guided self-reflection, activity roadmap, and storytelling exercises for high school students.",
  alternates: {
    canonical: "https://bluestars.us/free-workbook",
  },
  openGraph: {
    title: "Free 4-Year College Planning Workbook PDF | Blue Stars",
    description:
      "Download Dr. Amy Morgenstern's 4-Year College Planning Foundations Workbook with guided self-reflection prompts and roadmaps.",
    url: "https://bluestars.us/free-workbook",
    images: [
      {
        url: "/images/workbook-cover.png",
        width: 1200,
        height: 630,
        alt: "College Planning Foundations Workbook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 4-Year College Planning Workbook PDF | Blue Stars",
    description:
      "Download Dr. Amy Morgenstern's 4-Year College Planning Foundations Workbook with guided self-reflection prompts and roadmaps.",
    images: ["/images/workbook-cover.png"],
  },
};

const WORKBOOK_FAQS = [
  {
    question: "Is this workbook truly 100% free?",
    answer:
      "Yes, completely free. There are no credit card requirements or surprise paywalls. You can fill out the form for instant email delivery and download the PDF directly to your device right now.",
  },
  {
    question: "What grades is this workbook designed for?",
    answer:
      "This workbook is specifically engineered for 8th through 12th graders. 8th and 9th graders use it to design high school coursework and extracurricular spikes; 10th and 11th graders use it to plan summer research, leadership roles, and testing; and seniors use the narrative reflection prompts to jumpstart Common App and UC PIQ essays.",
  },
  {
    question: "How long does it take to complete the exercises in the workbook?",
    answer:
      "Most students complete the exercises over 1 to 2 weekends. The workbook is broken into modular exercises that can be completed individually or revisited across each semester of high school.",
  },
  {
    question: "Can parents and counselors use this workbook with students?",
    answer:
      "Absolutely. Hundreds of parents and high school counselors use this toolkit as a structured conversational guide to help teens identify genuine intellectual passions without the stress of admissions frenzy.",
  },
  {
    question: "What should we do after completing the workbook?",
    answer:
      "Once you've mapped out your initial thoughts, you can schedule a complimentary 30-minute diagnostic session with Dr. Amy Morgenstern and our senior counseling team to review your responses and build a tailored college admissions strategy.",
  },
];

export default function FreeWorkbookPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: "Free College Planning Workbook", url: "/free-workbook" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Breadcrumb Hero with Blue Stars Services styling */}
        <BreadcrumbHero
          breadcrumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Free Workbook: College Planning Foundations" },
          ]}
          badge="FREE STRATEGIC TOOLKIT"
          title="College Planning Foundations Workbook"
          description="A guided self-reflection and 4-year strategic roadmap created by Dr. Amy Morgenstern to help college-bound teens stand out with authenticity."
        />

        {/* Main Free Workbook Lead Capture & Instant PDF Download Section */}
        <FreeWorkbookSection />

      {/* Why This Workbook Matters - 3 Column Feature Grid (Services Theme) */}
      <section className="py-12 sm:py-16 bg-[#F3F8FD] border-b border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="w-12 h-[3px] bg-brand-blue rounded-full mb-3.5 mx-auto" aria-hidden="true" />
            <h2 className="text-2xl sm:text-[30px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug">
              Why Start With The Blue Stars Foundations Workbook?
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] text-brand-text font-sans mt-2">
              Replacing admissions anxiety with thoughtful, student-centered clarity from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F1FC] text-brand-blue grid place-items-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-2">
                Socratic Narrative Prompts
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[22px] text-brand-text font-sans">
                Move past generic resume bullet points. Uncover personal values, core intellectual interests, and the unique personal spark that top admissions committees look for.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F5EA] text-[#2F9E5C] grid place-items-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-2">
                4-Year Roadmap Architecture
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[22px] text-brand-text font-sans">
                A grade-by-grade blueprint covering AP/IB course rigor, summer research opportunities, leadership capstones, and balanced testing schedules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F1FC] text-brand-blue grid place-items-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-brand-navy font-heading mb-2">
                16+ Years of Proven Results
              </h3>
              <p className="text-xs sm:text-[13.5px] leading-[22px] text-brand-text font-sans">
                Created by Dr. Amy Morgenstern, this signature toolkit helps students and families gain clarity and guide their path into Stanford, Harvard, MIT, and premier colleges nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workbook FAQs Accordion */}
      <ServiceFAQAccordion
        faqs={WORKBOOK_FAQS}
        title="Frequently Asked Questions About The Workbook"
        subtitle="Everything you need to know about downloading and using this free admissions planning resource."
      />

      {/* Consultation CTA Banner */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-lg border border-[#2072a7]/40">
            <span className="text-xs font-bold uppercase tracking-wider text-[#79c3f7] font-heading mb-2 inline-block">
              READY FOR 1-ON-1 ADVISING?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-3">
              Review Your Workbook With Dr. Amy Morgenstern
            </h2>
            <p className="text-sm sm:text-base text-[#d4e8f8] max-w-xl mx-auto mb-6 font-sans">
              Schedule a free 30-minute diagnostic session to discuss your student&apos;s academic profile, high school roadmap, and college goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href={HUBSPOT_CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-md transition-all"
              >
                <span>Book Free Diagnostic Session</span>
                <ArrowRight className="w-4 h-4 text-[#07466f]" />
              </Link>
              <Link
                href="/resources/videos"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white border border-white/30 hover:bg-white/10 transition-all"
              >
                <span>Watch Video Masterclasses</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

