import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Minus, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { BrandStar } from "@/components/ui/Icons";

/**
 * Comparison copy. The left column restates promises already made on the homepage; the right column is a general
 * description of high-volume agencies (no named competitors, no numbers). Confirm wording with the client.
 */
const COMPARISON = [
  {
    topic: "Your counselor",
    us: "One dedicated senior counselor for your family, often from 8th grade through the final decision.",
    them: "Work is handed between a rotating pool of junior staff.",
  },
  {
    topic: "Who we take on",
    us: "A limited number of families, so we start by making sure we are the right fit for each other.",
    them: "High volume, with many students per counselor.",
  },
  {
    topic: "Your student's story",
    us: "A plan built around who your student already is, drawn out through Socratic conversation.",
    them: "Templated timelines and formulaic applications.",
  },
  {
    topic: "How we decide",
    us: "College lists, timelines and strategy grounded in admissions data, not guesswork.",
    them: "Generic lists and one-size-fits-all advice.",
  },
  {
    topic: "Who leads",
    us: "Founded in 2010 and led by Dr. Amy Morgenstern, Ph.D., MFA, a former university professor.",
    them: "A corporate structure far from the families it serves.",
  },
];

const PROMISES = [
  { value: "1", label: "dedicated counselor per family" },
  { value: "8th–12th", label: "grade, from start to final decision" },
  { value: "Limited", label: "number of families each year" },
];

function SectionKicker({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-brand-blue ${
        center ? "justify-center" : ""
      }`}
    >
      <BrandStar className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </p>
  );
}

/** About page: the boutique story. Founder's note, boutique vs. large agency, and what families say. */
export function AboutBoutique() {
  const stories = TESTIMONIALS.slice(0, 3);

  return (
    <section id="boutique" className="relative overflow-hidden bg-brand-ivory py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* ---------- Founder's note ---------- */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[400px] lg:mx-0">
            {/* offset arch behind the portrait */}
            <div
              className="absolute -left-4 top-5 h-full w-full rounded-t-[200px] rounded-b-[14px] bg-[#dcebfb] sm:-left-6 sm:top-6"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[200px] rounded-b-[14px] bg-white shadow-[0_26px_60px_rgba(18,48,90,0.18)] ring-1 ring-[#ece6db]">
              <Image
                src="/images/teams/Dr_Amy_Morgenstern.png"
                alt="Dr. Amy Morgenstern, Founder of Blue Stars Admissions Consulting"
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-full bg-white py-2.5 pl-3 pr-5 shadow-[0_14px_34px_rgba(18,48,90,0.2)] ring-1 ring-[#ece6db] sm:-right-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-ink text-sky-200">
                <BrandStar className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-sans text-[13px] font-semibold leading-tight text-brand-ink">
                Boutique since 2010
              </span>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <SectionKicker>Why we stay small</SectionKicker>
            <h2 className="mb-7 text-[30px] leading-[1.1] text-brand-ink sm:text-[44px]">
              We never treat students like <span className="italic text-brand-blue">numbers</span> on an assembly line.
            </h2>

            <figure className="mb-9">
              <blockquote className="relative rounded-[22px] bg-white p-6 pt-9 font-display text-[18px] italic leading-[1.65] text-[#3f4a5a] shadow-[0_12px_34px_rgba(18,48,90,0.07)] ring-1 ring-[#ece6db] sm:p-8 sm:pt-10 sm:text-[21px]">
                <span
                  className="absolute left-6 top-1 font-display text-[64px] not-italic leading-none text-brand-mint sm:left-8"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                We intentionally founded Blue Stars as a boutique admissions firm. Unlike commercial agencies that
                churn out hundreds of formulaic applications, our senior team limits our student cohort to mentor
                each teenager with deep Socratic inquiry, institutional data, and unwavering personal care.&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-4 px-2">
                <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
                  <Image
                    src="/images/teams/Dr_Amy_Morgenstern.png"
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </span>
                <span>
                  <span className="block font-display text-[21px] leading-tight text-brand-ink">Dr. Amy Morgenstern</span>
                  <span className="block font-sans text-[13px] text-[#6b7280]">
                    Founder &amp; Principal Consultant &middot; Ph.D. Philosophy, MFA Contemporary Art
                  </span>
                </span>
              </figcaption>
            </figure>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PROMISES.map((item) => (
                <li
                  key={item.label}
                  className="rounded-[18px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(18,48,90,0.06)] ring-1 ring-[#ece6db]"
                >
                  <span className="block whitespace-nowrap font-display text-[30px] leading-none text-brand-blue">
                    {item.value}
                  </span>
                  <span className="mt-2 block font-sans text-[13.5px] leading-snug text-[#5b6472]">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Boutique vs. large agency ---------- */}
        <div className="mt-20 sm:mt-24 lg:mt-28">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <SectionKicker center>What makes us different</SectionKicker>
            <h2 className="mb-4 text-[30px] leading-[1.1] text-brand-ink sm:text-[44px]">
              A boutique practice, <span className="italic text-brand-blue">not a volume business</span>
            </h2>
            <p className="font-sans text-[15.5px] leading-[1.7] text-[#4a5568] sm:text-[17px]">
              Larger firms are built to scale. We are built so that every family is known by the person guiding them.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_22px_56px_rgba(18,48,90,0.1)] ring-1 ring-[#e3dccf]">
            <div className="hidden grid-cols-[0.75fr_1.45fr_1fr] md:grid">
              <span className="bg-brand-ivory" />
              <span className="flex items-center gap-2.5 bg-brand-ink px-8 py-5 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-white">
                <BrandStar className="h-4 w-4 text-sky-300" aria-hidden="true" />
                Blue Stars
              </span>
              <span className="bg-brand-ivory px-8 py-5 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-[#8a93a1]">
                A typical large agency
              </span>
            </div>

            <ul>
              {COMPARISON.map((row) => (
                <li
                  key={row.topic}
                  className="grid grid-cols-1 border-t border-[#ece6db] first:border-t-0 md:grid-cols-[0.75fr_1.45fr_1fr] md:border-t-0 md:[&:not(:first-child)]:border-t"
                >
                  <p className="px-6 pt-6 font-display text-[21px] leading-snug text-brand-ink md:px-8 md:py-7">
                    {row.topic}
                  </p>

                  <p className="flex items-start gap-3.5 bg-[#f3f8fe] px-6 py-5 font-sans text-[15.5px] font-medium leading-[1.6] text-brand-ink md:px-8 md:py-7">
                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-brand-blue text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue md:hidden">
                        Blue Stars
                      </span>
                      {row.us}
                    </span>
                  </p>

                  <p className="flex items-start gap-3.5 px-6 pb-6 pt-5 font-sans text-[14.5px] leading-[1.6] text-[#8a93a1] md:px-8 md:py-7">
                    <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-[#eef0f3] text-[#a3abb7]">
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="mb-1 block font-sans text-[11px] font-bold uppercase tracking-[0.14em] md:hidden">
                        Typical large agency
                      </span>
                      {row.them}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- What families say ---------- */}
        <div className="mt-20 sm:mt-24 lg:mt-28">
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionKicker>In their words</SectionKicker>
              <h2 className="text-[30px] leading-[1.1] text-brand-ink sm:text-[44px]">
                What families say <span className="italic text-brand-blue">about us</span>
              </h2>
            </div>
            <Link
              href="/testimonials"
              className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-brand-ink/25 px-6 py-2.5 font-sans text-[14px] font-semibold text-brand-ink transition-colors duration-200 hover:border-brand-ink hover:bg-brand-ink hover:text-white"
            >
              Read more stories
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
            {stories.map((t) => (
              <li
                key={t.id}
                className="group relative flex flex-col rounded-[24px] bg-white p-7 pt-9 shadow-[0_14px_38px_rgba(18,48,90,0.08)] ring-1 ring-[#ece6db] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(18,48,90,0.14)] sm:p-8 sm:pt-10"
              >
                <span
                  className="absolute left-7 top-3 font-display text-[60px] leading-none text-brand-mint sm:left-8"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <div className="mb-4 flex items-center gap-0.5" aria-label="5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>

                <p className="mb-6 line-clamp-6 font-display text-[17.5px] italic leading-[1.65] text-[#3f4a5a]">
                  {t.quote}
                </p>

                {t.admittedTo && (
                  <span className="mb-6 inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#e9f2fd] px-3.5 py-1.5 font-sans text-[12px] font-semibold text-[#0b4f94]">
                    <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{t.admittedTo}</span>
                  </span>
                )}

                <div className="mt-auto flex items-center gap-3.5 border-t border-[#ece6db] pt-5">
                  <span
                    className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-brand-ink font-display text-[19px] text-white"
                    aria-hidden="true"
                  >
                    {t.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-sans text-[15px] font-semibold text-brand-ink">{t.name}</p>
                    <p className="truncate font-sans text-[12.5px] text-[#6b7280]">{t.authorRole || t.location}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
