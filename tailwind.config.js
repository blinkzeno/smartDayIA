/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
     extend: {
      colors: {
        primary: "#a70bfa", // vibrant but soft lavender
        "background-light": "#f8f9fa",
        "background-dark": "#161022",
        "card-light": "#ffffff", 
        "card-dark": "#1e1b29",
        "text-light": "#212529",
        "text-dark": "#e0e0e0",
        "subtext-light": "#6c757d",
        "subtext-dark": "#a0a0a0",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"]
      },
      borderRadius: {
        'DEFAULT': '1rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
      boxShadow: {
        'soft-light': '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'soft-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
