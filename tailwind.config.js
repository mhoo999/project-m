/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 줄이 꼭 있어야 해요!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
