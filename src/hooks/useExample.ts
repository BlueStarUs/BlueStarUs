"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * Example custom hook demonstrating client-side state management.
 */
export function useExample<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  return {
    value,
    setValue,
  };
}

/**
 * Hook to detect if a specific media query matches (e.g. mobile viewport).
 * Uses React's useSyncExternalStore for hydration safety without cascading re-renders.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
