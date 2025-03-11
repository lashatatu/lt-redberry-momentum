/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        root: '62.5%'
      },
      fontFamily: {
        firago: ['FiraGO', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

