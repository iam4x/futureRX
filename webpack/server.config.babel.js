import path from 'path'
import webpack from 'webpack'

const {
  resolve,
  postcss,
  module: { loaders }
} = require('./shared.config')

const { NODE_ENV = 'development' } = process.env

export default {
  target: 'node',
  devtool: 'source-map',

  externals: [
    require('webpack-node-externals')(),
    './webpack-stats.json'
  ],

  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, '../server/koa')
    ]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/assets/',
    pathinfo: true
  },

  node: {
    console: true,
    __filaname: true,
    __dirname: true,
    fs: true,
    path: true
  },

  module: { loaders },

  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        BROWSER: JSON.stringify(false)
      }
    })
  ],

  postcss,
  resolve
}
