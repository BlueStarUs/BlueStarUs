import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ShieldCheck,
  Lock,
  Cookie,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  FileText,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Blue Stars Admissions Consulting",
  description:
    "Read the Blue Stars Admissions Consulting privacy policy. Learn how we collect, safeguard, and protect your personal data when you use bluestars.us.",
  openGraph: {
    title: "Privacy Policy | Blue Stars Admissions Consulting",
    description:
      "Learn how Blue Stars Admissions Consulting protects your personal data and online privacy.",
    url: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F8FD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header Section */}
        <section className="relative w-full py-14 sm:py-18 lg:py-20 bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden border-b border-[#2072a7]/40">
          {/* Subtle Ambient Wave Lights */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            aria-hidden="true"
          >
            <div className="absolute -top-16 -left-12 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 right-10 w-96 h-72 bg-[#00b4d8]/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#79bbf0] text-xs sm:text-[13px] font-bold uppercase tracking-wider font-heading mb-4">
              <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
              <span>Transparency &amp; Trust</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-extrabold text-white font-heading tracking-tight leading-[1.15] mb-4">
              Privacy Policy
            </h1>

            <p className="text-[15px] sm:text-[16.5px] leading-[25px] sm:leading-[27px] text-[#d4e8f8] max-w-2xl font-sans mb-3">
              This privacy policy explains how Blue Stars Admissions Consulting uses and protects the data you provide to us when you visit and use{" "}
              <a
                href={SITE_CONFIG.url}
                className="underline hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                bluestars.us
              </a>
              .
            </p>

            <div className="text-xs sm:text-sm text-[#9bc6e6] font-sans">
              Last updated: <span className="font-semibold text-white">{lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Policy Content Layout */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Sidebar / Quick Summary Card (Desktop sticky) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-[12px] p-6 border border-brand-border shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-[8px] bg-brand-sky text-brand-blue grid place-items-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="font-heading font-extrabold text-lg text-brand-navy">
                    Policy Overview
                  </h2>
                </div>
                <p className="text-xs sm:text-[13.5px] leading-[21px] text-brand-text mb-4 font-sans">
                  We are committed to safeguarding student and family confidentiality with modern security protocols and ethical practices.
                </p>

                <nav className="space-y-1.5 text-xs sm:text-[13px] font-heading font-semibold text-brand-navy border-t border-brand-border/60 pt-4">
                  <a
                    href="#introduction"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    1. Introduction &amp; Scope
                  </a>
                  <a
                    href="#data-we-collect"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    2. What User Data We Collect
                  </a>
                  <a
                    href="#why-we-collect"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    3. Why We Collect Your Data
                  </a>
                  <a
                    href="#safeguarding"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    4. Safeguarding &amp; Security
                  </a>
                  <a
                    href="#cookies"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    5. Cookie Policy
                  </a>
                  <a
                    href="#external-links"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    6. External Website Links
                  </a>
                  <a
                    href="#restricting-data"
                    className="block px-2.5 py-1.5 rounded-[6px] hover:bg-brand-sky/60 hover:text-brand-blue transition-colors"
                  >
                    7. Restricting Personal Data
                  </a>
                </nav>
              </div>

              {/* Direct Help / Questions Card */}
              <div className="bg-brand-sky/50 rounded-[12px] p-6 border border-[#cbe1f5]">
                <div className="flex items-center gap-2 mb-2 text-brand-navy font-heading font-bold text-sm sm:text-base">
                  <Lock className="w-4 h-4 text-brand-blue" />
                  <span>Privacy Inquiries</span>
                </div>
                <p className="text-xs sm:text-[13px] text-brand-text mb-4 leading-relaxed font-sans">
                  Have questions or wish to delete or update your data? Contact our advisory office directly:
                </p>
                <div className="space-y-2 text-xs font-semibold text-brand-navy font-heading">
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center gap-2 text-brand-blue hover:text-brand-navy transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{SITE_CONFIG.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 text-brand-navy hover:text-brand-blue transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-[#2F9E5C]" />
                    <span>{SITE_CONFIG.contact.phone}</span>
                  </a>
                  <div className="flex items-center gap-2 text-brand-text font-normal font-sans pt-1">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-brand-blue" />
                    <span>{SITE_CONFIG.contact.address}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Policy Content (8 columns) */}
            <article className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* 1. Introduction */}
              <div
                id="introduction"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-brand-sky text-brand-blue grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Introduction &amp; Scope
                  </h2>
                </div>
                <div className="space-y-3.5 text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  <p>
                    This privacy policy (&ldquo;policy&rdquo;) will help you understand how Blue Stars (&ldquo;us&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) uses and protects the data you provide to us when you visit and use{" "}
                    <a
                      href={SITE_CONFIG.url}
                      className="text-brand-blue font-semibold hover:underline"
                    >
                      bluestars.us
                    </a>{" "}
                    (&ldquo;website&rdquo;, &ldquo;service&rdquo;).
                  </p>
                  <p>
                    We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
                  </p>
                </div>
              </div>

              {/* 2. What User Data We Collect */}
              <div
                id="data-we-collect"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-brand-sky text-brand-blue grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    What User Data We Collect
                  </h2>
                </div>
                <p className="text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                  When you visit the website, we may collect the following data:
                </p>
                <ul className="space-y-2.5 text-[14.5px] sm:text-[15px] text-brand-navy font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Your IP address.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Your contact information and email address.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Other information such as interests and preferences.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Data profile regarding your online behavior on our website.</span>
                  </li>
                </ul>
              </div>

              {/* 3. Why We Collect Your Data */}
              <div
                id="why-we-collect"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-[#E3F5EA] text-[#2F9E5C] grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Why We Collect Your Data
                  </h2>
                </div>
                <p className="text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                  We are collecting your data for several reasons:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-[8px] bg-[#f8fbfe] border border-brand-border/80">
                    <div className="font-heading font-bold text-sm text-brand-navy mb-1">
                      Understand Your Needs
                    </div>
                    <p className="text-xs text-brand-text font-sans">
                      To better understand your student&apos;s educational goals and counseling requirements.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-[8px] bg-[#f8fbfe] border border-brand-border/80">
                    <div className="font-heading font-bold text-sm text-brand-navy mb-1">
                      Improve Programs &amp; Services
                    </div>
                    <p className="text-xs text-brand-text font-sans">
                      To continually enhance our mentorship frameworks, guides, and admissions tools.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-[8px] bg-[#f8fbfe] border border-brand-border/80">
                    <div className="font-heading font-bold text-sm text-brand-navy mb-1">
                      Relevant Communications
                    </div>
                    <p className="text-xs text-brand-text font-sans">
                      To send you informative emails containing webinars, admissions deadlines, and guide releases.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-[8px] bg-[#f8fbfe] border border-brand-border/80">
                    <div className="font-heading font-bold text-sm text-brand-navy mb-1">
                      Surveys &amp; Feedback
                    </div>
                    <p className="text-xs text-brand-text font-sans">
                      To contact you to fill out surveys and participate in educational market research.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-[8px] bg-[#f8fbfe] border border-brand-border/80 sm:col-span-2">
                    <div className="font-heading font-bold text-sm text-brand-navy mb-1">
                      Website Customization
                    </div>
                    <p className="text-xs text-brand-text font-sans">
                      To customize our website experience according to your online behavior and personal preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Safeguarding and Securing the Data */}
              <div
                id="safeguarding"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-brand-sky text-brand-blue grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Safeguarding and Securing the Data
                  </h2>
                </div>
                <div className="space-y-3.5 text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  <p>
                    Blue Stars Admissions Consulting is committed to securing your data and keeping it confidential. Blue Stars has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.
                  </p>
                  <div className="p-4 rounded-[8px] bg-[#eef7fc] border border-[#cbe1f5] flex items-start gap-3">
                    <Lock className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-brand-navy font-sans">
                      All web traffic between your browser and our servers is encrypted using modern Transport Layer Security (TLS/HTTPS). Stored inquiries and client records are protected by access-controlled cloud infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Our Cookie Policy */}
              <div
                id="cookies"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-brand-sky text-brand-blue grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Our Cookie Policy
                  </h2>
                </div>
                <div className="space-y-3.5 text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  <p>
                    Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you spend the most time on, and websites you visit).
                  </p>
                  <p>
                    The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.
                  </p>
                  <p>
                    Please note that cookies don’t allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.
                  </p>
                  <div className="p-4 rounded-[8px] bg-[#f8fbfe] border border-brand-border">
                    <div className="flex items-center gap-2 text-sm font-bold text-brand-navy font-heading mb-1.5">
                      <Cookie className="w-4 h-4 text-brand-blue" />
                      <span>Disabling Cookies in Your Browser</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-brand-text font-sans leading-relaxed">
                      If you want to disable cookies, you can do it by accessing the privacy and security settings of your internet browser (e.g. Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge).
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Links to Other Websites */}
              <div
                id="external-links"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-brand-sky text-brand-blue grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Links to Other Websites
                  </h2>
                </div>
                <div className="space-y-3.5 text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  <p>
                    Our website contains links that lead to other websites (such as external scholarship directories, college admissions offices, and scheduling platforms like HubSpot). If you click on these links, Blue Stars is not held responsible for your data and privacy protection.
                  </p>
                  <p>
                    Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website.
                  </p>
                </div>
              </div>

              {/* 7. Restricting the Collection of your Personal Data */}
              <div
                id="restricting-data"
                className="bg-white rounded-[12px] p-6 sm:p-8 border border-brand-border shadow-xs scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[6px] bg-[#E3F5EA] text-[#2F9E5C] grid place-items-center flex-shrink-0 font-heading font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Restricting the Collection of Your Personal Data
                  </h2>
                </div>
                <div className="space-y-3.5 text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  <p>
                    At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:
                  </p>
                  <ul className="space-y-2.5 text-brand-navy font-sans">
                    <li className="flex items-start gap-2.5">
                      <UserCheck className="w-4.5 h-4.5 text-[#2F9E5C] flex-shrink-0 mt-0.5" />
                      <span>
                        When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, if you don&apos;t want to disclose your personal information.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <UserCheck className="w-4.5 h-4.5 text-[#2F9E5C] flex-shrink-0 mt-0.5" />
                      <span>
                        If you have already agreed to share your information with us, feel free to contact us via email at{" "}
                        <a
                          href={`mailto:${SITE_CONFIG.contact.email}`}
                          className="text-brand-blue font-bold hover:underline"
                        >
                          {SITE_CONFIG.contact.email}
                        </a>{" "}
                        and we will be more than happy to change or purge this for you.
                      </span>
                    </li>
                  </ul>
                  <div className="p-4 rounded-[8px] bg-white border border-[#2F9E5C]/30 bg-[#2F9E5C]/[0.03]">
                    <p className="text-xs sm:text-[13.5px] text-brand-navy leading-relaxed font-sans font-medium">
                      Blue Stars Admissions Consulting will not lease, sell, or distribute your personal information to any third parties, unless we have your permission. We might do so only if the law forces us. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation CTA Banner */}
              <div className="p-6 sm:p-8 rounded-[12px] bg-gradient-to-r from-brand-navy to-brand-darkNavy text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-heading mb-1 text-white">
                    Ready to Begin Your College Journey?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d4e8f8] font-sans max-w-md">
                    Schedule a confidential 30-minute introductory consultation with our senior advisory team.
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-[6px] bg-white hover:bg-[#d8ecfc] text-brand-navy font-bold text-xs sm:text-[13.5px] font-heading shadow-md transition-all flex-shrink-0"
                >
                  Book Free Consultation
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

