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
      flexGrow: {
        2: 2
      },
      colors: {
        main: colors.white, // mybe should change
        dark: colors.stone['800'], // should change
        accent: colors.blue // should change
      },
      spacing: {
        100: '25rem'
      },
      fontFamily: {
        lexend: ["'Lexend'", 'sans-serif'],
        'space-mono': ["'Space Mono'", 'monospace']
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
  plugins: []
};
