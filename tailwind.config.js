/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#080a0f",
        surface: "#111827",
        mist: "#1b2433",
        ink: "#f5f7fb",
        graphite: "#aeb7c6",
        brass: "#e2b76d",
        forest: "#5fd0b1",
        oxblood: "#ef7f8e",
        slateblue: "#9eb7ff",
        ocean: "#7dc7ef",
        teal: "#64d7c2",
        honey: "#f0bf63",
        blush: "#f29aaa",
        sage: "#1d332f",
        lavender: "#222640"
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Poppins", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        paper: "0 24px 70px rgba(0, 0, 0, 0.42)",
        soft: "0 14px 34px rgba(0, 0, 0, 0.28)",
        colour: "0 18px 44px rgba(95, 208, 177, 0.16)"
      },
      backgroundImage: {
        "accent-hero": "linear-gradient(135deg, #14213d 0%, #164e63 46%, #0f766e 100%)",
        "glass-panel": "linear-gradient(145deg, rgba(17, 24, 39, 0.94), rgba(11, 18, 32, 0.86))",
        "quiet-band": "linear-gradient(135deg, rgba(20, 33, 61, 0.72), rgba(15, 118, 110, 0.22))"
      }
    }
  },
  plugins: [],
};
