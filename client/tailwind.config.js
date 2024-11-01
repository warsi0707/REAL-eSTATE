/** @type {import('tailwindcss').Config} */
// const { nextui } = require("@nextui-org/react");
import { nextui } from '@nextui-org/react';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    
    extend: {
      screen: {
        "sm": "700px",
        "md":"768px",
        "lg":"1024px"
        
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

