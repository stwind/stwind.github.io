// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {
      url: '/',
      static: true
    },
    src: "/dist",
    test: "/test",
  },
  plugins: [
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2020',
  },
  packageOptions: {},
  devOptions: {},
  buildOptions: {},
};