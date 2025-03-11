/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      animation: {
        glow: 'pulse 1.5s infinite alternate',
        borderGlow: 'borderShine 3s infinite linear',
        pulseSlow: 'pulseSlow 2s infinite alternate',
      },
      fontFamily: {
        lexend: ['Lexend Deca', 'sans-serif']
      },
      keyframes: {
        pulse: {
          '0%': { boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 255, 1)' },
        },
        borderShine: {
          '0%': { borderImageSource: 'linear-gradient(45deg, cyan, blue, purple, cyan)' },
          '100%': { borderImageSource: 'linear-gradient(45deg, purple, cyan, blue, purple)' },
        },
        pulseSlow: {
          '0%': { opacity: '0.2', transform: 'scale(1)' },
          '100%': { opacity: '0.8', transform: 'scale(1.2)' },
        },
      },
    },
  },
  darkMode: 'class', // Habilita el modo oscuro basado en clases
  plugins: [],
};
