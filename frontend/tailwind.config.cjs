/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      },
      fontFamily: {
        tangerine: ["Tangerine", "cursive"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
