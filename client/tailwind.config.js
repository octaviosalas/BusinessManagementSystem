/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
import daisyui from 'daisyui';
import formsPlugin from '@tailwindcss/forms';




export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      "2xs": "1px",
      'xxxs': '360px',
      'xxs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1700px',
    },   
    extend: {
      boxShadow: {
        'left-right': '-4px 0 6px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [nextui(), daisyui,  formsPlugin]
};

