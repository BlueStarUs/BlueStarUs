import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  UniversityCampusIcon,
  ServiceDocIcon,
  ServicePencilIcon,
  ServiceCoinsIcon,
  ServiceCompassIcon,
  ServicePaletteIcon,
} from "@/components/ui/Icons";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  cornerColor: string;
  linkHref: string;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "college-admissions-consulting",
    title: "College Admissions\nConsulting",
    description: "Individually tailored advising, coaching, and mentoring to ignite curiosity and build authentic applications.",
    icon: ServiceCompassIcon,
    iconBg: "bg-[#e5f1fc]",
    cornerColor: "#dbeefc",
    linkHref: "/services/college-admissions-consulting",
  },
  {
    id: "art-admissions-consulting",
    title: "Art Admissions\nConsulting",
    description: "Build a stunning art portfolio and create a captivating artist statement for top art & design programs.",
    icon: ServicePaletteIcon,
    iconBg: "bg-[#e2f7eb]",
    cornerColor: "#e0f6ea",
    linkHref: "/services/art-admissions-consulting",
  },
  {
    id: "college-planning",
    title: "College & University\nPlanning",
    description: "Find the right colleges that match your goals, interests and profile.",
    icon: UniversityCampusIcon,
    iconBg: "bg-[#e2f7eb]",
    cornerColor: "#e0f6ea",
    linkHref: "/services/college-planning",
  },
  {
    id: "application-strategy",
    title: "Application Strategy",
    description: "Build a strong application with the right strategy and timeline.",
    icon: ServiceDocIcon,
    iconBg: "bg-[#e5f1fc]",
    cornerColor: "#dbeefc",
    linkHref: "/services/application-strategy",
  },
  {
    id: "essay-guidance",
    title: "Essay & Personal\nStatement Guidance",
    description: "Tell your story effectively with expert feedback and support.",
    icon: ServicePencilIcon,
    iconBg: "bg-[#e5f1fc]",
    cornerColor: "#dbeefc",
    linkHref: "/services/essay-guidance",
  },
  {
    id: "scholarships",
    title: "Scholarship &\nFinancial Aid Guidance",
    description: "Explore funding opportunities and get guidance on financial aid.",
    icon: ServiceCoinsIcon,
    iconBg: "bg-[#eef9dc]",
    cornerColor: "#edf8dc",
    linkHref: "/services/scholarships",
  },
];

export interface ServicesProps {
  kicker?: string;
  title?: React.ReactNode;
  description?: string;
  showViewAllLink?: boolean;
  id?: string;
}

export function Services({
  kicker = "OUR SERVICES",
  title,
  description = "From choosing the right colleges to crafting a compelling application, we provide end-to-end guidance tailored to your unique goals.",
  showViewAllLink = true,
  id = "services",
}: ServicesProps = {}) {
  return (
    <section
      className="relative w-full py-12 sm:py-14 lg:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden"
      id={id}
    >
      {/* Decorative Organic Wave Shapes in Background (Matching reference) */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[360px] bg-gradient-to-bl from-[#e3f1fc]/80 via-[#edf6fd]/40 to-transparent rounded-bl-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[380px] h-[320px] bg-gradient-to-tr from-[#e5f2fc]/70 via-[#eef6fe]/30 to-transparent rounded-tr-[200px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Centered & Responsive */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
          {/* Centered Kicker */}
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <span className="w-6 sm:w-8 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading">
              {kicker}
            </span>
            <span className="w-6 sm:w-8 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
          </div>

          {/* Centered Main Title with Responsive Scaling */}
          <div className="relative inline-block mb-3.5">
            {title ? (
              title
            ) : (
              <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
                Comprehensive Support for{" "}
                <span className="text-brand-blue relative inline-block">
                  Your College Journey
                  {/* Centered Curved Arc Highlight Underneath Title */}
                  <span className="absolute -bottom-2 left-0 right-0 flex justify-center pointer-events-none">
                    <svg
                      className="w-44 sm:w-56 h-3 text-[#79bbf0] opacity-85"
                      viewBox="0 0 240 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 9.5C65 2.5 175 2.5 238 9.5"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h2>
            )}
          </div>

          {/* Centered Description */}
          {description && (
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text max-w-2xl font-sans mb-3 sm:mb-3.5 mt-1">
              {description}
            </p>
          )}

          {/* Centered View All Services Link */}
          {showViewAllLink && (
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-[13px] text-brand-blue hover:text-brand-navy transition-colors font-heading group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* 6 Cards Grid (Responsive 3-Column on Desktop, 2-Column on Tablet, 1-Column on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-7" id="planning">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-[5px] border border-[#e7f0f9] shadow-[0_10px_30px_rgba(10,61,107,0.06)] hover:shadow-[0_18px_42px_rgba(10,61,107,0.12)] transition-all duration-300 hover:-translate-y-1.5 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group min-h-[290px]"
              >
                {/* Top-Right Decorative Colored Corner Arc (Matching reference screenshot) */}
                <svg
                  className="absolute top-0 right-0 w-28 h-28 pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M100 0H28C28 39.76 60.24 72 100 72V0Z" fill={service.cornerColor} />
                </svg>

                {/* Card Content Top */}
                <div className="relative z-10">
                  {/* Icon Squircle Badge */}
                  <div
                    className={`w-[60px] h-[60px] rounded-[18px] ${service.iconBg} grid place-items-center mb-6 transition-transform duration-300 group-hover:scale-105 shadow-xs`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-brand-navy mb-2.5 font-heading leading-snug">
                    {service.title.split("\n").map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== service.title.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>

                  {/* Description */}
                  <p className="text-[14.5px] sm:text-[16px] leading-[23px] sm:leading-[26px] text-brand-text mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Pill Button: [ Learn More → ] (Matching reference) */}
                <div className="relative z-10 pt-2">
                  <Link
                    href={service.linkHref}
                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-[5px] text-[14.5px] sm:text-[15px] font-bold text-brand-blue bg-[#e4f1fc] hover:bg-brand-blue hover:text-white transition-all duration-200 font-heading shadow-xs group-hover:shadow-sm"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
