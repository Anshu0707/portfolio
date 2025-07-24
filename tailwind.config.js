/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        accent: {
          50: "#eefbff",
          100: "#d9f4ff",
          200: "#bceaff",
          300: "#8edeff",
          400: "#57cbff",
          500: "#33aeff",
          600: "#1e8df5",
          700: "#1e72e3",
          800: "#1d5db8",
          900: "#1e4d90",
          950: "#162e55",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 4px 25px rgba(0, 0, 0, 0.07)",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        aurora: {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(180deg)" },
          "100%": { transform: "translateY(0) rotate(360deg)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        aurora: "aurora 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
