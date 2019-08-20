const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  resolve: {
    extensions: ['.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      }
    ]
  }
}
