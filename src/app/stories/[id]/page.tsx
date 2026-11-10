import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  GraduationCap,
  Sparkles,
  Quote,
  User,
  MapPin,
  CheckCircle2,
  Calendar,
  Share2,
  Award,
  BookOpen,
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { CTA } from "@/components/sections/CTA";
import { SUCCESS_STORIES, getStoryById } from "@/lib/stories-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return SUCCESS_STORIES.map((story) => ({
    id: story.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    return {
      title: "Success Story Not Found | Blue Stars Admissions Consulting",
    };
  }

  const roleText = story.authorRole || story.highSchool || "Blue Stars Family";
  return {
    title: `${story.name}'s Success Story – ${story.admittedTo || "Admissions Success"} | Blue Stars`,
    description: story.quote.slice(0, 160),
    openGraph: {
      title: `${story.name}'s Story: ${story.title || story.admittedTo}`,
      description: story.quote.slice(0, 160),
    },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    notFound();
  }

  const isBlue = story.accent !== "green";
  const authorRole =
    story.authorRole ||
    story.highSchool ||
    story.schoolOrRole ||
    "Blue Stars Family";

  const fullStoryParagraphs =
    story.fullStory && story.fullStory.length > 0
      ? story.fullStory
      : [story.quote];

  // Pick 3 related or other stories for the bottom showcase
  const relatedStories = SUCCESS_STORIES.filter((s) => s.id !== story.id)
    .sort((a, b) => {
      if (a.category === story.category && b.category !== story.category) return -1;
      if (b.category === story.category && a.category !== story.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <div className="w-full bg-white">
      {/* 1. Breadcrumb Hero - matching Our Services style */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Success Stories", href: "/stories" },
          { label: `${story.name}'s Story` },
        ]}
        badge={story.category?.toUpperCase() || "STUDENT SUCCESS STORY"}
        title={story.title || `${story.name}'s Admissions Journey`}
        description={story.admittedTo ? `Accepted to: ${story.admittedTo}` : story.quote}
        variant="dark"
      />

      {/* 2. Main Story Detail Section */}
      <section className="relative w-full py-10 sm:py-14 lg:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
        {/* Decorative Organic Wave Shapes in Background (Matching Our Services) */}
        <div
          className="absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#e3f1fc]/80 via-[#edf6fd]/40 to-transparent rounded-bl-[220px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[380px] h-[320px] bg-gradient-to-tr from-[#e5f2fc]/70 via-[#eef6fe]/30 to-transparent rounded-tr-[200px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Navigation Bar */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between gap-4">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to All Success Stories</span>
            </Link>

            <span className="text-xs text-brand-text/70 font-sans hidden sm:inline-block">
              {story.category || "College Admissions"} • Verified Outcome
            </span>
          </div>

          {/* Two-Column Layout: Main Story (Left ~65%) & Sticky Snapshot Sidebar (Right ~35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Full Story Article */}
            <article className="lg:col-span-8 bg-white rounded-[5px] border border-[#e2eef9] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(10,61,107,0.06)] relative overflow-hidden">
              {/* Top Accent Stripe */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1.5",
                  isBlue
                    ? "bg-gradient-to-r from-brand-blue via-brand-lightBlue to-brand-navy"
                    : "bg-gradient-to-r from-emerald-500 via-teal-500 to-brand-blue"
                )}
                aria-hidden="true"
              />

              {/* Kicker & Meta Badges (Matching Our Services font size & spacing) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5 pt-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                    STUDENT SUCCESS STORY
                  </span>
                </div>

                {/* 5-Star Rating Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#fff9eb] border border-[#fdecd0]">
                  <div className="flex items-center gap-0.5" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-amber-900 font-heading">
                    5.0 Verified Review
                  </span>
                </div>
              </div>

              {/* Main Headline (Exact typography and font scale from Our Services) */}
              <h1 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px] mb-6">
                {story.title || `${story.name}'s Journey to ${story.admittedTo || "Admissions Success"}`}
              </h1>

              {/* Key Admissions Outcome Banner (Prominent, matching popup & services cards) */}
              {story.admittedTo && (
                <div className="rounded-[5px] p-4 sm:p-5 bg-gradient-to-r from-[#E8F3FC] via-[#f1f7fd] to-white border border-[#cbe2f7] flex items-start gap-4 mb-7 shadow-xs">
                  <div className="w-11 h-11 rounded-[5px] bg-brand-blue text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-brand-blue font-heading">
                      Admissions &amp; Academic Outcome
                    </div>
                    <div className="text-base sm:text-lg lg:text-[19px] font-extrabold text-brand-navy font-heading mt-0.5 leading-snug">
                      {story.admittedTo}
                    </div>
                    {story.category && (
                      <p className="text-xs text-brand-text font-sans mt-1">
                        Track: <span className="font-semibold text-brand-navy">{story.category}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Pull Quote Block (Highlighting the core testimonial quote) */}
              <div className="relative p-5 sm:p-6 rounded-[5px] bg-[#f8fbfe] border-l-4 border-brand-blue border-y border-r border-[#e2eef9] my-7">
                <Quote className="w-8 h-8 text-brand-blue/30 mb-2" />
                <p className="text-[15px] sm:text-[16px] md:text-[17px] font-medium italic text-brand-navy leading-[24px] sm:leading-[27px] font-sans">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-4 h-[1.5px] bg-brand-blue/60" />
                  <span className="text-xs font-bold text-brand-navy font-heading">
                    {story.name}
                  </span>
                  <span className="text-xs text-brand-text font-sans">
                    ({authorRole})
                  </span>
                </div>
              </div>

              {/* The Complete Journey - Full Story Paragraphs */}
              <div className="mt-8 pt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight">
                    The Complete Story
                  </h2>
                </div>

                {/* Paragraphs with font size & line-height matching Our Services */}
                <div className="space-y-4 text-[15px] sm:text-[16px] leading-[26px] sm:leading-[28px] text-brand-text font-sans">
                  {fullStoryParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-brand-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Story Highlights & Tags */}
              {story.tags && story.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#eef4fa]">
                  <div className="text-xs sm:text-[13px] font-bold text-brand-navy font-heading uppercase tracking-wider mb-3">
                    Key Application Highlights:
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-[5px] bg-[#f0f6fc] text-brand-navy text-xs font-semibold font-sans border border-[#dde9f5]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author & Student Footer Card */}
              <div className="mt-8 pt-6 border-t border-[#eef4fa] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-[5px] flex items-center justify-center flex-shrink-0 shadow-xs border transition-colors",
                      isBlue
                        ? "bg-gradient-to-br from-[#E3F1FC] to-[#d6ebfb] border-[#c4e0f7] text-brand-blue"
                        : "bg-gradient-to-br from-[#e2f7eb] to-[#d2f3e0] border-[#c0ebd2] text-[#1e9e5a]"
                    )}
                  >
                    <User className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-brand-navy font-heading">
                      {story.name}
                    </div>
                    <div className="text-xs sm:text-[13px] text-brand-text font-sans">
                      {authorRole}
                      {story.location && ` • ${story.location}`}
                    </div>
                  </div>
                </div>

                <Link
                  href="/stories"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[5px] bg-[#E3F1FC] hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs sm:text-[13px] font-heading transition-colors shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Browse More Stories</span>
                </Link>
              </div>
            </article>

            {/* Right Column: Sticky Snapshot Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Snapshot Info Card */}
              <div className="bg-white rounded-[5px] border border-[#e2eef9] p-5 sm:p-6 shadow-[0_6px_24px_rgba(10,61,107,0.05)]">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#eef4fa]">
                  <Award className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <h3 className="text-base font-extrabold text-brand-navy font-heading">
                    Story Snapshot
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-[13px] font-sans">
                  {/* Student/Parent */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-brand-text font-medium">Applicant / Family</span>
                    <span className="font-bold text-brand-navy font-heading text-right">
                      {story.name}
                    </span>
                  </div>

                  {/* Admitted School */}
                  {story.admittedTo && (
                    <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#f0f5fa]">
                      <span className="text-brand-text font-medium">Admitted School</span>
                      <span className="font-bold text-brand-blue font-heading text-right max-w-[190px]">
                        {story.admittedTo}
                      </span>
                    </div>
                  )}

                  {/* Category Track */}
                  {story.category && (
                    <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#f0f5fa]">
                      <span className="text-brand-text font-medium">Category</span>
                      <span className="font-semibold text-brand-navy text-right">
                        {story.category}
                      </span>
                    </div>
                  )}

                  {/* High School or Role */}
                  {story.highSchool && (
                    <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#f0f5fa]">
                      <span className="text-brand-text font-medium">High School</span>
                      <span className="font-semibold text-brand-navy text-right">
                        {story.highSchool}
                      </span>
                    </div>
                  )}

                  {/* Location */}
                  {story.location && (
                    <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#f0f5fa]">
                      <span className="text-brand-text font-medium">Location</span>
                      <span className="font-semibold text-brand-navy text-right">
                        {story.location}
                      </span>
                    </div>
                  )}

                  {/* Verification */}
                  <div className="flex items-start justify-between gap-3 pt-3 border-t border-[#f0f5fa]">
                    <span className="text-brand-text font-medium">Status</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#1e9e5a] text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Outcome
                    </span>
                  </div>
                </div>
              </div>

              {/* Consultation CTA Card */}
              <div className="bg-gradient-to-br from-brand-navy to-brand-darkNavy text-white rounded-[5px] p-6 shadow-[0_10px_30px_rgba(10,61,107,0.18)] relative overflow-hidden">
                {/* Decorative Background Arc */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none"
                  aria-hidden="true"
                />

                <span className="inline-block px-2.5 py-1 rounded-[5px] bg-brand-blue text-[11px] font-bold font-heading uppercase tracking-wider mb-3">
                  YOUR COLLEGE JOURNEY
                </span>

                <h4 className="text-xl font-extrabold font-heading mb-2 leading-snug">
                  Aiming for Top-Tier College Acceptances?
                </h4>

                <p className="text-xs sm:text-[13px] text-white/80 leading-[20px] font-sans mb-5">
                  Discover how Blue Stars can help your student craft an authentic spike, write standout essays, and secure admission into dream universities.
                </p>

                <Link
                  href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[5px] bg-white hover:bg-brand-sky text-brand-navy font-bold text-xs sm:text-[13.5px] font-heading transition-all duration-200 shadow-sm group"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Quick Services Link Card */}
              <div className="bg-[#f8fbfe] rounded-[5px] border border-[#e2eef9] p-5">
                <h4 className="text-sm font-bold text-brand-navy font-heading mb-2">
                  Explore Blue Stars Services
                </h4>
                <p className="text-xs text-brand-text font-sans mb-3">
                  From 8th–11th grade roadmap planning to application strategy and essay coaching.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>

          {/* 3. More Inspiring Success Stories Grid */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-[#e2eef9]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                    MORE SUCCESS STORIES
                  </span>
                </div>
                <h3 className="text-2xl sm:text-[28px] font-extrabold text-brand-navy font-heading tracking-tight">
                  Real Students. Real Journeys.
                </h3>
              </div>

              <Link
                href="/stories"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] bg-[#E3F1FC] hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs sm:text-[13px] font-heading transition-all duration-200 shadow-xs"
              >
                <span>View All 50+ Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {relatedStories.map((relStory) => {
                const relIsBlue = relStory.accent !== "green";
                const relRole =
                  relStory.authorRole ||
                  relStory.highSchool ||
                  relStory.schoolOrRole ||
                  "Blue Stars Family";

                return (
                  <article
                    key={relStory.id}
                    className="relative bg-white rounded-[5px] p-5 sm:p-6 shadow-[0_6px_24px_rgba(10,61,107,0.05)] border border-[#e2eef9] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(10,61,107,0.1)] flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Bar: Category + 5 Stars */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-[5px] text-[11px] font-bold font-heading tracking-wide uppercase",
                            relIsBlue
                              ? "bg-brand-sky text-brand-blue border border-brand-border/60"
                              : "bg-[#e2f7eb] text-[#1e9e5a] border border-[#c4eed6]"
                          )}
                        >
                          {relStory.category || "Success Story"}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Admitted School Badge */}
                      {relStory.admittedTo && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-xs font-bold text-brand-navy font-heading">
                            <GraduationCap className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                            <span className="truncate">{relStory.admittedTo}</span>
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="text-base sm:text-[17px] font-extrabold text-brand-navy font-heading tracking-tight leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
                        <Link href={`/stories/${relStory.id}`} className="hover:underline">
                          {relStory.title || "Admissions Consulting Success"}
                        </Link>
                      </h4>

                      {/* Quote Preview */}
                      <p className="text-[13.5px] sm:text-[14px] leading-[22px] text-brand-text font-sans line-clamp-3 mb-4">
                        &ldquo;{relStory.quote}&rdquo;
                      </p>
                    </div>

                    {/* Bottom: Author Info + Read More Link */}
                    <div className="pt-4 border-t border-[#eef4fa] flex flex-col gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-[5px] flex items-center justify-center flex-shrink-0 shadow-xs border",
                            relIsBlue
                              ? "bg-gradient-to-br from-[#E3F1FC] to-[#d6ebfb] border-[#c4e0f7] text-brand-blue"
                              : "bg-gradient-to-br from-[#e2f7eb] to-[#d2f3e0] border-[#c0ebd2] text-[#1e9e5a]"
                          )}
                        >
                          <User className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-bold text-brand-navy font-heading truncate">
                            {relStory.name}
                          </div>
                          <div className="text-[11px] text-brand-text truncate font-sans">
                            {relRole}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/stories/${relStory.id}`}
                        className={cn(
                          "w-full py-2.5 px-4 rounded-[5px] font-bold text-xs sm:text-[13px] font-heading transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs border text-center",
                          relIsBlue
                            ? "bg-brand-blue hover:bg-[#f8fbfe] text-white hover:text-brand-blue border-brand-blue hover:border-brand-blue"
                            : "bg-[#1e9e5a] hover:bg-[#f6fcf8] text-white hover:text-[#1e9e5a] border-[#1e9e5a] hover:border-[#1e9e5a]"
                        )}
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Consultation CTA */}
      <CTA />
    </div>
  );
}

