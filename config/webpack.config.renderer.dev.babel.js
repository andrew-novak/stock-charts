import { EnvironmentPlugin, HotModuleReplacementPlugin } from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import { spawn } from "child_process";

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;

export default {
  mode: "development",
  target: "electron-renderer",
  entry: require.resolve("../src/renderer/index.js"),
  output: {
    publicPath: `http://localhost:${port}/dist/`,
    filename: "renderer.dev.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            cacheDirectory: true,
            plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
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
      NODE_ENV: "development",
    }),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    port,
    publicPath,
    contentBase: path.join(__dirname, "dist"),
    before() {
      console.log("Starting Main Process...");
      spawn("npm", ["run", "start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(code))
        .on("error", (spawnError) => console.error(spawnError));
    },
  },
};
