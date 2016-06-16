import { resolve } from 'path'

import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import writeStats from './run/utils/write-stats'

import {
  JS_REGEX,
  EXCLUDE_REGEX
} from './constants'

const {
  BUILD_HASH = 'DEFAULT',
  NODE_ENV = 'development'
} = process.env

export default {
  devtool: 'eval',

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
      resolve('./app')
    ]
  },

  output: {
    path: resolve('./dist'),
    filename: `[name]-${BUILD_HASH}.js`,
    chunkFilename: `[name]-${BUILD_HASH}.js`,
    publicPath: '/assets/',
    pathinfo: true
  },

  module: {
    preLoaders: [
      { test: JS_REGEX, exclude: EXCLUDE_REGEX, loader: 'eslint' }
    ],

    loaders: [
      { test: /\.json$/, exclude: EXCLUDE_REGEX, loader: 'json' },
      { test: JS_REGEX, exclude: EXCLUDE_REGEX, loader: 'babel' }
    ]
  },

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3002,
      proxy: '0.0.0.0:3000'
    }, { reload: false }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    writeStats
  ],

  resolve: {
    extensions: [ '', '.js', '.json', '.jsx' ],
    modules: [ resolve('./'), 'node_modules' ]
  }
}
