import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: 'rgb(248 250 252)',
          100: 'rgb(241 245 249)',
          200: 'rgb(226 232 240)',
          300: 'rgb(203 213 225)',
          400: 'rgb(148 163 184)',
          500: 'rgb(100 116 139)',
          600: 'rgb(71 85 105)',
          700: 'rgb(51 65 85)',
          800: 'rgb(30 41 59)',
          900: 'rgb(15 23 42)',
        },
        // Accent colors
        accent: {
          50: 'rgb(254 247 240)',
          100: 'rgb(254 236 220)',
          200: 'rgb(252 217 189)',
          300: 'rgb(253 186 140)',
          400: 'rgb(255 138 76)',
          500: 'rgb(255 90 31)',
          600: 'rgb(208 56 1)',
          700: 'rgb(185 28 28)',
          800: 'rgb(153 27 27)',
          900: 'rgb(127 29 29)',
        },
        // Neutral colors
        neutral: {
          50: 'rgb(250 250 250)',
          100: 'rgb(245 245 245)',
          200: 'rgb(229 229 229)',
          300: 'rgb(212 212 212)',
          400: 'rgb(163 163 163)',
          500: 'rgb(115 115 115)',
          600: 'rgb(82 82 82)',
          700: 'rgb(64 64 64)',
          800: 'rgb(38 38 38)',
          900: 'rgb(23 23 23)',
        },
        // Semantic colors
        success: 'rgb(16 185 129)',
        warning: 'rgb(245 158 11)',
        error: 'rgb(239 68 68)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-up': 'scaleUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      aspectRatio: {
        'product': '1 / 1',
      },
    },
  },
  plugins: [],
} satisfies Config;