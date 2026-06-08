/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f2e8",
        ink: "#25221d",
        graphite: "#3f3b35",
        brass: "#a47c39",
        forest: "#1f5a4a",
        oxblood: "#7f312f",
        slateblue: "#53606f"
      },
      fontFamily: {
        sans: ["Inter", "Aptos", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
      },
      boxShadow: {
        paper: "0 12px 30px rgba(63, 59, 53, 0.10)"
      }
    }
  },
  plugins: [],
};
