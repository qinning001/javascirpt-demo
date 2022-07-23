const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const yaml = require('yamljs');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].[contenthash].js",
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "JS代码测试",
      template: path.resolve(__dirname, "index.html"),
    }),
    new WebpackManifestPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 4000,
    client: {
      logging: "none",
    },
    open: true,
    hot: true,
  },
  optimization:{
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],	// 模块loader可以链式调用.链中的每个loader都将对资源进行转换.第一个loader将其结果(被转换后的资源)传递给下一个loader,依此类推.
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      },
    ]
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    entrypoints: false,
    groupModulesByType: true,
  },
};