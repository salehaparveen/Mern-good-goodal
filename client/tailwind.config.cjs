/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgcolor: "#F6F4E8",
        bgcolor2: "#FCFCFF",
        bgcolor3: "#E6E7EB",
        primary: "#191718",
        secondary: "#2D3E4E",
        all: "#3f3e36",
        all2: "#535144",
        green_tangerine: "#615d0d",
        green_tangerine2: "#6b660f",
        apple_aha: "#dd434b",
        apple_aha2: "#E8545C",
        heart_leaf: "#9c9a0d",
        heart_leaf2: "#aaa80f",
        apricot_collagen: "#c5602d",
        apricot_collagen2: "#d46933",
      },
      fontFamily: {
        urbanist: "Urbanist",
        gotu: "Gotu",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
