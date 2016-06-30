/* eslint max-len: 0 */
import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import {
  JS_REGEX,
  EXCLUDE_REGEX,
  AUTOPREFIXER_BROWSERS
} from '../constants'

const { BUILD_HASH = 'DEFAULT' } = process.env

export default {
  module: {
    preLoaders: [
      { test: JS_REGEX, exclude: EXCLUDE_REGEX, loader: 'eslint' }
    ],

    loaders: [
      { test: /\.json$/, exclude: EXCLUDE_REGEX, loader: 'json' },
      { test: JS_REGEX, exclude: EXCLUDE_REGEX, loader: 'babel' },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: `file?name=[path][name]_${BUILD_HASH}.[ext]`
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: `file?name=[path][name]_${BUILD_HASH}.[ext]!image?optimizationLevel=7&progressive&interlaced`
      },
      {
        test: /\.css$/,
        exclude: /global\.css$/,
        loaders: [
          'isomorphic-style',
          `css?sourceMap&modules&localIdentName=[name]_[local]_${BUILD_HASH}`,
          'postcss'
        ]
      },
      {
        test: /global\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      }
    ]
  },

  postcss: (webpackInstance) => [
    require('postcss-import')({ addDependencyTo: webpackInstance }),
    require('postcss-url')(),
    require('precss')(),
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
  ],

  resolve: {
    root: resolve('./'),
    modulesDirectories: [ resolve('node_modules') ],
    extensions: [ '', '.js', '.json', '.jsx' ]
  }
}
