import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbHeroProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  badge?: string;
  description?: string;
  variant?: "dark" | "light";
}

export function BreadcrumbHero({
  breadcrumbs,
  title,
  badge,
  description,
  variant = "dark",
}: BreadcrumbHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative w-full py-6 sm:py-8 lg:py-9 overflow-hidden transition-colors",
        isDark
          ? "bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white border-b border-[#0d4f7c]"
          : "bg-gradient-to-r from-[#e8f3fc] via-[#edf6fd] to-[#f4f9fd] text-brand-navy border-b border-[#dbe7f3]",
      )}
    >
      {/* Ambient Radial Soft Glows & Brand Watermarks */}
      {isDark ? (
        <>
          <div
            className="absolute top-0 right-1/4 w-96 h-40 bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-10 w-72 h-32 bg-[#2ba3ea]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Subtle 4-Point Brand Stars Watermark */}
          <div
            className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 text-white opacity-[0.06] pointer-events-none select-none"
            aria-hidden="true"
          >
            <BrandStar className="w-full h-full fill-current" />
          </div>
          <div
            className="hidden sm:block absolute left-4 bottom-2 w-14 h-14 text-white opacity-[0.04] pointer-events-none select-none"
            aria-hidden="true"
          >
            <BrandStar className="w-full h-full fill-current" />
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-bl from-[#e3f1fc]/80 to-transparent rounded-bl-full pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-24 bg-gradient-to-tr from-[#e5f2fc]/60 to-transparent rounded-tr-full pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Row 1: Short, Compact Breadcrumbs (Aligned to LEFT) */}
        <div className="flex justify-start mb-3 sm:mb-4">
          <nav aria-label="Breadcrumb">
            <ol
              className={cn(
                "inline-flex items-center flex-wrap gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-[12.5px] font-sans shadow-xs transition-colors",
                isDark
                  ? "bg-white/10 backdrop-blur-md border border-white/15 text-[#d0e6f7]"
                  : "bg-white/80 backdrop-blur-sm border border-[#dbe7f3] text-brand-text",
              )}
            >
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className={cn(
                    "inline-flex items-center gap-1.5 font-medium transition-colors",
                    isDark
                      ? "text-[#bfe2fa] hover:text-white"
                      : "text-brand-text hover:text-brand-blue",
                  )}
                >
                  <Home
                    className={cn(
                      "w-3.5 h-3.5",
                      isDark ? "text-[#79c3f7]" : "text-brand-blue/70",
                    )}
                  />
                  <span>Home</span>
                </Link>
              </li>

              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;

                return (
                  <li
                    key={crumb.label}
                    className="inline-flex items-center gap-1.5 sm:gap-2"
                  >
                    <ChevronRight
                      className={cn(
                        "w-3 h-3 flex-shrink-0",
                        isDark ? "text-[#79c3f7]/60" : "text-brand-navy/30",
                      )}
                    />
                    {isLast || !crumb.href ? (
                      <span
  className={cn(
    "font-bold font-heading",
    isDark ? "text-white" : "text-brand-blue"
  )}
>
  <span className="sm:hidden">
    {crumb.label.length > 20
      ? `${crumb.label.slice(0, 20)}...`
      : crumb.label}
  </span>

  <span className="hidden sm:inline">
    {crumb.label}
  </span>
</span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className={cn(
                          "font-medium transition-colors truncate max-w-[160px] sm:max-w-none",
                          isDark
                            ? "text-[#bfe2fa] hover:text-white"
                            : "text-brand-text hover:text-brand-blue",
                        )}
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Row 2: Hero Content (Centered) */}
        <div className="flex flex-col items-center justify-center text-center mx-auto max-w-3xl">
          {badge && (
            <div
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-2.5 shadow-xs transition-colors",
                isDark
                  ? "bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7]"
                  : "bg-brand-sky border border-brand-border text-brand-blue",
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  isDark ? "bg-[#38bdf8]" : "bg-brand-blue",
                )}
                aria-hidden="true"
              />
              <span>{badge}</span>
            </div>
          )}

          <h1
            className={cn(
              "text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold font-heading tracking-tight leading-[1.2]",
              isDark ? "text-white" : "text-brand-navy",
            )}
          >
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                "text-xs sm:text-[14px] md:text-[15px] font-sans mt-2 max-w-2xl leading-relaxed text-center",
                isDark ? "text-[#d4e8f8]" : "text-brand-text",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
