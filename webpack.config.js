const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPluging = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPluging({
      name: 'container',
      remotes: {
        productsApp: 'products@http://localhost:8081/remoteEntry.js'
      },
    }),  
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
};
