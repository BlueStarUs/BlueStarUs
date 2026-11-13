// Analytics and Event Tracking helper for Blue Stars Admissions Consulting
// Supports Google Analytics 4 (GA4) via window.gtag safely

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrAction: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-LG5T8BVHRG";

export function trackEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  try {
    window.gtag("event", action, params);
  } catch (err) {
    // Non-blocking catch for ad-blockers or privacy extensions
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Analytics] Failed to send event ${action}:`, err);
    }
  }
}

export function trackPageView(url: string, title?: string): void {
  trackEvent("page_view", {
    page_location: url,
    page_title: title || (typeof document !== "undefined" ? document.title : ""),
  });
}

export function trackBlogSearch(query: string, resultsCount: number): void {
  if (!query.trim()) return;
  trackEvent("search", {
    search_term: query.trim(),
    results_count: resultsCount,
    search_category: "blog",
  });
}

export function trackSearchResultClick(
  postSlug: string,
  postTitle: string,
  query: string
): void {
  trackEvent("select_content", {
    content_type: "blog_post",
    item_id: postSlug,
    item_name: postTitle,
    search_term: query,
  });
}

export function trackContactFormSubmission(formType: string = "contact_form"): void {
  trackEvent("generate_lead", {
    form_name: formType,
    method: "website_form",
  });
}

export function trackCtaClick(
  ctaName: string,
  destinationUrl: string = ""
): void {
  trackEvent("cta_click", {
    cta_name: ctaName,
    destination: destinationUrl,
  });
}

export function trackPhoneClick(phoneNumber: string): void {
  trackEvent("contact_phone_click", {
    phone_number: phoneNumber,
  });
}

export function trackEmailClick(email: string): void {
  trackEvent("contact_email_click", {
    email_address: email,
  });
}

