/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       blue: {
        500: '#402a99',
        400: '#5e22dd'
       }
      }
    },
  },
  plugins: [],
}

