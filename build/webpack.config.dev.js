const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].js',
    publicPath: '/js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
    }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist') },
      ],
    }),
    new EslintPlugin({
      context: path.resolve(__dirname, '../'),
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ['ts', 'tsx', 'vue', 'js'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
