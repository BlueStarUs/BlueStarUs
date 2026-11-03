"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy strictly active ONLY on homepage ("/")
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleScrollSpy = () => {
      // If at top of home page
      if (window.scrollY < 120) {
        setActiveHash("home");
        return;
      }

      const sections = ["contact", "resources", "planning", "services", "home"];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveHash(section);
            return;
          }
        }
      }
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Precise active check for every nav item
  const isLinkActive = (href: string) => {
    // 1. Dedicated About page
    if (href === "/about") {
      return pathname === "/about";
    }

    // 2. Services catalog or individual service dynamic routes
    if (href === "/services") {
      return pathname.startsWith("/services");
    }

    // 3. Dedicated Contact page
    if (href === "/contact") {
      return pathname === "/contact";
    }

    // 4. Homepage anchor sections (only when on homepage)
    if (pathname === "/") {
      if (href === "/#home" || href === "/") {
        return activeHash === "home";
      }
      if (href === "/#planning") {
        return activeHash === "planning";
      }
      if (href === "/#resources") {
        return activeHash === "resources";
      }
      if (href === "/#contact") {
        return activeHash === "contact";
      }
    }

    return false;
  };

  const isContactActive = pathname === "/contact";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/100 border-b border-[#e2eef9] transition-all duration-300",
        isScrolled
          ? "shadow-[0_4px_24px_rgba(10,61,107,0.08)] py-0"
          : "shadow-[0_2px_12px_rgba(10,61,107,0.03)]"
      )}
    >
      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[80px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/#home"
          className="flex items-center gap-3 group cursor-pointer focus:outline-none rounded-lg select-none"
          aria-label={SITE_CONFIG.name}
          onClick={() => setIsOpen(false)}
        >
          {/* Dual Star Logo Mark */}
          <div className="relative w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <BrandStar className="w-7 h-7 text-brand-blue fill-brand-blue absolute top-0 right-0 drop-shadow-[0_2px_8px_rgba(11,99,181,0.25)]" />
            <BrandStar className="w-4 h-4 text-[#2A8FD6] fill-[#2A8FD6] absolute bottom-0 left-0 drop-shadow-[0_2px_6px_rgba(42,143,214,0.25)]" />
          </div>

          <span className="flex flex-col">
            <span className="font-heading text-2xl sm:text-[25px] font-extrabold text-brand-navy leading-none tracking-tight">
              BlueStars
            </span>
            <span className="font-heading text-[8px] sm:text-[8.5px] font-bold tracking-[0.16em] text-brand-blue uppercase mt-1 leading-tight">
              ADMISSIONS CONSULTING
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-9 text-[14.5px] sm:text-[15px] font-semibold font-heading"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((item) => {
            const active = isLinkActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1.5 transition-colors duration-200 select-none",
                  active
                    ? "text-brand-blue font-bold"
                    : "text-brand-navy hover:text-brand-blue font-medium"
                )}
              >
                <span>{item.label}</span>
                {active && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full animate-in fade-in duration-200"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Secondary Action: Contact Us (Pill Button) */}
          <Link
            href="/contact"
            className={cn(
              "hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading shadow-sm transition-all duration-200 border",
              isContactActive
                ? "bg-brand-blue text-white border-brand-blue shadow-md"
                : "text-brand-blue bg-white hover:bg-brand-navy hover:text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border-brand-blue"
            )}
          >
            <span>Contact Us</span>
          </Link>

          {/* Primary Action: Get Started (Pill Button) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-brand-blue"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="md:hidden w-11 h-11 rounded-[12px] bg-[#E3F1FC] text-brand-navy hover:text-brand-blue grid place-items-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5 stroke-[2.4]" /> : <Menu className="w-5 h-5 stroke-[2.4]" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/100 border-b border-[#e2eef9] px-5 py-5 shadow-[0_20px_40px_rgba(10,61,107,0.12)] animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "py-3 px-4 rounded-[12px] text-[15px] font-bold font-heading transition-colors flex items-center justify-between",
                    active
                      ? "bg-[#E3F1FC] text-brand-blue font-extrabold"
                      : "text-brand-navy hover:bg-[#E3F1FC]/50 hover:text-brand-blue"
                  )}
                >
                  <span>{item.label}</span>
                  {active ? (
                    <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-brand-blue/60" />
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#e2eef9] flex flex-col gap-2.5">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "w-full py-3 px-4 rounded-full text-center text-xs sm:text-[13px] font-bold font-heading transition-all shadow-xs",
                  isContactActive
                    ? "bg-brand-blue text-white"
                    : "text-brand-blue bg-[#E3F1FC] hover:bg-brand-blue hover:text-white"
                )}
              >
                Contact Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 rounded-full text-center text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
