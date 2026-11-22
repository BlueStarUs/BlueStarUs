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
          DEFAULT: "#025269",
          dark: "#013B4C",
        },
        brand: {
          // Official 8-Color Palette
          teal: "#0199BB",       // RGB 1-153-187 (Cyan / Teal Blue)
          mint: "#8FD2C8",       // RGB 143-210-200 (Soft Mint / Aqua Ice)
          blue: "#1166B0",       // RGB 17-102-176 (Primary Brand Blue)
          navy: "#025269",       // RGB 2-82-105 (Deep Navy)
          darkNavy: "#013B4C",
          greenDark: "#7BC144",  // RGB 123-193-68 (Accent Green)
          lime: "#7BC144",
          sparkGreen: "#7BC144",
          slateTeal: "#65A1AC",  // RGB 101-161-172 (Slate Teal / Muted Blue)
          turquoise: "#2FBEBC",  // RGB 47-190-188 (Bright Turquoise)
          gray: "#646464",       // RGB 100-100-100 (Neutral Gray)
          text: "#646464",       // Gray for text, captions, tables
          heading: "#1166B0",    // Color for titles & headings (Brand Blue)

          // Semantic Theme Utilities
          lightBlue: "#0199BB",
          green: "#F0F8EC",      // Soft light green tint
          sky: "#EBF5F7",        // Luminous soft tint derived from #8FD2C8
          bg: "#F4F9FB",         // Neutral soft background
          border: "#D8EAEE",     // Harmonized border line
          ivory: "#FAF7F2",      // Boutique warm off-white background
          ink: "#12305A",        // Deep editorial navy for display headings
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        heading: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        display: ["Fraunces", "Georgia", "'Times New Roman'", "serif"],
        montserrat: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        jakarta: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        inter: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 28px rgba(2, 82, 105, 0.08)",
        "card-hover": "0 14px 34px rgba(2, 82, 105, 0.13)",
        faq: "0 3px 10px rgba(2, 82, 105, 0.04)",
        menu: "0 12px 20px rgba(2, 82, 105, 0.08)",
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

