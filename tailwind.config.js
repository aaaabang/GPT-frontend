/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#93c5fd",
          400: "#60a5fa",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
