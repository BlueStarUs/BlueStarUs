import React from "react";
import { BrandStar } from "@/components/ui/Icons";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-white">
      <div className="w-12 h-12 text-brand-blue animate-spin">
        <BrandStar className="w-full h-full" />
      </div>
      <p className="font-heading font-semibold text-xs tracking-wider uppercase text-brand-navy">
        Loading BlueStars Admissions...
      </p>
    </div>
  );
}

