/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
          200: '#d0daa6',
          300: '#becc8a',
          400: '#a5b764',
          500: '#879b47',
          600: '#697b35',
          700: '#515f2c',
          800: '#424d27',
          900: '#3a4225',
          950: '#1d2310'
        },
        deadgreen: {
          50: '#f6f8f5',
          100: '#eaefe9',
          200: '#d6dfd3',
          300: '#b5c4b1',
          400: '#8ca286',
          500: '#6a8364',
          600: '#546a4f',
          700: '#455541',
          800: '#394536',
          900: '#30392e',
          950: '#171d16'
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
}
