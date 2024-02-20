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
      }
    }
  },
  plugins: []
}
