import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Blogs & Insights | Blue Stars Admissions Consulting",
    template: "%s | Blue Stars Admissions Consulting",
  },
  description:
    "Expert admissions insights, comprehensive guides, timeline strategies, and essay tips from Dr. Amy Morgenstern and the Blue Stars Admissions Consulting team.",
};

export default function BlogsLayout({
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

