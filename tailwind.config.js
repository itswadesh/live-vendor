module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './shared/components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'bounce-fast': 'bounce 1s linear infinite',
      },
      colors: {
        success: { 500: 'lime' },
        brand: {
          100: '#fee2e2' /* Light Red */,
          200: '#fef3c7' /* yellow-100 */,
          500: '#FDFF00' /* Lemon Yellow  */,
          600: '#FFEF00' /* Canary Yellow */,
          700: '#ff0000' /* Red */,
          800: '#B80F0A' /* Crimson */,
        },
        primary: {
          100: '#e0e7ff' /* indigo-100 */,
          200: '#c7d2fe' /* indigo-200 */,
          500: '#6366f1' /* indigo-500 */,
          600: '#4f46e5' /* indigo-800 */,
          700: '#3730a3' /* indigo-800 */,
        },
        secondary: {
          100: '#d1fae5' /* green-300  */,
          500: '#55C451' /* lightgreen */,
          600: '#42bf46' /* lightgreen */,
          700: '#10b981' /* darkgreen  */,
        },
      },
      fontFamily: {
        sans: ['Inter'],
      },
      spacing: {
        76: '19rem',
        88: '22rem',
        104: '26rem',
        120: '30rem',
        132: '33rem',
        140: '35rem',
        150: '37.5rem',
        220: '45rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
