/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#0a0c0f',
          secondary: '#0f1218',
          card:      '#131820',
          elevated:  '#1a2130',
          hover:     '#1e2840',
        },
        accent: {
          green:       '#00ff88',
          'green-dim': '#00cc6a',
          blue:        '#4d9fff',
          orange:      '#ff8c42',
          red:         '#ff4d6a',
          purple:      '#9b59ff',
        },
        text: {
          primary:   '#f0f4ff',
          secondary: '#8896b0',
          muted:     '#4a5568',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
        body:    ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-green':    '0 0 20px rgba(0,255,136,0.15)',
        'glow-green-sm': '0 0 10px rgba(0,255,136,0.1)',
        'card-hover':    '0 8px 30px rgba(0,0,0,0.5)',
      },
      keyframes: {
        fadeIn:      { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse:   {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0,255,136,0.8)' },
          '50%':      { boxShadow: '0 0 16px rgba(0,255,136,1), 0 0 30px rgba(0,255,136,0.4)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'ticker':     'ticker 25s linear infinite',
      },
    },
  },
  plugins: [],
};
