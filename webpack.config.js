'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    path: '/assets/',
    publicPath: '/assets/',
    filename: "[name].js"
  },

  entry: [
    'webpack/hot/only-dev-server',
    './src/scripts/main.js'
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      styles: path.resolve(__dirname, "src/styles")
    }
  },

  cache: true,
  debug: true,

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot','jsx?harmony']
    }, {
      test: /\.scss/,
      loader: "style!css!sass?outputStyle=expanded&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules"))
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.md/,
      loader: './post'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  remarkable: {
    preset: 'full',
    linkify: true,
    typographer: true
  }

};
