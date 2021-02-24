const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main/index.js",
   },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/[name].[chunkhash].js",
  },
  resolve:{
    alias: {
      images: path.resolve(__dirname,'src/images/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]',
              esModule: false,
           },
          },

          {
            loader: 'image-webpack-loader',
            options: {}
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:
            { publicPath: '../' }
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/fonts/[name].[ext]&publicPath=../',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/[name].[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/main/index.html",
      filename: "index.html",
    }),
    new WebpackMd5Hash()
  ],
};
