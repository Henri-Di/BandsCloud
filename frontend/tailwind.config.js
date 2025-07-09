/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6600cc',
        secondary: '#7a3aff',
        accent: '#c4a7e7',
        dark: '#1e1e2f',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        cloudFloat: 'cloudFloat 20s ease-in-out infinite',
        waveMotion: 'waveMotion 60s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        cloudFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(10px)' },
        },
        waveMotion: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
