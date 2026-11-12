"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  badge: string;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">
      {members.map((member) => {
        const isExpanded = !!expandedMembers[member.name];

        return (
          <div
            key={member.name}
            className="bg-white rounded-[5px] border border-[#e2eef9] shadow-[0_6px_24px_rgba(10,61,107,0.06)] hover:shadow-[0_16px_36px_rgba(10,61,107,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between group h-full"
          >
            <div>
              {/* Photo with Overlay Badge */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-[4px] bg-[#07466f]/90 backdrop-blur-md text-white text-[10px] sm:text-[10.5px] font-bold font-heading border border-white/20 tracking-wider">
                  {member.badge}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-[18px] sm:text-[19px] font-extrabold text-brand-navy font-heading mb-1 leading-snug group-hover:text-brand-blue transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs sm:text-[12.5px] font-bold text-brand-blue font-heading mb-1">
                  {member.role}
                </div>
                <div className="text-[11.5px] text-brand-text/80 font-sans italic mb-3">
                  {member.credentials}
                </div>

                {/* Professional Accreditation Badges (HECA, WACAC, IECA) */}
                {member.affiliations && member.affiliations.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-3 pt-2 border-t border-[#e2eef9]">
                    <span className="text-[10px] font-bold text-brand-navy/70 uppercase tracking-wider font-heading mr-0.5">
                      Accredited:
                    </span>
                    {member.affiliations.map((aff) => (
                      <div
                        key={aff.name}
                        className="h-6 px-1.5 py-0.5 rounded-[3px] bg-[#f0f6fc] border border-[#dce8f5] flex items-center justify-center shadow-2xs"
                        title={aff.name}
                      >
                        <Image
                          src={aff.image}
                          alt={aff.name}
                          width={36}
                          height={16}
                          className="max-h-3.5 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Bio text with 4-line clamp & modern Read More / Read Less toggle */}
                <div>
                  <p
                    className={cn(
                      "text-[13px] sm:text-[13.5px] leading-[20px] sm:leading-[22px] text-brand-text font-sans transition-all duration-200",
                      !isExpanded && "line-clamp-4"
                    )}
                  >
                    {member.bio}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggleMember(member.name)}
                    className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors cursor-pointer select-none group/btn"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Read Less" : "Read More"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-y-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 sm:p-5 pt-0">
              <div className="pt-3 border-t border-[#edf4fb]">
                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 py-2.5 px-3 rounded-[5px] text-xs font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm font-heading group-hover:scale-[1.01]"
                >
                  <span>Book Free 30-Min Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

