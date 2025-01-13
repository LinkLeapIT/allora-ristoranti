const defaultTheme = require('tailwindcss/defaultTheme');
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1400px",
        contentContainer: "1200px",
      },
      fontFamily: {
        bodyFont: ["Edu TAS Beginner", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
      colors: {
        yellow: "#f6e4a0",
        green: "#8c9569",
        orange: "#f28f00",
        hoverBg: "#f7d38f",
        lightText: "#46474a",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        bannerShadow: "0 1px 2px 1px #00000026",
      },
    },
  },
  plugins: [],
};

export default config;
