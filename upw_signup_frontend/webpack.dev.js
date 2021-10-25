const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  // https://webpack.js.org/configuration/mode/
  mode: 'development',

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/js/app/index.js',
    signup: './src/js/app/signup.js',

    component: './src/js/app/component.js',
    vendor: './src/js/vendor/vendor.js'
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080
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
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    })
  ]
}
