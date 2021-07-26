const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/*.vue',
    './pages/**/*.vue',
  ],
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
