const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { NetlifyPlugin } = require("netlify-webpack-plugin");

const baseConfig = {
  context: path.resolve(__dirname, './src'),
  entry: './index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][contenthash].js',
    assetModuleFilename: 'assets/[name][hash][ext][query]',
    hashFunction: 'xxhash64',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new EslintPlugin({ extensions: 'ts' }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: "./assets/img/products", to: "assets/img/products" },
      ],
    }),
    new NetlifyPlugin({
      redirects: [
        {
          from: "/*",
          to: "/",
          status: 200,
        },
        {
          from: "/cart/*",
          to: "/cart",
          status: 200,
        },
        {
          from: "/product/*",
          to: "/product",
          status: 200,
        },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
