"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronUp, GraduationCap, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  badge: string;
  /** Optional: when set, a LinkedIn button is shown on the photo. */
  linkedin?: string;
  affiliations?: { name: string; image: string }[];
}

interface TeamMembersGridProps {
  members: TeamMember[];
}

export function TeamMembersGrid({ members }: TeamMembersGridProps) {
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});

  const toggleMember = (name: string) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-7">
      {members.map((member) => {
        const isExpanded = !!expandedMembers[member.name];
        const bioId = `bio-${member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

        return (
          <article
            key={member.name}
            className="group flex flex-col rounded-[28px] bg-white p-3 shadow-[0_20px_50px_rgba(11,99,181,0.12)] ring-1 ring-[#dbe9f8] transition-shadow duration-300 hover:shadow-[0_26px_60px_rgba(11,99,181,0.2)]"
          >
            {/* Photo on a blue panel */}
            <div className="relative aspect-[1/0.88] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#3a8fe3] via-[#1d63b9] to-[#0c3f86]">
              <div className="pointer-events-none absolute -right-10 -top-12 h-52 w-52 rounded-full bg-white/10" aria-hidden="true" />
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 340px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white/25 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0b4f94]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="flex flex-1 flex-col px-2.5 pb-1 pt-3.5">
              <h3 className="font-display text-[25px] leading-tight !font-medium text-brand-ink">{member.name}</h3>

              <div className="mt-2.5 lg:min-h-[3.1rem]">
                <span className="inline-flex rounded-full bg-[#e3effc] px-3.5 py-1.5 font-sans text-[12px] font-bold uppercase leading-snug tracking-[0.07em] text-[#0b4f94]">
                  {member.role}
                </span>
              </div>

              <div className="mt-2.5 flex items-start gap-3 lg:min-h-[4.1rem]">
                <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-ink" aria-hidden="true" />
                <p className="font-sans text-[14.5px] font-medium leading-[1.4] text-brand-ink">{member.credentials}</p>
              </div>

              <div className="mt-2.5 mb-3">
                <p
                  id={bioId}
                  className={cn("font-sans text-[14.5px] leading-[1.55] text-[#344155]", !isExpanded && "line-clamp-2")}
                >
                  {member.bio}
                </p>

                <button
                  type="button"
                  onClick={() => toggleMember(member.name)}
                  className="mt-2 inline-flex cursor-pointer select-none items-center gap-1.5 font-sans text-[14.5px] font-semibold text-[#0b4f94] underline underline-offset-4 transition-colors hover:text-brand-ink"
                  aria-expanded={isExpanded}
                  aria-controls={bioId}
                >
                  <span>{isExpanded ? "Read less" : "Read more"}</span>
                  {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>

              <div className="mt-auto">
                {member.affiliations && member.affiliations.length > 0 && (
                  <div className="mb-3 flex flex-wrap items-center gap-2 border-t border-[#e3eef9] pt-2.5">
                    <span className="font-sans text-[14.5px] font-bold text-brand-ink">Accredited</span>
                    {member.affiliations.map((aff) => (
                      <div
                        key={aff.name}
                        className="flex h-9 items-center justify-center rounded-full bg-white px-3 shadow-[0_4px_12px_rgba(11,99,181,0.12)] ring-1 ring-[#e3eef9]"
                        title={aff.name}
                      >
                        <Image
                          src={aff.image}
                          alt={aff.name}
                          width={40}
                          height={18}
                          className="max-h-4 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-[#e3eef9] px-1 pb-1 pt-4 sm:px-0 sm:pb-0 sm:pt-3">
                  <Link
                    href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#2b6cb8]/45 px-5 py-3 text-center font-sans text-[13.5px] font-bold leading-tight sm:py-2.5 sm:px-4 sm:text-[14px] text-brand-ink transition-colors duration-200 hover:border-brand-ink hover:bg-brand-ink hover:text-white"
                  >
                    <span className="whitespace-nowrap">Book Free 30-Min Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
