const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        use: [{ loader: "babel-loader" }, { loader: "eslint-loader" }],
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
      // typescript config taken from here: https://learntypescript.dev/12/l4-webpack
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
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", "jsx"],
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
    autoprefixer,
  ],
  devServer: {
    static: "./src",
    historyApiFallback: true,
    port: 3000,
  },
};
