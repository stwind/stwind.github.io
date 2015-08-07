var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');

var pkg = require('./package.json');
var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {

  entry: path.resolve(ROOT_PATH, 'app/main'),

  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js','.jsx'],
    alias: {
      styles: path.resolve(__dirname, "src/styles")
    }
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot','babel?optional[]=runtime&stage=0'],
      include: path.resolve(ROOT_PATH, 'app')
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url?limit=10000&minetype=application/font-woff" 
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file" 
    }]
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: 'antagonista'
    })
  ]

};

if(TARGET === 'dev') {
  module.exports = merge(common, {
    devtool: 'eval',
    cache: true,
    debug: true,
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css', 'autoprefixer?browsers=last 2 version'],
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    }
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    entry: {
      app: path.resolve(ROOT_PATH, 'app/main'),
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: 'app.[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        'vendor.[chunkhash].js'
      ),
      new ExtractTextPlugin('styles.css'),
      new Clean(['build'])
    ]
  });
}
