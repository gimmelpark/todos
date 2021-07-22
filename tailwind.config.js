const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        completed: colors.green,
        uncompleted: colors.amber,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
