"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  X,
  Radio,
  Award,
  BellRing,
  AlertCircle,
} from "lucide-react";
import { Announcement, AnnouncementType } from "@/types";
import { DEFAULT_ANNOUNCEMENTS } from "@/lib/constants";

interface AnnouncementBarProps {
  initialAnnouncements?: Announcement[];
}

export function AnnouncementBar({
  initialAnnouncements = DEFAULT_ANNOUNCEMENTS,
}: AnnouncementBarProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    initialAnnouncements.filter((a) => a.isActive)
  );
  const [tickerSpeed, setTickerSpeed] = useState(28);
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const dismissed = sessionStorage.getItem("bluestars_announcement_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Fetch live active announcements from API
  useEffect(() => {
    let isSubscribed = true;

    async function fetchLiveAnnouncements() {
      try {
        const res = await fetch("/api/announcements", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isSubscribed) {
            if (Array.isArray(data.announcements) && data.announcements.length > 0) {
              setAnnouncements(data.announcements);
            }
            if (data.tickerSpeed) {
              setTickerSpeed(Number(data.tickerSpeed));
            }
          }
        }
      } catch {
        // Fallback to initial
      }
    }

    fetchLiveAnnouncements();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("bluestars_announcement_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  if (!mounted || isDismissed || announcements.length === 0) {
    return null;
  }

  // Double list to create a seamless, continuous, infinite right-to-left marquee loop
  const marqueeItems = [...announcements, ...announcements, ...announcements, ...announcements];

  const renderTypeIcon = (type?: AnnouncementType) => {
    switch (type) {
      case "webinar":
        return <Radio className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />;
      case "success":
        return <Award className="w-3.5 h-3.5 text-[#4ade80]" />;
      case "urgent":
        return <AlertCircle className="w-3.5 h-3.5 text-[#f87171]" />;
      case "alert":
        return <BellRing className="w-3.5 h-3.5 text-[#fbbf24]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />;
    }
  };

  return (
    <aside
      role="region"
      aria-label="Important Announcements"
      className="relative z-50 bg-gradient-to-r from-[#063354] via-[#094c79] to-[#0b63b5] text-white border-b border-white/10 shadow-[0_2px_12px_rgba(7,61,99,0.25)] select-none overflow-hidden h-[38px] sm:h-[42px] flex items-center"
    >
      {/* Left Edge Ambient Fade Mask */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#063354] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Right Edge Ambient Fade Mask */}
      <div
        className="pointer-events-none absolute right-4 sm:right-6 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#0b63b5] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Infinite Continuous Right-to-Left Marquee Ticker */}
      <div className="flex-1 overflow-hidden h-full flex items-center">
        <div
          className="animate-marquee-scroll flex items-center whitespace-nowrap"
          style={{ animationDuration: `${tickerSpeed}s` }}
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 flex-shrink-0"
            >
              {/* Type Icon */}
              <span className="flex-shrink-0">{renderTypeIcon(item.type)}</span>

              {/* Badge */}
              {item.badge && (
                <span className="px-2 py-0.5 rounded-[4px] bg-white/15 border border-white/25 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-sky-200 shadow-xs flex-shrink-0">
                  {item.badge}
                </span>
              )}

              {/* Punchy Title */}
              <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight flex-shrink-0">
                {item.title}
              </span>

              {/* Action Link / CTA */}
              {item.linkText && item.linkUrl && (
                <Link
                  href={item.linkUrl}
                  className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-bold text-white hover:text-sky-200 underline underline-offset-2 decoration-[#38bdf8] hover:decoration-white transition-colors flex-shrink-0 group/link"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </Link>
              )}

              {/* Separator Symbol */}
              <span className="text-[#38bdf8]/60 text-xs sm:text-sm pl-2 sm:pl-3" aria-hidden="true">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dismiss Button (Pinned on Right) */}
      <div className="relative z-20 flex-shrink-0 pr-2 sm:pr-3 pl-1 bg-gradient-to-l from-[#0b63b5] via-[#0b63b5] to-transparent h-full flex items-center">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement banner"
          className="p-1 rounded-[4px] hover:bg-white/15 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </aside>
  );
}
