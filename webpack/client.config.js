import { resolve } from 'path'
import { once } from 'lodash'

import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import sharedConfig from './shared.config'
import writeStats from '../run/utils/write-stats'
import { CLIENT_GLOBALS, isDev } from '../constants'
import { PORT } from '../core/config'

const { BUILD_HASH = 'DEFAULT' } = process.env

export default (afterBundle) => ({
  ...sharedConfig,

  debug: true,
  devtool: 'eval',
  target: 'web',

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://localhost:${PORT + 1}/__webpack_hmr`,
      resolve(__dirname, '../app')
    ]
  },

  output: {
    path: isDev ? resolve('./') : resolve('./dist'),
    filename: `[name]-${BUILD_HASH}.js`,
    chunkFilename: `[name]-${BUILD_HASH}.js`,
    publicPath: '/assets/'
  },

  plugins: [
    new ExtractTextPlugin(`[name]-${BUILD_HASH}.css`),

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
