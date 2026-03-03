import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bebas)", "cursive"],
        mono: ["var(--font-share-tech)", "monospace"],
        body: ["var(--font-barlow)", "sans-serif"],
      },
      colors: {
        cs: {
          red: "#FF3B30",
          "red-dark": "#CC1A10",
          green: "#00FF87",
          bg: "#0A0A0A",
          surface: "#111111",
          card: "#181818",
          border: "#272727",
          muted: "#444444",
          text: "#E8E8E8",
          "text-muted": "#777777",
        },
      },
      keyframes: {
        fadeIn: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        bounceIn: { from: { opacity: "0", transform: "scale(0.6)" }, to: { opacity: "1", transform: "scale(1)" } },
        pulseRed: {
          "0%,100%": { boxShadow: "0 0 20px rgba(255,59,48,0.4), 0 0 40px rgba(255,59,48,0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(255,59,48,0.6), 0 0 100px rgba(255,59,48,0.3)" },
        },
        glitch: {
          "0%,100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px,1px)" },
          "40%": { transform: "translate(2px,-1px)" },
          "60%": { transform: "translate(-1px,2px)" },
          "80%": { transform: "translate(1px,-2px)" },
        },
        spinnerAnim: { to: { transform: "rotate(360deg)" } },
        resultPop: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "70%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease",
        bounceIn: "bounceIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275)",
        pulseRed: "pulseRed 2.5s ease infinite",
        glitch: "glitch 6s ease infinite",
        spinner: "spinnerAnim 0.8s linear infinite",
        resultPop: "resultPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
      },
    },
  },
  plugins: [],
};
export default config;
