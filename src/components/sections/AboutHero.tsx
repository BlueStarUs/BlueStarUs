import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, ChevronRight, Clock, Home, Target, Users } from "lucide-react";
import { BRAND_TAGLINE, BRAND_TAGLINE_PARTS } from "@/lib/brand";

function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="4" y="11" width="4" height="9" rx="1" />
      <rect x="10" y="4" width="4" height="16" rx="1" />
      <rect x="16" y="8" width="4" height="12" rx="1" />
    </svg>
  );
}

/** One icon and one short descriptor per tagline word, in the same order as BRAND_TAGLINE_PARTS. */
const TAGLINE_FEATURES = [
  { icon: BarsIcon, note: "Insights & strategy" },
  { icon: Users, note: "One-on-one guidance" },
  { icon: Target, note: "Measurable outcomes" },
];

/** Same curved left edge for every photo layer so the arcs nest. */
const ARC_CLIP = "[clip-path:ellipse(100%_153%_at_100%_100%)]";

/**
 * About page first screen: dark hero with the brand tagline, campus photo inside a blue arc, and the overlapping
 * consultation card. On desktop the whole block fills the viewport below the sticky header (announcement bar + nav).
 */
export function AboutHero() {
  return (
    <div className="relative flex flex-col bg-[#f3eee5] lg:min-h-[calc(100svh-7.8rem)]">
      {/* ---------- Hero ---------- */}
      <section className="relative flex-1 overflow-hidden bg-brand-ink pb-32 text-white sm:pb-36 lg:pb-[11.5rem]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 62% 30%, rgba(56,189,248,0.18), transparent 55%)" }}
          aria-hidden="true"
        />

        {/* Campus photo inside nested arcs: faint outer band, bright blue ring, then the photo */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[41%] lg:block" aria-hidden="true">
          <div className={`absolute inset-y-0 right-0 w-[calc(100%+3.8rem)] bg-white/[0.07] ${ARC_CLIP}`} />
          <div
            className={`absolute inset-y-0 right-0 w-[calc(100%+1.9rem)] bg-gradient-to-b from-[#6cc4fa] to-[#2d86e8] ${ARC_CLIP}`}
          />
          <div className={`absolute inset-y-0 right-0 w-full ${ARC_CLIP}`}>
            <Image
              src="/images/about/hero-campus-v2.webp"
              alt=""
              fill
              priority
              sizes="42vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 pt-7 sm:px-6 sm:pt-9 lg:px-8 lg:pt-[clamp(1.25rem,3.4vh,2.2rem)]">
          <div className="lg:max-w-[54%]">
            <nav aria-label="Breadcrumb" className="mb-6 lg:mb-[clamp(0.9rem,3.2vh,2rem)]">
              <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] backdrop-blur-md">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center gap-1.5 font-medium text-sky-100 hover:text-white">
                    <Home className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Home</span>
                  </Link>
                </li>
                <li className="inline-flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-sky-200/60" aria-hidden="true" />
                  <span className="font-semibold text-white">About Us</span>
                </li>
              </ol>
            </nav>

            <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-sky-300/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-sky-100 lg:mb-[clamp(0.8rem,2.6vh,1.5rem)]">
              <BookOpen className="h-4 w-4 text-sky-300" aria-hidden="true" />
              Our story &amp; philosophy
            </p>

            <h1 className="mb-4 text-[36px] leading-[1.06] !text-white sm:text-[50px] lg:mb-[clamp(0.9rem,2.8vh,1.7rem)] lg:text-[clamp(38px,min(3.9vw,7.1vh),68px)]">
              Navigating Futures, Crafting
              <span className="relative block w-fit text-[#5cc7f5]">Success Stories</span>
            </h1>

            <p className="mb-7 max-w-[780px] text-[16px] leading-[1.6] text-white/90 sm:text-[17px] lg:mb-[clamp(1rem,3.6vh,2.3rem)] lg:text-[clamp(15px,2.3vh,21px)]">
              16+ years of dedicated admissions consulting partnering with teens and families to make higher education
              admissions an empowering, transformative milestone.
            </p>

            <ul aria-label={BRAND_TAGLINE} className="flex flex-nowrap items-center justify-between gap-2 sm:gap-3 lg:gap-4">
              {BRAND_TAGLINE_PARTS.map((part, i) => {
                const { icon: Icon, note } = TAGLINE_FEATURES[i];
                return (
                  <li
                    key={part}
                    className={
                      i > 0
                        ? "flex min-w-0 flex-1 items-center gap-2 border-l border-white/20 pl-2 sm:gap-3 sm:pl-4 lg:pl-5"
                        : "flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
                    }
                  >
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#10355f] text-sky-200 ring-1 ring-white/10 sm:h-12 sm:w-12 xl:h-14 xl:w-14">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 xl:h-6 xl:w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block whitespace-nowrap text-[11.5px] font-semibold leading-tight text-white min-[400px]:text-[13px] sm:text-[15px] xl:text-[17px]">
                        {part}
                      </span>
                      <span className="hidden whitespace-nowrap text-[12px] text-white/75 sm:block xl:text-[13.5px]">{note}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile and tablet: the campus photo sits below the text (desktop shows it in the arc on the right) */}
          <div className="relative mx-auto mt-9 aspect-[16/11] w-full max-w-[640px] overflow-hidden rounded-[26px] border-[3px] border-sky-300/60 shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:hidden">
            <Image
              src="/images/about/hero-campus-v2.webp"
              alt="A university campus with stone buildings covered in ivy"
              fill
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </div>

        {/* Soft curve into the light area below */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-14 w-full text-[#f3eee5] lg:h-24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 120V78C180 108 420 118 720 108C1020 98 1280 70 1440 52V120Z" />
        </svg>
      </section>

      {/* ---------- Consultation card (overlaps the hero) ---------- */}
      <section className="relative z-20 mx-auto -mt-16 w-full max-w-[1360px] px-4 pb-8 sm:-mt-20 sm:px-6 lg:-mt-[8.5rem] lg:px-8 lg:pb-10">
        <div className="grid grid-cols-1 items-center gap-6 rounded-[30px] bg-white p-6 shadow-[0_26px_70px_rgba(6,38,74,0.22)] ring-1 ring-[#f3eee5] sm:p-8 lg:grid-cols-[minmax(0,1.5fr)_auto_minmax(0,1fr)] lg:gap-9 lg:px-9 lg:py-[clamp(1.25rem,3.4vh,2rem)]">
          <div className="flex items-center gap-5 sm:gap-7">
            <div className="hidden h-[5.5rem] w-[5.5rem] flex-shrink-0 place-items-center rounded-[22px] bg-[#f3eee5] text-brand-blue sm:grid">
              <CalendarCheck className="h-10 w-10" aria-hidden="true" />
            </div>
            <div>
              <p className="mb-2 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344155]">
                <span className="hidden h-0.5 w-6 bg-brand-ink sm:block" aria-hidden="true" />
                Save time &bull; Stress less &bull; Achieve continuously
                <span className="hidden h-0.5 w-6 bg-brand-ink sm:block" aria-hidden="true" />
              </p>
              <h2 className="mb-2 text-[28px] leading-[1.08] text-brand-ink sm:text-[36px] lg:text-[clamp(28px,4.4vh,42px)]">
                Begin Your Journey With a
                <span className="block text-brand-blue">Personal Consultation</span>
              </h2>
              <p className="max-w-[600px] text-[15px] leading-[1.6] text-[#344155] lg:text-[clamp(14px,1.9vh,17px)]">
                Schedule an introductory strategy session to evaluate where your student stands and map an
                actionable roadmap toward selective college acceptances.
              </p>
            </div>
          </div>

          <div className="hidden h-full min-h-[7rem] w-px bg-[#f3eee5] lg:block" aria-hidden="true" />

          <div className="rounded-[22px] bg-white p-5 text-center sm:p-6">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f3eee5] text-brand-blue">
                <Clock className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="text-left">
                <span className="block font-display text-[32px] leading-none text-brand-ink sm:text-[38px]">1-on-1</span>
                <span className="mt-1 block text-[14px] text-[#344155]">Initial Consultation</span>
              </div>
            </div>
            <Link
              href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-3.5 text-[15px] font-semibold tracking-wide text-white shadow-[0_1px_3px_rgba(18,48,90,0.05)] transition-transform duration-200 hover:scale-[1.02]"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
