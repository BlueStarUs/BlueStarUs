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
    <section className="w-full py-12 sm:py-20 bg-white border-t border-brand-border/70">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sky text-brand-blue text-xs font-semibold uppercase tracking-wider font-heading mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>The Blue Stars Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-brand-navy tracking-tight">
            Why Blue Stars Students Consistently Stand Out
          </h2>
          <p className="text-sm sm:text-base font-sans text-brand-text mt-3 leading-relaxed">
            Behind every Ivy League acceptance, full-ride merit award, and UC Regents scholarship is a deliberate, highly personalized admissions roadmap focused on authenticity, rigor, and peace of mind.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {METHODOLOGY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-[5px] border border-brand-border/80 bg-brand-bg/40 p-4 sm:p-6 hover:bg-white hover:border-brand-blue/30 hover:shadow-card transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-[5px] bg-brand-sky flex items-center justify-center text-brand-navy mb-3.5">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-brand-navy mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-brand-text leading-relaxed mb-3">
                  {pillar.description}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-brand-border/60">
                  {pillar.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-1.5 text-xs sm:text-[13px] font-sans text-brand-navy"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9E5C] flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner linking to Consultation & Services */}
        <div className="rounded-[5px] bg-gradient-to-r from-brand-navy via-brand-darkNavy to-brand-navy text-white p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-card">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-1.5">
              Ready to write your family’s admissions success story?
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#cfe6fa] leading-relaxed">
              Schedule an introductory consultation with Dr. Amy Morgenstern and our senior counseling team to review your student’s profile and goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <a
              href={HUBSPOT_CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[5px] bg-gradient-to-r from-brand-blue to-brand-lightBlue hover:from-[#095296] hover:to-[#1b7ec5] text-white font-heading font-semibold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-medium text-xs sm:text-sm transition-all whitespace-nowrap"
            >
              <span>Explore Our Services</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

