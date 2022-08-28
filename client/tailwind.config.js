const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    },
    extend: {
      scale: {
        103: '1.03'
      },
      transitionDuration: {
        3000: '3000ms'
      },
      flexGrow: {
        2: 2
      },
      colors: {
        main: colors.white,
        secondary: { ...colors.neutral, ...{ 1000: '#000000' } },
        accent: colors.violet
      },
      spacing: {
        100: '25rem'
      },
      fontFamily: {
        lexend: ["'Lexend'", 'sans-serif'],
        display: ["'Montserrat'", 'sans-serif'],
        sansita: 'Sansita Swashed, cursive'
      },
      translate: {
        screen: '100vw'
      },
      animation: {
        slide: 'slide 5s linear infinite',
        'slow-ping': 'two-way-ping 10s linear infinite'
      },
      keyframes: {
        'two-way-ping': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: 1
          },
          '50%': {
            transform: 'scale(1.5)',
            opacity: 0
          }
        },
        slide: {
          '0%': {
            transform: 'translate(0, 0)',
            opacity: 1
          },
          '100%': {
            transform: 'translate(0, 200px)',
            opacity: 0
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
