"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Send,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Globe2,
  GraduationCap,
  ArrowDown,
  Check,
  Video,
  ExternalLink,
  MessageSquare,
  Compass,
} from "lucide-react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { BrandStar } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Bay Area Counties highlighted in the screenshot
const BAY_AREA_COUNTIES = [
  "Santa Clara County",
  "San Mateo County",
  "Alameda County",
  "Marin County",
  "San Francisco County",
  "Contra Costa County",
  "Santa Cruz County",
];

// Available time slots for consultation
const TIME_SLOTS = [
  "09:30 AM PST",
  "11:00 AM PST",
  "01:30 PM PST",
  "03:00 PM PST",
  "04:30 PM PST",
  "06:00 PM PST",
];

const INTEREST_OPTIONS = [
  "College Admissions Consulting",
  "Art Admissions Consulting",
  "Comprehensive 8th–11th Grade Planning",
  "Application & Essay Strategy",
  "Transfer Student Advising",
  "Scholarships & Financial Aid",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ContactPage() {
  // Calendar state - Initialized with real current date
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [viewYear, setViewYear] = useState<number>(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM PST");
  const [meetingType, setMeetingType] = useState<"video" | "phone">("video");
  const [bookingStep, setBookingStep] = useState<"calendar" | "details" | "confirmed">("calendar");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");

  // Sync with user's local real time on client mount
  React.useEffect(() => {
    const now = new Date();
    setCurrentDate(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedDate(now);
  }, []);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Contact Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    gradYear: "",
    hearAbout: "",
    interests: [] as string[],
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Dynamic calendar calculations
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
  // Monday is column 0 (Sunday is 0 in JS Date)
  const startingOffset = (firstDayIndex + 6) % 7;
  const monthDisplay = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

  // Calendar handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleResetToToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedDate(now);
  };

  const handleDaySelect = (day: number) => {
    const chosen = new Date(viewYear, viewMonth, day);
    setSelectedDate(chosen);
  };

  const isToday = (day: number) => {
    return (
      currentDate.getFullYear() === viewYear &&
      currentDate.getMonth() === viewMonth &&
      currentDate.getDate() === day
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  const formattedSelectedDateFull = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;
    setBookingStep("confirmed");
  };

  // Newsletter handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 700);
  };

  // Contact Form handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSuccess(true);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        gradYear: "",
        hearAbout: "",
        interests: [],
        message: "",
      });
    }, 800);
  };

  return (
    <div className="w-full bg-white text-brand-text font-sans">
      {/* 1. Breadcrumb Hero */}
      <BreadcrumbHero
        breadcrumbs={[
          { label: "Contact Us" },
        ]}
        badge="GET IN TOUCH"
        title="Thank You for Your Interest in BlueStars!"
        description="Whether you're looking for multi-year high school planning, art admissions advisory, or senior application strategy, our team is ready to support your family."
        variant="dark"
      />

      {/* 2. Hero Content Section: Bay Area Focus & Celebratory Student */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f8fbfe] via-white to-[#f4f9fd] overflow-hidden">
        {/* Soft Background Radial Light */}
        <div
          className="absolute -top-24 right-0 w-[500px] h-[500px] bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content: Description & County Pills */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-sky border border-[#bce0fd] text-brand-navy text-xs font-bold uppercase tracking-wider font-heading">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>San Francisco Bay Area & Worldwide</span>
              </div>

              <h2 className="text-[26px] sm:text-[34px] lg:text-[40px] font-heading font-extrabold text-brand-navy leading-[34px] sm:leading-[42px] lg:leading-[48px]">
                Personalized Guidance for Local Families & Global Students
              </h2>

              <p className="text-[16px] sm:text-[17px] text-brand-text leading-[26px] sm:leading-[28px]">
                We are a <strong>Bay Area consultancy</strong> primarily working with students in{" "}
                <span className="text-brand-navy font-semibold">
                  Santa Clara, San Mateo, Alameda, Marin, San Francisco, Contra Costa, and Santa Cruz counties.
                </span>
              </p>

              <p className="text-[15px] sm:text-[16px] text-brand-text leading-[24px] sm:leading-[26px]">
                We also regularly guide ambitious students from all over the United States and internationally –
                including the People&apos;s Republic of China, Europe, and the country of Georgia! No matter where
                your family is located, our Socratic approach delivers focused, calm, and transformative mentorship.
              </p>

              {/* Bay Area Counties Tag Cloud */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-navy/70 mb-3 font-heading">
                  Primary Bay Area Service Counties:
                </div>
                <div className="flex flex-wrap gap-2">
                  {BAY_AREA_COUNTIES.map((county) => (
                    <span
                      key={county}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-brand-border text-xs sm:text-[13px] font-medium text-brand-navy shadow-xs hover:border-brand-blue/60 transition-colors"
                    >
                      <MapPin className="w-3 h-3 text-brand-blue flex-shrink-0" />
                      {county}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#e3f5ea] border border-[#a3e4be] text-xs sm:text-[13px] font-semibold text-[#1e7a43]">
                    <Globe2 className="w-3 h-3 text-[#2F9E5C] flex-shrink-0" />
                    + Nationwide & International Online
                  </span>
                </div>
              </div>

              {/* Jump to Options Button */}
              <div className="pt-4 flex items-center gap-4">
                <a
                  href="#options"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[6px] text-[14px] sm:text-[15px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>Choose an Option Below</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                </a>
                <span className="text-xs sm:text-sm text-brand-text/80 hidden sm:inline">
                  Schedule meeting or submit inquiry
                </span>
              </div>
            </div>

            {/* Right Visual: Joyful Student with Acceptance Letter / Laptop */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-[#073d63] to-[#2ba3ea]/20">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                  alt="Student celebrating college acceptance with laptop"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />

                {/* Floating Glassmorphic Badge 1: Admissions Record */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-sky flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-navy font-heading">
                        98% Top-Choice Acceptance Rate
                      </div>
                      <div className="text-[11.5px] text-brand-text">
                        Stanford, Ivy League, UCs, and Premier Liberal Arts Colleges
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Top Pill */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-brand-navy text-[11px] font-bold font-heading flex items-center gap-1.5">
                  <BrandStar className="w-3.5 h-3.5 text-brand-blue" />
                  <span>BlueStars The Calm Way</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bay Area Map & Direction Overview Section (Blue Banner from Screenshot) */}
      <section className="relative w-full py-12 sm:py-14 bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#2ba3ea]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Styled Map Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#063150] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00b4d8]" />
                    <span className="text-xs font-bold uppercase tracking-wider font-heading text-white">
                      San Francisco Bay Area Headquarters
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white/90">
                    Northern CA
                  </span>
                </div>

                {/* Styled Map Graphic / Visual */}
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-slate-900 border border-white/10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop"
                    alt="San Francisco Bay Area Bridge and Skyline"
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#073d63] via-transparent to-[#073d63]/40" />

                  {/* Pulsing Pin on San Francisco */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#00b4d8]/40 animate-ping absolute" />
                      <div className="w-4 h-4 rounded-full bg-[#00b4d8] border-2 border-white shadow-lg relative z-10" />
                    </div>
                    <span className="mt-1 px-2.5 py-0.5 rounded-full bg-white text-brand-navy font-heading font-extrabold text-[11px] shadow-md">
                      San Francisco & Silicon Valley
                    </span>
                  </div>

                  {/* Satellite / Online tag */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10.5px] text-white/80 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
                    <span>Lat: 37.7749° N, 122.4194° W</span>
                    <span className="text-[#64dfdf] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#64dfdf] inline-block animate-pulse" />
                      Active Consultations
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[12px] text-white/80 leading-relaxed text-center">
                  Direct virtual consultations available across Pacific, Mountain, Central, and Eastern US time zones.
                </div>
              </div>
            </div>

            {/* Right: Narrative Text from Screenshot */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-heading font-bold text-white leading-[30px] sm:leading-[36px] lg:leading-[40px]">
                We look forward to answering all your questions and guiding your student on a road to admissions success.
              </h2>

              <p className="text-[15px] sm:text-[16px] text-white/90 leading-[25px] sm:leading-[27px]">
                Choose from one of the options below to either <strong>schedule a meeting</strong> with us or to{" "}
                <strong>send us a general inquiry</strong>. We look forward to hearing from you.
              </p>

              <p className="text-[15px] sm:text-[16px] text-white/90 leading-[25px] sm:leading-[27px]">
                Be sure to also <strong>subscribe to the Blue Stars newsletter</strong> to get the latest college
                admission news, testing policy changes, and portfolio preparation tips directly in your inbox!
              </p>

              {/* Action Jump Pills */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#scheduler"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-brand-navy text-xs sm:text-[13px] font-bold font-heading border border-white/20 transition-all duration-200"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>1. Schedule a Meeting</span>
                </a>
                <a
                  href="#newsletter"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-brand-navy text-xs sm:text-[13px] font-bold font-heading border border-white/20 transition-all duration-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>2. Subscribe to Newsletter</span>
                </a>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-brand-navy text-xs sm:text-[13px] font-bold font-heading border border-white/20 transition-all duration-200"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>3. Send General Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Two-Column Action Layout: Schedule a Meeting (Left) & Newsletter + Form (Right) */}
      <section id="options" className="relative w-full py-14 sm:py-18 lg:py-22 bg-[#f8fbfe]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ================= LEFT COLUMN: SCHEDULE A MEETING ================= */}
            <div id="scheduler" className="lg:col-span-5 space-y-5">
              <div>
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-blue mb-1.5 font-heading">
                  OPTION 1 • DIRECT CONSULTATION
                </div>
                <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-heading font-bold text-brand-navy leading-[32px] sm:leading-[38px] lg:leading-[40px]">
                  Schedule a Meeting
                </h2>
                <p className="text-[14.5px] sm:text-[15.5px] text-brand-text leading-[24px] sm:leading-[25px] mt-2">
                  Want to learn more about our services? Choose an introductory session below to schedule a phone or
                  video interview.
                </p>
              </div>

              {/* Interactive Calendar Widget Card (Deep Navy / Teal styled after screenshot) */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#0d5584] bg-gradient-to-b from-[#07466F] to-[#053250] text-white p-5 sm:p-7 relative">
                {/* Header of Calendar Widget */}
                <div className="text-center pb-5 border-b border-white/15">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-2 border border-white/20">
                    <BrandStar className="w-5 h-5 text-[#64dfdf]" />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-heading font-bold text-white tracking-tight">
                    Initial Consultation
                  </h3>
                  <div className="text-xs text-[#a0cbe6] font-medium mt-0.5">
                    BlueStars Admissions Consulting • 45 Min Strategy
                  </div>
                </div>

                {bookingStep === "calendar" && (
                  <div className="pt-4 space-y-4">
                    {/* Month Selector Bar */}
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        aria-label="Previous Month"
                        className="p-1.5 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm sm:text-base tracking-wide text-white">
                          {monthDisplay}
                        </span>
                        <button
                          type="button"
                          onClick={handleResetToToday}
                          title="Jump to current date"
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-[#a0cbe6] hover:text-white font-semibold transition-colors cursor-pointer"
                        >
                          Today
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        aria-label="Next Month"
                        className="p-1.5 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day-of-week headers */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#89b8d9] uppercase tracking-wider py-1">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>

                    {/* Calendar Day Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {/* Empty padding slots before first day */}
                      {Array.from({ length: startingOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-9 sm:h-10" />
                      ))}

                      {/* Day numbers - Fully selectable on user choice */}
                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const selected = isSelected(dayNum);
                        const todayMatch = isToday(dayNum);

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => handleDaySelect(dayNum)}
                            className={cn(
                              "relative h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition-all duration-150 select-none cursor-pointer",
                              selected
                                ? "bg-white text-brand-navy shadow-lg font-bold scale-105 ring-2 ring-[#00b4d8]"
                                : todayMatch
                                ? "bg-white/20 text-white font-bold ring-1 ring-[#64dfdf] hover:bg-white/30"
                                : "text-white/90 hover:bg-white/15"
                            )}
                          >
                            <span>{dayNum}</span>
                            {todayMatch && (
                              <span
                                className={cn(
                                  "w-1 h-1 rounded-full absolute bottom-1",
                                  selected ? "bg-brand-blue" : "bg-[#64dfdf]"
                                )}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots Selection */}
                    <div className="pt-3 border-t border-white/15 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#a0cbe6] gap-1">
                        <div className="font-heading font-semibold text-white flex items-center gap-1.5 flex-wrap">
                          <span>Selected:</span>
                          <span className="text-[#64dfdf] font-bold">
                            {formattedSelectedDateFull}
                          </span>
                          {selectedDate.getFullYear() === currentDate.getFullYear() &&
                            selectedDate.getMonth() === currentDate.getMonth() &&
                            selectedDate.getDate() === currentDate.getDate() && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#2F9E5C]/30 text-[#86efac] rounded border border-[#2F9E5C]/40">
                                Today
                              </span>
                            )}
                        </div>
                        <span className="text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#64dfdf]" />
                          PST (GMT-7)
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "py-1.5 px-1 rounded-md text-[11px] sm:text-xs font-semibold border transition-all text-center cursor-pointer",
                              selectedTime === slot
                                ? "bg-[#00b4d8] text-white border-[#00b4d8] shadow-sm font-bold"
                                : "bg-white/5 border-white/15 text-white/80 hover:bg-white/10"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meeting Format Toggle */}
                    <div className="pt-2">
                      <div className="text-xs font-heading font-semibold text-white mb-1.5">
                        Select Session Format:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setMeetingType("video")}
                          className={cn(
                            "flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer",
                            meetingType === "video"
                              ? "bg-white text-brand-navy border-white shadow-xs"
                              : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
                          )}
                        >
                          <Video className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Video (Zoom)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeetingType("phone")}
                          className={cn(
                            "flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer",
                            meetingType === "phone"
                              ? "bg-white text-brand-navy border-white shadow-xs"
                              : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
                          )}
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Phone Call</span>
                        </button>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button
                      type="button"
                      onClick={() => setBookingStep("details")}
                      className="w-full mt-3 py-3 rounded-lg font-heading font-bold text-sm text-brand-navy bg-white hover:bg-[#e8f3fc] shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Student Info</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2: Details */}
                {bookingStep === "details" && (
                  <form onSubmit={handleBookingSubmit} className="pt-4 space-y-3.5">
                    <div className="p-3 rounded-lg bg-white/10 border border-white/15 text-xs text-white/90">
                      <div className="font-heading font-bold text-white mb-0.5">
                        {formattedSelectedDateFull} at {selectedTime}
                      </div>
                      <div className="text-[11px] text-[#a0cbe6]">
                        Format: {meetingType === "video" ? "Zoom Video Conference" : "Direct Phone Call"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-white mb-1">
                        Parent or Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Sarah Miller"
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-white mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold text-white mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="(415) 000-0000"
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setBookingStep("calendar")}
                        className="px-3 py-2 rounded-lg border border-white/20 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-lg font-heading font-bold text-xs sm:text-sm text-brand-navy bg-white hover:bg-[#e8f3fc] shadow-md transition-all text-center cursor-pointer"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Confirmed */}
                {bookingStep === "confirmed" && (
                  <div className="pt-6 pb-4 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-heading font-bold text-white">
                      Consultation Confirmed!
                    </h4>
                    <p className="text-xs text-[#a0cbe6] max-w-xs mx-auto leading-relaxed">
                      Thank you, {bookingName}. We have scheduled your 45-minute consultation for{" "}
                      <strong>{formattedSelectedDateFull} at {selectedTime}</strong>.
                      A calendar invite and link have been dispatched to <strong>{bookingEmail}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingStep("calendar");
                        setBookingName("");
                        setBookingEmail("");
                        setBookingPhone("");
                      }}
                      className="mt-3 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold cursor-pointer"
                    >
                      Book Another Time
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Phone / Immediate question callout card */}
              <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-sky flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="text-xs">
                  <span className="font-heading font-bold text-brand-navy block">
                    Prefer to speak right now?
                  </span>
                  <span className="text-brand-text">
                    Call our main office at{" "}
                    <a href="tel:4154202444" className="text-brand-blue font-bold hover:underline">
                      415-420-2444
                    </a>{" "}
                    (Mon–Fri 9am–6pm PST).
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: NEWSLETTER (TOP) + CONTACT FORM (BOTTOM) ================= */}
            <div className="lg:col-span-7 space-y-8">
              {/* --- 4A. SUBSCRIBE TO OUR NEWSLETTER --- */}
              <div
                id="newsletter"
                className="rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-[#f3f9ff] via-white to-[#edf6fd] border border-[#bce0fd] shadow-sm relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading mb-1">
                      OPTION 2 • ADMISSIONS INTELLIGENCE
                    </div>
                    <h2 className="text-[20px] sm:text-[24px] font-heading font-bold text-brand-navy leading-[28px] sm:leading-[32px]">
                      Subscribe to Our Newsletter
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-sky flex items-center justify-center flex-shrink-0 border border-[#bce0fd]">
                    <Mail className="w-5 h-5 text-brand-blue" />
                  </div>
                </div>

                <p className="text-[14px] sm:text-[14.5px] text-brand-text leading-[22px] sm:leading-[24px] mb-4">
                  Get the latest college admission updates, Ivy League acceptance rate analyses, portfolio tips, and
                  invitations to Dr. Amy&apos;s exclusive webinars delivered right to your inbox.
                </p>

                {newsletterStatus === "success" ? (
                  <div className="p-3.5 rounded-xl bg-[#e3f5ea] border border-[#a3e4be] text-xs sm:text-sm text-[#1e7a43] flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] flex-shrink-0" />
                    <span>
                      <strong>Thank you for subscribing!</strong> Check your email for our College Admissions Starter
                      Guide.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-1 px-4 py-3 rounded-[6px] border border-brand-border bg-white text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === "submitting"}
                      className="px-6 py-3 rounded-[6px] text-xs sm:text-sm font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-sm transition-all duration-200 flex-shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {newsletterStatus === "submitting" ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>SUBSCRIBE TO NEWSLETTER</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* --- 4B. CONTACT FORM --- */}
              <div
                id="inquiry"
                className="rounded-2xl p-6 sm:p-8 bg-white border border-brand-border shadow-md space-y-6"
              >
                <div>
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading mb-1">
                    OPTION 3 • GENERAL INQUIRY
                  </div>
                  <h2 className="text-[24px] sm:text-[28px] font-heading font-bold text-brand-navy leading-[32px] sm:leading-[36px]">
                    Contact Us
                  </h2>
                  <p className="text-[14.5px] sm:text-[15px] text-brand-text leading-[23px] sm:leading-[24px] mt-1.5">
                    If you have a general question or comment, fill out the form below and we will get back to you as
                    soon as possible.
                  </p>
                </div>

                {formSuccess ? (
                  <div className="p-6 rounded-2xl bg-[#e3f5ea] border border-[#a3e4be] text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#2F9E5C] text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-[#1e7a43]">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#276e43] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting BlueStars Admissions Consulting. A member of our counseling advisory
                      team will review your inquiry and follow up within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSuccess(false)}
                      className="mt-2 px-5 py-2 rounded-lg bg-brand-navy text-white text-xs font-bold font-heading hover:bg-brand-blue transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
                    {/* 1. Email * */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    {/* 2. First Name & Last Name (2 Cols) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                          First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. Jessica"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                          Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Henderson"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* 3. Role / I am a... (Dropdown from screenshot) */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                        Role <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Please Select</option>
                          <option value="Parent">Parent / Guardian</option>
                          <option value="Student">High School Student</option>
                          <option value="Counselor">School Counselor / College Advisor</option>
                          <option value="Educator">Teacher / Academic Mentor</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-brand-text/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* 4. Student's High School Graduation Year (Dropdown from screenshot) */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                        Student&apos;s High School Graduation Year
                      </label>
                      <div className="relative">
                        <select
                          name="gradYear"
                          value={formData.gradYear}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Please Select</option>
                          <option value="2025">Class of 2025 (12th Grade / Senior)</option>
                          <option value="2026">Class of 2026 (11th Grade / Junior)</option>
                          <option value="2027">Class of 2027 (10th Grade / Sophomore)</option>
                          <option value="2028">Class of 2028 (9th Grade / Freshman)</option>
                          <option value="2029">Class of 2029 (8th Grade)</option>
                          <option value="2030+">Class of 2030 or Younger</option>
                          <option value="College Transfer">College Transfer / Postgraduate</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-brand-text/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* 5. How did you hear about us? (Dropdown from screenshot) */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                        How did you hear about us?
                      </label>
                      <div className="relative">
                        <select
                          name="hearAbout"
                          value={formData.hearAbout}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Please Select</option>
                          <option value="Word of Mouth">Word of Mouth / Friend Recommendation</option>
                          <option value="Former Client">Current or Former BlueStars Family</option>
                          <option value="School Counselor">High School Counselor</option>
                          <option value="Google">Google / Online Search</option>
                          <option value="Social Media">Social Media (LinkedIn, Instagram, YouTube)</option>
                          <option value="Webinar">College Fair / Webinar Event</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-brand-text/60 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* 6. What are you primarily interested in? (Checkboxes from screenshot) */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-brand-navy mb-2">
                        What are you primarily interested in?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {INTEREST_OPTIONS.map((item) => {
                          const isChecked = formData.interests.includes(item);
                          return (
                            <label
                              key={item}
                              onClick={() => handleInterestToggle(item)}
                              className={cn(
                                "flex items-start gap-2.5 p-2.5 rounded-lg border text-xs sm:text-[12.5px] cursor-pointer transition-all select-none",
                                isChecked
                                  ? "bg-brand-sky/60 border-brand-blue text-brand-navy font-semibold"
                                  : "bg-[#f8fbfe] border-brand-border/80 text-brand-text hover:border-brand-blue/50"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-4 h-4 rounded border mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors",
                                  isChecked
                                    ? "bg-brand-blue border-brand-blue text-white"
                                    : "border-brand-border bg-white"
                                )}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="leading-tight">{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* 7. Message */}
                    <div>
                      <label className="block text-xs font-heading font-bold text-brand-navy mb-1.5">
                        Message / Questions
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your student's background, current academic goals, target universities, or any specific questions..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-border bg-[#f8fbfe] text-xs sm:text-sm text-brand-navy placeholder:text-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all resize-y"
                      />
                    </div>

                    {/* 8. ReCAPTCHA Mock Badge (Matching Screenshot) */}
                    <div className="p-2.5 rounded-md bg-[#f8fbfe] border border-brand-border flex items-center justify-between text-[11px] text-brand-text/75">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-blue" />
                        <span>Protected by reCAPTCHA</span>
                      </div>
                      <div className="text-[10px] space-x-1.5">
                        <span className="underline hover:text-brand-navy cursor-pointer">Privacy</span>
                        <span>•</span>
                        <span className="underline hover:text-brand-navy cursor-pointer">Terms</span>
                      </div>
                    </div>

                    {/* 9. Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full py-3.5 px-6 rounded-[6px] text-sm font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {formSubmitting ? (
                          <span>Sending Inquiry...</span>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-center text-brand-text/70 mt-2">
                        We respect your privacy. Your information is never sold or shared with outside parties.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct Reach Quick Cards */}
      <section className="relative w-full py-12 sm:py-16 bg-white border-t border-brand-border/60">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-blue font-heading mb-1.5">
              WAYS TO CONNECT
            </div>
            <h2 className="text-[24px] sm:text-[30px] font-heading font-bold text-brand-navy leading-[32px] sm:leading-[38px]">
              Direct Contact Information
            </h2>
            <p className="text-sm text-brand-text mt-2">
              Our counseling team is always accessible to support parents, teens, and educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-brand-border hover:border-brand-blue/50 hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center mx-auto mb-3.5 text-brand-blue">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-base mb-1">
                Telephone & Direct Call
              </h3>
              <p className="text-xs text-brand-text mb-3">
                Available Monday – Friday, 9:00 AM – 6:00 PM PST
              </p>
              <a
                href="tel:4154202444"
                className="inline-block text-brand-blue font-heading font-bold text-sm sm:text-base hover:underline"
              >
                (415) 420-2444
              </a>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-brand-border hover:border-brand-blue/50 hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center mx-auto mb-3.5 text-brand-blue">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-base mb-1">
                Email Advisory
              </h3>
              <p className="text-xs text-brand-text mb-3">
                Send us inquiries, high school transcripts, or questions.
              </p>
              <a
                href="mailto:info@bluestars.us"
                className="inline-block text-brand-blue font-heading font-bold text-sm sm:text-base hover:underline"
              >
                info@bluestars.us
              </a>
            </div>

            {/* Location */}
            <div className="p-6 rounded-2xl bg-[#f8fbfe] border border-brand-border hover:border-brand-blue/50 hover:shadow-md transition-all text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center mx-auto mb-3.5 text-brand-blue">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-brand-navy text-base mb-1">
                San Francisco Bay Area Hub
              </h3>
              <p className="text-xs text-brand-text mb-2">
                Serving all 7 Bay Area counties, across the US & worldwide online.
              </p>
              <span className="inline-block text-brand-navy font-heading font-semibold text-xs sm:text-sm">
                San Francisco, CA 94104
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Modern CTA Banner (Matching project gradient from CTA.tsx & Services) */}
      <section className="mb-8 relative w-full bg-gradient-to-r from-[#073d63] via-[#094c79] to-[#0c5989] text-white py-14 sm:py-16 overflow-hidden">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-1/4 w-96 h-40 bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-32 bg-[#2ba3ea]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
            <BrandStar className="w-3.5 h-3.5 text-[#00b4d8]" />
            <span>Start Early. Succeed Confidently.</span>
          </div>

          <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] font-heading font-extrabold text-white leading-[32px] sm:leading-[40px] lg:leading-[46px] max-w-2xl mx-auto">
            Make the admission consulting process less stressful and more successful.
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mt-3 leading-relaxed">
            Find out how our calm, Socratic methodology unlocks your student&apos;s true potential.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#scheduler"
              className="w-full sm:w-auto px-7 py-3.5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-md hover:shadow-lg transition-all duration-200"
            >
              Book Initial Consultation
            </a>
            <a
              href="tel:4154202444"
              className="w-full sm:w-auto px-7 py-3.5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-white/10 hover:bg-white hover:text-brand-navy border border-white/30 transition-all duration-200"
            >
              Call (415) 420-2444
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
