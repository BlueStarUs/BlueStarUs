import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandStar } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-brand-bg">
      <div className="w-16 h-16 text-brand-blue mb-4">
        <BrandStar className="w-full h-full text-brand-blue" />
      </div>
      <span className="text-sm font-bold tracking-widest uppercase text-brand-blue font-heading mb-1">
        404 Error
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-brand-text max-w-md mb-8 leading-relaxed">
        The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s guide you back to the right path.
      </p>
      <Button variant="primary" size="md" href="/">
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        <span>Back to Homepage</span>
      </Button>
    </div>
  );
}

