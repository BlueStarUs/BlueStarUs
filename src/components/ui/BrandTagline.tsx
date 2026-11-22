import React from "react";
import { BRAND_TAGLINE, BRAND_TAGLINE_PARTS } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface BrandTaglineProps {
  /** "inline": one row with stars between the words. "stacked": one word per line (compact, for the navbar). */
  layout?: "inline" | "stacked";
  /** Text colour class; the star separators use the mint brand colour. */
  className?: string;
}

/** The Blue Stars tagline, "Data-Driven, Personalized, Results-Oriented", rendered the same way everywhere. */
export function BrandTagline({ layout = "inline", className }: BrandTaglineProps) {
  if (layout === "stacked") {
    return (
      <ul
        aria-label={BRAND_TAGLINE}
        className={cn("flex flex-col gap-0.5 font-sans text-[9.5px] font-semibold uppercase leading-[1.15] tracking-[0.16em]", className)}
      >
        {BRAND_TAGLINE_PARTS.map((part) => (
          <li key={part}>{part}</li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      aria-label={BRAND_TAGLINE}
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]",
        className
      )}
    >
      {BRAND_TAGLINE_PARTS.map((part, i) => (
        <li key={part} className="inline-flex items-center gap-3">
          {i > 0 && (
            <span className="text-brand-mint" aria-hidden="true">
              &#9733;
            </span>
          )}
          {part}
        </li>
      ))}
    </ul>
  );
}
