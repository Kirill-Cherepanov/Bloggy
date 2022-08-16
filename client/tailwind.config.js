const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

// const getDarkColors = (color) => {
//   return Object.entries(color).filter((c) => Number(c[0]) >= 600);
// };

// const getLightColors = (color) => {
//   return Object.entries(color).filter((c) => Number(c[0]) <= 300);
// };

// const secondary = {
//   50: '#f2faf0',
//   100: '#eef5ef',
//   150: '#eaefeb',
//   200: '#e5eae7',
//   250: '#ccd9d2',
//   300: '#b0c7bf',
//   400: '#91b5af',
//   500: '#73a3a2',
//   600: '#558991',
//   700: '#3b6b80',
//   800: '#254d6e',
//   900: '#16315c'
// };

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
  plugins: [require('@tailwindcss/line-clamp')]
};
