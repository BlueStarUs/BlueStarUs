import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    return [
      // 301 Permanent Redirects for Legacy / Old Site URLs
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/meet-our-team",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-team",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/dr-amy-morgenstern",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/articles/:slug*",
        destination: "/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/our-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services-overview",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/college-planning",
        destination: "/services/college-planning",
        permanent: true,
      },
      {
        source: "/college-admissions-consulting",
        destination: "/services/college-planning",
        permanent: true,
      },
      {
        source: "/comprehensive-application-strategy",
        destination: "/services/college-planning",
        permanent: true,
      },
      {
        source: "/essay-guidance",
        destination: "/services/essay-guidance",
        permanent: true,
      },
      {
        source: "/research-internships",
        destination: "/services/research-internships",
        permanent: true,
      },
      {
        source: "/research-academy",
        destination: "/services/research-internships",
        permanent: true,
      },
      {
        source: "/art-school-admissions",
        destination: "/services/art-admissions-consulting",
        permanent: true,
      },
      {
        source: "/testimonials",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/testimonials/:path*",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/success-stories",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/success-stories/:path*",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/privacy-statement",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/resources/faq",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/resources/faq",
        permanent: true,
      },
      {
        source: "/guides",
        destination: "/resources/guides",
        permanent: true,
      },
      {
        source: "/free-guides",
        destination: "/resources/guides",
        permanent: true,
      },
      {
        source: "/videos",
        destination: "/resources/videos",
        permanent: true,
      },
      {
        source: "/webinars",
        destination: "/resources/webinars",
        permanent: true,
      },
      {
        source: "/free-consultation",
        destination: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
        permanent: true,
      },
      {
        source: "/initial-consultation",
        destination: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
        permanent: true,
      },
      {
        source: "/consultation",
        destination: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
        permanent: true,
      },
      {
        source: "/book-consultation",
        destination: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
        permanent: true,
      },
      {
        source: "/schedule",
        destination: "https://meetings-na2.hubspot.com/bluestars/initial-consultation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

