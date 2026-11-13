import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtAdmissionsView } from "@/components/sections/ArtAdmissionsView";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SERVICES_CATALOG } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Art Admissions Consulting & Portfolio Mentorship",
  description:
    "Build a stunning visual art portfolio and compelling artist statement with MFA-led mentorship from Dr. Amy Morgenstern. Proven acceptances to RISD, Pratt, and Parsons.",
  alternates: {
    canonical: "https://bluestars.us/art-admissions",
  },
  openGraph: {
    title: "Art Admissions Consulting & Portfolio Mentorship | Blue Stars",
    description:
      "Build a stunning visual art portfolio and compelling artist statement with MFA-led mentorship from Dr. Amy Morgenstern. Proven acceptances to RISD, Pratt, and Parsons.",
    url: "https://bluestars.us/art-admissions",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Art Admissions Consulting - Blue Stars Admissions Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Admissions Consulting & Portfolio Mentorship | Blue Stars",
    description:
      "Build a stunning visual art portfolio and compelling artist statement with MFA-led mentorship from Dr. Amy Morgenstern. Proven acceptances to RISD, Pratt, and Parsons.",
    images: ["/images/og-image.png"],
  },
};

export default function ArtAdmissionsPage() {
  const service = SERVICES_CATALOG["art-admissions-consulting"];
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Art Admissions Consulting", url: "/art-admissions" },
  ];

  return (
    <>
      <ServiceJsonLd
        name="Art Admissions Consulting"
        description="Build a stunning visual art portfolio and compelling artist statement with MFA-led mentorship."
        url="https://bluestars.us/art-admissions"
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Navbar />
      <main className="flex-1">
        <ArtAdmissionsView service={service} />
      </main>
      <Footer />
    </>
  );
}

