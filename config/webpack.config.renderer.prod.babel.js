import path from "path";
import { EnvironmentPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "production",
  target: "electron-renderer",
  entry: require.resolve("../src/renderer/index.js"),
  output: {
    path: path.join(__dirname, "../prod/bundle"),
    filename: "renderer.prod.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [require.resolve("babel-loader")],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: "production",
    }),
    new HtmlWebpackPlugin({
      template: "src/renderer/index.html",
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
};
