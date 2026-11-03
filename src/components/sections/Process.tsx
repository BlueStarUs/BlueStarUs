import React from "react";
import { Search, FileText, Settings, Send, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStepItem {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "blue" | "green";
}

const PROCESS_STEPS_DATA: ProcessStepItem[] = [
  {
    stepNumber: "01",
    title: "Discover",
    description: "Understand your goals, interests and strengths.",
    icon: Search,
    accent: "blue",
  },
  {
    stepNumber: "02",
    title: "Plan",
    description: "Create a personalized college list and strategy.",
    icon: FileText,
    accent: "green",
  },
  {
    stepNumber: "03",
    title: "Prepare",
    description: "Work on applications, essays and requirements.",
    icon: Settings,
    accent: "blue",
  },
  {
    stepNumber: "04",
    title: "Apply",
    description: "Submit strong applications with confidence.",
    icon: Send,
    accent: "green",
  },
];

export function Process() {
  return (
    <section
      className="relative w-full py-12 sm:py-14 lg:py-18 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden text-center"
      id="planning"
    >
      {/* Decorative Organic Wave Shapes in Background (Matching reference) */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] bg-gradient-to-br from-[#e3f1fc]/70 via-[#edf6fd]/30 to-transparent rounded-br-[220px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[320px] bg-gradient-to-tl from-[#e5f2fc]/70 via-[#eef6fe]/30 to-transparent rounded-tl-[200px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[240px] bg-gradient-to-tr from-[#e7f3fd]/50 to-transparent rounded-tr-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Centered & Responsive */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14 px-4">
          {/* Pill Kicker with flanking lines */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-12 h-[1.5px] bg-brand-blue/30 rounded-full" aria-hidden="true" />
            <span className="px-4 py-1 rounded-full bg-[#e3f1fc] text-brand-blue font-bold text-xs uppercase tracking-wider font-heading">
              OUR PROCESS
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-brand-blue/30 rounded-full" aria-hidden="true" />
          </div>

          {/* Main Title (Exact font hierarchy matching Services section) */}
          <div className="relative inline-block mb-3.5">
            <h2 className="text-2xl sm:text-[28px] md:text-[32px] lg:text-[35px] font-extrabold text-brand-navy font-heading tracking-tight leading-[32px] sm:leading-[36px] lg:leading-[42px]">
              A Clear Path to{" "}
              <span className="text-brand-blue relative inline-block">
                Your College Goals
                {/* Curved Arc Highlight Underneath "Your College Goals" */}
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
          </div>

          {/* Lead Description */}
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-brand-text max-w-2xl font-sans mt-1">
            We make the college admissions process simple and structured, so you always know what&apos;s next.
          </p>
        </div>

        {/* 4 Cards Flow with Connecting Chevrons (Responsive 1-col on mobile, 2x2 on tablet, 4-col with >> on desktop) */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-12 sm:gap-8 lg:gap-3 xl:gap-4">
          {PROCESS_STEPS_DATA.map((step, index) => {
            const Icon = step.icon;
            const isBlue = step.accent === "blue";
            const showChevron = index < PROCESS_STEPS_DATA.length - 1;

            return (
              <React.Fragment key={step.stepNumber}>
                {/* 3D Elevated Card Wrapper with Colored Base Plate */}
                <div className="relative group w-full transition-all duration-300 hover:-translate-y-2">
                  <div
                    className={cn(
                      "relative rounded-[26px] pb-[9px] transition-all duration-300",
                      isBlue
                        ? "bg-gradient-to-b from-[#4dbbfe] to-[#25a2f7] shadow-[0_14px_30px_-6px_rgba(37,162,247,0.38)] group-hover:shadow-[0_20px_36px_-6px_rgba(37,162,247,0.48)]"
                        : "bg-gradient-to-b from-[#4fd890] to-[#2bc574] shadow-[0_14px_30px_-6px_rgba(43,197,116,0.38)] group-hover:shadow-[0_20px_36px_-6px_rgba(43,197,116,0.48)]"
                    )}
                  >
                    {/* White Card Body */}
                    <div className="bg-white rounded-[23px] pt-12 sm:pt-14 pb-8 sm:pb-9 px-5 sm:px-6 flex flex-col items-center text-center relative overflow-visible w-full min-h-[204px] sm:min-h-[214px]">
                      {/* Top-Left Wave Ribbon with Step Number and 3D Fold Curl */}
                      <div className="absolute top-0 left-0 w-[84px] h-[64px] pointer-events-none z-10 overflow-hidden rounded-tl-[5px]">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 84 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id={`ribbon-grad-${step.stepNumber}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={isBlue ? "#0A83F2" : "#28CF76"}
                              />
                              <stop
                                offset="100%"
                                stopColor={isBlue ? "#0860B3" : "#1BA95A"}
                              />
                            </linearGradient>
                            <linearGradient
                              id={`curl-grad-${step.stepNumber}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#FFFFFF"
                                stopOpacity="0.85"
                              />
                              <stop
                                offset="100%"
                                stopColor="#FFFFFF"
                                stopOpacity="0.15"
                              />
                            </linearGradient>
                          </defs>

                          {/* Colored Ribbon Wave Body */}
                          <path
                            d="M0 0H52C60 0 65 6 62 14C56 26 42 34 26 44C12 52 4 58 0 64V0Z"
                            fill={`url(#ribbon-grad-${step.stepNumber})`}
                          />

                          {/* 3D Paper Fold / Ribbon Highlight Curl */}
                          <path
                            d="M52 0C60 6 62 14 54 22C44 32 30 40 18 48C8 54 2 58 0 62"
                            stroke={`url(#curl-grad-${step.stepNumber})`}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Bold White Step Number */}
                        <span className="absolute top-2.5 left-3.5 text-xs sm:text-[13px] font-extrabold text-white font-heading tracking-tight select-none">
                          {step.stepNumber}
                        </span>
                      </div>

                      {/* Notched Shoulder Scoop on the Right of the Circle */}
                      <svg
                        className="absolute -top-[1px] left-[calc(50%+33px)] w-4 h-4 pointer-events-none hidden sm:block"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 0C0 8.836 7.164 16 16 16L0 16V0Z"
                          fill="#f8fbfe"
                        />
                      </svg>

                      {/* Top-Center Floating Icon Disc (Overlapping the card top edge) */}
                      <div className="absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 z-20">
                        <div
                          className={cn(
                            "w-[70px] h-[70px] sm:w-[74px] sm:h-[74px] rounded-full border-[3.5px] border-white shadow-[0_6px_18px_rgba(10,61,107,0.12)] grid place-items-center transition-transform duration-300 group-hover:scale-105",
                            isBlue
                              ? "bg-gradient-to-b from-[#f0f7fe] via-[#dcf0fd] to-[#c7e5fb]"
                              : "bg-gradient-to-b from-[#f0fbf4] via-[#def7e6] to-[#c7f2d5]"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]",
                              isBlue ? "text-brand-blue" : "text-brand-navy",
                              step.stepNumber === "04" && "translate-x-0.5 -translate-y-0.5"
                            )}
                          />
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-[22px] sm:text-[24px] font-bold text-brand-navy font-heading mb-2.5 tracking-tight">
                        {step.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-[14.5px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-brand-text font-sans max-w-[220px] mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connecting >> Chevron for Desktop Viewports */}
                {showChevron && (
                  <div
                    className="hidden lg:flex items-center justify-center flex-shrink-0 px-0.5 xl:px-1 text-[#2A8FD6]"
                    aria-hidden="true"
                  >
                    <ChevronsRight className="w-7 h-7 stroke-[2.8]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
