/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        brownRosy: "#C2948A",
        whitePowder: '#ebf1f5',
        blackCoffe: '#352D39',
        greenDarkSpring: '#04724D',
        blackRich: '#121619',
        blueDeep: '#4F7DAB'

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
