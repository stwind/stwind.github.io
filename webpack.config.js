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
      images: path.resolve(ROOT_PATH, 'app/images')
    }
  },

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    loaders: [{
      test: /\.(png|jpg)$/,
      loader: 'file'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "url?limit=10000&minetype=application/font-woff" 
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: "file" 
    }, {
      test: /\.(glsl|vsh|fsh)$/, 
      loaders: ['shader']
    }]
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: 'antagonista',
      template: path.resolve(ROOT_PATH, 'app/index.html'),
      inject: 'body'
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
          test: /\.jsx?$/,
          loaders: ['react-hot','babel?optional[]=runtime&stage=0'],
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.css$/,
          loaders: ['style', 'css?modules&localIdentName=[path][name]--[local]--[hash:base64:5]', 'autoprefixer?browsers=last 2 version'],
        }
      ]
    }
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: false,
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
          test: /\.jsx?$/,
          loaders: ['babel?optional[]=runtime&stage=0'],
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules')
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
