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
        /* Core brand palette from crawled CSS :root variables */
        primary: {
          DEFAULT: "#25C760",
          light: "#2ed86e",
          dark: "#1ea34e",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#3C8063",
          light: "#4a9a78",
          dark: "#2e6650",
        },
        background: {
          DEFAULT: "#000000",
          card: "#131217",
          "card-alt": "#1C2524",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
          muted: "rgba(255, 255, 255, 0.9)",
          subtle: "rgba(255, 255, 255, 0.7)",
        },
        danger: "#dc3545",
        gold: "#FFD700",
        link: "#00b7ff",
        footer: {
          bg: "#e9e9e9",
          text: "#1a2323",
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        gilroy: ["Gilroy", "Arial", "sans-serif"],
        "gilroy-bold": ["Gilroy-bold", "Arial", "sans-serif"],
        ubuntu: ["Ubuntu", "Arial", "sans-serif"],
        "ubuntu-medium": ["Ubuntu-medium", "Arial", "sans-serif"],
        "ubuntu-bold": ["Ubuntu-bold", "Arial", "sans-serif"],
        opensans: ["OpenSans", "Arial", "sans-serif"],
        "opensans-semibold": ["OpenSans-semibold", "Arial", "sans-serif"],
        "opensans-bold": ["OpenSans-bold", "Arial", "sans-serif"],
        "opensans-light": ["OpenSans-light", "Arial", "sans-serif"],
        "opensans-extrabold": ["OpenSans-extraBold", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        pill: "50px",
      },
      maxWidth: {
        container: "1500px",
        content: "1400px",
        "content-narrow": "1200px",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(37, 199, 96, 0.5)",
        "glow-md": "0 0 20px rgba(37, 199, 96, 0.5)",
        "glow-lg": "0 0 40px rgba(37, 199, 96, 0.3)",
        "card-hover": "0 15px 40px rgba(37, 199, 96, 0.2)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(90deg, #25C760, #3C8063, #25C760)",
        "gradient-scrollbar":
          "linear-gradient(180deg, #25C760, #3C8063)",
      },
    },
  },
  plugins: [],
};

export default config;
