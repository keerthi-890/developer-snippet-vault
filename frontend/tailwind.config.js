/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class names,
  // so it only includes the CSS we actually use in the final build.
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // A simple custom brand color we can reuse as bg-brand / text-brand
        brand: {
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
        },
      },
    },
  },
  plugins: [],
};
