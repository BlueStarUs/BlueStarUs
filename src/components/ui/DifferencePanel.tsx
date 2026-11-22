import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Figures are taken from Blue Stars' published acceptance-rate comparison
 * (blog: "11x Higher Than Stanford's Own Admission Rate"). Update both together.
 */
const ROWS = [
  { college: "Stanford", logo: "/images/colleges/stanford.webp", ours: 45, official: 4, multiple: 11 },
  { college: "Princeton", logo: "/images/colleges/princeton.webp", ours: 43, official: 4, multiple: 11 },
  { college: "Dartmouth", logo: "/images/colleges/dartmouth.webp", ours: 50, official: 6, multiple: 8 },
  { college: "Columbia", logo: "/images/colleges/columbia.webp", ours: 42, official: 6, multiple: 7 },
  { college: "Brown", logo: "/images/colleges/brown.webp", ours: 28, official: 6, multiple: 5 },
];

/** Bars share one scale so the gap between the two rates is honest. */
const SCALE_MAX = 66;
const pct = (n: number) => `${(n / SCALE_MAX) * 100}%`;
const TOP_MULTIPLE = Math.max(...ROWS.map((r) => r.multiple));

/** Data-led panel for "Why Choose Blue Stars": glowing bars compare Blue Stars results with official rates. */
export function DifferencePanel() {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#051f3f] via-[#093566] to-[#0c4a8c] text-white p-6 sm:p-9 shadow-[0_28px_70px_rgba(6,38,74,0.35)] ring-1 ring-white/15">
      {/* Glow waves and constellation (decorative) */}
      <div
        className="absolute bottom-0 right-0 w-[420px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(56,189,248,0.38), transparent 62%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="grid h-10 w-10 place-items-center rounded-[10px] border border-sky-300/40 bg-white/5 text-sky-300">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <rect x="4" y="11" width="4" height="9" rx="1" />
              <rect x="10" y="4" width="4" height="16" rx="1" />
              <rect x="16" y="8" width="4" height="12" rx="1" />
            </svg>
          </span>
          <p className="text-[11px] sm:text-[11.5px] leading-snug font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-sky-100 font-sans">
            Data-driven, not guesswork
          </p>
        </div>

        <h3 className="font-display !text-white !font-medium leading-[1.05] mb-4">
          <span className="block text-[48px] sm:text-[62px] !text-[#4cc9f7]">Up to {TOP_MULTIPLE}&times;</span>
          <span className="relative mt-1 inline-block text-[26px] sm:text-[34px]">
            the official admit rate
          </span>
        </h3>

        <p className="mt-5 text-[14px] sm:text-[15px] leading-[1.6] text-white/80 max-w-[460px] mb-6">
          Blue Stars students&rsquo; acceptance rate compared with each college&rsquo;s published rate, at selected
          colleges.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/85 mb-6">
          <span className="inline-flex items-center gap-2.5">
            <span className="h-2.5 w-9 rounded-full bg-gradient-to-r from-[#22b8f0] to-[#5fd6ff]" aria-hidden="true" />
            Blue Stars students
          </span>
          <span className="inline-flex items-center gap-2.5">
            <span className="h-2.5 w-9 rounded-full bg-white/40" aria-hidden="true" />
            College&rsquo;s official rate
          </span>
        </div>

        <ul className="rounded-[18px] border border-white/10 bg-white/[0.05] px-4 sm:px-6 divide-y divide-white/10 backdrop-blur-[2px]">
          {ROWS.map((r) => (
            <li
              key={r.college}
              className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[152px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 sm:gap-x-5 py-4 sm:py-3.5"
            >
              <span className="sr-only">
                {r.college}: Blue Stars students {r.ours}% accepted versus an official rate of {r.official}%, about{" "}
                {r.multiple} times higher.
              </span>

              <span aria-hidden="true" className="flex items-center gap-3 min-w-0">
                <span className="relative block h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-white/30">
                  <Image src={r.logo} alt="" fill sizes="40px" className="object-contain p-1.5" />
                </span>
                <span className="text-[15px] sm:text-[16px] font-semibold text-white font-sans truncate">{r.college}</span>
              </span>

              <div aria-hidden="true" className="order-last col-span-2 space-y-2 sm:order-none sm:col-span-1 sm:space-y-1.5">
                <div className="relative h-2.5 rounded-full bg-white/10">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#22b8f0] to-[#5fd6ff] shadow-[0_0_16px_rgba(56,189,248,0.6)]"
                    style={{ width: pct(r.ours) }}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-[13px] font-semibold text-white"
                    style={{ left: `calc(${pct(r.ours)} + 10px)` }}
                  >
                    {r.ours}%
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-white/45" style={{ width: pct(r.official) }} />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-[12px] text-white/75 whitespace-nowrap"
                    style={{ left: `calc(${pct(r.official)} + 10px)` }}
                  >
                    {r.official}%
                  </span>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="min-w-[3.4rem] justify-self-end rounded-full border border-sky-300/45 bg-sky-400/10 px-3.5 py-1 text-center font-display text-[19px] sm:text-[20px] leading-tight text-white"
              >
                {r.multiple}&times;
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/blogs/11x-higher-than-standfords-own-admission-rate"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#0b4f94] shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-colors hover:bg-sky-100"
        >
          See all 25 colleges <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
