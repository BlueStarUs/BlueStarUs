"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Sparkles } from "lucide-react";

interface UniversityLogoItem {
  name: string;
  shortName: string;
  image: string;
  width: number;
  height: number;
  url: string;
}

const RECENT_ADMISSIONS_LOGOS: UniversityLogoItem[] = [
  {
    name: "Princeton University",
    shortName: "Princeton",
    image: "/images/logos_rd/princeton-logo-white-400x109.webp",
    width: 400,
    height: 109,
    url: "https://www.princeton.edu/",
  },
  {
    name: "Stanford University",
    shortName: "Stanford",
    image: "/images/logos_rd/stanford-logo-white-400x121.webp",
    width: 400,
    height: 121,
    url: "https://www.stanford.edu/",
  },
  {
    name: "Harvard University",
    shortName: "Harvard",
    image: "/images/logos_rd/harvard-university-logo-white-400x105.webp",
    width: 400,
    height: 105,
    url: "https://www.harvard.edu/",
  },
  {
    name: "Columbia University",
    shortName: "Columbia",
    image: "/images/logos_rd/columbia-logo-white-400x59.webp",
    width: 400,
    height: 59,
    url: "https://www.columbia.edu/",
  },
];

export function RecentAdmissionsLogos() {
  return (
    <section
      className="relative w-full py-8 sm:py-10 lg:py-12 bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0A3D6B] text-white border-y border-[#1a5b88]/50 overflow-hidden"
      id="recent-admissions"
      aria-label="Recent Admissions"
    >
      {/* Ambient Radial Background Glow */}
      <div
        className="absolute -top-16 -left-16 w-72 h-72 bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#2ba3ea]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Header Title with Star Badge */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#0c5989]/80 border border-[#2794dc]/40 text-[#79c3f7] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] font-heading mb-2 shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>PROVEN TRACK RECORD</span>
            </div>
            <h2 className="text-2xl sm:text-[26px] md:text-[28px] font-extrabold text-white font-heading tracking-tight leading-snug">
              Recent Admissions
            </h2>
            <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[25px] text-[#cfe4f6] font-sans mt-1 max-w-sm">
              Admitted to America&apos;s most selective universities.
            </p>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div
            className="hidden lg:block w-[1px] h-14 bg-gradient-to-b from-transparent via-[#2597e0]/40 to-transparent self-center"
            aria-hidden="true"
          />

          {/* Logos Responsive Grid */}
          <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-6 sm:gap-8 lg:gap-10">
            {RECENT_ADMISSIONS_LOGOS.map((uni) => (
              <a
                key={uni.name}
                href={uni.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center p-2 sm:p-3 transition-all duration-300 w-full max-w-[180px] sm:max-w-[200px]"
                aria-label={`Visit ${uni.name}`}
              >
                <div className="relative h-10 sm:h-12 lg:h-14 w-full flex items-center justify-center">
                  <Image
                    src={uni.image}
                    alt={`${uni.name} logo`}
                    width={uni.width}
                    height={uni.height}
                    className="max-h-8 sm:max-h-10 lg:max-h-11 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

