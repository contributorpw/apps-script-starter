const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');

const destination = 'dist';

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    code: './src/index.js',
    bundle: './src/html/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, destination),
    libraryTarget: 'this'
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ie8: true,
          warnings: false,
          mangle: false,
          compress: {
            properties: false,
            warnings: false,
            drop_console: false
          },
          output: {
            beautify: true
          }
        }
      })
    ]
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        cache: true,
        failOnError: false
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([destination]),
    new WrapperPlugin([{
      test: /\.js$/, // only wrap output of bundle files with '.js' extension 
      header: '//------------------------------------------\n',
      footer: '\n'
    }]),
    new CopyWebpackPlugin([
      {
        from: './appsscript.json',
        to: path.resolve(__dirname, destination)
      },
      {
        from: './src/**/*.html',
        flatten: true,
        to: path.resolve(__dirname, destination)
      }]),
    new GasPlugin(),

    // {from:path.resolve(__dirname, destination) + '/appsscript.json'}, to:]);
  ]
};