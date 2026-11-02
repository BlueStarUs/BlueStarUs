import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A3D6B",
          dark: "#07466F",
        },
        brand: {
          navy: "#0A3D6B",
          darkNavy: "#07466F",
          blue: "#0B63B5",
          lightBlue: "#2A8FD6",
          sky: "#E8F3FC",
          bg: "#F3F8FD",
          text: "#4B5D70",
          heading: "#0A3D6B",
          green: "#E3F5EA",
          greenDark: "#2F9E5C",
          sparkGreen: "#4FC08D",
          border: "#DBE7F3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        heading: ["var(--font-jakarta)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 28px rgba(10, 61, 107, 0.08)",
        "card-hover": "0 14px 34px rgba(10, 61, 107, 0.13)",
        faq: "0 3px 10px rgba(10, 61, 107, 0.04)",
        menu: "0 12px 20px rgba(10, 61, 107, 0.08)",
      },
      borderRadius: {
        brand: "14px",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;

