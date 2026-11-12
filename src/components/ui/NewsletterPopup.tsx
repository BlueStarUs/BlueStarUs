"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Mail, CheckCircle2, ArrowRight, Sparkles, Loader2, ShieldCheck } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";

const STORAGE_KEY = "bluestars_newsletter_popup_seen";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if dismissed recently
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (seen) return;
    } catch {
      // ignore
    }

    // Trigger popup after 12 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setStatus("submitting");

    try {
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Newsletter Popup Subscriber",
          email: email.trim(),
          phone: "Not provided",
          interest: "Newsletter Subscription",
          serviceInterest: "College Admissions Updates",
          message: "Subscribed to 'Get College Admissions Updates' via site popup modal.",
          source: "Newsletter Popup Modal",
          formGuid: "20578b68-3cb4-47fa-be3e-037888cf7ddf",
        }),
      });
      setStatus("success");
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore
      }
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    } catch {
      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[12px] shadow-[0_24px_60px_rgba(10,61,107,0.3)] border border-[#cbe1f5] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Ribbon with Brand Star */}
        <div className="relative bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white p-6 sm:p-7 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00b4d8]/20 rounded-full blur-2xl pointer-events-none" />
          
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors focus:outline-none"
            aria-label="Close newsletter popup"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#0d4f7c]/90 border border-[#38bdf8]/40 text-[#79c3f7] text-[11px] font-bold tracking-wider uppercase font-heading mb-2.5">
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
              <span>Admissions Intelligence</span>
            </div>
            <h3
              id="popup-title"
              className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight leading-snug"
            >
              Get College Admissions Updates
            </h3>
            <p className="text-xs sm:text-[13.5px] text-[#cfe6f9] mt-1.5 font-sans leading-relaxed">
              Stay ahead with seasonal deadline alerts, UC PIQ guides, webinar invites, and proven application strategy.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 bg-[#fbfdff]">
          {status === "success" ? (
            <div className="py-6 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-[#E3F5EA] text-[#2F9E5C] mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-extrabold text-lg text-brand-navy">
                You&apos;re Subscribed!
              </h4>
              <p className="text-xs sm:text-[13px] text-brand-text mt-1 font-sans">
                Watch your inbox for expert college planning insights from the Blue Stars advisory team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="popup-email"
                  className="block text-xs sm:text-[13px] font-bold font-heading text-brand-navy mb-1.5"
                >
                  Parent or Student Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-navy/50">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="popup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-[6px] border border-[#d6e3f0] focus:border-brand-blue bg-white text-brand-navy placeholder-brand-text/50 text-xs sm:text-[13.5px] outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-[11.5px] text-brand-text/85 font-sans">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9E5C] flex-shrink-0" />
                  <span>Curated for 8th–12th grade high school students and parents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9E5C] flex-shrink-0" />
                  <span>Zero spam, one-click unsubscribe anytime</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:flex-1 py-3 px-5 rounded-[6px] bg-brand-blue hover:bg-brand-navy active:scale-[0.98] text-white text-xs sm:text-[13.5px] font-bold font-heading transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Admissions Updates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-brand-navy/65 hover:text-brand-navy font-heading py-2 px-3 transition-colors cursor-pointer"
                >
                  No thanks
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

