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
          50: '#f0f7ff',  // Lighter blue background
          100: '#e0eeff',  // Light blue background
          200: '#c7ddff',  // Hover states
          300: '#a4c4fc',  // Secondary elements
          400: '#7ba7ff',  // Primary elements
          500: '#5a84ff',  // Primary brand color
          600: '#4361e6',  // Buttons and accents
          700: '#3149c5',  // Hover states for buttons
          800: '#2a389a',  // Dark accents
          900: '#1c2562',  // Very dark accents
        },
        // Deep teal as secondary color for accent elements
        secondary: {
          50: '#eefcf9',
          100: '#d8f6f0',
          200: '#b4ede2',
          300: '#7edece',
          400: '#44c7b6',
          500: '#28a99a',
          600: '#1f8a7f',
          700: '#1d6f68',
          800: '#1c5954',
          900: '#1a4a46',
        },
        // Neutral grays for text and backgrounds
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'fadeIn': 'fadeIn 1s forwards',
        'slideIn': 'slideIn 1s forwards',
        'float': 'float 6s infinite ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { transform: 'translateX(-50px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
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
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'highlight': '0 0 15px rgba(90, 132, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'url("/hero-pattern.svg")',
        'dots-pattern': 'radial-gradient(circle, #5a84ff 1px, transparent 1px)',
        'primary-gradient': 'linear-gradient(135deg, #5a84ff 0%, #3149c5 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #44c7b6 0%, #1d6f68 100%)',
      },
      backgroundSize: {
        'dots-sm': '20px 20px',
        'dots-lg': '30px 30px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#5a84ff',
              '&:hover': {
                color: '#3149c5',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}