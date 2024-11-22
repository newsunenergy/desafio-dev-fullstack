import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0A20",
        foreground: "#F2F2F2",
        boxColor: "#2A273A",
        border: "#2C2B3C",
        textInput: "#2C2B3C",
      },
    },
  },
  plugins: [],
} satisfies Config;
