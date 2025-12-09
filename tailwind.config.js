/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-bg': '#E0E7FF',        // Background soft blue-ish (tidak sakit mata)
        'neo-yellow': '#FFDE59',    // Aksen Kuning
        'neo-blue': '#5471FF',      // Aksen Biru Modern
        'neo-green': '#00ED64',     // Aksen Hijau Neon tapi soft
        'neo-pink': '#FF66C4',      // Aksen Pink
        'neo-black': '#121212',     // Hitam pekat tapi soft
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #121212',      // Shadow standar
        'neo-sm': '2px 2px 0px 0px #121212',   // Shadow kecil untuk mobile
        'neo-lg': '6px 6px 0px 0px #121212',   // Shadow besar untuk card utama
      },
      translate: {
        'neo': '4px',
        'neo-sm': '2px',
      },
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'], // Font modern
        'mono': ['"JetBrains Mono"', 'monospace'], // Font coding keren
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
