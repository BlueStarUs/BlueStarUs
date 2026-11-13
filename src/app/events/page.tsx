import type { Metadata } from "next";
import WebinarsPage from "@/app/resources/webinars/page";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "College Admissions Events & Workshops",
  description:
    "Join live admissions masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
  alternates: {
    canonical: "https://bluestars.us/events",
  },
  openGraph: {
    title: "College Admissions Events & Workshops | Blue Stars",
    description:
      "Join live admissions masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
    url: "https://bluestars.us/events",
    images: [
      {
        url: "/images/sub_images/live_Admissions_Webinars.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Events & Workshops | Blue Stars",
    description:
      "Join live admissions masterclasses, interactive UC workshops, and on-demand college planning replays hosted by Dr. Amy Morgenstern.",
    images: ["/images/sub_images/live_Admissions_Webinars.png"],
  },
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <WebinarsPage />
      </main>
      <Footer />
    </>
  );
}

