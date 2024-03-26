/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      height: {
        svh: '100svh'
      },
      content: {
        null: "''"
      },
      boxShadow: {
        up: '0 -10px 20px -3px rgb(0 0 0 / 0.03), 0 -4px 8px -4px rgb(0 0 0 / 0.03)'
      },
      colors: {
        doublemint: {
          50: '#f7f8ed',
          100: '#ebefd8',
          200: '#d2dca9',
          300: '#becd89',
          400: '#a5b863',
          500: '#879c46',
          600: '#697c34',
          700: '#515f2c',
          800: '#424d27',
          900: '#3a4324',
          950: '#1d2310'
        },
        deadgreen: {
          50: '#f3f6f3',
          100: '#e5e9e2',
          200: '#cbd3c7',
          300: '#a5b4a1',
          400: '#7c8f78',
          500: '#5b7158',
          600: '#4d624a',
          700: '#374735',
          800: '#2e392c',
          900: '#252f25',
          950: '#141a14'
        },
        inlay: {
          50: '#fbf7ef',
          100: '#f2ead3',
          200: '#e6d6a8',
          300: '#d7b972',
          400: '#cda452',
          500: '#c3893d',
          600: '#ac6d33',
          700: '#8f522e',
          800: '#76432a',
          900: '#623725',
          950: '#371c11'
        }
      }
    }
  },
  plugins: []
};
