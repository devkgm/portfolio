/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'gradient-slow': 'gradient 20s ease infinite',
        'gradient-slow-reverse': 'gradient-reverse 25s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        'gradient-reverse': {
          '0%, 100%': {
            'background-position': '100% 50%'
          },
          '50%': {
            'background-position': '0% 50%'
          },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 