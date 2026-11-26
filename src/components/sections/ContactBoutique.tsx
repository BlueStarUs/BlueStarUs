import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/team-data";
import { BrandTagline } from "@/components/ui/BrandTagline";

/** The first steps, as already described in the homepage process section. */
const STEPS = [
  {
    title: "You reach out",
    text: "Send us a note or book an Initial Consultation. Tell us about your teen, their ambitions, and your family's goals.",
  },
  {
    title: "You meet a counselor",
    text: "A real conversation, not a sales call. You get to know our philosophy, and we make sure we are the right fit for each other.",
  },
  {
    title: "We map the roadmap",
    text: "If there is a strong mutual fit, we schedule a 75-minute Strategy Consultation and build a plan around who your student already is.",
  },
];

/** Contact page: the boutique promise. Who is behind the inbox and what happens next. */
export function ContactBoutique() {
  return (
    <section className="relative w-full bg-brand-ivory py-14 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* Who is behind the inbox */}
          <div>
            <p className="mb-4 flex items-center gap-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              <span className="h-px w-8 bg-brand-ink" aria-hidden="true" />
              Boutique, not a call center
            </p>
            <h2 className="mb-5 text-[30px] leading-[1.1] text-brand-ink sm:text-[42px]">
              Your note is read by the people who would <span className="italic text-brand-blue">guide your student</span>
            </h2>
            <p className="mb-8 max-w-[520px] font-sans text-[16px] leading-[1.7] text-[#5b6472]">
              Blue Stars is a small senior team led by Dr. Amy Morgenstern. We take on a limited number of families, and
              every family works with one dedicated counselor. No hand-offs to a rotating pool of junior staff.
            </p>

            <ul className="mb-8 flex flex-wrap items-center gap-x-1 gap-y-4" aria-label="The Blue Stars counseling team">
              {TEAM_MEMBERS.map((m, i) => (
                <li key={m.name} className={i === 0 ? "" : "-ml-3"}>
                  <span className="relative block h-14 w-14 overflow-hidden rounded-full bg-white ring-[3px] ring-brand-ivory sm:h-16 sm:w-16">
                    <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover object-top" />
                  </span>
                </li>
              ))}
              <li className="pl-4 font-sans text-[13.5px] leading-snug text-[#5b6472]">
                Dr. Amy Morgenstern, Helen Ingerson,
                <br />
                Wai Cheng &amp; Samuel Ortiz
              </li>
            </ul>

            <BrandTagline className="mb-6 text-brand-ink" />

            <Link
              href="/about#team"
              className="group inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] transition-colors hover:text-brand-blue"
            >
              Meet the full team
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* What happens next */}
          <div>
            <p className="mb-5 font-sans text-[11.5px] font-semibold uppercase tracking-[0.22em] text-brand-blue">
              What happens next
            </p>
            <ol className="border-t border-[#e3dccf]">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-[#e3dccf] py-6 sm:gap-7">
                  <span className="w-12 flex-shrink-0 font-display text-[38px] leading-none text-brand-blue/70 sm:w-14 sm:text-[44px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-display text-[21px] !font-medium leading-snug !text-brand-ink sm:text-[23px]">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[15px] leading-[1.7] text-[#5b6472]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
