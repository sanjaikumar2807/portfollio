/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spaceDark: '#050505',
        neonCyan: '#00f3ff',
        neonPurple: '#bc13fe',
      },
    },
  },
  plugins: [],
}
