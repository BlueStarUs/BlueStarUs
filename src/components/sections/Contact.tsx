"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { submitContactForm } from "@/services/api";
import { trackContactFormSubmission } from "@/lib/analytics";
import { ContactFormData } from "@/types";

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    interest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setIsSuccess(true);
        trackContactFormSubmission("contact_form");
        setFormData({
          fullName: "",
          email: "",
          interest: "",
          message: "",
        });
      } else {
        setErrorMsg(response.message || "Failed to submit. Please try again.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative w-full py-12 sm:py-14 lg:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden"
      id="contact"
    >
      {/* Decorative Organic Wave Shapes in Background (Matching Services & Process) */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#e3f1fc]/80 via-[#edf6fd]/40 to-transparent rounded-bl-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[380px] h-[320px] bg-gradient-to-tr from-[#e5f2fc]/70 via-[#eef6fe]/30 to-transparent rounded-tr-[200px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* Left Column: Info & Contact Details */}
          <div className="flex flex-col items-start text-left z-20">
            {/* Pill Kicker with flanking line */}
            <div className="flex items-center gap-3 mb-1.5.5">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                GET IN TOUCH
              </span>
              <span className="w-10 sm:w-14 h-[1.5px] bg-brand-navy/30 rounded-full" aria-hidden="true" />
            </div>

            {/* Main Heading with Signature Curved Arc Highlight */}
            <div className="relative inline-block mb-1.5.5">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                Let&apos;s Discuss<br />
                <span className="text-brand-blue relative inline-block">
                  Your College Goals
                  {/* Centered Curved Arc Highlight Underneath (Same as Services) */}
                  <span className="absolute -bottom-2 left-0 right-0 flex justify-center pointer-events-none">
                    <svg
                      className="w-44 sm:w-56 h-3 text-[#79bbf0] opacity-85"
                      viewBox="0 0 240 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 9.5C65 2.5 175 2.5 238 9.5"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text mb-6 sm:mb-7 max-w-[340px] font-sans mt-1">
              Have questions or want to learn more? Fill out the form and we&apos;ll get back to you soon.
            </p>

            {/* Contact Details List with Squircle Icon Badges */}
            <ul className="space-y-4 sm:space-y-6">
              <li className="flex items-center gap-3 text-[15px] sm:text-[16px] text-brand-navy font-bold font-heading">
                <span className="w-9 h-9 rounded-[12px] bg-[#e3f1fc] grid place-items-center flex-shrink-0 text-brand-blue shadow-xs">
                  <Mail className="w-4 h-4" />
                </span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-brand-blue transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>

              <li className="flex items-center gap-3 text-[15px] sm:text-[16px] text-brand-navy font-bold font-heading">
                <span className="w-9 h-9 rounded-[12px] bg-[#e5f7ed] grid place-items-center flex-shrink-0 text-[#2F9E5C] shadow-xs">
                  <Phone className="w-4 h-4" />
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <a
                    href="https://wa.me/14154269444?text=Hi%20Blue%20Stars%2C%20I%20am%20interested%20in%20college%20admissions%20counseling."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold font-heading transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <WhatsAppIcon className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3 text-[15px] sm:text-[16px] text-brand-navy font-bold font-heading">
                <span className="w-9 h-9 rounded-[12px] bg-[#e5f7ed] grid place-items-center flex-shrink-0 text-[#2F9E5C] shadow-xs">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Center Column: Family Advising Photograph */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[17/10] lg:aspect-[1.15/1] rounded-[16px] overflow-hidden shadow-[0_10px_32px_rgba(10,61,107,0.06)] flex items-center justify-center">
            {/* Desktop Left Soft Fade Mask */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[360px]">
              <Image
                src="/images/sub_images/bottoms.png"
                alt="Family consulting with Blue Stars admissions advisor"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
                className="object-cover object-center lg:object-right"
              />
            </div>

            {/* Desktop Right Soft Fade Mask */}
            <div
              className="hidden lg:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Right Column: Modern Elevated Form Card */}
          <div className="bg-white rounded-[15px] shadow-[0_16px_44px_rgba(10,61,107,0.08)] border border-[#e2eef9] p-6 sm:p-7 relative z-20 overflow-hidden">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy mb-4 font-heading tracking-tight relative z-10 mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand-navy mb-1.5 font-heading"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-3.5 py-2.5 border border-[#d6e3f0] rounded-[8px] text-[15px] sm:text-[16px] leading-[24px] bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand-navy mb-1.5 font-heading"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-3.5 py-2.5 border border-[#d6e3f0] rounded-[8px] text-[15px] sm:text-[16px] leading-[24px] bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              {/* Interest Dropdown */}
              <div>
                <label
                  htmlFor="interest"
                  className="block text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand-navy mb-1.5 font-heading"
                >
                  I&apos;m interested in <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 pr-9 border border-[#d6e3f0] rounded-[8px] text-[15px] sm:text-[16px] leading-[24px] bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select an option</option>
                    <option value="College Admissions Consulting">College Admissions Consulting</option>
                    <option value="Research & Internships">Research &amp; Internships</option>
                    <option value="College & University Planning">College &amp; University Planning</option>
                    <option value="Application Strategy">Application Strategy</option>
                    <option value="Essay & Personal Statement Guidance">Essay &amp; Personal Statement Guidance</option>
                    <option value="Art Admissions Consulting">Art Admissions Consulting</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-brand-navy/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Your Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand-navy mb-1.5 font-heading"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-3.5 py-2.5 border border-[#d6e3f0] rounded-[8px] text-[15px] sm:text-[16px] leading-[24px] bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue min-h-[50px] resize-y transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-[5px] font-bold text-[15px] sm:text-[16px] leading-[24px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Success Feedback */}
              {isSuccess && (
                <div
                  className="mt-3 p-2.5 rounded-[8px] bg-brand-green/70 text-brand-greenDark text-xs font-semibold flex items-center justify-center gap-1.5 animate-in fade-in"
                  role="status"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-greenDark" />
                  <span>Thank you! We&apos;ll get back to you soon.</span>
                </div>
              )}

              {/* Error Feedback */}
              {errorMsg && (
                <div
                  className="mt-3 p-2.5 rounded-[8px] bg-red-50 text-red-600 text-xs font-semibold text-center animate-in fade-in"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
