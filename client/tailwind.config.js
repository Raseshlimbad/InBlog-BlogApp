import flowbite from "flowbite-react/tailwind";
import scrollbar from "tailwind-scrollbar";
import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // './node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require("flowbite/tailwind"),
    flowbite.plugin(),
    scrollbar,
    lineClamp,
  ],
}