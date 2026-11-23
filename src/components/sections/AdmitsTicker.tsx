import React from "react";
import Link from "next/link";
import { BrandStar } from "@/components/ui/Icons";

/**
 * Highly selective colleges where Blue Stars students have been admitted.
 * Every name below appears in the admissions records in src/lib/successes-data.ts.
 * School names are set in type rather than logos, so the strip stays on-brand and
 * avoids implying any affiliation with the universities.
 */
const ADMITTED_SCHOOLS = [
  "Harvard",
  "Stanford",
  "Yale",
  "Princeton",
  "MIT",
  "Columbia",
  "UPenn",
  "Brown",
  "Dartmouth",
  "Cornell",
  "Caltech",
  "UChicago",
  "Duke",
  "Johns Hopkins",
  "Northwestern",
  "Rice",
  "WashU",
  "Carnegie Mellon",
  "Georgetown",
  "Emory",
  "Notre Dame",
  "UC Berkeley",
  "UCLA",
  "NYU Stern",
  "USC",
  "Tufts",
  "Harvey Mudd",
  "Boston College",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="admits-ticker__row flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ADMITTED_SCHOOLS.map((school) => (
        <li key={school} className="flex items-center">
          <span className="font-display text-[19px] sm:text-[21px] text-brand-ink whitespace-nowrap px-6 sm:px-8">
            {school}
          </span>
          <BrandStar className="w-2.5 h-2.5 text-brand-mint shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

/** A slow, pausable strip of admitted schools shown under the homepage hero. */
export function AdmitsTicker() {
  return (
    <section aria-labelledby="admits-ticker-label" className="w-full bg-white border-y border-[#ece6db]">
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row md:items-center">
        <div className="shrink-0 px-6 sm:px-10 lg:pl-16 xl:pl-24 pt-6 md:py-6 md:pr-8 md:border-r md:border-[#ece6db]">
          <p
            id="admits-ticker-label"
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7a7f88] leading-relaxed"
          >
            Blue Stars students
            <br className="hidden md:block" /> have been admitted to
          </p>
        </div>

        <div className="admits-ticker relative flex-1 overflow-hidden py-5 md:py-6">
          <div className="admits-ticker__track flex w-max">
            <Row />
            <Row hidden />
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"
            aria-hidden="true"
          />
        </div>

        <Link
          href="/successes"
          className="shrink-0 self-start md:self-auto px-6 sm:px-10 pb-6 md:py-6 md:pl-8 md:pr-10 xl:pr-16 text-[13px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue whitespace-nowrap"
        >
          All results
        </Link>
      </div>
    </section>
  );
}
