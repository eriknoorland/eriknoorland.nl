const path = require('path');

module.exports = {
  entry: './src/assets/js/base.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'base.js',
  },
};
