import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceRow {
  number: string;
  title: string;
  when: string;
  description: string;
  href: string;
}

const PRIMARY_SERVICES: ServiceRow[] = [
  {
    number: "01",
    title: "College Planning",
    when: "From 8th grade",
    description:
      "Find the right colleges for your goals, interests and profile with a multi-year Calm Way roadmap: courses, activities, summers and research, planned well before senior year.",
    href: "/services/college-planning",
  },
  {
    number: "02",
    title: "College Admissions",
    when: "Junior & senior year",
    description:
      "Individually tailored advising, coaching and mentoring: a balanced college list, application strategy and positioning, essays, interviews and deadlines.",
    href: "/services/college-admissions-consulting",
  },
  {
    number: "03",
    title: "Art Admissions",
    when: "BFA, MFA & design programs",
    description:
      "Portfolio mentorship and a compelling artist statement for top art and design schools, guided by a founder who holds an MFA in contemporary art.",
    href: "/services/art-admissions-consulting",
  },
];

const ALSO_INCLUDED = [
  { label: "Research & internships", href: "/services/research-internships" },
  { label: "Application strategy & positioning", href: "/services/application-strategy" },
  { label: "Essay & personal statement guidance", href: "/services/essay-guidance" },
];

/** Three ways we work with families, set as editorial rows rather than a card grid. */
export function Services() {
  return (
    <section id="services" className="relative w-full bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4">
              How we help
            </p>
            <h2 className="text-[32px] sm:text-[42px] leading-[1.1] text-brand-ink mb-5">
              Three ways we work with families
            </h2>
            <p className="text-[16px] leading-[1.7] text-[#5b6472] mb-8">
              Every plan is built one student at a time. Most families begin early and stay with the same counselor
              through every application.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue"
            >
              View all services
            </Link>
          </div>

          <div>
            <ol className="border-t border-[#e6dfd3]">
              {PRIMARY_SERVICES.map((s) => (
                <li key={s.number} className="border-b border-[#e6dfd3]">
                  <Link href={s.href} className="group grid grid-cols-[48px_minmax(0,1fr)_24px] gap-4 sm:gap-6 py-8 sm:py-10">
                    <span className="font-display text-[18px] text-brand-blue pt-1.5">{s.number}</span>
                    <span>
                      <span className="block font-display text-[26px] sm:text-[30px] text-brand-ink leading-tight group-hover:text-brand-blue transition-colors">
                        {s.title}
                      </span>
                      <span className="block text-[11.5px] font-semibold tracking-[0.18em] uppercase text-[#7a7f88] mt-2 mb-3">
                        {s.when}
                      </span>
                      <span className="block text-[15px] leading-[1.7] text-[#5b6472]">{s.description}</span>
                    </span>
                    <ArrowRight className="w-5 h-5 text-brand-ink mt-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#7a7f88] mb-3">
                Included where your student needs it
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {ALSO_INCLUDED.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} className="text-[14.5px] text-brand-ink hover:text-brand-blue underline-offset-4 hover:underline">
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
