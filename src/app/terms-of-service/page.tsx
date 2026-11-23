import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  FileText,
  ShieldCheck,
  Scale,
  Calendar,
  AlertCircle,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG, HUBSPOT_CONSULTATION_URL } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for Blue Stars Admissions Consulting. Understand our educational advisory scope, consultation policies, and website terms.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-of-service`,
  },
  openGraph: {
    title: "Terms of Service | Blue Stars Admissions Consulting",
    description:
      "Review the Terms of Service governing the use of Blue Stars Admissions Consulting services, consultations, and digital resources.",
    url: `${SITE_CONFIG.url}/terms-of-service`,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Blue Stars Admissions Consulting",
    description:
      "Review the Terms of Service governing the use of Blue Stars Admissions Consulting services.",
    images: ["/images/og-image.png"],
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "November 2026";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms-of-service" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f3eee5]">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Navbar />

      <main className="flex-1">
        {/* Hero Header Section */}
        <section className="relative w-full py-14 sm:py-18 lg:py-20 bg-brand-ink text-white overflow-hidden border-b border-[#2072a7]/40">
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            aria-hidden="true"
          >
          </div>

          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#79bbf0] text-xs sm:text-[13px] font-bold uppercase tracking-wider font-heading mb-4">
              <Scale className="w-4 h-4 text-[#38bdf8]" />
              <span>Legal Agreement &amp; Advisory Scope</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-extrabold text-white font-heading tracking-tight leading-[1.15] mb-4">
              Terms of Service
            </h1>

            <p className="text-[15px] sm:text-[16.5px] leading-[25px] sm:leading-[27px] text-[#f3eee5] max-w-2xl font-sans mb-3">
              Please review these Terms of Service before using our website, scheduling consultations, or accessing educational materials provided by{" "}
              <strong>Blue Stars Admissions Consulting</strong>.
            </p>

            <div className="text-xs sm:text-sm text-[#9bc6e6] font-sans">
              Last updated: <span className="font-semibold text-white">{lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Terms Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8 font-sans text-brand-text">
              {/* 1. Acceptance of Terms */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] text-brand-blue flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    1. Acceptance of Terms
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    By accessing or using the website located at{" "}
                    <a href={SITE_CONFIG.url} className="text-brand-blue underline font-semibold">
                      bluestars.us
                    </a>{" "}
                    (&ldquo;Site&rdquo;), booking consultations, downloading resources, or enrolling in advisory programs, you agree to be legally bound by these Terms of Service and our{" "}
                    <Link href="/privacy-policy" className="text-brand-blue underline font-semibold">
                      Privacy Policy
                    </Link>
                    . If you do not agree to these terms, please discontinue use of this Site immediately.
                  </p>
                  <p>
                    If you are under 18 years of age, your parent or legal guardian must review and agree to these Terms on your behalf prior to booking any consultation or submitting personal information.
                  </p>
                </div>
              </div>

              {/* 2. Educational Consulting Scope & NACAC Ethics */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f3eee5] text-[#2F9E5C] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    2. Educational Consulting &amp; Advisory Scope
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    Blue Stars Admissions Consulting provides educational advising, academic mentorship, high school curriculum planning, extracurricular coaching, and essay feedback.
                  </p>
                  <div className="p-4 rounded-[5px] bg-[#f5f1ea] border-l-4 border-brand-ink space-y-2">
                    <p className="font-bold text-brand-blue">
                      Important Admissions Disclaimer:
                    </p>
                    <p className="text-sm sm:text-[15px]">
                      College admissions decisions are made solely by individual institutional admissions committees based on unpredictable annual institutional priorities, applicant pools, and confidential review procedures. Blue Stars does not guarantee admission to any college, university, summer program, or scholarship.
                    </p>
                  </div>
                  <p>
                    We strictly adhere to the ethical guidelines established by the National Association for College Admission Counseling (NACAC). We do not write essays for students, complete applications on their behalf, or engage in unethical representations. All writing submitted by a student must be their own original work.
                  </p>
                </div>
              </div>

              {/* 3. Consultation Journey: Initial Consultation & Strategy Consultation */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] text-brand-blue flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    3. Consultation Journey &amp; Booking Policies
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    Our consultation process follows a structured two-step sequence:
                  </p>
                  <ul className="space-y-2.5 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-brand-blue">Initial Consultation (Complimentary 30 Min): </strong>
                        An introductory discussion to evaluate your student&apos;s academic background, family goals, and confirm mutual fit.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#2F9E5C] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-brand-blue">Strategy Consultation (75-Minute In-Depth Diagnostic): </strong>
                        A comprehensive deep-dive evaluation of transcripts, testing history, extracurricular narrative, and personalized admissions roadmap.
                      </div>
                    </li>
                  </ul>
                  <p className="pt-2">
                    <strong>Rescheduling &amp; Cancellation:</strong> Because counselor calendars are reserved exclusively for your family, we request at least 24 hours advance notice for any rescheduling. Missed consultations without prior notice may require administrative review prior to rebooking.
                  </p>
                </div>
              </div>

              {/* 4. Intellectual Property */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] text-brand-blue flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    4. Intellectual Property &amp; Educational Materials
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    All content on this Site, including but not limited to the Blue Stars Method, articles, downloadable workbooks, PDF guides, proprietary curriculum, videos, graphics, logos, and trademarks, are the exclusive property of Blue Stars Admissions Consulting and are protected by United States and international intellectual property laws.
                  </p>
                  <p>
                    Downloadable workbooks and guides are granted under a personal, non-commercial, revocable license for individual student and family use. You may not republish, sell, duplicate, or distribute our proprietary materials to third parties without prior written consent.
                  </p>
                </div>
              </div>

              {/* 5. User Conduct & Submissions */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#fef3c7] text-[#b45309] flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    5. User Conduct &amp; Form Submissions
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    When submitting inquiry forms, workbook downloads, or chatbot questions, you agree to provide truthful, accurate, and current information. You may not use automated bots, scrapers, or malicious code on this Site.
                  </p>
                  <p>
                    We reserve the right to decline service or cancel consultation bookings that violate our policies or demonstrate abusive or unlawful conduct.
                  </p>
                </div>
              </div>

              {/* 6. Limitation of Liability */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] text-brand-blue flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    6. Limitation of Liability &amp; Disclaimers
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    All services and site materials are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive for accuracy, college admissions requirements, testing policies, and deadlines change frequently; families are encouraged to verify official application requirements directly with respective university portals.
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, Blue Stars Admissions Consulting, its founder, counselors, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our advisory services, digital downloads, or application outcomes.
                  </p>
                </div>
              </div>

              {/* 7. Governing Law */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] text-brand-blue flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    7. Governing Law &amp; Jurisdiction
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles. Any dispute arising under these Terms shall be resolved in the state or federal courts located in San Francisco County, California.
                  </p>
                </div>
              </div>

              {/* 8. Contact Information */}
              <div className="bg-white rounded-[5px] border border-brand-border p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f5f1ea] text-brand-blue flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                    8. Questions &amp; Inquiries
                  </h2>
                </div>
                <div className="space-y-3.5 text-[15px] sm:text-[16px] leading-relaxed">
                  <p>
                    If you have questions regarding these Terms of Service, please contact our team:
                  </p>
                  <div className="p-4 rounded-[5px] bg-[#f5f1ea] border border-brand-border space-y-2 text-sm sm:text-base">
                    <div className="flex items-center gap-2 text-brand-navy">
                      <Mail className="w-4 h-4 text-brand-blue" />
                      <span>Email: <a href="mailto:info@bluestars.us" className="text-brand-blue underline font-semibold">info@bluestars.us</a></span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy">
                      <Phone className="w-4 h-4 text-brand-blue" />
                      <span>Phone: <a href="tel:415-426-9444" className="text-brand-blue underline font-semibold">415-426-9444</a></span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-navy">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                      <span>Location: San Francisco, California</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Cards (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Summary Card */}
              <div className="p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-blue mb-3">
                  Summary at a Glance
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] shrink-0 mt-0.5" />
                    <span>Admissions coaching is personalized and strictly ethical.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] shrink-0 mt-0.5" />
                    <span>Complimentary 30-min Initial Consultation offered first.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] shrink-0 mt-0.5" />
                    <span>Followed by 75-minute in-depth Strategy Consultation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] shrink-0 mt-0.5" />
                    <span>Downloads are licensed for private student use only.</span>
                  </li>
                </ul>
              </div>

              {/* Consultation Action Card */}
              <div className="p-6 rounded-[5px] bg-brand-ink text-white shadow-md">
                <h3 className="font-heading font-extrabold text-lg text-white mb-2">
                  Ready to Start?
                </h3>
                <p className="text-xs sm:text-sm text-[#f3eee5] mb-4 font-sans leading-relaxed">
                  Book your complimentary 30-minute Initial Consultation with our senior admissions team.
                </p>
                <a
                  href={HUBSPOT_CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[5px] bg-white hover:bg-[#f3eee5] text-brand-navy font-bold text-xs sm:text-sm font-heading shadow-sm transition-all hover:scale-[1.02]"
                >
                  <span>Book Your Initial Consultation</span>
                </a>
              </div>

              {/* Privacy Policy Link Card */}
              <div className="p-6 rounded-[5px] bg-white border border-brand-border shadow-xs">
                <h4 className="font-heading font-bold text-sm sm:text-base text-brand-blue mb-2">
                  Privacy Policy
                </h4>
                <p className="text-xs sm:text-sm text-brand-text mb-3 leading-relaxed">
                  Learn how we collect, store, and safeguard your personal information.
                </p>
                <Link
                  href="/privacy-policy"
                  className="text-xs sm:text-sm font-bold text-brand-blue hover:underline inline-flex items-center gap-1 font-heading"
                >
                  <span>Read Privacy Policy</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
