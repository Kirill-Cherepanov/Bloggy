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
      transitionDuration: {
        3000: '3000ms'
      },
      flexGrow: {
        2: 2
      },
      colors: {
        main: colors.white,
        secondary: { ...colors.neutral, ...{ 1000: '#000000' } },
        accent: colors.pink
      },
      spacing: {
        100: '25rem'
      },
      fontFamily: {
        lexend: ["'Lexend'", 'sans-serif'],
        'space-mono': ["'Space Mono'", 'monospace'],
        sansita: 'Sansita Swashed, cursive'
      },
      translate: {
        screen: '100vw'
      },
      animation: {
        slide: 'slide 1.5s ease-out infinite'
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'rotate(-90deg) translate(0, 0)',
            opacity: 0
          },
          '50%': {
            opacity: 1
          },
          '100%': {
            transform: 'rotate(-90deg) translate(-25px, 0px)',
            opacity: 0
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
