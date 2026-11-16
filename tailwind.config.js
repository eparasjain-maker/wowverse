/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f1efeb',
        foreground: '#0e0e0e',
        ink: '#0e0e0e',
        bone: '#f1efeb',
        footer: '#b8d4e8',
        'footer-foreground': '#0e0e0e',
        electric: '#0e0e0e',
        surface: {
          DEFAULT: '#ffffff',
          light: '#f7f6f3',
          border: 'rgba(14, 14, 14, 0.1)',
          hover: '#eae7e1',
        },
        panel: {
          blue: '#b8d4e8',
          rose: '#b692a1',
          sage: '#798e7b',
          apricot: '#a89a9a',
        },
        ivory: {
          DEFAULT: '#f1efeb',
          muted: '#c4c8cb',
          dim: '#858b90',
        },
        muted: {
          DEFAULT: '#dfe5e8',
          foreground: '#494e52',
        },
        royal: {
          maroon: '#6E1118',
          sindoor: '#8B1720',
          velvet: '#4A0B10',
          crimson: '#9B1D27',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#EED688',
          pale: '#FAF0CD',
          dark: '#AA821E',
          glow: 'rgba(212, 175, 55, 0.28)',
          subtle: 'rgba(212, 175, 55, 0.1)',
        },
        marigold: {
          DEFAULT: '#E68A00',
          light: '#F59E0B',
          haldi: '#FBBF24',
        },
        wow: {
          DEFAULT: '#FF4D00',
          hover: '#FF641E',
          glow: 'rgba(255, 77, 0, 0.3)',
        }
      },
      fontFamily: {
        wordmark: ['Voklea', 'Fredoka', 'sans-serif'],
        display: ['Avinga', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['Avinga', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        royal: ['Avinga', '"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      aspectRatio: {
        'reel': '9 / 16',
        'cinema': '21 / 9',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.25em',
        ultra: '0.35em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'shimmer': 'shimmer 4s infinite linear',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
