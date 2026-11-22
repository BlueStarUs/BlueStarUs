"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Target,
  Lightbulb,
  PenTool,
  ShieldCheck,
} from "lucide-react";

interface CoreAreaItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
  href: string;
}

const CORE_AREAS_DATA: CoreAreaItem[] = [
  {
    id: "ignite-passions",
    title: "Identify and ignite passions",
    description:
      "Uncover genuine intellectual curiosities so coursework, capstones, and extracurricular spikes develop naturally.",
    icon: Compass,
    accent: "blue",
    href: "/services/college-planning",
  },
  {
    id: "organized-focused",
    title: "Become more organized and focused",
    description:
      "Cultivate high-level executive functioning, disciplined study systems, and balanced schedules for AP/IB demands.",
    icon: Target,
    accent: "green",
    href: "/services/college-admissions-consulting",
  },
  {
    id: "solve-problems",
    title: "Solve problems on their own",
    description:
      "Foster independent thinking, resilience, and personal initiative so students self-advocate and lead impactful projects.",
    icon: Lightbulb,
    accent: "blue",
    href: "/services/research-internships",
  },
  {
    id: "sharpen-story",
    title: "Sharpen their story and write eloquently",
    description:
      "Socratic narrative coaching that helps teens explore core values, build distinctive voice, and write standout essays.",
    icon: PenTool,
    accent: "green",
    href: "/services/essay-guidance",
  },
  {
    id: "calm-way",
    title: "Become calmer and function effectively",
    description:
      "Embrace 'The Calm Way'—replacing admissions anxiety with clarity, emotional balance, and lifelong healthy habits.",
    icon: ShieldCheck,
    accent: "blue",
    href: "/about",
  },
];

export function CoreAreasSection() {
  return (
    <section id="core-areas" className="relative w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-10 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4">
            Personal growth leads the way
          </p>
          <h2 className="text-[32px] sm:text-[42px] leading-[1.1] text-brand-ink mb-5">
            What we help every student build
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#5b6472]">
            Admissions consulting should build confidence, not frenzy. We mentor teens across five foundational
            dimensions that lead to strong applications and meaningful lives.
          </p>
        </div>
        <ol className="border-t border-[#e6dfd3]">
          {CORE_AREAS_DATA.map((area, i) => (
            <li key={area.id} className="border-b border-[#e6dfd3]">
              <Link href={area.href} className="group grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:gap-6 py-7">
                <span className="font-display text-[18px] text-brand-blue pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[22px] sm:text-[24px] text-brand-ink leading-snug group-hover:text-brand-blue transition-colors">
                    {area.title}
                  </span>
                  <span className="block mt-2 text-[15px] leading-[1.7] text-[#5b6472]">{area.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
