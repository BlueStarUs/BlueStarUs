import React from "react";

export function BrandStar({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 0c.9 6 5 10.1 12 12-7 1.9-11.1 6-12 12-.9-6-5-10.1-12-12C7 10.1 11.1 6 12 0z" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function GraduationCapHeroIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 4L2 10.5L14 17L26 10.5L14 4Z" fill="#0B63B5" />
      <path
        d="M6.5 13.8V19C6.5 21.5 9.8 23.5 14 23.5C18.2 23.5 21.5 21.5 21.5 19V13.8"
        stroke="#0B63B5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 11.5V19.5" stroke="#0B63B5" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="24" cy="20" r="1.5" fill="#0B63B5" />
      <circle cx="14" cy="10.5" r="1.2" fill="#ffffff" />
    </svg>
  );
}

export function TeamGroupHeroIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="14" cy="8.5" r="3.4" fill="#0B63B5" />
      <path d="M7.5 22C7.5 18.4 10.4 15.5 14 15.5C17.6 15.5 20.5 18.4 20.5 22H7.5Z" fill="#0B63B5" />
      <circle cx="6" cy="10" r="2.6" fill="#0B63B5" opacity="0.9" />
      <path d="M1.5 21.5C1.5 18.8 3.5 16.7 6.1 16.4C5.4 17.3 5 18.4 5 19.6V21.5H1.5Z" fill="#0B63B5" opacity="0.9" />
      <circle cx="22" cy="10" r="2.6" fill="#0B63B5" opacity="0.9" />
      <path d="M26.5 21.5C26.5 18.8 24.5 16.7 21.9 16.4C22.6 17.3 23 18.4 23 19.6V21.5H26.5Z" fill="#0B63B5" opacity="0.9" />
    </svg>
  );
}

export function GrowthChartHeroIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3.5" y="15" width="4.5" height="9" rx="1.2" fill="#0B63B5" />
      <rect x="11.5" y="10.5" width="4.5" height="13.5" rx="1.2" fill="#0B63B5" />
      <rect x="19.5" y="6" width="4.5" height="18" rx="1.2" fill="#0B63B5" />
      <path d="M3.5 11.5L11.5 5L16.5 9L24.5 2" stroke="#2F9E5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 2H24.5V7" stroke="#2F9E5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroUsersIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="7.5" r="3.2" fill="#0B63B5" />
      <path d="M6 19.5C6 16.2 8.7 13.5 12 13.5C15.3 13.5 18 16.2 18 19.5H6Z" fill="#0B63B5" />
      <circle cx="5" cy="9" r="2.4" fill="#0B63B5" opacity="0.8" />
      <path d="M1 19C1 16.6 2.8 14.7 5.1 14.5C4.4 15.3 4 16.3 4 17.5V19H1Z" fill="#0B63B5" opacity="0.8" />
      <circle cx="19" cy="9" r="2.4" fill="#0B63B5" opacity="0.8" />
      <path d="M23 19C23 16.6 21.2 14.7 18.9 14.5C19.6 15.3 20 16.3 20 17.5V19H23Z" fill="#0B63B5" opacity="0.8" />
    </svg>
  );
}

export function HeroDocIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z" stroke="#0B63B5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3V8H19" stroke="#0B63B5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8.5 12H15.5" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 16H15.5" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HeroHeartIcon({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#2F9E5C" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
    </svg>
  );
}

export function UniversityCampusIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Flag */}
      <path d="M14 2.5V5.5M14 2.5L18 4L14 5.5" stroke="#1f8a4c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tower Roof */}
      <path d="M11 9L14 6L17 9H11Z" fill="#1f8a4c" />
      {/* Tower Body */}
      <path d="M11.5 9H16.5V13.5H11.5V9Z" stroke="#1f8a4c" strokeWidth="1.6" />
      <circle cx="14" cy="11.2" r="1.1" fill="#1f8a4c" />
      {/* Left Wing */}
      <path d="M4 13.5L8 11.5L11.5 13.5V23.5H4V13.5Z" stroke="#1f8a4c" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Right Wing */}
      <path d="M24 13.5L20 11.5L16.5 13.5V23.5H24V13.5Z" stroke="#1f8a4c" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Center Body */}
      <path d="M11.5 13.5H16.5V23.5H11.5V13.5Z" stroke="#1f8a4c" strokeWidth="1.6" />
      {/* Door */}
      <path d="M12.5 23.5V19.5C12.5 18.7 13.2 18 14 18C14.8 18 15.5 18.7 15.5 19.5V23.5" fill="#1f8a4c" />
      {/* Windows */}
      <rect x="6.5" y="15.5" width="2" height="2" rx="0.4" fill="#1f8a4c" />
      <rect x="19.5" y="15.5" width="2" height="2" rx="0.4" fill="#1f8a4c" />
    </svg>
  );
}

export function ServiceDocIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 4H17L22 9V23C22 23.6 21.6 24 21 24H7C6.4 24 6 23.6 6 23V5C6 4.4 6.4 4 7 4Z" stroke="#0B63B5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 4V9H22" stroke="#0B63B5" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 13H18" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 17H18" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20.5H15" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ServicePencilIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 22L10 21L21.5 9.5C22.3 8.7 22.3 7.3 21.5 6.5L20.5 5.5C19.7 4.7 18.3 4.7 17.5 5.5L6 17L6 22Z" fill="#0B63B5" stroke="#0B63B5" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 7L20 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 22L9 19" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7" cy="21" r="0.8" fill="#ffffff" />
    </svg>
  );
}

export function ServiceCoinsIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="14" cy="7" rx="8" ry="3.2" fill="#2F9E5C" />
      <ellipse cx="14" cy="7" rx="6.2" ry="2.2" stroke="#ffffff" strokeWidth="0.9" />
      <path d="M6 8.5V13C6 14.8 9.6 16.2 14 16.2C18.4 16.2 22 14.8 22 13V8.5" fill="#2F9E5C" stroke="#2F9E5C" strokeWidth="1" />
      <path d="M6 13C6 14.8 9.6 16.2 14 16.2C18.4 16.2 22 14.8 22 13" stroke="#ffffff" strokeWidth="1.2" />
      <path d="M6 14.5V19C6 20.8 9.6 22.2 14 22.2C18.4 22.2 22 20.8 22 19V14.5" fill="#2F9E5C" stroke="#2F9E5C" strokeWidth="1" />
      <path d="M6 19C6 20.8 9.6 22.2 14 22.2C18.4 22.2 22 20.8 22 19" stroke="#ffffff" strokeWidth="1.2" />
    </svg>
  );
}

export function ServiceCompassIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="14" cy="14" r="10" stroke="#0B63B5" strokeWidth="2" />
      <circle cx="14" cy="14" r="2" fill="#0B63B5" />
      <path d="M14 6V8M14 20V22M6 14H8M20 14H22" stroke="#0B63B5" strokeWidth="1.8" strokeLinecap="round" />
      <polygon points="14,9 17.5,14 14,19 10.5,14" fill="#0B63B5" opacity="0.3" />
      <polygon points="14,9 17.5,14 14,14" fill="#0B63B5" />
      <polygon points="14,19 10.5,14 14,14" fill="#2A8FD6" />
    </svg>
  );
}

export function ServicePaletteIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14 4C8.48 4 4 8.25 4 13.5C4 16.81 5.79 19.67 8.5 21.25C9.09 21.6 9.5 22.22 9.5 22.9C9.5 23.78 10.22 24.5 11.1 24.5H13C19.07 24.5 24 19.57 24 13.5C24 8.25 19.52 4 14 4Z"
        stroke="#2F9E5C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="1.6" fill="#2F9E5C" />
      <circle cx="14" cy="8.5" r="1.6" fill="#0B63B5" />
      <circle cx="19" cy="11" r="1.6" fill="#eab308" />
      <circle cx="18.5" cy="16.5" r="1.6" fill="#ec4899" />
      <circle cx="14" cy="18" r="2.2" stroke="#2F9E5C" strokeWidth="1.4" />
    </svg>
  );
}

export function ServiceResearchIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Microscope / Research Icon */}
      <path d="M10 4.5H16.5" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
      <rect x="11.5" y="4.5" width="3.5" height="7.5" rx="1.2" fill="#0B63B5" />
      <path d="M8.5 12H18" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
      <path d="M13.2 12V15.5" stroke="#0B63B5" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M17.5 14C20 15 21.5 17.5 21.5 20.5V22.5H6.5V20.5C6.5 17.5 8 15 10.5 14"
        stroke="#0B63B5"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="5" y="22.5" width="18" height="2.5" rx="1.2" fill="#0B63B5" />
      <circle cx="13.2" cy="18.5" r="1.6" fill="#2A8FD6" />
      <path d="M20 7L22 9M22 7L20 9" stroke="#2F9E5C" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="21" cy="4" r="1.2" fill="#2F9E5C" />
    </svg>
  );
}

export function ServiceSparklesIcon({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14 3L16.2 10.8L24 13L16.2 15.2L14 23L11.8 15.2L4 13L11.8 10.8L14 3Z"
        fill="#0B63B5"
        stroke="#0B63B5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="6" r="1.8" fill="#2F9E5C" />
      <circle cx="6" cy="20" r="1.5" fill="#2A8FD6" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-4.5 h-4.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4.5 h-4.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function PinterestIcon({ className = "w-4.5 h-4.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4.5 h-4.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-4.5 h-4.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-4.5 h-4.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}



