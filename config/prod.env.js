const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const index = require('./index.js');

module.exports = merge(index, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.l?[ec]ss$/,
        use: ['css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'react-mobile-city-picker',
    //   template: path.resolve(__dirname, '../src/index.html'),
    // })
  ]
});