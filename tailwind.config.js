/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#FFDE59',
        'neo-blue': '#5E17EB',
        'neo-pink': '#FF66C4',
        'neo-green': '#00F0FF',
        'neo-black': '#1a1a1a',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #000000',
        'hard-sm': '2px 2px 0px 0px #000000',
        'hard-lg': '8px 8px 0px 0px #000000',
      },
      fontFamily: {
        'mono': ['"Courier New"', 'Courier', 'monospace'],
        'sans': ['Arial', 'Helvetica', 'sans-serif']
      }
    },
  },
  plugins: [],
}
