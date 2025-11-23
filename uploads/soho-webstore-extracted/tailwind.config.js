/*
 * Tailwind configuration for Soho Connect webstore. It defines the
 * primary brand colour (Royal Blue) and integrates Inter and Oswald
 * fonts. Extend or override as needed to incorporate additional
 * typography, spacing and breakpoints. Note that Tailwind will scan
 * files in the `pages`, `components` and `lib` directories for class
 * names.
 */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4169e1', // Royal Blue base
        'primary-dark': '#3557c4',
        'primary-light': '#5a7fe8',
        'primary-ultra-light': '#e8eeff',
        // neutrals
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          600: '#57534e',
          700: '#44403c',
          900: '#1c1917',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
