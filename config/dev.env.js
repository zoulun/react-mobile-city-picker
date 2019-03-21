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
  module: {
    rules: [
      {
        test: /\.l?[ec]ss$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
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