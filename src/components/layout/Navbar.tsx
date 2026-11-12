"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Radio,
  Video,
  HelpCircle,
  Newspaper,
  Award,
  Search,
} from "lucide-react";
import {
  ServiceCompassIcon,
  ServicePaletteIcon,
  UniversityCampusIcon,
  ServiceDocIcon,
  ServicePencilIcon,
  ServiceCoinsIcon,
  ServiceResearchIcon,
} from "@/components/ui/Icons";
import {
  NAV_LINKS,
  NAV_SERVICES,
  NAV_RESOURCES,
  SITE_CONFIG,
  HUBSPOT_CONSULTATION_URL,
  HUBSPOT_DISCOVERY_URL,
} from "@/lib/constants";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteSearchModal } from "@/components/ui/SiteSearchModal";
import { cn } from "@/lib/utils";

// Map service icon names to custom Blue Stars SVG icon components
const SERVICE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  compass: ServiceCompassIcon,
  palette: ServicePaletteIcon,
  building: UniversityCampusIcon,
  doc: ServiceDocIcon,
  pencil: ServicePencilIcon,
  coins: ServiceCoinsIcon,
  research: ServiceResearchIcon,
};

// Map resource icon names to Lucide icon components
const RESOURCE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  book: BookOpen,
  radio: Radio,
  video: Video,
  help: HelpCircle,
  newspaper: Newspaper,
  award: Award,
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Services dropdown state
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Resources dropdown state
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const resourcesDropdownRef = useRef<HTMLDivElement | null>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Site Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global search shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Clear debounce timeouts on unmount
  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    };
  }, []);

  // Close menus on route change and guarantee starting from top of page
  useEffect(() => {
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const handleNavClick = () => {
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileResourcesOpen(false);
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  // Open mobile accordion by default if user is on any relevant subroute
  useEffect(() => {
    if (pathname.startsWith("/services")) {
      setIsMobileServicesOpen(true);
    }
    if (pathname.startsWith("/resources")) {
      setIsMobileResourcesOpen(true);
    }
  }, [pathname]);

  // Close desktop dropdowns on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
        setIsResourcesOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
      if (
        resourcesDropdownRef.current &&
        !resourcesDropdownRef.current.contains(e.target as Node)
      ) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsResourcesOpen(false);
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
      resourcesTimeoutRef.current = null;
    }
    setIsServicesOpen(false);
    setIsResourcesOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 180);
  };

  const handleRegularLinkMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
  };

  // Scroll listener for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy strictly active ONLY on homepage ("/")
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleScrollSpy = () => {
      if (window.scrollY < 120) {
        setActiveHash("home");
        return;
      }

      const sections = ["contact", "resources", "planning", "services", "home"];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveHash(section);
            return;
          }
        }
      }
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Precise active check for every nav item
  const isLinkActive = (href: string) => {
    if (href === "/services") {
      return pathname.startsWith("/services");
    }
    if (href === "/resources") {
      return pathname.startsWith("/resources");
    }
    if (href === "/successes") {
      return pathname.startsWith("/successes");
    }
    if (href === "/testimonials") {
      return pathname.startsWith("/testimonials") || pathname.startsWith("/stories");
    }
    if (href === "/blogs") {
      return pathname.startsWith("/blogs");
    }
    if (href === "/stories") {
      return pathname.startsWith("/stories");
    }
    if (href === "/about") {
      return pathname === "/about";
    }
    if (href === "/contact") {
      return pathname === "/contact";
    }

    if (pathname === "/") {
      if (href === "/") {
        return activeHash === "home";
      }
      if (href === "/#planning") {
        return activeHash === "planning";
      }
      if (href === "/#resources") {
        return activeHash === "resources";
      }
      if (href === "/#contact") {
        return activeHash === "contact";
      }
    }

    return false;
  };

  const isContactActive = pathname === "/contact";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/100 border-b border-[#e2eef9] transition-all duration-300",
        isScrolled
          ? "shadow-[0_4px_24px_rgba(10,61,107,0.08)] py-0"
          : "shadow-[0_2px_12px_rgba(10,61,107,0.03)]"
      )}
    >
      {/* Dynamic Announcement Bar */}
      <AnnouncementBar />

      {/* 1360px Max Width Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[80px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center cursor-pointer focus:outline-none select-none py-1"
          aria-label={SITE_CONFIG.name}
          onClick={() => {
            setIsOpen(false);
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }}
        >
          <Image
            src="/images/BlueStars_Admission_Consulting_Logo.webp"
            alt="Blue Stars Admissions Consulting"
            width={220}
            height={120}
            priority
            className="h-[57px] sm:h-[62px] w-auto object-contain transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-8  text-[13.5px] lg:text-[14.5px] xl:text-[15px] font-semibold font-heading"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((item) => {
            const active = isLinkActive(item.href);

            // 1. Our Services Dropdown / Mega Menu
            if (item.href === "/services") {
              return (
                <div
                  key={item.label}
                  ref={servicesDropdownRef}
                  className="relative flex items-center"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <Link
                    href="/services"
                    scroll={true}
                    onClick={handleNavClick}
                    aria-expanded={isServicesOpen}
                    aria-haspopup="true"
                    aria-controls="services-dropdown-panel"
                    className={cn(
                      "relative py-1.5 flex items-center gap-1.5 transition-colors font-[450] duration-200 select-none cursor-pointer focus:outline-none focus-visible:text-brand-blue group",
                      active || isServicesOpen
                        ? "text-brand-blue font-[450]"
                        : "text-brand-navy hover:text-brand-blue font-medium"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isServicesOpen
                          ? "rotate-180 text-brand-blue"
                          : "text-brand-navy/60 group-hover:text-brand-blue"
                      )}
                      aria-hidden="true"
                    />
                    {active && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full animate-in fade-in duration-200"
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* Desktop Mega Dropdown Menu for Services */}
                  {isServicesOpen && (
                    <div
                      id="services-dropdown-panel"
                      role="menu"
                      aria-label="Our Services"
                      className="absolute top-full -left-20 sm:-left-28 md:-left-36 lg:-left-44 pt-2.5 w-[740px] lg:w-[820px] max-w-[calc(100vw-32px)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto"
                    >
                      <div className="bg-white rounded-[5px] shadow-[0_22px_50px_rgba(10,61,107,0.15)] border border-brand-border overflow-hidden">
                        {/* Dropdown Top Bar */}
                        <div className="px-6 py-3.5 bg-gradient-to-r from-brand-bg via-white to-brand-sky/40 border-b border-brand-border flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                            <span className="text-[14px] sm:text-[14.5px] font-extrabold uppercase tracking-wider text-brand-navy font-heading">
                              Admissions Consulting Programs
                            </span>
                          </div>
                          <Link
                            href="/services"
                            scroll={true}
                            onClick={handleNavClick}
                            className="text-[14px] sm:text-[14.5px] font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1.5 transition-colors font-heading group/link"
                          >
                            <span>Explore All Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>

                        {/* 6 Services Grid */}
                        <div className="p-4 grid grid-cols-2 gap-2.5 bg-white">
                          {NAV_SERVICES.map((service) => {
                            const IconComponent = SERVICE_ICONS[service.iconName];
                            const isCurrent = pathname === service.href;

                            return (
                              <Link
                                key={service.id}
                                href={service.href}
                                role="menuitem"
                                scroll={true}
                                onClick={handleNavClick}
                                className={cn(
                                  "group/item flex items-center gap-3 p-2.5 sm:p-3 rounded-[5px] transition-all duration-200 border",
                                  isCurrent
                                    ? "bg-brand-sky/70 border-brand-blue/30 shadow-xs"
                                    : "hover:bg-brand-bg/90 hover:border-brand-border border-transparent"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-9 h-9 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-105 shadow-xs",
                                    service.accent === "green"
                                      ? "bg-brand-green text-brand-greenDark"
                                      : "bg-brand-sky text-brand-blue"
                                  )}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-heading font-bold text-[13px] leading-[18px] text-brand-navy group-hover/item:text-brand-blue transition-colors">
                                      {service.title}
                                    </span>
                                    {service.badge && (
                                      <span
                                        className={cn(
                                          "text-[10px] font-bold px-1.5 py-0.5 rounded-[5px] uppercase tracking-wider flex-shrink-0",
                                          service.accent === "green"
                                            ? "bg-brand-green text-brand-greenDark"
                                            : "bg-brand-sky text-brand-blue"
                                        )}
                                      >
                                        {service.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <ChevronRight className="w-4 h-4 text-brand-blue/30 group-hover/item:text-brand-blue group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Bottom Banner */}
                        <div className="px-6 py-3.5 bg-brand-bg border-t border-brand-border flex items-center justify-between">
                          <div className="text-[14px] sm:text-[14.5px] leading-[22px] sm:leading-[24px] text-brand-text truncate font-sans">
                            <span className="font-semibold text-brand-navy">Not sure which roadmap fits?</span>{" "}
                            Book a free 30-minute diagnostic session.
                          </div>
                          <a
                            href={HUBSPOT_CONSULTATION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsServicesOpen(false)}
                            className="inline-flex items-center gap-1.5 text-[14px] sm:text-[14.5px] font-bold text-white bg-brand-blue hover:bg-brand-navy px-3.5 py-1.5 rounded-[5px] transition-all shadow-xs font-heading"
                          >
                            <span>Book Consultation</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // 2. Resources Dropdown / Mega Menu
            if (item.href === "/resources") {
              return (
                <div
                  key={item.label}
                  ref={resourcesDropdownRef}
                  className="relative flex items-center"
                  onMouseEnter={handleResourcesMouseEnter}
                  onMouseLeave={handleResourcesMouseLeave}
                >
                  <Link
                    href="/resources"
                    scroll={true}
                    onClick={handleNavClick}
                    aria-expanded={isResourcesOpen}
                    aria-haspopup="true"
                    aria-controls="resources-dropdown-panel"
                    className={cn(
                      "relative py-1.5 flex items-center gap-1.5 transition-colors duration-200 select-none cursor-pointer focus:outline-none focus-visible:text-brand-blue group",
                      active || isResourcesOpen
                        ? "text-brand-blue font-bold"
                        : "text-brand-navy hover:text-brand-blue font-medium"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isResourcesOpen
                          ? "rotate-180 text-brand-blue"
                          : "text-brand-navy/60 group-hover:text-brand-blue"
                      )}
                      aria-hidden="true"
                    />
                    {active && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full animate-in fade-in duration-200"
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* Desktop Mega Dropdown Menu for Resources */}
                  {isResourcesOpen && (
                    <div
                      id="resources-dropdown-panel"
                      role="menu"
                      aria-label="Resources & Insights"
                      className="absolute top-full -left-28 sm:-left-36 md:-left-44 lg:-left-56 pt-2.5 w-[740px] lg:w-[820px] max-w-[calc(100vw-32px)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto"
                    >
                      <div className="bg-white rounded-[5px] shadow-[0_22px_50px_rgba(10,61,107,0.15)] border border-brand-border overflow-hidden">
                        {/* Dropdown Top Bar */}
                        <div className="px-6 py-3.5 bg-gradient-to-r from-brand-bg via-white to-brand-sky/40 border-b border-brand-border flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                            <span className="text-[14px] sm:text-[14.5px] font-extrabold uppercase tracking-wider text-brand-navy font-heading">
                              Admissions Knowledge & Insights
                            </span>
                          </div>
                          <Link
                            href="/resources"
                            scroll={true}
                            onClick={handleNavClick}
                            className="text-[14px] sm:text-[14.5px] font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1.5 transition-colors font-heading group/link"
                          >
                            <span>Explore All Resources</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>

                        {/* 6 Resources Grid */}
                        <div className="p-4 grid grid-cols-2 gap-2.5 bg-white">
                          {NAV_RESOURCES.map((resource) => {
                            const IconComponent = RESOURCE_ICONS[resource.iconName] || BookOpen;
                            const isCurrent = pathname === resource.href;

                            return (
                              <Link
                                key={resource.id}
                                href={resource.href}
                                role="menuitem"
                                scroll={true}
                                onClick={handleNavClick}
                                className={cn(
                                  "group/item flex items-center gap-3 p-2.5 sm:p-3 rounded-[5px] transition-all duration-200 border",
                                  isCurrent
                                    ? "bg-brand-sky/70 border-brand-blue/30 shadow-xs"
                                    : "hover:bg-brand-bg/90 hover:border-brand-border border-transparent"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-9 h-9 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-105 shadow-xs",
                                    resource.accent === "green"
                                      ? "bg-brand-green text-brand-greenDark"
                                      : "bg-brand-sky text-brand-blue"
                                  )}
                                >
                                  <IconComponent className="w-4.5 h-4.5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-heading font-bold text-[13px] leading-[18px] text-brand-navy group-hover/item:text-brand-blue transition-colors">
                                      {resource.title}
                                    </span>
                                    {resource.badge && (
                                      <span
                                        className={cn(
                                          "text-[10px] font-bold px-1.5 py-0.5 rounded-[5px] uppercase tracking-wider flex-shrink-0",
                                          resource.accent === "green"
                                            ? "bg-brand-green text-brand-greenDark"
                                            : "bg-brand-sky text-brand-blue"
                                        )}
                                      >
                                        {resource.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <ChevronRight className="w-4 h-4 text-brand-blue/30 group-hover/item:text-brand-blue group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Bottom Banner */}
                        <div className="px-6 py-3.5 bg-brand-bg border-t border-brand-border flex items-center justify-between">
                          <div className="text-[14px] sm:text-[14.5px] leading-[22px] sm:leading-[24px] text-brand-text truncate font-sans">
                            <span className="font-semibold text-brand-navy">Empowering teens & families</span>{" "}
                            with actionable college admissions guidance.
                          </div>
                          <a
                            href={HUBSPOT_CONSULTATION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsResourcesOpen(false)}
                            className="inline-flex items-center gap-1.5 text-[14px] sm:text-[14.5px] font-bold text-white bg-brand-blue hover:bg-brand-navy px-3.5 py-1.5 rounded-[5px] transition-all shadow-xs font-heading"
                          >
                            <span>Book Consultation</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Standard Navigation Links
            return (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={handleRegularLinkMouseEnter}
                className={cn(
                  "relative py-1.5 transition-colors duration-200 select-none",
                  active
                    ? "text-brand-blue font-bold"
                    : "text-brand-navy hover:text-brand-blue font-medium"
                )}
              >
                <span>{item.label}</span>
                {active && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-brand-blue rounded-full animate-in fade-in duration-200"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Header Site Search Trigger (Desktop) */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-[5px] text-xs sm:text-[13px] font-medium font-sans text-brand-navy/75 hover:text-brand-blue bg-[#f0f6fc] hover:bg-[#e4effa] border border-[#d6e5f5] hover:border-brand-blue/30 transition-all shadow-2xs group"
            aria-label="Search website"
          >
            <Search className="w-3.5 h-3.5 text-brand-blue group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-brand-navy/80">Search...</span>
            <kbd className="hidden xl:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-brand-navy/60 border border-brand-border/80 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Primary Consultation Booking CTA (HubSpot Direct) */}
          <a
            href={HUBSPOT_CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-[5px] text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-brand-blue"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Site Search Button */}
          <button
            type="button"
            className="md:hidden w-8 h-8 rounded-[2px] bg-[#E3F1FC] text-brand-navy hover:text-brand-blue grid place-items-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4 text-brand-blue stroke-[2.2]" />
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="md:hidden w-8 h-8 rounded-[2px] bg-[#E3F1FC] text-brand-navy hover:text-brand-blue grid place-items-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6 stroke-[2.4]" /> : <Menu className="w-6 h-6 stroke-[2.4]" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
       <div className="md:hidden absolute top-full left-0 w-full h-[calc(100dvh-100%)] bg-white px-5 py-5 shadow-[0_20px_40px_rgba(10,61,107,0.12)] overflow-y-auto animate-in slide-in-from-left duration-300 ease-out">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => {
              const active = isLinkActive(item.href);

              // 1. Mobile Our Services Accordion
              if (item.href === "/services") {
                return (
                  <div key={item.label} className="flex flex-col">
                    <div
                      className={cn(
                        "rounded-[5px] transition-colors flex items-center justify-between",
                        active || isMobileServicesOpen
                          ? "bg-[#E3F1FC]"
                          : "hover:bg-[#E3F1FC]/50"
                      )}
                    >
                      <Link
                        href="/services"
                        scroll={true}
                        onClick={handleNavClick}
                        className={cn(
                          "py-3 px-4 text-[15px] font-bold font-heading flex-1 text-left",
                          active || isMobileServicesOpen
                            ? "text-brand-blue font-extrabold"
                            : "text-brand-navy hover:text-brand-blue"
                        )}
                      >
                        {item.label}
                      </Link>

                      <button
                        type="button"
                        onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                        aria-expanded={isMobileServicesOpen}
                        aria-label="Toggle Our Services menu"
                        className="p-3 text-brand-blue cursor-pointer focus:outline-none"
                      >
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-brand-blue transition-transform duration-200",
                            isMobileServicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    {/* Mobile Accordion Submenu for Services */}
                    {isMobileServicesOpen && (
                      <div className="pl-2 pr-1 pt-1.5 pb-2 flex flex-col space-y-1 bg-brand-bg/60 rounded-[5px] my-1 border border-brand-border/70 animate-in fade-in slide-in-from-top-1 duration-150">
                        {/* View all services page link */}
                        <Link
                          href="/services"
                          scroll={true}
                          onClick={handleNavClick}
                          className="flex items-center justify-between py-2 px-3 rounded-[5px] text-xs font-bold text-brand-blue bg-white hover:bg-brand-sky/60 font-heading border border-brand-border/60 shadow-xs"
                        >
                          <span>Explore All Services Overview</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="h-[1px] bg-brand-border/50 my-1 mx-2" />

                        {/* Individual services */}
                        {NAV_SERVICES.map((service) => {
                          const IconComponent = SERVICE_ICONS[service.iconName];
                          const isCurrent = pathname === service.href;

                          return (
                            <Link
                              key={service.id}
                              href={service.href}
                              scroll={true}
                              onClick={handleNavClick}
                              className={cn(
                                "flex items-center gap-2.5 py-2 px-3 rounded-[5px] text-[13px] font-semibold transition-colors",
                                isCurrent
                                  ? "text-brand-blue bg-brand-sky font-bold"
                                  : "text-brand-navy hover:text-brand-blue hover:bg-brand-sky/40"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-[5px] flex items-center justify-center flex-shrink-0",
                                  service.accent === "green"
                                    ? "bg-brand-green text-brand-greenDark"
                                    : "bg-brand-sky text-brand-blue"
                                )}
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <span className="flex-1 font-heading text-[13px] leading-snug">{service.title}</span>
                              {service.badge && (
                                <span
                                  className={cn(
                                    "text-[8.5px] font-bold px-1.5 py-0.5 rounded-[5px] uppercase tracking-wider flex-shrink-0",
                                    service.accent === "green"
                                      ? "bg-brand-green text-brand-greenDark"
                                      : "bg-brand-sky text-brand-blue"
                                  )}
                                >
                                  {service.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // 2. Mobile Resources Accordion
              if (item.href === "/resources") {
                return (
                  <div key={item.label} className="flex flex-col">
                    <div
                      className={cn(
                        "rounded-[5px] transition-colors flex items-center justify-between",
                        active || isMobileResourcesOpen
                          ? "bg-[#E3F1FC]"
                          : "hover:bg-[#E3F1FC]/50"
                      )}
                    >
                      <Link
                        href="/resources"
                        scroll={true}
                        onClick={handleNavClick}
                        className={cn(
                          "py-3 px-4 text-[15px] font-bold font-heading flex-1 text-left",
                          active || isMobileResourcesOpen
                            ? "text-brand-blue font-extrabold"
                            : "text-brand-navy hover:text-brand-blue"
                        )}
                      >
                        {item.label}
                      </Link>

                      <button
                        type="button"
                        onClick={() => setIsMobileResourcesOpen((prev) => !prev)}
                        aria-expanded={isMobileResourcesOpen}
                        aria-label="Toggle Resources menu"
                        className="p-3 text-brand-blue cursor-pointer focus:outline-none"
                      >
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-brand-blue transition-transform duration-200",
                            isMobileResourcesOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    {/* Mobile Accordion Submenu for Resources */}
                    {isMobileResourcesOpen && (
                      <div className="pl-2 pr-1 pt-1.5 pb-2 flex flex-col space-y-1 bg-brand-bg/60 rounded-[5px] my-1 border border-brand-border/70 animate-in fade-in slide-in-from-top-1 duration-150">
                        {/* View all resources page link */}
                        <Link
                          href="/resources"
                          scroll={true}
                          onClick={handleNavClick}
                          className="flex items-center justify-between py-2 px-3 rounded-[5px] text-xs font-bold text-brand-blue bg-white hover:bg-brand-sky/60 font-heading border border-brand-border/60 shadow-xs"
                        >
                          <span>Explore All Resources & Insights</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="h-[1px] bg-brand-border/50 my-1 mx-2" />

                        {/* Individual resource links */}
                        {NAV_RESOURCES.map((resource) => {
                          const IconComponent = RESOURCE_ICONS[resource.iconName] || BookOpen;
                          const isCurrent = pathname === resource.href;

                          return (
                            <Link
                              key={resource.id}
                              href={resource.href}
                              scroll={true}
                              onClick={handleNavClick}
                              className={cn(
                                "flex items-center gap-2.5 py-2 px-3 rounded-[5px] text-[13px] font-semibold transition-colors",
                                isCurrent
                                  ? "text-brand-blue bg-brand-sky font-bold"
                                  : "text-brand-navy hover:text-brand-blue hover:bg-brand-sky/40"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-[5px] flex items-center justify-center flex-shrink-0",
                                  resource.accent === "green"
                                    ? "bg-brand-green text-brand-greenDark"
                                    : "bg-brand-sky text-brand-blue"
                                )}
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <span className="flex-1 font-heading text-[13px] leading-snug">{resource.title}</span>
                              {resource.badge && (
                                <span
                                  className={cn(
                                    "text-[8.5px] font-bold px-1.5 py-0.5 rounded-[5px] uppercase tracking-wider flex-shrink-0",
                                    resource.accent === "green"
                                      ? "bg-brand-green text-brand-greenDark"
                                      : "bg-brand-sky text-brand-blue"
                                  )}
                                >
                                  {resource.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Mobile Links (Home, Blogs, College Planning, About)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "py-3 px-4 rounded-[5px] text-[15px] font-bold font-heading transition-colors flex items-center justify-between",
                    active
                      ? "bg-[#E3F1FC] text-brand-blue font-extrabold"
                      : "text-brand-navy hover:bg-[#E3F1FC]/50 hover:text-brand-blue"
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#e2eef9] flex flex-col gap-2.5">
              <a
                href={HUBSPOT_CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="w-full py-3 px-4 rounded-[5px] text-center text-xs sm:text-[13.5px] font-bold font-heading text-white bg-brand-blue hover:bg-brand-navy transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Book Initial Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={HUBSPOT_DISCOVERY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="w-full py-3 px-4 rounded-[5px] text-center text-xs sm:text-[13px] font-bold font-heading text-brand-blue bg-[#E3F1FC] hover:bg-brand-blue hover:text-white transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Schedule Discovery Session</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/contact"
                onClick={handleNavClick}
                className={cn(
                  "w-full py-2.5 px-4 rounded-[5px] text-center text-xs sm:text-[13px] font-medium font-heading transition-all",
                  isContactActive
                    ? "bg-brand-bg text-brand-blue font-bold"
                    : "text-brand-navy hover:bg-[#E3F1FC]/50 hover:text-brand-blue"
                )}
              >
                Contact Form &amp; Questions
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Global Site Search Modal */}
      <SiteSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
