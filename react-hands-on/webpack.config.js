module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
  },
  module: {
    // 使用するモジュールの設定値をrulesに配列で指定する
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
};
