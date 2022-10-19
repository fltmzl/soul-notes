/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customDark: {
          50: "#202020",
          100: "#1a1a1a",
          200: "#161616",
        },
        customLight: {
          50: "#fafafa",
          100: "#eeeeee",
        },
        customGray: {
          50: "#909090",
          100: "#353535",
        },
        primary: {
          DEFAULT: "#7c4fff",
        },
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
