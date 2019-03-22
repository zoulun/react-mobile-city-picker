const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const index = require('./index.js');

module.exports = merge(index, {
  mode: 'development',
  entry: '../src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  devtool: {
    port: 9999,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});