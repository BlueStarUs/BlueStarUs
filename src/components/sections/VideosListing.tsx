"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Play,
  Clock,
  User,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { VIDEO_RESOURCES, VideoResource } from "@/lib/resources-data";
import { cn } from "@/lib/utils";

const VIDEO_CATEGORIES = [
  "All",
  "Masterclass",
  "Campus Tours",
  "Student Stories",
  "Admissions Q&A",
] as const;

export function VideosListing() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<VideoResource | null>(null);

  const filteredVideos =
    selectedCat === "All"
      ? VIDEO_RESOURCES
      : VIDEO_RESOURCES.filter((v) => v.category === selectedCat);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
          {VIDEO_CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
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

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              id={video.slug}
              className="bg-white rounded-[5px] border border-[#e2eef9] shadow-xs hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Container with Play Overlay */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8f2fc] cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-navy transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-1 text-white" />
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md text-white text-[10.5px] font-bold uppercase tracking-wider font-heading border border-white/20">
                    <Video className="w-3 h-3 text-[#38bdf8]" />
                    <span>{video.category}</span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-3 text-white text-[11px] font-bold px-2 py-0.5 rounded-[5px] bg-black/75 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg sm:text-[19px] font-extrabold text-brand-navy font-heading mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                    {video.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-blue font-heading mb-3">
                    <User className="w-3.5 h-3.5" />
                    <span>{video.speaker}</span>
                  </div>

                  <p className="text-[14px] leading-[22px] text-brand-text font-sans mb-4 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Key Topics Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#edf4fb]">
                    {video.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px] bg-[#f0f6fc] text-brand-navy/80 border border-[#e2eef9]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-brand-blue bg-[#e4f1fc] hover:bg-brand-blue hover:text-white transition-all font-heading cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video ({video.duration})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div className="bg-white rounded-[5px] max-w-3xl w-full overflow-hidden shadow-[0_25px_60px_rgba(10,61,107,0.3)] border border-[#e2eef9] relative animate-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-black grid place-items-center transition-colors focus:outline-none cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Simulated High-Res Video Player */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <Image
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="relative z-10 text-center p-6 max-w-md">
                  <div className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center mx-auto mb-4 shadow-xl animate-pulse">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <div className="text-white font-heading font-extrabold text-lg sm:text-xl drop-shadow-md">
                    {activeVideo.title}
                  </div>
                  <div className="text-white/80 text-xs sm:text-sm mt-1">
                    Speaker: {activeVideo.speaker} • {activeVideo.duration}
                  </div>
                </div>
              </div>

              {/* Video Info Drawer */}
              <div className="p-6 sm:p-7 bg-white">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider font-heading">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs text-brand-text font-semibold">
                    {activeVideo.duration} Full Masterclass
                  </span>
                </div>

                <h3 id="video-modal-title" className="text-xl font-extrabold text-brand-navy font-heading mb-2">
                  {activeVideo.title}
                </h3>

                <p className="text-[14px] leading-[22px] text-brand-text font-sans mb-5">
                  {activeVideo.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#edf4fb]">
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-2.5 py-1 rounded-[5px] bg-[#f0f6fc] text-brand-navy border border-[#e2eef9]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => setActiveVideo(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-blue hover:bg-brand-navy px-4 py-2 rounded-[5px] transition-all font-heading"
                  >
                    <span>Discuss With a Counselor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

