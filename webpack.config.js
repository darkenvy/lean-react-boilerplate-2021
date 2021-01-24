/* globals __dirname module process require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

/* want offline-PWA functionality?
  use: https://www.npmjs.com/package/offline-plugin
  Left out for minimalist purposes
*/

const options = {
  entry: [path.join(process.cwd(), 'src/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
    ],
    sideEffects: isProduction,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      },
    },
    // runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.ids.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: NODE_ENV, // exposes node_env to project for env checks
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // js jsx ts tsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // alternate loaders left out for minimalist purposes. add them here
    ],
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  mode: isProduction ? 'production' : 'development',
  target: 'web',
};

if (isProduction === false) {
  options.devtool = 'eval-source-map';
  options.devServer = {
    writeToDisk: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  };
}

module.exports = options;
