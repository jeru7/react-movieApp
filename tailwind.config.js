/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        highlight1: 'var(--color-highlight1)',
        highlight2: 'var(--color-highlight2)',
        whiteText: 'var(--color-white-text)',
        muted: 'var(--color-muted)',
        error: 'var(--color-error)',
      },
      backgroundImage: {
        'custom-gradient': 'var(--color-gradient)',
      },
    },
  },
  plugins: [],
}
