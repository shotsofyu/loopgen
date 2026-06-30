/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        loop: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          400: '#6b8cff',
          500: '#4f6ef7',
          600: '#3a55e8',
          900: '#1a1f3c',
        },
        ink: {
          DEFAULT: '#0f0f12',
          muted: '#6b6b7a',
          subtle: '#9999aa',
        }
      }
    },
  },
  plugins: [],
}
