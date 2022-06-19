/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  devServer: {
    open: true,
    hot: true,
    host: "0.0.0.0",
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new WebpackManifestPlugin(),
  ],
};
