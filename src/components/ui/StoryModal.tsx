"use client";

import React, { useEffect, useCallback } from "react";
import { X, Star, Award, GraduationCap, Quote, CheckCircle2, User } from "lucide-react";
import { SuccessStory, Testimonial } from "@/types";
import { cn } from "@/lib/utils";

type StoryData = SuccessStory | Testimonial;

interface StoryModalProps {
  story: StoryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
  // Close on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !story) return null;

  const isBlue = (story as SuccessStory).accent !== "green";
  const fullStoryParagraphs =
    story.fullStory && story.fullStory.length > 0
      ? story.fullStory
      : [story.quote];

  const authorRole =
    story.authorRole ||
    (story as SuccessStory).highSchool ||
    story.schoolOrRole ||
    "Blue Stars Family";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#072442]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card - Strictly rounded-[5px] */}
      <div className="relative w-full max-w-2xl bg-white rounded-[5px] border border-[#e2eef9] shadow-[0_25px_60px_rgba(10,61,107,0.22)] overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto">
        {/* Decorative Top Accent Stripe */}
        <div
          className={cn(
            "h-1.5 w-full",
            isBlue
              ? "bg-gradient-to-r from-brand-blue via-brand-lightBlue to-brand-navy"
              : "bg-gradient-to-r from-emerald-500 via-teal-500 to-brand-blue"
          )}
        />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-[#eef4fa] flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(story as SuccessStory).category && (
              <span className="px-2.5 py-1 rounded-[5px] text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-brand-sky text-brand-blue font-heading border border-brand-border/60">
                {(story as SuccessStory).category}
              </span>
            )}
            {story.admittedTo && (
              <span className="px-2.5 py-1 rounded-[5px] text-[11px] sm:text-xs font-bold bg-[#eef7ff] text-brand-navy font-heading border border-[#d6e7f7] inline-flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-brand-blue" />
                <span>{story.admittedTo}</span>
              </span>
            )}
          </div>

          {/* Close Button - strictly rounded-[5px] */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 sm:p-2 rounded-[5px] text-brand-text hover:text-brand-navy hover:bg-[#edf5fc] transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 sm:space-y-5">
          {/* Star Rating */}
          <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
            ))}
            <span className="ml-2 text-xs font-bold text-brand-navy font-heading">
              5.0 / 5.0 Verified Review
            </span>
          </div>

          {/* Title */}
          <h2
            id="story-modal-title"
            className="text-xl sm:text-2xl md:text-[25px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug"
          >
            {story.title || "Admissions Consulting Success Story"}
          </h2>

          {/* Key Outcome Highlight Banner */}
          {story.admittedTo && (
            <div className="rounded-[5px] p-3.5 sm:p-4 bg-[#f8fbfe] border border-[#e2eef9] flex items-start gap-3">
              <div className="w-8 h-8 rounded-[5px] bg-brand-sky text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-4.5 h-4.5 text-brand-blue" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-brand-blue font-heading">
                  ADMISSIONS &amp; ACADEMIC OUTCOME
                </div>
                <div className="text-sm sm:text-[15px] font-bold text-brand-navy font-heading mt-0.5">
                  {story.admittedTo}
                </div>
              </div>
            </div>
          )}

          {/* Full Story Paragraphs */}
          <div className="space-y-3.5 sm:space-y-4 text-brand-text text-[14.5px] sm:text-[15.5px] leading-[24px] sm:leading-[26px] font-sans">
            {fullStoryParagraphs.map((paragraph, index) => (
              <p key={index} className="relative pl-0 sm:pl-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {story.tags && story.tags.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-bold text-brand-navy/70 font-heading mr-1">
                Highlights:
              </span>
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-[5px] bg-[#f0f6fc] text-brand-navy text-[11px] sm:text-xs font-medium font-sans border border-[#dde9f5]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Small Avatar & Author Information */}
        <div className="p-4 sm:p-5 bg-[#f8fbfe] border-t border-[#e2eef9] flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
          {/* Author info with modern small person icon */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Modern Person Icon - strictly rounded-[5px] */}
            <div
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 rounded-[5px] flex items-center justify-center flex-shrink-0 shadow-xs border transition-colors",
                isBlue
                  ? "bg-gradient-to-br from-[#E3F1FC] to-[#d6ebfb] border-[#c4e0f7] text-brand-blue"
                  : "bg-gradient-to-br from-[#e2f7eb] to-[#d2f3e0] border-[#c0ebd2] text-[#1e9e5a]"
              )}
            >
              <User className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="min-w-0">
              <div className="text-sm sm:text-[15px] font-bold text-brand-navy font-heading truncate">
                {story.name}
              </div>
              <div className="text-xs text-brand-text truncate font-sans">
                {authorRole}
                {story.location && ` • ${story.location}`}
              </div>
            </div>
          </div>

          {/* Close Action Button - strictly rounded-[5px] */}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-[5px] bg-white hover:bg-brand-sky border border-[#dbe7f3] text-brand-navy hover:text-brand-blue font-bold text-xs sm:text-[13px] font-heading transition-colors shadow-xs"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
}

