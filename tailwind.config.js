/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueBgMain: "#023b96",
        blueBgMainSm: "#022053",
        flightResultsBg: "#f7f9fb",
        goldRating: "#E8B644",
        flightPrices: "#FAFAFB",
        detailsText: "#163668",
      },
    },
  },
  plugins: [],
};
