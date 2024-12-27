/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#27ae60",
        secondary: "#eb5757",
        "gray-600": "#333333",
        "gray-400": "#bdbdbd",
        "gray-300": "#828282",
        "gray-100": "#e0e0e0",
        "gray-0": "#f5f5f5",
        gray: "#ffffff",
        green: "#27AE60",
      },
    },
  },
  plugins: [],
};
