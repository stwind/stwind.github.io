const plugin = require('tailwindcss/plugin');
const modularScale = require('modularscale-js');

const range = (a, b) => Array.from({
  length: b - a
}, (_, i) => a + i);

const msFontSizes = (from = -2, to = 7, base = 1, ratio = 1.33, unit = 'rem') =>
  Object.fromEntries(range(from, to).map(x => [`.fs-${x}`, {
    fontSize: `${modularScale(x, { base, ratio })}${unit}`
  }]));

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({
      addUtilities
    }) => addUtilities(msFontSizes()))
  ],
}