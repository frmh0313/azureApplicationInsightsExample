const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  watchOptions: {
    poll: true,
    ignored: [/node_modules/],
  },
};
