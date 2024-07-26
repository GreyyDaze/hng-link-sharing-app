import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: {
          default: "#633CFF",
          light: "#BEADFF",
          lighter: "#EFEBFF",
        },
        gray: {
          dark: "#333333",
          default: "#737373",
          light: "#D9D9D9",
          lighter: "#FAFAFA",
        },
        white: "#FFFFFF",
        error: "#FF3939",
      },
      fontFamily: {
        sans: ["Instrument Sans"],
      },
      fontSize: {
        "heading-m": ["32px", { lineHeight: "150%", fontWeight: 700 }],
        "heading-s": ["16px", { lineHeight: "150%", fontWeight: 700 }],
        "body-m": ["16px", { lineHeight: "150%", fontWeight: 400 }],
        "body-s": ["12px", { lineHeight: "150%", fontWeight: 400 }],
      },
    },
  },
  plugins: [],
};

export default config;
