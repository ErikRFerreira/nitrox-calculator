/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#33C4E3',
        'background-light': '#f0f3f5',
        'background-dark': '#0A0B0F',
        panel: '#1A252E',
        'accent-teal': '#33C4E3',
        'warning-gold': '#FFD700',
      },
    },
  },
  plugins: [],
};
