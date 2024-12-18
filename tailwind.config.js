/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // ++++++
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }
      //電腦

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }
      //平板

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'xs': { 'max': "425px" },
      // => @media (max-width: 425px) { ... }

      "2xs": { 'max': "375px" },
      // => @media (max-width: 375px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

