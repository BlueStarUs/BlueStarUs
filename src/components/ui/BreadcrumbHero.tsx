import React from "react";
import Link from "next/link";
import { BrandStar } from "@/components/ui/Icons";
import { BRAND_TAGLINE, BRAND_TAGLINE_PARTS } from "@/lib/brand";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbHeroProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  badge?: string;
  description?: string;
  /** Kept for backwards compatibility. Every inner page now uses the same ivory editorial hero. */
  variant?: "dark" | "light";
  /** Hide the brand tagline row. */
  classic?: boolean;
  /** Optional buttons or links shown under the description. */
  actions?: React.ReactNode;
}

/**
 * Shared inner-page hero. Matches the homepage: ivory background, serif ink title,
 * quiet breadcrumbs and the brand tagline, so every page reads as one boutique site.
 */
export function BreadcrumbHero({
  breadcrumbs,
  title,
  badge,
  description,
  classic = false,
  actions,
}: BreadcrumbHeroProps) {
  return (
    <section className="relative w-full bg-brand-ivory border-b border-[#ece6db] overflow-hidden">
      <div
        className="hidden md:block absolute right-10 top-10 w-16 h-16 text-brand-mint/40 pointer-events-none"
        aria-hidden="true"
      >
        <BrandStar className="w-full h-full fill-current" />
      </div>

      <div className="max-w-[1160px] mx-auto px-6 sm:px-10 pt-10 pb-12 sm:pt-12 sm:pb-16 relative">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-[#7a7f88]">
            <li>
              <Link href="/" className="hover:text-brand-ink transition-colors">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="text-[#c9c1b3]">
                    /
                  </span>
                  {isLast || !crumb.href ? (
                    <span className="text-brand-ink font-medium" aria-current={isLast ? "page" : undefined}>
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-brand-ink transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="max-w-[760px]">
          {badge && (
            <p className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4">{badge}</p>
          )}

          <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] text-brand-ink">{title}</h1>

          {description && (
            <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.7] text-[#5b6472] max-w-[640px]">{description}</p>
          )}

          {actions && <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">{actions}</div>}

          {!classic && (
            <ul
              aria-label={BRAND_TAGLINE}
              className="mt-8 pt-6 border-t border-[#e6dfd3] flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#7a7f88]"
            >
              {BRAND_TAGLINE_PARTS.map((part, i) => (
                <li key={part} className="inline-flex items-center gap-4">
                  {i > 0 && <BrandStar className="w-2.5 h-2.5 text-brand-mint" aria-hidden="true" />}
                  <span>{part}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
