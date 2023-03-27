const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPluging = require('webpack/lib/container/ModuleFederationPlugin');

const IS_DEV = process.env.MODE === 'dev';
const ProductsRemote = IS_DEV ? 'http://localhost:8081': 'https://robzarel.github.io/mf-products';
const CartRemote = IS_DEV ? 'http://localhost:8082': 'https://robzarel.github.io/mf-cart';

const config = {
  mode: IS_DEV ? 'development': 'production',
  output: {
    filename: '[name].[hash].js',
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
      template: './public/index.html',
    })
  ]
};

module.exports = config;
