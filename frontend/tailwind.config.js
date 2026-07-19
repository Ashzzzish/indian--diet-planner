/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF7F0",
        clay: "#C1633B",
        forest: "#2F4A3C",
        sand: "#E8DFCE",
        ink: "#231F1A",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(35, 31, 26, 0.06), 0 1px 2px rgba(35, 31, 26, 0.04)",
        card: "0 4px 16px rgba(35, 31, 26, 0.08), 0 1px 3px rgba(35, 31, 26, 0.06)",
        lifted: "0 8px 30px rgba(35, 31, 26, 0.12)",
      },
    },
  },
  plugins: [],
}