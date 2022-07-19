const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].js',
    publicPath: '/js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist') }
      ]
    })
  ]
}