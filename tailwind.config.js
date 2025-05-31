/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Обновите пути, на основе структуры вашего проекта
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      fontSize: {
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "3.5rem",
      },
      colors: {
        gold: "#ceb27a",
        grafit: "#454d4f",
        cgreen: "#27886c",
        "light-rose": "#fbf6f3",
        beige: "#fbf6f3",
      },
    },
  },
  plugins: [],
};

export default config;
