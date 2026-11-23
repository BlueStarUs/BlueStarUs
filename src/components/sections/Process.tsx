"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Compass, Award, GraduationCap, ArrowRight } from "lucide-react";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";

interface ProcessStepItem {
  step: string;
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
  ctaText?: string;
  ctaHref?: string;
}

const GET_STARTED_STEPS: ProcessStepItem[] = [
  {
    step: "Step 1",
    stepNumber: "01",
    title: "Complimentary 30-Min Initial Consultation",
    description:
      "Let’s get together to discuss your teen's background, ambitions, and family goals. Meet one of our expert counselors and get to know our philosophy. If there is strong mutual fit, we schedule the next step: a comprehensive 75-minute Strategy Consultation.",
    icon: Calendar,
    accent: "blue",
    ctaText: "Book Your Initial Consultation",
    ctaHref: HUBSPOT_CONSULTATION_URL,
  },
  {
    step: "Step 2",
    stepNumber: "02",
    title: "75-Minute In-Depth Strategy Consultation",
    description:
      "Following your Initial Consultation, we meet for an in-depth 75-minute diagnostic Strategy Consultation. Our lead counselor evaluates transcripts, extracurricular themes, and target colleges to create an actionable, bespoke admissions roadmap.",
    icon: Compass,
    accent: "green",
  },
  {
    step: "Step 3",
    stepNumber: "03",
    title: "Solidify success. The future awaits great people",
    description:
      "Once you accept the proposal, we’ll celebrate our partnership and get started working with a designated counselor just for you and your teen.",
    icon: Award,
    accent: "blue",
  },
  {
    step: "Step 4",
    stepNumber: "04",
    title: "Strategic & aligned for successful admissions applications",
    description:
      "Support. Skills development. Confidence. Self-reliance. Personal development leads the way to a desired college and becoming the leader the world needs your child to be.",
    icon: GraduationCap,
    accent: "green",
  },
];

export function Process() {
  return (
    <section id="planning" className="relative w-full bg-brand-ivory py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10">
        <div className="max-w-[640px] mb-14">
          <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4">
            How we work with your family
          </p>
          <h2 className="text-[32px] sm:text-[42px] leading-[1.1] text-brand-ink mb-5">
            From a first conversation to a lasting partnership
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#5b6472]">
            We take on a limited number of families, so we start by making sure we are the right fit for each other.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {GET_STARTED_STEPS.map((s) => (
            <li key={s.stepNumber} className="border-t border-brand-ink/25 pt-6">
              <span className="block font-display text-[40px] leading-none text-brand-blue mb-5">{s.stepNumber}</span>
              <h3 className="font-display !text-brand-ink text-[21px] leading-snug !font-medium mb-3">{s.title}</h3>
              <p className="text-[14.5px] leading-[1.7] text-[#5b6472]">{s.description}</p>
            </li>
          ))}
        </ol>

        <a
          href={HUBSPOT_CONSULTATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-flex items-center gap-2 rounded-full bg-brand-ink hover:bg-brand-ink text-white px-7 py-3.5 text-[14px] font-semibold tracking-wide transition-colors"
        >
          Book your free 30-minute consultation <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
