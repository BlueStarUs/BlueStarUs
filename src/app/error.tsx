"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Blue Stars Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-brand-bg">
      <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 grid place-items-center mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h2 className="text-2xl font-bold font-heading text-brand-navy mb-2">
        Something Went Wrong
      </h2>
      <p className="text-sm text-brand-text max-w-md mb-6 leading-relaxed">
        We encountered an unexpected error while loading this page. Please try refreshing or return to the homepage.
      </p>
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => reset()}>
          <RefreshCw className="w-4 h-4 mr-1.5" />
          <span>Try Again</span>
        </Button>
        <Button variant="outline" href="/">
          Return Home
        </Button>
      </div>
    </div>
  );
}

