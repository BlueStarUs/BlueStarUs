"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Play,
  Clock,
  User,
  X,
  Search,
  Sparkles,
  Calendar,
  BookOpen,
  ArrowRight,
  Tv,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { VIDEO_RESOURCES, VideoResource } from "@/lib/resources-data";
import { cn } from "@/lib/utils";

// Official playlists matching https://bluestars.us/videos/ and the Blue Stars YouTube channel
const PLAYLIST_CATEGORIES = [
  "All Videos",
  "College Tours",
  "Webinars",
  "UC PIQs & Essays",
  "Student Stories",
  "Admissions Strategy",
] as const;

// Accurate mapping of all 41 channel uploads to the authentic Blue Stars playlists
const PLAYLIST_MAP: Record<string, string> = {
  // Dr. M's Virtual College Tours (8 videos)
  "18ICjuPxpaY": "College Tours",
  "mrR9nbQeJEk": "College Tours",
  "ko4-tTFr7os": "College Tours",
  "Wn4ByAR71Dc": "College Tours",
  "H2cr7obUY1M": "College Tours",
  "fd6fu17gUgA": "College Tours",
  "oF1dYZ7yu3g": "College Tours",
  "nKd2OHxNvEY": "College Tours",

  // Webinars & Masterclasses (10 videos)
  "emsTxlBCf9o": "Webinars",
  "6dMU6O1NJ3g": "Webinars",
  "DvVTrzsYEjI": "Webinars",
  "HOyacSoA2no": "Webinars",
  "kmFQMiNBusA": "Webinars",
  "qccVw0E8KYE": "Webinars",
  "ATlWZyDiSkY": "Webinars",
  "ymAy4jL1VIk": "Webinars",
  "O6dJL0Gbv4E": "Webinars",
  "TdLxNWBMqww": "Webinars",

  // UC PIQs & Application Essays (11 videos)
  "BzP9EFw_yEg": "UC PIQs & Essays",
  "NUb3dvxG9DE": "UC PIQs & Essays",
  "6CekYAesGy8": "UC PIQs & Essays",
  "TkTFcJOu1qA": "UC PIQs & Essays",
  "KY0CF1B1puk": "UC PIQs & Essays",
  "EZs_l5696Jo": "UC PIQs & Essays",
  "5YFsT63GaxA": "UC PIQs & Essays",
  "eLEROi8Wny0": "UC PIQs & Essays",
  "GIB_zp_6e64": "UC PIQs & Essays",
  "-KzOic8VBBU": "UC PIQs & Essays",
  "ynylPJNGzys": "UC PIQs & Essays",

  // Student Success & Alumni Stories (5 videos)
  "52Yd17-jVO0": "Student Stories",
  "tVW8-qKTCFE": "Student Stories",
  "BVJfU_8lV_k": "Student Stories",
  "YfGVLUJlZ1E": "Student Stories",
  "Mp84oQPjEG8": "Student Stories",

  // College Planning & Admissions Strategy (7 videos)
  "KKsUocGuI9Q": "Admissions Strategy",
  "yM3ui1MPvEY": "Admissions Strategy",
  "swsk9D8VUGo": "Admissions Strategy",
  "2jMMtrXySwk": "Admissions Strategy",
  "G3V032hDPdk": "Admissions Strategy",
  "w4_iLZxuMJQ": "Admissions Strategy",
  "APDR9c9aDkI": "Admissions Strategy",
  "xtYCRa6gYKk": "Admissions Strategy",
};

export function VideosListing() {
  const [selectedCat, setSelectedCat] = useState<string>("All Videos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<VideoResource | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Pagination state (matches StoriesListing pattern)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile viewport (< 768px) to show 6 cards per page
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? 6 : 9;

  // Close modal on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeVideo]);

  // Dynamic category counts according to authentic playlists
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Videos": VIDEO_RESOURCES.length };
    PLAYLIST_CATEGORIES.forEach((cat) => {
      if (cat !== "All Videos") {
        counts[cat] = VIDEO_RESOURCES.filter(
          (v) => (PLAYLIST_MAP[v.youtubeId || ""] || v.category) === cat
        ).length;
      }
    });
    return counts;
  }, []);

  // Filtered videos based on authentic playlist category and search query
  const filteredVideos = useMemo(() => {
    let list = VIDEO_RESOURCES;

    if (selectedCat !== "All Videos") {
      list = list.filter((v) => {
        const mappedCat = PLAYLIST_MAP[v.youtubeId || ""] || v.category;
        return mappedCat === selectedCat;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.speaker.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          (PLAYLIST_MAP[v.youtubeId || ""] || v.category).toLowerCase().includes(q) ||
          v.keyTopics.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCat, searchQuery]);

  // Reset pagination to page 1 when category, search, or mobile layout changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCat, searchQuery, isMobile]);

  // Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredVideos.length);
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

  // Clamp current page if outside range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Scroll smoothly back to top of grid when page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const gridElem = document.getElementById("videos-grid-top");
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Featured Spotlight video (University of Michigan or Naomi Zimmerman)
  const featuredVideo = useMemo(() => {
    return (
      VIDEO_RESOURCES.find((v) => v.youtubeId === "18ICjuPxpaY") ||
      VIDEO_RESOURCES.find((v) => v.featured) ||
      VIDEO_RESOURCES[0]
    );
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-[#FBFDFF] relative overflow-hidden" id="video-catalog">
      {/* Subtle organic background glows matching Services page */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#e3f1fc]/60 via-[#edf6fd]/30 to-transparent rounded-bl-[200px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[380px] h-[320px] bg-gradient-to-tr from-[#e5f2fc]/50 via-[#eef6fe]/20 to-transparent rounded-tr-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="w-12 h-[3px] bg-brand-blue rounded-full mb-3.5 origin-center" aria-hidden="true" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#E3F1FC] text-brand-blue text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
            <Tv className="w-3.5 h-3.5 text-brand-blue" />
            <span>BLUE STARS OFFICIAL VIDEO LIBRARY &bull; 41 MASTERCLASSES</span>
          </div>
          <h2 className="text-2xl sm:text-[30px] md:text-[34px] lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px] mb-3">
            Explore All 41 Admissions Masterclasses, Tours &amp; Playlists
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
            Directly from Dr. Amy Morgenstern, senior counselors, and Blue Stars alumni—watch real college campus visits, deconstructions of UC PIQs and Common App essays, and strategic webinars.
          </p>
        </div>

        {/* Featured Video Spotlight Card (Visible when on page 1, not searching, all videos) */}
        {!searchQuery.trim() && selectedCat === "All Videos" && currentPage === 1 && featuredVideo && (
          <div className="mb-12 bg-white rounded-[5px] border border-[#e2eef9] shadow-[0_15px_40px_rgba(10,61,107,0.08)] overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-stretch">
              {/* Left Video Thumbnail with Big Play Button */}
              <div
                className="relative aspect-[16/9] lg:aspect-auto min-h-[260px] sm:min-h-[340px] w-full bg-[#0a3d6b] cursor-pointer overflow-hidden"
                onClick={() => setActiveVideo(featuredVideo)}
              >
                <Image
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Big Animated Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-blue/95 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(11,99,181,0.5)] group-hover:scale-110 group-hover:bg-brand-navy transition-all duration-300">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-white" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#0A3D6B]/90 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider font-heading border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Featured Masterclass</span>
                </div>

                <div className="absolute bottom-4 right-4 text-white text-xs font-bold px-2.5 py-1 rounded-[5px] bg-black/80 flex items-center gap-1.5 backdrop-blur-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredVideo.duration}</span>
                </div>
              </div>

              {/* Right Content */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-heading">
                      {PLAYLIST_MAP[featuredVideo.youtubeId || ""] || featuredVideo.category}
                    </span>
                    {featuredVideo.publishedAt && (
                      <span className="text-xs text-brand-text/70 flex items-center gap-1">
                        &bull; <Calendar className="w-3 h-3 inline" /> {featuredVideo.publishedAt}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-xl sm:text-2xl lg:text-[25px] font-extrabold text-brand-navy font-heading leading-snug mb-3 cursor-pointer group-hover:text-brand-blue transition-colors"
                    onClick={() => setActiveVideo(featuredVideo)}
                  >
                    {featuredVideo.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-brand-blue font-heading mb-3">
                    <User className="w-3.5 h-3.5" />
                    <span>Speaker: {featuredVideo.speaker}</span>
                  </div>

                  <p className="text-[14px] sm:text-[15px] leading-[23px] sm:leading-[25px] text-brand-text font-sans mb-5">
                    {featuredVideo.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredVideo.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-2.5 py-1 rounded-[5px] bg-[#f0f6fc] text-brand-navy/90 border border-[#e2eef9]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#edf4fb] flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(featuredVideo)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all font-heading shadow-md cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Full Masterclass</span>
                  </button>
                  <Link
                    href="/free-workbook"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[5px] text-xs sm:text-[13px] font-bold text-brand-navy bg-[#E3F1FC] hover:bg-[#d8ecfc] transition-all font-heading"
                  >
                    <BookOpen className="w-4 h-4 text-brand-blue" />
                    <span>Download Workbook</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Anchor for smooth scroll on pagination */}
        <div id="videos-grid-top" className="scroll-mt-24" />

        {/* Filter, Search & Layout View Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs">
          {/* Playlist Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {PLAYLIST_CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={cn(
                    "px-3.5 py-2 rounded-[5px] text-xs font-bold font-heading transition-all duration-200 cursor-pointer border flex items-center gap-1.5",
                    active
                      ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                      : "bg-[#f8fbfe] text-brand-navy border-[#e2eef9] hover:bg-brand-sky hover:text-brand-blue"
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-[4px] font-semibold",
                      active ? "bg-white/20 text-white" : "bg-[#e2eef9] text-brand-text"
                    )}
                  >
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box & View Mode Toggle */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-brand-text/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 41 videos & playlists..."
                className="w-full pl-9 pr-8 py-2 rounded-[5px] text-xs sm:text-[13px] text-brand-navy placeholder:text-brand-text/50 border border-[#c4dcfa] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-text/50 hover:text-brand-navy"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Toggle: Grid vs Modern List */}
            <div className="inline-flex items-center p-1 rounded-[5px] bg-[#f0f6fc] border border-[#e2eef9]">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-[4px] transition-colors cursor-pointer",
                  viewMode === "grid"
                    ? "bg-white text-brand-blue shadow-xs"
                    : "text-brand-text hover:text-brand-navy"
                )}
                aria-label="Grid layout"
                title="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-[4px] transition-colors cursor-pointer",
                  viewMode === "list"
                    ? "bg-white text-brand-blue shadow-xs"
                    : "text-brand-text hover:text-brand-navy"
                )}
                aria-label="Modern list layout"
                title="Modern list layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Cards: Grid View OR Modern List View */}
        {filteredVideos.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              /* 3-Column Responsive Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                {paginatedVideos.map((video) => {
                  const playlistCat = PLAYLIST_MAP[video.youtubeId || ""] || video.category;
                  return (
                    <div
                      key={video.id}
                      id={video.slug}
                      className="bg-white rounded-[5px] border border-[#e5eef7] shadow-xs hover:shadow-[0_18px_40px_rgba(10,61,107,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between group relative"
                    >
                      {/* Top: Thumbnail & Overlays */}
                      <div>
                        <div
                          className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A3D6B] cursor-pointer"
                          onClick={() => setActiveVideo(video)}
                        >
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-navy transition-all duration-300">
                              <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
                            </div>
                          </div>

                          {/* Playlist / Category Pill */}
                          <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#0A3D6B]/90 backdrop-blur-xs text-white text-[10.5px] font-bold uppercase tracking-wider font-heading border border-white/20">
                            <Video className="w-3 h-3 text-[#38bdf8]" />
                            <span>{playlistCat}</span>
                          </div>

                          {/* Duration Pill */}
                          <div className="absolute bottom-3 right-3 text-white text-[11px] font-bold px-2 py-0.5 rounded-[5px] bg-black/80 flex items-center gap-1 backdrop-blur-xs">
                            <Clock className="w-3 h-3" />
                            <span>{video.duration}</span>
                          </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-5 sm:p-6">
                          {video.publishedAt && (
                            <span className="text-[11px] font-semibold text-brand-text/70 mb-1.5 block">
                              Published: {video.publishedAt}
                            </span>
                          )}

                          <h3
                            className="text-[17px] sm:text-[18.5px] font-extrabold text-brand-navy font-heading mb-2 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2 cursor-pointer"
                            onClick={() => setActiveVideo(video)}
                          >
                            {video.title}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-brand-blue font-heading mb-3">
                            <User className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{video.speaker}</span>
                          </div>

                          <p className="text-[13.5px] sm:text-[14px] leading-[22px] text-brand-text font-sans mb-4 line-clamp-3">
                            {video.description}
                          </p>

                          {/* Key Topics Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#edf4fb]">
                            {video.keyTopics.slice(0, 3).map((topic, i) => (
                              <span
                                key={i}
                                className="text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] bg-[#f0f6fc] text-brand-navy/85 border border-[#e2eef9]"
                              >
                                {topic}
                              </span>
                            ))}
                            {video.keyTopics.length > 3 && (
                              <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded-[5px] bg-[#f0f6fc] text-brand-text/70 border border-[#e2eef9]">
                                +{video.keyTopics.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Button */}
                      <div className="p-5 sm:p-6 pt-0">
                        <button
                          type="button"
                          onClick={() => setActiveVideo(video)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-brand-blue bg-[#E3F1FC] hover:bg-brand-blue hover:text-white transition-all font-heading cursor-pointer shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Video ({video.duration})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Modern List View (Responsive Horizontal Cards) */
              <div className="space-y-4 sm:space-y-5">
                {paginatedVideos.map((video) => {
                  const playlistCat = PLAYLIST_MAP[video.youtubeId || ""] || video.category;
                  return (
                    <div
                      key={video.id}
                      id={video.slug}
                      className="bg-white rounded-[5px] border border-[#e5eef7] shadow-xs hover:shadow-[0_12px_32px_rgba(10,61,107,0.1)] transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch group"
                    >
                      {/* Left: Thumbnail with Play Overlay */}
                      <div
                        className="relative w-full sm:w-[260px] md:w-[290px] shrink-0 aspect-[16/10] sm:aspect-auto overflow-hidden bg-[#0A3D6B] cursor-pointer"
                        onClick={() => setActiveVideo(video)}
                      >
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 290px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-navy transition-all duration-300">
                            <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                          </div>
                        </div>

                        {/* Playlist Pill */}
                        <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#0A3D6B]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider font-heading border border-white/20">
                          <Video className="w-2.5 h-2.5 text-[#38bdf8]" />
                          <span>{playlistCat}</span>
                        </div>

                        {/* Duration Pill */}
                        <div className="absolute bottom-2.5 right-2.5 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-[4px] bg-black/80 flex items-center gap-1 backdrop-blur-xs">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>

                      {/* Right: Content & Action */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-heading">
                              {playlistCat}
                            </span>
                            {video.publishedAt && (
                              <span className="text-[11.5px] text-brand-text/70 flex items-center gap-1">
                                <Calendar className="w-3 h-3 inline" /> {video.publishedAt}
                              </span>
                            )}
                          </div>

                          <h3
                            className="text-[17px] sm:text-[19px] font-extrabold text-brand-navy font-heading leading-snug mb-1.5 group-hover:text-brand-blue transition-colors cursor-pointer"
                            onClick={() => setActiveVideo(video)}
                          >
                            {video.title}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-brand-blue font-heading mb-2">
                            <User className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Speaker: {video.speaker}</span>
                          </div>

                          <p className="text-[13.5px] leading-[22px] text-brand-text font-sans line-clamp-2 mb-3">
                            {video.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#edf4fb] flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {video.keyTopics.slice(0, 3).map((topic, i) => (
                              <span
                                key={i}
                                className="text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] bg-[#f0f6fc] text-brand-navy/85 border border-[#e2eef9]"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveVideo(video)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[5px] text-xs sm:text-[12.5px] font-bold text-brand-blue bg-[#E3F1FC] hover:bg-brand-blue hover:text-white transition-all font-heading cursor-pointer shadow-xs ml-auto"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Watch ({video.duration})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modern Pagination Controls - strictly rounded-[5px] & mobile responsive */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-[5px] bg-white border border-[#e2eef9] shadow-xs">
                {/* Result Counter Info */}
                <div className="text-xs sm:text-[13px] font-sans text-brand-text order-2 sm:order-1 text-center sm:text-left">
                  Showing <span className="font-bold text-brand-navy">{startIndex + 1}</span> to{" "}
                  <span className="font-bold text-brand-navy">{endIndex}</span> of{" "}
                  <span className="font-bold text-brand-navy">{filteredVideos.length}</span> videos
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
                  {/* Previous Page Button */}
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading border transition-colors select-none",
                      currentPage === 1
                        ? "bg-[#f8fbfe] text-brand-text/40 border-[#eef4fa] cursor-not-allowed"
                        : "bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue border-[#e2eef9] cursor-pointer shadow-2xs"
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Mobile Compact Page Indicator */}
                  <div className="flex sm:hidden items-center px-3 py-1.5 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-xs font-bold text-brand-navy font-heading">
                    <span>{currentPage} / {totalPages}</span>
                  </div>

                  {/* Desktop & Tablet Numbered Page Buttons */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={cn(
                            "w-8 h-8 sm:w-9 sm:h-9 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading flex items-center justify-center transition-all cursor-pointer select-none",
                            isActive
                              ? "bg-brand-blue text-white shadow-xs"
                              : "bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue border border-[#e2eef9]"
                          )}
                          aria-current={isActive ? "page" : undefined}
                          aria-label={`Page ${pageNum}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-[5px] text-xs sm:text-[13px] font-bold font-heading border transition-colors select-none",
                      currentPage === totalPages
                        ? "bg-[#f8fbfe] text-brand-text/40 border-[#eef4fa] cursor-not-allowed"
                        : "bg-white hover:bg-brand-sky text-brand-navy hover:text-brand-blue border-[#e2eef9] cursor-pointer shadow-2xs"
                    )}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-[5px] border border-[#e2eef9] p-10 text-center max-w-lg mx-auto">
            <Video className="w-10 h-10 text-brand-blue/50 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-navy font-heading mb-1">
              No matching videos found
            </h3>
            <p className="text-xs sm:text-[13.5px] text-brand-text font-sans mb-4">
              We couldn&apos;t find any videos matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset the playlist filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("All Videos");
              }}
              className="px-4 py-2 rounded-[5px] text-xs font-bold text-white bg-brand-blue hover:bg-brand-navy font-heading transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Free Workbook CTA Spotlight Banner (Connecting Videos to Workbook) */}
        <div className="mt-14 p-6 sm:p-8 rounded-[5px] bg-gradient-to-r from-[#0A3D6B] to-[#0B63B5] text-white shadow-[0_15px_40px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[5px] bg-white/10 border border-white/20 grid place-items-center flex-shrink-0 text-white">
              <BookOpen className="w-7 h-7 text-[#79c3f7]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#79c3f7] font-heading">
                FREE COMPANION DOWNLOAD
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading leading-snug">
                Blue Stars College Planning Foundations Workbook
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#d4e8f8] font-sans mt-0.5">
                Download the official 4-year strategic roadmap and reflection exercises designed by Dr. Amy Morgenstern.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Link
              href="/free-workbook"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-brand-navy bg-white hover:bg-[#d8ecfc] shadow-md transition-all font-heading"
            >
              <span>Get Free Workbook &amp; PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="/downloads/Blue-Stars-College-Planning-Foundations-Workbook.pdf"
              download="Blue-Stars-College-Planning-Foundations-Workbook.pdf"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white border border-white/30 hover:bg-white/10 transition-all font-heading"
            >
              <span>Instant PDF</span>
            </a>
          </div>
        </div>

        {/* Pure Video Cinema Lightbox Modal (Compact Size, Never Cut Off From Top, High Contrast Header Bar) */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 pt-14 sm:pt-16 pb-8 overflow-y-auto animate-in fade-in duration-200 mt-20"
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            onClick={() => setActiveVideo(null)}
          >
            {/* Modal Dialog Container: Compact size max-w-[740px] to fit any screen height comfortably */}
            <div
              className="relative w-full max-w-[740px] md:max-w-[780px] my-auto rounded-[8px] overflow-hidden bg-[#071324] shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-white/20 animate-in zoom-in-95 duration-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Header Bar with Video Title & Close Button */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#0a192f] border-b border-white/10 text-white">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Play className="w-3.5 h-3.5 text-[#38bdf8] flex-shrink-0 fill-current" />
                  <span className="text-xs sm:text-[13px] font-bold font-heading text-white truncate">
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 hover:bg-rose-600 text-white flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer shadow-sm ml-2 focus:outline-none"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* 16:9 Responsive YouTube Player */}
              <div className="relative aspect-[16/9] w-full bg-black">
                {activeVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">
                    <p>Video unavailable</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
