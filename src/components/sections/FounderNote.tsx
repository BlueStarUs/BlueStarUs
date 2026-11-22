import React from "react";
import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  {
    title: "Personalized",
    text: "One dedicated counselor per family, and a plan built around who your student already is.",
  },
  {
    title: "Data driven",
    text: "College lists, timelines and strategy grounded in admissions data, not guesswork.",
  },
  {
    title: "Results oriented",
    text: "Clear milestones from early high school to decision day, measured every step of the way.",
  },
];

/** A short, signed note from the founder, placed directly under the hero. */
export function FounderNote() {
  return (
    <section id="founder" className="relative w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-12 lg:gap-20 items-center">
        <div className="relative mx-auto lg:mx-0 w-full max-w-[380px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[190px] rounded-b-[8px] bg-brand-ivory">
            <Image
              src="/images/teams/Dr_Amy_Morgenstern.png"
              alt="Dr. Amy Morgenstern, Founder of Blue Stars Admissions Consulting"
              fill
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-4 text-center lg:text-left text-[12px] tracking-[0.16em] uppercase text-[#7a7f88] font-semibold">
            Ph.D. Philosophy &middot; MFA Contemporary Art
          </p>
        </div>

        <div>
          <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-5">
            A note from our founder
          </p>
          <h2 className="text-[32px] sm:text-[40px] leading-[1.12] text-brand-ink mb-7">
            We never treat students like numbers on an assembly line.
          </h2>
          <blockquote className="font-display italic text-[19px] sm:text-[21px] leading-[1.6] text-[#3f4a5a] border-l-2 border-brand-mint pl-6 mb-6">
            &ldquo;We intentionally founded Blue Stars as a boutique admissions firm. Unlike commercial agencies that
            churn out hundreds of formulaic applications, our senior team limits our student cohort to mentor each
            teenager with deep Socratic inquiry, institutional data, and unwavering personal care.&rdquo;
          </blockquote>
          <p className="font-display text-[22px] text-brand-ink mb-1">Dr. Amy M.</p>
          <p className="text-[13px] text-[#7a7f88] mb-12">Founder &amp; Principal Consultant</p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[#ece6db] pt-8">
            {PILLARS.map((p) => (
              <div key={p.title}>
                <dt className="font-display text-[20px] text-brand-ink mb-2">{p.title}</dt>
                <dd className="text-[14px] leading-[1.65] text-[#5b6472]">{p.text}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="inline-block mt-10 text-[14px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue"
          >
            Read Dr. Morgenstern&rsquo;s story
          </Link>
        </div>
      </div>
    </section>
  );
}
