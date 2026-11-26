import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { GA_TRACKING_ID } from "@/lib/analytics";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatBot } from "@/components/ui/ChatBot";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Mobile keyboard shrinks the layout so the chat input stays visible above it.
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "Blue Stars Admissions Consulting | Premier College Planning",
    template: "%s | Blue Stars Admissions Consulting",
  },
  description:
    "Personalized admissions consulting to help high school students navigate competitive college applications, build authentic spikes, and gain admission to top universities.",
  keywords: [
    "admissions consulting",
    "college planning",
    "university applications",
    "essay guidance",
    "scholarship advice",
    "Ivy League admissions",
    "UC admissions",
    "STEM research mentorship",
  ],
  authors: [{ name: "Blue Stars Admissions Consulting" }],
  creator: "Blue Stars Admissions Consulting",
  publisher: "Blue Stars Admissions Consulting",
  verification: {
    google: [
      "cJ3ap--oDzb0O9UsT3TGEIeykUFi1j5a_ZLSqEX0dCU",
      "lRfgktYhSUSku6mMq9aPpn5bYAdL40Zd74VrkIVcvx8",
    ],
    other: {
      "p:domain_verify": "d609426fd7aced53d2a53b0f3fbf3c86",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Blue Stars Admissions Consulting | Premier College Planning",
    description:
      "Personalized admissions consulting to help high school students navigate competitive college applications, build authentic spikes, and gain admission to top universities.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blue Stars Admissions Consulting - Expert College Planning & Admissions Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Stars Admissions Consulting",
    description:
      "Personalized admissions consulting to help high school students navigate competitive college applications, build authentic spikes, and gain admission to top universities.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased text-brand-text bg-white selection:bg-brand-sky selection:text-brand-navy min-h-screen flex flex-col font-sans">
        {/* WCAG 2.4.1 Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-[#0A3D6B] focus:text-white focus:font-bold focus:rounded-[5px] focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8] font-heading text-xs"
        >
          Skip to main content
        </a>

        {/* Google Analytics GA4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* HubSpot Official Tracking Script (Portal 20571161) */}
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src="//js.hs-scripts.com/20571161.js"
        />

        <ScrollToTop />
        <MotionProvider>{children}</MotionProvider>
        <ChatBot />
      </body>
    </html>
  );
}
