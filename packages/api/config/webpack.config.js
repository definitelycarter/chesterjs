const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, '..', 'src'),
  mode: isDevelopment ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  entry: {
    chester: './index.ts',
  },
  output: {
    filename: '[name].js',
    library: 'chester',
    libraryTarget: 'window',
    path: path.resolve(__dirname, '..', 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.webpack.json',
            },
          },
        ],
      },
    ],
  },
};
