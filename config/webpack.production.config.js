const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '..', 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../', 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '..', 'src/index.html') }),
      new CopyPlugin({
          patterns: [
              {
                  from: path.resolve(__dirname, '..', "assets"),
                  to: path.resolve(__dirname, '..', "dist/assets"),
              },
          ],
      }),
  ],
  module: {
    rules: [
      {
          test: /\.scss$/,
          include: [path.resolve(__dirname, '..', 'src')],
          use: [
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
