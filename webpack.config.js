const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPluging = require('webpack/lib/container/ModuleFederationPlugin');

const IS_DEV = process.env.MODE === 'dev';
const ProductsRemote = IS_DEV ? 'http://localhost:8081': 'https://robzarel.github.io/mf-products/static';
const CartRemote = IS_DEV ? 'http://localhost:8082': 'https://robzarel.github.io/mf-cart/static';

const config = {
  mode: IS_DEV ? 'development': 'production',
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
      filename: IS_DEV ? './index.html' : '../index.html',
      template: './public/index.html',
    })
  ]
};

if (!IS_DEV) {
  config.output = {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build/static'),
    publicPath: 'static/'
  };
}

module.exports = config;
