"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  FileText,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WORKBOOK_EXERCISES = [
  "Learn key traits and intellectual vitality markers valued by top college admissions committees.",
  "Write your first authentic personal narrative with guided Socratic reflection prompts.",
  "Branch out: explore genuine academic interests and define an authentic extracurricular spike.",
  "Identify high-impact research, leadership opportunities, and summer enrichment programs.",
  "Set milestone goals and build your strategic 4-year high school roadmap following The Calm Way.",
];

export function FreeWorkbookSection({ className }: { className?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "9th Grade (Freshman)",
    role: "Student",
    interest: "College Planning",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Record lead in admin leads endpoint
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: "Not provided (Workbook Lead)",
          studentGrade: formData.grade,
          targetYear: "Upcoming Cycle",
          serviceInterest: `Free Workbook (${formData.interest})`,
          message: `Requested Free Workbook: Blue Stars College Planning Foundations. Role: ${formData.role}, Grade: ${formData.grade}`,
          source: "Free Workbook Form",
        }),
      }).catch(() => {
        // Fallback silently if API route isn't running or network glitch
      });

      setIsSubmitted(true);

      // Trigger automatic download of the PDF
      const link = document.createElement("a");
      link.href = "/downloads/Blue-Stars-College-Planning-Foundations-Workbook.pdf";
      link.download = "Blue-Stars-College-Planning-Foundations-Workbook.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setErrorMsg("Something went wrong. Please try downloading directly below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="free-workbook"
      className={cn(
        "relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] border-y border-[#e2eef9] overflow-hidden",
        className
      )}
    >
      {/* Decorative Background Lighting */}
      <div
        className="absolute top-0 right-0 w-[450px] h-[380px] bg-gradient-to-bl from-[#E3F1FC]/70 via-transparent to-transparent rounded-bl-[240px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[380px] h-[320px] bg-gradient-to-tr from-[#e2f7eb]/60 via-transparent to-transparent rounded-tr-[200px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>FREE ADMISSIONS WORKBOOK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px] mb-3">
            Free Workbook for Students: College Planning Foundations
          </h2>

          <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans">
            Start today! Go through these strategic exercises designed by Dr. Amy Morgenstern to sketch out your plans for all four years of high school and build a profile that stands out to top colleges.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Workbook Visuals & Bullets / Right Lead Form */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Realistic 3D Workbook Cover & Exercises */}
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              {/* Cover Image Container */}
              <div className="relative w-[180px] sm:w-[210px] aspect-[612/794] rounded-[5px] overflow-hidden flex-shrink-0 shadow-[0_18px_40px_rgba(10,61,107,0.18)] border border-[#e2eef9] group bg-white">
                <Image
                  src="/images/resources/workbook-cover.png"
                  alt="Blue Stars College Planning Foundations Workbook Cover"
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-[4px] bg-brand-blue text-white text-[10px] font-extrabold tracking-wider uppercase font-heading shadow-xs">
                  PDF
                </div>
              </div>

              {/* Overview Narrative */}
              <div>
                <span className="inline-block text-xs font-bold text-[#2F9E5C] uppercase tracking-wider font-heading mb-1.5">
                  &bull; 100% Free &bull; Instant Access
                </span>
                <h3 className="text-xl sm:text-[22px] font-extrabold text-brand-navy font-heading leading-snug mb-2">
                  Blue Stars College Planning Foundations Workbook
                </h3>
                <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans mb-4">
                  This comprehensive workbook walks college-bound teens through essential self-reflection, activity planning, and essay exploration exercises used in our signature 1-on-1 counseling programs.
                </p>

                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-brand-navy">
                  <div className="flex items-center gap-0.5" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <span>Guided by 16+ Years of Admissions Experience</span>
                </div>
              </div>
            </div>

            {/* 5 Strategic Exercises List */}
            <div className="space-y-3 mb-6 bg-white p-5 rounded-[5px] border border-[#e2eef9] shadow-xs">
              <h4 className="text-[15px] sm:text-[18px] font-bold text-brand-navy font-heading flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-brand-blue" />
                <span>What&apos;s Inside This 4-Year Strategic Toolkit:</span>
              </h4>
              <ul className="space-y-2">
                {WORKBOOK_EXERCISES.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Instant Download Fallback Link */}
            <div className="flex items-center gap-3 text-xs sm:text-[13px] text-brand-text font-sans">
              <ShieldCheck className="w-4 h-4 text-brand-blue flex-shrink-0" />
              <span>
                Need immediate access? You can also{" "}
                <a
                  href="/downloads/Blue-Stars-College-Planning-Foundations-Workbook.pdf"
                  download="Blue-Stars-College-Planning-Foundations-Workbook.pdf"
                  className="font-bold text-brand-blue underline hover:text-brand-navy transition-colors"
                >
                  download the PDF directly here
                </a>
                .
              </span>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="bg-white rounded-[5px] border border-[#e2eef9] p-6 sm:p-8 lg:p-9 shadow-[0_12px_36px_rgba(10,61,107,0.08)]">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                <div>
                  <span className="text-xs sm:text-[13px] md:text-[13.5px] font-bold text-brand-blue uppercase tracking-[0.14em] font-heading">
                    GET YOUR COPY NOW
                  </span>
                  <h3 className="text-[22px] sm:text-[25px] md:text-[27px] lg:text-[28px] font-extrabold text-brand-navy font-heading tracking-tight leading-[28px] sm:leading-[32px] lg:leading-[35px] mt-1">
                    Fill Out the Form to Get the Workbook
                  </h3>
                  <p className="text-[14px] sm:text-[15.5px] md:text-[16px] leading-[22px] sm:leading-[25px] text-brand-text font-sans mt-1.5">
                    Enter your information below and get the workbook sent right to your email plus immediate PDF download.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-[5px] bg-red-50 border border-red-200 text-red-700 text-xs sm:text-[13px] font-sans">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label htmlFor="wb-name" className="block text-[13px] sm:text-[14px] md:text-[14.5px] font-bold text-brand-navy font-heading mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="wb-name"
                    type="text"
                    required
                    placeholder="Student or Parent Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-[5px] border border-[#e2eef9] bg-[#f8fbfe] text-[14px] sm:text-[15px] md:text-[15.5px] font-sans text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="wb-email" className="block text-[13px] sm:text-[14px] md:text-[14.5px] font-bold text-brand-navy font-heading mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="wb-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-[5px] border border-[#e2eef9] bg-[#f8fbfe] text-[14px] sm:text-[15px] md:text-[15.5px] font-sans text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wb-role" className="block text-[13px] sm:text-[14px] md:text-[14.5px] font-bold text-brand-navy font-heading mb-1.5">
                      I am a:
                    </label>
                    <select
                      id="wb-role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-3 sm:py-3.5 rounded-[5px] border border-[#e2eef9] bg-[#f8fbfe] text-[13.5px] sm:text-[14.5px] md:text-[15px] font-sans text-brand-navy focus:outline-none focus:border-brand-blue transition-all"
                    >
                      <option value="Student">High School Student</option>
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Counselor">Educator / Counselor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="wb-grade" className="block text-[13px] sm:text-[14px] md:text-[14.5px] font-bold text-brand-navy font-heading mb-1.5">
                      Student Grade:
                    </label>
                    <select
                      id="wb-grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-3.5 py-3 sm:py-3.5 rounded-[5px] border border-[#e2eef9] bg-[#f8fbfe] text-[13.5px] sm:text-[14.5px] md:text-[15px] font-sans text-brand-navy focus:outline-none focus:border-brand-blue transition-all"
                    >
                      <option value="8th Grade">8th Grade</option>
                      <option value="9th Grade (Freshman)">9th Grade (Freshman)</option>
                      <option value="10th Grade (Sophomore)">10th Grade (Sophomore)</option>
                      <option value="11th Grade (Junior)">11th Grade (Junior)</option>
                      <option value="12th Grade (Senior)">12th Grade (Senior)</option>
                      <option value="Other">Other / Counselor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="wb-interest" className="block text-[13px] sm:text-[14px] md:text-[14.5px] font-bold text-brand-navy font-heading mb-1.5">
                    Primary Area of Interest:
                  </label>
                  <select
                    id="wb-interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-3.5 rounded-[5px] border border-[#e2eef9] bg-[#f8fbfe] text-[13.5px] sm:text-[14.5px] md:text-[15px] font-sans text-brand-navy focus:outline-none focus:border-brand-blue transition-all"
                  >
                    <option value="College Planning">4-Year College Planning &amp; Roadmap</option>
                    <option value="Admissions Strategy">Selective Admissions Consulting</option>
                    <option value="Essay Guidance">College Essays &amp; Personal Statement</option>
                    <option value="Research & Internships">Scientific Research &amp; Lab Placements</option>
                    <option value="Art Admissions">Art, Design &amp; Architecture Portfolios</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-5 rounded-[5px] font-extrabold text-[14.5px] sm:text-[15.5px] md:text-[16px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 mt-3"
                >
                  {isSubmitting ? (
                    <span>Preparing Your Download...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Free Workbook (Instant PDF Access)</span>
                    </>
                  )}
                </button>

                <p className="text-xs sm:text-[13px] leading-[20px] text-brand-text/75 font-sans text-center mt-2.5">
                  🔒 We respect your privacy. No spam. You may unsubscribe from our admissions tips at any time.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="w-14 h-14 rounded-full bg-[#e2f7eb] text-[#2F9E5C] flex items-center justify-center mx-auto mb-4 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-extrabold text-brand-navy font-heading mb-2.5">
                  Your Free Workbook Is on Its Way!
                </h3>

                <p className="text-[14px] sm:text-[15.5px] leading-[23px] sm:leading-[25px] text-brand-text font-sans mb-6 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your copy has been initiated. If the download did not start automatically, click below:
                </p>

                <div className="space-y-3">
                  <a
                    href="/downloads/Blue-Stars-College-Planning-Foundations-Workbook.pdf"
                    download="Blue-Stars-College-Planning-Foundations-Workbook.pdf"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 px-5 rounded-[5px] font-extrabold text-[14px] sm:text-[15.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all shadow-md"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Download PDF Again (2.2 MB)</span>
                  </a>

                  <Link
                    href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[5px] font-bold text-xs sm:text-[14px] font-heading bg-[#E3F1FC] text-brand-blue hover:bg-brand-blue hover:text-white transition-all"
                  >
                    <span>Book a Free 30-Minute Strategy Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

