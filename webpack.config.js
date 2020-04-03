const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'Entity Component System'
      })
  ],
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};