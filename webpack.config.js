const webpack = require('webpack');
const path = require('path');

const PATHS = {
  app: './src/index.js',
  html: './src/index.html',
  css: /src/,
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: {
    javascript: PATHS.app,
    html: PATHS.html,
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: PATHS.dist,
  },
  devtool: '#inline-source-map',
  eslint: {
    emitWarning: true,
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint-loader'],
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.css$/,
        include: PATHS.css,
        loader: 'style!css?sourceMap!autoprefixer',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
