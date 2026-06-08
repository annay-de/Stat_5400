/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f8f5ee",
        surface: "#fffdfa",
        mist: "#eee8dc",
        ink: "#24221e",
        graphite: "#555047",
        brass: "#9c7a43",
        forest: "#245647",
        oxblood: "#783331",
        slateblue: "#586575"
      },
      fontFamily: {
        sans: ["Aptos", "Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Charter", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      boxShadow: {
        paper: "0 18px 45px rgba(56, 51, 43, 0.08)",
        soft: "0 8px 22px rgba(56, 51, 43, 0.06)"
      }
    }
  },
  plugins: [],
};
