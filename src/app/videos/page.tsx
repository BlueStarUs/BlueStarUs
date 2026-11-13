import type { Metadata } from "next";
import VideosPage from "@/app/resources/videos/page";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "College Admissions Video Library",
  description:
    "Watch 41+ authentic admissions videos: college campus tours, alumni interviews, UC PIQ masterclasses, and recorded webinars by Dr. Amy Morgenstern.",
  alternates: {
    canonical: "https://bluestars.us/videos",
  },
  openGraph: {
    title: "College Admissions Video Library | Blue Stars",
    description:
      "Watch 41+ authentic admissions videos: college campus tours, alumni interviews, UC PIQ masterclasses, and recorded webinars by Dr. Amy Morgenstern.",
    url: "https://bluestars.us/videos",
    images: [
      {
        url: "/images/sub_images/Student_Videos.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Videos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Admissions Video Library | Blue Stars",
    description:
      "Watch 41+ authentic admissions videos: college campus tours, alumni interviews, UC PIQ masterclasses, and recorded webinars by Dr. Amy Morgenstern.",
    images: ["/images/sub_images/Student_Videos.png"],
  },
};

export default function VideosPageRoute() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <VideosPage />
      </main>
      <Footer />
    </>
  );
}

