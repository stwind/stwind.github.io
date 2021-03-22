module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),

    require('postcss-preset-env')({
      stage: 1
    })
  ],
};