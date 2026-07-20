/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#161313",
        secondary: "#a8a29e",
        tertiary: "#241414",
        "black-100": "#120a0a",
        "black-200": "#080404",
        "white-100": "#fff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1a0808",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/herobg.webp')",
      },
    },
  },
  plugins: [],
};
