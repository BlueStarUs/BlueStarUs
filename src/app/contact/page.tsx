"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { SITE_CONFIG } from "@/lib/constants";
import { submitContactForm } from "@/services/api";
import { ContactFormData } from "@/types";
import { cn } from "@/lib/utils";

const INTEREST_OPTIONS = [
  "College Admissions Consulting",
  "Research & Internships",
  "College & University Planning",
  "Application Strategy",
  "Essay & Personal Statement Guidance",
  "Art Admissions Consulting",
  "Other General Inquiry",
];

export default function ContactPage() {
  // Contact Form state
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

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
        setFormData({
          fullName: "",
          email: "",
          phone: "",
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 600);
  };

  return (
    <div className="w-full bg-white text-brand-text font-sans">
      {/* Short Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[{ label: "Contact Us" }]}
        badge="GET IN TOUCH"
        title="Let's Discuss Your College Goals"
        description="Have questions about our programs or ready to explore your student's college admissions roadmap? Send us a quick note below and our advisory team will respond promptly."
        variant="dark"
      />

      {/* Main Clean Contact Section */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
        {/* Soft Decorative Ambient Background */}
        <div
          className="absolute -top-24 right-0 w-[450px] h-[450px] bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#e3f1fc]/80 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Info & Advisory Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                    DIRECT ADMISSION ADVISORY
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-3">
                  We&apos;re Here to Help Your Family Succeed
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  Whether you are planning ahead from 8th or 9th grade or navigating final application deadlines, our Socratic counseling approach delivers calm, focused, and personalized mentorship.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-3.5 pt-2">
                {/* Email Card */}
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[5px] bg-brand-sky text-brand-blue flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-navy/70 uppercase tracking-wider font-heading">
                      Email Us Directly
                    </div>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors font-heading"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[5px] bg-[#E3F5EA] text-[#2F9E5C] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-navy/70 uppercase tracking-wider font-heading">
                      Telephone & WhatsApp
                    </div>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors font-heading"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                    <span className="text-[11px] text-brand-text ml-2">
                      (Mon–Fri 9am–6pm PST)
                    </span>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[5px] bg-brand-sky text-brand-blue flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-navy/70 uppercase tracking-wider font-heading">
                      Headquarters & Online
                    </div>
                    <div className="text-xs sm:text-[13px] font-semibold text-brand-navy">
                      San Francisco, CA
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="p-5 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] space-y-4">
                <div className="flex items-center gap-2 text-[15px] sm:text-[16px] font-[500] text-brand-navy font-heading">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0" />
                  <span>16+ Years Guiding Top Students to Dream Universities</span>
                </div>
                <div className="flex items-center gap-2 text-[15px] sm:text-[16px] font-[500] text-brand-navy font-heading">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0" />
                  <span>Admissions to Ivy League, Stanford, Top UCs & Nationwide</span>
                </div>
                <div className="flex items-center gap-2 text-[15px] sm:text-[16px] font-[500] text-brand-navy font-heading">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue flex-shrink-0" />
                  <span>100% Confidential & No-Pressure Introductory Discussion</span>
                </div>
              </div>
            </div>

            {/* Right Column: Small, Compact, Clean Contact Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[5px] p-6 sm:p-8 lg:p-9 border border-[#e2eef9] shadow-[0_12px_36px_rgba(10,61,107,0.06)]">
                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading block mb-1">
                    FAST INQUIRY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    Send Us a Quick Message
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-brand-text font-sans mt-1">
                    Fill out the short form below and our counseling advisory team will get in touch with you.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="p-7 rounded-[5px] bg-[#E3F5EA] border border-[#2F9E5C]/30 text-center space-y-3 animate-in fade-in duration-200">
                    <div className="w-12 h-12 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-brand-navy font-heading">
                      Message Received!
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#1e6f40] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Blue Stars Admissions Consulting. A member of our senior counseling team will review your inquiry and follow up with you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-2 px-5 py-2.5 rounded-[5px] text-xs font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-[5px] bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* 1. Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Miller"
                        className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#c4dcfa] bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white focus:border-brand-blue transition-all"
                      />
                    </div>

                    {/* 2. Email & Phone (2 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#c4dcfa] bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white focus:border-brand-blue transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-brand-text/60 lowercase font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          placeholder="(415) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#c4dcfa] bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white focus:border-brand-blue transition-all"
                        />
                      </div>
                    </div>

                    {/* 3. Program of Interest */}
                    <div>
                      <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                        Program of Interest
                      </label>
                      <div className="relative">
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#c4dcfa] bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white focus:border-brand-blue transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Please Select a Program</option>
                          {INTEREST_OPTIONS.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-brand-text/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* 4. Message */}
                    <div>
                      <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                        Your Message / Questions <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your student's current grade, target colleges, or any questions you have..."
                        className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#c4dcfa] bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:bg-white focus:border-brand-blue transition-all resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-brand-text/75">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Your information is 100% confidential. Zero spam.</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Quick Reach Cards */}
      <section className="relative w-full py-12 sm:py-14 bg-white border-t border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading mb-1">
              REACH OUT ANYTIME
            </div>
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-brand-navy font-heading tracking-tight">
              Connect With Our Advisory Team
            </h2>
            <p className="text-xs sm:text-sm text-brand-text mt-1.5">
              We guide students across the United States and internationally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="p-6 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] hover:border-brand-blue/40 hover:shadow-sm transition-all text-center">
              <div className="w-11 h-11 rounded-[5px] bg-brand-sky flex items-center justify-center mx-auto mb-3 text-brand-blue">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-sm sm:text-base mb-1">
                Telephone & Direct Call
              </h3>
              <p className="text-xs text-brand-text mb-2">
                Monday – Friday, 9:00 AM – 6:00 PM PST
              </p>
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-block text-brand-blue font-heading font-bold text-sm sm:text-base hover:underline"
              >
                {SITE_CONFIG.contact.phone}
              </a>
            </div>

            {/* Email */}
            <div className="p-6 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] hover:border-brand-blue/40 hover:shadow-sm transition-all text-center">
              <div className="w-11 h-11 rounded-[5px] bg-brand-sky flex items-center justify-center mx-auto mb-3 text-brand-blue">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-sm sm:text-base mb-1">
                Email Advisory
              </h3>
              <p className="text-xs text-brand-text mb-2">
                Response within 24 business hours
              </p>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="inline-block text-brand-blue font-heading font-bold text-sm sm:text-base hover:underline"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>

            {/* Virtual Consultation */}
            <div className="p-6 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] hover:border-brand-blue/40 hover:shadow-sm transition-all text-center">
              <div className="w-11 h-11 rounded-[5px] bg-[#E3F5EA] flex items-center justify-center mx-auto mb-3 text-[#2F9E5C]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-sm sm:text-base mb-1">
                Head Office & Consultations
              </h3>
              <p className="text-xs text-brand-text mb-2">
                San Francisco, CA & Zoom Video Worldwide
              </p>
              <span className="inline-block text-brand-navy font-heading font-bold text-sm">
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Compact Full-Width Newsletter Banner Section at the Bottom */}
      <section className="relative w-full py-8 sm:py-10 lg:py-11 bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden border-t border-[#2072a7]/40 mb-8">
        {/* Subtle Ambient Wave Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="absolute -top-16 -left-12 w-72 h-72 bg-[#0096c7]/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 right-10 w-80 h-60 bg-[#00b4d8]/20 rounded-full blur-2xl" />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            {/* Left Narrative Block */}
            <div className="max-w-2xl">
              {/* Option 2 Kicker Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#0d4f7c]/90 border border-[#2597e0]/50 text-[#79c3f7] text-[10.5px] sm:text-[11px] font-bold tracking-[0.14em] uppercase font-heading mb-2 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                <span>OPTION 2 • ADMISSIONS INTELLIGENCE</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-white font-heading tracking-tight leading-snug">
                Subscribe to Our Newsletter
              </h2>

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-white mt-4 font-sans">
                Get the latest college admission updates, Ivy League acceptance rate analyses, portfolio tips, and invitations to Dr. Amy&apos;s exclusive webinars delivered right to your inbox.
              </p>
            </div>

            {/* Right Form / Subscription Block */}
            <div className="w-full lg:max-w-md xl:max-w-lg flex-shrink-0">
              {newsletterStatus === "success" ? (
                <div className="p-3.5 sm:p-4 rounded-[5px] bg-[#e3f5ea] border border-[#a3e4be] text-xs sm:text-sm text-[#1e7a43] flex items-center gap-3 animate-in fade-in duration-200">
                  <div className="w-7 h-7 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-heading">Thank you for subscribing!</strong>
                    <span>Check your email for our exclusive admissions updates and webinar invitations.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3 rounded-[5px] bg-white/95 text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white shadow-xs border border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={newsletterStatus === "submitting"}
                    className="px-5 sm:px-6 py-3 rounded-[5px] text-xs sm:text-[12.5px] font-bold font-heading uppercase tracking-wider text-[#07466f] bg-white hover:bg-[#d8ecfc] shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {newsletterStatus === "submitting" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#07466f]" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBSCRIBE</span>
                        <Send className="w-3.5 h-3.5 text-[#07466f]" />
                      </>
                    )}
                  </button>
                </form>
              )}
              <div className="flex items-center gap-1.5 mt-2 text-[12px] sm:text-[13px] text-[#a0cbe6] font-sans">
                <ShieldCheck className="w-3 h-3 text-[#38bdf8]" />
                <span>Zero spam. Unsubscribe anytime with a single click.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
