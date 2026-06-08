/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#030304",
        surface: "#0d0b12",
        mist: "#171421",
        ink: "#f4f0ff",
        graphite: "#aaa3ba",
        brass: "#cbb9ff",
        forest: "#bfa8ff",
        oxblood: "#ff9ab0",
        slateblue: "#a996ff",
        ocean: "#c7b7ff",
        teal: "#9a84ff",
        honey: "#e7d7ff",
        blush: "#f4a5bd",
        sage: "#171223",
        lavender: "#21182f"
      },
      fontFamily: {
        sans: ["Source Sans 3", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Source Sans 3", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        paper: "0 18px 54px rgba(0, 0, 0, 0.46)",
        soft: "0 12px 30px rgba(0, 0, 0, 0.34)",
        colour: "0 18px 44px rgba(154, 132, 255, 0.18)"
      },
      backgroundImage: {
        "accent-hero": "linear-gradient(135deg, #171024 0%, #261838 52%, #39225a 100%)",
        "glass-panel": "linear-gradient(145deg, rgba(18, 15, 27, 0.9), rgba(8, 7, 12, 0.86))",
        "quiet-band": "linear-gradient(135deg, rgba(25, 18, 40, 0.7), rgba(65, 42, 104, 0.22))"
      }
    }
  },
  plugins: [],
};
