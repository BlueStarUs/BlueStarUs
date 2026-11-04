import React from "react";
import Link from "next/link";
import {
  Home,
  Layers,
  GraduationCap,
  BookOpen,
  Info,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";

const QUICK_LINKS = [
  { name: "Home", href: "/#home", icon: Home },
  { name: "Our Services", href: "/services", icon: Layers },
  { name: "Resources & Insights", href: "/resources", icon: BookOpen },
  { name: "Success Stories", href: "/stories", icon: GraduationCap },
  { name: "Blogs & Articles", href: "/blogs", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact Us", href: "/contact", icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden mt-auto">
      {/* Flowing Ambient Cyan/Blue Light Waves in Background (Matching reference) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft Radial Ambient Lights */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#0096c7]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[300px] bg-[#00b4d8]/20 rounded-full blur-3xl" />

        {/* Luminous Flowing Wave Ribbons */}
        <svg
          className="absolute -bottom-10 -left-24 w-[600px] h-[220px] text-[#00b4d8] opacity-25 blur-xs"
          viewBox="0 0 600 220"
          fill="none"
        >
          <path
            d="M0 120 C 150 190, 320 50, 600 140 L 600 220 L 0 220 Z"
            fill="currentColor"
          />
        </svg>

        <svg
          className="absolute -bottom-14 -right-20 w-[680px] h-[250px] text-[#00b4d8] opacity-30 blur-xs"
          viewBox="0 0 680 250"
          fill="none"
        >
          <path
            d="M0 170 C 220 70, 440 200, 680 90 L 680 250 L 0 250 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content Row */}
        <div className="py-14 sm:py-16 lg:py-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_auto_1.1fr_auto_1.35fr] gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col items-start">
            {/* Dual Star Logo */}
            <Link
              href="/#home"
              className="inline-flex items-center gap-3 group focus:outline-none select-none mb-4"
              aria-label={SITE_CONFIG.name}
            >
              <div className="relative w-9 h-9 flex-shrink-0">
                <BrandStar className="w-7 h-7 text-white fill-white absolute top-0 right-0 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
                <BrandStar className="w-4 h-4 text-white fill-white absolute bottom-0 left-0 drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)]" />
              </div>
              <span className="flex flex-col">
                <span className="font-heading text-2xl sm:text-[26px] font-extrabold text-white leading-none tracking-tight">
                  BlueStars
                </span>
                <span className="font-heading text-[8px] font-bold tracking-[0.16em] text-[#d6ecfb] uppercase mt-1 leading-tight">
                  ADMISSIONS CONSULTING
                </span>
              </span>
            </Link>

            {/* Description */}
            <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-[#d0e6f7] max-w-[340px] font-sans mb-6">
              Personalized college admissions consulting to help you achieve your academic goals and build a brighter future.
            </p>

            {/* Glassmorphic Social Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Luminous Vertical Divider 1 (Desktop) */}
          <div
            className="hidden lg:block w-[1px] h-60 bg-gradient-to-b from-transparent via-[#2597e0]/40 to-transparent self-center"
            aria-hidden="true"
          />

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start w-full">
            <h3 className="font-heading font-extrabold text-[20px] sm:text-[22px] text-white tracking-tight">
              Quick Links
            </h3>
            {/* Cyan indicator bar */}
            <div className="w-10 h-[3px] bg-[#00b4d8] rounded-full mt-1.5 mb-5" />

            <nav className="w-full" aria-label="Footer Quick Links">
              <ul className="space-y-2.5 w-full">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 py-1 group text-xs sm:text-[13.5px] text-[#e0effa] hover:text-white transition-colors"
                      >
                        <span className="w-7 h-7 rounded-[8px] bg-[#0d4f7c]/80 group-hover:bg-brand-blue border border-[#2177ab]/40 grid place-items-center text-white flex-shrink-0 transition-colors shadow-xs">
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-medium font-sans flex-1">
                          {link.name}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#7dbde8] group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Luminous Vertical Divider 2 (Desktop) */}
          <div
            className="hidden lg:block w-[1px] h-60 bg-gradient-to-b from-transparent via-[#2597e0]/40 to-transparent self-center"
            aria-hidden="true"
          />

          {/* Column 3: Contact */}
          <div className="flex flex-col items-start w-full">
            <h3 className="font-heading font-extrabold text-[20px] sm:text-[22px] text-white tracking-tight">
              Contact
            </h3>
            {/* Cyan indicator bar */}
            <div className="w-10 h-[3px] bg-[#00b4d8] rounded-full mt-1.5 mb-5" />

            {/* Glassmorphic Contact Pills */}
            <div className="space-y-3 w-full">
              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="w-full bg-[#0a4570]/50 hover:bg-[#0c4e7e]/70 backdrop-blur-md border border-[#1b6d9e]/40 hover:border-[#2a8fd6]/60 rounded-[14px] p-2 pr-5 sm:p-2.5 sm:pr-6 flex items-center gap-3.5 transition-all group"
              >
                <span className="w-9 h-9 rounded-[10px] bg-[#0a5285] group-hover:bg-brand-blue border border-[#2983ba]/50 grid place-items-center text-white flex-shrink-0 shadow-sm transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-[13.5px] font-medium text-white tracking-wide truncate">
                  {SITE_CONFIG.contact.email}
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="w-full bg-[#0a4570]/50 hover:bg-[#0c4e7e]/70 backdrop-blur-md border border-[#1b6d9e]/40 hover:border-[#2a8fd6]/60 rounded-[14px] p-2 pr-5 sm:p-2.5 sm:pr-6 flex items-center gap-3.5 transition-all group"
              >
                <span className="w-9 h-9 rounded-[10px] bg-[#0a5285] group-hover:bg-brand-blue border border-[#2983ba]/50 grid place-items-center text-white flex-shrink-0 shadow-sm transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-[13.5px] font-medium text-white tracking-wide truncate">
                  +1 (655) 123-4567
                </span>
              </a>

              {/* Location */}
              <div className="w-full bg-[#0a4570]/50 backdrop-blur-md border border-[#1b6d9e]/40 rounded-[14px] p-2 pr-5 sm:p-2.5 sm:pr-6 flex items-center gap-3.5">
                <span className="w-9 h-9 rounded-[10px] bg-[#0a5285] border border-[#2983ba]/50 grid place-items-center text-white flex-shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-[13.5px] font-medium text-white tracking-wide truncate">
                  United States
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Horizontal Divider */}
        <div className="border-t border-[#185e8d]/40 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-[12.5px] text-[#a8d1ee] font-sans">
          <span>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
          <div className="flex items-center gap-4 sm:gap-6 font-heading font-medium text-[#d2e9fb]">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#1c6496]" aria-hidden="true">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
