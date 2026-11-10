"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  FileText,
  Clock,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import { RESOURCE_GUIDES, ResourceGuide } from "@/lib/resources-data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Strategy", "Essays", "UC System", "Checklists", "High School"] as const;

export function GuidesListing() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeGuideModal, setActiveGuideModal] = useState<ResourceGuide | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const filteredGuides =
    selectedCategory === "All"
      ? RESOURCE_GUIDES
      : RESOURCE_GUIDES.filter((g) => g.category === selectedCategory);

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setActiveGuideModal(null);
      setEmailInput("");
    }, 2800);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading transition-all duration-200 cursor-pointer border",
                  isActive
                    ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                    : "bg-[#f8fbfe] text-brand-navy border-[#e2eef9] hover:bg-brand-sky/60 hover:text-brand-blue"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              id={guide.slug}
              className="bg-white rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Cover Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8f2fc]">
                  <Image
                    src={guide.coverImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md text-white text-[10.5px] font-bold uppercase tracking-wider font-heading border border-white/20">
                    <BookOpen className="w-3 h-3 text-[#38bdf8]" />
                    <span>{guide.category}</span>
                  </div>

                  {/* Metadata Banner */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11.5px] font-semibold">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {guide.pages} Pages PDF
                    </span>
                    <span>Free Admissions Guide</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  <div className="text-[11px] font-bold text-brand-blue tracking-[0.12em] uppercase font-heading mb-1.5">
                    {guide.updatedAt}
                  </div>

                  <h3 className="text-xl font-extrabold text-brand-navy font-heading mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-[13.5px] font-semibold text-brand-navy/80 font-sans mb-3">
                    {guide.subtitle}
                  </p>

                  <p className="text-[14px] leading-[22px] text-brand-text font-sans mb-5 line-clamp-3">
                    {guide.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-4 border-t border-[#edf4fb] mb-5">
                    <div className="text-[11px] font-bold tracking-wider uppercase text-brand-navy font-heading">
                      What&apos;s Inside:
                    </div>
                    {guide.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-brand-navy/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Target Audience */}
                  <div className="p-3 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-xs text-brand-text mb-2">
                    <span className="font-bold text-brand-navy font-heading">Best For: </span>
                    {guide.targetAudience}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-0 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveGuideModal(guide);
                    setDownloadSuccess(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 font-heading shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free PDF Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download Modal */}
        {activeGuideModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-modal-title"
          >
            <div className="bg-white rounded-[5px] max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(10,61,107,0.25)] border border-[#e2eef9] relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setActiveGuideModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-[5px] bg-[#f0f6fc] text-brand-navy hover:text-brand-blue grid place-items-center transition-colors focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-blue font-heading">
                  INSTANT FREE DOWNLOAD
                </span>
              </div>

              <h3 id="guide-modal-title" className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading mb-2 leading-tight">
                {activeGuideModal.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-brand-text font-sans mb-6">
                Enter your email address below to receive the complete, full-length {activeGuideModal.pages}-page PDF guide immediately in your inbox.
              </p>

              {downloadSuccess ? (
                <div className="p-6 rounded-[5px] bg-[#E3F5EA] border border-[#2F9E5C]/30 text-center animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-brand-navy font-heading mb-1">
                    Download Link Dispatched!
                  </h4>
                  <p className="text-xs text-[#1e6f40] font-sans">
                    We have emailed your PDF directly to <strong>{emailInput}</strong>. Please check your inbox (and spam folder) within the next 2 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-1.5">
                      Parent / Student Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. parent@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[5px] text-sm text-brand-navy border border-[#c4dcfa] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-brand-navy font-heading uppercase tracking-wider">
                      Included In This Download:
                    </div>
                    {activeGuideModal.tableOfContents.slice(0, 4).map((item, idx) => (
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
                    <Download className="w-4 h-4" />
                    <span>Send Me the Free PDF Guide</span>
                  </button>

                  <p className="text-[11px] text-brand-text text-center font-sans">
                    We respect your privacy. Zero spam, unsubscribe with one click at any time.
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

