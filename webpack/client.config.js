import { resolve } from 'path'
import { once } from 'lodash'

import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import sharedConfig from './shared.config'
import writeStats from '../run/utils/write-stats'
import { CLIENT_GLOBALS } from '../constants'
import { PORT } from '../core/config'

const { BUILD_HASH = 'DEFAULT' } = process.env

export default (afterBundle) => ({
  ...sharedConfig,

  devtool: 'eval',

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://localhost:${PORT + 1}/__webpack_hmr`,
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

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true
    }),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: PORT + 2,
      proxy: `0.0.0.0:${PORT}`,
      open: false
    }, { reload: false }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(CLIENT_GLOBALS),

    writeStats,

    function() { this.plugin('done', once(() => afterBundle())) }
  ]
})
