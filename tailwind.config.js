/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Yahan hum deewar wala aesthetic color add kar rahe hain
      colors: {
        'calendar-paper': '#f4f1ea',
      }
    },
  },
  plugins: [],
}