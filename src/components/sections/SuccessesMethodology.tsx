import React from "react";
import Link from "next/link";
import {
  Compass,
  FileText,
  Lightbulb,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";

const METHODOLOGY_PILLARS = [
  {
    icon: Compass,
    title: "Strategic Early Application Sequencing",
    description:
      "We design tailored application calendars utilizing Early Decision (ED) and Restrictive Early Action (REA) rounds where acceptance rates are highest, sequencing submissions to maximize early wins.",
    points: [
      "Targeted ED / EA binding & non-binding strategy",
      "UC application optimization & campus prioritization",
      "Merit scholarship deadline targeting (USC, SCU, Rice)",
    ],
  },
  {
    icon: FileText,
    title: "Distinctive Narrative Architecture",
    description:
      "Top universities don't want well-rounded applicants; they want well-lopsided students with genuine passions. We help students unearth and articulate their true intellectual and personal voice.",
    points: [
      "Socratic brainstorming to surface unique stories",
      "Common App & UC PIQ structural outlines",
      "Multi-tier editorial polish without sounding over-coached",
    ],
  },
  {
    icon: Lightbulb,
    title: "Original Capstones & Research Placements",
    description:
      "Blue Stars students regularly earn placements in competitive summer programs like Stanford SIMR, COSMOS, and SSP, or build independent initiatives that demonstrate tangible community impact.",
    points: [
      "Summer research program applications & essays",
      "Independent scholarly inquiry & capstones",
      "Demonstrated initiative beyond school curriculum",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Low-Stress, Holistic Family Partnership",
    description:
      "Admissions shouldn't strain the parent-student bond. Our organized, milestone-driven workflow provides clear accountability, gentle deadlines, and compassionate encouragement.",
    points: [
      "Clear timelines that prevent last-minute scrambles",
      "Objective, experienced third-party mentorship",
      "Fostering student agency, confidence, and resilience",
    ],
  },
];

export function SuccessesMethodology() {
  return (
    <section className="w-full py-14 sm:py-24 bg-white border-t border-brand-border/70">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f3eee5] text-[#0b4f94] text-[11.5px] font-semibold uppercase tracking-[0.16em] font-heading mb-5">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>The Blue Stars Advantage</span>
          </div>
          <h2 className="text-[30px] sm:text-[42px] leading-[1.1] text-brand-ink text-balance">
            Why Blue Stars Students <span className="italic text-brand-blue">Consistently Stand Out</span>
          </h2>
          <p className="text-[15.5px] sm:text-[17px] font-sans text-[#4a5568] mt-4 leading-[1.7] text-balance">
            Behind every Ivy League acceptance, full-ride merit award, and UC Regents scholarship is a deliberate, highly personalized admissions roadmap focused on authenticity, rigor, and peace of mind.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 mb-12">
          {METHODOLOGY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-[22px] border border-[#e9e3d8] bg-white p-6 sm:p-8 shadow-[0_1px_3px_rgba(18,48,90,0.05)] hover:border-brand-blue/40 hover:shadow-[0_1px_3px_rgba(18,48,90,0.05)] hover:-translate-y-1 transition-all duration-300"
              >
                <span
                  className="absolute right-6 top-5 font-display text-[52px] leading-none text-brand-blue/15 group-hover:text-brand-blue/30 transition-colors duration-300"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="w-14 h-14 rounded-[16px] bg-[#f3eee5] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="font-display text-[22px] sm:text-[24px] !font-medium leading-snug !text-brand-ink mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[15px] font-sans text-[#4a5568] leading-[1.7] mb-5">
                  {pillar.description}
                </p>

                <ul className="space-y-3 pt-5 border-t border-[#e9e3d8]">
                  {pillar.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-[14px] font-sans font-medium text-brand-ink leading-snug"
                    >
                      <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-[#f3eee5] text-brand-blue">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner linking to Consultation & Services */}
        <div className="rounded-[24px] bg-gradient-to-r from-brand-navy via-brand-darkNavy to-brand-navy text-white p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_22px_50px_rgba(2,59,76,0.25)]">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-[22px] sm:text-[28px] leading-snug text-white mb-2">
              Ready to write your family’s admissions success story?
            </h3>
            <p className="text-[14.5px] sm:text-[15.5px] font-sans text-[#f3eee5] leading-[1.7]">
              Schedule an introductory consultation with Dr. Amy Morgenstern and our senior counseling team to review your student’s profile and goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <a
              href={HUBSPOT_CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-lightBlue hover:from-[#095296] hover:to-[#1b7ec5] text-white font-heading font-semibold text-[14px] shadow-md transition-all whitespace-nowrap"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-heading font-medium text-[14px] transition-all whitespace-nowrap"
            >
              <span>Explore Our Services</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

