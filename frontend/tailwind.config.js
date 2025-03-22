/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#d9e2ff',
          200: '#b3c6ff',
          300: '#809fff',
          400: '#5a67d8', // Primary brand color
          500: '#4c51bf',
          600: '#3c366b',
          700: '#312e59',
          800: '#1e1b4b',
          900: '#0f0d35',
        },
        secondary: {
          // Accent colors
          DEFAULT: '#4ca1af',
        },
        dark: {
          // Dark mode colors
          100: '#d1d5db',
          900: '#0a0a0a',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Arial', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
}