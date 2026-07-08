/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18202f",
        surface: "#f6f8fb",
        anker: "#2563eb",
        signal: "#0f766e",
        warning: "#b45309"
      },
      boxShadow: {
        panel: "0 14px 40px rgba(31, 41, 55, 0.08)"
      }
    },
  },
  plugins: [],
};
