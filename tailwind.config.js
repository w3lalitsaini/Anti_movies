/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e50914", // Netflix red
        secondary: "#1a1a1a",
        dark: "#0a0a0a",
        accent: "#ffcc00",
      },
    },
  },
  plugins: [],
}
