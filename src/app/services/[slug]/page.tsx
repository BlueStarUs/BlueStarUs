import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowRight,
  Compass,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  Target,
  Star,
  Quote,
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { ServiceFAQAccordion } from "@/components/sections/ServiceFAQAccordion";
import { ServiceResourcesBanner } from "@/components/sections/ServiceResourcesBanner";
import { CollegeAdmissionsConsultingView } from "@/components/sections/CollegeAdmissionsConsultingView";
import { CollegePlanningView } from "@/components/sections/CollegePlanningView";
import { EssayGuidanceView } from "@/components/sections/EssayGuidanceView";
import { ResearchInternshipsView } from "@/components/sections/ResearchInternshipsView";
import { BrandStar } from "@/components/ui/Icons";
import { SERVICES_CATALOG } from "@/lib/services-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_CATALOG).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_CATALOG[slug];

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Blue Stars Admissions Consulting`,
    description: service.subtitle,
    openGraph: {
      title: `${service.title} | Blue Stars Admissions Consulting`,
      description: service.subtitle,
    },
  };
}

function BlueCircleCheck({ className = "w-5 h-5 flex-shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#0B63B5" />
      <path
        d="M6 10.2L8.7 12.8L14 7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_CATALOG[slug];

  if (!service) {
    notFound();
  }

  // Render the dedicated custom view with all local images & Framer Motion / GSAP animations
  if (slug === "college-admissions-consulting") {
    return <CollegeAdmissionsConsultingView service={service} />;
  }

  // Render the dedicated custom view for College Planning with 4 images & Framer Motion / GSAP animations
  if (slug === "college-planning") {
    return <CollegePlanningView service={service} />;
  }

  // Render the dedicated custom view for Essay Guidance with images & Framer Motion / GSAP animations
  if (slug === "essay-guidance") {
    return <EssayGuidanceView service={service} />;
  }

  // Render the dedicated custom view for Research & Internships with images & Framer Motion / GSAP animations
  if (slug === "research-internships") {
    return <ResearchInternshipsView service={service} />;
  }

  const isBlue = service.accent === "blue";

  return (
    <div className="w-full bg-white">
      {/* 1. Short, Compact Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Our Services", href: "/services" },
          { label: service.title },
        ]}
        badge={service.badge}
        title={service.title}
        description={service.subtitle}
      />

      {/* 2. Overview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* Left: Rich Overview Narrative */}
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  OVERVIEW &amp; APPROACH
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-4">
                {service.overview.heading}
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4">
                {service.overview.intro}
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-8">
                {service.overview.paragraph2}
              </p>

              {/* Key Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-brand-border/60">
                {service.overview.keyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 sm:p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] text-center"
                  >
                    <div className="text-lg sm:text-2xl font-extrabold text-brand-blue font-heading tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-brand-navy font-heading mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Modern Elevated Program Card */}
            <div className="relative bg-gradient-to-br from-[#f8fbfe] to-white rounded-[5px] border border-[#e2eef9] shadow-[0_14px_38px_rgba(10,61,107,0.07)] p-6 sm:p-8 overflow-hidden">
              {/* Corner Petal Accent */}
              <svg
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M100 0H28C28 39.76 60.24 72 100 72V0Z"
                  fill={isBlue ? "#d8edfd" : "#daf5e5"}
                  opacity="0.8"
                />
              </svg>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3F1FC] text-brand-blue text-xs font-bold font-heading mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Program Profile</span>
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading tracking-tight mb-6">
                  Who This Service Is For
                </h3>

                <ul className="space-y-3 mb-8">
                  {service.overview.targetAudience.map((audience) => (
                    <li key={audience} className="flex items-start gap-3">
                      <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-[15px] sm:text-[16px] text-brand-navy font-medium font-sans leading-snug">
                        {audience}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Service Pillars Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] border-y border-[#e2eef9] relative overflow-hidden">
        {/* Background Organic Waves */}
        <div
          className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/70 to-transparent rounded-br-[220px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                CORE PILLARS
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-4">
              What We Focus On During Your Program
            </h2>
          </div>

          {/* Pillar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
            {service.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="bg-white rounded-[5px] border border-[#e7f0f9] shadow-[0_10px_30px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_42px_rgba(10,61,107,0.12)] transition-all duration-300 hover:-translate-y-1.5 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Decorative Top-Right Corner Arc */}
                <svg
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M100 0H28C28 39.76 60.24 72 100 72V0Z"
                    fill={idx % 2 === 0 ? "#e2f2fd" : "#daf5e5"}
                    opacity="0.8"
                  />
                </svg>

                <div className="relative z-10">
                  {/* Icon Squircle Badge */}
                  <div
                    className={cn(
                      "w-[56px] h-[56px] rounded-[5px] grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-105 shadow-xs",
                      idx % 2 === 0 ? "bg-[#e5f1fc] text-brand-blue" : "bg-[#e2f7eb] text-[#2F9E5C]"
                    )}
                  >
                    {idx === 0 && <Compass className="w-6 h-6 stroke-[2.2]" />}
                    {idx === 1 && <Target className="w-6 h-6 stroke-[2.2]" />}
                    {idx === 2 && <Calendar className="w-6 h-6 stroke-[2.2]" />}
                    {idx === 3 && <Award className="w-6 h-6 stroke-[2.2]" />}
                  </div>

                  <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy mb-2.5 font-heading leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text font-sans mb-5">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#edf4fb]">
                    {pillar.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Consultation Highlight Card (If Defined for the Service) */}
      {service.consultationBanner && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[6px] bg-gradient-to-br from-[#07466f] via-[#0b63b5] to-[#0a3d6b] text-white p-7 sm:p-10 lg:p-12 overflow-hidden shadow-[0_16px_44px_rgba(10,61,107,0.16)]">
              {/* Background Glow Ribbons */}
              <div
                className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#9ed5ff] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{service.consultationBanner.kicker}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-3">
                    {service.consultationBanner.heading}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#e0effd] font-sans mb-6">
                    {service.consultationBanner.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {service.consultationBanner.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                        <span className="text-[14px] sm:text-[15px] text-white/95 font-sans leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-[6px] border border-white/20">
                  <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-white font-heading">
                      100% Free
                    </span>
                    <span className="block text-xs sm:text-[13px] text-[#bfe2fa] font-sans mt-0.5">
                      30-Minute Introductory Strategy Session
                    </span>
                  </div>

                  <Link
                    href={service.consultationBanner.ctaHref || "/#contact"}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[5px] font-bold text-xs sm:text-[14px] font-heading bg-white text-brand-navy hover:bg-[#f0f7fe] transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{service.consultationBanner.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-brand-navy" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Modern Feature Stories with Alternative Images (From Screenshots) */}
      {service.stories && service.stories.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-14 bg-[#f8fbfe] border-y border-[#e2eef9]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 lg:space-y-24">
            {service.stories.map((story, sIdx) => {
              const isImageLeft = story.imagePosition === "left";
              return (
                <div
                  key={story.title}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center",
                    isImageLeft ? "" : "lg:grid-flow-dense"
                  )}
                >
                  {/* Image Column */}
                  <div
                    className={cn(
                      "relative rounded-[6px] overflow-hidden border border-[#dce8f5] shadow-[0_12px_36px_rgba(10,61,107,0.08)] bg-white group",
                      isImageLeft ? "order-1" : "order-1 lg:order-2"
                    )}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={cn(
                      "flex flex-col justify-center",
                      isImageLeft ? "order-2" : "order-2 lg:order-1"
                    )}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                      <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                        {story.kicker}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[42px] mb-4">
                      {story.title}
                    </h2>

                    {story.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans mb-4"
                      >
                        {p}
                      </p>
                    ))}

                    {story.bullets && story.bullets.length > 0 && (
                      <ul className="space-y-2.5 mb-6 mt-2">
                        {story.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5">
                            <BlueCircleCheck className="w-4 h-4 flex-shrink-0 mt-1" />
                            <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-2">
                      <Link
                        href={story.ctaHref || "/#contact"}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[5px] font-bold text-xs sm:text-[13.5px] font-heading bg-brand-blue text-white hover:bg-brand-navy transition-all duration-200 shadow-xs hover:shadow-sm"
                      >
                        <span>{story.ctaText || "Learn More"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Specialized Scope of Services (If Defined) */}
      {service.specializedService && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[6px] bg-[#f8fbfe] border border-[#e2eef9] p-7 sm:p-10 lg:p-12 shadow-[0_10px_30px_rgba(10,61,107,0.05)]">
              <div className="max-w-3xl mb-8">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                    {service.specializedService.kicker}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-3">
                  {service.specializedService.title}
                </h2>

                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans">
                  {service.specializedService.description}
                </p>
              </div>

              {/* Service Bullets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {service.specializedService.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 p-4 rounded-[5px] bg-white border border-[#e7f0f9]"
                  >
                    <BlueCircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[14.5px] sm:text-[15.5px] text-brand-navy font-medium font-sans leading-snug">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tags and CTA Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-6 border-t border-[#e2eef9]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mr-1">
                    Specializations:
                  </span>
                  {service.specializedService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-[5px] bg-[#e6f2fc] text-brand-blue font-bold text-xs font-heading border border-[#d1e6f9]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={service.specializedService.ctaHref || "/#contact"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] text-xs sm:text-[13px] font-bold text-white bg-brand-blue hover:bg-brand-navy transition-all duration-200 font-heading shadow-xs self-start sm:self-auto"
                >
                  <span>{service.specializedService.ctaText || "Explore Scope"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Dedicated Service Testimonials (If Defined) */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-[#f4f9fd] border-y border-[#e2eef9]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  STUDENT &amp; PARENT SUCCESS
                </span>
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px]">
                What Families Say About Blue Stars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {service.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[6px] border border-[#e5f0fa] p-7 sm:p-8 shadow-[0_10px_32px_rgba(10,61,107,0.06)] flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300"
                >
                  <Quote className="w-8 h-8 text-[#b9dbf7] mb-3" />

                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 mb-3 text-[#f59e0b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-[#edf4fb] flex items-center justify-between">
                    <div>
                      <h4 className="text-[16px] font-bold text-brand-navy font-heading">
                        {t.author}
                      </h4>
                      <p className="text-xs text-brand-blue font-semibold font-heading mt-0.5">
                        {t.role}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#eef7ee] text-[#2F9E5C] text-[11px] font-bold font-heading">
                      Verified Admit
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Methodology & Step-by-Step Flow */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                OUR METHODOLOGY
              </span>
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
              How We Guide You Step-by-Step
            </h2>
          </div>

          {/* 4 Step Cards in Clean Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7">
            {service.methodology.map((step) => (
              <div
                key={step.stepNumber}
                className="relative rounded-[5px] bg-[#f8fbfe] border border-[#e2eef9] p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xs hover:shadow-card group"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-extrabold text-sm font-heading grid place-items-center mb-4 shadow-sm">
                    {step.stepNumber}
                  </div>

                  <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy font-heading mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] text-brand-text leading-[22px] sm:leading-[24px] font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Key Deliverables Checklist Section */}
      <section className="py-12 sm:py-16 bg-[#f5f9fd] border-y border-[#e2eef9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[6px] p-6 sm:p-10 border border-[#e2eef9] shadow-[0_12px_36px_rgba(10,61,107,0.06)]">
            <div className="max-w-2xl mb-8">
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading block mb-2">
                PROGRAM DELIVERABLES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[42px]">
                What&apos;s Included in Your Engagement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {service.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 p-4 rounded-[5px] bg-[#f8fbfe] border border-[#e8f2fc]"
                >
                  <BlueCircleCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[15px] sm:text-[16px] font-semibold text-brand-navy font-heading">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Service-Specific Interactive FAQ Section */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-14 items-start">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:!leading-[45px] mb-4">
                Questions About {service.title}
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text font-sans max-w-md">
                Have more questions about our methodology, pricing, or admissions timelines? Speak directly with our senior counseling team.
              </p>

              <div className="mt-6">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy font-heading transition-colors"
                >
                  <span>Need custom guidance? Contact our team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Accordion */}
            <div>
              <ServiceFAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Resources to Help Teens & Families (Blog, Videos, Live Webinars) */}
      <ServiceResourcesBanner />

      {/* 12. Modern Elevated CTA Banner Card */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-4">
          <div className="relative rounded-[5px] bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white shadow-[0_20px_50px_rgba(10,61,107,0.18)] border border-[#2072a7]/40 overflow-hidden">
            {/* Luminous Flowing Wave Ribbons in Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
              <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#0096c7]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 right-1/3 w-96 h-60 bg-[#00b4d8]/20 rounded-full blur-3xl" />

              <svg
                className="absolute -bottom-6 left-0 w-[500px] h-[180px] text-[#00b4d8] opacity-20 blur-xs"
                viewBox="0 0 500 180"
                fill="none"
              >
                <path d="M0 100 C 130 160, 280 40, 500 120 L 500 180 L 0 180 Z" fill="currentColor" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center relative z-10">
              {/* Left Column: Text, Highlights & Action Button */}
              <div className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col items-start text-left">
                {/* Glowing Pill Kicker */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-[#0d4f7c]/80 border border-[#2597e0]/50 text-[#79c3f7] text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase font-heading mb-3 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-[5px] bg-[#38bdf8] animate-pulse" aria-hidden="true" />
                  <span>READY TO TAKE THE NEXT STEP?</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-extrabold text-white mb-3 font-heading tracking-tight leading-[32px] sm:leading-[38px] lg:leading-[44px]">
                  Make College Admissions Less Stressful and More Successful
                </h2>

                {/* Description */}
                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[#d4e8f8] mb-6 max-w-xl font-sans">
                  Schedule a complimentary 30-minute introductory consultation with our senior advisory team to map your student&apos;s personalized roadmap.
                </p>

                {/* Modern Trust Badges */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-xs sm:text-[13.5px] text-[#bfe2fa] font-medium font-sans">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>Free 30-Min Discovery</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3bd386] flex-shrink-0" />
                    <span>Whole-Student Mentorship</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                    <span>No Obligation</span>
                  </span>
                </div>

                {/* Primary Action Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-[5px] bg-white hover:bg-[#f0f7fe] text-[#0A3D6B] font-bold text-xs sm:text-[15px] font-heading shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#0A3D6B] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Right Column: Student Cutout & Glowing Brand Stars */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-full min-h-[250px] lg:min-h-[300px] w-full flex items-end justify-center lg:justify-end overflow-hidden lg:overflow-visible">
                {/* Radial Glow */}
                <div
                  className="absolute right-[12%] top-[18%] w-[260px] h-[260px] bg-[#229ae3]/25 rounded-full blur-3xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Cyan 4-Point Brand Star */}
                <div
                  className="absolute right-[28%] sm:right-[30%] lg:right-[26%] top-[26%] w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] lg:w-[94px] lg:h-[94px] text-[#2ba3ea] opacity-85 pointer-events-none drop-shadow-[0_4px_16px_rgba(43,163,234,0.4)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Mint Green 4-Point Brand Star */}
                <div
                  className="absolute right-[3%] sm:right-[5%] lg:right-[1%] top-[8%] w-[110px] h-[110px] sm:w-[126px] sm:h-[126px] lg:w-[136px] lg:h-[136px] text-[#3bd386] opacity-95 pointer-events-none drop-shadow-[0_6px_20px_rgba(59,211,134,0.45)] z-0"
                  aria-hidden="true"
                >
                  <BrandStar className="w-full h-full fill-current" />
                </div>

                {/* Student Cutout Image */}
                <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] xl:w-[335px] h-[240px] sm:h-[280px] lg:h-[295px] z-10 flex-shrink-0">
                  <Image
                    src="/images/sub_images/ready_to_take.png"
                    alt="Student smiling with phone and backpack, ready for college success"
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                    className="object-contain object-bottom select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
