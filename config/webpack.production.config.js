const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '..', 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../', 'dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '..', 'src/index.html') }),
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