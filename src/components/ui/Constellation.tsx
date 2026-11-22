import React from "react";

/**
 * Blue Stars brand motif: every student is their own star, and a personalized plan connects the points.
 * Purely decorative; use as a quiet background or as a replacement for generic photography.
 */
const PATTERNS: Array<{ points: [number, number][]; star: number }> = [
  { points: [[12, 70], [30, 44], [52, 56], [70, 26], [90, 38]], star: 3 },
  { points: [[10, 30], [32, 52], [46, 24], [68, 60], [88, 42]], star: 1 },
  { points: [[14, 58], [28, 28], [54, 40], [64, 72], [86, 50]], star: 2 },
  { points: [[8, 44], [34, 66], [50, 34], [74, 54], [92, 24]], star: 4 },
  { points: [[16, 26], [38, 46], [56, 20], [72, 62], [90, 70]], star: 0 },
  { points: [[10, 62], [26, 38], [48, 62], [66, 30], [88, 56]], star: 3 },
];

interface ConstellationProps extends React.SVGProps<SVGSVGElement> {
  /** Picks one of the preset patterns so neighbouring cards do not look identical. */
  variant?: number;
}

export function Constellation({ variant = 0, className = "w-full h-full", ...props }: ConstellationProps) {
  const { points, star } = PATTERNS[((variant % PATTERNS.length) + PATTERNS.length) % PATTERNS.length];
  const [sx, sy] = points[star];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        stroke="currentColor"
        strokeWidth="0.35"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
      />
      {points.map(([x, y], i) =>
        i === star ? null : <circle key={i} cx={x} cy={y} r="1.1" fill="currentColor" opacity="0.8" />
      )}
      {/* The brightest point is drawn as the Blue Stars four-point star */}
      <path
        transform={`translate(${sx} ${sy}) scale(0.62) translate(-12 -12)`}
        d="M12 0c.9 6 5 10.1 12 12-7 1.9-11.1 6-12 12-.9-6-5-10.1-12-12C7 10.1 11.1 6 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}
