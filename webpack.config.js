const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPluging = require('webpack/lib/container/ModuleFederationPlugin');

const IS_DEV = process.env.NODE_ENV === 'dev';
const ProductsRemote = IS_DEV ? 'http://localhost:8081': 'https://robzarel.github.io/mf-products/static';
const CartRemote = IS_DEV ? 'http://localhost:8082': 'https://robzarel.github.io/mf-cart/static';

module.exports = {
  mode: IS_DEV ? 'development': 'production',
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
        products: `products@${ProductsRemote}/remoteEntry.js`,
        cart: `cart@${CartRemote}/remoteEntry.js`,
      },
    }),  
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './public/index.html',
    })
  ]
};
