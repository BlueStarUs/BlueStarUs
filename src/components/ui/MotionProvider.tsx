"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

/**
 * Calmer motion site-wide: sections still fade in gently, but slide-ups, lifts
 * and hover scaling are switched off so pages feel settled rather than busy.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
}
