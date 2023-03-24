const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPluging = require('webpack/lib/container/ModuleFederationPlugin');

const ID_DEV = process.env.NODE_ENV === 'dev';

module.exports = {
  mode: ID_DEV ? 'development': 'production',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build/static'),
    publicPath: 'static/'
    },
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPluging({
      name: 'container',
      remotes: {
        products: ID_DEV ? 'products@http://localhost:8081/remoteEntry.js' : 'products@https://robzarel.github.io/mf-products/remoteEntry.js',
        cart: ID_DEV ? 'cart@http://localhost:8082/remoteEntry.js' : 'cart@https://robzarel.github.io/mf-cart/remoteEntry.js',
      },
    }),  
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './public/index.html',
    })
  ]
};
