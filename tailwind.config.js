/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        DEFAULT: '2',
      },
      fontSize: {
        '5xl': ['3rem', {
          lineHeight: '3'
        }]
      }
    },
  },
  plugins: [],
};