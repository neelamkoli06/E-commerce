import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",


         // Custom Colors
         lightGreen: "#222F3D", // Light green
         paleGreen: "#b8d2b3",  // Pale green
         mossGreen: "#a9c5a0",  // Moss green
         SageGreen:"#647a67",
         dark:"#0E1111",
         greenlildark:"#b8d2b3",
         darker:"#020402", //similar to black
         grey:"#3c433b" //grey

      },
    },
  },
  plugins: [],
};
export default config;
