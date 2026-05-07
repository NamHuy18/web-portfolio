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
        primary: "#F5EFE6",
        accent: "#8B5E3C",
        "accent-light": "#C9A279",
        "accent-muted": "#EDD9C5",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -2px rgba(139,94,60,0.10)",
        card: "0 2px 16px -1px rgba(0,0,0,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
