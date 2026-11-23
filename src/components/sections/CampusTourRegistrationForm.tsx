"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Video, Send } from "lucide-react";

export function CampusTourRegistrationForm({
  eventTitle = "Making College Campus Tours Worth Your Time",
  formId = "4e7ff356-43b3-4bb6-9e98-f5f522393d45",
}: {
  eventTitle?: string;
  formId?: string;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gradYear: "2026 (Junior)",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    setStatus("loading");
    try {
      // 1. Submit to Blue Stars internal admin leads API
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`.trim() || "Webinar Registrant",
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          serviceInterest: `${eventTitle} (Grad Year: ${formData.gradYear})`,
          message: formData.message.trim() || `Requested On-Demand Replay for: ${eventTitle}`,
        }),
      });

      // 2. Submit to official Blue Stars HubSpot Portal 20571161
      try {
        await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/20571161/${formId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: [
                { name: "firstname", value: formData.firstName },
                { name: "lastname", value: formData.lastName },
                { name: "email", value: formData.email },
                { name: "phone", value: formData.phone },
                { name: "message", value: `Event: ${eventTitle} | Grad Year: ${formData.gradYear}. ${formData.message}` },
              ],
            }),
          }
        );
      } catch {}

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-[8px] border border-[#e9e3d8] p-5 sm:p-7 shadow-[0_1px_3px_rgba(18,48,90,0.05)] relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-brand-ink animate-pulse" />
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-blue font-heading">
          INSTANT ON-DEMAND ACCESS
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading mb-1 leading-snug">
        Get the Full Masterclass Recording
      </h3>
      <p className="text-xs text-brand-text font-sans mb-4">
        Fill out the quick form below to receive the complete 60-minute video replay and student question checklist.
      </p>

      {status === "success" ? (
        <div className="p-6 rounded-[6px] bg-[#f3eee5] border border-[#2F9E5C]/30 text-center animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-brand-navy font-heading mb-1">
            Access Granted!
          </h4>
          <p className="text-xs text-[#1e6f40] font-sans mb-4">
            We have emailed the full video recording, presentation slides, and checklist to <strong>{formData.email}</strong>.
          </p>
          <a
            href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[5px] text-xs font-bold text-white bg-[#2F9E5C] hover:bg-[#25824b] transition-colors font-heading"
          >
            <span>Book Initial Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="campustour-first" className="block text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-1">
                First Name *
              </label>
              <input
                id="campustour-first"
                type="text"
                required
                placeholder="e.g. Sarah"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 rounded-[5px] text-xs sm:text-sm text-brand-navy border border-[#e9e3d8] focus:border-brand-ink focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="campustour-last" className="block text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-1">
                Last Name *
              </label>
              <input
                id="campustour-last"
                type="text"
                required
                placeholder="e.g. Smith"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 rounded-[5px] text-xs sm:text-sm text-brand-navy border border-[#e9e3d8] focus:border-brand-ink focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="campustour-email" className="block text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              id="campustour-email"
              type="email"
              required
              placeholder="e.g. sarah.smith@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-[5px] text-xs sm:text-sm text-brand-navy border border-[#e9e3d8] focus:border-brand-ink focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="campustour-phone" className="block text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                id="campustour-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-[5px] text-xs sm:text-sm text-brand-navy border border-[#e9e3d8] focus:border-brand-ink focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="campustour-grad" className="block text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-1">
                Student Grad Year
              </label>
              <select
                id="campustour-grad"
                value={formData.gradYear}
                onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                className="w-full px-3 py-2 rounded-[5px] text-xs sm:text-sm text-brand-navy border border-[#e9e3d8] focus:border-brand-ink focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white"
              >
                <option value="2025 (Senior)">2025 (Senior)</option>
                <option value="2026 (Junior)">2026 (Junior)</option>
                <option value="2027 (Sophomore)">2027 (Sophomore)</option>
                <option value="2028 (Freshman)">2028 (Freshman)</option>
                <option value="Parent / Counselor">Parent / Counselor</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="campustour-message" className="block text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-1">
              Questions For Panelists (Optional)
            </label>
            <textarea
              id="campustour-message"
              rows={2}
              placeholder="Any specific questions about campus visits or college list building?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-[5px] text-xs sm:text-sm text-brand-navy border border-[#e9e3d8] focus:border-brand-ink focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
            />
          </div>

          <div className="space-y-1 pt-1">
            <div className="text-[10px] font-bold text-brand-navy font-heading uppercase tracking-wider">
              Included With Replay Registration:
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-text">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span>Full 60-Minute Masterclass Video Recording</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-text">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span>Campus Visit Question Checklist for Undergraduates</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-text">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span>Marketing vs. Reality Diagnostic Framework</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 px-5 rounded-[5px] text-xs sm:text-sm font-bold font-heading text-white bg-brand-ink hover:bg-brand-blue transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {status === "loading" ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Watch Full Masterclass Now</span>
              </>
            )}
          </button>

          <p className="text-[10.5px] text-brand-text text-center font-sans flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-blue shrink-0" />
            <span>Attendance is free. We respect your privacy &amp; never share your email.</span>
          </p>
        </form>
      )}
    </div>
  );
}
