module.exports = {
  purge: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'regal-blue': '#21978b',  // 确保这里定义了 regal-blue 颜色
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
