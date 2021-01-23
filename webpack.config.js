/* globals __dirname module process require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.join(process.cwd(), 'src/index.js')],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       warnings: false,
    //       compress: {
    //         comparisons: false,
    //       },
    //       parse: {},
    //       mangle: true,
    //       output: {
    //         comments: false,
    //         ascii_only: true,
    //       },
    //     },
    //     parallel: true,
    //     cache: true,
    //     sourceMap: true,
    //   }),
    // ],
    // nodeEnv: 'production',
    // sideEffects: true,
    // concatenateModules: true,
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: 10,
    //   minSize: 0,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         const packageName = module.context.match(
    //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
    //         )[1];
    //         return `npm.${packageName.replace('@', '')}`;
    //       },
    //     },
    //   },
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
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
    ],
  },
};
