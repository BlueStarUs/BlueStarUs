import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroActionsProps {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** The standard boutique button pair: a solid ink pill and an underlined text link. */
export function HeroActions({ primary, secondary }: HeroActionsProps) {
  const external = /^https?:\/\//.test(primary.href);
  return (
    <>
      <a
        href={primary.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink hover:bg-brand-blue text-white px-7 py-3.5 text-[14px] font-semibold tracking-wide transition-colors"
      >
        {primary.label}
        <ArrowRight className="w-4 h-4" />
      </a>
      {secondary && (
        <Link
          href={secondary.href}
          className="inline-flex items-center justify-center text-[14px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue transition-colors"
        >
          {secondary.label}
        </Link>
      )}
    </>
  );
}
