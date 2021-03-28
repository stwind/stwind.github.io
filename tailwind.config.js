const plugin = require('tailwindcss/plugin');
const modularScale = require('modularscale-js');
const defaultTheme = require('tailwindcss/defaultTheme');

const range = (a, b) =>
  Array.from(
    {
      length: b - a,
    },
    (_, i) => a + i
  );

const msFontSizes = (from = -2, to = 7, base = 1, ratio = 1.33, unit = 'rem') =>
  Object.fromEntries(
    range(from, to).map(x => [
      `.fs-${x}`,
      {
        fontSize: `${modularScale(x, { base, ratio })}${unit}`,
      },
    ])
  );

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '40rem', // 640px
      md: '48rem', // 768px
      // 'lg': '64rem', // 1024px
      // 'xl': '80rem', // 1280px
    },
    extend: {
      fontFamily: {
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        red: 'rgb(202,38,38)',
        green: 'rgb(36, 94, 7)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) =>
      addUtilities(msFontSizes(), {
        variants: ['responsive'],
      })
    ),
  ],
};
