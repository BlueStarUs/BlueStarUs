import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us | BlueStars Admissions Consulting",
  description:
    "Get in touch with BlueStars Admissions Consulting. Schedule an introductory consultation, subscribe to our college admissions newsletter, or send an inquiry for our Bay Area and global programs.",
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

