import { resolve } from 'path'
import webpack from 'webpack'

import sharedConfig from './shared.config'

export default {
  ...sharedConfig,

  target: 'node',

  externals: [
    require('webpack-node-externals')()
  ],

  entry: {
    app: [
      'babel-polyfill',
      resolve(__dirname, '../server/koa')
    ]
  },

  output: {
    path: resolve(__dirname, '../server'),
    filename: 'build.js',
    libraryTarget: 'commonjs2'
  },

  devServer: {
    outputPath: resolve(__dirname, '../server')
  },

  node: {
    console: true,
    devtool: 'source-map'
  },

  plugins: [
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    )
  ]
}
