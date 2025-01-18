/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sysco-blue': '#0066CC',
        'sysco-dark': '#111111',
        'sysco-card': '#1A1A1A',
        'sysco-input': '#222222',
      },
      boxShadow: {
        'sysco-glow': '0 0 20px rgba(0, 102, 204, 0.15)',
        'sysco-glow-strong': '0 0 30px rgba(0, 102, 204, 0.25)',
      },
    },
  },
  plugins: [],
};
