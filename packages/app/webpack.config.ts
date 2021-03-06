const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const env = process.env.NODE_ENV || "development";

const finalCSSLoader =
  env === "production"
    ? MiniCssExtractPlugin.loader
    : { loader: "style-loader" };
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: env,
  output: { publicPath: "/" },
  entry: ["babel-polyfill", "./src"],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: { extensions: [".js", ".jsx"] },
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              useRelativePath: true,
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./200.html",
    }),
    new ESLintPlugin({
      extensions: ["ts", "tsx"],
      fix: false,
      emitError: true,
      emitWarning: true,
      failOnError: true,
    }),
    autoprefixer,
  ],
  devServer: {
    static: "./src",
    historyApiFallback: true,
    port: 3000,
  },
};
