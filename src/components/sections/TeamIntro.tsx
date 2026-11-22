import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/lib/team-data";

/** Homepage introduction to the real people behind Blue Stars. Full bios live on /about. */
export function TeamIntro() {
  return (
    <section id="team" className="relative w-full bg-brand-ivory py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-10">
        <div className="max-w-[640px] mb-14">
          <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4">
            Meet the team
          </p>
          <h2 className="text-[32px] sm:text-[42px] leading-[1.1] text-brand-ink mb-5">
            The people your family will actually work with
          </h2>
          <p className="text-[16px] leading-[1.7] text-[#5b6472]">
            A small senior team of educators, editors and former admissions insiders. No hand-offs to a rotating
            pool of junior staff.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {TEAM_MEMBERS.map((m) => (
            <li key={m.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[160px] rounded-b-[6px] bg-white mb-5">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-display text-[22px] text-brand-ink leading-snug">{m.name}</h3>
              <p className="text-[13px] font-semibold text-brand-blue mt-1 mb-2">{m.role}</p>
              <p className="text-[13.5px] leading-[1.6] text-[#5b6472]">{m.credentials}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/about#team"
          className="inline-block mt-12 text-[14px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue"
        >
          Read full team bios
        </Link>
      </div>
    </section>
  );
}
