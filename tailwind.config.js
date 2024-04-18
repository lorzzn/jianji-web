/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-3d")({ legacy: true }),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true, preferredStrategy: "pseudoelements" }),
  ],
}
