import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHeroConfig } from "@/lib/admin-store";
import { DEFAULT_HERO_CONFIG } from "@/lib/constants";
import { HeroConfig } from "@/types";

export interface HeroProps {
  customConfig?: Partial<HeroConfig>;
}

const TEAM_MONTAGE = "/images/teams/blue-stars-team-montage.webp";
// The previous stock hero photo. If the admin panel still points at it, show the team instead.
const LEGACY_STOCK_HERO = "Students_hero";

const CREDENTIALS = ["Ph.D. & MFA", "Former University Faculty", "Since 2010", "HECA", "IECA", "WACAC"];

/**
 * Boutique hero: the founder and counselors are the first thing a family sees.
 * Copy (kicker, three heading lines, description, buttons) stays editable in Admin → Hero.
 */
export async function Hero({ customConfig }: HeroProps = {}) {
  let heroConfig: HeroConfig = { ...DEFAULT_HERO_CONFIG };

  try {
    const fetched = await getHeroConfig();
    heroConfig = { ...heroConfig, ...fetched, ...customConfig };
  } catch {
    heroConfig = { ...heroConfig, ...customConfig };
  }

  const heroImage =
    heroConfig.image && !heroConfig.image.includes(LEGACY_STOCK_HERO) ? heroConfig.image : TEAM_MONTAGE;
  const primaryIsExternal = /^https?:\/\//.test(heroConfig.primaryBtnHref || "");

  return (
    <section className="relative w-full bg-brand-ivory overflow-hidden lg:min-h-[calc(100svh-9rem)] flex" id="home">
      <div className="mx-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] items-stretch">
        {/* Copy */}
        <div className="relative z-10 flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-6 pt-12 pb-8 sm:pt-16 lg:py-[clamp(1.5rem,4vh,4rem)]">
          <div className="w-full max-w-[560px] mx-auto lg:mx-0">
            <p className="text-[11.5px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-brand-blue mb-5 font-sans">
              {heroConfig.kicker}
            </p>

            <h1 className="text-[40px] sm:text-[52px] lg:text-[clamp(40px,6.2vh,64px)] leading-[1.04] text-brand-ink mb-6 lg:mb-[clamp(1rem,2.6vh,1.5rem)]">
              <span className="block">{heroConfig.headingLine1}</span>
              <span className="block italic text-brand-blue">
                {heroConfig.headingLine2} {heroConfig.headingLine3}
              </span>
            </h1>

            <p className="text-[16px] sm:text-[17px] lg:text-[clamp(15px,1.85vh,17px)] leading-[1.7] text-[#4a5568] mb-8 lg:mb-[clamp(1rem,3vh,2rem)] max-w-[500px]">
              {heroConfig.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-10 lg:mb-[clamp(1.25rem,3.5vh,2.5rem)]">
              <a
                href={heroConfig.primaryBtnHref || "/#contact"}
                {...(primaryIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink hover:bg-brand-ink text-white px-7 py-3.5 text-[14px] font-semibold tracking-wide transition-colors duration-200"
              >
                {heroConfig.primaryBtnText}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={heroConfig.secondaryBtnHref || "/#team"}
                className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-brand-ink underline decoration-brand-mint decoration-2 underline-offset-[6px] hover:text-brand-blue transition-colors"
              >
                {heroConfig.secondaryBtnText}
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-6 border-t border-[#e6dfd3] text-[11px] font-semibold tracking-[0.16em] uppercase text-[#7a7f88]">
              {CREDENTIALS.map((c, i) => (
                <li key={c} className="flex items-center gap-4">
                  {i > 0 && <span className="text-brand-mint" aria-hidden="true">&#9733;</span>}
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team montage */}
        <figure className="relative flex flex-col justify-end min-h-[320px] sm:min-h-[460px] lg:min-h-0">
          <div className="relative w-full aspect-[995/800] lg:absolute lg:inset-0 lg:aspect-auto">
            <Image
              src={heroImage}
              alt="Dr. Amy Morgenstern, founder of Blue Stars, with senior counselors Helen Ingerson, Samuel Ortiz and Wai Cheng"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-contain object-right-bottom"
            />
          </div>
          <figcaption className="relative z-10 px-6 sm:px-10 pb-4 pt-2 lg:absolute lg:bottom-5 lg:left-16 xl:left-20 lg:px-0 lg:pb-0 text-[12px] sm:text-[13px] text-[#6b7280] lg:text-white/85 italic font-display text-right lg:text-left">
            Dr. Amy Morgenstern with Helen Ingerson, Samuel Ortiz &amp; Wai Cheng
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
