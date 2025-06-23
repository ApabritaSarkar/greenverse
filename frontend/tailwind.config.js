/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/Dashboard.js",
    "./src/components/FeaturedPlants.js",
    "./src/components/Forum.js",
    "./src/components/Login.js",
    "./src/components/Modal.js",
    "./src/components/Navbar.js",
    "./src/components/Plants.js",
    "./src/components/Profile.js",
    "./src/components/Register.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "eco-green": "#38A169",
        "eco-blue": "#63B3ED",
        "eco-beige": "#F3EFE0",
        "eco-offwhite": "#F7FAFC",
        "eco-dark": "#2D3748",
        "eco-lightgreen": "#9AE6B4",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
