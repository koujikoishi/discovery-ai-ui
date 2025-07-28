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
      fontFamily: {
        // ✅ 推奨フォント構成：洗練された表示＋システム互換性
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'chat-glow': '0 0 30px rgba(0,0,0,0.5)',
      },
      animation: {
        'gentle-wiggle': 'wiggle 1.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
