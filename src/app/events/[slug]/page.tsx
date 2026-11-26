import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { WEBINARS_DATA, WebinarItem } from "@/lib/resources-data";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Quote,
  ShieldCheck,
  Users,
  GraduationCap,
  Scale,
  Compass,
} from "lucide-react";
import { CampusTourRegistrationForm } from "@/components/sections/CampusTourRegistrationForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WEBINARS_DATA.map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const webinar = WEBINARS_DATA.find((w) => w.slug === slug);

  if (!webinar) {
    return {
      title: "Event Not Found | Blue Stars Admissions Consulting",
    };
  }

  const ogImage = webinar.bannerImage || "/images/sub_images/live_Admissions_Webinars.png";

  return {
    title: `${webinar.title} | Blue Stars Admissions Consulting`,
    description: webinar.subtitle || webinar.description.slice(0, 160),
    alternates: {
      canonical: `https://bluestars.us/events/${webinar.slug}`,
    },
    openGraph: {
      title: `${webinar.title} | Blue Stars`,
      description: webinar.subtitle || webinar.description.slice(0, 160),
      url: `https://bluestars.us/events/${webinar.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: webinar.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: webinar.title,
      description: webinar.subtitle || webinar.description.slice(0, 160),
      images: [ogImage],
    },
  };
}

// Parent Testimonials from live landing pages
const SHARED_TESTIMONIALS = [
  {
    quote:
      "Forever grateful. My daughter would not be thriving without you. You alter lives. Make dreams come true. Thanks.",
    author: "Matt",
    role: "Dad of Rising Senior",
  },
  {
    quote:
      "Blue Stars provided a path to peace for my daughter's anxious mind about the entire college admission process and the fear of the future that we all have at that age.",
    author: "Pia",
    role: "Mom of Student at UCSD",
  },
  {
    quote:
      "They were the best mentors and treated my son as a real person not just a learning machine.",
    author: "Janet",
    role: "Mom of Son at Dartmouth",
  },
];

// Rich data for Estate Planning Event
const ESTATE_PLANNING_SPEAKERS = [
  {
    name: "Deidre Von Rock",
    role: "President, Von Rock Law",
    credentials: "Licensed Attorney, Real Estate Broker and Notary Public",
    image: "/images/events/deidre-von-rock.png",
    bio: "Deidre graduated with a Bachelor of Arts from San Diego State University and earned her Juris Doctorate from New England Law: Boston. In California, she is a licensed Attorney, Real Estate Broker and Notary Public. Deidre leads the Legal Team and Management Team of VRL. She has over 25 years experience in the firm practice areas and brings her dedication to family and community to every aspect of the practice.",
  },
  {
    name: "Dr. Amy Morgenstern",
    role: "Founder and CEO | Blue Stars Admissions Counseling",
    credentials: "Ph.D. in Philosophy • MFA in Contemporary Art",
    image: "/images/events/amy-square.jpg",
    bio: "Dr. Morgenstern leads a close-knit team of highly experienced coaches guiding students to their dream schools while focusing on teen personal growth. An award-winning writer, former professor of philosophy, and honors program associate director, she holds a Ph.D. in philosophy and an MFA in contemporary art. She is currently working on a book to help students get that 'extra edge' for applying to top colleges.",
  },
];

// Rich data for Campus Tours Event
const CAMPUS_TOURS_SPEAKERS = [
  {
    name: "Neel Narayan",
    role: "Founder, ember | Stanford University",
    credentials: "Senior • Computer Science & Computational Engineering",
    image: "/images/events/neel-narayan.png",
    bio: "Neel Narayan is a senior at Stanford University studying computer science and computational engineering and the founder of ember. He grew up in Houston, Texas and graduated high school in 2020. He is passionate about all things technical, with interests ranging from mental math to algorithmic design. On the side, he also enjoys public speaking and crosswords.",
  },
  {
    name: "Ayush Krishnamoorti",
    role: "Founder, ember | Stanford University",
    credentials: "Senior • Management Science & Engineering",
    image: "/images/events/ayush-krishnamoorti.png",
    bio: "Ayush Krishnamoorti is a senior at Stanford University studying Management Science and Engineering and the founder of ember. He is interested in everything energy and infrastructure, and his work reflects this, ranging from public transportation to electric vehicle coalitions. Ayush is originally from Houston, Texas, and has loved his time in California so far. He hopes to stay in the Bay Area for a long time after graduation.",
  },
  {
    name: "Dr. Amy Morgenstern",
    role: "Founder and CEO | Blue Stars Admissions Counseling",
    credentials: "Ph.D. in Philosophy • MFA in Contemporary Art",
    image: "/images/events/amy-square.jpg",
    bio: "Dr. Morgenstern leads a close-knit team of highly experienced coaches guiding students to their dream schools while focusing on teen personal growth. An award-winning writer, former professor of philosophy, and honors program associate director, she holds a Ph.D. in philosophy and an MFA in contemporary art. She is currently working on a book to help students get that 'extra edge' for applying to top colleges.",
  },
];

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const webinar = WEBINARS_DATA.find((w) => w.slug === slug);

  if (!webinar) {
    notFound();
  }

  const isCampusTours = slug === "making-college-campus-tours-worth-your-time";
  const isEstatePlanning = slug === "legally-preparing-your-child-for-college-with-estate-planning";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
    { name: webinar.title, url: `/events/${webinar.slug}` },
  ];

  return (
    <>
      <Navbar />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <main className="min-h-screen bg-white">
        {/* Top Kicker Bar */}
        <section className="bg-brand-ink text-white py-2.5 sm:py-3 border-b border-white/10">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs font-heading font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="tracking-wider uppercase text-[#79c3f7]">
                {webinar.status === "upcoming" ? "LIVE MASTERCLASS" : "ON-DEMAND REPLAY"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#f3eee5] text-[11.5px] sm:text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{webinar.date}</span>
              </span>
              {webinar.time && (
                <>
                  <span className="hidden sm:inline text-white/30">|</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{webinar.time}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-5 sm:py-8 lg:py-10 bg-white border-b border-[#e9e3d8]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Navigation */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/resources/webinars"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[5px] text-xs font-bold text-brand-navy bg-[#f5f1ea] hover:bg-brand-sky border border-[#e9e3d8] transition-colors font-heading shadow-xs"
              >
                &larr; Back to All Webinars &amp; Events
              </Link>
              <nav aria-label="Breadcrumbs" className="hidden sm:flex items-center gap-1.5 text-xs text-brand-text/75 font-sans">
                <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
                <span>/</span>
                <Link href="/resources/webinars" className="hover:text-brand-blue transition-colors">Webinars &amp; Events</Link>
                <span>/</span>
                <span className="text-brand-navy font-semibold truncate max-w-[240px] md:max-w-[340px]">{webinar.title}</span>
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              {/* Left Column: Media (YouTube Video or Banner), Overview & Topics (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] bg-[#f5f1ea] text-brand-blue text-xs font-bold font-heading uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{webinar.category}</span>
                  </span>
                  <span className="text-xs font-semibold text-brand-text flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{webinar.duration}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-brand-navy font-heading tracking-tight leading-tight sm:leading-[44px] mb-3">
                  {webinar.title}
                </h1>

                <p className="text-sm sm:text-base font-semibold text-brand-navy/80 font-sans mb-4">
                  {webinar.subtitle}
                </p>

                {/* Media Container: Embedded YouTube Player OR Banner Image */}
                {webinar.youtubeId ? (
                  <div className="relative w-full aspect-video rounded-[8px] overflow-hidden border border-[#e9e3d8] shadow-md bg-black mb-6">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${webinar.youtubeId}?autoplay=0&rel=0`}
                      title={webinar.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : webinar.bannerImage ? (
                  <div className="relative w-full aspect-[16/9] min-h-[220px] sm:min-h-[280px] rounded-[8px] overflow-hidden border border-[#e9e3d8] shadow-md bg-slate-100 mb-6">
                    <Image
                      src={webinar.bannerImage}
                      alt={webinar.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 750px"
                      className="object-cover object-center"
                    />
                  </div>
                ) : null}

                <div className="prose prose-slate max-w-none mb-6">
                  <h3 className="text-lg font-bold text-brand-navy font-heading mb-2">
                    Event Overview
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-brand-text font-sans">
                    {webinar.description}
                  </p>
                </div>

                {/* Key Topics Section */}
                {webinar.topics && webinar.topics.length > 0 && (
                  <div className="mb-6 p-5 sm:p-6 rounded-[8px] bg-white border border-[#e9e3d8] shadow-xs">
                    <h3 className="text-sm font-bold text-brand-navy font-heading uppercase tracking-wider mb-3">
                      Key Topics Covered:
                    </h3>
                    <div className="space-y-2.5">
                      {webinar.topics.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-brand-navy">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Lead Form & Takeaways (5 cols) */}
              <div className="lg:col-span-5 w-full space-y-5">
                <CampusTourRegistrationForm
                  eventTitle={webinar.title}
                  formId="4e7ff356-43b3-4bb6-9e98-f5f522393d45"
                />

                {/* Key Takeaways Card */}
                {webinar.takeaways && webinar.takeaways.length > 0 && (
                  <div className="p-5 rounded-[8px] bg-white border border-[#e9e3d8] shadow-xs">
                    <h4 className="text-xs font-bold text-brand-navy font-heading uppercase tracking-wider mb-3">
                      Included With This Session:
                    </h4>
                    <div className="space-y-2">
                      {webinar.takeaways.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-brand-text">
                          <CheckCircle2 className="w-4 h-4 text-[#2F9E5C] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Consultation Callout */}
                <div className="p-5 rounded-[8px] bg-brand-ink text-white">
                  <h4 className="text-sm font-bold font-heading mb-1.5">
                    Need 1-on-1 Admissions Guidance?
                  </h4>
                  <p className="text-xs text-[#f3eee5] leading-relaxed mb-3">
                    Book an initial consultation with Dr. Amy Morgenstern and our senior counseling team.
                  </p>
                  <Link
                    href="https://meetings-na2.hubspot.com/bluestars/initial-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] text-xs font-bold text-brand-navy bg-white hover:bg-[#f3eee5] transition-colors font-heading"
                  >
                    <span>Book Initial Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Speakers Section */}
        <section className="py-10 sm:py-14 bg-[#f5f1ea] border-b border-[#e9e3d8]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.14em] font-heading">
                SESSION LEADERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading tracking-tight mt-1.5 mb-2">
                Meet the Presenters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isCampusTours ? (
                CAMPUS_TOURS_SPEAKERS.map((spk, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[8px] border border-[#e9e3d8] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[8px] overflow-hidden mb-4 border border-[#e9e3d8] mx-auto">
                        <Image
                          src={spk.image}
                          alt={spk.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-navy font-heading text-center mb-0.5">
                        {spk.name}
                      </h3>
                      <p className="text-[15.5px] font-semibold text-brand-blue font-sans text-center mb-1">
                        {spk.role}
                      </p>
                      <p className="text-[12.5px] text-brand-text font-sans text-center mb-4 pb-3 border-b border-[#e9e3d8]">
                        {spk.credentials}
                      </p>
                      <p className="text-[15px] leading-relaxed text-brand-text font-sans">
                        {spk.bio}
                      </p>
                    </div>
                  </div>
                ))
              ) : isEstatePlanning ? (
                ESTATE_PLANNING_SPEAKERS.map((spk, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[8px] border border-[#e9e3d8] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[8px] overflow-hidden mb-4 border border-[#e9e3d8] mx-auto">
                        <Image
                          src={spk.image}
                          alt={spk.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-navy font-heading text-center mb-0.5">
                        {spk.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-blue font-sans text-center mb-1">
                        {spk.role}
                      </p>
                      <p className="text-[11.5px] text-brand-text font-sans text-center mb-4 pb-3 border-b border-[#e9e3d8]">
                        {spk.credentials}
                      </p>
                      <p className="text-xs leading-relaxed text-brand-text font-sans">
                        {spk.bio}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-[8px] border border-[#e9e3d8] p-5 sm:p-6 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-3 max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[8px] overflow-hidden border border-[#e9e3d8] shrink-0">
                      <Image
                        src={webinar.speaker.avatar}
                        alt={webinar.speaker.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-navy font-heading mb-0.5">
                        {webinar.speaker.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-blue font-sans mb-2">
                        {webinar.speaker.role}
                      </p>
                      <p className="text-xs leading-relaxed text-brand-text font-sans">
                        Founder and Master Admissions Strategist Dr. Amy Morgenstern leads a close-knit team of highly experienced counselors guiding students to top Ivy League, Stanford, and UC campuses.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Parent Testimonials */}
        <section className="py-10 sm:py-14 bg-white border-b border-[#e9e3d8]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.14em] font-heading">
                PARENT TESTIMONIALS
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading tracking-tight mt-1 mb-2">
                What Families Say About Blue Stars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SHARED_TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-[8px] bg-[#f5f1ea] border border-[#e9e3d8] flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-6 h-6 text-brand-blue/30 mb-2" />
                    <p className="text-sm sm:text-[15px] leading-relaxed text-brand-navy italic font-sans mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#e9e3d8]">
                    <div className="text-[15px] font-bold text-brand-navy font-heading">
                      {t.author}
                    </div>
                    <div className="text-[12px] text-brand-text font-sans">
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Partner Cards: ember or Von Rock Law */}
        {isCampusTours && (
          <section className="py-10 sm:py-14 bg-[#f5f1ea] border-b border-[#e9e3d8]">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 sm:p-8 rounded-[8px] bg-white border border-[#e9e3d8] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-brand-blue" />
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-heading">
                      Learn About ember
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-text font-sans">
                    Ayush and Neel, the founders of ember, launched this pioneering platform in San Francisco to tackle the disparities in the college admissions process. ember facilitates personalized interactions between high school students and current college undergraduates, providing an authentic glimpse into campus life through virtual chats, in-person discussions, and tailored tours.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-[8px] bg-white border border-[#e9e3d8] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-brand-blue" />
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-heading">
                      Learn About Blue Stars Admissions Consulting
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-text font-sans">
                    Blue Stars Admissions Consulting provides comprehensive support and guidance to high school students and their families. We pride ourselves on helping students cultivate personal growth, develop essential life skills, and create an authentic spike that resonates with top colleges and universities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {isEstatePlanning && (
          <section className="py-10 sm:py-14 bg-[#f5f1ea] border-b border-[#e9e3d8]">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 sm:p-8 rounded-[8px] bg-white border border-[#e9e3d8] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="w-5 h-5 text-brand-blue" />
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-heading">
                      About Von Rock Law
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-text font-sans">
                    Von Rock Law is a premier California practice dedicated to families and communities. With over 25 years of experience in estate planning, real estate law, and family asset protection, Deidre Von Rock and her team guide parents through vital legal steps as their children transition to adulthood and college life.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-[8px] bg-white border border-[#e9e3d8] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-brand-blue" />
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-heading">
                      About Blue Stars Admissions Consulting
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-brand-text font-sans">
                    Blue Stars Admissions Consulting empowers high school students and their families to navigate the college admissions journey with calm clarity, strategic narrative architecture, and personalized multi-year guidance for Ivy League, Stanford, and UC admissions.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Navigation */}
        <section className="py-8 bg-white border-t border-[#e9e3d8]">
          <div className="max-w-[1360px] mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/resources/webinars"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] text-xs font-bold text-brand-navy bg-[#f5f1ea] hover:bg-brand-sky border border-[#e9e3d8] transition-colors font-heading"
            >
              &larr; Back to All Webinars &amp; Events
            </Link>

            <Link
              href="/videos"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-navy font-heading"
            >
              <span>Explore 41+ Free Video Masterclasses &rarr;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
