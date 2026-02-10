import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "barrio-navy": "#1a3a52",
        "barrio-gray": "#666666",
        "barrio-blue": "#3ba9ff",
      },
    },
  },
  plugins: [],
};
export default config;
