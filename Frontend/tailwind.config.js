/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sara: {
          ink: '#111111',
          cream: '#f2eee7',
          sand: '#e9e3d8',
          stone: '#6b6560',
          line: '#e4dfd6',
          brown: '#8a6a4f',
          dark: '#222120',
          blush: '#d9a38d',
          mist: '#e9e7e2',
        },
      },
      fontFamily: {
        // Tipografía de títulos: la misma de tu prototipo (Italiana).
        display: ['Italiana', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      // Escala tipográfica = valores por defecto de Tailwind − 2px.
      // Ajusta aquí si quieres títulos más pequeños o más grandes en todo el sitio.
      fontSize: {
        xs: ['11px', { lineHeight: '1rem' }],
        sm: ['12px', { lineHeight: '1.25rem' }],
        base: ['14px', { lineHeight: '1.5rem' }],
        lg: ['16px', { lineHeight: '1.75rem' }],
        xl: ['18px', { lineHeight: '1.75rem' }],
        '2xl': ['22px', { lineHeight: '2rem' }],
        '3xl': ['28px', { lineHeight: '2.25rem' }],
        '4xl': ['34px', { lineHeight: '2.5rem' }],
        '5xl': ['46px', { lineHeight: '1' }],
        '6xl': ['58px', { lineHeight: '1' }],
        '7xl': ['70px', { lineHeight: '1' }],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
    },
  },
  plugins: [],
};