"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Radio,
  Calendar,
  Clock,
  ArrowRight,
  Video,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { WEBINARS_DATA, WebinarItem } from "@/lib/resources-data";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export function WebinarsListing() {
  const sectionRef = useRef<HTMLElement>(null);
  const upcomingCount = WEBINARS_DATA.filter((w) => w.status === "upcoming").length;
  const pastCount = WEBINARS_DATA.filter((w) => w.status === "past").length;
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">(upcomingCount > 0 ? "upcoming" : "past");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = WEBINARS_DATA.filter((w) => w.status === activeTab);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTabChange = (tab: "upcoming" | "past") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getTargetUrl = (webinar: WebinarItem) => {
    if (webinar.registrationUrl && webinar.registrationUrl.startsWith("/")) {
      return webinar.registrationUrl;
    }
    return `/events/${webinar.slug}`;
  };

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 lg:py-10 bg-white scroll-mt-16">
      <div className="max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Compact Tab Switcher (Kam Space) */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="inline-flex p-1 rounded-[6px] bg-[#f0f6fc] border border-[#dbe7f3]">
            <button
              type="button"
              onClick={() => handleTabChange("upcoming")}
              className={cn(
                "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] text-xs font-bold font-heading transition-all duration-150 cursor-pointer flex items-center gap-1.5",
                activeTab === "upcoming"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "text-brand-navy hover:text-brand-blue"
              )}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Upcoming</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                  activeTab === "upcoming"
                    ? "bg-white/20 text-white"
                    : "bg-[#dbe7f3] text-brand-navy"
                )}
              >
                {upcomingCount > 0 ? upcomingCount : "0"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("past")}
              className={cn(
                "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] text-xs font-bold font-heading transition-all duration-150 cursor-pointer flex items-center gap-1.5",
                activeTab === "past"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "text-brand-navy hover:text-brand-blue"
              )}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Past Replays</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                  activeTab === "past"
                    ? "bg-white/20 text-white"
                    : "bg-brand-blue text-white"
                )}
              >
                {pastCount}
              </span>
            </button>
          </div>
        </div>

        {/* Compact Webinars Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {paginatedList.map((webinar) => {
                const targetUrl = getTargetUrl(webinar);
                // ONLY use authentic available images: no dummy/placeholder fallbacks
                const hasRealImage = Boolean(webinar.bannerImage || webinar.youtubeId);
                const bannerSrc = webinar.bannerImage
                  ? webinar.bannerImage
                  : webinar.youtubeId
                  ? `https://img.youtube.com/vi/${webinar.youtubeId}/hqdefault.jpg`
                  : null;

                return (
                  <Link
                    key={webinar.id}
                    href={targetUrl}
                    className="group bg-white rounded-[8px] border border-[#e2eef9] hover:border-brand-blue/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    <div>
                      {/* Image Container: ONLY rendered when a real authentic image exists */}
                      {hasRealImage && bannerSrc ? (
                        <div className="relative w-full aspect-[16/9] min-h-[180px] sm:min-h-[200px] lg:min-h-[210px] bg-slate-100 overflow-hidden border-b border-[#edf4fb]">
                          <Image
                            src={bannerSrc}
                            alt={webinar.title}
                            fill
                            className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
                            <span className="px-2.5 py-0.5 rounded-[4px] bg-white/95 backdrop-blur-xs text-[10.5px] font-bold font-heading text-brand-blue uppercase tracking-wider shadow-xs">
                              {webinar.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-[4px] bg-black/75 backdrop-blur-xs text-[10.5px] font-medium text-white flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#38bdf8]" />
                              <span>{webinar.duration.replace(" on-demand replay", "").replace(" full recording", "")}</span>
                            </span>
                          </div>

                          {/* Play Icon Pill Overlay */}
                          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-brand-blue text-white text-[11px] font-bold font-heading shadow-xs">
                            <Play className="w-3 h-3 fill-current" />
                            <span>Watch Replay</span>
                          </div>
                        </div>
                      ) : (
                        /* Top Strip for Cards Without Images (Clean & Space-Saving) */
                        <div className="p-4 pb-0 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-[4px] bg-[#E3F1FC] text-[10.5px] font-bold font-heading text-brand-blue uppercase tracking-wider">
                            {webinar.category}
                          </span>
                          <span className="text-xs font-semibold text-brand-text flex items-center gap-1">
                            <Clock className="w-3 h-3 text-brand-blue" />
                            <span>{webinar.duration.replace(" on-demand replay", "").replace(" full recording", "")}</span>
                          </span>
                        </div>
                      )}

                      {/* Content Area */}
                      <div className="p-4 sm:p-5">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue mb-1.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{webinar.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base lg:text-[17px] font-extrabold text-brand-navy font-heading leading-snug line-clamp-2 mb-2 group-hover:text-brand-blue transition-colors">
                          {webinar.title}
                        </h3>

                        {/* Increased Font Size for <p> tag as requested */}
                        <p className="text-[13px] sm:text-[14.5px] leading-relaxed text-brand-text font-sans line-clamp-2 mb-3.5">
                          {webinar.subtitle || webinar.description}
                        </p>

                        {/* Speaker Mini Pill */}
                        <div className="flex items-center gap-2.5 p-2 rounded-[5px] bg-[#f8fbfe] border border-[#eef4fa]">
                          <div className="w-7 h-7 rounded-full overflow-hidden relative shrink-0 border border-[#dbe7f3]">
                            <Image
                              src={webinar.speaker.avatar}
                              alt={webinar.speaker.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[13px] font-bold text-brand-navy truncate">
                              {webinar.speaker.name}
                            </span>
                            <span className="block text-[12px] text-brand-text truncate">
                              {webinar.speaker.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-[#fbfdff] border-t border-[#edf4fb] flex items-center justify-between text-xs sm:text-[13px] font-bold text-brand-blue font-heading group-hover:bg-brand-sky/40 transition-colors">
                      <span>View Details &amp; Video</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Compact Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 pt-5 border-t border-[#edf4fb] flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-[13.5px] text-brand-text font-sans">
                  Showing <strong className="text-brand-navy">{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}</strong> of <strong className="text-brand-navy">{filtered.length}</strong> replays
                </p>

                <nav className="flex items-center gap-1.5" aria-label="Webinars pagination">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                      "px-3 py-1.5 rounded-[4px] text-xs font-bold font-heading flex items-center gap-1 border transition-all",
                      currentPage === 1
                        ? "opacity-40 cursor-not-allowed bg-[#f8fbfe] text-brand-text border-[#e2eef9]"
                        : "bg-white text-brand-navy border-[#c4dcfa] hover:bg-brand-sky hover:text-brand-blue cursor-pointer"
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={cn(
                        "w-8 h-8 rounded-[4px] text-xs font-bold font-heading transition-all cursor-pointer border grid place-items-center",
                        currentPage === pageNum
                          ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                          : "bg-white text-brand-navy border-[#e2eef9] hover:bg-brand-sky hover:text-brand-blue"
                      )}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                      aria-label={`Page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                      "px-3 py-1.5 rounded-[4px] text-xs font-bold font-heading flex items-center gap-1 border transition-all",
                      currentPage === totalPages
                        ? "opacity-40 cursor-not-allowed bg-[#f8fbfe] text-brand-text border-[#e2eef9]"
                        : "bg-white text-brand-navy border-[#c4dcfa] hover:bg-brand-sky hover:text-brand-blue cursor-pointer"
                    )}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="bg-[#F8FBFE] rounded-[6px] border border-[#e2eef9] p-5 sm:p-8 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#E3F1FC] text-brand-blue flex items-center justify-center mx-auto mb-2.5">
              <Radio className="w-5 h-5 text-brand-blue" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-brand-navy font-heading mb-1.5">
              New Live Masterclasses Coming Soon
            </h3>
            <p className="text-xs sm:text-[13.5px] text-brand-text font-sans mb-4 max-w-md mx-auto leading-relaxed">
              Our counseling team is scheduling the upcoming live webinars and UC PIQ workshops. In the meantime, explore all on-demand replays.
            </p>
            <button
              type="button"
              onClick={() => handleTabChange("past")}
              className="px-4 py-2 rounded-[5px] text-xs font-bold text-white bg-brand-blue hover:bg-brand-navy transition-colors font-heading shadow-xs cursor-pointer"
            >
              Browse On-Demand Replays
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
