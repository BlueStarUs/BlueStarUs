import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Video, Radio, Sparkles } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";

export interface ResourceCardItem {
  id: string;
  badge: string;
  badgeIcon: React.ComponentType<{ className?: string }>;
  kicker: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  actionText: string;
  actionHref: string;
}

const DEFAULT_RESOURCES: ResourceCardItem[] = [
  {
    id: "blog",
    badge: "Blog",
    badgeIcon: BookOpen,
    kicker: "ARTICLES & ADVICE",
    title: "Admissions Blog & Stories",
    description:
      "Our collection of stories, interviews, and tips provides insight and strategies to navigate the complex college planning and application process.",
    image: "/images/sub_images/Admissions _img.png",
    alt: "Student typing on laptop researching college admissions strategies",
    actionText: "Read Articles",
    actionHref: "/blogs",
  },
  {
    id: "videos",
    badge: "Videos",
    badgeIcon: Video,
    kicker: "CAMPUS & TOURS",
    title: "Student Videos & Insights",
    description:
      "Learn, be inspired, and cultivate personal growth. From campus tours to interviews with former BlueStars students, choose the video that resonates with your personal journey.",
    image: "/images/sub_images/Student_Videos.png",
    alt: "Digital screen library of student interviews and campus tour videos",
    actionText: "Watch Videos",
    actionHref: "/resources/videos",
  },
  {
    id: "webinars",
    badge: "Live Webinars",
    badgeIcon: Radio,
    kicker: "INTERACTIVE SESSIONS",
    title: "Live Admissions Webinars",
    description:
      "Join us in our next webinar about college prep, portfolio strategy, essay writing, and other college-related themes with interactive Q&A.",
    image: "/images/sub_images/live_Admissions_Webinars.png",
    alt: "Live interactive college prep webinar with students and counselors",
    actionText: "Join Next Webinar",
    actionHref: "/resources/webinars",
  },
];

export interface ServiceResourcesBannerProps {
  kicker?: string;
  title?: string;
  description?: string;
  resources?: ResourceCardItem[];
  id?: string;
}

export function ServiceResourcesBanner({
  kicker = "FAMILY & STUDENT RESOURCES",
  title = "Resources to help teens and their families navigate the college admission process",
  description = "Explore our curated collection of expert admissions articles, video tours, and live masterclasses designed to give your family clarity at every milestone.",
  resources = DEFAULT_RESOURCES,
  id = "service-resources",
}: ServiceResourcesBannerProps) {
  return (
    <section
      id={id}
      className="relative w-full py-14 sm:py-18 lg:py-20 bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden"
    >
      {/* Luminous Ambient Background Glow Ribbons (Matching reference style) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#0096c7]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-10 w-[500px] h-[320px] bg-[#00b4d8]/20 rounded-full blur-3xl" />

        {/* Floating Brand Star Glow */}
        <div className="absolute top-12 right-[8%] w-16 h-16 text-[#38bdf8] opacity-35 blur-xs">
          <BrandStar className="w-full h-full fill-current" />
        </div>

        {/* Luminous Wave Lines */}
        <svg
          className="absolute -bottom-10 left-0 w-[600px] h-[200px] text-[#00b4d8] opacity-15 blur-xs"
          viewBox="0 0 600 200"
          fill="none"
        >
          <path d="M0 120 C 150 190, 320 50, 600 140 L 600 200 L 0 200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Glowing Pill Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
            <span>{kicker}</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-white font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px] mb-3">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] max-w-2xl font-sans mt-1">
              {description}
            </p>
          )}
        </div>

        {/* 3 Modern Cards Grid: 1 col on mobile, 3 cols on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((item) => {
            const BadgeIcon = item.badgeIcon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-[6px] border border-[#e5f0fa] shadow-[0_14px_40px_rgba(7,61,99,0.25)] hover:shadow-[0_20px_50px_rgba(7,61,99,0.35)] overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Top Image Container with Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8f2fc]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Glassmorphic Pill Badge (Matching "Blog", "Videos", "Live Webinars" in reference) */}
                  <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#07466f]/90 backdrop-blur-md border border-white/20 text-white shadow-sm">
                    <BadgeIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span className="text-xs sm:text-[12.5px] font-bold font-heading tracking-wide">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-brand-blue tracking-[0.12em] uppercase font-heading block mb-1.5">
                      {item.kicker}
                    </span>

                    <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2.5 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-2 border-t border-[#edf4fb]">
                    <Link
                      href={item.actionHref}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[5px] text-[14.5px] sm:text-[15px] font-bold text-brand-blue bg-[#e4f1fc] hover:bg-brand-blue hover:text-white transition-all duration-200 font-heading shadow-xs group-hover:shadow-sm"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

