import { resolve } from 'path'
import { once } from 'lodash'

import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import sharedConfig from './shared.config'
import writeStats from '../run/utils/write-stats'
import { DEV } from '../constants'
import { PORT } from '../core/config'

const {
  BUILD_HASH = 'DEFAULT',
  NODE_ENV = 'development'
} = process.env

const clean = (arr) => arr.filter(i => i !== false)

export default (afterBundle) => ({
  ...sharedConfig,

  devtool: DEV ? 'eval' : 'cheap-module-source-map',

  entry: {
    app: clean([
      'babel-polyfill',
      DEV && 'react-hot-loader/patch',
      DEV && `webpack-hot-middleware/client?path=http://localhost:${PORT + 1}/__webpack_hmr`,
      resolve(__dirname, '../app/index.js')
    ])
  },

  output: {
    path: resolve(__dirname, '../dist'),
    filename: `[name]-${BUILD_HASH}.js`,
    chunkFilename: `[name]-${BUILD_HASH}.js`,
    publicPath: '/assets/',
    pathinfo: true
  },

  plugins: clean([
    new webpack.LoaderOptionsPlugin({ minimize: !DEV, debug: DEV }),

    !DEV && new ExtractTextPlugin(`[name]-${BUILD_HASH}.css`),

    DEV && new BrowserSyncPlugin({
      host: 'localhost',
      port: PORT + 2,
      proxy: `0.0.0.0:${PORT}`,
      open: false
    }, { reload: false }),

    DEV && new webpack.HotModuleReplacementPlugin(),
    DEV && new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    // production build optimizations
    !DEV && new webpack.optimize.DedupePlugin(),
    !DEV && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),

    writeStats,

    DEV && function() { this.plugin('done', once(() => afterBundle())) }
  ])
})
