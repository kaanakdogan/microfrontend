const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8893,
      analyzerMode: 'disabled' // default 'server'
    }),
    new ModuleFederationPlugin({
      name: 'component_app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.js'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps['react']
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    port: 3003
  }
}