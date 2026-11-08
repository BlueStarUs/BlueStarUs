"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Handles:
 * 1. Reliable instant scroll-to-top on route changes.
 * 2. Modern floating interactive "Scroll to Top" button with smooth animations.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Ensures viewport starts at y=0 on page navigation
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 15);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // 2. Scroll listener to reveal the floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={cn(
        "fixed z-50 flex items-center justify-center transition-all duration-300 transform select-none cursor-pointer",
        "bottom-[90px] right-[22.5px] sm:bottom-[105px] sm:right-[30px]",
        "w-10 h-11 sm:w-10 sm:h-10 rounded-[5px]",
        "bg-brand-blue hover:bg-brand-navy text-white",
        "border border-white/25 shadow-[0_8px_24px_rgba(10,61,107,0.28)] hover:shadow-[0_12px_32px_rgba(10,61,107,0.4)]",
        "active:scale-95 group focus:outline-none focus:ring-2 focus:ring-brand-blue/50",
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      )}
    >
      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
