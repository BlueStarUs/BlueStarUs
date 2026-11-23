import React from "react";

/**
 * A stylised constellation of where Blue Stars families are. Positions are schematic (not a geographic projection):
 * west to east along a single path, so it reads as a "star map" in the brand style.
 * `above` puts the label over the point so neighbouring labels never collide.
 */
const PLACES = [
  { name: "Bay Area", x: 11, y: 33, home: true, above: false },
  { name: "New York", x: 27, y: 21, above: true },
  { name: "Europe", x: 44, y: 30, above: false },
  { name: "Middle East", x: 58, y: 19, above: true },
  { name: "Chengdu", x: 72, y: 31, above: false },
  { name: "Shanghai", x: 84, y: 21, above: true },
  { name: "Tokyo", x: 92, y: 33, above: false },
];

const STAR = "M12 0c.9 6 5 10.1 12 12-7 1.9-11.1 6-12 12-.9-6-5-10.1-12-12C7 10.1 11.1 6 12 0z";

export function ReachMap() {
  return (
    <div className="relative overflow-hidden rounded-[6px] bg-gradient-to-br from-brand-ink via-[#0d4a86] to-brand-blue p-5 sm:p-7 shadow-[0_1px_3px_rgba(18,48,90,0.05)]">
      <svg
        viewBox="0 0 100 50"
        className="w-full h-auto text-white"
        role="img"
        aria-label="Constellation linking the San Francisco Bay Area to New York, Europe, the Middle East, Chengdu, Shanghai and Tokyo"
      >
        <polyline
          points={PLACES.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="0.9 1"
          opacity="0.6"
        />

        {PLACES.map((p) => (
          <g key={p.name}>
            {p.home ? (
              <path
                transform={`translate(${p.x} ${p.y}) scale(0.5) translate(-12 -12)`}
                d={STAR}
                fill="#8FD2C8"
              />
            ) : (
              <circle cx={p.x} cy={p.y} r="1" fill="currentColor" />
            )}
            <text
              x={p.x}
              y={p.above ? p.y - 3.4 : p.y + (p.home ? 7.6 : 5.4)}
              textAnchor="middle"
              fontSize="2.9"
              fill="currentColor"
              opacity={p.home ? 1 : 0.85}
              fontWeight={p.home ? 700 : 500}
            >
              {p.name}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-mint">
        One counselor. Every time zone.
      </p>
    </div>
  );
}
