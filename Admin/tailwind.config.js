/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        mukta : ['Mukta' , 'san-serif'],
        outfit : ['Outfit']
      },
    },
  },
  plugins: [],
}