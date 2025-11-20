import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Dark Premium Color Palette
      colors: {
        // Dark backgrounds
        "dark": {
          "50": "#f8f8f8",
          "100": "#f0f0f0",
          "200": "#e0e0e0",
          "300": "#c0c0c0",
          "400": "#a0a0a0",
          "500": "#808080",
          "600": "#606060",
          "700": "#404040",
          "800": "#202020",
          "900": "#0f0f0f",
          "950": "#050505",
        },
        // Neon accent colors
        "neon": {
          "purple": "#e91e8c",
          "purple-light": "#ff33a1",
          "purple-dark": "#b01470",
          "lime": "#39ff14",
          "lime-light": "#6fff35",
          "lime-dark": "#2cc905",
          "cyan": "#00d9ff",
          "pink": "#ff006e",
          "electric": "#ff0080",
        },
        // Semantic colors
        "surface": {
          "primary": "#1a1a1a",
          "secondary": "#242424",
          "tertiary": "#2e2e2e",
        },
        "border": {
          "DEFAULT": "#333333",
          "light": "#404040",
          "dark": "#1a1a1a",
        },
      },

      // Typography Scale
      fontSize: {
        // Condensed Nike-like scale
        "xs": ["0.75rem", { lineHeight: "1rem" }],
        "sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.5rem" }],
        "lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["2rem", { lineHeight: "2.5rem" }],
        "4xl": ["2.5rem", { lineHeight: "3rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["4rem", { lineHeight: "4.5rem" }],
        "7xl": ["5rem", { lineHeight: "5.5rem" }],
        "8xl": ["6rem", { lineHeight: "6.5rem" }],
      },

      // Font Family
      fontFamily: {
        sans: ["var(--font-oswald)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      // Spacing Scale
      spacing: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "32": "8rem",
        "36": "9rem",
        "40": "10rem",
        "44": "11rem",
        "48": "12rem",
        "52": "13rem",
        "56": "14rem",
        "60": "15rem",
        "64": "16rem",
        "72": "18rem",
        "80": "20rem",
        "96": "24rem",
      },

      // 3D Depth Shadows
      boxShadow: {
        "none": "none",
        "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        // 3D Depth Effects
        "depth-sm": "0 2px 4px 0 rgb(0 0 0 / 0.2)",
        "depth-md": "0 8px 16px 0 rgb(0 0 0 / 0.2), inset 0 1px 0 0 rgb(255 255 255 / 0.1)",
        "depth-lg": "0 15px 35px 0 rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.1)",
        "depth-xl": "0 25px 50px 0 rgb(0 0 0 / 0.4), inset 0 1px 0 0 rgb(255 255 255 / 0.1)",
        // Neon Glow Effects
        "neon-purple": "0 0 10px rgb(233 30 140 / 0.8), 0 0 20px rgb(233 30 140 / 0.4)",
        "neon-lime": "0 0 10px rgb(57 255 20 / 0.8), 0 0 20px rgb(57 255 20 / 0.4)",
        "neon-cyan": "0 0 10px rgb(0 217 255 / 0.8), 0 0 20px rgb(0 217 255 / 0.4)",
      },

      // Gradients
      backgroundImage: {
        "gradient-neon-purple": "linear-gradient(135deg, #e91e8c 0%, #ff33a1 100%)",
        "gradient-neon-lime": "linear-gradient(135deg, #39ff14 0%, #6fff35 100%)",
        "gradient-dark-premium": "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)",
        "gradient-glow-purple": "radial-gradient(circle, rgba(233, 30, 140, 0.3) 0%, rgba(233, 30, 140, 0) 70%)",
        "gradient-glow-lime": "radial-gradient(circle, rgba(57, 255, 20, 0.3) 0%, rgba(57, 255, 20, 0) 70%)",
      },

      // Border Radius
      borderRadius: {
        "none": "0",
        "sm": "0.125rem",
        "DEFAULT": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px",
      },

      // Transitions
      transitionDuration: {
        "DEFAULT": "150ms",
        "75": "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },

      // Animation
      animation: {
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },

      keyframes: {
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px currentColor" },
          "50%": { boxShadow: "0 0 20px currentColor" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      // Container queries
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },

      // Opacity scale
      opacity: {
        "0": "0",
        "5": "0.05",
        "10": "0.1",
        "20": "0.2",
        "25": "0.25",
        "30": "0.3",
        "40": "0.4",
        "50": "0.5",
        "60": "0.6",
        "70": "0.7",
        "75": "0.75",
        "80": "0.8",
        "90": "0.9",
        "95": "0.95",
        "100": "1",
      },

      // Z-index scale
      zIndex: {
        "auto": "auto",
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },

      // Aspect ratio
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
        "4/3": "4 / 3",
        "21/9": "21 / 9",
      },

      // Min/Max Width
      minWidth: {
        "0": "0",
        "full": "100%",
        "min": "min-content",
        "max": "max-content",
        "fit": "fit-content",
      },

      maxWidth: {
        "none": "none",
        "full": "100%",
        "screen": "100vw",
        "min": "min-content",
        "max": "max-content",
        "fit": "fit-content",
        "xs": "20rem",
        "sm": "24rem",
        "md": "28rem",
        "lg": "32rem",
        "xl": "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
