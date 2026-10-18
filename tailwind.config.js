/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16233A",
        paper: "#FFF8E7",
        paper2: "#F1E8D6",
        gold: "#E8A838",
        gold2: "#F0C06D",
        sage: "#2D6A4F",
        rose: "#AD5C46",
        muted: "#5A6A83",
      },
      fontFamily: {
        heading: ["Tiro Bangla", "serif"],
        body: ["Hind Siliguri", "sans-serif"],
      },
      borderRadius: { card: "16px" },
      boxShadow: { card: "0 4px 20px rgba(22,35,58,0.06)", elevated: "0 12px 32px rgba(22,35,58,0.12)" }
    },
  },
  plugins: [],
}
