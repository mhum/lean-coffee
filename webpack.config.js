var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/app/assets/javascripts',
  entry: './index.jsx',
  output: {
    path: './app/assets/javascripts/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
