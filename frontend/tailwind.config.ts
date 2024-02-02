import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      fontFamily: {
        Merriweather: ["Merriweather Sans", "sans-serif"],
      },
      // good
      boxShadow: {
        card: "0px 10px 20px rgba(196, 200, 208, 0.40)",
      },
      fontSize: {
        xxs: "8px",
        xs: "10px",
        sm: "12px",
        xsm: "14px",
        base: "16px",
        lg: "18px",
        xlg: "22px",
        xl: "24px",
        "2xl": "28px",
        "3xl": "32px",
        "4xl": "36px",
      },
      backgroundColor: {
        primary: "#FFFFFF", // blanc
        secondary: "#FAFAFA", // gris/blanc
        accent: "#525252", // dark
        destructive: "#de392a", // rouge
      },
      colors: {
        primary: "#525252",
        secondary: "",
        accent: "",
        destructive: "#de392a",
        statusGood: "#AACB58", // not a good practice more general
      },
      // not good
      keyframes: {
        translatingUp: {
          "0%": { transform: "translateY(10%)" },
          "100%": { transform: "translateY(0%)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "translate-up": "translatingUp 0.5s linear 1",
        loading: "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
