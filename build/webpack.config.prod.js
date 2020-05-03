const path = require('path');
const merge = require('webpack-merge');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssestPlugin = require('optimize-css-assets-webpack-plugin');
const { WEBPACK, NAME, PROJECT_PATH, TARGET_DIR } = require('./config.js');


module.exports = merge(WEBPACK, {
  output: {
    filename: '[name]-[hash:5].js',
    chunkFilename: 'chunk-[name]-[chunkhash:5].js',
    path: path.resolve(PROJECT_PATH, TARGET_DIR),
    publicPath: '/public/dist/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          'babel-loader',
        ],
      },
      {
        test: /\.(css|scss)/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:5]',
              importLoaders: 1,
            }
          },
          'postcss-loader',
        ]
      },
    ],
  },

  plugins: [
    new AntdDayjsWebpackPlugin(),
    new AssetsPlugin({
      processOutput: assets => JSON.stringify(assets).replace(/\/public\/dist\//ig, ''),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:5].css',
      chunkFilename: 'chunk-[name]-[hash:5].css',
    }),
  ],

  optimization: {
    minimizer: [
      new TerserJSPlugin({
        sourceMap: false,
      }),
      new OptimizeCSSAssestPlugin(),
    ],
  },
});
