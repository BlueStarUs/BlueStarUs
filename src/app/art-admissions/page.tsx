import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtAdmissionsView } from "@/components/sections/ArtAdmissionsView";
import { SERVICES_CATALOG } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Art Admissions Consulting | BFA & MFA Portfolio Mentorship | Blue Stars",
  description:
    "Build a stunning visual art portfolio and compelling artist statement with MFA-led mentorship from Dr. Amy Morgenstern. Proven acceptances to RISD, CalArts, Pratt, Parsons, and Ivy League art programs.",
  openGraph: {
    title: "Art Admissions Consulting | BFA & MFA Portfolio Mentorship | Blue Stars",
    description:
      "Build a stunning visual art portfolio and compelling artist statement with MFA-led mentorship from Dr. Amy Morgenstern. Proven acceptances to RISD, CalArts, Pratt, Parsons, and Ivy League art programs.",
  },
};

export default function ArtAdmissionsPage() {
  const service = SERVICES_CATALOG["art-admissions-consulting"];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ArtAdmissionsView service={service} />
      </main>
      <Footer />
    </>
  );
}

