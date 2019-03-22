const NODE_ENV = process.env.NODE_ENV || 'production';
const _ENV_ = NODE_ENV === 'development'
const cssLoader = _ENV_ ? ['style-loader', 'css-loader', 'less-loader'] : ['css-loader', 'less-loader'];

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.l?[ec]ss$/,
        use: cssLoader
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}