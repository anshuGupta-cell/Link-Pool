module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",

        },
        ".scrollbar-none::-webkit-scrollbar": {
          "display": "grid",
          "background": "black"
        },
        ".res-grid": {
          "grid-template-columns": "repeat(auto-fit, minmax(280, 1fr))"
        }
      })
    }
  ],
}