/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
    },
  },
  important: true,
  plugins: [],
}
