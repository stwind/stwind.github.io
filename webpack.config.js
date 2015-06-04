'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    path: '/assets/',
    publicPath: '/assets/',
    filename: "[name].js"
  },

  entry: {
    main: ['webpack/hot/only-dev-server', './src/scripts/main.js'],
    vendor: ['react','react-router','d3','lodash',
      'debug','react-window-mixins','react-timer-mixin']
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      styles: path.resolve(__dirname, "src/styles")
    }
  },

  cache: true,
  debug: true,
  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    // preLoaders: [{
    //   test: '\\.js$',
    //   exclude: 'node_modules',
    //   loader: 'jshint'
    // }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot','babel?optional[]=runtime&stage=0']
    }, {
      test: /\.scss/,
      loader: 'style!css!autoprefixer?browsers=last 2 version!' + 
        'sass?&sourceMap=true&outputStyle=expanded&includePaths[]=' + 
        path.resolve(__dirname, './node_modules')
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer?browsers=last 2 version'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url?limit=10000&minetype=application/font-woff" 
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file" 
    }, {
      test: /\.md/,
      loader: './post'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })
  ],

  remarkable: {
    preset: 'full',
    linkify: true,
    typographer: true
  }

};
