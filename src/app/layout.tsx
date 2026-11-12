import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatBot } from "@/components/ui/ChatBot";
import { NewsletterPopup } from "@/components/ui/NewsletterPopup";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Blue Stars Admissions Consulting | Your Future Starts With the Right College Plan",
    template: "%s | Blue Stars Admissions Consulting",
  },
  description:
    "Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.",
  keywords: [
    "admissions consulting",
    "college planning",
    "university applications",
    "essay guidance",
    "scholarship advice",
    "Ivy League admissions",
  ],
  authors: [{ name: "Blue Stars Admissions Consulting" }],
  creator: "Blue Stars Admissions Consulting",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: "Blue Stars Admissions Consulting | Your Future Starts With the Right College Plan",
    description:
      "Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.",
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Stars Admissions Consulting",
    description:
      "Personalized admissions consulting to help you find the right colleges, build a strong application and achieve your academic goals with confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="antialiased text-brand-text bg-white selection:bg-brand-sky selection:text-brand-navy min-h-screen flex flex-col font-sans">
        <ScrollToTop />
        {children}
        <ChatBot />
        <NewsletterPopup />
      </body>
    </html>
  );
}
