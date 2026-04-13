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
        bg: {
          0: "#03080F",
          1: "#0A1628",
          2: "#111D2E",
        },
        teal: {
          DEFAULT: "#00D4AA",
          dark: "#00B894",
        },
        blue: {
          DEFAULT: "#1A6FF5",
          dark: "#1557C0",
        },
        text: {
          0: "#F4F7FF",
          1: "#8FA3BC",
          2: "#4A6180",
        },
        card: "rgba(255,255,255,0.03)",
        "card-border": "rgba(255,255,255,0.06)",
        purple: "#6C5CE7",
        gold: "#F5A623",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "counter-glow": "counter-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "counter-glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(0, 212, 170, 0)" },
          "50%": { textShadow: "0 0 20px rgba(0, 212, 170, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
