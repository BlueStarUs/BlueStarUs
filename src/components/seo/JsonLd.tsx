import React from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface OrganizationJsonLdProps {
  url?: string;
}

export function OrganizationJsonLd({ url = SITE_CONFIG.url }: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.name,
    alternateName: ["Blue Stars", "Blue Stars Consulting"],
    url: url,
    logo: `${SITE_CONFIG.url}/images/BlueStars_Admission_Consulting_Logo.webp`,
    image: `${SITE_CONFIG.url}/images/og-image.png`,
    description: SITE_CONFIG.description,
    telephone: `+1-${SITE_CONFIG.contact.phone}`,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "58 West Portal Ave",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94127",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Dr. Amy Morgenstern",
      jobTitle: "Founder & Principal Consultant",
      honorificPrefix: "Dr.",
    },
    sameAs: [
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.pinterest,
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.youtube,
      "https://www.bbb.org/us/ca/san-francisco/profile/educational-consultant/blue-stars-admissions-consulting-1116-968560",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteJsonLdProps {
  url?: string;
}

export function WebSiteJsonLd({ url = SITE_CONFIG.url }: WebSiteJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorRole?: string;
  category?: string;
  wordCount?: number;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = "Dr. Amy Morgenstern",
  authorRole = "Founder & Principal Consultant",
  category,
  wordCount,
}: ArticleJsonLdProps) {
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${SITE_CONFIG.url}${imageUrl}`
    : `${SITE_CONFIG.url}/images/og-image.png`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: description,
    image: [fullImageUrl],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/BlueStars_Admission_Consulting_Logo.webp`,
      },
    },
    articleSection: category,
    wordCount: wordCount,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}

export function ServiceJsonLd({
  name,
  description,
  url,
  serviceType = "Educational Consulting",
}: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    serviceType: serviceType,
    url: url,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: `+1-${SITE_CONFIG.contact.phone}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "58 West Portal Ave",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94127",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

