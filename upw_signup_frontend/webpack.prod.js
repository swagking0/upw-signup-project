const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  // https://webpack.js.org/configuration/mode/
  mode: 'production',

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/js/app/index.js',
    signup: './src/js/app/signup.js',

    component: './src/js/app/component.js',
    vendor: './src/js/vendor/vendor.js'
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: buildPath,
    assetModuleFilename: 'images/[name][hash][ext][query]',
    clean: true
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/babel-loader/#root
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // https://webpack.js.org/loaders/css-loader/#root
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: 'html-loader'
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      template: './src/pages/index.html',
      inject: true,
      chunks: ['index', 'component', 'vendor'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'SignUp',
      template: './src/pages/signup.html',
      inject: true,
      chunks: ['signup', 'component', 'vendor'],
      filename: 'signup.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimize: true,
    minimizer: [
      // https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        parallel: true
      }),
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
      new CssMinimizerPlugin()
    ]
  }
}
