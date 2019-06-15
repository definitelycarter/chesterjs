const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
  target: 'node',
  context: path.resolve(__dirname, '..', 'src'),
  mode: isDevelopment ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  entry: '.',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '..', 'lib'),
  },
  externals: {
    react: {
      commonjs: 'react',
    },
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
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]', outputPath: 'fonts/' },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

// module.exports = [
//   {
//     ...base,
//     target: 'node',
//     externals: {
//       react: {
//         commonjs: 'react',
//       },
//     },
//     entry: {
//       ['runner.back']: './pages/runner.back.tsx',
//     },
//     output: {
//       filename: '[name].js',
//       libraryTarget: 'commonjs',
//       path: path.resolve(__dirname, '..', 'lib', 'pages'),
//     },
//   },
//   {
//     ...base,
//     entry: {
//       ['runner.front']: './pages/runner.front.tsx',
//     },
//     output: {
//       filename: './js/[name].js',
//       path: path.resolve(__dirname, '..', 'static'),
//     },
//   },
// ];
