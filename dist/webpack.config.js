const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: {
    background: './background.js',
    content: './content.js',
    popup: './popup/popup.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'production'
};