import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Admissions Counselors in San Francisco",
  description:
    "Get in touch with Blue Stars Admissions Consulting. Reach our San Francisco office for personalized college planning, essay guidance, and initial consultations.",
  alternates: {
    canonical: "https://bluestars.us/contact",
  },
  openGraph: {
    title: "Contact Admissions Counselors in San Francisco | Blue Stars",
    description:
      "Get in touch with Blue Stars Admissions Consulting. Reach our San Francisco office for personalized college planning, essay guidance, and initial consultations.",
    url: "https://bluestars.us/contact",
    images: [
      {
        url: "/images/sub_images/choose.png",
        width: 1200,
        height: 630,
        alt: "Contact Blue Stars Admissions Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Admissions Counselors in San Francisco | Blue Stars",
    description:
      "Get in touch with Blue Stars Admissions Consulting. Reach our San Francisco office for personalized college planning, essay guidance, and initial consultations.",
    images: ["/images/sub_images/choose.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </>
  );
}

