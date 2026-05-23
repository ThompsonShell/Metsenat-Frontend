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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#4461F2",
          light: "#EEF0FF",
          dark: "#2D47D0",
          50: "#f0f3ff",
          100: "#e0e7ff",
        },
        page: "#F5F6FA",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 4px 0 rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
