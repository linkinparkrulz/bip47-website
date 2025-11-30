/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cypherpunk terminal colors
        'terminal-green': '#00ff41',
        'terminal-green-bright': '#00ff00',
        'terminal-amber': '#ffb000',
        'terminal-yellow': '#ffaa00',
        'matrix-green': '#0f0',
        'cyber-blue': '#00ffff',
        'cyber-purple': '#ff00ff',
        'cyber-red': '#ff0040',
        'dark-bg': '#0a0a0a',
        'darker-bg': '#050505',
        'terminal-black': '#000000',
        'terminal-gray': '#1a1a1a',
        'terminal-border': '#333333',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        'terminal': ['VT323', 'Courier New', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'glitch-slow': 'glitch 3s infinite',
        'scanlines': 'scanlines 8s linear infinite',
        'flicker': 'flicker 3s infinite',
        'pulse-cyber': 'pulse-cyber 2s infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'terminal-cursor': 'terminal-cursor 1s infinite',
        'text-glitch': 'text-glitch 0.3s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': {
            textShadow: '2px 2px 0 #ff0040, -2px -2px 0 #00ffff',
            transform: 'translate(0)',
          },
          '25%': {
            textShadow: '-2px 2px 0 #ff0040, 2px -2px 0 #00ffff',
            transform: 'translate(-2px, 2px)',
          },
          '50%': {
            textShadow: '2px -2px 0 #ff0040, -2px 2px 0 #00ffff',
            transform: 'translate(2px, -2px)',
          },
          '75%': {
            textShadow: '-2px -2px 0 #ff0040, 2px 2px 0 #00ffff',
            transform: 'translate(-2px, -2px)',
          },
        },
        scanlines: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.9' },
        },
        'pulse-cyber': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 255, 65, 0.8), 0 0 60px rgba(0, 255, 65, 0.5)',
          },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'terminal-cursor': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'text-glitch': {
          '0%, 100%': {
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
          '20%': {
            transform: 'translate(-1px, 1px)',
            filter: 'hue-rotate(90deg)',
          },
          '40%': {
            transform: 'translate(-1px, -1px)',
            filter: 'hue-rotate(180deg)',
          },
          '60%': {
            transform: 'translate(1px, 1px)',
            filter: 'hue-rotate(270deg)',
          },
          '80%': {
            transform: 'translate(1px, -1px)',
            filter: 'hue-rotate(360deg)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
        'terminal-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
        'matrix-bg': 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
        'scanline': 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)',
        'cyber-intense': '0 0 30px rgba(0, 255, 65, 0.8), 0 0 60px rgba(0, 255, 65, 0.5)',
        'glitch': '2px 2px 0 #ff0040, -2px -2px 0 #00ffff',
        'terminal': 'inset 0 0 20px rgba(0, 255, 65, 0.1)',
      },
      backdropBlur: {
        'cyber': '8px',
      },
    },
  },
  plugins: [],
}
