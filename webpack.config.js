const path = require('path');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
    // plugins: [
    //   new MiniCssExtractPlugin({
    //     filename: "[name].css",
    //     chunkFilename: "[id].css"
    //   }),
    //   new CopyWebpackPlugin([
    //     {
    //       from: path.resolve(__dirname, 'index.html'),
    //       to: path.resolve(__dirname, 'dist')
    //     }
    //   ]),
    //   new webpack.DefinePlugin({
    //     'typeof CANVAS_RENDERER': JSON.stringify(true),
    //     'typeof WEBGL_RENDERER': JSON.stringify(true)
    //   })
    // ]
  },
};