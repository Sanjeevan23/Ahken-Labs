/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C89",
        secondary: "#0F172A",
        gray: "#6B7280",
        white:"#FFFFFF",
      },
      fontSize: {
        xs: "10px",
        s: "12px",
        m: "14px",
        l: "16px",
        xl: "20px",
        xxl: "28px",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
      },
      borderRadius: {
        '24': '24px',
        '40': '40px'
      }
    },
  },
  plugins: [],
};
