/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f2e8",
        surface: "#fffaf1",
        mist: "#e9dfce",
        ink: "#222538",
        graphite: "#5d6270",
        brass: "#b9842f",
        forest: "#1c735f",
        oxblood: "#a6424d",
        slateblue: "#536f9f",
        ocean: "#256f8f",
        teal: "#16816c",
        honey: "#d89b38",
        blush: "#b95f68",
        sage: "#dce9df",
        lavender: "#e4e1f4"
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Montserrat", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        paper: "0 20px 55px rgba(34, 37, 56, 0.10)",
        soft: "0 10px 26px rgba(34, 37, 56, 0.08)",
        colour: "0 18px 42px rgba(37, 111, 143, 0.16)"
      },
      backgroundImage: {
        "accent-hero": "linear-gradient(135deg, #24345f 0%, #16816c 52%, #d89b38 100%)",
        "glass-panel": "linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(255, 250, 241, 0.72) 48%, rgba(232, 247, 243, 0.76) 100%)",
        "quiet-band": "linear-gradient(135deg, rgba(37, 111, 143, 0.10), rgba(216, 155, 56, 0.08) 55%, rgba(185, 95, 104, 0.09))"
      }
    }
  },
  plugins: [],
};
