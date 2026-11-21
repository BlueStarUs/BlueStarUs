import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SUCCESS_CYCLES } from "@/lib/successes-data";

const SELECTIVE_TAGS = ["Ivy League", "Elite Privates"];

/**
 * Data-led proof: figures are computed from the latest cycle in successes-data.ts,
 * so they update automatically when that file is updated.
 */
export function ResultsWall() {
  const cycle = SUCCESS_CYCLES[0];
  if (!cycle) return null;

  const offers = cycle.admissions.reduce((sum, a) => sum + (a.count ?? 1), 0);
  const colleges = cycle.admissions.length;
  const programs = cycle.summerPrograms?.length ?? 0;
  const selective = Array.from(
    new Set(
      cycle.admissions
        .filter((a) => a.tags?.some((t) => SELECTIVE_TAGS.includes(t)))
        .map((a) => a.institution)
        .filter((name) => !name.includes("–")) // skip sub-school duplicates
    )
  ).sort((a, b) => a.localeCompare(b));

  const stats = [
    { value: offers, label: `offers of admission in ${cycle.year}` },
    { value: colleges, label: "different colleges and universities" },
    ...(programs ? [{ value: programs, label: "selective summer programs" }] : []),
    { value: new Date().getFullYear() - 2010, label: "years guiding families" },
  ];

  return (
    <section id="recent-admissions" className="relative w-full bg-brand-ink text-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-mint mb-4">
              Results, in numbers
            </p>
            <h2 className="text-[32px] sm:text-[42px] leading-[1.1] text-white max-w-[620px]">
              Our {cycle.year} admissions season
            </h2>
          </div>
          <Link
            href="/successes"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/90 hover:text-brand-mint"
          >
            See every result by year <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 border-y border-white/15 py-10 mb-14">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[48px] sm:text-[60px] leading-none text-white">{s.value}</span>
                <span className="block mt-3 text-[13.5px] text-white/70 max-w-[180px]">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-white/60 mb-5">
          Highly selective admits in {cycle.year} include
        </p>
        <ul className="columns-2 sm:columns-3 lg:columns-4 gap-8 text-[15px] leading-[2.1] text-white/90 font-display">
          {selective.map((name) => (
            <li key={name} className="break-inside-avoid">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
