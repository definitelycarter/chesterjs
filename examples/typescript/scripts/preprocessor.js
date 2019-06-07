const webpack = require('webpack');
const path = require('path');

module.exports = output => file => {
  const compiler = webpack({
    mode: 'development',
    entry: file,
    output: output,
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react', '@babel/typescript'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.log('compilation error', stats.compilation.errors);
        return reject(err);
      }
      resolve();
    });
  });
};
