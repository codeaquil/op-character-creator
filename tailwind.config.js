/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // Uses prefers-color-scheme
  theme: {
    extend: {
      colors: {
        // Custom One Piece color palette
        'celtic-blue': '#2F76DC',
        'diamond': '#B9EFF8',
        'ripe-mango': '#FBC920',
        'alizarin-crimson': '#E62C39',
        'outer-space': '#2E333F',
        'crayola-gold': '#DFC18A',
        
        // Dark mode variants
        'dark-outer-space': '#1a1d24',
        'dark-diamond': '#2a3441',
        'dark-crayola-gold': '#3a3529',
        'dark-celtic-blue': '#4a8bef',
        'dark-ripe-mango': '#ffd54f',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
