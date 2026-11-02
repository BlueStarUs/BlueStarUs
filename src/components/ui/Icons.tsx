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

