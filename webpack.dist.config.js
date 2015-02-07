'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    publicPath: '/assets/',
    filename: "[name].js"
  },

  entry: {
    main: './src/scripts/main.js',
    vendor: ['react','react-router']
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      styles: path.resolve(__dirname, "src/styles"),
      posts: path.resolve(__dirname, "src/posts")
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  remarkable: {
    preset: 'full',
    linkify: true,
    typographer: true
  }

};
