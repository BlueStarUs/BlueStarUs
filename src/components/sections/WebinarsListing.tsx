"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Radio,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  User,
  Video,
  X,
  Play,
} from "lucide-react";
import { WEBINARS_DATA, WebinarItem } from "@/lib/resources-data";
import { cn } from "@/lib/utils";

export function WebinarsListing() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarItem | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");

  const filtered = WEBINARS_DATA.filter((w) => w.status === activeTab);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail.trim()) return;
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setSelectedWebinar(null);
      setRegEmail("");
      setRegName("");
    }, 2800);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "px-5 py-2.5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading transition-all duration-200 cursor-pointer border flex items-center gap-2",
              activeTab === "upcoming"
                ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                : "bg-[#f8fbfe] text-brand-navy border-[#e2eef9] hover:bg-brand-sky/60 hover:text-brand-blue"
            )}
          >
            <Radio className="w-4 h-4" />
            <span>Upcoming Live Webinars</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={cn(
              "px-5 py-2.5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading transition-all duration-200 cursor-pointer border flex items-center gap-2",
              activeTab === "past"
                ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                : "bg-[#f8fbfe] text-brand-navy border-[#e2eef9] hover:bg-brand-sky/60 hover:text-brand-blue"
            )}
          >
            <Video className="w-4 h-4" />
            <span>Past On-Demand Replays</span>
          </button>
        </div>

        {/* Webinars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white rounded-[5px] border border-[#e2eef9] p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Tag & Duration */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] text-[11px] font-bold uppercase tracking-wider font-heading border",
                      webinar.status === "upcoming"
                        ? "bg-[#E3F5EA] text-[#2F9E5C] border-[#2F9E5C]/20"
                        : "bg-brand-sky text-brand-blue border-brand-blue/20"
                    )}
                  >
                    {webinar.status === "upcoming" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E5C] animate-pulse" />
                    )}
                    <span>{webinar.category}</span>
                  </span>

                  <span className="text-xs font-semibold text-brand-text flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{webinar.duration}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-[23px] font-extrabold text-brand-navy font-heading mb-2 leading-snug">
                  {webinar.title}
                </h3>

                <p className="text-[13.5px] font-semibold text-brand-navy/80 font-sans mb-3">
                  {webinar.subtitle}
                </p>

                {/* Date & Time */}
                <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-brand-blue mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{webinar.date} {webinar.time && `• ${webinar.time}`}</span>
                </div>

                <p className="text-[14.5px] leading-[23px] text-brand-text font-sans mb-6">
                  {webinar.description}
                </p>

                {/* Speaker Card */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] mb-6">
                  <div className="w-12 h-12 rounded-[5px] overflow-hidden relative flex-shrink-0">
                    <Image
                      src={webinar.speaker.avatar}
                      alt={webinar.speaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13.5px] font-bold text-brand-navy font-heading">
                      {webinar.speaker.name}
                    </div>
                    <div className="text-[11.5px] sm:text-xs text-brand-text">
                      {webinar.speaker.role}
                    </div>
                  </div>
                </div>

                {/* Topics Covered */}
                <div className="space-y-2 mb-6 pt-3 border-t border-[#edf4fb]">
                  <div className="text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider">
                    Key Topics Covered:
                  </div>
                  {webinar.topics.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-brand-navy/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-[#edf4fb] flex items-center justify-between gap-3">
                <span className="text-xs text-brand-text font-sans hidden sm:inline">
                  {webinar.status === "upcoming" ? "Free registration • Interactive Q&A" : "Full recording • Instant replay"}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedWebinar(webinar);
                    setRegSuccess(false);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all font-heading shadow-xs cursor-pointer"
                >
                  {webinar.status === "upcoming" ? (
                    <>
                      <span>Reserve Your Seat (Free)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Replay Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Registration / Replay Access */}
        {selectedWebinar && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="webinar-modal-title"
          >
            <div className="bg-white rounded-[5px] max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(10,61,107,0.25)] border border-[#e2eef9] relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedWebinar(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-[5px] bg-[#f0f6fc] text-brand-navy hover:text-brand-blue grid place-items-center transition-colors focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-blue font-heading">
                  {selectedWebinar.status === "upcoming" ? "LIVE WEBINAR REGISTRATION" : "ON-DEMAND REPLAY ACCESS"}
                </span>
              </div>

              <h3 id="webinar-modal-title" className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading mb-2 leading-tight">
                {selectedWebinar.title}
              </h3>

              <div className="flex items-center gap-2 text-xs font-bold text-brand-blue mb-4">
                <Calendar className="w-4 h-4" />
                <span>{selectedWebinar.date} {selectedWebinar.time && `• ${selectedWebinar.time}`}</span>
              </div>

              {regSuccess ? (
                <div className="p-6 rounded-[5px] bg-[#E3F5EA] border border-[#2F9E5C]/30 text-center animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-brand-navy font-heading mb-1">
                    {selectedWebinar.status === "upcoming" ? "Seat Confirmed!" : "Access Granted!"}
                  </h4>
                  <p className="text-xs text-[#1e6f40] font-sans">
                    We have dispatched the Zoom link and webinar materials to <strong>{regEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Smith"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[5px] text-sm text-brand-navy border border-[#c4dcfa] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                      Email Address (Zoom Link Will Be Sent Here)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah.smith@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[5px] text-sm text-brand-navy border border-[#c4dcfa] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider">
                      Included With Registration:
                    </div>
                    {selectedWebinar.takeaways.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-brand-text">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{selectedWebinar.status === "upcoming" ? "Confirm Free Registration" : "Watch Full Video Replay"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-brand-text text-center font-sans">
                    Attendance is strictly free. Replay recordings are provided to all registrants.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

