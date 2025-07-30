// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        'gray-800': '#2c2c2c',
        'gray-700': '#1b1b1b',
      },
      boxShadow: {
        'chat-glow': '0 0 30px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
