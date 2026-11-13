import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  ShieldCheck,
  Award,
  Star,
  Sparkles,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  LinkedinIcon,
  YoutubeIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { FooterNewsletter } from "@/components/ui/FooterNewsletter";
import { SITE_CONFIG } from "@/lib/constants";

const QUICK_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Our Services", href: "/services", icon: Layers },
  { name: "Successes", href: "/successes", icon: Award },
  { name: "Testimonials", href: "/testimonials", icon: Star },
  { name: "Resources & Insights", href: "/resources", icon: BookOpen },
  { name: "Blogs & Articles", href: "/blogs", icon: BookOpen },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Why Us", href: "/about#why-us", icon: Award },
  { name: "Contact Us", href: "/contact", icon: Mail },
  { name: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
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
        {/* Newsletter Subscription Bar: Get College Admissions Updates */}
        <div className="pt-10 pb-8 sm:pt-12 sm:pb-10 border-b border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#79c3f7] font-bold font-heading mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Stay Ahead in Admissions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight">
              Get College Admissions Updates
            </h3>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#bfe2fa]/85 font-sans mt-1">
              Receive seasonal deadlines, expert webinars, Ivy &amp; UC strategy insights, and actionable tips delivered directly to your inbox.
            </p>
          </div>

          <FooterNewsletter />
        </div>

        {/* Main Footer Content Row */}
        <div className="py-14 sm:py-16 lg:py-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_auto_1.1fr_auto_1.35fr] gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col items-start">
            {/* Brand Logo */}
            <Link
              href="/"
              className="inline-flex items-center group focus:outline-none select-none mb-4"
              aria-label={SITE_CONFIG.name}
            >
              <Image
                src="/images/BlueStars_Admission_Consulting_Logo.webp"
                alt="Blue Stars Admissions Consulting"
                width={220}
                height={120}
                className="h-10 sm:h-[85px] w-auto object-contain brightness-0 invert opacity-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.03] drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
              />
            </Link>

            {/* Description */}
            <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-[#d0e6f7] max-w-[340px] font-sans mb-6">
              Personalized college admissions consulting to help you achieve your academic goals and build a brighter future.
            </p>

            {/* Glassmorphic Social Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.pinterest}
                target="_blank"
                rel="noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-[10px] bg-[#0f4d78]/60 hover:bg-brand-blue border border-[#267db5]/40 hover:border-brand-lightBlue grid place-items-center text-white transition-all duration-200 hover:scale-105 shadow-sm"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
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
              <ul className="space-y-2.5 w-full ">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 py-1 group text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#e0effa] hover:text-white transition-colors"
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
                <span className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] font-medium text-white tracking-wide truncate">
                  {SITE_CONFIG.contact.email}
                </span>
              </a>

              {/* Phone & WhatsApp */}
              <div className="w-full bg-[#0a4570]/50 hover:bg-[#0c4e7e]/70 backdrop-blur-md border border-[#1b6d9e]/40 hover:border-[#2a8fd6]/60 rounded-[14px] p-2 pr-3 sm:p-2.5 sm:pr-4 flex items-center justify-between gap-2 transition-all group">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                  title="Direct Telephone Call"
                >
                  <span className="w-9 h-9 rounded-[10px] bg-[#0a5285] group-hover:bg-brand-blue border border-[#2983ba]/50 grid place-items-center text-white flex-shrink-0 shadow-sm transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] font-medium text-white tracking-wide truncate">
                    {SITE_CONFIG.contact.phone}
                  </span>
                </a>
                <a
                  href="https://wa.me/14154269444?text=Hi%20Blue%20Stars%2C%20I%20am%20interested%20in%20college%20admissions%20counseling."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold font-heading transition-colors flex-shrink-0 shadow-xs"
                  title="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>

              {/* Location */}
              <div className="w-full bg-[#0a4570]/50 backdrop-blur-md border border-[#1b6d9e]/40 rounded-[14px] p-2 pr-5 sm:p-2.5 sm:pr-6 flex items-center gap-3.5">
                <span className="w-9 h-9 rounded-[10px] bg-[#0a5285] border border-[#2983ba]/50 grid place-items-center text-white flex-shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] font-medium text-white tracking-wide truncate">
                  {SITE_CONFIG.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Accreditations & Affiliations Trust Banner */}
        <div className="border-t border-white/15 pt-8 pb-7 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="block text-xs uppercase tracking-[0.14em] text-[#79c3f7] font-bold font-heading">
              Professional Memberships &amp; Ethical Standards
            </span>
            <span className="block text-xs sm:text-[13px] text-[#bfe2fa]/80 font-sans mt-0.5">
              Proud members of HECA, WACAC, and IECA adhering to the highest admissions counseling ethics.
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {/* BBB Accredited Business Seal */}
            <a
              href="https://www.bbb.org/us/ca/san-francisco/profile/educational-consultant/blue-stars-admissions-consulting-1116-968560/#sealclick"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blue Stars Admissions Consulting Better Business Bureau A+ Accredited Business Profile"
              className="bg-white/95 hover:bg-white rounded-[5px] px-3 py-1.5 shadow-xs transition-all hover:scale-105"
              title="Blue Stars Admissions Consulting BBB Business Review"
            >
              <Image
                src="/images/badges/bbb-seal.png"
                alt="Better Business Bureau Accredited Business A+ Rating"
                width={110}
                height={36}
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </a>

            {/* 16 Years of Student Success Badge
            <div
              className="bg-white/95 rounded-[5px] px-2.5 py-1 shadow-xs flex items-center gap-2"
              title="Blue Stars Admissions Consulting - 16 Years of Student Success"
            >
              <Image
                src="/images/badges/16-years-success.png"
                alt="16 Years of Student Success"
                width={36}
                height={30}
                className="h-7 w-auto object-contain"
              />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#07466F] font-heading leading-tight uppercase hidden sm:inline">
                16 Years of<br />Student Success
              </span>
            </div> */}

            {/* HECA */}
            <div className="bg-white/95 rounded-[5px] px-3.5 py-1.5 shadow-xs hover:bg-white transition-colors">
              <Image
                src="/images/badges/heca.gif"
                alt="HECA - Higher Education Consultants Association"
                width={90}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>

            {/* WACAC */}
            <div className="bg-white/95 rounded-[5px] px-3.5 py-1.5 shadow-xs hover:bg-white transition-colors">
              <Image
                src="/images/badges/wacac.png"
                alt="WACAC - Western Association for College Admission Counseling"
                width={110}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>

            {/* IECA */}
            <div className="bg-white/95 rounded-[5px] px-3.5 py-1.5 shadow-xs hover:bg-white transition-colors">
              <Image
                src="/images/badges/ieca.png"
                alt="IECA - Independent Educational Consultants Association Professional Member"
                width={120}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar with Horizontal Divider */}
        <div className="border-t-[1px] border-[#ffffff]/50 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[14px] sm:text-[14.5px] text-[#a8d1ee] font-sans">
          <span>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
          <div className="flex items-center gap-4 sm:gap-6 font-heading font-medium text-[#d2e9fb]">
            <Link
              href="/privacy-policy"
              className="hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-[#1c6496]" aria-hidden="true">|</span>
            <Link
              href="#"
              className="hover:text-white underline-offset-4 hover:underline transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
